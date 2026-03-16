// js/login.js
document.addEventListener('DOMContentLoaded', function() {
    initLoginPage();
    initPasswordToggles();
});

function initLoginPage() {
    // Tab switching
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabName}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Switch links
    document.querySelectorAll('.switch-to-register').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.auth-tab[data-tab="register"]').click();
        });
    });
    
    document.querySelectorAll('.switch-to-login').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.auth-tab[data-tab="login"]').click();
        });
    });
    
    // Form submissions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
        
        // Password strength indicator
        const passwordInput = document.getElementById('registerPassword');
        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }
    }
}

function initPasswordToggles() {
    // Toggle password visibility
    document.querySelectorAll('.fa-eye').forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                this.className = 'fas fa-eye';
            }
        });
    });
}

function updatePasswordStrength() {
    const password = this.value;
    const strengthMeter = document.getElementById('passwordStrength');
    
    if (!password) {
        strengthMeter.style.width = '0%';
        strengthMeter.className = 'strength-meter';
        return;
    }
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    
    // Character variety
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/\d/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    // Update meter
    strengthMeter.style.width = `${Math.min(strength, 100)}%`;
    
    // Update color
    if (strength < 40) {
        strengthMeter.className = 'strength-meter strength-weak';
    } else if (strength < 70) {
        strengthMeter.className = 'strength-meter strength-medium';
    } else {
        strengthMeter.className = 'strength-meter strength-strong';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Clear previous errors
    clearErrors('login');
    
    // Validate inputs
    let isValid = true;
    
    if (!username) {
        showError('loginUsernameError', 'Please enter your username or email');
        isValid = false;
    }
    
    if (!password) {
        showError('loginPasswordError', 'Please enter your password');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // In a real app, you would send this to a server
    // For demo purposes, we'll use a simple validation
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('doramanight_users')) || {};
    let user = null;
    
    // Find user by username or email
    for (const userId in users) {
        const currentUser = users[userId];
        if (currentUser.username === username || currentUser.email === username) {
            if (currentUser.password === password) { // In real app, you would hash the password
                user = currentUser;
                break;
            }
        }
    }
    
    if (user) {
        // Create session
        const sessionUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            isLoggedIn: true,
            memberSince: user.memberSince || new Date().getFullYear()
        };
        
        localStorage.setItem('doramanight_user', JSON.stringify(sessionUser));
        
        // Show success message
        showSuccess('loginSuccess', 'Login successful! Redirecting...');
        
        // Redirect to home page after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showError('loginPasswordError', 'Invalid username/email or password');
    }
}

function handleRegistration(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAgreed = document.getElementById('termsAgreement').checked;
    
    // Clear previous errors
    clearErrors('register');
    
    // Validate inputs
    let isValid = true;
    
    // Validate username
    const usernameError = validateUsername(username);
    if (usernameError) {
        showError('registerUsernameError', usernameError);
        isValid = false;
    }
    
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
        showError('registerEmailError', emailError);
        isValid = false;
    }
    
    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
        showError('registerPasswordError', passwordError);
        isValid = false;
    }
    
    // Check password confirmation
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
    }
    
    // Check terms agreement
    if (!termsAgreed) {
        showError('termsError', 'You must agree to the Terms of Service');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('doramanight_users')) || {};
    const usernameExists = Object.values(users).some(user => user.username === username);
    const emailExists = Object.values(users).some(user => user.email === email);
    
    if (usernameExists) {
        showError('registerUsernameError', 'Username already taken');
        return;
    }
    
    if (emailExists) {
        showError('registerEmailError', 'Email already registered');
        return;
    }
    
    // Create new user
    const userId = Date.now().toString();
    const newUser = {
        id: userId,
        username: username,
        email: email,
        password: password, // In real app, you would hash this
        memberSince: new Date().getFullYear(),
        createdAt: new Date().toISOString()
    };
    
    // Save user
    users[userId] = newUser;
    localStorage.setItem('doramanight_users', JSON.stringify(users));
    
    // Create session
    const sessionUser = {
        id: userId,
        username: username,
        email: email,
        isLoggedIn: true,
        memberSince: newUser.memberSince
    };
    
    localStorage.setItem('doramanight_user', JSON.stringify(sessionUser));
    
    // Show success message
    showSuccess('registerSuccess', 'Registration successful! Welcome to DoramaNight!');
    
    // Redirect to home page after delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function clearErrors(formType) {
    const errorElements = document.querySelectorAll(`#${formType}Form .error-message`);
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    const successElements = document.querySelectorAll(`#${formType}Form .success-message`);
    successElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}