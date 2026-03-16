// js/drama-detail.js
document.addEventListener('DOMContentLoaded', function() {
    // Get drama ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const dramaId = parseInt(urlParams.get('id'));
    
    if (dramaId) {
        loadDramaDetails(dramaId);
        loadRecommendations(dramaId);
        initRatingSystem();
    } else {
        // Redirect to home if no ID provided
        window.location.href = 'index.html';
    }
});

function loadDramaDetails(dramaId) {
    const drama = dramas.find(d => d.id === dramaId);
    const dramaDetail = document.getElementById('dramaDetail');
    
    if (!drama || !dramaDetail) {
        dramaDetail.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Drama Not Found</h2>
                <p>The drama you're looking for doesn't exist.</p>
                <a href="index.html" class="btn-primary">Browse Dramas</a>
            </div>
        `;
        return;
    }
    
    // Update page title
    document.title = `DoramaNight | ${drama.title}`;
    
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
            badgeText = 'COMING SOON';
            break;
    }
    
    // Format date
    const premiereDate = new Date(drama.premiereDate);
    const formattedDate = premiereDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Create drama detail HTML
    dramaDetail.innerHTML = `
        <div class="drama-header">
            <div class="drama-title-section">
                <h1 class="drama-title">${drama.title}</h1>
                <div class="drama-subtitle">
                    <span class="drama-year">${drama.year}</span>
                    <span class="drama-alt-title">${drama.altTitles ? drama.altTitles.join(' • ') : ''}</span>
                </div>
                
                <!-- Rating System -->
                <div class="rating-container">
                    <div class="rating-display">
                        <div class="rating-average">
                            <span class="rating-score">${drama.rating > 0 ? drama.rating.toFixed(1) : 'N/A'}</span>
                            <div class="rating-stars">
                                ${getStarRatingHTML(drama.rating)}
                            </div>
                            <span class="rating-count">(${drama.votes.toLocaleString()} votes)</span>
                        </div>
                        <div class="recommended-badge">
                            <i class="fas fa-thumbs-up"></i>
                            <span>Recommended by ${drama.recommendedBy}%</span>
                        </div>
                    </div>
                    
                    <div class="user-rating">
                        <h3>Your Rating</h3>
                        <div class="star-rating interactive">
                            <div class="stars" data-drama-id="${drama.id}">
                                ${[1,2,3,4,5,6,7,8,9,10].map(i => `
                                    <i class="far fa-star" data-value="${i}"></i>
                                `).join('')}
                            </div>
                            <div class="rating-hint">Rate from 1 to 10</div>
                            <div class="user-rating-value">
                                Your rating: <span id="userRatingValue">Not rated yet</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="drama-content">
            <div class="drama-poster-section">
                <div class="drama-poster">
                    <img src="${drama.poster}" alt="${drama.title}" onerror="this.src='https://via.placeholder.com/200x280/1A1628/7B61FF?text=No+Image'">
                    <div class="drama-badge ${badgeClass}">${badgeText}</div>
                </div>
                
                <div class="action-buttons">
                    <button class="btn-action btn-watch">
                        <i class="fas fa-play"></i>
                        <span>Watch Now</span>
                    </button>
                    <button class="btn-action btn-trailer">
                        <i class="fas fa-film"></i>
                        <span>Trailer</span>
                    </button>
                    <button class="btn-action btn-bookmark" data-drama-id="${drama.id}">
                        <i class="far fa-bookmark"></i>
                        <span>Add to Bookmarks</span>
                    </button>
                </div>
            </div>
            
            <div class="drama-info-section">
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Country</span>
                        <span class="info-value">${drama.country}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Premiere Date</span>
                        <span class="info-value">${formattedDate}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Channel</span>
                        <span class="info-value">${drama.channel}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Schedule</span>
                        <span class="info-value">${drama.schedule}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Episodes</span>
                        <span class="info-value">${drama.episodes}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Duration</span>
                        <span class="info-value">${drama.duration}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Available</span>
                        <span class="info-value">${drama.availableEpisodes} / ${drama.episodes}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Rating</span>
                        <span class="info-value">${drama.rating > 0 ? drama.rating.toFixed(1) : 'N/A'}</span>
                    </div>
                </div>
                
                <div class="genre-tags">
                    ${drama.genres.map(genre => `
                        <span class="genre-tag">${genre}</span>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="drama-description">
            <h2>Plot Summary</h2>
            <p>${drama.description}</p>
        </div>
    `;
    
    // Add event listeners
    const bookmarkBtn = dramaDetail.querySelector('.btn-bookmark');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function() {
            openBookmarkModal(drama.id, drama.title);
        });
    }
    
    const watchBtn = dramaDetail.querySelector('.btn-watch');
    if (watchBtn) {
        watchBtn.addEventListener('click', function() {
            alert(`Starting to watch "${drama.title}"`);
        });
    }
    
    const trailerBtn = dramaDetail.querySelector('.btn-trailer');
    if (trailerBtn) {
        trailerBtn.addEventListener('click', function() {
            alert(`Playing trailer for "${drama.title}"`);
        });
    }
}

// Also update in js/drama-detail.js
function getDramaPoster(drama) {
    // Use the same function for consistency
    const colors = ['7B61FF', '4D3B9B', '6C5CE7', 'A29BFE', '00CEC9', '00B894', 'FDCB6E', 'E17055', 'D63031'];
    const colorIndex = drama.id % colors.length;
    const bgColor = '1A1628';
    const title = encodeURIComponent(drama.title.substring(0, 2).toUpperCase());
    
    return `https://ui-avatars.com/api/?name=${title}&background=${colors[colorIndex]}&color=${bgColor}&size=400&font-size=0.5&bold=true&length=2`;
}

function initRatingSystem() {
    const starsContainer = document.querySelector('.star-rating.interactive .stars');
    if (!starsContainer) return;
    
    const dramaId = starsContainer.dataset.dramaId;
    
    // Load user's existing rating
    const userRatings = JSON.parse(localStorage.getItem('doramanight_ratings')) || {};
    const userRating = userRatings[dramaId];
    
    if (userRating) {
        updateStarDisplay(starsContainer, userRating);
        updateUserRatingValue(userRating);
    }
    
    // Add hover effect
    const stars = starsContainer.querySelectorAll('.fa-star');
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.dataset.value);
            updateStarDisplay(starsContainer, value, true);
        });
        
        star.addEventListener('mouseout', function() {
            const currentRating = userRating || 0;
            updateStarDisplay(starsContainer, currentRating, false);
        });
        
        star.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            saveUserRating(dramaId, value);
            updateStarDisplay(starsContainer, value, false);
            updateUserRatingValue(value);
            
            // Show success message
            showRatingSuccess(value);
        });
    });
}

