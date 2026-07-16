// ======================================================
// SMART LAUNDRY - PENGATURAN.JS
// ======================================================

const PENGATURAN_KEY = 'pengaturanAplikasi';

function getPengaturan() {
    const defaultSettings = {
        notifPesanan: true,
        notifPromo: true,
        notifWallet: true,
        darkMode: false,
        bahasa: 'id',
        shareLocation: true
    };
    const raw = localStorage.getItem(PENGATURAN_KEY);
    if (!raw) return defaultSettings;
    try {
        const parsed = JSON.parse(raw);
        return { ...defaultSettings, ...parsed };
    } catch (e) {
        return defaultSettings;
    }
}

function savePengaturan(data) {
    localStorage.setItem(PENGATURAN_KEY, JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', function () {

    // ================= USER LOGIN =================
    const namaUser = localStorage.getItem('loginUser');
    if (namaUser) {
        document.getElementById('profileName').innerText = namaUser;
    }

    // ================= MUAT PENGATURAN =================
    const settings = getPengaturan();
    document.getElementById('notifPesanan').checked = settings.notifPesanan;
    document.getElementById('notifPromo').checked = settings.notifPromo;
    document.getElementById('notifWallet').checked = settings.notifWallet;
    document.getElementById('darkMode').checked = settings.darkMode;
    document.getElementById('bahasaSelect').value = settings.bahasa;
    document.getElementById('shareLocation').checked = settings.shareLocation;

    // ================= SIMPAN PENGATURAN =================
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function () {
            const dataBaru = {
                notifPesanan: document.getElementById('notifPesanan').checked,
                notifPromo: document.getElementById('notifPromo').checked,
                notifWallet: document.getElementById('notifWallet').checked,
                darkMode: document.getElementById('darkMode').checked,
                bahasa: document.getElementById('bahasaSelect').value,
                shareLocation: document.getElementById('shareLocation').checked
            };
            savePengaturan(dataBaru);
            alert('Pengaturan berhasil disimpan.');
        });
    }

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

    window.addEventListener('click', function (event) {
        if (event.target == logoutModal) logoutModal.style.display = 'none';
    });

});