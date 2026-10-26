import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-apply-coupon';

test('Apply a coupon code and verify the discounted total', async ({ page }) => {
    await page.goto(TEST_URL);

    // TODO: Apply a coupon code and verify the discounted total
});
