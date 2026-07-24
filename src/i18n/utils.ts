import { getRelativeLocaleUrl } from 'astro:i18n';
import { ui, type Locale, defaultLocale, locales } from './ui';

export { defaultLocale, locales };
export type { Locale };

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getLocale(currentLocale: string | undefined): Locale {
  return isLocale(currentLocale) ? currentLocale : defaultLocale;
}

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/** Look up a string translation by dot-path. */
export function t(locale: Locale, key: string): string {
  const value = getByPath(ui[locale], key) ?? getByPath(ui[defaultLocale], key);
  if (typeof value !== 'string') {
    console.warn(`[i18n] Missing string for key "${key}" in locale "${locale}"`);
    return key;
  }
  return value;
}

/** Look up arrays/objects (FAQs, plans, feature lists, …). */
export function tp<T = unknown>(locale: Locale, key: string): T {
  const value = getByPath(ui[locale], key) ?? getByPath(ui[defaultLocale], key);
  if (value === undefined) {
    console.warn(`[i18n] Missing object for key "${key}" in locale "${locale}"`);
    return [] as T;
  }
  return value as T;
}

/**
 * Build a localized path. Accepts absolute paths like `/prijzen` or `/contact#plan-een-gesprek`.
 * Hash fragments are preserved.
 */
export function localizePath(locale: Locale, path = '/'): string {
  const [pathname, hash = ''] = path.split('#');
  const clean = (pathname || '/').replace(/^\/+/, '').replace(/\/+$/, '');
  const localized = getRelativeLocaleUrl(locale, clean || undefined);
  return hash ? `${localized}#${hash}` : localized;
}

/** Strip locale prefix from a pathname for switcher navigation. */
export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (parts.length && isLocale(parts[0]) && parts[0] !== defaultLocale) {
    const rest = parts.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname || '/';
}

export const localeLabels: Record<Locale, string> = {
  nl: 'NL',
  en: 'EN',
  fr: 'FR',
};
