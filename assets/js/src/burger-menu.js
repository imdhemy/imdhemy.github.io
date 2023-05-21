const menuIcon = 'menu-outline';
const closeIcon = 'close';

export const init = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  if (!menuToggle) return;

  menuToggle.addEventListener('click', function() {
    const target = document.querySelector(this.dataset.target);
    target.classList.toggle('-z-10');
    target.classList.toggle('opacity-0');

    const icon = this.querySelector('ion-icon');
    icon.name = icon.name === menuIcon ? closeIcon : menuIcon;
  });
};
