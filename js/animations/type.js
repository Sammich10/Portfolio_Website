import { sleep, elementInView } from './common.js';

const typeDelay = 70;
const typeDelaySpace = 200;
const scrollOffset = 150;

/**
 * Adds an event listener to an element that will type out the text when the element is in view.
 * @param {HTMLElement} element - The element to type into.
 * @param {string} text - The text to type out.
 */
export async function addTypeListener(element, text) {
  window.addEventListener('scroll', function() {
    const elInView = elementInView(element, scrollOffset);
    const typed = element.classList.contains('typed');
    if (elInView && !typed) {
      element.classList.add('typed');
      if(element.textContent == "")
      {
        typeElement(element, text);
      }
    } else if (!elInView && typed) {
      element.classList.remove('typed');
    }
  });
}

/**
 * Types out the text into the element, and adds the "typed" class to the element.
 * @param {HTMLElement} element - The element to type into.
 * @param {string} text - The text to type out.
 */
async function typeElement(element, text)
{
  element.classList.add('typed');
  await typeText(text, element);
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
  "Digital Signal Processing Fan",
  "Cat Lover",
  "Corgi Enthusiast",
  "Video Gamer",
  "Performance Nerd",
  "Operating Systems Buff",
  "Problem Solver",
  "Tool Creator",
  "Lifelong Learner",
  "Powered by Coffee"
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


  