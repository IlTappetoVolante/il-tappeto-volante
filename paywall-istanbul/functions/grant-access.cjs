"use strict";
/**
 * Grant or revoke a reader's right only AFTER checking an actual PayPal.Me
 * contribution in the author's PayPal account. No public admin endpoint.
 * Usage: node grant-access.cjs <email> week|lifetime|revoke [--execute]
 * Default is DRY RUN; requires trusted machine and Firebase Admin ADC.
 */
const crypto=require("node:crypto");
const admin=require("firebase-admin");
if(!admin.apps.length)admin.initializeApp({credential:admin.credential.applicationDefault(),projectId:"regia-tappeto-volante"});
const db=admin.firestore();
const email=String(process.argv[2]||"").trim().toLowerCase();
const plan=String(process.argv[3]||"");
const execute=process.argv.includes("--execute");
const valid=/^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email)&&["week","lifetime","revoke"].includes(plan);
if(!valid){console.error("Usage: node grant-access.cjs <email> week|lifetime|revoke [--execute]");process.exit(2);}
(async()=>{
 const now=Date.now();
 const hash=crypto.createHash("sha256").update(email).digest("hex");
 const uid="istanbul_reader_"+hash.slice(0,36);
 const expires=plan==="week"?now+604800000:null;
 console.log(JSON.stringify({operation:plan,email,uid,expires:expires?new Date(expires).toISOString():null,execute},null,2));
 if(!execute){console.log("DRY RUN: nessun lettore abilitato. Aggiungi --execute solo dopo la verifica effettiva del contributo.");return;}
 const ref=db.collection("istanbul_readers").doc(hash);
 const index=db.collection("istanbul_reader_uids").doc(uid);
 const batch=db.batch();
 if(plan==="revoke"){
   batch.set(ref,{email,plan:"revoked",disabled:true,expiresAtMs:0,updatedAt:admin.firestore.FieldValue.serverTimestamp()},{merge:true});
 }else{
   batch.set(ref,{email,plan,disabled:false,expiresAtMs:expires,updatedAt:admin.firestore.FieldValue.serverTimestamp()},{merge:true});
   batch.set(index,{emailHash:hash,updatedAt:admin.firestore.FieldValue.serverTimestamp()});
 }
 await batch.commit();
 console.log(plan==="revoke"?"Accesso revocato":"Accesso attivato. Il lettore può richiedere il suo codice OTP via email.");
})().catch(e=>{console.error(e);process.exitCode=1;});
