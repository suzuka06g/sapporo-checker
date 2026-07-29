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

  // 通信を監視
  page.on("response", async (response) => {
  const url = response.url();

  if (url.includes("SearchUtilizationPurpose")) {
    console.log("通信:", url);

    try {
      const text = await response.text();
      console.log("レスポンス:");
      console.log(text);
    } catch (e) {
      console.log("レスポンス取得失敗");
    }
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

  await page.waitForTimeout(5000);

  const htmlCheck = await page.content();

console.log("よさこいHTML確認:");
console.log(htmlCheck.includes("よさこい"));

console.log("purpose確認:");
console.log(htmlCheck.includes("utilizationPurpose"));
console.log(htmlCheck.includes("purposeId"));

  const response = await page.request.get(
  "https://yoyaku.harp.lg.jp/sapporo/FacilitySearch/SearchUtilizationPurpose?utilizationPurposeName=よさこい"
);

console.log("利用目的通信ステータス:");
console.log(response.status());

const text = await response.text();

console.log("通信結果:");
console.log(text.slice(0,1000));

  // 入力欄確認
  const inputs = await page.locator("input").evaluateAll((els) =>
    els.map((e, i) => ({
      index: i,
      type: e.type,
      placeholder: e.placeholder
    }))
  );

  console.log("入力欄:");
  console.log(inputs);

  // 利用目的クリック
  await page.locator("input").nth(0).click({ force: true });

  await page.waitForTimeout(3000);

  await page.locator("input").nth(0).fill("よさこい");

await page.waitForTimeout(3000);

const textAfterInput = await page.locator("body").innerText();

console.log("入力後:");
console.log(textAfterInput.slice(0,2000));

  // 候補確認
  const options = await page.locator('[role="option"]').allInnerTexts();

  console.log("候補:");
  console.log(options);

  // inputの情報
  const inputInfo = await page.locator("input").nth(0).evaluate((e) => {
    return {
      outer: e.outerHTML,
      parent: e.parentElement.outerHTML
    };
  });

  console.log(inputInfo);

  // クリック後の画面
  const afterClick = await page.locator("body").innerText();

  console.log("クリック後の画面:");
  console.log(afterClick.slice(0, 3000));

  // HTML確認
  const html = await page.content();

  console.log("HTMLによさこいある？");
  console.log(html.includes("よさこい"));

  console.log("HTMLに学校開放ある？");
  console.log(html.includes("学校開放"));

  // body確認
  const bodyText = await page.locator("body").innerText();

  console.log("よさこいある？");
  console.log(bodyText.includes("よさこい"));

  console.log("学校開放ある？");
  console.log(bodyText.includes("学校開放"));

  // 施設入力
  await page.locator("input").nth(4).fill("学校");

  console.log("施設入力完了");

  // 日付入力
  await page.locator("input").nth(6).fill("20260801");

  console.log("日付入力完了");

  // 検索
  await page.getByText("検索", { exact: true }).click();

  console.log("検索ボタン押しました！");

  await page.waitForTimeout(5000);

  console.log("検索後URL:");
  console.log(page.url());

  const resultText = await page.locator("body").innerText();

  console.log(resultText.slice(0, 1000));

  await browser.close();
})();
