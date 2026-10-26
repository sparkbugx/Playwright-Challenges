import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-product-specs';

test('Read a value from the product specifications tab', async ({ page }) => {
  await page.goto(TEST_URL);
  await page.locator('[data-product-id="nimbus-x2"]').click()
  await page.locator('#tab-specs').click()

  const batteryRow = page
      .locator('#specs-table tr')
      .filter({ hasText: 'Battery life' });

  await expect(batteryRow).toHaveCount(1);
  await expect(batteryRow.locator('td')).toHaveText('40 hours');
});
