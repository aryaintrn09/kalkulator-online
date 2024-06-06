document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');
    const equals = document.getElementById('equals');
    const clear = document.getElementById('clear');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            if (this.classList.contains('operator')) {
                operator = value;
                previousInput = currentInput;
                currentInput = '';
                display.value = '';
            } else if (this.classList.contains('advanced')) {
                if (value === 'sqrt') {
                    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                } else if (value === 'log') {
                    currentInput = Math.log(parseFloat(currentInput)).toString();
                } else if (value === 'sin') {
                    currentInput = Math.sin(parseFloat(currentInput)).toString();
                } else if (value === 'cos') {
                    currentInput = Math.cos(parseFloat(currentInput)).toString();
                } else if (value === 'tan') {
                    currentInput = Math.tan(parseFloat(currentInput)).toString();
                } else if (value === '%') {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                }
                display.value = currentInput;
            } else {
                currentInput += value;
                display.value = currentInput;
            }
        });
    });

    equals.addEventListener('click', function () {
        let result;
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default:
                result = parseFloat(currentInput);
                break;
        }

        display.value = result;
        saveCalculation(`${previousInput} ${operator} ${currentInput}`, result);
        currentInput = result.toString();
        previousInput = '';
        operator = '';
    });

    clear.addEventListener('click', function () {
        currentInput = '';
        previousInput = '';
        operator = '';
        display.value = '';
    });

    function saveCalculation(calculation, result) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save_calculation.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`calculation=${encodeURIComponent(calculation)}&result=${encodeURIComponent(result)}`);
    }
});
