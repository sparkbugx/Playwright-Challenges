import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-filter-and-sort';

test('Filter results by brand and sort by price', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.locator('#search-input').fill('laptop');
    await page.locator('#search-button').click();
    await page.locator('#brand-novabook').click();
    await page.locator('#sort-select').selectOption('price-asc');

    const cards = page.locator('[data-testid="product-card"]');
    await expect(cards).toHaveCount(3);

    await expect(cards.locator('.product-price')).toHaveText([
        '$549.00',
        '$749.00',
        '$1,299.00'
    ])
    const tittles = cards.locator('.product-title');
    await expect(tittles).toHaveCount(3)

    for(let i: number = 0; i < 3; i++){
        await expect(tittles.nth(i)).toContainText('Novabook')
    }


});
