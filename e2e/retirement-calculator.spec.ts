import { test, expect } from '@playwright/test';

test.describe('Retirement Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculators/retirement');
  });

  test('renders calculator correctly', async ({ page }) => {
    await expect(page.getByTestId('retirement-calculator')).toBeVisible();
    await expect(page.getByTestId('current-age-input')).toBeVisible();
    await expect(page.getByTestId('retirement-age-input')).toBeVisible();
  });

  test('calculates retirement projection', async ({ page }) => {
    await page.getByTestId('current-age-input').fill('35');
    await page.getByTestId('retirement-age-input').fill('65');
    await page.getByTestId('current-savings-input').fill('50000');
    await page.getByTestId('annual-contribution-input').fill('5000');
    await page.getByTestId('expected-return-input').fill('7');
    
    await page.getByTestId('calculate-button').click();

    const result = page.getByTestId('retirement-projection-result');
    await expect(result).toBeVisible();
    await expect(result.textContent()).toContain('$');
  });
});