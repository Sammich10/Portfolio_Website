import { elementInView } from "./common.js";

// How many visible pixels must be in view for animation to trigger
const scrollOffset = 120;

/**
 * Adds an event listener to the window that will call handleScrollAnimation on the provided element when the window is scrolled.
 * @function addScrollListener
 * @param {Element} el - Element to animate when scrolled into view
 */
export const addScrollListener = (el) => {
  window.addEventListener('scroll', () => {
    handleScrollAnimation(el);
  });
}

/**
 * Handle scroll animations for all elements with class "js-scroll"
 * @function handleScrollAnimation
 * @param {NodeList} scrollElements - Element with class "js-scroll"
 */
const handleScrollAnimation = (el) => {
  if (elementInView(el, scrollOffset)) {
    displayScrollElement(el);
  } else if (!elementInView(el, scrollOffset) && el.classList.contains("scrolled")) {
    hideScrollElement(el);
  }
};

/**
 * Display an element by adding the "scrolled" class
 * @function displayScrollElement
 * @param {Element} element - Element to display
 */
const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

/**
 * Hide an element by removing the "scrolled" class
 * @function hideScrollElement
 * @param {Element} element - Element to hide
 */
const hideScrollElement = (element) => {
  element.classList.remove('scrolled');
}
