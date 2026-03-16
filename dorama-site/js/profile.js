// js/profile.js
document.addEventListener('DOMContentLoaded', function() {
    initProfilePage();
    initTabs();
    initSettings();
    loadUserBookmarks();
    initAvatarUpload();
});

function initProfilePage() {
    // Load user data
    const user = JSON.parse(localStorage.getItem('doramanight_user')) || {
        username: 'K-Drama Fan',
        email: 'user@example.com',
        memberSince: 2024
    };
    
    // Update profile info
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('memberSince').textContent = user.memberSince;
    
    // Update avatar with user's first letter
    const avatar = document.getElementById('profileAvatar');
    if (avatar) {
        const firstLetter = user.username.charAt(0).toUpperCase();
        avatar.src = `https://ui-avatars.com/api/?name=${firstLetter}&background=7B61FF&color=fff&size=150`;
    }
    
    // Update profile dropdown
    const profileName = document.querySelector('.profile-name');
    if (profileName) {
        profileName.textContent = user.username;
    }
}

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}Tab`) {
                    content.classList.add('active');
                }
            });
            
            // Update URL hash
            window.location.hash = tabId;
        });
    });
    
    // Check URL hash on load
    const hash = window.location.hash.substring(1);
    if (hash) {
        const tab = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
        if (tab) tab.click();
    }
}

function loadUserBookmarks() {
    const user = JSON.parse(localStorage.getItem('doramanight_user'));
    if (!user) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('doramanight_bookmarks')) || {};
    const userBookmarks = bookmarks[user.username] || {};
    
    // Count bookmarks by status
    const statusCounts = {
        watching: 0,
        planned: 0,
        completed: 0,
        dropped: 0,
        favorites: 0
    };
    
    Object.values(userBookmarks).forEach(bookmark => {
        if (statusCounts.hasOwnProperty(bookmark.status)) {
            statusCounts[bookmark.status]++;
        }
    });
    
    // Update stats
    const totalBookmarks = Object.values(statusCounts).reduce((a, b) => a + b, 0);
    document.getElementById('totalBookmarks').textContent = totalBookmarks;
    document.getElementById('totalWatching').textContent = statusCounts.watching;
    document.getElementById('totalCompleted').textContent = statusCounts.completed;
    
    // Load bookmarks by status
    loadBookmarksByStatus('watching', userBookmarks);
    loadBookmarksByStatus('planned', userBookmarks);
    loadBookmarksByStatus('completed', userBookmarks);
    loadBookmarksByStatus('favorites', userBookmarks);
    loadBookmarksByStatus('dropped', userBookmarks);
}

function loadBookmarksByStatus(status, userBookmarks) {
    const gridId = `${status}Grid`;
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    // Filter bookmarks by status
    const filteredBookmarks = Object.values(userBookmarks)
        .filter(bookmark => bookmark.status === status)
        .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    
    if (filteredBookmarks.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <p>No ${status.replace(/([A-Z])/g, ' $1').toLowerCase()} dramas yet</p>
            </div>
        `;
        return;
    }
    
    // Get drama details for each bookmark
    const dramaCards = filteredBookmarks.map(bookmark => {
        const drama = dramas.find(d => d.id === bookmark.dramaId);
        if (!drama) return '';
        
        return createBookmarkCard(drama, bookmark.status);
    }).join('');
    
    grid.innerHTML = dramaCards;
    
    // Add event listeners
    grid.querySelectorAll('.bookmark-card').forEach(card => {
        const dramaId = card.dataset.id;
        card.addEventListener('click', function() {
            window.location.href = `drama-detail.html?id=${dramaId}`;
        });
        
        const removeBtn = card.querySelector('.remove-bookmark');
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                removeBookmark(dramaId);
            });
        }
    });
}

function createBookmarkCard(drama, status) {
    const statusColors = {
        watching: '#4CAF50',
        planned: '#2196F3',
        completed: '#9C27B0',
        dropped: '#F44336',
        favorites: '#FF9800'
    };
    
    return `
        <div class="bookmark-card" data-id="${drama.id}">
            <div class="bookmark-poster">
                <img src="${drama.poster}" alt="${drama.title}" onerror="this.src='https://via.placeholder.com/200x280/1A1628/7B61FF?text=No+Image'">
                <div class="bookmark-status-badge" style="background-color: ${statusColors[status]}">
                    <i class="fas fa-${getStatusIcon(status)}"></i>
                </div>
                <button class="remove-bookmark" title="Remove from bookmarks">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="bookmark-info">
                <h4>${drama.title}</h4>
                <p>${drama.year} • ${drama.genres.slice(0, 2).join(', ')}</p>
                <div class="bookmark-rating">
                    <i class="fas fa-star"></i> ${drama.rating > 0 ? drama.rating.toFixed(1) : 'N/A'}
                </div>
            </div>
        </div>
    `;
}

