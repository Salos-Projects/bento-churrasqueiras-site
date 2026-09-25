/* TEMPORÁRIO — seletor de botões (?botoes=novos|atuais). */
(function () {
  "use strict";
  var url = new URL(window.location.href);
  var atual = url.searchParams.get("botoes") || "novos";
  var barra = document.createElement("div");
  barra.className = "seletor-botoes";
  barra.setAttribute("role", "group");
  barra.setAttribute("aria-label", "Estilo dos botões");
  var r = document.createElement("span");
  r.textContent = "Botões:";
  barra.appendChild(r);
  [["atuais", "Atuais"], ["novos", "Refinados"]].forEach(function (o) {
    var b = document.createElement("button");
    b.type = "button";
    b.dataset.valor = o[0];
    b.textContent = o[1];
    b.addEventListener("click", function () { aplicar(o[0]); });
    barra.appendChild(b);
  });
  function aplicar(v) {
    document.body.classList.toggle("botoes-novos", v === "novos");
    barra.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.valor === v)); });
    url = new URL(window.location.href);
    url.searchParams.set("botoes", v);
    history.replaceState(null, "", url);
  }
  document.body.appendChild(barra);
  aplicar(atual);
})();
