document.addEventListener("DOMContentLoaded", function () {
    const nama = localStorage.getItem("laundry_user_name") || "";
    const email = localStorage.getItem("laundry_user_email") || "";
    const telepon = localStorage.getItem("laundry_user_phone") || "";
    const tanggal = localStorage.getItem("laundry_user_birth") || "";
    const alamat = localStorage.getItem("laundry_user_address") || "";

    if(document.getElementById("inputNama")) document.getElementById("inputNama").value = nama;
    if(document.getElementById("inputEmail")) document.getElementById("inputEmail").value = email;
    if(document.getElementById("inputTelepon")) document.getElementById("inputTelepon").value = telepon;
    if(document.getElementById("inputTanggalLahir")) document.getElementById("inputTanggalLahir").value = tanggal;
    if(document.getElementById("inputAlamat")) document.getElementById("inputAlamat").value = alamat;

    if(document.getElementById("profileHeaderName")) document.getElementById("profileHeaderName").textContent = nama || "Pengguna";
    if(document.getElementById("profileHeaderEmail")) document.getElementById("profileHeaderEmail").textContent = email || "-";

    const saveBtn = document.getElementById("saveProfileBtn");
    if (saveBtn) {
        saveBtn.addEventListener("click", function () {
            const namaBaru = document.getElementById("inputNama").value.trim();
            const emailBaru = document.getElementById("inputEmail").value.trim();
            const teleponBaru = document.getElementById("inputTelepon").value.trim();
            const tanggalBaru = document.getElementById("inputTanggalLahir").value;
            const alamatBaru = document.getElementById("inputAlamat").value.trim();

            localStorage.setItem("laundry_user_name", namaBaru);
            localStorage.setItem("laundry_user_email", emailBaru);
            localStorage.setItem("laundry_user_phone", teleponBaru);
            localStorage.setItem("laundry_user_birth", tanggalBaru);
            localStorage.setItem("laundry_user_address", alamatBaru);

            if(document.getElementById("profileHeaderName")) document.getElementById("profileHeaderName").textContent = namaBaru;
            if(document.getElementById("profileHeaderEmail")) document.getElementById("profileHeaderEmail").textContent = emailBaru;
            
            const topbar = document.getElementById("topbarProfileName") || document.getElementById("profileName") || document.querySelector(".profile-top span");
            if (topbar) topbar.textContent = namaBaru;

            alert("Profil berhasil diperbarui.");
        });
    }
});