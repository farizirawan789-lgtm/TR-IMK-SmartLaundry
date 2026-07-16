// ======================================================
// LOGOUT (SmartLaundry)
// ======================================================
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById('sidebarLogoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const cancelBtn = document.getElementById('cancelLogout');
    const confirmBtn = document.getElementById('confirmLogout');

    if (logoutBtn && logoutModal) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault(); 
            logoutModal.style.display = 'flex'; 
        });
    }

    if (cancelBtn && logoutModal) {
        cancelBtn.addEventListener('click', function () {
            logoutModal.style.display = 'none'; 
        });
    }

    window.addEventListener('click', function (e) {
        if (e.target === logoutModal) {
            logoutModal.style.display = 'none';
        }
    });

    if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
            window.location.href = 'Landing.html';
        });
    }
});