"""
Gera o currículo da Amanda Gusmão em PT e EN (HTML -> PDF via Edge/Chrome headless).

Uso:  python curriculo/build.py
Saída: curriculo/out/*.html, ../Curriculo_Amanda_Gusmao_PT.pdf, ../Resume_Amanda_Gusmao_EN.pdf
       e cópias em site/cv/ para download no portfólio.

Para atualizar o currículo, edite apenas o dicionário DATA abaixo e rode o script de novo.
"""
import html
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parent
OUT = ROOT / "out"
SITE_CV = PROJECT / "site" / "cv"

BROWSERS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
]

CONTACT = {
    "location": {"pt": "São Paulo, SP — Brasil", "en": "São Paulo, Brazil"},
    "phone": "+55 (11) 94489-1089",
    "email": "engamandagusmao@gmail.com",
    "site": "amanda.eng.br",
    "linkedin": "linkedin.com/in/gusmaoamanda",
    "github": "github.com/amandagusmao",
    "credly": "credly.com/users/amandagusmao",
}

DATA = {
    "pt": {
        "file": "Curriculo_Amanda_Gusmao_PT.pdf",
        "lang": "pt-BR",
        "title": "Software Engineer · Observabilidade & DevOps",
        "h": {
            "summary": "Resumo profissional",
            "experience": "Experiência profissional",
            "skills": "Competências técnicas",
            "certs": "Certificações e badges",
            "education": "Formação acadêmica",
            "projects": "Projetos",
            "pubs": "Publicações",
            "langs": "Idiomas",
            "previous": "Experiência anterior (Engenharia)",
        },
        "summary": (
            "Engenheira de software especializada em <b>observabilidade</b>, atuando desde 2022 no "
            "<b>Bradesco</b> na monitoração de sistemas e de jornadas críticas de negócio, como o PIX. "
            "Experiência prática com <b>Grafana</b> (Mimir, Loki, PromQL/LogQL), <b>OpenTelemetry</b>, "
            "<b>Dynatrace</b> e Datadog, e com práticas DevOps: CI/CD, infraestrutura como código, "
            "contêineres e Kubernetes/OpenShift. Pós-graduada em DevOps &amp; Continuous Software "
            "Engineering pela PUC Minas e engenheira civil e ambiental de formação, o que me trouxe um "
            "olhar analítico e orientado a processos. Autora de artigos no Bradesco Tech Blog sobre "
            "observabilidade e modernização de plataformas de monitoração."
        ),
        "jobs": [
            {
                "role": "Software Engineer I — Observabilidade &amp; DevOps",
                "org": "Banco Bradesco S.A.",
                "place": "São Paulo, SP",
                "period": "jan. 2025 — Atual",
                "bullets": [
                    "Atuo no time responsável pela plataforma de dashboards e monitoração de negócio, "
                    "acompanhando a saúde de jornadas críticas como o PIX, com análise de métricas, logs e traces.",
                    "Contribuo para a migração da plataforma legada de monitoração (DAM) para o "
                    "<b>Grafana</b>, com métricas emitidas pelas próprias aplicações via "
                    "<b>OpenTelemetry</b> e armazenadas no <b>Mimir</b> — eliminando coletores Kafka, "
                    "consolidações SQL e bancos intermediários que eram as principais fontes de incidentes.",
                    "Construo e evoluo dashboards e alertas, calibrando thresholds para reduzir falsos "
                    "positivos e aumentar a confiança nos indicadores.",
                    "Apoio times de negócio e o Command Center na modelagem de métricas e em boas "
                    "práticas de observabilidade, para que ganhem autonomia sobre suas próprias monitorações.",
                    "Exploro IA aplicada à observabilidade, como assistentes que geram dashboards a partir de linguagem natural.",
                ],
            },
            {
                "role": "Analista de Infraestrutura de TI Jr. — Observabilidade",
                "org": "Banco Bradesco S.A.",
                "place": "São Paulo, SP",
                "period": "jul. 2022 — jan. 2025",
                "bullets": [
                    "Detecção de problemas e melhoria contínua de painéis de monitoramento no time de observabilidade.",
                    "Análise contínua de dados de monitoração (Dynatrace, Grafana) para identificar gargalos e "
                    "sugerir soluções de performance, com registro e acompanhamento de incidentes no ServiceNow.",
                ],
            },
        ],
        "previous": [
            {
                "role": "Engenheira Civil e Ambiental (autônoma)",
                "org": "Amanda Gusmão Engenharia e Consultoria",
                "place": "São Paulo, SP",
                "period": "2021 — 2022",
                "text": "Consultoria própria: regularização de imóveis, laudos e vistorias, gerenciamento de obras, "
                "Cadastro Ambiental Rural (CAR) e assessoria em licenciamento ambiental.",
            },
            {
                "role": "Engenheira Civil",
                "org": "RCN Soluções Imobiliárias",
                "place": "São Paulo, SP",
                "period": "2020 — 2021",
                "text": "Coordenação do setor de engenharia, com foco em regularização de imóveis e licenciamento ambiental.",
            },
            {
                "role": "Agente de Organização Escolar",
                "org": "Secretaria da Educação do Estado de São Paulo",
                "place": "São Paulo, SP",
                "period": "2019 — 2020",
                "text": "Atendimento à comunidade escolar, apoio administrativo e organização de processos internos.",
            },
            {
                "role": "Estagiária em Engenharia Ambiental",
                "org": "Antares Engenharia e Consultoria Ambiental",
                "place": "Governador Valadares, MG",
                "period": "2015",
                "text": "Apoio no desenvolvimento de programas de passivo ambiental e em projetos de consultoria técnica.",
            },
            {
                "role": "Estagiária em Engenharia Civil",
                "org": "Construtora Cherem",
                "place": "Governador Valadares, MG",
                "period": "2014 — 2015",
                "text": "Execução de três residenciais do Minha Casa, Minha Vida: diário de obra, fichas de verificação "
                "de serviço (FVS), fiscalização no canteiro e organização dos processos de execução.",
            },
            {
                "role": "Estagiária em Engenharia",
                "org": "Universidade Vale do Rio Doce (SEPLAM)",
                "place": "Governador Valadares, MG",
                "period": "2014",
                "text": "Projetos em AutoCAD, regularização de ambientes da universidade e planilhas de planejamento.",
            },
            {
                "role": "Professora de Matemática (Ensino Fundamental)",
                "org": "E.E. Professora Ondina Pinto de Almeida",
                "place": "MG",
                "period": "2012",
                "text": "Docência de matemática para o ensino fundamental.",
            },
        ],
        "skills": [
            ("Observabilidade", "Grafana, Mimir, Prometheus/PromQL, Loki/LogQL, OpenTelemetry, Dynatrace, Datadog, dashboards e alertas"),
            ("DevOps &amp; Cloud", "Git/GitHub, GitHub Actions, CI/CD, Docker, Kubernetes, Red Hat OpenShift, Terraform, Ansible, Azure, GitOps"),
            ("Linguagens", "Python, JavaScript/TypeScript, SQL, HTML/CSS"),
            ("Práticas", "Gestão de incidentes (ServiceNow), análise de causa raiz, IA aplicada à observabilidade, testes automatizados, Scrum e Kanban"),
        ],
        "certs": [
            ("Grafana Labs", "Explorer Technical Practitioner · Trailblazer Technical Practitioner · PromQL Zero to Hero · LogQL Zero to Hero · Dashboard Design &amp; Visual Storytelling · Observability Signals Foundations · GROT Groundbreaker", "2025–2026"),
            ("Dynatrace", "Dynatrace Essentials", "2026"),
            ("Datadog", "Agent Observability: Metrics &amp; Traces Learning Path", "2026"),
            ("Red Hat", "OpenShift Administration I, II e III (DO180, DO280, DO380) · Python Programming with Red Hat (AD141)", "2025"),
            ("The Linux Foundation", "LFS148: Getting Started with OpenTelemetry · LFS169: Introduction to GitOps", "2025"),
        ],
        "education": [
            ("Pós-graduação em DevOps &amp; Continuous Software Engineering", "PUC Minas", "2024 — 2025"),
            ("Bootcamp de Desenvolvimento Front-End &amp; UX", "Laboratoria (turma SAP007)", "2022"),
            ("Licenciatura em Geociências e Educação Ambiental (não concluída)", "Universidade de São Paulo (USP)", "2021 — 2024"),
            ("Pós-graduação em Segurança do Trabalho e Gestão Ambiental", "Faveni", "2018 — 2019"),
            ("Graduação em Engenharia Civil e Engenharia Ambiental", "Universidade Vale do Rio Doce (UNIVALE)", "2012 — 2016"),
        ],
        "projects": [
            ("Grafana Chat Assistant", "Plugin de app para o Grafana (TypeScript/React) com assistente de IA que cria dashboards a partir de linguagem natural; backend Node.js integrado à API do Grafana e laboratório com OpenTelemetry Collector, Prometheus e Docker Compose."),
            ("Biblioteca Digital de Sobrália", "Sistema web para a biblioteca pública de Sobrália/MG: acervo, empréstimos com leitura de ISBN e QR Code pela câmera, cursos e carteirinha digital. TypeScript + Supabase, com custo de hospedagem zero."),
            ("Kubernetes &amp; IaC (PUC Minas)", "Aplicação Flask orquestrada em Kubernetes (Deployments, Services, HPA, PVC) e pipeline com Terraform, Ansible e GitHub Actions provisionando infraestrutura na Azure."),
        ],
        "pubs": [
            ("Do legado à autonomia: a jornada para o Grafana", "Bradesco Tech Blog · out. 2026"),
            ("A importância dos Dashboards no monitoramento e observabilidade de sistemas modernos", "Bradesco Tech Blog · ago. 2025"),
        ],
        "langs": "Português — nativo &nbsp;·&nbsp; Inglês — intermediário",
    },
    "en": {
        "file": "Resume_Amanda_Gusmao_EN.pdf",
        "lang": "en",
        "title": "Software Engineer · Observability & DevOps",
        "h": {
            "summary": "Summary",
            "experience": "Experience",
            "skills": "Technical skills",
            "certs": "Certifications & badges",
            "education": "Education",
            "projects": "Projects",
            "pubs": "Publications",
            "langs": "Languages",
            "previous": "Previous experience (Engineering)",
        },
        "summary": (
            "Software engineer specialized in <b>observability</b>, working at <b>Bradesco</b> — one of "
            "Brazil’s largest banks — since 2022, monitoring systems and business-critical journeys such "
            "as PIX instant payments. Hands-on experience with <b>Grafana</b> (Mimir, Loki, PromQL/LogQL), "
            "<b>OpenTelemetry</b>, <b>Dynatrace</b> and Datadog, plus DevOps practices: CI/CD, "
            "infrastructure as code, containers and Kubernetes/OpenShift. Postgraduate degree in DevOps "
            "&amp; Continuous Software Engineering (PUC Minas) and a background in civil and environmental "
            "engineering, which shaped an analytical, process-oriented mindset. Author of articles on "
            "observability and monitoring platform modernization at the Bradesco Tech Blog."
        ),
        "jobs": [
            {
                "role": "Software Engineer I — Observability &amp; DevOps",
                "org": "Banco Bradesco S.A.",
                "place": "São Paulo, Brazil",
                "period": "Jan 2025 — Present",
                "bullets": [
                    "Member of the team that owns the dashboard and business-monitoring platform, tracking the "
                    "health of critical journeys such as PIX instant payments through metrics, logs and traces.",
                    "Contributing to the migration from a legacy monitoring platform (DAM) to "
                    "<b>Grafana</b>, with metrics emitted by the applications themselves through "
                    "<b>OpenTelemetry</b> and stored in <b>Mimir</b> — removing the Kafka collectors, SQL "
                    "consolidation jobs and intermediate databases that caused most incidents.",
                    "Build and evolve dashboards and alerts, tuning thresholds to cut false positives "
                    "and restore trust in the indicators.",
                    "Support business teams and the Command Center with metric modeling and "
                    "observability best practices, so they can own their own monitoring.",
                    "Exploring AI applied to observability, such as assistants that build dashboards from natural language.",
                ],
            },
            {
                "role": "Junior IT Infrastructure Analyst — Observability",
                "org": "Banco Bradesco S.A.",
                "place": "São Paulo, Brazil",
                "period": "Jul 2022 — Jan 2025",
                "bullets": [
                    "Detected issues and continuously improved monitoring dashboards on the observability team.",
                    "Analyzed monitoring data (Dynatrace, Grafana) to find bottlenecks and suggest performance "
                    "fixes, logging and following up incidents in ServiceNow.",
                ],
            },
        ],
        "previous": [
            {
                "role": "Civil &amp; Environmental Engineer (self-employed)",
                "org": "Amanda Gusmão Engenharia e Consultoria",
                "place": "São Paulo, Brazil",
                "period": "2021 — 2022",
                "text": "Own consultancy: property regularization, technical reports and inspections, construction "
                "management, Rural Environmental Registry (CAR) and environmental licensing.",
            },
            {
                "role": "Civil Engineer",
                "org": "RCN Soluções Imobiliárias",
                "place": "São Paulo, Brazil",
                "period": "2020 — 2021",
                "text": "Led the engineering department, focused on property regularization and environmental licensing.",
            },
            {
                "role": "School Administration Agent",
                "org": "São Paulo State Department of Education",
                "place": "São Paulo, Brazil",
                "period": "2019 — 2020",
                "text": "Served the school community, provided administrative support and organized internal processes.",
            },
            {
                "role": "Environmental Engineering Intern",
                "org": "Antares Engenharia e Consultoria Ambiental",
                "place": "Governador Valadares, Brazil",
                "period": "2015",
                "text": "Supported environmental liability programs and technical consulting projects.",
            },
            {
                "role": "Civil Engineering Intern",
                "org": "Construtora Cherem",
                "place": "Governador Valadares, Brazil",
                "period": "2014 — 2015",
                "text": "Construction of three affordable-housing residential buildings: site logs, service inspection "
                "forms, on-site supervision and organization of execution processes.",
            },
            {
                "role": "Engineering Intern",
                "org": "Universidade Vale do Rio Doce (SEPLAM)",
                "place": "Governador Valadares, Brazil",
                "period": "2014",
                "text": "AutoCAD projects, regularization of university facilities and planning spreadsheets.",
            },
            {
                "role": "Middle School Math Teacher",
                "org": "E.E. Professora Ondina Pinto de Almeida",
                "place": "Brazil",
                "period": "2012",
                "text": "Taught mathematics to middle school students.",
            },
        ],
        "skills": [
            ("Observability", "Grafana, Mimir, Prometheus/PromQL, Loki/LogQL, OpenTelemetry, Dynatrace, Datadog, dashboards and alerting"),
            ("DevOps &amp; Cloud", "Git/GitHub, GitHub Actions, CI/CD, Docker, Kubernetes, Red Hat OpenShift, Terraform, Ansible, Azure, GitOps"),
            ("Languages", "Python, JavaScript/TypeScript, SQL, HTML/CSS"),
            ("Practices", "Incident management (ServiceNow), root cause analysis, AI applied to observability, automated testing, Scrum and Kanban"),
        ],
        "certs": [
            ("Grafana Labs", "Explorer Technical Practitioner · Trailblazer Technical Practitioner · PromQL Zero to Hero · LogQL Zero to Hero · Dashboard Design &amp; Visual Storytelling · Observability Signals Foundations · GROT Groundbreaker", "2025–2026"),
            ("Dynatrace", "Dynatrace Essentials", "2026"),
            ("Datadog", "Agent Observability: Metrics &amp; Traces Learning Path", "2026"),
            ("Red Hat", "OpenShift Administration I, II and III (DO180, DO280, DO380) · Python Programming with Red Hat (AD141)", "2025"),
            ("The Linux Foundation", "LFS148: Getting Started with OpenTelemetry · LFS169: Introduction to GitOps", "2025"),
        ],
        "education": [
            ("Postgraduate degree in DevOps &amp; Continuous Software Engineering", "PUC Minas", "2024 — 2025"),
            ("Front-End Development &amp; UX Bootcamp", "Laboratoria (SAP007 cohort)", "2022"),
            ("Teaching degree in Geosciences and Environmental Education (not completed)", "University of São Paulo (USP)", "2021 — 2024"),
            ("Postgraduate degree in Occupational Safety and Environmental Management", "Faveni", "2018 — 2019"),
            ("B.Eng. in Civil Engineering and Environmental Engineering", "Universidade Vale do Rio Doce (UNIVALE)", "2012 — 2016"),
        ],
        "projects": [
            ("Grafana Chat Assistant", "Grafana app plugin (TypeScript/React) with an AI assistant that builds dashboards from natural language; Node.js backend integrated with the Grafana API and a lab with OpenTelemetry Collector, Prometheus and Docker Compose."),
            ("Sobrália Digital Library", "Web system for the public library of Sobrália (MG, Brazil): catalog, loans with camera-based ISBN and QR code scanning, courses and digital library cards. TypeScript + Supabase, at zero hosting cost."),
            ("Kubernetes &amp; IaC (PUC Minas)", "Flask application orchestrated on Kubernetes (Deployments, Services, HPA, PVC) and a pipeline with Terraform, Ansible and GitHub Actions provisioning infrastructure on Azure."),
        ],
        "pubs": [
            ("From legacy to autonomy: the journey to Grafana", "Bradesco Tech Blog · Oct 2026 (in Portuguese)"),
            ("The importance of dashboards in monitoring and observability of modern systems", "Bradesco Tech Blog · Aug 2025 (in Portuguese)"),
        ],
        "langs": "Portuguese — native &nbsp;·&nbsp; English — intermediate",
    },
}

