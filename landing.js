// ======================================================
// SMART LAUNDRY
// LANDING.JS
// ======================================================

// Tunggu sampai halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    // ================= NAVBAR SCROLL =================

    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 20) {

            header.style.background = "#ffffff";
            header.style.boxShadow = "0 8px 20px rgba(0,0,0,.08)";

        } else {

            header.style.background = "#ffffff";
            header.style.boxShadow = "0 5px 15px rgba(0,0,0,.05)";

        }

    });

    // ================= SMOOTH SCROLL =================

    const menu = document.querySelectorAll('nav a[href^="#"]');

    menu.forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    // ================= ANIMASI HERO =================

    const heroText = document.querySelector(".hero-text");
    const heroImage = document.querySelector(".hero-image");

    if (heroText) {

        heroText.classList.add("fade-in");

    }

    if (heroImage) {

        heroImage.classList.add("zoom-in");

    }

    // ================= BUTTON ORDER =================

    const orderButton = document.querySelector(".btn-order");

    if (orderButton) {

        orderButton.addEventListener("click", function (e) {

            e.preventDefault();

            alert("Halaman pemesanan akan segera tersedia.");

        });

    }

    // ================= ACTIVE MENU =================

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item => item.classList.remove("active"));

            this.classList.add("active");

        });

    });

    // ================= CARD HOVER =================

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-8px)";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0px)";

        });

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

// ======================================================
// END OF FILE
// ======================================================