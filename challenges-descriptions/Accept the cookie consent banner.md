# Accept the Cookie Consent Banner

> **Playwright Challenge — dismiss an overlay and confirm the state it leaves behind.**
> One fixed banner, one button, and a footer that records the choice.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-easy-green)

---

## 📌 Overview

On first visit, a **cookie consent banner** is pinned to the bottom of the page. Its footer records the current choice as **Cookie preference: not set** until the visitor acts.

Click **Accept all** and the banner leaves the DOM entirely, while `#consent-state` switches to **Cookie preference: accepted**. The test proves both the dismissal and the recorded state.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | UI interaction · overlays |
| **Focus** | Visibility, dismissal, state assertions |
| **App** | ShopZone marketplace |
| **Test file** | [`tests/acceptTheCookieConsentBanner.spec.ts`](../tests/acceptTheCookieConsentBanner.spec.ts) |
| **Live lab** | [Open the lab](https://targetqa.com/lab/playwright-shopzone-cookie-consent) |
| **Challenge page** | [View challenge](https://targetqa.com/challenges/playwright-shopzone-cookie-consent) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Wait for the cookie banner, click **Accept all**, and verify that the banner is gone and the preference is recorded.

This challenge shows how to assert the *absence* of an overlay — a locator that is detached still counts as hidden, so no manual pause is needed.

---

## ✅ Your task

1. **Open the test URL** — navigate to `TEST_URL`.
2. **Wait for the banner** — assert that `#cookie-banner` is visible on first visit.
3. **Accept all cookies** — click `#accept-cookies`.
4. **Verify the dismissal** — assert that `#cookie-banner` is no longer visible.
5. **Verify the preference** — assert that `#consent-state` reads **`Cookie preference: accepted`**.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Cookie banner | `#cookie-banner` | Visible, then hidden |
| Accept all button | `#accept-cookies` | Clickable |
| Consent state | `#consent-state` | `Cookie preference: accepted` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | The cookie banner is closed. |
| ✅ | The footer records the accepted preference. |
| ✅ | The test asserts the banner closed. |
| ✅ | The test uses no fixed sleeps. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Overlay handling** | Interacts with a fixed-position banner instead of ignoring it. |
| **Visibility assertions** | Uses `toBeVisible()` / `toBeHidden()` for before and after states. |
| **State verification** | Confirms the recorded preference in the footer. |
| **Auto-waiting** | Relies on retrying assertions rather than fixed delays. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-cookie-consent';

test('Accept the cookie consent banner', async ({ page }) => {
  await page.goto(TEST_URL);

  const banner = page.locator('#cookie-banner');
  await expect(banner).toBeVisible();

  await page.locator('#accept-cookies').click();

  await expect(banner).toBeHidden();
  await expect(page.locator('#consent-state'))
    .toHaveText('Cookie preference: accepted');
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
npx playwright test tests/acceptTheCookieConsentBanner.spec.ts

# Explore interactively
npx playwright test tests/acceptTheCookieConsentBanner.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Hidden assertion](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-hidden)
- [Actionability](https://playwright.dev/docs/actionability)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
