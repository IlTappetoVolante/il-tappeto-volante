/* Menu condiviso per tutte le landing. Modificare le voci in js/landing-catalog.js. */
(function () {
  "use strict";
  const own=document.currentScript, data=window.ITVLandingCatalog;
  if(!own || !data) return;
  const root=new URL("../",own.src);
  const l=(document.documentElement.lang||"it").slice(0,2).toLowerCase();
  const lang=["it","en","es"].includes(l)?l:"it";
  const labels={
    it:["Il viaggio continua…","Ogni storia apre la porta a un’altra.","Scegli la prossima storia","Seleziona una storia","Sali sul Tappeto","Torna all’ingresso del Tappeto Volante"],
    en:["The journey continues…","Every story opens the door to another.","Choose your next story","Select a story","Continue the journey","Back to Il Tappeto Volante"],
    es:["El viaje continúa…","Cada historia abre la puerta a otra.","Elige tu próxima historia","Selecciona una historia","Continuar el viaje","Volver a Il Tappeto Volante"]
  }[lang];
  const text=(v)=>v[lang]||v.it||v.en||v.es||"";
  const canonical=(u)=>new URL(u,root).pathname.replace(/index\.html$/i,"");
  function init(){
    if(document.querySelector(".itv-story-menu"))return;
    const style=document.createElement("style");
    style.id="itv-story-menu-style";
    style.textContent=[
      '.itv-story-menu{box-sizing:border-box!important;clear:both;position:relative;isolation:isolate;width:min(860px,calc(100% - 24px));margin:45px auto 35px!important;padding:clamp(22px,5vw,38px)!important;border:2px solid #d6ae65!important;border-radius:18px!important;background:linear-gradient(160deg,#142b39,#081b27 70%,#0a1523)!important;box-shadow:0 16px 42px #0005!important;color:#f5e8cc!important;font:400 15px/1.65 Merriweather,Georgia,serif!important;text-align:center!important}',
      '.itv-story-menu *{box-sizing:border-box!important}',
      '.itv-story-menu h2{margin:0 0 9px!important;padding:0!important;color:#f2ca80!important;font:700 clamp(2.2rem,6vw,3.3rem)/1.15 "Dancing Script",cursive!important;text-align:center!important}',
      '.itv-story-menu p{color:#f5e8cc!important;margin:0 auto 22px!important;font:400 15px/1.6 Merriweather,Georgia,serif!important;text-align:center!important}',
      '.itv-story-menu label{display:block;color:#f2ca80!important;margin:0 0 9px!important;font:700 14px/1.4 Merriweather,Georgia,serif!important}',
      '.itv-story-menu .itv-story-controls{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:stretch}',
      '.itv-story-menu select{max-width:540px;width:100%;flex:1 1 265px;min-width:0;min-height:48px;padding:10px 14px;border:1px solid #d2af70;border-radius:10px;background:#fff9ed;color:#2d261e;font:400 16px/1.5 Merriweather,Georgia,serif;cursor:pointer}',
      '.itv-story-menu button{min-height:48px;padding:11px 20px;border:1px solid #f5d292;border-radius:999px;background:linear-gradient(135deg,#f4db9d,#c99543);color:#25170c;font:700 15px/1.35 Merriweather,Georgia,serif;cursor:pointer}',
      '.itv-story-menu button:disabled{opacity:.55;cursor:not-allowed}',
      '.itv-story-menu :is(select,button,a):focus-visible{outline:3px solid #fff7c9!important;outline-offset:3px!important}',
      '.itv-story-menu .itv-story-home{display:inline-block;margin-top:18px!important;color:#f7dfa1!important;text-decoration:underline!important;text-underline-offset:4px!important;font:400 13px/1.6 Merriweather,Georgia,serif!important}',
      '@media(max-width:540px){.itv-story-menu{width:calc(100% - 18px);margin:36px auto 26px!important;padding:23px 14px!important}.itv-story-menu button{width:100%}}'
    ].join("");
    document.head.appendChild(style);
    const section=document.createElement("section");section.className="itv-story-menu";section.setAttribute("aria-labelledby","itv-next-title");
    const heading=document.createElement("h2");heading.id="itv-next-title";heading.textContent=labels[0];
    const intro=document.createElement("p");intro.textContent=labels[1];
    const label=document.createElement("label");label.htmlFor="itv-next-story";label.textContent=labels[2];
    const select=document.createElement("select");select.id="itv-next-story";
    const blank=document.createElement("option");blank.value="";blank.textContent=labels[3];select.append(blank);
    let count=0;
    for(const group of data.groups){
      const optgroup=document.createElement("optgroup");optgroup.label=text(group.label);
      for(const story of data.stories.filter(s=>s.group===group.id)){
        const variants=story.urls;
        const targetLang=variants[lang]?lang:(variants.it?"it":(variants.en?"en":"es"));
        const dest=variants[targetLang];if(!dest||canonical(dest)===location.pathname.replace(/index\.html$/i,""))continue;
        const option=document.createElement("option");option.value=new URL(dest,root).href;
        option.textContent=text(story.title)+(targetLang===lang?"":" · "+targetLang.toUpperCase());optgroup.append(option);count++;
      }
      if(optgroup.children.length)select.append(optgroup);
    }
    if(!count)return;
    const btn=document.createElement("button");btn.type="button";btn.textContent=labels[4];btn.disabled=true;
    select.addEventListener("change",()=>{btn.disabled=!select.value;});
    btn.addEventListener("click",()=>{if(select.value)location.assign(select.value);});
    const controls=document.createElement("div");controls.className="itv-story-controls";controls.append(select,btn);
    const home=document.createElement("a");home.className="itv-story-home";home.href=root.href;home.textContent=labels[5];
    section.append(heading,intro,label,controls,home);
    const footer=Array.from(document.querySelectorAll("footer")).pop(),main=document.querySelector("main");
    if(footer)footer.insertAdjacentElement("beforebegin",section);
    else if(main){const credit=Array.from(main.querySelectorAll(".credito,.crediti,.firma-finale,.copyright")).pop();if(credit)credit.insertAdjacentElement("beforebegin",section);else main.append(section);}
    else document.body.append(section);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