CSS = """
@page { size: A4; margin: 13mm 15mm 13mm 15mm; }
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --ink:#1d1d22; --muted:#5b5b66; --line:#e4e1e3; --accent:#b0175f; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: 'Nunito Sans', 'Segoe UI', Arial, sans-serif; color: var(--ink); font-size: 9.6pt; line-height: 1.45; }
header { display:flex; justify-content:space-between; align-items:flex-end; gap: 16px;
  padding-bottom: 10px; border-bottom: 2px solid var(--accent); margin-bottom: 4px; }
h1 { font-family: 'Nunito Sans', 'Segoe UI', sans-serif; font-size: 25pt; letter-spacing: -0.6px; line-height: 1.05; font-weight: 800; }
.title { color: var(--accent); font-weight: 600; font-size: 10.5pt; margin-top: 4px; }
.contact { text-align: right; font-size: 8.4pt; color: var(--muted); line-height: 1.55; }
.contact a { color: var(--ink); text-decoration: none; }
section { margin-top: 11px; }
h2 { font-family: 'Nunito Sans', 'Segoe UI', sans-serif; font-size: 9.2pt; text-transform: uppercase;
  letter-spacing: 1.3px; color: var(--accent); font-weight: 700; padding-bottom: 3px;
  border-bottom: 1px solid var(--line); margin-bottom: 6px; break-after: avoid; }
p.summary { text-align: justify; }
.job { break-inside: avoid; margin-bottom: 9px; }
.row { display:flex; justify-content:space-between; gap: 12px; align-items: baseline; }
.role { font-weight: 700; font-size: 10pt; }
.period { color: var(--muted); font-size: 8.6pt; white-space: nowrap; font-variant-numeric: tabular-nums; }
.org { color: var(--muted); font-size: 8.8pt; }
.org b { color: var(--ink); font-weight: 600; }
ul { margin: 4px 0 0 14px; }
li { margin-bottom: 2.5px; padding-left: 2px; }
li::marker { color: var(--accent); }
.prev { margin-bottom: 4px; break-inside: avoid; font-size: 9.2pt; }
.prev .text { color: var(--ink); }
table.kv { width:100%; border-collapse: collapse; }
table.kv td { vertical-align: top; padding: 2px 0; }
table.kv td.k { width: 128px; font-weight: 600; padding-right: 10px; }
table.kv td.y { width: 78px; padding-left: 12px; text-align: right; color: var(--muted); font-size: 8.6pt; white-space: nowrap; }
.edu { display:flex; justify-content:space-between; gap: 12px; padding: 1.5px 0; break-inside: avoid; }
.edu .n { font-weight: 600; }
.edu .s { color: var(--muted); }
.item { margin-bottom: 4px; break-inside: avoid; }
.item b { font-weight: 700; }
.two { display:grid; grid-template-columns: 1fr 1fr; gap: 0 22px; }
"""

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&'
         'display=swap" rel="stylesheet">')


