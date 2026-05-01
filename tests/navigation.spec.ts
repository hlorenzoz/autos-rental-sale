/*
import { test, expect } from '@playwright/test';

test.describe('Navigation and Language', () => {
  test('navigates from home to vehicles inventory', async ({ page }) => {
    await page.goto('/es/');
    
    // Click on the vehicles link in the navbar
    // The link text in Spanish is "INVENTARIO" (from TopNavBar and es.ts)
    const vehiclesLink = page.getByRole('link', { name: /inventario/i });
    await vehiclesLink.click();
    
    await expect(page).toHaveURL(/\/es\/vehicles/);
    // Heading in vehicles/index.astro is "Todos los Vehículos"
    await expect(page.getByRole('heading', { name: /todos los vehículos/i })).toBeVisible();
  });

  test('switches language from inventory page', async ({ page }) => {
    await page.goto('/es/vehicles/');
    
    // Check Spanish content
    await expect(page.getByRole('heading', { name: /todos los vehículos/i })).toBeVisible();
    
    // Switch to English via the navbar toggle
    const enLink = page.getByRole('banner').getByRole('link', { name: 'EN' });
    await enLink.click();
    
    await expect(page).toHaveURL(/\/en\/vehicles/);
    await expect(page.getByRole('heading', { name: /all vehicles/i })).toBeVisible();
  });

  test('maintains current page path when switching languages', async ({ page }) => {
    await page.goto('/es/vehicles/');
    
    // Click EN
    await page.getByRole('banner').getByRole('link', { name: 'EN' }).click();
    await expect(page).toHaveURL(/\/en\/vehicles/);
    
    // Click ES
    await page.getByRole('banner').getByRole('link', { name: 'ES' }).click();
    await expect(page).toHaveURL(/\/es\/vehicles/);
  });
});
*/
