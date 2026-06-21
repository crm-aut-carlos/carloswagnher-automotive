/* ============================================================
   render-vehicles.js
   Importa os dados de /data/vehicles/*.js e renderiza os cards
   no DOM imediatamente no DOMContentLoaded (antes de qualquer
   interação do usuário), garantindo visibilidade para crawlers
   que executam JavaScript (ex.: Googlebot).
   ============================================================ */

import { hibridos } from '../data/vehicles/hibridos.js';
import { suvs     } from '../data/vehicles/suvs.js';
import { sedas    } from '../data/vehicles/sedas.js';
import { picapes  } from '../data/vehicles/picapes.js';

const CATEGORIES = { hibridos, suvs, sedas, picapes };
const DEFAULT_CAT = 'hibridos';

function buildCard(v, cat) {
  const fuels  = v.combustivel.map(f => `<span>${f}</span>`).join('');
  const hidden = cat !== DEFAULT_CAT ? ' hidden' : '';

  const media = v.imagem
    ? `<img src="${v.imagem}" alt="${v.nome} ${v.versao}" class="vcard-photo" loading="lazy" width="600" height="400">`
    : `<svg aria-label="Silhueta de ${v.nome}" role="img"><use href="#${v.silhueta}"/></svg>`;

  return `<article class="vcard" data-cat="${cat}"${hidden}>
  <div class="vcard-media${v.imagem ? ' vcard-media--photo' : ''}">
    <span class="badge-verified">
      <svg aria-hidden="true"><use href="#ic-shield"/></svg>Procedência ok
    </span>
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
    <a class="btn btn-ghost btn-sm btn-block"
       data-wa-msg="${v.mensagemWhatsapp}"
       href="#" target="_blank" rel="noopener">Saiba mais</a>
  </div>
</article>`;
}

export function renderVehicles() {
  const grid = document.getElementById('vehicleGrid');
  if (!grid) return;

  const html = Object.entries(CATEGORIES)
    .flatMap(([cat, list]) => list.map(v => buildCard(v, cat)))
    .join('\n');

  grid.innerHTML = html;
}
