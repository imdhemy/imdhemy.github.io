import { addIcons } from 'ionicons';
import { defineCustomElement as defineIonIcon } from 'ionicons/components/ion-icon.js';
import {
  close,
  logoGithub,
  logoLinkedin,
  logoTwitter,
  logoYoutube,
  menuOutline,
} from 'ionicons/icons';
import { init as initBurgerMenu } from './burger-menu';

defineIonIcon();
addIcons({
  close,
  'logo-github': logoGithub,
  'logo-linkedin': logoLinkedin,
  'logo-twitter': logoTwitter,
  'logo-youtube': logoYoutube,
  'menu-outline': menuOutline,
});

(() => {
  initBurgerMenu();
})();
