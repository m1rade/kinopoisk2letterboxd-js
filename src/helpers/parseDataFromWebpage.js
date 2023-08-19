import * as cheerio from "cheerio";
import { cutYearFromName, formatDate } from "../utils/formatters.js";

export function parseDataFromWebpage(webpage, films) {
    const $ = cheerio.load(webpage);

    $("div.profileFilmsList")
        .children("div.item")
        .each((i, el) => {
            const Title = $(el).find("div.nameEng").text();
            // skip titles that haven't english name
            if (Title !== String.fromCharCode(160)) {
                const russianTitle = $(el).find("div.nameRus").text();

                if (!/сериал/gimu.test(russianTitle)) {
                    const Year = cutYearFromName(russianTitle);
                    //format date for letterboxd template
                    const WatchedDate = formatDate($(el).find("div.date").text());

                    films.push({ Title, Year, WatchedDate });
                }
            }
        });
}
