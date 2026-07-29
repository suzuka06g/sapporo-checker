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
  
const link = page.getByText("施設一覧・検索へ");

await link.click();

await page.waitForTimeout(3000);

console.log("施設検索ページへ移動しました！");
console.log("URL:", page.url());

const text = await page.locator("body").innerText();

console.log(text.slice(0, 500));
  
  await browser.close();
})();
