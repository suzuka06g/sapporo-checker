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

  const html = await page.content();

console.log("HTML文字数:", html.length);
console.log(html.slice(0, 500));

  await browser.close();
})();
