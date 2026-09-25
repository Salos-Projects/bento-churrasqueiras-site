# Figma — referência de design

Arquivo: [Bento Churrasqueiras](https://www.figma.com/design/aZWAIddJ2eoDkwCFJR2UCo/Bento-Churrasqueiras?node-id=6-2) · página **Site** (`6:2`)
Conta com acesso: lucas98579@gmail.com. **Atenção:** o arquivo está no time *V4 Company* (plano Pro, assento View) → limite de **6 leituras/mês** no MCP, e já foram usadas as 6 em 25/09/2026. Para ganhar 20/mês, duplicar o arquivo para um time próprio (Starter). Use os node IDs abaixo em vez de ler a página inteira.

## Paleta (frame "Identidade Visual", `68:3`)

Grade 3×3: três famílias em três tons (claro → base → escuro).

| Família | Claro | Base | Escuro |
|---|---|---|---|
| Laranja (marca) | `#F58B4E` | `#F26E22` | `#C2581B` |
| Grafite | `#373737` | `#292929` | `#202020` |
| Azul-petróleo | `#2E475D` | `#13293D` | `#0F2131` |

Na home, o azul-petróleo não aparece. O site usa laranja, grafite, branco, `#DBDCE0` (fundo das seções de produto), `#323232` (contato e rodapé) e `#383838` (texto).

## Tipografia

- **Bebas Neue** (títulos, caixa alta): título de seção em 40px.
- **Poppins Regular** (texto): corpo em 18px; o sobretítulo ("CONHEÇA NOSSAS LINHAS") tem 13px com tracking de 2.6px (0.2em), em caixa alta.

## Marca

- `assets/marca/logo-bento.svg`: logo completo (BENTO + CHURRASQUEIRAS + símbolo), em branco.
- `assets/marca/simbolo-bento.svg`: só o símbolo (chama laranja + arco).

## Estrutura da home (frame "Group 12", `68:2`, 1920px de largura)

Screenshot: `referencias/figma-site-completo.png`

| # | Seção | Node ID | Conteúdo |
|---|---|---|---|
| 1 | Hero | `11:5918` | Foto em tela cheia, header em pílula (logo, Projetos, Produtos, botão WhatsApp, menu), headline "PARA QUEM BUSCA MUITO MAIS DO QUE SÓ UMA CHURRASQUEIRA" e selo circular com o símbolo |
| 2 | Linha de produto 1 | `6:3` | Sobretítulo da linha, "MODELO XPTO", descrição, 5 bullets com check laranja, botão "SAIBA MAIS SOBRE ESTA LINHA" e foto anotada à direita |
| 3 | Linha de produto 2 | `11:5836` | Mesmo layout, com outra churrasqueira (espetos rotativos) |
| 4 | Prova social (⚠️ não lida: limite; montada a partir do screenshot) | `12:6602` | Card laranja com o símbolo em marca d'água, "MAIS DE 500 CHURRASQUEIRAS ENTREGUES…", carrossel de avaliações do Google e 4 números grandes (placeholder "+500") |
| 5 | Contato | `9:5714` | Fundo grafite, "ENTRE EM CONTATO COM A NOSSA EQUIPE" e mockup de celular com conversa de WhatsApp |
| 6 | Newsletter | `9:5750` | Fundo laranja e campo de e-mail com o botão "INSCREVER" |
| 7 | Rodapé | `9:5758` | Logo e colunas Produtos / Empresa / Contato / Horários, copyright e redes sociais |

Os padrões visuais que se repetem: botões em pílula laranja com texto branco em caixa alta, grid com margem de 320px (conteúdo de 1280px) e cantos arredondados nos cards.

## Placeholders a resolver com o cliente
- Nomes reais dos modelos ("MODELO XPTO"), descrições e bullets de cada linha.
- Números reais da prova social (os 4 "+500").
- Texto do rodapé (está em lorem ipsum).
- Copyright: aparece como "© 2025 Bento Churrasqueiras" (o nome da camada ainda cita "Curatto", resto de template). Confirmar a razão social.
