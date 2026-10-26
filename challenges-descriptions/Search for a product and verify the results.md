# Search for a Product and Verify the Results

> **Playwright Challenge — submit a search, then verify the whole result set.**
> One query, a result summary, and a collection of cards asserted as a unit.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-easy-green)

---

## 📌 Overview

Search ShopZone for **“wireless headphones”**, then prove that the page actually delivered the right results. The summary must read **3 results for "wireless headphones"** and the grid must contain exactly **3** product cards.

The point is the collection: instead of checking one element, the test asserts a **count** and then verifies that **every title** contains **Wireless Headphones** — all with retrying, web-first assertions.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | UI interaction · collections |
| **Focus** | Form submission, counts, text assertions |
| **App** | ShopZone marketplace |
| **Test file** | [`tests/searchForAProductAndVerifyTheResults.spec.ts`](../tests/searchForAProductAndVerifyTheResults.spec.ts) |
| **Live lab** | [Open the challenge](https://targetqa.com/lab/playwright-shopzone-search-results) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Search for **“wireless headphones”**, verify the result summary, and assert that exactly **3** product cards are shown with matching titles.

This challenge shows how to treat a list of elements as a single assertion target instead of looping over the DOM by hand.

---

## ✅ Your task

1. **Open the test URL** — navigate to `TEST_URL`.
2. **Submit the search** — type `wireless headphones` into `#search-input` and press **Enter** or click `#search-button`.
3. **Verify the summary** — assert that `#results-summary` reads **`3 results for "wireless headphones"`**.
4. **Verify the collection** — assert that `[data-testid="product-card"]` appears exactly **3** times.
5. **Verify every title** — assert that each `[data-testid="product-card"] .product-title` contains **Wireless Headphones**.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Search input | `#search-input` | `wireless headphones` |
| Search button | `#search-button` | Clickable |
| Results summary | `#results-summary` | `3 results for "wireless headphones"` |
| Product cards | `[data-testid="product-card"]` | Exactly **3** |
| Product titles | `[data-testid="product-card"] .product-title` | Each contains `Wireless Headphones` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | The summary reads **3 results for "wireless headphones"**. |
| ✅ | Exactly **3** product cards are shown. |
| ✅ | Every product title contains **Wireless Headphones**. |
| ✅ | The test asserts counts and text with web-first assertions. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Form submission** | Fills an input and triggers the search like a real user. |
| **Collection assertions** | Uses `toHaveCount()` to verify a list as a whole. |
| **Scoped locators** | Narrows title checks to cards with a descendant selector. |
| **Web-first assertions** | Relies on auto-retrying `expect()` instead of fixed sleeps. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-search-results';

test('Search for a product and verify the results', async ({ page }) => {
  await page.goto(TEST_URL);

  await page.locator('#search-input').fill('wireless headphones');
  await page.locator('#search-button').click();

  await expect(page.locator('#results-summary'))
    .toHaveText('3 results for "wireless headphones"');

  const titles = page.locator('[data-testid="product-card"] .product-title');
  await expect(titles).toHaveCount(3);

  for (let i = 0; i < 3; i++) {
    await expect(titles.nth(i)).toContainText('Wireless Headphones');
  }
});
```

</details>

---

## 🚀 Run it locally

```bash
# Install dependencies and browsers (first run only)
npm ci
npx playwright install --with-deps

# Run this challenge
npx playwright test tests/searchForAProductAndVerifyTheResults.spec.ts

# Explore interactively
npx playwright test tests/searchForAProductAndVerifyTheResults.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Count assertion](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-count)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
