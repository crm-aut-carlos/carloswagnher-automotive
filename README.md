# Carlos Wagnher Automotive — Site Institucional

Site estático (HTML/CSS/JS puro, sem framework) do consultor automotivo **Carlos Wagnher**, Brasília-DF.

---

## Como testar localmente

O site usa **ES Modules** (`import/export`), que requerem um servidor HTTP — não abra `index.html` direto pelo `file://`.

### Opção 1 — `serve` (Node.js)
```bash
cd site
npx serve .
# Acesse http://localhost:3000
```

### Opção 2 — Python
```bash
cd site
python -m http.server 5500
# Acesse http://localhost:5500
```

### Opção 3 — VS Code
Instale a extensão **Live Server** e clique em *Go Live* com `index.html` aberto.

---

## Como editar o estoque

Cada categoria de veículo tem seu próprio arquivo em `data/vehicles/`:

| Arquivo | Aba no site |
|---|---|
| `data/vehicles/hibridos.js` | Híbridos |
| `data/vehicles/suvs.js` | SUVs |
| `data/vehicles/sedas.js` | Sedãs |
| `data/vehicles/picapes.js` | Picapes |

### Formato de cada veículo

```js
{
  nome: 'Toyota Corolla',
  versao: '1.8 VVT-i Hybrid Flex Altis Premium CVT',
  ano: '25/25',                    // fabricação/modelo
  km: '24.362 km',
  combustivel: ['Híbrido', 'Flex'], // array de strings
  preco: 'R$ 174.000,00',
  silhueta: 'car-sedan',           // car-hibrido | car-suv | car-sedan | car-picape
  mensagemWhatsapp: 'Olá Carlos! Quero saber mais sobre o Toyota Corolla Altis Premium Hybrid que vi no site.',
}
```

Para **adicionar** um veículo: inclua um novo objeto no array do arquivo correspondente.  
Para **remover**: delete o objeto.  
Para **mover de categoria**: mova o objeto para outro arquivo e ajuste o `silhueta` se necessário.

Os cards são renderizados automaticamente por `js/render-vehicles.js` no carregamento da página — sem necessidade de editar `index.html`.

---

## Como funciona o modo claro/escuro

| Passo | O que acontece |
|---|---|
| 1ª visita | Respeita `prefers-color-scheme` do sistema operacional |
| Clique no botão ☀/🌙 (header) | Alterna entre dark e light |
| Preferência salva | Em `localStorage` com chave `cw-theme` |
| Recarregamento | Script inline no `<head>` lê o localStorage *antes do primeiro paint*, evitando flash de tema errado |

### Variáveis de cor

Todas as cores ficam em `css/theme.css`. Há dois blocos:

```css
[data-theme="dark"]  { /* fundo obsidian, dourado #D4A954 */ }
[data-theme="light"] { /* fundo off-white quente, dourado #9A6E18 */ }
```

Para ajustar uma cor, edite apenas `css/theme.css` — o restante do CSS usa as variáveis e se adapta automaticamente.

---

## Estrutura de arquivos

```
site/
├── index.html              ← Estrutura HTML, SEO/meta, JSON-LD, SVG sprite
├── sitemap.xml
├── robots.txt
├── css/
│   ├── theme.css           ← Variáveis de cor (dark/light) — carregado PRIMEIRO
│   ├── base.css            ← Reset, tipografia, botões, utilitários, reveal
│   ├── header.css
│   ├── hero.css
│   ├── cards.css           ← icon-card, tabs, vehicle-grid, vcard
│   ├── featured.css
│   ├── testimonials.css
│   ├── faq.css             ← Accordion + CTA banner
│   ├── footer.css          ← Footer + FABs (WhatsApp, back-to-top)
│   └── responsive.css      ← Breakpoints: mobile (480) → Smart TV (>1920)
├── js/
│   ├── main.js             ← Ponto de entrada; inicializa todos os módulos
│   ├── theme-toggle.js
│   ├── nav.js              ← Header scroll, menu mobile, back-to-top
│   ├── render-vehicles.js  ← Renderiza os 16 cards a partir dos dados
│   ├── vehicle-filter.js   ← Filtro por aba + favoritar
│   ├── faq-accordion.js
│   ├── testimonials-carousel.js
│   ├── scroll-effects.js   ← Reveal no scroll + contador animado
│   └── whatsapp.js         ← Constrói links wa.me a partir de data-wa-msg
└── data/
    └── vehicles/
        ├── hibridos.js
        ├── suvs.js
        ├── sedas.js
        └── picapes.js
```

