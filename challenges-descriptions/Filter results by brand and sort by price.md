# Filter Results by Brand and Sort by Price

> **Playwright Challenge — narrow a list with a checkbox, then reorder it with a dropdown.**
> Two filters, one sort, and a list that proves both took effect.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-medium-orange)

---

## 📌 Overview

Search ShopZone for **“laptop”** — the grid returns **4** results. Then tick the **Novabook** brand checkbox and set the sort dropdown to **Price: Low to High**, leaving exactly **3** cards.

The payoff is the order: the first card must be the **Novabook Air 13 Laptop** at **$549.00**, followed by **$749.00** and **$1,299.00**. The test proves the filter and the sort in one pass, without a single fixed wait.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | UI interaction · filtering · sorting |
| **Focus** | Checkboxes, dropdowns, ordered list assertions |
| **App** | ShopZone marketplace |
| **Test file** | [`tests/filterResultsByBrandAndSortByPrice.spec.ts`](../tests/filterResultsByBrandAndSortByPrice.spec.ts) |
| **Live lab** | [Open the lab](https://targetqa.com/lab/playwright-shopzone-filter-and-sort) |
| **Challenge page** | [View challenge](https://targetqa.com/challenges/playwright-shopzone-filter-and-sort) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Search for **“laptop”**, keep only the **Novabook** brand, sort by **Price: Low to High**, and verify the cheapest Novabook laptop is listed first.

This challenge shows how a checkbox and a `<select>` combine to reshape a dynamic list — and how to assert the resulting order rather than just its length.

---

## ✅ Your task

1. **Open the test URL** — navigate to `TEST_URL`.
2. **Search** — type `laptop` into `#search-input` and press **Enter**.
3. **Filter the brand** — tick `#brand-novabook` (Novabook).
4. **Sort the results** — choose **Price: Low to High** in `#sort-select` (value `price-asc`).
5. **Verify the list** — assert that `[data-testid="product-card"]` shows exactly **3** cards.
6. **Verify the order** — assert the prices read **$549.00**, **$749.00**, **$1,299.00** and the first title is **Novabook Air 13 Laptop**.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Search input | `#search-input` | `laptop` |
| Novabook filter | `#brand-novabook` | Checked |
| Sort dropdown | `#sort-select` | `price-asc` (Price: Low to High) |
| Product cards | `[data-testid="product-card"]` | Exactly **3** |
| Prices in order | `[data-testid="product-card"] .product-price` | `$549.00`, `$749.00`, `$1,299.00` |
| First product title | `[data-testid="product-card"] .product-title` | `Novabook Air 13 Laptop` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | Only the **3** Novabook laptops are shown. |
| ✅ | Results are sorted by ascending price. |
| ✅ | The first result is the **Novabook Air 13 Laptop** at **$549.00**. |
| ✅ | The test asserts the list and its order with web-first assertions. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Checkbox handling** | Uses `check()` to apply a brand filter and waits for the list to update. |
| **Dropdown handling** | Uses `selectOption('price-asc')` to drive a native `<select>`. |
| **Ordered list assertions** | Passes an array to `toHaveText()` to verify sequence, not just contents. |
| **Dynamic list verification** | Confirms filter and sort results with auto-retrying assertions. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-filter-and-sort';

test('Filter results by brand and sort by price', async ({ page }) => {
  await page.goto(TEST_URL);

  await page.locator('#search-input').fill('laptop');
  await page.locator('#search-input').press('Enter');

  await page.locator('#brand-novabook').check();
  await page.locator('#sort-select').selectOption('price-asc');

  const cards = page.locator('[data-testid="product-card"]');
  await expect(cards).toHaveCount(3);

  await expect(cards.locator('.product-price'))
    .toHaveText(['$549.00', '$749.00', '$1,299.00']);

  await expect(cards.locator('.product-title').first())
    .toHaveText('Novabook Air 13 Laptop');
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
npx playwright test tests/filterResultsByBrandAndSortByPrice.spec.ts

# Explore interactively
npx playwright test tests/filterResultsByBrandAndSortByPrice.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Checking checkboxes](https://playwright.dev/docs/api/class-locator#locator-check)
- [Selecting options](https://playwright.dev/docs/api/class-locator#locator-select-option)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
