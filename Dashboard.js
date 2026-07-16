// ======================================================
// SMART LAUNDRY
// DASHBOARD.JS (Updated for Desktop Version)
// ======================================================

// ======================================================
// SHARED DATA LAYER (harus identik dengan yang ada di riwayat.js & order.js)
// ======================================================
const RIWAYAT_STORAGE_KEY = 'riwayatPesanan';

const defaultRiwayat = [
    { id: '#SL-240502', tanggal: '05 Mei 2024', paket: 'Laundry Express', qty: '3 Kg', total: 40000, status: 'Proses', kurir: 'Antar Jemput Kurir', payment: 'Cash on Delivery' },
    { id: '#SL-240501', tanggal: '03 Mei 2024', paket: 'Laundry Cuci Komplit', qty: '5 Kg', total: 45000, status: 'Dijemput', kurir: 'Antar Jemput Kurir', payment: 'Smart Wallet' },
    { id: '#SL-240430', tanggal: '30 Apr 2024', paket: 'Laundry Cuci Komplit', qty: '3 Kg', total: 30000, status: 'Selesai', kurir: 'Drop di Outlet', payment: 'Smart Wallet' },
    { id: '#SL-240427', tanggal: '27 Apr 2024', paket: 'Laundry Express', qty: '4 Kg', total: 60000, status: 'Selesai', kurir: 'Antar Jemput Kurir', payment: 'Smart Wallet' },
    { id: '#SL-240420', tanggal: '20 Apr 2024', paket: 'Laundry Bedcover & Selimut', qty: '1 Pcs', total: 60000, status: 'Selesai', kurir: 'Drop di Outlet', payment: 'Cash on Delivery' }
];

function getRiwayatData() {
    const raw = localStorage.getItem(RIWAYAT_STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(RIWAYAT_STORAGE_KEY, JSON.stringify(defaultRiwayat));
        return [...defaultRiwayat];
    }
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [...defaultRiwayat];
    } catch (e) {
        return [...defaultRiwayat];
    }
}

function badgeClassForStatus(status) {
    if (status === 'Proses') return 'badge-process';
    if (status === 'Dijemput') return 'badge-pickup';
    return 'badge-success'; // Selesai (memakai class asli yg sudah ada di style.css Dashboard)
}

