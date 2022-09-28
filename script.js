function add(a, b){return a + b}
function subtract(a, b) {return a - b}
function multiply(a, b) {return a * b}
function divide(a, b) {return a / b}
function residue(a, b) {return a % b}

function operate(a, b, operator) {
    let operationResult
    switch (operator) {
        case '+':
            operationResult = add(a, b)
            break;
        case '-':
            operationResult = subtract(a, b)            
            break;
        case '*':
            operationResult = multiply(a, b)            
            break;
        case '/':
            operationResult = divide(a, b)            
            break;
        case '%':
            operationResult = residue(a, b)            
            break;    
        default:
            break;
    }
    return operationResult
}

let display = document.querySelector('#display')
let buttons = document.querySelectorAll('button')
let firstNumber = 0
let secondNumber = 0
let operator = ''
let result = ''
let isOperatorClicked = false
let isResultClicked = false


// get debug spans
let firstNumberSpan = document.querySelector('#firstNumber')
let secondNumberSpan = document.querySelector('#secondNumber')
let operatorSpan = document.querySelector('#operator')
let resultSpan = document.querySelector('#result')
let isOperatorClickedSpan = document.querySelector('#isOperatorClicked')
let isResultClickedSpan = document.querySelector('#isResultClicked')
// update span variables
function updateSpans() {
    firstNumberSpan.textContent = firstNumber
    secondNumberSpan.textContent = secondNumber
    operatorSpan.textContent = operator
    resultSpan.textContent = result
    isOperatorClickedSpan.textContent = isOperatorClicked
    isResultClickedSpan.textContent = isResultClicked
}
updateSpans()




// display update function
function updateDisplay() {
    if (isResultClicked) {
        display.textContent = result
    } else if (isOperatorClicked) {
        display.textContent = secondNumber
    } else {
        display.textContent = firstNumber
    }

}
updateDisplay()

// function to set actual Operator style to active and remove it from other buttons
function setActiveOperator(button) {
    buttons.forEach(button => button.classList.remove('active'))
    if (button) { button.classList.add('active') }
}

// Event listeners
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.value
        if (value === 'updateSpans') { updateSpans() } else 
        if (value === 'AC') {
            firstNumber = 0
            secondNumber = 0
            operator = ''
            result = ''
            isOperatorClicked = false
            isResultClicked = false
            setActiveOperator()
            updateDisplay()
            // result button
        } else if (value === '=') {
            if (operator) {
                if (firstNumber === 0 || firstNumber === '') {
                    if (operator === '/') {
                        result = 'Error'
                    }
                }
                if (secondNumber === '' || secondNumber === 0) {
                    secondNumber = firstNumber
                }
                result = operate(Number(firstNumber), Number(secondNumber), operator)

                // check if result converted to string is longer than 13 characters and if contains a dot
                if (result.toString().length > 13 && !result.toString().includes('.')) {
                    result = '3RR0R'
                }
                else if(result.toString().length > 13 && result.toString().includes('.')) {
                    // if result contains a dot, remove all characters after the 13th
                    result = result.toString().slice(0, 13)

                    // if the last character is a dot, remove it
                    if (result[result.length - 1] === '.') {
                        result = result.slice(0, -1)
                    }
                }



                display.textContent = result
                firstNumber = result
                isResultClicked = true
            }
        // operator buttons
        } else if (value === '+' || value === '-' || value === '*' || value === '/' || value === '%') {
            if (firstNumber && secondNumber && operator && !isResultClicked) {
                result = operate(Number(firstNumber), Number(secondNumber), operator)
                if (result.length > 10) {
                    result = result.slice(0, 10)
                }
                display.textContent = result
                firstNumber = result
                secondNumber = ''
                operator = value
                isOperatorClicked = true
            } else if (firstNumber && !secondNumber && !operator) {
                operator = value
                isOperatorClicked = true
            } else if(firstNumber && !secondNumber && operator) {
                operator = value
                isOperatorClicked = true
            } else if (firstNumber && secondNumber && !operator) {
                operator = value
                isOperatorClicked = true
            }
            else if (firstNumber && secondNumber && operator && isResultClicked) {
                operator = value
                isOperatorClicked = true
                isResultClicked = false
                secondNumber = ''
            }
            setActiveOperator(button)
        }
        // delete button
        else if(value === 'DEL') {
            if (isResultClicked) {
                result = result.slice(0, -1)
                display.textContent = result
            } else if (isOperatorClicked) {
                secondNumber = secondNumber.slice(0, -1)
                display.textContent = secondNumber
            } else {
                firstNumber = firstNumber.slice(0, -1)
                display.textContent = firstNumber
            }
        }
        // number buttons
        else {
            // if result is clicked
            if (isResultClicked) {
                secondNumber = ''
                isResultClicked = false
            }
            // if operator is clicked
            if (isOperatorClicked) {

                // check if result length is more than 13 characters
                if (secondNumber.toString().length < 13) {
                    if(secondNumber === 0) { secondNumber = value }
                    else { secondNumber += value }
                    display.textContent = secondNumber
                }
            } 
            // if operator is not clicked
            else {
                // check if result length is more than 13 characters
                if (firstNumber.toString().length < 13) {
                    if(firstNumber === 0) { firstNumber = value }
                    else { firstNumber += value }
                    display.textContent = firstNumber
                }
            }            
        }
        updateSpans()
    })
})
