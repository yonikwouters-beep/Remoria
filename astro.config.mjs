// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
