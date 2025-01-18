import { test, expect } from '@playwright/test';

test.describe('Calculator Pages', () => {
  test('navigates through calculator pages', async ({ page }) => {
    // Visit calculators index
    await page.goto('/calculators');
    await expect(page).toHaveTitle(/Financial Calculators/i);

    // Click retirement calculator
    await page.click('text=Retirement Calculator');
    await expect(page).toHaveURL(/.*\/calculators\/retirement/);

    // Test retirement calculator form
    await page.fill('input[placeholder="Current Age"]', '30');
    await page.fill('input[placeholder="Retirement Age"]', '65');
    await page.click('button:text("Calculate")');
    await expect(page.locator('text=Estimated Retirement Savings')).toBeVisible();

    // Test mortgage calculator
    await page.goto('/calculators/mortgage');
    await page.fill('input[placeholder="Loan Amount"]', '300000');
    await page.fill('input[placeholder="Interest Rate"]', '3.5');
    await page.click('button:text("Calculate")');
    await expect(page.locator('text=Monthly Payment')).toBeVisible();
  });
});