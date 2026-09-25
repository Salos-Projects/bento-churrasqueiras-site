/* TEMPORÁRIO — seletor das opções de fundo da seção de produtos (?fundo=0..4). */
(function () {
  "use strict";

  var opcoes = [
    ["0", "Atual"],
    ["1", "1 · Inox + luz"],
    ["2", "2 · Inox + nome"],
    ["3", "3 · Claro/escuro"],
    ["4", "4 · Brasa"]
  ];

  var url = new URL(window.location.href);
  var atual = url.searchParams.get("fundo") || "1";

  var barra = document.createElement("div");
  barra.className = "seletor-fundo";
  barra.setAttribute("role", "group");
  barra.setAttribute("aria-label", "Opções de fundo dos produtos");
  var rotulo = document.createElement("span");
  rotulo.textContent = "Fundo dos produtos:";
  barra.appendChild(rotulo);

  function aplicar(valor) {
    opcoes.forEach(function (o) { document.body.classList.remove("fundo-" + o[0]); });
    document.body.classList.add("fundo-" + valor);
    barra.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.valor === valor));
    });
    url.searchParams.set("fundo", valor);
    history.replaceState(null, "", url);
  }

  opcoes.forEach(function (o) {
    var b = document.createElement("button");
    b.type = "button";
    b.dataset.valor = o[0];
    b.textContent = o[1];
    b.addEventListener("click", function () { aplicar(o[0]); });
    barra.appendChild(b);
  });

  document.body.appendChild(barra);
  aplicar(atual);
})();
