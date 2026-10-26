/* Il Tappeto Volante — contatore di visite visibile, condiviso.
   Il conteggio viene letto da GoatCounter; non registra una seconda visita. */
(function () {
  'use strict';
  function init() {
    // Il tracciamento GoatCounter usa il canonical URL, se presente.
    // Così /pagina/ e /pagina/index.html leggono lo stesso conteggio.
    var currentPath = window.location.pathname || '/';
    var canonical = document.querySelector('link[rel="canonical"][href]');
    if (canonical) {
      try {
        var canonicalURL = new URL(canonical.href, window.location.href);
        if (canonicalURL.origin === window.location.origin) currentPath = canonicalURL.pathname + canonicalURL.search;
      } catch (e) { /* Usa l'indirizzo della pagina. */ }
    }
    var original = document.querySelector('iframe[src*="goatcounter.com/counter/"]');
    if (original) {
      // Usa il percorso effettivamente aperto ("/" e "/index.html" possono avere conteggi diversi).
      try {
        var url = new URL(original.src);
        url.pathname = '/counter/' + encodeURIComponent(currentPath) + '.html';
        if (original.src !== url.toString()) original.src = url.toString();
      } catch (e) { /* Mantieni il contatore già pubblicato. */ }
      return;
    }
    // Preserva i contatori speciali già presenti sulla home, su Porta e sul Marocco.
    if (document.getElementById('numero-visite') ||
        document.querySelector('#contatore') && currentPath.indexOf('col-marocco-passo-dopo-passo') !== -1) return;

    var target = document.getElementById('contatore-visite');
    if (target && (target.children.length || target.textContent.trim())) return;
    var language = (document.documentElement.lang || 'it').toLowerCase().split('-')[0];
    var labels = {
      it: 'Visite a questa pagina', en: 'Visits to this page',
      es: 'Visitas a esta página', fr: 'Visites sur cette page',
      tr: 'Bu sayfanın ziyaretleri', pt: 'Visitas a esta página'
    };
    var caption = labels[language] || labels.it;
    if (!target) {
      target = document.createElement('section');
      target.id = 'gc-visible-counter';
      var footer = document.querySelector('footer');
      if (footer) footer.parentNode.insertBefore(target, footer);
      else document.body.appendChild(target);
    }
    target.setAttribute('aria-label', caption);
    target.style.cssText += ';text-align:center;margin:28px auto 22px;max-width:320px;padding:10px 8px;color:#e5c481;';
    var label = document.createElement('p');
    label.textContent = '👁️ ' + caption;
    label.style.cssText = 'font:14px/1.5 Georgia,serif;margin:0 0 8px;';
    var frame = document.createElement('iframe');
    frame.title = caption;
    frame.loading = 'lazy';
    frame.width = '200';
    frame.height = '60';
    frame.style.cssText = 'display:block;border:0;margin:0 auto;max-width:100%;background:#181c21;';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    var skin = 'html,body{margin:0!important;padding:0!important;background:#181c21!important;overflow:hidden!important}' +
      'div{box-sizing:border-box;background:#111a22;color:#f4cf70;border:1px solid #b79557;border-radius:8px;font-family:Georgia,serif}' +
      '#gcvc-for{display:none}#gcvc-views{font-size:25px;line-height:50px;color:#f4cf70}';
    frame.src = 'https://iltappetovolante.goatcounter.com/counter/' +
      encodeURIComponent(currentPath) + '.html?no_branding=1&style=' +
      encodeURIComponent(skin);
    target.appendChild(label);
    target.appendChild(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
