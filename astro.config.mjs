// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { helpSitemapEntries } from './src/help/sitemap.mjs';

// Help-artikels hebben per taal een ander pad (/help, /fr/aide, /en/help), dus hun
// taalversies (hreflang) en laatste wijziging zetten we zelf in de sitemap.
const helpSitemap = helpSitemapEntries();

// https://astro.build/config
export default defineConfig({
  site: 'https://www.remoria.eu',
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'nl',
        locales: { nl: 'nl', en: 'en', fr: 'fr' },
      },
      serialize(item) {
        const help = helpSitemap.get(new URL(item.url).pathname);
        return help ? { ...item, ...help } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
