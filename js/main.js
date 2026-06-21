/* ============================================================
   main.js — Ponto de entrada. Inicializa todos os módulos
   na ordem correta:
     theme → nav → render-vehicles → filter →
     faq → carousel → scroll-effects → whatsapp
   ============================================================ */

import { initTheme       } from './theme-toggle.js';
import { initNav         } from './nav.js';
import { renderVehicles  } from './render-vehicles.js';
import { initFilter      } from './vehicle-filter.js';
import { initFaq         } from './faq-accordion.js';
import { initCarousel         } from './testimonials-carousel.js';
import { initFeaturedCarousel } from './featured-carousel.js';
import { initScrollEffects } from './scroll-effects.js';
import { initWhatsapp    } from './whatsapp.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  renderVehicles();    // popula o grid antes do filtro e do WhatsApp
  initFilter();
  initFaq();
  initCarousel();
  initFeaturedCarousel();
  initScrollEffects();
  initWhatsapp();      // deve rodar por último para capturar [data-wa-msg] dos cards
});
