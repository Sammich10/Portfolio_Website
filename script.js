
const check = (window.innerHeight - 50);

window.addEventListener("scroll", () => {
    const currentscroll = window.pageYOffset;
    if (currentscroll <= check) {
        opacity = 1 - (currentscroll / check);
    } else {
        opacity = 0;
    }
    document.querySelector(".website-top-section").style.opacity = opacity;
});


const scrollOffset = 120;
 
const scrollElements = document.querySelectorAll(".js-scroll")

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
    console.log("Animation Triggered!")
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