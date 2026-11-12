/* amanda.eng.br — scripts compartilhados por todas as páginas.
   O CONTEÚDO editável (artigos, projetos, carreira, curiosidades, Spotify) fica em assets/js/conteudo.js. */
(function () {
  'use strict';

  var C = window.CONTEUDO || {};
  var EN = window.I18N_EN || {};
  var root = document.documentElement;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var lang = 'pt';
  /* texto no idioma atual: aceita 'texto' ou { pt, en } */
  function L(v) { return v == null ? '' : (typeof v === 'string' ? v : (v[lang] != null ? v[lang] : v.pt)); }
  var LOCALE = { pt: 'pt-BR', en: 'en-US' };
  function t(pt, en) { return lang === 'en' ? en : pt; }
  function monYear(d) { return d.toLocaleDateString(LOCALE[lang], { month: 'short' }).replace('.', '') + ' ' + d.getFullYear(); }
  var EXT = ' target="_blank" rel="noopener"';

  /* ===================== ARTIGOS (início) ===================== */
  function renderArticles() {
    var list = C.artigos || [];
    $$('[data-stat="articles"]').forEach(function (e) { e.textContent = list.length; });
    var el = $('#articles'); if (!el) return;
    el.innerHTML = list.map(function (a) {
      return '<a class="card" href="' + esc(a.url) + '"' + EXT + '>' +
        '<div class="card__label"><span class="k">' + esc(L(a.onde)).toLowerCase() + '</span><span>' + esc(L(a.data)) + '</span></div>' +
        '<h3>' + esc(L(a.titulo)) + '</h3><p>' + L(a.resumo) + '</p>' +
        '<span class="card__cta">' + t('ler artigo ↗', 'read article ↗') + '</span></a>';
    }).join('');
  }

  /* ===================== PROJETOS EM DESTAQUE ===================== */
  function renderProjects() {
    var el = $('#featured-projects'); if (!el) return;
    el.innerHTML = (C.projetos || []).map(function (p) {
      var cls = 'card project' + (p.destaque ? ' project--feature' : '') + (p.primeiro ? ' project--first' : '');
      var h = '<article class="' + cls + '">';
      if (p.imagem) h += '<a class="project__thumb" href="' + esc(p.aoVivo || p.codigo) + '"' + EXT + ' tabindex="-1"><img src="' + esc(p.imagem) + '" alt="" loading="lazy"></a>';
      h += '<div class="card__label"><span class="k"' + (p.primeiro ? ' style="color:var(--mint)"' : '') + '>' + esc(L(p.info)) + '</span>';
      if (p.selo) h += '<span class="pill pill--' + (p.selo.cor || 'pink') + '">' + (p.selo.aoVivo ? '<span class="live"></span>' : '') + esc(L(p.selo.texto)) + '</span>';
      h += '</div><h3>' + esc(L(p.titulo)) + '</h3><p>' + L(p.descricao) + '</p>';
      if (p.tags) h += '<ul class="tags">' + p.tags.map(function (x) { return '<li>' + esc(L(x)) + '</li>'; }).join('') + '</ul>';
      if (p.links) h += '<ul class="minilinks">' + p.links.map(function (l) {
        return '<li><a href="' + esc(l.url) + '"' + EXT + '>' + (l.aoVivo ? '<span class="live"></span>' : '') + esc(l.nome) +
          (l.obs ? ' <span class="muted">· ' + esc(L(l.obs)) + '</span>' : '') + ' ↗</a></li>';
      }).join('') + '</ul>';
      if (p.aoVivo || p.codigo) {
        h += '<div class="project__links">';
        if (p.aoVivo) h += '<a class="btn btn--pink btn--sm" href="' + esc(p.aoVivo) + '"' + EXT + '>' + t('ver no ar', 'see it live') + ' ↗</a>';
        if (p.codigo) h += '<a class="btn btn--ghost btn--sm" href="' + esc(p.codigo) + '"' + EXT + '>' + t('código', 'code') + ' ↗</a>';
        h += '</div>';
      }
      return h + '</article>';
    }).join('');
  }

  /* ===================== CARREIRA ===================== */
  function renderCareer() {
    var el = $('#career-timeline'); if (!el) return;
    el.innerHTML = (C.carreira || []).map(function (fase) {
      var itens = fase.itens.map(function (it) {
        var body = '';
        if (it.topicos) body += '<ul class="bullets">' + L(it.topicos).map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>';
        if (it.texto) body += '<p class="tl__text">' + L(it.texto) + '</p>';
        if (it.tags) body += '<ul class="tags">' + it.tags.map(function (x) { return '<li>' + esc(L(x)) + '</li>'; }).join('') + '</ul>';
        return '<li class="tl__item k-' + it.tipo + (it.atual ? ' is-now' : '') + '">' +
          '<span class="tl__when">' + esc(L(it.quando)) + '</span>' +
          '<h3>' + esc(L(it.titulo)) + (it.atual ? ' <span class="pill pill--pink">' + t('atual', 'current') + '</span>' : '') + '</h3>' +
          (it.onde ? '<p class="tl__org">' + esc(L(it.onde)) + '</p>' : '') + body + '</li>';
      }).join('');
      return '<div class="era k-' + fase.tipo + '"><div class="era__head"><p class="era__years">' + esc(L(fase.anos)) + '</p>' +
        '<h3 class="era__name">' + esc(L(fase.nome)) + '</h3><p class="era__note">' + esc(L(fase.nota)) + '</p></div>' +
        '<ol class="tl">' + itens + '</ol></div>';
    }).join('');
  }

  /* ===================== SOBRE MIM ===================== */
  var LIFE_KIND = { vida: 'life', estudo: 'study', musica: 'music', games: 'games', livros: 'books', tech: 'tech' };
  function renderAbout() {
    var favs = $('#favs');
    if (favs) favs.innerHTML = (C.curiosidades || []).map(function (f) {
      return '<article class="card fav"><div class="fav__emoji" aria-hidden="true">' + esc(f.emoji) + '</div>' +
        '<h3>' + esc(L(f.titulo)) + '</h3><p>' + L(f.texto) + '</p></article>';
    }).join('');
    var life = $('#life-timeline');
    if (life) life.innerHTML = (C.linhaPessoal || []).map(function (it) {
      return '<div class="tl__item k-' + (LIFE_KIND[it.tipo] || 'life') + '"><span class="tl__when">' + esc(it.ano) + '</span>' +
        '<h3>' + esc(L(it.titulo)) + '</h3><p class="tl__text">' + L(it.texto) + '</p></div>';
    }).join('');
  }

  /* ===================== OUVINDO AGORA (Spotify) ===================== */
  var SP = C.spotify || {};
  var npLast = null;
  function renderNP() {
    var np = $('#np'); if (!np) return;
    var d = npLast, live = d && d.title;
    np.classList.toggle('is-playing', !!(live && d.playing));
    np.classList.toggle('is-live', !!live);
    $('#np-art').src = (live && d.art) || 'assets/img/vinyl.svg';
    $('#np-track').textContent = live ? d.title : L(SP.padrao && SP.padrao.musica) || 'Paramore';
    $('#np-artist').textContent = live ? (d.artist || '') : L(SP.padrao && SP.padrao.artista);
    $('#np-state').textContent = !live ? t('trilha sonora da vida', 'soundtrack of my life')
      : d.playing ? t('ouvindo agora no Spotify', 'listening now on Spotify') : t('última que ouvi no Spotify', 'last played on Spotify');
    np.href = (live && d.url) || SP.perfil || 'https://open.spotify.com/';
  }
  function pollNP() {
    if (!SP.workerUrl || document.hidden) return;
    fetch(SP.workerUrl, { cache: 'no-store' }).then(function (r) { return r.json(); })
      .then(function (d) { npLast = d; renderNP(); }).catch(function () {});
  }
  if ($('#np')) {
    if (SP.workerUrl) { pollNP(); setInterval(pollNP, 30000); document.addEventListener('visibilitychange', pollNP); }
    // prévia: abra sobre.html?np=demo
    if (new URLSearchParams(location.search).get('np') === 'demo') npLast = { playing: true, title: 'Misery Business', artist: 'Paramore', url: SP.perfil };
  }

  /* ===================== BADGES (Credly, automático) ===================== */
  var badgesData = null;
  function cleanName(n) { return n.replace(/\s+-\s+Ver\.\s*[\d.]+$/i, '').replace(/^Red Hat OpenShift /, 'OpenShift ').replace(/ (Navigator|Badge)$/, ''); }
  function renderBadges() {
    if (!badgesData) return;
    var list = badgesData.badges;
    $$('[data-stat="badges"]').forEach(function (e) { e.textContent = list.length; });
    var issuers = {};
    list.forEach(function (b) { (issuers[b.issuer] = issuers[b.issuer] || []).push(b); });
    $$('[data-stat="issuers"]').forEach(function (e) { e.textContent = Object.keys(issuers).length; });
    $$('[data-stat="grafana"]').forEach(function (e) { e.textContent = (issuers['Grafana Labs'] || []).length; });
    if (list[0]) $$('[data-stat="latest"]').forEach(function (e) { e.textContent = monYear(new Date(list[0].issued + 'T12:00:00')); });
    var el = $('#badge-groups'); if (!el) return;
    var now = Date.now();
    el.innerHTML = Object.keys(issuers).sort(function (a, b) { return issuers[b].length - issuers[a].length; }).map(function (iss) {
      var items = issuers[iss].map(function (b) {
        var d = new Date(b.issued + 'T12:00:00');
        var isNew = (now - d.getTime()) < 75 * 864e5;
        return '<li class="badge"><a href="' + esc(b.url) + '"' + EXT + '>' +
          '<img src="' + esc(b.image) + '" alt="" width="84" height="84" loading="lazy" decoding="async">' +
          '<strong>' + esc(cleanName(b.name)) + '</strong><span>' + monYear(d) + '</span>' +
          (isNew ? '<span class="pill pill--pink">' + t('novo ✦', 'new ✦') + '</span>' : '') + '</a></li>';
      }).join('');
      return '<section class="badge-group"><h3>' + esc(iss) + ' <span>· ' + issuers[iss].length + '</span></h3><ul class="badges">' + items + '</ul></section>';
    }).join('');
  }

  /* ===================== REPOSITÓRIOS (GitHub, automático) ===================== */
  var LANG_COLORS = { TypeScript: '#3178c6', JavaScript: '#f1e05a', HTML: '#e34c26', CSS: '#663399', Python: '#3572A5', HCL: '#844FBA', Go: '#00ADD8', Shell: '#89e051' };
  var reposData = null;
  function relTime(iso) {
    var diff = (new Date(iso).getTime() - Date.now()) / 1000;
    var units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600]];
    var rtf = new Intl.RelativeTimeFormat(LOCALE[lang], { numeric: 'auto' });
    for (var i = 0; i < units.length; i++) if (Math.abs(diff) >= units[i][1] || i === units.length - 1) return rtf.format(Math.round(diff / units[i][1]), units[i][0]);
  }
  function renderRepos() {
    var el = $('#repos'); if (!el || !reposData) return;
    el.innerHTML = reposData.repos.map(function (r) {
      var links = '<a href="' + esc(r.url) + '"' + EXT + '>' + t('código', 'code') + ' ↗</a>';
      if (r.homepage) links += '<a href="' + esc(r.homepage) + '"' + EXT + '>' + t('no ar', 'live') + ' ↗</a>';
      return '<tr><td><a href="' + esc(r.url) + '"' + EXT + '>' + esc(r.name) + '</a></td>' +
        '<td>' + esc(r.description || '—') + '</td>' +
        '<td>' + (r.language ? '<span class="lang"><i style="--c:' + (LANG_COLORS[r.language] || 'var(--muted)') + '"></i>' + esc(r.language) + '</span>' : '<span class="muted">—</span>') + '</td>' +
        '<td class="when">' + relTime(r.pushed) + '</td><td class="links">' + links + '</td></tr>';
    }).join('');
    var n = $('#repos-count'); if (n) n.textContent = reposData.repos.length;
  }

  function loadJSON(url) { return fetch(url, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
  if ($('[data-stat="badges"]') || $('#badge-groups')) loadJSON('data/badges.json').then(function (d) { badgesData = d; renderBadges(); }).catch(function () {});
  if ($('#repos')) loadJSON('data/repos.json').then(function (d) { reposData = d; renderRepos(); }).catch(function () {});

  /* ===================== IDIOMA ===================== */
  $$('[data-i18n],[data-i18n-html]').forEach(function (el) { el._pt = el.innerHTML; });
  $$('[data-i18n-alt]').forEach(function (el) { el._ptAlt = el.alt; });
  var PT_TITLE = document.title;

  function renderAll() { renderArticles(); renderProjects(); renderCareer(); renderAbout(); renderNP(); renderBadges(); renderRepos(); }

  function setLang(l) {
    lang = l === 'en' ? 'en' : 'pt';
    $$('[data-i18n]').forEach(function (el) { var v = lang === 'en' ? EN[el.dataset.i18n] : null; el.innerHTML = v != null ? v : el._pt; });
    $$('[data-i18n-html]').forEach(function (el) { var v = lang === 'en' ? EN[el.dataset.i18nHtml] : null; el.innerHTML = v != null ? v : el._pt; });
    $$('[data-i18n-alt]').forEach(function (el) { var v = lang === 'en' ? EN[el.dataset.i18nAlt] : null; el.alt = v != null ? v : el._ptAlt; });
    root.lang = lang === 'en' ? 'en' : 'pt-BR';
    var page = document.body.dataset.page;
    document.title = lang === 'en' && EN['title.' + page] ? EN['title.' + page] : PT_TITLE;
    $$('[data-cv]').forEach(function (a) { a.href = lang === 'en' ? 'cv/Resume_Amanda_Gusmao_EN.pdf' : 'cv/Curriculo_Amanda_Gusmao_PT.pdf'; });
    $$('.seg button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    renderAll();
    store.set('lang', lang);
  }
  $$('.seg button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });
  var q = new URLSearchParams(location.search).get('lang');
  setLang(q || store.get('lang') || ((navigator.language || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en'));

  /* ===================== LINKS EXTERNOS SEMPRE EM NOVA ABA ===================== */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented) return;
    var url;
    try { url = new URL(a.getAttribute('href'), location.href); } catch (err) { return; }
    if (!/^https?:$/.test(url.protocol) || url.host === location.host) return;
    a.target = '_blank';
    a.rel = 'noopener';
  }, true);

  /* ===================== MENU (celular) ===================== */
  var menuBtn = $('#menu-btn'), links = $('#nav-links');
  if (menuBtn && links) menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  /* ===================== ENTRADA SUAVE ===================== */
  if ('IntersectionObserver' in window) {
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); rev.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px' });
    $$('.stat, .era, .section__head, main > section .card').forEach(function (el) {
      if (el.closest('#articles,#featured-projects,#favs')) return; // estes são redesenhados ao trocar idioma
      el.classList.add('reveal'); rev.observe(el);
    });
  }

  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
