import { elementInView, delay } from './utils.js';

const scrollOffset = 300; 
const typeDelayLetter = 70;
const typeDelayWord = 200;

/**
 * Types out the header text one character at a time with a delay.
 * Once the header text is fully typed out, it fades out the cursor.
 * @param {string} text - The text to type out.
 * @param {HTMLElement} textElement - The element to type into.
 * @param {HTMLElement} cursorElement - The element to control the cursor.
 * @param {number} delayBetweenChars - The delay in milliseconds between typing each character.
 * @param {number} delayBetweenWords - The delay in milliseconds between typing each word.
 */
async function typeText(text, textElement, cursorElement, delayBetweenChars, delayBetweenWords) {
    const charArray = text.split('');
    let charIndex = 0;

    const timerId = setInterval(() => {
        if (charIndex >= charArray.length) {
            clearInterval(timerId);
            cursorElement.style.opacity = 0;
            return;
        }

        const char = charArray[charIndex];
        textElement.innerHTML += char;
        charIndex++;
        const delay = char === ' ' ? delayBetweenWords : delayBetweenChars;
        setTimeout(() => {}, delay);
    }, delayBetweenChars);
}

/**
 * Add an event listener to each element in typeElements that will type out the text
 * when the element is in view.
 * @param {NodeList} el - An element with class .js-type
 */
export async function handleTypeAnimation(el) {
    // Check if the element is in view and has not already been typed
    const typed = el.classList.contains('typed');
    const typeOnce = el.classList.contains('type-once');
    const isInView = elementInView(el, scrollOffset);
    // If the element is typed and in view, return
    if(typed && (isInView || typeOnce)) 
    {
        return;
    }
    const textElement = el.querySelector('.js-type');
    const cursor = el.querySelector('.cursor');
    // Type out the text if it is in view and not typed
    if(!typed &&isInView) {
        // Add the 'typed' class to the element
        el.classList.add('typed');
        // Get the text element, cursor element, and the text to type
        const text = textElement.getAttribute('data-text');
        // Trigger the text typing animation
        await typeText(text, textElement, cursor, typeDelayLetter, typeDelayWord);
        // If the element has the 'type-once' class in its list, remove the typed-text class
    }
    else if(typed && !isInView)
    {
        el.classList.remove('typed');
        const fadeTimeoutParam = getComputedStyle(el).getPropertyValue('--typed-text-fade-delay');
        // convert the value from 0.5s to 500
        const fadeTimeout = parseInt(fadeTimeoutParam);
        // Remove the text after a delay
        await setTimeout(() => {
            textElement.innerHTML = '';
        }, fadeTimeout);
        cursor.style.opacity = 1;
    }
}

