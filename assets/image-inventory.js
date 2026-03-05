(function () {
  const IMAGE_INVENTORY = {
    homeHero: { src: 'assets/asset-462448481431453704.jpg', alt: 'Ambiente Curioni com sofá e mesa de centro.' },

    catAssentos: { src: 'assets/asset-461367800449286146.jpg', alt: 'Categoria assentos com poltrona em destaque.' },
    catMesas: { src: 'assets/asset-462142869560242180.jpg', alt: 'Categoria mesas com mesa de jantar.' },
    catComplementos: { src: 'assets/asset-462146473830469637.jpg', alt: 'Categoria complementos com buffet.' },
    catIluminacao: { src: 'assets/asset-462126192244191239.jpg', alt: 'Categoria iluminação com luminária.' },
    catExterna: { src: 'assets/asset-461714159790497796.jpg', alt: 'Categoria área externa com banco.' },

    launchSofaCurva: { src: 'assets/asset-462425873725923334.jpg', alt: 'Sofá Curva em tecido claro.' },
    launchPoltronaAlma: { src: 'assets/asset-461367800449286146.jpg', alt: 'Poltrona Alma em ambiente interno.' },
    launchMesaVelo: { src: 'assets/asset-462142869560242180.jpg', alt: 'Mesa Vélo com tampo mineral.' },
    launchAbajurLia: { src: 'assets/asset-462126192244191239.jpg', alt: 'Abajur Lía em madeira e linho.' },
    launchCadeiraPierre: { src: 'assets/asset-461111335750721541.jpg', alt: 'Cadeira Pierre em freijó.' },
    launchBuffetModulo: { src: 'assets/asset-462146473830469637.jpg', alt: 'Buffet Módulo com acabamento em lâmina natural.' },
    launchPendenteArco: { src: 'assets/asset-462144517540052992.jpg', alt: 'Pendente Arco em latão escovado.' },
    launchBancoTenda: { src: 'assets/asset-461714159790497796.jpg', alt: 'Banco Tenda para uso interno e externo.' },

    prontaPoltronaAlma: { src: 'assets/asset-461367800449286146.jpg', alt: 'Produto pronta entrega: Poltrona Alma.' },
    prontaMesaVelo: { src: 'assets/asset-462142869560242180.jpg', alt: 'Produto pronta entrega: Mesa Vélo.' },
    prontaAbajurLia: { src: 'assets/asset-462126192244191239.jpg', alt: 'Produto pronta entrega: Abajur Lía.' },
    prontaBuffetModulo: { src: 'assets/asset-462146473830469637.jpg', alt: 'Produto pronta entrega: Buffet Módulo.' },

    vitrineAbajurFocus: { src: 'assets/asset-462126192244191239.jpg', alt: 'Vitrine arquiteto: Abajur Focus.' },
    vitrineMesaCiano: { src: 'assets/asset-462142869560242180.jpg', alt: 'Vitrine arquiteto: Mesa Ciano.' },
    vitrinePoltronaAlma: { src: 'assets/asset-461367800449286146.jpg', alt: 'Vitrine arquiteto: Poltrona Alma.' },
    vitrineBalancoOca: { src: 'assets/asset-462125518391504902.jpg', alt: 'Vitrine arquiteto: Balanço Oca.' },

    ambHeroSala: { src: 'assets/asset-462448481431453704.jpg', alt: 'Ambiente principal da página de ambientes.' },
    ambSalaPrincipal: { src: 'assets/asset-462449680457158665.jpg', alt: 'Sala integrada com mobiliário Curioni.' },
    ambJantar: { src: 'assets/asset-462142869560242180.jpg', alt: 'Ambiente de jantar com mesa e cadeiras.' },
    ambSuite: { src: 'assets/asset-462177549890211848.jpg', alt: 'Suíte com iluminação suave.' },
    ambVaranda: { src: 'assets/asset-461714159790497796.jpg', alt: 'Varanda com mobiliário externo.' },
    ambHomeOffice: { src: 'assets/asset-461402256836988932.jpg', alt: 'Home office com composição funcional.' },
    ambLounge: { src: 'assets/asset-462425873725923334.jpg', alt: 'Lounge com peças de recepção.' },
    ambExterno: { src: 'assets/asset-461698222936862725.jpg', alt: 'Deck externo com mobiliário resistente.' },

    pdpMain1: { src: 'assets/asset-462125518391504902.jpg', alt: 'Cadeira Fly em destaque.' },
    pdpThumb2: { src: 'assets/asset-462129685600288777.jpg', alt: 'Cadeira Fly em perspectiva lateral.' },
    pdpThumb3: { src: 'assets/asset-462177549890211848.jpg', alt: 'Cadeira Fly em ambiente integrado.' },

    megaFeatured: { src: 'assets/asset-462125518391504902.jpg', alt: 'Destaque do mega menu com produto Curioni.' },
    megaBanner: { src: 'assets/asset-462177549890211848.jpg', alt: 'Banner principal do mega menu Curioni.' }
  };

  function createFallback(text) {
    const fallback = document.createElement('div');
    fallback.className = 'image-fallback';
    fallback.textContent = text || 'Imagem indisponível';
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', text || 'Imagem indisponível');
    return fallback;
  }

  function applyImageAsset(element) {
    const key = element.dataset.imageKey;
    const asset = IMAGE_INVENTORY[key];
    const fallbackText = element.dataset.fallbackText || (asset && asset.alt) || 'Imagem indisponível';

    if (!asset || !asset.src) {
      if (element.tagName === 'IMG') {
        element.style.display = 'none';
        element.insertAdjacentElement('afterend', createFallback(fallbackText));
      } else {
        element.classList.add('image-fallback');
        element.textContent = fallbackText;
        element.setAttribute('role', 'img');
        element.setAttribute('aria-label', fallbackText);
      }
      return;
    }

    if (element.tagName === 'IMG') {
      element.src = asset.src;
      element.alt = asset.alt || fallbackText;
      element.addEventListener('error', () => {
        element.style.display = 'none';
        element.insertAdjacentElement('afterend', createFallback(fallbackText));
      }, { once: true });
      return;
    }

    element.style.setProperty('--image-url', `url('${asset.src}')`);
    element.style.backgroundImage = element.dataset.imageOverlay
      ? `${element.dataset.imageOverlay}, url('${asset.src}')`
      : `url('${asset.src}')`;
    element.setAttribute('role', 'img');
    element.setAttribute('aria-label', asset.alt || fallbackText);

    const probe = new Image();
    probe.onerror = () => {
      element.classList.add('image-fallback');
      element.style.backgroundImage = 'none';
      element.textContent = fallbackText;
      element.setAttribute('aria-label', fallbackText);
    };
    probe.src = asset.src;
  }

  function applyGalleryDataImages() {
    document.querySelectorAll('[data-image-key][data-gallery-target]').forEach((thumb) => {
      const asset = IMAGE_INVENTORY[thumb.dataset.imageKey];
      if (asset && asset.src) {
        thumb.dataset.img = asset.src;
      }
    });
  }

  window.CURIONI_IMAGE_INVENTORY = IMAGE_INVENTORY;
  window.applyCurioniImageInventory = function () {
    document.querySelectorAll('[data-image-key]').forEach(applyImageAsset);
    applyGalleryDataImages();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.applyCurioniImageInventory);
  } else {
    window.applyCurioniImageInventory();
  }
})();
