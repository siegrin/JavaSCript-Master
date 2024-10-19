const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
}

function updateDisplay(){
    const display = document.querySelector('.calculator-display')
    display.value = calculator.displayValue
}

function inputDigit(digit){
    const {displayValue, waitingForSecondOperand} = calculator

    if(waitingForSecondOperand === true){
        calculator.displayValue = digit
        calculator.waitingForSecondOperand = false
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit
    }
    updateDisplay()
}

function inputDecimal(dot){
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot
    }
}
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    // Jika operator akar atau persen
    if (nextOperator === '√' || nextOperator === '%') {
        const valueToCalculate = firstOperand !== null ? firstOperand : inputValue;

        if (!isNaN(valueToCalculate)) {
            const result = calculate(valueToCalculate, null, nextOperator); // Menggunakan valueToCalculate
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculator.firstOperand = result; // Update firstOperand untuk digunakan dalam operasi berikutnya
            calculator.operator = null; // Reset operator
            calculator.waitingForSecondOperand = false; // Reset waiting
            updateDisplay();
        }
        return; // Hentikan pemrosesan lebih lanjut
    }

    // Logika untuk operator lainnya
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;

    updateDisplay();
}




function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    } else if (operator === '√') {
        // Hanya gunakan firstOperand untuk akar
        return Math.sqrt(firstOperand);
    } else if (operator === '%') {
        // Hanya gunakan firstOperand untuk persen
        return firstOperand / 100;
    }

    return secondOperand;
}


function resetCalculator(){
    calculator.displayValue = '0'
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false
    calculator.operator = null
    updateDisplay()
}

function handleEqual(){
    const {firstOperand, displayValue, operator} = calculator
    const inputValue = parseFloat(displayValue)

    if(operator && !calculator.waitingForSecondOperand){
        const result = calculate(firstOperand, inputValue, operator)
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperand = null
        calculator.operator = null
        calculator.waitingForSecondOperand = false
        updateDisplay()
    }
}

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
    const {target} = event

    if(!target.matches('button')){
        return
    }

    if(target.classList.contains('operator')){
        handleOperator(target.value)
        return
    }
    
    if(target.classList.contains('decimal')){
        inputDecimal(target.value)
        return
    }

    if(target.classList.contains('all-clear')){
       resetCalculator()
        return
    }

    if(target.classList.contains('equal-sign')){
        handleEqual()
        return
    }

    inputDigit(target.value)
    
})