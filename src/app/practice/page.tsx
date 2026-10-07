"use client";
import { useState } from "react";
import { available, number } from "@/lib/content";
import { selectQuestions, weakWeight } from "@/lib/logic";
import { useProgress } from "@/storage/provider";
import { useStartQuiz } from "@/features/use-start-quiz";
import { Heading } from "@/components/ui";
export default function Page() {
  const { progress, update } = useProgress();
  const start = useStartQuiz();
  const [count, setCount] = useState(20);
  return (
    <>
      <Heading
        title="تدريب مختلط"
        text="اختبر نفسك بأسئلة متنوعة، أو ركّز على ما يحتاج مراجعة."
      />
      <div className="practice-box">
        <h2>كم سؤالًا تريد؟</h2>
        <p className="text-muted">
          اختر عددًا يناسب وقتك. ستُختار الأسئلة بترتيب عشوائي.
        </p>
        <div className="choice-buttons">
          {[10, 20, 40, 0].map((n) => (
            <button
              className="button"
              key={n}
              aria-pressed={count === n}
              onClick={() => setCount(n)}
            >
              {n ? number(n) : "الكل"}
            </button>
          ))}
        </div>
        <label className="check-field">
          <input
            type="checkbox"
            checked={progress.settings.focusWeak}
            onChange={(e) => {
              const checked = e.target.checked;
              update((p) => ({
                ...p,
                settings: { ...p.settings, focusWeak: checked },
              }));
            }}
          />
          التركيز على الأسئلة الضعيفة
        </label>
        <button
          className="button primary"
          disabled={!available.length}
          onClick={() =>
            start(
              selectQuestions(
                available,
                count || available.length,
                progress.records,
                progress.settings.focusWeak,
              ),
              "تدريب مختلط",
            )
          }
        >
          ابدأ {number(Math.min(count || available.length, available.length))}{" "}
          سؤالًا
        </button>
        <div className="section-title">
          <h2>مراجعة مركّزة</h2>
        </div>
        <p>تبدأ بالأسئلة التي أخطأت فيها أكثر أو مؤخرًا.</p>
        <button
          className="button"
          disabled={!available.some((q) => progress.records[q.id]?.wrong)}
          onClick={() =>
            start(
              available
                .filter((q) => progress.records[q.id]?.wrong)
                .sort(
                  (a, b) =>
                    weakWeight(progress.records[b.id]) -
                    weakWeight(progress.records[a.id]),
                )
                .slice(0, 40),
              "مراجعة الأسئلة الضعيفة",
            )
          }
        >
          راجع الأسئلة الضعيفة
        </button>
      </div>
    </>
  );
}
