/**
 * npm run help:nieuw -- <id> [taal]
 *
 * Maakt een nieuw help-artikel aan vanuit het sjabloon, bv.:
 *   npm run help:nieuw -- credits-bijboeken        (in nl)
 *   npm run help:nieuw -- credits-bijboeken fr     (Franse vertaling, neemt categorie en volgorde over)
 */
import fs from 'node:fs';
import path from 'node:path';
import { HELP_LANGS, RESERVED_IDS } from '../src/help/config.mjs';
import { CONTENT_DIR, loadArticles } from '../src/help/load.mjs';

const [id, lang = 'nl'] = process.argv.slice(2);
if (!id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id) || RESERVED_IDS.includes(id)) {
  console.error('Gebruik: npm run help:nieuw -- <id> [taal]   (id: kleine letters en koppeltekens, bv. credits-bijboeken)');
  process.exit(1);
}
if (!HELP_LANGS.includes(lang)) {
  console.error(`Onbekende taal "${lang}". Kies uit: ${HELP_LANGS.join(', ')}`);
  process.exit(1);
}

const target = path.join(CONTENT_DIR, lang, `${id}.md`);
if (fs.existsSync(target)) {
  console.error(`Bestaat al: ${path.relative(process.cwd(), target)}`);
  process.exit(1);
}

const existing = loadArticles().find((a) => a.id === id);
const today = new Date().toISOString().slice(0, 10);
let source = fs.readFileSync(path.join(CONTENT_DIR, '_sjabloon.md'), 'utf8')
  .replace(/^id: .*$/m, `id: ${id}`)
  .replace(/^updated: .*$/m, `updated: ${today}`);
if (existing) {
  source = source
    .replace(/^category: .*$/m, `category: ${existing.category}`)
    .replace(/^order: .*$/m, `order: ${existing.order}`);
}

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, source);
console.log(`Aangemaakt: ${path.relative(process.cwd(), target)}`);
if (existing) console.log(`Vertaal de tekst vanuit ${existing.file}.`);
