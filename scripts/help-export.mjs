/**
 * npm run help:export
 *
 * Exporteert alle help-artikels naar propere .md-bestanden voor AnyChat (kennisbron
 * voor de AI), zonder sitenavigatie. Elk bestand begint met de titel en de publieke
 * URL, zodat de AI ernaar kan verwijzen.
 *
 * Resultaat (niet in git):
 *   help-export/<taal>/<id>.md      één bestand per artikel
 *   help-export/alles-<taal>.md     alle artikels van een taal in één bestand
 */
import fs from 'node:fs';
import path from 'node:path';
import { HELP_LANGS, absoluteUrl, helpArticlePath } from '../src/help/config.mjs';
import { ROOT, loadArticles, loadCategories } from '../src/help/load.mjs';

const OUT = path.join(ROOT, 'help-export');
const LABELS = {
  nl: { url: 'Publieke URL', category: 'Categorie', updated: 'Bijgewerkt' },
  fr: { url: 'URL publique', category: 'Catégorie', updated: 'Mis à jour' },
  en: { url: 'Public URL', category: 'Category', updated: 'Updated' },
};

const categories = loadCategories();
const articles = loadArticles()
  .filter((a) => !a.draft)
  .sort((a, b) => (categories[a.category]?.order ?? 999) - (categories[b.category]?.order ?? 999) || a.order - b.order);

fs.rmSync(OUT, { recursive: true, force: true });

let count = 0;
for (const lang of HELP_LANGS) {
  const label = LABELS[lang] ?? LABELS.en;
  const docs = [];
  for (const a of articles.filter((x) => x.lang === lang)) {
    const url = absoluteUrl(helpArticlePath(lang, a.slug));
    const category = categories[a.category]?.[lang]?.title ?? categories[a.category]?.en?.title ?? a.category;
    const doc = [
      `# ${a.title}`,
      '',
      `${label.url}: ${url}`,
      `${label.category}: ${category}`,
      `${label.updated}: ${a.updated}`,
      '',
      `> ${a.description}`,
      '',
      a.body.trim(),
      '',
    ].join('\n');
    fs.mkdirSync(path.join(OUT, lang), { recursive: true });
    fs.writeFileSync(path.join(OUT, lang, `${a.id}.md`), doc);
    docs.push(doc);
    count++;
  }
  if (docs.length) fs.writeFileSync(path.join(OUT, `alles-${lang}.md`), docs.join('\n---\n\n'));
}

console.log(`${count} artikels geëxporteerd naar ${path.relative(ROOT, OUT)}/`);