function updateStarDisplay(container, rating, isHover = false) {
    const stars = container.querySelectorAll('.fa-star');
    const fullStars = Math.floor(rating / 2);
    const halfStar = (rating / 2) % 1 >= 0.5;
    
    stars.forEach((star, index) => {
        const starValue = index + 1;
        const starRating = starValue * 2; // Convert to 10-point scale
        
        if (starRating <= rating * 2) {
            star.className = 'fas fa-star';
            star.style.color = isHover ? '#FFD700' : '#FFC107';
        } else if (halfStar && starValue === fullStars + 1) {
            star.className = 'fas fa-star-half-alt';
            star.style.color = isHover ? '#FFD700' : '#FFC107';
        } else {
            star.className = 'far fa-star';
            star.style.color = isHover ? '#FFD700' : '#7A7599';
        }
    });
}

function saveUserRating(dramaId, rating) {
    let userRatings = JSON.parse(localStorage.getItem('doramanight_ratings')) || {};
    userRatings[dramaId] = rating;
    localStorage.setItem('doramanight_ratings', JSON.stringify(userRatings));
    
    // Update drama's rating in local storage
    updateDramaRating(dramaId, rating);
}

function updateDramaRating(dramaId, newUserRating) {
    // This would typically be done on a server
    // For demo purposes, we'll update localStorage
    const drama = dramas.find(d => d.id === dramaId);
    if (!drama) return;
    
    // Get existing ratings from localStorage or use drama's default
    let dramaRatings = JSON.parse(localStorage.getItem('doramanight_drama_ratings')) || {};
    
    if (!dramaRatings[dramaId]) {
        dramaRatings[dramaId] = {
            totalRating: drama.rating * drama.votes,
            totalVotes: drama.votes
        };
    }
    
    // Add new rating
    const userRatings = JSON.parse(localStorage.getItem('doramanight_ratings')) || {};
    const oldUserRating = userRatings[dramaId] || 0;
    
    if (oldUserRating > 0) {
        // User is updating their rating
        dramaRatings[dramaId].totalRating += (newUserRating - oldUserRating);
    } else {
        // User is rating for the first time
        dramaRatings[dramaId].totalRating += newUserRating;
        dramaRatings[dramaId].totalVotes += 1;
    }
    
    localStorage.setItem('doramanight_drama_ratings', JSON.stringify(dramaRatings));
}

function updateUserRatingValue(rating) {
    const valueElement = document.getElementById('userRatingValue');
    if (valueElement) {
        valueElement.textContent = `${rating}/10`;
        valueElement.style.color = getRatingColor(rating);
    }
}

