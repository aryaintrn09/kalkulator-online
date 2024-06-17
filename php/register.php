<?php
// Perintah untuk menyertakan file db.php ke dalam script ini.
include 'db.php';

// Pernyataan kondisional yang memeriksa apakah metode permintaan adalah POST.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Mengambil nilai variabel username dari permintaan POST.
    $username = $_POST['username'];
    // Meng-hash password yang dimasukkan oleh pengguna menggunakan fungsi password_hash() dan menyimpannya dalam variabel $password.
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Mempersiapkan pernyataan SQL yang akan dieksekusi. Pernyataan ini akan menyimpan username dan password ke dalam tabel users.
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    // Mengikat nilai variabel $username dan $password ke dalam pernyataan yang telah dipersiapkan sebelumnya.
    $stmt->bind_param("ss", $username, $password);

    // Mengeksekusi pernyataan SQL yang telah dipersiapkan.
    if ($stmt->execute()) {
        // Mengarahkan pengguna ke halaman login jika registrasi berhasil.
        header("Location: ../login.html");
    } else {
        // Mencetak pesan error jika terjadi kesalahan dalam mengeksekusi pernyataan SQL.
        echo "Error: " . $stmt->error;
    }

    // Menutup pernyataan dan koneksi ke database
    $stmt->close();
    $conn->close();
}
?>
