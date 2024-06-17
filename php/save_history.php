<?php
include 'db.php';
session_start();

if (isset($_SESSION['user_id']) && $_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION['user_id'];
    $operation = $_POST['operation'];
    $result = $_POST['result'];

    $stmt = $conn->prepare("INSERT INTO history (user_id, operation, result) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $operation, $result);

    if ($stmt->execute()) {
        echo "History saved successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Unauthorized.";
}
?>
