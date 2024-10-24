import { elementInView } from "./utils.js";

// Set how many visible pixels must be in view for an element to be displayed
const scrollOffset = 1; 

/**
 * Handle scroll animations for all elements with class "js-scroll"
 * @function handleScrollAnimation
 * @param {NodeList} scrollElements - Array of elements with class "js-scroll"
 */
export async function handleScrollAnimation(el){
  // When a scroll event is triggered, check if the element is in view
  if (elementInView(el, scrollOffset)) {
    // If the element is in view, display it by adding the "scrolled" class to the class list
    displayScrollElement(el);
  } else if (!elementInView(el, scrollOffset)) {
    // If the element is not in view, hide it by removing the "scrolled" class
    hideScrollElement(el)
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
  if(element.classList.contains("scrolled"))
  { // Only remove the "scrolled" class if it exists in the class list
    element.classList.remove('scrolled');
  }
}




