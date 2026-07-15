// ===========================================
// SMART LAUNDRY
// REGISTER.JS
// ===========================================

document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("registerForm");

    const nama = document.getElementById("nama");

    const email = document.getElementById("email");

    const password = document.getElementById("password");

    const confirmPassword = document.getElementById("confirmPassword");

    const btn = document.querySelector(".auth-btn");

    // ================= PASSWORD =================

    function toggle(input, icon){

        icon.addEventListener("click", function(){

            if(input.type === "password"){

                input.type = "text";

                this.classList.replace("fa-eye","fa-eye-slash");

            }else{

                input.type = "password";

                this.classList.replace("fa-eye-slash","fa-eye");

            }

        });

    }

    toggle(password,document.getElementById("togglePassword"));

    toggle(confirmPassword,document.getElementById("toggleConfirm"));

    // ================= EMAIL =================

    function validEmail(email){

        const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    }

    // ================= REGISTER =================

    form.addEventListener("submit",function(e){

        e.preventDefault();

        if(nama.value.trim()==""){

            alert("Nama belum diisi.");

            nama.focus();

            return;

        }

        if(!validEmail(email.value)){

            alert("Email tidak valid.");

            email.focus();

            return;

        }

        if(password.value.length<6){

            alert("Password minimal 6 karakter.");

            password.focus();

            return;

        }

        if(password.value!==confirmPassword.value){

            alert("Konfirmasi password tidak sama.");

            confirmPassword.focus();

            return;

        }

        btn.disabled=true;

        btn.innerHTML="Membuat Akun...";

        setTimeout(function(){

            alert("Registrasi Berhasil!");

            window.location.href="Login.html";

        },1500);

    });

});