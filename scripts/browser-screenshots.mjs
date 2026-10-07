import { chromium } from "playwright";
import fs from "node:fs/promises";
(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel:
      process.env.PLAYWRIGHT_BROWSER_CHANNEL === "chromium"
        ? undefined
        : process.env.PLAYWRIGHT_BROWSER_CHANNEL || "chrome",
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1050 },
  });
  await page.goto("http://127.0.0.1:3000");
  await page.getByRole("heading", { name: "مرحبًا بك في طريقي" }).waitFor();
  await fs.mkdir("reports/screenshots", { recursive: true });
  await page.screenshot({
    path: "reports/screenshots/desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "reports/screenshots/mobile.png",
    fullPage: true,
  });
  console.log("Screenshots ready");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
