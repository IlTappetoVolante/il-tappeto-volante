"use strict";
// Backend paywall Istanbul. PayPal orders NEVER created/captured or trusted from the browser.
// Deploy separately to Firebase Functions after installing PayPal secrets and testing Sandbox.
const {onRequest}=require("firebase-functions/v2/https");
const {defineSecret}=require("firebase-functions/params");
const admin=require("firebase-admin");
admin.initializeApp();
const db=admin.firestore();
const CLIENT_ID=defineSecret("ISTANBUL_PAYPAL_CLIENT_ID");
const CLIENT_SECRET=defineSecret("ISTANBUL_PAYPAL_CLIENT_SECRET");
const WEBHOOK_ID=defineSecret("ISTANBUL_PAYPAL_WEBHOOK_ID");
const MODE=process.env.ISTANBUL_PAYPAL_MODE==="live"?"live":"sandbox";
const PP=MODE==="live"?"https://api-m.paypal.com":"https://api-m.sandbox.paypal.com";
const ORIGIN="https://iltappetovolante.github.io";
const ARTICLE="istanbul-caos-affascinante";
const WEEK=7*24*3600*1000;
function fail(msg,status=400){const e=new Error(msg);e.httpStatus=status;throw e;}
function json(res,status,obj){res.status(status).json(obj);}
async function accessToken(){
  const id=CLIENT_ID.value(),secret=CLIENT_SECRET.value();
  if(!id||!secret)fail("PayPal non configurato",503);
  const auth=Buffer.from(id+":"+secret).toString("base64");
  const r=await fetch(PP+"/v1/oauth2/token",{method:"POST",headers:{Authorization:"Basic "+auth,"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=client_credentials"});
  if(!r.ok)fail("Autenticazione PayPal non disponibile",502);
  const j=await r.json();return j.access_token;
}
async function pp(method,url,body){
  const tok=await accessToken();
  const r=await fetch(PP+url,{method,headers:{"Authorization":"Bearer "+tok,"Content-Type":"application/json"},body:method==="GET"?undefined:JSON.stringify(body?.data||body||{})});
  const txt=await r.text();let j;try{j=JSON.parse(txt)}catch{j={}};
  if(!r.ok)fail("PayPal ha rifiutato la richiesta ("+r.status+")",502);
  return j;
}
async function user(req){
  const bearer=/^Bearer (.+)$/.exec(req.get("authorization")||"");
  if(!bearer)fail("Accedi prima di procedere.",401);
  const token=await admin.auth().verifyIdToken(bearer[1],true);
  if(!token.email_verified)fail("Verifica prima il tuo indirizzo email.",403);
  return token.uid;
}
function amountFor(body){
  const plan=body?.plan;
  if(plan==="week")return{plan,amount:300};
  if(plan==="lifetime"){
    const cents=Number(body.amountCents);
    if(!Number.isInteger(cents)||cents<500||cents>50000)fail("Offerta libera tra 5 € e 500 €");
    return{plan,amount:cents};
  }
  fail("Piano non valido");
}
async function entitlement(uid){
  const list=await db.collection("istanbul_captures").where("uid","==",uid).get();
  const now=Date.now();let weeklyUntil=0,lifetime=false;
  for(const d of list.docs){
    const c=d.data();
    if(c.status!=="active"||c.article!==ARTICLE)continue;
    if(c.plan==="lifetime")lifetime=true;
    if(c.plan==="week")weeklyUntil=Math.max(weeklyUntil,Number(c.capturedAtMs||0)+WEEK);
  }
  return{authorized:lifetime||weeklyUntil>now,lifetime,weeklyUntil:lifetime?null:(weeklyUntil||null),now};
}
async function handleCreate(req,res,uid){
  const p=amountFor(req.body);
  const value=(p.amount/100).toFixed(2);
  const order=await pp("POST","/v2/checkout/orders",{
    intent:"CAPTURE",
    purchase_units:[{
      reference_id:ARTICLE,
      custom_id:uid,
      description:p.plan==="week"?"Istanbul - accesso per 7 giorni":"Istanbul - accesso permanente",
      amount:{currency_code:"EUR",value}
    }],
    application_context:{shipping_preference:"NO_SHIPPING",user_action:"PAY_NOW"}
  });
  if(!order.id)fail("PayPal non ha restituito un ordine",502);
  await db.collection("istanbul_orders").doc(order.id).create({
    uid,article:ARTICLE,plan:p.plan,amountCents:p.amount,currency:"EUR",state:"created",
    createdAt:admin.firestore.FieldValue.serverTimestamp()
  });
  json(res,200,{id:order.id});
}
async function handleCapture(req,res,uid){
  const id=String(req.body?.orderId||"");
  if(!/^[A-Za-z0-9-]{8,40}$/.test(id))fail("Ordine non valido");
  const doc=db.collection("istanbul_orders").doc(id);
  const snap=await doc.get();
  if(!snap.exists||snap.data().uid!==uid||snap.data().article!==ARTICLE)fail("Ordine non autorizzato",403);
  const stored=snap.data();
  if(stored.state==="completed"){json(res,200,await entitlement(uid));return;}
  // Capture server-side. If PayPal says already captured, read the server-side order instead.
  let order;
  try{order=await pp("POST","/v2/checkout/orders/"+encodeURIComponent(id)+"/capture",{});}
  catch(e){order=await pp("GET","/v2/checkout/orders/"+encodeURIComponent(id));}
  const capture=order.purchase_units?.[0]?.payments?.captures?.find(c=>c.status==="COMPLETED");
  if(order.status!=="COMPLETED"||!capture)fail("Pagamento non ancora completato",409);
  if(capture.amount?.currency_code!=="EUR"||Number(capture.amount?.value)!==stored.amountCents/100)fail("Importo pagamento non corrispondente",409);
  if(order.id!==id)fail("Identificativo ordine non corrispondente",409);
  const captureRef=db.collection("istanbul_captures").doc(capture.id);
  await db.runTransaction(async tx=>{
    const [current,receipt]=await Promise.all([tx.get(doc),tx.get(captureRef)]);
    if(!current.exists||current.data().uid!==uid)fail("Ordine non più valido",403);
    if(receipt.exists&&receipt.data().uid!==uid)fail("Pagamento già assegnato a un altro account",409);
    if(!receipt.exists)tx.create(captureRef,{
      uid,orderId:id,article:ARTICLE,plan:stored.plan,amountCents:stored.amountCents,
      status:"active",capturedAtMs:Date.parse(capture.create_time||"")||Date.now(),
      createdAt:admin.firestore.FieldValue.serverTimestamp()
    });
    tx.update(doc,{state:"completed",captureId:capture.id,completedAt:admin.firestore.FieldValue.serverTimestamp()});
  });
  json(res,200,await entitlement(uid));
}
async function verifyWebhook(req){
  const tok=await accessToken();
  const headers={
    auth_algo:req.get("paypal-auth-algo"),
    cert_url:req.get("paypal-cert-url"),
    transmission_id:req.get("paypal-transmission-id"),
    transmission_sig:req.get("paypal-transmission-sig"),
    transmission_time:req.get("paypal-transmission-time")
  };
  if(Object.values(headers).some(x=>!x))fail("Intestazioni webhook mancanti",400);
  const r=await fetch(PP+"/v1/notifications/verify-webhook-signature",{
    method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+tok},
    body:JSON.stringify({...headers,webhook_id:WEBHOOK_ID.value(),webhook_event:req.body})
  });
  if(!r.ok)fail("Verifica webhook non disponibile",503);
  const j=await r.json();
  if(j.verification_status!=="SUCCESS")fail("Firma webhook non valida",403);
}
async function handleWebhook(req,res){
  await verifyWebhook(req);
  const event=req.body||{};
  const eventType=event.event_type;
  if(["PAYMENT.CAPTURE.REFUNDED","PAYMENT.CAPTURE.REVERSED"].includes(eventType)){
    // Refunds reference the original capture through supplementary_data.related_ids.capture_id.
    const capId=event.resource?.supplementary_data?.related_ids?.capture_id;
    if(capId){
      const ref=db.collection("istanbul_captures").doc(String(capId));
      const prev=await ref.get();
      if(prev.exists)await ref.update({status:"revoked",revokedAt:admin.firestore.FieldValue.serverTimestamp(),revokedReason:eventType});
    }
  }
  res.status(200).send("OK");
}
exports.istanbulPaywall=onRequest({
  region:"europe-west1",maxInstances:3,memory:"256MiB",
  secrets:[CLIENT_ID,CLIENT_SECRET,WEBHOOK_ID]
},async(req,res)=>{
  if(req.method==="OPTIONS"){
    if(req.get("origin")===ORIGIN){
      res.set("Access-Control-Allow-Origin",ORIGIN);
      res.set("Access-Control-Allow-Headers","Authorization, Content-Type");
      res.set("Access-Control-Allow-Methods","GET,POST,OPTIONS");
      res.set("Vary","Origin");res.status(204).end();
    }else res.status(403).end();
    return;
  }
  if(req.get("origin")&&req.get("origin")!==ORIGIN){res.status(403).json({error:"Origin non autorizzata"});return;}
  res.set("Access-Control-Allow-Origin",ORIGIN);res.set("Vary","Origin");
  res.set("Cache-Control","no-store");
  const path=req.path.replace(/^\/+|\/+$/g,"");
  try{
    if(path==="config"&&req.method==="GET"){json(res,200,{clientId:CLIENT_ID.value(),mode:MODE,article:ARTICLE});return;}
    if(path==="webhook"&&req.method==="POST"){await handleWebhook(req,res);return;}
    const uid=await user(req);
    if(path==="status"&&req.method==="GET"){json(res,200,await entitlement(uid));return;}
    if(path==="create"&&req.method==="POST"){await handleCreate(req,res,uid);return;}
    if(path==="capture"&&req.method==="POST"){await handleCapture(req,res,uid);return;}
    if(path==="content"&&req.method==="GET"){
      const a=await entitlement(uid);
      if(!a.authorized)fail("Questo racconto richiede un pass attivo",403);
      const doc=await db.collection("istanbul_private_content").doc("it").get();
      if(!doc.exists||typeof doc.data()?.html!=="string")fail("Contenuto privato non ancora installato",503);
      json(res,200,{html:doc.data().html,entitlement:a});return;
    }
    fail("Percorso non trovato",404);
  }catch(e){console.error("Paywall",path,e.message);json(res,e.httpStatus||500,{error:e.httpStatus&&e.httpStatus<500?e.message:"Servizio momentaneamente non disponibile"});}
});
