//node project.js --url="https://leetcode.com"
let minimist = require("minimist");
let puppeteer = require("puppeteer");
let fs = require("fs");

let configJSON = fs.readFileSync("projectconfig.json", "utf-8");
let configJSO = JSON.parse(configJSON);
let args = minimist(process.argv);
(async function () {
  let browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });
  let page = await browser.newPage();
  await page.goto(args.url);

  //clicking the sign in button
  let btn1 = 'a[href = "/accounts/login/"]';
  await page.waitForSelector(btn1);
  await page.click(btn1);

  //typing username
  let emailSelector = 'input[id="id_login"]';
  await page.waitForSelector(emailSelector);
  await page.type(emailSelector, configJSO.username, { delay: 40 });

  //typing password
  let passwordSelector = 'input[id="id_password"]';
  await page.waitForSelector(passwordSelector);
  await page.type(passwordSelector, configJSO.password, { delay: 40 });

  //clicking button
  await page.keyboard.press("Enter");
})();
