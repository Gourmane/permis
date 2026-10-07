import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { questions, series, topics, seriesQuestions } from "../src/lib/content";
import { equalAnswers, score, recordAnswer } from "../src/lib/logic";
import { validateQuestions } from "../src/lib/content-validation";
import type { Answer, Question } from "../src/types";

const observed = JSON.parse(
  readFileSync("reports/answer-audit-observations.json", "utf8").replace(
    /^\uFEFF/,
    "",
  ),
) as Record<string, string[]>;
test("all 380 audited keys and all series scores match independent visual transcriptions", () => {
  let checked = 0;
  for (let n = 2; n <= 14; n++) {
    const list = seriesQuestions("series-" + String(n).padStart(2, "0"));
    assert.equal(list.length, n <= 7 ? 40 : 20);
    const answers: Record<string, Answer[]> = {};
    for (const q of list) {
      const expected = [...observed[n][q.questionNumber - 1]].map(
        Number,
      ) as Answer[];
      assert.deepEqual(q.correctAnswers, expected, q.id);
      assert.equal(
        q.id,
        "s" +
          String(n).padStart(2, "0") +
          "-q" +
          String(q.questionNumber).padStart(3, "0"),
      );
      assert.equal(q.needsReview, false);
      answers[q.id] = [...expected].reverse();
      // Every possible selection: no subset, superset, or other set can pass.
      for (let mask = 0; mask < 16; mask++) {
        const selected = [1, 2, 3, 4].filter((v) => mask & (1 << (v - 1)));
        assert.equal(
          equalAnswers(selected, expected),
          selected.join(",") === expected.join(","),
          q.id + ":" + mask,
        );
      }
      checked++;
    }
    assert.deepEqual(score(list, answers), {
      total: list.length,
      correct: list.length,
      wrongIds: [],
    });
  }
  assert.equal(checked, 380);
});
test("Series 3 Q21/Q31 accept the video answer and reject the previous key", () => {
  for (const number of [21, 31]) {
    const q = questions.find(
      (q) => q.id === "s03-q" + String(number).padStart(3, "0"),
    )!;
    assert.deepEqual(q.correctAnswers, [1, 4]);
    assert.equal(recordAnswer(undefined, [4, 1], q.correctAnswers).correct, 1);
    assert.equal(recordAnswer(undefined, [2, 4], q.correctAnswers).wrong, 1);
  }
});
test("answer comparison normalizes duplicates and rejects empty or invalid values", () => {
  assert.equal(equalAnswers([3, 1, 3], [1, 3]), true);
  assert.equal(equalAnswers([1], [1, 1]), true);
  for (const bad of [[], [0], [5], [1.5], [NaN], [1, 3, 9]])
    assert.equal(equalAnswers(bad, bad), false);
  assert.equal(equalAnswers([1], [1, 3]), false);
  assert.equal(equalAnswers([1, 2, 3], [1, 3]), false);
});
const validate = (qs: Question[], exists = true) =>
  validateQuestions(qs, series, () => exists, Object.keys(topics));
test("integrity catches duplicate IDs/numbers, gaps, invalid/duplicate/empty keys and wrong image/source mapping", () => {
  assert.deepEqual(validate(questions), []);
  const index = questions.findIndex((q) => q.id === "s03-q021");
  const changed = (patch: Partial<Question>) =>
    questions.map((q, i) => (i === index ? { ...q, ...patch } : q));
  for (const patch of [
    { id: "s03-q020" },
    { questionNumber: 20 },
    { questionNumber: 41 },
    { seriesNumber: 0 },
    { correctAnswers: [0] as unknown as Answer[] },
    { correctAnswers: [5] as unknown as Answer[] },
    { correctAnswers: [1, 1] as Answer[] },
    { correctAnswers: [4, 1] as Answer[] },
    { correctAnswers: [] },
    { image: "/questions/series-03/question-022.webp" },
    { sourceVideo: "wrong.mp4" },
  ])
    assert.ok(validate(changed(patch)).length > 0, JSON.stringify(patch));
  assert.ok(
    validate(questions.filter((q) => q.id !== "s03-q021")).some((e) =>
      e.includes("gap"),
    ),
  );
  assert.ok(validate(questions, false).length > 0);
  assert.ok(
    validateQuestions(
      questions,
      [...series, series[2]],
      () => true,
      Object.keys(topics),
    ).some((e) => e.includes("Duplicate series number")),
  );
});
