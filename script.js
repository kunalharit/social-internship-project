// Dark Mode Logic
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const btn = document.getElementById('toggleBtn');
    if (document.body.classList.contains('dark-theme')) {
        btn.textContent = '☀️ Light Mode';
    } else {
        btn.textContent = '🌙 Dark Mode';
    }
}

// Live Search Filtering Logic
function filterItems() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        let desc = cards[i].getElementsByTagName('p')[0].innerText.toLowerCase();
        
        // If the search matches the title or description, show it, otherwise hide it.
        if (title.includes(input) || desc.includes(input)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}