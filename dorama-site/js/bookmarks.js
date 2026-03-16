// js/bookmarks.js
let currentDramaId = null;
let currentDramaTitle = '';

function initBookmarkModal() {
    const bookmarkModal = document.getElementById('bookmarkModal');
    const closeModalBtn = document.getElementById('closeBookmarkModal');
    const cancelBtn = document.getElementById('cancelBookmark');
    const saveBtn = document.getElementById('saveBookmark');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeBookmarkModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeBookmarkModal);
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveBookmark);
    }
    
    // Close modal when clicking outside
    if (bookmarkModal) {
        bookmarkModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeBookmarkModal();
            }
        });
    }
}

function openBookmarkModal(dramaId, dramaTitle) {
    const modal = document.getElementById('bookmarkModal');
    const titleSpan = document.getElementById('modalDramaTitle');
    
    currentDramaId = dramaId;
    currentDramaTitle = dramaTitle;
    
    if (titleSpan) {
        titleSpan.textContent = dramaTitle;
    }
    
    // Check if already bookmarked
    const user = JSON.parse(localStorage.getItem('doramanight_user'));
    const bookmarks = JSON.parse(localStorage.getItem('doramanight_bookmarks')) || {};
    
    if (user && bookmarks[user.username] && bookmarks[user.username][dramaId]) {
        const status = bookmarks[user.username][dramaId].status;
        const radioBtn = document.querySelector(`input[name="bookmarkStatus"][value="${status}"]`);
        if (radioBtn) {
            radioBtn.checked = true;
        }
    } else {
        // Reset all radio buttons
        document.querySelectorAll('input[name="bookmarkStatus"]').forEach(rb => {
            rb.checked = false;
        });
    }
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBookmarkModal() {
    const modal = document.getElementById('bookmarkModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function saveBookmark() {
    const selectedStatus = document.querySelector('input[name="bookmarkStatus"]:checked');
    
    if (!selectedStatus) {
        alert('Please select a status for your bookmark.');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('doramanight_user'));
    
    if (!user || !user.isLoggedIn) {
        alert('Please login to save bookmarks.');
        closeBookmarkModal();
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
        return;
    }
    
    const status = selectedStatus.value;
    const username = user.username;
    
    // Get existing bookmarks
    let bookmarks = JSON.parse(localStorage.getItem('doramanight_bookmarks')) || {};
    
    // Initialize user's bookmark object if it doesn't exist
    if (!bookmarks[username]) {
        bookmarks[username] = {};
    }
    
    // Save bookmark
    bookmarks[username][currentDramaId] = {
        dramaId: currentDramaId,
        dramaTitle: currentDramaTitle,
        status: status,
        addedDate: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('doramanight_bookmarks', JSON.stringify(bookmarks));
    
    // Update bookmark icon on the card
    updateBookmarkIcon(currentDramaId, status);
    
    // Show success message
    alert(`"${currentDramaTitle}" added to ${status} bookmarks!`);
    
    closeBookmarkModal();
}

function updateBookmarkIcon(dramaId, status) {
    const bookmarkBtn = document.querySelector(`.card-bookmark[data-drama-id="${dramaId}"]`);
    if (!bookmarkBtn) return;
    
    const icon = bookmarkBtn.querySelector('i');
    if (icon) {
        icon.className = 'fas fa-bookmark';
        
        // Add status-specific color
        bookmarkBtn.style.color = getBookmarkColor(status);
    }
}

function getBookmarkColor(status) {
    switch(status) {
        case 'watching': return '#4CAF50';
        case 'planned': return '#2196F3';
        case 'completed': return '#9C27B0';
        case 'dropped': return '#F44336';
        case 'favorites': return '#FF9800';
        default: return '#7B61FF';
    }
}