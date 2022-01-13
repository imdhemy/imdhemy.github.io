const controller = document.getElementById('nav-controller');
const mobileNavMenu = document.getElementById('mobile-nav-menu');

/**
 * Handles mobile menu
 * @param event
 */
const menuHandler = function(event) {
  event.preventDefault();
  if (isMobileMenuHidden()) {
    showNavMenu();
  }else {
    hideNavMenu();
  }
}

/**
 * Shows mobile menu
 */
const showNavMenu = function () {
  document.body.classList.add('overflow-hidden');
  mobileNavMenu.classList.remove('hidden');
  controller.querySelector('ion-icon').setAttribute('name', 'close-outline');
}

/**
 * Hides mobile menu
 */
const hideNavMenu = function() {
  document.body.classList.remove('overflow-hidden');
  mobileNavMenu.classList.add('hidden');
  controller.querySelector('ion-icon').setAttribute('name', 'menu-outline')
}

/**
 * Check if mobile menu is hidden
 * @returns {boolean}
 */
const isMobileMenuHidden = function() {
  return mobileNavMenu.classList.contains('hidden');
}

if (controller) {
  controller.addEventListener('click', menuHandler);
}
