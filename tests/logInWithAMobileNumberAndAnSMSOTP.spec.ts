import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-flipmart-otp-login';

test('Log in with a mobile number and an SMS OTP', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.locator('#login-button').click();
    await page.locator('#login-mobile').fill('9876543210')
    await page.locator('#request-otp').click();

    await expect(page.locator('#sms-notification')).toBeVisible();
    const otpCode : string = (await page.locator('#sms-otp').innerText()).trim();
    expect (otpCode).toMatch(/\d{6}/);

    await page.locator('#otp-input').fill(otpCode);
    await page.locator('#verify-otp').click();


});

test('Log in with the Incorrect OTP number', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.locator('#login-button').click();
    await page.locator('#login-mobile').fill('9876543210')
    await page.locator('#request-otp').click();

    await page.locator('#otp-input').fill('123456');
    await page.locator('#verify-otp').click();
    await expect(page.getByText('Incorrect OTP. Please check the code and try again.')).toBeVisible();
}
)