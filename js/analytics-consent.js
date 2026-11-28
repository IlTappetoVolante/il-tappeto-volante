(() => {
    const measurementId = 'G-QDTBJ0VFQJ';
    const preference = 'tv-google-analytics-consent';
    const disableFlag = 'ga-disable-' + measurementId;
    const messages = {
        it: ['Google Analytics usa cookie facoltativi per contare le visite e capire quali pagine vengono lette. La scelta vale per questo browser.', 'Accetta', 'Rifiuta', 'Preferenze statistiche', 'Disattiva Analytics', 'Privacy di Google'],
        en: ['Google Analytics uses optional cookies to count visits and understand which pages are read. Your choice applies to this browser.', 'Accept', 'Decline', 'Analytics preferences', 'Disable Analytics', 'Google Privacy'],
        es: ['Google Analytics utiliza cookies opcionales para contar visitas y saber qué páginas se leen. Tu elección se aplica a este navegador.', 'Aceptar', 'Rechazar', 'Preferencias de estadísticas', 'Desactivar Analytics', 'Privacidad de Google'],
        fr: ['Google Analytics utilise des cookies facultatifs pour mesurer les visites et les pages consultées. Votre choix vaut pour ce navigateur.', 'Accepter', 'Refuser', 'Préférences statistiques', 'Désactiver Analytics', 'Confidentialité Google'],
        pt: ['O Google Analytics utiliza cookies opcionais para contar visitas e medir as páginas consultadas. A escolha aplica-se a este navegador.', 'Aceitar', 'Recusar', 'Preferências de estatísticas', 'Desativar Analytics', 'Privacidade do Google'],
        tr: ['Google Analytics, ziyaretleri ve görüntülenen sayfaları ölçmek için isteğe bağlı çerezler kullanır. Seçiminiz bu tarayıcı için geçerlidir.', 'Kabul et', 'Reddet', 'İstatistik tercihleri', 'Analytics’i kapat', 'Google Gizlilik']
    };
    let choice;
    let loaded = false;
    let expanded;
    let lastPage;
    try { choice = localStorage.getItem(preference); } catch {}
    if (choice !== 'yes' && choice !== 'no') choice = null;
    expanded = !choice;

    function recordPage() {
        const page = location.origin + location.pathname + location.hash;
        if (choice !== 'yes' || page === lastPage) return;
        lastPage = page;
        window.gtag('event', 'page_view', {
            page_location: page,
            page_title: document.title
        });
    }

    function startAnalytics() {
        window[disableFlag] = false;
        if (!loaded) {
            loaded = true;
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () { window.dataLayer.push(arguments); };
            window.gtag('js', new Date());
            window.gtag('config', measurementId, {
                send_page_view: false,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                cookie_path: '/il-tappeto-volante/'
            });
            const tag = document.createElement('script');
            tag.async = true;
            tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
            document.head.append(tag);
        }
        recordPage();
    }

    function setChoice(value) {
        choice = value;
        try { localStorage.setItem(preference, choice); } catch {}
        if (choice === 'yes') {
            startAnalytics();
        } else {
            window[disableFlag] = true;
            lastPage = undefined;
            for (const cookie of ['_ga', '_ga_' + measurementId.slice(2)]) {
                const expiry = cookie + '=; Max-Age=0; Path=/il-tappeto-volante/';
                document.cookie = expiry;
                document.cookie = expiry + '; Domain=' + location.hostname;
            }
        }
        expanded = false;
        render();
    }

    const panel = document.createElement('aside');
    panel.style.cssText = 'position:fixed;bottom:12px;right:12px;z-index:2147483646;max-width:min(24rem,calc(100vw - 24px));padding:10px;background:#fff;color:#202124;border:1px solid #777;border-radius:8px;font:14px/1.4 system-ui';
    document.body.append(panel);
    const settings = document.createElement('div');
    settings.style.cssText = 'padding:8px;text-align:center;position:relative';
    const footer = document.querySelector('footer');
    (footer || document.body).append(settings);

    const settingsButton = button('', () => {
        expanded = !expanded;
        render();
        if (expanded) panel.querySelector('button')?.focus();
    });
    settingsButton.style.cssText += ';text-decoration:underline;background:transparent;border:0;color:inherit;cursor:pointer';
    panel.id = 'analytics-consent-panel';
    settingsButton.setAttribute('aria-controls', panel.id);
    settings.append(settingsButton);

    function button(text, action) {
        const control = document.createElement('button');
        control.type = 'button';
        control.textContent = text;
        control.style.cssText = 'font:inherit;margin:4px;padding:4px 8px;color:#202124;background:#f3f3f3;border:1px solid #777;border-radius:4px';
        control.addEventListener('click', action);
        return control;
    }

    function render() {
        const [notice, accept, decline, preferences, disable, privacy] =
            messages[document.documentElement.lang.split('-')[0]] || messages.it;
        panel.replaceChildren();
        settingsButton.textContent = preferences;
        settingsButton.setAttribute('aria-expanded', String(expanded));
        panel.hidden = !expanded;
        panel.style.setProperty('display', expanded ? 'block' : 'none', 'important');
        if (!expanded) return;
        const paragraph = document.createElement('p');
        paragraph.style.margin = '0 4px 6px';
        paragraph.textContent = notice;
        const link = document.createElement('a');
        link.href = 'https://policies.google.com/technologies/partner-sites';
        link.textContent = privacy;
        link.style.cssText = 'color:#164c94;margin:4px';
        panel.append(paragraph, button(accept, () => setChoice('yes')),
            button(choice === 'yes' ? disable : decline, () => setChoice('no')), link);
    }

    if (choice === 'yes') startAnalytics();
    if (location.pathname.endsWith('/hub.html')) {
        window.addEventListener('hashchange', recordPage);
        const pushState = history.pushState.bind(history);
        history.pushState = (...args) => {
            pushState(...args);
            queueMicrotask(recordPage);
        };
    }
    render();
    new MutationObserver(render).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });
})();
