# 🎭 Playwright Automation Challenges

**Real-world E2E challenges solved with Playwright + TypeScript — resilient locators, web-first assertions, zero fixed sleeps.**

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Follow](https://img.shields.io/github/followers/sparkbugx?label=Follow&style=social)](https://github.com/sparkbugx)

---

## 📌 What this is

A collection of **11 UI automation challenges** against live practice labs, each with a Playwright spec and a recruiter-friendly write-up. The focus is on the parts of test automation that actually break in production: dynamic UI, overlays, multi-step flows, and values that change after an action.

Ten challenges are solved end to end and exercised across **Chromium, Firefox, and WebKit** — **33 checks** on every CI run, with no hard-coded sleeps. The eleventh (`🚧` OTP login) is documented and queued.

| | |
| :--- | :--- |
| **Challenges** | 11 documented · 10 solved · 1 in progress |
| **Tests** | 11 tests · 33 checks across 3 browsers |
| **Stack** | Playwright Test · TypeScript · Node.js 24 · GitHub Actions |
| **Patterns** | Web-first assertions · scoped locators · ARIA state · data attributes |

---

## 🎯 Challenge catalog

Each challenge title links to its brief (objective, selectors, acceptance criteria, reference implementation). The **Spec** column links to the code.

| # | Challenge | Level | What it demonstrates | Spec |
| :---: | :--- | :--- | :--- | :--- |
| 1 | [Handle a Delayed Location Popup](challenges-descriptions/Handle%20a%20delayed%20location%20popup.md) | Beginner–Intermediate | Auto-waiting for a delayed modal, no fixed sleeps | [spec](tests/handleADelayedLocationPopup.spec.ts) |
| 2 | [Add Two Units of a Product to the Cart](challenges-descriptions/Add%20two%20units%20of%20a%20product%20to%20the%20cart.md) | Beginner | Native dropdowns, quantity, cart badge state | [spec](tests/addTwoUnitsOfAProductToTheCart.spec.ts) |
| 3 | [Search for a Product and Verify the Results](challenges-descriptions/Search%20for%20a%20product%20and%20verify%20the%20results.md) | Easy | Collections, counts, scoped text assertions | [spec](tests/searchForAProductAndVerifyTheResults.spec.ts) |
| 4 | [Filter Results by Brand and Sort by Price](challenges-descriptions/Filter%20results%20by%20brand%20and%20sort%20by%20price.md) | Medium | Checkbox filters, sorting, ordered list assertions | [spec](tests/filterResultsByBrandAndSortByPrice.spec.ts) |
| 5 | [Update Quantities and Remove an Item from the Cart](challenges-descriptions/Update%20quantities%20and%20remove%20an%20item%20from%20the%20cart.md) | Medium | Row-scoped locators, deletion, recalculated totals | [spec](tests/updateQuantitiesAndRemoveAnItemFromTheCart.spec.ts) |
| 6 | [Apply a Coupon Code and Verify the Discounted Total](challenges-descriptions/Apply%20a%20coupon%20code%20and%20verify%20the%20discounted%20total.md) | Medium | Forms, success and rejection paths, calculated values | [spec](tests/applyACouponCodeAndVerifyTheDiscountedTotal.spec.ts) |
| 7 | [Accept the Cookie Consent Banner](challenges-descriptions/Accept%20the%20cookie%20consent%20banner.md) | Easy | Overlays, visibility, recorded preference | [spec](tests/acceptTheCookieConsentBanner.spec.ts) |
| 8 | [Read a Value from the Product Specifications Tab](challenges-descriptions/Read%20a%20value%20from%20the%20product%20specifications%20tab.md) | Easy | Tabs, ARIA state, table cell scoping | [spec](tests/readAValueFromTheProductSpecificationsTab.spec.ts) |
| 9 | [Validate the Registration Form Errors](challenges-descriptions/Validate%20the%20registration%20form%20errors.md) | Intermediate | Form validation, multiple independent assertions | [spec](tests/validateTheRegistrationFormErrors.spec.ts) |
| 10 | [Complete a Checkout with Cash on Delivery](challenges-descriptions/Complete%20a%20checkout%20with%20Cash%20on%20Delivery.md) | Hard | End-to-end flow, two-step auth, COD confirmation | [spec](tests/completeACheckoutWithCashOnDelivery.spec.ts) |
| 11 | [Log in with a Mobile Number and an SMS OTP](challenges-descriptions/Log%20in%20with%20a%20mobile%20number%20and%20an%20SMS%20OTP.md) 🚧 | Medium | Reading dynamic text, explicit waits, negative paths | [spec](tests/logInWithAMobileNumberAndAnSMSOTP.spec.ts) |

`🚧` = brief and reference implementation are published; the spec is still being solved.

**Coming soon:** API testing challenges (REST validation) — follow the repo to catch them.

---

## 🗂️ Repository structure

| Path | What's inside |
| :--- | :--- |
| [`tests/`](./tests) | 11 Playwright specs — 10 solved, 1 starter |
| [`challenges-descriptions/`](./challenges-descriptions) | 11 briefs with selectors, acceptance criteria, and collapsible reference implementations |
| [`commands.txt`](./commands.txt) | Command cheat sheet for running, debugging, and reporting |
| [`playwright.config.ts`](./playwright.config.ts) | Three browser projects, HTML reporter, retries on CI |
| [`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml) | CI pipeline: install, run all browsers, upload the report |
| [`AGENTS.md`](./AGENTS.md) | Authoring conventions for challenge docs and specs |

---

## 🧠 Engineering practices on display

- **Web-first assertions** — `expect(locator)` retries until the UI settles, so tests describe outcomes instead of timing.
- **No fixed sleeps** — no `waitForTimeout` anywhere; every wait is tied to a state or value.
- **Scoped locators** — actions are anchored to a row, card, or panel before touching buttons inside it.
- **Runtime data extraction** — the OTP challenge reads the six-digit code from the on-page SMS instead of hardcoding it.
- **Stable selectors** — ids, `data-testid`, `data-product-id`, and ARIA roles over brittle CSS chains.
- **Negative paths** — invalid coupons, validation errors, and rejected OTPs are asserted, not ignored.
- **Documentation as part of the work** — each spec has a brief with a selector table and reference implementation.

---

## 🚀 Getting started

**Prerequisites:** [Node.js](https://nodejs.org/) 24+ and npm.

```bash
# 1. Clone
git clone https://github.com/sparkbugx/Playwright-Challenges.git
cd Playwright-Challenges

# 2. Install dependencies
npm ci

# 3. Install browsers
npx playwright install --with-deps

# 4. Run everything (Chromium, Firefox, WebKit)
npx playwright test
```

The labs are public and need **no credentials or env vars**. Each spec declares its own `TEST_URL`; `.env` is optional and only loaded for local overrides.

### Useful commands

| Goal | Command |
| :--- | :--- |
| Run all challenges | `npx playwright test` |
| Run one challenge | `npx playwright test tests/<name>.spec.ts` |
| Run one browser | `npx playwright test --project=chromium` |
| Run by title | `npx playwright test -g "<test title>"` |
| Debug interactively | `npx playwright test --ui` |
| Open the last report | `npx playwright show-report` |

See [`commands.txt`](./commands.txt) for a longer cheat sheet.

---

## 🔄 Continuous integration

GitHub Actions runs the full suite on every push and pull request to `main`/`master`. The job installs on **Node 24**, runs all three browser projects with **2 retries on CI**, and uploads the **HTML report** as an artifact for 30 days.

The badge at the top of this README reflects the latest run.

---

## 🤝 Connect

**Shandon Vasquez** — QA Automation Engineer / SDET building test automation from the ground up.

[![GitHub](https://img.shields.io/badge/GitHub-sparkbugx-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sparkbugx)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Shandon%20Vasquez-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shandon-vasquez/)

- **Portfolio:** [github.com/sparkbugx](https://github.com/sparkbugx)
- **Hiring or collaborating?** The fastest way to reach me is [LinkedIn](https://www.linkedin.com/in/shandon-vasquez/).
- **Following the work?** [Follow me on GitHub](https://github.com/sparkbugx) to see new challenges as they land.
- **Found this useful?** A ⭐ on the repository is appreciated.

---

<p align="center">
  <sub>Built with <a href="https://playwright.dev/"><strong>Playwright</strong></a> + <a href="https://www.typescriptlang.org/"><strong>TypeScript</strong></a> · challenges run against <a href="https://targetqa.com/">TargetQA</a> labs</sub>
</p>
