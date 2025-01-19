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

        // Символ, який був нажатий
        const key = e.target.textContent;

        // Якщо це цифра 0-9 і оператор не встановлений, то записати в змінну currentValue і вивести в input
        if (digits.includes(key) && operator === '' ) {
            currentValue += key;
            result.value = currentValue;
            if (storedValue) {
                return
            }
            console.log(currentValue, storedValue, operator)
        } else if (digits.includes(key)) {            // Якщо це цифра 0-9 і оператор встановлений
            storedValue += key;
            result.value = storedValue;
            if (storedValue) {
                return
            }
            console.log(currentValue, operator, storedValue)
        }

        // Якщо це оператор +, -, *, /, то записати в змінну operator
        if (operators.includes(key) && operator === '') {
            operator = key;
            result.value = operator;
        } else if (operators.includes(key)) {
            operator = key;
            result.value = operator;
        }

        // Якщо дорівнює, то вивести результат обчислення
        if (key === '=') {
            result.value = operate(currentValue, operator, storedValue)
            currentValue = result.value;
            storedValue = '';
            operator = '';
        }

        // Якщо "С" - очистити
        if (key === 'C') {
            clearAll()
        }
    })
})