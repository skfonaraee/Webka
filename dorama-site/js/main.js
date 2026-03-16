// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousels
    initCarousels();
    
    // Initialize search
    initSearch();
    
    // Initialize bookmark modal
    initBookmarkModal();
    
    // Initialize user authentication state
    initAuthState();
    // Initialize profile dropdown (click for mobile/touch)
    initProfileDropdown();
    
    // Render carousel dramas
    renderCarouselDramas();
});

// Initialize carousels with smooth scrolling
function initCarousels() {
    document.querySelectorAll('.carousel-btn').forEach(button => {
        button.addEventListener('click', function() {
            const carouselId = this.dataset.carousel;
            const carousel = document.getElementById(`${carouselId}Carousel`);
            const direction = this.classList.contains('next') ? 1 : -1;
            const scrollAmount = 300;
            
            carousel.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        });
    });
}

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

// Render carousel dramas
function renderCarouselDramas() {
    const popularDramas = dramas.filter(d => d.isPopular).slice(0, 5);
    const premiereDramas = dramas.filter(d => d.isPremiere).slice(0, 5);
    const upcomingDramas = dramas.filter(d => d.isUpcoming).slice(0, 5);
    
    renderCarousel('popularCarousel', popularDramas);
    renderCarousel('premiereCarousel', premiereDramas);
    renderCarousel('upcomingCarousel', upcomingDramas);
}

// Render individual carousel
function renderCarousel(carouselId, dramasList) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    carousel.innerHTML = '';
    
    dramasList.forEach(drama => {
        const dramaCard = createDramaCard(drama);
        carousel.appendChild(dramaCard);
    });
}

// Initialize user authentication state
function initAuthState() {
    const user = JSON.parse(localStorage.getItem('doramanight_user'));
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    
    if (user && user.isLoggedIn) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userProfile) {
            userProfile.classList.remove('hidden');
            const profileName = userProfile.querySelector('.profile-name');
            if (profileName) {
                profileName.textContent = user.username;
            }
        }
    }
}

// Initialize profile dropdown to support click/touch (mobile)
function initProfileDropdown() {
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (!profileDropdown) return;
    const dropdownMenu = profileDropdown.querySelector('.dropdown-menu');
    if (!dropdownMenu) return;

    profileDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        // Toggle visible state
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'block';
        }
    });

    // Close when clicking outside
    document.addEventListener('click', function() {
        dropdownMenu.style.display = 'none';
    });
}

// Initialize logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('doramanight_user');
        window.location.reload();
    });
}

// Update in js/main.js
function getDramaPoster(drama) {
    // Generate consistent color based on drama ID
    const colors = ['7B61FF', '4D3B9B', '6C5CE7', 'A29BFE', '00CEC9', '00B894', 'FDCB6E', 'E17055', 'D63031'];
    const colorIndex = drama.id % colors.length;
    const bgColor = '1A1628';
    const title = encodeURIComponent(drama.title.substring(0, 2).toUpperCase());
    
    return `https://ui-avatars.com/api/?name=${title}&background=${colors[colorIndex]}&color=${bgColor}&size=400&font-size=0.5&bold=true&length=2`;
}

// Add to js/main.js
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle-btn';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle theme';
    
    // Add to header
    const userActions = document.querySelector('.user-actions');
    if (userActions) {
        userActions.insertBefore(themeToggle, userActions.firstChild);
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('doramanight_theme') || 'dark';
    if (savedTheme === 'light') {
        enableLightTheme();
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark-theme') || 
                      !document.body.classList.contains('light-theme');
        
        if (isDark) {
            enableLightTheme();
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('doramanight_theme', 'light');
        } else {
            enableDarkTheme();
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('doramanight_theme', 'dark');
        }
    });
}

function enableLightTheme() {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    
    // Update CSS variables for light theme
    document.documentElement.style.setProperty('--color-bg-primary', '#f8f9fa');
    document.documentElement.style.setProperty('--color-bg-secondary', '#ffffff');
    document.documentElement.style.setProperty('--color-bg-card', '#ffffff');
    document.documentElement.style.setProperty('--color-text-primary', '#212529');
    document.documentElement.style.setProperty('--color-text-secondary', '#6c757d');
    document.documentElement.style.setProperty('--color-text-muted', '#adb5bd');
    document.documentElement.style.setProperty('--color-border', '#dee2e6');
}

function enableDarkTheme() {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    
    // Restore dark theme variables
    document.documentElement.style.setProperty('--color-bg-primary', '#0B0812');
    document.documentElement.style.setProperty('--color-bg-secondary', '#1A1628');
    document.documentElement.style.setProperty('--color-bg-card', '#1A1628');
    document.documentElement.style.setProperty('--color-text-primary', '#E0DDEB');
    document.documentElement.style.setProperty('--color-text-secondary', '#A9A4C1');
    document.documentElement.style.setProperty('--color-text-muted', '#7A7599');
    document.documentElement.style.setProperty('--color-border', '#2D2840');
}

// Add theme toggle styles
const themeToggleStyles = `
    <style>
        .theme-toggle-btn {
            background: none;
            border: none;
            color: var(--color-text-primary);
            font-size: 1.2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all var(--transition-fast);
        }
        
        .theme-toggle-btn:hover {
            background-color: rgba(123, 97, 255, 0.1);
            color: var(--color-accent-primary);
        }
        
        .light-theme {
            background-color: #f8f9fa;
            color: #212529;
        }
        
        .light-theme .main-header {
            background-color: #ffffff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .light-theme .drama-card {
            background-color: #ffffff;
            border: 1px solid #dee2e6;
        }
        
        .light-theme .drama-card:hover {
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
    </style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', themeToggleStyles);

// Initialize theme toggle in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    initThemeToggle();
});