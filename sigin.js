// ===========================================
// SMART LAUNDRY - REGISTER.JS (OPTIMIZED)
// ===========================================

document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("registerForm");
    const nama = document.getElementById("nama");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const btn = document.querySelector(".auth-btn");

    // ================= SHOW / HIDE PASSWORD =================
    function toggle(input, icon){
        if(input && icon) {
            icon.addEventListener("click", function(){
                if(input.type === "password"){
                    input.type = "text";
                    this.classList.replace("fa-eye", "fa-eye-slash");
                } else {
                    input.type = "password";
                    this.classList.replace("fa-eye-slash", "fa-eye");
                }
            });
        }
    }

    toggle(password, document.getElementById("togglePassword"));
    toggle(confirmPassword, document.getElementById("toggleConfirm"));

    // ================= VALIDASI FORMAT EMAIL =================
    function validEmail(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ================= PROSES REGISTRASI USER =================
    if(form) {
        form.addEventListener("submit", function(e){
            e.preventDefault();

            if(nama.value.trim() == ""){
                alert("Nama belum diisi.");
                nama.focus();
                return;
            }

            if(!validEmail(email.value)){
                alert("Email tidak valid.");
                email.focus();
                return;
            }

            if(password.value.length < 6){
                alert("Password minimal 6 karakter.");
                password.focus();
                return;
            }

            if(password.value !== confirmPassword.value){
                alert("Konfirmasi password tidak sama.");
                confirmPassword.focus();
                return;
            }

            // Ubah Status Ke Animasi Loading
            btn.disabled = true;
            btn.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> Membuat Akun...";

            setTimeout(function(){
                const akunBaru = {
                    nama: nama.value.trim(),
                    email: email.value.trim(),
                    password: password.value
                };

                // Ambil data dari LocalStorage
                let daftarUser = JSON.parse(localStorage.getItem("users")) || [];

                // Cek Validasi Email Duplikat
                const sudahAda = daftarUser.find(user => user.email === akunBaru.email);

                if(sudahAda){
                    alert("Email sudah digunakan.");
                    // Kembalikan tombol ke keadaan semula agar bisa dicoba lagi
                    btn.disabled = false;
                    btn.innerHTML = "Daftar";
                    email.focus();
                    return;
                }

                // Masukkan Akun ke Array & Simpan
                daftarUser.push(akunBaru);
                localStorage.setItem("users", JSON.stringify(daftarUser));

                alert("Registrasi Berhasil!");
                window.location.href = "Login.html";

            }, 1500);
        });
    }
});