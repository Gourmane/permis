import type { Question, Series } from "../types";
export function emptyPlayableSeries(
  series: readonly Series[],
  questions: readonly Question[],
): Series[] {
  const playable = new Set(
    questions
      .filter((q) => !q.needsReview && q.correctAnswers.length > 0)
      .map((q) => q.seriesId),
  );
  return series.filter((s) => !playable.has(s.id));
}
export function createSession(
  list: readonly Question[],
  label: string,
  seriesId: string | null = null,
) {
  if (
    !list.length ||
    new Set(list.map((q) => q.id)).size !== list.length ||
    list.some((q) => q.needsReview || !q.correctAnswers.length)
  )
    throw new Error("لا يحتوي التدريب على أسئلة بإجابات مؤكدة.");
  return {
    ids: list.map((q) => q.id),
    index: 0,
    answers: {},
    label,
    seriesId,
    startedAt: new Date().toISOString(),
  };
}
