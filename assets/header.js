(() => {
  const HEADER_TEMPLATE = `
    <div class="site-header__container">
      <div class="site-header__inner">
        <a class="site-header__logo" href="curioni-preview.html" aria-label="Curioni">curioni</a>
        <nav class="site-header__nav" aria-label="Principal">
          <a href="produtos.html">Produtos</a>
          <a href="pronta-entrega.html">Pronta entrega</a>
          <a href="novidades.html">Novidades</a>
          <a href="orcamento.html">Orçamento</a>
          <a href="sobre.html">Sobre</a>
        </nav>
        <div class="site-header__actions">
          <a class="site-header__link" href="profissionais.html">Profissionais</a>
          <a class="site-header__link" href="biblioteca-tecnica.html">3D</a>
          <a class="site-header__cta" href="orcamento.html">Solicitar orçamento</a>
          <button class="site-header__toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="site-mobile-menu" data-header-toggle>☰</button>
        </div>
      </div>
      <nav class="site-header__panel" id="site-mobile-menu" data-header-panel aria-label="Menu mobile">
        <a href="curioni-preview.html">Home</a>
        <a href="produtos.html">Produtos</a>
        <a href="pronta-entrega.html">Pronta entrega</a>
        <a href="novidades.html">Novidades</a>
        <a href="orcamento.html">Orçamento</a>
        <a href="sobre.html">Sobre</a>
        <a href="profissionais.html">Profissionais</a>
        <a href="biblioteca-tecnica.html">3D</a>
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
      const isOpen = panel.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (!panel.classList.contains('is-open')) return;
      if (!header.contains(event.target)) closeMenu();
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

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  });
})();
