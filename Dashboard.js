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
    return 'badge-success';
}

function renderDashboardRiwayat() {
    const data = getRiwayatData();
    if (data.length === 0) return;

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

function updateWalletCardSaldo() {
    const saldoEl = document.querySelector('.wallet-card h2');
    if (saldoEl && typeof getWalletSaldo === 'function') {
        saldoEl.innerText = 'Rp ' + getWalletSaldo().toLocaleString('id-ID');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    renderDashboardRiwayat();
    updateWalletCardSaldo();

    const namaUser = localStorage.getItem("laundry_user_name");
    if (namaUser) {
        const welcomeNameEl = document.getElementById("welcomeName");
        if (welcomeNameEl) {
            welcomeNameEl.innerHTML = "Halo, " + namaUser + "! 👋";
        }

        const profileNameEl = document.getElementById("profileName");
        if (profileNameEl) {
            profileNameEl.innerHTML = namaUser;
        }
    }

    const menuItems = document.querySelectorAll(".sidebar ul li");
    menuItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
            menuItems.forEach(function (i) {
                i.classList.remove("active");
            });
            this.classList.add("active");
        });
    });

    const topupBtn = document.getElementById("topupBtn");
    const topupModal = document.getElementById("topupModal");
    const closeTopup = document.getElementById("closeTopup");
    const confirmTopup = document.getElementById("confirmTopup");

    let nominalTopup = 0;

    if (topupBtn) {
        topupBtn.addEventListener("click", function () {
            topupModal.style.display = "flex";
        });
    }

    if (closeTopup) {
        closeTopup.addEventListener("click", function () {
            topupModal.style.display = "none";
        });
    }

    const nominalButtons = document.querySelectorAll(".nominal");
    nominalButtons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
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
            const transaksi = catatTransaksiWallet('masuk', 'Top Up Smart Wallet', Number(nominalTopup), 'Transfer Bank');
            topupModal.style.display = "none";
            updateWalletCardSaldo();
            nominalButtons.forEach(b => b.classList.remove("active"));
            nominalTopup = 0;
            tampilkanNota(transaksi);
        });
    }

    const logoutBtn = document.getElementById("sidebarLogoutBtn") || document.querySelector(".logout-btn");
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
            localStorage.removeItem("is_logged_in");
            localStorage.removeItem("laundry_user_name");
            localStorage.removeItem("laundry_user_email");
            localStorage.removeItem("laundry_user_wallet");
            alert("Berhasil Logout");
            window.location.href = "login.html";
        });
    }

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
            } else if (nama.includes("Riwayat")) {
                window.location.href = "riwayat.html";
            } else if (nama.includes("Alamat")) {
                window.location.href = "profile.html";
            } else if (nama.includes("Promo")) {
                alert("Belum ada promo baru.");
            }
        });
    });

    const cards = document.querySelectorAll(".menu-card, .payment-card, .detail-card");
    cards.forEach(function (card) {
        card.style.transition = "all 0.3s ease";
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-6px)";
            this.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.05)";
        });
        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0px)";
            this.style.boxShadow = "none";
        });
    });

    window.addEventListener("click", function (event) {
        if (event.target == topupModal) {
            topupModal.style.display = "none";
        }
        if (event.target == logoutModal) {
            logoutModal.style.display = "none";
        }
    });
});