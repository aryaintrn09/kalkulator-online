<?php
// Perintah untuk menyertakan file db.php ke dalam script ini.
include 'db.php';
// Memulai session
session_start();

// Pernyataan kondisional yang memeriksa apakah variabel sesi user_id telah diatur dan metode permintaan adalah POST.
if (isset($_SESSION['user_id']) && $_SERVER["REQUEST_METHOD"] == "POST") {
    // Mengambil nilai variabel user_id dari sesi dan menyimpannya dalam variabel lokal $user_id
    $user_id = $_SESSION['user_id'];
    // Mengambil nilai variabel operation, result dari permintaan POST dan menyimpannya dalam variabel lokal $operation, $result
    $operation = $_POST['operation'];
    // Mengambil nilai variabel operation, result dari permintaan POST dan menyimpannya dalam variabel lokal $operation, $result
    $result = $_POST['result'];

    // Mempersiapkan pernyataan SQL yang akan dieksekusi. Pernyataan ini akan menyimpan operasi dan hasil dari kalkulasi ke dalam tabel history.
    $stmt = $conn->prepare("INSERT INTO history (user_id, operation, result) VALUES (?, ?, ?)");
    // Mengikat nilai variabel $user_id, $operation, $result ke dalam pernyataan yang telah dipersiapkan sebelumnya.
    $stmt->bind_param("iss", $user_id, $operation, $result);

    // Mengeksekusi pernyataan SQL yang telah dipersiapkan.
    if ($stmt->execute()) {
        // Mencetak pesan "History saved successfully." jika penyimpanan history berhasil.
        echo "History saved successfully.";
    // Mencetak pesan error jika terjadi kesalahan dalam mengeksekusi pernyataan SQL.
    } else {
        echo "Error: " . $stmt->error;
    }

    // Menutup pernyataan dan koneksi ke database
    $stmt->close();
    $conn->close();
// Mencetak pesan "Unauthorized." jika variabel sesi user_id tidak diatur atau pengguna tidak memiliki sesi yang valid
} else {
    echo "Unauthorized.";
}
?>
