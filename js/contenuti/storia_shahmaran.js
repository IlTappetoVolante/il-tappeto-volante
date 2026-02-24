const CONTENUTI_SHAHMARAN = [
  
  {
    img: "img/shahmaran_1.png",
    didascalia: "Il miele e il tradimento",
    testo: `Molto tempo fa, in una terra di pietra chiara e melograni, viveva un giovane dal cuore pulito: Cemşab.
Un giorno scese in una gola rocciosa per raccogliere miele selvatico.
Quando chiese di essere tirato su, gli uomini che lo avevano calato… tagliarono la corda.`,
    
  },
  {
    img: "img/shahmaran_2.png",
    testo: `Rimasto solo, Cemşab camminò tra pietre umide e radici, finché trovò una fessura nella roccia: sembrava una porta.
Da dentro filtrava una luce color turchese.
La spinse… e la pietra cedette.`,
    didascalia: "La porta di pietra"
  },
  {
    img: "img/shahmaran_3.png",
    testo: `Dall’altra parte c’era un giardino sotterraneo: acqua limpida, piante rigogliose, silenzio fresco.
Serpenti eleganti scorrevano tra le pietre, ma non erano ostili.
Lo osservavano come un ospite inatteso.`,
    didascalia: "Il giardino sotterraneo"
  },
  {
    img: "img/shahmaran_4.png",
    testo: `E allora apparve lei: Şahmaran, metà donna e metà serpente, regale e quieta.
«Non temere» disse.
«Hai visto il tradimento degli uomini. Ora vedrai il segreto della cura.»`,
    didascalia: "L’incontro con Şahmaran"
  },
  {
    img: "img/shahmaran_5.png",
    testo: `Cemşab restò con lei. Şahmaran gli insegnò erbe e rimedi, i gesti che calmano la febbre e le parole che placano il panico.
Gli insegnò anche la lealtà: perché un patto non è un dettaglio, è un confine.
Quando lo lasciò tornare, gli chiese un giuramento: non rivelare mai la sua dimora.`,
    didascalia: "Le lezioni"
  },
  {
    img: "img/shahmaran_6.png",
    testo: `Passarono gli anni. Il re si ammalò gravemente.
Nel palazzo l’incenso riempiva le stanze e i medici si consumavano tra decotti inutili.
Un visir sussurrò di rimedi proibiti: «Solo Şahmaran conosce la guarigione».
E la paura cominciò a cercare un colpevole.`,
    didascalia: "Il palazzo e la malattia del re"
  },
  {
    img: "img/shahmaran_7.png",
    testo: `«Parla» dissero a Cemşab.
Lui chiese una notte: non voleva tradire, ma nemmeno lasciare che la città bruciasse di paura.
Ricordò ciò che aveva imparato sotto la pietra: la sapienza serve a curare, non a colpire.
E scese di nuovo nel giardino sotterraneo a chiedere aiuto.`,
    didascalia: "La scelta"
  },
  {
    img: "img/shahmaran_8.png",
    testo: `Şahmaran lo aspettava.
«Non serve la mia morte» disse.
Preparò una coppa con erbe e una goccia di luce rubino: «Portala al re. Ma ascolta bene: la paura è un veleno più lento della malattia».
Poi aggiunse, come un dono che resta:
«La conoscenza non è un coltello. È una candela».`,
    didascalia: "Il dono della coppa"
  },
  {
    img: "img/shahmaran_9.png",
    testo: `Il re bevve, e all’alba la febbre cadde.
Il respiro tornò pieno, il volto riprese colore.
La corte esultò… ma Cemşab chiese una sola cosa: che nessuno cercasse più Şahmaran.
E il re, scegliendo la saggezza, firmò un decreto: nessuna caccia, nessuna trappola, nessun nome urlato per le strade.`,
    didascalia: "La guarigione e il decreto"
  },
  {
    img: "img/shahmaran_10.png",
    testo: `Cemşab tornò nel giardino sotterraneo a ringraziare.
Şahmaran sorrise appena: non per orgoglio, ma per sollievo.
Da allora Cemşab curò chiunque bussasse alla sua porta, e la Regina dei Serpenti restò custode sotto la pietra: non per vendetta, ma per protezione.

E quando la notte torna a stringere il cuore,
non cercare una lama: cerca una luce.
La candela resta accesa. Il resto… si dissolve.
E il silenzio, finalmente, guarisce.`,
    didascalia: "Finale: la candela"
  }
];
const STORIA_SHAHMARAN_DATA = [
  { type: "titolo", testo: "Şahmaran, la Regina che guarisce" },

  ...CONTENUTI_SHAHMARAN.flatMap((s, idx) => {
    const blocks = [];

    // testo prima (paragrafi veri)
String(s.testo)
  .split(/\n\s*\n/)
  .map(p => p.replace(/\n/g, " ").trim())
  .filter(Boolean)
  .forEach(paragrafo => {
    blocks.push({ type: "testo", paragrafo });
  });

// immagine dopo
blocks.push({
  type: "immagine",
  src: s.img,
  alt: s.didascalia || `Şahmaran ${idx + 1}`
});

// didascalia dopo l'immagine
if (s.didascalia) {
  blocks.push({ type: "didascalia", testo: s.didascalia });
}
    return blocks;
  })
];

window.STORIA_SHAHMARAN_DATA = STORIA_SHAHMARAN_DATA;
