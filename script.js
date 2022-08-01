
let operationObj = {
  num1: undefined,
  num2: undefined,
  operation: undefined,
  prevNum : undefined,
  prevOperation: undefined,
}
let repeat = 0;
let erase = true;
let isOperatorPressed = false;
let isEqualPressed = false;
let isDecimalFirst = true;
let isDecimalPressed = false;
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
  
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch(operation){
    case '+':
      return add(num1, num2); break;
    case '-':
      return minus(num1, num2); break;
    case '*':
      return multiply(num1, num2); break;
    case '/':
      if(num1 === 0 || num2 === 0){
        alert("Hey, you can't divide by 0!");
        resetCalc(); 
      }
      else{
        return divide(num1, num2);
      }
      break;
      
  }
  
}

function resetCalc(){
  operationObj.num1 = undefined;
  operationObj.num2 = undefined;
  operationObj.operation = undefined;

  display.setAttribute("readonly", false);
  display.value = "0";
  display.setAttribute("readonly", true);
}

function calculateResult(){
  let answer = operate(operationObj.num1, operationObj.num2, operationObj.operation);
  display.setAttribute("readonly", false);
  display.value = parseFloat(answer);
  display.setAttribute("readonly", true);
  return answer;
}

//TODO AUGUST 1: prune text length to not exceed some length, or code it so that the font size goes
resetCalc();
/* 
  Code part for adding eventlisteners to the calculator buttons
  TODO: copy Windows-style calculator where the operating string is on top of the result display
*/
const buttons = document.querySelectorAll('.calculator-button:not(.function-button)');

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    
    let text = button.textContent;
    
    //for decimal, check if first button to be pressed
    repeat = 0;
    //checking if decimal has already been pressed
    if(!isDecimalPressed || text !== "."){
      display.setAttribute("readonly", false);
      if(display.value === "0" || erase){
      //checking if decimal is pressed first before any buttons so it adds a decimal to default value of 0
        if(isDecimalFirst === true && text === "."){ 
          isDecimalPressed = true;
          display.value = "0";        
          display.value += text;
          if(!isOperatorPressed){
            operationObj.num1 = display.value;
          }
          else{
            operationObj.num2 = display.value;
          } 
        }
        else{
          display.value = text;
          if(!isOperatorPressed){
            operationObj.num1 = display.value;
          }
          else operationObj.num2 = display.value;
        }
      
        erase = false;
      }
      else{
        isDecimalFirst = false;
        if(text === "."){
          isDecimalPressed = true;
        }
        display.value += text;
        if(!isOperatorPressed){
          operationObj.num1 = display.value;
        }
        else operationObj.num2 = display.value;
      } 
    
      display.setAttribute("readonly", true);
    }
    
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

    erase = true;
    if(operationObj.operation !== undefined && operationObj.num1 !== undefined 
      && operationObj.num2 !== undefined){

        //add a displayAnswer function
        let answer = calculateResult();

        operationObj.num1 = answer;
        operationObj.num2 = undefined;
        operationObj.operation = undefined;
    }
    
    operationObj.operation = button.textContent;
    
    isOperatorPressed = true;
    isDecimalPressed = false;
    isDecimalFirst = true;
  
  });
});


const equals = document.getElementById("btnEqual");
equals.addEventListener("click", () => {


  if(operationObj.num1 !== undefined && operationObj.num2 !== undefined){

    
    let answer = calculateResult();

    operationObj.num1 = answer;
    operationObj.prevNum = operationObj.num2;
    operationObj.prevOperation = operationObj.operation;
    operationObj.num2 = undefined;
    operationObj.operation = undefined;

    erase = true;
    isOperatorPressed = false;
  }
  else if(operationObj.prevNum !== undefined){

    let answer = calculateResult();
    operationObj.num1 = answer;

    erase = true;
    isOperatorPressed = false;
  }
  isDecimalPressed = false;
  isDecimalFirst = true;
});

document.addEventListener('keydown', (e) => {

  let operands = {
    '+' : 'Plus',
    '-' : 'Minus',
    '/' : 'Div',
    '*' : 'Mult',
    '%' : 'Mod',
  }



  //e.preventDefault();

  if((e.key === '+' || e.key === '-' || e.key === '/' || e.key ==='*' || e.key ==='%') && e.shiftKey){
    document.getElementById(`btn${operands[e.key]}`).click();
  }
  if(e.key === 'Delete'){
    document.getElementById("btnAC").click();
  }
  if(e.key === 'Backspace'){

    
    let str = display.value;

    if(str.charAt(str.length - 1) === '.'){
      isDecimalPressed = false;
    }
    if(str.length === 1){
      display.value = "0";
    }
    else if(str.length > 1){
      display.value = str.slice(0, -1);
    }
    
    if(!isOperatorPressed){
      operationObj.num1 = display.value;
    }
    else if(isOperatorPressed){
      operationObj.num2 = display.value;
    }
  }
  if(e.key > 0 || e.key <=9){
    document.getElementById(`btn${e.key}`).click();
  }
  if(e.key === 'Enter'){
    document.getElementById('btnEqual').click();
  }
});