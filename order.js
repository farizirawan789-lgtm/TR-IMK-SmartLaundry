// State Management untuk Order Form
let selectedPackageName = "Laundry Cuci Komplit";
let selectedPackagePrice = 35000;

// Fungsi memilih paket layanan laundry (Mengganti kelas active & update nilai dasar)
function selectPackage(element, name, price) {
    document.querySelectorAll('.package-row-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    
    selectedPackageName = name;
    selectedPackagePrice = price;
    
    calculateTotal();
}

// Fungsi menghitung subtotal pesanan secara real-time
function calculateTotal() {
    const qtyInput = document.getElementById('beratJumlah');
    let qty = parseInt(qtyInput.value) || 1;
    
    // Mencegah nilai minus atau nol
    if (qty < 1) {
        qty = 1;
        qtyInput.value = 1;
    }
    
    const serviceOption = document.getElementById('opsiAntarJemput').value;
    const ongkir = serviceOption === 'antar-jemput' ? 10000 : 0;
    
    const subtotal = selectedPackagePrice * qty;
    const total = subtotal + ongkir;
    
    // Update data ke panel ringkasan (Summary)
    document.getElementById('summaryPaket').innerText = selectedPackageName;
    document.getElementById('summaryHargaDasar').innerText = 'Rp ' + selectedPackagePrice.toLocaleString('id-ID');
    document.getElementById('summaryQty').innerText = qty;
    document.getElementById('summaryOngkir').innerText = 'Rp ' + ongkir.toLocaleString('id-ID');
    document.getElementById('summaryTotalText').innerText = 'Rp ' + total.toLocaleString('id-ID');
}

// Validasi Form & Trigger Modal Sukses Checkout
function prosesCheckout() {
    const alamat = document.getElementById('alamatLengkap').value.trim();
    if(!alamat) {
        alert('Silakan masukkan alamat penjemputan terlebih dahulu.');
        document.getElementById('alamatLengkap').focus();
        return;
    }
    
    // Menampilkan popup modal sukses jika valid
    document.getElementById('successModal').style.display = 'flex';
}

// Fungsionalitas Modal Keluar / Logout
document.addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.getElementById('sidebarLogoutBtn');
    const logoutModal = document.getElementById('logoutModalOrder');
    const cancelLogout = document.getElementById('cancelLogoutOrder');
    const confirmLogout = document.getElementById('confirmLogoutOrder');

    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logoutModal.style.display = 'flex';
        });
    }
    if(cancelLogout) {
        cancelLogout.addEventListener('click', () => {
            logoutModal.style.display = 'none';
        });
    }
    if(confirmLogout) {
        confirmLogout.addEventListener('click', () => {
            window.location.href = 'login.html'; // Pindah halaman
        });
    }
});