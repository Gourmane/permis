import { test } from "node:test";
import assert from "node:assert/strict";
import {
  blankProgress,
  blankRecord,
  equalAnswers,
  recordAnswer,
  score,
  selectQuestions,
  validateBackup,
  weakWeight,
} from "../src/lib/logic";
import type { Question } from "../src/types";
const q = (
  id: string,
  answers: Question["correctAnswers"] = [1],
): Question => ({
  id,
  seriesId: "series-01",
  seriesNumber: 1,
  questionNumber: 1,
  image: "/questions/a.webp",
  correctAnswers: answers,
  topic: "other",
  sourceVideo: "a.mp4",
  questionTimestamp: 1,
  answerTimestamp: 3,
  confidence: 1,
  needsReview: false,
});
test("multiple answers require exact membership, not order", () => {
  assert.equal(equalAnswers([3, 1], [1, 3]), true);
  assert.equal(equalAnswers([1], [1, 3]), false);
  assert.equal(equalAnswers([1, 3, 4], [1, 3]), false);
  assert.equal(equalAnswers([1, 1], [1, 3]), false);
  assert.equal(equalAnswers([], []), false);
});
test("history survives a later correct answer and bookmark", () => {
  let r = recordAnswer(
    { ...blankRecord(), bookmarked: true },
    [2],
    [1],
    "2026-01-01T00:00:00Z",
  );
  r = recordAnswer(r, [1], [1], "2026-01-02T00:00:00Z");
  assert.equal(r.attempts, 2);
  assert.equal(r.wrong, 1);
  assert.equal(r.correct, 1);
  assert.deepEqual(r.lastWrong, [2]);
  assert.equal(r.lastWrongAt, "2026-01-01T00:00:00Z");
  assert.equal(r.mastered, true);
  assert.equal(r.bookmarked, true);
  assert.deepEqual(r.lastSelected, [1]);
});
test("new incorrect answer changes mastery and updates latest wrong", () => {
  let r = recordAnswer(undefined, [1], [1]);
  r = recordAnswer(r, [3, 4], [1]);
  assert.equal(r.mastered, false);
  assert.deepEqual(r.lastWrong, [3, 4]);
});
test("score handles unanswered questions and multiple choices", () =>
  assert.deepEqual(
    score([q("a", [1, 3]), q("b"), q("c")], { a: [3, 1], b: [2] }),
    { total: 3, correct: 1, wrongIds: ["b", "c"] },
  ));
test("weak weighting prioritizes recent repeated mistakes", () => {
  const now = Date.parse("2026-01-08T00:00:00Z");
  const bad = recordAnswer(undefined, [2], [1], "2026-01-07T00:00:00Z");
  const good = recordAnswer(undefined, [1], [1], "2026-01-07T00:00:00Z");
  assert.ok(weakWeight(bad, now) > weakWeight(good, now));
  assert.ok(
    weakWeight(bad, now) >
      weakWeight({ ...bad, lastWrongAt: "2025-01-01T00:00:00Z" }, now),
  );
});
test("sampling has no duplicates and preserves correct mappings", () => {
  const pool = [q("a", [1, 3]), q("b"), q("c")];
  const original = structuredClone(pool);
  const selected = selectQuestions(pool, 99, {}, true, () => 0.5);
  assert.equal(selected.length, 3);
  assert.equal(new Set(selected.map((q) => q.id)).size, 3);
  assert.deepEqual(pool, original);
  assert.equal(selectQuestions(pool, 0, {}).length, 0);
});
test("weighted sampling gives weak questions greater chance", () => {
  let n = 0;
  let chosen = 0;
  const records = {
    a: recordAnswer(undefined, [2], [1]),
    b: recordAnswer(undefined, [1], [1]),
  };
  const random = () => {
    n = (n * 1664525 + 1013904223) >>> 0;
    return n / 4294967296;
  };
  for (let i = 0; i < 1000; i++)
    if (
      selectQuestions([q("a"), q("b")], 1, records, true, random)[0].id === "a"
    )
      chosen++;
  assert.ok(chosen > 650);
});
test("backup round trip preserves history, session and results", () => {
  const p = blankProgress();
  p.records.a = recordAnswer(undefined, [2], [1]);
  p.session = {
    ids: ["a"],
    index: 0,
    answers: { a: [2] },
    label: "تدريب",
    seriesId: null,
    startedAt: "2026-01-01T00:00:00Z",
  };
  p.results = [
    {
      id: "r",
      seriesId: null,
      label: "تدريب",
      date: "2026-01-01T00:00:00Z",
      questionIds: ["a"],
      wrongIds: ["a"],
      correct: 0,
      total: 1,
    },
  ];
  assert.deepEqual(
    validateBackup(JSON.parse(JSON.stringify(p)), new Set(["a"])),
    p,
  );
});
test("malformed backups fail without partially changing progress", () => {
  const ids = new Set(["a"]);
  for (const bad of [
    null,
    [],
    {},
    { ...blankProgress(), version: 2 },
    { ...blankProgress(), records: { a: { ...blankRecord(), wrong: -1 } } },
    { ...blankProgress(), records: { unknown: blankRecord() } },
    {
      ...blankProgress(),
      records: { a: { ...blankRecord(), lastSelected: [5] } },
    },
    { ...blankProgress(), results: [{ id: "r" }] },
    { ...blankProgress(), session: { ids: ["a"], index: 99 } },
  ])
    assert.throws(() => validateBackup(bad, ids));
});
