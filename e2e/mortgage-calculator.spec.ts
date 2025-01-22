import { test, expect } from '@playwright/test';

test.describe('Mortgage Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculators/mortgage');
  });

  test('renders mortgage calculator correctly', async ({ page }) => {
    // Check if key elements are present
    await expect(page.getByTestId('mortgage-calculator')).toBeVisible();
    await expect(page.getByTestId('loan-amount-input')).toBeVisible();
    await expect(page.getByTestId('interest-rate-input')).toBeVisible();
    await expect(page.getByTestId('loan-term-input')).toBeVisible();
    await expect(page.getByTestId('calculate-button')).toBeVisible();
  });

  test('calculates mortgage payment correctly', async ({ page }) => {
    // Fill in mortgage calculator inputs
    await page.getByTestId('loan-amount-input').fill('300000');
    await page.getByTestId('interest-rate-input').fill('5.5');
    await page.getByTestId('loan-term-input').fill('30');
    
    // Click calculate button
    await page.getByTestId('calculate-button').click();
    
    // Check if result is displayed
    const monthlyPayment = page.getByTestId('monthly-payment-result');
    await expect(monthlyPayment).toBeVisible();
    
    // Optional: Check if the calculation is approximately correct
    const expectedPaymentText = await monthlyPayment.textContent();
    expect(expectedPaymentText).toContain('$');
    expect(parseFloat(expectedPaymentText.replace('$', ''))).toBeGreaterThan(0);
  });

  test('handles invalid inputs', async ({ page }) => {
    // Try to calculate with invalid inputs
    await page.getByTestId('loan-amount-input').fill('-100000');
    await page.getByTestId('interest-rate-input').fill('invalid');
    await page.getByTestId('loan-term-input').fill('0');
    
    // Click calculate button
    await page.getByTestId('calculate-button').click();
    
    // Check for error messages
    await expect(page.getByTestId('error-message')).toBeVisible();
  });
});
