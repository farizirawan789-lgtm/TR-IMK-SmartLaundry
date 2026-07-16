// ======================================================
// SMART LAUNDRY - WALLET.JS
// Menggunakan fungsi bersama dari nota.js
// ======================================================

function formatRupiah(nominal) {
    return 'Rp ' + Number(nominal).toLocaleString('id-ID');
}

function renderWalletPage() {
    // Saldo
    const saldo = getWalletSaldo();
    document.getElementById('walletSaldoText').innerText = formatRupiah(saldo);

    // Riwayat & Ringkasan
    const data = getWalletTransaksi();
    let totalMasuk = 0;
    let totalKeluar = 0;

    data.forEach(function (t) {
        if (t.tipe === 'masuk') totalMasuk += t.nominal;
        else totalKeluar += t.nominal;
    });

    document.getElementById('totalMasuk').innerText = formatRupiah(totalMasuk);
    document.getElementById('totalKeluar').innerText = formatRupiah(totalKeluar);
    document.getElementById('totalTransaksi').innerText = data.length;

    const listEl = document.getElementById('walletTxList');
    const emptyEl = document.getElementById('walletEmptyState');

    if (data.length === 0) {
        listEl.innerHTML = '';
        emptyEl.style.display = 'block';
        return;
    }
    emptyEl.style.display = 'none';

    listEl.innerHTML = data.map(function (t) {
        const iconClass = t.tipe === 'masuk' ? 'masuk' : 'keluar';
        const icon = t.tipe === 'masuk' ? 'fa-arrow-down' : 'fa-arrow-up';
        const sign = t.tipe === 'masuk' ? '+ ' : '- ';
        return `
            <div class="wallet-tx-row">
                <div class="wallet-tx-left">
                    <div class="wallet-tx-icon ${iconClass}"><i class="fa-solid ${icon}"></i></div>
                    <div>
                        <div class="wallet-tx-title">${t.keterangan}</div>
                        <div class="wallet-tx-date">${t.tanggal}, ${t.jam} WIB</div>
                    </div>
                </div>
                <div class="wallet-tx-right">
                    <div class="wallet-tx-amount ${iconClass}">${sign}${formatRupiah(t.nominal)}</div>
                    <button class="wallet-tx-view" data-id="${t.id}">Lihat Nota</button>
                </div>
            </div>
        `;
    }).join('');

    listEl.querySelectorAll('.wallet-tx-view').forEach(function (btn) {
        btn.addEventListener('click', function () {
            tampilkanNotaById(this.dataset.id);
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {

    renderWalletPage();

    // ================= USER LOGIN =================
    const namaUser = localStorage.getItem('loginUser');
    if (namaUser) {
        document.getElementById('profileName').innerText = namaUser;
    }

    // ================= TOP UP MODAL =================
    const topupBtn = document.getElementById('topupBtn');
    const topupModal = document.getElementById('topupModal');
    const closeTopup = document.getElementById('closeTopup');
    const confirmTopup = document.getElementById('confirmTopup');
    let nominalTopup = 0;

    if (topupBtn) {
        topupBtn.addEventListener('click', function () {
            topupModal.style.display = 'flex';
        });
    }
    if (closeTopup) {
        closeTopup.addEventListener('click', function () {
            topupModal.style.display = 'none';
        });
    }

    document.querySelectorAll('.nominal').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.nominal').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            nominalTopup = Number(this.dataset.value);
        });
    });

    if (confirmTopup) {
        confirmTopup.addEventListener('click', function () {
            if (!nominalTopup) {
                alert('Silakan pilih nominal Top Up.');
                return;
            }
            const transaksi = catatTransaksiWallet('masuk', 'Top Up Smart Wallet', nominalTopup, 'Transfer Bank');
            topupModal.style.display = 'none';
            document.querySelectorAll('.nominal').forEach(b => b.classList.remove('active'));
            nominalTopup = 0;

            renderWalletPage();
            tampilkanNota(transaksi);
        });
    }

    // ================= TARIK SALDO MODAL =================
    const tarikBtn = document.getElementById('tarikBtn');
    const tarikModal = document.getElementById('tarikModal');
    const closeTarik = document.getElementById('closeTarik');
    const confirmTarik = document.getElementById('confirmTarik');

    if (tarikBtn) {
        tarikBtn.addEventListener('click', function () {
            tarikModal.style.display = 'flex';
        });
    }
    if (closeTarik) {
        closeTarik.addEventListener('click', function () {
            tarikModal.style.display = 'none';
        });
    }
    if (confirmTarik) {
        confirmTarik.addEventListener('click', function () {
            const nominal = Number(document.getElementById('tarikNominal').value);
            const saldo = getWalletSaldo();

            if (!nominal || nominal < 10000) {
                alert('Nominal penarikan minimal Rp 10.000.');
                return;
            }
            if (nominal > saldo) {
                alert('Saldo Anda tidak mencukupi.');
                return;
            }

            const transaksi = catatTransaksiWallet('keluar', 'Penarikan Saldo ke Rekening', nominal, 'Transfer Bank');
            tarikModal.style.display = 'none';
            document.getElementById('tarikNominal').value = '';

            renderWalletPage();
            tampilkanNota(transaksi);
        });
    }

    // ================= MENU AKTIF SIDEBAR =================
    document.querySelectorAll('.sidebar ul li').forEach(function (item) {
        item.addEventListener('click', function () {
            document.querySelectorAll('.sidebar ul li').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ================= LOGOUT MODAL =================
    const logoutBtn = document.getElementById('sidebarLogoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => { logoutModal.style.display = 'flex'; });
    }
    if (cancelLogout) {
        cancelLogout.addEventListener('click', () => { logoutModal.style.display = 'none'; });
    }
    if (confirmLogout) {
        confirmLogout.addEventListener('click', () => { window.location.href = 'Login.html'; });
    }

    // ================= TUTUP MODAL KLIK LUAR =================
    window.addEventListener('click', function (event) {
        if (event.target == topupModal) topupModal.style.display = 'none';
        if (event.target == tarikModal) tarikModal.style.display = 'none';
        if (event.target == logoutModal) logoutModal.style.display = 'none';
    });

});