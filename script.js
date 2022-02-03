
const check = (window.innerHeight - 25); //Point at which fade animation ends (i.e. background will be fulled faded)

window.addEventListener("scroll", () => {
    const currentscroll = window.pageYOffset;
    if (currentscroll <= check) { 
        opacity = 1 - (currentscroll / check); // If user scrolls past check, begin lowering the opacity
    } else {
        opacity = 0;
    }
    document.querySelector(".website-top-section").style.opacity = opacity; //Updates opacity
});


const scrollOffset = 120; // How many visible pixels must be in view for animation to trigger
 
const scrollElements = document.querySelectorAll(".js-scroll") //select all elements will "js-scroll" in the class name list

scrollElements.forEach((el) => {
    el.style.opacity = 0
  })
 
  const elementInView = (el, scrollOffset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
   
    return (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) - scrollOffset)
    );
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
      } else {
          hideScrollElement(el)
      }
    })
  }
 
window.addEventListener('scroll', () => {
    handleScrollAnimation(scrollElements);
  })