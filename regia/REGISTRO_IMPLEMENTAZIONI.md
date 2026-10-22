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
