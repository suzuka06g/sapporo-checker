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

  console.log("タイトル:", await page.title());

  await page.waitForTimeout(10000);

  const link = page.getByText("施設一覧・検索へ");

  await link.click();

  await page.waitForTimeout(3000);

  console.log("施設検索ページへ移動しました！");
  console.log("URL:", page.url());

  const frames = page.frames();

console.log("iframe数:", frames.length);

for (const frame of frames) {
  console.log("frame URL:", frame.url());
}

  const placeholders = await page.locator("input").evaluateAll((els) =>
  els.map((e, i) => ({
    index: i,
    type: e.type,
    placeholder: e.placeholder
  }))
);

console.log("入力欄詳細:");
console.log(placeholders);

const buttons = await page.locator("button").allInnerTexts();

console.log("ボタン:");
console.log(buttons);

  const links = await page.locator("a").allInnerTexts();

console.log("リンク一覧:");
console.log(links.slice(0, 50));

  console.log("HTML長さ:", (await page.content()).length);
  
  await browser.close();
})();
