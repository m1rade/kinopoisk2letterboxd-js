import fs from "fs";
import { join } from "path";
import { fileDirEnvVariables } from "../utils/fileDirEnvVariables.js";

export async function saveDataToFile(data) {
    const { __dirname } = fileDirEnvVariables(import.meta.url);
    const dirPath = join(__dirname, "..", "..", "data");
    const filePath = join(dirPath, "films.csv");

    return new Promise((resolve, rejected) => {
        if (!data.length) return rejected("Args haven't been provided");

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, err => {
                if (err) return rejected(err);
            });

            fs.writeFileSync(filePath, data, err => {
                if (err) return rejected(err);
            });
            return resolve(data);
        } else {
            fs.writeFileSync(filePath, data, err => {
                if (err) return rejected(err);
            });
            return resolve(data);
        }
    });
}
