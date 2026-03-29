const numbers = document.querySelectorAll(".number");
const display = document.getElementById("resault");
const reset = document.getElementById("reset");
const equals = document.getElementById("equals");
const remove = document.getElementById("remove");
const decimal = document.getElementById("decimal");
const btnPlus = document.querySelector(".plus");
const btnMinus = document.querySelector(".subtract");
const btnMultiply = document.querySelector(".multiply");
const btnDivide = document.querySelector(".divide");
const btnPercent = document.querySelector(".operation");

// ── 1. BASIC MATH FUNCTIONS ──
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return "Undefined";
  return a / b;
}
// ── 2. VARIABLES ──
let firstNumber = "";
let secondNumber = "";
let operator = "";
let isNewNumber = false;
let justCalculated = false;

// ── 3. OPERATE FUNCTION ──
function operate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (op === "+") return add(a, b);
  if (op === "-") return subtract(a, b);
  if (op === "*") return multiply(a, b);
  if (op === "/") return divide(a, b);
}

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (display.innerText === "0" || isNewNumber || justCalculated) {
      display.innerText = number.innerText;
      justCalculated = false;
      isNewNumber = false;
    } else {
      display.innerText += number.innerText;
    }
  });
});
// ── CLEAR ──
reset.addEventListener("click", () => {
  display.innerText = "0";
  firstNumber = "";
  operator = "";
  isNewNumber = false;
  justCalculated = false;
});

// ── ROUND long decimals ──
function roundResult(num) {
  if (typeof num !== "number") return num;
  return parseFloat(num.toFixed(8));
}

// ── DECIMAL ──
decimal.addEventListener("click", () => {
  if (isNewNumber || justCalculated) {
    display.innerText = "0.";
    isNewNumber = false;
    justCalculated = false;
    return;
  }
  if (!display.innerText.includes(".")) {
    display.innerText += ".";
  }
});

// ── OPERATORS ──
function handleOperator(op) {
  // if two numbers already exist evaluate first
  if (firstNumber !== "" && operator !== "" && !isNewNumber) {
    const result = operate(firstNumber, operator, display.innerText);
    const rounded = roundResult(result);
    display.innerText = rounded;
    firstNumber = String(rounded);
  } else {
    firstNumber = display.innerText;
  }
  operator = op;
  isNewNumber = true;
  justCalculated = false;
}

btnPlus.addEventListener("click", () => handleOperator("+"));
btnMinus.addEventListener("click", () => handleOperator("-"));
btnMultiply.addEventListener("click", () => handleOperator("*"));
btnDivide.addEventListener("click", () => handleOperator("/"));
btnPercent.addEventListener("click", () => {
  display.innerText = roundResult(parseFloat(display.innerText) / 100);
  isNewNumber = true;
});

// ── 6. EQUALS ──
equals.addEventListener("click", () => {
  // guard: need both numbers and operator
  if (firstNumber === "" || operator === "" || isNewNumber) return;

  const result = operate(firstNumber, operator, display.innerText);
  const rounded = roundResult(result);
  display.innerText = rounded;

  // reset for next calculation
  firstNumber = "";
  operator = "";
  isNewNumber = false;
  justCalculated = true;
});

// ── BACKSPACE ──
remove.addEventListener("click", () => {
  if (justCalculated) {
    display.innerText = "0";
    justCalculated = false;
    return;
  }
  if (display.innerText.length <= 1) {
    display.innerText = "0";
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
});
