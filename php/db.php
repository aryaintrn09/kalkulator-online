<!-- Script ini untuk menghubungkan database ke website -->
<?php
// Membuat koneksi ke database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calculator_app";

// Membuat objek baru dari kelas mysqli yang digunakan untuk menghubungkan ke database MySQL. Objek ini disimpan dalam variabel $conn
$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa apakah koneksi ke database berhasil atau tidak
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
