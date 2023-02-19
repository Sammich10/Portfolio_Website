
const check = (window.innerHeight - 25); //Point at which fade animation ends (i.e. background will be fulled faded)
const header = "Sam Michelsen's Website";
const sub_header = "Software Engineer wannabe; Lover of cats"
const typedText = document.getElementById("typed-text1");
const typedText_2 = document.getElementById("typed-text2")
const cursor = document.querySelector('#cursor');

let i = 0;
setTimeout(function() {
  (function type() {
    if (i < header.length) {
      if(header.charAt(i) == " "){
        typedText.innerHTML += header.charAt(i);
        i++;
        setTimeout(type, 200);
      }else{
        typedText.innerHTML += header.charAt(i);
        i++;
        setTimeout(type, 70);
      }
    }
  }());
},1000);

let j = 0;
setTimeout(function() {
  (function type2() {
    if (j < sub_header.length) {
      if(sub_header.charAt(j) == ";"){
        typedText_2.innerHTML += sub_header.charAt(j);
        j++;
        setTimeout(type2,300);
      }else{
        typedText_2.innerHTML += sub_header.charAt(j);
        j++;
        setTimeout(type2, 70);
      }
    }
  }());
},3500);

window.addEventListener("scroll", () => {
    const currentscroll = window.pageYOffset;
    if (currentscroll <= check) { 
        opacity = 1 - ((currentscroll / check)/1.35); // If user scrolls past check, begin lowering the opacity
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

const typeElements = document.querySelectorAll('.js-type')

typeElements.forEach(el=>{
  text = el.getAttribute('data-text');
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
      setTimeout(type,1500);
      window.removeEventListener('scroll',arguments.callee);
    }
  });
});
