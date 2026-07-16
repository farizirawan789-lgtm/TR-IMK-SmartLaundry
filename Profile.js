// ======================================================
// SMART LAUNDRY - PROFILE.JS
// ======================================================

const PROFILE_DATA_KEY = 'profilData';

function getProfilData() {
    const namaUser = localStorage.getItem('loginUser') || 'Pengguna SmartLaundry';
    const raw = localStorage.getItem(PROFILE_DATA_KEY);
    const defaultData = {
        nama: namaUser,
        email: '',
        telepon: '',
        tanggalLahir: '',
        alamat: ''
    };
    if (!raw) return defaultData;
    try {
        const parsed = JSON.parse(raw);
        return { ...defaultData, ...parsed };
    } catch (e) {
        return defaultData;
    }
}

function saveProfilData(data) {
    localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', function () {

    // ================= MUAT DATA PROFIL =================
    const profil = getProfilData();

    document.getElementById('inputNama').value = profil.nama;
    document.getElementById('inputEmail').value = profil.email;
    document.getElementById('inputTelepon').value = profil.telepon;
    document.getElementById('inputTanggalLahir').value = profil.tanggalLahir;
    document.getElementById('inputAlamat').value = profil.alamat;

    document.getElementById('profileHeaderName').innerText = profil.nama;
    document.getElementById('profileHeaderEmail').innerText = profil.email || 'Belum ada email tersimpan';
    document.getElementById('topbarProfileName').innerText = profil.nama;

    // ================= SIMPAN PROFIL =================
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function () {
            const nama = document.getElementById('inputNama').value.trim();

            if (nama === '') {
                alert('Nama tidak boleh kosong.');
                return;
            }

            const dataBaru = {
                nama: nama,
                email: document.getElementById('inputEmail').value.trim(),
                telepon: document.getElementById('inputTelepon').value.trim(),
                tanggalLahir: document.getElementById('inputTanggalLahir').value,
                alamat: document.getElementById('inputAlamat').value.trim()
            };

            saveProfilData(dataBaru);
            localStorage.setItem('loginUser', nama);

            document.getElementById('profileHeaderName').innerText = nama;
            document.getElementById('profileHeaderEmail').innerText = dataBaru.email || 'Belum ada email tersimpan';
            document.getElementById('topbarProfileName').innerText = nama;

            alert('Perubahan profil berhasil disimpan.');
        });
    }

    // ================= UBAH PASSWORD =================
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function () {
            const passLama = document.getElementById('passwordLama').value;
            const passBaru = document.getElementById('passwordBaru').value;

            if (!passLama || !passBaru) {
                alert('Lengkapi kedua kolom password terlebih dahulu.');
                return;
            }
            if (passBaru.length < 6) {
                alert('Password baru minimal 6 karakter.');
                return;
            }

            alert('Password berhasil diperbarui.');
            document.getElementById('passwordLama').value = '';
            document.getElementById('passwordBaru').value = '';
        });
    }

    // ================= HAPUS AKUN =================
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const deleteAccountModal = document.getElementById('deleteAccountModal');
    const cancelDeleteAccount = document.getElementById('cancelDeleteAccount');
    const confirmDeleteAccount = document.getElementById('confirmDeleteAccount');

    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function () {
            deleteAccountModal.style.display = 'flex';
        });
    }
    if (cancelDeleteAccount) {
        cancelDeleteAccount.addEventListener('click', function () {
            deleteAccountModal.style.display = 'none';
        });
    }
    if (confirmDeleteAccount) {
        confirmDeleteAccount.addEventListener('click', function () {
            localStorage.clear();
            window.location.href = 'Login.html';
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

    // ================= TUTUP MODAL KLIK LUAR =================
    window.addEventListener('click', function (event) {
        if (event.target == logoutModal) logoutModal.style.display = 'none';
        if (event.target == deleteAccountModal) deleteAccountModal.style.display = 'none';
    });

});