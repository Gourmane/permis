import { writeFileSync } from "node:fs";
import { emptyPlayableSeries } from "../src/lib/session";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { topics } from "../src/lib/content";
import type { Question, Series } from "../src/types";
const questions = JSON.parse(
  readFileSync("src/data/questions.generated.json", "utf8").replace(
    /^\uFEFF/,
    "",
  ),
) as Question[];
const series = JSON.parse(
  readFileSync("src/data/series.generated.json", "utf8").replace(/^\uFEFF/, ""),
) as Series[];
const ids = new Set<string>(),
  pairs = new Set<string>(),
  seriesIds = new Set<string>();
const errors: string[] = [];
for (const s of series) {
  if (seriesIds.has(s.id)) errors.push(`سلسلة مكررة: ${s.id}`);
  seriesIds.add(s.id);
  if (
    !Number.isInteger(s.number) ||
    s.number < 1 ||
    s.id !== `series-${String(s.number).padStart(2, "0")}`
  )
    errors.push(`تعريف سلسلة غير صالح: ${s.id}`);
  if (questions.filter((q) => q.seriesId === s.id).length !== s.questionCount)
    errors.push(`عدد أسئلة السلسلة غير مطابق: ${s.id}`);
}
for (const q of questions) {
  if (ids.has(q.id)) errors.push(`معرّف مكرر: ${q.id}`);
  ids.add(q.id);
  const pair = `${q.seriesId}:${q.questionNumber}`;
  if (pairs.has(pair)) errors.push(`رقم سؤال مكرر: ${pair}`);
  pairs.add(pair);
  if (
    !seriesIds.has(q.seriesId) ||
    series.find((s) => s.id === q.seriesId)?.number !== q.seriesNumber
  )
    errors.push(`مرجع سلسلة غير صالح: ${q.id}`);
  if (!Number.isInteger(q.questionNumber) || q.questionNumber < 1)
    errors.push(`رقم سؤال غير صالح: ${q.id}`);
  if (
    !q.image?.startsWith("/questions/") ||
    q.image.includes("..") ||
    !existsSync(resolve("public", q.image.slice(1)))
  )
    errors.push(`صورة مفقودة: ${q.id}`);
  if (
    !Array.isArray(q.correctAnswers) ||
    q.correctAnswers.some((n) => ![1, 2, 3, 4].includes(n)) ||
    new Set(q.correctAnswers).size !== q.correctAnswers.length
  )
    errors.push(`إجابة غير صالحة: ${q.id}`);
  if (!q.correctAnswers.length && !q.needsReview)
    errors.push(`سؤال بدون إجابة وغير معلّم للمراجعة: ${q.id}`);
  if (
    !Number.isFinite(q.confidence) ||
    q.confidence < 0 ||
    q.confidence > 1 ||
    typeof q.needsReview !== "boolean" ||
    !(q.topic in topics)
  )
    errors.push(`بيانات وصفية غير صالحة: ${q.id}`);
  if (
    !Number.isFinite(q.questionTimestamp) ||
    q.questionTimestamp < 0 ||
    (!q.needsReview &&
      (q.answerTimestamp === null ||
        !Number.isFinite(q.answerTimestamp) ||
        q.answerTimestamp <= q.questionTimestamp))
  )
    errors.push(`توقيت غير صالح: ${q.id}`);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `تم التحقق من ${questions.length} سؤالًا و${series.length} سلسلة. ${questions.filter((q) => q.needsReview).length} سؤالًا معزولًا للمراجعة.`,
);

const blocked = emptyPlayableSeries(series, questions);
writeFileSync(
  "reports/content-integrity.json",
  JSON.stringify(
    {
      questions: questions.length,
      series: series.length,
      playableSeries: series.length - blocked.length,
      blockedSeries: blocked.map((s) => ({
        id: s.id,
        number: s.number,
        questionCount: s.questionCount,
        reason: "No verified answer keys",
      })),
    },
    null,
    2,
  ),
);
if (blocked.length) {
  console.warn(
    "CONTENT BLOCKER: zero playable questions in " +
      blocked.map((s) => s.id).join(", "),
  );
  if (process.argv.includes("--strict")) process.exit(1);
}
