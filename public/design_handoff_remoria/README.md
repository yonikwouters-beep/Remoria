# Handoff: Remoria website-herontwerp — Home, Voor uitvaartsector, Voor nabestaanden (feature-sectie)

## Overview
Herontwerp van drie onderdelen van remoria.eu:
1. **Home** — volledige pagina: hero, feature-kwartet, twee doelgroep-kaarten met live HTML-mockups (telefoon-app + partnerdashboard), donkere CTA.
2. **Voor uitvaartsector** — volledige pagina: hero met boogvormig beeld, "Zo werkt het" (4 stappen), groot live dashboard-mockup, partnermodel (3 kaarten), "wat de familie krijgt" (3 kaarten), quote-CTA met fotobanner.
3. **Voor nabestaanden — feature-sectie** — de sectie "Alles wat je krijgt" met live mockups (fotogalerij, community chat, condoleanceregister), fotoboek, prijsblok (€85-herkadering) en demo-CTA.

## About the Design Files
Deze bestanden zijn **design-referenties gemaakt in HTML** — prototypes die look en gedrag tonen, geen productiecode. Bouw ze na in de bestaande omgeving van de doelcodebase (React, Vue, WordPress-theme, …) met de daar gangbare patronen. Bestaat er nog geen omgeving, kies dan het meest geschikte framework.

- `home-preview-standalone.html`, `uitvaartsector-preview-standalone.html`, `nabestaanden-features-preview-standalone.html` — openen direct in de browser. **Gebruik deze als visuele referentie.**
- `source/*.dc.html` — bronopmaak; alle styles staan inline op de elementen (negeer de runtime-scaffolding; de markup tussen `<x-dc>`-tags is de referentie).
- `source/assets/`, `source/uploads/` — beeldmateriaal.

## Fidelity
**High-fidelity.** Kleuren, typografie, spacing en copy zijn definitief bedoeld; bouw pixel-nauwkeurig na.

## BELANGRIJK: app-mockups zijn HTML, geen afbeeldingen
De telefoon-mockup (Home, nabestaanden-kaart) en de dashboard-mockups (Home + uitvaartsector-pagina) zijn volledig in HTML/CSS opgebouwd zodat alle tekst **vertaalbaar is (NL/FR/EN)**. Implementeer ze als componenten met tekst-props/i18n-strings, niet als screenshots. Achtergrond in de telefoonheader is een tekstvrije afbeelding (`Uitvaartsector-remoria.webp`).

## Design Tokens
Kleuren:
- Achtergrond: `#F6F1E8`; kaart/mockup: `#FDFBF7`, rand `#E7DFD2`
- Navy: `#1C2A43` (koppen, knoppen, donkere vlakken); telefoonframe `#10131C`
- Goud: `#B8934A` (eyebrows/checks), knop `#D9B36A` (hover `#E3C285`), chipvlak `#F3E7CF`, gradientknop `linear-gradient(90deg,#E3BE5F,#D9B36A)`
- Tekst: `#4A4438`; gedempt `#7A7263`; meta `#A79C87`/`#B4A98F`; sidebar-item `#8A7F6B`
- Paneeltinten: beige `#EFE6D5`, blauwgrijs `#E2E7EC`, salie `#E5EADF`, roze `#F0E4DF`; actief sidebar-item `#F6EADF`
- Status-chips: groen `#DDE5D4`/`#5C7048`, goud `#F3E7CF`/`#96742F`, blauw accent `#4A6E8C`

Typografie: **Playfair Display** 500–600 voor koppen (H1 48–54px/1.12, H2 38–44px/1.15, H3 24–30px/1.2); **Nunito Sans** voor body/UI (body 16–17.5px/1.65, checks 13.5–15px/600, eyebrow 12px/800/ls 2.5px uppercase, chips 11.5px/800/ls 1.8px).

Overig: container max 1140–1180px; sectiepadding 64–96px; radii: panelen 20–24px, kaarten 14–16px, knoppen pill; schaduw mockups `0 18px 40px -18px rgba(28,42,67,.25)`.

