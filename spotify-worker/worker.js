/**
 * Cloudflare Worker: "tocando agora" do Spotify para amanda.eng.br
 *
 * GET /  →  { playing, title, artist, album, art, url, playedAt? }
 *  - playing=true quando há música tocando agora;
 *  - senão devolve a última música tocada (playing=false);
 *  - { playing:false } se nada for encontrado.
 *
 * Segredos (wrangler secret put …): SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 * Variável: ALLOWED_ORIGINS (lista separada por vírgula)
 */
export default {
  async fetch(request, env, ctx) {
    const allowed = (env.ALLOWED_ORIGINS || 'https://amanda.eng.br').split(',').map((s) => s.trim());
    const origin = request.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      Vary: 'Origin',
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: cors });

    // Cache de 20 s na borda: protege o limite da API do Spotify quando muita gente abre o site.
    const cache = caches.default;
    const key = new Request(new URL('/__now-playing', request.url).toString());
    let cached = await cache.match(key);
    if (!cached) {
      let data;
      try {
        data = await nowPlaying(env);
      } catch (err) {
        data = { playing: false, error: 'unavailable' };
      }
      cached = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=20' },
      });
      ctx.waitUntil(cache.put(key, cached.clone()));
    }
    const res = new Response(cached.body, cached);
    for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
    return res;
  },
};

async function accessToken(env) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: env.SPOTIFY_REFRESH_TOKEN }),
  });
  if (!res.ok) throw new Error('token ' + res.status);
  return (await res.json()).access_token;
}

async function nowPlaying(env) {
  const headers = { Authorization: 'Bearer ' + (await accessToken(env)) };

  const now = await fetch('https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode', { headers });
  if (now.status === 200) {
    const j = await now.json();
    if (j && j.item) return shape(j.item, j.is_playing);
  }

  const recent = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', { headers });
  if (recent.ok) {
    const j = await recent.json();
    const it = j.items && j.items[0];
    if (it) return { ...shape(it.track, false), playedAt: it.played_at };
  }
  return { playing: false };
}

function shape(item, playing) {
  const images = (item.album && item.album.images) || item.images || [];
  return {
    playing: Boolean(playing),
    title: item.name,
    artist: item.artists ? item.artists.map((a) => a.name).join(', ') : (item.show && item.show.name) || '',
    album: item.album ? item.album.name : '',
    art: images.length ? (images[1] || images[0]).url : '',
    url: item.external_urls && item.external_urls.spotify,
  };
}
