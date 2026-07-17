document.addEventListener('DOMContentLoaded', () => {
    const dataAktifRaw = localStorage.getItem('pesananAktif');

    if (!dataAktifRaw) {
        document.getElementById('no-order-message').style.display = 'block';
        document.getElementById('active-payment-area').style.display = 'none';
        return;
    }

    const dataOrder = JSON.parse(dataAktifRaw);
    const orderId = dataOrder.id || dataOrder.idPesanan || '#SL-000000';

    document.getElementById('no-order-message').style.display = 'none';
    document.getElementById('active-payment-area').style.display = 'block';

    document.getElementById('header-order-id').innerText = orderId;
    document.getElementById('summary-id').innerText = orderId;

    const tampilkanBerat = dataOrder.berat ? ` (${dataOrder.berat})` : '';
    document.getElementById('summary-paket-nama').innerText = dataOrder.paket + tampilkanBerat;

    const subtotalPakaian = dataOrder.subtotal || dataOrder.hargaPaket || 0;
    const biayaOngkir = dataOrder.ongkir || dataOrder.antarJemput || 0;
    const biayaLayanan = dataOrder.biayaAplikasi || dataOrder.biayaLayanan || 2000;
    const diskonAwal = dataOrder.diskon || 0;

    document.getElementById('summary-paket-harga').innerText = 'Rp ' + subtotalPakaian.toLocaleString('id-ID');
    document.getElementById('summary-antarjemput').innerText = 'Rp ' + biayaOngkir.toLocaleString('id-ID');
    document.getElementById('summary-layanan').innerText = 'Rp ' + biayaLayanan.toLocaleString('id-ID');
    document.getElementById('summary-diskon').innerText = '- Rp ' + diskonAwal.toLocaleString('id-ID');
    document.getElementById('summary-total-bayar').innerText = 'Rp ' + dataOrder.totalAkhir.toLocaleString('id-ID');
    document.getElementById('summary-alamat').innerText = dataOrder.alamat || 'Alamat tidak diatur';

    const promoInput = document.querySelector('.promo-box input');
    const promoBtn = document.querySelector('.promo-box button');

    if (promoBtn && promoInput) {
        promoBtn.addEventListener('click', () => {
            const kodeMasuk = promoInput.value.trim().toUpperCase();

            if (kodeMasuk === 'SMART20') {
                const potonganDiskon = Math.round(subtotalPakaian * 0.2);
                const totalBaru = (subtotalPakaian + biayaOngkir + biayaLayanan) - potonganDiskon;

                dataOrder.diskon = potonganDiskon;
                dataOrder.totalAkhir = totalBaru;

                localStorage.setItem('pesananAktif', JSON.stringify(dataOrder));

                document.getElementById('summary-diskon').innerText = '- Rp ' + potonganDiskon.toLocaleString('id-ID');
                document.getElementById('summary-diskon').style.color = '#16A34A';
                document.getElementById('summary-total-bayar').innerText = 'Rp ' + totalBaru.toLocaleString('id-ID');

                promoInput.disabled = true;
                promoBtn.disabled = true;
                promoBtn.innerText = 'Dipakai';
                promoBtn.style.backgroundColor = '#16A34A';
                promoBtn.style.color = '#fff';

                alert('Selamat! Kode promo SMART20 berhasil digunakan. Anda mendapatkan diskon 20%.');
            } else {
                alert('Kode promo tidak valid atau salah! Silakan coba lagi.');
            }
        });
    }
});

function selectMethod(tipe, element) {
    document.querySelectorAll('.method-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.method-detail').forEach(detail => detail.classList.remove('show'));
    document.getElementById('detail-' + tipe).classList.add('show');
}

function prosesBayar() {
    const dataAktifRaw = localStorage.getItem('pesananAktif');
    if (!dataAktifRaw) return;
    const dataOrder = JSON.parse(dataAktifRaw);

    const orderId = dataOrder.id || dataOrder.idPesanan || '#SL-000000';
    const totalBayar = dataOrder.totalAkhir || 0;
    const kurirOpsi = (dataOrder.ongkir > 0 || dataOrder.antarJemput > 0) ? 'Antar Jemput Kurir' : 'Ambil Sendiri';

    const dataRiwayat = {
        id: orderId,
        tanggal: dataOrder.tanggal || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        paket: dataOrder.paket,
        qty: dataOrder.berat || '1 Kg',
        total: totalBayar,
        status: 'Proses',
        kurir: kurirOpsi,
        payment: 'Smart Payment'
    };

    let riwayatLama = JSON.parse(localStorage.getItem('riwayatPesanan')) || [];
    riwayatLama.unshift(dataRiwayat);

    localStorage.setItem('riwayatPesanan', JSON.stringify(riwayatLama));
    localStorage.removeItem('pesananAktif');

    document.getElementById('paymentSuccessModal').style.display = 'flex';
}

const btnDashboard = document.getElementById('btnKeDashboard');
if (btnDashboard) {
    btnDashboard.addEventListener('click', () => {
        window.location.href = 'riwayat.html';
    });
}