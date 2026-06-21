/* ============================================================
   testimonials-carousel.js
   Carrossel acessível: teclado (setas), touch swipe, aria-live,
   autoplay respeita prefers-reduced-motion.
   ============================================================ */

export function initCarousel() {
  const slidesWrap = document.getElementById('testiSlides');
  if (!slidesWrap) return;

  const dotsWrap  = document.getElementById('testiDots');
  const prevBtn   = document.getElementById('testiPrev');
  const nextBtn   = document.getElementById('testiNext');
  const liveRegion = document.getElementById('testiLive');
  const wrap      = document.querySelector('.testi-wrap');

  const slides    = Array.from(slidesWrap.children);
  const total     = slides.length;
  let idx   = 0;
  let timer = null;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
  });

  function goTo(n) {
    idx = (n + total) % total;
    slidesWrap.style.transform = `translateX(-${idx * 100}%)`;

    dotsWrap.querySelectorAll('.testi-dot').forEach((d, j) =>
      d.classList.toggle('active', j === idx)
    );

    // Acessibilidade: oculta slides inativos de leitores de tela
    slides.forEach((s, j) =>
      s.setAttribute('aria-hidden', String(j !== idx))
    );

    // Anuncia depoimento ativo
    if (liveRegion) {
      const name = slides[idx].querySelector('.testi-name')?.textContent ?? '';
      liveRegion.textContent = `Depoimento de ${name}`;
    }
  }

  function restart() {
    clearInterval(timer);
    if (!reducedMotion) {
      timer = setInterval(() => goTo(idx + 1), 6000);
    }
  }

  prevBtn.addEventListener('click', () => { goTo(idx - 1); restart(); });
  nextBtn.addEventListener('click', () => { goTo(idx + 1); restart(); });

  // Pausa no hover (desktop)
  wrap.addEventListener('mouseenter', () => clearInterval(timer));
  wrap.addEventListener('mouseleave', restart);

  // Navegação por teclado (D-pad de TV / setas do desktop)
  wrap.setAttribute('tabindex', '0');
  wrap.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(idx - 1); restart(); }
    if (e.key === 'ArrowRight') { goTo(idx + 1); restart(); }
  });

  // Touch swipe
  let touchStartX = 0;
  slidesWrap.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  slidesWrap.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { goTo(idx + (dx < 0 ? 1 : -1)); restart(); }
  }, { passive: true });

  goTo(0);
  restart();
}
