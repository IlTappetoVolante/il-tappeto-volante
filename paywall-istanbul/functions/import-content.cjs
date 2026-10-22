"use strict";
/*
  ESEGUI SOLO DA UN COMPUTER AFFIDABILE CON GOOGLE APPLICATION DEFAULT CREDENTIALS.
  Non includere credenziali, chiavi, o pagine integrali protette nel repository.
  Usage: node import-content.cjs /percorso/istanbul-caos-affascinante --execute
*/
const fs=require("fs");
const path=require("path");
const admin=require("firebase-admin");
const folder=process.argv[2];
const execute=process.argv.includes("--execute");
if(!folder||!fs.existsSync(folder))throw Error("Fornire la cartella locale con index.html, en.html ed es.html");
admin.initializeApp({credential:admin.credential.applicationDefault(),projectId:"regia-tappeto-volante"});
const db=admin.firestore();
const LANGS={it:"index.html",en:"en.html",es:"es.html"};
(async()=>{
 for(const [lang,name] of Object.entries(LANGS)){
  const text=fs.readFileSync(path.join(folder,name),"utf8");
  const match=text.match(/<article id="racconto">([\s\S]*?)<\/article>/i);
  if(!match)throw Error("Articolo completo non trovato in "+name);
  const html='<article id="racconto">'+match[1]+'</article>';
  if(Buffer.byteLength(html,"utf8")>900000)throw Error("Contenuto troppo grande per un documento Firestore");
  console.log(lang,name,Buffer.byteLength(html,"utf8"),"byte");
  if(execute)await db.collection("istanbul_private_content").doc(lang).set({html,lang,updatedAt:admin.firestore.FieldValue.serverTimestamp()});
 }
 console.log(execute?"Contenuti copiati sul deposito privato Firebase":"SIMULAZIONE: aggiungi --execute per salvare realmente");
})().catch(e=>{console.error(e);process.exitCode=1});
