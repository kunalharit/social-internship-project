// Live Search Logic
function filterItems() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        let desc = cards[i].getElementsByTagName('p')[0].innerText.toLowerCase();
        
        if (title.includes(input) || desc.includes(input)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// Dark Mode Logic
function toggleTheme() {
    let body = document.body;
    let btn = document.querySelector('.theme-toggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        btn.innerText = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        btn.innerText = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    }
}

if (localStorage.getItem('theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    document.querySelector('.theme-toggle').innerText = '☀️ Light Mode';
}

// --- GOOGLE SHEET FORM SUBMISSION LOGIC ---
// Dost ko yahan apni Google Apps Script ki URL dalni hogi baad mein
const scriptURL = 'https://script.google.com/macros/s/AKfycbwhWHdB7OMIZPJDxBJrW0a35Gk0DlfxpwvqpU9_Jkb8uRKz5ZHtT95huT7BEdG9JzADJg/exec'; 
const form = document.forms['google-sheet-form'];
const btn = document.getElementById('submitBtn');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.innerText = "Sending...";
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.style.display = "block";
            btn.innerText = "Send Inquiry";
            form.reset();
            setTimeout(function(){
                msg.style.display = "none";
            }, 5000); // 5 second baad message gayab
        })
        .catch(error => {
            console.error('Error!', error.message);
            btn.innerText = "Error! Try Again.";
        });
});