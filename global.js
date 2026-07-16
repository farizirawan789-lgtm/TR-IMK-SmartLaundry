// ======================================================
// SMART LAUNDRY - GLOBAL.JS (SINKRONISASI TANPA PROTEKSI)
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    // PROTEKSI DIHAPUS: Kamu bebas akses semua halaman tanpa harus login terlebih dahulu.

    // Ambil data terbaru dari storage jika ada
    const currentName = localStorage.getItem("laundry_user_name");
    const currentEmail = localStorage.getItem("laundry_user_email");
    const currentWallet = parseInt(localStorage.getItem("laundry_user_wallet")) || 0;

    // --- SINKRONISASI NAMA DI TOPBAR KANAN (Semua Halaman) ---
    const topbarNameElement = document.querySelector(".profile-top span");
    if (topbarNameElement && currentName) {
        topbarNameElement.innerText = currentName;
    }

    // --- SINKRONISASI DASHBOARD ---
    // Update nama ucapan selamat datang (id="welcomeName")
    const welcomeElement = document.getElementById("welcomeName");
    if (welcomeElement && currentName) {
        welcomeElement.innerText = "Halo, " + currentName + "!";
    }

    // Update nama di widget dashboard profil (id="profileName")
    const profileNameEl = document.getElementById("profileName");
    if (profileNameEl && currentName) {
        profileNameEl.innerText = currentName;
    }

    // --- SINKRONISASI EMAIL (Khusus halaman profile.html jika ada) ---
    const profileEmailInput = document.getElementById("pf-email");
    if (profileEmailInput && currentEmail) {
        profileEmailInput.value = currentEmail;
    }

    // --- SINKRONISASI SALDO WALLET (Semua Halaman) ---
    const walletElements = document.querySelectorAll(".wallet-card h2, #metodeMetode option[value='wallet']");
    walletElements.forEach(el => {
        if (el.tagName === "OPTION") {
            el.innerText = `Smart Wallet (Saldo: Rp ${currentWallet.toLocaleString('id-ID')})`;
        } else {
            el.innerText = `Rp ${currentWallet.toLocaleString('id-ID')}`;
        }
    });
});