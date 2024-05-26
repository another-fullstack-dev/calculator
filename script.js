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

let firstNumber;
let secondNumber;
let operation;

function operate(firstNumber, operation, secondNumber){
    if (firstNumber === undefined || operation === undefined){
        return alert("Invalid input");
    }

    let result;

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

    return result;
}