import { latinDigits } from "./numbers";
import type { Answer, Progress, Question, RecordProgress } from "../types";
export const blankProgress = (): Progress => ({
  version: 1,
  records: {},
  results: [],
  session: null,
  settings: { focusWeak: false },
});
export const blankRecord = (): RecordProgress => ({
  attempts: 0,
  correct: 0,
  wrong: 0,
  lastAttempt: "",
  lastSelected: [],
  lastWrong: [],
  lastWrongAt: null,
  mastered: false,
  bookmarked: false,
});
export function equalAnswers(
  a: readonly number[],
  b: readonly number[],
): boolean {
  return (
    a.length > 0 &&
    a.length === b.length &&
    new Set(a).size === a.length &&
    new Set(b).size === b.length &&
    a.every((x) => b.includes(x))
  );
}
export function recordAnswer(
  previous: RecordProgress | undefined,
  selected: Answer[],
  correct: Answer[],
  now = new Date().toISOString(),
): RecordProgress {
  const r = previous ?? blankRecord();
  const ok = equalAnswers(selected, correct);
  return {
    ...r,
    attempts: r.attempts + 1,
    correct: r.correct + Number(ok),
    wrong: r.wrong + Number(!ok),
    lastAttempt: now,
    lastSelected: [...selected],
    lastWrong: ok ? r.lastWrong : [...selected],
    lastWrongAt: ok ? r.lastWrongAt : now,
    mastered: ok,
  };
}
export function weakWeight(
  r: RecordProgress | undefined,
  now = Date.now(),
): number {
  if (!r) return 1;
  const age = r.lastWrongAt
    ? Math.max(0, (now - Date.parse(r.lastWrongAt)) / 86400000)
    : Infinity;
  return (
    1 +
    Math.max(0, r.wrong - r.correct) * 3 +
    (r.mastered ? 0 : 2) +
    (age < 7 ? 3 : age < 30 ? 1 : 0)
  );
}
export function selectQuestions(
  pool: Question[],
  count: number,
  records: Progress["records"],
  weak = false,
  random = Math.random,
): Question[] {
  return pool
    .map((q) => ({
      q,
      key: Math.pow(
        Math.max(Number.EPSILON, random()),
        1 / (weak ? weakWeight(records[q.id]) : 1),
      ),
    }))
    .sort((a, b) => b.key - a.key)
    .slice(0, Math.max(0, count))
    .map((x) => x.q);
}
export function score(
  questions: Question[],
  answers: Record<string, Answer[]>,
) {
  const wrongIds = questions
    .filter((q) => !equalAnswers(answers[q.id] ?? [], q.correctAnswers))
    .map((q) => q.id);
  return {
    total: questions.length,
    correct: questions.length - wrongIds.length,
    wrongIds,
  };
}
const object = (x: unknown): x is Record<string, unknown> =>
  !!x && typeof x === "object" && !Array.isArray(x);
const answerArray = (x: unknown) =>
  Array.isArray(x) &&
  x.length <= 4 &&
  new Set(x).size === x.length &&
  x.every((n) => Number.isInteger(n) && n >= 1 && n <= 4);
const integer = (x: unknown) => Number.isSafeInteger(x) && Number(x) >= 0;
const date = (x: unknown) =>
  typeof x === "string" && Number.isFinite(Date.parse(x));
