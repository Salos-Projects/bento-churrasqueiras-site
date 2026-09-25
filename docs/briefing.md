# Briefing — Novo site Bento Churrasqueiras

**Data:** 25/09/2026 · **Site atual:** https://bentochurrasqueiras.com.br/ · **Referência visual aprovada:** `referencias/prototipo-home-aprovado.png`

---

## 1. Resumo executivo

O site atual tem bons ativos: fotos reais em WebP, identidade escura com laranja-fogo, argumentos técnicos fortes e um configurador de churrasqueira que é um diferencial. Mas o site **não converte e não ranqueia**:

- **O CTA principal da home ("Monte sua Churrasqueira") está quebrado** (`href="#"`). O configurador existe, mas nenhuma página pública leva até ele.
- **Nenhuma página tem H1 nem meta description**, e cerca de 15 páginas de lixo estão indexadas no Google (`-old`, `backup`, `teste-formulario`, loja vazia).
- **Página Empresa no ar com imagens placeholder cinzas do Elementor.**
- **Peso de 3,6 MB e 116 requests por página, e CLS de 0,75 no desktop** (o layout "pula" no carregamento; o limite bom é 0,1).
- **Sem `tel:`, sem WhatsApp flutuante, sem prova social** (números, avaliações Google, projetos com contexto).

O novo site vai **manter a identidade e o WhatsApp como canal**. A mudança está em **mostrar o produto como engenharia** (renders com peças apontadas, como no protótipo), **provar com números e avaliações reais** e **levar o visitante ao orçamento em um toque**, com o configurador de volta ao centro.

---

## 2. Diagnóstico do site atual (pente-fino)

### 2.1 Conversão — prioridade máxima
| # | Problema | Evidência |
|---|---|---|
| 1 | CTA "Monte sua Churrasqueira" não faz nada | `href="#"`, o clique leva a `/#` |
| 2 | Configurador órfão | `/configurator/monte-sua-churrasqueirav2/` só é linkado por `/teste-formulario/` |
| 3 | Sem WhatsApp flutuante; no mobile só pelo hambúrguer ou rolando até o fim | o plugin whatsapp-for-wordpress carrega, mas o botão não aparece |
| 4 | "Faça um Orçamento" abre um `wa.me` sem mensagem pré-preenchida | só `/catalogo-de-produtos/` usa `?text=` por linha |
| 5 | Nenhum link `tel:` ou `mailto:` | 0 ocorrências no site |
| 6 | Três caminhos concorrentes (WhatsApp, form de e-mail, newsletter) | dispersa o lead |
| 7 | Prova social fraca | 7 depoimentos só em texto, sem números, sem Google, projetos sem legenda |
| 8 | 2º WhatsApp da página Contato provavelmente quebrado | `wa.me/555499268929` (falta o 9) |

### 2.2 Visual e conteúdo
- Empresa: linha do tempo com **3 placeholders cinzas** (também usados como imagem de compartilhamento).
- "Espeto de Costelão" em `/produtos/` usa o texto de Bifeiras (copiar e colar errado).
- DuraGrill linka os manuais da linha Smart.
- Erros de digitação e caixa: "Execelente", "Afim de", "gRELHAS", "ESPETO DE cOSTELÃO", "duraGRILL".
- E-mail do rodapé quebra como "vendas@bento-churrasqueiras.-com.br".
- Quatro famílias de fonte (Bebas, Poppins, Montserrat, Roboto) e parágrafos marcados como H2.
- Seções "conheça alguns de nossos projetos" vazias em Grelhas e Acessórios.
- Inconsistência de tempo de mercado: "mais de 15 anos" e "mais de uma década", mas a fundação foi em 2004, ou seja, **22 anos**.
- Galeria de projetos com fotos de 450×350 px, sem legenda nem cidade.

### 2.3 UX e mobile
- O menu mobile omite as linhas (SmartGrill, DuraGrill, Grelhas, Acessórios) e Assistência.
- Home mobile com 7.551 px de altura, com vazios grandes entre as seções.
- Alvos de toque no rodapé com cerca de 21 px (o mínimo recomendado é 44 px).
- Elementos vazando da largura (body com 455 px num viewport de 390 px).
- Conteúdo invisível até a animação rodar; sem suporte a `prefers-reduced-motion`.

