const scrollOffset = 150; // How many visible pixels must be in view for animation to trigger
const scrollElements = document.querySelectorAll(".js-scroll") //select all elements will "js-scroll" in the class name list

scrollElements.forEach((el) => {
  })
 
  const elementInView = (el, scrollOffset) => {
    const elementTop = el.getBoundingClientRect().top;
   
    if (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) - scrollOffset)
    ) {
      return true;
    }
    else{
        return false;
    }
  };

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};
 
const hideScrollElement = (element) => {
  element.classList.remove('scrolled');
}
 
const handleScrollAnimation = (scrollElements) => {
    scrollElements.forEach((el) => {
      if (elementInView(el, scrollOffset)) {
        displayScrollElement(el);
      } else if(!elementInView(el, scrollOffset) && el.classList.contains("scrolled")) {
          hideScrollElement(el)
      }
    })
  }
 
window.addEventListener('scroll', () => {
    handleScrollAnimation(scrollElements);
  })