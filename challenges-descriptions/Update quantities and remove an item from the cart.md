# Update Quantities and Remove an Item from the Cart

> **Playwright Challenge — scope actions to a cart row, then trust the recalculated total.**
> Two row-level controls, one deletion, and a subtotal that proves the math.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-medium-orange)

---

## 📌 Overview

The ShopZone cart starts with **3 products** — **Aurora Desk Lamp** (1), **Pixel Ceramic Mug** (2), and **Clean Test Automation** (1) — for a subtotal of **$98.49**. Raise the lamp to **3 units** and delete the mug.

That leaves **2 rows** and **4 items**, so the subtotal must recalculate to **$143.49**. Every action is scoped to its own row, so the test stays readable and immune to list reordering.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | UI interaction · cart state |
| **Focus** | Scoped locators, row actions, recalculated totals |
| **App** | ShopZone marketplace |
| **Test file** | [`tests/updateQuantitiesAndRemoveAnItemFromTheCart.spec.ts`](../tests/updateQuantitiesAndRemoveAnItemFromTheCart.spec.ts) |
| **Live lab** | [Open the lab](https://targetqa.com/lab/playwright-shopzone-update-cart) |
| **Challenge page** | [View challenge](https://targetqa.com/challenges/playwright-shopzone-update-cart) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Open the cart, raise the **Aurora Desk Lamp** to **3** units, delete the **Pixel Ceramic Mug**, and verify the recalculated subtotal.

This challenge shows why row-scoped locators matter: the same `+` and **Delete** controls exist on every row, so each action must be anchored to a product first.

---

## ✅ Your task

1. **Open the cart** — navigate to `TEST_URL` and click `#nav-cart`.
2. **Scope the lamp row** — target `[data-product-id="aurora-lamp"]`.
3. **Raise the quantity** — click `.qty-increase` twice, then assert `.qty-value` reads **3**.
4. **Delete the mug** — click `[data-product-id="pixel-mug"] .remove-item`.
5. **Verify the cart** — assert that `[data-testid="cart-item"]` shows exactly **2** rows and the mug row is gone.
6. **Verify the total** — assert that `#cart-subtotal` reads **`Subtotal (4 items): $143.49`**.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Cart link | `#nav-cart` | Clickable |
| Cart rows | `[data-testid="cart-item"]` | Exactly **2** after the changes |
| Lamp row | `[data-product-id="aurora-lamp"]` | Contains the quantity controls |
| Increase button | `.qty-increase` (inside the lamp row) | Clickable |
| Quantity value | `.qty-value` (inside the lamp row) | `3` |
| Delete button | `.remove-item` (inside the mug row) | Clickable |
| Mug row | `[data-product-id="pixel-mug"]` | Removed |
| Subtotal | `#cart-subtotal` | `Subtotal (4 items): $143.49` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | Two cart rows remain. |
| ✅ | The lamp quantity is **3**. |
| ✅ | The subtotal is **$143.49** for **4 items**. |
| ✅ | Each action is scoped to a product row. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Scoped locators** | Chains from a row to its buttons instead of matching page-wide text. |
| **Data attributes** | Uses `data-product-id` to identify rows independently of order. |
| **State assertions** | Confirms quantity and removal with auto-retrying assertions. |
| **Total verification** | Proves the cart recalculated the line totals and subtotal correctly. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-update-cart';

test('Update quantities and remove an item from the cart', async ({ page }) => {
  await page.goto(TEST_URL);
  await page.locator('#nav-cart').click();

  const lampRow = page.locator('[data-product-id="aurora-lamp"]');
  await lampRow.locator('.qty-increase').click();
  await lampRow.locator('.qty-increase').click();

  await expect(lampRow.locator('.qty-value')).toHaveText('3');

  await page.locator('[data-product-id="pixel-mug"] .remove-item').click();

  await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(2);
  await expect(page.locator('[data-product-id="pixel-mug"]')).toHaveCount(0);
  await expect(page.locator('#cart-subtotal'))
    .toHaveText('Subtotal (4 items): $143.49');
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
npx playwright test tests/updateQuantitiesAndRemoveAnItemFromTheCart.spec.ts

# Explore interactively
npx playwright test tests/updateQuantitiesAndRemoveAnItemFromTheCart.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Locating by CSS or text](https://playwright.dev/docs/locators#locate-by-css-or-xpath)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
