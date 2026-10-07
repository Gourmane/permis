export type Answer = 1 | 2 | 3 | 4;
export type Topic =
  | "signs"
  | "priorities"
  | "lights"
  | "speed"
  | "overtaking"
  | "parking"
  | "position"
  | "distance"
  | "motorways"
  | "pedestrians"
  | "mechanics"
  | "equipment"
  | "documents"
  | "penalties"
  | "safety"
  | "environment"
  | "other";
export interface Question {
  id: string;
  seriesId: string;
  seriesNumber: number;
  questionNumber: number;
  image: string;
  correctAnswers: Answer[];
  topic: Topic;
  sourceVideo: string;
  questionTimestamp: number;
  answerTimestamp: number | null;
  confidence: number;
  needsReview: boolean;
  notes?: string;
}
export interface Series {
  id: string;
  number: number;
  sourceVideo: string;
  questionCount: number;
}
export interface RecordProgress {
  attempts: number;
  correct: number;
  wrong: number;
  lastAttempt: string;
  lastSelected: Answer[];
  lastWrong: Answer[];
  lastWrongAt: string | null;
  mastered: boolean;
  bookmarked: boolean;
}
export interface Result {
  id: string;
  seriesId: string | null;
  label: string;
  date: string;
  questionIds: string[];
  wrongIds: string[];
  correct: number;
  total: number;
}
export interface Session {
  ids: string[];
  index: number;
  answers: Record<string, Answer[]>;
  label: string;
  seriesId: string | null;
  startedAt: string;
}
export interface Progress {
  version: 1;
  records: Record<string, RecordProgress>;
  results: Result[];
  session: Session | null;
  settings: { focusWeak: boolean };
}
