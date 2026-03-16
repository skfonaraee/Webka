// js/catalog.js - Handle catalog page initialization

document.addEventListener('DOMContentLoaded', function() {
    // Reset global selectedGenres when entering catalog page
    selectedGenres = [];
    
    // Initialize drama grid with all dramas
    renderDramaGrid(dramas);
    
    // Initialize filters
    initFilters();
    
    // Initialize search
    initSearch();
    
    // Initialize bookmark modal
    initBookmarkModal();
    
    // Initialize user authentication state
    initAuthState();
    initProfileDropdown();
    
    // Initialize genre checkboxes
    renderGenreFilters();
    
    // Store all dramas globally for filtering
    window.allDramas = dramas;
    window.filteredDramas = dramas;
});

// Render drama cards in grid
function renderDramaGrid(dramasToRender) {
    const dramaGrid = document.getElementById('dramaGrid');
    if (!dramaGrid) return;
    
    dramaGrid.innerHTML = '';
    
    dramasToRender.forEach(drama => {
        const dramaCard = createDramaCard(drama);
        dramaGrid.appendChild(dramaCard);
    });
    
    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = dramasToRender.length;
    }
}

// Create individual drama card element
function createDramaCard(drama) {
    const card = document.createElement('div');
    card.className = 'drama-card';
    card.dataset.id = drama.id;
    
    // Status badge
    let badgeClass = '';
    let badgeText = '';
    switch(drama.status) {
        case 'Ongoing':
            badgeClass = 'badge-ongoing';
            badgeText = 'ONGOING';
            break;
        case 'Completed':
            badgeClass = 'badge-completed';
            badgeText = 'COMPLETED';
            break;
        case 'Coming Soon':
            badgeClass = 'badge-coming-soon';
            badgeText = 'SOON';
            break;
    }
    
    // Rating stars
    const ratingStars = getStarRatingHTML(drama.rating);
    
    card.innerHTML = `
        <div class="card-image">
            <img src="${drama.poster}" alt="${drama.title}" onerror="this.src='https://via.placeholder.com/200x280/1A1628/7B61FF?text=No+Image'">
            <div class="card-badge ${badgeClass}">${badgeText}</div>
            <div class="card-bookmark" data-drama-id="${drama.id}">
                <i class="far fa-bookmark"></i>
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${drama.title}</h3>
            <p class="card-subtitle">${drama.altTitles ? drama.altTitles[0] : ''}</p>
            <div class="card-meta">
                <span class="card-year">${drama.year}</span>
                <div class="card-rating">
                    ${ratingStars}
                    <span>${drama.rating > 0 ? drama.rating.toFixed(1) : 'N/A'}</span>
                </div>
            </div>
            <div class="card-genres">
                ${drama.genres.slice(0, 2).map(genre => 
                    `<span class="genre-tag">${genre}</span>`
                ).join('')}
                ${drama.genres.length > 2 ? 
                    `<span class="genre-tag">+${drama.genres.length - 2}</span>` : ''
                }
            </div>
            <div class="card-actions">
                <a href="drama-detail.html?id=${drama.id}" class="card-btn btn-details">Details</a>
                <button class="card-btn btn-watch" data-drama-id="${drama.id}">Watch</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const bookmarkBtn = card.querySelector('.card-bookmark');
    bookmarkBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openBookmarkModal(drama.id, drama.title);
    });
    
    const watchBtn = card.querySelector('.btn-watch');
    watchBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        alert(`Starting to watch "${drama.title}"`);
    });
    
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.card-bookmark') && !e.target.closest('.btn-watch')) {
            window.location.href = `drama-detail.html?id=${drama.id}`;
        }
    });
    
    return card;
}

// Helper function for star rating HTML
function getStarRatingHTML(rating) {
    if (rating === 0) return 'N/A';
    
    let stars = '';
    const fullStars = Math.floor(rating / 2);
    const halfStar = (rating / 2) % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}
