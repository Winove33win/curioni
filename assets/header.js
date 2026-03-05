(() => {
  const headers = document.querySelectorAll('[data-site-header]');

  headers.forEach((header) => {
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
