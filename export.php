<?php
include('functions.php');

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

$userId = $_SESSION['user_id'];
$history = getUserHistory($userId);

$filename = "history_" . date('Ymd') . ".csv";
header("Content-Description: File Transfer");
header("Content-Disposition: attachment; filename=$filename");
header("Content-Type: application/csv;");

$file = fopen('php://output', 'w');
$header = array("Calculation", "Result", "Created At");
fputcsv($file, $header);

while ($row = $history->fetch_assoc()) {
    fputcsv($file, $row);
}
fclose($file);
exit();
?>
