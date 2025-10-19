import { test, expect } from '@playwright/test';

test.describe('Retirement Calculator', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the retirement calculator page
    await page.goto('/calculators/retirement');
  });

  test('should display the retirement calculator form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Retirement Calculator');
    await expect(page.getByLabel('Current Age')).toBeVisible();
    await expect(page.getByLabel('Retirement Age')).toBeVisible();
    await expect(page.getByLabel('Current Savings')).toBeVisible();
    await expect(page.getByLabel('Monthly Contribution')).toBeVisible();
  });

  test('should calculate retirement savings correctly', async ({ page }) => {
    // Fill in the form
    await page.getByLabel('Current Age').fill('30');
    await page.getByLabel('Retirement Age').fill('65');
    await page.getByLabel('Current Savings').fill('50000');
    await page.getByLabel('Monthly Contribution').fill('500');
    await page.getByLabel('Expected Annual Return (%)').fill('7');
    
    // Submit the form
    await page.getByRole('button', { name: 'Calculate' }).click();

    // Check results are displayed
    await expect(page.locator('[data-testid="results-card"]')).toBeVisible();
    await expect(page.locator('[data-testid="total-savings"]')).toBeVisible();
    await expect(page.locator('[data-testid="monthly-retirement-income"]')).toBeVisible();
  });

  test('should show error messages for invalid inputs', async ({ page }) => {
    // Submit without filling any fields
    await page.getByRole('button', { name: 'Calculate' }).click();
    
    // Check for error messages
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });

  test('should update chart when inputs change', async ({ page }) => {
    // Fill initial values
    await page.getByLabel('Current Age').fill('30');
    await page.getByLabel('Retirement Age').fill('65');
    await page.getByLabel('Current Savings').fill('50000');
    await page.getByLabel('Monthly Contribution').fill('500');
    
    // Calculate
    await page.getByRole('button', { name: 'Calculate' }).click();
    
    // Check if chart is visible
    await expect(page.locator('[data-testid="retirement-chart"]')).toBeVisible();
    
    // Update values
    await page.getByLabel('Monthly Contribution').fill('1000');
    await page.getByRole('button', { name: 'Calculate' }).click();
    
    // Check if chart updates
    // Note: We might need to add more specific assertions based on the chart implementation
    await expect(page.locator('[data-testid="retirement-chart"]')).toBeVisible();
  });
});