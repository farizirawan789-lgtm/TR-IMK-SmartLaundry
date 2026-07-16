// ======================================================
// SMART LAUNDRY - NOTA.JS
// Sistem Wallet & Transaksi Terpusat
// ======================================================

// ======================================================
// STORAGE KEYS
// ======================================================
const WALLET_SALDO_KEY = 'walletSaldo';
const WALLET_TRANSAKSI_KEY = 'walletTransaksi';

// Saldo awal
const SALDO_AWAL = 150000;

// ======================================================
// INISIALISASI WALLET
// ======================================================
function initWallet() {
    if (!localStorage.getItem(WALLET_SALDO_KEY)) {
        localStorage.setItem(WALLET_SALDO_KEY, SALDO_AWAL.toString());
    }
    if (!localStorage.getItem(WALLET_TRANSAKSI_KEY)) {
        localStorage.setItem(WALLET_TRANSAKSI_KEY, JSON.stringify([]));
    }
}

// Jalankan inisialisasi saat script dimuat
initWallet();

// ======================================================
// FUNGSI WALLET
// ======================================================

/**
 * Mendapatkan saldo wallet saat ini
 */
function getWalletSaldo() {
    const saldo = localStorage.getItem(WALLET_SALDO_KEY);
    return saldo ? Number(saldo) : SALDO_AWAL;
}

/**
 * Mengatur saldo wallet
 */
function setWalletSaldo(nominal) {
    localStorage.setItem(WALLET_SALDO_KEY, nominal.toString());
}

/**
 * Mendapatkan semua transaksi wallet
 */
function getWalletTransaksi() {
    const raw = localStorage.getItem(WALLET_TRANSAKSI_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

/**
 * Menyimpan transaksi ke localStorage
 */
function setWalletTransaksi(transaksi) {
    localStorage.setItem(WALLET_TRANSAKSI_KEY, JSON.stringify(transaksi));
}

/**
 * Membuat ID transaksi unik (TRX + timestamp)
 */
function generateTransaksiId() {
    const timestamp = Date.now().toString().slice(-8);
    return 'TRX' + timestamp;
}

/**
 * Mendapatkan tanggal dan jam sekarang
 */
function getTanggalJamSekarang() {
    const now = new Date();

    const hari = String(now.getDate()).padStart(2, '0');
    const bulan = String(now.getMonth() + 1).padStart(2, '0');
    const tahun = now.getFullYear();

    const jam = String(now.getHours()).padStart(2, '0');
    const menit = String(now.getMinutes()).padStart(2, '0');

    const bulanNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const hariNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const tanggalText = hariNames[now.getDay()] + ', ' + hari + ' ' + bulanNames[now.getMonth()] + ' ' + tahun;
    const jamText = jam + ':' + menit;

    return { tanggal: tanggalText, jam: jamText };
}

/**
 * Mencatat transaksi wallet (TOP UP atau TARIK SALDO)
 * @param {string} tipe - 'masuk' atau 'keluar'
 * @param {string} keterangan - Deskripsi transaksi
 * @param {number} nominal - Jumlah nominal
 * @param {string} metode - Metode pembayaran (misal: 'Transfer Bank')
 */
function catatTransaksiWallet(tipe, keterangan, nominal, metode) {
    const saldoSebelum = getWalletSaldo();
    let saldoSesudah;

    // Update saldo berdasarkan tipe transaksi
    if (tipe === 'masuk') {
        saldoSesudah = saldoSebelum + nominal;
    } else if (tipe === 'keluar') {
        saldoSesudah = saldoSebelum - nominal;
        // Validasi saldo tidak boleh negatif
        if (saldoSesudah < 0) {
            alert('Saldo tidak cukup!');
            return null;
        }
    } else {
        return null;
    }

    // Buat object transaksi
    const { tanggal, jam } = getTanggalJamSekarang();
    const transaksi = {
        id: generateTransaksiId(),
        tipe: tipe,
        keterangan: keterangan,
        nominal: nominal,
        metode: metode,
        tanggal: tanggal,
        jam: jam,
        saldoSebelum: saldoSebelum,
        saldoSesudah: saldoSesudah
    };

    // Simpan saldo baru
    setWalletSaldo(saldoSesudah);

    // Tambahkan transaksi ke daftar
    const daftarTransaksi = getWalletTransaksi();
    daftarTransaksi.unshift(transaksi); // Tambah ke depan (paling baru)
    setWalletTransaksi(daftarTransaksi);

    return transaksi;
}

// ======================================================
// FUNGSI NOTA / STRUK
// ======================================================

/**
 * Menampilkan modal nota untuk transaksi tertentu
 */
function tampilkanNota(transaksi) {
    if (!transaksi) {
        alert('Data transaksi tidak ditemukan');
        return;
    }

    // Update isi nota modal
    document.getElementById('nota-nominal').innerText =
        'Rp ' + Number(transaksi.nominal).toLocaleString('id-ID');

    document.getElementById('nota-id').innerText = transaksi.id;

    document.getElementById('nota-tanggal').innerText =
        transaksi.tanggal + ', ' + transaksi.jam + ' WIB';

    document.getElementById('nota-keterangan').innerText = transaksi.keterangan;

    document.getElementById('nota-metode').innerText = transaksi.metode;

    document.getElementById('nota-saldo').innerText =
        'Rp ' + Number(transaksi.saldoSesudah).toLocaleString('id-ID');

    // Update icon berdasarkan tipe transaksi
    const notaIcon = document.getElementById('nota-icon');
    if (notaIcon) {
        notaIcon.classList.remove('fa-circle-check', 'fa-circle-minus');
        if (transaksi.tipe === 'masuk') {
            notaIcon.classList.add('fa-circle-check');
        } else {
            notaIcon.classList.add('fa-circle-minus');
        }
    }

    // Buka modal nota
    const notaModal = document.getElementById('notaModal');
    if (notaModal) {
        notaModal.style.display = 'flex';
    }

    // Setup tombol close
    const closeButtons = document.querySelectorAll('.nota-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            notaModal.style.display = 'none';
        });
    });

    // Setup tombol print
    const printBtn = document.getElementById('nota-print-btn');
    if (printBtn) {
        printBtn.onclick = function () {
            cetakNota(transaksi);
        };
    }

    // Close modal ketika klik di luar
    notaModal.addEventListener('click', function (e) {
        if (e.target === notaModal) {
            notaModal.style.display = 'none';
        }
    });
}

