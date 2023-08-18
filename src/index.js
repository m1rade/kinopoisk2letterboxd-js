import * as cheerio from "cheerio";
import { getPageFromUrl } from "./helpers/getPageFromUrl.js";
import { json2csv } from "json-2-csv";
import { saveDataToFile } from "./helpers/saveDataToFile.js";

const URL = "https://www.kinopoisk.ru/user/13771316/votes/list/vs/vote/page/2/#list";

(async function main() {
    try {
        const webpage = await getPageFromUrl(URL);
        const $ = cheerio.load(webpage);

        const films = [];

        $("div.profileFilmsList")
            .children("div.item")
            .each((i, el) => {
                const Title = $(el).find("div.nameEng").text();
                const Year = $(el).find("div.nameRus").text().replace(/\D/g, "");
                const WatchedDate = $(el)
                    .find("div.date")
                    .text()
                    .replace(/, \d+:\d+/, "");

                // skip titles that haven't english name
                if (Title !== String.fromCharCode(160)) {
                    films.push({ Title, Year, WatchedDate });
                }
            });

        // saveDataToCSV(films);
        const csv = await json2csv(films, { excelBOM: true, prependHeader: false });
        await saveDataToFile(csv);

    } catch (error) {
        throw new Error(error);
    }
})();
