# Read a Value from the Product Specifications Tab

> **Playwright Challenge — switch tabs, then read a cell from the right row.**
> ARIA state, a scoped table lookup, and one exact value.

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-easy-green)

---

## 📌 Overview

Open the **Nimbus X2 Wireless Headphones** product page and switch to the **Specifications** tab. The tab becomes selected (`aria-selected="true"`) and its panel renders the `#specs-table`.

The task is to read one cell, not the whole table: find the **Battery life** row and assert its value is **40 hours**. Scoping the row first keeps the assertion precise even as the table grows.

| Detail | Value |
| :--- | :--- |
| **Challenge type** | UI interaction · tabs |
| **Focus** | ARIA state, tables, scoped locators |
| **App** | ShopZone marketplace |
| **Test file** | [`tests/readAValueFromTheProductSpecificationsTab.spec.ts`](../tests/readAValueFromTheProductSpecificationsTab.spec.ts) |
| **Live lab** | [Open the lab](https://targetqa.com/lab/playwright-shopzone-product-specs) |
| **Challenge page** | [View challenge](https://targetqa.com/challenges/playwright-shopzone-product-specs) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> Open the **Nimbus X2 Wireless Headphones**, switch to the **Specifications** tab, and verify the advertised battery life is **40 hours**.

This challenge shows how to combine a tab interaction with a table lookup, so the assertion targets the row's value instead of any text on the page.

---

## ✅ Your task

1. **Open the test URL** — navigate to `TEST_URL`.
2. **Open the product** — click **Nimbus X2 Wireless Headphones**.
3. **Switch tabs** — click the **Specifications** tab (`#tab-specs`).
4. **Verify the tab state** — assert that `#tab-specs` has `aria-selected="true"`.
5. **Scope the row** — find the `#specs-table` row containing **Battery life**.
6. **Verify the value** — assert that the row's `td` reads **`40 hours`**.

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| Product link | `getByText('Nimbus X2 Wireless Headphones')` | Clickable |
| Specifications tab | `#tab-specs` | `aria-selected="true"` after click |
| Specifications table | `#specs-table` | Visible in the active panel |
| Battery life row | `#specs-table tr` filtered by `Battery life` | Exactly one row |
| Battery life value | `td` inside that row | `40 hours` |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | The Specifications tab is selected. |
| ✅ | The tab panel shows a battery life of **40 hours**. |
| ✅ | The test asserts the value. |
| ✅ | The assertion is scoped to the **Battery life** row. |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **Tab interaction** | Switches panels through the tab control instead of URL guessing. |
| **ARIA assertions** | Uses `toHaveAttribute()` to prove the tab's selected state. |
| **Row-scoped locators** | Filters a table row by text, then reads its cell. |
| **Web-first assertions** | Verifies the cell with an auto-retrying `expect()`. |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://targetqa.com/lab/playwright-shopzone-product-specs';

test('Read a value from the product specifications tab', async ({ page }) => {
  await page.goto(TEST_URL);

  await page.getByText('Nimbus X2 Wireless Headphones').click();
  await page.locator('#tab-specs').click();

  await expect(page.locator('#tab-specs')).toHaveAttribute('aria-selected', 'true');

  const batteryRow = page
    .locator('#specs-table tr')
    .filter({ hasText: 'Battery life' });

  await expect(batteryRow.locator('td')).toHaveText('40 hours');
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
npx playwright test tests/readAValueFromTheProductSpecificationsTab.spec.ts

# Explore interactively
npx playwright test tests/readAValueFromTheProductSpecificationsTab.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- [Filtering locators](https://playwright.dev/docs/locators#filtering-locators)
- [Attribute assertion](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-attribute)
- [Web-first assertions](https://playwright.dev/docs/test-assertions)
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
