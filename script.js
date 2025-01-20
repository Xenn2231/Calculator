'use strict'

const buttons = document.querySelectorAll('.btn')
const result = document.querySelector('.result')

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '/', '*'];

let currentValue = '';
let storedValue = '';
let operator = '';

function add(a, b) {
    return (+a) + (+b);
}
function substract(a, b) {
    return (+a) - (+b);
}
function multiply(a, b) {
    return (+a) * (+b);
}
function divide(a, b) {
    if (+b === 0) {
        clearAll();
        return '0';
    }
    return (+a) / (+b);
}
function clearAll() {
    currentValue = '';
    storedValue = '';
    operator = '';
    result.value = '';
}
function operate(num1, operator, num2) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return substract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    }
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {

        // Symbol that was pressed
        const key = e.target.textContent;
        
        // If number is '0-9' and operator is undefined - entered to 'currentValue' variable and draw in 'input'
        if (digits.includes(key) && operator === '' ) {
            currentValue += key;
            result.value = currentValue;
            if (storedValue) {
                return
            }
            console.log(currentValue, storedValue, operator)
        } else if (digits.includes(key)) { // If number is '0-9' and operator is defined
            storedValue += key;
            result.value = storedValue;
            if (storedValue) {
                return
            }
            console.log(currentValue, operator, storedValue)
        }

        // If operator is '+, -, *, /' - enter it in 'operator' variable
        if (operators.includes(key) && operator === '') {
            operator = key;
            result.value = operator;
            console.log(currentValue, storedValue, operator)
        } else if (operators.includes(key)) {
            operator = key;
            result.value = operator;
            console.log(currentValue, storedValue, operator)
        }

        if (key === '.') {

            // If operator is undefined - work with 'currentValue'
            if (operator === '') {
                if (currentValue.includes('.')) {
                    return; // If decimal already entered - don't add another one
                }
                currentValue += key;
                result.value = currentValue;
            } else {
                // If operator is defined - work with 'storedValue'
                if (storedValue.includes('.')) {
                    return; // If decimal already entered - don't add another one
                }
                storedValue += key;
                result.value = storedValue;
            }
        }

        // If '=' - display result
        if (key === '=') {
            if (storedValue === '') {
                clearAll()
                alert('Error')
                return
            }
            result.value = operate(currentValue, operator, storedValue)
            currentValue = result.value;
            storedValue = '';
            operator = '';

        }

        // If "С" - clear all
        if (key === 'C') {
            clearAll()
        }
    })
})