export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  brand: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
  companyLine: string;
  seeAlsoLabel: string;
  seeAlsoHref: '/privacy' | '/algemene-voorwaarden';
  seeAlsoText: string;
};
