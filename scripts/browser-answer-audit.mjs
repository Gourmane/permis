import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const observed = JSON.parse(
  (await fs.readFile("reports/answer-audit-observations.json", "utf8")).replace(
    /^\uFEFF/,
    "",
  ),
);
const content = JSON.parse(
  await fs.readFile("src/data/questions.generated.json", "utf8"),
);
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const results = [];
const errors = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1366, height: 768 },
  });
  page.on("pageerror", (e) => errors.push(e.message));
  for (let n = 2; n <= 14; n++) {
    await page.goto(
      (process.env.AUDIT_URL || "http://127.0.0.1:3117") + "/series/",
    );
    await page
      .locator(".series-card")
      .filter({
        has: page.getByRole("heading", { name: "السلسلة " + n, exact: true }),
      })
      .getByRole("button", { name: "ابدأ التدريب" })
      .click();
    const list = content.filter((q) => q.seriesNumber === n);
    for (const [i, q] of list.entries()) {
      const confirm = page.getByRole("button", {
        name: "تأكيد الإجابة",
        exact: true,
      });
      await confirm.waitFor();
      assert.equal(
        await page
          .locator(".quiz-main .question-image img")
          .getAttribute("src"),
        q.image,
      );
      await page
        .locator(".quiz-main .question-image img")
        .evaluate((img) => img.decode());
      if (i === 0) {
        for (const a of [1, 2, 3, 4]) {
          const button = page.getByRole("button", {
            name: "الإجابة " + a,
            exact: true,
          });
          assert.equal((await button.innerText()).trim(), String(a));
          await button.click();
          assert.equal(await button.getAttribute("aria-pressed"), "true");
          for (const other of [1, 2, 3, 4].filter((v) => v !== a))
            assert.equal(
              await page
                .getByRole("button", { name: "الإجابة " + other, exact: true })
                .getAttribute("aria-pressed"),
              "false",
            );
          await button.click();
        }
      }
      const selected = [...observed[n][i]].map(Number).reverse();
      for (const a of selected)
        await page
          .getByRole("button", { name: "الإجابة " + a, exact: true })
          .click();
      await confirm.click();
      await page.getByText("إجابة صحيحة", { exact: true }).waitFor();
      const saved = await page.evaluate(
        () =>
          new Promise((resolve, reject) => {
            const request = indexedDB.open("tariqi-progress", 1);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
              const db = request.result;
              const get = db
                .transaction("state", "readonly")
                .objectStore("state")
                .get("progress");
              get.onsuccess = () => {
                resolve(get.result);
                db.close();
              };
              get.onerror = () => {
                reject(get.error);
                db.close();
              };
            };
          }),
      );
      assert.equal(saved.session.ids[i], q.id);
      assert.deepEqual(saved.session.answers[q.id], selected);
      assert.deepEqual(saved.records[q.id].lastSelected, selected);
      assert.equal(saved.records[q.id].mastered, true);
      await page
        .getByRole("button", {
          name: i === list.length - 1 ? "إنهاء التدريب" : "السؤال التالي",
          exact: true,
        })
        .click();
    }
    await page.getByRole("heading", { name: "أحسنت إكمال التدريب" }).waitFor();
    assert.equal(
      await page.locator(".result-score strong").innerText(),
      list.length + "/" + list.length,
    );
    results.push({ series: n, checked: list.length, correct: list.length });
    console.log(
      "PASS Series " +
        n +
        ": " +
        list.length +
        " images, saved ID/value mappings, and video-observed answers",
    );
  }
  assert.deepEqual(errors, []);
  await fs.writeFile(
    "reports/answer-audit-browser.json",
    JSON.stringify({ questions: 380, results, errors }, null, 2),
  );
} finally {
  await browser.close();
}
