# Istanbul — accesso con password monouso via email (ramo di prova)

**STATO**: codice implementato su \`istanbul-paywall-staging\`, non attivato e non pubblicato su GitHub Pages. Le pagine integrali IT/EN/ES sono ancora pubbliche su \`main\`.

## Percorso del sostenitore
1. Una volta che il paywall è operativo, il lettore sceglie il contributo sul proprio PayPal.Me con modalità appropriata per contenuti esclusivi. Pagamento immediato, MA PayPal.Me non notifica l'incasso alla nostra Firebase Function.
2. L'autrice verifica l'incasso direttamente nel conto PayPal e associa il versamento a un **indirizzo email concordato**. Non fidarsi di screenshot.
3. In questa prima versione un amministratore conferma il diritto di accesso usando uno script da un computer fidato; nessuna password di amministrazione viene conservata nel sito pubblico.
4. Il sostenitore inserisce la sua **email (username)** e preme «Richiedi codice».
5. Riceve un **codice a 8 cifre** via email da un mittente verificato «Il Tappeto Volante», valido **10 minuti** e utilizzabile **una sola volta**. Il codice è generato con \`crypto.randomInt\`, conservato solo sotto forma di HMAC, invalidato dopo l'uso e soggetto a un massimo di 5 tentativi.
6. Dopo la verifica, Firebase Auth emette una sessione limitata alla scheda attuale (**inMemoryPersistence**). Il contenuto completo IT/EN/ES è servito da Firestore privato solo dopo verifica lato server del diritto.
7. A ogni nuovo ingresso su pagina/nuova scheda si richiede un codice diverso. **La validità del pass non è monouso**: 7 giorni o permanente in base alla concessione registrata.

Il semplice URL non permette di bypassare il controllo. I contenuti possono comunque essere fotografati o condivisi da un lettore autorizzato: non esiste una protezione assoluta della copia.

## Nuovi file su ramo \`istanbul-paywall-staging\`
- \`istanbul-caos-affascinante/accesso-monouso.html\`: pagina di accesso con email, OTP e lettura.
- \`paywall-istanbul/functions/otp.js\`: backend OTP protetto con invio email API Resend, Firestore e Firebase Custom Auth Tokens.
- \`paywall-istanbul/functions/grant-access.cjs\`: concessione e revoca diritti dopo controllo manuale dell'incasso.
- \`paywall-istanbul/functions/index.js\`: esporta \`istanbulOtpAccess\` oltre al modulo sperimentale PayPal Checkout non attivato.
- Anteprime IT/EN/ES del ramo di prova: link PayPal.Me da verificare e collegamento alla pagina OTP. Non pubblicate sul ramo principale.

## Preparazione tecnica richiesta
1. Progetto Firebase esistente \`regia-tappeto-volante\`: Firestore, Authentication e Cloud Functions su Blaze, con la corretta autorizzazione a generare Firebase Custom Tokens per l'account di servizio della funzione (IAM role Service Account Token Creator, ove richiesto).
2. Configurare un mittente email autentico del Tappeto. Questa implementazione usa **Resend**. Per poter inviare dal nome \`Il Tappeto Volante <accessi@tuodominio.it>\` è necessario possedere e verificare il dominio di invio con il provider (SPF/DKIM); non basta inventare un indirizzo Gmail o un mittente. In assenza di dominio proprio si deve concordare un provider email diverso che autorizzi il vero indirizzo del progetto. **Non posso attivarlo senza tale configurazione.**
3. In un ambiente amministrativo fidato (non nella chat o su GitHub), creare in Firebase Secret Manager:
   \`firebase functions:secrets:set ISTANBUL_MAIL_API_KEY --project regia-tappeto-volante\`
   \`firebase functions:secrets:set ISTANBUL_OTP_HMAC_KEY --project regia-tappeto-volante\`
   Il secondo deve essere una stringa casuale forte, generata e custodita come segreto.
4. Nella cartella locale \`paywall-istanbul/functions/.env\` (non committare), configurare:
   \`\`\`
   ISTANBUL_OTP_ACTIVE=no
   ISTANBUL_MAIL_FROM=Il Tappeto Volante <accessi@DOMINIO_VERIFICATO>
   \`\`\`
   Sostituire con un vero mittente verificato.
5. Installare \`npm install --prefix functions\`, poi \`firebase deploy --only functions:istanbulOtpAccess --project regia-tappeto-volante\` dalla cartella \`paywall-istanbul\`. Finché \`ACTIVE=no\`, la pagina OTP mostra lo stato non attivo e non spedisce codici.
6. Importare gli articoli integrali in \`istanbul_private_content/it\`, \`/en\`, \`/es\` usando \`import-content.cjs\`, con credenziali amministrative locali; NON mettere contenuti o service account privati dentro il repository pubblico.
7. Integrare le regole Firestore appropriate e testare l'impossibilità di leggerne il contenuto direttamente dalla console client. Per nuove raccolte, usare \`firestore-RULES-DA-INTEGRARE.txt\`.
8. Testare con un indirizzo email reale e con un contributo PayPal.Me verificato, **ma prima fare una prova senza denaro reale** (creando una concessione temporanea di test):
   \`\`\`bash
   cd paywall-istanbul/functions
   node grant-access.cjs lettore@example.com week             # dry run
   node grant-access.cjs lettore@example.com week --execute   # attivazione
   node grant-access.cjs lettore@example.com lifetime --execute
   node grant-access.cjs lettore@example.com revoke --execute
   \`\`\`
   Eseguire questi comandi da un sistema con Google Application Default Credentials autorizzate; non sulla pagina GitHub.
9. Attivare \`ISTANBUL_OTP_ACTIVE=yes\`, ridistribuire SOLO dopo aver verificato invio email, scadenza, limiti tentativi, logout e contenuti protetti. Rivedere rate limit/App Check per il traffico reale.
10. **Prima di pubblicizzare il paywall**, ritirare o sostituire in \`main\` le tre pagine integrali \`index.html\`, \`en.html\`, \`es.html\`; ricordare che la cronologia GitHub e copie già salvate non possono essere cancellate retroattivamente. Poi pubblicare le anteprime e il lettore OTP. Nessuna vendita pubblica finché non si è verificato l'intero percorso contributo → attivazione → email → lettura.

**Attenzione**: trasmissione iniziale codice via email e conferma contributo NON sono automazioni equivalenti: con PayPal.Me la prima versione non può riconoscere autonomamente chi ha versato denaro. La procedura admin rimane manuale. Per una vera attivazione immediata dopo pagamento servono Checkout/Webhook o una piattaforma che fornisca tali notifiche.

**Condizioni PayPal**: i versamenti in cambio di contenuti esclusivi non vanno fatti passare come trasferimenti «amici e familiari». Il loro nome editoriale «dona/sostieni» non ne modifica la natura contrattuale; verificare l'uso consentito del proprio PayPal.Me.
