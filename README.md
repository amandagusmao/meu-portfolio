# amanda.eng.br 🦇

Portfólio e currículo de **Amanda Gusmão (Aisha)**: Software Engineer · Observabilidade & DevOps.

Site gótico, dark e rosa, feito em HTML/CSS/JS puro e publicado no GitHub Pages pelo GitHub Actions.

---

## ✏️ Como editar (o guia rápido)

Dá para editar direto pelo site do GitHub: abra o arquivo, clique no lápis ✏️, altere e clique em **Commit changes**.
Em cerca de 1 minuto o site atualiza sozinho.

### O que atualiza sozinho
| O quê | De onde vem | Quando |
|---|---|---|
| Badges (página Certificações e contador no Início) | seu perfil do **Credly** | todo dia às 06:17, ou na hora em *Actions → Deploy site → Run workflow* |
| Tabela "todos os repositórios" (página Projetos) | seus repositórios públicos do **GitHub** | idem |
| Link "no ar" na tabela | campo **Website** do repositório no GitHub, ou GitHub Pages ativo | idem |

### O que é manual (e onde mexer)
Quase tudo fica em **um arquivo só: [`site/assets/js/conteudo.js`](site/assets/js/conteudo.js)**. Cada parte tem um comentário explicando.

| Quero… | Onde | Como |
|---|---|---|
| adicionar um **artigo** | `conteudo.js` → `artigos` | copie um bloco, cole no topo e troque título, link, data e resumo |
| adicionar um **projeto em destaque** | `conteudo.js` → `projetos` | copie um bloco; `aoVivo` é o link do site publicado, `codigo` o do GitHub |
| registrar um **emprego, cargo ou curso novo** | `conteudo.js` → `carreira` | adicione no topo de `itens` da fase "Tecnologia"; tire o `atual: true` do cargo anterior |
| contar uma **curiosidade nova** | `conteudo.js` → `curiosidades` | um card com emoji, título e texto |
| adicionar um **marco pessoal** | `conteudo.js` → `linhaPessoal` | ano, título e texto (em ordem cronológica) |
| ligar o **Spotify** | `conteudo.js` → `spotify.workerUrl` | veja [`spotify-worker/README.md`](spotify-worker/README.md) |
| mudar textos fixos das páginas (títulos, apresentação, "como cheguei aqui", formação, contato) | o `.html` da página em `site/` | o português está no próprio HTML |
| mudar a **versão em inglês** desses textos fixos | [`site/assets/js/i18n-en.js`](site/assets/js/i18n-en.js) | mesma chave do atributo `data-i18n` no HTML |
| atualizar o **currículo em PDF** | [`curriculo/build.py`](curriculo/build.py) | edite e rode `python curriculo/build.py` no computador; depois faça commit dos PDFs em `site/cv/` |

> LinkedIn e Credly **não oferecem acesso público** ao histórico de trabalho e estudos, então cargo novo precisa ser adicionado em `carreira` (e no PDF).

### Esconder um repositório da tabela
Em [`scripts/fetch_data.py`](scripts/fetch_data.py), adicione o nome em `HIDDEN_REPOS`. Forks e repositórios arquivados já ficam de fora.

---

## Estrutura

```
site/                     ← o que é publicado em amanda.eng.br
  index.html              início (visão profissional)
  carreira.html  projetos.html  certificacoes.html  contato.html
  sobre.html              sobre mim (curiosidades pessoais)
  assets/js/conteudo.js   ★ conteúdo editável
  assets/js/i18n-en.js    textos fixos em inglês
  assets/js/main.js       lógica (normalmente não precisa mexer)
  data/*.json             badges e repositórios (gerados automaticamente)
  cv/*.pdf                currículos
curriculo/build.py        gera os PDFs
scripts/fetch_data.py     busca Credly e GitHub
spotify-worker/           "ouvindo agora" (Cloudflare Worker)
.github/workflows/        publicação automática
```

## Rodar localmente

```bash
python -m http.server 8765 --directory site
```

Abra http://localhost:8765.

## Publicação

- Este portfólio fica no seu próprio repositório, com *Settings → Pages → Source: **GitHub Actions*** e domínio `amanda.eng.br`.
- O primeiro site (2021) continua no repositório `Meu-Site`, publicado em https://amandagusmao.github.io/Meu-Site/.
