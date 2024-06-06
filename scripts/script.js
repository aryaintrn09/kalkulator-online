$(document).ready(function() {
    // Logika untuk kalkulator dasar
    $('#calculator').html(`
        <div class="row">
            <div class="col-12 mb-2">
                <input type="text" id="display" class="form-control text-right" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('1')">1</button>
            </div>
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('2')">2</button>
            </div>
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('3')">3</button>
            </div>
            <div class="col-3">
                <button class="btn btn-primary" onclick="calculate()">=</button>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('4')">4</button>
            </div>
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('5')">5</button>
            </div>
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('6')">6</button>
            </div>
            <div class="col-3">
                <button class="btn btn-warning" onclick="appendToDisplay('+')">+</button>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('7')">7</button>
            </div>
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('8')">8</button>
            </div>
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('9')">9</button>
            </div>
            <div class="col-3">
                <button class="btn btn-warning" onclick="appendToDisplay('-')">-</button>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('0')">0</button>
            </div>
            <div class="col-3">
                <button class="btn btn-secondary" onclick="appendToDisplay('.')">.</button>
            </div>
            <div class="col-3">
                <button class="btn btn-danger" onclick="clearDisplay()">C</button>
            </div>
            <div class="col-3">
                <button class="btn btn-warning" onclick="appendToDisplay('*')">*</button>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <button class="btn btn-warning" onclick="appendToDisplay('/')">/</button>
            </div>
        </div>
    `);

    // Fungsi untuk menambah angka/operasi ke display
    window.appendToDisplay = function(value) {
        $('#display').val($('#display').val() + value);
    }

    // Fungsi untuk menghitung hasil
    window.calculate = function() {
        let expression = $('#display').val();
        let result;
        try {
            result = eval(expression);
            $('#display').val(result);
            saveHistory(expression, result);
        } catch (e) {
            $('#display').val('Error');
        }
    }

    // Fungsi untuk menghapus display
    window.clearDisplay = function() {
        $('#display').val('');
    }

    // Fungsi untuk menyimpan riwayat ke database
    function saveHistory(operation, result) {
        $.post('php/save_history.php', { operation: operation, result: result }, function(data) {
            console.log(data);
            fetchHistory();
        });
    }

    // Fungsi untuk mengambil riwayat dari database
    function fetchHistory() {
        $.get('php/get_history.php', function(data) {
            let history = JSON.parse(data);
            let historyHtml = '';
            history.forEach(function(item) {
                historyHtml += `<p>${item.created_at}: ${item.operation} = ${item.result}</p>`;
            });
            $('#history').html(historyHtml);
        });
    }

    fetchHistory();

    // Fungsi untuk ekspor ke CSV
    $('#exportCsv').click(function() {
        $.get('php/get_history.php', function(data) {
            let history = JSON.parse(data);
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Date,Operation,Result\n";
            history.forEach(function(row) {
                csvContent += `${row.created_at},${row.operation},${row.result}\n`;
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "history.csv");
            document.body.appendChild(link);
            link.click();
        });
    });

    // Fungsi untuk ekspor ke PDF
    $('#exportPdf').click(function() {
        $.get('php/get_history.php', function(data) {
            let history = JSON.parse(data);
            let element = document.createElement('div');
            let title = document.createElement('h1');
            title.innerText = 'Riwayat Perhitungan';
            element.appendChild(title);
            history.forEach(function(item) {
                let p = document.createElement('p');
                p.innerText = `${item.created_at}: ${item.operation} = ${item.result}`;
                element.appendChild(p);
            });
            html2pdf().from(element).save('history.pdf');
        });
    });
});
