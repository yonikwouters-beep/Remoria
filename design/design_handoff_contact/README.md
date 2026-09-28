# Handoff: Remoria — Contactpagina (herontwerp)

## Overview
Herontwerp van remoria.eu/contact: warme, on-brand contactpagina met twee duidelijke routes (e-mail voor families, kennismaking voor uitvaartprofessionals) en een formulier met werkende verstuur-bevestiging.

## About the Design Files
Dit is een **design-referentie in HTML** — geen productiecode. Bouw na in de bestaande omgeving (zelfde stack en tokens als de eerdere Remoria-handoffs).
- `contact-preview-standalone.html` — opent direct in de browser; **visuele referentie**.
- `source/Contact.dc.html` — bronopmaak, alle styles inline (markup tussen `<x-dc>`-tags is de referentie).

## Fidelity
**High-fidelity.** Design tokens identiek aan eerdere handoffs: Playfair Display + Nunito Sans; cream `#F6F1E8`, kaart `#FDFBF7`/rand `#E7DFD2`, navy `#1C2A43`, goud `#B8934A`/`#D9B36A`, tekst `#4A4438`/`#7A7263`/`#A79C87`.

## Layout
Sectie op achtergrond `linear-gradient(180deg, #F1E9D9, transparent 420px), url(flowers-background.webp) left bottom / 560px auto no-repeat` op `#F6F1E8`. Grid `minmax(0,5fr) minmax(0,6fr)`, gap 64, align-items start, container 1140px.

### Linkerkolom
- Eyebrow "CONTACT", H1 Playfair 48px "Hoe kunnen we helpen?", intro 16.5px.
- Reassurance-regel (goud, klok-icoon): "We antwoorden meestal binnen één werkdag" (⚠ verifieer belofte).
- **E-mailkaart** (klikbare `mailto:hello@remoria.eu`): icoon-tegel 44px `#F3E7CF`, label "E-MAIL", "hello@remoria.eu" Playfair 19px, sub "Voor alle vragen — groot of klein. Ook 's avonds mag." Hover: schaduw.
- **Gesprekskaart**: icoon-tegel `#E2E7EC` (kalender), label "PLAN EEN GESPREK", "Voor uitvaartprofessionals" Playfair 19px, sub "…vrijblijvende kennismaking van 20 minuten" (⚠ verifieer duur), navy pill "Bekijk beschikbaarheid →".
- **FAQ-tip** (band `#F8F3E9`, rand `#E7DFC2`): vraagteken-icoon + "Snel antwoord nodig over prijzen of verlengen? Kijk eerst even bij de veelgestelde vragen" (link naar /prijzen#faq).

### Rechterkolom — formulierkaart
Kaart `#FDFBF7`, radius 20px, padding 40px, schaduw `0 22px 44px -24px rgba(28,42,67,.25)`.
- Kop Playfair 22px "Stuur ons een bericht" + sub "We lezen elk bericht persoonlijk."
- Velden: Naam + E-mail (2 kolommen), select "Waarover gaat je vraag?" met opties **Algemene vraag / Partnerschap (uitvaartsector) / Support**, textarea "Bericht" (placeholder "Hoe kunnen we je helpen? Vertel gerust in je eigen woorden.", 5 rijen, resize vertical).
- Veldstijl: wit, rand `#E7DFD2`, radius 10px, padding 12px 14px, 14px; focus: rand `#C9A86B` + ring `0 0 0 3px rgba(217,179,106,.2)`.
- Succesmelding (pas ná verzenden tonen): groene band `#EAF0E4`/rand `#CBDABD`/tekst `#5C7048` met vinkje: "Bedankt! Je bericht is verstuurd. We antwoorden zo snel mogelijk."
- Onderaan: gouden pill-knop "Verstuur bericht →" (hover `#E3C285`) + slotje-regel "Je gegevens gebruiken we alleen om je te antwoorden".

## Interactions & Behavior
- Submit toont de succesmelding en verstuurt het formulier naar jullie backend/e-mailservice (in het prototype alleen de melding).
- Validatie toevoegen: naam/e-mail verplicht, e-mailformaat.
- Alle teksten via i18n (NL/FR/EN).

## State Management
`sent` boolean voor de succesmelding; verder regulier formulier-state.

## Assets
`flowers-background.webp` (linksonder, 560px breed). Fonts: Google Fonts Playfair Display + Nunito Sans.

## Files
- `contact-preview-standalone.html`
- `source/Contact.dc.html`, `source/uploads/flowers-background.webp`
