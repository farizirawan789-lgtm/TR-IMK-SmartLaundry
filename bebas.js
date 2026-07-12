(function () {
    // ---------- DATA ----------
    let services = [
        { id: 's1', name: 'Cuci Reguler', price: 7000, unit: 'kg', icon: '🧺' },
        { id: 's2', name: 'Cuci Setrika', price: 9000, unit: 'kg', icon: '👕' },
        { id: 's3', name: 'Cuci Kilat (1 Hari)', price: 12000, unit: 'kg', icon: '⚡' },
        { id: 's4', name: 'Setrika Saja', price: 6000, unit: 'kg', icon: '🔥' },
        { id: 's5', name: 'Cuci Sepatu', price: 20000, unit: 'pasang', icon: '👟' },
        { id: 's6', name: 'Cuci Bed Cover', price: 25000, unit: 'pcs', icon: '🛏️' },
    ];

    let products = [
        { id: 'p1', name: 'Deterjen Sachet', price: 4000, stock: 40 },
        { id: 'p2', name: 'Pewangi Pakaian 250ml', price: 15000, stock: 18 },
        { id: 'p3', name: 'Hanger Plastik', price: 3000, stock: 5 },
        { id: 'p4', name: 'Kantong Laundry', price: 2000, stock: 8 },
        { id: 'p5', name: 'Pelicin Setrika', price: 12000, stock: 22 },
    ];

    let cart = []; // {id,name,price,qty,type}
    let transactions = [];
    let activeCategory = 'jasa';
    let trxCounter = 1;

    const rupiah = n => 'Rp ' + Math.round(n).toLocaleString('id-ID');

    // ---------- NAV ----------
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById('page-' + item.dataset.page).classList.add('active');
            if (item.dataset.page === 'riwayat') renderHistory();
            if (item.dataset.page === 'produk') renderProducts();
            if (item.dataset.page === 'dashboard') renderDashboard();
        });
    });

    // ---------- CLOCK ----------
    function tickClock() {
        const now = new Date();
        document.getElementById('timeNow').textContent = now.toLocaleTimeString('id-ID');
        document.getElementById('dateNow').textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
    tickClock();
    setInterval(tickClock, 1000);

    // ---------- CATALOG (TRANSAKSI PAGE) ----------
    const catalogGrid = document.getElementById('catalogGrid');
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.cat;
            renderCatalog();
        });
    });

    function renderCatalog() {
        catalogGrid.innerHTML = '';
        if (activeCategory === 'jasa') {
            services.forEach(s => {
                const el = document.createElement('div');
                el.className = 'item-card';
                el.innerHTML = `<div class="iname">${s.icon} ${s.name}</div>
          <div class="iprice">${rupiah(s.price)} / ${s.unit}</div>
          <div class="istock">Klik untuk tambah ke keranjang</div>`;
                el.addEventListener('click', () => addToCart({ id: s.id, name: s.name, price: s.price, type: 'jasa' }));
                catalogGrid.appendChild(el);
            });
        } else {
            products.forEach(p => {
                const low = p.stock <= 5;
                const el = document.createElement('div');
                el.className = 'item-card';
                el.style.opacity = p.stock <= 0 ? .45 : 1;
                el.innerHTML = `<div class="iname">🛍️ ${p.name}</div>
          <div class="iprice">${rupiah(p.price)}</div>
          <div class="istock">${p.stock <= 0 ? 'Stok habis' : 'Stok: ' + p.stock + ' pcs'} ${low && p.stock > 0 ? ' · menipis' : ''}</div>`;
                if (p.stock > 0) {
                    el.addEventListener('click', () => addToCart({ id: p.id, name: p.name, price: p.price, type: 'produk' }));
                }
                catalogGrid.appendChild(el);
            });
        }
    }

    // ---------- CART ----------
    function addToCart(item) {
        const existing = cart.find(c => c.id === item.id && c.type === item.type);
        if (existing) { existing.qty += 1; }
        else { cart.push({ ...item, qty: 1 }); }
        renderCart();
    }
    function changeQty(id, type, delta) {
        const c = cart.find(c => c.id === id && c.type === type);
        if (!c) return;
        c.qty += delta;
        if (c.qty <= 0) cart = cart.filter(x => !(x.id === id && x.type === type));
        renderCart();
    }
    function removeFromCart(id, type) {
        cart = cart.filter(x => !(x.id === id && x.type === type));
        renderCart();
    }

    const cartLines = document.getElementById('cartLines');
    const cartEmpty = document.getElementById('cartEmpty');
    const checkoutBtn = document.getElementById('checkoutBtn');

    function calcSubtotal() { return cart.reduce((s, c) => s + c.price * c.qty, 0); }

    function renderCart() {
        cartLines.innerHTML = '';
        cartEmpty.style.display = cart.length ? 'none' : 'block';
        cart.forEach(c => {
            const row = document.createElement('div');
            row.className = 'rline';
            row.innerHTML = `<span>${c.name} x${c.qty}</span><span>${rupiah(c.price * c.qty)}</span>`;
            cartLines.appendChild(row);
        });
        const subtotal = calcSubtotal();
        const discount = Number(document.getElementById('discountInput').value) || 0;
        const total = Math.max(subtotal - discount, 0);
        document.getElementById('sumSubtotal').textContent = rupiah(subtotal);
        document.getElementById('sumDiscount').textContent = rupiah(discount);
        document.getElementById('sumTotal').textContent = rupiah(total);
        checkoutBtn.disabled = cart.length === 0;
    }

    document.getElementById('discountInput').addEventListener('input', renderCart);
    document.getElementById('clearCartBtn').addEventListener('click', () => { cart = []; renderCart(); });

    // ---------- CHECKOUT ----------
    checkoutBtn.addEventListener('click', () => {
        const custName = document.getElementById('custName').value.trim() || 'Pelanggan Umum';
        const custPhone = document.getElementById('custPhone').value.trim();
        const payment = document.getElementById('paymentMethod').value;
        const subtotal = calcSubtotal();
        const discount = Number(document.getElementById('discountInput').value) || 0;
        const total = Math.max(subtotal - discount, 0);

        // reduce stock for produk items
        cart.forEach(c => {
            if (c.type === 'produk') {
                const p = products.find(p => p.id === c.id);
                if (p) p.stock = Math.max(p.stock - c.qty, 0);
            }
        });

        const trx = {
            id: 'TRX' + String(trxCounter).padStart(4, '0'),
            time: new Date(),
            customer: custName,
            phone: custPhone,
            items: [...cart],
            subtotal, discount, total,
            payment,
            hasJasa: cart.some(c => c.type === 'jasa'),
            hasProduk: cart.some(c => c.type === 'produk'),
        };
        trxCounter++;
        transactions.unshift(trx);

        showReceipt(trx);

        // reset
        cart = [];
        document.getElementById('discountInput').value = 0;
        document.getElementById('custName').value = '';
        document.getElementById('custPhone').value = '';
        renderCart();
        renderCatalog();
    });

    function showReceipt(trx) {
        const area = document.getElementById('printArea');
        let itemsHtml = trx.items.map(i => `<div class="rline"><span>${i.name} x${i.qty}</span><span>${rupiah(i.price * i.qty)}</span></div>`).join('');
        area.innerHTML = `
      <h3>SMART LAUNDRY</h3>
      <div class="sub">Jl. Bersih Cerah No. 88</div>
      <hr>
      <div class="rline"><span>No. Struk</span><span>${trx.id}</span></div>
      <div class="rline"><span>Waktu</span><span>${trx.time.toLocaleString('id-ID')}</span></div>
      <div class="rline"><span>Pelanggan</span><span>${trx.customer}</span></div>
      ${trx.phone ? `<div class="rline"><span>No. HP</span><span>${trx.phone}</span></div>` : ''}
      <hr>
      ${itemsHtml}
      <hr>
      <div class="rline"><span>Subtotal</span><span>${rupiah(trx.subtotal)}</span></div>
      <div class="rline"><span>Diskon</span><span>${rupiah(trx.discount)}</span></div>
      <div class="rline total"><span>TOTAL</span><span>${rupiah(trx.total)}</span></div>
      <div class="rline"><span>Bayar</span><span>${trx.payment}</span></div>
      <hr>
      <div style="text-align:center; margin-top:6px;">Terima kasih 🙏</div>
    `;
        document.getElementById('receiptModal').classList.add('show');
    }
    document.getElementById('closeReceiptBtn').addEventListener('click', () => {
        document.getElementById('receiptModal').classList.remove('show');
        renderDashboard();
    });
    document.getElementById('printBtn').addEventListener('click', () => window.print());

    // ---------- HISTORY ----------
    function renderHistory() {
        const body = document.getElementById('historyBody');
        const emptyEl = document.getElementById('historyEmpty');
        body.innerHTML = '';
        emptyEl.style.display = transactions.length ? 'none' : 'block';
        transactions.forEach(t => {
            const tr = document.createElement('tr');
            let typeBadge = '';
            if (t.hasJasa && t.hasProduk) typeBadge = `<span class="badge jasa">Jasa</span> <span class="badge produk">Produk</span>`;
            else if (t.hasJasa) typeBadge = `<span class="badge jasa">Jasa</span>`;
            else typeBadge = `<span class="badge produk">Produk</span>`;
            tr.innerHTML = `
        <td class="mono">${t.id}</td>
        <td>${t.time.toLocaleString('id-ID')}</td>
        <td>${t.customer}</td>
        <td>${typeBadge}</td>
        <td class="mono">${rupiah(t.total)}</td>
        <td><span class="badge lunas">${t.payment}</span></td>
        <td><button class="btn btn-ghost" style="width:auto; padding:6px 12px; font-size:12px;" data-id="${t.id}">Lihat</button></td>
      `;
            tr.querySelector('button').addEventListener('click', () => showReceipt(t));
            body.appendChild(tr);
        });
    }

    // ---------- PRODUK ----------
    function renderProducts() {
        const body = document.getElementById('productBody');
        body.innerHTML = '';
        products.forEach(p => {
            const low = p.stock <= 5;
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td>${p.name}</td>
        <td class="mono">${rupiah(p.price)}</td>
        <td class="mono">${p.stock} pcs</td>
        <td><span class="badge ${low ? 'low' : 'lunas'}">${low ? 'Stok Menipis' : 'Tersedia'}</span></td>
        <td>
          <button class="btn btn-ghost" style="width:auto; padding:6px 12px; font-size:12px;" data-act="restock" data-id="${p.id}">+10 Stok</button>
          <button class="btn btn-danger" style="width:auto; padding:6px 12px; font-size:12px;" data-act="del" data-id="${p.id}">Hapus</button>
        </td>
      `;
            body.appendChild(tr);
        });
        body.querySelectorAll('button[data-act="restock"]').forEach(b => {
            b.addEventListener('click', () => {
                const p = products.find(p => p.id === b.dataset.id);
                if (p) p.stock += 10;
                renderProducts(); renderDashboard();
            });
        });
        body.querySelectorAll('button[data-act="del"]').forEach(b => {
            b.addEventListener('click', () => {
                products = products.filter(p => p.id !== b.dataset.id);
                renderProducts(); renderDashboard();
            });
        });
    }

    document.getElementById('addProdBtn').addEventListener('click', () => {
        const name = document.getElementById('newProdName').value.trim();
        const price = Number(document.getElementById('newProdPrice').value);
        const stock = Number(document.getElementById('newProdStock').value);
        if (!name || !price) { alert('Nama dan harga produk wajib diisi.'); return; }
        products.push({ id: 'p' + Date.now(), name, price, stock: stock || 0 });
        document.getElementById('newProdName').value = '';
        document.getElementById('newProdPrice').value = '';
        document.getElementById('newProdStock').value = '';
        renderProducts();
    });

    // ---------- DASHBOARD ----------
    function renderDashboard() {
        const today = new Date().toDateString();
        const todayTrx = transactions.filter(t => t.time.toDateString() === today);
        const omzet = todayTrx.reduce((s, t) => s + t.total, 0);
        document.getElementById('statOmzet').textContent = rupiah(omzet);
        document.getElementById('statOmzetTrend').textContent = todayTrx.length ? todayTrx.length + ' transaksi tercatat' : 'Belum ada transaksi';
        document.getElementById('statTrx').textContent = todayTrx.length;

        let totalKg = 0;
        todayTrx.forEach(t => t.items.forEach(i => { if (i.type === 'jasa') totalKg += i.qty; }));
        document.getElementById('statKg').textContent = totalKg + ' unit';

        const lowStock = products.filter(p => p.stock <= 5);
        document.getElementById('statLow').textContent = lowStock.length;

        const recentBody = document.getElementById('dashboardRecentBody');
        recentBody.innerHTML = '';
        document.getElementById('dashboardEmpty').style.display = transactions.length ? 'none' : 'block';
        transactions.slice(0, 5).forEach(t => {
            const tr = document.createElement('tr');
            const typeLabel = t.hasJasa && t.hasProduk ? 'Jasa + Produk' : (t.hasJasa ? 'Jasa' : 'Produk');
            tr.innerHTML = `<td class="mono">${t.id}</td><td>${t.customer}</td><td>${typeLabel}</td><td class="mono">${rupiah(t.total)}</td>`;
            recentBody.appendChild(tr);
        });

        const lowBody = document.getElementById('lowStockBody');
        lowBody.innerHTML = '';
        lowStock.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${p.name}</td><td><span class="badge low">${p.stock} pcs</span></td>`;
            lowBody.appendChild(tr);
        });
        if (lowStock.length === 0) {
            lowBody.innerHTML = `<tr><td colspan="2" style="color:var(--slate);">Semua stok aman ✅</td></tr>`;
        }
    }

    // ---------- INIT ----------
    renderCatalog();
    renderCart();
    renderDashboard();
})();