document.addEventListener('DOMContentLoaded', function() {
    // Menu category navigation
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuSections = document.querySelectorAll('.menu-section');
    
    if (menuCategories.length && menuSections.length) {
        menuCategories.forEach(category => {
            category.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all categories
                menuCategories.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked category
                this.classList.add('active');
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Hide all sections
                menuSections.forEach(section => {
                    section.style.display = 'none';
                });
                
                // Show target section
                if (targetSection) {
                    targetSection.style.display = 'block';
                    
                    // Smooth scroll to section
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Show first category by default
        if (menuCategories.length > 0) {
            menuCategories[0].click();
        }
    }
    
    // Specials tab functionality
    const specialDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Weekend'];
    const today = new Date().getDay(); // 0-6 (Sunday-Saturday)
    let todaySpecial = 'Weekend';
    
    if (today >= 1 && today <= 5) { // Monday-Friday
        todaySpecial = specialDays[today - 1];
    }
    
    // Highlight today's special
    const specialCards = document.querySelectorAll('.special-card');
    specialCards.forEach(card => {
        const day = card.querySelector('.special-badge').textContent;
        if (day === todaySpecial) {
            card.classList.add('today-special');
            card.innerHTML += '<div class="special-tag">Today\'s Special</div>';
        }
    });
    
    // Menu item modal functionality
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('.item-name').textContent;
            const itemDescription = this.querySelector('.item-description').textContent;
            const itemImage = this.querySelector('img').src;
            const itemPrice = this.querySelector('.item-price').textContent;
            
            // Create modal HTML
            const modalHTML = `
                <div class="menu-modal">
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <img src="${itemImage}" alt="${itemName}">
                        <div class="modal-info">
                            <h3>${itemName}</h3>
                            <p class="modal-price">${itemPrice}</p>
                            <p class="modal-description">${itemDescription}</p>
                            <button class="btn-add-to-order">Add to Order</button>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal to DOM
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Modal functionality
            const modal = document.querySelector('.menu-modal');
            const closeBtn = modal.querySelector('.close-modal');
            const addToOrderBtn = modal.querySelector('.btn-add-to-order');
            
            // Show modal
            modal.style.display = 'block';
            
            // Close modal when clicking X
            closeBtn.addEventListener('click', function() {
                modal.remove();
            });
            
            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
            
            // Add to order button
            addToOrderBtn.addEventListener('click', function() {
                showAlert(`${itemName} added to your order!`, 'success');
                modal.remove();
            });
        });
    });
    
    // Show alert function
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `menu-alert menu-alert-${type}`;
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

