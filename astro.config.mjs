import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://autos-rental.hlorenzoz.com',
  output: 'static',
  adapter: cloudflare({
    runtime: {
      mode: 'off',
    },
  }),
  prefetch: true,
  integrations: [
    react(),
    sentry(),
    ...(process.env.NODE_ENV === 'development' ? [spotlightjs()] : []),
    sitemap({
      serialize(item) {
        // Only vehicles still need mapping
        if (item.url.includes('/es/vehicles/for-rent/')) {
          item.url = item.url.replace('/es/vehicles/for-rent/', '/es/vehiculos/en-alquiler/');
        } else if (item.url.includes('/es/vehicles/for-sell/')) {
          item.url = item.url.replace('/es/vehicles/for-sell/', '/es/vehiculos/en-venta/');
        } else if (item.url.includes('/es/vehicles/')) {
          item.url = item.url.replace('/es/vehicles/', '/es/vehiculos/');
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/coverage/**'],
      },
    },
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});