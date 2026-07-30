const { chromium } = require("playwright");

(async () => {

  const browser = await chromium.launch({
    headless: false,
    slowMo: 300
  });


  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",

    viewport:{
      width:390,
      height:844
    }
  });


  // ページを開く
  await page.goto(
    "https://yoyaku.harp.lg.jp/sapporo/FacilitySearch/Index",
    {
      waitUntil:"networkidle",
      timeout:60000
    }
  );


  console.log("検索画面を開きました");


  await page.waitForTimeout(3000);


  // --------------------
  // 利用目的
  // --------------------

  const inputs = await page.locator("input").count();

  console.log("input数:", inputs);


  await page.locator("input").nth(0).fill("よさこい");

  console.log("よさこい入力完了");


  await page.waitForTimeout(3000);

const candidate = page.getByText("よさこい", {
  exact:true
});


console.log(
  "よさこい候補数:",
  await candidate.count()
);


if(await candidate.count() > 0){
  await candidate.last().click();
  console.log("よさこい選択完了");
}


await page.waitForTimeout(3000);


  // 画面に出ている文字確認
  const text = await page.locator("body").innerText();

  console.log("画面文字:");
  console.log(text.slice(0,1000));


  // --------------------
  // 施設
  // --------------------

  await page.locator("input").nth(4).fill("学校");

  console.log("学校入力完了");


  // --------------------
  // 日付
  // --------------------

  await page.locator("input").nth(6).fill("20260822");

  console.log("日付入力完了");


  // --------------------
  // 夜間
  // --------------------

  const night = page.getByText("夜間", {
    exact:true
  });


  console.log(
    "夜間数:",
    await night.count()
  );


  if(await night.count() > 0){
    await night.last().click();
    console.log("夜間選択完了");
  }


  await page.waitForTimeout(2000);


  // --------------------
  // 検索
  // --------------------

  const search = page.getByText("検索",{
    exact:true
  });


  console.log(
    "検索ボタン数:",
    await search.count()
  );


  await search.last().click();


  console.log("検索しました");


  await page.waitForTimeout(5000);


  console.log("結果URL:");
  console.log(page.url());


  const result =
    await page.locator("body").innerText();


  console.log(result.slice(0,2000));

  // --------------------
  // 空き状況リンク取得
  // --------------------

  const availabilityLinks =
    await page.locator("a").evaluateAll(links =>
      links
        .map(a => ({
          text: a.innerText.trim(),
          href: a.href
        }))
        .filter(x =>
          x.text.includes("空き状況")
        )
    );


  console.log("空き状況リンク数:");
  console.log(availabilityLinks.length);


  console.log("空き状況リンク一覧:");

  console.log(
    availabilityLinks.slice(0,10)
  );

  // -------------------------
  // 空き状況チェック
  // -------------------------

  if (availabilityLinks.length > 0) {

    const url = availabilityLinks[0].href;

    console.log("空き状況ページ確認:");
    console.log(url);


    await page.goto(url, {
      waitUntil:"networkidle",
      timeout:60000
    });


    await page.waitForTimeout(3000);


    const availabilityText =
      await page.locator("body").innerText();


    console.log("空き状況ページ:");

    console.log(
      availabilityText.slice(0,3000)
    );

const nightUnavailable =
  availabilityText.includes("17時45分から21時45分 空きなし");


if(nightUnavailable){
  console.log("夜間: 空きなし ❌");
}else{
  console.log("夜間: 空きありの可能性あり ⭕");
}

  }

await browser.close();

})();