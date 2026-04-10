(() => {
  const currentPath = window.location.pathname.split('/').pop() || 'curioni-preview.html';

  const WA_NUM  = '5511999999999';
  const WA_MSG  = encodeURIComponent('Olá! Gostaria de mais informações sobre os produtos Curioni.');
  const WA_URL  = `https://wa.me/${WA_NUM}?text=${WA_MSG}`;

  const WA_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  // ── Dados do mega-menu ──────────────────────────────────────
  const MEGA = {
    indoor: {
      label: 'Indoor',
      items: [
        { href: 'categoria-assentos.html',     label: 'Cadeiras' },
        { href: 'categoria-assentos.html',     label: 'Poltronas' },
        { href: 'categoria-assentos.html',     label: 'Sofás' },
        { href: 'categoria-assentos.html',     label: 'Bancos / Puffs' },
        { href: 'categoria-mesas.html',        label: 'Mesas de Jantar' },
        { href: 'categoria-mesas.html',        label: 'Mesas de Centro' },
        { href: 'categoria-mesas.html',        label: 'Mesas Laterais' },
        { href: 'categoria-complementos.html', label: 'Estantes / Aparadores' },
        { href: 'categoria-complementos.html', label: 'Carrinhos' },
        { href: 'categoria-iluminacao.html',   label: 'Iluminação' },
      ],
    },
    outdoor: {
      label: 'Outdoor',
      items: [
        { href: 'categoria-area-externa.html', label: 'Poltronas Outdoor' },
        { href: 'categoria-area-externa.html', label: 'Cadeiras Outdoor' },
        { href: 'categoria-area-externa.html', label: 'Mesas Outdoor' },
        { href: 'categoria-area-externa.html', label: 'Bancos & Balanços' },
      ],
    },
  };

  // ── Mega-menu HTML ──────────────────────────────────────────
  const megaMenuMarkup = `
    <div class="mega-menu" id="mega-menu" role="menu">
      <div class="mega-menu__inner">
        <!-- Coluna de grupos -->
        <div class="mega-menu__groups">
          <a href="produtos.html" class="mega-menu__group-all">
            Todos os produtos
          </a>
          ${Object.entries(MEGA).map(([key, group]) => `
          <button class="mega-menu__group-btn" data-group="${key}" type="button">
            ${group.label}
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
              <path d="M1 1L6 6L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>`).join('')}
        </div>
        <!-- Painel de subcategorias -->
        <div class="mega-menu__panel" id="mega-panel">
          ${Object.entries(MEGA).map(([key, group]) => `
          <div class="mega-menu__sublist" data-sublist="${key}">
            <span class="mega-menu__sublist-head">${group.label}</span>
            ${group.items.map(item => `
            <a href="${item.href}" class="mega-menu__sublink">${item.label}</a>`).join('')}
          </div>`).join('')}
        </div>
      </div>
    </div>`;

  const primaryLinks = [
    { href: 'curioni-preview.html', label: 'Home' },
    { href: 'produtos.html',        label: 'Produtos', mega: true },
    { href: 'ambientes.html',       label: 'Ambientes' },
  ];


  const isCurrent = (href) => {
    if (currentPath === 'index.html' && href === 'curioni-preview.html') return true;
    return currentPath === href;
  };

  // Nav desktop
  const navMarkup = primaryLinks.map(({ href, label, live, mega }) => {
    const cur      = isCurrent(href) ? ' aria-current="page"' : '';
    const liveClass = live ? ' class="nav-live"' : '';
    const liveDot   = live ? `<span class="nav-live-dot" aria-hidden="true"></span>` : '';

    if (mega) {
      const megaCur = isCurrent(href) ? ' aria-current="page"' : '';
      return `<div class="nav-item nav-item--mega" id="nav-produtos">
        <button class="nav-item__btn${isCurrent(href) ? ' is-current' : ''}" data-mega-trigger type="button"${megaCur}>
          ${label}
          <svg class="nav-item__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        ${megaMenuMarkup}
      </div>`;
    }
    return `<a href="${href}"${cur}${liveClass}>${liveDot}${label}</a>`;
  }).join('');


  // Nav mobile — hierarquica
  const mobileAllLinks = [
    ...MEGA.indoor.items.map(l => ({ ...l, group: 'Indoor' })),
    ...MEGA.outdoor.items.map(l => ({ ...l, group: 'Outdoor' })),
  ];

  const mobilePrimary = primaryLinks.map(({ href, label, live, mega }) => {
    const cur = isCurrent(href) ? ' aria-current="page"' : '';
    const dot = live ? `<span class="nav-live-dot" style="margin-left:auto;" aria-hidden="true"></span>` : '';
    if (mega) {
      let lastGroup = '';
      const subLinks = mobileAllLinks.map(l => {
        let groupHeader = '';
        if (l.group !== lastGroup) {
          lastGroup = l.group;
          groupHeader = `<span class="mobile-sub-head">${l.group}</span>`;
        }
        return `${groupHeader}<a href="${l.href}" class="mobile-sub-link">${l.label}</a>`;
      }).join('');
      return `<a href="${href}"${cur} class="mobile-main-link">${label}</a>${subLinks}`;
    }
    return `<a href="${href}"${cur}>${label}${dot}</a>`;
  }).join('');

  const mobileUtility = `<a href="biblioteca-tecnica.html"${isCurrent('biblioteca-tecnica.html') ? ' aria-current="page"' : ''}>Biblioteca 3D</a>`;

  const TOPBAR = `
    <div class="site-topbar">
      <div class="site-topbar__inner">
        <span class="site-topbar__msg">
          <span class="site-topbar__dot" aria-hidden="true"></span>
          <span>Pronta Entrega disponível &mdash; envio em até 48h para todo o Brasil</span>
        </span>
        <div class="site-topbar__links">
          <a href="pronta-entrega.html" class="site-topbar__link">Ver produtos →</a>
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
          <a class="site-header__mini-link" href="biblioteca-tecnica.html">Biblioteca 3D</a>
          <div class="site-header__sep" aria-hidden="true"></div>
          <a class="site-header__wa" href="${WA_URL}" target="_blank" rel="noopener" aria-label="Falar pelo WhatsApp">
            ${WA_SVG}
            WhatsApp
          </a>
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

  // ── Init por header ──────────────────────────────────────────
  document.querySelectorAll('[data-site-header]').forEach((header) => {
    header.innerHTML = HEADER_TEMPLATE;

    // ── Mobile toggle ────────────────────────────────────────
    const toggle = header.querySelector('[data-header-toggle]');
    const panel  = header.querySelector('[data-header-panel]');
    if (toggle && panel) {
      const focusable = () => panel.querySelectorAll('a[href], button:not([disabled])');
      const closePanel = () => {
        panel.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('span').textContent = '☰';
      };
      const openPanel = () => {
        panel.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.querySelector('span').textContent = '✕';
        const items = focusable();
        if (items.length) items[0].focus();
      };
      toggle.addEventListener('click', () =>
        panel.classList.contains('is-open') ? closePanel() : openPanel()
      );
      document.addEventListener('click', (e) => {
        if (panel.classList.contains('is-open') && !header.contains(e.target)) closePanel();
      });
      document.addEventListener('keydown', (e) => {
        if (!panel.classList.contains('is-open')) return;
        if (e.key === 'Escape') { closePanel(); toggle.focus(); return; }
        if (e.key !== 'Tab') return;
        const items = [toggle, ...focusable()];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
      panel.querySelectorAll('a').forEach(l => l.addEventListener('click', closePanel));
    }

    // ── Mega-menu JS-driven ──────────────────────────────────
    // Mover o mega-menu para filho direto do site-header (full-width)
    const megaMenuEl = header.querySelector('#mega-menu');
    if (megaMenuEl) header.appendChild(megaMenuEl);

    const navItem     = header.querySelector('.nav-item--mega');
    const megaTrigger = header.querySelector('[data-mega-trigger]');
    const megaMenu    = header.querySelector('#mega-menu');

    if (navItem && megaTrigger && megaMenu) {
      let closeTimer = null;

      const openMega = () => {
        clearTimeout(closeTimer);
        megaMenu.classList.add('is-open');
        megaTrigger.classList.add('is-open');
        megaTrigger.querySelector('.nav-item__chevron').style.transform = 'rotate(180deg)';
      };

      const schedulClose = () => {
        closeTimer = setTimeout(() => {
          megaMenu.classList.remove('is-open');
          megaTrigger.classList.remove('is-open');
          megaTrigger.querySelector('.nav-item__chevron').style.transform = '';
          // reset sublists
          megaMenu.querySelectorAll('.mega-menu__sublist').forEach(s => s.classList.remove('is-active'));
          megaMenu.querySelectorAll('.mega-menu__group-btn').forEach(b => b.classList.remove('is-active'));
        }, 120);
      };

      // Abrir ao hover no trigger ou no próprio mega-menu
      navItem.addEventListener('mouseenter', openMega);
      navItem.addEventListener('mouseleave', schedulClose);
      megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      megaMenu.addEventListener('mouseleave', schedulClose);
      // Re-abrir se mouse voltar ao navItem enquanto timer pendente
      megaTrigger.addEventListener('mouseenter', openMega);

      // Trigger via click também (acessibilidade)
      megaTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        megaMenu.classList.contains('is-open') ? schedulClose() : openMega();
      });

      // Fechar ao clicar fora
      document.addEventListener('click', (e) => {
        if (!navItem.contains(e.target)) {
          megaMenu.classList.remove('is-open');
          megaTrigger.classList.remove('is-open');
          megaTrigger.querySelector('.nav-item__chevron').style.transform = '';
        }
      });

      // Esc fecha
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && megaMenu.classList.contains('is-open')) {
          megaMenu.classList.remove('is-open');
          megaTrigger.classList.remove('is-open');
          megaTrigger.querySelector('.nav-item__chevron').style.transform = '';
          megaTrigger.focus();
        }
      });

      // ── Lógica Indoor / Outdoor ──────────────────────────
      const groupBtns = megaMenu.querySelectorAll('.mega-menu__group-btn');
      const subLists  = megaMenu.querySelectorAll('.mega-menu__sublist');

      const activateGroup = (key) => {
        groupBtns.forEach(b => b.classList.toggle('is-active', b.dataset.group === key));
        subLists.forEach(s  => s.classList.toggle('is-active',  s.dataset.sublist === key));
      };

      // Activar indoor por padrão ao abrir
      navItem.addEventListener('mouseenter', () => activateGroup('indoor'));
      megaTrigger.addEventListener('click',  () => activateGroup('indoor'));

      groupBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => activateGroup(btn.dataset.group));
        btn.addEventListener('click',      () => activateGroup(btn.dataset.group));
      });
    }

    // ── Scroll shadow ─────────────────────────────────────────
    const addScrollClass = () =>
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    window.addEventListener('scroll', addScrollClass, { passive: true });
    addScrollClass();
  });
})();
