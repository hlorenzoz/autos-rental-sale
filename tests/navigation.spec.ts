import { test, expect } from '@playwright/test';

test.describe('Navigation and Language', () => {
  test('navigates from home to vehicles inventory', async ({ page }) => {
    await page.goto('/es/');

    const vehiclesLink = page.getByRole('navigation').getByRole('link', { name: /inventario/i });
    await vehiclesLink.click();

    await expect(page).toHaveURL(/\/es\/vehicles/);
    await expect(page.getByRole('heading', { name: /todos los vehículos/i })).toBeVisible();
  });

  test('switches language from inventory page', async ({ page }) => {
    await page.goto('/es/vehicles/');

    await expect(page.getByRole('heading', { name: /todos los vehículos/i })).toBeVisible();

    const enLink = page.getByRole('banner').getByRole('link', { name: 'EN' });
    await enLink.click();

    await expect(page).toHaveURL(/\/en\/vehicles/);
    await expect(page.getByRole('heading', { name: /all vehicles/i })).toBeVisible();
  });

  test('maintains current page path when switching languages', async ({ page }) => {
    await page.goto('/es/vehicles/');

    await page.getByRole('banner').getByRole('link', { name: 'EN' }).click();
    await expect(page).toHaveURL(/\/en\/vehicles/);

    await page.getByRole('banner').getByRole('link', { name: 'ES' }).click();
    await expect(page).toHaveURL(/\/es\/vehicles/);
  });
});
