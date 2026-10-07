/**
 * Cloudflare Pages Function: GET /help/go/{id}?lang={code}
 *
 * Vaste link naar een help-artikel in de juiste taal. Gebruikt vanuit de app
 * (helpUrl) en in AnyChat, zodat links blijven werken als een titel of adres wijzigt.
 *
 * Volgorde:
 *   1. ?lang=fr (ook fr-BE, FR, ...) als het artikel in die taal bestaat;
 *   2. zonder ?lang: de eerste browsertaal (Accept-Language) waarin het artikel bestaat;
 *   3. anders Engels; anders de eerste taal waarin het artikel bestaat.
 * Onbekend id of geen id (/help/go/) → overzichtspagina van het help center in die taal.
 *
 * De lijst met artikels komt uit /help-index.json, die bij elke build gemaakt wordt.
 */
export async function onRequestGet({ request, params, env }) {
  const url = new URL(request.url);
  const index = await loadIndex(env, url);
  if (!index) return redirect(new URL('/help/', url));

  const id = String([].concat(params.id ?? [])[0] ?? '').toLowerCase();
  const article = index.articles[id];
  const available = article ? Object.keys(article) : index.langs;

  const requested = normalizeLang(url.searchParams.get('lang'), index.langs);
  let lang;
  if (requested) {
    lang = available.includes(requested) ? requested : null;
  } else {
    lang = browserLangs(request.headers.get('Accept-Language'), index.langs).find((l) => available.includes(l));
  }
  if (!lang) lang = available.includes(index.fallback) ? index.fallback : available[0];

  const path = article ? article[lang] : index.home[lang];
  const target = new URL(path, url);
  // Laat een eventuele zoekopdracht (?q=) meegaan.
  const q = url.searchParams.get('q');
  if (q && !article) target.searchParams.set('q', q);
  return redirect(target);
}

async function loadIndex(env, url) {
  try {
    const res = await env.ASSETS.fetch(new URL('/help-index.json', url));
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** "fr-BE" → "fr"; onbekende talen → null. */
function normalizeLang(value, langs) {
  const code = String(value ?? '').trim().toLowerCase().split(/[-_]/)[0];
  return langs.includes(code) ? code : null;
}

/** Accept-Language → ondersteunde talen, in volgorde van voorkeur. */
function browserLangs(header, langs) {
  return String(header ?? '')
    .split(',')
    .map((part) => {
      const [tag, ...rest] = part.trim().split(';');
      const qParam = rest.find((p) => p.trim().startsWith('q='));
      return { lang: normalizeLang(tag, langs), q: qParam ? Number(qParam.trim().slice(2)) || 0 : 1 };
    })
    .filter((item) => item.lang && item.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((item) => item.lang);
}

function redirect(target) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: target.toString(),
      'Cache-Control': 'private, no-cache',
      Vary: 'Accept-Language',
    },
  });
}
