import fs from "fs";
import { join } from "path";
import { fileDirEnvVariables } from "../utils/fileDirEnvVariables.js";

export async function saveDataToCSV(data) {
    if (!Array.isArray(data)) throw new Error("The arg of the function must be an array of objects.");

    if (data.length > 0) {
        if (data.some(row => typeof row !== "object")) {
            throw new Error("The array must contain objects, not other data types.");
        }
    }

    if (data.length === 0) throw new Error("Array is empty");

    let rows = "";
    let headers = Object.keys(data[0]).join(",") + "\n";

    for (let i = 0; i < data.length; i++) {
        rows += Object.values(data[i]).join(",") + "\n";
    }

    const csvString = headers + rows;

    const { __dirname } = fileDirEnvVariables(import.meta.url);
    const dirPath = join(__dirname, "..", "..", "data");
    const filePath = join(dirPath, "films.csv");

    fs.mkdirSync(dirPath);

    return new Promise((resolve, rejected) => {
        fs.appendFile(filePath, csvString, err => {
            if (err) return rejected(err);

            console.log("The file was created successfully");

            return resolve(csvString);
        });
    });
}
