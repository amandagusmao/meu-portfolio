# Spotify "ouvindo agora"

Um Cloudflare Worker pequeno que lê a música que você está ouvindo (ou a última que ouviu) e entrega para o painel ♫ da página **Sobre mim**.
É preciso esse "intermediário" porque a API do Spotify exige uma chave secreta, que não pode ficar no código do site.
Custo: zero (plano gratuito do Cloudflare Workers).

## Passo a passo (uma vez só, ~10 minutos)

### 1. Criar o app no Spotify
1. Entre em <https://developer.spotify.com/dashboard> com a sua conta do Spotify e aceite os termos de desenvolvedor, se pedir.
2. Clique em **Create app** e preencha:
   - **App name:** `amanda.eng.br`
   - **App description:** `Ouvindo agora no meu portfólio`
   - **Redirect URI:** `http://127.0.0.1:8888/callback` (clique em **Add**)
   - Em *Which API/SDKs are you planning to use?*, marque **Web API**
3. Salve. Na página do app, abra **Settings** e copie o **Client ID** e o **Client secret** (*View client secret*).

### 2. Gerar o "refresh token"
No terminal, dentro da pasta do projeto:

```bash
python spotify-worker/get_refresh_token.py
```

Cole o Client ID e o Client secret quando pedir. O navegador abre: clique em **Concordo/Agree**.
O terminal mostra o `SPOTIFY_REFRESH_TOKEN`. Copie (é um segredo: não envie para ninguém e não coloque no código).

### 3. Publicar o Worker no Cloudflare
Ainda no terminal (precisa do Node.js, que você já tem):

```bash
cd spotify-worker
npx wrangler login
```

O navegador abre para você entrar na sua conta do Cloudflare e autorizar. Depois, um comando por vez, colando o valor quando pedir:

```bash
npx wrangler secret put SPOTIFY_CLIENT_ID
npx wrangler secret put SPOTIFY_CLIENT_SECRET
npx wrangler secret put SPOTIFY_REFRESH_TOKEN
npx wrangler deploy
```

O último comando mostra uma URL parecida com `https://spotify-now-playing.SEU-USUARIO.workers.dev`.
Abra essa URL no navegador: se aparecer algo como `{"playing":true,"title":"..."}`, está funcionando.

### 4. Ligar no site
No GitHub, abra `site/assets/js/conteudo.js`, clique no lápis ✏️ e preencha:

```js
spotify: {
  workerUrl: 'https://spotify-now-playing.SEU-USUARIO.workers.dev',
```

Clique em **Commit changes**. Em ~1 minuto, o painel da página Sobre mim mostra a capa, a música e o equalizador animado
quando você estiver ouvindo, ou a última música que tocou.

## Problemas comuns
- **`INVALID_CLIENT: Invalid redirect URI`**: confira se o Redirect URI no app é exatamente `http://127.0.0.1:8888/callback`.
- **O painel continua em "trilha sonora da vida"**: abra a URL do Worker direto no navegador para ver a resposta; confira se `workerUrl` foi salvo sem espaço extra.
- **Testar localmente**: o Worker já aceita `http://localhost:8765` (veja `ALLOWED_ORIGINS` em `wrangler.toml`).
