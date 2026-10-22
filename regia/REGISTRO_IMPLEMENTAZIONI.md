# La Regia Unica — Registro delle implementazioni

## 2026-10-21 — Caption da immagine (v1, installata nella Regia di prova)

**Richiesta:** generazione di una caption da foto o screenshot, attivata esclusivamente su richiesta dell'utente.

**Funzioni implementate:**
- Selezione locale di file JPEG, PNG e WebP (massimo 12 MiB), con anteprima immediata; la selezione non invia nulla ai servizi AI.
- Selezione del progetto (Il Tappeto Volante / Il Dizionario dei Sogni), social (Instagram, Facebook, YouTube, Threads), lingua (EN, IT, IT+EN, EN+IT, ES, FR, TR) e istruzioni facoltative.
- Analisi multimodale di foto/screenshot con Firebase AI Logic, chiamata soltanto con il tasto «Crea caption»; utilizza il backend Google AI e il modello selezionato nella Redattrice AI, con fallback per errori modello non disponibile.
- Primo passaggio di riconoscimento prudente: se luogo o soggetto non è identificabile con sufficiente certezza, la Regia **si ferma** e chiede conferma prima di usare nomi specifici, oppure permette di creare una caption generica senza nomi.
- Secondo passaggio: caption conforme allo stile editoriale del progetto, al social e alla lingua; immagine visibile accanto al testo modificabile, pulsante «Copia caption».
- Nessuna pubblicazione automatica. Nessuna persistenza automatica dell'immagine in localStorage o nel Diario; anteprima realizzata tramite URL temporaneo del browser.

**Percorsi e protezione della versione stabile:**
- `regia/index.html`: copia esatta della Regia precedentemente collaudata, salvata come backup (commit `26b0c9240e340a0bd85dc19d27d3fe0101b00ee8`). **Non modificata durante questa implementazione.**
- `regia/regia-test/index.html`: aggiunta isolata «Caption da immagine», commit `f2e2d0728239c9208537294b4ed9ea062162a809`.
- Al termine delle prove pratiche, la scelta di copiare la prova sulla principale oppure conservare la principale attuale resta dell'utente.

**Verifiche eseguite:** presenza della nuova scheda, campi, avvio solo volontario, blocco per identità incerta, opzione descrizione generica, editing e copia. Verifica sintattica statica dei due script JavaScript; le sezioni e i flussi preesistenti restano nel file. Copia stabile e file di prova erano identici prima di aggiungere il modulo.

**Stato:** implementato e salvato su GitHub nella **sola Regia di prova**. Verifica funzionale in browser reale (foto, screenshot, Firebase Auth/App Check, richiesta a Gemini, conferma ambiguità e copia testo) ancora **da completare**. Non dichiarare collaudo completato prima della prova sul dispositivo.

**Nota sulle richieste immagini:** foto/screenshot vengono inviati a Firebase AI Logic solo quando richiesto; la richiesta multimodale può comportare il trattamento dell'immagine presso il fornitore AI. La qualità dell'identificazione non è garantita: il controllo di conferma è una misura cautelativa, non una verifica oggettiva dell'identità.

**Collaudo consigliato:** (1) caricare foto e verificare anteprima; (2) confermare l'accesso e generare una caption; (3) usare una foto di luogo non evidente e verificare richiesta di conferma / testo senza nomi; (4) cambiare lingua/progetto e rigenerare; (5) modificare e copiare; (6) controllare le quattro schede originali; (7) provare con uno screenshot e gestire errori di rete.

## 2026-10-21 — Traduci caption (v1, installata nella Regia di prova)

**Richiesta:** tradurre la caption già generata senza ripetere l'analisi visiva della foto o dello screenshot.

**Funzioni implementate:** selezione lingua italiano, inglese, spagnolo, francese, turco, italiano+inglese o inglese+italiano; pulsante «🌍 Traduci caption»; richiesta Firebase AI Logic esclusivamente testuale; visualizzazione separata dell'originale e della traduzione, entrambi modificabili e copiabili. La traduzione è nascosta se viene modificato l'originale o cambiata la lingua, per evitare di usare un testo obsoleto. Nessuna pubblicazione automatica.

