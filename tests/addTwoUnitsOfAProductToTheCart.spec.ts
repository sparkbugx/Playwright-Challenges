import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-add-to-cart';

test('Add two units of a product to the cart', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.getByText('Nimbus X2 Wireless Headphones').click()
    await page.locator('#quantity-select').selectOption('2')
    await page.locator('#add-to-cart').click();
    await expect(page.locator('#cart-count')).toHaveText('2')
    // TODO: Add two units of a product to the cart
});
