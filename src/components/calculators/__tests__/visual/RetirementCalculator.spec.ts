import { test, expect } from '@playwright/test';

test.describe('RetirementCalculator Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculators/retirement');
  });

  test('default view matches snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('retirement-calculator-default.png', {
      fullPage: true
    });
  });

  test('with filled form matches snapshot', async ({ page }) => {
    await page.fill('[data-testid="current-age"]', '35');
    await page.fill('[data-testid="retirement-age"]', '65');
    await page.fill('[data-testid="current-savings"]', '100000');
    await page.fill('[data-testid="monthly-contribution"]', '1000');
    await page.fill('[data-testid="expected-return"]', '7');

    await expect(page).toHaveScreenshot('retirement-calculator-filled.png', {
      fullPage: true
    });
  });

  test('with validation errors matches snapshot', async ({ page }) => {
    await page.fill('[data-testid="current-age"]', '65');
    await page.fill('[data-testid="retirement-age"]', '60');

    await expect(page).toHaveScreenshot('retirement-calculator-errors.png', {
      fullPage: true
    });
  });

  test('responsive layout at different breakpoints', async ({ page }) => {
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('retirement-calculator-mobile.png');

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('retirement-calculator-tablet.png');

    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page).toHaveScreenshot('retirement-calculator-desktop.png');
  });

  test('dark mode appearance', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await expect(page).toHaveScreenshot('retirement-calculator-dark-mode.png');
  });

  test('hover states match snapshot', async ({ page }) => {
    await page.hover('button');
    await expect(page).toHaveScreenshot('retirement-calculator-hover.png');
  });

  test('focus states match snapshot', async ({ page }) => {
    await page.focus('[data-testid="current-age"]');
    await expect(page).toHaveScreenshot('retirement-calculator-focus.png');
  });
});