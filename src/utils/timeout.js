/**
 * Using for puppeteerAPI as page.waitForTimeout(ms) method is now obsolete
 * Causes your script to wait for the given number of milliseconds
 * 
 * https://pptr.dev/api/puppeteer.page.waitfortimeout
 * 
 * @param {number} ms to wait
 * @returns Promise<void>
 */
export async function timeout(ms) {
    return new Promise(res => setTimeout(res, ms));
}
