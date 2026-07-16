const { test, expect } = require('@playwright/test');
const path = require('path');

const URL = 'file://' + path.resolve(__dirname, '..', 'index.html');

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

const display = page => page.locator('#display');
const btn = (page, text) => page.locator(`button`, { hasText: text }).first();
const digit = (page, d) => page.locator(`[data-action="digit"][data-value="${d}"]`);
const op = (page, v) => page.locator(`[data-action="operator"][data-value="${v}"]`);
const eq = page => page.locator('[data-action="equals"]');
const clear = page => page.locator('[data-action="clear"]');
const dot = page => page.locator('[data-action="decimal"]');

test('addition: 3 + 4 = 7', async ({ page }) => {
  await digit(page, '3').click();
  await op(page, '+').click();
  await digit(page, '4').click();
  await eq(page).click();
  await expect(display(page)).toHaveText('7');
});

test('subtraction: 9 - 5 = 4', async ({ page }) => {
  await digit(page, '9').click();
  await op(page, '-').click();
  await digit(page, '5').click();
  await eq(page).click();
  await expect(display(page)).toHaveText('4');
});

test('multiplication: 6 * 7 = 42', async ({ page }) => {
  await digit(page, '6').click();
  await op(page, '*').click();
  await digit(page, '7').click();
  await eq(page).click();
  await expect(display(page)).toHaveText('42');
});

test('division: 8 / 4 = 2', async ({ page }) => {
  await digit(page, '8').click();
  await op(page, '/').click();
  await digit(page, '4').click();
  await eq(page).click();
  await expect(display(page)).toHaveText('2');
});

test('decimal: 1.5 + 2.5 = 4', async ({ page }) => {
  await digit(page, '1').click();
  await dot(page).click();
  await digit(page, '5').click();
  await op(page, '+').click();
  await digit(page, '2').click();
  await dot(page).click();
  await digit(page, '5').click();
  await eq(page).click();
  await expect(display(page)).toHaveText('4');
});

test('division by zero: 10 / 0 shows Error', async ({ page }) => {
  await digit(page, '1').click();
  await digit(page, '0').click();
  await op(page, '/').click();
  await digit(page, '0').click();
  await eq(page).click();
  await expect(display(page)).toHaveText('Error');
});

test('reset after Error: digit after Error starts new number', async ({ page }) => {
  await digit(page, '1').click();
  await digit(page, '0').click();
  await op(page, '/').click();
  await digit(page, '0').click();
  await eq(page).click();
  await expect(display(page)).toHaveText('Error');
  await digit(page, '5').click();
  await expect(display(page)).toHaveText('5');
  await op(page, '+').click();
  await digit(page, '3').click();
  await eq(page).click();
  await expect(display(page)).toHaveText('8');
});

test('C clears state to 0', async ({ page }) => {
  await digit(page, '9').click();
  await op(page, '+').click();
  await digit(page, '3').click();
  await clear(page).click();
  await expect(display(page)).toHaveText('0');
  await digit(page, '2').click();
  await eq(page).click();
  await expect(display(page)).toHaveText('2');
});
