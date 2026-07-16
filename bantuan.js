// Logika interaktivitas akordeon FAQ
function toggleFaq(headerElement) {
    const parentRow = headerElement.parentElement;
    
    // Toggle class active pada baris FAQ yang diklik
    parentRow.classList.toggle('active');
}

// Logika Modal Logout
document.addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.getElementById('sidebarLogoutBtn');
    const logoutModal = document.getElementById('logoutModalHelp');
    const cancelLogout = document.getElementById('cancelLogoutHelp');
    const confirmLogout = document.getElementById('confirmLogoutHelp');

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