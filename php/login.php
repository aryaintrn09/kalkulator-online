<?php
// Perintah untuk menyertakan file db.php ke dalam script ini.
include 'db.php';
// Memulai session
session_start();

// Pernyataan kondisional yang memeriksa apakah metode permintaan adalah POST.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Mengambil nilai variabel username dan password dari permintaan POST.
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Mempersiapkan pernyataan SQL yang akan dieksekusi. Pernyataan ini akan mengambil id dan password dari tabel users berdasarkan username yang sesuai.
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    // Mengikat nilai variabel $username ke dalam pernyataan yang telah dipersiapkan sebelumnya.
    $stmt->bind_param("s", $username);
    // Mengeksekusi pernyataan SQL yang telah dipersiapkan.
    $stmt->execute();
    // Mengikat hasil dari eksekusi pernyataan SQL ke dalam variabel $result.
    $stmt->store_result();
    // Mengikat hasil dari eksekusi pernyataan SQL ke dalam variabel $id dan $hashed_password.
    $stmt->bind_result($id, $hashed_password);

    // Pernyataan kondisional yang memeriksa apakah hasil dari eksekusi pernyataan SQL menghasilkan baris data atau tidak.
    if ($stmt->num_rows > 0) {
        // Pernyataan untuk mengambil baris hasil dari pernyataan SQL dan memasukkan nilainya ke dalam variabel yang telah diikat sebelumnya ($id dan $hashed_password).
        $stmt->fetch();
        // Pernyataan kondisional yang memeriksa apakah password yang dimasukkan oleh pengguna sesuai dengan password yang di-hash dalam database.
        if (password_verify($password, $hashed_password)) {
            // Jika password sesuai, maka variabel sesi user_id akan diatur dengan nilai id dari pengguna yang berhasil masuk.
            $_SESSION['user_id'] = $id;
            // Mengarahkan pengguna ke halaman kalkulator jika login berhasil.
            header("Location: ../calculator.html");
        // Jika password tidak sesuai, maka mencetak pesan "Invalid password."
        } else {
            echo "Invalid password.";
        }
    // Jika tidak ada baris data yang ditemukan dengan username yang dimasukkan, maka mencetak pesan "No user found with that username."
    } else {
        echo "No user found with that username.";
    }

    // Menutup pernyataan dan koneksi ke database
    $stmt->close();
    $conn->close();
}
?>
