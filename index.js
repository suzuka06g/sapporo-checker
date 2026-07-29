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
    "https://yoyaku.harp.lg.jp/sapporo/FacilitySearch/Index",
    {
      waitUntil: "networkidle",
      timeout: 60000
    }
  );

  console.log("検索画面を開きました！");

  await page.waitForTimeout(10000);

  const inputs = await page.locator("input").evaluateAll((els) =>
    els.map((e, i) => ({
      index: i,
      type: e.type,
      placeholder: e.placeholder
    }))
  );

  console.log("入力欄:");
  console.log(inputs);

  await page.locator("input").nth(0).fill("よさこい");

console.log("利用目的入力テスト完了！");

await page.waitForTimeout(3000);

const bodyText = await page.locator("body").innerText();

console.log(bodyText.slice(0, 1500));

  await page.locator("input").nth(4).fill("学校");

  const selects = await page.locator("select").count();

console.log("select数:", selects);

console.log("施設名入力テスト完了！");

  await page.locator("input").nth(6).fill("20260801");

console.log("日付入力テスト完了！");

  await page.getByText("検索", { exact: true }).click();

console.log("検索ボタン押しました！");

await page.waitForTimeout(5000);

console.log("検索後URL:", page.url());

const resultText = await page.locator("body").innerText();

console.log(resultText.slice(0, 1000));

  await browser.close();
})();
