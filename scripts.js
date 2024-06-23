document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const history = document.getElementById('history');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentValue = "";
    let operator = null;
    let firstValue = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            switch (value) {
                case 'C':
                    clearDisplay();
                    break;
                case '=':
                    evaluateExpression();
                    break;
                case '%':
                    applyPercentage();
                    break;
                default:
                    handleInput(value);
                    break;
            }
        });
    });

    function clearDisplay() {
        currentValue = "";
        operator = null;
        firstValue = null;
        display.innerText = '0';
        history.innerText = ''; // Limpa o histórico
    }

    function evaluateExpression() {
        if (operator && firstValue !== null && currentValue !== "") {
            const result = calculate(firstValue, currentValue, operator);
            updateHistory(`${firstValue} ${operator} ${currentValue} = ${result}`);
            currentValue = result;
            display.innerText = currentValue;
            firstValue = null;
            operator = null;
        }
    }

    function applyPercentage() {
        if (currentValue !== "") {
            currentValue = (parseFloat(currentValue) / 100).toString();
            display.innerText = currentValue;
        }
    }

    function handleInput(value) {
        if (isOperator(value)) {
            if (currentValue !== "") {
                if (firstValue === null) {
                    firstValue = currentValue;
                } else if (operator) {
                    firstValue = calculate(firstValue, currentValue, operator);
                }
                operator = value;
                currentValue = "";
            }
        } else {
            if (currentValue === '0' || display.innerText === 'Error') {
                currentValue = value;
            } else {
                currentValue += value;
            }
            display.innerText = currentValue;
        }
    }

    function isOperator(value) {
        return value === '+' || value === '-' || value === '*' || value === '/';
    }

    function calculate(first, second, operator) {
        const num1 = parseFloat(first);
        const num2 = parseFloat(second);
        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return (num1 / num2).toString();
            default:
                return second;
        }
    }

    function updateHistory(operation) {
        const historyItem = document.createElement('div');
        historyItem.textContent = operation;
        history.appendChild(historyItem);
    }
});
