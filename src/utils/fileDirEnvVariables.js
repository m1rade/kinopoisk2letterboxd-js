import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * The function creates a custom __dirname and __filename variables
 * that work just like the global variables that are defined in CommonJs but not in ES module
 * @param meta module's metadata
 * @returns Object with the absolute path of the current module file and it's directory
 */

export function fileDirEnvVariables(meta) {
    const __filename = fileURLToPath(meta.url);

    const __dirname = dirname(__filename);

    return { __dirname, __filename };
}
