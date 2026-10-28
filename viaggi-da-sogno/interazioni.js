/* Viaggi da Sogno: selezione simboli, scorrimento, lettura e priorità audio. */
(()=>{
 'use strict';
 const comandi=[...document.querySelectorAll('[data-simbolo]')];
 const pannelli=[...document.querySelectorAll('.pannello')];
 if(!comandi.length||!pannelli.length)return;
 const movimentoRidotto=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function apri(nome,scorri=false){
   const scelto=document.getElementById('simbolo-'+nome);
   if(!scelto)return;
   pannelli.forEach(p=>p.classList.toggle('aperto',p===scelto));
   comandi.forEach(c=>{
     const attivo=c.dataset.simbolo===nome;
     c.classList.toggle('attivo',attivo);
     c.setAttribute('aria-pressed',String(attivo));
   });
   if(scorri){
     scelto.setAttribute('tabindex','-1');
     // Apre il pannello prima di calcolare la nuova posizione.
     requestAnimationFrame(()=>{
       scelto.scrollIntoView({behavior:movimentoRidotto()?'auto':'smooth',block:'start'});
       try{scelto.focus({preventScroll:true});}catch(e){}
     });
   }
 }
 comandi.forEach(c=>c.addEventListener('click',()=>apri(c.dataset.simbolo,true)));
 const predefinito=pannelli.find(p=>p.classList.contains('aperto'))||pannelli[0];
 if(predefinito)apri(predefinito.id.replace(/^simbolo-/,''),false);

 // Controlli di lettura unificati. Se parte la voce, la musica si mette in pausa.
 const testo=document.querySelector('.contenuto');
 if(!testo||!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window))return;
 const lettore=document.createElement('section');
 lettore.className='lettura-onirica';
 lettore.setAttribute('aria-label','Lettura vocale della tavola');
 lettore.innerHTML='<h2>🔊 Ascolta il racconto del sogno</h2><div class="comandi-voce"><button type="button" data-voce="start">▶ Ascolta</button><button type="button" data-voce="pausa" disabled>⏸ Pausa</button><button type="button" data-voce="stop" disabled>■ Ferma</button></div><p class="nota-voce" aria-live="polite">La lettura usa la voce italiana disponibile nel browser. Durante la lettura la musica si interrompe.</p>';
 testo.parentNode.insertBefore(lettore,testo);
 const start=lettore.querySelector('[data-voce="start"]');
 const pausa=lettore.querySelector('[data-voce="pausa"]');
 const stop=lettore.querySelector('[data-voce="stop"]');
 const messaggio=lettore.querySelector('.nota-voce');
 const sintesi=window.speechSynthesis;
 const segmenti=[...testo.querySelectorAll('h2,h3,p')].map(x=>x.textContent.trim()).filter(Boolean);
 let indice=0,letturaAttiva=false,terminata=false;
 const musica=()=>[...document.querySelectorAll('audio')];
 function interrompiMusica(){musica().forEach(a=>{if(!a.paused)a.pause()})}
 function aggiorna(pausaAttiva=false){
   start.disabled=letturaAttiva&&!pausaAttiva;
   pausa.disabled=!letturaAttiva;
   stop.disabled=!letturaAttiva;
   pausa.textContent=pausaAttiva?'▶ Riprendi':'⏸ Pausa';
 }
 function termina(){
   letturaAttiva=false;terminata=true;indice=0;aggiorna();
   messaggio.textContent='Lettura terminata. La musica resta in pausa; puoi riavviarla dal lettore.';
 }
 function prosegui(){
   if(!letturaAttiva)return;
   if(indice>=segmenti.length){termina();return}
   const frase=new SpeechSynthesisUtterance(segmenti[indice++]);
   frase.lang='it-IT';frase.rate=1;
   frase.onend=()=>{if(letturaAttiva)prosegui()};
   frase.onerror=(e)=>{if(e.error!=='interrupted'&&e.error!=='canceled'){letturaAttiva=false;aggiorna();messaggio.textContent='Lettura non disponibile in questo momento.'}};
   sintesi.speak(frase);
 }
 start.addEventListener('click',()=>{
   sintesi.cancel();interrompiMusica();
   indice=0;terminata=false;letturaAttiva=true;aggiorna();
   messaggio.textContent='Lettura in corso: la musica è stata messa in pausa.';
   prosegui();
 });
 pausa.addEventListener('click',()=>{
   if(!letturaAttiva)return;
   if(sintesi.paused){sintesi.resume();aggiorna(false);messaggio.textContent='Lettura ripresa.'}
   else{sintesi.pause();aggiorna(true);messaggio.textContent='Lettura in pausa.'}
 });
 stop.addEventListener('click',()=>{
   letturaAttiva=false;sintesi.cancel();indice=0;aggiorna();
   messaggio.textContent='Lettura interrotta.';
 });
 musica().forEach(audio=>audio.addEventListener('play',()=>{
   if(letturaAttiva)audio.pause();
 }));
 window.addEventListener('pagehide',()=>{if(letturaAttiva)sintesi.cancel()});
})();
