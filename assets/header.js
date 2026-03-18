(() => {
  const currentPath = window.location.pathname.split('/').pop() || 'curioni-preview.html';

  const primaryLinks = [
    { href: 'curioni-preview.html', label: 'Home' },
    { href: 'produtos.html', label: 'Produtos' },
    { href: 'pronta-entrega.html', label: 'Pronta entrega' },
    { href: 'ambientes.html', label: 'Ambientes' },
    { href: 'profissionais.html', label: 'Profissionais' },
    { href: 'sobre.html', label: 'Marca' }
  ];

  const utilityLinks = [
    { href: 'novidades.html', label: 'Novidades' },
    { href: 'biblioteca-tecnica.html', label: 'Biblioteca 3D' }
  ];

  const isCurrent = (href) => {
    if (currentPath === 'index.html' && href === 'curioni-preview.html') return true;
    return currentPath === href;
  };

  const navMarkup = primaryLinks.map(({ href, label }) => `
    <a href="${href}"${isCurrent(href) ? ' aria-current="page"' : ''}>${label}</a>
  `).join('');

  const utilityMarkup = utilityLinks.map(({ href, label }) => `
    <a class="site-header__mini-link" href="${href}"${isCurrent(href) ? ' aria-current="page"' : ''}>${label}</a>
  `).join('');

  const mobilePrimaryMarkup = primaryLinks.map(({ href, label }) => `
    <a href="${href}"${isCurrent(href) ? ' aria-current="page"' : ''}>${label}</a>
  `).join('');

  const mobileUtilityMarkup = utilityLinks.concat([
    { href: 'orcamento.html', label: 'Solicitar orçamento' }
  ]).map(({ href, label }) => `
    <a href="${href}"${isCurrent(href) ? ' aria-current="page"' : ''}>${label}</a>
  `).join('');

  const HEADER_TEMPLATE = `
    <div class="site-header__container">
      <div class="site-header__inner">
        <a class="site-header__brand" href="curioni-preview.html" aria-label="Curioni">
          <span class="site-header__logo">curioni</span>
          <span class="site-header__caption">mobiliário autoral brasileiro</span>
        </a>
        <nav class="site-header__nav" aria-label="Principal">
          ${navMarkup}
        </nav>
        <div class="site-header__actions">
          ${utilityMarkup}
          <div class="site-header__support" aria-label="Atendimento">
            <strong>Atendimento</strong>
            <span>Projetos, especificação e vendas</span>
          </div>
          <a class="site-header__cta" href="orcamento.html">Solicitar orçamento</a>
          <button class="site-header__toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="site-mobile-menu" data-header-toggle>☰</button>
        </div>
      </div>
      <nav class="site-header__panel" id="site-mobile-menu" data-header-panel aria-label="Menu mobile">
        <div class="site-header__panel-section">
          <span class="site-header__panel-label">Navegação</span>
          ${mobilePrimaryMarkup}
        </div>
        <div class="site-header__panel-section">
          <span class="site-header__panel-label">Recursos</span>
          ${mobileUtilityMarkup}
        </div>
      </nav>
    </div>`;

  const headers = document.querySelectorAll('[data-site-header]');

  headers.forEach((header) => {
    header.innerHTML = HEADER_TEMPLATE;

    const toggle = header.querySelector('[data-header-toggle]');
    const panel = header.querySelector('[data-header-panel]');
    if (!toggle || !panel) return;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const closeMenu = () => {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      const focusables = panel.querySelectorAll(focusableSelector);
      if (focusables.length) focusables[0].focus();
    };

    toggle.addEventListener('click', () => {
      if (panel.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    document.addEventListener('click', (event) => {
      if (panel.classList.contains('is-open') && !header.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (!panel.classList.contains('is-open')) return;
      if (event.key === 'Escape') {
        closeMenu();
        toggle.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = [toggle, ...panel.querySelectorAll(focusableSelector)];
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  });
})();