function getStatusIcon(status) {
    const icons = {
        watching: 'play-circle',
        planned: 'clock',
        completed: 'check-circle',
        dropped: 'times-circle',
        favorites: 'heart'
    };
    return icons[status] || 'bookmark';
}

function removeBookmark(dramaId) {
    const user = JSON.parse(localStorage.getItem('doramanight_user'));
    if (!user) return;
    
    if (confirm('Remove this drama from your bookmarks?')) {
        const bookmarks = JSON.parse(localStorage.getItem('doramanight_bookmarks')) || {};
        if (bookmarks[user.username]) {
            delete bookmarks[user.username][dramaId];
            localStorage.setItem('doramanight_bookmarks', JSON.stringify(bookmarks));
            
            // Reload bookmarks
            loadUserBookmarks();
            
            // Show success message
            showNotification('Drama removed from bookmarks', 'success');
        }
    }
}

function initSettings() {
    // Account form
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAccountSettings();
        });
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('doramanight_theme') || 'dark';
        themeToggle.checked = savedTheme === 'dark';
        
        themeToggle.addEventListener('change', function() {
            const theme = this.checked ? 'dark' : 'light';
            localStorage.setItem('doramanight_theme', theme);
            
            // In a real app, you would apply the theme here
            showNotification(`Theme changed to ${theme} mode`, 'success');
        });
    }
    
    // Save preferences button
    const savePrefsBtn = document.getElementById('savePreferences');
    if (savePrefsBtn) {
        savePrefsBtn.addEventListener('click', savePreferences);
    }
    
    // Delete account button
    const deleteAccountBtn = document.getElementById('deleteAccount');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', deleteAccount);
    }
}

function saveAccountSettings() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate username
    const usernameError = validateUsername(username);
    if (usernameError) {
        showNotification(usernameError, 'error');
        return;
    }
    
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
        showNotification(emailError, 'error');
        return;
    }
    
    // Check if password is being changed
    if (newPassword) {
        // Validate current password (in real app, check against server)
        if (!currentPassword) {
            showNotification('Please enter your current password', 'error');
            return;
        }
        
        // Validate new password
        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            showNotification(passwordError, 'error');
            return;
        }
        
        // Check password confirmation
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }
    }
    
    // Update user data
    const user = JSON.parse(localStorage.getItem('doramanight_user')) || {};
    user.username = username;
    user.email = email;
    localStorage.setItem('doramanight_user', JSON.stringify(user));
    
    // Update profile display
    document.getElementById('profileUsername').textContent = username;
    document.getElementById('profileEmail').textContent = email;
    
    // Update avatar
    const avatar = document.getElementById('profileAvatar');
    if (avatar) {
        const firstLetter = username.charAt(0).toUpperCase();
        avatar.src = `https://ui-avatars.com/api/?name=${firstLetter}&background=7B61FF&color=fff&size=150`;
    }
    
    showNotification('Account settings saved successfully', 'success');
    
    // Clear password fields
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function savePreferences() {
    const notifyNewEpisodes = document.getElementById('notifyNewEpisodes').checked;
    const notifyRecommendations = document.getElementById('notifyRecommendations').checked;
    const notifyCommunity = document.getElementById('notifyCommunity').checked;
    
    // Save to localStorage
    const preferences = {
        notifyNewEpisodes,
        notifyRecommendations,
        notifyCommunity
    };
    
    localStorage.setItem('doramanight_preferences', JSON.stringify(preferences));
    showNotification('Preferences saved successfully', 'success');
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('This will permanently delete all your data. Type "DELETE" to confirm:')) {
            // In a real app, you would send a request to the server
            localStorage.removeItem('doramanight_user');
            localStorage.removeItem('doramanight_bookmarks');
            localStorage.removeItem('doramanight_ratings');
            
            showNotification('Account deleted successfully', 'success');
            
            // Redirect to home page after delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }
}

function initAvatarUpload() {
    const avatarInput = document.getElementById('avatarInput');
    const avatarImage = document.getElementById('profileAvatar');
    
    if (avatarInput && avatarImage) {
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // Validate file type
            if (!file.type.match('image.*')) {
                showNotification('Please select an image file', 'error');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('Image size should be less than 5MB', 'error');
                return;
            }
            
            // Create preview
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarImage.src = e.target.result;
                
                // In a real app, you would upload the image to a server
                showNotification('Avatar updated successfully', 'success');
            };
            reader.readAsDataURL(file);
        });
    }
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 9999;
        box-shadow: var(--shadow-lg);
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}