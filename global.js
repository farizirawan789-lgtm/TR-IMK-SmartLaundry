// ======================================================
// SMART LAUNDRY - GLOBAL.JS
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const currentName =
        localStorage.getItem("laundry_user_name") || "Pengguna";

    const currentEmail =
        localStorage.getItem("laundry_user_email") || "-";

    const currentWallet =
        parseInt(localStorage.getItem("laundry_user_wallet")) || 0;

    // ===========================
    // TOPBAR
    // ===========================

    const topbar = document.getElementById("topbarProfileName");
    if (topbar) {
        topbar.textContent = currentName;
    }

    // ===========================
    // DASHBOARD
    // ===========================

    const welcome = document.getElementById("welcomeName");
    if (welcome) {
        welcome.textContent = "Halo, " + currentName + "!";
    }

    const profileName = document.getElementById("profileName");
    if (profileName) {
        profileName.textContent = currentName;
    }

    // ===========================
    // PROFILE PAGE
    // ===========================

    const profileHeaderName = document.getElementById("profileHeaderName");
    if (profileHeaderName) {
        profileHeaderName.textContent = currentName;
    }

    const profileHeaderEmail = document.getElementById("profileHeaderEmail");
    if (profileHeaderEmail) {
        profileHeaderEmail.textContent = currentEmail;
    }

    const inputNama = document.getElementById("inputNama");
    if (inputNama) {
        inputNama.value = currentName;
    }

    const inputEmail = document.getElementById("inputEmail");
    if (inputEmail) {
        inputEmail.value = currentEmail;
    }

    // ===========================
    // WALLET
    // ===========================

    const walletElements = document.querySelectorAll(
        ".wallet-card h2, #metodeMetode option[value='wallet']"
    );

    walletElements.forEach(el => {

        if (el.tagName === "OPTION") {

            el.textContent =
                `Smart Wallet (Saldo: Rp ${currentWallet.toLocaleString("id-ID")})`;

        } else {

            el.textContent =
                `Rp ${currentWallet.toLocaleString("id-ID")}`;

        }

    });

});