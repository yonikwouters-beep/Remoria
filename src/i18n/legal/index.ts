import type { Locale } from '../ui';
import type { LegalDoc } from './types';
import { privacyNl, termsNl } from './nl';
import { privacyEn, termsEn } from './en';
import { privacyFr, termsFr } from './fr';

export type LegalDocId = 'privacy' | 'terms';

const docs: Record<Locale, Record<LegalDocId, LegalDoc>> = {
  nl: { privacy: privacyNl, terms: termsNl },
  en: { privacy: privacyEn, terms: termsEn },
  fr: { privacy: privacyFr, terms: termsFr },
};

export function getLegalDoc(locale: Locale, id: LegalDocId): LegalDoc {
  return docs[locale][id];
}

export type { LegalDoc, LegalBlock, LegalSection } from './types';
