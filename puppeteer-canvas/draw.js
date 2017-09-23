let puppeteer = require("puppeteer");

(async () => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto("http://localhost:8080/puppeteer-canvas/");

  // Get dimensions of the canvas element
  let dimensions = await page.evaluate(() => {
    let { x, y, width, height } = document.querySelector("canvas").getBoundingClientRect();
    return { x, y, width, height };
  });

  await page.setViewport(dimensions);

  for (var i = 0; i < 60; i++) {
    await page.evaluate(time => drawTime(time), i / 60);
    await page.screenshot({ path: leftpad(i + 1, 2) + ".png", clip: dimensions });
  }

  await browser.close();
})();

function leftpad(i, n) {
  let str = i + "";
  while (str.length < n) {
    str = "0" + str;
  }
  return str;
}