function getRatingColor(rating) {
    if (rating >= 8) return '#4CAF50';
    if (rating >= 6) return '#FF9800';
    return '#F44336';
}

function showRatingSuccess(rating) {
    // Create or show success message
    let successMsg = document.querySelector('.rating-success');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'rating-success';
        document.querySelector('.user-rating').appendChild(successMsg);
    }
    
    const messages = [
        `Thanks for your ${rating}/10 rating!`,
        `You rated it ${rating}/10!`,
        `${rating}/10 - Great choice!`,
        `Rating saved: ${rating}/10`
    ];
    
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    successMsg.textContent = randomMsg;
    successMsg.style.display = 'block';
    successMsg.style.color = '#4CAF50';
    successMsg.style.marginTop = '10px';
    successMsg.style.fontWeight = '500';
    
    // Hide after 3 seconds
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);
}

function loadRecommendations(dramaId) {
    const drama = dramas.find(d => d.id === dramaId);
    if (!drama) return;
    
    // Find similar dramas (same genres or similar rating)
    const similarDramas = dramas
        .filter(d => d.id !== dramaId)
        .sort((a, b) => {
            // Calculate similarity score
            const aScore = calculateSimilarityScore(drama, a);
            const bScore = calculateSimilarityScore(drama, b);
            return bScore - aScore;
        })
        .slice(0, 6); // Top 6 recommendations
    
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    if (!recommendationsGrid) return;
    
    if (similarDramas.length === 0) {
        recommendationsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-film"></i>
                <p>No recommendations available</p>
            </div>
        `;
        return;
    }
    
    recommendationsGrid.innerHTML = similarDramas.map(d => `
        <div class="recommendation-card" data-id="${d.id}">
            <img src="${d.poster}" alt="${d.title}" class="recommendation-poster" onerror="this.src='https://via.placeholder.com/200x280/1A1628/7B61FF?text=No+Image'">
            <div class="recommendation-info">
                <h4>${d.title}</h4>
                <p>${d.year} • ${d.genres.slice(0, 2).join(', ')}</p>
                <div class="recommendation-rating">
                    <i class="fas fa-star"></i> ${d.rating > 0 ? d.rating.toFixed(1) : 'N/A'}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click event to recommendation cards
    recommendationsGrid.querySelectorAll('.recommendation-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.dataset.id;
            window.location.href = `drama-detail.html?id=${id}`;
        });
    });
}

function calculateSimilarityScore(drama1, drama2) {
    let score = 0;
    
    // Genre similarity (most important)
    const commonGenres = drama1.genres.filter(genre => drama2.genres.includes(genre));
    score += commonGenres.length * 20;
    
    // Rating similarity
    const ratingDiff = Math.abs(drama1.rating - drama2.rating);
    score += (10 - Math.min(ratingDiff, 10)) * 2;
    
    // Same country bonus
    if (drama1.country === drama2.country) score += 10;
    
    // Same status bonus
    if (drama1.status === drama2.status) score += 5;
    
    // Recent dramas bonus
    if (drama2.year >= 2022) score += 5;
    
    return score;
}

