$(document).ready(function() {
    $('#financialCalculator').html(`
        <div class="form-group">
            <label for="calcType">Pilih Jenis Kalkulasi:</label>
            <select class="form-control" id="calcType">
                <option value="loan">Bunga Pinjaman</option>
                <option value="amortization">Amortisasi</option>
                <option value="investment">Kalkulator Investasi</option>
            </select>
        </div> 
        <div class="form-group">
            <label for="principal">Jumlah Pokok:</label>
            <input type="number" class="form-control" id="principal">
        </div>
        <div class="form-group">
            <label for="rate">Tingkat Bunga (%):</label>
            <input type="number" class="form-control" id="rate">
        </div>
        <div class="form-group">
            <label for="time">Waktu (tahun):</label>
            <input type="number" class="form-control" id="time">
        </div>
        <div class="form-group">
            <label for="result">Hasil:</label>
            <input type="text" class="form-control" id="result" readonly>
        </div>
        <button class="btn btn-primary" onclick="calculateFinancial()">Hitung</button>
    `);
    
    // Fungsi untuk menghitung kalkulasi keuangan
    window.calculateFinancial = function() {
        // Ambil nilai dari input
        let calcType = $('#calcType').val();
        // Konversi nilai input ke tipe data numerik
        let principal = parseFloat($('#principal').val());
        // Konversi nilai input ke tipe data numerik
        let rate = parseFloat($('#rate').val()) / 100;
        // Konversi nilai input ke tipe data numerik
        let time = parseFloat($('#time').val());
        // Variabel untuk menyimpan hasil kalkulasi
        let result;

        switch (calcType) {
            // Kalkulasi berdasarkan jenis kalkulasi yang dipilih
            case 'loan':
                // Kalkulasi bunga pinjaman
                result = principal * rate * time; // Contoh kalkulasi sederhana bunga pinjaman
                break;
            case 'amortization':
                // Kalkulasi amortisasi
                result = principal * rate / (1 - (Math.pow(1/(1 + rate), time))); // Contoh amortisasi
                break;
            case 'investment':
                // Kalkulasi investasi
                result = principal * Math.pow((1 + rate), time); // Contoh kalkulator investasi
                break;
            default:
                // Jika jenis kalkulasi tidak ditemukan
                result = 0;
        }

        // Tampilkan hasil kalkulasi
        $('#result').val(result.toFixed(2));
    }
});
