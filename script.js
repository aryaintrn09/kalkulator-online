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

    // Konversi Unit
    const conversionType = document.getElementById('conversion-type');
    const conversionFrom = document.getElementById('conversion-from');
    const conversionTo = document.getElementById('conversion-to');
    const conversionResult = document.getElementById('conversion-result');
    const conversionInput = document.getElementById('conversion-input');
    const convertButton = document.getElementById('convert');

    const units = {
        length: ['Meter', 'Kilometer', 'Centimeter', 'Milimeter', 'Mile', 'Yard', 'Foot', 'Inch'],
        weight: ['Kilogram', 'Gram', 'Pound', 'Ounce'],
        temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
    };

    conversionType.addEventListener('change', updateUnits);
    convertButton.addEventListener('click', convertUnits);

    function updateUnits() {
        const selectedType = conversionType.value;
        const unitOptions = units[selectedType];
        conversionFrom.innerHTML = '';
        conversionTo.innerHTML = '';
        unitOptions.forEach(unit => {
            const optionFrom = document.createElement('option');
            optionFrom.value = unit;
            optionFrom.textContent = unit;
            const optionTo = document.createElement('option');
            optionTo.value = unit;
            optionTo.textContent = unit;
            conversionFrom.appendChild(optionFrom);
            conversionTo.appendChild(optionTo);
        });
    }

    function convertUnits() {
        const value = parseFloat(conversionInput.value);
        const fromUnit = conversionFrom.value;
        const toUnit = conversionTo.value;
        let result;

        if (conversionType.value === 'length') {
            result = convertLength(value, fromUnit, toUnit);
        } else if (conversionType.value === 'weight') {
            result = convertWeight(value, fromUnit, toUnit);
        } else if (conversionType.value === 'temperature') {
            result = convertTemperature(value, fromUnit, toUnit);
        }

        conversionResult.value = result;
    }

    function convertLength(value, from, to) {
        const conversionRates = {
            Meter: 1,
            Kilometer: 1000,
            Centimeter: 0.01,
            Milimeter: 0.001,
            Mile: 1609.34,
            Yard: 0.9144,
            Foot: 0.3048,
            Inch: 0.0254
        };
        return (value * conversionRates[from]) / conversionRates[to];
    }

    function convertWeight(value, from, to) {
        const conversionRates = {
            Kilogram: 1,
            Gram: 0.001,
            Pound: 0.453592,
            Ounce: 0.0283495
        };
        return (value * conversionRates[from]) / conversionRates[to];
    }

    function convertTemperature(value, from, to) {
        if (from === 'Celsius') {
            if (to === 'Fahrenheit') {
                return (value * 9/5) + 32;
            } else if (to === 'Kelvin') {
                return value + 273.15;
            }
        } else if (from === 'Fahrenheit') {
            if (to === 'Celsius') {
                return (value - 32) * 5/9;
            } else if (to === 'Kelvin') {
                return (value - 32) * 5/9 + 273.15;
            }
        } else if (from === 'Kelvin') {
            if (to === 'Celsius') {
                return value - 273.15;
            } else if (to === 'Fahrenheit') {
                return (value - 273.15) * 9/5 + 32;
            }
        }
        return value;
    }

    // Kalkulator Keuangan
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const timeInput = document.getElementById('time');
    const calculateInterestButton = document.getElementById('calculate-interest');
    const interestResult = document.getElementById('interest-result');

    calculateInterestButton.addEventListener('click', calculateInterest);

    function calculateInterest() {
        const principal = parseFloat(principalInput.value);
        const rate = parseFloat(rateInput.value) / 100;
        const time = parseFloat(timeInput.value);
        const interest = principal * rate * time;
        interestResult.value = interest;
    }
});
