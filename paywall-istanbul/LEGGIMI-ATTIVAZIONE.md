# Paywall «Istanbul · Il Caos Affascinante» — guida di attivazione

**STATO (22 ottobre 2026): SOFTWARE STAGING, NON ATTIVO PER VENDITE.**
Non distribuire ai lettori la pagina \`accesso.html\` come se fosse già operativa.
La pagina \`anteprima.html\` e le anteprime EN/ES mostrano correttamente "pagamenti in preparazione". Il link acquisto comparirà solo dopo attivazione del backend.

## Modello economico (decisione editoriale)
- Pass settimanale: **3,00 EUR**, sette giorni dal pagamento, accessi illimitati.
- Pass sostenitore: **da 5,00 EUR** (fino a 500 EUR nella prima versione tecnica), accesso permanente senza scadenza programmata.
- Nessun rinnovo automatico.
- Acquisto legato a identità Firebase con **email verificata**.
- Ogni acquisto viene verificato mediante PayPal Orders v2 server-side; l'ordine non può cambiare prezzo o piano tramite il browser.
- Accessi basati sulle transazioni valide in Firestore, non su parametri URL.
- La lettura completa arriva dalla collezione Firebase privata, non da \`completa.html\` pubblicata su GitHub.

## File creati
- \`istanbul-caos-affascinante/anteprima.html\`: teaser pubblico IT e prezzi.
- \`istanbul-caos-affascinante/anteprima-en.html\`: teaser EN.
- \`istanbul-caos-affascinante/anteprima-es.html\`: teaser ES.
- \`istanbul-caos-affascinante/accesso.html\`: accesso email-link, Paypal Buttons, sblocco contenuto solo dopo verifica backend. Pagina riservata di collaudo finché manca la configurazione.
- \`paywall-istanbul/functions/index.js\`: backend PayPal/Firebase con configurazione segreta.
- \`paywall-istanbul/functions/import-content.cjs\`: copia locale amministrativa dei tre articoli nel Firestore privato.
- \`paywall-istanbul/firestore-RULES-DA-INTEGRARE.txt\`: frammento delle regole, non sostituire automaticamente tutte le regole Firestore della Regia.

## Passaggi indispensabili (eseguirli su PC o Cloud Shell in ambiente fidato)

1. Su Firebase, progetto \`regia-tappeto-volante\`: verificare Blaze, Firestore, Cloud Functions, e abilitare **Authentication > Email/Password > Email link**; autorizzare \`iltappetovolante.github.io\` come dominio Firebase Auth. Questo sito pubblico non deve conoscere credenziali PayPal.
2. Sul **PayPal Developer Dashboard**, creare app REST **Sandbox** del conto titolare: Client ID e Client Secret. Non inviare mai Client Secret in chat, GitHub, HTML o screenshot.
3. Da una shell autenticata a Firebase, nella cartella \`paywall-istanbul\`:
   \`\`\`bash
   npm install --prefix functions
   firebase login
   firebase functions:secrets:set ISTANBUL_PAYPAL_CLIENT_ID --project regia-tappeto-volante
   firebase functions:secrets:set ISTANBUL_PAYPAL_CLIENT_SECRET --project regia-tappeto-volante
   firebase functions:secrets:set ISTANBUL_PAYPAL_WEBHOOK_ID --project regia-tappeto-volante
   \`\`\`
   Per il primo deploy Sandbox, il webhook ID può essere impostato solo dopo aver creato il listener PayPal; non testare rimborsi prima che sia quello effettivo. Impostare \`functions/.env\` (NON committare!) con:
   \`\`\`env
   ISTANBUL_PAYPAL_MODE=sandbox
   ISTANBUL_PAYWALL_ACTIVE=no
   \`\`\`
   Poi, da \`paywall-istanbul\`:
   \`\`\`bash
   firebase deploy --only functions:istanbulPaywall --project regia-tappeto-volante
   \`\`\`
   Funzione prevista: \`https://europe-west1-regia-tappeto-volante.cloudfunctions.net/istanbulPaywall\`.
4. Nel conto PayPal app Sandbox, creare il webhook HTTPS:
   \`https://europe-west1-regia-tappeto-volante.cloudfunctions.net/istanbulPaywall/webhook\`.
   Sottoscrivere almeno \`PAYMENT.CAPTURE.REFUNDED\` e \`PAYMENT.CAPTURE.REVERSED\`. Registrare l'ID webhook in Firebase Secret Manager e ridistribuire la funzione. **Verificare in Sandbox** che le notifiche vengano validate correttamente e che un rimborso revochi l'accesso. Testare anche dispute e chargeback (non completamente gestiti automaticamente dalla versione iniziale).
5. Prima della chiusura delle pagine pubbliche, importare la versione completa IT/EN/ES nel Firestore privato: con Google Application Default Credentials in un ambiente amministrativo fidato, dalla cartella \`paywall-istanbul/functions\`:
   \`\`\`bash
   node import-content.cjs ../../istanbul-caos-affascinante
   node import-content.cjs ../../istanbul-caos-affascinante --execute
   \`\`\`
   **Verificare** che esistano i documenti \`istanbul_private_content/it\`, \`/en\` e \`/es\` con il campo HTML. Non committare mai file contenenti testo privato o credenziali.
6. Integrare le regole di sicurezza Firestore indicate nell'apposito file senza sovrascrivere le regole esistenti del progetto Regia. Testare che un lettore non autorizzato non possa leggere Firestore direttamente.
7. **Prima del lancio a pagamento:** sostituire \`istanbul-caos-affascinante/index.html\`, \`en.html\`, \`es.html\` con le sole anteprime pubbliche; quindi controllare GitHub Pages, RSS/link esterni e che nessun asset/testo riservato sia pubblicato sotto URL alternativi. L'opera precedente rimane comunque recuperabile nella **cronologia GitHub pubblica**: l'esclusività tecnica retroattiva non è garantibile, anche con una pagina server-side.
8. **Per provare Sandbox**, dopo aver importato i tre contenuti e integrato le regole private, impostare temporaneamente `ISTANBUL_PAYWALL_ACTIVE=yes` in `functions/.env` (con `ISTANBUL_PAYPAL_MODE=sandbox`) e ridistribuire la funzione. Pagamenti Sandbox non trasferiscono denaro reale. Testare: 3€, 5€, importo libero, email persa/cambio dispositivo, accesso scaduto dopo 7 giorni, accesso permanente, pagamenti duplicati, annullamenti, rimborsi, IT/EN/ES e accesso da nuovo browser; valutare informativa privacy, termini e fiscalità. Finito il test, riportare `ACTIVE=no` e ridistribuire prima di prepararne il lancio Live.
9. Solo al collaudo completo, creare le credenziali **Live** PayPal (su account idoneo), sostituire i segreti, aggiornare \`functions/.env\`:
   \`\`\`env
   ISTANBUL_PAYPAL_MODE=live
   ISTANBUL_PAYWALL_ACTIVE=yes
   \`\`\`
   ridistribuire funzione e testare una transazione reale. Lo switch \`ACTIVE=yes\` non deve mai precedere il caricamento dei tre racconti privati e la rimozione delle tre pagine integrali pubbliche.

## Sicurezza, limiti e trasparenza
- URL "completa.html" e tag noindex **non** proteggono i contenuti.
- Non mettere Client Secret, service account, documenti privati o chiavi Firebase Admin in GitHub.
- Il progetto è già pubblico; i vecchi commit restano potenzialmente accessibili. Un paywall può proteggere **nuovi accessi**, non cancellare copie precedenti.
- Accesso permanente non equivale a disponibilità garantita in eterno se il sito/servizio cessa.
- Valutare chargeback/dispute e ulteriori eventi PayPal prima del lancio Live.
- Non inserire contenuti non pagati o fittizi nel sito pubblico e non promettere accesso funzionante prima dei test.
