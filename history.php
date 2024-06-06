<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo "Silakan login terlebih dahulu.";
    exit;
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT expression, result, created_at FROM history WHERE user_id = ? ORDER BY created_at DESC");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($expression, $result, $created_at);

echo "<ul>";
while ($stmt->fetch()) {
    echo "<li><strong>$created_at:</strong> $expression = $result</li>";
}
echo "</ul>";

$stmt->close();
$conn->close();
?>
