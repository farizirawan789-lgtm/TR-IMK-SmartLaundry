// ======================================================
// SMART LAUNDRY - LOGIN.JS (OPTIMIZED)
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const email = document.querySelector("input[type='email']");
    const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginButton = document.querySelector(".auth-btn");

    // ================= SHOW/HIDE PASSWORD =================
    if (togglePassword && password) {
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

    // ================= EMAIL REGEX VALIDATION =================
    function validEmail(emailUser) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emailUser);
    }

    // ================= LOGIN SUBMISSION PROCESS =================
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const emailValue = email.value.trim();
            const passwordValue = password.value.trim();

            // Validasi Input Kosong & Format
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

            // Pengecekan Database LocalStorage
            const daftarUser = JSON.parse(localStorage.getItem("users")) || [];
            const userLogin = daftarUser.find(function(user){
                return user.email === emailValue && user.password === passwordValue;
            });

            if (!userLogin) {
                alert("Email atau Password salah.");
                return;
            }

            // Trigger State Loading Animation
            loginButton.disabled = true;
            loginButton.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> Memproses...";

            setTimeout(function(){
                localStorage.setItem("loginUser", userLogin.nama);
                alert("Login Berhasil!");
                window.location.href = "Dashboard.html";
            }, 1500);
        });
    }
});