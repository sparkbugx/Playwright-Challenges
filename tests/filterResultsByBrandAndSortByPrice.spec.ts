import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-filter-and-sort';

test('Filter results by brand and sort by price', async ({ page }) => {
    await page.goto(TEST_URL);

    // TODO: Filter results by brand and sort by price
});
