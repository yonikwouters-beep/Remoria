import { nl } from './locales/nl';
import { en } from './locales/en';
import { fr } from './locales/fr';

export const defaultLocale = 'nl' as const;
export const locales = ['nl', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const ui = { nl, en, fr } as const;
export type UiDictionary = typeof nl;
