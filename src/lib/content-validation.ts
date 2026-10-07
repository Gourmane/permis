import type { Question, Series } from "../types";
export function validateQuestions(
  questions: Question[],
  series: Series[],
  imageExists: (image: string) => boolean,
  topicIds: readonly string[],
): string[] {
  const ids = new Set<string>(),
    pairs = new Set<string>(),
    seriesIds = new Set<string>();
  const errors: string[] = [];
  const seriesNumbers = new Set<number>();
  for (const s of series) {
    if (seriesIds.has(s.id)) errors.push(`سلسلة مكررة: ${s.id}`);
    seriesIds.add(s.id);
    if (seriesNumbers.has(s.number))
      errors.push("Duplicate series number: " + s.number);
    seriesNumbers.add(s.number);
    if (
      !Number.isInteger(s.number) ||
      s.number < 1 ||
      s.id !== `series-${String(s.number).padStart(2, "0")}`
    )
      errors.push(`تعريف سلسلة غير صالح: ${s.id}`);
    if (questions.filter((q) => q.seriesId === s.id).length !== s.questionCount)
      errors.push(`عدد أسئلة السلسلة غير مطابق: ${s.id}`);
  }
  for (const s of series) {
    const list = questions.filter((q) => q.seriesId === s.id);
    const numbers = new Set(list.map((q) => q.questionNumber));
    for (let i = 1; i <= s.questionCount; i++)
      if (!numbers.has(i))
        errors.push("Question numbering gap: " + s.id + ":" + i);
    if (list.some((q) => q.questionNumber > s.questionCount))
      errors.push("Question number exceeds series count: " + s.id);
    if (
      !s.sourceVideo?.trim() ||
      list.some((q) => q.sourceVideo !== s.sourceVideo)
    )
      errors.push("Source video mismatch: " + s.id);
  }
  for (let i = 1; i <= series.length; i++)
    if (!seriesNumbers.has(i)) errors.push("Series numbering gap: " + i);
  for (const q of questions) {
    const canonicalId =
      "s" +
      String(q.seriesNumber).padStart(2, "0") +
      "-q" +
      String(q.questionNumber).padStart(3, "0");
    if (q.id !== canonicalId)
      errors.push("Question ID/number mismatch: " + q.id);
    const expectedImage =
      "/questions/" +
      q.seriesId +
      "/question-" +
      String(q.questionNumber).padStart(3, "0") +
      ".webp";
    if (q.image !== expectedImage)
      errors.push("Question image/number mismatch: " + q.id);
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
      !imageExists(q.image)
    )
      errors.push(`صورة مفقودة: ${q.id}`);
    if (
      !Array.isArray(q.correctAnswers) ||
      q.correctAnswers.some((n) => ![1, 2, 3, 4].includes(n)) ||
      new Set(q.correctAnswers).size !== q.correctAnswers.length
    )
      errors.push(`إجابة غير صالحة: ${q.id}`);
    if (
      Array.isArray(q.correctAnswers) &&
      q.correctAnswers.some(
        (value, i, values) => i > 0 && value <= values[i - 1],
      )
    )
      errors.push("Answer key must be sorted and unique: " + q.id);
    if (
      Array.isArray(q.correctAnswers) &&
      !q.correctAnswers.length &&
      !q.needsReview
    )
      errors.push(`سؤال بدون إجابة وغير معلّم للمراجعة: ${q.id}`);
    if (
      !Number.isFinite(q.confidence) ||
      q.confidence < 0 ||
      q.confidence > 1 ||
      typeof q.needsReview !== "boolean" ||
      !topicIds.includes(q.topic)
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
  return errors;
}
