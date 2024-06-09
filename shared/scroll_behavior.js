
const typeElements = document.querySelectorAll('.js-type')

/**
 * Check if an element is in the viewport
 * @function elementInView
 * @param {Element} el - Element to check
 * @param {number} scrollOffset - Number of visible pixels needed to trigger animation
 * @returns {boolean} - True if element is in viewport, false otherwise
 */
const elementInView = (el, scrollOffset) => {
  const elementTop = el.getBoundingClientRect().top;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return elementTop <= viewportHeight - scrollOffset;
};

/**
 * Adds an event listener to the cursor element that will type out the text when the cursor is in view.
 * @param {HTMLElement} cursor - The cursor element.
 * @param {HTMLElement} element - The element to type into.
 * @param {string} text - The text to type out.
 * @param {number} delay - The delay between characters in milliseconds.
 */
function addTypeListener(cursor, element, text, delay) {
  cursor.addEventListener('scroll', function() {
    if (elementInView(element, 150)) {
      typeText(text, element, cursor, delay);
      cursor.removeEventListener('scroll', arguments.callee);
    }
  });
}

/**
 * Types out the header text one character at a time with a delay.
 * Once the header text is fully typed out, it fades out the cursor.
 * @param {string} text - The text to type out.
 * @param {HTMLElement} element - The element to type into.
 * @param {HTMLElement} cursor - The element to control the cursor.
 * @param {function} delay - The function to delay the typing.
 */
function typeText(text, element, cursor, delay) {
  let i = 0;

  const typeChar = () => {
    if (i < text.length) {
      const char = text.charAt(i);
      element.innerHTML += char;
      i++;
      delay(char === ' ' ? 200 : 70, typeChar);
    } else {
      cursor.style.opacity = 0;
    }
  };

  delay(1000, typeChar);
}



/**
 * Adds a function to an element that will call the function when the cursor is in view.
 * @param {HTMLElement} cursor - The cursor element.
 * @param {function} func - The function to call.
 */
function addTypeTrigger(cursor, func) {
  cursor.addEventListener('scroll', function() {
    if (elementInView(cursor, 150)) {
      func();
      cursor.removeEventListener('scroll', arguments.callee);
    }
  });
}

typeElements.forEach(el=>{
  let text = el.getAttribute('data-text');
  let typedText = el.querySelector('.typed-text');
  let cursor = el.querySelector('.cursor')
  let i = 0;

  function type(){
    if (i < text.length) {
      typedText.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }else{
      setTimeout(removeCursor,2500)
    }
  }
  function removeCursor(){
    cursor.style.opacity = 0;
  }

  window.addEventListener('scroll',function(){
    if(elementInView(el,150)){
      setTimeout(type,650);
      window.removeEventListener('scroll',arguments.callee);
    }
  });
});

/**
 * Delays the execution of a function.
 * @param {number} time - The time to delay in milliseconds.
 * @param {function} func - The function to delay.
 */
function delay(time, func) {
  setTimeout(func, time);
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * Select all elements with class "js-scroll" and add event listener to trigger animations when they enter the viewport
 */
(function() {
  const scrollOffset = 150; // How many visible pixels must be in view for animation to trigger
  const scrollElements = document.querySelectorAll(".js-scroll"); // Select all elements with class "js-scroll"

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

  /**
   * Handle scroll animations for all elements with class "js-scroll"
   * @function handleScrollAnimation
   * @param {NodeList} scrollElements - Array of elements with class "js-scroll"
   */
  const handleScrollAnimation = (scrollElements) => {
    scrollElements.forEach((el) => {
      if (elementInView(el, scrollOffset)) {
        displayScrollElement(el);
      } else if (!elementInView(el, scrollOffset) && el.classList.contains("scrolled")) {
        hideScrollElement(el)
      }
    });
  };

  // Add event listener for scroll
  window.addEventListener('scroll', () => {
    handleScrollAnimation(scrollElements);
  });
})();
async function init()
{
  typeText( document.getElementById("typed-text1").getAttribute('data-text'), document.getElementById("typed-text1"), document.getElementById("cursor0"), delay);
  await sleep(3000);
  document.getElementById("view-content-button").style.opacity = 1;
}


init();



