import raw from "@/data/questions.generated.json";
import seriesRaw from "@/data/series.generated.json";
import type { Question, Series, Topic } from "@/types";
export const questions = raw as Question[];
export const series = seriesRaw as Series[];
export const available = questions.filter(
  (q) => !q.needsReview && q.correctAnswers.length > 0,
);
export const byId = new Map(questions.map((q) => [q.id, q]));
export const topics: Record<Topic, string> = {
  signs: "علامات التشوير",
  priorities: "الأسبقية والتقاطعات",
  lights: "الإشارات الضوئية",
  speed: "السرعة",
  overtaking: "التجاوز",
  parking: "الوقوف والتوقف",
  position: "وضعية السير",
  distance: "مسافة الأمان",
  motorways: "الطرق السيارة",
  pedestrians: "الراجلون والدراجات",
  mechanics: "ميكانيك السيارة",
  equipment: "تجهيزات السيارة",
  documents: "الوثائق والإجراءات",
  penalties: "المخالفات والعقوبات",
  safety: "السلامة",
  environment: "السياقة الاقتصادية",
  other: "أسئلة متنوعة",
};
export { number, dateLabel, answerLabel, ratio } from "./numbers";
export const percent = (a: number, b: number) =>
  b ? Math.round((a / b) * 100) : 0;
/** Canonical IDs are preserved so existing question records stay valid. */
export const seriesQuestions = (id: string): Question[] =>
  available
    .filter((q) => q.seriesId === id)
    .sort((a, b) => a.questionNumber - b.questionNumber);
export const blockedSeries = series.filter(
  (s) => !seriesQuestions(s.id).length,
);
