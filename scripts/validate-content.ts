import { validateQuestions } from "../src/lib/content-validation";
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
const errors = validateQuestions(
  questions,
  series,
  (image) => existsSync(resolve("public", image.slice(1))),
  Object.keys(topics),
);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `ØªÙ… Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† ${questions.length} Ø³Ø¤Ø§Ù„Ù‹Ø§ Ùˆ${series.length} Ø³Ù„Ø³Ù„Ø©. ${questions.filter((q) => q.needsReview).length} Ø³Ø¤Ø§Ù„Ù‹Ø§ Ù…Ø¹Ø²ÙˆÙ„Ù‹Ø§ Ù„Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©.`,
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
