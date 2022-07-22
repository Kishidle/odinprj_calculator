
const buttons = document.querySelectorAll('.calculator-button');

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let text = button.textContent;
    let result = document.querySelector("#result-container");

    result.setAttribute("readonly", false);
    result.value += text;
  });
});