<?php
session_start();

$response = array();
if (isset($_SESSION['user_id'])) {
    $response['logged_in'] = true;
} else {
    $response['logged_in'] = false;
}

echo json_encode($response);
?>
