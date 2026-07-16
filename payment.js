document.addEventListener('DOMContentLoaded', () => {
    const dataAktifRaw = localStorage.getItem('pesananAktif');

    // Jika tidak ada pesanan, tampilkan pesan kosong
    if (!dataAktifRaw) {
        document.getElementById('no-order-message').style.display = 'block';
        document.getElementById('active-payment-area').style.display = 'none';
        return;
    }

    // Ekstrak data pesanan dari localStorage
    const dataOrder = JSON.parse(dataAktifRaw);

    // Dapatkan data ID secara fleksibel (mengantisipasi id atau idPesanan)
    const orderId = dataOrder.id || dataOrder.idPesanan || '#SL-000000';

    document.getElementById('no-order-message').style.display = 'none';
    document.getElementById('active-payment-area').style.display = 'block';

    // Cetak data ke elemen HTML di halaman Payment
    document.getElementById('header-order-id').innerText = orderId;
    document.getElementById('summary-id').innerText = orderId;

    // Memastikan format tampilan paket dan berat rapi
    const tampilkanBerat = dataOrder.berat ? ` (${dataOrder.berat})` : '';
    document.getElementById('summary-paket-nama').innerText = dataOrder.paket + tampilkanBerat;

    document.getElementById('summary-paket-harga').innerText = 'Rp ' + (dataOrder.subtotal || dataOrder.hargaPaket || 0).toLocaleString('id-ID');
    document.getElementById('summary-antarjemput').innerText = 'Rp ' + (dataOrder.ongkir || dataOrder.antarJemput || 0).toLocaleString('id-ID');
    document.getElementById('summary-layanan').innerText = 'Rp ' + (dataOrder.biayaAplikasi || dataOrder.biayaLayanan || 2000).toLocaleString('id-ID');
    document.getElementById('summary-total-bayar').innerText = 'Rp ' + (dataOrder.totalAkhir || 0).toLocaleString('id-ID');
    document.getElementById('summary-alamat').innerText = dataOrder.alamat || 'Alamat tidak diatur';
});

// Fungsi Interaktif Klik Metode Pembayaran
function selectMethod(tipe, element) {
    document.querySelectorAll('.method-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.method-detail').forEach(detail => detail.classList.remove('show'));
    document.getElementById('detail-' + tipe).classList.add('show');
}

// Fungsi Eksekusi Tombol Konfirmasi Pembayaran
function prosesBayar() {
    const dataAktifRaw = localStorage.getItem('pesananAktif');
    if (!dataAktifRaw) return;
    const dataOrder = JSON.parse(dataAktifRaw);

    const orderId = dataOrder.id || dataOrder.idPesanan || '#SL-000000';
    const totalBayar = dataOrder.totalAkhir || 0;
    const kurirOpsi = (dataOrder.ongkir > 0 || dataOrder.antarJemput > 0) ? 'Antar Jemput Kurir' : 'Ambil Sendiri';

    // Siapkan data untuk disuntikkan ke Riwayat Pesanan
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

    // Ambil riwayat lama dari localStorage, lalu masukkan yang baru ke baris paling atas
    let riwayatLama = JSON.parse(localStorage.getItem('riwayatPesanan')) || [];
    riwayatLama.unshift(dataRiwayat);

    // Simpan permanen ke localStorage riwayatPesanan
    localStorage.setItem('riwayatPesanan', JSON.stringify(riwayatLama));

    // Hapus pesanan aktif karena transaksi sudah dibayar
    localStorage.removeItem('pesananAktif');

    // Tampilkan Modal Sukses Pembayaran
    document.getElementById('paymentSuccessModal').style.display = 'flex';
}

// Jalankan fungsi cetak struk kasir
const btnCetak = document.getElementById('btnCetakStruk');
if (btnCetak) {
    btnCetak.addEventListener('click', () => {
        const idPesanan = document.getElementById('summary-id').innerText;
        const paketNama = document.getElementById('summary-paket-nama').innerText;
        const paketHarga = document.getElementById('summary-paket-harga').innerText;
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

// Navigasi Kembali ke Riwayat Pesanan
const btnDashboard = document.getElementById('btnKeDashboard');
if (btnDashboard) {
    btnDashboard.addEventListener('click', () => {
        window.location.href = 'riwayat.html';
    });
}