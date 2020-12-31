const puppeteer = require("puppeteer");
module.exports = {
    snowflake: async function (discordID, callback) {
        // declare function
        const browser = await puppeteer.launch({ defaultViewport: null }); // run browser
        const page = await browser.newPage(); // open new tab
        await page.goto("https://pixelatomy.com/snow-stamp/", {
            waitUntil: "networkidle2",
        }); // go to site

        await page.waitForSelector("#snowflake-input"); // wait for the selector to load
        // await page.$eval(`#snowflake-input`, (el) => (el.value = discordID));
        await page.focus("#snowflake-input");
        await page.keyboard.type(discordID);
        const selector =
            "#root > div > div > div > div > div.ui.compact.inverted.padded.segment.timestamp > div > div.ui.teal.large.inverted.statistic";

        await page.waitForSelector(selector);
        const createdTime = await page.$(selector); // declare a variable with an ElementHandle
        await createdTime.screenshot({ path: "./images/snowflake.png" }); // take screenshot element in puppeteer
        await browser.close(); // close browser
        callback();
    },
};
