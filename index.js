const { chromium } = require("playwright");

(async () => {

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",

    viewport: {
      width: 390,
      height: 844
    }
  });


  // -------------------------
  // 検索ページへ
  // -------------------------

  await page.goto(
    "https://yoyaku.harp.lg.jp/sapporo/FacilitySearch/Index",
    {
      waitUntil: "networkidle"
    }
  );

  console.log("検索画面を開きました");


  // -------------------------
  // 利用目的 よさこい
  // -------------------------

  await page.locator("input").nth(0).fill("よさこい");

  await page.getByText("よさこい", {
    exact: true
  }).last().click();

  console.log("よさこい選択完了");


  // -------------------------
  // 施設入力
  // -------------------------

  await page.locator("input").nth(4).fill("学校");

  console.log("施設入力完了");


  // -------------------------
  // 日付入力
  // -------------------------

  await page.locator("input").nth(6).fill("20260801");

  console.log("日付入力完了");


  // -------------------------
  // 夜間選択
  // -------------------------

  await page.getByText("夜間", {
    exact:true
  }).click();

  console.log("夜間選択完了");


  await page.waitForTimeout(1000);


  // -------------------------
  // 検索
  // -------------------------

  await page.getByText("検索", {
    exact:true
  }).click();

  console.log("検索実行");


  // 結果待ち
  await page.waitForTimeout(5000);


  // -------------------------
  // 結果確認
  // -------------------------

  const bodyText =
    await page.locator("body").innerText();


  console.log(
    "ネット申込あり:",
    bodyText.includes("ネット申込OK")
  );


  // -------------------------
  // 空き状況URL取得
  // -------------------------

  const availabilityLinks =
    await page.locator("a").evaluateAll(links =>
      links
        .map(a => ({
          text:a.innerText.trim(),
          href:a.href
        }))
        .filter(x =>
          x.text.includes("空き状況")
        )
    );


  console.log("空き状況一覧");

  console.log(
    availabilityLinks
  );


  await browser.close();

})();
