# Handoff: Remoria "Voor nabestaanden" — feature-sectie herontwerp

## Overview
Herontwerp van de feature-sectie ("Alles wat je krijgt") van https://www.remoria.eu/voor-nabestaanden/. De sectie toont vier kernfeatures van de webapp als nagebouwde live UI-mockups, gevolgd door een prijsblok dat de €85 herkadert als eenmalige service, en een demo-CTA-band. Doel: bezoekers overtuigen om direct een gedenkplek te starten.

## About the Design Files
De bestanden in deze bundel zijn **design-referenties gemaakt in HTML** — prototypes die de bedoelde look en gedrag tonen, geen productiecode om letterlijk over te nemen. De taak is deze designs **na te bouwen in de bestaande omgeving van de doelcodebase** (React, Vue, WordPress-theme, etc.) met de daar gangbare patronen en libraries. Bestaat er nog geen omgeving, kies dan het meest geschikte framework.

- `features-preview-standalone.html` — zelfstandig bestand, opent direct in een browser (alles inline). **Gebruik dit als visuele referentie.**
- `source/Voor nabestaanden - features.dc.html` — de bronopmaak (alle styles inline op de elementen; negeer de runtime-scaffolding, de markup tussen `<x-dc>`-tags is de referentie).
- `source/assets/photo-01..10.png` — voorbeeldfoto's gebruikt in de galerij-mockup (vervang door eigen beeldmateriaal indien gewenst).
- `source/uploads/pasted-1784982973553-0.png` — productfoto van het fotoboek.

## Fidelity
**High-fidelity.** Kleuren, typografie, spacing en copy zijn definitief bedoeld. Bouw pixel-nauwkeurig na met de bestaande stack van de site.

## Design Tokens
Kleuren:
- Achtergrond sectie: `#F6F1E8` (crème)
- Kaart/mockup-achtergrond: `#FDFBF7`, rand `#E7DFD2`
- Donker navy (koppen, donkere kaart, primaire knop): `#1C2A43`
- Goud-accent: `#B8934A` (eyebrows, checks), knop-goud `#D9B36A`, chip-achtergrond `#F3E7CF`
- Bodytekst: `#4A4438`, gedempt `#7A7263`, subtiel/meta `#A79C87` / `#B4A98F`
- Paneel-tinten achter mockups: beige `#EFE6D5`, salie `#E5EADF`, roze `#F0E4DF`
- Chip-varianten: salie `#DDE5D4`/tekst `#5C7048`; roze `#F0DFDA`/tekst `#96605C`; goud `#F3E7CF`/tekst `#96742F`

Typografie:
- Koppen: **Playfair Display** 600 — sectiekop 44px/1.15, feature-koppen 30px/1.2, prijsblok 34px, prijs 52px
- Body/UI: **Nunito Sans** — body 16px/1.7, intro 17px/1.65, checks 15px/600, eyebrow 12px/800/letter-spacing 2.5px/uppercase, chips 11.5px/800/letter-spacing 1.8px

Overig:
- Sectie max-breedte 1140px, padding 88px 24px 96px
- Feature-rijen: CSS grid `5fr 6fr` (of gespiegeld `6fr 5fr`), gap 64px, verticale afstand tussen rijen 88px
- Radii: tintpaneel 20px, mockup-kaart 14px, prijskaart 18px/24px, knoppen pill (999px)
- Schaduw mockups: `0 18px 40px -18px rgba(28,42,67,.25)`

## Screens / Views (één pagina-sectie, van boven naar onder)

### 1. Sectiekop (gecentreerd, max 640px)
- Eyebrow "ALLES WAT JE KRIJGT" (goud)
- H2 "Eén plek waar alle herinneringen samenkomen"
- Intro: "Iedereen die van hem of haar hield, draagt een stukje bij: foto's die je nog nooit zag, verhalen die je nog niet kende, woorden die blijven. Dit is wat er op een gedenkplek gebeurt."
- Tekstlink naar demo: "Bekijk een echte voorbeeldplek →" (goud, onderstreept met `#D8BE8A`)

### 2. Feature: Foto's, video's & audio (tekst links, mockup rechts op beige paneel)
- Chip met foto-icoon, kop "De foto's die niemand nog van elkaar had gezien"
- Copy over foto's/video's/spraakopnames die iedereen bijdraagt
- 3 gouden checkmarks: "Iedereen die je uitnodigt kan bijdragen" / "Ook video's en spraakopnames" / "Overzichtelijk geordend in albums"
- Mockup: browserkaart (3 dots + url-pill "app.remoria.eu"), titel "Gedeelde Herinneringen" (Playfair 19px), gouden knop "↑ Herinnering toevoegen", filterchips (Alle actief goud, Foto's/Video's/Audio inactief), meta "13 bijdragen · 6 mensen", fotogrid 4×2 (vierkant, radius 7px, gap 7px), laatste tegel donker overlay "+5"

