import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const browser = await chromium.launch({ headless: true, channel: "chrome" });
try {
  const page = await browser.newPage({
    viewport: { width: 1366, height: 768 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  const content = JSON.parse(
    await fs.readFile("src/data/questions.generated.json", "utf8"),
  );
  await page.goto("http://127.0.0.1:3000/series/");
  await page
    .locator(".series-card")
    .filter({
      has: page.getByRole("heading", { name: "السلسلة 2", exact: true }),
    })
    .getByRole("button", { name: "ابدأ التدريب" })
    .click();
  const list = content.filter(
    (q) => q.seriesId === "series-02" && !q.needsReview,
  );
  for (const [i, q] of list.entries()) {
    await page
      .getByRole("button", { name: "تأكيد الإجابة", exact: true })
      .waitFor();
    assert.equal(
      await page.locator(".quiz-main .question-image img").getAttribute("src"),
      q.image,
    );
    const selected = i === 9 ? [2] : q.correctAnswers;
    for (const a of selected)
      await page
        .getByRole("button", { name: "الإجابة " + a, exact: true })
        .click();
    await page
      .getByRole("button", { name: "تأكيد الإجابة", exact: true })
      .click();
    await page
      .getByText(i === 9 ? "إجابة خاطئة" : "إجابة صحيحة", { exact: true })
      .waitFor();
    await page
      .getByRole("button", {
        name: i === 39 ? "إنهاء التدريب" : "السؤال التالي",
        exact: true,
      })
      .click();
  }
  await page.getByRole("heading", { name: "أحسنت إكمال التدريب" }).waitFor();
  assert.equal(await page.locator(".result-score strong").innerText(), "39/40");
  assert.equal(await page.locator(".result-percent").innerText(), "98%");
  await page.reload();
  await page.getByRole("heading", { name: "أحسنت إكمال التدريب" }).waitFor();
  console.log(
    "PASS full series scoring, exact multi-answer correction, result survives refresh",
  );
  await fs.mkdir(".impeccable/review", { recursive: true });
  await page.screenshot({
    path: ".impeccable/review/results.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "تدريب أخطاء المحاولة" }).click();
  await page
    .getByRole("button", { name: "تأكيد الإجابة", exact: true })
    .waitFor();
  assert.equal(
    await page.locator(".quiz-main .question-image img").getAttribute("src"),
    list[9].image,
  );
  console.log("PASS wrong-only result practice");
  for (const [width, height] of [
    [360, 800],
    [375, 812],
    [390, 844],
    [412, 915],
    [430, 932],
    [768, 1024],
    [1366, 768],
    [1440, 900],
    [1920, 1080],
  ]) {
    await page.setViewportSize({ width, height });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `quiz overflow ${width}`,
    );
    assert.equal(
      /[٠-٩۰-۹]/.test(await page.locator("main").innerText()),
      false,
    );
    await page
      .locator(".quiz-main .question-image img")
      .evaluate((img) => img.decode());
    const dimensions = await page
      .locator(".quiz-main .question-image img")
      .evaluate((img) => ({
        shown: img.clientWidth,
        natural: img.naturalWidth,
      }));
    assert.ok(
      dimensions.shown <= dimensions.natural + 1,
      `oversized source image ${width}`,
    );
  }
  console.log("PASS quiz at all 9 sizes, source image never upscaled");
  await page.goto("http://127.0.0.1:3000/topics/");
  await page
    .locator(".topic-row")
    .first()
    .getByRole("button", { name: "ابدأ التدريب" })
    .click();
  await page
    .getByRole("button", { name: "تأكيد الإجابة", exact: true })
    .waitFor();
  console.log("PASS topic practice starts");
  await page.goto("http://127.0.0.1:3000/practice/");
  await page.getByRole("button", { name: "10", exact: true }).click();
  await page.getByRole("button", { name: "ابدأ 10 سؤالًا" }).click();
  await page
    .getByRole("button", { name: "تأكيد الإجابة", exact: true })
    .waitFor();
  assert.ok(
    (await page.locator(".quiz-progress").innerText()).includes("1/10"),
  );
  console.log("PASS mixed practice starts");
  await page.goto("http://127.0.0.1:3000/mistakes/");
  await page
    .getByRole("button", { name: "تدرّب على أخطائي", exact: true })
    .click();
  await page
    .getByRole("button", { name: "تأكيد الإجابة", exact: true })
    .waitFor();
  console.log("PASS mistake practice starts");
  await page.goto("http://127.0.0.1:3000/statistics/");
  await page.getByRole("heading", { name: "إحصائياتي", exact: true }).waitFor();
  assert.ok((await page.locator("main").innerText()).includes("98%"));
  console.log("PASS statistics reflect the full series");
  assert.deepEqual(errors, []);
  await fs.writeFile(
    "reports/quiz-test-report.json",
    JSON.stringify(
      { correct: 39, total: 40, wrongId: list[9].id, viewports: 9, errors },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