**Sicurezza e compatibilità:** il modulo non ricarica l'immagine per la traduzione e conserva il testo originale; utilizza la stessa autenticazione e App Check. Nessuna modifica all'indice principale della Regia.

**Stato:** pubblicato sul ramo principale del repository ma solo al percorso `regia/regia-test/index.html`; sintassi degli script verificata staticamente. Da completare collaudo browser con Firebase e verifica effettiva dei pulsanti, della copia e delle lingue.


## 2026-10-22 — Esito primo collaudo della traduzione

**Verifica riferita dall'utente:** funzione «Traduci caption» provata con successo nella Regia di prova; traduzione riuscita. Il modello Gemini inizialmente selezionato è stato cambiato manualmente e il modello scelto si è rivelato molto veloce. Il nome del modello alternativo non è ancora stato comunicato; **non** modificare il modello predefinito sulla base di supposizioni.

**Da verificare:** nome del modello risultato veloce, eventuale scelta come predefinito, ulteriori lingue e controlli di regressione. **Regia principale invariata.**

**Conferma modello:** l'utente ha utilizzato `gemini-3.5-flash-lite` (opzione «Lite») per la traduzione della caption; risultato corretto e risposta percepita come molto veloce. La prova riguarda la traduzione testuale e non dimostra che il modello sia preferibile anche per l'analisi dell'immagine. Il predefinito non è stato modificato.


## 2026-10-22 — Catalogo landing page nel lettore Regia (versione di prova)

**Richiesta:** aggiungere al selettore della Regia le landing page mancanti.

**Modifica eseguita:** il menu «Landing page del sito e collegamenti rapidi» ora contiene **11 collegamenti verificati come file index.html nel repository GitHub**, di cui **8 nuovi** rispetto alle tre voci esistenti. Suddivisione per categorie: Viaggi da Sogno (Porta, Babbucce, Rapimento), Diari di viaggio e Marocco (Noi sorelle degli Stretti, Istanbul Caos Affascinante, Col Marocco passo dopo passo), Le Mille e Una Notte (Città di Bronzo), Storia (Aşk ve Taht landing e episodio 1), Letteratura (Ben Ramar), Home del sito.

