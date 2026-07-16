// ======================================================
// LOGOUT GLOBAL SYSTEM (SmartLaundry)
// ======================================================
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById('sidebarLogoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const cancelBtn = document.getElementById('cancelLogout');
    const confirmBtn = document.getElementById('confirmLogout');

    // 1. Ketika tombol Keluar di sidebar diklik
    if (logoutBtn && logoutModal) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah reload halaman default
            logoutModal.style.display = 'flex'; // Tampilkan modal
        });
    }

    // 2. Ketika tombol Batal diklik
    if (cancelBtn && logoutModal) {
        cancelBtn.addEventListener('click', function () {
            logoutModal.style.display = 'none'; // Sembunyikan modal
        });
    }

    // 3. Ketika di-klik di luar kotak modal, modal juga akan tertutup (opsional tapi bagus)
    window.addEventListener('click', function (e) {
        if (e.target === logoutModal) {
            logoutModal.style.display = 'none';
        }
    });

    // 4. Ketika konfirmasi keluar diklik, arahkan ke Landing.html
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
            // Hapus session/localStorage jika ada (opsional)
            // localStorage.removeItem('userLoggedIn');
            window.location.href = 'Landing.html';
        });
    }
});