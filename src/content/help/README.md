# Help center (kennisbank)

De help-artikels van www.remoria.eu staan in deze map, als gewone tekstbestanden (Markdown).
Elk artikel is één bestand per taal:

```
src/content/help/
├── categorieen.yml        de categorieën en hun naam per taal
├── _sjabloon.md           sjabloon om te kopiëren
├── nl/ai-wallet.md        → www.remoria.eu/help/ai-wallet/
├── fr/ai-wallet.md        → www.remoria.eu/fr/aide/ai-wallet/
└── en/ai-wallet.md        → www.remoria.eu/en/help/ai-wallet/
```

Zodra een wijziging op `main` staat, zet Cloudflare ze automatisch online.

## Een artikel toevoegen

1. Kopieer `_sjabloon.md` naar `nl/<id>.md`, bv. `nl/credits-bijboeken.md`.
   Op GitHub: open de map `nl`, kies **Add file → Create new file**, typ de naam en plak het sjabloon.
2. Vul bovenaan (tussen de twee `---`) de velden in:
   - `id`: vaste naam van het artikel, gelijk in alle talen. Kleine letters en koppeltekens, bv. `credits-bijboeken`. Wijzig hem later niet meer: de app en AnyChat linken ernaar.
   - `title`: de titel.
   - `description`: één of twee zinnen; verschijnt in het overzicht en bij Google.
     Staat er een dubbele punt met een spatie in de titel of beschrijving (bv. `Voor beheerders: ...`),
     zet de hele tekst dan tussen dubbele aanhalingstekens: `description: "Voor beheerders: ..."`.
   - `category`: één van de sleutels uit `categorieen.yml` (bv. `ai-hulp`).
   - `order`: volgorde binnen de categorie (1 eerst).
   - `updated`: datum van de laatste inhoudelijke wijziging, `JJJJ-MM-DD`.
   - Optioneel `slug`: een eigen adres in deze taal (bv. `photos-et-souvenirs`). Zonder `slug` is het adres gelijk aan het `id`.
   - Optioneel `draft: true`: het artikel wordt nog niet getoond.
3. Schrijf de tekst eronder. Gebruik `## Tussenkop` voor elke tussenkop: die komen in de inhoudstafel.
   `**vet**` voor knopnamen, `- ` voor een lijstje, `1. ` voor stappen.
4. Een nieuwe categorie nodig? Voeg ze toe aan `categorieen.yml`, met een naam in elke taal
   en `audience: nabestaanden` of `audience: partners`.

## Voor nabestaanden en voor uitvaartondernemers

Het overzicht heeft twee delen. Elke categorie in `categorieen.yml` zegt met `audience` in welk deel ze staat:

- `nabestaanden`: families, beheerders en bezoekers van een gedenkplek;
- `partners`: uitvaartondernemers die met het partnerportaal werken.

Alles in dit help center is publiek. Teksten die enkel voor partners met een portaal bedoeld zijn
(zoals facturatie en de privacyafspraken met partners) staan daarom niet hier, maar in de app
(`src/lib/portalHelp.ts` in de app-repo) en zijn enkel zichtbaar na inloggen in het portaal.

Wie de site lokaal draait, kan ook `npm run help:nieuw -- credits-bijboeken` gebruiken.

## Een artikel vertalen

1. Maak in `fr/` (of `en/`) een bestand met **hetzelfde `id`**, bv. `fr/credits-bijboeken.md`.
   (`npm run help:nieuw -- credits-bijboeken fr` neemt categorie en volgorde al over.)
2. Vertaal titel, beschrijving en tekst. Laat `id`, `category` en `order` gelijk.
3. Zet `updated` op de datum van de brontekst die je vertaalde.

Pas je later de Nederlandse tekst aan, zet dan daar `updated` op de nieuwe datum.
`npm run help:check` toont dan welke vertalingen verouderd zijn of nog ontbreken:

```
Te vertalen of bij te werken:
  - ai-wallet [fr] verouderd: 2026-10-07 < 2026-10-09 (nl); vergelijk met src/content/help/nl/ai-wallet.md
  - credits-bijboeken [en] ontbreekt: vertaal vanuit src/content/help/nl/credits-bijboeken.md
```

Deze controle draait ook bij elke build. Fouten (een ontbrekend veld, een onbekende categorie,
een dubbel id) houden de publicatie tegen, zodat er nooit een kapotte pagina online komt.
Ontbrekende vertalingen zijn enkel een waarschuwing: het artikel staat dan alleen in de talen die er zijn.

Bestaande artikels uit AnyChat overzetten: plak de tekst onder de frontmatter van het sjabloon
en maak van de vetgedrukte tussentitels `## Tussenkoppen`.

## Linken naar een artikel

Gebruik altijd de vaste link met het `id`, dan kies de site zelf de juiste taal:

```
https://www.remoria.eu/help/go/ai-wallet?lang=fr
```

- `lang` = `nl`, `fr` of `en`. Bestaat het artikel niet in die taal, dan krijgt de lezer de Engelse versie.
- Zonder `lang` kiest de site de taal van de browser.
- Een onbekend `id` (of `/help/go/`) stuurt naar het overzicht van het help center.

In de app doet `helpUrl('ai-wallet')` dit automatisch in de taal van de gebruiker.

## Exporteren naar AnyChat

```
npm run help:export
```

Dit maakt de map `help-export/` (niet in git) met:

- `help-export/<taal>/<id>.md`: één bestand per artikel, met bovenaan titel en publieke URL;
- `help-export/alles-<taal>.md`: alle artikels van een taal in één bestand.

Upload die bestanden in AnyChat als kennisbron voor de AI. AnyChat heeft geen vertaling per artikel,
dus upload elke taal apart (bv. in een map per taal). Kan AnyChat ook websites lezen, dan kan je
in de plaats de overzichtspagina's opgeven: `https://www.remoria.eu/help/`, `/fr/aide/` en `/en/help/`
(of de sitemap `https://www.remoria.eu/sitemap-index.xml`).

## "Was dit artikel nuttig?"

Voorlopig ziet de bezoeker alleen een bedankje; het antwoord wordt nergens opgeslagen.
Om de antwoorden later te bewaren, zonder maandelijkse kosten:

1. Maak in Cloudflare een gratis D1-database met een tabel `help_feedback` (id, taal, nuttig ja/nee, datum).
2. Voeg een klein functietje `functions/api/help-feedback.js` toe dat het antwoord in die tabel schrijft
   (zoals `functions/api/newsletter.js` het voor de nieuwsbrief doet).
3. Zet in `src/help/config.mjs` `HELP_FEEDBACK_ENDPOINT = '/api/help-feedback'`.

De knoppen sturen dan `{ id, lang, helpful, page }` naar dat adres.

## Een taal toevoegen

Voeg de taal toe in `src/help/config.mjs` (`HELP_LANGS`, `HELP_BASE`, `HELP_LANG_NAMES`, `HELP_DATE_LOCALE`),
in de taalinstellingen van de site (`astro.config.mjs`, `src/i18n`), maak een map `src/content/help/<taal>/`
en een map met pagina's onder `src/pages/<taal>/`, zoals `src/pages/fr/aide/`.
