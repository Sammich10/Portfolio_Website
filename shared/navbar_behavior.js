const dropdownMenu = document.querySelector('.dropdown-content');
const dropdownLink = document.querySelector('.navbar-items.dropdown');

dropdownLink.addEventListener('mouseover', () => {
  dropdownMenu.style.display = 'block';
});

dropdownLink.addEventListener('mouseout', () => {
  dropdownMenu.style.display = 'none';
});

export async function handleNavClick(e)
{
  // Get a list of all the tab navigation elements
  const allTabs = document.querySelectorAll('.tab-nav');
  // Remove the active class from all tab navigation elements
  allTabs.forEach((allTabs) => {
      allTabs.classList.remove('active');
  })
  // Set the parent container of the link (tab nav) to active immediately
  e.target.parentElement.classList.add('active');
  // Get the target tab
  const targetTab = e.target.getAttribute('href');
  console.log("targetTab: " + targetTab);
  // Verify that the target tab exists in the document
  const targetTabPane = document.querySelector(targetTab);
  if(targetTabPane == null){
      console.log("Target tab " + targetTab + " not found")
      return
  }
  // Get the current active tab
  const activeTab = document.querySelector(".tab-content.active");
  if(activeTab == null){
      console.log("activeTab is null")
  }else if(activeTab == targetTabPane){
      console.log("activeTab == targetTabPane")
      return
  }
  // Start the tab transition animation for the active tab to disappear
  activeTab.classList.remove('active');
  activeTab.classList.add('hidden');
  // Get the tab transition animation time
  const tabTransitionTime = getComputedStyle(activeTab).getPropertyValue('--tab-transition_time');
  const timeValue = parseFloat(tabTransitionTime.replace("s", "")) * 1000;
  // Show the target tab pane
  setTimeout(() => {
      // Remove the display: none from the target tab pane to reveal it in the document
      targetTabPane.style.removeProperty('display');
      // Hide the active tab pane in the document
      activeTab.style.display = 'none';
      setTimeout(() => {
          // Add the active class to the target tab pane
          targetTabPane.classList.add('active');
          // Remove the hidden class from the target tab pane to start the animation
          targetTabPane.classList.remove('hidden');
          loadPaneContent(targetTabPane);
      }, timeValue);
  }, timeValue);
}

/**
 * Loads the content of the pane based on the pane being loaded
 * @param {HTMLElement} targetTabPane - The target tab pane element
 */
function loadPaneContent(targetTabPane) {
    // Based on the pane being loaded, load the content of the pane
    switch (targetTabPane.id) {
        case "tabSchedule":
            displayFeedTimes();
            break;
        case "tabLogs":
            displayFeedLogs();
            break;
    }
}