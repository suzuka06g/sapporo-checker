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

  const frame = page.frameLocator("#main-iframe");

const text = await frame.locator("body").innerText();

console.log("iframe文字数:", text.length);
console.log(text.slice(0, 500));

  await browser.close();
})();
