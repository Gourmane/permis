"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { questions, number, answerLabel, topics } from "@/lib/content";
import { Heading, QuestionImage } from "@/components/ui";
function ContentReview() {
  const params = useSearchParams();
  const [pending, setPending] = useState(true);
  const [chosenSeries, setSeriesFilter] = useState<string | null>(null);
  const seriesFilter = chosenSeries ?? params.get("series") ?? "";
  const list = questions.filter(
    (q) =>
      (!pending || q.needsReview) &&
      (!seriesFilter || q.seriesId === seriesFilter),
  );
  return (
    <>
      <Heading
        title="مراجعة المحتوى"
        text="صفحة مراجعة للمطور. لا تدخل الأسئلة غير المؤكدة في التدريب."
      />
      <p className="notice warning">
        السلسلة التي لا تحتوي على إجابات مؤكدة لا يمكن تصحيحها أو احتساب
        نتيجتها. راجع الشرح في المصدر قبل اعتماد الإجابات.
      </p>
      <label className="field">
        السلسلة
        <select
          value={seriesFilter}
          onChange={(e) => setSeriesFilter(e.target.value)}
        >
          <option value="">كل السلاسل</option>
          {Array.from(new Set(questions.map((q) => q.seriesId))).map((id) => (
            <option key={id} value={id}>
              السلسلة{" "}
              {number(questions.find((q) => q.seriesId === id)!.seriesNumber)}
            </option>
          ))}
        </select>
      </label>
      <label className="check-field">
        <input
          type="checkbox"
          checked={pending}
          onChange={(e) => setPending(e.target.checked)}
        />
        الأسئلة التي تحتاج مراجعة فقط
      </label>
      <p>{number(list.length)} سؤالًا</p>
      <div className="review-list">
        {list.map((q) => (
          <article className="panel" key={q.id}>
            <QuestionImage
              src={q.image}
              lazy
              alt={`السلسلة ${number(q.seriesNumber)}، السؤال ${number(q.questionNumber)}`}
            />
            <h3 style={{ marginTop: 16 }}>
              السلسلة {number(q.seriesNumber)} · السؤال{" "}
              {number(q.questionNumber)}
            </h3>
            <dl className="review-data">
              <dt>الإجابة المستخرجة</dt>
              <dd>{answerLabel(q.correctAnswers)}</dd>
              <dt>الموضوع</dt>
              <dd>{topics[q.topic]}</dd>
              <dt>الفيديو الأصلي</dt>
              <dd>{q.sourceVideo}</dd>
              <dt>ظهور السؤال / كشف الإجابة، بالثواني</dt>
              <dd>
                {number(q.questionTimestamp)} /{" "}
                {q.answerTimestamp === null
                  ? "غير محدد"
                  : number(q.answerTimestamp)}
              </dd>
              <dt>الثقة في الاستخراج</dt>
              <dd>
                {number(Math.round(q.confidence * 100))}% ·{" "}
                {q.needsReview ? "يحتاج مراجعة" : "تم التحقق بصريًا"}
              </dd>
              {q.notes && (
                <>
                  <dt>ملاحظات</dt>
                  <dd>{q.notes}</dd>
                </>
              )}
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p role="status">جارٍ تحميل المحتوى…</p>}>
      <ContentReview />
    </Suspense>
  );
}
