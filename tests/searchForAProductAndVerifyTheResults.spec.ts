import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-search-results';

test('Search for a product and verify the results', async ({ page }) => {
  await page.goto(TEST_URL);

  await page.locator('#search-input').fill('wireless headphones');
  await page.locator('#search-button').click();

  await expect(page.locator('#results-summary'))
    .toHaveText('3 results for "wireless headphones"');

  const titles = page.locator('[data-testid="product-card"] .product-title');
  await expect(titles).toHaveCount(3);

  for (let i = 0; i < 3; i++) {
    await expect(titles.nth(i)).toContainText('Wireless Headphones');
  }
});
