import { sleep, elementInView } from './common.js';

const typeDelay = 70;
const typeDelaySpace = 200;
const scrollOffset = 150;

/**
 * Adds an event listener to an element that will type out the text when the element is in view.
 * @param {HTMLElement} element - The element to type into.
 * @param {string} text - The text to type out.
 */
export function addTypeListener(element, text) {
  window.addEventListener('scroll', function() {
    const elInView = elementInView(element, scrollOffset);
    if (elInView && !element.classList.contains('typed')) {
      element.classList.add('typed');
      typeText(text, element);
    }else if (!elInView){
      element.innerHTML = '';
      element.classList.remove('typed');
    }
  });
}

/**
 * Types out the header text one character at a time with a delay.
 * Once the header text is fully typed out, it fades out the cursor.
 * @param {string} text - The text to type out.
 * @param {HTMLElement} element - The element to type into.
 */
export async function typeText(text, element) {
  // Loop through the text and add each character to the element, with a delay between each character
  for(let i = 0; i < text.length; i++) {
    // Get the next character in the text
    const char = text.charAt(i);
    // Append the character to the element
    element.innerHTML += char;
    // Wait for a short delay, wait for a longer delay if the character is a space
    await sleep((char === ' ' ? typeDelaySpace : typeDelay));
  }
}

/**
 * Deletes the text in an element, one character at a time, with a delay between each character
 * @param {HTMLElement} element - The element to delete the text from
 */
export async function deleteText(element) {
  // Loop through the text and remove each character from the element, with a delay between each character
  for(let i = element.innerHTML.length - 1; i >= 0; i--) {
    // Get the next character in the text
    const char = element.innerHTML.charAt(i);
    // Remove the character from the element
    element.innerHTML = element.innerHTML.slice(0, i);
    // Wait for a short delay, wait for a longer delay if the character is a space
    await sleep(typeDelay);
  }
}

const headerTextCycles = [
  "Embedded Software Engineer",
  "Digital Signal Processing Engineer",
  "Cat Lover",
  "Corgi Enthusiast"
];

export async function cycleHeaderText(element) {
  while (true) {
    for(let i = 0; i < headerTextCycles.length; i++) {
      // Animate typing of the header text
      await typeText(headerTextCycles[i], element);
      // Pause for a second
      await sleep(1000);
      // Animate deletion of the text
      await deleteText(element);
      // Pause for a half second
      await sleep(500);
    }
  }
}


  