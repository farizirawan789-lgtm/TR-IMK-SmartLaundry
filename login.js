// ======================================================
// SMART LAUNDRY
// LOGIN.JS
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ================= ELEMENT =================

    const form = document.querySelector("form");
    const email = document.querySelector("input[type='email']");
    const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginButton = document.querySelector(".auth-btn");

    // ================= SHOW PASSWORD =================

    if (togglePassword) {

        togglePassword.addEventListener("click", function () {

            if (password.type === "password") {

                password.type = "text";
                this.classList.remove("fa-eye");
                this.classList.add("fa-eye-slash");

            } else {

                password.type = "password";
                this.classList.remove("fa-eye-slash");
                this.classList.add("fa-eye");

            }

        });

    }

    // ================= VALIDASI EMAIL =================

    function validEmail(emailUser) {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(emailUser);

    }

    // ================= LOGIN =================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (emailValue === "") {

            alert("Email masih kosong.");
            email.focus();
            return;

        }

        if (!validEmail(emailValue)) {

            alert("Format email tidak valid.");
            email.focus();
            return;

        }

        if (passwordValue === "") {

            alert("Password masih kosong.");
            password.focus();
            return;

        }

        if (passwordValue.length < 6) {

            alert("Password minimal 6 karakter.");
            password.focus();
            return;

        }

        // ================= LOADING =================

        loginButton.disabled = true;
        loginButton.innerHTML = "Memproses...";

        setTimeout(function () {

            alert("Login Berhasil!");

            window.location.href = "dashboard.html";

        }, 1500);

    });

    // ================= ENTER =================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            form.requestSubmit();

        }

    });

});