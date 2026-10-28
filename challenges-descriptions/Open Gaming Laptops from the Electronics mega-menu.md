# Open Gaming Laptops from the Electronics mega-menu

> **Electronics mega-menu navigation**
> Mouse hover interaction and flyout menu selection

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-easy-green)

---

## 📌 Overview

When you visit the FlipMart electronics lab, the category bar reveals a powerful hover-activated mega-menu for the Electronics section. This expansive menu displays curated sub-categories and featured products, serving as the primary navigation for exploring the store's electronics inventory.

This challenge focuses on interacting with the hover-activated flyout and selecting Gaming Laptops from the Laptops column. The difficulty lies in properly waiting for the mega-menu to appear and verifying the curated product listing without relying on fixed sleeps, demonstrating Playwright's web-first assertion capabilities.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | Mouse hover · Flyout menus |
| **Focus** | Electronics mega-menu, action chains |
| **App** | FlipMart |
| **Test file** | [`tests/openGamingLaptopsFromTheElectronicsMega-menu.spec.ts`](../tests/openGamingLaptopsFromTheElectronicsMega-menu.spec.ts) |
| **Live lab** | [Open the lab](https://targetqa.com/lab/playwright-flipmart-mega-menu) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Hover the Electronics item in the category bar to open its mega-menu, choose Gaming Laptops, and verify that the curated listing is shown.

This challenge demonstrates how to interact with hover-activated mega-menus and verify curated product listings using Playwright's auto-waiting and web-first assertions.

---

## ✅ Your task

1. **Open TEST_URL** — navigate to the test lab URL.
2. **Hover over Electronics** — move the mouse over `#nav-electronics` in the category bar.
3. **Click Gaming Laptops** — wait for the flyout `#mega-menu` and click `#mega-gaming-laptops` in the Laptops column.
4. **Assert the listing** — verify that `#listing-title` reads `"Gaming Laptops"` and exactly 3 product cards are shown.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Navigation item | `#nav-electronics` | Hoverable element in category bar |
| Mega menu | `#mega-menu` | Visible flyout after hover |
| Gaming laptops link | `#mega-gaming-laptops` | Clickable link in Laptops column |
| Listing title | `#listing-title` | "Gaming Laptops" |
| Product cards | `[data-testid="product-card"]` | 3 visible |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | The Gaming Laptops listing is open. |
| ✅ | Exactly 3 gaming laptops are listed. |
| ✅ | The test asserts the listing using web-first assertions. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Mouse hover** | Uses `page.hover()` to interact with mega-menus. |
| **Flyout menus** | Waits for and navigates dropdown overlays. |
| **Web-first assertions** | Uses `expect` to verify text and count without fixed sleeps. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
// Verified on all three browsers before publishing.
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-flipmart-mega-menu';

test('Open Gaming Laptops from the Electronics mega-menu', async ({ page }) => {
  await page.goto(TEST_URL);

  // Hover over Electronics to open mega-menu
  await page.hover('#nav-electronics');

  // Wait for flyout to appear and click Gaming Laptops
  await page.waitForSelector('#mega-gaming-laptops', { state: 'visible' });
  await page.click('#mega-gaming-laptops');

  // Assert the listing title and product count
  await expect(page.locator('#listing-title')).toHaveText('Gaming Laptops');
  await expect(page.locator('[data-testid="product-card"]')).toHaveCount(3);
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
npx playwright test tests/openGamingLaptopsFromTheElectronicsMega-menu.spec.ts

# Explore interactively
npx playwright test tests/openGamingLaptopsFromTheElectronicsMega-menu.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Mouse interactions](https://playwright.dev/docs/mouse#hover)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>