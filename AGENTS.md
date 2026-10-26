# AGENTS.md

## What this repo is

A small collection of Playwright + TypeScript UI challenges. Each challenge has a spec in `tests/` and a matching write-up in `challenges-descriptions/`. Tests run against live external labs at `targetqa.com` — there is no local app or dev server.

## Commands

`package.json` defines **no npm scripts**; call the Playwright CLI directly with `npx`.

```bash
npm ci && npx playwright install --with-deps   # first-time setup
npx playwright test                            # all tests, all 3 configured browsers
npx playwright test tests/<name>.spec.ts       # one spec
npx playwright test -g "<test title>"          # one test by title
npx playwright test tests/<name>.spec.ts --project=chromium   # one browser
npx playwright test --ui                       # interactive UI mode
npx playwright show-report                     # open HTML report
```

- No lint, typecheck, format, or build step exists. Playwright transpiles TypeScript at runtime.
- `commands.txt` is scratch notes, not a task runner.
- Default browsers are Chromium, Firefox, and WebKit; CI runs all three.

## Conventions

- Spec filenames use lowerCamelCase and end in `.spec.ts`; keep them in `tests/` (`testDir`).
- Hardcode each lab URL as a local `const TEST_URL = '...'`; no `baseURL` is configured.
- Use Playwright auto-waiting and web-first assertions. Challenge rules forbid fixed sleeps (`waitForTimeout`, `sleep`, etc.).
- Challenge docs are `challenges-descriptions/<Title>.md`. Links from there are relative to that directory (e.g. `../tests/...`); update them if files are renamed.

## Challenge description format

`challenges-descriptions/Handle a delayed location popup.md` is the canonical design. Copy its structure for every new challenge doc — these are recruiter-facing, so consistency and presentation matter.

Sections appear in this order, separated by `---`:

1. `# Title` — title case, no emoji.
2. Blockquote subtitle — bold tagline, then one supporting line.
3. Badge row — linked CI badge (repo slug from `package.json`), Playwright, TypeScript, and level; all on one line.
4. `## 📌 Overview` — two short paragraphs, key values in **bold**.
5. `## 🎯 Objective` — blockquote objective plus one explanatory sentence.
6. `## ✅ Your task` — numbered steps with bold lead-ins and selectors in backticks; add an H3 `Selector reference` table (`Element | Selector | Expected value / state`).
7. `## 🏁 Acceptance criteria` — table (`Status | Requirement`), status column centered with ✅.
8. `## 🧠 Skills demonstrated` — table (`Skill | What it proves`).
9. Collapsible `<details>` reference implementation — `<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>` and a `ts` code block.
10. `## 🚀 Run it locally` — `bash` block with comments, the exact spec path, and a `--ui` command.
11. `## 📚 Resources` — official Playwright docs plus relevant relative repo files.
12. Centered footer — `<p align="center"><sub>Part of the ... collection · built with Playwright + TypeScript</sub></p>`.

Keep selectors, URLs, and expected strings identical to the spec. Use tables over long lists, one blank line after headings, and concise scannable prose.

Level badge colours: `easy-green`, `beginner-green`, `beginner--intermediate-blue`, `medium-orange`, `hard-red`.

### Doc template

```markdown
# <Title In Title Case>

> **<Tagline — what this challenge proves.>**
> <One supporting line of context.>

[![Playwright Tests](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml/badge.svg)](https://github.com/sparkbugx/Playwright-Challenges/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Level](https://img.shields.io/badge/level-medium-orange)

---

## 📌 Overview

<Two short paragraphs: the scenario, then what makes it interesting. Key values in **bold**.>

| Detail | Value |
| :--- | :--- |
| **Challenge type** | <e.g. Authentication · OTP flow> |
| **Focus** | <tags from the challenge page, e.g. forms, overlays> |
| **App** | <practice app name> |
| **Test file** | [`tests/<name>.spec.ts`](../tests/<name>.spec.ts) |
| **Live lab** | [Open the lab](<lab URL>) |
| **Challenge page** | [View challenge](<challenge URL>) |
| **Browsers** | Chromium · Firefox · WebKit |

---

## 🎯 Objective

> <The challenge objective, quoted or lightly tightened.>

<One sentence on why this challenge matters.>

---

## ✅ Your task

1. **<Step name>** — <action with `selectors` in backticks>.
2. ...

### Selector reference

| Element | Selector | Expected value / state |
| :--- | :--- | :--- |
| <Name> | `#id` | <value or state> |

---

## 🏁 Acceptance criteria

| Status | Requirement |
| :---: | :--- |
| ✅ | <Requirement from the challenge page.> |

---

## 🧠 Skills demonstrated

| Skill | What it proves |
| :--- | :--- |
| **<Skill>** | <Sentence.> |

---

<details>
<summary><strong>💻 Reference implementation</strong> (click to expand)</summary>

```ts
// Verified on all three browsers before publishing.
```

</details>

---

## 🚀 Run it locally

```bash
# Install dependencies and browsers (first run only)
npm ci
npx playwright install --with-deps

# Run this challenge
npx playwright test tests/<name>.spec.ts

# Explore interactively
npx playwright test tests/<name>.spec.ts --ui
```

---

## 📚 Resources

- [Playwright locators](https://playwright.dev/docs/locators)
- <Topic-specific docs>
- [Test configuration](../playwright.config.ts)

---

<p align="center">
  <sub>Part of the <a href="https://github.com/sparkbugx/Playwright-Challenges"><strong>Playwright Challenges</strong></a> collection · built with Playwright + TypeScript</sub>
</p>
```

## In-progress challenges

New labs arrive faster than they get solved, so a challenge can be documented before its spec exists.

- Create the doc in the full canonical format, with a **verified** reference implementation in the collapsed section, and leave the spec as the starter skeleton (or empty) for the author to solve.
- Do **not** run or rewrite that starter spec, and never describe a challenge as solved until its spec passes on all three browsers.
- In `README.md`, mark the catalog row with 🚧 and keep the counts honest: `<n> documented · <solved> solved · <in progress> in progress`.
- Run the reference implementation from a temporary spec file (e.g. `tests/_tmp<Name>.spec.ts`), confirm it passes, then delete the temp file so `tests/` only holds real challenges.

## Environment quirks

- `playwright.config.ts` calls `dotenv.config()`, so a root `.env` is auto-loaded. `.env` is gitignored and currently empty — never commit it.
- Tests need network access to `targetqa.com`. CI (`.github/workflows/playwright.yml`) runs on pushes and PRs to `main`/`master`, with 2 retries and 1 worker.
- `package.json` sets `"type": "commonjs"`; keep any new plain-JS tooling CommonJS-compatible.
