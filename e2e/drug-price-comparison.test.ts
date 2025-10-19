import { test, expect } from '@playwright/test';

test.describe('Drug Price Comparison', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/insurance/drug-pricing');
  });

  test('should display the drug price comparison form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Prescription Drug Price Comparison');
    await expect(page.getByTestId('drug-name-input')).toBeVisible();
    await expect(page.getByTestId('dosage-input')).toBeVisible();
    await expect(page.getByTestId('zip-code-input')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.getByTestId('search-button').click();
    await expect(page.getByText('Please fill in all required fields')).toBeVisible();
  });

  test('should display loading state while fetching results', async ({ page }) => {
    await page.getByTestId('drug-name-input').fill('Lisinopril');
    await page.getByTestId('dosage-input').fill('10mg');
    await page.getByTestId('zip-code-input').fill('12345');
    
    await page.getByTestId('search-button').click();
    await expect(page.getByText('Searching...')).toBeVisible();
  });

  test('should display price comparison results', async ({ page }) => {
    await page.getByTestId('drug-name-input').fill('Lisinopril');
    await page.getByTestId('dosage-input').fill('10mg');
    await page.getByTestId('zip-code-input').fill('12345');
    
    await page.getByTestId('search-button').click();
    await expect(page.getByTestId('price-results')).toBeVisible();
    await expect(page.getByTestId('pharmacy-card')).toHaveCount(4);
  });

  test('should handle API errors gracefully', async ({ page }) => {
    await page.route('/api/drug-prices', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: 'Internal server error' })
      });
    });

    await page.getByTestId('drug-name-input').fill('Lisinopril');
    await page.getByTestId('dosage-input').fill('10mg');
    await page.getByTestId('zip-code-input').fill('12345');
    
    await page.getByTestId('search-button').click();
    await expect(page.getByTestId('error-alert')).toBeVisible();
  });
});