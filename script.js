document.addEventListener('DOMContentLoaded', () => {

    // ===== HERO SLIDER (SECTION C) =====
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.hero-section .prev-btn');
    const nextBtn = document.querySelector('.hero-section .next-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    if (slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow(); // Optional: stop auto-play on manual control
            startSlideShow(); // Optional: restart timer
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });

        showSlide(currentSlide);
        startSlideShow();
    }


    // ===== HORIZONTAL PRODUCT CAROUSELS (SECTION E) =====
    const carousels = document.querySelectorAll('.product-carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevButton = carousel.querySelector('.prev-carousel-btn');
        const nextButton = carousel.querySelector('.next-carousel-btn');
        const trackContainer = carousel.querySelector('.carousel-track-container');

        if (!track || !prevButton || !nextButton) return;

        nextButton.addEventListener('click', () => {
            const scrollAmount = trackContainer.offsetWidth * 0.8; // Scroll 80% of visible width
            track.style.transform = `translateX(${getTranslateX(track) - scrollAmount}px)`;
            updateCarouselButtons(carousel);
        });

        prevButton.addEventListener('click', () => {
            const scrollAmount = trackContainer.offsetWidth * 0.8;
            track.style.transform = `translateX(${getTranslateX(track) + scrollAmount}px)`;
            updateCarouselButtons(carousel);
        });
        
        // Initial button state
        updateCarouselButtons(carousel);
    });

    function getTranslateX(element) {
        const style = window.getComputedStyle(element);
        const matrix = new DOMMatrix(style.transform);
        return matrix.m41;
    }

    function updateCarouselButtons(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const prevButton = carousel.querySelector('.prev-carousel-btn');
        const nextButton = carousel.querySelector('.next-carousel-btn');
        const trackContainer = carousel.querySelector('.carousel-track-container');

        const currentTranslate = getTranslateX(track);
        
        // Hide/show previous button (since we are in RTL, this is the button on the right)
        if (currentTranslate >= 0) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
        }
        
        // Hide/show next button
        const trackWidth = track.scrollWidth;
        const containerWidth = trackContainer.offsetWidth;

        if (Math.abs(currentTranslate) >= (trackWidth - containerWidth)) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
        }
    }


    // ===== DROPDOWN MENU ON HOVER (SECTION A) =====
    const accountMenu = document.querySelector('.account-menu-container');
    if (accountMenu) {
        accountMenu.addEventListener('mouseenter', () => {
            accountMenu.classList.add('active');
        });
        accountMenu.addEventListener('mouseleave', () => {
            accountMenu.classList.remove('active');
        });
    }

    // ===== HAMBURGER/SIDE MENU (SECTION B) =====
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.querySelector('.overlay');
    const closeBtn = sideMenu.querySelector('.close-btn');

    function openMenu() {
        sideMenu.classList.add('active');
        overlay.classList.add('active');
    }

    function closeMenu() {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
    }

    if (hamburgerBtn && sideMenu && overlay && closeBtn) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openMenu();
        });

        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
        });

        overlay.addEventListener('click', () => {
            closeMenu();
        });
    }
});