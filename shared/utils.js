/**
 * Check if an element is in the viewport
 * @function elementInView
 * @param {Element} el - Element to check
 * @param {number} scrollOffset - Number of visible pixels needed to trigger animation
 * @returns {boolean} - True if element is in viewport, false otherwise
 */
export const elementInView = (el, scrollOffset) => {
    const elementTop = el.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return elementTop <= viewportHeight - scrollOffset;
};
  
/**
 * Delays the execution of a function.
 * @param {number} time - The time to delay in milliseconds.
 * @param {function} func - The function to delay.
 */
export async function delay(time, func) {
    await setTimeout(func, time);
}
  
/**
 * Returns a promise that resolves after the specified number of milliseconds.
 * @param {number} milliseconds - The number of milliseconds to delay.
 * @returns {Promise<void>} - A promise that resolves after the specified number of milliseconds.
 */
export async function sleep (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
  