// js/search.js
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        const query = this.value.trim().toLowerCase();
        
        if (query.length === 0) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    searchInput.addEventListener('focus', function() {
        const query = this.value.trim().toLowerCase();
        if (query.length > 0 && searchResults.children.length > 0) {
            searchResults.style.display = 'block';
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    const filteredDramas = dramas.filter(drama => {
        // Search in title
        if (drama.title.toLowerCase().includes(query)) return true;
        
        // Search in alternative titles
        if (drama.altTitles && drama.altTitles.some(alt => 
            alt.toLowerCase().includes(query))) return true;
        
        // Search in genres
        if (drama.genres.some(genre => 
            genre.toLowerCase().includes(query))) return true;
        
        // Search in description
        if (drama.description.toLowerCase().includes(query)) return true;
        
        return false;
    });
    
    displaySearchResults(filteredDramas.slice(0, 10));
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item no-results">
                <i class="fas fa-search"></i>
                <div>
                    <h4>No results found</h4>
                    <p>Try different keywords</p>
                </div>
            </div>
        `;
        searchResults.style.display = 'block';
        return;
    }
    
    results.forEach(drama => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.dataset.id = drama.id;
        
        resultItem.innerHTML = `
            <img src="${drama.poster}" alt="${drama.title}" onerror="this.src='https://via.placeholder.com/50x70/1A1628/7B61FF?text=No+Image'">
            <div class="search-result-info">
                <h4>${drama.title}</h4>
                <p>${drama.year} • ${drama.genres.slice(0, 2).join(', ')}</p>
                <p class="search-rating">
                    <i class="fas fa-star"></i> ${drama.rating > 0 ? drama.rating.toFixed(1) : 'N/A'}
                </p>
            </div>
        `;
        
        resultItem.addEventListener('click', function() {
            window.location.href = `drama-detail.html?id=${drama.id}`;
        });
        
        searchResults.appendChild(resultItem);
    });
    
    searchResults.style.display = 'block';
}