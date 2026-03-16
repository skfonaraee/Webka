// js/auth.js

function validateUsername(username) {
    const regex = /^[a-zA-Z0-9_]{8,16}$/;
    if (!regex.test(username)) {
        return 'Username must be 8-16 characters, contain letters and numbers (letters required), underscore allowed.';
    }
    
    if (/^\d+$/.test(username)) {
        return 'Username cannot be numbers only.';
    }
    
    return null;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return 'Please enter a valid email address.';
    }
    return null;
}

function validatePassword(password) {
    if (password.length < 8) {
        return 'Password must be at least 8 characters.';
    }
    
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter.';
    }
    
    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter.';
    }
    
    if (!/\d/.test(password)) {
        return 'Password must contain at least one number.';
    }
    
    return null;
}

// Initialize auth state and show/hide login/profile
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
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('doramanight_user');
            window.location.reload();
        });
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

// Helper function to generate drama poster
function getDramaPoster(drama) {
    // Generate consistent color based on drama ID
    const colors = ['7B61FF', '4D3B9B', '6C5CE7', 'A29BFE', '00CEC9', '00B894', 'FDCB6E', 'E17055', 'D63031'];
    const colorIndex = drama.id % colors.length;
    const bgColor = '1A1628';
    const title = encodeURIComponent(drama.title.substring(0, 2).toUpperCase());
    
    return `https://ui-avatars.com/api/?name=${title}&background=${colors[colorIndex]}&color=${bgColor}&size=400&font-size=0.5&bold=true&length=2`;
}