const products = [
  {d:100,p:10},
  {d:310,p:25},
  {d:520,p:40,hot:true},
  {d:1060,p:75},
  {d:2180,p:145,hot:true},
  {d:5600,p:350},
  {d:10000,p:600}
];

const $ = id => document.getElementById(id);
const fmt = n => n.toLocaleString("ru-RU");

let current = null;
let receiptFile = null;

function showStep(step) {
  ["step1","step2","step3","step4"].forEach((id, index) => {
    $(id).hidden = index !== step - 1;
  });

  document.querySelectorAll(".progress i").forEach((el, index) => {
    el.classList.toggle("active", index < step);
  });
}

products.forEach(product => {
  const card = document.createElement("article");
  card.className = "product" + (product.hot ? " hot" : "");

  card.innerHTML = `
    ${product.hot ? '<span class="ribbon">МАШҲУР</span>' : ""}
    <div class="gemSmall">💎</div>
    <div class="pack">${fmt(product.d)} алмос</div>
    <div class="old">&nbsp;</div>
    <div class="price">${fmt(product.p)} сомонӣ</div>
    <button class="buy" type="button">Харидан →</button>
  `;

  card.querySelector(".buy").addEventListener("click", () => {
    current = product;

    $("order").hidden = false;
    $("selected").textContent =
      `💎 ${fmt(product.d)} алмос — ${fmt(product.p)} сомонӣ`;

    $("playerId").value = "";
    $("orderMsg").textContent = "";

    showStep(1);

    $("order").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });

  $("products").appendChild(card);
});

$("closeOrder").addEventListener("click", () => {
  $("order").hidden = true;
});

$("nextPayment").addEventListener("click", () => {
  const id = $("playerId").value.trim();

  if (!id) {
    $("orderMsg").textContent =
      "Лутфан ID-и Free Fire-ро ворид кун.";
    return;
  }

  if (!/^[0-9]+$/.test(id)) {
    $("orderMsg").textContent =
      "ID бояд танҳо аз рақамҳо иборат бошад.";
    return;
  }

  $("paySummary").textContent =
    `💎 ${fmt(current.d)} алмос • ID: ${id}`;

  $("amount").textContent =
    `${fmt(current.p)} сомонӣ`;

  showStep(2);
});

$("paid").addEventListener("click", () => {
  $("receiptSummary").textContent =
    `💎 ${fmt(current.d)} алмос • ID: ${$("playerId").value.trim()} • ${fmt(current.p)} сомонӣ`;

  showStep(3);
});

$("receiptInput").addEventListener("change", event => {
  const file = event.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    $("receiptMsg").textContent =
      "Лутфан танҳо акси чекро интихоб кун.";
    return;
  }

  receiptFile = file;

  $("preview").src = URL.createObjectURL(file);
  $("previewBox").hidden = false;
  $("send").disabled = false;

  $("receiptMsg").textContent =
    "Чек интихоб шуд. Пешнамоишро санҷ.";
});

$("remove").addEventListener("click", () => {
  receiptFile = null;

  $("receiptInput").value = "";
  $("previewBox").hidden = true;
  $("send").disabled = true;
  $("receiptMsg").textContent = "";
});

$("send").addEventListener("click", () => {
  if (!receiptFile) return;

  showStep(4);
});

$("newOrder").addEventListener("click", () => {
  $("order").hidden = true;

  $("packages").scrollIntoView({
    behavior: "smooth"
  });
});

$("playerId").addEventListener("input", () => {
  $("playerId").value =
    $("playerId").value.replace(/[^0-9]/g, "");
});
