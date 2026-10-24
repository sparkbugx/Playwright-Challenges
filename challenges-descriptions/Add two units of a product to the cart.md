# Add Two Units of a Product to the Cart

> **Playwright Challenge — pick a quantity, add to cart, verify the badge.**
> A product page, a native dropdown, and one state assertion that proves the cart updated.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-beginner-green)

---

## 📌 Overview

Open the **Nimbus X2 Wireless Headphones** product page on ShopZone, set the quantity to **2**, and add it to the cart. The challenge is about driving a native dropdown with the right API and then proving that the cart state changed.

The cart badge in the header must read **2** — not by scraping the DOM manually, but with a web-first assertion that retries until the UI settles.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | UI interaction · navigation · state change |
| **Focus** | Product selection, dropdowns, badge assertions |
| **App** | ShopZone marketplace |
| **Test file** | [`tests/addTwoUnitsOfAProductToTheCart.spec.ts`](../tests/addTwoUnitsOfAProductToTheCart.spec.ts) |
| **Live lab** | [Open the challenge](https://targetqa.com/lab/playwright-shopzone-add-to-cart) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Open the **Nimbus X2 Wireless Headphones** product page, choose a quantity of **2**, add it to the cart, and verify the cart badge.

This challenge shows how to move from a listing to a product page, select a value in a native `<select>`, and confirm the resulting state with a single assertion instead of a fixed wait.

---

## ✅ Your task

1. **Open the test URL** — navigate to `TEST_URL`.
2. **Open the product** — click **Nimbus X2 Wireless Headphones** from Today's Deals (or search for it).
3. **Choose the quantity** — select `2` in `#quantity-select`.
4. **Add to cart** — click `#add-to-cart`.
5. **Verify the badge** — assert that `#cart-count` shows **2**.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Product card | `getByText('Nimbus X2 Wireless Headphones')` | Clickable |
| Quantity dropdown | `#quantity-select` | `2` selected |
| Add to cart button | `#add-to-cart` | Clickable |
| Cart badge | `#cart-count` | `2` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | The product page for **Nimbus X2 Wireless Headphones** is open. |
| ✅ | The quantity is set to **2**. |
| ✅ | The cart badge shows **2** items. |
| ✅ | The test asserts the badge value with a web-first assertion. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Dropdown handling** | Uses `selectOption()` to drive a native `<select>` reliably. |
| **Navigation** | Moves from a listing to a detail page and acts on the new state. |
| **Web-first assertions** | Uses `expect(locator).toHaveText()` instead of manual reads. |
| **State verification** | Confirms the cart badge reflects the added quantity. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-add-to-cart';

test('Add two units of a product to the cart', async ({ page }) => {
  await page.goto(TEST_URL);

  await page.getByText('Nimbus X2 Wireless Headphones').click();
  await page.locator('#quantity-select').selectOption('2');
  await page.locator('#add-to-cart').click();

  await expect(page.locator('#cart-count')).toHaveText('2');
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
npx playwright test tests/addTwoUnitsOfAProductToTheCart.spec.ts

# Explore interactively
npx playwright test tests/addTwoUnitsOfAProductToTheCart.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Selecting options](https://playwright.dev/docs/api/class-locator#locator-select-option)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
