/* ============================================================
   whatsapp.js
   Constrói os links de WhatsApp a partir de data-wa-msg.
   Deve rodar DEPOIS de renderVehicles() para capturar os cards.
   ============================================================ */

const WA_NUMBER = '5561983022093';

export function initWhatsapp() {
  document.querySelectorAll('[data-wa-msg]').forEach(el => {
    const msg = el.getAttribute('data-wa-msg');
    el.setAttribute(
      'href',
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
    );
  });
}
