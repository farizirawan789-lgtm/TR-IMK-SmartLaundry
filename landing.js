// ======================================================
// SMART LAUNDRY
// LANDING.JS (Horizontal / Page-Swipe Mode)
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ================= NAVBAR SCROLL EFFECT =================
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollX > 50) {
            header.style.background = "#ffffff";
            header.style.boxShadow = "0 8px 20px rgba(0,0,0,.08)";
        } else {
            header.style.background = "#ffffff";
            header.style.boxShadow = "0 5px 15px rgba(0,0,0,.05)";
        }
    });

    // ================= SMOOTH HORIZONTAL SCROLL =================
    const menuLinks = document.querySelectorAll('nav a[href^="#"], .btn-order[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "start"
                });

                // Perbarui kelas active secara manual saat diklik agar instan
                menuLinks.forEach(item => item.classList.remove("active"));
                this.classList.add("active");
            }
        });
    });

    // ================= ANIMASI HERO (FADE-IN) =================
    const heroText = document.querySelector(".hero-text");
    const heroImage = document.querySelector(".hero-image");

    if (heroText) {
        heroText.classList.add("fade-in");
    }

    if (heroImage) {
        heroImage.classList.add("zoom-in");
    }

    // ================= BUTTON ORDER ALERT =================
    const orderButton = document.querySelector(".btn-order");

    if (orderButton && !orderButton.getAttribute("href").startsWith("#")) {
        orderButton.addEventListener("click", function (e) {
            e.preventDefault();
            alert("Halaman pemesanan akan segera tersedia.");
        });
    }

    // ================= SOLUSI BUG: DETEKSI SEKSI AKTIF YANG AKURAT =================
    // Menggunakan IntersectionObserver untuk memantau seksi mana yang sedang dominan tampil di layar
    const sections = document.querySelectorAll(".hero, #layanan, #harga, #faq");
    const navLinks = document.querySelectorAll("nav a");

    const observerOptions = {
        root: null, // Menggunakan viewport browser
        threshold: 0.6, // Seksi dianggap aktif jika 60% areanya terlihat di layar
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                // Hapus semua kelas active terlebih dahulu
                navLinks.forEach(link => link.classList.remove("active"));

                // Tambahkan kelas active hanya pada menu yang sesuai seksi aktif
                if (!id) {
                    // Jika tidak ada ID (berarti section Hero), aktifkan Beranda
                    const homeLink = document.querySelector('nav a[href="#"]');
                    if (homeLink) homeLink.classList.add("active");
                } else {
                    const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                    if (activeLink) activeLink.add("active");
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ================= HERO IMAGE EFFECT =================
    const heroImg = document.querySelector(".hero-image img");

    if (heroImg) {
        heroImg.addEventListener("mousemove", function () {
            heroImg.style.transform = "scale(1.03)";
        });

        heroImg.addEventListener("mouseleave", function () {
            heroImg.style.transform = "scale(1)";
        });
    }

});