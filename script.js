
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
*/
const buttons = document.querySelectorAll('.calculator-button');

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let text = button.textContent;
    let result = document.querySelector("#result-container");

    result.setAttribute("readonly", false);
    result.value += text;
  });
});