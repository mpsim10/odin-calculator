let first;
let second;
let operator;
let thisOperand;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "nice try" : a / b;
const buttonArr = "c←/789*456-123+0.=".split("");
const endsWithDecimal = () => thisOperand.indexOf(".") === thisOperand.length - 1;

function buildDisplay() {
  const div = document.createElement("div");
  div.id = "calculator-display";
  return div;
};
const displayDiv = buildDisplay();

function buildButtons() {
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

function processDigit(v) {
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
  const result = Math.round(operate(first, second, operator) * 1000) / 1000;
  clearCalculator();
  first = result;
  return;
};

function processEquals() {
  if ((!operator || !second) || endsWithDecimal()) {
    return;
  } else {
    processCalculation();
    return;
  };
};

function processDecimal() {
  if (thisOperand === undefined || thisOperand.indexOf(".") === -1) {
    processDigit(".");
  };
  return;
};

function processBackspace() {
  if (!first) {
    clearCalculator();
    return;
  } else if (!second && !!operator) {
    operator = undefined;
  } else {
    const backspaced = thisOperand.split("").toSpliced(thisOperand.length - 1, 1).join("");
    if (thisOperand === first) {
      first = backspaced;
    } else {
      second = backspaced;
    };
  };
};

function processSpecials(v) {
  switch (v) {
    case "C":
      clearCalculator();    
      break;
    case "=":
      processEquals();
      break;
    case ".":
      processDecimal();
      break;
    case "←":
      processBackspace();
      break;
    default:
      break;
  };
  return;
};

function processOperator(v) {
  if ("C=.←".split("").includes(v)) {
    processSpecials(v);
    return;
  } else if (!endsWithDecimal()) {
    if ((!!operator && !!second)) {
      processCalculation();
    } else {
      first = Number(first);
      operator = v;
    };
  };
  return;
};

function processInput(input) {
  isNaN(input) ? processOperator(input) : processDigit(input)
  thisOperand = !operator ? first : second;
};

function buildCalculator() {
  const container = document.createElement("div");
  container.id = "calculator-container";
  container.appendChild(displayDiv);
  container.appendChild(buttonDiv);
  return container;  
};

const calculator = buildCalculator();

function inputListener(v) {
  processInput(v);
  displayDiv.textContent = thisOperand;
  console.table({first, second, operator});
  return;
};

calculator.addEventListener("click", (e) => {
  inputListener(e.target.value);
});

document.body.appendChild(calculator);

window.addEventListener("keydown", (e) => {
  const value = () => {
    switch (e.key) {
      case "Backspace":
        return "←";
        break;
      case "Enter":
        return "=";
        break;
      default:
        return e.key;
        break;
    };
  };
  if (buttonArr.includes(value())) {
    inputListener(value());
  };
  return;
});