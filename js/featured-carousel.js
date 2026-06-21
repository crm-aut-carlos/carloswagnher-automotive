export function initFeaturedCarousel() {
  const carousel = document.getElementById('featCarousel');
  if (!carousel) return;

  const track  = carousel.querySelector('.feat-track');
  const slides = carousel.querySelectorAll('.feat-slide');
  const dots   = carousel.querySelectorAll('.feat-dot');
  const prev   = carousel.querySelector('.feat-prev');
  const next   = carousel.querySelector('.feat-next');
  const total  = slides.length;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let timer;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  }

  function startAuto() {
    if (reduced) return;
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  function stopAuto() { clearInterval(timer); }

  prev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  next.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  dots.forEach((d, i) => {
    d.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  // Swipe touch
  let startX = 0;
  carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { stopAuto(); goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
  });

  // Teclado (D-pad TV)
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); startAuto(); }
  });

  startAuto();
}
