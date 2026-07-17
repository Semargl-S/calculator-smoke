const { applyUnary } = require('../../app.js');

describe('applyUnary', () => {
  test('sqrt(9) === 3',  () => expect(applyUnary(9,  'sqrt')).toBe(3));
  test('sqrt(0) === 0',  () => expect(applyUnary(0,  'sqrt')).toBe(0));
  test('sqrt(-1) → null (Error)', () => expect(applyUnary(-1, 'sqrt')).toBeNull());
  test('sq(4) === 16',   () => expect(applyUnary(4,  'sq')).toBe(16));
  test('sq(-3) === 9',   () => expect(applyUnary(-3, 'sq')).toBe(9));
  test('sq(0) === 0',    () => expect(applyUnary(0,  'sq')).toBe(0));
});
