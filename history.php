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
    <title>Riwayat Perhitungan</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h2>Riwayat Perhitungan</h2>
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
    <a href="calculator.php">Kembali ke Kalkulator</a>
</body>
</html>
