<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $expression = $_POST['expression'];
    $result = $_POST['result'];

    $stmt = $conn->prepare("INSERT INTO history (user_id, expression, result) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $expression, $result);
    $stmt->execute();
}
?>
