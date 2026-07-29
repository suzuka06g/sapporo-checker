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
  console.log("タイトル:", await page.title());

  await browser.close();
})();
