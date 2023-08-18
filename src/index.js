import * as cheerio from "cheerio";
import { getPageFromUrl } from "./helpers/getPageFromUrl.js";
import { json2csv } from "json-2-csv";
import { saveDataToFile } from "./helpers/saveDataToFile.js";

const URL = "https://www.kinopoisk.ru/user/13771316/votes/list/vs/vote/page/2";

(async function main() {
    try {
        const webpage = await getPageFromUrl(URL);
        const $ = cheerio.load(webpage);

        const films = [];

        $("div.profileFilmsList")
            .children("div.item")
            .each((i, el) => {
                const Title = $(el).find("div.nameEng").text();
                // skip titles that haven't english name
                if (Title !== String.fromCharCode(160)) {
                    const russianTitle = $(el).find("div.nameRus").text();

                    if (!/сериал/gmui.test(russianTitle)) {
                        const Year = russianTitle.match(/\(((18|19|20)\d{2})\)/)[1];
                        const WatchedDate = $(el)
                            .find("div.date")
                            .text()
                            .replace(/, \d+:\d+/, "")
                            .replace(
                                /(0?[1-9]|[12][0-9])\.(0?[1-9]|[12][0-9]|3[01])\.((19|20)\d\d)/g,
                                (match, dd, mm, yyyy) => `${yyyy}-${mm}-${dd}`
                            );
    
                        films.push({ Title, Year, WatchedDate });
                    }
                }
            });

        const csv = await json2csv(films, { excelBOM: true });
        await saveDataToFile(csv);
    } catch (error) {
        throw new Error(error);
    }
})();
