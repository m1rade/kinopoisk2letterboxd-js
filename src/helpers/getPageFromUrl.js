import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import {timeout} from "../utils/timeout.js"

export async function getPageFromUrl(url) {
    // anti-bot setting
    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({
        headless: "new",
    });
    const page = await browser.newPage();
    await page.goto(url, {
        networkIdle2Timeout: 5000,
        waitUntil: "networkidle2",
        timeout: 3000000,
    });
    await timeout(7000);
    const content = await page.content();
    await timeout(5000);
    browser.close();

    return content;
}
