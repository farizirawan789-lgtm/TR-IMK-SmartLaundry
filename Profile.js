document.addEventListener("DOMContentLoaded", function () {

    // Ambil data dari Local Storage
    const nama = localStorage.getItem("laundry_user_name") || "";
    const email = localStorage.getItem("laundry_user_email") || "";
    const telepon = localStorage.getItem("laundry_user_phone") || "";
    const tanggal = localStorage.getItem("laundry_user_birth") || "";
    const alamat = localStorage.getItem("laundry_user_address") || "";
    
    // Isi Form
    document.getElementById("inputNama").value = nama;
    document.getElementById("inputEmail").value = email;
    document.getElementById("inputTelepon").value = telepon;
    document.getElementById("inputTanggalLahir").value = tanggal;
    document.getElementById("inputAlamat").value = alamat;

    // Header Profil
    document.getElementById("profileHeaderName").textContent = nama || "Pengguna";
    document.getElementById("profileHeaderEmail").textContent = email || "-";

    // Topbar
    document.getElementById("topbarProfileName").textContent = nama || "Pengguna";

    // Tombol Simpan
    document.getElementById("saveProfileBtn").addEventListener("click", function () {

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

        document.getElementById("profileHeaderName").textContent = namaBaru;
        document.getElementById("profileHeaderEmail").textContent = emailBaru;
        document.getElementById("topbarProfileName").textContent = namaBaru;

        alert("Profil berhasil diperbarui.");
    });

});