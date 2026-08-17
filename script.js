const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b,) => b === 0 ? "nice try" : a / b;
let first;
let second;
let operator;

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
};

function buildButtons() {
  const buttonArray = "0123456789+-*/=".split("");
  const buttons = buttonArray.map((button) => document.createElement("button"));
  buttons.forEach((button, i) => {
    button.id = `${buttonArray[i]}-button`;
    button.value = buttonArray[i];
    button.textContent = buttonArray[i];
    button.classList.add(button.value.match(/[0-9]/) ? "digit" : "operator");
  });
  return buttons;
};

function buildCalculator() {
  const container = document.createElement("div");
  container.id = "calculator-container";

  const display = document.createElement("div");
  display.id = "display";
  container.appendChild(display);

  const buttons = buildButtons();
  buttons.forEach(button => container.appendChild(button));

  document.body.appendChild(container);
};

buildCalculator();