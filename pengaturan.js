// Validasi & Trigger Ubah Kata Sandi Akun
function changePassword(event) {
    event.preventDefault();
    
    const newPass = document.getElementById('st-newpass').value;
    const confirmPass = document.getElementById('st-confirmpass').value;
    
    // Validasi apakah password baru dan konfirmasi cocok
    if (newPass !== confirmPass) {
        alert("Konfirmasi kata sandi baru tidak cocok! Periksa kembali.");
        document.getElementById('st-confirmpass').focus();
        return;
    }
    
    // Memunculkan popup modal sukses
    document.getElementById('settingsSuccessModal').style.display = 'flex';
    document.getElementById('passwordForm').reset();
}

function closeSettingsModal() {
    document.getElementById('settingsSuccessModal').style.display = 'none';
}

// Kontrol Event Listener Modal Logout
document.addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.getElementById('sidebarLogoutBtn');
    const logoutModal = document.getElementById('logoutModalSettings');
    const cancelLogout = document.getElementById('cancelLogoutSettings');
    const confirmLogout = document.getElementById('confirmLogoutSettings');

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