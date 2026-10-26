# Validate the Registration Form Errors

> **Playwright Challenge — submit bad data and prove every field-level error.**
> One form submission, four fields, and assertions on exactly what the user sees.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-intermediate-orange)

---

## 📌 Overview

Open the **Create account** form on ShopZone and submit it with deliberately invalid data: a malformed email, a too-short password, and a confirmation that does not match. Client-side validation should reject the submission and surface a message under each bad field.

The valid name is the control case — **Name** must produce **no error**, proving the test checks absence as well as presence. The exact strings are asserted so the validation contract is pinned down.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | Form validation · field errors · multiple assertions |
| **Focus** | Form filling, error text, negative assertions |
| **App** | ShopZone registration |
| **Test file** | [`tests/validateTheRegistrationFormErrors.spec.ts`](../tests/validateTheRegistrationFormErrors.spec.ts) |
| **Live lab** | [Open the challenge](https://targetqa.com/lab/playwright-shopzone-register-validation) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Submit the **Create account** form with invalid data and verify every field-level validation message.

This challenge shows how to drive a multi-field form and assert several independent outcomes from a single action, including that a valid field stays clean.

---

## ✅ Your task

1. **Open the test URL** — navigate to `TEST_URL`.
2. **Reach the form** — on the sign-in page, click **“Create your ShopZone account”** (`#create-account`).
3. **Enter the invalid data** — fill `#reg-name` with **Ravi Kumar**, `#reg-email` with **ravi.kumar** (no domain), `#reg-password` with **short**, and `#reg-confirm` with **different**.
4. **Submit** — click `#reg-submit`.
5. **Assert the errors** — check `#reg-email-error`, `#reg-password-error`, and `#reg-confirm-error`, and confirm `#reg-name-error` is **not shown**.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Create account link | `#create-account` | Clickable |
| Name input | `#reg-name` | `Ravi Kumar` |
| Email input | `#reg-email` | `ravi.kumar` |
| Password input | `#reg-password` | `short` |
| Confirm password input | `#reg-confirm` | `different` |
| Submit button | `#reg-submit` | Clickable |
| Name error | `#reg-name-error` | Hidden |
| Email error | `#reg-email-error` | `Enter a valid email address` |
| Password error | `#reg-password-error` | `Minimum 8 characters, including a number` |
| Confirmation error | `#reg-confirm-error` | `Passwords must match` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | The email error says **“Enter a valid email address”**. |
| ✅ | The password error mentions the **8-character minimum**. |
| ✅ | The confirmation error says the passwords **must match**. |
| ✅ | The name field shows **no error**. |
| ✅ | The test makes **at least three assertions**. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Form interaction** | Fills multiple fields by stable IDs before submitting. |
| **Validation testing** | Asserts exact field-level error messages, not just a generic failure. |
| **Multiple assertions** | Verifies several independent outcomes from one submission. |
| **Negative assertions** | Uses `toBeHidden()` to prove a valid field has no error. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-register-validation';

test('Validate the registration form errors', async ({ page }) => {
  await page.goto(TEST_URL);

  await page.locator('#create-account').click();

  await page.locator('#reg-name').fill('Ravi Kumar');
  await page.locator('#reg-email').fill('ravi.kumar');
  await page.locator('#reg-password').fill('short');
  await page.locator('#reg-confirm').fill('different');

  await page.locator('#reg-submit').click();

  await expect(page.locator('#reg-email-error'))
    .toHaveText('Enter a valid email address');
  await expect(page.locator('#reg-password-error'))
    .toHaveText('Minimum 8 characters, including a number');
  await expect(page.locator('#reg-confirm-error'))
    .toHaveText('Passwords must match');

  await expect(page.locator('#reg-name-error')).toBeHidden();
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
npx playwright test tests/validateTheRegistrationFormErrors.spec.ts

# Explore interactively
npx playwright test tests/validateTheRegistrationFormErrors.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Filling forms](https://playwright.dev/docs/api/class-locator#locator-fill)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
