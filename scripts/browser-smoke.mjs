import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel:
      process.env.PLAYWRIGHT_BROWSER_CHANNEL === "chromium"
        ? undefined
        : process.env.PLAYWRIGHT_BROWSER_CHANNEL || "chrome",
  });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    acceptDownloads: true,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const checks = [];
  const ok = (n) => {
    checks.push(n);
    console.log("PASS", n);
  };
  await page.goto("http://127.0.0.1:3000/series/");
  await page.getByRole("heading", { name: "سلاسل الامتحان" }).waitFor();
  const content = JSON.parse(
    await fs.readFile("src/data/questions.generated.json", "utf8"),
  );
  for (let n = 2; n <= 14; n++) {
    await page.goto("http://127.0.0.1:3000/series/");
    const card = page
      .locator(".series-card")
      .filter({
        has: page.getByRole("heading", { name: "السلسلة " + n, exact: true }),
      });
    await card.getByRole("button", { name: "ابدأ التدريب" }).click();
    await page.getByRole("button", { name: "تأكيد الإجابة" }).waitFor();
    const first = content.find((q) => q.seriesNumber === n && !q.needsReview);
    assert.equal(
      await page.locator(".quiz-main .question-image img").getAttribute("src"),
      first.image,
    );
    await page
      .locator(".quiz-main .question-image img")
      .evaluate((img) => img.decode());
    assert.ok(
      (await page.locator(".quiz-progress").innerText()).includes("1/"),
    );
  }
  ok("every playable series 2–14 starts at its first valid image");
  await page.goto("http://127.0.0.1:3000/series/");
  const blocked = page
    .locator(".series-card")
    .filter({
      has: page.getByRole("heading", { name: "السلسلة 1", exact: true }),
    });
  await blocked.getByRole("link", { name: "مراجعة محتوى السلسلة" }).click();
  await page
    .getByRole("heading", { name: "مراجعة المحتوى", exact: true })
    .waitFor();
  assert.equal(await page.locator(".review-list article").count(), 40);
  ok("Series 1 missing-answer blocker has actionable filtered review");
  await page.goto("http://127.0.0.1:3000/series/");
  await page
    .locator(".series-card")
    .filter({
      has: page.getByRole("heading", { name: "السلسلة 2", exact: true }),
    })
    .getByRole("button", { name: "ابدأ التدريب" })
    .click();
  await page.getByRole("button", { name: "تأكيد الإجابة" }).waitFor();
  await page.screenshot({
    path: "reports/screenshots/quiz-mobile.png",
    fullPage: true,
  });
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  assert.equal(
    await page.getByRole("button", { name: "تأكيد الإجابة" }).isEnabled(),
    false,
  );
  ok("RTL quiz and validate disabled without selection");
  await page.getByRole("button", { name: "الإجابة 1", exact: true }).click();
  await page.getByRole("button", { name: "الإجابة 3", exact: true }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "الإجابة 1", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  assert.equal(
    await page
      .getByRole("button", { name: "الإجابة 3", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  ok("multiple selection");
  await page.getByRole("button", { name: "الإجابة 3", exact: true }).click();
  await page.getByRole("button", { name: "حفظ السؤال", exact: true }).click();
  await page.getByRole("button", { name: "تأكيد الإجابة" }).click();
  await page.getByText("إجابة خاطئة", { exact: false }).waitFor();
  assert.ok(
    (await page.locator(".quiz-progress").innerText()).includes("السؤال 1/40"),
  );
  ok("wrong answer correction and no automatic advance");
  const correction = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "تنزيل التصحيح", exact: true })
    .click();
  const image = await correction;
  assert.ok(image.suggestedFilename().endsWith(".png"));
  await image.saveAs("reports/screenshots/downloaded-correction.png");
  ok("client-side correction PNG");
  await page
    .getByRole("button", { name: "السؤال التالي", exact: true })
    .click();
  await page.reload();
  await page.getByRole("button", { name: "تأكيد الإجابة" }).waitFor();
  assert.ok(
    (await page.locator(".quiz-progress").innerText()).includes("السؤال 2/40"),
  );
  ok("session survives refresh");
  await page.getByRole("button", { name: "السابق", exact: true }).click();
  await page.getByText("إجابة خاطئة", { exact: false }).waitFor();
  ok("previous question retains correction");
  await page.getByRole("button", { name: "تكبير", exact: true }).click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("1");
  assert.equal(await page.getByRole("dialog").count(), 1);
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  ok("zoom dialog, Escape and keyboard guard");
  await page.goto("http://127.0.0.1:3000/mistakes/");
  await page.getByRole("heading", { name: "أخطائي" }).waitFor();
  assert.equal(await page.locator(".mistake-card").count(), 1);
  assert.ok(
    (await page.locator(".mistake-card").innerText()).includes(
      "1 محاولة خاطئة",
    ),
  );
  ok("historical mistake card");
  const bulk = page.waitForEvent("download");
  await page.getByRole("button", { name: "تنزيل كل التصحيحات" }).click();
  assert.ok((await bulk).suggestedFilename().endsWith(".zip"));
  ok("bulk ZIP correction");
  await page.goto("http://127.0.0.1:3000/bookmarks/");
  await page
    .getByRole("button", { name: "تدرّب على السؤال", exact: true })
    .click();
  await page.getByRole("button", { name: "تأكيد الإجابة" }).waitFor();
  await page.getByRole("button", { name: "الإجابة 2", exact: true }).click();
  await page.keyboard.press("Enter");
  await page.getByText("إجابة صحيحة").waitFor();
  await page.getByRole("button", { name: "إنهاء التدريب" }).click();
  await page.getByRole("heading", { name: "أحسنت إكمال التدريب" }).waitFor();
  ok("keyboard answer and end-of-quiz scoring");
  await page.goto("http://127.0.0.1:3000/mistakes/");
  await page.getByText("تحسّنت إجابتي", { exact: true }).waitFor();
  assert.ok(
    (await page.locator(".mistake-card").innerText()).includes(
      "1 محاولة خاطئة",
    ),
  );
  ok("mastery retains mistake history");
  await page.goto("http://127.0.0.1:3000/settings/");
  await page
    .getByRole("button", { name: "تصدير التقدم", exact: true })
    .waitFor();
  const backupPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "تصدير التقدم", exact: true }).click();
  const backup = await backupPromise;
  await backup.saveAs("reports/browser-backup.json");
  const backupData = JSON.parse(
    await fs.readFile("reports/browser-backup.json", "utf8"),
  );
  assert.equal(backupData.records["s02-q001"].wrong, 1);
  assert.equal(backupData.records["s02-q001"].correct, 1);
  ok("progress JSON export");
  await page.locator("input[type=file]").setInputFiles({
    name: "bad.json",
    mimeType: "application/json",
    buffer: Buffer.from("{bad"),
  });
  await page
    .getByText("الملف ليس نسخة احتياطية سليمة.", { exact: false })
    .waitFor();
  ok("invalid import does not crash");
  await page.getByRole("button", { name: "حذف التقدم", exact: true }).click();
  await page.getByRole("button", { name: "إلغاء", exact: true }).click();
  await page
    .locator("input[type=file]")
    .setInputFiles("reports/browser-backup.json");
  await page
    .getByRole("button", { name: "استيراد واستبدال التقدم", exact: true })
    .click();
  await page.getByText("تم استيراد التقدم بنجاح.", { exact: true }).waitFor();
  ok("reset confirmation and valid restore");
  await page.getByRole("button", { name: "حذف التقدم", exact: true }).click();
  await page
    .getByRole("button", { name: "نعم، احذف التقدم", exact: true })
    .click();
  await page
    .getByText("تم حذف التقدم. يمكنك البدء من جديد.", { exact: true })
    .waitFor();
  await page.goto("http://127.0.0.1:3000/bookmarks/");
  await page.getByRole("heading", { name: "احفظ سؤالًا لتعود إليه" }).waitFor();
  await page.goto("http://127.0.0.1:3000/settings/");
  await page
    .locator("input[type=file]")
    .setInputFiles("reports/browser-backup.json");
  await page
    .getByRole("button", { name: "استيراد واستبدال التقدم", exact: true })
    .click();
  await page.getByText("تم استيراد التقدم بنجاح.", { exact: true }).waitFor();
  ok("reset clears state; import restores mistake and bookmark history");
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
    for (const route of [
      "/",
      "/series/",
      "/topics/",
      "/mistakes/",
      "/bookmarks/",
      "/statistics/",
      "/practice/",
      "/settings/",
    ]) {
      await page.goto("http://127.0.0.1:3000" + route);
      await page.locator(".loading").waitFor({ state: "hidden" });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert.equal(overflow, false, `Overflow at ${width} ${route}`);
      const text = await page.locator("main").innerText();
      assert.equal(
        /[٠-٩۰-۹]/.test(text),
        false,
        `Non-Latin digits at ${width} ${route}`,
      );
    }
  }
  ok(
    "all screens at 9 mobile/tablet/laptop/desktop sizes, no overflow or Arabic-Indic digits",
  );
  assert.deepEqual(errors, []);
  ok("no browser runtime errors");
  await fs.writeFile(
    "reports/browser-test-report.json",
    JSON.stringify({ checks, errors }, null, 2),
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
