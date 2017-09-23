let puppeteer = require("puppeteer");

(async () => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto("http://localhost:8080/clock-hacking/done/");

  // Get dimensions of the canvas element
  let dimensions = await page.evaluate(() => {
    let { x, y, width, height } = document.querySelector("svg").getBoundingClientRect();
    return { x, y, width, height };
  });

  await page.setViewport(dimensions);

  for (var i = 0; i < 90; i++) {
    await page
      .evaluate(time => {
        TIME = time;
      }, 4500 * i / 90)
      .then(() => new Promise(resolve => setTimeout(resolve, 100)));
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
