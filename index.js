import { handleTypeAnimation } from './shared/typed_text.js';
import { handleScrollAnimation } from './shared/scroll_behavior.js';

document.addEventListener('DOMContentLoaded', async function() {
    // Get all the elements marked with the class .js-type
    const typeElements = document.querySelectorAll('.typed-text')
    // Select all elements with class "js-scroll"
    const scrollElements = document.querySelectorAll(".js-scroll"); // Select all elements with class "js-scroll"

    // Add an event listener to the animated elements
    window.addEventListener('scroll', () => {
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            typeElements.forEach((el) => {
                handleTypeAnimation(el);
            });
            scrollElements.forEach((el) => {
                handleScrollAnimation(el);
            });
        }, 100);
    });

    // Trigger a scroll event on DOM load after 0.5 seconds
    
    setTimeout(() => {window.dispatchEvent(new Event('scroll'));}, 500);
});