**Ambito:** unicamente \`regia/regia-test/index.html\`; \`regia/index.html\` resta invariato come copia stabile. Nessuna modifica a Firebase, autenticazione, generazione/approvazione caption, traduzione, Diario o pulsanti esistenti.

**Verifiche:** tutti i percorsi corrispondono a file \`index.html\` esistenti nel ramo \`main\` del repository; numero e unicità dei link controllati; entrambi gli script JavaScript hanno superato la verifica sintattica. Da collaudare nel browser l'analisi di ogni pagina. Landing non ancora presenti nel repository escluse per evitare collegamenti non funzionanti.


## 2026-10-22 — Musica Gemini dalle landing page (v1, in test)

**Richiesta:** dopo la lettura editoriale della landing page, proporre una colonna sonora coerente con il testo e avviarne la realizzazione con Gemini.

**Implementato esclusivamente in \`regia/regia-test/index.html\`:**
- Nuova scheda «🎼 Musica per questa landing page» nella sezione del lettore. Riutilizza i veri estratti letti, la sessione Firebase Authentication e App Check, senza nuova lettura della pagina.
- Un pulsante «Prepara prompt musicale con Gemini» invoca Gemini Flash-Lite (fallback Flash quando esplicitamente non supportato) e produce un *prompt musicale personalizzato in inglese* da testo realmente letto: atmosfera, strumenti, sviluppo, durata desiderata, prevalentemente strumentale.
- Prompt editabile, copia negli appunti, link per aprire Gemini Music/Lyria. L'utente deve richiedere lì la creazione del file MP3; la Regia non dichiara di generarlo.
- Caricamento locale opzionale di MP3 fino a 30 MB e lettore di anteprima audio (object URL), senza caricamento automatico su GitHub o nel cloud.
- Pulizia dei prompt quando cambia landing page; stessa pagina può essere elaborata nuovamente. Schede esistenti, traduzione, login e versione principale non modificate.

**Motivo del flusso in due strumenti:** Firebase AI Logic *non supporta i modelli Lyria*, mentre Gemini Music / Gemini API Interactions supportano Lyria 3.5. La generazione MP3 diretta dentro Regia richiede una integrazione API server-side separata con gestione credenziali e quote; non introdurre una chiave segreta lato browser.

**Brano selezionato dall'utente:** «Where the Horizon Bends» (Gemini, ca. 02:57, file originale con metadati Google C2PA), assegnato alla landing \`viaggi-da-sogno/porta/\`. **Archiviato nella Libreria come MUS-003**. Non ancora pubblicato come risorsa audio nel repository GitHub; quindi non ancora collegato al lettore pubblico. Non classificarlo come Pixabay.

**Stato e verifiche:** sintassi JS di entrambi gli script verificata staticamente; interfaccia e gestione Firebase ancora da collaudare da browser. La Regia principale continua a essere la copia stabile e non è stata sovrascritta.


## 2026-10-22 — Immagini contestuali e Porta musicale (versione di prova)

**Richieste:** creare immagini su richiesta per post civetta quando le immagini estratte non bastano, anche partendo da un'immagine esempio; collegare «Where the Horizon Bends» alla landing «Sognare una porta» prima di finalizzare il nuovo modulo.

**Immagini (installato in test):** \`regia/regia-test/index.html\` contiene il nuovo pannello «Immagini per il post» e \`regia/regia-test/image-maker.js\` contiene il codice isolato di generazione. Due modalità: (1) generazione dalla pagina e dal post selezionati; (2) elaborazione da JPEG/PNG/WebP esempio con opzioni per colori, composizione, soggetto, stile o variante. Tipi post civetta/teaser/reel/carosello/illustrazione; social e formati 9:16, 4:5, 1:1, 16:9, 4:3; modello Nano Banana selezionabile. Anteprima dell'immagine già nella pagina, copia URL, anteprima del risultato, scaricamento e «Usa come esempio per una variante». Solo al clic, senza salvataggi o pubblicazioni automatiche. Richiede Gemini Image con piano Firebase Blaze, che può comportare costi.

**Sicurezza:** la Regia stabile \`regia/index.html\` non è stata modificata. Script originali e modulo immagini superano il controllo statico della sintassi. Da collaudare in browser con Firebase e l'accesso effettivo a Nano Banana.

**Porta — parzialmente preparata:** in \`viaggi-da-sogno/porta/index.html\` è stata inserita la sezione con il lettore, crediti Gemini e URL previsto \`../../audio/where_the_horizon_bends.mp3\`. Il player è nascosto finché una verifica HTTP HEAD non conferma l'esistenza dell'MP3 pubblico: nessuna interfaccia fittizia o pulsante rotto per i visitatori. **Il file audio da 4.254.891 byte (~2:57) è archiviato nella Libreria come MUS-003, ma NON è ancora nel repository GitHub**, perché il collegamento disponibile espone scritture testuali/Base64 senza accesso diretto ai byte locali del file. Caricare il file nel percorso previsto resta indispensabile per completare la richiesta. Non dichiarare il lettore come operativo prima del caricamento e del collaudo browser.


## 2026-10-22 — Paywall Istanbul — anteprime e gateway (NON ancora attivo)

Richiesta: predisporre per «Istanbul · Il Caos Affascinante» un ingresso settimanale da **3 €** valido 7 giorni e un accesso permanente con contributo **a discrezione da 5 €**, senza rinnovi automatici; pubblicazione imminente sui social.

**Realizzato su GitHub:** tre anteprime gratuite autonome IT/EN/ES nella cartella \`istanbul-caos-affascinante/\`; una schermata \`accesso.html\` con login via link email Firebase, selezione prezzo e PayPal Buttons; progetto backend \`paywall-istanbul/\` con PayPal Orders v2, verifica server del pagamento, diritti di accesso in Firestore, servizio privato dei racconti, verifica webhook per rimborsi, script di migrazione degli articoli e guida di attivazione.

**Protezione:** le anteprime mostrano "pagamenti in preparazione" fino all'avvio esplicito della funzione backend e al caricamento privato di tutti e tre gli articoli. L'indice originale, la traduzione inglese e quella spagnola restano invariati e pubblici. La cronologia GitHub resta accessibile: contenuti precedentemente pubblici non possono essere resi retroattivamente esclusivi. Nessun pagamento attivo, nessun addebito.

**Stato:** codice versionato e sintassi verificata; **non ancora deployato su Firebase né collegato a un conto PayPal**, non ancora collaudato in Sandbox. Necessari: account PayPal Developer, secret su Firebase, email link Auth, regole database, migrazione contenuti privati, collaudi Sandbox, switch Live. Vedi \`paywall-istanbul/LEGGIMI-ATTIVAZIONE.md\`. Non distribuire come paywall a pagamento finché non viene completata l'attivazione.


## 2026-10-22 — Linguaggio editoriale: contributi al progetto

Su richiesta dell'autrice sono state aggiornate le anteprime italiana, inglese e spagnola e la pagina di accesso, evidenziando lo scopo di sostenere con contributi la produzione di racconti e fotografie originali di «Il Tappeto Volante». Testo guida: «Dona 3 € per sostenere il mio progetto affinché io possa continuare a produrre questi contenuti». Restano ben specificati i vantaggi abbinati al contributo: sette giorni di accesso con 3 €, accesso permanente con contributo a discrezione da 5 €.

**Chiarezza obbligatoria:** il linguaggio di sostegno non cambia la natura della transazione quando l'accesso ai contenuti è condizionato al versamento. Non indicarla come liberalità senza contropartita o donazione fiscalmente detraibile. PayPal.Me personale non è una scorciatoia per eludere le condizioni PayPal per beni/servizi. PayPal Checkout/Firebase restano non attivi, senza pagamenti disponibili fino ad attivazione e collaudo. Le tre pagine complete già pubbliche non sono state modificate.


## 2026-10-22 — Password monouso email per il racconto Istanbul (SOLO STAGING)

L'autrice richiede accesso tramite username/email e password valida una sola volta, con invio **automatico** di una nuova password alla mail del sostenitore per ogni successivo ingresso, possibilmente dal mittente «Il Tappeto Volante». Scelta tecnica: codice di otto cifre monouso valido dieci minuti, spedito via email, autenticazione Firebase via token Custom e sessione volatile del browser.

**Realizzato**: \`paywall-istanbul/functions/otp.js\` per generazione, email, limiti anti-abuso, verifica codice e consegna contenuto protetto; \`grant-access.cjs\` per conferire o revocare manualmente i diritti dopo verifica dei contributi PayPal.Me; \`istanbul-caos-affascinante/accesso-monouso.html\` per accesso, ascolto e lettura; le tre anteprime del ramo staging rimandano a tale pagina. Regole Firestore aggiornate come frammento da integrare. Documentazione: \`paywall-istanbul/OTP_EMAIL_COLLAUDO.md\`.

**Limiti**: i codici si consumano, non il pass; 3 € per sette giorni e contributo da 5 € per diritto permanente. Il testo integrale resta protetto da un controllo server (quando migrato) e non soltanto dal segreto dell'URL. La risposta effettiva di PayPal.Me non è disponibile automaticamente: l'autrice deve approvare l'accesso dopo aver verificato l'incasso. Invio dal mittente «Il Tappeto Volante» richiede un servizio email configurato con indirizzo/dominio autorizzato; l'implementazione al momento utilizza Resend e non ha credenziali o dominio verificato.

**Stato**: sintassi JS e riferimenti verificati staticamente; nessun deploy Firebase né test reale invio email ancora effettuato, nessuna modifica alle pagine pubbliche main, nessun incasso attivato.
