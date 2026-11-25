/* Fit portrait editorial images, preserving their intrinsic proportions. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    html body img.itv-portrait-fit:not([data-itv-keep-crop]) {
      width: auto !important;
      height: auto !important;
      aspect-ratio: auto !important;
      max-width: 100% !important;
      max-height: 75vh !important;
      max-height: 75dvh !important;
      object-fit: contain !important;
      display: block !important;
      margin-inline: auto !important;
      align-self: center;
      justify-self: center;
    }
  `;
  document.head.append(style);
  const excluded = 'nav,button,[role="button"],[aria-hidden="true"],.landing-brand,.brand-socials,footer,.art-note,[data-itv-keep-crop]';
  function fit(img) {
    if (!(img instanceof HTMLImageElement)) return;
    const name = (img.currentSrc || img.getAttribute('src') || '').split('/').pop().split('?')[0];
    const decorative = img.closest(excluded) ||
      /(?:^|[\s_-])(?:logo|sigill[oi]|seal|icona|icon|avatar|badge|micro-balgha|thumbnail|thumb|poster)(?:[\s_-]|$)/i.test(img.className || '') ||
      /(?:logo|sigillo|icona|favicon|balgha_gialle_culture_box)/i.test(name);
    if (decorative) {
      img.classList.remove('itv-portrait-fit');
      return;
    }
    if (img.naturalWidth && img.naturalHeight)
      img.classList.toggle('itv-portrait-fit', img.naturalHeight > img.naturalWidth);
  }
  function scan(node) {
    if (node instanceof HTMLImageElement) fit(node);
    if (node.querySelectorAll) node.querySelectorAll('img').forEach(fit);
  }
  document.addEventListener('load', event => fit(event.target), true);
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') {
        if (record.target instanceof HTMLImageElement) {
          record.target.classList.remove('itv-portrait-fit');
          if (record.target.complete) fit(record.target);
        }
      } else record.addedNodes.forEach(scan);
    }
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset', 'sizes'] });
  scan(document);
})();
