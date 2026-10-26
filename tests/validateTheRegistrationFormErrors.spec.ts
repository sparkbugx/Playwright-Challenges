import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-register-validation';
const TEST_SIGNIN = 'https://targetqa.com/lab/playwright-shopzone-register-validation#/signin';

test('Validate the registration form errors', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.locator('#nav-account').click();
    await expect(page).toHaveURL(TEST_SIGNIN);

    await page.locator('#create-account').click();

    await page.locator('#reg-name').fill('Ravi Kumar');
    await page.locator('#reg-email').fill('ravi.kuma');
    await page.locator('#reg-password').fill('short');
    await page.locator('#reg-confirm').fill('different');

    await page.locator('#reg-submit').click();
    await expect(page.locator('#reg-confirm-error')).toBeVisible()
});
