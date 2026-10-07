import { getCollection, type CollectionEntry } from 'astro:content';
import { HELP_LANGS, HELP_FALLBACK_LANG, helpArticlePath, helpHomePath } from './config.mjs';
import type { Locale } from '../i18n/utils';

export type HelpArticle = CollectionEntry<'help'>;
export type HelpLang = Locale;

/** Taal van een artikel, afgeleid uit de map (src/content/help/<taal>/...). */
export function articleLang(entry: HelpArticle): HelpLang {
  return entry.id.split('/')[0] as HelpLang;
}

export function articleSlug(entry: HelpArticle): string {
  return entry.data.slug ?? entry.data.id;
}

export function articlePath(entry: HelpArticle): string {
  return helpArticlePath(articleLang(entry), articleSlug(entry));
}

/** Alle gepubliceerde artikels (zonder drafts), eventueel voor één taal. */
export async function getHelpArticles(lang?: HelpLang): Promise<HelpArticle[]> {
  const all = await getCollection('help', (entry) => !entry.data.draft);
  return lang ? all.filter((entry) => articleLang(entry) === lang) : all;
}

/** Dezelfde id in elke taal waarin het artikel bestaat. */
export async function getTranslations(id: string): Promise<Partial<Record<HelpLang, HelpArticle>>> {
  const all = await getHelpArticles();
  const result: Partial<Record<HelpLang, HelpArticle>> = {};
  for (const entry of all) {
    if (entry.data.id === id) result[articleLang(entry)] = entry;
  }
  return result;
}

export type HelpCategory = {
  key: string;
  order: number;
  title: string;
  description: string;
};

/** Categorieën met naam in de gevraagde taal (Engels of de sleutel als terugval). */
export async function getHelpCategories(lang: HelpLang): Promise<Map<string, HelpCategory>> {
  const entries = await getCollection('helpCategories');
  const map = new Map<string, HelpCategory>();
  for (const entry of entries) {
    const data = entry.data as Record<string, any>;
    const label = data[lang] ?? data[HELP_FALLBACK_LANG] ?? { title: entry.id, description: '' };
    map.set(entry.id, {
      key: entry.id,
      order: data.order ?? 100,
      title: label.title,
      description: label.description ?? '',
    });
  }
  return map;
}

export function categoryFor(categories: Map<string, HelpCategory>, key: string): HelpCategory {
  return categories.get(key) ?? { key, order: 999, title: key, description: '' };
}

export function sortArticles(a: HelpArticle, b: HelpArticle): number {
  return a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);
}

/** Links voor de taalwisselaar en hreflang van de overzichtspagina. */
export function helpHomeAlternates(): Record<HelpLang, string> {
  return Object.fromEntries(HELP_LANGS.map((lang) => [lang, helpHomePath(lang)])) as Record<HelpLang, string>;
}

/** Markdown → platte tekst voor de zoekfunctie. */
export function markdownToText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** getStaticPaths voor de artikelpagina's van één taal. */
export async function helpStaticPaths(lang: HelpLang) {
  const articles = await getHelpArticles(lang);
  return articles.map((entry) => ({ params: { slug: articleSlug(entry) }, props: { entry } }));
}
