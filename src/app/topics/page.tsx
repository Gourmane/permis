"use client";
import { available, number, topics, percent } from "@/lib/content";
import { useProgress } from "@/storage/provider";
import { useStartQuiz } from "@/features/use-start-quiz";
import { Heading, Bar, Empty } from "@/components/ui";
import type { Topic } from "@/types";
export default function Page() {
  const { progress } = useProgress();
  const start = useStartQuiz();
  const detected = (Object.keys(topics) as Topic[]).filter((t) =>
    available.some((q) => q.topic === t),
  );
  return (
    <>
      <Heading
        title="التدريب حسب المحور"
        text="اختر ما تريد مراجعته، وركّز عليه سؤالًا بعد سؤال."
      />
      {!detected.length ? (
        <Empty
          title="المواضيع قيد التجهيز"
          text="ستظهر هنا بعد مراجعة الأسئلة المستخرجة."
        />
      ) : (
        <div className="topic-list">
          {detected.map((t) => {
            const list = available.filter((q) => q.topic === t);
            const answered = list.filter(
              (q) => progress.records[q.id]?.attempts,
            ).length;
            const records = list
              .map((q) => progress.records[q.id])
              .filter(Boolean);
            const correct = records.reduce((n, r) => n + r.correct, 0);
            const attempts = records.reduce((n, r) => n + r.attempts, 0);
            return (
              <div key={t} className="topic-row">
                <div>
                  <h3>{topics[t]}</h3>
                  <small>
                    {number(list.length)} سؤالًا · أجبت عن {number(answered)}
                  </small>
                </div>
                <div className="topic-progress">
                  الدقة:{" "}
                  {attempts ? `${number(percent(correct, attempts))}%` : "—"}
                  <Bar
                    value={percent(correct, attempts)}
                    label={`دقة ${topics[t]}`}
                  />
                </div>
                <button
                  className="button small"
                  onClick={() => start(list, topics[t])}
                >
                  ابدأ التدريب
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
