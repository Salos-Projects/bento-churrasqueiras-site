/* Bento Churrasqueiras — comportamento da home. Sem dependências. */
(function () {
  "use strict";

  /* ---------- Largura da barra de rolagem (usada no cálculo das margens) ---------- */
  function medirBarra() {
    document.documentElement.style.setProperty("--barra", window.innerWidth - document.documentElement.clientWidth + "px");
  }
  medirBarra();
  window.addEventListener("resize", medirBarra);

  /* ---------- Revelação dos títulos (linha a linha) ---------- */
  var titulos = Array.prototype.slice.call(document.querySelectorAll("[data-linhas]"));
  titulos.forEach(function (t) { t.dataset.original = t.innerHTML; });

  // agrupa as palavras por linha visual e embrulha cada linha numa máscara
  function dividirEmLinhas(t) {
    t.innerHTML = t.dataset.original;
    var brs = t.querySelectorAll("br");
    var escondidos = [];
    brs.forEach(function (b) { if (getComputedStyle(b).display === "none") escondidos.push(b); });
    escondidos.forEach(function (b) { b.remove(); });
    var palavras = [];
    Array.prototype.slice.call(t.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { t.insertBefore(document.createTextNode(" "), n); return; }
          var sp = document.createElement("span");
          sp.textContent = p;
          sp.style.display = "inline-block";
          t.insertBefore(sp, n);
          palavras.push(sp);
        });
        t.removeChild(n);
      }
    });
    var linhas = [];
    var topo = null;
    palavras.forEach(function (p) {
      if (topo === null || Math.abs(p.offsetTop - topo) > 4) { linhas.push([]); topo = p.offsetTop; }
      linhas[linhas.length - 1].push(p.textContent);
    });
    t.textContent = "";
    linhas.forEach(function (ws, i) {
      var l = document.createElement("span");
      l.className = "rv-linha";
      var dentro = document.createElement("span");
      dentro.className = "rv-in";
      dentro.style.setProperty("--l", i);
      dentro.textContent = ws.join(" ");
      l.appendChild(dentro);
      t.appendChild(l);
    });
    t.classList.add("rv-pronto");
  }

  function prepararTitulos() { titulos.forEach(dividirEmLinhas); }

  function revelar(el) {
    el.classList.add("revelado");
    var hero = el.closest(".hero");
    if (hero) hero.classList.add("revelado");
  }

  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () {
    prepararTitulos();
    var blocos = document.querySelectorAll("[data-revelar]");
    var obs = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { revelar(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.35 }) : null;
    blocos.forEach(function (b) {
      if (b.dataset.revelar === "carga" || !obs) {
        requestAnimationFrame(function () { requestAnimationFrame(function () { revelar(b); }); });
      } else {
        obs.observe(b);
      }
    });
  });

  // ao mudar a largura, a quebra das linhas muda: refaz a divisão (já revelado)
  var larguraAnterior = window.innerWidth;
  window.addEventListener("resize", function () {
    if (window.innerWidth === larguraAnterior) return;
    larguraAnterior = window.innerWidth;
    clearTimeout(prepararTitulos.t);
    prepararTitulos.t = setTimeout(prepararTitulos, 150);
  });

  /* ---------- Header: estado "rolado" e painel de Produtos ---------- */
  var topo = document.querySelector("[data-topo]");
  if (topo) {
    var marcarRolado = function () { topo.classList.toggle("rolado", window.scrollY > 40); };
    marcarRolado();
    window.addEventListener("scroll", marcarRolado, { passive: true });

    topo.querySelectorAll("[data-drop]").forEach(function (b) {
      b.addEventListener("click", function () {
        b.setAttribute("aria-expanded", String(b.getAttribute("aria-expanded") !== "true"));
      });
      b.parentElement.addEventListener("mouseleave", function () { b.setAttribute("aria-expanded", "false"); });
    });
    document.addEventListener("click", function (e) {
      topo.querySelectorAll("[data-drop]").forEach(function (b) {
        if (!b.parentElement.contains(e.target)) b.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") topo.querySelectorAll("[data-drop]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Menu em overlay (mobile) ---------- */
  var botao = document.querySelector("[data-menu-abrir]");
  var menu = document.getElementById("menu");

  var DURACAO_MENU = 700; // igual à transição do clip-path no CSS

  // ordem de entrada dos itens (usada no atraso da animação)
  if (menu) {
    menu.querySelectorAll(".menu__lista > li, .menu__lado > *").forEach(function (el, i) {
      el.style.setProperty("--i", i);
    });
  }

  function origemDoCirculo() {
    var r = botao.querySelector(".menu-botao__circulo").getBoundingClientRect();
    menu.style.setProperty("--mx", r.left + r.width / 2 + "px");
    menu.style.setProperty("--my", r.top + r.height / 2 + "px");
  }

  function abrirMenu() {
    origemDoCirculo();
    menu.hidden = false;
    menu.offsetHeight; // força o navegador a aplicar o estado inicial antes da transição
    menu.classList.add("aberto");
    botao.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-aberto");
    var primeiro = menu.querySelector("a");
    if (primeiro) primeiro.focus({ preventScroll: true });
  }

  function fecharMenu() {
    origemDoCirculo();
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-aberto");
    setTimeout(function () {
      if (menu.classList.contains("aberto")) return; // reaberto no meio da animação
      menu.hidden = true;
      menu.querySelectorAll("[data-submenu]").forEach(function (g) {
        g.setAttribute("aria-expanded", "false");
        g.nextElementSibling.classList.remove("aberto");
      });
    }, DURACAO_MENU);
    botao.focus();
  }

  if (botao && menu) {
    botao.addEventListener("click", function () {
      botao.getAttribute("aria-expanded") === "true" ? fecharMenu() : abrirMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && botao.getAttribute("aria-expanded") === "true") fecharMenu();
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) fecharMenu();
    });

    // Submenu de Produtos: abre/fecha ao clicar
    menu.querySelectorAll("[data-submenu]").forEach(function (gatilho) {
      var caixa = gatilho.nextElementSibling;
      gatilho.addEventListener("click", function () {
        var aberto = gatilho.getAttribute("aria-expanded") === "true";
        gatilho.setAttribute("aria-expanded", String(!aberto));
        caixa.classList.toggle("aberto", !aberto);
      });
    });
  }

  /* ---------- Carrossel de avaliações (loop infinito) ---------- */
  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-carrossel]").forEach(function (carrossel) {
    if (reduzir) return;
    var trilho = carrossel.querySelector(".avaliacoes__trilho");
    Array.prototype.slice.call(trilho.children).forEach(function (item) {
      var copia = item.cloneNode(true);
      copia.setAttribute("aria-hidden", "true");
      trilho.appendChild(copia);
    });
    // ~40px por segundo, independente da quantidade de avaliações
    trilho.style.setProperty("--duracao", Math.round(trilho.scrollWidth / 2 / 40) + "s");
  });

  /* ---------- WhatsApp flutuante: aparece depois do hero ---------- */
  var flutuante = document.querySelector(".wpp-flutuante");
  var hero = document.querySelector(".hero");
  if (flutuante && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entradas) {
      flutuante.classList.toggle("visivel", !entradas[0].isIntersecting);
    }, { threshold: 0.15 }).observe(hero);
  }

  /* ---------- Newsletter: só visual por enquanto (vira Fluent Forms no Elementor) ---------- */
  document.querySelectorAll("[data-news]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var aviso = form.querySelector(".aviso") || form.appendChild(document.createElement("p"));
      aviso.className = "aviso";
      aviso.setAttribute("role", "status");
      aviso.textContent = "Protótipo: o envio será ligado ao formulário do site.";
    });
  });

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("[data-ano]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
