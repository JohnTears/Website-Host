document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('reservationForm');
    
    if (bookingForm) {
        // Initialize datepicker
        const dateInput = bookingForm.querySelector('#date');
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        
        dateInput.min = `${yyyy}-${mm}-${dd}`;
        
        // Initialize time input
        const timeInput = bookingForm.querySelector('#time');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        timeInput.value = `${hours}:${minutes}`;
        
        // Form submission
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Get form values
                const formData = {
                    name: this.querySelector('#name').value,
                    email: this.querySelector('#email').value,
                    phone: this.querySelector('#phone').value,
                    date: this.querySelector('#date').value,
                    time: this.querySelector('#time').value,
                    guests: this.querySelector('#guests').value,
                    occasion: this.querySelector('#occasion').value || 'None',
                    specialRequests: this.querySelector('#special-requests').value || 'None'
                };
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    showBookingSuccess(formData);
                    
                    // Reset form
                    this.reset();
                }, 2000);
            }
        });
    }
    
    // Event booking buttons
    const eventButtons = document.querySelectorAll('.btn-event');
    eventButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventTitle = this.closest('.event-info').querySelector('h3').textContent;
            document.querySelector('#occasion').value = 'Event: ' + eventTitle;
            
            // Scroll to booking form
            document.querySelector('#reservationForm').scrollIntoView({
                behavior: 'smooth'
            });
            
            showAlert(`You're booking for the ${eventTitle} event. Please complete the form.`, 'info');
        });
    });
    
    // Show booking success modal
    function showBookingSuccess(data) {
        const modalHTML = `
            <div class="booking-success-modal">
                <div class="modal-content">
                    <div class="modal-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Booking Confirmed!</h3>
                    <div class="booking-details">
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Date:</strong> ${formatDate(data.date)}</p>
                        <p><strong>Time:</strong> ${data.time}</p>
                        <p><strong>Guests:</strong> ${data.guests}</p>
                        ${data.occasion !== 'None' ? `<p><strong>Occasion:</strong> ${data.occasion}</p>` : ''}
                    </div>
                    <p class="confirmation-message">We've sent a confirmation to ${data.email}</p>
                    <button class="btn-close-modal">Done</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.booking-success-modal');
        const closeBtn = modal.querySelector('.btn-close-modal');
        
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
    }
    
    // Format date for display
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    // Show alert function
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `booking-alert booking-alert-${type}`;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.classList.add('fade-out');
            setTimeout(() => {
                alertDiv.remove();
            }, 500);
        }, 3000);
    }
});

