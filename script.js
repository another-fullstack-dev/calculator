function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if (num1 == 0 || num2 == 0) return alert("Cant divide by zero.")
    return num1 / num2;
}

let firstNumber = null;
let secondNumber = null;
let operation = null;
let result = null;

function operate(){
    if (firstNumber === null || operation === null) {
        clearDisplay(true);
        return alert("Invalid input");
    }

    secondNumber = parseFloat(calcWindow.textContent);
    clearDisplay();

    switch (operation){
        case '+':
            result = add(firstNumber, secondNumber);
            break;

        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        
        case '*':
            result = multiply(firstNumber, secondNumber);
            break;

        case '/':
            result = divide(firstNumber, secondNumber);
            break;
        
        default:
            alert("Something went wrong.");
    }

    result = Math.round(result * 100) / 100;
    calcWindow.textContent = result;

    let p = document.createElement("p");
    history.appendChild(p);
    p.textContent = `${firstNumber} ${operation} ${secondNumber} = ${result}`;

    firstNumber = parseFloat(calcWindow.textContent);
    secondNumber = null;
    operation = null;
    
    return result;
}

function selectOperation(){
    if (calcWindow.textContent == "") {
        clearDisplay(true);
        return alert("Invalid input");
    }

    if (operation != null){
        operate();
        operation = this.textContent;
        firstNumber = parseFloat(calcWindow.textContent);

        return operation;
    }

    firstNumber = parseFloat(calcWindow.textContent);
    operation = this.textContent;

    clearDisplay();

    return operation;
}

function numericButtons(){
    if (result != null){
        clearDisplay();
        result = null;
    }
    calcWindow.textContent += this.textContent;
}

function clearDisplay(full = false){
    if (full){
        calcWindow.textContent = "";
        firstNumber = null;
        secondNumber = null;
        operation = null;
        result = null;
    } else {
        calcWindow.textContent = "";
    }
}

const history = document.querySelector(".history");
const calcWindow = document.querySelector(".calc-window");

let buttons = document.querySelectorAll("button");
    buttons = Array.from(buttons);

buttons.forEach((button) => {
    button.addEventListener("click", numericButtons);
})

const evaluateButton = document.querySelector(".btn-evaluate");
const clearButton = document.querySelector(".btn-clear");
let operatorButtons = document.querySelectorAll(".btn-operator");
    operatorButtons = Array.from(operatorButtons);

operatorButtons.forEach((button) => {
    button.removeEventListener("click", numericButtons);
    button.addEventListener("click", selectOperation);
})

evaluateButton.removeEventListener("click", numericButtons);
clearButton.removeEventListener("click", numericButtons);

evaluateButton.addEventListener("click", operate);
clearButton.addEventListener("click", clearDisplay);