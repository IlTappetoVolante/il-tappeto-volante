// =============================================================================
// 1. DATABASE
// =============================================================================

const DATABASE = {
    collana: "Diari di viaggio e altre storie...", 
    
    // SEZIONE DIARI
    diari: [
        {
            id: "diario-1",
            titolo: "Diario Primo: Le Sorelle degli Stretti",
            sottotitolo: "L'Anima Multipla di Istanbul e la Sentinella di Tangeri",
            icon: "📚", 
            theme: { bg: 'bg-[#48D1CC]', text: 'text-[#005F5B]', border: 'border-[#48D1CC]' },
            intro_theme: { bg: 'bg-[#778c43]', text: 'text-[#000000]', text_header: 'text-[#000000]', border: 'border-[#778c43]' },
            introduzione: typeof INTRODUZIONE_DATA !== 'undefined' ? INTRODUZIONE_DATA : [],
            tappe: [
                typeof TAPPA_1_DATA !== 'undefined' ? TAPPA_1_DATA : null,
                typeof TAPPA_2_DATA !== 'undefined' ? TAPPA_2_DATA : null,
                typeof TAPPA_3_DATA !== 'undefined' ? TAPPA_3_DATA : null,
                typeof TAPPA_5_DATA !== 'undefined' ? TAPPA_5_DATA : null
            ].filter(Boolean)
        }
    ],

    // SEZIONE STORIE
    storie: {
        titolo_sezione: "Le Storie",
        descrizione: "Racconti brevi, leggende e fantasie",
        theme: { bg: 'bg-[#5D76A9]', text: 'text-[#F0F8FF]', border: 'border-[#5D76A9]', sfondo: 'https://www.transparenttextures.com/patterns/stardust.png' },
        
        elenco: [
        {
            id: "intro-storie",
            titolo: "Introduzione",
            icon: "<img src='img/icona_intro.jpg' style='width: 50px !important; height: 50px !important;' class='object-contain'>",
            sfondo: "img/sfondo_intro_storie.jpg",
            theme: {
            side_overlay: "img/lanterna.jpg", // <-- la tua lanterna (PNG trasparente)
            side_overlay_width: 90,                    // opzionale
            side_overlay_opacity: 0.85                 // opzionale
             },
            contenuto: (typeof STORIA_INTRO_DATA !== "undefined") ? STORIA_INTRO_DATA : []
        },

            {
                id: "storia-1",
                titolo: "Sultan Baybars: Il Leone dell’Islam",
                icon: "<img src='img/baybars_icon.jpg' style='width: 50px !important; height: 50px !important;' class='object-cover rounded-full border-2 border-white'>",
                sfondo: "img/WMC_Baybars_Hakawati_book.jpg",
                contenuto: typeof STORIA_BAYBARS_DATA !== 'undefined' ? STORIA_BAYBARS_DATA : [],
                quiz: {
                    video_premio: "img/la_ragazza_rutena.mp4",
                    premi_files: ["doc/premio_baybars_1.pdf", "doc/premio_baybars_2.pdf", "doc/premio_baybars_3.pdf"],
                    domande: [
                        { domanda: "Dove è nato Baybars?", risposte: ["Nelle steppe del Kipchak", "Al Cairo", "A Damasco"], corretta: 0 },
                        { domanda: "Qual era il simbolo sognato da Baybars?", risposte: ["Un leone con una spada", "Un'aquila reale", "Una luna rossa"], corretta: 0 },
                        { domanda: "Chi sconfisse nella battaglia di Ayn Jalut?", risposte: ["I Mongoli", "I Crociati", "Gli Ottomani"], corretta: 0 }
                    ]
                }
            },
            {
                id: "storia-2",
                titolo: "Hürrem Sultan: Da Schiava a Regina",
                icon: "<img src='img/Sultan_Roxelane.jpg' style='width: 50px !important; height: 50px !important;' class='object-cover rounded-full border-2 border-white'>",
                sfondo: "img/sfondo_hurrem.jpg", 
                contenuto: typeof STORIA_HURREM_DATA !== 'undefined' ? STORIA_HURREM_DATA : [],
                quiz: {
                    video_premio: "img/la_ragazza_rutena.mp4",
                    premi_files: [
                    "./premi_web/hurrem/premio_hurrem_1.html",
                    "./premi_web/hurrem/premio_hurrem_2.html",
                    "./premi_web/hurrem/premio_hurrem_3.html"
                    ],

                    domande: [
                        { domanda: "Qual era il nome originale di Hürrem?", risposte: ["Aleksandra Lisowska", "Fatma Hatun", "Mahidevran"], corretta: 0 },
                        { domanda: "Cosa significa il nome 'Hürrem'?", risposte: ["Colei che ride", "La prescelta", "La rosa d'oro"], corretta: 0 },
                        { domanda: "Quale tradizione ruppe Solimano per lei?", risposte: ["La sposò legalmente", "Le diede il comando dell'esercito", "La mandò in esilio"], corretta: 0 }
                    ]
                }
            },
            {
            id: "cantastoria-1",
            titolo: "Il Segno Regale",
            icon: "<img src='img/icona_segno_regale.jpg' style='width: 50px !important; height: 50px !important;' class='object-cover rounded-full border-2 border-[#ff4444]'>",
            sfondo: "img/sfondo_pergamena.jpg",
            sezione: "cantastorie",
            theme: { bg: 'bg-[#800000]', text: 'text-[#FFD700]', border: 'border-[#DAA520]', text_header: 'text-[#FFD700]' },
            
            contenuto: typeof STORIA_SEGNO_REGALE_DATA !== 'undefined' ? STORIA_SEGNO_REGALE_DATA : []
  
},

            {
                id: "storia-4",
                titolo: "Ḥashshāshīn: Nascita di una Leggenda",
                icon: "<img src='img/icona_assassini.jpg' style='width: 50px !important; height: 50px !important;' class='object-cover rounded-full border-2 border-[#ff4444]'>",
                sfondo: "img/sfondo_assassini.jpg", 
                
                // TEMA SPECIFICO
                theme: { 
                    bg: 'bg-[#050506]',        
                    paper_color: '#050506',   
                    text: 'text-[#ff4444]',   
                    text_header: 'text-[#ff4444]',
                    border: 'border-[#800000]', 
                    side_image: 'img/hasan_side.png', 
                    font: "font-family: 'MedievalSharp', serif !important;" 
                },

                contenuto: typeof STORIA_ASSASSINI_DATA !== 'undefined' ? STORIA_ASSASSINI_DATA : [],

                quiz: {
                    video_premio: "video/video_premio_assassini.mp4",
                    premi_files: ["premi_web/assassini/assassini_premio_1.html", "premi_web/assassini/assassini_premio_2.html", "premi_web/assassini/assassini_premio_3.html"],
                    feedback_premi: {
                        corrette: [
                            "✅ Corretto. Il primo sigillo di Alamūt si apre: Primo Tesoro sbloccato.",
                            "✅ Corretto. L’Ordine ti osserva e ti approva: Secondo Tesoro sbloccato.",
                            "✅ Corretto. Hai camminato nell’ombra senza esitazione: Terzo Tesoro liberato."
                        ],
                        errate: [
                            "❌ Non ancora. La via per Alamūt resta chiusa: riprova.",
                            "❌ Sbagliato. Hasan non concede il passaggio: riprova.",
                            "❌ No. Il Terzo Tesoro resta nell’ombra: riprova."
                        ]
                    },
                    domande: [
                        { domanda: "Come si chiamava la roccaforte degli Assassini?", risposte: ["Alamūt", "Masyaf", "Il Cairo"], corretta: 0 },
                        { domanda: "Chi sconfisse definitivamente l'ordine in Siria?", risposte: ["Baybars", "Saladino", "Gengis Khan"], corretta: 0 },
                        { domanda: "Cosa significa la parola 'Asāsiyyūn'?", risposte: ["Fedeli al Fondamento", "Mangiatori di Hashish", "Uomini ombra"], corretta: 0 }
                    ]
                }
            },
            {
            id: "storia-shahmaran",
            titolo: "Şahmaran, la Regina che guarisce",
            icon: "<img src='img/figura_shahmaran.jpg' style='width:50px !important;height:50px !important;' class='object-cover rounded-full border-2 border-[#ff4444]'>",
            sfondo: "img/sfondo_pergamena.jpg",
            quiz: {
  video_premio: "video/video_premio_shahmaran.mp4",  // se non ce l’hai, puoi anche toglierla
  premi_files: [
    "premi_web/shahmaran/premio_shahmaran_1.html",
    "premi_web/shahmaran/premio_shahmaran_2.html",
    "premi_web/shahmaran/premio_shahmaran_3.html"
  ],
  feedback_premi: {
    corrette: [
      "✅ Corretto. La Regina-Serpente ti affida il Primo Tesoro.",
      "✅ Corretto. La sua saggezza si apre: Secondo Tesoro sbloccato.",
      "✅ Corretto. Hai compreso il cuore della leggenda: Terzo Tesoro liberato."
    ],
    errate: [
      "❌ Non ancora. Riprova: Şahmaran non si concede a chi corre.",
      "❌ Sbagliato. Ti manca un dettaglio: rileggi e riprova.",
      "❌ No. Il Terzo Tesoro resta custodito: riprova."
    ]
  },
  domande: [
    {
      domanda: "Il tema più forte della leggenda di Şahmaran è…",
      risposte: ["Fiducia e tradimento", "Guerra e conquista", "Fortuna e ricchezza"],
      corretta: 0
    },
    {
      domanda: "Şahmaran è legata soprattutto a…",
      risposte: ["Saggezza e conoscenza", "Armi e battaglie", "Commercio e rotte"],
      corretta: 0
    },
    {
      domanda: "Il cuore morale della storia ti chiede di riflettere su…",
      risposte: ["Scelte e conseguenze", "Moda e lusso", "Cucina e spezie"],
      corretta: 0
    }
  ]
},         
            contenuto: STORIA_SHAHMARAN_DATA
            },
            {
  id: "introMediterraneo",
  titolo: "Introduzione",
  icon: "<span style='font-size: 40px;'>✨</span>",
  sfondo: "img/mediterranean-topographic-map-stockcake-free-use.jpg",
  contenuto: typeof STORIA_INTRO_MEDITERRANEO_DATA !== 'undefined' ? STORIA_INTRO_MEDITERRANEO_DATA : [],
},
{
  id: "danzatriciMediterraneo",
  titolo: "Le Donne che Danzano il Mediterraneo",
  icon: "<span style='font-size: 40px;'>💃</span>",
  sfondo: "img/mediterranean-topographic-map-stockcake-free-use.jpg",
  contenuto: typeof STORIA_DANZATRICI_MEDITERRANEO_DATA !== 'undefined' ? STORIA_DANZATRICI_MEDITERRANEO_DATA : {}
}

        ] // <--- Chiude l'elenco delle storie (quadra)
    },   // <--- Chiude la sezione "storie" (graffa) e METTE LA VIRGOLA

    // QUIZ GENERALE
    quiz_generale: {
        video_premio: "img/la_ragazza_rutena.mp4",
        premi_files: ["doc/premio_gen_1.pdf", "doc/premio_gen_2.pdf", "doc/premio_gen_3.pdf"],
        domande: [
            { domanda: "Chi è il guardiano di Tangeri?", risposte: ["Il Faro di Capo Spartel", "La Torre di Galata", "Il Porto"], corretta: 0 },
            { domanda: "Cosa unisce le 'Due Sorelle'?", risposte: ["Gli Stretti di mare", "Un ponte d'oro", "Una ferrovia"], corretta: 0 },
            { domanda: "Dove si trova il caffè Baba?", risposte: ["Nella Kasbah di Tangeri", "A Istanbul", "A Marrakech"], corretta: 0 }
        ]
    }
};


