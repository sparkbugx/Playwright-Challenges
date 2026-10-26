import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-product-specs';

test('Read a value from the product specifications tab', async ({ page }) => {
  await page.goto(TEST_URL);

  // TODO: Read a value from the product specifications tab
});
