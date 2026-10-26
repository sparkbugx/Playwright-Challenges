import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-apply-coupon';

test('Apply a coupon code and verify the discounted total', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.locator('#nav-cart').click();
    const codeDiscount: string = "SAVE10";

    await page.locator('#coupon-input').fill(codeDiscount);
    await page.locator('#apply-coupon').click();

    const confirmationMessageCoupon : string  = "SAVE10 applied — 10% off your subtotal";
    const idConfirmationMessageCoupon : string = "#coupon-message";

    await expect(page.locator(idConfirmationMessageCoupon)).toContainText(confirmationMessageCoupon)
});

test ('Apply a wrong coupon code discount', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.locator('#nav-cart').click();
    const codeDiscount: string = "SAVE100";

    await page.locator('#coupon-input').fill(codeDiscount);
    await page.locator('#apply-coupon').click();

    const errorMessageWrongCoupon : string  = "Coupon code is not valid";
    const idConfirmationMessageCoupon : string = "#coupon-message";

    await expect(page.locator(idConfirmationMessageCoupon)).toContainText(errorMessageWrongCoupon)
})
