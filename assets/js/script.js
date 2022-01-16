(function() {
  /**
   * Handles mobile menu
   * @param event
   */
  const menuHandler = function(event) {
    event.preventDefault();
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    if (isMobileMenuHidden(mobileNavMenu)) {
      showNavMenu(mobileNavMenu);
    }else {
      hideNavMenu(mobileNavMenu);
    }
  }

  /**
   * Shows mobile menu
   */
  const showNavMenu = function (mobileNavMenu) {
    document.body.classList.add('overflow-hidden');
    mobileNavMenu.classList.remove('hidden');
    menuController.querySelector('ion-icon').setAttribute('name', 'close-outline');
  }

  /**
   * Hides mobile menu
   */
  const hideNavMenu = function(mobileNavMenu) {
    document.body.classList.remove('overflow-hidden');
    mobileNavMenu.classList.add('hidden');
    menuController.querySelector('ion-icon').setAttribute('name', 'menu-outline')
  }

  /**
   * Check if mobile menu is hidden
   * @returns {boolean}
   */
  const isMobileMenuHidden = function(mobileNavMenu) {
    return mobileNavMenu.classList.contains('hidden');
  }

  const menuController = document.getElementById('nav-controller');
  if (menuController) {
    menuController.addEventListener('click', menuHandler);
  }

})();