/* ============================================================
   faq-accordion.js — WCAG accordion com aria-expanded/aria-controls
   ============================================================ */

export function initFaq() {
  document.querySelectorAll('.faq-item').forEach((item, i) => {
    const btn   = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');

    const panelId = `faq-panel-${i}`;
    panel.id = panelId;
    btn.setAttribute('aria-controls', panelId);
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // fecha todos
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other === item) return;
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      if (isOpen) {
        item.classList.remove('open');
        panel.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
