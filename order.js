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

    // 1. FUNGSI LOGIKA SEMBUNYIKAN/TAMPILKAN ALAMAT
    function cekOpsiPengiriman() {
        // Ambil elemen div pembungkus (form-group) dari textarea alamat
        const grupAlamat = inputAlamat.parentElement;

        if (selectEkspedisi.value === "Ambil Sendiri") {
            // Sembunyikan kolom dan matikan status "Wajib Diisi"
            grupAlamat.style.display = "none";
            inputAlamat.removeAttribute("required");

            // Isi otomatis agar tidak error saat di halaman Payment
            inputAlamat.value = "Ambil sendiri ke toko / Outlet SmartLaundry.";
        } else {
            // Tampilkan kembali kolom dan wajibkan pengisian
            grupAlamat.style.display = "block";
            inputAlamat.setAttribute("required", "true");

            // Kosongkan teks jika sebelumnya otomatis terisi
            if (inputAlamat.value === "Ambil sendiri ke toko / Outlet SmartLaundry.") {
                inputAlamat.value = "";
            }
        }
    }

    // 2. FUNGSI HITUNG REALTIME DI SEBELAH KANAN
    function hitungEstimasi() {
        const paketTerpilih = selectPaket.value;
        const hargaPerKg = parseInt(selectPaket.options[selectPaket.selectedIndex]?.getAttribute("data-harga")) || 0;
        const berat = parseInt(inputBerat.value) || 0;
        const ongkir = parseInt(selectEkspedisi.options[selectEkspedisi.selectedIndex]?.getAttribute("data-ongkir")) || 0;

        const subtotalPakaian = hargaPerKg * berat;
        const totalAkhir = subtotalPakaian + ongkir + biayaAplikasi;

        // Penentuan Satuan Dinamis
        const satuan = (paketTerpilih.includes("Sepatu") || paketTerpilih.includes("Jaket") || paketTerpilih.includes("Bedcover") || paketTerpilih.includes("Noda")) ? "Pcs/Pasang" : "Kg";

        pPaket.innerText = paketTerpilih ? `${paketTerpilih} (${berat} ${satuan})` : "-";
        pHargaKg.innerText = "Rp " + hargaPerKg.toLocaleString('id-ID');
        pSubtotal.innerText = "Rp " + subtotalPakaian.toLocaleString('id-ID');
        pOngkir.innerText = "Rp " + ongkir.toLocaleString('id-ID');
        pTotal.innerText = "Rp " + (paketTerpilih && berat > 0 ? totalAkhir.toLocaleString('id-ID') : "0");
    }

    // Pasang Event Listener trigger hitung otomatis saat user mengetik/memilih
    selectPaket.addEventListener("change", hitungEstimasi);
    inputBerat.addEventListener("input", hitungEstimasi);

    // Khusus pilihan ekspedisi, jalankan fungsi hitung DAN fungsi cek alamat
    selectEkspedisi.addEventListener("change", function () {
        hitungEstimasi();
        cekOpsiPengiriman();
    });

    // Jalankan satu kali saat halaman pertama kali dibuka untuk memastikan tampilannya benar
    cekOpsiPengiriman();

    // 3. KIRIM DATA KE PAYMENT SAAT TOMBOL SUBMIT DITEKAN
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const paketTerpilih = selectPaket.value;
        const hargaPerKg = parseInt(selectPaket.options[selectPaket.selectedIndex].getAttribute("data-harga")) || 0;
        const berat = parseInt(inputBerat.value) || 0;
        const ongkir = parseInt(selectEkspedisi.options[selectEkspedisi.selectedIndex].getAttribute("data-ongkir")) || 0;

        const satuan = (paketTerpilih.includes("Sepatu") || paketTerpilih.includes("Jaket") || paketTerpilih.includes("Bedcover") || paketTerpilih.includes("Noda")) ? "Pcs/Pasang" : "Kg";
        const subtotalPakaian = hargaPerKg * berat;
        const totalAkhir = subtotalPakaian + ongkir + biayaAplikasi;

        const generatedID = "#SL-" + Math.floor(100000 + Math.random() * 900000);
        const tanggalOrder = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

        const dataPemesanan = {
            id: generatedID,
            tanggal: tanggalOrder,
            paket: paketTerpilih,
            berat: `${berat} ${satuan}`,
            subtotal: subtotalPakaian,
            ongkir: ongkir,
            diskon: 0,
            biayaAplikasi: biayaAplikasi,
            totalAkhir: totalAkhir,
            alamat: inputAlamat.value // Sekarang datanya sudah aman mau diisi atau tidak
        };

        localStorage.setItem("pesananAktif", JSON.stringify(dataPemesanan));
        window.location.href = "payment.html";
    });
});