const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(
    "https://yoyaku.harp.lg.jp/sapporo/",
    {
      waitUntil: "networkidle"
    }
  );

  console.log("ページを開きました！");

  const text = await page.locator("body").innerText();

console.log("取得した文字数:", text.length);
console.log("ここまで読めました！");

  await browser.close();
})();
