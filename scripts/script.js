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
        // Ambil nilai dari display
        $('#display').val($('#display').val() + value);
    }

    // Fungsi untuk menghitung hasil
    window.calculate = function() {
        // Ambil nilai dari display
        let expression = $('#display').val();
        // Variabel untuk menyimpan hasil
        let result;
        // Evaluasi ekspresi matematika
        try {
            // Evaluasi ekspresi matematika
            result = eval(expression);
            // Tampilkan hasil
            $('#display').val(result);
            // Simpan riwayat
            saveHistory(expression, result);
        } catch (e) {
            // Jika terjadi error
            $('#display').val('Error');
        }
    }

    // Fungsi untuk menghapus display
    window.clearDisplay = function() {
        $('#display').val('');
    }

    // Fungsi untuk menyimpan riwayat ke database
    function saveHistory(operation, result) {
        // Kirim data ke server
        $.post('php/save_history.php', { operation: operation, result: result }, function(data) {
            // Tampilkan data di console
            console.log(data);
            // Ambil riwayat terbaru
            fetchHistory();
        });
    }

    // Fungsi untuk mengambil riwayat dari database
    function fetchHistory() {
        // Ambil data dari server
        $.get('php/get_history.php', function(data) {
            // Konversi data ke JSON
            let history = JSON.parse(data);
            // Variabel untuk menyimpan HTML
            let historyHtml = '';
            // Looping data riwayat
            history.forEach(function(item) {
                // Tambahkan data ke HTML
                historyHtml += `<p>${item.created_at}: ${item.operation} = ${item.result}</p>`;
            });
            // Tampilkan data di elemen HTML
            $('#history').html(historyHtml);
        });
    }

    // Ambil riwayat saat halaman dimuat
    fetchHistory();

    // Fungsi untuk ekspor ke CSV
    $('#exportCsv').click(function() {
        // Ambil data riwayat dari server
        $.get('php/get_history.php', function(data) {
            // Konversi data ke JSON
            let history = JSON.parse(data);
            // Variabel untuk menyimpan data CSV
            let csvContent = "data:text/csv;charset=utf-8,";
            // Tambahkan header ke CSV
            csvContent += "Date,Operation,Result\n";
            // Looping data riwayat
            history.forEach(function(row) {
                // Tambahkan data ke CSV
                csvContent += `${row.created_at},${row.operation},${row.result}\n`;
            });
            // Encode URI
            const encodedUri = encodeURI(csvContent);
            // Buat elemen link
            const link = document.createElement("a");
            // Atur atribut link
            link.setAttribute("href", encodedUri);
            // Atur atribut download
            link.setAttribute("download", "history.csv");
            // Tambahkan link ke body
            document.body.appendChild(link);
            // Klik link
            link.click();
        });
    });

    // Fungsi untuk ekspor ke PDF
    $('#exportPdf').click(function() {
        // Ambil data riwayat dari server
        $.get('php/get_history.php', function(data) {
            // Konversi data ke JSON
            let history = JSON.parse(data);
            // Buat elemen HTML
            let element = document.createElement('div');
            // Tambahkan judul
            let title = document.createElement('h1');
            // Atur judul
            title.innerText = 'Riwayat Perhitungan';
            element.appendChild(title);
            // Looping data riwayat
            history.forEach(function(item) {
                // Tambahkan data ke elemen HTML
                let p = document.createElement('p');
                // Atur isi elemen
                p.innerText = `${item.created_at}: ${item.operation} = ${item.result}`;
                // Tambahkan elemen ke elemen utama
                element.appendChild(p);
            });
            // Simpan ke PDF
            html2pdf().from(element).save('history.pdf');
        });
    });
});
