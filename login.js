// ======================================================
// SMART LAUNDRY - LOGIN.JS (OPTIMIZED & AUTO-SYNC)
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
                // Memanggil fungsi sinkronisasi data akun login
                prosesLoginSukses(userLogin.nama, userLogin.email);
            }, 1500);
        });
    }
});

// Fungsi pembantu untuk menyimpan state akun ke dalam memori browser
function prosesLoginSukses(usernameInput, emailInput) {
    // 1. Simpan data user yang berhasil masuk ke dalam memori browser (localStorage)
    localStorage.setItem("laundry_user_name", usernameInput);   // Menyimpan nama user
    localStorage.setItem("laundry_user_email", emailInput);     // Menyimpan email user
    localStorage.setItem("laundry_user_wallet", "150000");       // Menyimpan saldo awal default Rp 150.000
    localStorage.setItem("is_logged_in", "true");               // Penanda bahwa user sudah login
    
    alert("Login Berhasil!");
    
    // 2. Alihkan ke halaman dashboard
    window.location.href = "Dashboard.html";
}