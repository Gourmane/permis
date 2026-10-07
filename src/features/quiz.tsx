"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize,
  ZoomIn,
  X,
  Download,
} from "lucide-react";
import { useProgress } from "@/storage/provider";
import { available, byId, answerLabel, number, percent } from "@/lib/content";
import { equalAnswers, recordAnswer, score, blankRecord } from "@/lib/logic";
import { downloadCorrection } from "@/lib/download";
import { useStartQuiz } from "./use-start-quiz";
import {
  Bar,
  Dialog,
  Empty,
  QuestionImage,
  Numeric,
  AnswerButton,
} from "@/components/ui";
import type { Answer, Result } from "@/types";
export default function Quiz() {
  const { progress, update } = useProgress();
  const start = useStartQuiz();
  const session = progress.session;
  const q = session ? byId.get(session.ids[session.index]) : null;
  const saved = q ? session?.answers[q.id] : undefined;
  const [selection, setSelection] = useState<Answer[]>([]);
  const [zoom, setZoom] = useState(false);
  const [scale, setScale] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [finished, setResult] = useState<Result | null>(null);
  const result =
    finished ?? (!session ? (progress.results.at(-1) ?? null) : null);
  const currentSelection = saved ?? selection;
  const toggle = useCallback(
    (a: Answer) => {
      if (saved || busy) return;
      setSelection((s) =>
        s.includes(a) ? s.filter((x) => x !== a) : [...s, a],
      );
    },
    [saved, busy],
  );
  const validate = useCallback(async () => {
    if (!q || !session || !selection.length || saved || q.needsReview || busy)
      return;
    setBusy(true);
    await update((p) => {
      if (!p.session || p.session.answers[q.id]) return p;
      return {
        ...p,
        records: {
          ...p.records,
          [q.id]: recordAnswer(p.records[q.id], selection, q.correctAnswers),
        },
        session: {
          ...p.session,
          answers: { ...p.session.answers, [q.id]: selection },
        },
      };
    });
    setBusy(false);
  }, [q, session, selection, saved, busy, update]);
  const move = useCallback(
    async (direction: number) => {
      if (!session || busy) return;
      const next = session.index + direction;
      setError("");
      if (next < 0) return;
      if (next >= session.ids.length) {
        const list = session.ids
          .map((id) => byId.get(id))
          .filter((q) => q !== undefined);
        if (list.some((q) => !session.answers[q.id])) {
          setError("أكمل الإجابة عن جميع الأسئلة قبل إنهاء التدريب.");
          return;
        }
        const final: Result = {
          id: crypto.randomUUID(),
          label: session.label,
          seriesId: session.seriesId,
          date: new Date().toISOString(),
          questionIds: session.ids,
          ...score(list, session.answers),
        };
        setBusy(true);
        if (
          await update((p) => ({
            ...p,
            session: null,
            results: [...p.results, final],
          }))
        )
          setResult(final);
        setBusy(false);
      } else {
        setBusy(true);
        if (
          await update((p) => ({
            ...p,
            session: p.session ? { ...p.session, index: next } : null,
          }))
        )
          setSelection([]);
        setBusy(false);
      }
    },
    [session, busy, update],
  );
  useEffect(() => {
    const next = session ? byId.get(session.ids[session.index + 1]) : null;
    if (next) {
      const img = new Image();
      img.src = next.image;
    }
  }, [session]);
  useEffect(() => {
    function keyboard(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        document.querySelector("dialog[open]") ||
        target.closest("input,select,textarea,[contenteditable=true]") ||
        e.ctrlKey ||
        e.altKey ||
        e.metaKey
      )
        return;
      if (["1", "2", "3", "4"].includes(e.key)) {
        e.preventDefault();
        toggle(Number(e.key) as Answer);
      } else if (
        e.key === "Enter" &&
        (target.closest(".answer-button") ||
          (target.tagName !== "BUTTON" && target.tagName !== "A"))
      ) {
        e.preventDefault();
        if (saved) void move(1);
        else void validate();
      }
    }
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [toggle, move, validate, saved]);
  async function bookmark() {
    if (!q) return;
    await update((p) => ({
      ...p,
      records: {
        ...p.records,
        [q!.id]: {
          ...(p.records[q!.id] ?? blankRecord()),
          bookmarked: !p.records[q!.id]?.bookmarked,
        },
      },
    }));
  }
  if (result)
    return (
      <div className="quiz panel">
        <h1>أحسنت إكمال التدريب</h1>
        <p>{result.label}</p>
        <div className="result-score">
          <strong>
            <Numeric>
              {number(result.correct)}/{number(result.total)}
            </Numeric>
          </strong>
          <p className="result-percent">
            <Numeric>{number(percent(result.correct, result.total))}%</Numeric>
          </p>
          <p>نتيجتك في هذه المحاولة</p>
        </div>
        <div className="result-details">
          <span>
            صحيحة<b>{number(result.correct)}</b>
          </span>
          <span>
            غير صحيحة<b>{number(result.wrongIds.length)}</b>
          </span>
          <span>
            مجموع الأسئلة<b>{number(result.total)}</b>
          </span>
        </div>
        <div className="actions">
          <button
            className="button primary"
            onClick={async () => {
              const started = await start(
                available.filter((q) => result.questionIds.includes(q.id)),
                result.label,
                result.seriesId,
              );
              if (started) {
                setResult(null);
                setSelection([]);
              }
            }}
          >
            إعادة التدريب كاملًا
          </button>
          {result.wrongIds.length > 0 && (
            <a href="#result-mistakes" className="button">
              مراجعة الأخطاء
            </a>
          )}
          {result.wrongIds.length > 0 && (
            <button
              className="button"
              onClick={async () => {
                const started = await start(
                  available.filter((q) => result.wrongIds.includes(q.id)),
                  "مراجعة أخطاء المحاولة",
                );
                if (started) {
                  setResult(null);
                  setSelection([]);
                }
              }}
            >
              تدريب أخطاء المحاولة
            </button>
          )}
          <Link href="/series/" className="button">
            العودة للسلاسل
          </Link>
        </div>
        {result.wrongIds.length > 0 && (
          <>
            <div className="section-title">
              <h2>أسئلة تحتاج مراجعة</h2>
            </div>
            <ul className="result-list" id="result-mistakes">
              {result.wrongIds.map((id) => {
                const item = byId.get(id)!;
                return (
                  <li key={id}>
                    <span>
                      السلسلة {number(item.seriesNumber)} · السؤال{" "}
                      {number(item.questionNumber)}
                    </span>
                    <span>الصحيح: {answerLabel(item.correctAnswers)}</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    );
  if (!session || !q)
    return (
      <Empty
        title="اختر تدريبك أولًا"
        text="ابدأ سلسلة، أو اختر أسئلة من أخطائك أو المواضيع."
      >
        <Link href="/series/" className="button primary">
          تصفّح السلاسل
        </Link>
      </Empty>
    );
  if (q.needsReview)
    return (
      <Empty
        title="هذا السؤال ينتظر المراجعة"
        text="لا توجد إجابة موثوقة له بعد. اختر تدريبًا آخر."
      >
        <Link href="/series/" className="button">
          العودة للسلاسل
        </Link>
      </Empty>
    );
  const ok = saved ? equalAnswers(saved, q.correctAnswers) : false;
  return (
    <div className="quiz">
      <aside className="quiz-sidebar">
        <div className="quiz-header">
          <div>
            <h1>{session.label}</h1>
          </div>
          <button
            className={
              "icon-button " +
              (progress.records[q.id]?.bookmarked ? "bookmarked" : "")
            }
            onClick={bookmark}
            aria-pressed={!!progress.records[q.id]?.bookmarked}
            aria-label={
              progress.records[q.id]?.bookmarked
                ? "إزالة من المحفوظات"
                : "حفظ السؤال"
            }
          >
            <Bookmark size={21} />
          </button>
        </div>
        <div className="quiz-progress">
          <span>
            السؤال{" "}
            <Numeric>
              {number(session.index + 1)}/{number(session.ids.length)}
            </Numeric>
          </span>
          <span>
            السلسلة {number(q.seriesNumber)} · سؤال {number(q.questionNumber)}
          </span>
        </div>
        <Bar
          value={percent(
            Object.keys(session.answers).length,
            session.ids.length,
          )}
          label="تقدم التدريب"
        />
        <p className="sidebar-help">
          حدّد كل الإجابات الصحيحة، ثم أكّد اختيارك. التصحيح يبقى ظاهرًا حتى
          تنتقل بنفسك.
        </p>
        <div className="question-navigation" aria-label="التنقل بين الأسئلة">
          {session.ids.map((id, index) => (
            <button
              key={id}
              className={
                index === session.index
                  ? "current"
                  : session.answers[id]
                    ? "answered"
                    : ""
              }
              aria-label={"السؤال " + number(index + 1)}
              aria-current={index === session.index ? "step" : undefined}
              disabled={
                busy ||
                (!session.answers[id] &&
                  index > session.index &&
                  !session.answers[session.ids[index - 1]])
              }
              onClick={() => move(index - session.index)}
            >
              <Numeric>{number(index + 1)}</Numeric>
            </button>
          ))}
        </div>
        <p className="keyboard-help">
          مفاتيح 1 إلى 4 لتحديد الإجابات · مفتاح الإدخال للتأكيد أو الانتقال
        </p>
        <Link href="/series/" className="button small quiz-exit">
          العودة إلى السلاسل
        </Link>
      </aside>
      <section className="quiz-main" aria-label="السؤال والإجابات">
        <div style={{ marginTop: 20 }}>
          <button
            className="image-trigger"
            style={{
              border: 0,
              padding: 0,
              background: "transparent",
              width: "100%",
            }}
            onClick={() => {
              setZoom(true);
              setScale(1);
            }}
            aria-label="تكبير صورة السؤال"
          >
            <QuestionImage
              key={q.id}
              src={q.image}
              alt={
                "صورة السؤال " +
                number(q.questionNumber) +
                " من السلسلة " +
                number(q.seriesNumber)
              }
            />
          </button>
        </div>
        <div className="image-actions">
          <span>اضغط على الصورة لقراءتها عن قرب</span>
          <button
            className="button small"
            onClick={() => {
              setZoom(true);
              setScale(1);
            }}
          >
            <ZoomIn size={16} />
            تكبير
          </button>
        </div>
        <p className="answer-hint">
          حدّد أرقام الإجابات الواردة في الصورة، ثم أكّد اختيارك. يمكنك اختيار
          أكثر من إجابة.
        </p>
        <div className="answer-buttons">
          {([1, 2, 3, 4] as Answer[]).map((a) => (
            <AnswerButton
              key={a}
              value={a}
              disabled={!!saved || busy}
              selected={currentSelection.includes(a)}
              correct={!!saved && q.correctAnswers.includes(a)}
              incorrect={
                !!saved &&
                currentSelection.includes(a) &&
                !q.correctAnswers.includes(a)
              }
              onClick={() => toggle(a)}
            />
          ))}
        </div>
        {saved && (
          <div
            className={"feedback " + (ok ? "" : "error")}
            role="status"
            aria-live="polite"
          >
            <strong>
              {ok ? <Check size={22} /> : <X size={22} />}{" "}
              {ok ? "إجابة صحيحة" : "إجابة خاطئة"}
            </strong>
            <p>
              إجابتك: <Numeric>{answerLabel(saved)}</Numeric>
              <br />
              الإجابة الصحيحة:{" "}
              <Numeric>{answerLabel(q.correctAnswers)}</Numeric>
            </p>
            {!ok && (
              <button
                className="button small"
                style={{ marginTop: 14 }}
                onClick={() =>
                  downloadCorrection(q, saved).catch(() =>
                    setError("تعذّر تنزيل التصحيح. تحقق من تحميل صورة السؤال."),
                  )
                }
              >
                <Download size={15} />
                تنزيل التصحيح
              </button>
            )}
          </div>
        )}
        {error && (
          <p className="notice danger" role="alert">
            {error}
          </p>
        )}
        <div className="quiz-controls">
          <button
            className="button"
            disabled={session.index === 0 || busy}
            onClick={() => move(-1)}
          >
            <ChevronRight size={17} />
            السابق
          </button>
          {saved ? (
            <button
              className="button primary"
              disabled={busy}
              onClick={() => move(1)}
            >
              {session.index === session.ids.length - 1
                ? "إنهاء التدريب"
                : "السؤال التالي"}
              <ChevronLeft size={17} />
            </button>
          ) : (
            <button
              className="button primary"
              disabled={!selection.length || busy}
              onClick={validate}
            >
              {busy ? "جارٍ الحفظ…" : "تأكيد الإجابة"}
            </button>
          )}
        </div>
      </section>
      {zoom && (
        <Dialog title="صورة السؤال" onClose={() => setZoom(false)}>
          <div className="actions zoom-controls">
            <button
              className="button small"
              onClick={() => setScale((s) => (s === 1 ? 2 : 1))}
            >
              <ZoomIn size={16} />
              {scale === 1 ? "تكبير إضافي" : "الحجم الأصلي"}
            </button>
            <button
              className="button small"
              onClick={() => {
                const d = document.querySelector("dialog");
                if (document.fullscreenElement)
                  document.exitFullscreen().catch(() => {});
                else
                  d?.requestFullscreen?.().catch(() =>
                    setError("العرض الكامل غير مدعوم في هذا المتصفح."),
                  );
              }}
            >
              <Maximize size={16} />
              ملء الشاشة
            </button>
          </div>
          <div className="zoom-scroll">
            <img
              src={q.image}
              alt="صورة السؤال مكبّرة"
              className="zoom-image"
              style={{
                width: scale === 2 ? "180%" : "100%",
                maxWidth: scale === 2 ? "none" : "100%",
              }}
            />
          </div>
        </Dialog>
      )}
    </div>
  );
}