## Home — secties
1. **Nav**: logo (boog-icoon + "Remoria" Playfair 22px), links 14.5px/600, navy pill "Inloggen".
2. **Hero**: `hero-visual.png` rechts als achtergrond (62% breed, object-position right) met gradient-fade naar `#F6F1E8` op 38–78%; links max 520px: eyebrow "HERINNERINGEN VERBINDEN. VOOR ALTIJD.", H1 "Een plek waar herinneringen samenkomen" (54px), intro, navy pill "Start een gedenkplek →" + witte pill met play-dot "Bekijk een voorbeeld", slotje-regel "Veilig, besloten en met liefde gemaakt".
3. **Features (4 kaarten)**: eyebrow "ALLES WAT JE NODIG HEBT", H2 "Herinneringen op jouw manier"; kaarten `#FDFBF7`, icoon-tegel 44px `#F3E7CF`, titels Playfair 18px: Verzamel alle media / Plaats een eerbetoon / Praat met elkaar / Maak het tastbaar.
4. **Doelgroep-kaarten** (grid `repeat(auto-fit, minmax(480px, 1fr))`, gap 20px — stapelt onder ~1150px):
   - **Nabestaanden** (achtergrond `flowers-background.webp` left bottom/cover op `#EFE6D5`): binnen-grid `minmax(0,1fr) 195px`, gap 24, align-items center; tekstkolom `align-self: start` (eyebrow, H3 24px "Samen herinneren, samen helen", intro 14px, 3 gouden checks, navy pill-CTA nowrap). Rechts: **HTML-telefoonmockup** (breedte 226px, zoom .85, `align-self: end`, `margin-bottom: -64px` zodat hij door de kaartrand zakt): frame `#10131C` radius 30px, statusbalk 9:41+notch, header op boog-foto met overlay `linear-gradient(180deg, rgba(30,30,40,.38), rgba(30,30,40,.12))`: "✨ Deel je Herinneringen ♡" (Playfair 13px wit) + subtekst; witte uploadkaart (gouden cirkel 32px + 2 satelliet-iconen, gouden gradientknop "Upload je Herinneringen", sleep-tekst, formatenregel); kaart "Herinneringencollectie" + pill "Bekijk alles ›" + tegels 13 Foto's (navy, goud icoon) / 0 Video's (`#EDE3C8`); tab-bar `#10131C`: Home (actief, wit pill-vlak), Media (paars #B08CD9), Eerbetonen (roze #E07A9A), Community Chat (groen #7FBF8E), Fotoboek (goud #D9B36A).
   - **Uitvaartsector** (`#E2E7EC`, padding rechts 0): binnen-grid `minmax(0,1fr) 274px`, tekstkolom idem (H3 "Nazorg die je kantoor onderscheidt", 3 checks met blauwe #4A6E8C vinkjes, CTA). Rechts: **HTML-dashboardmockup** (zoom .75, tegen rechterrand: radius 12px 0 0 12px, border zonder rechts): browserbalk (3 dots + pill "partner.remoria.eu"), sidebar (logo, Overzicht actief `#F6EADF`, Gedenkplekken, Medewerkers, Statistieken, Instellingen), main: "Overzicht" + sub "Al uw gedenkplekken in één oogopslag." + navy knop "+ Nieuwe gedenkplek", 3 statkaartjes (23 Gedenkplekken / 1.248 Communityleden / 342 Herinneringen), "Recente gedenkplekken" 2 rijen (foto-thumb 22px, naam, "156 leden · 432 herinneringen", Open-pill).
5. **Donkere CTA** (`#1C2A43`): boog-lijnicoon goud, H2 "Herinneringen vervagen niet, als je ze deelt", gouden pill-CTA, slotje-regel.

## Voor uitvaartsector — secties
1. **Hero**: grid 6fr/5fr; links eyebrow "REMORIA VOOR DE UITVAARTSECTOR", H1 48px "Nazorg die families verbindt — en jouw kantoor onderscheidt", intro, gouden pill "Word partner →" + witte pill "Plan een demo" (kalender-icoon), daaronder 3 mini-checks (Gratis partnerportaal / Geen verplichtingen / Vaste winst per plan). Rechts: `Uitvaartsector-remoria.webp`, aspect 4/4.6, **border-radius 220px 220px 20px 20px** (boogvorm), schaduw.
2. **Zo werkt het** (band `#EFE6D5`): 4 witte kaarten met nummercirkels navy 34px + lijntje: Meld je kantoor aan / Maak een gedenkplek in seconden / De familie neemt het over / Gebruik het voor de ceremonie.
3. **Dashboard-sectie**: grid 5fr/7fr; links chip "JOUW DASHBOARD" (blauwgrijs), H3 "Alles in één oogopslag, alles onder controle", 3 checks. Rechts op paneel `#E2E7EC`: **grote HTML-dashboardmockup**: browserbalk; sidebar 148px (logo, Overzicht actief, Gedenkplekken, Medewerkers, Statistieken, Instellingen, Help & support, alle met lijn-iconen); main: "Overzicht" 17px/800 + sub + navy knop; 3 statkaarten met peach icoon-tegels 28px (23 Actieve gedenkplekken / 1.248 Communityleden / 342 Gedeelde Herinneringen); 3 rijen Recente gedenkplekken (foto 30px radius 7, naam + "Aangemaakt op 15-06-2026", "156 leden", "432 herinneringen", Open-pill): Jan De Vries / Maria Jansen / Peter Mertens.
4. **Partnermodel**: eyebrow "TRANSPARANT PARTNERMODEL", H2 "Geen risico, wel rendement" + sub; 3 kaarten: Gratis portaal (schild-icoon) / Vaste winst per plan (**€-teken**, 20px/700, in goud-tegel) / Eén maandfactuur (document-icoon); daaronder tekstlink "Plan een vrijblijvende kennismaking →".
5. **Wat jij de familie aanbiedt**: 3 tintkaarten (beige/salie/roze) met witte icoon-tegels: Een gedeelde mediacollectie / Een besloten community / Een tastbaar fotoboek.
6. **Quote-CTA**: kaart radius 24px, achtergrond **`Banner-uitvaartsector.png`** (center/cover, fallback `#16223C`); links Playfair-quote 32px wit; rechts gouden pill "Word partner →" + outline-pill "Neem contact op" + regel "Verwerkersovereenkomst inbegrepen…".

## Voor nabestaanden — feature-sectie
Zie sectiebeschrijving in eerdere handoff; ongewijzigd meegeleverd: sectiekop + demolink, 4 feature-rijen (fotogalerij-mockup met echte foto's, chat-mockup met typ-indicator (CSS-keyframes: 3 dots, opacity .25→1 + translateY(-3px), 1.2s, delays 0/.2/.4s), condoleance-mockup met pulserend hart (scale 1→1.15, 3s), fotoboek-productfoto `pasted-1784982973553-0.png`), prijsblok (navy kaart €85 Playfair 52px, "eenmalig · 4 maanden", 4 checks, gouden CTA — ⚠ verifieer de "14 dagen geld terug"-claim) en demo-CTA-band.

## Interactions & Behavior
- Hover: navy knop → `#2A3B5C`; gouden knop → `#E3C285`; outline-knop → rand navy/wit; feature-kaarten → zachte schaduw.
- Links: demo-/start-/partner-URL's zijn placeholders (remoria.eu/demo, /start, /word-partner, /plan-een-demo) — vervang door echte routes.
- Mockups zijn decoratief; geen echte interactie vereist. Alle mockup-teksten via i18n-strings.
- Responsive: doelgroep-kaarten stapelen onder ~1150px; feature-grids naar 2/1 kolommen; hero's stapelen (beeld boven tekst of fade-overlay behouden).

## State Management
Geen — statische marketingpagina's. Variabelen: CTA-URL's, taal (i18n voor alle teksten incl. mockups).

## Assets
- `hero-visual.png` (home hero), `flowers-background.webp` (nabestaanden-kaart), `Uitvaartsector-remoria.webp` (uitvaart-hero + telefoonheader-achtergrond), `Banner-uitvaartsector.png` (quote-CTA), `pasted-1784982973553-0.png` (fotoboek)
- `assets/photo-01..10.png` — voorbeeldfoto's (uit klant-screenshot geknipt; vervang bij voorkeur door originelen op hogere resolutie)
- Iconen: inline SVG (Lucide-stijl, stroke 2–2.2); fonts via Google Fonts: Playfair Display 500–700, Nunito Sans 400–800
- Fictieve data in mockups (23 / 1.248 / 342, namen, datums) — vervang gerust.

## Files
- `home-preview-standalone.html` / `uitvaartsector-preview-standalone.html` / `nabestaanden-features-preview-standalone.html` — visuele referenties
- `source/Home.dc.html`, `source/Voor uitvaartsector.dc.html`, `source/Voor nabestaanden - features.dc.html` — bronopmaak
- `source/assets/`, `source/uploads/` — beeldmateriaal
