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

  // 利用目的クリック後の確認
await page.locator("input").nth(0).click();

await page.waitForTimeout(3000);

  await page.locator("input").nth(0).click();

await page.waitForTimeout(3000);

const purposeText = await page.locator("body").innerText();

console.log("よさこいある？");
console.log(purposeText.includes("よさこい"));

console.log("学校開放ある？");
console.log(purposeText.includes("学校開放"));

  const clickable = await page.locator("button, a, li, div").evaluateAll((els) =>
  els
    .map((e) => e.innerText)
    .filter((t) => t && t.length < 50)
);

console.log("クリック候補:");
console.log(clickable);
  // 画面内の候補っぽい要素を探す
const items = await page.locator('[role="option"]').evaluateAll((els) =>
  els.map(e => e.innerText)
);

console.log("候補一覧:");
console.log(items);

  const divs = await page.locator("div").evaluateAll((els) =>
  els
    .map(e => e.innerText)
    .filter(t => t && t.length < 50)
    .slice(0,100)
);

console.log("div一覧:");
console.log(divs);

// 画面内の文字を全部確認
const allText = await page.locator("body").innerText();

console.log("開いた一覧:");
console.log(allText.slice(0,5000));

const text = await page.locator("body").innerText();

console.log("目的選択後:");
console.log(text.includes("よさこい"));
console.log(text.slice(-3000));

  const allTexts = await page.locator("*").evaluateAll((els) =>
  els
    .map(e => e.innerText)
    .filter(t => t && t.includes("よ"))
);

console.log("よが入る要素:");
console.log(allTexts);

  await page.waitForTimeout(2000);

  const buttons = await page.locator("button").allInnerTexts();

console.log("ボタン一覧:");
console.log(buttons);

const suggestions = await page.locator("body").innerText();

console.log("候補確認:");
console.log(suggestions.slice(0, 2500));

  const texts = await page.locator("*").evaluateAll((els) =>
  els
    .map((e) => e.innerText)
    .filter((t) => t && t.includes("よ"))
);

console.log("よが含まれる文字:");
console.log(texts);

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
