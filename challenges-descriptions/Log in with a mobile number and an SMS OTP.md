# Log in with a Mobile Number and an SMS OTP

> **Playwright Challenge — read a one-time code from an on-page "SMS" and prove the happy and unhappy paths.**
> A dynamic value you cannot hardcode, a rejection to verify, and a signed-in state to confirm.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-medium-orange)

---

## 📌 Overview

FlipMart signs customers in with a **mobile number** and a **one-time password**. After you request a code, a mock SMS notification appears on the page with the six-digit OTP inside it — so the test has to **read the value at runtime** instead of hardcoding it.

The flow has two halves: a **wrong** code (`111111`) must be rejected with an inline error, and the **real** code must sign the customer in, updating the header to **“Rohan”** and returning to the home page.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | Authentication · OTP flow |
| **Focus** | Dynamic text, explicit waits, negative testing |
| **App** | FlipMart electronics store |
| **Test file** | [`tests/logInWithAMobileNumberAndAnSMSOTP.spec.ts`](../tests/logInWithAMobileNumberAndAnSMSOTP.spec.ts) |
| **Live lab** | [Open the lab](https://targetqa.com/lab/playwright-flipmart-otp-login) |
| **Challenge page** | [View challenge](https://targetqa.com/challenges/playwright-flipmart-otp-login) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Log in with a mobile number and a one-time password: read the OTP from the on-page SMS, prove a wrong OTP is rejected, then verify the correct one and assert that the header greets Rohan.

This is the challenge where **hardcoding the code is the trap** — the OTP is data produced by the app, so the test must extract it from the page and feed it back in.

---

## ✅ Your task

1. **Open the login** — go to `TEST_URL` and click `#login-button`.
2. **Request a code** — type `9876543210` into `#login-mobile` and click `#request-otp`.
3. **Read the SMS** — wait for `#sms-notification`, then read the six-digit code from `#sms-otp`.
4. **Try a wrong code** — fill `111111` into `#otp-input`, click `#verify-otp`, and assert `#otp-error` reports an incorrect OTP.
5. **Sign in properly** — replace the value with the code you read, click `#verify-otp` again, and assert `#account-name` reads `Rohan`.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Login button | `#login-button` | Clickable |
| Mobile input | `#login-mobile` | `9876543210` |
| Request OTP | `#request-otp` | Clickable |
| SMS notification | `#sms-notification` | Visible after the request |
| OTP in the SMS | `#sms-otp` | Six digits, matches `/^\d{6}$/` |
| OTP input | `#otp-input` | `111111`, then the code from the SMS |
| Verify button | `#verify-otp` | Clickable |
| Error message | `#otp-error` | Contains `Incorrect OTP` |
| Header account name | `#account-name` | `Rohan` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | A wrong OTP shows the **“Incorrect OTP”** error. |
| ✅ | The correct OTP signs the customer in and the header shows **“Rohan”**. |
| ✅ | The browser ends on the FlipMart home page. |
| ✅ | The test makes at least two assertions. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Reading dynamic text** | Extracts the OTP with `innerText()` at runtime instead of hardcoding a fixture value. |
| **Waiting for the SMS** | Uses `expect(locator).toBeVisible()` so the test waits for the notification to arrive without a fixed sleep. |
| **Negative testing** | Asserts the rejection path before attempting the successful login. |
| **Two-phase interaction** | Reuses one field for a bad value and then the correct one, proving state actually changed. |
| **Post-login assertion** | Confirms authentication through the header text, not just a URL change. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-flipmart-otp-login';

test('Log in with a mobile number and an SMS OTP', async ({ page }) => {
  await page.goto(TEST_URL);

  // Request an OTP for the test number
  await page.locator('#login-button').click();
  await page.locator('#login-mobile').fill('9876543210');
  await page.locator('#request-otp').click();

  // The "SMS" arrives on the page — read the code from it
  await expect(page.locator('#sms-notification')).toBeVisible();
  const otp = (await page.locator('#sms-otp').innerText()).trim();
  expect(otp).toMatch(/^\d{6}$/);

  // A wrong code must be rejected
  await page.locator('#otp-input').fill('111111');
  await page.locator('#verify-otp').click();
  await expect(page.locator('#otp-error')).toContainText('Incorrect OTP');

  // The real code signs the customer in
  await page.locator('#otp-input').fill(otp);
  await page.locator('#verify-otp').click();
  await expect(page.locator('#account-name')).toHaveText('Rohan');
  await expect(page).toHaveURL(/#\/$/);
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
npx playwright test tests/logInWithAMobileNumberAndAnSMSOTP.spec.ts

# Explore interactively
npx playwright test tests/logInWithAMobileNumberAndAnSMSOTP.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Text input and typing](https://playwright.dev/docs/input#text-input)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Auto-waiting](https://playwright.dev/docs/actionability)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
