/**
 * Il Tappeto Volante — verifica invio con Google Apps Script.
 * SOLO COLLAUDO DEL MITTENTE: non e' un sistema OTP o un paywall.
 * Eseguire manualmente dall'account Gmail del progetto.
 * Non distribuire il progetto come "App web" in questa fase.
 */
function provaInvioAllaMiaEmail() {
  const destinatario = Session.getEffectiveUser().getEmail();
  if (!destinatario || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(destinatario)) {
    throw new Error('Impossibile identificare la casella Google: esegui dal tuo account proprietario.');
  }
  const disponibili = MailApp.getRemainingDailyQuota();
  if (disponibili < 1) {
    throw new Error('La quota email di Apps Script e\' terminata. Nessun messaggio inviato.');
  }
  MailApp.sendEmail({
    to: destinatario,
    name: 'Il Tappeto Volante',
    subject: '[PROVA] Il Tappeto Volante · Email per accessi riservati',
    body:
      'Questa e\' una prova di invio da Google Apps Script.\\n\\n' +
      'Il Tappeto Volante sta preparando l\'invio dei codici monouso.\\n' +
      'Non e\' stata attivata alcuna vendita, ne\' inviato alcun codice di accesso.\\n\\n' +
      'Se hai ricevuto questa email, l\'invio dalla casella Google del progetto funziona.'
  });
  Logger.log('Prova inviata alla casella proprietaria. Controlla Posta in arrivo o Spam.');
}
