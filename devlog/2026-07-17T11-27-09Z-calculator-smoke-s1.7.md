# Devlog — calculator-smoke-s1.7

- **Завершено:** 2026-07-17T11:27:09+00:00
- **Проєкт:** calculator-smoke
- **Зона:** /opt/projects/calculator-smoke
- **Гілка:** main
- **Вердикт QA:** passed
- **Спроб:** 1
- **Пункт роад-мапу:** {'stage': 's1', 'item': 's1.7'}

## Завдання

Додати до калькулятора дві унарні операції: квадратний корінь (√) і піднесення до квадрату (x²). Дії: (1) в app.js додати applyUnary(value, op) з підтримкою "sqrt" і "sq" — НЕ розширювати calculate(a, b, op): вона побудована на switch по бінарних операціях з двома операндами. Унарна застосовується до поточного значення дисплея негайно, без очікування другого операнда і без зміни operator / firstOperand; (2) √ від'ємного числа → "Error" тим самим механізмом, яким уже обробляється ділення на нуль; (3) в index.html додати кнопки √ і x² у наявну сітку; (4) додати юніт-тести на applyUnary: sqrt(9)=3, sqrt(0)=0, sqrt(-1)→Error, sq(4)=16, sq(-3)=9, sq(0)=0 — якщо тестової інфраструктури в репо ще немає, підняти мінімальну (vitest або jest на вибір команди) і додати npm-скрипт `test`; (5) оновити README.md.

## Хід

- [2026-07-17T11:22:45+00:00] plan: kind=code; retrieved 3 lesson(s)
- [2026-07-17T11:26:16+00:00] execute(code, attempt 1, initial): ok, 775 chars
- [2026-07-17T11:27:09+00:00] qa: PASS (attempt 1)

## Результат

Checked:
- `applyUnary(value, op)` added to `app.js` as pure function (no DOM access, no binary `calculate` changes)
- `sqrt(-1)` returns `null` → `handleUnary` shows `"Error"` and sets `isError = true`, same mechanism as division-by-zero
- `handleUnary` leaves `operator`/`firstOperand` unchanged (applies immediately to display value)
- √ and x² buttons added to `index.html` grid with `data-action="unary"`
- CSS: unary buttons span 2 columns, amber styling matching operators
- Root `package.json` created with jest + jest-environment-jsdom, `"test": "jest"` script
- All 6 unit tests pass: `sqrt(9)=3`, `sqrt(0)=0`, `sqrt(-1)→null`, `sq(4)=16`, `sq(-3)=9`, `sq(0)=0`
- `README.md` updated with unary features section and separate test instructions for Jest vs Playwright


## 💰 Вартість API

- **Разом:** $0.5949 за 2 запуск(и)
- **Токени:** in 144 · out 15,538 · cache-read 985,019 · cache-creation 54,307
- **Період:** 2026-07-17T11:22:45.921269+00:00 → 2026-07-17T11:26:16.932985+00:00

| Роль | Запусків | Cost |
|---|---|---|
| programmer | 1 | $0.5236 |
| qa | 1 | $0.0714 |