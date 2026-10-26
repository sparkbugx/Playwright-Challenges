import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-update-cart';

test('Update quantities and remove an item from the cart', async ({ page }) => {
  await page.goto(TEST_URL);
  await page.locator('#nav-cart').click();

  const lampRow = page.locator('[data-product-id="aurora-lamp"]');
  await lampRow.locator('.qty-increase').click();
  await lampRow.locator('.qty-increase').click();

  await expect(lampRow.locator('.qty-value')).toHaveText('3');

  await page.locator('[data-product-id="pixel-mug"] .remove-item').click();

  await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(2);
  await expect(page.locator('[data-product-id="pixel-mug"]')).toHaveCount(0);
  await expect(page.locator('#cart-subtotal'))
    .toHaveText('Subtotal (4 items): $143.49');
});
