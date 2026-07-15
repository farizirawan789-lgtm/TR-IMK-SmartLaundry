// ======================================================
// SMART LAUNDRY
// DASHBOARD.JS
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

        // ================= USER LOGIN =================

    const namaUser = localStorage.getItem("loginUser");

    if(namaUser){

        document.getElementById("welcomeName").innerHTML =
        "Halo, " + namaUser + "! 👋";

        document.getElementById("profileName").innerHTML =
        namaUser;

    }

    // ================= MENU AKTIF =================

    const menuItems = document.querySelectorAll(".sidebar ul li");

    menuItems.forEach(function (item) {

        item.addEventListener("click", function () {

            menuItems.forEach(function (i) {
                i.classList.remove("active");
            });

            this.classList.add("active");

        });

    });

    // ================= TOP UP =================

    const topupBtn = document.getElementById("topupBtn");
    const topupModal = document.getElementById("topupModal");
    const closeTopup = document.getElementById("closeTopup");
    const confirmTopup = document.getElementById("confirmTopup");

    let nominalTopup = 0;

    if (topupBtn) {

        topupBtn.addEventListener("click", function () {

            topupModal.style.display = "flex";

        });

    }

    if (closeTopup) {

        closeTopup.addEventListener("click", function () {

            topupModal.style.display = "none";

        });

    }

    const nominalButtons = document.querySelectorAll(".nominal");

    nominalButtons.forEach(function (btn) {

        btn.addEventListener("click", function () {

            nominalButtons.forEach(function (b) {

                b.classList.remove("active");

            });

            this.classList.add("active");

            nominalTopup = this.dataset.value;

        });

    });

    if (confirmTopup) {

        confirmTopup.addEventListener("click", function () {

            if (nominalTopup == 0) {

                alert("Silakan pilih nominal Top Up.");

                return;

            }

            alert("Top Up Rp " + Number(nominalTopup).toLocaleString("id-ID") + " berhasil.");

            topupModal.style.display = "none";

        });

    }

    // ================= LOGOUT =================

    const logoutBtn = document.querySelector(".logout-btn");
    const logoutModal = document.getElementById("logoutModal");
    const cancelLogout = document.getElementById("cancelLogout");
    const confirmLogout = document.getElementById("confirmLogout");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            logoutModal.style.display = "flex";

        });

    }

    if (cancelLogout) {

        cancelLogout.addEventListener("click", function () {

            logoutModal.style.display = "none";

        });

    }

    if (confirmLogout) {

        confirmLogout.addEventListener("click", function () {

            alert("Berhasil Logout");

            window.location.href = "Login.html";

        });

    }

    // ================= DETAIL PESANAN =================

    const detailBtn = document.getElementById("detailBtn");

    if (detailBtn) {

        detailBtn.addEventListener("click", function () {

            window.location.href = "detail.html";

        });

    }

    // ================= RIWAYAT =================

    const historyBtn = document.getElementById("historyBtn");

    if (historyBtn) {

        historyBtn.addEventListener("click", function () {

            window.location.href = "riwayat.html";

        });

    }

    // ================= MENU CEPAT =================

    const quickMenu = document.querySelectorAll(".menu-card");

    quickMenu.forEach(function (menu) {

        menu.addEventListener("click", function () {

            const nama = this.innerText.trim();

            if (nama.includes("Pesanan")) {

                window.location.href = "order.html";

            }

            else if (nama.includes("Riwayat")) {

                window.location.href = "riwayat.html";

            }

            else if (nama.includes("Alamat")) {

                window.location.href = "profile.html";

            }

            else if (nama.includes("Promo")) {

                alert("Belum ada promo baru.");

            }

        });

    });

    // ================= HOVER CARD =================

    const cards = document.querySelectorAll(".menu-card, .wallet-card, .detail-card");

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-5px)";

            this.style.transition = ".3s";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0px)";

        });

    });

    // ================= TUTUP MODAL =================

    window.addEventListener("click", function (event) {

        if (event.target == topupModal) {

            topupModal.style.display = "none";

        }

        if (event.target == logoutModal) {

            logoutModal.style.display = "none";

        }

    });

});