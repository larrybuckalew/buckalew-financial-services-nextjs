import { test, expect } from '@playwright/test';

test.describe('Mortgage Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculators/mortgage');
  });

  test('renders calculator correctly', async ({ page }) => {
    await expect(page.getByTestId('mortgage-calculator')).toBeVisible();
    await expect(page.getByTestId('loan-amount-input')).toBeVisible();
    await expect(page.getByTestId('interest-rate-input')).toBeVisible();
  });

  test('calculates mortgage payment', async ({ page }) => {
    await page.getByTestId('loan-amount-input').fill('300000');
    await page.getByTestId('interest-rate-input').fill('5.5');
    await page.getByTestId('loan-term-input').fill('30');
    await page.getByTestId('calculate-button').click();

    const result = page.getByTestId('monthly-payment-result');
    await expect(result).toBeVisible();
    await expect(result.textContent()).toContain('$');
  });
});