### 2.4 Performance
| Página | Requests | Peso |
|---|---|---|
| Home | 116 | 3,57 MB |
| Produtos | 111 | 3,77 MB |
| SmartGrill | 107 | 2,65 MB |

- A fonte "Huge Icons" pesa **557 KB e serve só para o ícone do hambúrguer**.
- GSAP, ScrollTrigger e Lenis são **carregados duas vezes**; split-type vem do unpkg sem versão fixa.
- 42 a 46 folhas de CSS por página, incluindo CSS do editor de blocos no front-end.
- Só 1 de 21 imagens tem lazy-load.
- **PHP 7.4 (sem suporte desde 2022)** e `cache-control: max-age=0`.
- Ponto positivo: 100 de 120 imagens já estão em WebP e leves.

### 2.5 SEO
- **0 H1 nas páginas principais.** Os títulos visuais são H3 e os parágrafos são H2.
- **0 meta descriptions** nas páginas atuais; títulos genéricos ("Home - Bento Churrasqueiras").
- Sitemap com lixo indexável: `/produtos-old/*`, `/backup/`, `/teste-formulario/`, `/404-2/`, `/lp-v1/`, `/lp-google/`, `/loja/`, `/minha-conta/`, `/finalizar-compra/` e outras.
- As páginas `/produtos-old/smartgrill/` e `/produtos-old/duragrill/` **competem** com as páginas atuais.
- Sem schema **LocalBusiness** (endereço, horário, geo), **Product** ou **Review**.
- Alt ausente em cerca de 50% das imagens (Empresa: 8 de 8 sem alt).
- Blog parado em 2021; nenhuma página local forte para a Serra Gaúcha.

### 2.6 Acessibilidade
- Formulários de Contato e Assistência sem `<label>` (só placeholder).
- Botões e links sem nome acessível; hambúrguer feito com `<i aria-hidden>`.
- Baixo contraste em "Busca a perfeição" e nos botões do configurador.

### 2.7 Segurança e técnico (resolver independente do redesign)
- ⚠️ **`/wp-json/wp/v2/users` expõe usuários, incluindo um e-mail externo (`rcd.mmarquez@v4company.com`).** É preciso bloquear a listagem de usuários na REST e revisar se esse usuário ainda deve ter acesso.
- PHP 7.4 sem suporte; `/readme.html` público.
- Erros de JS: Lenis duplicado, GSAP com target null na Empresa, `elementorFrontendConfig is not defined` e erro do Staggs no configurador.
- Stack: WP 7.1.2, **Elementor 4.3.2 + Pro 4.3.0**, Hello Elementor, Happy Addons, Fluent Forms Pro, Staggs Pro 3.2.0 e Yoast. **O plugin `elementor-mcp` já está instalado.**

---

## 3. O que manter

