
const check = (window.innerHeight - 25); //Point at which fade animation ends (i.e. background will be fulled faded)
const header = "Sam Michelsen's Website";
const sub_header = "Software Engineer wannabe; Lover of cats"
const typedText = document.getElementById("typed-text1");
const typedText_2 = document.getElementById("typed-text2")


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
    }else{
      document.getElementById("cursor0").style.opacity = 0;
    }
  }());
},1000);

let j = 0;
setTimeout(function() {
  (function type2() {
    document.getElementById("cursor1").style.opacity = 1;
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

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
