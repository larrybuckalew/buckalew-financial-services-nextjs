import { test, expect } from '@playwright/test';

test.describe('Insurance Tools', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/insurance');
  });

  test('should load plan comparison tool', async ({ page }) => {
    await page.click('text=Compare Plans');
    await expect(page.locator('h1')).toContainText('Plan Comparison');
    await expect(page.locator('form')).toBeVisible();
  });

  test('should load provider search', async ({ page }) => {
    await page.click('text=Find Provider');
    await expect(page.locator('h1')).toContainText('Provider Search');
    const searchInput = page.locator('input[placeholder*="provider"]');
    await expect(searchInput).toBeVisible();
  });
});