// profile.js - Versi Sinkronisasi Semua Halaman (Mendukung global.js)

// Fungsi Trigger Simpan Perubahan Form Profil
function saveProfile(event) {
    event.preventDefault(); // Mencegah reload form bawaan
    
    const firstName = document.getElementById('pf-firstname').value;
    const lastName = document.getElementById('pf-lastname').value;
    const fullName = firstName + " " + lastName;
    
    // 1. SIMPAN NAMA BARU KE MEMORI BROWSER
    localStorage.setItem("laundry_user_name", fullName);
    
    // Perbarui nama di kartu profil kiri secara real-time
    document.querySelector('.user-fullname').innerText = fullName;
    
    // Perbarui juga nama di topbar kanan secara instan
    const topbarName = document.querySelector('.profile-top span');
    if (topbarName) {
        topbarName.innerText = fullName;
    }
    
    // Memunculkan popup notifikasi kustom sukses[cite: 15]
    document.getElementById('saveSuccessModal').style.display = 'flex'; //[cite: 15]
}

function closeSuccessModal() {
    document.getElementById('saveSuccessModal').style.display = 'none'; //[cite: 15]
}

// Kontrol Event Listener untuk memuat data & modal logout[cite: 15]
document.addEventListener("DOMContentLoaded", function() {
    // --- AMBIL DATA DARI LOCALSTORAGE SAAT HALAMAN DIBUKA ---
    const storedName = localStorage.getItem("laundry_user_name");
    if (storedName) {
        // Pasang nama di profil card kiri
        const userFullnameEl = document.querySelector('.user-fullname');
        if (userFullnameEl) userFullnameEl.innerText = storedName;
        
        // Pecah nama kembali untuk dimasukkan ke form input
        const nameParts = storedName.split(" ");
        if (nameParts.length > 0) {
            const firstNameInput = document.getElementById('pf-firstname');
            const lastNameInput = document.getElementById('pf-lastname');
            
            if (firstNameInput) firstNameInput.value = nameParts[0];
            if (lastNameInput) {
                // Gabungkan sisa kata jika nama belakangnya terdiri dari beberapa kata
                lastNameInput.value = nameParts.slice(1).join(" ");
            }
        }
    }

    // --- LOGIKA MODAL LOGOUT BAWAANMU ---[cite: 15]
    const logoutBtn = document.getElementById('sidebarLogoutBtn'); //[cite: 15]
    const logoutModal = document.getElementById('logoutModalProfile'); //[cite: 15]
    const cancelLogout = document.getElementById('cancelLogoutProfile'); //[cite: 15]
    const confirmLogout = document.getElementById('confirmLogoutProfile'); //[cite: 15]

    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logoutModal.style.display = 'flex'; //[cite: 15]
        });
    }
    if(cancelLogout) {
        cancelLogout.addEventListener('click', () => {
            logoutModal.style.display = 'none'; //[cite: 15]
        });
    }
    if(confirmLogout) {
        confirmLogout.addEventListener('click', () => {
            window.location.href = 'login.html'; //[cite: 15]
        });
    }
});