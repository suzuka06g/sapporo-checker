const { chromium } = require("playwright");

(async () => {

  const browser = await chromium.launch({
  headless: false,
  slowMo: 100
});

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1",

    viewport: {
      width: 390,
      height: 844
    }
  });


  // 通信監視
  page.on("response", async (response) => {

    const responseUrl = response.url();

    if (responseUrl.includes("SearchUtilizationPurpose")) {

      console.log("通信:", responseUrl);

      try {

        const responseText = await response.text();

        console.log("レスポンス:");
        console.log(responseText);

      } catch (error) {

        console.log("レスポンス取得失敗");

      }
    }

  });



  // 検索ページへ
  await page.goto(
    "https://yoyaku.harp.lg.jp/sapporo/FacilitySearch/Index",
    {
      waitUntil: "networkidle",
      timeout: 60000
    }
  );


  console.log("検索画面を開きました！");


  await page.waitForTimeout(5000);



  // よさこいが存在するか確認
  const firstHtml = await page.content();

  console.log("よさこいHTML確認:");
  console.log(firstHtml.includes("よさこい"));



  // -------------------------
  // 利用目的入力
  // -------------------------

  await page.locator("input").nth(0).fill("よさこい");

  console.log("よさこい入力完了");


  await page.waitForTimeout(2000);


  // 候補クリック
  await page.getByText("よさこい", {
    exact: true
  }).click();


  console.log("よさこい選択完了");



  // -------------------------
  // 施設入力
  // -------------------------

  await page.locator("input").nth(4).fill("学校");

  console.log("施設入力完了");



  // -------------------------
  // 日付入力
  // -------------------------

  await page.locator("input").nth(6).fill("20260822");

  console.log("日付入力完了");

  // -------------------------
// 利用時間帯（夜間）
// -------------------------

await page.getByText("夜間", {
  exact: true
}).click();

console.log("夜間選択完了");

await page.waitForTimeout(2000);

  // -------------------------
  // 検索
  // -------------------------

  console.log("検索開始");


  await page.getByText("検索", {
  exact: true
}).click();


console.log("検索ボタン押下完了");


  console.log("検索後URL:");

  console.log(page.url());



  // 検索結果読み込み待ち

  await page.waitForTimeout(5000);



  // -------------------------
  // 結果確認
  // -------------------------

  const resultBodyText = await page.locator("body").innerText();


  console.log("ネット申込ある？");

  console.log(
    resultBodyText.includes("ネット申込")
  );


  console.log("結果:");

  console.log(
    resultBodyText.slice(0,3000)
  );

    console.log(
    resultBodyText.slice(0,3000)
  );


  // -------------------------
  // 空き状況リンク確認
  // -------------------------

  const availabilityLinks = await page.locator("a").evaluateAll(links =>
    links
      .map(a => ({
        text: a.innerText,
        href: a.href
      }))
      .filter(x => x.text.includes("空き状況"))
  );


  console.log("空き状況リンク:");
  console.log(availabilityLinks);



  await browser.close();


})();
