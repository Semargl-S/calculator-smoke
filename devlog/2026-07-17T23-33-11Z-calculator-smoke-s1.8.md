# Devlog — calculator-smoke-s1.8

- **Завершено:** 2026-07-17T23:33:11+00:00
- **Проєкт:** calculator-smoke
- **Зона:** /opt/projects/calculator-smoke
- **Гілка:** main
- **Вердикт QA:** passed
- **Спроб:** 1
- **Пункт роад-мапу:** {'stage': 's2', 'item': 's1.8'}

## Завдання

CI червоний: tests/playwright.config.js має testDir: "." і підхоплює tests/unit/applyUnary.test.js як e2e-тест. Playwright не дає jsdom, тому app.js:1 (const display = document.getElementById(...)) кидає ReferenceError: document is not defined. Два набори тестів перетнулись. Дії: (1) у tests/playwright.config.js обмежити добір лише e2e — testMatch на *.spec.js (або винести unit за межі testDir); (2) .github/workflows/ci.yml зараз ганяє ТІЛЬКИ npm test у tests/ — додати окремий крок для unit: npm ci + npm test у корені (jest уже налаштований у package.json з testEnvironment: jsdom і testMatch: **/unit/**/*.test.js); (3) переконатись, що обидва набори ганяються і проходять локально: у корені → jest бачить tests/unit/applyUnary.test.js; у tests/ → playwright бачить лише calculator.spec.js; (4) app.js не переписувати під модульність — jest-environment-jsdom для того й стоїть.

## Хід

- [2026-07-17T23:31:30+00:00] plan: kind=code; retrieved 3 lesson(s)
- [2026-07-17T23:31:58+00:00] execute(code, attempt 1, initial): ok, 531 chars
- [2026-07-17T23:33:11+00:00] qa: PASS (attempt 1)

## Результат

Both sets of tests are correctly isolated:
- Jest (root) finds only `tests/unit/applyUnary.test.js` — 6 unit tests pass
- Playwright (`tests/`) finds only `calculator.spec.js` — 8 e2e specs, no unit files

Checked: (1) `playwright.config.js` has `testMatch: '**/*.spec.js'` — unit `.test.js` files excluded; (2) `ci.yml` has a root `npm ci` + `npm test` step before the e2e steps; (3) jest discovers `tests/unit/applyUnary.test.js` and passes (6/6); (4) playwright lists only `calculator.spec.js` (8 tests); (5) `app.js` untouched.


## 💰 Вартість API

- **Разом:** $0.2157 за 2 запуск(и)
- **Токени:** in 162 · out 6,670 · cache-read 416,927 · cache-creation 44,200
- **Період:** 2026-07-17T23:31:30.963611+00:00 → 2026-07-17T23:31:58.157433+00:00

| Роль | Запусків | Cost |
|---|---|---|
| programmer | 1 | $0.1254 |
| qa | 1 | $0.0903 |