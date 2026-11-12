"""
Configura o "ouvindo agora" do Spotify de ponta a ponta (rode uma vez):

    python spotify-worker/setup.py

O que ele faz:
  1. confere o login no Cloudflare (abre o navegador se precisar);
  2. publica o Worker (spotify-now-playing);
  3. pede o Client ID e o Client Secret do seu app do Spotify e abre a autorização no navegador;
  4. guarda as três chaves como segredos no Cloudflare, sem mostrar nenhuma na tela;
  5. testa o Worker e grava a URL em site/assets/js/conteudo.js.
"""
import base64
import getpass
import http.server
import json
import re
import secrets
import shutil
import subprocess
import sys
import urllib.parse
import urllib.request
import webbrowser
from pathlib import Path

HERE = Path(__file__).resolve().parent
CONTEUDO = HERE.parent / "site" / "assets" / "js" / "conteudo.js"
REDIRECT = "http://127.0.0.1:8888/callback"
SCOPES = "user-read-currently-playing user-read-recently-played"
NPX = shutil.which("npx") or shutil.which("npx.cmd")


def step(n, msg):
    print(f"\n\033[95m[{n}/5]\033[0m {msg}")


def wrangler(*args, **kw):
    if kw.get("text"):  # a saída do Wrangler tem emojis/acentos: força UTF-8 no Windows
        kw.setdefault("encoding", "utf-8")
        kw.setdefault("errors", "replace")
    return subprocess.run([NPX, "--yes", "wrangler", *args], cwd=HERE, **kw)


def ensure_login():
    r = wrangler("whoami", capture_output=True, text=True)
    if "not authenticated" in ((r.stdout or "") + (r.stderr or "")).lower() or r.returncode != 0:
        print("Abrindo o navegador para você entrar no Cloudflare e autorizar o Wrangler...")
        if wrangler("login").returncode != 0:
            sys.exit("Não foi possível entrar no Cloudflare. Rode o script de novo.")
    else:
        conta = re.search(r"associated with the email (\S+)", r.stdout)
        print("Já conectada ao Cloudflare" + (f" ({conta.group(1)})" if conta else "") + ".")


def clipboard():
    """Lê a área de transferência do Windows (sem mostrar o conteúdo)."""
    try:
        r = subprocess.run(["powershell", "-NoProfile", "-Command", "Get-Clipboard"],
                           capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=10)
        return (r.stdout or "").strip()
    except Exception:
        return ""


def ask_key(name, secret):
    """Pede uma chave do Spotify: copie no site e aperte Enter (ou cole/digite)."""
    while True:
        print(f"\n  Copie o {name} na página do app no Spotify e aperte Enter aqui.")
        typed = (getpass.getpass if secret else input)(f"  (ou cole/digite o {name} e aperte Enter): ").strip()
        value = typed or clipboard()
        if re.fullmatch(r"[0-9a-f]{32}", value):
            shown = "•" * 12 + " (guardado em segredo)" if secret else value
            print(f"  ✓ {name} recebido: {shown}")
            return value
        print(f"  ✗ Isso não parece um {name} (são 32 letras/números). Copie de novo e aperte Enter.")


def refresh_token(client_id, client_secret):
    state = secrets.token_urlsafe(16)
    url = "https://accounts.spotify.com/authorize?" + urllib.parse.urlencode({
        "client_id": client_id, "response_type": "code", "redirect_uri": REDIRECT, "scope": SCOPES, "state": state})
    result = {}

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            ok = q.get("state", [""])[0] == state and "code" in q
            if ok:
                result["code"] = q["code"][0]
            elif "error" in q:
                result["error"] = q["error"][0]
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            msg = "Pronto! Pode voltar para o terminal. 🖤" if ok else "Algo deu errado. Volte ao terminal."
            self.wfile.write(f"<body style='background:#09080d;color:#ff9ccb;font:24px sans-serif;display:grid;place-items:center;height:90vh'>{msg}</body>".encode())

        def log_message(self, *a):
            pass

    print("Abrindo o navegador para você autorizar o app no Spotify...")
    webbrowser.open(url)
    with http.server.HTTPServer(("127.0.0.1", 8888), Handler) as srv:
        while "code" not in result and "error" not in result:
            srv.handle_request()
    if "error" in result:
        sys.exit(f"O Spotify recusou a autorização ({result['error']}).")
    basic = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    req = urllib.request.Request(
        "https://accounts.spotify.com/api/token",
        data=urllib.parse.urlencode({"grant_type": "authorization_code", "code": result["code"], "redirect_uri": REDIRECT}).encode(),
        headers={"Authorization": f"Basic {basic}", "Content-Type": "application/x-www-form-urlencoded"})
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())["refresh_token"]
    except urllib.error.HTTPError as e:
        sys.exit(f"Erro ao gerar o token ({e.code}). Confira o Client ID, o Client Secret e o Redirect URI do app.")


def put_secret(name, value):
    r = wrangler("secret", "put", name, input=value + "\n", capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"Falhou ao salvar {name} no Cloudflare:\n{r.stderr[-800:]}")
    print(f"  ✓ {name} salvo no Cloudflare")


def main():
    if not NPX:
        sys.exit("Não encontrei o npx. Instale o Node.js (https://nodejs.org) e rode de novo.")

    step(1, "Login no Cloudflare")
    ensure_login()

    step(2, "Publicando o Worker (se perguntar sobre o subdomínio workers.dev, aceite e escolha um nome)")
    if wrangler("deploy").returncode != 0:
        sys.exit("O deploy falhou. Leia a mensagem acima e rode o script de novo.")

    step(3, "Chaves do seu app no Spotify (developer.spotify.com → seu app → Settings)")
    client_id = ask_key("Client ID", secret=False)
    client_secret = ask_key("Client Secret", secret=True)
    token = refresh_token(client_id, client_secret)

    step(4, "Guardando as chaves como segredos no Cloudflare")
    put_secret("SPOTIFY_CLIENT_ID", client_id)
    put_secret("SPOTIFY_CLIENT_SECRET", client_secret)
    put_secret("SPOTIFY_REFRESH_TOKEN", token)

    step(5, "Testando e ligando no site")
    url = input("  Cole a URL do Worker que apareceu no passo 2 (termina em .workers.dev): ").strip().rstrip("/")
    try:
        req = urllib.request.Request(url, headers={"Origin": "https://amanda.eng.br", "User-Agent": "setup"})
        data = json.loads(urllib.request.urlopen(req, timeout=20).read())
        if data.get("title"):
            print(f"  ✓ Funcionando: {'ouvindo agora' if data.get('playing') else 'última música'}: {data['title']} · {data.get('artist', '')}")
        else:
            print(f"  ⚠ O Worker respondeu, mas sem música ainda: {data}. Toque algo no Spotify e teste de novo.")
    except Exception as e:
        print(f"  ⚠ Não consegui testar agora ({e}). Confira a URL.")
    s = CONTEUDO.read_text(encoding="utf-8")
    s2 = re.sub(r"workerUrl:\s*'[^']*'", f"workerUrl: '{url}'", s, count=1)
    CONTEUDO.write_text(s2, encoding="utf-8")
    print(f"  ✓ URL gravada em {CONTEUDO.relative_to(HERE.parent)}")
    print("\nTudo pronto! Agora é só publicar o site (commit + push). 🦇🎸")


if __name__ == "__main__":
    main()
