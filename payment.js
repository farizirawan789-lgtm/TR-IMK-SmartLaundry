function selectMethod(type, el) {
    document.querySelectorAll('.method-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');

    document.querySelectorAll('.method-detail').forEach(d => d.classList.remove('show'));
    document.getElementById('detail-' + type).classList.add('show');
}

function copyVA() {
    navigator.clipboard.writeText('880812345678902');
    alert('Nomor Virtual Account disalin!');
}