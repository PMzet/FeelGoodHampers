/*
 * Bloom & Gift - Slider JavaScript
 * Controls the functionality of the home page slider and testimonials
 */

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    initSlider('.hero-slider', '.slider-wrapper .slide', '.slider-dots .dot', '.slider-arrows .prev', '.slider-arrows .next');
    
    // Testimonials Slider
    initSlider('.testimonials', '.testimonial-slide', '.testimonial-dots .dot', null, null);
    
    /**
     * Initialize a slider
     * @param {string} sliderContainer - Selector for the slider container
     * @param {string} slideSelector - Selector for the slides
     * @param {string} dotSelector - Selector for the pagination dots
     * @param {string|null} prevBtnSelector - Selector for previous button, null if not needed
     * @param {string|null} nextBtnSelector - Selector for next button, null if not needed
     */
    function initSlider(sliderContainer, slideSelector, dotSelector, prevBtnSelector, nextBtnSelector) {
        const container = document.querySelector(sliderContainer);
        
        if (!container) return;
        
        const slides = container.querySelectorAll(slideSelector);
        const dots = container.querySelectorAll(dotSelector);
        const prevBtn = prevBtnSelector ? container.querySelector(prevBtnSelector) : null;
        const nextBtn = nextBtnSelector ? container.querySelector(nextBtnSelector) : null;
        
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 5000; // 5 seconds per slide
        
        // Start automatic sliding
        startSlideInterval();
        
        // Set up navigation dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetSlideInterval();
            });
        });
        
        // Set up arrow navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
                resetSlideInterval();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
                resetSlideInterval();
            });
        }
        
        // Pause slider on hover
        container.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Resume slider on mouse leave
        container.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
        
        // Function to go to a specific slide
        function goToSlide(index) {
            // Handle wrapping around at the ends
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            
            // Update slides
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            
            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            // Update current slide index
            currentSlide = index;
        }
        
        // Start automatic sliding
        function startSlideInterval() {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, intervalTime);
        }
        
        // Reset slide interval
        function resetSlideInterval() {
            clearInterval(slideInterval);
            startSlideInterval();
        }
    }
}); 