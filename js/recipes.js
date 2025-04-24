document.addEventListener('DOMContentLoaded', function() {
    // Recipe category navigation
    const recipeCategories = document.querySelectorAll('.recipe-categories a');
    
    recipeCategories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all categories
            recipeCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Smooth scroll to section
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Print recipe functionality
    const printButtons = document.querySelectorAll('.btn-print');
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeCard = this.closest('.recipe-card');
            const recipeTitle = recipeCard.querySelector('h3').textContent;
            
            // Create print content
            const printContent = `
                <div class="print-recipe">
                    <h1>${recipeTitle}</h1>
                    ${recipeCard.innerHTML}
                    <div class="print-footer">
                        <p>Printed from Onesmus Restaurant Recipes</p>
                        <p>${new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            `;
            
            // Open print window
            const printWindow = window.open('', '', 'width=800,height=600');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>${recipeTitle} Recipe</title>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .print-recipe { padding: 20px; max-width: 800px; margin: 0 auto; }
                            .print-recipe h1 { color: #e67e22; text-align: center; }
                            .print-recipe img { max-width: 100%; height: auto; }
                            .recipe-meta { display: flex; gap: 20px; margin: 15px 0; }
                            .recipe-ingredients ul { margin-left: 20px; }
                            .recipe-steps ol { margin-left: 20px; }
                            .print-footer { margin-top: 30px; text-align: center; font-size: 0.9em; color: #777; }
                            @page { size: auto; margin: 10mm; }
                        </style>
                    </head>
                    <body>
                        ${printContent}
                        <script>
                            window.onload = function() {
                                window.print();
                                setTimeout(function() {
                                    window.close();
                                }, 1000);
                            };
                        </script>
                    </body>
                </html>
            `);
        });
    });
    
    // Save recipe functionality
    const saveButtons = document.querySelectorAll('.btn-save');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeCard = this.closest('.recipe-card');
            const recipeTitle = recipeCard.querySelector('h3').textContent;
            
            // In a real app, you would save to local storage or database
            showRecipeAlert(`"${recipeTitle}" has been saved to your recipe box`, 'success');
            
            // Change button state
            this.innerHTML = '<i class="fas fa-check"></i> Saved';
            this.disabled = true;
        });
    });
    
    // Video play button functionality
    const recipeVideos = document.querySelectorAll('.recipe-video video');
    recipeVideos.forEach(video => {
        const playButton = document.createElement('button');
        playButton.className = 'video-play-button';
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        
        video.parentNode.insertBefore(playButton, video);
        
        playButton.addEventListener('click', function() {
            video.play();
            this.style.display = 'none';
        });
        
        video.addEventListener('play', function() {
            playButton.style.display = 'none';
        });
        
        video.addEventListener('pause', function() {
            playButton.style.display = 'block';
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate subscription
                showRecipeAlert(`Thank you for subscribing with ${email}`, 'success');
                this.reset();
            }
        });
    }
    
    // Show recipe alert
    function showRecipeAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `recipe-alert recipe-alert-${type}`;
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

