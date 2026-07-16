// ======================================================
// SHARED DATA LAYER (dipakai bersama oleh Dashboard.js, order.js, riwayat.js)
// Kunci ini yang membuat riwayat di semua halaman sinkron.
// ======================================================
const RIWAYAT_STORAGE_KEY = 'riwayatPesanan';

// Data awal (dipakai hanya sekali saat localStorage masih kosong)
const defaultRiwayat = [
    { id: '#SL-240502', tanggal: '05 Mei 2024', paket: 'Laundry Express', qty: '3 Kg', total: 40000, status: 'Proses', kurir: 'Antar Jemput Kurir', payment: 'Cash on Delivery' },
    { id: '#SL-240501', tanggal: '03 Mei 2024', paket: 'Laundry Cuci Komplit', qty: '5 Kg', total: 45000, status: 'Dijemput', kurir: 'Antar Jemput Kurir', payment: 'Smart Wallet' },
    { id: '#SL-240430', tanggal: '30 Apr 2024', paket: 'Laundry Cuci Komplit', qty: '3 Kg', total: 30000, status: 'Selesai', kurir: 'Drop di Outlet', payment: 'Smart Wallet' },
    { id: '#SL-240427', tanggal: '27 Apr 2024', paket: 'Laundry Express', qty: '4 Kg', total: 60000, status: 'Selesai', kurir: 'Antar Jemput Kurir', payment: 'Smart Wallet' },
    { id: '#SL-240420', tanggal: '20 Apr 2024', paket: 'Laundry Bedcover & Selimut', qty: '1 Pcs', total: 60000, status: 'Selesai', kurir: 'Drop di Outlet', payment: 'Cash on Delivery' }
];

// Ambil data riwayat dari localStorage. Kalau belum ada sama sekali, isi dengan data awal.
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

// Simpan array riwayat terbaru ke localStorage
function saveRiwayatData(data) {
    localStorage.setItem(RIWAYAT_STORAGE_KEY, JSON.stringify(data));
}

// Konversi status pesanan menjadi class badge yang sesuai
function badgeClassForStatus(status) {
    if (status === 'Proses') return 'badge-process';
    if (status === 'Dijemput') return 'badge-pickup';
    return 'badge-success-history'; // Selesai
}

// ======================================================
// RENDER TABEL RIWAYAT (menggantikan baris statis dengan data localStorage)
// ======================================================
function renderRiwayatTable() {
    const tbody = document.getElementById('historyTableBody');
    if (!tbody) return;

    const data = getRiwayatData();

    if (data.length === 0) {
        tbody.innerHTML = '';
        document.getElementById('noDataMessage').style.display = 'block';
        return;
    }

    tbody.innerHTML = data.map(item => `
        <tr class="history-row" data-status="${item.status}" data-invoice="${item.id.toLowerCase()}">
            <td><span class="invoice-id">${item.id}</span></td>
            <td>${item.tanggal}</td>
            <td><strong>${item.paket}</strong></td>
            <td>${item.qty}</td>
            <td><span class="amount-text">Rp ${Number(item.total).toLocaleString('id-ID')}</span></td>
            <td><span class="badge ${badgeClassForStatus(item.status)}">${item.status}</span></td>
            <td align="center"><button class="btn-action-view" data-id="${item.id}">Detail</button></td>
        </tr>
    `).join('');

    // Pasang event listener tombol Detail (menggantikan onclick inline agar aman dari data dinamis)
    tbody.querySelectorAll('.btn-action-view').forEach(btn => {
        btn.addEventListener('click', function () {
            const item = data.find(d => d.id === this.dataset.id);
            if (!item) return;
            openDetailModal(
                item.id, item.tanggal, item.paket, item.qty,
                'Rp ' + Number(item.total).toLocaleString('id-ID'),
                item.status, item.kurir, item.payment
            );
        });
    });

    // Terapkan ulang filter & pencarian yang sedang aktif
    applyFilters();
}

// Global State Filter Management
let currentStatusFilter = 'all';

// Fungsi Filter Berdasarkan Tombol Status Kategori
function filterStatus(status, element) {
    // Kelola tombol active
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    currentStatusFilter = status;
    applyFilters();
}

// Fungsi Utama Sinkronisasi Filter Status & Input Pencarian
function applyFilters() {
    const searchValue = document.getElementById('searchInvoice').value.trim().toLowerCase();
    const rows = document.querySelectorAll('.history-row');
    let dynamicVisibleCounter = 0;

    rows.forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        const rowInvoice = row.getAttribute('data-invoice').toLowerCase();

        const matchStatus = (currentStatusFilter === 'all' || rowStatus === currentStatusFilter);
        const matchSearch = rowInvoice.includes(searchValue);

        if (matchStatus && matchSearch) {
            row.style.display = '';
            dynamicVisibleCounter++;
        } else {
            row.style.display = 'none';
        }
    });

    // Menampilkan pesan data kosong jika hasil nihil
    const noDataMessage = document.getElementById('noDataMessage');
    if (dynamicVisibleCounter === 0) {
        noDataMessage.style.display = 'block';
    } else {
        noDataMessage.style.display = 'none';
    }
}

// Shortcut wrapper untuk event pencarian input
function filterHistory() {
    applyFilters();
}

// Fungsi membuka modal info rincian detail nota laundry
function openDetailModal(id, tgl, paket, qty, total, status, kurir, payment) {
    document.getElementById('m-id').innerText = id;
    document.getElementById('m-tgl').innerText = tgl;
    document.getElementById('m-paket').innerText = paket;
    document.getElementById('m-qty').innerText = qty;
    document.getElementById('m-total').innerText = total;
    document.getElementById('m-kurir').innerText = kurir;
    document.getElementById('m-payment').innerText = payment;

    // Memberikan badge status di dalam modal
    let badgeClass = 'badge-pickup';
    if (status === 'Proses') badgeClass = 'badge-process';
    if (status === 'Selesai') badgeClass = 'badge-success-history';

    document.getElementById('m-status').innerHTML = `<span class="${badgeClass}">${status}</span>`;

    document.getElementById('historyDetailModal').style.display = 'flex';
}

// Inisialisasi Event Listener Modal
document.addEventListener("DOMContentLoaded", function () {
    // Render tabel riwayat dari data localStorage (sinkron dengan Dashboard & order)
    renderRiwayatTable();

    const closeDetailBtn = document.getElementById('closeDetailModal');
    const detailModal = document.getElementById('historyDetailModal');

    if (closeDetailBtn && detailModal) {
        closeDetailBtn.addEventListener('click', () => {
            detailModal.style.display = 'none';
        });
    }

    // Modal Keluar / Logout Sidebar
    const logoutBtn = document.getElementById('sidebarLogoutBtn');
    const logoutModal = document.getElementById('logoutModalHistory');
    const cancelLogout = document.getElementById('cancelLogoutHistory');
    const confirmLogout = document.getElementById('confirmLogoutHistory');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logoutModal.style.display = 'flex';
        });
    }
    if (cancelLogout) {
        cancelLogout.addEventListener('click', () => {
            logoutModal.style.display = 'none';
        });
    }
    if (confirmLogout) {
        confirmLogout.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }
});