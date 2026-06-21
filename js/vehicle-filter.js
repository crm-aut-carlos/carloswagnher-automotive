/* ============================================================
   vehicle-filter.js — Filtro de categoria + favoritar
   ============================================================ */

export function initFilter() {
  const tabs  = document.querySelectorAll('.tab-btn');
  const grid  = document.getElementById('vehicleGrid');

  // Filtro por aba
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');
      grid.querySelectorAll('.vcard').forEach(card => {
        card.hidden = card.getAttribute('data-cat') !== filter;
      });
    });
  });

  // Favoritar (persiste apenas durante a sessão)
  grid.addEventListener('click', e => {
    const favBtn = e.target.closest('.fav-btn');
    if (!favBtn) return;
    e.preventDefault();
    const active = favBtn.classList.toggle('active');
    const name   = favBtn.getAttribute('aria-label').replace('Favoritar ', '');
    favBtn.setAttribute('aria-label', active ? `Desfavoritar ${name}` : `Favoritar ${name}`);
  });
}