def render(lang: str) -> str:
    d = DATA[lang]
    h = d["h"]
    c = CONTACT
    contact = (
        f'{c["location"][lang]} · {c["phone"]}<br>'
        f'<a href="mailto:{c["email"]}">{c["email"]}</a> · <a href="https://{c["site"]}">{c["site"]}</a><br>'
        f'<a href="https://www.{c["linkedin"]}">{c["linkedin"]}</a><br>'
        f'<a href="https://{c["github"]}">{c["github"]}</a> · <a href="https://www.{c["credly"]}">Credly</a>'
    )
    jobs = ""
    for j in d["jobs"]:
        bullets = "".join(f"<li>{b}</li>" for b in j["bullets"])
        jobs += (
            f'<div class="job"><div class="row"><span class="role">{j["role"]}</span>'
            f'<span class="period">{j["period"]}</span></div>'
            f'<div class="org"><b>{j["org"]}</b> · {j["place"]}</div><ul>{bullets}</ul></div>'
        )
    prev = "".join(
        f'<div class="prev"><div class="row"><span><b>{p["role"]}</b> <span class="org">· {p["org"]}, {p["place"]}</span></span>'
        f'<span class="period">{p["period"]}</span></div><div class="text">{p["text"]}</div></div>'
        for p in d["previous"]
    )
    skills = "".join(f'<tr><td class="k">{k}</td><td>{v}</td></tr>' for k, v in d["skills"])
    certs = "".join(f'<tr><td class="k">{k}</td><td>{v}</td><td class="y">{y}</td></tr>' for k, v, y in d["certs"])
    edu = "".join(
        f'<div class="edu"><div><span class="n">{n}</span> <span class="s">— {s}</span></div><span class="period">{y}</span></div>'
        for n, s, y in d["education"]
    )
    projects = "".join(f'<div class="item"><b>{n}.</b> {t}</div>' for n, t in d["projects"])
    pubs = "".join(f'<div class="item"><b>“{n}”</b> <span class="org">— {s}</span></div>' for n, s in d["pubs"])

    return f"""<!doctype html>
<html lang="{d['lang']}"><head><meta charset="utf-8">
<title>Amanda Gusmão — {html.escape(d['title'])}</title>{FONTS}<style>{CSS}</style></head>
<body>
<header>
  <div><h1>Amanda Ferreira Gusmão</h1><div class="title">{html.escape(d['title'])}</div></div>
  <div class="contact">{contact}</div>
</header>
<section><h2>{h['summary']}</h2><p class="summary">{d['summary']}</p></section>
<section><h2>{h['experience']}</h2>{jobs}</section>
<section><h2>{h['skills']}</h2><table class="kv">{skills}</table></section>
<section><h2>{h['certs']}</h2><table class="kv">{certs}</table></section>
<section><h2>{h['education']}</h2>{edu}</section>
<section><h2>{h['projects']}</h2>{projects}</section>
<section><h2>{h['pubs']}</h2>{pubs}</section>
<section><h2>{h['previous']}</h2>{prev}</section>
<section><h2>{h['langs']}</h2><p>{d['langs']}</p></section>
</body></html>"""


def to_pdf(src: Path, dst: Path) -> None:
    browser = next((b for b in BROWSERS if Path(b).exists()), None)
    if not browser:
        raise SystemExit("Edge/Chrome não encontrado para gerar o PDF.")
    subprocess.run(
        [browser, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
         "--virtual-time-budget=8000", f"--print-to-pdf={dst}", src.as_uri()],
        check=True, capture_output=True, timeout=120,
    )


def main() -> None:
    OUT.mkdir(exist_ok=True)
    SITE_CV.mkdir(parents=True, exist_ok=True)
    for lang, d in DATA.items():
        src = OUT / f"cv-{lang}.html"
        src.write_text(render(lang), encoding="utf-8")
        pdf = PROJECT / d["file"]
        to_pdf(src, pdf)
        shutil.copy2(pdf, SITE_CV / d["file"])
        print("ok:", pdf)


if __name__ == "__main__":
    main()
