// Fungsi Trigger Simpan Perubahan Form Profil
function saveProfile(event) {
    event.preventDefault(); // Mencegah reload form bawaan
    
    // Dapatkan data input (Bisa diekspansi untuk integrasi backend)
    const firstName = document.getElementById('pf-firstname').value;
    const lastName = document.getElementById('pf-lastname').value;
    
    // Perbarui nama di header topbar & profil card secara real-time
    const fullName = firstName + " " + lastName;
    document.querySelector('.user-fullname').innerText = fullName;
    
    // Tampilkan modal pop-up sukses
    document.getElementById('saveSuccessModal').style.display = 'flex';
}

// Fungsi Menutup Modal Sukses
function closeSuccessModal() {
    document.getElementById('saveSuccessModal').style.display = 'none';
}

// Fungsionalitas Kontrol Modal Logout Sidebar
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