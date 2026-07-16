//Taruh ini di bagian akhir fungsi sukses order Anda sebelum pindah halaman
const dataPesanan = {
    idPesanan: "#LND-" + Math.floor(10000 + Math.random() * 90000), // Generate ID acak
    paket: "Cuci + Setrika (5kg)", // Sesuaikan dengan input paket yang dipilih user
    hargaPaket: 35000,             // Sesuaikan dengan harga paketnya
    antarJemput: 10000,            // Sesuaikan dengan pilihan layanan antar jemput
    diskon: 5000,                  // Sesuaikan jika ada diskon pelanggan baru
    biayaLayanan: 2000,
    alamat: "Jl. Merdeka No. 12, Salatiga, Jawa Tengah" // Sesuaikan dengan input alamat
};

// Simpan objek pesanan ke localStorage
localStorage.setItem("pesananAktif", JSON.stringify(dataPesanan));

// Baru arahkan ke halaman payment
window.location.href = "payment.html";