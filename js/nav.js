/* ============================================================
   nav.js — Header scroll, mobile menu, back-to-top
   ============================================================ */

export function initNav() {
  const header    = document.getElementById('siteHeader');
  const fabTop    = document.getElementById('fabTop');
  const toggle    = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
    fabTop.classList.toggle('show',     window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  fabTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  toggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
