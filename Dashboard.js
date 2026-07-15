// ======================================================
// SMART LAUNDRY
// DASHBOARD.JS (Updated for Desktop Version)
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ================= USER LOGIN =================
    const namaUser = localStorage.getItem("loginUser");

    if (namaUser) {
        document.getElementById("welcomeName").innerHTML =
        "Halo, " + namaUser + "! 👋";

        document.getElementById("profileName").innerHTML =
        namaUser;
    }

    // ================= MENU AKTIF SIDEBAR =================
    const menuItems = document.querySelectorAll(".sidebar ul li");

    menuItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
            // Catatan: Jika tag <a> memiliki href ke halaman lain (misal: order.html), 
            // biarkan browser berpindah halaman. Tapi kita pastikan status active tetap pindah.
            menuItems.forEach(function (i) {
                i.classList.remove("active");
            });
            this.classList.add("active");
        });
    });

    // ================= TOP UP MODAL SYSTEM =================
    const topupBtn = document.getElementById("topupBtn");
    const topupModal = document.getElementById("topupModal");
    const closeTopup = document.getElementById("closeTopup");
    const confirmTopup = document.getElementById("confirmTopup");

    let nominalTopup = 0;

    if (topupBtn) {
        topupBtn.addEventListener("click", function () {
            topupModal.style.display = "flex"; // Membuka modal dengan flex centering
        });
    }

    if (closeTopup) {
        closeTopup.addEventListener("click", function () {
            topupModal.style.display = "none";
        });
    }

    // Memilih nominal Top Up di dalam modal
    const nominalButtons = document.querySelectorAll(".nominal");

    nominalButtons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault(); // Mencegah aksi submit default form/button
            
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
            
            // Opsional reset pilihan setelah sukses
            nominalButtons.forEach(b => b.classList.remove("active"));
            nominalTopup = 0;
        });
    }

    // ================= LOGOUT MODAL SYSTEM =================
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

    // ================= NAVIGASI BUTTON & MENU CEPAT =================
    const detailBtn = document.getElementById("detailBtn");
    if (detailBtn) {
        detailBtn.addEventListener("click", function () {
            window.location.href = "detail.html";
        });
    }

    const historyBtn = document.getElementById("historyBtn");
    if (historyBtn) {
        historyBtn.addEventListener("click", function () {
            window.location.href = "riwayat.html";
        });
    }

    const quickMenu = document.querySelectorAll(".menu-card");
    quickMenu.forEach(function (menu) {
        menu.addEventListener("click", function () {
            const nama = this.innerText.trim();

            if (nama.includes("Pesanan") || nama.includes("Buat Pesanan")) {
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

    // ================= ADJUSTMENT: SMOOTH DESKTOP CARD HOVER =================
    // Mengubah inline style menjadi class manipulation agar transisi CSS dari style.css bekerja maksimal
    const cards = document.querySelectorAll(".menu-card, .wallet-card, .detail-card");

    cards.forEach(function (card) {
        card.style.transition = "all 0.3s ease"; // Memastikan efek transisi desktop halus
        
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-6px)";
            this.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.05)";
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0px)";
            this.style.boxShadow = "none";
        });
    });

    // ================= TUTUP MODAL KETIKA KLIK DI LUAR BOX =================
    window.addEventListener("click", function (event) {
        if (event.target == topupModal) {
            topupModal.style.display = "none";
        }
        if (event.target == logoutModal) {
            logoutModal.style.display = "none";
        }
    });

});