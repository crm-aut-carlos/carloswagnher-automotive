/* ============================================================
   scroll-effects.js — Reveal no scroll + contador animado
   ============================================================ */

export function initScrollEffects() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Scroll reveal ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    });
  }, { threshold: .12 });

  revealEls.forEach(el => {
    if (reducedMotion) {
      // exibe imediatamente sem animação
      el.classList.add('is-visible');
    } else {
      revealObs.observe(el);
    }
  });

  // ── Contador animado ──────────────────────────────────────
  const counters = document.querySelectorAll('.counter');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);

      if (reducedMotion) {
        el.textContent = target;
      } else {
        let current  = 0;
        const step   = Math.max(1, Math.round(target / 40));
        const iv     = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(iv); }
          el.textContent = current;
        }, 30);
      }
      counterObs.unobserve(el);
    });
  }, { threshold: .5 });

  counters.forEach(c => counterObs.observe(c));

  // ── Ano no footer ─────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
