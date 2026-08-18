const products=[{d:100,p:10},{d:310,p:25},{d:520,p:40,hot:true},{d:1060,p:75},{d:2180,p:145,hot:true},{d:5600,p:350},{d:10000,p:600}];
const $=x=>document.getElementById(x),fmt=n=>n.toLocaleString("ru-RU");let cur=null,file=null;
products.forEach((x,i)=>{let e=document.createElement("article");e.className="product"+(x.hot?" hot":"");e.innerHTML=`${x.hot?'<span class="ribbon">МАШҲУР</span>':""}<div class="gemSmall">💎</div><div class="pack">${fmt(x.d)} алмос</div>${x.hot?'<div class="old">'+fmt(Math.round(x.p*1.12))+" сомонӣ</div>":'<div class="old">&nbsp;</div>'}<div class="price">${fmt(x.p)} сомонӣ</div><button class="buy">Харидан →</button>`;e.querySelector(".buy").onclick=()=>openOrder(x);$("products").appendChild(e)});
function openOrder(x){cur=x;hideAll();$("order").hidden=false;$("selected").textContent=`💎 ${fmt(x.d)} алмос — ${fmt(x.p)} сомонӣ`;$("playerId").value="";$("orderMsg").textContent="";setStep(1);$("order").querySelector(".modalBox").scrollTop=0;$("playerId").focus()}
function hideAll(){["step1","step2","step3","step4"].forEach((id,i)=>$(id).hidden=i!==0)}
function setStep(n){["step1","step2","step3","step4"].forEach((id,i)=>$(id).hidden=i!==n-1);document.querySelectorAll(".progress i").forEach((el,i)=>el.classList.toggle("active",i<n))}
$("closeOrder").onclick=()=>{$("order").hidden=true};
$("nextPayment").onclick=()=>{let id=$("playerId").value.trim();if(!id){$("orderMsg").textContent="Лутфан ID-и Free Fire-ро ворид кун.";return}if(!/^\d+$/.test(id)){$("orderMsg").textContent="ID бояд танҳо рақам бошад.";return}$("paySummary").textContent=`💎 ${fmt(cur.d)} алмос • ID: ${id}`;$("amount").textContent=fmt(cur.p)+" сомонӣ";setStep(2)};
$("paid").onclick=()=>{$("receiptSummary").textContent=`💎 ${fmt(cur.d)} алмос • ID: ${$("playerId").value.trim()} • ${fmt(cur.p)} сомонӣ`;setStep(3)};
$("receiptInput").onchange=e=>{let f=e.target.files[0];if(!f||!f.type.startsWith("image/"))return;file=f;$("preview").src=URL.createObjectURL(f);$("previewBox").hidden=false;$("send").disabled=false;$("receiptMsg").textContent="Чек интихоб шуд. Пешнамоишро санҷ.";};
$("remove").onclick=()=>{file=null;$("receiptInput").value="";$("previewBox").hidden=true;$("send").disabled=true;$("receiptMsg").textContent=""};
$("send").onclick=()=>{if(file)setStep(4)};
$("newOrder").onclick=()=>{$("order").hidden=true;document.getElementById("packages").scrollIntoView({behavior:"smooth"})};
$("playerId").addEventListener("input",()=>$("playerId").value=$("playerId").value.replace(/\D/g,""));