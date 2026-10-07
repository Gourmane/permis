"use client";
import {
  available,
  number,
  percent,
  topics,
  series,
  dateLabel,
} from "@/lib/content";
import { useProgress } from "@/storage/provider";
import { Heading, Bar, Empty } from "@/components/ui";
export default function Page() {
  const { progress } = useProgress();
  const records = Object.values(progress.records);
  const attempts = records.reduce((n, r) => n + r.attempts, 0);
  const correct = records.reduce((n, r) => n + r.correct, 0);
  const mastered = records.filter((r) => r.mastered).length;
  const never = available.filter(
    (q) => !progress.records[q.id]?.attempts,
  ).length;
  const mistakes = records.filter((r) => r.wrong > 0).length;
  const groups = Object.entries(topics)
    .map(([id, label]) => {
      const qs = available.filter((q) => q.topic === id);
      const a = qs.reduce(
        (n, q) => n + (progress.records[q.id]?.attempts ?? 0),
        0,
      );
      const c = qs.reduce(
        (n, q) => n + (progress.records[q.id]?.correct ?? 0),
        0,
      );
      return { id, label, a, c };
    })
    .filter((t) => t.a)
    .sort((a, b) => percent(b.c, b.a) - percent(a.c, a.a));
  return (
    <>
      <Heading
        title="إحصائياتي"
        text="اعرف ما أتقنته، وما يستحق وقتًا إضافيًا."
      />
      <div className="metric-row">
        {[
          { label: "إجمالي المحاولات", value: number(attempts) },
          {
            label: "دقة الإجابات",
            value: attempts ? `${number(percent(correct, attempts))}%` : "—",
          },
          { label: "أسئلة أتقنتها", value: number(mastered) },
          { label: "لم أحاولها بعد", value: number(never) },
        ].map((m) => (
          <div key={m.label} className="metric">
            <span className="metric-top">{m.label}</span>
            <strong>{m.value}</strong>
          </div>
        ))}
      </div>
      {!attempts ? (
        <Empty
          title="أول تدريب، أول إحصائية"
          text="ستظهر دقتك ونقاط قوتك بعد الإجابة عن الأسئلة."
        />
      ) : (
        <>
          <p className="notice">
            أخطأت سابقًا في {number(mistakes)} سؤالًا.{" "}
            {groups.length > 0 && (
              <>
                أقوى موضوع: {groups[0].label} · أكثر موضوع يحتاج مراجعة:{" "}
                {groups.at(-1)!.label}.
              </>
            )}
          </p>
          <div className="stats-columns">
            <section className="panel">
              <h2>الدقة حسب الموضوع</h2>
              {groups.map((t) => (
                <div className="stat-line" key={t.id}>
                  <div className="stat-line-top">
                    <span>{t.label}</span>
                    <b>{number(percent(t.c, t.a))}%</b>
                  </div>
                  <Bar value={percent(t.c, t.a)} label={t.label} />
                </div>
              ))}
            </section>
            <section className="panel">
              <h2>الدقة حسب السلسلة</h2>
              {series.map((s) => {
                const qs = available.filter((q) => q.seriesId === s.id);
                const a = qs.reduce(
                  (n, q) => n + (progress.records[q.id]?.attempts ?? 0),
                  0,
                );
                const c = qs.reduce(
                  (n, q) => n + (progress.records[q.id]?.correct ?? 0),
                  0,
                );
                return a ? (
                  <div className="stat-line" key={s.id}>
                    <div className="stat-line-top">
                      <span>السلسلة {number(s.number)}</span>
                      <b>{number(percent(c, a))}%</b>
                    </div>
                    <Bar
                      value={percent(c, a)}
                      label={`دقة السلسلة ${number(s.number)}`}
                    />
                  </div>
                ) : null;
              })}
            </section>
          </div>
        </>
      )}
      <div className="section-title">
        <h2>نتائج التدريبات الأخيرة</h2>
      </div>
      {!progress.results.length ? (
        <p className="notice">أكمل تدريبًا كاملًا لحفظ نتيجته هنا.</p>
      ) : (
        <div className="panel">
          {progress.results
            .slice(-10)
            .reverse()
            .map((r) => (
              <div className="stat-line" key={r.id}>
                <div className="stat-line-top">
                  <span>
                    {r.label} · {dateLabel(r.date)}
                  </span>
                  <b>{number(percent(r.correct, r.total))}%</b>
                </div>
                <small>
                  {number(r.correct)} صحيحة من {number(r.total)} سؤالًا
                </small>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
