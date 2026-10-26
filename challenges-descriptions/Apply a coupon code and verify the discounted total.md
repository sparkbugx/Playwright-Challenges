# Apply a Coupon Code and Verify the Discounted Total

> **Playwright Challenge — feed a form, then prove the math in the order summary.**
> One promo input, a rejection path, and a total that must land on $88.64.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-medium-orange)

---

## 📌 Overview

The cart arrives pre-filled with **4 items** and a subtotal of **$98.49**. Applying the **SAVE10** coupon takes **10%** off, so the summary must show a **−$9.85** discount and an order total of **$88.64**.

The optional negative path keeps the test honest: an unknown code such as **SAVE99** must be rejected with **“Coupon code is not valid”** and must not add a discount row.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | UI interaction · calculated values |
| **Focus** | Forms, conditional UI, total assertions |
| **App** | ShopZone marketplace |
| **Test file** | [`tests/applyACouponCodeAndVerifyTheDiscountedTotal.spec.ts`](../tests/applyACouponCodeAndVerifyTheDiscountedTotal.spec.ts) |
| **Live lab** | [Open the lab](https://targetqa.com/lab/playwright-shopzone-apply-coupon) |
| **Challenge page** | [View challenge](https://targetqa.com/challenges/playwright-shopzone-apply-coupon) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Apply **SAVE10** to the pre-filled cart and verify that the **10%** discount is reflected in the order total.

This challenge shows how to drive a form inside a page and then assert the recalculated values it produces — including a row that only exists after a successful submission.

---

## ✅ Your task

1. **Open the cart** — navigate to `TEST_URL` and click `#nav-cart`.
2. **Reject an invalid code** *(optional)* — enter `SAVE99` in `#coupon-input`, click `#apply-coupon`, and assert `#coupon-message` reads **“Coupon code is not valid”** with no discount row.
3. **Apply the coupon** — enter `SAVE10` in `#coupon-input` and click `#apply-coupon`.
4. **Verify the message** — assert that `#coupon-message` reads **`SAVE10 applied — 10% off your subtotal`**.
5. **Verify the discount** — assert that `#discount-row` is visible and shows **Coupon (SAVE10)** / **−$9.85**.
6. **Verify the total** — assert that `#cart-total` reads **$88.64**.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Cart link | `#nav-cart` | Clickable |
| Coupon input | `#coupon-input` | `SAVE10` |
| Apply button | `#apply-coupon` | Clickable |
| Coupon message | `#coupon-message` | `SAVE10 applied — 10% off your subtotal` |
| Discount row | `#discount-row` | Visible · `Coupon (SAVE10)` · `−$9.85` |
| Order total | `#cart-total` | `$88.64` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | The coupon message confirms **SAVE10** was applied. |
| ✅ | A discount row is shown. |
| ✅ | The order total is **$88.64**. |
| ✅ | Invalid codes are rejected without adding a discount. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Form submission** | Fills an input and submits with a real button click. |
| **Conditional UI** | Asserts a row is hidden before success and visible after. |
| **Calculated values** | Verifies the discount amount and the resulting total. |
| **Web-first assertions** | Uses auto-retrying checks instead of fixed sleeps. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-apply-coupon';

test('Apply a coupon code and verify the discounted total', async ({ page }) => {
  await page.goto(TEST_URL);
  await page.locator('#nav-cart').click();

  const couponMessage = page.locator('#coupon-message');
  const discountRow = page.locator('#discount-row');

  // An invalid code is rejected and adds no discount
  await page.locator('#coupon-input').fill('SAVE99');
  await page.locator('#apply-coupon').click();
  await expect(couponMessage).toHaveText('Coupon code is not valid');
  await expect(discountRow).toBeHidden();

  await page.locator('#coupon-input').fill('SAVE10');
  await page.locator('#apply-coupon').click();

  await expect(couponMessage)
    .toHaveText('SAVE10 applied — 10% off your subtotal');
  await expect(discountRow).toBeVisible();
  await expect(discountRow).toContainText('Coupon (SAVE10)');
  await expect(page.locator('#cart-total')).toHaveText('$88.64');
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
npx playwright test tests/applyACouponCodeAndVerifyTheDiscountedTotal.spec.ts

# Explore interactively
npx playwright test tests/applyACouponCodeAndVerifyTheDiscountedTotal.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Filling inputs](https://playwright.dev/docs/api/class-locator#locator-fill)
- [Visibility assertions](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-visible)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
