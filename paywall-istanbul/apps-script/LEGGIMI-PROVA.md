# Regia Unica — prova invio Gmail gratuita con Google Apps Script

**STATO 22 ottobre 2026:** file di preparazione su ramo `istanbul-paywall-staging`, non installato nell'account Google, nessuna email inviata, nessuna transazione attiva.

## Scopo del primo collaudo
Usare il servizio `MailApp` di Google Apps Script per inviare *una sola email di prova* dalla casella Google del Tappeto Volante alla stessa casella. Non richiede Firebase Blaze, Secret Manager, una password per le app o un nuovo dominio. Non legge la posta Gmail. NON e' ancora un'autenticazione OTP.

## Istruzioni (preferibilmente da computer)
1. Accedere con l'account Google destinato a inviare le email e visitare https://script.google.com/home/projects/create
2. Rinominare il progetto `Regia Unica - Invio email prova`.
3. Aprire `Code.gs` e sostituire il codice iniziale con il file `ProvaInvio.gs` presente in questa cartella.
4. Salvare, selezionare la funzione `provaInvioAllaMiaEmail` ed eseguire.
5. Google puo' chiedere di autorizzare l'app a identificare l'account e a inviare email a suo nome. Leggere e approvare **solo se** gli ambiti corrispondono a quelli attesi.
6. Controllare l'email nella casella da cui hai eseguito il progetto, inclusa la cartella Spam.

**Non selezionare "Distribuisci"/"Implementa app web" e non impostare accesso pubblico.** Un'app web eseguita come proprietario potrebbe utilizzare le autorizzazioni dell'account per chiunque la invochi: va progettata con controlli prima di renderla pubblica. Non includere mai codici, token, password o dati dei lettori nei file GitHub pubblici.

## Limiti e lavori ancora necessari
- Quota ufficiale Apps Script con account Gmail personale: fino a 100 destinatari email al giorno, soggetta a variazioni; limite consultabile con `MailApp.getRemainingDailyQuota()`.
- Per un accesso esclusivo reale occorrono: un backend autenticato e protetto dall'abuso, generazione OTP sicura, memorizzazione della verifica non visibile al lettore, tempi di scadenza e limiti per richiesta/tentativi, sessione e lettura lato server, protezione dei contenuti integrali non piu' pubblicati nel repository. Una semplice pagina con password JavaScript lato browser non e' una protezione.
- Con PayPal.Me la verifica del pagamento e l'abilitazione iniziale restano manuali. Non pubblicare i link finche' l'intero percorso non e' collaudato.
- Revocare la password per l'app Gmail generata in precedenza; **non e' necessaria** con MailApp.

Documentazione Google:
- https://developers.google.com/apps-script/reference/mail/mail-app
- https://developers.google.com/apps-script/guides/services/quotas
- https://developers.google.com/apps-script/guides/web
