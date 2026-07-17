const display = document.getElementById('display');

let firstOperand = null;
let operator = null;
let waitingForSecond = false;
let isError = false;

function updateDisplay(value) {
  display.textContent = value;
}

function inputDigit(digit) {
  if (isError) {
    isError = false;
    firstOperand = null;
    operator = null;
    waitingForSecond = false;
    updateDisplay(digit);
    return;
  }

  if (waitingForSecond) {
    updateDisplay(digit);
    waitingForSecond = false;
  } else {
    const current = display.textContent;
    updateDisplay(current === '0' ? digit : current + digit);
  }
}

function inputDecimal() {
  if (isError) return;

  if (waitingForSecond) {
    updateDisplay('0.');
    waitingForSecond = false;
    return;
  }

  if (!display.textContent.includes('.')) {
    updateDisplay(display.textContent + '.');
  }
}

function chooseOperator(op) {
  if (isError) return;

  const current = parseFloat(display.textContent);

  if (firstOperand !== null && !waitingForSecond) {
    const result = calculate(firstOperand, current, operator);
    if (result === null) {
      updateDisplay('Error');
      isError = true;
      firstOperand = null;
      operator = null;
      return;
    }
    updateDisplay(String(result));
    firstOperand = result;
  } else {
    firstOperand = current;
  }

  operator = op;
  waitingForSecond = true;
}

function calculate(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/':
      if (b === 0) return null;
      return a / b;
    default: return b;
  }
}

function applyUnary(value, op) {
  switch (op) {
    case 'sqrt':
      if (value < 0) return null;
      return Math.sqrt(value);
    case 'sq':
      return value * value;
    default:
      return value;
  }
}

function handleUnary(op) {
  if (isError) return;
  const current = parseFloat(display.textContent);
  const result = applyUnary(current, op);
  if (result === null) {
    updateDisplay('Error');
    isError = true;
    return;
  }
  updateDisplay(String(result));
}

function handleEquals() {
  if (isError) return;
  if (firstOperand === null || operator === null) return;

  const current = parseFloat(display.textContent);
  const result = calculate(firstOperand, current, operator);

  if (result === null) {
    updateDisplay('Error');
    isError = true;
    firstOperand = null;
    operator = null;
    waitingForSecond = false;
    return;
  }

  updateDisplay(String(result));
  firstOperand = null;
  operator = null;
  waitingForSecond = false;
}

function clearAll() {
  isError = false;
  firstOperand = null;
  operator = null;
  waitingForSecond = false;
  updateDisplay('0');
}

document.querySelectorAll('[data-action]').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
      case 'digit':       inputDigit(value); break;
      case 'decimal':     inputDecimal(); break;
      case 'operator':    chooseOperator(value); break;
      case 'equals':      handleEquals(); break;
      case 'clear':       clearAll(); break;
      case 'unary':       handleUnary(value); break;
    }
  });
});

if (typeof module !== 'undefined') module.exports = { applyUnary };
