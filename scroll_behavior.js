/**
 * Select all elements with class "js-scroll" and add event listener to trigger animations when they enter the viewport
 */
(function() {
  const scrollOffset = 150; // How many visible pixels must be in view for animation to trigger
  const scrollElements = document.querySelectorAll(".js-scroll"); // Select all elements with class "js-scroll"

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
