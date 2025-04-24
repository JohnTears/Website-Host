document.addEventListener('DOMContentLoaded', function() {
    // Initialize filter functionality
    const filterButtons = document.querySelectorAll('.gallery-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize Lightbox if available
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'alwaysShowNavOnTouchDevices': true,
            'albumLabel': 'Image %1 of %2'
        });
    }
    
    // Video play button functionality
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        const video = videoContainer.querySelector('video');
        const playButton = document.createElement('button');
        playButton.className = 'video-play-button';
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        
        videoContainer.appendChild(playButton);
        
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
    }
    
    // Instagram feed simulation (in a real app, you would use the Instagram API)
    const instagramPlaceholder = document.querySelector('.instagram-placeholder');
    if (instagramPlaceholder) {
        // This is just a placeholder - in a real implementation you would:
        // 1. Make an API call to Instagram
        // 2. Process the response
        // 3. Create and append image elements to the feed
        
        setTimeout(() => {
            instagramPlaceholder.innerHTML = `
                <div class="instagram-message">
                    <i class="fab fa-instagram fa-3x"></i>
                    <p>Connect to Instagram to display your feed</p>
                    <a href="#" class="btn-instagram-connect">Connect Account</a>
                </div>
            `;
            
            const connectBtn = document.querySelector('.btn-instagram-connect');
            if (connectBtn) {
                connectBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('In a real implementation, this would connect to Instagram API');
                });
            }
        }, 1500);
    }
    
    // Image lazy loading
    const lazyImages = document.querySelectorAll('.gallery-item img[data-src]');
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

