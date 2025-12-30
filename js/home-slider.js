document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const heroSlider = document.querySelector('.hero-slider');

    if (!heroSlider || slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let slideTimer;

    function showSlide(index) {
        // Wrap around
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Remove active class from current
        slides[currentSlide].classList.remove('active');
        if (dots.length > 0) dots[currentSlide].classList.remove('active');

        // Update current index
        currentSlide = index;

        // Add active class to new
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startTimer() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    function stopTimer() {
        clearInterval(slideTimer);
    }

    // Initialize
    startTimer();

    // Event Listeners for Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopTimer();
            showSlide(index);
            startTimer();
        });
    });

    // Pause on hover (optional, user experience preference)
    heroSlider.addEventListener('mouseenter', stopTimer);
    heroSlider.addEventListener('mouseleave', startTimer);
});
