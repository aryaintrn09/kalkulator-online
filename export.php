<?php
session_start();
require 'db.php';

$user_id = $_SESSION['user_id'];

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="history.csv"');

$output = fopen('php://output', 'w');
fputcsv($output, array('Expression', 'Result', 'Created At'));

$stmt = $conn->prepare("SELECT expression, result, created_at FROM history WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($expression, $result, $created_at);

while ($stmt->fetch()) {
    fputcsv($output, array($expression, $result, $created_at));
}

fclose($output);
?>
