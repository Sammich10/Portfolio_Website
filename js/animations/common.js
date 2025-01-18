export const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

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