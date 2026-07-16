// ======================================================
// SMART LAUNDRY - BANTUAN.JS
// ======================================================

// Filter FAQ berdasarkan kata kunci pencarian (mencari di pertanyaan & jawaban)
function filterFaq() {
    const keyword = document.getElementById('searchFaq').value.trim().toLowerCase();
    const items = document.querySelectorAll('.help-faq-item');
    const categories = document.querySelectorAll('.help-faq-category');
    let visibleCount = 0;

    items.forEach(function (item) {
        const text = item.innerText.toLowerCase();
        const match = text.includes(keyword);
        item.style.display = match ? '' : 'none';
        if (match) visibleCount++;
    });

    // Sembunyikan label kategori jika semua FAQ di bawahnya tersembunyi
    categories.forEach(function (cat) {
        let el = cat.nextElementSibling;
        let anyVisible = false;
        while (el && el.classList.contains('help-faq-item')) {
            if (el.style.display !== 'none') anyVisible = true;
            el = el.nextElementSibling;
        }
        cat.style.display = anyVisible ? '' : 'none';
    });

    document.getElementById('noFaqResult').style.display = visibleCount === 0 ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {

    // ================= USER LOGIN =================
    const namaUser = localStorage.getItem('loginUser');
    if (namaUser) {
        document.getElementById('profileName').innerText = namaUser;
    }

    // ================= LIVE CHAT PLACEHOLDER =================
    const liveChatCard = document.getElementById('liveChatCard');
    if (liveChatCard) {
        liveChatCard.addEventListener('click', function () {
            alert('Fitur Live Chat akan segera hadir. Silakan hubungi kami via WhatsApp untuk saat ini.');
        });
    }

    // ================= LOGOUT MODAL =================
    const logoutBtn = document.getElementById('sidebarLogoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => { logoutModal.style.display = 'flex'; });
    }
    if (cancelLogout) {
        cancelLogout.addEventListener('click', () => { logoutModal.style.display = 'none'; });
    }
    if (confirmLogout) {
        confirmLogout.addEventListener('click', () => { window.location.href = 'Login.html'; });
    }

    window.addEventListener('click', function (event) {
        if (event.target == logoutModal) logoutModal.style.display = 'none';
    });

});