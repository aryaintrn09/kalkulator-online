<?php
include('functions.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $calculation = $_POST['calculation'];
        $result = $_POST['result'];
        saveCalculation($userId, $calculation, $result);
    }
}
?>
