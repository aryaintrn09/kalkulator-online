<?php
// Memulai session
session_start();
// Menghapus semua data sesi
session_destroy();
// Mengarahkan pengguna ke halaman login
header("Location: ../login.html");
?>
