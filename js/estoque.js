/* ============================================================
   estoque.js — Catálogo único com todos os 16 veículos
   ============================================================ */

import { hibridos } from '../data/vehicles/hibridos.js';
import { suvs     } from '../data/vehicles/suvs.js';
import { sedas    } from '../data/vehicles/sedas.js';
import { picapes  } from '../data/vehicles/picapes.js';
import { initWhatsapp } from './whatsapp.js';

// Todos os veículos em lista única, com campo categoria para o badge
const TODOS = [
  ...hibridos.map(v => ({ ...v, categoria: 'Híbrido' })),
  ...suvs    .map(v => ({ ...v, categoria: 'SUV'     })),
  ...sedas   .map(v => ({ ...v, categoria: 'Sedã'    })),
  ...picapes .map(v => ({ ...v, categoria: 'Picape'  })),
];

function buildCard(v) {
  const fuels = v.combustivel.map(f => `<span>${f}</span>`).join('');
  const media = v.imagem
    ? `<img src="${v.imagem}" alt="${v.nome} ${v.versao}" class="vcard-photo" loading="lazy" width="600" height="400">`
    : `<svg aria-label="Silhueta de ${v.nome}" role="img"><use href="#${v.silhueta}"/></svg>`;

  return `<article class="vcard" data-nome="${v.nome.toLowerCase()} ${v.versao.toLowerCase()}" data-cat="${v.categoria.toLowerCase()}">
  <div class="vcard-media${v.imagem ? ' vcard-media--photo' : ''}">
    <span class="badge-verified">
      <svg aria-hidden="true"><use href="#ic-shield"/></svg>Procedência ok
    </span>
    <span class="badge-cat">${v.categoria}</span>
    <button class="fav-btn" aria-label="Favoritar ${v.nome}">
      <svg aria-hidden="true"><use href="#ic-heart"/></svg>
    </button>
    ${media}
  </div>
  <div class="vcard-body">
    <h3>${v.nome}</h3>
    <p class="vsub">${v.versao}</p>
    <div class="vspecs">
      <span><svg aria-hidden="true"><use href="#ic-calendar"/></svg>${v.ano}</span>
      <span><svg aria-hidden="true"><use href="#ic-gauge"/></svg>${v.km}</span>
    </div>
    <div class="vfuel">${fuels}</div>
    <div class="vprice"><small>À vista</small>${v.preco}</div>
    <a class="btn btn-whatsapp btn-sm btn-block"
       data-wa-msg="${v.mensagemWhatsapp}"
       href="#" target="_blank" rel="noopener">
      <svg style="width:14px;height:14px" aria-hidden="true"><use href="#ic-whats"/></svg>
      Falar no WhatsApp
    </a>
  </div>
</article>`;
}

function renderEstoque() {
  const root = document.getElementById('estoqueRoot');
  if (!root) return;

  root.innerHTML = `
    <section class="section-pad" id="catalogo">
      <div class="container">
        <div class="catalogo-header">
          <div>
            <p class="eyebrow">📋 Catálogo completo</p>
            <h2 class="section-title">Todos os veículos disponíveis</h2>
          </div>
          <span class="cat-count" id="countLabel">${TODOS.length} veículos</span>
        </div>

        <!-- Filtro rápido por texto -->
        <div class="catalogo-search">
          <input type="search" id="quickSearch" placeholder="Buscar por marca ou modelo…" autocomplete="off"
                 aria-label="Buscar veículo no catálogo">
          <div class="filter-btns">
            <button class="filter-btn active" data-filter="todos">Todos</button>
            <button class="filter-btn" data-filter="híbrido">Híbridos</button>
            <button class="filter-btn" data-filter="suv">SUVs</button>
            <button class="filter-btn" data-filter="sedã">Sedãs</button>
            <button class="filter-btn" data-filter="picape">Picapes</button>
          </div>
        </div>

        <div class="vehicle-grid reveal-stagger" id="catalogoGrid">
          ${TODOS.map((v, i) => `<div class="reveal" style="--i:${i}">${buildCard(v)}</div>`).join('\n')}
        </div>

        <p class="sem-resultado" id="semResultado" hidden>
          Nenhum veículo encontrado. <a href="#busca" class="text-gold">Busque o seu carro ideal →</a>
        </p>
      </div>
    </section>
  `;

  initWhatsapp();

  // Animação reveal
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ── Filtro rápido por texto + botão de categoria ──────────
  const input   = document.getElementById('quickSearch');
  const grid    = document.getElementById('catalogoGrid');
  const semRes  = document.getElementById('semResultado');
  const counter = document.getElementById('countLabel');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let catAtiva = 'todos';

  function aplicarFiltro() {
    const texto = input.value.toLowerCase().trim();
    const cards = grid.querySelectorAll('.vcard');
    let visivel = 0;

    cards.forEach(card => {
      const nomeMatch = !texto || card.dataset.nome.includes(texto);
      const catMatch  = catAtiva === 'todos' || card.dataset.cat === catAtiva;
      const wrapper   = card.closest('.reveal') || card;
      const mostrar   = nomeMatch && catMatch;
      wrapper.style.display = mostrar ? '' : 'none';
      if (mostrar) visivel++;
    });

    counter.textContent = `${visivel} veículos`;
    semRes.hidden = visivel > 0;
  }

  input.addEventListener('input', aplicarFiltro);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      catAtiva = btn.dataset.filter;
      aplicarFiltro();
    });
  });
}

document.addEventListener('DOMContentLoaded', renderEstoque);
