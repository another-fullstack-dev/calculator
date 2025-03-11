function add(num1, num2) {return num1 + num2;}
function subtract(num1, num2) {return num1 - num2;}
function multiply(num1, num2) {return num1 * num2;}
function divide(num1, num2) {return num1 / num2;}

let firstNumber = null;
let secondNumber = null;
let operation = null;
let result = null;

const notifications = document.querySelector(".notifications");

function notificationController(...source){
    console.log(source);
    let div = document.createElement("div");
    notifications.appendChild(div);
    div.style.opacity = 1;

    switch (source[0]) {
        case "input":
            div.textContent = "Invalid input";
            break;
        
        case "zero":
            div.textContent = "Cant divide by zero";
            break;
    
        default:
            div.textContent = "Something went wrong";
            break;
    }

    setTimeout(() => {
        div.style.opacity = 0;
        notifications.removeChild(div);
    }, 3000)
}

// i dont fully understand what is happening bellow here.
// it been almost a year since i made it.
// for some reason isNaN is necessary.
function operate(){
    secondNumber = parseFloat(calcWindow.textContent);
    if (firstNumber === null || operation === null || isNaN(secondNumber)) {
        notificationController("input");
        clearDisplay(true);
        return console.log("Invalid input");
    }

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
            if (firstNumber == 0 || secondNumber == 0) {
                clearDisplay(true);
                notificationController("zero");
                return console.log("Cant divide by zero.");
            }
            result = divide(firstNumber, secondNumber);
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
        notificationController("input");
        return console.log("Invalid input");
    }

    if (operation != null){
        operate();
        operation = this.textContent;
        firstNumber = parseFloat(calcWindow.textContent);

        return operation;
    }

    firstNumber = parseFloat(calcWindow.textContent);
    operation = this.textContent;
    dotButton.addEventListener("click", numericButtons);

    clearDisplay();

    return operation;
}

function numericButtons(){
    if (result != null){
        clearDisplay();
        result = null;
    }
    if (this.textContent == "."){
        dotButton.removeEventListener("click", numericButtons)
    }
    calcWindow.textContent += this.textContent;
}

// this sucks
function clearDisplay(full = false){
    if (full){
        calcWindow.textContent = "";
        firstNumber = null;
        secondNumber = null;
        operation = null;
        result = null;
        dotPressed = false;
        dotButton.addEventListener("click", numericButtons);
        dotPressed = false;
    } else {
        dotButton.addEventListener("click", numericButtons);
        dotPressed = false;
        calcWindow.textContent = "";
    }
}

function backspace(){
    let text = Array.from(calcWindow.textContent);
    let popped = text.pop();
    if (popped == "."){
        dotButton.addEventListener("click", numericButtons);
        dotPressed = false;
    }
    calcWindow.textContent = text.join('');
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

const dotButton = document.querySelector(".btn-dot");
let dotPressed = false;

const backspaceBtn = document.querySelector(".btn-backspace");
backspaceBtn.removeEventListener("click", numericButtons);
backspaceBtn.addEventListener("click", backspace);