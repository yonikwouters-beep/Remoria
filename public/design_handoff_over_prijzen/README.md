# Handoff: Remoria — "Over Remoria" + "Prijzen" (herontwerp)

## Overview
Herontwerp van twee pagina's van remoria.eu:
1. **Over Remoria** — hero met arch-foto en quote, verhaalkaart met boom-visual, kernwaarden 2×2, donkere CTA-band met boom, twee doelgroep-fotokaarten.
2. **Prijzen** — de belangrijkste conversiepagina: 3 plankaarten met boompjes-illustraties, trust-strip, verlengladder, voordelen, uitklapbare FAQ, referral-banner.

## About the Design Files
Dit zijn **design-referenties in HTML** — geen productiecode. Bouw ze na in de bestaande omgeving van de doelcodebase met de daar gangbare patronen (zelfde stack als de eerdere Remoria-handoffs).

- `over-remoria-preview-standalone.html` / `prijzen-preview-standalone.html` — openen direct in de browser; **visuele referentie**.
- `source/*.dc.html` — bronopmaak, alle styles inline (markup tussen `<x-dc>`-tags is de referentie).
- `source/uploads/` — beeldmateriaal.

## Fidelity
**High-fidelity.** Pixel-nauwkeurig nabouwen. Design tokens identiek aan de eerdere handoff (Playfair Display + Nunito Sans; cream `#F6F1E8`, kaart `#FDFBF7`/rand `#E7DFD2`, navy `#1C2A43`, goud `#B8934A`/`#D9B36A`, tekst `#4A4438`/`#7A7263`/`#A79C87`).

## Over Remoria — secties
1. **Nav** (Over Remoria actief).
2. **Hero** op warme gradientband `linear-gradient(180deg, #F1E9D9, transparent)`: links eyebrow "OVER REMORIA", H1 50px "Het verhaal achter Remoria", quote met gouden accentlijn (3px `#D9B36A`) — Playfair italic 21px `#7A7263`; rechts `family-album-about-us.webp` in boogvorm (aspect 4/4.4, radius 215px 215px 20px 20px, schaduw).
3. **Verhaalkaart**: achtergrond `over-ons-verbinding-na-het-afscheid.webp` (right center/cover — links vervaagd), radius 24px; tekstkolom max 470px: eyebrow "WAAROM REMORIA BESTAAT", H2 34px "Omdat de mooiste foto's vaak nooit aankomen", 3 paragrafen 15.5px/1.75 `#5C5548`, bold slotregel "Herinneringen zijn er om te delen. Wij zorgen dat ze aankomen.", signatuur Playfair italic goud "— De oprichter van Remoria" (⚠ echte naam invullen).
4. **Kernwaarden** 2×2 (gap 20): witte kaarten, icoon-tegel 46px `#F3E7CF` naast tekst; titels Playfair 19px: Toegankelijk voor iedereen / Veilig en discreet / De brug tussen generaties / Tastbaar blijft.
5. **CTA-band**: `linear-gradient(90deg, #1C2A43 40%, rgba(28,42,67,.55)), url(over-ons-verbinding-na-het-afscheid.webp) right center/cover`, radius 24px; H2 wit 34px "Herinneringen verdienen een blijvende plek", sub `#CEC5B0`, gouden pill "Start een gedenkplek →" + witte outline-pill "Bekijk een voorbeeld".
6. **Doelgroep-kaarten** (grid auto-fit minmax(400px,1fr), klikbaar, min-height 240px): achtergrond = foto + gradient-overlay zodat de tekstzone links rustig blijft: `linear-gradient(90deg, #F4EDE1 55%, rgba(244,237,225,.85) 72%, rgba(244,237,225,0) 92%), url(over-ons-voor-nabestaanden.webp) right center/cover` (rechterkaart idem met `#EFEBE2` + voor-uitvaartprofessionals.webp). Tekst max-width 320px; koppen Playfair 24px "Samen herinneren, in jullie tempo" / "Meer dan een dienstverlener"; arrow-link onderaan.