// =============================================================================
// 2. LOGICA APPLICAZIONE (VISTE)
// =============================================================================

// FUNZIONE RENDER BLOCCO (SEMPLIFICATA)
const renderBlocco = (blocco, theme) => {
     // Recuperiamo il colore forzato
     const textColor = theme.forceText || theme.text;

     switch (blocco.type) {
        // NOTA: Qui NON applichiamo più il fontStyle riga per riga, perché lo mettiamo nel contenitore padre.
        // Lasciamo solo font-bold per sicurezza.
        case 'titolo': return `<h1 class="diario-titolo ${theme.text_header || textColor} font-bold">${blocco.testo}</h1>`;
        case 'testo': return `<p class="diario-text my-6 ${textColor} font-bold">${blocco.paragrafo}</p>`; 
        case 'immagine': return `<img src="${blocco.src}" alt="${blocco.alt || 'Immagine'}" class="w-full h-auto rounded-lg shadow-md my-4">`;
        case 'didascalia': return `<p class="diario-didascalia ${textColor} font-bold opacity-80">${blocco.testo}</p>`;
        case 'approfondimento':
            return `<div class="box-approfondimento ${theme.border}">
                    <h3 class="font-ui-titolo text-lg font-bold ${theme.text_header || textColor} mb-2">${blocco.titolo}</h3>
                    <p class="diario-text ${textColor} font-bold">${blocco.paragrafo}</p> 
                </div>`;
        case 'video': {
            const src = blocco.src || '';
            const caption = blocco.didascalia || blocco.testo || '';

            // Se è un link YouTube, lo embeddiamo come prima
            if (src.includes("youtube.com") || src.includes("youtu.be/")) {
                let embedSrc = src;
                if (embedSrc.includes("youtube.com/watch?v=")) embedSrc = embedSrc.replace("watch?v=", "embed/");
                else if (embedSrc.includes("youtube.com/shorts/")) embedSrc = embedSrc.replace("shorts/", "embed/");
                else if (embedSrc.includes("youtu.be/")) embedSrc = embedSrc.replace("youtu.be/", "youtube.com/embed/");
                embedSrc = embedSrc.split('?')[0];

                return `<div class="video-container"><iframe src="${embedSrc}" frameborder="0" allowfullscreen></iframe></div>`;
            }

            // Altrimenti: video locale (mp4) dentro al contenuto
const vidId = blocco.id ? `id="${blocco.id}"` : '';
const shouldAutoplay = !!blocco.autoplay;
const shouldLoop = !!blocco.loop; // loop solo se lo scrivi nel contenuto
const controlsAttr = (blocco.controls === false) ? '' : 'controls';

return `
  <figure class="my-6">
    <video ${vidId} onclick="this.muted=false; this.volume=1"
      ${controlsAttr}
      playsinline
      preload="auto"
      ${shouldAutoplay ? 'autoplay muted' : ''}
      ${blocco.poster ? `poster="${blocco.poster}"` : ''}
      class="w-full h-auto rounded-lg shadow-md my-4"
      aria-label="${blocco.alt || ""}"
      title="${blocco.alt || ""}">
      <source src="${src}" type="video/mp4">
      Il tuo browser non supporta il video.
        </video>
        ${caption ? `<figcaption class="diario-didascalia ${textColor} font-bold opacity-80">${caption}</figcaption>` : ''}
        </figure>
    `;

        }
        default: return '';
    }
};
const withAutoTitle = (contenuto, titolo) => {
  if (!Array.isArray(contenuto)) return [];
  const hasTitle = contenuto.some(b => b && b.type === 'titolo');
  if (hasTitle || !titolo) return contenuto;
  return [{ type: 'titolo', testo: titolo }, ...contenuto];
};


