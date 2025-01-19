import {addScrollListener} from "./animations/scroll.js"
import {addTypeListener, cycleHeaderText} from "./animations/type.js"
import {sleep} from "./animations/common.js"
export async function init()
{
    // Query all elements with class "js-scroll"
    const scrollElements = document.querySelectorAll(".js-scroll")

    // Add event listener for elements with scrolling animation
    scrollElements.forEach((el) => {
        addScrollListener(el);
    })

    // Query all elements with class "js-type"
    const typeElements = document.querySelectorAll(".js-type");

    // Add event listener for elements with typing animation
    typeElements.forEach((el) => {
        const text = el.getAttribute("data-text");
        addTypeListener(el, text);
    });

    // Trigger a scroll event to start the animations
    window.dispatchEvent(new Event('scroll'));

    await sleep(2500);

    // Query the element with id "typed-text-header"
    const headerTextElement = document.getElementById("typed-text-header");
    // Start the header text animation cycle
    cycleHeaderText(headerTextElement);

    // Log that the index has loaded
    console.log("index loaded");
}
