// global.js - Taruh kode ini untuk sinkronisasi nama dan saldo di semua halaman

document.addEventListener("DOMContentLoaded", function () {
    // 1. Cek apakah sudah ada data nama di storage, jika belum buat data default
    if (!localStorage.getItem("laundry_user_name")) {
        localStorage.setItem("laundry_user_name", "Kris Tri Timotius");
    }
    
    // 2. Cek apakah sudah ada data saldo di storage, jika belum buat data default
    if (!localStorage.getItem("laundry_user_wallet")) {
        localStorage.setItem("laundry_user_wallet", "150000");
    }

    // Ambil data terbaru dari storage
    const currentName = localStorage.getItem("laundry_user_name");
    const currentWallet = parseInt(localStorage.getItem("laundry_user_wallet"));

    // --- SINKRONISASI NAMA ---
    // Update nama di Topbar kanan (berlaku untuk semua halaman)
    const topbarNameElement = document.querySelector(".profile-top span");
    if (topbarNameElement) {
        topbarNameElement.innerText = currentName;
    }

    // Update nama ucapan selamat datang di Dashboard (jika elemennya ada)
    const welcomeElement = document.getElementById("welcomeName");
    if (welcomeElement) {
        welcomeElement.innerText = "Halo, " + currentName + "!";
    }

    // --- SINKRONISASI SALDO WALLET ---
    // Update saldo di halaman Dashboard atau Ringkasan Order (jika elemennya ada)
    const walletElements = document.querySelectorAll(".wallet-card h2, #metodeMetode option[value='wallet']");
    walletElements.forEach(el => {
        if (el.tagName === "OPTION") {
            el.innerText = `Smart Wallet (Saldo: Rp ${currentWallet.toLocaleString('id-ID')})`;
        } else {
            el.innerText = `Rp ${currentWallet.toLocaleString('id-ID')}`;
        }
    });
});