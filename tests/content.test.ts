import { test } from "node:test";
import assert from "node:assert/strict";
import { questions, series, byId, seriesQuestions } from "../src/lib/content";
import {
  number,
  answerLabel,
  dateLabel,
  latinDigits,
  ratio,
} from "../src/lib/numbers";
import { createSession, emptyPlayableSeries } from "../src/lib/session";
import { blankProgress, validateBackup } from "../src/lib/logic";
test("all playable series initialize at their first valid question with stable IDs", () => {
  for (const s of series) {
    const list = seriesQuestions(s.id);
    if (!list.length) continue;
    const session = createSession(list, `السلسلة ${s.number}`, s.id);
    assert.equal(session.index, 0);
    assert.equal(byId.get(session.ids[0]), list[0]);
    assert.equal(list[0].questionNumber, 1);
    assert.equal(session.ids.length, s.questionCount);
    for (const id of session.ids) assert.equal(byId.get(id)?.seriesId, s.id);
  }
});
test("Series 1 root cause is missing verified answers, not ID/index mismatch", () => {
  const first = series.find((s) => s.number === 1)!;
  assert.equal(first.id, "series-01");
  assert.equal(questions.filter((q) => q.seriesId === first.id).length, 40);
  assert.equal(byId.get("s01-q001")?.seriesId, first.id);
  assert.deepEqual(
    emptyPlayableSeries(series, questions).map((s) => s.id),
    [first.id],
  );
  assert.throws(() =>
    createSession(seriesQuestions(first.id), "السلسلة 1", first.id),
  );
});
test("integrity detects any zero-playable series and unsafe initialization", () => {
  assert.equal(emptyPlayableSeries(series, []).length, series.length);
  const q = seriesQuestions("series-02")[0];
  assert.throws(() => createSession([q, q], "test"));
  assert.throws(() => createSession([{ ...q, needsReview: true }], "test"));
});
test("formatters always return Latin digits and ordered expressions", () => {
  assert.equal(number(2026), "2026");
  assert.equal(ratio(1, 40), "1/40");
  assert.equal(answerLabel([3, 1]), "1 + 3");
  assert.equal(latinDigits("السلسلة ٢ · ۳۶/۴۰"), "السلسلة 2 · 36/40");
  assert.equal(/[٠-٩۰-۹]/.test(dateLabel("2026-10-07")), false);
});
test("old backup labels migrate digits without changing IDs or history", () => {
  const p = blankProgress();
  p.session = {
    ids: ["s02-q001"],
    index: 0,
    answers: {},
    label: "السلسلة ٢",
    seriesId: "series-02",
    startedAt: new Date().toISOString(),
  };
  const safe = validateBackup(p, new Set(byId.keys()));
  assert.equal(safe.session?.label, "السلسلة 2");
  assert.deepEqual(safe.session?.ids, p.session.ids);
});
