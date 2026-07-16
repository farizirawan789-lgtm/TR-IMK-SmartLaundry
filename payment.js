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

const btnCetak = document.getElementById('btnCetakStruk');
if (btnCetak) {
    btnCetak.addEventListener('click', () => {
        const idPesanan = document.getElementById('summary-id').innerText;
        const paketNama = document.getElementById('summary-paket-nama').innerText;
        const paketHarga = document.getElementById('summary-paket-harga').innerText;
        const diskonTeks = document.getElementById('summary-diskon').innerText;
        const ongkir = document.getElementById('summary-antarjemput').innerText;
        const layanan = document.getElementById('summary-layanan').innerText;
        const total = document.getElementById('summary-total-bayar').innerText;
        const tanggal = new Date().toLocaleDateString('id-ID');

        const printWindow = window.open('', '_blank', 'width=400,height=600');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Struk ${idPesanan}</title>
                <style>
                    body {
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 14px;
                        color: #000;
                        width: 100%;
                        max-width: 300px;
                        margin: 0 auto;
                        padding: 20px 10px;
                    }
                    .text-center { text-align: center; }
                    .bold { font-weight: bold; }
                    .dashed-line { border-top: 1px dashed #000; margin: 12px 0; }
                    table { width: 100%; border-collapse: collapse; }
                    td { padding: 4px 0; vertical-align: top; }
                    .col-right { text-align: right; }
                </style>
            </head>
            <body>
                <div class="text-center">
                    <h2 style="margin: 0; font-size: 18px;">SMART LAUNDRY</h2>
                    <p style="margin: 5px 0;">Jl. Diponegoro No. 1, Salatiga</p>
                </div>
                <div class="dashed-line"></div>
                <table>
                    <tr><td>TANGGAL:</td><td class="col-right">${tanggal}</td></tr>
                    <tr><td>NO. INV:</td><td class="col-right">${idPesanan}</td></tr>
                    <tr><td>METODE:</td><td class="col-right">SMART PAYMENT</td></tr>
                </table>
                <div class="dashed-line"></div>
                <table>
                    <tr><td style="width: 60%;">${paketNama}</td><td class="col-right" style="width: 40%;">${paketHarga}</td></tr>
                    <tr><td>Layanan Antar Jemput</td><td class="col-right">${ongkir}</td></tr>
                    <tr><td>Biaya Admin</td><td class="col-right">${layanan}</td></tr>
                    <tr><td>Diskon Promo</td><td class="col-right" style="color: #000;">${diskonTeks}</td></tr>
                </table>
                <div class="dashed-line"></div>
                <table>
                    <tr><td class="bold">TOTAL:</td><td class="col-right bold" style="font-size: 16px;">${total}</td></tr>
                </table>
                <br>
                <div class="text-center">
                    <p>*** TERIMA KASIH ***</p>
                    <p style="font-size: 11px;">Simpan struk ini sebagai bukti</p>
                </div>
                <script>
                    window.onload = function() { window.print(); };
                    window.onafterprint = function() { window.close(); };
                <\/script>
            </body>
            </html>
        `);
        printWindow.document.close();
    });
}

const btnDashboard = document.getElementById('btnKeDashboard');
if (btnDashboard) {
    btnDashboard.addEventListener('click', () => {
        window.location.href = 'riwayat.html';
    });
}