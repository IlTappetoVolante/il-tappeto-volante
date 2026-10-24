(()=>{
  const lang=document.documentElement.lang||'it';
  const all={
    it: {
      ingredients: [
        ['Pasta (linguine o spaghetti)','180 g','360 g'],
        ['Spinaci freschi','120 g','240 g'],
        ['Limone non trattato','1','2'],
        ['Parmigiano grattugiato','35 g','70 g'],
        ["Olio extravergine d'oliva",'2 cucchiai','4 cucchiai'],
        ['Aglio','1 spicchio','2 spicchi'],
        ['Sale e pepe','q.b.','q.b.']
      ],
      steps: [
        ['Cuoci la pasta','Porta a bollore acqua salata e cuoci la pasta. Conserva una tazza di acqua di cottura prima di scolarla.'],
        ['Appassisci gli spinaci','In padella scalda l’olio con l’aglio, aggiungi gli spinaci lavati e falli appassire per 2–3 minuti.'],
        ['Manteca a fuoco spento','Rimuovi l’aglio, versa la pasta in padella. Spegni il fuoco, aggiungi la scorza del limone, il parmigiano e poca acqua di cottura. Mescola fino a ottenere una salsa cremosa.'],
        ['Completa il piatto','Aggiungi poco succo di limone, assaggia e termina con pepe e scorza fresca. Servi subito.']
      ],
      count:(a,b)=>`${a} di ${b} ingredienti spuntati`,
      done:(a,b)=>`${a} di ${b} passaggi completati.`,
      complete:'🍋 Ricetta completata! Buon appetito.',
      mark:'Segna completato: ',unmark:'Segna da fare: ',
      story:"Il Tappeto Volante oggi atterra in una cucina affacciata sul Mediterraneo. Il limone ha origini asiatiche e, attraverso secoli di scambi e coltivazioni, ha trovato in Sicilia una terra d'elezione. Anche gli spinaci hanno viaggiato dall'Asia occidentale e sono attestati nella Sicilia medievale. La nostra pasta al limone e spinaci è una ricetta contemporanea ispirata alla cucina siciliana.",
      voice:'it-IT',visit:'Visite a questa pagina',
      counterPath:'/il-tappeto-volante/i-sapori-in-viaggio/episodio-1/'
    },
    en: {
      ingredients: [
        ['Pasta (linguine or spaghetti)','180 g','360 g'],
        ['Fresh spinach','120 g','240 g'],
        ['Unwaxed lemon','1','2'],
        ['Grated Parmesan','35 g','70 g'],
        ['Extra virgin olive oil','2 tbsp','4 tbsp'],
        ['Garlic','1 clove','2 cloves'],
        ['Salt and pepper','to taste','to taste']
      ],
      steps: [
        ['Cook the pasta','Bring salted water to a boil and cook the pasta. Save a cup of the cooking water before draining.'],
        ['Wilt the spinach','Warm the oil and garlic in a frying pan. Add the washed spinach and cook for 2–3 minutes, until wilted.'],
        ['Make a creamy sauce off the heat','Remove the garlic and add the pasta to the pan. Turn off the heat, then add lemon zest, Parmesan and a little pasta water. Toss until the sauce becomes creamy.'],
        ['Finish and serve','Add a little lemon juice, taste and finish with pepper and fresh zest. Serve immediately.']
      ],
      count:(a,b)=>`${a} of ${b} ingredients checked`,
      done:(a,b)=>`${a} of ${b} steps completed.`,
      complete:'🍋 Recipe complete! Enjoy your meal.',
      mark:'Mark complete: ',unmark:'Mark as not done: ',
      story:'Today the Flying Carpet lands in a kitchen overlooking the Mediterranean. The lemon originated in Asia and, through centuries of trade and cultivation, found a welcoming home in Sicily. Spinach also travelled from western Asia and has been documented in medieval Sicily. Our lemon and spinach pasta is a contemporary recipe inspired by Sicilian cooking.',
      voice:'en-GB',visit:'Visits to this page',
      counterPath:'/il-tappeto-volante/i-sapori-in-viaggio/episodio-1/en.html'
    },
    es: {
      ingredients: [
        ['Pasta (linguine o espaguetis)','180 g','360 g'],
        ['Espinacas frescas','120 g','240 g'],
        ['Limón sin tratar','1','2'],
        ['Parmesano rallado','35 g','70 g'],
        ['Aceite de oliva virgen extra','2 cucharadas','4 cucharadas'],
        ['Ajo','1 diente','2 dientes'],
        ['Sal y pimienta','al gusto','al gusto']
      ],
      steps: [
        ['Cuece la pasta','Hierve agua con sal y cuece la pasta. Reserva una taza del agua de cocción antes de escurrirla.'],
        ['Saltea las espinacas','Calienta el aceite con el ajo en una sartén. Añade las espinacas lavadas y deja que se ablanden durante 2–3 minutos.'],
        ['Prepara la salsa fuera del fuego','Retira el ajo e incorpora la pasta a la sartén. Apaga el fuego, añade la ralladura de limón, el parmesano y un poco de agua de cocción. Remueve hasta obtener una salsa cremosa.'],
        ['Termina y sirve','Añade unas gotas de zumo de limón, prueba y termina con pimienta y ralladura fresca. Sirve de inmediato.']
      ],
      count:(a,b)=>`${a} de ${b} ingredientes marcados`,
      done:(a,b)=>`${a} de ${b} pasos completados.`,
      complete:'🍋 ¡Receta terminada! ¡Buen provecho!',
      mark:'Marcar como completado: ',unmark:'Marcar como pendiente: ',
      story:'Hoy la Alfombra Voladora aterriza en una cocina con vistas al Mediterráneo. El limón tiene su origen en Asia y, a través de siglos de intercambios y cultivos, encontró en Sicilia una tierra acogedora. Las espinacas también viajaron desde Asia occidental y su presencia está documentada en la Sicilia medieval. Nuestra pasta con limón y espinacas es una receta contemporánea inspirada en la cocina siciliana.',
      voice:'es-ES',visit:'Visitas a esta página',
      counterPath:'/il-tappeto-volante/i-sapori-in-viaggio/episodio-1/es.html'
    }
  };
  const d=all[lang]||all.it;
  let people=2;
  const checked=new Set(),done=new Set();
  const list=document.getElementById('ingredients-list');
  const count=document.getElementById('ingredients-count');
  const bar=document.getElementById('ingredients-progress');
  function renderIngredients(){
    list.textContent='';
    d.ingredients.forEach((it,i)=>{
      const li=document.createElement('li'); li.className=checked.has(i)?'checked':'';
      const label=document.createElement('label');
      const input=document.createElement('input'); input.type='checkbox';input.checked=checked.has(i);
      input.addEventListener('change',()=>{input.checked?checked.add(i):checked.delete(i);renderIngredients()});
      const span=document.createElement('span');span.textContent=it[0];label.append(input,span);
      const amount=document.createElement('span');amount.className='amount';amount.textContent=it[people===2?1:2];
      li.append(label,amount);list.append(li);
    });
    count.textContent=d.count(checked.size,d.ingredients.length);
    bar.style.width=`${checked.size/d.ingredients.length*100}%`;
    for(const n of [2,4]){
      const b=document.getElementById('for-'+(n===2?'two':'four'));
      b.classList.toggle('active',people===n);
      b.setAttribute('aria-pressed',String(people===n));
    }
  }
  document.getElementById('for-two').onclick=()=>{people=2;renderIngredients()};
  document.getElementById('for-four').onclick=()=>{people=4;renderIngredients()};
  document.getElementById('reset-ingredients').onclick=()=>{checked.clear();renderIngredients()};
  renderIngredients();
  const stepBox=document.getElementById('recipe-steps');
  function renderSteps(){
    stepBox.textContent='';
    d.steps.forEach((step,i)=>{
      const div=document.createElement('div');div.className='step'+(done.has(i)?' done':'');
      const btn=document.createElement('button');btn.type='button';btn.textContent=done.has(i)?'✓':String(i+1);
      btn.setAttribute('aria-label',(done.has(i)?d.unmark:d.mark)+step[0]);
      btn.onclick=()=>{done.has(i)?done.delete(i):done.add(i);renderSteps()};
      const desc=document.createElement('div');const h=document.createElement('h3');h.textContent=step[0];
      const p=document.createElement('p');p.textContent=step[1];desc.append(h,p);div.append(btn,desc);stepBox.append(div);
    });
    document.getElementById('steps-feedback').textContent=done.size===d.steps.length?d.complete:d.done(done.size,d.steps.length);
  }
  renderSteps();
  const read=document.getElementById('read-story'), stop=document.getElementById('stop-story');
  if(!('speechSynthesis' in window)){read.hidden=true;stop.hidden=true}
  else {
    read.onclick=()=>{
      speechSynthesis.cancel();
      const msg=new SpeechSynthesisUtterance(d.story);msg.lang=d.voice;msg.rate=.91;
      speechSynthesis.speak(msg);
    };
    stop.onclick=()=>speechSynthesis.cancel();
    window.addEventListener('pagehide',()=>speechSynthesis.cancel());
  }
  // Same visible GoatCounter widget and styles already used in Il Tappeto Volante.
  const style='div{width:220px;min-height:62px;box-sizing:border-box;padding:7px;border:1px solid #c9a44c;border-radius:8px;background:#070713;color:#e2bd62;font-family:Georgia,serif;text-align:center}#gcvc-for{font-size:0}#gcvc-for::after{content:"'+d.visit+'";font-size:13px;color:#e2bd62}#gcvc-views{font-size:22px;line-height:26px;font-weight:bold;color:#f4cf70}';
  const showCounter=()=>{
    if(window.goatcounter&&typeof window.goatcounter.visit_count==='function'){
      window.goatcounter.visit_count({append:'#contatore-visite',path:d.counterPath,no_branding:true,style});
    }
  };
  const loader=document.createElement('script');loader.src='https://gc.zgo.at/count.js';loader.async=true;
  loader.dataset.goatcounter='https://iltappetovolante.goatcounter.com/count';
  loader.addEventListener('load',showCounter);
  document.body.appendChild(loader);
})();
