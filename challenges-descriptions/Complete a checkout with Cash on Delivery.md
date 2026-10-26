# Complete a Checkout with Cash on Delivery

> **Playwright Challenge — drive the whole purchase journey, from sign-in to order number.**
> Two-step auth, a cart hand-off, a checkout form, and a confirmation that proves it all worked.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-hard-red)

---

## 📌 Overview

Sign in as **buyer@shopzone.test / Shop@123** through the two-step form, search for **“desk lamp”**, and add the **Aurora Desk Lamp** to the cart. From there the cart hands off to checkout, where the test fills a complete delivery address.

Choose **Cash on Delivery** and place the order. The confirmation must show **“Order placed, thank you!”**, an order number matching **SZ-…**, the **Cash on Delivery** payment method, and a shipping address containing **Bengaluru**.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | End-to-end · checkout |
| **Focus** | Authentication, forms, radio buttons, page transitions |
| **App** | ShopZone marketplace |
| **Test file** | [`tests/completeACheckoutWithCashOnDelivery.spec.ts`](../tests/completeACheckoutWithCashOnDelivery.spec.ts) |
| **Live lab** | [Open the lab](https://targetqa.com/lab/playwright-shopzone-checkout-cod) |
| **Challenge page** | [View challenge](https://targetqa.com/challenges/playwright-shopzone-checkout-cod) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Sign in, add the **Aurora Desk Lamp** to the cart, check out with a delivery address and **Cash on Delivery**, and verify the order confirmation.

This challenge chains several screens together, so each step depends on the previous one settling — which makes it a good exercise in trusting auto-waiting instead of adding pauses.

---

## ✅ Your task

1. **Sign in** — open `TEST_URL`, click `#nav-account`, enter `buyer@shopzone.test`, continue, then enter `Shop@123` and submit.
2. **Add the lamp** — search `desk lamp` in `#search-input` and click **Add Aurora Desk Lamp to cart**.
3. **Go to checkout** — open `#nav-cart` and click `#proceed-checkout`.
4. **Fill the address** — `#full-name`, `#address-line`, `#city`, `#state`, `#zip`, and `#phone`.
5. **Pay on delivery** — select `#pay-cod` and click `#place-order`.
6. **Verify the confirmation** — assert the heading, order number, payment method, and shipping city.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Sign-in link | `#nav-account` | Clickable |
| Email input | `#signin-email` | `buyer@shopzone.test` |
| Continue button | `#signin-continue` | Clickable |
| Password input | `#signin-password` | `Shop@123` |
| Sign-in button | `#signin-submit` | Clickable |
| Search input | `#search-input` | `desk lamp` |
| Add to cart | `getByRole('button', { name: 'Add Aurora Desk Lamp to cart' })` | Clickable |
| Cart link | `#nav-cart` | Clickable |
| Proceed to checkout | `#proceed-checkout` | Clickable |
| Full name | `#full-name` | `Asha Verma` |
| Address | `#address-line` | `12 MG Road` |
| City | `#city` | `Bengaluru` |
| State | `#state` | `Karnataka` |
| PIN code | `#zip` | `560001` |
| Phone number | `#phone` | `9876543210` |
| Cash on Delivery | `#pay-cod` | Checked |
| Place order | `#place-order` | Clickable |
| Confirmation heading | `#order-heading` | `Order placed, thank you!` |
| Order number | `#order-id` | Matches `/^SZ-\d+$/` |
| Payment method | `#order-payment` | `Cash on Delivery` |
| Shipping address | `#order-address` | Contains `Bengaluru` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | The order confirmation is displayed with an order number (**SZ-…**). |
| ✅ | The payment method is **Cash on Delivery**. |
| ✅ | The shipping address contains **Bengaluru**. |
| ✅ | The test makes at least two assertions along the journey. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **End-to-end flow** | Chains sign-in, search, cart, checkout, and confirmation in one test. |
| **Two-step authentication** | Handles a form that reveals the password field only after the email step. |
| **Form and radio handling** | Fills inputs, selects a state, and checks a payment radio button. |
| **Confirmation assertions** | Verifies order number, payment method, and address with web-first checks. |
| **Pattern matching** | Uses a regular expression to validate the generated `SZ-…` order id. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-checkout-cod';

test('Complete a checkout with Cash on Delivery', async ({ page }) => {
  await page.goto(TEST_URL);

  // Two-step sign-in
  await page.locator('#nav-account').click();
  await page.locator('#signin-email').fill('buyer@shopzone.test');
  await page.locator('#signin-continue').click();
  await page.locator('#signin-password').fill('Shop@123');
  await page.locator('#signin-submit').click();
  await expect(page.locator('#nav-account')).toContainText('Asha');

  // Add the Aurora Desk Lamp from search
  await page.locator('#search-input').fill('desk lamp');
  await page.locator('#search-input').press('Enter');
  await page.getByRole('button', { name: 'Add Aurora Desk Lamp to cart' }).click();

  // Cart -> checkout
  await page.locator('#nav-cart').click();
  await page.locator('#proceed-checkout').click();

  // Delivery address
  await page.locator('#full-name').fill('Asha Verma');
  await page.locator('#address-line').fill('12 MG Road');
  await page.locator('#city').fill('Bengaluru');
  await page.locator('#state').selectOption('Karnataka');
  await page.locator('#zip').fill('560001');
  await page.locator('#phone').fill('9876543210');

  // Payment + submit
  await page.locator('#pay-cod').check();
  await page.locator('#place-order').click();

  // Confirmation
  await expect(page.locator('#order-heading')).toHaveText('Order placed, thank you!');
  await expect(page.locator('#order-id')).toHaveText(/^SZ-\d+$/);
  await expect(page.locator('#order-payment')).toHaveText('Cash on Delivery');
  await expect(page.locator('#order-address')).toContainText('Bengaluru');
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
npx playwright test tests/completeACheckoutWithCashOnDelivery.spec.ts

# Explore interactively
npx playwright test tests/completeACheckoutWithCashOnDelivery.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Form controls and actions](https://playwright.dev/docs/input)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Assertion timeout and retries](https://playwright.dev/docs/test-timeouts)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
