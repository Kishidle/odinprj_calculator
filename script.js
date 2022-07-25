
let operationObj = {
  num1: undefined,
  num2: undefined,
  operation: undefined,
  isSecond: false,
}



function add(x, y){
  return x + y;
}

function minus(x, y){
  return x - y;
}

function multiply(x, y){
  return x * y;
}

function divide(x, y){
  return x / y;
}

function operate(num1, num2, operation){
  
  switch(operation){
    case '+':
      return add(num1, num2); break;
    case '-':
      return minus(num1, num2); break;
    case '*':
      return multiply(num1, num2); break;
    case '/':
      return divide(num1, num2); break;
  }
  
}




/* 
  Code part for adding eventlisteners to the calculator buttons
  TODO: add saving of values to an Object
  TODO: differentiate number buttons and function buttons
*/
const buttons = document.querySelectorAll('.calculator-button:not(.function-button)');

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let text = button.textContent;
    let result = document.querySelector("#display-container");

    result.setAttribute("readonly", false);
    result.value += text;
    result.setAttribute("readonly", true);
  });
});

const reset = document.getElementById("btnAC");
reset.addEventListener("click", () => {

  //resetting the operation object
  operationObj.num1 = undefined;
  operationObj.num2 = undefined;
  operationObj.operation = undefined;
  operationObj.isSecond = false;

  //resetting the display

  let display = document.querySelector("#display-container");
  display.setAttribute("readonly", false);
  display.value = "";
  display.setAttribute("readonly", true);
});

const operatorBtns = document.querySelectorAll("#btnDiv, #btnMult, #btnMinus, #btnPlus");
operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {

    let display = document.querySelector("#display-container");

    operationObj.operation = button.textContent;
    
    if(operationObj.isSecond === true){
      operationObj.isSecond = false;
      operate(operationObj.num1, operationObj.num2, operationObj.operation); //convert to object so it's shorter?
  
    }
    else if(operationObj.isSecond === false){
      operationObj.isSecond = true;
      
      operationObj.num1 = parseInt(display.value);
  
    }
  
    display.setAttribute("readonly", false);
    display.value = "";
    display.setAttribute("readonly", true);
  });
});


const equals = document.getElementById("btnEqual");
equals.addEventListener("click", () => {

  
  let display = document.querySelector("#display-container");
  operationObj.num2 = parseInt(display.value);
  /*if(operationObj.num1 !== undefined && operationObj.num2 !== undefined 
    && operationObj.operation !== undefined){

  }*/

  let answer = operate(operationObj.num1, operationObj.num2, operationObj.operation);

  operationObj.num1 = parseInt(answer);
  operationObj.num2 = undefined;
  operationObj.operation = undefined;

  display.setAttribute("readonly", false);
  display.value = answer;
  display.setAttribute("readonly", true);
});