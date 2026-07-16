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
    if(status === 'Proses') badgeClass = 'badge-process';
    if(status === 'Selesai') badgeClass = 'badge-success-history';
    
    document.getElementById('m-status').innerHTML = `<span class="${badgeClass}">${status}</span>`;
    
    document.getElementById('historyDetailModal').style.display = 'flex';
}

// Inisialisasi Event Listener Modal
document.addEventListener("DOMContentLoaded", function() {
    const closeDetailBtn = document.getElementById('closeDetailModal');
    const detailModal = document.getElementById('historyDetailModal');

    if(closeDetailBtn && detailModal) {
        closeDetailBtn.addEventListener('click', () => {
            detailModal.style.display = 'none';
        });
    }

    // Modal Keluar / Logout Sidebar
    const logoutBtn = document.getElementById('sidebarLogoutBtn');
    const logoutModal = document.getElementById('logoutModalHistory');
    const cancelLogout = document.getElementById('cancelLogoutHistory');
    const confirmLogout = document.getElementById('confirmLogoutHistory');

    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logoutModal.style.display = 'flex';
        });
    }
    if(cancelLogout) {
        cancelLogout.addEventListener('click', () => {
            logoutModal.style.display = 'none';
        });
    }
    if(confirmLogout) {
        confirmLogout.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }
});