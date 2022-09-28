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
let openDebuggerButton = document.querySelector('#openDebugger')
let firstNumber = 0
let secondNumber = 0
let operator = ''
let result = ''
let isOperatorClicked = false
let isResultClicked = false
let escapeCounter = 0

// Create debugger section
let debuggerDiv = document.createElement('div')
debuggerDiv.classList.add('debugger')
debuggerDiv.classList.add('framed')
debuggerDiv.classList.add('hidden')

// function to toggle debugger
function toggleDebugger() {
    debuggerDiv.classList.toggle('hidden')
}

// create an html list to display variables
let variablesList = document.createElement('ul')
variablesList.id = 'variablesList'
debuggerDiv.appendChild(variablesList)

// create a list item for each variable
let firstNumberLi = document.createElement('li')
firstNumberLi.id = 'firstNumberLi'
firstNumberLi.textContent = 'firstNumber: '
let firstNumberSpan = document.createElement('span')
firstNumberSpan.id = 'firstNumber'
firstNumberLi.appendChild(firstNumberSpan)
variablesList.appendChild(firstNumberLi)

let secondNumberLi = document.createElement('li')
secondNumberLi.id = 'secondNumberLi'
secondNumberLi.textContent = 'secondNumber: '
let secondNumberSpan = document.createElement('span')
secondNumberSpan.id = 'secondNumber'
secondNumberLi.appendChild(secondNumberSpan)
variablesList.appendChild(secondNumberLi)

let operatorLi = document.createElement('li')
operatorLi.id = 'operatorLi'
operatorLi.textContent = 'operator: '
let operatorSpan = document.createElement('span')
operatorSpan.id = 'operator'
operatorLi.appendChild(operatorSpan)
variablesList.appendChild(operatorLi)

let resultLi = document.createElement('li')
resultLi.id = 'resultLi'
resultLi.textContent = 'result: '
let resultSpan = document.createElement('span')
resultSpan.id = 'result'
resultLi.appendChild(resultSpan)
variablesList.appendChild(resultLi)

let isOperatorClickedLi = document.createElement('li')
isOperatorClickedLi.id = 'isOperatorClickedLi'
isOperatorClickedLi.textContent = 'isOperatorClicked: '
let isOperatorClickedSpan = document.createElement('span')
isOperatorClickedSpan.id = 'isOperatorClicked'
isOperatorClickedLi.appendChild(isOperatorClickedSpan)
variablesList.appendChild(isOperatorClickedLi)

let isResultClickedLi = document.createElement('li')
isResultClickedLi.id = 'isResultClickedLi'
isResultClickedLi.textContent = 'isResultClicked: '
let isResultClickedSpan = document.createElement('span')
isResultClickedSpan.id = 'isResultClicked'
isResultClickedLi.appendChild(isResultClickedSpan)
variablesList.appendChild(isResultClickedLi)


// append debugger to body before footer
let footer = document.querySelector('.footer')
document.body.insertBefore(debuggerDiv, footer) 

updateSpans()



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
            escapeCounter = 0
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
                // fix for 0.1 + 0.2 = 0.30000000000000004
                result = result * 100 / 100
                display.textContent = result
                firstNumber = result
                isResultClicked = true
            }
        // operator buttons
        } else if (value === '+' || value === '-' || value === '*' || value === '/' || value === '%') {
            escapeCounter = 0
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
            escapeCounter = 0
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
            escapeCounter = 0
            // if result is clicked
            if (isResultClicked) {
                secondNumber = ''
                isResultClicked = false
            }
            // if operator is clicked
            if (isOperatorClicked) {
                // check if dot is not already in number
                if (value === '.' && secondNumber.includes('.')) {
                    return
                }
                else {
                    // check if result length is more than 13 characters
                    if (secondNumber.toString().length < 13) {
                        if(secondNumber === 0) { secondNumber = value }
                        else { secondNumber += value }
                        display.textContent = secondNumber
                    }
                }
            } 
            // if operator is not clicked
            else {
                // check if dot is not already in number
                if (value === '.' && firstNumber.includes('.')) {
                    return
                }
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

// adding keyboard support
document.addEventListener('keydown', (e) => {
    let key = e.key
    if (key === 'Enter' || key === '=') {
        key = '='
    }
    if (key === 'Backspace') {
        key = 'DEL'
    }
    if (key === 'Escape') {
        // check if key escape is pressed 3 times in a row to open debugger
        escapeCounter++
        if (escapeCounter >= 3) {
            toggleDebugger()
            escapeCounter = 0
        }
        else{ key = 'AC' }
    }
    if (key === 'Delete') {
        key = 'DEL'
    }
    if (key === 'c') {
        key = 'AC'
    }
    if (key === 'd') {
        key = 'DEL'
    }
    let button = document.querySelector(`button[value="${key}"]`)
    if (button) {
        button.click()
    }
})