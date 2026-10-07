"use client";
import { useState } from "react";
import Link from "next/link";
import { Download, Bookmark } from "lucide-react";
import {
  available,
  number,
  topics,
  series,
  answerLabel,
  dateLabel,
} from "@/lib/content";
import { weakWeight } from "@/lib/logic";
import { downloadCorrection, downloadAll } from "@/lib/download";
import { useProgress } from "@/storage/provider";
import { useStartQuiz } from "./use-start-quiz";
import { Empty, Heading, QuestionImage, Numeric } from "@/components/ui";
export default function QuestionCollection({
  mode,
}: {
  mode: "mistakes" | "bookmarks";
}) {
  const { progress, update } = useProgress();
  const start = useStartQuiz();
  const [seriesFilter, setSeriesFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [order, setOrder] = useState("recent");
  const [minimum, setMinimum] = useState(1);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const mistakes = mode === "mistakes";
  const pool = available.filter((q) =>
    mistakes
      ? progress.records[q.id]?.wrong > 0
      : progress.records[q.id]?.bookmarked,
  );
  const list = pool
    .filter(
      (q) =>
        (!seriesFilter || q.seriesId === seriesFilter) &&
        (!topicFilter || q.topic === topicFilter) &&
        (!mistakes || progress.records[q.id].wrong >= minimum),
    )
    .sort((a, b) =>
      order === "wrong"
        ? progress.records[b.id].wrong - progress.records[a.id].wrong
        : order === "weak"
          ? weakWeight(progress.records[b.id]) -
            weakWeight(progress.records[a.id])
          : (progress.records[b.id].lastWrongAt ?? "").localeCompare(
              progress.records[a.id].lastWrongAt ?? "",
            ),
    );
  async function bulk() {
    setBusy(true);
    setMessage("");
    try {
      await downloadAll(list, progress.records);
      setMessage("تم تجهيز جميع التصحيحات للتنزيل.");
    } catch {
      setMessage("تعذّر تجهيز بعض الصور. جرّب تنزيل كل تصحيح على حدة.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Heading
        title={mistakes ? "أخطائي" : "أسئلتي المحفوظة"}
        text={
          mistakes
            ? "تاريخ أخطائك محفوظ حتى بعد تحسّن إجاباتك. راجعها وراقب تقدمك."
            : "احتفظ بالأسئلة المهمة لتعود إليها عندما تريد."
        }
        action={
          <div className="actions">
            <button
              className="button primary"
              disabled={!list.length}
              onClick={() =>
                start(
                  list,
                  mistakes ? "التدريب على أخطائي" : "التدريب على المحفوظات",
                )
              }
            >
              {mistakes ? "تدرّب على أخطائي" : "تدرّب على المحفوظات"}
            </button>
            {mistakes && (
              <button
                className="button"
                disabled={!list.length || busy}
                onClick={bulk}
              >
                <Download size={17} />
                {busy ? "جارٍ تجهيز الصور…" : "تنزيل كل التصحيحات"}
              </button>
            )}
          </div>
        }
      />
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
      {pool.length > 0 && (
        <div className="filters">
          <label className="field">
            السلسلة
            <select
              value={seriesFilter}
              onChange={(e) => setSeriesFilter(e.target.value)}
            >
              <option value="">كل السلاسل</option>
              {series.map((s) => (
                <option key={s.id} value={s.id}>
                  السلسلة {number(s.number)}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            الموضوع
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
            >
              <option value="">كل المواضيع</option>
              {Object.entries(topics).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          {mistakes && (
            <>
              <label className="field">
                عدد الأخطاء
                <select
                  value={minimum}
                  onChange={(e) => setMinimum(Number(e.target.value))}
                >
                  {[1, 2, 3, 5].map((n) => (
                    <option key={n} value={n}>
                      {number(n)} أو أكثر
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                ترتيب الأسئلة
                <select
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <option value="recent">الأخطاء الأحدث</option>
                  <option value="wrong">الأكثر أخطاء</option>
                  <option value="weak">الأولى بالمراجعة</option>
                </select>
              </label>
            </>
          )}
        </div>
      )}
      {!list.length ? (
        <Empty
          title={
            pool.length
              ? "لا توجد نتائج لهذه الفلاتر"
              : mistakes
                ? "لم تُسجّل أخطاء بعد"
                : "احفظ سؤالًا لتعود إليه"
          }
          text={
            pool.length
              ? "غيّر خيارات التصفية لعرض أسئلة أخرى."
              : mistakes
                ? "ابدأ التدريب. أي سؤال تخطئ فيه سيظهر هنا مع تصحيحه."
                : "اضغط على علامة الحفظ بجانب السؤال أثناء التدريب."
          }
        >
          <Link className="button primary" href="/series/">
            اذهب إلى السلاسل
          </Link>
        </Empty>
      ) : (
        <div className="question-grid">
          {list.map((q) => {
            const r = progress.records[q.id];
            return (
              <article className="mistake-card" key={q.id}>
                <QuestionImage
                  lazy
                  src={q.image}
                  alt={`السلسلة ${number(q.seriesNumber)}، السؤال ${number(q.questionNumber)}`}
                />
                <div className="mistake-content">
                  <div className="series-card-header">
                    <h3>
                      السلسلة {number(q.seriesNumber)} · السؤال{" "}
                      {number(q.questionNumber)}
                    </h3>
                    {mistakes && (
                      <span
                        className={`badge ${r.mastered ? "success" : "warning"}`}
                      >
                        {r.mastered ? "تحسّنت إجابتي" : "بحاجة لمراجعة"}
                      </span>
                    )}
                  </div>
                  <span className="badge">{topics[q.topic]}</span>
                  {mistakes && (
                    <>
                      <div className="answer-summary">
                        <span className="wrong">
                          آخر إجابة خاطئة:{" "}
                          <Numeric>{answerLabel(r.lastWrong)}</Numeric>
                        </span>
                        <span className="correct">
                          الصحيح:{" "}
                          <Numeric>{answerLabel(q.correctAnswers)}</Numeric>
                        </span>
                      </div>
                      <div className="details">
                        <span>{number(r.wrong)} محاولة خاطئة</span>
                        <span>{number(r.correct)} محاولة صحيحة</span>
                        <span>آخر خطأ: {dateLabel(r.lastWrongAt)}</span>
                      </div>
                    </>
                  )}
                  <div className="actions">
                    {mistakes && (
                      <button
                        className={
                          "icon-button " + (r.bookmarked ? "bookmarked" : "")
                        }
                        aria-label={
                          r.bookmarked ? "إزالة من المحفوظات" : "حفظ السؤال"
                        }
                        aria-pressed={r.bookmarked}
                        onClick={() =>
                          update((p) => ({
                            ...p,
                            records: {
                              ...p.records,
                              [q.id]: {
                                ...p.records[q.id],
                                bookmarked: !p.records[q.id].bookmarked,
                              },
                            },
                          }))
                        }
                      >
                        <Bookmark size={18} />
                      </button>
                    )}
                    <button
                      className="button small"
                      onClick={() =>
                        start([q], `مراجعة السؤال ${number(q.questionNumber)}`)
                      }
                    >
                      تدرّب على السؤال
                    </button>
                    {mistakes ? (
                      <button
                        className="button small"
                        onClick={() =>
                          downloadCorrection(q, r.lastWrong).catch(() =>
                            setMessage(
                              "تعذّر تنزيل الصورة. أعد تحميل الصفحة وحاول مجددًا.",
                            ),
                          )
                        }
                      >
                        <Download size={15} />
                        تنزيل التصحيح
                      </button>
                    ) : (
                      <button
                        className="button small"
                        onClick={() =>
                          update((p) => ({
                            ...p,
                            records: {
                              ...p.records,
                              [q.id]: { ...p.records[q.id], bookmarked: false },
                            },
                          }))
                        }
                      >
                        <Bookmark size={15} />
                        إزالة الحفظ
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