### 3. Feature: Community chat (mockup links op salie-paneel, tekst rechts)
- Chip "COMMUNITY CHAT" (salie), kop "Verhalen die anders nooit verteld waren"
- 2 checks: "Volledig besloten — alleen wie jij uitnodigt" / "Eenvoudig genoeg voor elke leeftijd"
- Mockup: header met avatar + "Community Chat / 24 deelnemers", vastgepind bericht (📌 An Calleem, achtergrond `#F8F3E9`), 2 chatberichten met initiaal-avatars (WV paars `#E3D5EE`, AC blauw `#D5E3EE`), typindicator met 3 pulserende dots (DP roze `#EED9D5`; CSS-animatie ~1.2s), inputbalk "Typ een bericht..." + gouden verzendknop

### 4. Feature: Ter Nagedachtenis (tekst links, mockup rechts op roze paneel)
- Chip "TER NAGEDACHTENIS" (roze, hart-icoon), kop "Woorden die blijven staan"
- 2 checks: "Een blijvend condoleanceregister" / "Ook voor wie niet op de uitvaart kon zijn"
- Mockup: gecentreerde kop met pulserend hart-icoon in cirkel (animatie scale 1→1.15, 3s), "Ter Nagedachtenis" + subtitel, 2 condoleancekaarten (rand `#EFE8DB`, radius 12px) met initialen, naam, datum, cursief citaat, hartje + aantal (7 en 12)

### 5. Feature: Fotoboek (productfoto links, tekst rechts)
- Foto: `pasted-1784982973553-0.png`, radius 20px, aspect-ratio 736/620, object-position 50% 42%
- Chip "HET FOTOBOEK" (goud), kop "En dan houd je het vast, in je handen"
- 3 genummerde stappen (navy cirkels 26px): Selecteer de momenten / Personaliseer de omslag, titel en indeling / Ontvang het thuis

### 6. Prijsblok (witte kaart, grid 6fr/5fr)
- Links: eyebrow "WAT KOST HET?", kop "Foto's die je anders nooit had gezien. Voor €85.", twee alinea's die de prijs herkaderen (eenmalig, geen sluipend abonnement, 4 volle maanden, daarna zelf beslissen: verlengen of afronden met fotoboek)
- Rechts: navy kaart — "€85" (Playfair 52px) + "eenmalig · 4 maanden", divider, 4 gouden checks: "Volledige gedenkplek met alles hierboven" / "Nodig zoveel familie en vrienden uit als je wil" / "Verlengen kan, maar hoeft niet" / "14 dagen niet tevreden? Geld terug" (⚠ verifieer deze garantieclaim), gouden pill-knop "Start een gedenkplek →"

### 7. Demo-CTA (gecentreerd)
- Kop "Liever eerst zien hoe het voelt?", copy "Loop vrijblijvend rond op een echte voorbeeldplek. Geen account nodig, niets te installeren."
- 2 knoppen naast elkaar: navy gevuld "▶ Bekijk de voorbeeldplek" + outline "Start een gedenkplek →"

## Interactions & Behavior
- Hover primaire navy knop: `#2A3B5C`; gouden knop: `#E3C285`; outline-knop: rand wordt navy
- Typindicator: 3 dots, keyframes opacity .25→1 + translateY(-3px), 1.2s loop, delays 0/.2s/.4s
- Hart-icoon: zachte puls (scale 1.15), 3s ease-in-out loop
- Links: demo-URL en start-URL zijn configureerbaar (placeholder: remoria.eu/demo en /start — vervang door echte routes)
- Mockups zijn statisch/decoratief; geen echte interactie vereist
- Responsive: op smalle schermen grids naar 1 kolom stapelen (tekst boven mockup); fotogrid mag 3 kolommen worden

## State Management
Geen — statische marketingsectie. Enige variabelen: demo-URL, start-URL, en optioneel het prijsblok tonen/verbergen.

## Assets
- 10 uitgeknipte voorbeeldfoto's (`assets/photo-*.png`) — afkomstig uit een app-screenshot van de klant; vervang eventueel door originele bestanden op hogere resolutie
- Fotoboek-productfoto (`uploads/pasted-1784982973553-0.png`) — eigen productfotografie
- Iconen: inline SVG (Lucide-stijl, stroke 2–2.2)
- Fonts via Google Fonts: Playfair Display (500–700), Nunito Sans (400–800)

## Files
- `features-preview-standalone.html` — open in browser als visuele referentie
- `source/Voor nabestaanden - features.dc.html` — bronopmaak met alle inline styles
- `source/assets/`, `source/uploads/` — beeldmateriaal
