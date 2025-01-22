import { test, expect } from '@playwright/test';

test.describe('Investment Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculators/investment');
  });

  test('renders calculator correctly', async ({ page }) => {
    await expect(page.getByTestId('investment-calculator')).toBeVisible();
    await expect(page.getByTestId('initial-investment-input')).toBeVisible();
    await expect(page.getByTestId('annual-contribution-input')).toBeVisible();
  });

  test('calculates investment growth', async ({ page }) => {
    await page.getByTestId('initial-investment-input').fill('10000');
    await page.getByTestId('annual-contribution-input').fill('3000');
    await page.getByTestId('investment-period-input').fill('20');
    await page.getByTestId('expected-return-input').fill('8');
    
    await page.getByTestId('calculate-button').click();

    const result = page.getByTestId('investment-projection-result');
    await expect(result).toBeVisible();
    await expect(result.textContent()).toContain('$');
  });
});