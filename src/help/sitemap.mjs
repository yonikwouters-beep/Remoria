/**
 * Sitemap-gegevens voor het help center: per pad de taalversies (hreflang) en
 * de datum van de laatste wijziging. Gebruikt in astro.config.mjs.
 */
import { HELP_LANGS, absoluteUrl, helpArticlePath, helpHomePath } from './config.mjs';
import { loadArticles } from './load.mjs';

export function helpSitemapEntries() {
  const entries = new Map();
  const articles = loadArticles().filter((article) => !article.draft);

  const homeLinks = HELP_LANGS.map((lang) => ({ lang, url: absoluteUrl(helpHomePath(lang)) }));
  for (const lang of HELP_LANGS) {
    entries.set(helpHomePath(lang), { links: homeLinks });
  }

  const byId = new Map();
  for (const article of articles) {
    if (!byId.has(article.id)) byId.set(article.id, []);
    byId.get(article.id).push(article);
  }
  for (const versions of byId.values()) {
    const links = versions.map((v) => ({ lang: v.lang, url: absoluteUrl(helpArticlePath(v.lang, v.slug)) }));
    for (const v of versions) {
      entries.set(helpArticlePath(v.lang, v.slug), {
        links,
        lastmod: v.updated ? new Date(v.updated).toISOString() : undefined,
      });
    }
  }
  return entries;
}
