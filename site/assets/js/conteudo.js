/* =====================================================================
   CONTEÚDO DO SITE: é aqui que você edita o que aparece nas páginas.
   =====================================================================

   Como funciona:
   - Cada item é um bloco { ... } separado por vírgula.
   - Textos com { pt: '...', en: '...' } aparecem no idioma escolhido.
     Se não quiser traduzir, pode escrever só o texto: 'Meu texto'.
   - Dá para usar <strong>negrito</strong> nos textos.
   - Para adicionar algo novo, copie um bloco parecido, cole e altere.
   - Depois de salvar e enviar (commit/push), o site atualiza sozinho em ~1 minuto.

   O que é automático (não precisa mexer aqui):
   - badges do Credly e a tabela de repositórios do GitHub (atualizam todo dia).
*/

window.CONTEUDO = {

  /* ---------------------------------------------------------------
     SPOTIFY: "ouvindo agora" na página Sobre mim.
     Preencha com a URL do Cloudflare Worker (veja spotify-worker/README.md).
     Enquanto estiver vazio, o painel mostra a trilha sonora padrão abaixo.
  --------------------------------------------------------------- */
  spotify: {
    workerUrl: 'https://spotify-now-playing.amandagusmao.workers.dev',
    perfil: 'https://open.spotify.com/user/amandahjt',
    padrao: { musica: 'Paramore', artista: { pt: 'banda favorita desde 2007', en: 'favorite band since 2007' } }
  },

  /* ---------------------------------------------------------------
     ARTIGOS: aparecem no Início, do mais novo para o mais antigo.
  --------------------------------------------------------------- */
  artigos: [
    {
      titulo: 'Do legado à autonomia: a jornada para o Grafana',
      url: 'https://bradesco.io/bradesco-tech-blog/busca?shareid=143',
      onde: 'Bradesco Tech Blog',
      data: { pt: 'out 2026', en: 'Oct 2026' },
      resumo: {
        pt: 'Por que uma cadeia longa de coletores, filas e bancos intermediários virou fonte de incidentes, e como métricas geradas na origem devolvem confiabilidade e autonomia aos times.',
        en: 'Why a long chain of collectors, queues and intermediate databases became a source of incidents, and how metrics generated at the source bring back reliability and team autonomy. (in Portuguese)'
      }
    },
    {
      titulo: 'A importância dos Dashboards no monitoramento e observabilidade de sistemas modernos',
      url: 'https://bradesco.io/bradesco-tech-blog/busca?shareid=28',
      onde: 'Bradesco Tech Blog',
      data: { pt: 'ago 2025', en: 'Aug 2025' },
      resumo: {
        pt: 'Métricas, logs e traces, como correlacioná-los e o que faz um dashboard ser realmente útil.',
        en: 'Metrics, logs and traces, how to correlate them and what makes a dashboard truly useful. (in Portuguese)'
      }
    }
  ],

  /* ---------------------------------------------------------------
     PROJETOS EM DESTAQUE: cards da página Projetos (em ordem).
     A tabela "todos os repositórios" logo abaixo é automática.
     Campos opcionais: aoVivo, codigo, imagem, selo, links.
  --------------------------------------------------------------- */
  projetos: [
    {
      titulo: { pt: 'Biblioteca Digital de Sobrália', en: 'Sobrália Digital Library' },
      info: '2026 · TypeScript · Supabase',
      selo: { texto: { pt: 'no ar', en: 'live' }, cor: 'mint', aoVivo: true },
      descricao: {
        pt: 'Sistema web para a biblioteca pública de Sobrália/MG: acervo, empréstimos com leitura de ISBN e QR Code pela câmera, cursos de informática, carteirinha digital e avisos automáticos de atraso. Tudo em serviços gratuitos, com custo zero para a prefeitura.',
        en: 'A web system for the public library of Sobrália (MG, Brazil): catalog, loans with camera-based ISBN and QR code scanning, computer courses, digital library cards and automatic overdue reminders. Built on free tiers, at zero cost for the city.'
      },
      tags: ['TypeScript', 'Supabase', 'Cloudflare Pages', { pt: 'impacto social', en: 'social impact' }],
      aoVivo: 'https://biblioteca-sobralia.pages.dev',
      codigo: 'https://github.com/amandagusmao/biblioteca-sobralia',
      destaque: true
    },
    {
      titulo: 'Grafana Chat Assistant',
      info: '2026 · TypeScript · React · Node.js',
      selo: { texto: 'AI', cor: 'pink' },
      descricao: {
        pt: 'Plugin de app para o Grafana com um assistente de IA que cria dashboards a partir de linguagem natural. O backend em Node.js conversa com a API do Grafana, e o repositório traz um laboratório completo com OpenTelemetry Collector, Prometheus e Docker Compose.',
        en: 'A Grafana app plugin with an AI assistant that builds dashboards from natural language. The Node.js backend talks to the Grafana API, and the repo ships a full lab with OpenTelemetry Collector, Prometheus and Docker Compose.'
      },
      tags: ['Grafana plugin', 'OpenTelemetry', 'Prometheus', 'LLM'],
      codigo: 'https://github.com/amandagusmao/grafana-chat-box',
      destaque: true
    },
    {
      titulo: { pt: 'Meu primeiro site', en: 'My first website' },
      info: '2021 · HTML · CSS',
      selo: { texto: { pt: 'onde tudo começou', en: 'where it all began' }, cor: 'mint' },
      imagem: 'assets/img/primeiro-site.jpg',
      descricao: {
        pt: 'Feito para a minha mini empresa de engenharia, quando eu ainda não sabia nada de TI. Ele continua no ar, do jeitinho que eu fiz, guardado com muito carinho.',
        en: 'Built for my small engineering firm, back when I knew nothing about IT. It’s still online, exactly the way I made it, kept with a lot of love.'
      },
      aoVivo: 'https://amandagusmao.github.io/Meu-Site/',
      codigo: 'https://github.com/amandagusmao/Meu-Site',
      primeiro: true
    },
    {
      titulo: { pt: 'Projetos do bootcamp Laboratoria', en: 'Laboratoria bootcamp projects' },
      info: '2022 · JavaScript',
      descricao: {
        pt: 'Meus primeiros passos programando de verdade: projetos front-end em equipe, com foco em UX, testes unitários e boas práticas.',
        en: 'My first real steps in programming: team front-end projects focused on UX, unit testing and good practices.'
      },
      links: [
        { nome: 'Cipher', obs: { pt: 'cifra de César', en: 'Caesar cipher' }, url: 'https://amandagusmao.github.io/Project_Cipher/', aoVivo: true },
        { nome: 'Data Lovers', obs: { pt: 'visualização de dados', en: 'data visualization' }, url: 'https://cahaguiar.github.io/SAP007-data-lovers/', aoVivo: true },
        { nome: 'Social Network', obs: { pt: 'rede social', en: 'social network' }, url: 'https://aragaolala.github.io/SAP007-social-network/', aoVivo: true },
        { nome: 'Burger Queen', obs: { pt: 'código', en: 'code' }, url: 'https://github.com/amandagusmao/SAP007-burger-queen-api-client' }
      ]
    },
    {
      titulo: { pt: 'Guess Game no Kubernetes', en: 'Guess Game on Kubernetes' },
      info: '2024 · PUC Minas',
      descricao: {
        pt: 'Aplicação Flask com frontend e banco de dados orquestrados em Kubernetes, com Deployments, Services, autoscaling (HPA) e volumes persistentes.',
        en: 'A Flask app with frontend and database orchestrated on Kubernetes, using Deployments, Services, autoscaling (HPA) and persistent volumes.'
      },
      tags: ['Kubernetes', 'Docker', 'Flask', 'HPA'],
      codigo: 'https://github.com/amandagusmao/guess_game'
    },
    {
      titulo: { pt: 'Pipeline de IaC na Azure', en: 'IaC pipeline on Azure' },
      info: '2024 · PUC Minas',
      descricao: {
        pt: 'Pipeline de CI/CD que provisiona rede e máquina virtual na Azure com Terraform, configura o servidor com Ansible e orquestra tudo com GitHub Actions.',
        en: 'A CI/CD pipeline that provisions networking and a virtual machine on Azure with Terraform, configures the server with Ansible and orchestrates it all with GitHub Actions.'
      },
      tags: ['Terraform', 'Ansible', 'GitHub Actions', 'Azure'],
      codigo: 'https://github.com/amandagusmao/projeto_final06'
    }
  ],

  /* ---------------------------------------------------------------
     CARREIRA: linha do tempo da página Carreira, dividida em fases.
     Para um emprego novo, adicione um item no topo de "itens" da fase.
     Cores (tipo): 'tech' rosa · 'eng' lilás · 'edu' amarelo · 'study' verde.
     atual: true  → marca com o selo "atual".
  --------------------------------------------------------------- */
  carreira: [
    {
      tipo: 'tech', anos: { pt: '2021 — hoje', en: '2021 — today' }, nome: { pt: 'Tecnologia', en: 'Technology' },
      nota: { pt: 'Observabilidade, DevOps e dados de negócio.', en: 'Observability, DevOps and business data.' },
      itens: [
        {
          tipo: 'tech', atual: true, quando: { pt: 'jan 2025 — agora', en: 'Jan 2025 — now' },
          titulo: 'Software Engineer I', onde: { pt: 'Banco Bradesco · Observabilidade & DevOps', en: 'Banco Bradesco · Observability & DevOps' },
          topicos: {
            pt: ['Atuo no time responsável pela plataforma de dashboards e monitoração de negócio, acompanhando a saúde de jornadas críticas como o PIX com métricas, logs e traces.',
                 'Participo da migração da plataforma legada (DAM) para o <strong>Grafana</strong>, com métricas emitidas pelas próprias aplicações via <strong>OpenTelemetry</strong> e armazenadas no <strong>Mimir</strong>.',
                 'Construo dashboards e alertas, calibrando thresholds para reduzir falsos positivos, e apoio times de negócio e o Command Center a ganhar autonomia sobre as próprias monitorações.'],
            en: ['Member of the team that owns the dashboard and business-monitoring platform, tracking critical journeys such as PIX instant payments through metrics, logs and traces.',
                 'Part of the migration from a legacy platform (DAM) to <strong>Grafana</strong>, with metrics emitted by the applications through <strong>OpenTelemetry</strong> and stored in <strong>Mimir</strong>.',
                 'Build dashboards and alerts, tuning thresholds to cut false positives, and help business teams and the Command Center own their monitoring.']
          },
          tags: ['Grafana', 'Mimir', 'OpenTelemetry', 'PromQL', 'Dynatrace']
        },
        {
          tipo: 'tech', quando: '2025 — 2026', titulo: { pt: 'Autora no Bradesco Tech Blog', en: 'Author at the Bradesco Tech Blog' },
          texto: { pt: 'Dois artigos sobre observabilidade: a importância dos dashboards (2025) e a jornada do legado para o Grafana (2026).', en: 'Two articles on observability: why dashboards matter (2025) and the journey from legacy to Grafana (2026).' }
        },
        {
          tipo: 'study', quando: '2024 — 2025', titulo: { pt: 'Pós-graduação em DevOps & Continuous Software Engineering', en: 'Postgraduate degree in DevOps & Continuous Software Engineering' }, onde: 'PUC Minas',
          texto: { pt: 'Escolhida depois de entender, no dia a dia do Bradesco, que meu lugar era infraestrutura e observabilidade.', en: 'Chosen after realizing, day to day at Bradesco, that my place was infrastructure and observability.' }
        },
        {
          tipo: 'tech', quando: { pt: 'jul 2022 — jan 2025', en: 'Jul 2022 — Jan 2025' }, titulo: { pt: 'Analista de Infraestrutura de TI Jr.', en: 'Junior IT Infrastructure Analyst' },
          onde: { pt: 'Banco Bradesco · Observabilidade', en: 'Banco Bradesco · Observability' },
          texto: { pt: 'Detecção de problemas e melhoria contínua de painéis de monitoramento, com análise de dados para encontrar gargalos e sugerir soluções de performance.', en: 'Detected issues and continuously improved monitoring dashboards, analyzing data to find bottlenecks and suggest performance fixes.' },
          tags: ['Dynatrace', 'Grafana', 'ServiceNow']
        },
        {
          tipo: 'study', quando: '2021 — 2022', titulo: { pt: 'Bootcamp de Desenvolvimento Front-End & UX', en: 'Front-End Development & UX Bootcamp' }, onde: 'Laboratoria',
          texto: { pt: 'Processo seletivo em 2021, por incentivo do meu marido, desenvolvedor front-end. JavaScript, HTML, CSS, testes e muito trabalho em equipe.', en: 'Applied in 2021, encouraged by my husband, a front-end developer. JavaScript, HTML, CSS, testing and lots of teamwork.' }
        }
      ]
    },
    {
      tipo: 'eng', anos: '2014 — 2022', nome: { pt: 'Engenharia', en: 'Engineering' },
      nota: { pt: 'Obras, regularização de imóveis e licenciamento ambiental.', en: 'Construction, property regularization and environmental licensing.' },
      itens: [
        { tipo: 'eng', quando: { pt: 'abr 2021 — jan 2022', en: 'Apr 2021 — Jan 2022' }, titulo: { pt: 'Engenheira civil e ambiental (autônoma)', en: 'Civil & environmental engineer (self-employed)' }, onde: 'Amanda Gusmão Engenharia e Consultoria',
          texto: { pt: 'Minha mini empresa: regularização de imóveis, laudos, vistorias, gerenciamento de obras, CAR e licenciamento ambiental. Foi para ela que eu criei meu primeiro site.', en: 'My own small firm: property regularization, technical reports, inspections, construction management and environmental licensing. It’s the reason I built my first website.' } },
        { tipo: 'eng', quando: { pt: 'fev 2020 — mar 2021', en: 'Feb 2020 — Mar 2021' }, titulo: { pt: 'Engenheira civil', en: 'Civil engineer' }, onde: 'RCN Soluções Imobiliárias',
          texto: { pt: 'Coordenação do setor de engenharia, com foco em regularização de imóveis e licenciamento ambiental.', en: 'Led the engineering department, focused on property regularization and environmental licensing.' } },
        { tipo: 'edu', quando: { pt: 'jul 2019 — fev 2020', en: 'Jul 2019 — Feb 2020' }, titulo: { pt: 'Agente de Organização Escolar', en: 'School administration agent' }, onde: { pt: 'Secretaria da Educação do Estado de São Paulo', en: 'São Paulo State Department of Education' },
          texto: { pt: 'Atendimento à comunidade escolar, apoio administrativo e organização de processos internos.', en: 'Served the school community, provided administrative support and organized internal processes.' } },
        { tipo: 'study', quando: '2018 — 2019', titulo: { pt: 'Pós-graduação em Segurança do Trabalho e Gestão Ambiental', en: 'Postgraduate degree in Occupational Safety and Environmental Management' }, onde: 'Faveni' },
        { tipo: 'eng', quando: { pt: 'set — dez 2015', en: 'Sep — Dec 2015' }, titulo: { pt: 'Estagiária em engenharia ambiental', en: 'Environmental engineering intern' }, onde: 'Antares Engenharia e Consultoria Ambiental',
          texto: { pt: 'Programas de passivo ambiental e consultoria técnica.', en: 'Environmental liability programs and technical consulting.' } },
        { tipo: 'eng', quando: { pt: 'ago 2014 — abr 2015', en: 'Aug 2014 — Apr 2015' }, titulo: { pt: 'Estagiária em engenharia civil', en: 'Civil engineering intern' }, onde: 'Construtora Cherem',
          texto: { pt: 'Três residenciais do Minha Casa, Minha Vida: diário de obra, fichas de verificação de serviço e fiscalização no canteiro.', en: 'Three affordable-housing buildings: site logs, service inspection forms and on-site supervision.' } },
        { tipo: 'eng', quando: { pt: 'abr — ago 2014', en: 'Apr — Aug 2014' }, titulo: { pt: 'Estagiária em engenharia', en: 'Engineering intern' }, onde: 'UNIVALE · SEPLAM',
          texto: { pt: 'Projetos em AutoCAD e regularização de ambientes da universidade.', en: 'AutoCAD projects and regularization of university facilities.' } }
      ]
    },
    {
      tipo: 'edu', anos: '2012 — 2016', nome: { pt: 'Primeiros passos', en: 'First steps' },
      nota: { pt: 'Sala de aula e universidade ao mesmo tempo.', en: 'Classroom and university at the same time.' },
      itens: [
        { tipo: 'study', quando: '2012 — 2016', titulo: { pt: 'Engenharia Civil e Engenharia Ambiental', en: 'Civil and Environmental Engineering' }, onde: 'UNIVALE',
          texto: { pt: 'Aprovada em 1ª chamada no ProUni. Saí com os dois títulos: engenheira civil e engenheira ambiental.', en: 'Admitted in the first round of ProUni (federal scholarship). Graduated with both degrees: civil and environmental engineering.' } },
        { tipo: 'edu', quando: '2012', titulo: { pt: 'Professora de matemática', en: 'Math teacher' }, onde: 'E.E. Professora Ondina Pinto de Almeida',
          texto: { pt: 'Matemática para o ensino fundamental, cinco anos depois da minha medalha de prata na OBMEP.', en: 'Taught middle school math, five years after my silver medal at the Brazilian Public Schools Math Olympiad.' } }
      ]
    }
  ],

  /* ---------------------------------------------------------------
     SOBRE MIM · CURIOSIDADES: os cards da página Sobre mim.
     Qualquer emoji serve de ícone.
  --------------------------------------------------------------- */
  curiosidades: [
    { emoji: '🎸', titulo: { pt: 'Música', en: 'Music' },
      texto: { pt: 'Rock e indie no fone, sempre. Conheci o <strong>Paramore</strong> em 2007, aos 12 anos, e nunca mais parei de ouvir.', en: 'Rock and indie in my headphones, always. I found <strong>Paramore</strong> in 2007, at 12, and never stopped listening.' } },
    { emoji: '🎮', titulo: 'Games',
      texto: { pt: 'Em todo jogo eu sou a <strong>Aisha</strong>. Jogo Call of Duty desde 2019 e fui GM do BMS2, um servidor privado de MapleStory, de 2017 a 2020. Com o MapleStory Classic oficial em 2026, voltei, agora só como player.', en: 'In every game I’m <strong>Aisha</strong>. I’ve played Call of Duty since 2019 and was a GM on BMS2, a private MapleStory server, from 2017 to 2020. With the official MapleStory Classic in 2026, I came back, now just as a player.' } },
    { emoji: '📚', titulo: { pt: 'Livros', en: 'Books' },
      texto: { pt: '<strong>Percy Jackson e os Olimpianos</strong> é a minha saga favorita (li entre 2011 e 2013). O livro que mais me fez chorar na vida: <strong>Meu Pé de Laranja Lima</strong>.', en: '<strong>Percy Jackson and the Olympians</strong> is my favorite saga (I read it between 2011 and 2013). The book that made me cry the most: <strong>My Sweet Orange Tree</strong>.' } },
    { emoji: '🧟', titulo: { pt: 'Filmes e séries', en: 'Movies and series' },
      texto: { pt: 'Terror e suspense, de preferência com zumbis e apocalipse. Quanto mais sombrio, melhor.', en: 'Horror and thrillers, ideally with zombies and the apocalypse. The darker, the better.' } },
    { emoji: '🏔️', titulo: { pt: 'Viagens', en: 'Travel' },
      texto: { pt: 'Meu país favorito é a <strong>Islândia</strong>, e já fui três vezes. As fotos das viagens ficam no Instagram <a href="https://www.instagram.com/theworldbyamanda/">@theworldbyamanda</a>.', en: 'My favorite country is <strong>Iceland</strong>, and I’ve been there three times. My travel photos live on Instagram at <a href="https://www.instagram.com/theworldbyamanda/">@theworldbyamanda</a>.' } },
    { emoji: '🔭', titulo: { pt: 'Ciência e natureza', en: 'Science and nature' },
      texto: { pt: 'Matemática, física, astronomia, geociências e meio ambiente. Foi o amor pela natureza que me levou à engenharia ambiental (a civil veio de brinde).', en: 'Math, physics, astronomy, geosciences and the environment. Love for nature is what led me to environmental engineering (civil came as a bonus).' } }
  ],

  /* ---------------------------------------------------------------
     SOBRE MIM · LINHA DO TEMPO PESSOAL (em ordem cronológica).
     Cores (tipo): 'vida' azul · 'estudo' verde · 'musica' rosa · 'games' lilás · 'livros' amarelo · 'tech' rosa.
  --------------------------------------------------------------- */
  linhaPessoal: [
    { ano: '1994', tipo: 'vida', titulo: { pt: 'Nasce uma paulistana', en: 'A São Paulo girl is born' }, texto: { pt: 'Nasci em dezembro de 1994, em São Paulo.', en: 'Born in December 1994, in São Paulo.' } },
    { ano: '2004', tipo: 'vida', titulo: { pt: 'Rumo a Minas Gerais', en: 'Off to Minas Gerais' }, texto: { pt: 'Aos 9 anos, me mudei para Minas, onde cresci e me formei.', en: 'At 9, I moved to Minas Gerais, where I grew up and graduated.' } },
    { ano: '2007', tipo: 'estudo', titulo: { pt: 'Medalha de prata na OBMEP', en: 'Silver medal at OBMEP' }, texto: { pt: 'Aos 12 anos, medalhista de prata na Olimpíada Brasileira de Matemática das Escolas Públicas.', en: 'At 12, silver medalist at the Brazilian Public Schools Math Olympiad.' } },
    { ano: '2007', tipo: 'musica', titulo: { pt: 'Conheci o Paramore', en: 'Found Paramore' }, texto: { pt: 'No mesmo ano, aos 12, conheci a minha banda favorita.', en: 'The same year, at 12, I found my favorite band.' } },
    { ano: '2007', tipo: 'games', titulo: { pt: 'Nasce a Aisha', en: 'Aisha is born' }, texto: { pt: 'Meu nome nos games, criado no Neopets.', en: 'My gamer name, created on Neopets.' } },
    { ano: '2011 — 2013', tipo: 'livros', titulo: { pt: 'Percy Jackson e os Olimpianos', en: 'Percy Jackson and the Olympians' }, texto: { pt: 'A saga que virou a minha favorita.', en: 'The saga that became my favorite.' } },
    { ano: '2012', tipo: 'estudo', titulo: { pt: 'Aprovada em 1ª chamada no ProUni', en: 'First-round ProUni scholarship' }, texto: { pt: 'Para Engenharia Civil e Ambiental na UNIVALE.', en: 'For Civil and Environmental Engineering at UNIVALE.' } },
    { ano: '2017 — 2020', tipo: 'games', titulo: { pt: 'GM do BMS2', en: 'GM at BMS2' }, texto: { pt: 'Game master de um servidor privado de MapleStory.', en: 'Game master on a private MapleStory server.' } },
    { ano: '2018', tipo: 'vida', titulo: { pt: 'De volta a São Paulo', en: 'Back to São Paulo' }, texto: { pt: 'Aos 23 anos, voltei para a cidade onde nasci.', en: 'At 23, I moved back to the city where I was born.' } },
    { ano: '2019', tipo: 'games', titulo: 'Call of Duty', texto: { pt: 'Comecei a jogar, e hoje o Warzone é presença garantida.', en: 'Started playing, and Warzone is now a constant.' } },
    { ano: '2021', tipo: 'estudo', titulo: { pt: 'Aprovada na USP', en: 'Admitted to USP' }, texto: { pt: 'Em Geociências e Educação Ambiental: era o meu sonho estudar lá. Precisei pausar por causa do trabalho, mas o sonho segue em aberto.', en: 'Geosciences and Environmental Education: studying there was my dream. I had to pause because of work, but the dream is still open.' } },
    { ano: '2021', tipo: 'tech', titulo: { pt: 'Primeiro passo na tecnologia', en: 'First step into tech' }, texto: { pt: 'Por incentivo do meu marido, desenvolvedor front-end, entrei no processo seletivo da Laboratoria.', en: 'Encouraged by my husband, a front-end developer, I applied to Laboratoria.' } },
    { ano: '2026', tipo: 'games', titulo: 'MapleStory Classic', texto: { pt: 'Com o lançamento oficial, voltei para o Maple, agora só como player.', en: 'With the official launch, I went back to Maple, now just as a player.' } }
  ]
};