---

## Checklist do que foi feito

### UX / UI
- [x] Layout dark premium com tema claro alternativo (botão no header)
- [x] Filtro de estoque por abas (Híbridos / SUVs / Sedãs / Picapes)
- [x] Accordion de FAQ (um item aberto por vez)
- [x] Carrossel de depoimentos com autoplay, dots e setas
- [x] Contador animado de veículos vendidos (IntersectionObserver)
- [x] Scroll reveal em seções (`.reveal` + `.reveal-stagger`)
- [x] Botão "Voltar ao topo" aparece após 600px de scroll
- [x] FAB WhatsApp com animação de pulso
- [x] Header transparente → frosted glass ao rolar

### Acessibilidade (WCAG 2.1 AA)
- [x] Skip link "Pular para o conteúdo"
- [x] Hierarquia de headings correta (um único `h1`, `h2` por seção, `h3` nos cards)
- [x] Tabs de estoque com `role="tablist"` / `role="tab"` / `aria-selected`
- [x] Accordion com `aria-expanded` + `aria-controls`
- [x] Carrossel com `aria-live="polite"`, `aria-hidden` nos slides inativos, navegação por teclado (setas)
- [x] Todos os ícones decorativos com `aria-hidden="true"`
- [x] `:focus-visible` em 100% dos elementos interativos
- [x] Theme toggle com `aria-label` dinâmico + `aria-pressed`
- [x] Contraste AA em ambos os temas (dourado ajustado para `#9A6E18` no light)
- [x] `prefers-reduced-motion`: animações CSS e JS desabilitadas

### SEO
- [x] JSON-LD `AutoDealer` e `FAQPage` (textos idênticos ao original)
- [x] `sitemap.xml` e `robots.txt`
- [x] `<meta>` description, keywords, robots, author, canonical
- [x] Open Graph e Twitter Card
- [x] Fontes com `preconnect` e `font-display: swap`
- [x] Cards renderizados no `DOMContentLoaded` (Googlebot executa JS — indexável)

> **Nota SEO:** Os 16 cards de veículos são gerados por JavaScript a partir de `data/vehicles/*.js` e injetados no DOM no `DOMContentLoaded`, antes de qualquer interação do usuário. O Googlebot executa JavaScript moderno (ES Modules incluídos), portanto os cards são rastreáveis e indexáveis normalmente. Para SSG/SSR no futuro, basta converter o `renderVehicles()` em um build step.

### Performance
- [x] Nenhuma dependência externa (sem jQuery, sem frameworks)
- [x] `<script type="module">` é `defer` automático — não bloqueia o render
- [x] `min-height` no `vehicle-grid:empty` para prevenir CLS antes do JS renderizar
- [x] `loading="lazy"` pronto para imagens futuras
- [x] CSS separado por responsabilidade (tema → base → componentes → responsivo)

### Responsividade
- [x] Mobile ≤ 480px
- [x] Mobile grande / tablet retrato 481–768px
- [x] Tablet paisagem / notebook 769–1024px
- [x] Desktop 1025–1440px
- [x] Desktop grande 1441–1920px
- [x] Smart TV / 4K > 1920px — container limitado, fonte maior, foco 4px, margem de segurança overscan (5%)
