// REGIA_IMMAGINI_CONTESTUALI_V1_20261022
// Separato dalla redattrice: nessuna generazione senza click e nessuna pubblicazione automatica.
import {getGenerativeModel,ResponseModality,ImageConfigAspectRatio} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-ai.js';
import {getToken} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app-check.js';

window.addEventListener('load',()=>{
  const g=id=>document.getElementById('img-'+id);
  const bridge=window.RegiaImageBridge;
  if(!bridge){console.error('Regia Image: bridge Firebase assente');return;}
  const st={busy:false,seq:0,topic:'',file:null,refUrl:null,generated:null,mime:null,generatedReference:false};
  const report=(kind,msg)=>{const box=g('status');box.className='status-banner '+kind;box.textContent=msg;};
  const context=()=>bridge.getContext();
  function refresh(){
    const ctx=context(),key=ctx?.key||'';
    g('topic').textContent=ctx?'Argomento: '+ctx.titolo+' · '+ctx.urlFonte:'Seleziona una landing e un argomento.';
    g('create').disabled=st.busy||!ctx||!bridge.ready();
    g('existing').hidden=!ctx?.imgUrl;
    if(ctx?.imgUrl){g('existing-image').src=ctx.imgUrl;g('existing-desc').textContent=ctx.imgAlt||ctx.titolo||'';}
    if(key!==st.topic){
      st.topic=key;st.seq++;st.generated=null;st.mime=null;st.generatedReference=false;g('result-box').hidden=true;
      report('info',ctx?'Puoi usare l’immagine della pagina o crearne una nuova.':'In attesa di una pagina letta.');
    }
  }
  function showReference(){g('reference-area').hidden=g('mode').value!=='reference';}
  function clearRef(){if(st.refUrl){URL.revokeObjectURL(st.refUrl);st.refUrl=null;}}
  function readFile(f){return new Promise((resolve,reject)=>{
    const reader=new FileReader();reader.onerror=()=>reject(Error('Immagine esempio non leggibile.'));
    reader.onload=()=>{const b64=String(reader.result||'').split(',')[1];if(!b64)reject(Error('File immagine vuoto.'));else resolve({type:'inlineData',inlineData:{mimeType:f.type,data:b64}});};
    reader.readAsDataURL(f);
  });}
  function chosenFile(){
    clearRef();st.file=null;st.generatedReference=false;g('ref-preview').hidden=true;
    const f=g('reference').files?.[0];if(!f)return;
    if(!['image/jpeg','image/png','image/webp'].includes(f.type)||!f.size||f.size>12*1024*1024){report('err','Seleziona JPEG, PNG o WebP fino a 12 MB.');return;}
    st.file=f;st.refUrl=URL.createObjectURL(f);g('ref-image').src=st.refUrl;
    g('ref-info').textContent=f.name+' · '+(f.size/1048576).toFixed(2)+' MB';g('ref-preview').hidden=false;
    report('info','Immagine esempio pronta. Nessun invio a Gemini fino al clic su «Genera».');
  }
  async function generate(){
    if(st.busy)return;
    const ctx=context();if(!ctx){report('err','Analizza una landing e seleziona un post.');return;}
    if(!bridge.ready()){report('err','Accedi alla Regia con Firebase prima di generare.');return;}
    const withExample=g('mode').value==='reference';
    if(withExample&&!st.file&&!(st.generatedReference&&st.generated)){report('err','Carica una foto esempio prima di procedere.');return;}
    if(!confirm('La generazione Nano Banana può comportare costi sul piano Firebase Blaze. Vuoi creare questa immagine?'))return;
    const seq=++st.seq,topic=ctx.key,ratio=g('ratio').value;st.busy=true;refresh();
    report('info','🎨 Gemini sta generando l’immagine…');
    try{
      await getToken(bridge.getCheck());
      if(!bridge.ready())throw Error('Sessione Firebase non attiva.');
      const ratios={'9:16':ImageConfigAspectRatio.PORTRAIT_9x16,'4:5':ImageConfigAspectRatio.PORTRAIT_4x5,'1:1':ImageConfigAspectRatio.SQUARE_1x1,'16:9':ImageConfigAspectRatio.LANDSCAPE_16x9,'4:3':ImageConfigAspectRatio.LANDSCAPE_4x3};
      const model=getGenerativeModel(bridge.getAi(),{model:g('model').value,generationConfig:{responseModalities:[ResponseModality.IMAGE],imageConfig:{aspectRatio:ratios[ratio]}}});
      let prompt='Create ONE original high-quality editorial image for a '+g('purpose').value+' on '+g('social').value+', aspect ratio '+ratio+', art direction '+g('style').value+'. '+
        'Use the following verified webpage data only for creative context: '+ctx.titolo+'; '+String(ctx.estratto||'').replace(/\s+/g,' ').slice(0,1800)+'. '+
        'Author instructions: '+g('instructions').value.trim().slice(0,850)+'. '+
        'No labels, watermarks, text, logos or signatures; these will be added by the publisher. Avoid invented historical facts or misleading documentary photography. Image output only.';
      let input=prompt;
      if(withExample){
        prompt+=' Use the reference image to preserve mainly '+g('preserve').value+', reinterpreted for this post.';
        const part=st.generatedReference&&st.generated?{type:'inlineData',inlineData:{data:st.generated,mimeType:st.mime}}:await readFile(st.file);
        input=[prompt,part];
      }
      const reply=await model.generateContent(input);
      const output=reply.response.inlineDataParts()?.find(x=>x.inlineData?.data&&/^image\//.test(x.inlineData.mimeType||''))?.inlineData;
      if(!output)throw Error('Il modello non ha restituito un’immagine. Controlla piano Blaze e quote.');
      if(seq!==st.seq||context()?.key!==topic){report('info','Post cambiato durante la generazione: risultato non associato.');return;}
      st.generated=output.data;st.mime=output.mimeType;
      g('result-image').src='data:'+output.mimeType+';base64,'+output.data;
      g('result-info').textContent='Generata per «'+ctx.titolo+'» · '+ratio+'. Non pubblicata automaticamente.';
      g('result-box').hidden=false;report('ok','✅ Immagine pronta. Puoi scaricarla o creare una variante.');
    }catch(e){if(seq===st.seq){console.error('Regia Image:',e);report('err','❌ Generazione non riuscita: '+String(e.message||e));}}
    finally{st.busy=false;refresh();}
  }
  g('mode').addEventListener('change',showReference);
  g('reference').addEventListener('change',chosenFile);
  g('create').addEventListener('click',generate);
  g('existing-copy').addEventListener('click',async()=>{
    const url=context()?.imgUrl;if(!url)return;
    try{await navigator.clipboard.writeText(url);report('ok','📋 URL immagine esistente copiato. Mantieni i crediti.');}
    catch{report('err','Copia non riuscita. Usa il link presente nella scheda editoriale.');}
  });
  g('download').addEventListener('click',()=>{
    if(!st.generated)return;
    const ext=st.mime==='image/jpeg'?'jpg':st.mime==='image/webp'?'webp':'png';
    const a=document.createElement('a');a.href='data:'+st.mime+';base64,'+st.generated;
    a.download='regia-post-'+Date.now()+'.'+ext;document.body.append(a);a.click();a.remove();
    report('ok','Download richiesto. La Regia non ha pubblicato l’immagine.');
  });
  g('variation').addEventListener('click',()=>{
    if(!st.generated)return;
    clearRef();st.file=null;st.generatedReference=true;g('reference').value='';
    g('mode').value='reference';showReference();
    g('ref-image').src=g('result-image').src;g('ref-info').textContent='Ultima immagine generata';g('ref-preview').hidden=false;
    report('info','🔁 Risultato usato come esempio. Aggiungi istruzioni per una variante.');
  });
  window.addEventListener('pagehide',clearRef);
  window.RegiaImageMaker={refresh};
  showReference();refresh();
});
