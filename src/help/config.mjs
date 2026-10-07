/**
 * Gedeelde instellingen voor het help center (kennisbank).
 *
 * Plain JavaScript zodat zowel de Astro-pagina's als de Node-scripts
 * (scripts/help-*.mjs) en astro.config.mjs dit bestand kunnen importeren.
 *
 * Een taal toevoegen: zet ze hier in HELP_LANGS + HELP_BASE, maak een map
 * src/content/help/<taal>/ en voeg de taal toe aan de i18n-instellingen van de site.
 */

export const SITE_URL = 'https://www.remoria.eu';

/** Talen van het help center, in de volgorde van de taalwisselaar. */
export const HELP_LANGS = ['nl', 'fr', 'en'];

/** Taal waarnaar /help/go/ terugvalt als de gevraagde vertaling ontbreekt. */
/** Doelgroepen, in de volgorde waarin ze op de overzichtspagina staan. */
export const HELP_AUDIENCES = ['nabestaanden', 'partners'];

export const HELP_FALLBACK_LANG = 'en';

/** Basispad van het help center per taal (zonder slash op het einde). */
export const HELP_BASE = {
  nl: '/help',
  fr: '/fr/aide',
  en: '/en/help',
};

/** Naam van elke taal in die taal zelf (voor de taalwisselaar op artikels). */
export const HELP_LANG_NAMES = {
  nl: 'Nederlands',
  fr: 'Français',
  en: 'English',
};

/** Locale voor datums ("Bijgewerkt op ..."). */
export const HELP_DATE_LOCALE = {
  nl: 'nl-BE',
  fr: 'fr-BE',
  en: 'en-GB',
};

/**
 * Adres waarnaar "Was dit artikel nuttig?" de antwoorden stuurt.
 * Leeg = niets versturen (de bezoeker ziet wel een bedankje). Zie src/content/help/README.md.
 */
export const HELP_FEEDBACK_ENDPOINT = '';

/** Ids die niet als artikel mogen bestaan omdat ze al een route zijn. */
export const RESERVED_IDS = ['go'];

export function isHelpLang(value) {
  return typeof value === 'string' && HELP_LANGS.includes(value);
}

/** Overzichtspagina van het help center in een taal, bv. "/fr/aide/". */
export function helpHomePath(lang) {
  return `${HELP_BASE[lang]}/`;
}

/** Pad van een artikel, bv. "/fr/aide/ai-wallet/". */
export function helpArticlePath(lang, slug) {
  return `${HELP_BASE[lang]}/${slug}/`;
}

/** Volledige publieke URL van een pad. */
export function absoluteUrl(path) {
  return new URL(path, SITE_URL).href;
}
