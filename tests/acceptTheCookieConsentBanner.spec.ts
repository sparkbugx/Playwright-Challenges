import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-cookie-consent';

test('Accept the cookie consent banner', async ({ page }) => {
  await page.goto(TEST_URL);
  await page.locator('#cookie-banner').isVisible()

  await page.locator('#accept-cookies').click();
  await expect(page.locator('#consent-state')).toContainText('Cookie preference: accepted')


});
