document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('reservationForm');
    const showPasswordBtn = document.getElementById('showPassword');
    const passwordInput = document.getElementById('password');
    
    // Toggle password visibility
    if (showPasswordBtn && passwordInput) {
        showPasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Simulate login process
                const email = this.querySelector('#email').value;
                const password = this.querySelector('#password').value;
                const rememberMe = this.querySelector('#remember').checked;
                
                // Here you would typically make an AJAX request to your server
                console.log('Login attempt with:', { email, password, rememberMe });
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // For demo purposes, we'll assume login is successful
                    submitBtn.textContent = 'Login Successful!';
                    showAlert('You have been logged in successfully!', 'success');
                    
                    // Redirect to admin page (or appropriate page based on user role)
                    setTimeout(() => {
                        window.location.href = 'admin.html';
                    }, 1500);
                    
                }, 2000);
            } else {
                showAlert('Please fill in all required fields correctly.', 'error');
            }
        });
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            showAlert(`Redirecting to ${provider} login...`, 'info');
            
            // In a real implementation, you would initiate the OAuth flow here
        });
    });
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('Password reset link will be sent to your email if it exists in our system.', 'info');
        });
    }
});

