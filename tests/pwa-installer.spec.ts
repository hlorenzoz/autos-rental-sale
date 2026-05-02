import { test, expect } from '@playwright/test';

test.describe('PWA Installer Gadget', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a guaranteed long page
    await page.goto('/en/about/');
  });

  test('should not be visible immediately', async ({ page }) => {
    const installer = page.locator('#pwa-installer');
    // Check it's either not present or has translate-y-full
    const isPresent = await installer.count();
    if (isPresent > 0) {
      await expect(installer).toHaveClass(/translate-y-full/);
    }
  });

  test('should appear after scrolling below the fold and waiting 2 seconds', async ({ page }) => {
    const installer = page.locator('#pwa-installer');
    const trigger = page.locator('#below-the-fold-trigger');
    
    // Scroll to the trigger element
    await trigger.scrollIntoViewIfNeeded();
    
    // Wait for the 2-second delay + transition time (giving it 5s total to be safe)
    await page.waitForTimeout(5000);
    
    await expect(installer).toBeVisible({ timeout: 10000 });
    await expect(installer).toHaveClass(/translate-y-0/);
  });

  test('should hide when clicking the close button', async ({ page }) => {
    const installer = page.locator('#pwa-installer');
    const trigger = page.locator('#below-the-fold-trigger');
    
    // Trigger visibility
    await trigger.scrollIntoViewIfNeeded();
    await page.waitForTimeout(6000); // Give it extra time for both delay and animation
    
    const closeBtn = page.locator('#close-pwa-installer');
    await expect(closeBtn).toBeVisible({ timeout: 10000 });
    
    // Use evaluate to click directly via JS to avoid flaky pointer issues on mobile animations
    await page.evaluate(() => {
      (document.getElementById('close-pwa-installer') as HTMLElement).click();
    });
    
    // Wait for transition
    await page.waitForTimeout(3000);
    await expect(installer).toHaveClass(/translate-y-full/);
  });
});
