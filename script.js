
const check = (window.innerHeight - 25); //Point at which fade animation ends (i.e. background will be fulled faded)
const header = "Sam Michelsen's Website";
const typedText = document.getElementById("typed-text1");


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
 * Delays the execution of a function.
 * @param {number} time - The time to delay in milliseconds.
 * @param {function} func - The function to delay.
 */
function delay(time, func) {
  setTimeout(func, time);
}


window.addEventListener("scroll", () => {
    const currentscroll = window.pageYOffset;
    if (currentscroll <= check) { 
        opacity = 1 - ((currentscroll / check)/1.35); // If user scrolls past check, begin lowering the opacity
    }
    document.querySelector(".website-top-section").style.opacity = opacity; //Updates opacity
});

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

function init()
{
  window.addEventListener("scroll", () => {
    const currentscroll = window.pageYOffset;
    if (currentscroll <= check) { 
        opacity = 1 - ((currentscroll / check)/1.35); // If user scrolls past check, begin lowering the opacity
    }
    document.querySelector(".website-top-section").style.opacity = opacity; //Updates opacity
  });
  
  typeText(header, typedText, document.getElementById("cursor0"), delay);

}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

init();
