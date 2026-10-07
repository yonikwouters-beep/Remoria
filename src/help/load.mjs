/**
 * Leest de help-artikels rechtstreeks van schijf (zonder Astro).
 * Gebruikt door astro.config.mjs (sitemap) en de scripts in scripts/help-*.mjs.
 * De website zelf leest de artikels via de content collection (src/content.config.ts).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { HELP_LANGS } from './config.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const CONTENT_DIR = path.join(ROOT, 'src/content/help');

/** Splitst een .md-bestand in frontmatter (object) en tekst. */
export function parseMarkdown(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source };
  return { data: yaml.load(match[1]) ?? {}, body: match[2] };
}

/** "2026-10-07" of een Date → "2026-10-07". */
export function toDateString(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value == null ? '' : String(value);
}

/** Alle artikels in alle talen. Bestanden die met "_" beginnen worden overgeslagen. */
export function loadArticles() {
  const articles = [];
  for (const lang of HELP_LANGS) {
    const dir = path.join(CONTENT_DIR, lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).sort()) {
      if (!file.endsWith('.md') || file.startsWith('_')) continue;
      const fullPath = path.join(dir, file);
      const { data, body } = parseMarkdown(fs.readFileSync(fullPath, 'utf8'));
      const id = String(data.id ?? file.replace(/\.md$/, ''));
      articles.push({
        ...data,
        id,
        lang,
        slug: String(data.slug ?? id),
        updated: toDateString(data.updated),
        draft: data.draft === true,
        file: path.relative(ROOT, fullPath),
        body,
      });
    }
  }
  return articles;
}

/** De categorieën uit src/content/help/categorieen.yml. */
export function loadCategories() {
  const file = path.join(CONTENT_DIR, 'categorieen.yml');
  return yaml.load(fs.readFileSync(file, 'utf8')) ?? {};
}
