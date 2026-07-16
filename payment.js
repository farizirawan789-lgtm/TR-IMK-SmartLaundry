// ======================================================
// SMART LAUNDRY - PAYMENT.JS (REALTIME TIMER & DYNAMIC)
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil data dari localStorage
    const dataPesanan = JSON.parse(localStorage.getItem("pesananAktif"));

    const noOrderMsg = document.getElementById("no-order-message");
    const activePayArea = document.getElementById("active-payment-area");

    // 2. CEK KONDISI LOGIKA ORDER
    if (!dataPesanan) {
        // Jika TIDAK ADA orderan masuk, sembunyikan invoice dan tampilkan pesan kosong
        noOrderMsg.style.display = "block";
        activePayArea.style.display = "none";
    } else {
        // Jika ADA orderan masuk, tampilkan invoice dan jalankan render data
        noOrderMsg.style.display = "none";
        activePayArea.style.display = "block";
        
        lokalkanData(dataPesanan);
        mulaiHitungMundur(23, 59, 12); // Waktu hitung mundur default (Jam, Menit, Detik)
    }
});

function lokalkanData(data) {
    document.getElementById("header-order-id").innerText = data.idPesanan;
    document.getElementById("summary-id").innerText = data.idPesanan;
    document.getElementById("summary-paket-nama").innerText = data.paket;
    document.getElementById("summary-paket-harga").innerText = "Rp " + data.hargaPaket.toLocaleString('id-ID');
    document.getElementById("summary-antarjemput").innerText = "Rp " + data.antarJemput.toLocaleString('id-ID');
    document.getElementById("summary-diskon").innerText = "- Rp " + data.diskon.toLocaleString('id-ID');
    document.getElementById("summary-layanan").innerText = "Rp " + data.biayaLayanan.toLocaleString('id-ID');
    document.getElementById("summary-alamat").innerText = data.alamat;

    const totalBayar = (data.hargaPaket + data.antarJemput + data.biayaLayanan) - data.diskon;
    document.getElementById("summary-total-bayar").innerText = "Rp " + totalBayar.toLocaleString('id-ID');
}

// ================= JALANKAN JAM HITUNG MUNDUR REALTIME =================
function mulaiHitungMundur(jam, menit, detik) {
    const timerElement = document.getElementById("timer");
    
    // Konversi total waktu ke satuan detik
    let totalDetik = (jam * 3650) + (menit * 60) + detik;

    const interval = setInterval(() => {
        if (totalDetik <= 0) {
            clearInterval(interval);
            timerElement.innerText = "WAKTU HABIS";
            alert("Waktu pembayaran telah habis! Pesanan Anda dibatalkan.");
            localStorage.removeItem("pesananAktif"); // hapus status pesanan kadaluarsa
            window.location.reload();
            return;
        }

        totalDetik--;

        // Hitung ulang sisa jam, menit, dan detik
        let h = Math.floor(totalDetik / 3600);
        let m = Math.floor((totalDetik % 3600) / 60);
        let s = totalDetik % 60;

        // Beri angka 0 di depan jika nilainya satuan (Contoh: 09:05:02)
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;

        timerElement.innerText = `${h}:${m}:${s}`;
    }, 1000);
}

// ================= PILIH METODE TABS PEMBAYARAN =================
function selectMethod(type, el) {
    document.querySelectorAll('.method-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');

    document.querySelectorAll('.method-detail').forEach(d => d.forEach ? d.classList.remove('show') : d.classList.remove('show'));
    
    // Reset display semua detail manual
    document.getElementById('detail-va').classList.remove('show');
    document.getElementById('detail-ewallet').classList.remove('show');
    document.getElementById('detail-cod').classList.remove('show');
    
    document.getElementById('detail-' + type).classList.add('show');
}

function copyVA() {
    const vaText = document.getElementById("va-number-text").innerText;
    navigator.clipboard.writeText(vaText);
    alert('Nomor Virtual Account ' + vaText + ' berhasil disalin!');
}

// ================= KONFIRMASI PEMBAYARAN DENGAN MODAL DI TENGAH =================
function prosesBayar() {
    // 1. Ambil elemen modal sukses
    const successModal = document.getElementById("paymentSuccessModal");
    
    if (successModal) {
        // 2. Tampilkan modal ke tengah layar
        successModal.style.display = "flex";
        
        // 3. Hapus data pesanan dari antrean karena sudah dibayar
        localStorage.removeItem("pesananAktif");

        // 4. Aksi ketika tombol "Ke Dashboard" di dalam modal diklik
        document.getElementById("btnKeDashboard").onclick = function() {
            window.location.href = "dashboard.html";
        };
    } else {
        // Backup jika elemen modal tidak sengaja terhapus
        alert("Pembayaran berhasil dikonfirmasi! Pesanan Anda sedang diproses.");
        localStorage.removeItem("pesananAktif");
        window.location.href = "dashboard.html";
    }
}