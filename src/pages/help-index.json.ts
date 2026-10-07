import type { APIRoute } from 'astro';
import { HELP_LANGS, HELP_FALLBACK_LANG, helpHomePath } from '../help/config.mjs';
import { articleLang, articlePath, getHelpArticles } from '../help/content';

/**
 * /help-index.json: welk artikel-id bestaat in welke taal, en op welk adres.
 * Gebruikt door de doorstuurroute /help/go/{id} (functions/help/go/[[id]].js).
 */
export const GET: APIRoute = async () => {
  const articles: Record<string, Record<string, string>> = {};
  for (const entry of await getHelpArticles()) {
    (articles[entry.data.id] ??= {})[articleLang(entry)] = articlePath(entry);
  }
  const home = Object.fromEntries(HELP_LANGS.map((lang) => [lang, helpHomePath(lang)]));
  const body = { langs: HELP_LANGS, fallback: HELP_FALLBACK_LANG, home, articles };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
