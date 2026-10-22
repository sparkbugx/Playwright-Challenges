import { test, expect } from '@playwright/test';
const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-location-popup';

test('Handle a delayed location popup', async ({ page }) => {
  await page.goto(TEST_URL);
  await page.locator('#location-modal').waitFor({ state: 'visible'})
  await page.locator('#location-pincode').fill('560001')
  await page.locator('#location-apply').click();

  await expect(page.locator('#deliver-to')).toHaveText('Deliver to Bengaluru 560001')
  // TODO: Handle a delayed location popup
});