// VISTA HOME
function HomeView() {
  const textStyle =
    "bg-gradient-to-b from-gray-900 via-black to-gray-800 text-transparent bg-clip-text drop-shadow-[0_1px_0px_rgba(255,255,255,0.5)]";

  return `
    <div class="h-full w-full relative overflow-y-auto custom-scrollbar"
         style="background-image: url('img/sfondo_home.jpg');
                background-size: cover;
                background-position: center;
                background-attachment: fixed;">

      <button onclick="navigate('hub')"
              class="home-cta absolute z-20 rounded-xl shadow-2xl transform transition-all hover:scale-105
                     border-2 border-[#FFD700] overflow-hidden">
        <span class="home-cta-bg"></span>
        <span class="font-ui-titolo home-cta-text">Sali sul tappeto</span>
      </button>

      <!-- INTRO PERGAMENA (top-right desktop, normale su mobile) -->
      <div class="home-intro-pos z-10">
        <div class="home-intro-pergamena">
          <div class="font-ui-titolo font-extrabold mb-2"
               style="text-shadow: 0 2px 10px rgba(0,0,0,0.35);">
            Il Tappeto Volante
          </div>

          <div class="font-ui-testo leading-snug"
               style="text-shadow: 0 1px 6px rgba(0,0,0,0.25);">
            <p class="mb-3">
              Il Tappeto Volante è un luogo di viaggio e di racconto.
              Un diario che attraversa città reali e immaginate, storie antiche e voci lontane,
              seguendo il filo invisibile che unisce Oriente e Mediterraneo.
            </p>

            <p class="mb-3">
              Qui il viaggio non è solo movimento nello spazio,
              ma uno sguardo che osserva, ascolta e ricompone.
            </p>

            <p class="mb-3">
              Puoi entrare da un diario di viaggio,
              perderti in una storia,
              oppure seguire una tappa come si segue una traccia sulla sabbia.
            </p>

            <p class="mb-0">
              Non c’è un percorso obbligato.
              C’è solo un invito: salire sul tappeto e lasciarsi portare.
            </p>
          </div>
        </div>
      </div>

    </div>
  `;
}



