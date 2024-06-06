<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $principal = $_POST['principal'];
    $rate = $_POST['rate'] / 100;
    $time = $_POST['time'];
    $interest = $principal * $rate * $time;

    header('Location: calculator.php?interest_result=' . urlencode($interest));
    exit();
}
?>
