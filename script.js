const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b,) => b === 0 ? "nice try" : a / b;

let first;
let second;
let operator;

function buildDisplay() {
  const div = document.createElement("div");
  div.id = "calculator-display";
  return div;
};
const displayDiv = buildDisplay();

function buildButtons() {
  const buttonArr = "789/456*123-C0=+".split("");
  const div = document.createElement("div");
  div.id = "button-container";
  const buttons = buttonArr.map((button) => document.createElement("button"));
  buttons.forEach((button, i) => {
    const v = buttonArr[i];
    button.textContent = v;
    button.id = `button-${v}`;
    button.value = v;
    button.classList.add(!isNaN(Number(v)) ? "digit" : "operator");
    div.appendChild(button);
  });
  return div;
};
const buttonDiv = buildButtons();

function operate(first, second, operator) {
  let result;
  switch (operator) {
    case "+":
      result = add(first, second);
      break;
    case "-":
      result = subtract(first, second);
      break;
    case "*":
      result = multiply(first, second);
      break;
    case "/":
      result = divide(first, second);
    default:
      break;
  };
  return result;
};

function clearCalculator() {
  first = "";
  second = "";
  operator = "";
};

function processDigitInput(v) {
  if (!first) {
    first = v;
  } else if (!operator) {
    first += v;
  } else if (!second) {
    second = v;
  } else second += v;
  return;
};

function processCalculation() {
  second = Number(second);
  const result = operate(first, second, operator);
  clearCalculator();
  first = result;
  return;
};

function processOperatorInput(v) {
  if (v === "C") {
    clearCalculator();
    return;
  } else if (v === "=" || !!second) {
    if (!operator) {
      return;
    } else {
      processCalculation();
      return;
    };
  } else {
    first = Number(first);
    operator = v;
  };
  return;
};

const processInput = (input) => isNaN(input) ? processOperatorInput(input) : processDigitInput(input);

const displayInput = () => displayDiv.textContent = !second ? first : second;

function buildCalculator() {
  const container = document.createElement("div");
  container.id = "calculator-container";
  container.appendChild(displayDiv);
  container.appendChild(buttonDiv);
  return container;  
};

const calculator = buildCalculator();

calculator.addEventListener("click", (e) => {
  processInput(e.target.value);
  displayInput();
  return;
});

document.body.appendChild(calculator);