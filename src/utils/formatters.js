/**
 * The function formats date values from DD.MM.YYYY to YYYY-MM-DD
 * @param {string} date
 * @returns {string} updated date
 */
export function formatDate(date) {
    return date
        .replace(/, \d+:\d+/, "")
        .replace(
            /(0?[1-9]|[123][0-9])\.(0?[1-9]|[12][0-9]|3[01])\.((19|20)\d\d)/g,
            (match, dd, mm, yyyy) => `${yyyy}-${mm}-${dd}`
        );
}

/**
 * @param {string} name of the films
 * @returns release year
 */
export function cutYearFromName(name) {
    return name.match(/\(((18|19|20)\d{2})\)/)[1];
}