/**
 * Menampilkan nota berdasarkan ID transaksi
 */
function tampilkanNotaById(transaksiId) {
    const daftarTransaksi = getWalletTransaksi();
    const transaksi = daftarTransaksi.find(t => t.id === transaksiId);

    if (transaksi) {
        tampilkanNota(transaksi);
    } else {
        alert('Transaksi tidak ditemukan');
    }
}

/**
 * Fungsi cetak nota (print browser)
 */
function cetakNota(transaksi) {
    const printWindow = window.open('', '', 'height=400,width=600');

    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Nota Transaksi - ${transaksi.id}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    max-width: 400px;
                }
                .nota-container {
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 8px;
                }
                .nota-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .nota-title {
                    font-size: 18px;
                    font-weight: bold;
                    margin: 10px 0;
                }
                .nota-nominal {
                    font-size: 24px;
                    font-weight: bold;
                    color: #4CAF50;
                    margin: 10px 0;
                }
                .nota-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px dotted #ddd;
                }
                .nota-row-label {
                    font-weight: 500;
                }
                hr {
                    margin: 15px 0;
                    border: none;
                    border-top: 1px dotted #ddd;
                }
                .nota-footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="nota-container">
                <div class="nota-header">
                    <div class="nota-title">NOTA TRANSAKSI</div>
                    <div class="nota-nominal">Rp ${Number(transaksi.nominal).toLocaleString('id-ID')}</div>
                </div>
                
                <div class="nota-row">
                    <span class="nota-row-label">ID Transaksi</span>
                    <span>${transaksi.id}</span>
                </div>
                <div class="nota-row">
                    <span class="nota-row-label">Waktu</span>
                    <span>${transaksi.tanggal}, ${transaksi.jam} WIB</span>
                </div>
                
                <hr>
                
                <div class="nota-row">
                    <span class="nota-row-label">Keterangan</span>
                    <span>${transaksi.keterangan}</span>
                </div>
                <div class="nota-row">
                    <span class="nota-row-label">Metode</span>
                    <span>${transaksi.metode}</span>
                </div>
                
                <hr>
                
                <div class="nota-row">
                    <span class="nota-row-label">Sisa Saldo Wallet</span>
                    <strong>Rp ${Number(transaksi.saldoSesudah).toLocaleString('id-ID')}</strong>
                </div>
                
                <div class="nota-footer">
                    <p>Terima kasih telah menggunakan Smart Laundry</p>
                    <p>${new Date().toLocaleString('id-ID')}</p>
                </div>
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
}

// ======================================================
// EXPORT UNTUK DEBUGGING (Optional)
// ======================================================
console.log('✅ nota.js loaded - Wallet System Ready');