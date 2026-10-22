# Istanbul — accesso tramite codice email monouso (Gmail, ramo di prova)

**STATO AL 22/10/2026**: codice preparato nel ramo `istanbul-paywall-staging`; invio Gmail NON attivato, Cloud Function NON distribuita, contenuti integrali IT/EN/ES ancora pubblici su `main`. Nessun pagamento da avviare prima del collaudo.

## Come dovrebbe funzionare
1. In un secondo momento il lettore paga con PayPal.Me in una modalità consentita per contenuti esclusivi. PayPal.Me NON comunica automaticamente a Firebase l'esito del pagamento.
2. L'autrice verifica l'accredito effettivo sul proprio PayPal; un amministratore abilita l'email corretta usando `grant-access.cjs` da ambiente fidato.
3. Il lettore inserisce l'email autorizzata e richiede un codice.
4. Il backend Firebase genera un codice a **8 cifre**, valido **10 minuti**, monouso, e lo invia dalla vera casella Gmail del progetto.
5. La verifica del codice avviene su Firebase; il contenuto completo arriva da Firestore privato solo se il lettore ha un diritto valido (7 giorni o accesso permanente). Ogni nuova scheda/sessione richiede un nuovo codice.

## Preparazione Gmail (da eseguire direttamente dall'autrice, NON in chat)
- Accedere con l'account Google che dovrà inviare le mail.
- Attivare la **Verifica in due passaggi** per quell'account.
- Aprire **https://myaccount.google.com/apppasswords**. Se disponibile, creare una password per l'app chiamata "Regia Istanbul OTP". Google la mostra una volta; non copiarla in chat, GitHub, screenshot o file del sito.
- La password per le app è una credenziale sensibile che consente a un programma l'accesso al servizio email. Revocarla nell'account Google se non serve più. Google consiglia OAuth 2.0 come metodo più sicuro per integrazioni durature; questa soluzione SMTP è destinata al collaudo iniziale.
- Se la voce "Password per le app" non è disponibile (es. Protezione avanzata o alcune impostazioni dell'account), usare OAuth 2.0 o un provider email verificato, senza aggirare le protezioni dell'account.

## Configurazione Firebase (Cloud Shell/PC, con accesso amministrativo)
Progetto: `regia-tappeto-volante`. Prima verificare Firestore, Authentication, Cloud Functions, permessi IAM necessari e piano Blaze; possono esserci costi.

In una shell **direttamente autenticata**, senza riportare l'output contenente credenziali nella chat:

```bash
firebase functions:secrets:set ISTANBUL_GMAIL_APP_PASSWORD --project regia-tappeto-volante
firebase functions:secrets:set ISTANBUL_OTP_HMAC_KEY --project regia-tappeto-volante
```

Il primo valore da inserire, solo nella richiesta sicura della CLI, è la password per l'app generata da Google; il secondo è una stringa segreta casuale forte distinta. Evitare di inserirli come argomenti visibili nella cronologia dei comandi.

Configurare `paywall-istanbul/functions/.env` **localmente e non su GitHub**:

```dotenv
ISTANBUL_OTP_ACTIVE=no
ISTANBUL_GMAIL_SENDER=indirizzo-gmail-del-progetto@example.com
```

Sostituire la seconda riga con la casella **Gmail reale** che ha generato la password per l'app; il valore non è un alias fittizio. Il file `.env` è escluso dalla pubblicazione su GitHub. Il mittente pubblico sarà «Il Tappeto Volante» con l'indirizzo Gmail reale.

Dalla cartella `paywall-istanbul`:

```bash
npm install --prefix functions
npm run check --prefix functions
firebase deploy --only functions:istanbulOtpAccess --project regia-tappeto-volante
```

Con `ISTANBUL_OTP_ACTIVE=no` la funzione resta disattivata al pubblico e non invia codici. **Non distribuire in produzione** prima del collaudo.

## Prove necessarie PRIMA di qualsiasi pagamento reale
1. Importare da ambiente amministrativo fidato gli articoli integrali IT/EN/ES nella raccolta privata `istanbul_private_content`. Non pubblicare i file privati con credenziali.
2. Integrare e testare le regole Firestore di `firestore-RULES-DA-INTEGRARE.txt`, senza sostituire indiscriminatamente quelle già usate dalla Regia.
3. Con un'email reale controllata dall'autrice, eseguire una concessione temporanea **di test senza denaro reale**: `grant-access.cjs <email> week --execute` da un PC/Cloud Shell autorizzato.
4. Impostare localmente `ISTANBUL_OTP_ACTIVE=yes`, ridistribuire solo la funzione di accesso e verificare invio Gmail, scadenza dopo dieci minuti, singolo utilizzo, 5 tentativi massimi, limiti di richieste, revoca, accesso IT/EN/ES e nuovo codice a ogni ingresso.
5. Verificare che URL e browser senza autorizzazione non possano leggere le pagine protette. Mettere nuovamente `ACTIVE=no` in caso di problemi.

## Condizioni necessarie per il lancio
- I tre file `istanbul-caos-affascinante/index.html`, `en.html`, `es.html` sono ancora leggibili pubblicamente sul ramo `main`. Prima di proporre un accesso esclusivo, sostituirli con anteprime e fare un controllo della versione pubblicata. La cronologia GitHub e copie già effettuate rimangono accessibili.
- I pulsanti PayPal.Me nelle anteprime sul ramo staging sono **disattivati**: nessun lettore deve pagare per un accesso non operativo.
- Un trasferimento a fronte di contenuti esclusivi è un pagamento con contropartita, anche se lo si presenta editorialmente come "sostegno" o "dona"; non usare la modalità "amici e familiari".
- Con PayPal.Me, **l'autorizzazione dopo il pagamento è manuale**. Per abilitare l'accesso automaticamente dopo l'incasso servirà Checkout/Webhook PayPal, da integrare e verificare separatamente.
- Un codice monouso limita l'accesso, non impedisce copie o fotografie del racconto da parte di un lettore autorizzato.
