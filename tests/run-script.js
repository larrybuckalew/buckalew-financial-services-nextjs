const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to a URL
  await page.goto('http://localhost:3000');

  // Wait for the page to load completely
  await page.waitForTimeout(3000);

  // Check the title
  const title = await page.title();
  console.log(`Title: ${title}`);

  // Click a button
  await page.click('text=Some Button Text');

  // Fill a form field
  await page.fill('#some-input-id', 'Some value');

  // Take a screenshot
  await page.screenshot({ path: 'screenshot.png' });

  // Close the page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();
