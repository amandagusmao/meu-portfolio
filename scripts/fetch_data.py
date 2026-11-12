"""
Atualiza os dados dinâmicos do portfólio:
  - site/data/badges.json  ← badges públicos do Credly (+ imagens em site/assets/badges/)
  - site/data/repos.json   ← repositórios públicos do GitHub

Roda automaticamente no GitHub Actions (todo dia e a cada push) e também localmente:
    python scripts/fetch_data.py

Se uma das fontes falhar, o arquivo anterior é mantido, e o site continua funcionando.
"""
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

CREDLY_USER = "amandagusmao"
GITHUB_USER = "amandagusmao"

# Aparecem todos os repositórios públicos que são seus (forks e arquivados ficam de fora).
# Para esconder algum, coloque o nome aqui:
HIDDEN_REPOS = {
    "amandagusmao",            # README do perfil do GitHub
    "amandagusmao.github.io",  # repositório de teste
}

# Projetos publicados fora do GitHub Pages (o ideal é preencher o campo "Website" do repositório no GitHub).
HOMEPAGES = {"biblioteca-sobralia": "https://biblioteca-sobralia.pages.dev"}

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "site" / "data"
BADGE_DIR = ROOT / "site" / "assets" / "badges"
UA = {"User-Agent": "amanda-eng-br-portfolio (+https://amanda.eng.br)"}


def get(url: str, headers: dict | None = None) -> bytes:
    req = urllib.request.Request(url, headers={**UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def save_json(path: Path, payload) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def resize_png(raw: bytes, size: int = 160) -> bytes:
    """Reduz a imagem se o Pillow estiver disponível (no Actions está); senão salva original."""
    try:
        from io import BytesIO
        from PIL import Image
    except ImportError:
        return raw
    im = Image.open(BytesIO(raw)).convert("RGBA")
    im.thumbnail((size, size), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas.paste(im, ((size - im.width) // 2, (size - im.height) // 2), im)
    out = BytesIO()
    canvas.save(out, "PNG", optimize=True)
    return out.getvalue()


def fetch_badges() -> int:
    raw = json.loads(get(f"https://www.credly.com/users/{CREDLY_USER}/badges.json?page=1&per_page=100"))
    BADGE_DIR.mkdir(parents=True, exist_ok=True)
    badges = []
    for b in raw.get("data", []):
        t = b["badge_template"]
        issuer = ""
        if isinstance(t.get("issuer"), dict):
            issuer = (t["issuer"].get("summary") or "").replace("issued by ", "")
        img = BADGE_DIR / f"{b['id']}.png"
        if not img.exists():
            img.write_bytes(resize_png(get(t["image_url"])))
        badges.append({
            "id": b["id"],
            "name": t["name"],
            "issuer": issuer,
            "issued": b.get("issued_at_date"),
            "image": f"assets/badges/{b['id']}.png",
            "url": f"https://www.credly.com/badges/{b['id']}/public_url",
        })
    badges.sort(key=lambda x: x["issued"] or "", reverse=True)
    save_json(DATA / "badges.json", {
        "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "profile": f"https://www.credly.com/users/{CREDLY_USER}",
        "badges": badges,
    })
    return len(badges)


def fetch_repos() -> int:
    headers = {"Accept": "application/vnd.github+json"}
    if os.getenv("GITHUB_TOKEN"):
        headers["Authorization"] = f"Bearer {os.environ['GITHUB_TOKEN']}"
    raw = json.loads(get(f"https://api.github.com/users/{GITHUB_USER}/repos?per_page=100&sort=pushed", headers))
    repos = [
        {
            "name": r["name"],
            "description": r["description"] or "",
            "language": r["language"],
            "url": r["html_url"],
            "homepage": r["homepage"] or HOMEPAGES.get(r["name"]) or (f"https://{GITHUB_USER}.github.io/{r['name']}/" if r["has_pages"] else ""),
            "stars": r["stargazers_count"],
            "pushed": r["pushed_at"],
        }
        for r in raw
        if not r["fork"] and not r["archived"] and r["name"] not in HIDDEN_REPOS
    ]
    save_json(DATA / "repos.json", {
        "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "profile": f"https://github.com/{GITHUB_USER}",
        "repos": repos,
    })
    return len(repos)


def main() -> int:
    failures = 0
    for name, fn in (("credly", fetch_badges), ("github", fetch_repos)):
        try:
            print(f"{name}: {fn()} itens")
        except Exception as exc:  # mantém o arquivo anterior
            failures += 1
            print(f"{name}: falhou ({exc}); mantendo dados anteriores", file=sys.stderr)
    return 0 if failures < 2 else 1


if __name__ == "__main__":
    sys.exit(main())
