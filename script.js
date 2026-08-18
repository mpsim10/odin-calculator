const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b,) => b === 0 ? "nice try" : a / b;
const buttonArr = "789/456*123-C0=+".split("");

let nums = [];
let inputLog = "";
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
  return result;
};

const clearInputLog = () => inputLog = " ";

function processDigit(v) {
  inputLog += v;
};

function processOperator(v) {
  inputLog += v;
};

const processInput = (input) => isNaN(input) ? processOperator(input) : processDigit(input);

function buildDisplay() {
  const div = document.createElement("div");
  div.id = "calculator-display";
  div.textContent = "click button";
  return div;
};

const displayInput = () => document.getElementById("calculator-display").textContent = inputLog

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

  container.appendChild(buildDisplay());

  const buttons = buildButtons();
  buttons.id = "buttons-container";
  container.appendChild(buttons);

  document.body.appendChild(container);
};

buildCalculator();

document.getElementById("calculator-container").addEventListener("click", (e) => {
  processInput(e.target.value)
  displayInput();
});
