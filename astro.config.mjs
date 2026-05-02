import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [
    react(),
    sentry(),
    spotlightjs(),
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
  redirects: {
    '/es/vehiculos': '/es/vehicles',
    '/es/vehiculos/[...slug]': '/es/vehicles/[...slug]',
    '/es/vehiculos/alquiler': '/es/vehicles/for-rent',
    '/es/vehiculos/venta': '/es/vehicles/for-sell',
    '/es/contacto': '/es/contact',
  },
});