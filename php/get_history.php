<?php
// Perintah untuk menyertakan file db.php ke dalam script ini.
include 'db.php';
// Memulai session
session_start();

// Pernyataan kondisional yang memeriksa apakah variabel sesi user_id telah diatur. Jika variabel sesi ini telah diatur, berarti pengguna telah masuk atau memiliki sesi yang valid.
if (isset($_SESSION['user_id'])) {
    // Mengambil nilai variabel sesi user_id dan menyimpannya dalam variabel lokal $user_id
    $user_id = $_SESSION['user_id'];

    // Mempersiapkan pernyataan SQL yang akan dieksekusi. Pernyataan ini akan mengambil operasi, hasil, dan waktu pembuatan dari tabel history berdasarkan user_id yang sesuai.
    $stmt = $conn->prepare("SELECT operation, result, created_at FROM history WHERE user_id = ? ORDER BY created_at DESC");
    // Mengikat nilai variabel $user_id ke dalam pernyataan yang telah dipersiapkan sebelumnya. 
    // Ini memastikan bahwa nilai yang diberikan untuk user_id dalam pernyataan SQL adalah aman dan terhindar dari serangan SQL Injection.
    $stmt->bind_param("i", $user_id);
    // Mengeksekusi pernyataan SQL yang telah dipersiapkan dan menyimpan hasilnya dalam variabel $result.
    $stmt->execute();
    // Mengambil hasil dari eksekusi pernyataan SQL dan menyimpannya dalam variabel $result.
    $result = $stmt->get_result();

    // Inisialisasi variabel $history sebagai array kosong. Variabel ini akan digunakan untuk menyimpan data yang diambil dari tabel history.
    $history = [];
    // Perulangan yang akan mengambil setiap baris hasil dari tabel history dan menambahkannya ke dalam array $history.
    while ($row = $result->fetch_assoc()) {
        $history[] = $row;
    }

    // Mengubah array $history menjadi format JSON dan mencetaknya sebagai output
    echo json_encode($history);

    // Menutup pernyataan dan koneksi ke database
    $stmt->close();
    $conn->close();
    // Mencetak pesan "Unauthorized." jika variabel sesi user_id tidak diatur atau pengguna tidak memiliki sesi yang valid
} else {
    echo "Unauthorized.";
}
?>