export function validateBackup(
  input: unknown,
  validIds: ReadonlySet<string>,
): Progress {
  if (
    !object(input) ||
    input.version !== 1 ||
    !object(input.records) ||
    !Array.isArray(input.results) ||
    !object(input.settings) ||
    typeof input.settings.focusWeak !== "boolean"
  )
    throw new Error("ملف النسخة الاحتياطية غير صالح أو إصداره غير مدعوم.");
  if (
    Object.keys(input.records).length > 100000 ||
    input.results.length > 10000
  )
    throw new Error("حجم البيانات يتجاوز الحد المسموح.");
  const records: Progress["records"] = {};
  for (const [id, r] of Object.entries(input.records)) {
    if (!validIds.has(id))
      throw new Error("تحتوي النسخة على أسئلة غير موجودة في هذا التطبيق.");
    if (
      !object(r) ||
      !integer(r.attempts) ||
      !integer(r.correct) ||
      !integer(r.wrong) ||
      Number(r.attempts) !== Number(r.correct) + Number(r.wrong) ||
      !answerArray(r.lastSelected) ||
      !answerArray(r.lastWrong) ||
      typeof r.mastered !== "boolean" ||
      typeof r.bookmarked !== "boolean" ||
      !(r.lastAttempt === "" || date(r.lastAttempt)) ||
      !(r.lastWrongAt === null || date(r.lastWrongAt))
    )
      throw new Error("بيانات تقدم أحد الأسئلة غير صالحة.");
    records[id] = {
      attempts: Number(r.attempts),
      correct: Number(r.correct),
      wrong: Number(r.wrong),
      lastAttempt: r.lastAttempt as string,
      lastSelected: r.lastSelected as Answer[],
      lastWrong: r.lastWrong as Answer[],
      lastWrongAt: r.lastWrongAt as string | null,
      mastered: r.mastered,
      bookmarked: r.bookmarked,
    };
  }
  const results: Progress["results"] = [];
  for (const r of input.results) {
    if (
      !object(r) ||
      typeof r.id !== "string" ||
      typeof r.label !== "string" ||
      r.label.length > 200 ||
      !(r.seriesId === null || typeof r.seriesId === "string") ||
      !date(r.date) ||
      !integer(r.correct) ||
      !integer(r.total) ||
      Number(r.total) === 0 ||
      Number(r.correct) > Number(r.total) ||
      !Array.isArray(r.questionIds) ||
      !Array.isArray(r.wrongIds) ||
      !r.questionIds.every(
        (id) => typeof id === "string" && validIds.has(id),
      ) ||
      new Set(r.questionIds).size !== r.questionIds.length ||
      r.questionIds.length !== r.total ||
      !r.wrongIds.every(
        (id) => r.questionIds instanceof Array && r.questionIds.includes(id),
      ) ||
      new Set(r.wrongIds).size !== r.wrongIds.length ||
      r.wrongIds.length !== Number(r.total) - Number(r.correct)
    )
      throw new Error("نتائج الاختبارات في النسخة غير صالحة.");
    results.push({
      ...(r as unknown as Progress["results"][number]),
      label: latinDigits(r.label),
    });
  }
  let session: Progress["session"] = null;
  if (input.session !== null) {
    const s = input.session;
    if (
      !object(s) ||
      !Array.isArray(s.ids) ||
      !s.ids.length ||
      !s.ids.every((id) => typeof id === "string" && validIds.has(id)) ||
      new Set(s.ids).size !== s.ids.length ||
      !integer(s.index) ||
      Number(s.index) >= s.ids.length ||
      !object(s.answers) ||
      typeof s.label !== "string" ||
      s.label.length > 200 ||
      !(s.seriesId === null || typeof s.seriesId === "string") ||
      !date(s.startedAt)
    )
      throw new Error("جلسة التدريب المحفوظة غير صالحة.");
    for (const [id, a] of Object.entries(s.answers)) {
      if (!s.ids.includes(id) || !answerArray(a) || !(a as unknown[]).length)
        throw new Error("إجابات الجلسة غير صالحة.");
    }
    session = {
      ids: s.ids as string[],
      index: Number(s.index),
      answers: s.answers as Record<string, Answer[]>,
      label: latinDigits(s.label),
      seriesId: s.seriesId as string | null,
      startedAt: s.startedAt as string,
    };
  }
  return {
    version: 1,
    records,
    results,
    session,
    settings: { focusWeak: input.settings.focusWeak },
  };
}
