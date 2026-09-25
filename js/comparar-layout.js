/* TEMPORÁRIO — layouts da seção de produtos (?layout=atual|a|d). */
(function () {
  "use strict";

  var opcoes = [
    ["atual", "Atual"],
    ["a", "A · Vitrine fixa"],
    ["a2", "A2 · Vitrine sangrada"],
    ["a3", "A3 · Vitrine ambiente"],
    ["d", "D · Editorial"]
  ];

  var linhasEl = document.querySelector(".linhas");
  var linhas = Array.prototype.slice.call(document.querySelectorAll(".linha"));
  if (!linhasEl || !linhas.length) return;

  var url = new URL(window.location.href);
  var escolhido = url.searchParams.get("layout") || "a3";
  var celular = window.matchMedia("(max-width: 900px)");
  var ativo = null; // layout efetivamente aplicado

  /* ---------- A · Vitrine fixa ---------- */
  var indice = document.createElement("div");
  indice.className = "vitrine-indice";
  var caixa = document.createElement("div");
  caixa.className = "container";
  var lista = document.createElement("ol");
  var barraProgresso = document.createElement("span");
  barraProgresso.className = "vitrine-indice__barra";
  lista.appendChild(barraProgresso);
  caixa.appendChild(lista);
  indice.appendChild(caixa);
  linhas.forEach(function (linha, i) {
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.type = "button";
    var num = document.createElement("span");
    num.textContent = String(i + 1).padStart(2, "0");
    var nome = document.createElement("small");
    nome.textContent = linha.dataset.nome || linha.querySelector(".titulo").textContent;
    b.appendChild(num);
    b.appendChild(nome);
    b.addEventListener("click", function () { irPara(i); });
    li.appendChild(b);
    lista.appendChild(li);
  });
  var botoes = lista.querySelectorAll("button");
  linhas.forEach(function (l) {
    if (l.dataset.ambiente) {
      var cena = document.createElement("div");
      cena.className = "linha__cena";
      cena.setAttribute("aria-hidden", "true");
      cena.style.setProperty("--img", 'url("' + new URL(l.dataset.ambiente, document.baseURI).href + '")');
      l.insertBefore(cena, l.firstChild);
    }
    var grade = l.querySelector(".linha__grade");
    if (grade && l.dataset.nome) grade.dataset.nome = l.dataset.nome;
    var t = l.querySelector(".titulo");
    if (t && l.dataset.nome && t.textContent.trim().toUpperCase() === l.dataset.nome) t.classList.add("titulo-igual");
  });

  function irPara(i) {
    var topo = linhasEl.getBoundingClientRect().top + window.scrollY;
    var passo = (linhasEl.offsetHeight - window.innerHeight) / linhas.length;
    window.scrollTo({ top: topo + passo * i + 2, behavior: "smooth" });
  }

  function atualizarA() {
    var r = linhasEl.getBoundingClientRect();
    var total = linhasEl.offsetHeight - window.innerHeight;
    var p = Math.min(1, Math.max(0, -r.top / total));
    var i = Math.min(linhas.length - 1, Math.floor(p * linhas.length));
    linhas.forEach(function (l, j) { l.classList.toggle("ativa", j === i); });
    botoes.forEach(function (b, j) { b.setAttribute("aria-current", String(j === i)); });
    indice.style.setProperty("--progresso", p);
    indice.classList.toggle("sobre-escuro", i % 2 === 1);
  }

  // se o foco (Tab) entrar numa linha escondida, rola até ela
  linhas.forEach(function (linha, i) {
    linha.addEventListener("focusin", function () {
      if (ativo === "a" && !linha.classList.contains("ativa")) irPara(i);
    });
  });

  /* ---------- A3 mobile: cada linha "ativa" ao entrar na tela ---------- */
  var obsAtiva = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("ativa"); obsAtiva.unobserve(e.target); } });
  }, { threshold: 0.15 }) : null;

  /* ---------- D · Editorial ---------- */
  var observador = "IntersectionObserver" in window ? new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add("visivel");
    });
  }, { threshold: 0.25 }) : null;

  function atualizarD() {
    var meio = window.innerHeight / 2;
    linhas.forEach(function (l) {
      var fig = l.querySelector(".linha__midia--foto");
      if (!fig) return;
      var r = fig.getBoundingClientRect();
      var desvio = (r.top + r.height / 2 - meio) * -0.08;
      fig.querySelector("img").style.setProperty("--py", Math.max(-40, Math.min(40, desvio)).toFixed(1) + "px");
    });
  }

  /* ---------- Troca de layout ---------- */
  function limpar() {
    document.body.classList.remove("layout-a", "layout-a2", "layout-a3", "layout-a3m", "layout-d");
    linhas.forEach(function (l) {
      l.classList.remove("ativa", "visivel");
      var img = l.querySelector(".linha__midia--foto img");
      if (img) img.style.removeProperty("--py");
    });
    if (observador) linhas.forEach(function (l) { observador.unobserve(l); });
    if (obsAtiva) linhas.forEach(function (l) { obsAtiva.unobserve(l); });
    if (indice.parentNode) indice.parentNode.removeChild(indice);
  }

  function aplicar() {
    // no celular a vitrine fixa não funciona bem: A3 vira a versão empilhada (a3m); A/A2 viram o editorial
    var efetivo = escolhido === "a3" && celular.matches ? "a3m" : (/^a/.test(escolhido) && celular.matches ? "d" : escolhido);
    limpar();
    ativo = /^a[23]?$/.test(efetivo) ? "a" : efetivo;
    if (ativo === "a") {
      document.body.classList.add("layout-a");
      if (efetivo === "a2" || efetivo === "a3") document.body.classList.add("layout-a2");
      if (efetivo === "a3") document.body.classList.add("layout-a3");
      linhasEl.style.setProperty("--qtd", linhas.length);
      linhasEl.appendChild(indice);
      atualizarA();
    } else if (efetivo === "a3m") {
      ativo = "a3m";
      document.body.classList.add("layout-a2", "layout-a3", "layout-a3m");
      if (obsAtiva) linhas.forEach(function (l) { obsAtiva.observe(l); });
      else linhas.forEach(function (l) { l.classList.add("ativa"); });
    } else if (efetivo === "d") {
      document.body.classList.add("layout-d");
      if (observador) linhas.forEach(function (l) { observador.observe(l); });
      else linhas.forEach(function (l) { l.classList.add("visivel"); });
      atualizarD();
    }
  }

  var agendado = false;
  window.addEventListener("scroll", function () {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () {
      agendado = false;
      if (ativo === "a") atualizarA();
      if (ativo === "d") atualizarD();
    });
  }, { passive: true });
  window.addEventListener("resize", function () { if (ativo === "a") atualizarA(); });
  celular.addEventListener("change", aplicar);

  /* ---------- Seletor ---------- */
  var barra = document.createElement("div");
  barra.className = "seletor-fundo seletor-layout";
  barra.setAttribute("role", "group");
  barra.setAttribute("aria-label", "Layout dos produtos");
  var rotulo = document.createElement("span");
  rotulo.textContent = "Layout dos produtos:";
  barra.appendChild(rotulo);
  opcoes.forEach(function (o) {
    var b = document.createElement("button");
    b.type = "button";
    b.dataset.valor = o[0];
    b.textContent = o[1];
    b.addEventListener("click", function () { escolher(o[0]); });
    barra.appendChild(b);
  });
  document.body.appendChild(barra);

  function escolher(valor) {
    escolhido = valor;
    barra.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.valor === valor));
    });
    url = new URL(window.location.href);
    url.searchParams.set("layout", valor);
    history.replaceState(null, "", url);
    aplicar();
  }

  escolher(escolhido);
})();
