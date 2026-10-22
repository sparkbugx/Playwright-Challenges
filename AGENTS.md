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

## Environment quirks

- `playwright.config.ts` calls `dotenv.config()`, so a root `.env` is auto-loaded. `.env` is gitignored and currently empty — never commit it.
- Tests need network access to `targetqa.com`. CI (`.github/workflows/playwright.yml`) runs on pushes and PRs to `main`/`master`, with 2 retries and 1 worker.
- `package.json` sets `"type": "commonjs"`; keep any new plain-JS tooling CommonJS-compatible.
