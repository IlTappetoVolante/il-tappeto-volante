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