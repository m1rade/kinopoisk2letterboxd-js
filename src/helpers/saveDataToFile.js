import fs from "fs";
import { join } from "path";
import { fileDirEnvVariables } from "../utils/fileDirEnvVariables.js";

export async function saveDataToFile(data) {
    if (!data.length) return rejected("Args haven't been provided");

    const { __dirname } = fileDirEnvVariables(import.meta);
    const dirPath = join(__dirname, "..", "..", "data");
    const filePath = join(dirPath, "films.csv");

    return new Promise((resolved, rejected) => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdir(dirPath, err => {
                if (err) return rejected(err);

                fs.writeFile(filePath, data, err => {
                    if (err) return rejected(err);
                });
            });
            return resolved();
        } else {
            fs.writeFile(filePath, data, err => {
                if (err) return rejected(err);
            });
            return resolved();
        }
    });
}
