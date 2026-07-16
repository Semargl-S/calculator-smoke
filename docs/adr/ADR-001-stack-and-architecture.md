# ADR-001: Stack and Architecture Decisions for Calculator

**Date:** 2026-07-16  
**Status:** Accepted

## Context

We need a simple browser calculator with smoke tests and a public deployment. The goal is minimal complexity — no build pipeline overhead, fast iteration, and a straightforward CI/CD path.

## Decisions

### 1. Frontend stack — vanilla HTML/CSS/JS, no build step

**Decision:** Use plain HTML, CSS, and JavaScript with no bundler, transpiler, or framework.

**Rationale:** The feature surface is small (a calculator). A build pipeline (Webpack, Vite, etc.) would add maintenance overhead without meaningful benefit. Vanilla JS is universally supported and keeps the project dependency-free for production assets.

**Consequences:** No tree-shaking or transpilation. Modern browser features only (acceptable for a demo/smoke project). Any developer can open `index.html` locally without running `npm install`.

---

### 2. File structure — flat root layout

**Decision:** Three files at the repository root:

```
index.html
styles.css
app.js
```

**Rationale:** GitHub Pages serves the root of `main` by default. A flat layout requires zero configuration and lets the browser load all assets relative to `/`. Adding subdirectories would require adjusting asset paths or a Jekyll config, both of which are unnecessary complexity.

**Consequences:** All source lives at the root. If the project grows significantly, files can be reorganised and this ADR revisited.

---

### 3. Hosting — GitHub Pages from `main` branch, path `/`

**Decision:** Deploy via GitHub Pages, source = `main` branch, root folder `/`.

**Rationale:** Free, zero-ops hosting that integrates directly with the repo. Publishing from `main /` means every merge to main automatically reflects on the live site without a separate deploy step or artifact storage.

**Consequences:** The live site always reflects `main`. There is no staging environment. Breaking changes on `main` will be immediately public — the smoke test suite is the safety net.

---

### 4. Tests — Playwright in `tests/`, minimal `package.json` for dev-deps only

**Decision:** QA owns the choice of tooling. The recommended approach is Playwright end-to-end tests located in `tests/`, with a `package.json` at the repo root that lists only dev dependencies (no runtime/production deps).

**Rationale:** Playwright exercises the real browser stack (matching what end-users see) and integrates cleanly with GitHub Actions. Keeping it in `tests/` isolates test infrastructure from the app source. A minimal `package.json` (dev-only) preserves the production asset's zero-dependency character.

**Consequences:** Node.js is required only for running tests, not for developing or deploying the app. QA may substitute an alternative framework as long as tests cover the acceptance criteria documented in this ADR.

---

### 5. Visual design — readable, easy on the eyes; details at designer's discretion

**Decision:** The designer chooses colours, typography, and layout within the constraint: the UI must be legible and not visually uncomfortable (no extreme contrasts, no tiny fonts, no distracting animations).

**Rationale:** A rigid design spec is overkill for a smoke project. The single constraint captures the intent without over-specifying.

**Consequences:** Designers iterate freely. If subjective "painful to look at" disputes arise, the team resolves them by consensus, not by this ADR.

---

### 6. Division-by-zero behaviour — display "Error"; next digit or C resets state

**Decision:**

- Dividing by zero displays the string `Error` in the result area.
- The calculator state is considered "error state".
- Pressing any digit key (`0`–`9`) or the clear key (`C`) exits error state and begins a fresh calculation (the digit pressed becomes the first character of a new input; `C` fully resets to `0`).
- Any other key press while in error state is ignored.

**Rationale:** Showing `Error` is a clear, unambiguous signal. Requiring an explicit user action (digit or C) to recover prevents accidental continuation from a broken state. This matches common physical calculator behaviour.

**Consequences:** Implementors must track an `isError` flag in application state. The QA test suite must include at least one division-by-zero test covering the recovery path.

---

## Alternatives considered

| Alternative | Reason rejected |
|---|---|
| React / Vue SPA | Over-engineered for a single-screen calculator |
| Separate `src/` directory | Complicates GitHub Pages root-path config unnecessarily |
| `gh-pages` branch deployment | Extra branch to maintain; root-of-main is simpler |
| Jest unit tests only | Doesn't exercise the real browser; Playwright gives higher confidence |
| Show `Infinity` for division by zero | Ambiguous to end-users; `Error` is clearer |
| Any key recovers from error state | Too easy to accidentally continue a broken calculation |
