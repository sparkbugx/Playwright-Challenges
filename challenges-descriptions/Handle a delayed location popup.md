# Handle a Delayed Location Popup

> **Playwright Challenge — wait for the UI without guessing, then prove the result.**
> A timed modal, a few stable selectors, and zero fixed sleeps.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-beginner--intermediate-blue)

---

## 📌 Overview

Two seconds after the page loads, a **“Choose your location”** dialog appears. The delay is the point: the test must **wait for the UI to be ready** rather than pause the script with an arbitrary sleep.

Set the delivery pincode to **560001**, apply it, and verify that the header reports **Bengaluru 560001**.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | UI interaction · dynamic content |
| **Focus** | Auto-waiting, visibility, text assertions |
| **App** | ShopZone location popup |
| **Test file** | [`tests/handleADelayedLocationPopup.spec.ts`](../tests/handleADelayedLocationPopup.spec.ts) |
| **Live lab** | [Open the challenge](https://targetqa.com/lab/playwright-shopzone-location-popup) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Wait for the delayed dialog to appear **without fixed sleeps**, set the pincode to **560001**, and verify the delivery location in the header.

This challenge demonstrates the difference between *waiting for time* and *waiting for state*. Playwright's auto-waiting and web-first assertions handle the timing for you.

---

## ✅ Your task

1. **Open the test URL** — navigate to `TEST_URL`.
2. **Wait for the dialog** — `#location-modal` appears only after a delay.
3. **Set the location** — enter `560001` in `#location-pincode` and click **Apply** (`#location-apply`).
4. **Verify the outcome** — assert that the dialog closed and `#deliver-to` reads **“Deliver to Bengaluru 560001”**.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Location dialog | `#location-modal` | Visible after the delay |
| Pincode input | `#location-pincode` | `560001` |
| Apply button | `#location-apply` | Clickable |
| Delivery label | `#deliver-to` | `Deliver to Bengaluru 560001` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | The location dialog is closed. |
| ✅ | The header shows **Bengaluru 560001**. |
| ✅ | The test uses **no fixed sleeps** (`waitForTimeout`, `sleep`, etc.). |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Auto-waiting** | Understands that Playwright waits for actionability and visibility. |
| **Web-first assertions** | Uses `expect(locator).toHaveText()` instead of reading state manually. |
| **Stable selectors** | Targets IDs rather than brittle text or DOM structure. |
| **Flake-free design** | Eliminates timing assumptions and fixed delays. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-location-popup';

test('Handle a delayed location popup', async ({ page }) => {
  await page.goto(TEST_URL);

  // Wait for state, not for time
  await page.locator('#location-modal').waitFor({ state: 'visible' });

  await page.locator('#location-pincode').fill('560001');
  await page.locator('#location-apply').click();

  await expect(page.locator('#deliver-to'))
    .toHaveText('Deliver to Bengaluru 560001');
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
npx playwright test tests/handleADelayedLocationPopup.spec.ts

# Explore interactively
npx playwright test tests/handleADelayedLocationPopup.spec.ts --ui
```

---

## 📚 Resources

- [Playwright auto-waiting](https://playwright.dev/docs/actionability)
- [Locators](https://playwright.dev/docs/locators)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
