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

  /**
   * checks if a mobile device
   * @returns {boolean}
   */
  const isMobile = () => {
    return window.innerWidth <= 800 ;
  }

  /**
   * Checks if the snippet collapsed
   * @param element
   * @returns {boolean}
   */
  const isSnippetCollapsed = function(element) {
    return element.classList.contains('collapsed-code');
  }

  /**
   * Shows a hidden snippet
   * @param element
   */
  const showSnippet = function(element) {
    element.classList.remove('collapsed-code');
    element.classList.add('expanded-code');
  }

  /**
   * Hides a shown snippet
   * @param element
   */
  const hideSnippet = (element) => {
    element.classList.remove('expanded-code');
    element.classList.add('collapsed-code');
  }

  /**
   * Handles the snippet controller
   * @param event
   */
  const codeSnippetHandler = function(event) {
    event.preventDefault();
    const target = event.target;
    const element = event.target.nextElementSibling;
    if (isSnippetCollapsed(element)) {
      showSnippet(element);
      target.innerHTML = '> Hide snippet';
    } else {
      hideSnippet(element);
      target.innerHTML = '> Show snippet';
    }
  }

  /**
   * Prepends a controller to code container
   * @param element
   */
  const prependControllerToCodeContainers = function (element) {
    element.classList.add('collapsed-code');
    element.querySelector('pre.highlight').classList.remove('highlight');
    const controller = document.createElement('a');
    controller.addEventListener('click', codeSnippetHandler);
    controller.setAttribute('href', '#');
    controller.innerHTML = '> Show snippet';
    controller.classList.add('snippet-controller');
    element.parentNode.insertBefore(controller, element);
  }

  if (isMobile()) {
    const codeContainers = document.querySelectorAll('div.highlighter-rouge');
    codeContainers.forEach(prependControllerToCodeContainers);
  }

  const menuController = document.getElementById('nav-controller');
  if (menuController) {
    menuController.addEventListener('click', menuHandler);
  }
})();
