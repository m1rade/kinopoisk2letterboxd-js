import fs from "fs";
import { join } from "path";
import { fileDirEnvVariables } from "../utils/fileDirEnvVariables.js";

export async function saveDataToFile(data) {
    return new Promise((resolve, rejected) => {
        if (!data.length) return rejected("Args haven't been provided");


        const { __dirname } = fileDirEnvVariables(import.meta.url);
        const dirPath = join(__dirname, "..", "..", "data");
        const filePath = join(dirPath, "films.csv");

        fs.mkdir(dirPath, (err) => {
            if (err) throw err;

            fs.writeFile(filePath, data, (err) => {
                if (err) throw err;

                return resolve();
            })
        });
    });
}
