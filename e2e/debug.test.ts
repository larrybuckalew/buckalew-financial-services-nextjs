import { test, expect } from '@playwright/test';

test.describe('Basic Page Load', () => {
  test('should load and log page details', async ({ page }) => {
    // Navigate and wait
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Log everything we can find
    const title = await page.title();
    console.log('Page Title:', title);
    
    const bodyText = await page.textContent('body');
    console.log('Body Text:', bodyText);
    
    // Take a screenshot
    await page.screenshot({ path: 'debug-homepage.png', fullPage: true });
    
    // Basic assertion just to check page loaded
    await expect(page.locator('body')).toBeVisible();
  });
});
