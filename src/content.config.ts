import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { HELP_AUDIENCES, HELP_LANGS, RESERVED_IDS } from './help/config.mjs';

/**
 * Help-artikels: één .md-bestand per artikel per taal in src/content/help/<taal>/.
 * Bestanden die met "_" beginnen (zoals _sjabloon.md) worden genegeerd.
 * Zie src/content/help/README.md.
 */
const help = defineCollection({
  loader: glob({
    base: './src/content/help',
    pattern: `{${HELP_LANGS.join(',')}}/[!_]*.md`,
    // Id van de entry = "<taal>/<bestandsnaam>", zodat hetzelfde artikel in elke taal kan bestaan.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    id: z
      .string()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'id: gebruik kleine letters, cijfers en koppeltekens (bv. ai-wallet)')
      .refine((value) => !RESERVED_IDS.includes(value), 'id: deze naam is gereserveerd'),
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    order: z.number().default(100),
    updated: z.coerce.date(),
    // Optioneel: eigen adres in deze taal (standaard het id).
    slug: z
      .string()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug: gebruik kleine letters, cijfers en koppeltekens')
      .optional(),
    // Optioneel: draft: true verbergt het artikel op de site en in de export.
    draft: z.boolean().default(false),
  }),
});

/** Categorieën met naam en beschrijving per taal (src/content/help/categorieen.yml). */
const helpCategories = defineCollection({
  loader: file('./src/content/help/categorieen.yml'),
  schema: z.object({
    // Voor wie de categorie is: nabestaanden (families en bezoekers) of partners (uitvaartondernemers).
    audience: z.enum(HELP_AUDIENCES as [string, ...string[]]),
    order: z.number().default(100),
    ...Object.fromEntries(
      HELP_LANGS.map((lang) => [
        lang,
        z.object({ title: z.string(), description: z.string().default('') }).optional(),
      ]),
    ),
  }),
});

export const collections = { help, helpCategories };
