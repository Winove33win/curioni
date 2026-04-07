(() => {
  const currentPath = window.location.pathname.split('/').pop() || 'curioni-preview.html';

  const WA_NUM  = '5511999999999';
  const WA_MSG  = encodeURIComponent('Olá! Gostaria de mais informações sobre os produtos Curioni.');
  const WA_URL  = `https://wa.me/${WA_NUM}?text=${WA_MSG}`;

  const WA_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  const PRODUTOS_DROPDOWN = {
    indoor: [
      { href: 'categoria-assentos.html',      label: 'Poltronas & Cadeiras' },
      { href: 'categoria-assentos.html#sofas', label: 'Sofás' },
      { href: 'categoria-mesas.html',          label: 'Mesas' },
      { href: 'categoria-complementos.html',   label: 'Complementos' },
      { href: 'categoria-iluminacao.html',     label: 'Iluminação' },
    ],
    outdoor: [
      { href: 'categoria-area-externa.html',           label: 'Poltronas Outdoor' },
      { href: 'categoria-area-externa.html#bancos',    label: 'Bancos & Balanços' },
    ],
  };

  const primaryLinks = [
    { href: 'curioni-preview.html', label: 'Home' },
    { href: 'produtos.html',        label: 'Produtos', dropdown: true },
    { href: 'pronta-entrega.html',  label: 'Pronta Entrega', live: true },
    { href: 'ambientes.html',       label: 'Ambientes' },
    { href: 'profissionais.html',   label: 'Profissionais' },
    { href: 'sobre.html',           label: 'Marca' },
  ];

  const utilityLinks = [
    { href: 'novidades.html',       label: 'Novidades' },
    { href: 'biblioteca-tecnica.html', label: 'Biblioteca 3D' },
  ];

  const isCurrent = (href) => {
    if (currentPath === 'index.html' && href === 'curioni-preview.html') return true;
    return currentPath === href;
  };

  const dropdownMarkup = `
    <div class="nav-dropdown">
      <div class="nav-dropdown__col">
        <span class="nav-dropdown__head">Indoor</span>
        ${PRODUTOS_DROPDOWN.indoor.map(l => `<a href="${l.href}" class="nav-dropdown__link">${l.label}</a>`).join('')}
      </div>
      <div class="nav-dropdown__col">
        <span class="nav-dropdown__head">Outdoor</span>
        ${PRODUTOS_DROPDOWN.outdoor.map(l => `<a href="${l.href}" class="nav-dropdown__link">${l.label}</a>`).join('')}
        <a href="produtos.html" class="nav-dropdown__link nav-dropdown__link--all">Ver todos os produtos →</a>
      </div>
    </div>`;

  const navMarkup = primaryLinks.map(({ href, label, live, dropdown }) => {
    const cur = isCurrent(href) ? ' aria-current="page"' : '';
    const liveClass = live ? ' class="nav-live"' : '';
    const liveDot = live ? `<span class="nav-live-dot" aria-hidden="true"></span>` : '';
    if (dropdown) {
      const dropCur = (currentPath === href) ? ' aria-current="page"' : '';
      return `<div class="nav-item nav-item--has-dropdown">
        <a href="${href}"${dropCur} class="nav-item__link">
          ${label}
          <svg class="nav-item__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        ${dropdownMarkup}
      </div>`;
    }
    return `<a href="${href}"${cur}${liveClass}>${liveDot}${label}</a>`;
  }).join('');

  const utilMarkup = utilityLinks.map(({ href, label }) => {
    const cur = isCurrent(href) ? ' aria-current="page"' : '';
    return `<a class="site-header__mini-link" href="${href}"${cur}>${label}</a>`;
  }).join('');

  const mobileDropdownLinks = [
    ...PRODUTOS_DROPDOWN.indoor.map(l => ({ ...l, group: 'Indoor' })),
    ...PRODUTOS_DROPDOWN.outdoor.map(l => ({ ...l, group: 'Outdoor' })),
  ];

  const mobilePrimary = primaryLinks.map(({ href, label, live, dropdown }) => {
    const cur = isCurrent(href) ? ' aria-current="page"' : '';
    const dot = live ? `<span class="nav-live-dot" style="margin-left:auto;" aria-hidden="true"></span>` : '';
    if (dropdown) {
      const subLinks = mobileDropdownLinks.map(l =>
        `<a href="${l.href}" style="padding-left:24px;font-size:13px;color:#5a5550;">${l.group === 'Outdoor' ? '☀ ' : ''}${l.label}</a>`
      ).join('');
      return `<a href="${href}"${cur}>${label}${dot}</a>${subLinks}`;
    }
    return `<a href="${href}"${cur}>${label}${dot}</a>`;
  }).join('');

  const mobileUtility = [...utilityLinks, { href: 'orcamento.html', label: 'Solicitar orçamento' }]
    .map(({ href, label }) => {
      const cur = isCurrent(href) ? ' aria-current="page"' : '';
      return `<a href="${href}"${cur}>${label}</a>`;
    }).join('');

  const TOPBAR = `
    <div class="site-topbar">
      <div class="site-topbar__inner">
        <span class="site-topbar__msg">
          <span class="site-topbar__dot" aria-hidden="true"></span>
          <span>Pronta Entrega disponível &mdash; envio em até 48h para todo o Brasil</span>
        </span>
        <div class="site-topbar__links">
          <a href="pronta-entrega.html" class="site-topbar__link">Ver produtos →</a>
          <a href="novidades.html" class="site-topbar__link">Novidades</a>
        </div>
      </div>
    </div>`;

  const HEADER_TEMPLATE = `
    ${TOPBAR}
    <div class="site-header__container">
      <div class="site-header__inner">

        <a class="site-header__brand" href="curioni-preview.html" aria-label="Curioni — voltar para home">
          <span class="site-header__logo">curioni</span>
          <span class="site-header__caption">mobiliário autoral brasileiro</span>
        </a>

        <nav class="site-header__nav" aria-label="Navegação principal">
          ${navMarkup}
        </nav>

        <div class="site-header__actions">
          ${utilMarkup}
          <div class="site-header__sep" aria-hidden="true"></div>
          <a class="site-header__wa" href="${WA_URL}" target="_blank" rel="noopener" aria-label="Falar pelo WhatsApp">
            ${WA_SVG}
            WhatsApp
          </a>
          <a class="site-header__cta" href="orcamento.html">Orçamento</a>
          <button class="site-header__toggle" type="button" aria-label="Abrir menu de navegação" aria-expanded="false" aria-controls="site-mobile-menu" data-header-toggle>
            <span aria-hidden="true">☰</span>
          </button>
        </div>

      </div>

      <nav class="site-header__panel" id="site-mobile-menu" data-header-panel aria-label="Menu de navegação mobile">
        <div class="site-header__panel-section">
          <span class="site-header__panel-label">Navegação</span>
          ${mobilePrimary}
        </div>
        <div class="site-header__panel-section">
          <span class="site-header__panel-label">Recursos</span>
          ${mobileUtility}
        </div>
        <div class="site-header__panel-section">
          <a href="${WA_URL}" target="_blank" rel="noopener" class="panel-wa-btn">
            ${WA_SVG}
            Falar no WhatsApp
          </a>
        </div>
      </nav>
    </div>`;

  document.querySelectorAll('[data-site-header]').forEach((header) => {
    header.innerHTML = HEADER_TEMPLATE;

    const toggle = header.querySelector('[data-header-toggle]');
    const panel  = header.querySelector('[data-header-panel]');
    if (!toggle || !panel) return;

    const focusable = () => panel.querySelectorAll('a[href], button:not([disabled])');

    const close = () => {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('span').textContent = '☰';
    };

    const open = () => {
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.querySelector('span').textContent = '✕';
      const items = focusable();
      if (items.length) items[0].focus();
    };

    toggle.addEventListener('click', () =>
      panel.classList.contains('is-open') ? close() : open()
    );

    document.addEventListener('click', (e) => {
      if (panel.classList.contains('is-open') && !header.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
      if (!panel.classList.contains('is-open')) return;
      if (e.key === 'Escape') { close(); toggle.focus(); return; }
      if (e.key !== 'Tab') return;
      const items = [toggle, ...focusable()];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    panel.querySelectorAll('a').forEach(l => l.addEventListener('click', close));

    // Scroll shadow
    const addScrollClass = () =>
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    window.addEventListener('scroll', addScrollClass, { passive: true });
    addScrollClass();
  });
})();
