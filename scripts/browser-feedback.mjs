import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://127.0.0.1:3000/series/");
await page
  .locator(".series-card")
  .filter({
    has: page.getByRole("heading", { name: "السلسلة 2", exact: true }),
  })
  .getByRole("button", { name: "ابدأ التدريب" })
  .click();
await page.getByRole("button", { name: "الإجابة 1", exact: true }).click();
await page.getByRole("button", { name: "تأكيد الإجابة" }).click();
await page.getByText("إجابة خاطئة", { exact: false }).waitFor();
await page.screenshot({
  path: "reports/screenshots/quiz-feedback-mobile.png",
  fullPage: true,
});
await page.setViewportSize({ width: 1440, height: 1000 });
await page.screenshot({
  path: "reports/screenshots/quiz-feedback-desktop.png",
  fullPage: true,
});
console.log(
  await page
    .locator(".answer-button.correct")
    .evaluate((e) => ({
      opacity: getComputedStyle(e).opacity,
      color: getComputedStyle(e).color,
      background: getComputedStyle(e).backgroundColor,
    })),
);
await browser.close();
