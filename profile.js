// Sinkronisasi data form submission profil kustom
function saveProfile(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('pf-firstname').value;
    const lastName = document.getElementById('pf-lastname').value;
    
    const fullName = firstName + " " + lastName;
    document.querySelector('.user-fullname').innerText = fullName;
    
    // Memunculkan popup notifikasi kustom sukses
    document.getElementById('saveSuccessModal').style.display = 'flex';
}

function closeSuccessModal() {
    document.getElementById('saveSuccessModal').style.display = 'none';
}

// Kontrol Event Listener Modal Logout
document.addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.getElementById('sidebarLogoutBtn');
    const logoutModal = document.getElementById('logoutModalProfile');
    const cancelLogout = document.getElementById('cancelLogoutProfile');
    const confirmLogout = document.getElementById('confirmLogoutProfile');

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