- **Identidade:** fundo escuro (#1F1F1F a #282828), laranja-fogo (#F37021) como única cor de ação e o logo com chama.
- **Bebas Neue nos títulos** (o protótipo usa uma condensada do mesmo tipo).
- **Fotos reais** de instalações. Vamos pedir os originais em alta.
- **WhatsApp (54) 99688-9900 como canal principal**, com o padrão de mensagem por linha.
- **Argumentos técnicos:** INOX 304 AISI não magnético, buchas autolubrificantes, controle de velocidade por potenciômetro, peças removíveis, elevação por controle ou app, **5 anos de garantia** em motores e componentes, retorno da assistência em 48 h.
- **Configurador Staggs:** medidas em mm, compatibilidades, 5 a 19 espetos, PDF do projeto.
- **Depoimentos nomeados com cidade**, inclusive B2B (restaurantes, clube, condomínio).
- **Rastreamento:** GTM server-side (stape), GA4, Google Ads e Meta Pixel precisam ser preservados na migração.
- Manuais em PDF e formulário de assistência com upload de fotos.

---

## 4. Direção do novo site (a partir do protótipo aprovado)

### 4.1 Conceito
**"Para quem busca muito mais do que só uma churrasqueira."** Premium, técnico e sob medida. O produto aparece como peça de engenharia (render + callouts), e o ambiente gourmet aparece como resultado.

### 4.2 Sistema visual (tokens)
| Token | Valor | Uso |
|---|---|---|
| `--laranja` | #F37021 (conferir com o arquivo do protótipo) | CTAs, faixa de prova social, destaques |
| `--grafite-900` | ~#1F1F1F | Hero, rodapé |
| `--grafite-800` | ~#333333 | Bloco de contato |
| `--cinza-100` | ~#E4E5E7 | Fundo das seções de produto |
| `--branco` | #FFFFFF | Cards |
| Títulos | Condensada em caixa alta (Bebas Neue ou similar do protótipo) | H1 a H3 |
| Texto | Uma sans geométrica (Poppins, conforme o protótipo) | Corpo, botões e labels |
| Overline | Sans com letter-spacing largo, em caixa alta ("LINHA DE CUSTO BENEFÍCIO") | Rótulos de seção |
| Botão | Pílula laranja com texto branco em caixa alta | Todos os CTAs |
| Selo | Carimbo circular "BENTO CHURRASQUEIRAS" com chama | Hero e detalhes |

Regras: **no máximo 2 famílias de fonte**, **uma única cor de ação**, ícones em SVG inline (acaba a fonte de ícones de 557 KB).

### 4.3 Home (seções do protótipo + ajustes)
1. **Header flutuante:** logo · Projetos · Produtos · botão WhatsApp · Menu (o menu abre em overlay com todas as páginas, inclusive linhas e Assistência).
2. **Hero:** foto de ambiente gourmet em tela cheia, H1 "Para quem busca muito mais do que só uma churrasqueira" e selo girando. CTA do configurador **fica de fora por enquanto** (ver 4.7).
3. **Linhas de produto** (uma por bloco, alternando lados): overline, nome, descrição, checklist e "Saiba mais sobre esta linha", com render e callouts (Inox 304, manivela removível, 35 kg na grelha, espetos rotativos etc.).
   - Os "Modelo XPTO" do protótipo viram as linhas reais: **SmartGrill**, **DuraGrill**, **Grelha de Elevação Manual**, **Grelha de Elevação Automática** e **Parrilla**. Falta definir quais entram na home.
4. **Prova social (faixa laranja):** "Mais de 500 churrasqueiras entregues, milhares de sonhos realizados", carrossel de avaliações do Google e 4 números grandes.
   - **Precisamos dos números reais** (ex.: churrasqueiras entregues, anos de mercado = 22, cidades atendidas, garantia = 5 anos).
5. **Contato:** "Entre em contato com a nossa equipe", mockup de celular com conversa de WhatsApp e CTA que abre o WhatsApp com mensagem pré-preenchida.
6. **Newsletter:** está no protótipo aprovado. **Recomendação:** trocar por "Baixe o catálogo" ou "Receba seu projeto em PDF", porque churrasqueira é compra única e captar o WhatsApp vale mais que captar e-mail. Validar com o cliente.
7. **Rodapé:** Produtos · Empresa · Contato (links `tel:`, `mailto:` e WhatsApp) · Horários · endereço · CNPJ · Política de Privacidade · redes · © ano automático.

### 4.4 Mapa do novo site
| Página | URL | Observação |
|---|---|---|
| Home | `/` | protótipo |
| Empresa | `/empresa/` | história 2004 → hoje, fábrica em Garibaldi, fotos reais (sem placeholders) |
| Produtos (hub) | `/produtos/` | cards das linhas |
| SmartGrill | `/smartgrill/` | template único de linha |
| DuraGrill | `/duragrill/` | mesmo template |
| Grelhas | `/grelhas/` | manual, automática e parrilla |
| Acessórios | `/acessorios/` | bifeiras, cooktops, espeto de costelão, espetos |
| Projetos | `/projetos/` | galeria com legenda (cidade, tipo, produto) e filtro |
| Monte sua churrasqueira | `/configurator/...` | **fora do escopo inicial** — ver 4.7 |
| Contato | `/contato/` | WhatsApp, `tel:`, mapa e form curto com labels |
| Assistência | `/assistencia/` | garantia de 5 anos, retorno em 48 h, upload de fotos, manuais |
| Política de Privacidade | `/politica-de-privacidade/` | linkada no rodapé |

**Template de linha de produto** (SmartGrill e DuraGrill): hero com render · o que é · callouts técnicos · diferenciais · galeria de instalações · specs · manuais para download · depoimento · CTA WhatsApp com `?text=Quero um orçamento da SmartGrill`.

### 4.5 Conversão
- **WhatsApp flutuante** em todas as páginas, com mensagem por página ou linha.
- **Um CTA primário por seção** ("Pedir orçamento no WhatsApp").
- Links `tel:` e `mailto:` em todo lugar.
- Eventos de GA4/Ads/Pixel em cliques de WhatsApp, configurador, download de PDF e envio de formulário.

### 4.6 SEO
- Um H1 por página, hierarquia correta, title e meta description escritos à mão.
- **Remover ou aplicar noindex e 301** nas páginas `-old`, `backup`, `teste-formulario`, `404-2`, loja, minha-conta e finalizar-compra; LPs de mídia com noindex.
- Schema **LocalBusiness** (Rua Francisco José Milani, 166 – Linha Garibaldina, Garibaldi/RS, horários, telefone), **Product** para as linhas e **Review**.
- Alt descritivo em todas as imagens.
- Fase 2: páginas locais (Serra Gaúcha, Bento Gonçalves, Caxias, Porto Alegre) e retomar o blog.

### 4.7 Configurador "Monte sua churrasqueira" — decisão adiada
Fica **fora do lançamento**. Decidir depois entre manter o plugin Staggs (reestilizado) ou reconstruir o configurador em código e subir no site. Enquanto isso, nenhum link quebrado para ele no site novo.

### 4.8 Performance (metas)
- Peso da home < 1,5 MB e < 60 requests; LCP < 2,5 s no mobile; **CLS < 0,1**.
- Uma lib de animação (sem duplicatas), respeitando `prefers-reduced-motion`; conteúdo visível sem JS.
- Imagens WebP/AVIF responsivas com lazy-load; fontes com `font-display: swap` e subset.
- Pedir ao cliente ou à hospedagem: **PHP 8.2+** e cache de página ligado.

---

## 5. Plano de construção (código → Elementor via MCP)

1. **Protótipo em código** (HTML/CSS com tokens, neste repositório): as páginas acima, responsivas, validadas no navegador em desktop e mobile.
2. **Montagem no Elementor via MCP**, no site da Bento:
   - Site com **Elementor 4.3 + Pro** e plugin `elementor-mcp`.
   - Ordem: variáveis globais (cores, fontes, tamanhos) → classes globais (botão, overline, card, callout) → componentes (card de linha, card de depoimento, número) → header e footer (site parts) → páginas.
   - O MCP salva tudo como **rascunho**. Revisamos visualmente e publicamos página por página.
   - **Conexão feita em 25/09/2026** (`bento-churrasqueiras-elementor`, escopo local deste projeto); 22 ferramentas disponíveis, Editor atômico ativo.
   - **Plano B:** o conversor interno `salos/html-to-elementor` gera JSON importável a partir do HTML.
3. **Migração segura:** construir as páginas novas em rascunho ao lado das atuais, trocar na virada, aplicar 301 nas URLs antigas e reapontar o sitemap.
4. **Pós-virada:** Search Console (remover as URLs de lixo), testar eventos de conversão, medir Core Web Vitals.

---

## 6. Pendências com o cliente

- [ ] Arquivo aberto do protótipo (Figma?), com fontes e cores exatas.
- [ ] Renders 3D dos produtos (como os do protótipo) para todas as linhas.
- [ ] Fotos em alta das instalações, com cidade e tipo de cada projeto.
- [ ] **Números reais** para a faixa de prova social.
- [ ] Link do perfil do Google (avaliações) e autorização para exibir os depoimentos.
- [ ] Quais linhas entram na home e o texto da "linha de custo-benefício".
- [ ] Newsletter: manter ou trocar por catálogo/projeto em PDF.
- [ ] Confirmar o 2º WhatsApp: (54) 99926-8929.
- [x] Elementor Pro confirmado; conexão do MCP feita.
- [ ] Acesso admin ao WordPress.
- [ ] Revisar o usuário externo exposto na REST (v4company) e atualizar o PHP.
