const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b,) => b === 0 ? "nice try" : a / b;
const buttonArr = "123/456*789-0=+".split("");

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
  const container = document.createElement("div");
  container.id = "button-"
  const elements = buttonArr.map((button) => document.createElement("button"));
  const isDigit = (v) => !isNaN(Number(v));
  elements.forEach((button, i) => {
    const v = buttonArr[i];
    button.textContent = v;
    button.id = `button-${v}`;
    button.value = v;
    button.classList.add(!isNaN(Number(v)) ? "digit" : "operator");
    container.appendChild(button);
  });
  return container;
};

function buildCalculator() {
  const container = document.createElement("div");
  container.id = "calculator-container";

  const display = document.createElement("div");
  display.id = "display";
  display.textContent = "display";
  container.appendChild(display);

  const buttons = buildButtons();
  buttons.id = "buttons-container";
  container.appendChild(buttons);

  document.body.appendChild(container);
};

buildCalculator();