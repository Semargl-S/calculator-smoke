# calculator-smoke

Мінімальний веб-калькулятор — smoke-тест конвеєра AI-team.

**Жива сторінка:** https://semargl-s.github.io/calculator-smoke/

## Функції

- Базові арифметичні операції: `+`, `−`, `×`, `÷`
- Унарні операції: квадратний корінь `√` і піднесення до квадрату `x²`
- `√` від'ємного числа показує `Error`

## Як запустити локально

Відкрийте `index.html` у браузері — жодного сервера не потрібно.

## Як прогнати тести

**Юніт-тести** (Jest):

```bash
npm test
```

**E2E-тести** (Playwright):

```bash
cd tests
npm test
```

## Документація

- [ADR-001: Stack and Architecture](docs/adr/ADR-001-stack-and-architecture.md)
- [ROADMAP.yaml](ROADMAP.yaml)
