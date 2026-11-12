"""
Gera o SPOTIFY_REFRESH_TOKEN (só precisa rodar uma vez).

1. Crie um app em https://developer.spotify.com/dashboard
   - Redirect URI: http://127.0.0.1:8888/callback
   - API: Web API
2. Rode:  python spotify-worker/get_refresh_token.py
3. Cole Client ID e Client Secret quando pedir, autorize no navegador e copie o refresh token exibido.
"""
import base64
import getpass
import http.server
import json
import secrets
import urllib.parse
import urllib.request
import webbrowser

REDIRECT = "http://127.0.0.1:8888/callback"
SCOPES = "user-read-currently-playing user-read-recently-played"


def main() -> None:
    client_id = input("Client ID: ").strip()
    client_secret = getpass.getpass("Client Secret (não aparece ao digitar): ").strip()
    state = secrets.token_urlsafe(16)
    auth_url = "https://accounts.spotify.com/authorize?" + urllib.parse.urlencode({
        "client_id": client_id, "response_type": "code", "redirect_uri": REDIRECT,
        "scope": SCOPES, "state": state,
    })
    result = {}

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            ok = q.get("state", [""])[0] == state and "code" in q
            if ok:
                result["code"] = q["code"][0]
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            msg = "Pronto! Pode voltar para o terminal." if ok else "Algo deu errado. Tente de novo."
            self.wfile.write(f"<h2 style='font-family:sans-serif'>{msg}</h2>".encode())

        def log_message(self, *args):
            pass

    print("\nAbrindo o navegador para você autorizar...")
    webbrowser.open(auth_url)
    with http.server.HTTPServer(("127.0.0.1", 8888), Handler) as srv:
        while "code" not in result:
            srv.handle_request()

    basic = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    req = urllib.request.Request(
        "https://accounts.spotify.com/api/token",
        data=urllib.parse.urlencode({"grant_type": "authorization_code", "code": result["code"], "redirect_uri": REDIRECT}).encode(),
        headers={"Authorization": f"Basic {basic}", "Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(req) as r:
        token = json.loads(r.read())
    print("\nSPOTIFY_REFRESH_TOKEN =\n")
    print(token["refresh_token"])
    print("\nGuarde em segredo. Use no comando: npx wrangler secret put SPOTIFY_REFRESH_TOKEN")


if __name__ == "__main__":
    main()
