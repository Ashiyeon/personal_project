// Get the header and members section elements
const header = document.querySelector('.header-area');
const membersSection = document.getElementById('members-section');

// Calculate the initial offset of the members section from the top of the page
const membersSectionOffset = membersSection.offsetTop;

// Function to toggle the sticky class on the members section
function toggleStickyMembersSection() {
  if (window.pageYOffset >= membersSectionOffset) {
    membersSection.classList.add('sticky');
  } else {
    membersSection.classList.remove('sticky');
  }
}

// Event listener for the scroll event
window.addEventListener('scroll', toggleStickyMembersSection);
