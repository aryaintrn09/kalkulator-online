<?php
session_start();
include('db.php');

function registerUser($username, $password) {
    global $conn;
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $hashedPassword);
    return $stmt->execute();
}

function loginUser($username, $password) {
    global $conn;
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashedPassword);
    if ($stmt->num_rows > 0 && $stmt->fetch()) {
        if (password_verify($password, $hashedPassword)) {
            $_SESSION['user_id'] = $id;
            return true;
        }
    }
    return false;
}

function saveCalculation($userId, $calculation, $result) {
    global $conn;
    $stmt = $conn->prepare("INSERT INTO history (user_id, calculation, result) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $userId, $calculation, $result);
    return $stmt->execute();
}

function getUserHistory($userId) {
    global $conn;
    $stmt = $conn->prepare("SELECT calculation, result, created_at FROM history WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    return $stmt->get_result();
}
?>
