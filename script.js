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

// --- FETCH INVENTORY FROM GOOGLE SHEET (PUBLISHED AS CSV) ---
document.addEventListener('DOMContentLoaded', fetchInventory);

function fetchInventory() {
    const itemGrid = document.getElementById('itemGrid');
    const loader = document.getElementById('loader');
    
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRz7tFf-W9EcRsC8UcLhqWQw8u6k4Y5FqWV8Il6WD2J9vf1Q2ITR2Zx2CXsmJrxIoFaJkOrDD1BLWrf/pub?output=csv'; 

    fetch(csvUrl) 
        .then(response => response.text())
        .then(data => {
            itemGrid.innerHTML = ''; // Loading text hata do
            
            const rows = data.trim().split('\n');
            
            for (let i = 1; i < rows.length; i++) {
                // Agar row poori khali hai, toh skip karo
                if (!rows[i] || rows[i].trim() === '') continue;

                const cols = rows[i].split(','); 
                
                // YEH HAI FIX: Agar item ka naam khali hai, toh card mat banao
                if (!cols[0] || cols[0].trim() === "") continue;

                if (cols.length >= 4) {
                    let title = cols[0].trim();
                    let desc = cols[1].trim();
                    let price = cols[2].trim();
                    let status = cols[3].trim().toUpperCase(); 
                    
                    let isChecked = (status === 'TRUE');
                    let statusText = isChecked ? 'In Stock' : 'Out of Stock';
                    let statusClass = isChecked ? 'in-stock' : 'out-stock';
                    
                    let cardHTML = `
                        <div class="card">
                            <h3>${title}</h3>
                            <p>${desc}</p>
                            <div class="price">${price}</div>
                            <div class="status ${statusClass}">${statusText}</div>
                        </div>
                    `;
                    itemGrid.innerHTML += cardHTML;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching CSV:', error);
            if(loader) loader.innerText = 'Error loading items! Please check connection.';
        });
}

// --- GOOGLE SHEET FORM SUBMISSION  LOGIC ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbwO9o0-dVWH3Obuq__GoIO8_HdBP7avzDJaPoQY6QSL506dq8kIAN16-1B9lDk92C1X/exec'; 
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
            }, 5000); 
        })
        .catch(error => {
            console.error('Error!', error.message);
            btn.innerText = "Error! Try Again.";
        });
});