// Add CSS for drama detail page
const dramaDetailStyles = `
    <style>
        .drama-header {
            margin-bottom: var(--spacing-xl);
        }
        
        .drama-title {
            font-size: 2.5rem;
            margin-bottom: var(--spacing-xs);
            color: var(--color-text-primary);
        }
        
        .drama-subtitle {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
            color: var(--color-text-secondary);
        }
        
        .drama-year {
            font-weight: 600;
            color: var(--color-accent-primary);
        }
        
        .rating-container {
            background-color: var(--color-bg-secondary);
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
            margin-bottom: var(--spacing-xl);
            border: 1px solid var(--color-border);
        }
        
        .rating-display {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
            padding-bottom: var(--spacing-lg);
            border-bottom: 1px solid var(--color-border);
        }
        
        .rating-average {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .rating-score {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--color-text-primary);
        }
        
        .rating-stars {
            display: flex;
            gap: 2px;
        }
        
        .rating-stars i {
            color: var(--color-rating);
            font-size: 1.2rem;
        }
        
        .rating-count {
            color: var(--color-text-secondary);
            font-size: 0.9rem;
        }
        
        .recommended-badge {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            padding: 0.5rem 1rem;
            background-color: rgba(76, 175, 80, 0.1);
            border-radius: var(--radius-md);
            color: var(--color-success);
            border: 1px solid rgba(76, 175, 80, 0.3);
        }
        
        .user-rating h3 {
            margin-bottom: var(--spacing-sm);
            color: var(--color-text-primary);
        }
        
        .star-rating.interactive .stars {
            display: flex;
            gap: 4px;
            margin-bottom: var(--spacing-xs);
        }
        
        .star-rating.interactive .fa-star {
            font-size: 1.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .star-rating.interactive .fa-star:hover {
            transform: scale(1.2);
        }
        
        .rating-hint {
            color: var(--color-text-muted);
            font-size: 0.9rem;
            margin-bottom: var(--spacing-xs);
        }
        
        .user-rating-value {
            font-weight: 500;
            color: var(--color-text-primary);
        }
        
        .drama-content {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: var(--spacing-xl);
            margin-bottom: var(--spacing-xl);
        }
        
        .drama-poster-section {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
        }
        
        .drama-poster {
            position: relative;
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-md);
        }
        
        .drama-poster img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .drama-badge {
            position: absolute;
            top: var(--spacing-md);
            left: var(--spacing-md);
            padding: 0.5rem 1rem;
            border-radius: var(--radius-sm);
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .action-buttons {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
        }
        
        .btn-action {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-sm);
            padding: 0.75rem;
            border-radius: var(--radius-md);
            font-weight: 500;
            cursor: pointer;
            transition: all var(--transition-fast);
            border: none;
        }
        
        .btn-watch {
            background-color: var(--color-accent-primary);
            color: white;
        }
        
        .btn-watch:hover {
            background-color: var(--color-accent-secondary);
        }
        
        .btn-trailer {
            background-color: var(--color-bg-primary);
            color: var(--color-text-primary);
            border: 1px solid var(--color-border);
        }
        
        .btn-trailer:hover {
            background-color: var(--color-border);
        }
        
        .btn-bookmark {
            background-color: var(--color-bg-primary);
            color: var(--color-text-primary);
            border: 1px solid var(--color-border);
        }
        
        .btn-bookmark:hover {
            background-color: var(--color-border);
            color: var(--color-accent-primary);
        }
        
        .drama-info-section {
            background-color: var(--color-bg-secondary);
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
            border: 1px solid var(--color-border);
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
        }
        
        .info-item {
            display: flex;
            flex-direction: column;
        }
        
        .info-label {
            font-size: 0.9rem;
            color: var(--color-text-secondary);
            margin-bottom: 0.25rem;
        }
        
        .info-value {
            font-weight: 500;
            color: var(--color-text-primary);
        }
        
        .genre-tags {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-sm);
        }
        
        .drama-description {
            background-color: var(--color-bg-secondary);
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
            margin-bottom: var(--spacing-xl);
            border: 1px solid var(--color-border);
        }
        
        .drama-description h2 {
            font-size: 1.5rem;
            margin-bottom: var(--spacing-md);
            color: var(--color-text-primary);
        }
        
        .drama-description p {
            line-height: 1.8;
            color: var(--color-text-secondary);
        }
        
        .recommendations-section {
            margin-bottom: var(--spacing-xl);
        }
        
        .recommendations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: var(--spacing-lg);
        }
        
        .recommendation-card {
            background-color: var(--color-bg-secondary);
            border-radius: var(--radius-lg);
            overflow: hidden;
            cursor: pointer;
            transition: all var(--transition-normal);
            border: 1px solid var(--color-border);
        }
        
        .recommendation-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
            border-color: var(--color-accent-primary);
        }
        
        .recommendation-poster {
            width: 100%;
            height: 240px;
            object-fit: cover;
        }
        
        .recommendation-info {
            padding: var(--spacing-md);
        }
        
        .recommendation-info h4 {
            font-size: 1rem;
            margin-bottom: 0.5rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .recommendation-info p {
            font-size: 0.85rem;
            color: var(--color-text-secondary);
            margin-bottom: 0.5rem;
        }
        
        .recommendation-rating {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            color: var(--color-rating);
            font-weight: 500;
        }
        
        .error-state {
            text-align: center;
            padding: var(--spacing-xl);
            color: var(--color-text-secondary);
        }
        
        .error-state i {
            font-size: 3rem;
            color: var(--color-danger);
            margin-bottom: var(--spacing-md);
        }
        
        .error-state h2 {
            font-size: 1.8rem;
            margin-bottom: var(--spacing-sm);
            color: var(--color-text-primary);
        }
        
        @media (max-width: 768px) {
            .drama-content {
                grid-template-columns: 1fr;
            }
            
            .drama-poster-section {
                max-width: 300px;
                margin: 0 auto;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
            
            .rating-display {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--spacing-md);
            }
            
            .drama-title {
                font-size: 2rem;
            }
            
            .recommendations-grid {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
        }
    </style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', dramaDetailStyles);