// Isi kartu "Pesanan Terakhir" + tabel "Riwayat Terakhir" pakai data localStorage bersama
function renderDashboardRiwayat() {
    const data = getRiwayatData();
    if (data.length === 0) return;

    // --- Kartu Pesanan Terakhir (item paling baru = index 0) ---
    const terakhir = data[0];
    const cardTerakhir = document.querySelector('.grid-left .detail-card');
    if (cardTerakhir) {
        const paragraphs = cardTerakhir.querySelectorAll('p');
        const judul = cardTerakhir.querySelector('h4');
        const badge = cardTerakhir.querySelector('.badge');

        if (judul) judul.innerText = terakhir.id;
        if (paragraphs[0]) paragraphs[0].innerText = terakhir.paket + ' • ' + terakhir.qty;
        if (paragraphs[1]) paragraphs[1].innerHTML = '<i class="fa-regular fa-calendar"></i> ' + terakhir.tanggal;
        if (badge) {
            badge.innerText = terakhir.status;
            badge.className = 'badge ' + badgeClassForStatus(terakhir.status);
        }
    }

    // --- Tabel Riwayat Terakhir (3 teratas) ---
    const tbody = document.querySelector('.history-table tbody');
    if (tbody) {
        tbody.innerHTML = data.slice(0, 3).map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.paket} • ${item.qty}</td>
                <td><span class="badge ${badgeClassForStatus(item.status)}">${item.status}</span></td>
                <td><strong>Rp${Number(item.total).toLocaleString('id-ID')}</strong></td>
            </tr>
        `).join('');
    }
}

// Menampilkan saldo Smart Wallet terkini pada kartu wallet Dashboard (sinkron dgn halaman Wallet)
function updateWalletCardSaldo() {
    const saldoEl = document.querySelector('.wallet-card h2');
    if (saldoEl && typeof getWalletSaldo === 'function') {
        saldoEl.innerText = 'Rp ' + getWalletSaldo().toLocaleString('id-ID');
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // Tampilkan pesanan terakhir & riwayat singkat dari localStorage (sinkron dgn order.js & riwayat.js)
    renderDashboardRiwayat();
    updateWalletCardSaldo();

    // ================= USER LOGIN =================
    const namaUser = localStorage.getItem("loginUser");

    if (namaUser) {
        document.getElementById("welcomeName").innerHTML =
            "Halo, " + namaUser + "! 👋";

        document.getElementById("profileName").innerHTML =
            namaUser;
    }

    // ================= MENU AKTIF SIDEBAR =================
    const menuItems = document.querySelectorAll(".sidebar ul li");

    menuItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
            // Catatan: Jika tag <a> memiliki href ke halaman lain (misal: order.html), 
            // biarkan browser berpindah halaman. Tapi kita pastikan status active tetap pindah.
            menuItems.forEach(function (i) {
                i.classList.remove("active");
            });
            this.classList.add("active");
        });
    });

    // ================= TOP UP MODAL SYSTEM =================
    const topupBtn = document.getElementById("topupBtn");
    const topupModal = document.getElementById("topupModal");
    const closeTopup = document.getElementById("closeTopup");
    const confirmTopup = document.getElementById("confirmTopup");

    let nominalTopup = 0;

    if (topupBtn) {
        topupBtn.addEventListener("click", function () {
            topupModal.style.display = "flex"; // Membuka modal dengan flex centering
        });
    }

    if (closeTopup) {
        closeTopup.addEventListener("click", function () {
            topupModal.style.display = "none";
        });
    }

    // Memilih nominal Top Up di dalam modal
    const nominalButtons = document.querySelectorAll(".nominal");

    nominalButtons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault(); // Mencegah aksi submit default form/button

            nominalButtons.forEach(function (b) {
                b.classList.remove("active");
            });

            this.classList.add("active");
            nominalTopup = this.dataset.value;
        });
    });

    if (confirmTopup) {
        confirmTopup.addEventListener("click", function () {
            if (nominalTopup == 0) {
                alert("Silakan pilih nominal Top Up.");
                return;
            }

            // Catat transaksi ke wallet bersama (sinkron dengan halaman Wallet) via nota.js
            const transaksi = catatTransaksiWallet('masuk', 'Top Up Smart Wallet', Number(nominalTopup), 'Transfer Bank');

            topupModal.style.display = "none";
            updateWalletCardSaldo();

            // Opsional reset pilihan setelah sukses
            nominalButtons.forEach(b => b.classList.remove("active"));
            nominalTopup = 0;

            tampilkanNota(transaksi);
        });
    }

    // ================= LOGOUT MODAL SYSTEM =================
    const logoutBtn = document.querySelector(".logout-btn");
    const logoutModal = document.getElementById("logoutModal");
    const cancelLogout = document.getElementById("cancelLogout");
    const confirmLogout = document.getElementById("confirmLogout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            logoutModal.style.display = "flex";
        });
    }

    if (cancelLogout) {
        cancelLogout.addEventListener("click", function () {
            logoutModal.style.display = "none";
        });
    }

    if (confirmLogout) {
        confirmLogout.addEventListener("click", function () {
            alert("Berhasil Logout");
            window.location.href = "Login.html";
        });
    }

    // ================= NAVIGASI BUTTON & MENU CEPAT =================
    const detailBtn = document.getElementById("detailBtn");
    if (detailBtn) {
        detailBtn.addEventListener("click", function () {
            window.location.href = "detail.html";
        });
    }

    const historyBtn = document.getElementById("historyBtn");
    if (historyBtn) {
        historyBtn.addEventListener("click", function () {
            window.location.href = "riwayat.html";
        });
    }

    const quickMenu = document.querySelectorAll(".menu-card");
    quickMenu.forEach(function (menu) {
        menu.addEventListener("click", function () {
            const nama = this.innerText.trim();

            if (nama.includes("Pesanan") || nama.includes("Buat Pesanan")) {
                window.location.href = "order.html";
            }
            else if (nama.includes("Riwayat")) {
                window.location.href = "riwayat.html";
            }
            else if (nama.includes("Alamat")) {
                window.location.href = "profile.html";
            }
            else if (nama.includes("Promo")) {
                alert("Belum ada promo baru.");
            }
        });
    });

    // ================= ADJUSTMENT: SMOOTH DESKTOP CARD HOVER =================
    // Mengubah inline style menjadi class manipulation agar transisi CSS dari style.css bekerja maksimal
    const cards = document.querySelectorAll(".menu-card, .payment-card, .detail-card");

    cards.forEach(function (card) {
        card.style.transition = "all 0.3s ease"; // Memastikan efek transisi desktop halus

        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-6px)";
            this.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.05)";
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0px)";
            this.style.boxShadow = "none";
        });
    });

    // ================= TUTUP MODAL KETIKA KLIK DI LUAR BOX =================
    window.addEventListener("click", function (event) {
        if (event.target == topupModal) {
            topupModal.style.display = "none";
        }
        if (event.target == logoutModal) {
            logoutModal.style.display = "none";
        }
    });

});