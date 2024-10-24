import { handleTypeAnimation } from '../shared/typed_text.js';
import { handleScrollAnimation } from '../shared/scroll_behavior.js';
import { handleNavClick } from '../shared/navbar_behavior.js';

const default_tab = 'tabHistoryNav';
const default_tab_content = 'tabHistory';

document.addEventListener('DOMContentLoaded', async function() {
    // Get all the elements marked with the class .js-type
    const typeElements = document.querySelectorAll('.typed-text')
    // Select all elements with class "js-scroll"
    const scrollElements = document.querySelectorAll(".js-scroll"); // Select all elements with class "js-scroll"

    // Add an event listener to the animated elements
    window.addEventListener('scroll', () => {
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            typeElements.forEach((el) => {
                handleTypeAnimation(el);
            });
            scrollElements.forEach((el) => {
                handleScrollAnimation(el);
            });
        }, 100);
    });

    
    // Get the tab navigation and content elements
    const tabNav = document.querySelectorAll('.tab-nav-link');
    // Add event listener to the tab navigation
    tabNav.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            handleNavClick(e);
        });
    })

    // Enable and display the default tab
    const defaultTab = document.getElementById(default_tab);
    const defaultTabContent = document.getElementById(default_tab_content);
    defaultTab.classList.add('active');
    defaultTabContent.classList.remove('hidden');
    defaultTabContent.classList.add('active');
    defaultTabContent.style.removeProperty('display');

    // Trigger a scroll event on DOM load after 0.5 seconds
    
    setTimeout(() => {window.dispatchEvent(new Event('scroll'));}, 1000);
});