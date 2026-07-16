// ======================================================
// SMART LAUNDRY - ORDER.JS (CALCULATION & ROUTING)
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("laundryOrderForm");
    const selectPaket = document.getElementById("selectPaket");
    const inputBerat = document.getElementById("inputBerat");
    const selectEkspedisi = document.getElementById("selectEkspedisi");
    const inputAlamat = document.getElementById("inputAlamat");

  
    const pPaket = document.getElementById("preview-paket");
    const pHargaKg = document.getElementById("preview-harga-per-kg");
    const pSubtotal = document.getElementById("preview-subtotal-pakaian");
    const pOngkir = document.getElementById("preview-ongkir");
    const pTotal = document.getElementById("preview-total-akhir");

    const biayaAplikasi = 2000;

    
    function cekOpsiPengiriman() {
        
        const grupAlamat = inputAlamat.parentElement;

        if (selectEkspedisi.value === "Ambil Sendiri") {
         
            grupAlamat.style.display = "none";
            inputAlamat.removeAttribute("required");

        
            inputAlamat.value = "Ambil sendiri ke toko / Outlet SmartLaundry.";
        } else {

            grupAlamat.style.display = "block";
            inputAlamat.setAttribute("required", "true");

           
            if (inputAlamat.value === "Ambil sendiri ke toko / Outlet SmartLaundry.") {
                inputAlamat.value = "";
            }
        }
    }


    function hitungEstimasi() {
        const paketTerpilih = selectPaket.value;
        const hargaPerKg = parseInt(selectPaket.options[selectPaket.selectedIndex]?.getAttribute("data-harga")) || 0;
        const berat = parseInt(inputBerat.value) || 0;
        const ongkir = parseInt(selectEkspedisi.options[selectEkspedisi.selectedIndex]?.getAttribute("data-ongkir")) || 0;

        const subtotalPakaian = hargaPerKg * berat;
        const totalAkhir = subtotalPakaian + ongkir + biayaAplikasi;

  
        const satuan = (paketTerpilih.includes("Sepatu") || paketTerpilih.includes("Jaket") || paketTerpilih.includes("Bedcover") || paketTerpilih.includes("Noda")) ? "Pcs/Pasang" : "Kg";

        pPaket.innerText = paketTerpilih ? `${paketTerpilih} (${berat} ${satuan})` : "-";
        pHargaKg.innerText = "Rp " + hargaPerKg.toLocaleString('id-ID');
        pSubtotal.innerText = "Rp " + subtotalPakaian.toLocaleString('id-ID');
        pOngkir.innerText = "Rp " + ongkir.toLocaleString('id-ID');
        pTotal.innerText = "Rp " + (paketTerpilih && berat > 0 ? totalAkhir.toLocaleString('id-ID') : "0");
    }

   
    selectPaket.addEventListener("change", hitungEstimasi);
    inputBerat.addEventListener("input", hitungEstimasi);

   
    selectEkspedisi.addEventListener("change", function () {
        hitungEstimasi();
        cekOpsiPengiriman();
    });

  
    cekOpsiPengiriman();

    
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const paketTerpilih = selectPaket.value;
        const hargaPerKg = parseInt(selectPaket.options[selectPaket.selectedIndex].getAttribute("data-harga")) || 0;
        const berat = parseInt(inputBerat.value) || 0;
        const ongkir = parseInt(selectEkspedisi.options[selectEkspedisi.selectedIndex].getAttribute("data-ongkir")) || 0;

        const satuan = (paketTerpilih.includes("Sepatu") || paketTerpilih.includes("Jaket") || paketTerpilih.includes("Bedcover") || paketTerpilih.includes("Noda")) ? "Pcs/Pasang" : "Kg";
        const subtotalPakaian = hargaPerKg * berat;
        const totalAkhir = subtotalPakaian + ongkir + biayaAplikasi;

        const generatedID = "#SL-" + Math.floor(100000 + Math.random() * 900000);
        const tanggalOrder = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

        const dataPemesanan = {
            id: generatedID,
            tanggal: tanggalOrder,
            paket: paketTerpilih,
            berat: `${berat} ${satuan}`,
            subtotal: subtotalPakaian,
            ongkir: ongkir,
            diskon: 0,
            biayaAplikasi: biayaAplikasi,
            totalAkhir: totalAkhir,
            alamat: inputAlamat.value 
        };

        localStorage.setItem("pesananAktif", JSON.stringify(dataPemesanan));
        window.location.href = "payment.html";
    });
});