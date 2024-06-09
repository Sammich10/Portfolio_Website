const dropdownMenu = document.querySelector('.dropdown-content');
const dropdownLink = document.querySelector('.navbar-items.dropdown');

dropdownLink.addEventListener('mouseover', () => {
  dropdownMenu.style.display = 'block';
});

dropdownLink.addEventListener('mouseout', () => {
  dropdownMenu.style.display = 'none';
});