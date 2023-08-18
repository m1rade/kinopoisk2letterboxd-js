import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function getPageFromUrl(url) {
    // anti-bot setting
    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    browser.close();

    return content;
}
