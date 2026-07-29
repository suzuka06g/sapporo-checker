const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844
    }
  });

  await page.goto(
    "https://yoyaku.harp.lg.jp/sapporo/",
    {
      waitUntil: "networkidle",
      timeout: 60000
    }
  );

  console.log("ページを開きました！");

  await page.waitForTimeout(5000);

  const html = await page.content();

  console.log("HTML文字数:", html.length);
  console.log(html.slice(0, 300));
  
const links = await page.locator("a").allInnerTexts();

console.log("リンク一覧:");
console.log(links.slice(0, 30));
  
  await browser.close();
})();
