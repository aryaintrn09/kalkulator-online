<?php
include('functions.php');

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Kalkulator Online</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h2>Kalkulator Online</h2>
    <form id="calculator-form">
        <input type="text" id="display" readonly>
        <div class="buttons">
            <!-- Tombol angka dan operasi -->
            <button type="button" data-value="7">7</button>
            <button type="button" data-value="8">8</button>
            <button type="button" data-value="9">9</button>
            <button type="button" data-value="/" class="operator">/</button>
            <button type="button" data-value="4">4</button>
            <button type="button" data-value="5">5</button>
            <button type="button" data-value="6">6</button>
            <button type="button" data-value="*" class="operator">*</button>
            <button type="button" data-value="1">1</button>
            <button type="button" data-value="2">2</button>
            <button type="button" data-value="3">3</button>
            <button type="button" data-value="-" class="operator">-</button>
            <button type="button" data-value="0">0</button>
            <button type="button" data-value="." class="decimal">.</button>
            <button type="button" data-value="+" class="operator">+</button>
            <button type="button" id="equals">=</button>
            <button type="button" id="clear">C</button>
            <!-- Tombol operasi lanjutan -->
            <button type="button" data-value="sin" class="advanced">sin</button>
            <button type="button" data-value="cos" class="advanced">cos</button>
            <button type="button" data-value="tan" class="advanced">tan</button>
            <button type="button" data-value="log" class="advanced">log</button>
            <button type="button" data-value="sqrt" class="advanced">√</button>
            <button type="button" data-value="%" class="advanced">%</button>
        </div>
    </form>

    <h3>Konversi Unit</h3>
    <form id="conversion-form">
        <input type="number" id="conversion-input" placeholder="Masukkan nilai">
        <select id="conversion-type">
            <option value="length">Panjang</option>
            <option value="weight">Berat</option>
            <option value="temperature">Suhu</option>
        </select>
        <select id="conversion-from">
            <!-- Opsi akan diisi oleh JavaScript -->
        </select>
        <select id="conversion-to">
            <!-- Opsi akan diisi oleh JavaScript -->
        </select>
        <button type="button" id="convert">Konversi</button>
        <input type="text" id="conversion-result" readonly>
    </form>

    <h3>Kalkulator Keuangan</h3>
    <form id="finance-form">
        <input type="number" id="principal" placeholder="Pokok Pinjaman">
        <input type="number" id="rate" placeholder="Suku Bunga (%)">
        <input type="number" id="time" placeholder="Jangka Waktu (tahun)">
        <button type="button" id="calculate-interest">Hitung Bunga</button>
        <input type="text" id="interest-result" readonly>
    </form>

    <h3>Riwayat Perhitungan</h3>
    <div id="history">
        <?php
        $history = getUserHistory($_SESSION['user_id']);
        while ($row = $history->fetch_assoc()) {
            echo "<p>{$row['calculation']} = {$row['result']} ({$row['created_at']})</p>";
        }
        ?>
    </div>
    <a href="export.php">Ekspor Riwayat</a>
    <br>
    <a href="history.php">Lihat Riwayat Lengkap</a>
    <script src="script.js"></script>
</body>
</html>
