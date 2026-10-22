"use strict";
/**
 * Istanbul OTP access -- staging only. No PayPal and no automatic charge.
 * Grant entitlements MANUALLY after confirming PayPal.Me in the merchant account.
 * Only trusted backend reads the full story from private Firestore.
 */
const {onRequest}=require("firebase-functions/v2/https");
const {defineSecret}=require("firebase-functions/params");
const crypto=require("node:crypto");
const nodemailer=require("nodemailer");
const admin=require("firebase-admin");
if(!admin.apps.length)admin.initializeApp();
const db=admin.firestore();
const GMAIL_PASS=defineSecret("ISTANBUL_GMAIL_APP_PASSWORD");
const OTP_SECRET=defineSecret("ISTANBUL_OTP_HMAC_KEY");
const ORIGIN="https://iltappetovolante.github.io";
const WEEK=604800000;
const ENABLED=process.env.ISTANBUL_OTP_ACTIVE==="yes";
const GMAIL_SENDER=String(process.env.ISTANBUL_GMAIL_SENDER||"").trim().toLowerCase();
const EMAIL_RX=/^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const normalizeEmail=x=>String(x||"").trim().toLowerCase();
const idForEmail=email=>crypto.createHash("sha256").update(email).digest("hex");
const codeHash=(id,code)=>crypto.createHmac("sha256",OTP_SECRET.value()).update(id+":"+code).digest("hex");
const readerUid=id=>"istanbul_reader_"+id.slice(0,36);
function err(message,status=400){const e=new Error(message);e.httpStatus=status;throw e;}
function respond(res,status,obj){res.status(status).json(obj);}
const neutral={message:"Se questo indirizzo dispone di un accesso attivo, riceverai un codice via email."};
function validGrant(grant){
  if(!grant||grant.disabled===true)return false;
  if(grant.plan==="lifetime")return true;
  return grant.plan==="week"&&Number(grant.expiresAtMs)>Date.now();
}
async function privateContentReady(){
  const all=await Promise.all(["it","en","es"].map(lang=>db.collection("istanbul_private_content").doc(lang).get()));
  return all.every(d=>d.exists&&typeof d.data()?.html==="string"&&d.data().html.length>500);
}
async function emailCode(to,code){
  if(!EMAIL_RX.test(GMAIL_SENDER)||!GMAIL_PASS.value())err("Invio email non configurato",503);
  // Test only: Gmail SMTP with a dedicated Google App Password kept in Firebase Secret Manager.
  // Never put the real Gmail password or the App Password in GitHub or the browser.
  const transport=nodemailer.createTransport({
    host:"smtp.gmail.com",port:465,secure:true,
    auth:{user:GMAIL_SENDER,pass:GMAIL_PASS.value()},
    connectionTimeout:12000,greetingTimeout:12000,socketTimeout:20000
  });
  await transport.sendMail({
    from:{name:"Il Tappeto Volante",address:GMAIL_SENDER},
    to,subject:"Il Tappeto Volante · Il tuo codice di accesso",
    text:"Il Tappeto Volante — Istanbul · Il Caos Affascinante\n\n"+
         "Il tuo codice di accesso personale è: "+code+"\n\n"+
         "È valido per 10 minuti e può essere utilizzato una volta sola.\n"+
         "Se non hai richiesto questo codice, ignora il messaggio.\n"+
         "Non inviare mai questo codice ad altre persone.\n"
  });
}
async function rateIpAndEmail(email,id,code){
  const now=Date.now(),ip=String(email.ip||"").slice(0,80); // email holds {address,ip}; no raw IP persisted.
  const ipKey=crypto.createHmac("sha256",OTP_SECRET.value()).update("ip:"+ip).digest("hex");
  const ipRef=db.collection("istanbul_otp_limits").doc(ipKey);
  const codeRef=db.collection("istanbul_otp_requests").doc(id);
  await db.runTransaction(async tx=>{
    const [ipSnap,reqSnap]=await Promise.all([tx.get(ipRef),tx.get(codeRef)]);
    const ipData=ipSnap.data()||{},old=reqSnap.data()||{};
    const ipStart=Number(ipData.windowStartMs)||0,ipNew=now-ipStart>3600000;
    const ipCount=ipNew?0:Number(ipData.count||0);
    if(ipCount>=24)err("Troppe richieste da questa rete. Riprovare più tardi.",429);
    const windowStart=Number(old.windowStartMs)||0,fresh=now-windowStart>3600000;
    const count=fresh?0:Number(old.count||0);
    // Every eligible address can receive up to five messages per hour, at least 90 sec apart.
    if(now<Number(old.nextRequestMs||0)||count>=5)err("Attendi prima di richiedere un nuovo codice.",429);
    tx.set(ipRef,{windowStartMs:ipNew?now:ipStart,count:ipCount+1}, {merge:true});
    tx.set(codeRef,{hash:codeHash(id,code),expiresAtMs:now+600000,
      attempts:0,windowStartMs:fresh?now:windowStart,count:count+1,nextRequestMs:now+90000}, {merge:true});
  });
}
async function requestCode(req,res){
  const email=normalizeEmail(req.body?.email);
  if(!EMAIL_RX.test(email)){respond(res,200,neutral);return;}
  const id=idForEmail(email);
  const grant=await db.collection("istanbul_readers").doc(id).get();
  if(!grant.exists||!validGrant(grant.data())){respond(res,200,neutral);return;}
  const code=String(crypto.randomInt(0,100000000)).padStart(8,"0");
  const network=req.ip||req.socket?.remoteAddress||"unknown";
  await rateIpAndEmail({ip:network},id,code);
  try{
    await emailCode(email,code);
  }catch(e){
    // Fail closed: invalidate an undelivered code without removing request throttles.
    const record=db.collection("istanbul_otp_requests").doc(id);
    await record.set({hash:null,expiresAtMs:0}, {merge:true});
    throw e;
  }
  respond(res,200,neutral);
}
async function verifyCode(req,res){
  const email=normalizeEmail(req.body?.email),code=String(req.body?.code||"").trim();
  if(!EMAIL_RX.test(email)||!/^\d{8}$/.test(code))err("Codice non valido oppure scaduto",401);
  const id=idForEmail(email);
  const grantRef=db.collection("istanbul_readers").doc(id),reqRef=db.collection("istanbul_otp_requests").doc(id);
  const now=Date.now(),expected=codeHash(id,code);
  const accepted=await db.runTransaction(async tx=>{
    const [grant,otp]=await Promise.all([tx.get(grantRef),tx.get(reqRef)]);
    const saved=otp.data()||{};
    if(!grant.exists||!validGrant(grant.data())||!saved.hash||saved.expiresAtMs<now||saved.attempts>=5)return false;
    // Constant-time comparison, and commit the failed attempt rather than rolling the transaction back.
    const hashOK=/^[a-f0-9]{64}$/.test(String(saved.hash));
    const equal=hashOK&&crypto.timingSafeEqual(Buffer.from(expected,"hex"),Buffer.from(saved.hash,"hex"));
    tx.update(reqRef,{attempts:admin.firestore.FieldValue.increment(1),...(equal?{hash:null,expiresAtMs:0,usedAtMs:now}:{})});
    return equal;
  });
  if(!accepted)err("Codice non valido oppure scaduto",401);
  const token=await admin.auth().createCustomToken(readerUid(id));
  respond(res,200,{customToken:token});
}
async function authenticatedReader(req){
  const m=/^Bearer (.+)$/.exec(req.get("authorization")||"");
  if(!m)err("Richiedi un nuovo codice di accesso.",401);
  const user=await admin.auth().verifyIdToken(m[1],true);
  const uid=String(user.uid||"");
  if(!/^istanbul_reader_[a-f0-9]{36}$/.test(uid))err("Identità non autorizzata",403);
  const id=uid.replace(/^istanbul_reader_/,"");
  // UID is a short hash prefix, so entitlement lookup uses a separate index.
  const ref=db.collection("istanbul_reader_uids").doc(uid);
  const link=await ref.get();
  if(!link.exists||!link.data()?.emailHash?.startsWith(id))err("Utente non autorizzato",403);
  const grant=await db.collection("istanbul_readers").doc(link.data().emailHash).get();
  if(!grant.exists||!validGrant(grant.data()))err("Accesso scaduto o non attivo",403);
  return grant.data();
}
exports.istanbulOtpAccess=onRequest({region:"europe-west1",maxInstances:3,memory:"256MiB",secrets:[GMAIL_PASS,OTP_SECRET]},async(req,res)=>{
  if(req.method==="OPTIONS"){
    if(req.get("origin")!==ORIGIN){res.status(403).end();return;}
    res.set("Access-Control-Allow-Origin",ORIGIN).set("Vary","Origin");
    res.set("Access-Control-Allow-Headers","Authorization,Content-Type");
    res.set("Access-Control-Allow-Methods","GET,POST,OPTIONS");
    res.status(204).end();return;
  }
  res.set("Cache-Control","no-store");
  if(req.get("origin")&&req.get("origin")!==ORIGIN){respond(res,403,{error:"Origine non autorizzata"});return;}
  res.set("Access-Control-Allow-Origin",ORIGIN).set("Vary","Origin");
  const path=req.path.replace(/^\/+|\/+$/g,"");
  try{
    if(path==="ready"&&req.method==="GET"){
      const ready=ENABLED&&EMAIL_RX.test(GMAIL_SENDER)&&await privateContentReady();
      respond(res,200,{ready});return;
    }
    if(!ENABLED)err("Accesso riservato non ancora attivo",503);
    if(path==="request-code"&&req.method==="POST"){await requestCode(req,res);return;}
    if(path==="verify-code"&&req.method==="POST"){
      await verifyCode(req,res);return;
    }
    if(path==="status"&&req.method==="GET"){
      const grant=await authenticatedReader(req);
      respond(res,200,{authorized:true,plan:grant.plan,expiresAtMs:grant.plan==="week"?grant.expiresAtMs:null});return;
    }
    if(path==="content"&&req.method==="GET"){
      await authenticatedReader(req);
      const lang=["it","en","es"].includes(req.query.lang)?req.query.lang:"it";
      const doc=await db.collection("istanbul_private_content").doc(lang).get();
      if(!doc.exists||typeof doc.data()?.html!=="string")err("Racconto temporaneamente non disponibile",503);
      respond(res,200,{html:doc.data().html});return;
    }
    err("Percorso non trovato",404);
  }catch(e){
    console.error("OTP access",path,e.message);
    respond(res,e.httpStatus||500,{error:e.httpStatus&&e.httpStatus<500?e.message:"Servizio temporaneamente non disponibile"});
  }
});
