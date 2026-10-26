import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-checkout-cod';

test('Complete a checkout with Cash on Delivery', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.locator('#nav-account').click();
    const userEmail : string = 'buyer@shopzone.test';
    const userPassword : string = 'Shop@123'
    await page.locator('#signin-email').fill(userEmail);
    await page.locator('#signin-continue').click();

    await page.locator('#signin-password').fill(userPassword);
    await page.locator('#signin-submit').click()

    await page.locator('#search-input').fill('desk lamp');
    await page.locator("#search-button").click();

    const deskLampAurora : string = 'Aurora Desk Lamp';

    await expect(page.getByText(deskLampAurora)).toBeVisible();

    await page.locator('.add-to-cart').first().click();
    await page.locator('#nav-cart').click();
    await page.locator('#proceed-checkout').click();

    const customerFullName : string = 'Asha Verma';
    const customerAddress : string = '12 MG Road';
    const customerCity : string = 'Bengaluru';
    const customerState : string = 'Karnataka';
    const customerPincode : number =560001;
    const customerPhone :number = 9876543210;

    await page.locator('#full-name').fill(customerFullName);
    await page.locator('#address-line').fill(customerAddress);
    await page.locator('#city').fill(customerCity);
    await page.locator('#state').selectOption(customerState);
    await page.locator('#zip').fill(customerPincode.toString());
    await page.locator('#phone').fill(customerPhone.toString());
    await page.locator('#pay-cod').click();
    await page.locator('#place-order').click();

    await expect(page.getByText("Order placed, thank you!")).toBeVisible();






});
