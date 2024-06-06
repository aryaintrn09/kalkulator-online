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
    <form id="calculator-form" method="post" action="save_calculation.php">
        <input type="text" id="display" name="calculation" readonly>
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
    <form id="conversion-form" method="post" action="convert.php">
        <input type="number" id="conversion-input" name="value" placeholder="Masukkan nilai" required>
        <select id="conversion-type" name="type">
            <option value="length">Panjang</option>
            <option value="weight">Berat</option>
            <option value="temperature">Suhu</option>
        </select>
        <select id="conversion-from" name="from_unit">
            <!-- Opsi panjang -->
            <optgroup label="Panjang">
                <option value="Meter">Meter</option>
                <option value="Kilometer">Kilometer</option>
                <option value="Centimeter">Centimeter</option>
                <option value="Milimeter">Milimeter</option>
                <option value="Mile">Mile</option>
                <option value="Yard">Yard</option>
                <option value="Foot">Foot</option>
                <option value="Inch">Inch</option>
            </optgroup>
            <!-- Opsi berat -->
            <optgroup label="Berat">
                <option value="Kilogram">Kilogram</option>
                <option value="Gram">Gram</option>
                <option value="Pound">Pound</option>
                <option value="Ounce">Ounce</option>
            </optgroup>
            <!-- Opsi suhu -->
            <optgroup label="Suhu">
                <option value="Celsius">Celsius</option>
                <option value="Fahrenheit">Fahrenheit</option>
                <option value="Kelvin">Kelvin</option>
            </optgroup>
        </select>
        <select id="conversion-to" name="to_unit">
            <!-- Opsi panjang -->
            <optgroup label="Panjang">
                <option value="Meter">Meter</option>
                <option value="Kilometer">Kilometer</option>
                <option value="Centimeter">Centimeter</option>
                <option value="Milimeter">Milimeter</option>
                <option value="Mile">Mile</option>
                <option value="Yard">Yard</option>
                <option value="Foot">Foot</option>
                <option value="Inch">Inch</option>
            </optgroup>
            <!-- Opsi berat -->
            <optgroup label="Berat">
                <option value="Kilogram">Kilogram</option>
                <option value="Gram">Gram</option>
                <option value="Pound">Pound</option>
                <option value="Ounce">Ounce</option>
            </optgroup>
            <!-- Opsi suhu -->
            <optgroup label="Suhu">
                <option value="Celsius">Celsius</option>
                <option value="Fahrenheit">Fahrenheit</option>
                <option value="Kelvin">Kelvin</option>
            </optgroup>
        </select>
        <button type="submit">Konversi</button>
        <input type="text" id="conversion-result" name="result" readonly value="<?php echo isset($_GET['conversion_result']) ? $_GET['conversion_result'] : ''; ?>">
    </form>

    <h3>Kalkulator Keuangan</h3>
    <form id="finance-form" method="post" action="calculate_interest.php">
        <input type="number" id="principal" name="principal" placeholder="Pokok Pinjaman" required>
        <input type="number" id="rate" name="rate" placeholder="Suku Bunga (%)" required>
        <input type="number" id="time" name="time" placeholder="Jangka Waktu (tahun)" required>
        <button type="submit">Hitung Bunga</button>
        <input type="text" id="interest-result" name="result" readonly value="<?php echo isset($_GET['interest_result']) ? $_GET['interest_result'] : ''; ?>">
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
