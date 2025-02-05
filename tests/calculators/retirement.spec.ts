import { test, expect } from '@playwright/test';
import { RetirementCalculator } from '../../src/utils/financialCalculations';

test.describe('Retirement Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculators/retirement');
  });

  test('performs basic retirement calculation', async ({ page }) => {
    // Fill form
    await page.fill('[data-cy="current-age"]', '30');
    await page.fill('[data-cy="retirement-age"]', '65');
    await page.fill('[data-cy="current-savings"]', '50000');
    await page.fill('[data-cy="monthly-contribution"]', '1000');
    await page.fill('[data-cy="expected-return"]', '7');
    await page.fill('[data-cy="inflation-rate"]', '2');

    // Click calculate
    await page.click('[data-cy="calculate-button"]');

    // Verify results
    await expect(page.locator('[data-cy="results-section"]')).toBeVisible();
    await expect(page.locator('[data-cy="total-savings"]')).toContainText('$');
    
    // Screenshot results
    await page.screenshot({ 
      path: 'test-results/retirement-calculation.png',
      fullPage: true 
    });
  });

  test('calculates with Social Security integration', async ({ page }) => {
    // Enable Social Security integration
    await page.click('[data-cy="enable-social-security"]');
    
    // Fill required fields
    await page.fill('[data-cy="current-age"]', '40');
    await page.fill('[data-cy="annual-income"]', '75000');
    await page.click('[data-cy="calculate-button"]');

    // Verify Social Security results
    await expect(page.locator('[data-cy="ss-benefits"]')).toBeVisible();
    await expect(page.locator('[data-cy="total-retirement-income"]')).toBeVisible();
  });

  test('performs Monte Carlo simulation', async ({ page }) => {
    // Enable Monte Carlo simulation
    await page.click('[data-cy="enable-monte-carlo"]');
    
    // Set simulation parameters
    await page.fill('[data-cy="simulation-runs"]', '1000');
    await page.fill('[data-cy="volatility"]', '15');
    
    // Run simulation
    await page.click('[data-cy="run-simulation"]');

    // Verify simulation results
    await expect(page.locator('[data-cy="simulation-results"]')).toBeVisible();
    await expect(page.locator('[data-cy="success-rate"]')).toBeVisible();
    await expect(page.locator('[data-cy="confidence-intervals"]')).toBeVisible();
  });

  test('handles market crash scenarios', async ({ page }) => {
    // Add market crash scenario
    await page.click('[data-cy="add-crash-scenario"]');
    await page.fill('[data-cy="crash-year"]', '2030');
    await page.fill('[data-cy="crash-percentage"]', '40');
    await page.fill('[data-cy="recovery-years"]', '5');

    // Calculate with crash scenario
    await page.click('[data-cy="calculate-with-crash"]');

    // Verify crash analysis
    await expect(page.locator('[data-cy="crash-impact"]')).toBeVisible();
    await expect(page.locator('[data-cy="recovery-timeline"]')).toBeVisible();
  });

  test('generates PDF reports', async ({ page }) => {
    // Fill minimum required fields
    await page.fill('[data-cy="current-age"]', '35');
    await page.fill('[data-cy="retirement-age"]', '65');
    await page.click('[data-cy="calculate-button"]');

    // Download PDF
    const downloadPromise = page.waitForEvent('download');
    await page.click('[data-cy="download-pdf"]');
    const download = await downloadPromise;
    
    // Verify download
    expect(download.suggestedFilename()).toBe('retirement-report.pdf');
  });

  test('persists scenarios across sessions', async ({ page, context }) => {
    // Create scenario
    await page.fill('[data-cy="scenario-name"]', 'Test Scenario');
    await page.fill('[data-cy="current-age"]', '40');
    await page.click('[data-cy="save-scenario"]');

    // Create new browser context to simulate new session
    const newContext = await context.browser()?.newContext();
    const newPage = await newContext?.newPage();
    await newPage?.goto('/calculators/retirement');

    // Verify scenario persistence
    await expect(newPage?.locator('text="Test Scenario"')).toBeVisible();
    await newContext?.close();
  });

  test('validates all input fields', async ({ page }) => {
    const invalidInputs = [
      { field: 'current-age', value: '150', error: 'Invalid age' },
      { field: 'current-savings', value: '-1000', error: 'Invalid amount' },
      { field: 'expected-return', value: '101', error: 'Invalid percentage' }
    ];

    for (const input of invalidInputs) {
      await page.fill(`[data-cy="${input.field}"]`, input.value);
      await expect(page.locator(`text="${input.error}"`)).toBeVisible();
    }
  });

  test('updates charts in real-time', async ({ page }) => {
    // Initial calculation
    await page.fill('[data-cy="current-age"]', '30');
    await page.fill('[data-cy="current-savings"]', '50000');
    await page.click('[data-cy="calculate-button"]');

    // Get initial chart data
    const initialChart = await page.locator('[data-cy="savings-chart"]').screenshot();

    // Update inputs
    await page.fill('[data-cy="monthly-contribution"]', '2000');
    await page.click('[data-cy="calculate-button"]');

    // Get updated chart data
    const updatedChart = await page.locator('[data-cy="savings-chart"]').screenshot();

    // Compare screenshots
    expect(Buffer.from(initialChart).toString('base64'))
      .not.toBe(Buffer.from(updatedChart).toString('base64'));
  });

  test('performs stress testing', async ({ page }) => {
    // Enable stress testing
    await page.click('[data-cy="enable-stress-test"]');

    // Configure stress scenarios
    const scenarios = [
      { name: 'Market Crash', impact: -40 },
      { name: 'High Inflation', impact: 8 },
      { name: 'Low Returns', impact: 2 }
    ];

    for (const scenario of scenarios) {
      await page.click('[data-cy="add-stress-scenario"]');
      await page.fill('[data-cy="scenario-name"]', scenario.name);
      await page.fill('[data-cy="scenario-impact"]', scenario.impact.toString());
      await page.click('[data-cy="save-stress-scenario"]');
    }

    // Run stress test
    await page.click('[data-cy="run-stress-test"]');

    // Verify stress test results
    await expect(page.locator('[data-cy="stress-test-results"]')).toBeVisible();
    await expect(page.locator('[data-cy="risk-assessment"]')).toBeVisible();
  });
});