// VISTA HUB (menu principale)
function HubView() {
  return `
    <div class="flex flex-col h-full"
     style="background-image: url('img/sfondo_hub.jpg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-color: #070812;">

      <header class="header-galleggiante">
        <button onclick="navigate('home')">Home</button>
      </header>

      <div class="w-full mb-6 text-center">
        <div class="font-ui-titolo text-3xl font-bold text-white"
             style="text-shadow: 0 2px 10px rgba(0,0,0,0.9);">
          Diari di Viaggio e altre Storie...
        </div>
      </div>

      <main class="vista-menu flex-1 overflow-y-auto p-4 pt-6">
        <div class="container-cards">

          <div class="card-diario" onclick="navigate('diario', '${DATABASE.diari[0].id}')">
            <div class="flex items-center space-x-4">
              <span class="text-3xl">📖</span>
              <h2 class="font-ui-titolo text-xl font-semibold">Diari di Viaggio</h2>
            </div>
          </div>

          <div class="card-diario" onclick="navigate('menu-storie')">
            <div class="flex items-center space-x-4">
              <span class="text-3xl">📜</span>
              <h2 class="font-ui-titolo text-xl font-semibold">Le Storie</h2>
            </div>
          </div>

          <div class="card-diario" onclick="navigate('diario', '${DATABASE.diari[0].id}')">
            <div class="flex items-center space-x-4">
              <span class="text-3xl">🧭</span>
              <h2 class="font-ui-titolo text-xl font-semibold">Viaggi Immaginati</h2>
            </div>
          </div>

          <!-- 🌊 NUOVA SEZIONE MEDITERRANEO -->
          <div class="card-diario" onclick="navigate('menu-mediterraneo')">
            <div class="flex items-center space-x-4">
              <span class="text-3xl">🌊</span>
              <h2 class="font-ui-titolo text-xl font-semibold">Volando tra le culture del Mediterraneo</h2>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}
// VISTA MEDITERRANEO (menu principale)
function MenuMediterraneoView() {
  return `
    <div class="flex flex-col h-full"
         style="background-image: url('img/mediterranean-topographic-map-stockcake-free-use.jpg');
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
                background-color: #070812;">

      <header class="header-galleggiante">
        <button onclick="navigate('hub')">Indietro</button>
      </header>

      <div class="w-full mb-6 text-center">
        <div class="font-ui-titolo text-3xl font-bold text-white"
             style="text-shadow: 0 2px 10px rgba(0,0,0,0.9);">
          Volando tra le culture del Mediterraneo
        </div>
      </div>

      <main class="vista-menu flex-1 overflow-y-auto p-4 pt-6">
        <div class="container-cards">

          <!-- INTRODUZIONE -->
          <div class="card-diario" onclick="navigate('storia', 'introMediterraneo')">
            <div class="flex items-center space-x-4">
              <span class="text-3xl">✨</span>
              <h2 class="font-ui-titolo text-xl font-semibold">Introduzione</h2>
            </div>
          </div>

          <!-- STORIA DELLE DANZATRICI -->
          <div class="card-diario" onclick="navigate('storia', 'danzatriciMediterraneo')">
            <div class="flex items-center space-x-4">
              <span class="text-3xl">💃</span>
              <h2 class="font-ui-titolo text-xl font-semibold">Le Donne che Danzano il Mediterraneo</h2>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

// VISTA MENU STORIE (mancava)
function StorieMenuView() {
    const storiesData = DATABASE.storie;
    const linkSfondo = "img/libro.jpg"; 
    const storieNarrativa = storiesData.elenco.filter(s => s.sezione !== 'cantastorie');
    const storiePoesia = storiesData.elenco.filter(s => s.sezione === 'cantastorie');
    const imgDivisore = `<img src="img/divisore_oro.png" style="width: 150px !important; height: auto !important;" class="mx-auto my-3 opacity-90 drop-shadow-md">`;

    return `
    <div class="flex flex-col h-full">
      <header class="header-galleggiante"><button onclick="navigate('hub')">← Menù</button></header>
      <main class="vista-menu flex-1 overflow-y-auto p-4"
            style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${linkSfondo}'); background-size: cover; background-position: center; background-attachment: scroll;">
        <div class="container-cards">
            <div class="text-center mt-16 mb-8">
                <h3 class="font-ui-titolo text-3xl text-[#FFD700] italic opacity-90 mx-auto max-w-2xl leading-relaxed mb-2" style="text-shadow: 1px 1px 3px rgba(0,0,0,1);">${storiesData.descrizione}</h3>
                ${imgDivisore}
                <h1 class="font-ui-titolo text-6xl font-bold text-white drop-shadow-lg" style="text-shadow: 0 4px 8px rgba(0,0,0,1);">${storiesData.titolo_sezione}</h1>
            </div>

            <div class="space-y-6 mb-16">
                ${storieNarrativa.map(storia => `
                    <div class="card-diario" onclick="navigate('leggi-storia', '${storia.id}')" style="border-left: 5px solid #5D76A9;">
                        <div class="flex items-center space-x-4">
                            <span class="text-3xl flex-shrink-0">${storia.icon.includes('<img') ? storia.icon : storia.icon}</span>
                            <h2 class="font-ui-titolo text-xl font-semibold text-white">${storia.titolo}</h2>
                        </div>
                    </div>`).join('')}
            </div>

            ${storiePoesia.length > 0 ? `
                <div class="mb-8 mt-4 w-full text-center">
                     ${imgDivisore}
                     <h2 class="font-ui-titolo text-5xl font-bold text-[#FFD700] mt-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">Il Cantastorie</h2>
                </div>
                <div class="space-y-6 pb-12">
                    ${storiePoesia.map(storia => `
                        <div class="card-diario" onclick="navigate('leggi-storia', '${storia.id}')" style="border-left: 5px solid #FFD700; background: rgba(60, 20, 20, 0.85);">
                            <div class="flex items-center space-x-4">
                                <span class="text-3xl flex-shrink-0">${storia.icon.includes('<img') ? storia.icon : storia.icon}</span>
                                <div class="flex flex-col text-left">
                                    <h2 class="font-ui-titolo text-2xl font-semibold text-[#FFD700]">${storia.titolo}</h2>
                                    ${storia.sottotitolo ? `<span class="text-sm text-gray-200 italic font-serif">${storia.sottotitolo}</span>` : ''}
                                </div>
                            </div>
                        </div>`).join('')}
                </div>` : ''}
        </div>
      </main>
    </div>`;
}

// VISTA LETTURA STORIA (LOGICA CONTENITORE)
function StoriaLetturaView(id) {
    const storia = DATABASE.storie.elenco.find(s => s.id === id);
    if (!storia) return StorieMenuView();

    const hasDarkPaper = !!(storia.theme && storia.theme.paper_color);
    const isPergamena = (storia.sfondo || "").toLowerCase().includes("pergamena");

    // 1. GESTIONE SFONDO PAGINA (immagine + eventuale immagine laterale)
    //    Per le storie "dark" (Assassini) NON applichiamo overlay: l'immagine deve restare originale.
    let backgroundCSS = "";
    if (storia.theme && storia.theme.side_image) {
        backgroundCSS = `
            background-image: url('${storia.theme.side_image}'), url('${storia.sfondo}');
            background-size: auto 85vh, cover;
            background-position: bottom right, center;
            background-repeat: no-repeat, no-repeat;
            background-attachment: fixed, fixed;
            background-color: ${hasDarkPaper ? storia.theme.paper_color : '#000'};
        `;
    } else if (storia.sfondo) {
        if (hasDarkPaper) {
            backgroundCSS = `
                background-image: url('${storia.sfondo}');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-color: ${storia.theme.paper_color};
            `;
    } else {
        // Storie standard: overlay (molto leggero su pergamena)
    const overlay = isPergamena ? 0.10 : 0.35;
    backgroundCSS = `background-image: linear-gradient(rgba(0,0,0,${overlay}), rgba(0,0,0,${overlay})), url('${storia.sfondo}'); background-size: cover; background-position: center; background-attachment: fixed;`;

        }
    } else {
        backgroundCSS = `background-image: url('${DATABASE.storie.theme.sfondo}'); background-color: #f4f4f9; background-repeat: repeat;`;
    }

    const theme = storia.theme ? { ...DATABASE.storie.theme, ...storia.theme } : DATABASE.storie.theme;
    
   // ✅ LANTERNE LATERALI (come Sabah: fisse nel viewport)
const sideOverlay = theme?.side_overlay || null;
const sideW = theme?.side_overlay_width ?? 90;
const sideO = theme?.side_overlay_opacity ?? 0.85;

const sideOverlaysHTML = sideOverlay ? `
  <div class="pointer-events-none fixed inset-0 select-none z-0">
    <img src="${sideOverlay}" aria-hidden="true"
         class="absolute left-3 top-1/2 -translate-y-1/2"
         style="width:clamp(40px, 6vw, ${sideW}px); max-height:60vh; height:auto; opacity:${sideO};" />

    <img src="${sideOverlay}" aria-hidden="true"
         class="absolute right-3 top-1/2 -translate-y-1/2"
         style="width:clamp(40px, 6vw, ${sideW}px); max-height:60vh; height:auto; opacity:${sideO}; transform: scaleX(-1);" />
  </div>
` : '';

    // 2. STILE FOGLIO (UNA SOLA style="" per evitare che il browser ignori quella col background)
    let foglioStyle = "";
    let forceTextClass = "";

    if (hasDarkPaper) {
        // Forziamo un background pieno per vincere eventuali CSS "bulli"
        foglioStyle = `background: ${storia.theme.paper_color} !important;`;
        forceTextClass = theme.text;
        if (theme.font) foglioStyle += ` ${theme.font}`;
    } else {
        // Niente background inline: lo gestiscono le classi CSS (foglio-storia / foglio-pergamena)
        foglioStyle = theme.font ? theme.font : "";
        forceTextClass = "text-gray-900";
    }

    const renderTheme = { ...theme, forceText: forceTextClass };

    const borderColor = theme.border
        ? (theme.border.match(/#([0-9a-fA-F]{3,8})/)?.[0] || '#ccc')
        : '#ccc';

    const pulsanteLampada = storia.quiz ? `
        <div class="mt-16 pt-8 border-t-2 border-[#FFD700] text-center">
            <p class="font-ui-titolo text-2xl ${forceTextClass} font-bold mb-4">Hai letto con attenzione?</p>
            <p class="mb-6 italic ${forceTextClass} font-bold opacity-80">Il Genio custodisce tesori per chi conosce le storie...</p>
            <button onclick="navigate('lampada', '${storia.id}')" class="bg-[#FFD700] text-[#800000] font-bold py-3 px-8 rounded-full shadow-lg transform transition-all hover:scale-110 hover:bg-[#FFC107] border-2 border-[#800000] flex items-center justify-center mx-auto gap-2">
                <span class="text-2xl">🧞‍♂️</span> Strofina la Lampada
            </button>
        </div>` : '';
const renderSigilloFinale = () => `
  <div class="mt-10 mb-8 flex justify-end">
    <img src="img/sigillo_ceralacca_lorella.jpg"
         alt="Sigillo in ceralacca con nome Lorella"
         loading="lazy"
         class="sigillo drop-shadow-lg">
  </div>
`;


     return `
  <div class="flex flex-col h-full relative overflow-hidden" style="${backgroundCSS}">
    ${sideOverlaysHTML}

    <header class="header-galleggiante relative z-10">
      <button onclick="navigate('menu-storie')">← Indietro</button>
    </header>

    <main class="vista-lettura flex-1 overflow-y-auto relative z-10">
      <div class="${isPergamena ? 'foglio-lettura foglio-storia foglio-pergamena' : 'foglio-lettura foglio-storia'}"
           style="${foglioStyle} border: 1px solid ${borderColor};">
        ${withAutoTitle(storia.contenuto, storia.titolo).map(b => renderBlocco(b, renderTheme)).join('')}
        ${renderSigilloFinale()}
        ${(typeof renderQuizSection === 'function') ? renderQuizSection(storia.id) : ''}
        ${pulsanteLampada}
      </div>
    </main>
  </div>
`;

}
// LAMPADA VIEW
let quizState = { active: false, currentQuestions: [], index: 0, score: 0, finished: false, activeQuizData: null, _answeredCorrectly: false };

function LampadaView(storiaId) {
    if (!storiaId) return LampadaHubView();
    if (!quizState.active || quizState.storiaId !== storiaId) {
        let quizData;
        if (storiaId) {
            const storia = DATABASE.storie.elenco.find(s => s.id === storiaId);
            quizData = (storia && storia.quiz) ? storia.quiz : DATABASE.quiz_generale;
        } else {
            quizData = DATABASE.quiz_generale;
        }

        quizState.activeQuizData = quizData;
        const pool = [...quizData.domande];
        quizState.currentQuestions = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
        quizState.active = true;
        quizState.index = 0;
        quizState.score = 0;
        quizState.finished = false;
        quizState._answeredCorrectly = false;
        quizState.storiaId = storiaId; 
    }

    if (quizState.finished) return renderRisultatiLampada();

    const domandaCorrente = quizState.currentQuestions[quizState.index];
    const risposteMiste = domandaCorrente.risposte.map((r, i) => ({ testo: r, originale: i })).sort(() => 0.5 - Math.random());

 return `
 <div class="flex flex-col h-full text-white overflow-hidden"
     style="
       background-image: url('img/sfondo_quiz.jpg');
       background-size: cover;
       background-position: 55% 75%;
       background-repeat: no-repeat;
       background-attachment: fixed;
     ">

    <header class="header-galleggiante">
      <button onclick="resetLampada()">← Esci</button>
    </header>

    <div id="quiz-layout" style="margin-top: -70px;">


    <div class="flex-1 p-4 pt-24">
      <div class="mx-auto" style="max-width: 640px; margin-left: 6vw; margin-right: auto;">


<div class="mx-auto relative"
     style="
       width: min(680px, 50vw);
       margin-left: 30vw;
       margin-top: 0px;
       aspect-ratio: 2048 / 1118;
     ">


  <!-- DOMANDA FUORI CORNICE -->
  <div class="font-ui-titolo text-[#FFD700] text-sm md:text-base tracking-widest uppercase mb-2"
     style="text-shadow: 0 1px 0 rgba(0,0,0,0.45);">
  ${quizState.index === 0 ? "Prima domanda" : (quizState.index === 1 ? "Seconda domanda" : "Terza domanda")}
</div>

<h1 class="font-ui-titolo text-2xl md:text-3xl text-[#FFD700] leading-relaxed mb-3"
    style="text-shadow: 0 1px 0 rgba(0,0,0,0.45);">
  ${domandaCorrente.domanda}
</h1>

<div class="text-white/70 text-sm italic mb-3"
     style="text-shadow: 0 1px 0 rgba(0,0,0,0.35);">
  Se sbagli puoi ritentare.
</div>

  <!-- CORNICE + CONTENUTO -->
  <div class="relative"
       style="aspect-ratio: 2048 / 1118;">

    <!-- CONTENUTO dentro finestra (lascia spazio sotto per bottoni feedback) -->
    <div class="absolute inset-0 z-10 flex flex-col"
         style="padding: 21% 10% 10% 12%;">

      <!-- RISPOSTE -->
      <div class="flex flex-col"
           style="border-top: 1px solid rgba(255,215,0,0.18);">

        ${risposteMiste.map((r) => `
          <button onclick="gestisciRisposta(${r.originale}, '${storiaId || ''}')" data-answer="1"
                  class="w-full text-left flex items-center gap-4 py-3"
                  style="
                    background: rgba(0,0,0,0.18);
                    border-bottom: 1px solid rgba(255,215,0,0.18);
                    color: rgba(255,255,255,0.92);
                    border-radius: 10px;
                  ">
            <!-- pallino oro pieno (NO A/B/C) -->
            <span style="
              width: 14px; height: 14px;
              border-radius: 999px;
              background: #FFD700;
              box-shadow: 0 0 10px rgba(255,215,0,0.28);
              flex: 0 0 auto;">
            </span>

            <span class="font-serif text-lg md:text-xl">
              ${r.testo}
            </span>
          </button>
        `).join('')}

      </div>
    </div>

    <!-- CORNICE sopra -->
    <img src="img/cornice_quiz.jpg"
         alt=""
         class="absolute inset-0 z-20 w-full h-full object-contain pointer-events-none select-none" />
  </div>
</div>

  </div>
</div>

<!-- FEEDBACK FISSO: sopra la lampada (mai sotto la cornice) -->
<div id="feedback"
     style="
       position: fixed;
       left: 20px;
       bottom: 170px;
       width: min(520px, 42vw);
       z-index: 99999;
       transform: none;
     ">
</div>

   </div>  <!-- chiude max-w-3xl -->

    </div>    <!-- chiude flex-1 -->

  </div>      <!-- chiude quiz-layout -->

</div>        <!-- chiude contenitore principale -->
`;

}
function LampadaHubView() {
  const quizStories = DATABASE.storie.elenco.filter(s => !!s.quiz);

  return `
    <div class="flex flex-col h-full bg-[#1a0b2e] text-white overflow-y-auto custom-scrollbar">
      <header class="header-galleggiante">
        <button onclick="navigate('menu-storie')">← Indietro</button>
      </header>

      <div class="p-6 pt-24" style="background-image: radial-gradient(circle at center, #2d1b4e 0%, #000000 100%);">
        <div class="text-center mb-8">
          <img src="img/bottone_lampada.png" class="w-24 h-auto object-contain mx-auto mb-3">
          <h1 class="font-ui-titolo text-4xl text-[#FFD700]">La Lampada</h1>
          <p class="opacity-90 mt-2">Scegli un quiz e rigioca quando vuoi.</p>
        </div>

        <div class="space-y-4">
          ${quizStories.map(s => `
            <div class="card-diario card-storie" onclick="navigate('lampada', '${s.id}')">
              <div class="flex items-center space-x-4">
                <span class="text-3xl flex-shrink-0">${(typeof s.icon === 'string') ? s.icon : ''}</span>
                <div class="flex flex-col text-left">
                  <h2 class="font-ui-titolo text-xl font-semibold text-white">${s.titolo}</h2>
                  <span class="text-sm opacity-80">Quiz disponibile</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        ${quizStories.length === 0 ? `<p class="text-center opacity-80 mt-10">Per ora non ci sono quiz disponibili.</p>` : ``}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// FUNZIONE RISULTATI (VERSIONE AGGIORNATA CON SCATOLE PNG E VIDEO)
// -------------------------------------------------------------
function renderRisultatiLampada() {
    const score = quizState.score;
    const premiFiles = quizState.activeQuizData.premi_files;
    const videoPremio = quizState.activeQuizData.video_premio;
    
    // 1. Testi
    let titolo = "Oh no!";
    let messaggio = "Il Genio non è soddisfatto. Riprova!";
    if (score === 1) { titolo = "Buon inizio!"; messaggio = "Hai conquistato 1 Tesoro!"; }
    if (score === 2) { titolo = "Ottimo lavoro!"; messaggio = "Hai conquistato 2 Tesori!"; }
    if (score === 3) { titolo = "LEGGENDARIO!"; messaggio = "Hai liberato TUTTI i tesori e la magia segreta!"; }

    // 2. Video (Solo se vinci tutto)
    let htmlVideo = '';
    if (score === 3) {
        htmlVideo = `
        <div class="w-full mb-8 animate-bounce-in relative z-30">
            <div class="mx-auto max-w-md bg-black/40 border-y-2 border-[#FFD700] backdrop-blur-sm p-4 rounded-xl shadow-2xl">
                <h2 class="font-ui-titolo text-2xl text-[#FFD700] mb-3 text-center uppercase tracking-widest">✨ La Magia Suprema ✨</h2>
                <div class="relative rounded-lg overflow-hidden border-2 border-[#FFD700] bg-black shadow-lg">
                    <video controls autoplay playsinline class="w-full h-auto max-h-[60vh] mx-auto">
                        <source src="${videoPremio}" type="video/mp4">
                    </video>
                </div>
            </div>
        </div>`;
    }

    // 3. Funzione Scatole (Versione MINI: solo icona scatola)
const renderPremio = (index) => {
  const numScatola = index + 1;
  const imgScatola = `img/scatola_regalo_${numScatola}.jpg`;
  const premioLink = premiFiles?.[index];

  // vinto
  if (score >= numScatola && premioLink) {
    return `
      <a href="${premioLink}" target="_blank" rel="noopener"
         class="inline-flex items-center justify-center hover:scale-105 transition-transform"
         title="Apri lo scrigno del tesoro">
        <img src="${imgScatola}" alt="Scrigno ${numScatola}"
             class="w-24 h-24 object-contain drop-shadow-lg" />
      </a>
    `;
  }

  // non vinto (grigio, non cliccabile)
  return `
    <div class="inline-flex items-center justify-center opacity-50 grayscale"
         title="Scrigno sigillato">
      <img src="${imgScatola}" alt="Scrigno sigillato ${numScatola}"
           class="w-24 h-24 object-contain" />
    </div>
  `;
};


    // 4. Return Finale
    return `
    <div class="h-full w-full flex flex-col items-center bg-[#1a0b2e] overflow-y-auto custom-scrollbar p-4" style="background-image: radial-gradient(circle at center, #2d1b4e 0%, #000000 100%);">
        <header class="header-galleggiante"><button onclick="resetLampada()">← Esci</button></header>
        
        <div class="mt-14 text-center max-w-5xl w-full z-10 pb-16">
            <h1 class="font-ui-titolo text-5xl text-[#FFD700] mb-2 drop-shadow-md animate-pulse">${titolo}</h1>
            <p class="text-lg text-white mb-6 font-serif italic opacity-90">${messaggio}</p>
            
            ${htmlVideo}

            <div class="flex items-center justify-center gap-6 mt-6">
            ${renderPremio(0)}
            ${renderPremio(1)}
            ${renderPremio(2)}
            </div>


            ${score < 3 ? `
                <button onclick="resetLampada('${quizState.storiaId || ''}')" class="mt-10 bg-transparent border border-[#FFD700] text-[#FFD700] font-bold py-2 px-8 rounded-full text-lg hover:bg-[#FFD700] hover:text-[#800000] transition-all">
                    🔄 Riprova
                </button>
            ` : ''}
        </div>
    </div>`;
}

// -------------------------------------------------------------
// FEEDBACK RISPOSTE QUIZ (per premio)
// -------------------------------------------------------------
window.gestisciRisposta = (rispostaIndex, storiaId) => {
    const domandaIndex = quizState.index;
    const domanda = quizState.currentQuestions[domandaIndex];
    if (!domanda) return;

    const isCorretta = rispostaIndex === domanda.corretta;

    const feedbackContainer = document.getElementById("feedback");
    if (!feedbackContainer) return;

    feedbackContainer.innerHTML = ""; // pulisce il precedente
    feedbackContainer.className = "mt-4 flex flex-col gap-3 items-start";

    const messaggio = document.createElement("div");
messaggio.classList.add(
  "p-3", "rounded-xl", "mt-2", "border", "text-white",
  "inline-block", "w-fit", "max-w-[420px]"
);

    const premioN = domandaIndex + 1;

    // Messaggi diversi per ogni premio (personalizzabili nel quizData: feedback_premi)
    const quizData = quizState.activeQuizData || {};
    const defaultOk = [
        "✅ Risposta corretta! Hai sbloccato il Primo Tesoro.",
        "✅ Risposta corretta! Hai sbloccato il Secondo Tesoro.",
        "✅ Risposta corretta! Hai sbloccato il Terzo Tesoro."
    ];
    const defaultKo = [
        "❌ Risposta errata. Il Primo Tesoro resta sigillato: riprova.",
        "❌ Risposta errata. Il Secondo Tesoro resta sigillato: riprova.",
        "❌ Risposta errata. Il Terzo Tesoro resta sigillato: riprova."
    ];

    const customOk = quizData.feedback_premi?.corrette?.[premioN - 1];
    const customKo = quizData.feedback_premi?.errate?.[premioN - 1];

    if (isCorretta) {
        messaggio.classList.add("bg-green-800", "border-green-400");
       messaggio.textContent = "✅ Risposta corretta.";

        // layout verticale del feedback (così non si coprono)
feedbackContainer.style.display = "flex";
feedbackContainer.style.flexDirection = "column";
feedbackContainer.style.gap = "12px";
feedbackContainer.style.alignItems = "flex-start";

// messaggio verde: stile inline (sempre visibile)
messaggio.style.background = "rgba(20, 120, 60, 0.85)";
messaggio.style.border = "1px solid rgba(120, 255, 180, 0.55)";
messaggio.style.padding = "10px 12px";
messaggio.style.borderRadius = "12px";
messaggio.style.color = "#fff";
messaggio.style.display = "inline-block";
messaggio.style.maxWidth = "520px";

feedbackContainer.appendChild(messaggio);

// ✅ Premio subito (1/2/3) appena risponde correttamente
const premioFile = quizData.premi_files?.[premioN - 1];
if (premioFile) {
  const linkPremio = document.createElement("a");
  linkPremio.href = premioFile;
  linkPremio.target = "_blank";
  linkPremio.rel = "noopener";

  const imgIcon = `img/scatola_regalo_${premioN}.jpg`;

  // bottone: stile inline (non dipende da Tailwind)
  linkPremio.style.display = "inline-flex";
  linkPremio.style.alignItems = "center";
  linkPremio.style.gap = "10px";
  linkPremio.style.padding = "10px 14px";
  linkPremio.style.borderRadius = "14px";
  linkPremio.style.border = "1px solid rgba(128,0,0,0.9)";
  linkPremio.style.background = "linear-gradient(90deg, #FFD700, #FFC107)";
  linkPremio.style.color = "#800000";
  linkPremio.style.fontWeight = "800";
  linkPremio.style.textDecoration = "none";
  linkPremio.style.whiteSpace = "nowrap";
  linkPremio.style.boxShadow = "0 10px 22px rgba(0,0,0,0.35)";

  // icona: forza dimensione (anche se c'è un img{width:100% !important})
  linkPremio.innerHTML = `
  <img src="${imgIcon}" alt=""
       style="
         width:76px !important;
         height:76px !important;
         object-fit:contain !important;
         display:block !important;
         filter: drop-shadow(0 2px 6px rgba(0,0,0,0.35));
       " />
  <span style="
      display:flex;
      align-items:center;
      line-height:1;
      font-size:1.05rem;
    ">
  Apri lo&nbsp;<strong>SCRIGNO</strong>
</span>
`;

  feedbackContainer.appendChild(linkPremio);
}



        // evita doppio punteggio se si clicca più volte
        if (!quizState._answeredCorrectly) {
            quizState.score++;
            quizState._answeredCorrectly = true;
        }

        // disabilita le risposte dopo una risposta corretta
        document.querySelectorAll('[data-answer="1"]').forEach(btn => {
            btn.disabled = true;
            btn.classList.add("opacity-60", "cursor-not-allowed");
        });

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "mt-4 bg-gradient-to-r from-[#FFD700] to-[#C9A227] text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-all";
        btn.textContent = (quizState.index < 2) ? "Continua →" : "Vedi i premi →";
        btn.onclick = () => window.avanzaLampada(storiaId);

        feedbackContainer.appendChild(btn);
    } else {
        messaggio.classList.add("bg-red-800", "border-red-400");
        messaggio.innerHTML = customKo || defaultKo[premioN - 1];

        feedbackContainer.appendChild(messaggio);
        
        // ✅ Riprova (resta sulla stessa domanda)
        const retry = document.createElement("div");
        retry.className = "mt-4 text-white/80 italic";
        retry.textContent = "Riprova: scegli un’altra risposta.";
        feedbackContainer.appendChild(retry);

    }
};

window.avanzaLampada = (storiaId) => {
    quizState._answeredCorrectly = false;

    if (quizState.index < 2) {
        quizState.index++;
        renderApp('lampada', storiaId);
    } else {
        quizState.finished = true;
        renderApp('lampada', storiaId);
    }
};

// Compatibilità: se qualcosa chiama ancora checkRisposta
window.checkRisposta = (scelta, corretta, storiaId) => {
    window.gestisciRisposta(scelta, storiaId);
};

window.resetLampada = (storiaId) => {
    if (quizState.finished && storiaId !== undefined) {
        quizState.active = false;
        renderApp('lampada', storiaId);
    } else {
        quizState.active = false;
        navigate('home');
    }
};




// ... (Resto funzioni standard DiarioView, TappaView, IntroduzioneView, Router, Init)
function DiarioView(param) { return DATABASE.diari[0].id === param ? renderDiarioStandard(DATABASE.diari[0]) : HomeView(); }
function renderDiarioStandard(diario) {
  return `
    <div class="flex flex-col h-full">

      <!-- Titolo libero -->
      <header class="header-galleggiante">
      <button onclick="navigate('hub')">Menù</button>
      </header>
<main class="vista-menu flex-1 overflow-y-auto p-4 pt-8"
      style="background-image: url('https://i.postimg.cc/zBXrqHfS/1762382249179.png'); background-size: cover; background-position: center;">

  <div class="mb-6 flex justify-center">
  <div class="inline-flex px-5 py-3 rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 shadow-lg">
    <h1 class="font-ui-titolo text-4xl font-bold text-white text-center"
        style="text-shadow: 0 2px 10px rgba(0,0,0,0.9);">
      ${diario.titolo}
    </h1>
  </div>
</div>
 
      <div class="container-cards">

          <div class="card-diario" onclick="navigate('introduzione', '${diario.id}')">
            <div class="flex items-center space-x-4">
              <span class="text-3xl">${diario.icon}</span>
              <h2 class="font-ui-titolo text-xl font-semibold">
                Introduzione: L’Eco degli Sguardi
              </h2>
            </div>
          </div>

          <h3 class="font-ui-titolo text-2xl font-bold text-white mb-4 mt-8 px-2"
              style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
            Le Tappe
          </h3>

          <div class="space-y-4">
            ${diario.tappe.map(t => `
              <div class="card-diario"
                   onclick="navigate('tappa', '${diario.id}', '${t.id}')">
                <div class="flex items-center space-x-4">
                  <span class="text-3xl">${t.icon}</span>
                  <h2 class="font-ui-titolo text-xl font-semibold">
                    ${t.titolo}
                  </h2>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </main>
    </div>
  `;
}

function TappaView(dId, tId) {
    const diario = (Array.isArray(DATABASE.diari) ? (DATABASE.diari.find(d => d.id === dId) || DATABASE.diari[0]) : null);
    if (!diario || !Array.isArray(diario.tappe)) return HomeView();

    const t = diario.tappe.find(x => x && x.id === tId);
    if (!t || !t.theme || !Array.isArray(t.contenuto)) return HomeView();

    const bgStyle = t.theme.sfondo
        ? `background-image: url('${t.theme.sfondo}'); background-size: 400px;`
        : `background-color: white;`;

    return `<div class="flex flex-col h-full" style="${bgStyle}">
        <header class="header-galleggiante">
            <button onclick="navigate('diario', '${diario.id}')">← Indietro</button>
        </header>
        <main class="vista-lettura flex-1 overflow-y-auto">
            <div class="foglio-lettura">${withAutoTitle(t.contenuto, t.titolo).map(b => renderBlocco(b, t.theme)).join('')}
</div>
        </main>
    </div>`;
}
function IntroduzioneView(dId) {
    const d = (Array.isArray(DATABASE.diari) ? (DATABASE.diari.find(x => x.id === dId) || DATABASE.diari[0]) : null);
    if (!d) return HomeView();

    const bgClass = (d.intro_theme && d.intro_theme.bg) ? d.intro_theme.bg : 'bg-[#f0f0f0]';

    return `<div class="flex flex-col h-full ${bgClass}">
        <header class="header-galleggiante">
            <button onclick="navigate('diario', '${d.id}')">← Indietro</button>
        </header>
        <main class="vista-lettura flex-1 overflow-y-auto">
            <div class="foglio-lettura foglio-trasparente">
                ${withAutoTitle(d.introduzione, "Introduzione").map(b => renderBlocco(b, d.intro_theme)).join('')}
            </div>
        </main>
    </div>`;
}
const appContainer = document.getElementById('app-container');
if (!appContainer) { throw new Error("Manca l'elemento #app-container nell'HTML"); }
window.navigate = (view, p1 = null, p2 = null) => { history.pushState({view, p1, p2}, '', `#${view}`); renderApp(view, p1, p2); };
window.onpopstate = (e) => renderApp(
    e.state ? e.state.view : 'hub',
    e.state ? e.state.p1 : null,
    e.state ? e.state.p2 : null
);
function renderApp(view, p1, p2) {
    if(view === 'home') appContainer.innerHTML = HomeView();
    else if(view === 'diario') appContainer.innerHTML = DiarioView(p1);
    else if(view === 'tappa') appContainer.innerHTML = TappaView(p1, p2);
    else if(view === 'introduzione') appContainer.innerHTML = IntroduzioneView(p1);
    else if(view === 'hub') appContainer.innerHTML = HubView();
    else if(view === 'menu-storie') appContainer.innerHTML = StorieMenuView();
    else if(view === 'menu-mediterraneo') appContainer.innerHTML = MenuMediterraneoView();
    else if(view === 'storia') appContainer.innerHTML = StoriaLetturaView(p1);
    else if(view === 'leggi-storia') appContainer.innerHTML = StoriaLetturaView(p1);
    else if(view === 'lampada') appContainer.innerHTML = LampadaView(p1);
    else appContainer.innerHTML = HomeView();
}
const manifest = {"name":"Tappeto","display":"standalone","start_url":location.href};
const link = document.createElement('link'); link.rel = 'manifest'; link.href = 'data:application/json;base64,'+btoa(JSON.stringify(manifest)); document.head.appendChild(link);
renderApp('hub');
