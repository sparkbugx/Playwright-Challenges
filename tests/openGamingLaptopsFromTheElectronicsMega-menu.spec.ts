import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-flipmart-mega-menu';

test('Open Gaming Laptops from the Electronics mega-menu', async ({ page }) => {
    await page.goto(TEST_URL);

});


//ollama pull qwen2.5-coder:32bollama pull qwen2.5-coder:32b