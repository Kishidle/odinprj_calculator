
let operationObj = {
  num1: undefined,
  num2: undefined,
  operation: undefined,
  prevNum: undefined,
  prevOperation: undefined,
}
let repeat = 0;
let erase = true;
let isOperatorPressed = false;
let isEqualPressed = false;
let isDecimalFirst = true;
let isDecimalPressed = false;
let display = document.querySelector(".result");
let history = document.querySelector(".history");
let historyString = new Array("", "", "", "");
let historyReset = false;

function add(x, y) {
  return x + y;
}

function minus(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function modulo(x, y) {
  return x % y;
}

function operate(num1, num2, operation) {

  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operation) {
    case '+':
      return add(num1, num2); break;
    case '-':
      return minus(num1, num2); break;
    case '*':
      return multiply(num1, num2); break;
    case '/':
      if (num1 === 0 || num2 === 0) {
        alert("Hey, you can't divide by 0!");
        resetCalc();
      }
      else {
        return divide(num1, num2);
      }
      break;
    case '%':
      return modulo(num1, num2); break;

  }

}
/*
  Resets the calculator to its initial state
*/
function resetCalc() {
  operationObj.num1 = undefined;
  operationObj.num2 = undefined;
  operationObj.operation = undefined;

  display.value = "0";
}
/*
  Calls the operate function and then displays the answer to the calculator
*/
function calculateResult() {
  let answer = "";
  if (operationObj.prevNum !== undefined && operationObj.num2 === undefined) {
    answer = operate(operationObj.num1, operationObj.prevNum, operationObj.prevOperation);
  }
  else {
    answer = operate(operationObj.num1, operationObj.num2, operationObj.operation);
  }

  display.textContent = Math.round(parseFloat(answer) * 10000) / 10000;
  return answer;
}
/*
  Puts the current display value to the operationObj's num1 or num2, depending if an operator is pressed already or not.
*/
function displayToVar() {
  if (!isOperatorPressed) {
    operationObj.num1 = display.textContent;
    historyString[0] = display.textContent;
  }
  else {
    operationObj.num2 = display.textContent;
    historyString[2] = display.textContent;
  }
}
/*
  Button handler for the numerical buttons on the calculator and the decimal ('.') button.
  Handles assignment of values to the result and history displays, plus sends 
  the values to another function for assignment to the operation Object.
*/
function buttonHandler(button) {
  let text = button.textContent;
  //checking if decimal has already been pressed
  if (erase) display.textContent = "";
  if (isDecimalPressed || text === '.') return;

  if (display.textContent.length >= 12) return;

  if (display.textContent === "0" || erase) {
    //checking if decimal is pressed first before any buttons so it adds a decimal to default value of 0
    if (isDecimalFirst === true && text === ".") {
      isDecimalPressed = true;
      display.textContent = "0";
      display.textContent += text;

      //historyString = display.textContent;
      displayToVar();
    }
    else {
      
      //erases the current display and starts a new number
      display.textContent = text;
      if(isEqualPressed){
        history.textContent = "";
        isEqualPressed = false;
      }
      
      //historyString += text;
      displayToVar();
    }

    erase = false;
  }
  else {
    isDecimalFirst = false;
    if (text === ".") {
      isDecimalPressed = true;
    }
    display.textContent += text;
    //historyString += text;
    displayToVar();
  }

}
/*
  Handler for the operand buttons on the calculator. Calls for calculate result if it detects that a previous operand
  has been selected, otherwise just sets the operand to the operation Object variable.
  Also handles concatenating the operand to the history string.
*/
function operatorHandler(button) {
  erase = true;
  /*
    This portion of the code is for calculating the answer if the user only keeps on pressing operands instead of equals  
  */

  if (operationObj.operation !== undefined && operationObj.num1 !== undefined
    && operationObj.num2 !== undefined) {


    let answer = calculateResult();

    operationObj.num1 = answer;
    operationObj.num2 = undefined;
    operationObj.operation = undefined;
  }

  historyString[1] = button.textContent;
  history.textContent = historyString.join(" ");
  /*
  historyString += `${button.textContent}`;
  history.textContent = historyString;
  */
  operationObj.operation = button.textContent;

  isOperatorPressed = true;
  isDecimalPressed = false;
  isDecimalFirst = true;
  isEqualPressed = false;
}
/*
  Handler for the 'Equals' event when the equals button is pressed. 
  Calls calculateResult() and changes operationObj values depending on state.
*/
function equalHandler(button) {
  if (operationObj.num1 !== undefined && operationObj.num2 !== undefined) {
    let answer = calculateResult();

    operationObj.num1 = answer;
    operationObj.prevNum = operationObj.num2;
    operationObj.prevOperation = operationObj.operation;
    operationObj.num2 = undefined;
    operationObj.operation = undefined;

    historyString[3] = "=";
    history.textContent = historyString.join(" ");
    historyString[0] = answer;
    historyString[2] = "";
    historyString[3] = "";
    //historyString += " = ";
    //history.textContent = historyString;
    erase = true;
    isOperatorPressed = false;
  }

  // Functionality for pressing equals multiple times after getting an answer. Will just repeat the current operand and current 2nd number. 
  else if (operationObj.prevNum !== undefined) {

    let answer = calculateResult();
    operationObj.num1 = answer;

    erase = true;
    isOperatorPressed = false;
  }

  isDecimalPressed = false;
  isDecimalFirst = true;
  isEqualPressed = true;
}
resetCalc();

//Event listeners for the buttons on the calculator
const buttons = document.querySelectorAll('.calculator-button:not(.function-button)');
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttonHandler(button);
  });
});

const reset = document.getElementById("btnAC");
reset.addEventListener("click", () => {
  resetCalc();
});

const operatorBtns = document.querySelectorAll("#btnDiv, #btnMult, #btnMinus, #btnPlus");
operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    operatorHandler(button);
  });
});

const equals = document.getElementById("btnEqual");
equals.addEventListener("click", () => {
  equalHandler();
});

/*
  Keyboard event listener functionality. Will call click() on the corresponding buttons, plus adds functionality for 'Backspace'.
*/
document.addEventListener('keydown', (e) => {
  let operands = {
    '+': 'Plus',
    '-': 'Minus',
    '/': 'Div',
    '*': 'Mult',
    '%': 'Mod',
  }
  if ((e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*' || e.key === '%')) {
    document.getElementById(`btn${operands[e.key]}`).click();
  }
  if (e.key === 'Delete') {
    document.getElementById("btnAC").click();
  }
  if (e.key === 'Backspace') {

    let str = display.value;

    if (str.charAt(str.length - 1) === '.') {
      isDecimalPressed = false;
    }
    if (str.length === 1) {
      display.textContent = "0";
    }
    else if (str.length > 1) {
      display.textContent = str.slice(0, -1);
    }

    displayToVar();
  }
  if (e.key > 0 || e.key <= 9) {
    document.getElementById(`btn${e.key}`).click();
  }
  if (e.key === '.') {
    document.getElementById('btnDeci').click();
  }
  if (e.key === 'Enter') {
    document.getElementById('btnEqual').click();
  }
});