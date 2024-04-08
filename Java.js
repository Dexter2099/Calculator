const display = document.getElementById('display');
let firstNumber = null;
let operator = null;
let secondNumber = null;
let shouldResetDisplay = false;

document.querySelectorAll('.number').forEach(btn => {
    btn.addEventListener('click', () => {
        if (shouldResetDisplay) resetDisplay();
        display.textContent += btn.getAttribute('data-number');
    });
});

document.querySelectorAll('.operator').forEach(btn => {
    btn.addEventListener('click', () => {
        if (firstNumber !== null && operator !== null && secondNumber === null) {
            secondNumber = parseFloat(display.textContent);
            operate();
            operator = btn.getAttribute('data-operator');
            shouldResetDisplay = true;
        } else {
            firstNumber = parseFloat(display.textContent);
            operator = btn.getAttribute('data-operator');
            shouldResetDisplay = true;
        }
    });
});

document.querySelector('.equal').addEventListener('click', operate);

document.querySelector('.clear').addEventListener('click', clearCalculator);

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if(b === 0) {
        displayError("Ah, trying to break the universe? Can't divide by zero!");
        return null;
    }
    return a / b;
}

function operate() {
    if (operator === null || shouldResetDisplay) return;
    if (firstNumber === null) {
        firstNumber = parseFloat(display.textContent);
        return;
    }
    secondNumber = parseFloat(display.textContent);
    let result;
    switch (operator) {
        case '+': result = add(firstNumber, secondNumber); break;
        case '-': result = subtract(firstNumber, secondNumber); break;
        case '*': result = multiply(firstNumber, secondNumber); break;
        case '/': result = divide(firstNumber, secondNumber); break;
    }
    display.textContent = result.toFixed(2).replace(/\.00$/, '');
    firstNumber = result;
    operator = null;
    secondNumber = null;
    shouldResetDisplay = true;
}

function resetDisplay() {
    display.textContent = '';
    shouldResetDisplay = false;
}

function clearCalculator() {
    display.textContent = '0';
    firstNumber = null;
    operator = null;
    secondNumber = null;
    shouldResetDisplay = false;
}

function displayError(message) {
    display.textContent = message;
    setTimeout(() => {
        clearCalculator();
    }, 2000);
}
