
let operationObj = {
  num1: undefined,
  num2: undefined,
  operation: undefined,
  isSecond: false,
}

let repeat = 0;
let erase = true;

let display = document.querySelector("#display-container");
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

function resetCalc(){
  operationObj.num1 = undefined;
  operationObj.num2 = undefined;
  operationObj.operation = undefined;
  operationObj.isSecond = false;

  display.setAttribute("readonly", false);
  display.value = "0";
  display.setAttribute("readonly", true);
}

resetCalc();
/* 
  Code part for adding eventlisteners to the calculator buttons
  TODO: copy Windows-style calculator where the operating string is on top of the result display
*/
const buttons = document.querySelectorAll('.calculator-button:not(.function-button)');

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let text = button.textContent;
    
    repeat = 0;

    display.setAttribute("readonly", false);
    if(display.value === "0" || erase){
      display.value = text;
      erase = false;
    }
    else{
      display.value += text;
    }
    
    display.setAttribute("readonly", true);
  });
});

const reset = document.getElementById("btnAC");
reset.addEventListener("click", () => {

  //resetting the operation object
  resetCalc();

  //resetting the display

  
});

const operatorBtns = document.querySelectorAll("#btnDiv, #btnMult, #btnMinus, #btnPlus");
operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {

    repeat = 1;
    erase = true;
    operationObj.operation = button.textContent;
    
    if(operationObj.isSecond === true && !repeat){
      operationObj.isSecond = false;
      operate(operationObj.num1, operationObj.num2, operationObj.operation); //convert to object so it's shorter?
  
    }
    else if(operationObj.isSecond === false || repeat){

      operationObj.isSecond = true;
      operationObj.num1 = parseInt(display.value);
  
    }
  
  });
});


const equals = document.getElementById("btnEqual");
equals.addEventListener("click", () => {

  
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