/**
 * npm run help:check
 *
 * Toont per artikel welke vertalingen ontbreken of verouderd zijn, en controleert
 * of elk bestand de verplichte velden heeft. Een vertaling is "verouderd" als haar
 * `updated`-datum ouder is dan die van de nieuwste taalversie van hetzelfde artikel.
 *
 * Stopt met foutcode 1 bij fouten (ontbrekende velden, dubbele ids, onbekende categorie).
 * Ontbrekende of verouderde vertalingen zijn enkel waarschuwingen.
 */
import path from 'node:path';
import { HELP_AUDIENCES, HELP_LANGS, RESERVED_IDS } from '../src/help/config.mjs';
import { loadArticles, loadCategories } from '../src/help/load.mjs';

const REQUIRED = ['id', 'title', 'description', 'category', 'order', 'updated'];
const articles = loadArticles();
const categories = loadCategories();
const errors = [];

for (const a of articles) {
  for (const field of REQUIRED) {
    if (a[field] === undefined || a[field] === '') errors.push(`${a.file}: veld "${field}" ontbreekt`);
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.id)) errors.push(`${a.file}: id "${a.id}" mag enkel kleine letters, cijfers en koppeltekens bevatten`);
  if (RESERVED_IDS.includes(a.id)) errors.push(`${a.file}: id "${a.id}" is gereserveerd`);
  if (a.category && !categories[a.category]) {
    errors.push(`${a.file}: categorie "${a.category}" staat niet in categorieen.yml (${Object.keys(categories).join(', ')})`);
  }
  if (a.updated && Number.isNaN(Date.parse(a.updated))) errors.push(`${a.file}: updated "${a.updated}" is geen datum (JJJJ-MM-DD)`);
  const fileName = path.basename(a.file, '.md');
  if (fileName !== a.id) console.warn(`Let op: ${a.file} heeft id "${a.id}"; geef het bestand bij voorkeur dezelfde naam (${a.id}.md).`);
}

for (const [key, category] of Object.entries(categories)) {
  if (!HELP_AUDIENCES.includes(category.audience)) {
    errors.push(`categorieen.yml: categorie "${key}" heeft geen geldige audience (${HELP_AUDIENCES.join(' of ')})`);
  }
}

// Dubbele ids of adressen binnen één taal.
for (const lang of HELP_LANGS) {
  const seenIds = new Map();
  const seenSlugs = new Map();
  for (const a of articles.filter((x) => x.lang === lang)) {
    if (seenIds.has(a.id)) errors.push(`${a.file}: id "${a.id}" bestaat al in ${seenIds.get(a.id)}`);
    if (seenSlugs.has(a.slug)) errors.push(`${a.file}: adres "${a.slug}" wordt al gebruikt door ${seenSlugs.get(a.slug)}`);
    seenIds.set(a.id, a.file);
    seenSlugs.set(a.slug, a.file);
  }
}

// Vertaalstatus per artikel.
const byId = new Map();
for (const a of articles) {
  if (!byId.has(a.id)) byId.set(a.id, {});
  byId.get(a.id)[a.lang] = a;
}

const todo = [];
for (const [id, versions] of [...byId].sort(([x], [y]) => x.localeCompare(y))) {
  const newest = Object.values(versions).reduce((max, v) => (v.updated > max.updated ? v : max));
  for (const lang of HELP_LANGS) {
    const v = versions[lang];
    if (!v) todo.push({ id, lang, status: 'ontbreekt', note: `vertaal vanuit ${newest.file}` });
    else if (v.updated < newest.updated) {
      todo.push({ id, lang, status: 'verouderd', note: `${v.updated} < ${newest.updated} (${newest.lang}); vergelijk met ${newest.file}` });
    }
  }
}

console.log(`\nHelp center: ${byId.size} artikels, ${articles.length} bestanden (${HELP_LANGS.join(', ')}).\n`);
if (todo.length === 0) {
  console.log('Alle vertalingen zijn compleet en up-to-date.');
} else {
  console.log('Te vertalen of bij te werken:');
  for (const item of todo) console.log(`  - ${item.id} [${item.lang}] ${item.status}: ${item.note}`);
}

if (errors.length) {
  console.error(`\n${errors.length} fout(en):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('');
