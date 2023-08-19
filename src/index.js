import { json2csv } from "json-2-csv";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { parseDataFromWebpage } from "./helpers/parseDataFromWebpage.js";
import { saveDataToFile } from "./helpers/saveDataToFile.js";
import { timeout } from "./utils/timeout.js";

const URL = "https://www.kinopoisk.ru/user/13771316/votes/list/vs/vote/page/";
const films = [];

const LAUNCH_OPTIONS = {
    headless: "new",
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    userDataDir: "C:/Users/Laura/AppData/Local/Google/Chrome/User Data/Default",
};
const PAGE_LOADING_OPTIONS = {
    networkIdle2Timeout: 6000,
    waitUntil: "networkidle2",
    timeout: 3000000,
};

// anti-bot setting
puppeteer.use(StealthPlugin());

(async function main() {
    try {
        let currPage = 1;
        const allPages = 16;

        const browser = await puppeteer.launch(LAUNCH_OPTIONS);
        const page = await browser.newPage();

        for (currPage; currPage < allPages + 1; currPage++) {
            await page.goto(`${URL}${currPage}`, PAGE_LOADING_OPTIONS);
            await timeout(7000);
            const content = await page.content();
            parseDataFromWebpage(content, films);
        }

        const csv = await json2csv(films, { excelBOM: true });
        await saveDataToFile(csv);
        browser.close();
    } catch (error) {
        throw error;
    }
})();
