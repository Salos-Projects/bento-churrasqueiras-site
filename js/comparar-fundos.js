/* TEMPORÁRIO — seletor das opções de fundo da seção de produtos (?fundo=0..4). */
(function () {
  "use strict";

  var opcoes = [
    ["0", "Atual"],
    ["1", "1 · Inox + luz"],
    ["2a", "2a · Nome embaixo"],
    ["2b", "2b · Nome atrás do texto"],
    ["2c", "2c · Nome vertical"],
    ["3", "3 · Claro/escuro"],
    ["4", "4 · Brasa"]
  ];

  var url = new URL(window.location.href);
  var atual = url.searchParams.get("fundo") || "1";
  if (atual === "2") atual = "2a";

  var barra = document.createElement("div");
  barra.className = "seletor-fundo";
  barra.setAttribute("role", "group");
  barra.setAttribute("aria-label", "Opções de fundo dos produtos");
  var rotulo = document.createElement("span");
  rotulo.textContent = "Fundo dos produtos:";
  barra.appendChild(rotulo);

  function aplicar(valor) {
    // "2a" = fundo-2 + nome-a
    Array.prototype.slice.call(document.body.classList).forEach(function (c) {
      if (/^(fundo|nome)-/.test(c)) document.body.classList.remove(c);
    });
    document.body.classList.add("fundo-" + valor.charAt(0));
    if (valor.length > 1) document.body.classList.add("nome-" + valor.charAt(1));
    barra.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.valor === valor));
    });
    url = new URL(window.location.href);
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
