function appendNumber(number) {
    document.getElementById('display').value += number;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    let expression = document.getElementById('display').value;
    try {
        let result = eval(expression);
        document.getElementById('display').value = result;
        saveHistory(expression, result);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function saveHistory(expression, result) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'calc.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            loadHistory();
        }
    };
    xhr.send('expression=' + encodeURIComponent(expression) + '&result=' + encodeURIComponent(result));
}

function loadHistory() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'history.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.getElementById('history').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

function exportHistory() {
    window.location.href = 'export.php';
}

function convertUnit() {
    let value = document.getElementById('unitInput').value;
    let type = document.getElementById('unitType').value;
    let result;

    switch (type) {
        case 'length':
            result = `${value} meter = ${value * 100} cm`;
            break;
        case 'weight':
            result = `${value} kg = ${value * 1000} gram`;
            break;
        case 'temperature':
            result = `${value}°C = ${(value * 9/5) + 32}°F`;
            break;
        default:
            result = 'Invalid type';
    }

    document.getElementById('conversionResult').innerText = result;
}

function calculateLoan() {
    let principal = document.getElementById('principal').value;
    let rate = document.getElementById('rate').value / 100 / 12;
    let years = document.getElementById('years').value * 12;
    let payment = (principal * rate) / (1 - Math.pow(1 + rate, -years));
    document.getElementById('loanResult').innerText = `Monthly Payment: Rp ${payment.toFixed(2)}`;
}

function handleLoginLogout() {
    let loginLogoutBtn = document.getElementById('loginLogoutBtn');
    if (loginLogoutBtn.innerText === 'Logout') {
        logout();
    } else {
        window.location.href = 'login.html';
    }
}

function checkLoginStatus() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'check_login_status.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            if (response.logged_in) {
                document.getElementById('loginLogoutBtn').innerText = 'Logout';
            } else {
                document.getElementById('loginLogoutBtn').innerText = 'Login';
            }
        }
    };
    xhr.send();
}

function logout() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'logout.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            window.location.href = 'login.html';
        }
    };
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadHistory();
    document.getElementById('unitType').addEventListener('change', function () {
        let type = this.value;
        let optionsDiv = document.getElementById('unitConversionOptions');
        optionsDiv.innerHTML = '';

        if (type === 'length') {
            optionsDiv.innerHTML = '<p>Pilihan: Meter ke Sentimeter</p>';
        } else if (type === 'weight') {
            optionsDiv.innerHTML = '<p>Pilihan: Kilogram ke Gram</p>';
        } else if (type === 'temperature') {
            optionsDiv.innerHTML = '<p>Pilihan: Celcius ke Fahrenheit</p>';
        }
    });
});
