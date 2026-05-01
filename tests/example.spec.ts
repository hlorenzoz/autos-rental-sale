import { test, expect } from '@playwright/test';

test('homepage loads in Spanish', async ({ page }) => {
  await page.goto('/es/');
  await expect(page).toHaveTitle(/Autos Alquiler y Venta/);
});

test('homepage loads in English', async ({ page }) => {
  await page.goto('/en/');
  await expect(page).toHaveTitle(/Autos Rental/);
});
