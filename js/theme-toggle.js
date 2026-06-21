/* ============================================================
   theme-toggle.js
   Alterna dark/light, persiste em localStorage, atualiza
   aria-label, aria-pressed e ícone do botão.
   ============================================================ */

export function initTheme() {
  const root = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  if (!btn) return;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('cw-theme', theme); } catch (_) { /* private/incognito */ }

    const isDark = theme === 'dark';
    btn.setAttribute('aria-label',   isDark ? 'Ativar modo claro'  : 'Ativar modo escuro');
    btn.setAttribute('aria-pressed', isDark ? 'false' : 'true');

    // Em dark: mostra sol (ação = ir para claro)
    // Em light: mostra lua (ação = ir para escuro)
    const useEl = btn.querySelector('use');
    if (useEl) useEl.setAttribute('href', isDark ? '#ic-sun' : '#ic-moon');
  }

  // Aplica tema atual (definido pelo script inline no <head>)
  applyTheme(root.getAttribute('data-theme') || 'dark');

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}
