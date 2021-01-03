const puppeteer = require("puppeteer");
module.exports = {
    soundOfText: async function (message, callback) {
        // declare function
        const browser = await puppeteer.launch({ defaultViewport: null }); // run browser
        const page = await browser.newPage(); // open new tab
        await page.goto("https://soundoftext.com/", {
            waitUntil: "networkidle2",
        }); // go to site

        await page.waitForSelector(
            "#app > div:nth-child(1) > div > form > div:nth-child(1) > div > textarea"
        ); // wait for the selector to load
        // await page.$eval(`#app > div:nth-child(1) > div > form > div:nth-child(1) > div > textarea`, (el) => (el.value = discordID));
        await page.focus(
            "#app > div:nth-child(1) > div > form > div:nth-child(1) > div > textarea"
        );
        await page.keyboard.type(message);

        const selector = "#app > div:nth-child(1)";

        await page.select(
            "#app > div:nth-child(1) > div > form > div:nth-child(2) > select",
            "vi-VN"
        );

        await page.click(
            "#app > div:nth-child(1) > div > form > div:nth-child(3) > input"
        );

        await page.waitForSelector(
            "#app > div.section.section--colored > div > div"
        );

        await page._client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: "./voice/voice.mp3",
        });

        await page.click(
            "#app > div.section.section--colored > div > div > div.card__actions > a:nth-child(2)"
        );

        await page.waitForSelector(selector);
        const voices = await page.$(selector); // declare a variable with an ElementHandle
        await voices.screenshot({ path: "./images/voice.png" }); // take screenshot element in puppeteer
        await browser.close(); // close browser
        callback();
    },
};
