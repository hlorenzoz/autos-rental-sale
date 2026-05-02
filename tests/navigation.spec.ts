import { test, expect } from '@playwright/test';

const routes = [
  { en: '/', es: '/es/' },
  { en: '/en/vehicles/', es: '/es/vehiculos/' },
  { en: '/en/vehicles/for-rent/', es: '/es/vehiculos/en-alquiler/' },
  { en: '/en/vehicles/for-sell/', es: '/es/vehiculos/en-venta/' },
  { en: '/en/contact/', es: '/es/contacto/' },
  { en: '/en/about/', es: '/es/sobre-nosotros/' },
  { en: '/en/vehicles/tesla-model-s-plaid/', es: '/es/vehiculos/tesla-model-s-plaid/' },
];

test.describe('Global Navigation and i18n URL consistency', () => {
  for (const route of routes) {
    test(`should render English page: ${route.en}`, async ({ page }) => {
      const response = await page.goto(route.en);
      expect(response?.status()).toBe(200);
      expect(page.url()).toContain(route.en);
    });

    test(`should render Spanish page: ${route.es}`, async ({ page }) => {
      const response = await page.goto(route.es);
      // This will fail if there is a redirect loop
      expect(response?.status()).toBe(200);
      expect(page.url()).toContain(route.es);
    });
  }

  test('should redirect technical English paths to Spanish in ES locale', async ({ page }) => {
    // If we hit /es/vehicles/, it should redirect to /es/vehiculos/
    await page.goto('/es/vehicles/');
    await expect(page).toHaveURL(/\/es\/vehiculos\//);
    
    await page.goto('/es/vehicles/for-rent/');
    await expect(page).toHaveURL(/\/es\/vehiculos\/en-alquiler\//);

    await page.goto('/es/about/');
    await expect(page).toHaveURL(/\/es\/sobre-nosotros\//);
  });
});