## Prijzen — secties
1. **Nav** (Prijzen actief).
2. **Kop** gecentreerd: eyebrow "PRIJZEN", H1 46px "Kies het plan dat bij jullie past", sub "Je betaalt één keer, voor de gedenkplek zelf...", bold regel "Elk plan bevat álle functies — alleen de looptijd verschilt."
3. **3 plankaarten** (grid 3 kolommen, gap 20):
   - Elke kaart: illustratie 96px (`Kiempje-remoria.png` / `jonge-boom-remoria.png` / `Groteboom-remoria.png`), plannaam Playfair 21px, looptijd-eyebrow goud, prijs Playfair 46px, regel "eenmalig · ≈ €X per maand", beschrijving 14px, CTA "Start met dit plan".
   - **Samen Herinneren** — 4 maanden — €85 (≈ €21,25/m): "Vier maanden — ruim de tijd om iedereen uit te nodigen en alle foto's en verhalen te verzamelen die anders verloren gaan. De foto's die je anders nooit had gezien, voor één vast bedrag." Outline-CTA.
   - **Samen Koesteren** — 1 jaar — €129 (≈ €10,75/m): border 2px navy, schaduw, badge "MEEST GEKOZEN" (gouden pill, halfbuiten bovenrand), gouden CTA. Copy: "Een vol jaar om te verzamelen én terug te keren: op de verjaardag, de sterfdag, de dagen die er zo toe doen."
   - **Een Blijvende Herinnering** — 3 jaar — €239 (≈ €6,64/m): "Drie jaar rust: de gedenkplek blijft bestaan en groeit met jullie mee." Outline-CTA.
4. **Trust-strip** (flex, gecentreerd, goud iconen 15px): 14 dagen geld terug / Geen automatische verlenging / Totaalprijs — geen verborgen kosten / Familie en vrienden dragen gratis bij. (⚠ garantieclaim verifiëren.)
5. **Verlengen-kaart** (grid 5fr/7fr): links H2 26px "Verlengen? Iedereen kan bijdragen" + uitleg (iedereen met toegang kan verlengen) + hartregel; rechts prijsladder 5 tegels: 1 maand €6,50 / 3 maanden €6/m / 6 maanden €5,50/m / 1 jaar €5/m / 1 jaar+ €4,85/m (laatste tegel highlight `#F8F3E9`).
6. **Voordelen** 4 kaarten: Deel en verzamel / Community chat / Plaats eerbetonen / Maak een fotoboek (optioneel bij te bestellen).
7. **FAQ** (max 720px): 8 uitklapbare items (native `<details>`, chevron roteert 180° bij open, transition .2s): plan afloopt (bericht vooraf, verlengen of afronden, niets automatisch) / familie betaalt niet / geen functieverschil / 14-dagen-garantie / fotoboek apart / iedereen kan verlengen / geen automatische verlenging / volledig privé. (⚠ antwoorden inhoudelijk nalezen.)
8. **Referral-banner**: effen `#F5EEE0` met **witte border 10px `#FFFDF8`** rondom, radius 28px; grid 7fr/4fr: links badge-chip "♥ ONTVANG €20 ALS DANK", H2 32px "Help een ander herinneringen koesteren", copy, navy pill "Deel de link en help een vriend →"; rechts `referral-remoria-621438f3.png` (transparante envelop-illustratie, max 300px). NB: de oude bakedin-achtergrondfoto is bewust vervallen (dubbele beeldelementen).

## Interactions & Behavior
- Hover: navy → `#2A3B5C`; goud → `#E3C285`; outline → rand navy; doelgroep-kaarten → schaduw.
- FAQ: `<details>/<summary>` zonder default marker; chevron-rotatie bij open.
- URLs zijn placeholders (`/start`, `/referral`, `/demo`) — vervang door echte routes.
- Responsive: plankaarten naar 1 kolom op mobiel (badge blijft op middelste kaart), verlengladder mag 2–3 kolommen wrappen, referral-banner stapelt (illustratie onder tekst).

## State Management
Geen — statisch. Variabelen: CTA-URL's, i18n voor alle teksten.

## Assets
Alle gebruikte beelden in `source/uploads/`; boompjes-illustraties zijn de plan-iconen (kiempje → jonge boom → volgroeide boom = 4 maanden → 1 jaar → 3 jaar). Fonts: Google Fonts Playfair Display (incl. italic) + Nunito Sans.

## Files
- `over-remoria-preview-standalone.html`, `prijzen-preview-standalone.html`
- `source/Over Remoria.dc.html`, `source/Prijzen.dc.html`, `source/uploads/`
