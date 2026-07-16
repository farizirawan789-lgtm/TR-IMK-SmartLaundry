// ======================================================
// SMART LAUNDRY - ORDER.JS (CALCULATION & ROUTING)
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("laundryOrderForm");
    const selectPaket = document.getElementById("selectPaket");
    const inputBerat = document.getElementById("inputBerat");
    const selectEkspedisi = document.getElementById("selectEkspedisi");
    const inputAlamat = document.getElementById("inputAlamat");

    // Element Live Preview Right Side
    const pPaket = document.getElementById("preview-paket");
    const pHargaKg = document.getElementById("preview-harga-per-kg");
    const pSubtotal = document.getElementById("preview-subtotal-pakaian");
    const pOngkir = document.getElementById("preview-ongkir");
    const pTotal = document.getElementById("preview-total-akhir");

    const biayaAplikasi = 2000;

    // 1. FUNGSI HITUNG REALTIME
    function hitungEstimasi() {
        const paketTerpilih = selectPaket.value;
        const hargaPerKg = parseInt(selectPaket.options[selectPaket.selectedIndex]?.getAttribute("data-harga")) || 0;
        const berat = parseInt(inputBerat.value) || 0;
        const ongkir = parseInt(selectEkspedisi.options[selectEkspedisi.selectedIndex]?.getAttribute("data-ongkir")) || 0;

        const subtotalPakaian = hargaPerKg * berat;
        const totalAkhir = subtotalPakaian + ongkir + biayaAplikasi;

        // Render ke UI Kanan
        pPaket.innerText = paketTerpilih ? `${paketTerpilih} (${berat} Kg)` : "-";
        pHargaKg.innerText = "Rp " + hargaPerKg.toLocaleString('id-ID');
        pSubtotal.innerText = "Rp " + subtotalPakaian.toLocaleString('id-ID');
        pOngkir.innerText = "Rp " + ongkir.toLocaleString('id-ID');
        pTotal.innerText = "Rp " + (paketTerpilih && berat > 0 ? totalAkhir.toLocaleString('id-ID') : "0");
    }

    // Pasang Event Listener trigger hitung otomatis
    selectPaket.addEventListener("change", hitungEstimasi);
    inputBerat.addEventListener("input", hitungEstimasi);
    selectEkspedisi.addEventListener("change", hitungEstimasi);

    // 2. KIRIM DATA KE PAYMENT SAAT SUBMIT
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const hargaPerKg = parseInt(selectPaket.options[selectPaket.selectedIndex].getAttribute("data-harga"));
        const berat = parseInt(inputBerat.value);
        const ongkir = parseInt(selectEkspedisi.options[selectEkspedisi.selectedIndex].getAttribute("data-ongkir"));
        
        // Buat ID pesanan acak yang unik
        const generatedID = "#SL-" + Math.floor(100000 + Math.random() * 900000);

        // Struktur data objek order untuk ditangkap oleh payment.js
        const dataPemesanan = {
            idPesanan: generatedID,
            paket: `${selectPaket.value} • ${berat} Kg`,
            hargaPaket: hargaPerKg * berat,
            antarJemput: ongkir,
            diskon: 0, // Set 0 atau bisa dikondisikan promo nanti
            biayaLayanan: biayaAplikasi,
            alamat: inputAlamat.value
        };

        // Simpan data ke dalam cache browser (localStorage)
        localStorage.setItem("pesananAktif", JSON.stringify(dataPemesanan));

        // Pindahkan user secara otomatis ke halaman pembayaran
        window.location.href = "payment.html";
    });
});

// ======================================================
// DI DALAM FILE order.js (Bagian Bawah)
// ======================================================

// 2. KIRIM DATA KE PAYMENT SAAT FORMULIR DI-SUBMIT
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah halaman reload/segarkan otomatis

    // Mengambil harga asli secara dinamis dari pilihan user di formulir
    const hargaPerKg = parseInt(selectPaket.options[selectPaket.selectedIndex].getAttribute("data-harga"));
    const berat = parseInt(inputBerat.value);
    const ongkir = parseInt(selectEkspedisi.options[selectEkspedisi.selectedIndex].getAttribute("data-ongkir"));
    
    // Generate ID otomatis (Contoh: #SL-482910)
    const generatedID = "#SL-" + Math.floor(100000 + Math.random() * 900000);

    // [DI SINI TEMPATNYA!] Objek data pesanan dibentuk secara otomatis dari input formulir
    const dataPemesanan = {
        idPesanan: generatedID,
        paket: `${selectPaket.value} • ${berat} Kg`, // Hasil input jenis paket dan berat
        hargaPaket: hargaPerKg * berat,            // Hasil hitungan matematika asli
        antarJemput: ongkir,                       // Ongkir sesuai pilihan pengiriman
        diskon: 0, 
        biayaLayanan: biayaAplikasi,               // Rp 2.000
        alamat: inputAlamat.value                  // Hasil input teks alamat user
    };

    // Menyimpan data riil ke dalam memori lokal browser
    localStorage.setItem("pesananAktif", JSON.stringify(dataPemesanan));

    // Mengarahkan user langsung ke halaman payment.html
    window.location.href = "payment.html";
});