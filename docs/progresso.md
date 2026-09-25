# Progresso

## 25/09/2026
- Pente-fino do site atual (65 URLs, desktop + mobile, performance, SEO, acessibilidade, segurança) → consolidado em `docs/briefing.md`.
- Protótipo de estilo aprovado pelo cliente salvo em `referencias/prototipo-home-aprovado.png`.
- Briefing do novo site escrito (diagnóstico, o que manter, sistema visual, mapa de páginas, plano código → Elementor).
- Repositório `Salos-Projects/bento-churrasqueiras-site` criado (privado, topic e time `bento-churrasqueiras`).
- Elementor Pro confirmado pelo cliente.
- MCP do Elementor da Bento conectado: `bento-churrasqueiras-elementor`, escopo local da pasta `Bento Churrasqueiras` (22 ferramentas, Editor atômico ativo). O MCP `lideratti-elementor` é de outro cliente — não usar aqui.
- Decisão: configurador "Monte sua churrasqueira" (Staggs) fora do lançamento; decidir depois entre manter o Staggs ou refazer em código.

- Figma do cliente conectado via MCP (conta Gmail, plano Starter = 20 leituras/mês). Paleta, fontes, logo/símbolo em SVG e estrutura da home extraídos → `docs/figma.md`, `assets/marca/`, `referencias/figma-site-completo.png`. 3 leituras usadas.
- Textos da home: coletados do site atual e reescritos (atual × proposta, sem inventar fatos) → `docs/textos-home.md`, com 6 pendências para o cliente.
- **Home em código** (`index.html`, `css/estilo.css`, `js/main.js`): segue o Figma (hero, header em pílulas de vidro, linhas, prova social, contato, newsletter, rodapé) com os textos da proposta e as 4 linhas do site atual. Fotos de SmartGrill, DuraGrill e Acessórios vêm do site atual (630×477, baixa resolução); a grelha usa o render do Figma. Conferida em 1920px e 390px, sem rolagem horizontal.
- Limite do Figma: o arquivo está no time V4 (6 leituras/mês), já esgotado. A seção de prova social foi montada a partir do screenshot.
- Seção de produtos: testados fundos (inox, nome da linha, claro/escuro, brasa) e layouts (vitrine fixa, editorial, vitrine sangrada, **vitrine ambiente**). Direção atual: **A3 · vitrine ambiente** — fundo escuro, cena de ambiente gerada por IA ocupando a metade direita, troca no scroll. Decidido: fotos de obra atuais não servem; cada linha terá uma imagem de ambiente em IA no padrão da foto da abertura. O render da grelha com legendas vai para a página do produto ("raio-X").
- ⚠️ O render da grelha (do Figma) tem marcas "INNOVARE" e "KAFER" nas bordas — confirmar origem antes de publicar.
- Home refinada (25/09): menu tradicional (pedido do cliente) não fixo; revelação linha a linha nos títulos; selo com texto real; prova social no **claro quente** (#F2EEE9) sem cards, com contagem nos números; contato vira fechamento no escuro quente com canais em lista; newsletter trocada por **"Receba o catálogo" pedindo WhatsApp** (vira Fluent Forms). Regra de dois tons: escuro quente = clima, claro quente = informação.

### Próximos passos
1. Revisar a home com o Lucas e depois com o cliente; trocar as fotos das linhas por renders ou fotos em alta.
2. Definir se usamos as fotos atuais do site ou esperamos os originais em alta.
3. Pendências com o cliente: ver seção 6 do briefing (Figma, renders, fotos, números reais, perfil Google, acesso admin ao WP).
