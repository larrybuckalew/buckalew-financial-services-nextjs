import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to main pages', async ({ page }) => {
    // Home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Buckalew Financial Services/);

    // Insurance Tools
    await page.click('text=Insurance Tools');
    await expect(page).toHaveURL(/.*insurance/);

    // Provider Search
    await page.click('text=Provider Search');
    await expect(page).toHaveURL(/.*provider-search/);

    // Drug Formulary
    await page.click('text=Drug Formulary');
    await expect(page).toHaveURL(/.*drug-formulary/);
  });
});