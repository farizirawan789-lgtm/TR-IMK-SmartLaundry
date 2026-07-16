// Logika interaktivitas akordeon FAQ
function toggleFaq(headerElement) {
    const parentRow = headerElement.parentElement;
    
    // Toggle class active pada baris FAQ yang diklik
    parentRow.classList.toggle('active');
}