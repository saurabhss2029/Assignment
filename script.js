document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const backToTopButton = document.getElementById('back-to-top');

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });

    // Load dark mode preference
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Show back to top button on scroll
    window.onscroll = function() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    backToTopButton.addEventListener('click', () => {
        document.body.scrollIntoView({ behavior: 'smooth' });
    });

    // Scroll Animation for Character Section
    const charactersSection = document.querySelector('.characters');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                charactersSection.classList.add('visible');
            }
        });
    });

    observer.observe(charactersSection);
});

// Hamburger Menu Toggle
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// Carousel functionality
let currentSlide = 0;
let autoplay = true; // Control autoplay state

function moveCarousel(direction, carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-images img');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });

    updateCarouselPagination(carouselId);
}

// Update carousel pagination
function updateCarouselPagination(carouselId) {
    const slides = document.getElementById(carouselId).querySelectorAll('.carousel-images img');
    const pagination = document.querySelector(`#${carouselId} .carousel-pagination`);
    pagination.innerHTML = ''; // Clear existing pagination
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => {
            currentSlide = index;
            moveCarousel(0, carouselId); // move to the clicked slide
        });
        pagination.appendChild(dot);
    });
    pagination.children[currentSlide].classList.add('active'); // Set active class on current dot
}

// Auto-play carousel functionality
let autoplayInterval;

function startAutoplay() {
    if (autoplay) {
        autoplayInterval = setInterval(() => {
            moveCarousel(1, 'supernatural-carousel');
        }, 5000); // Change every 5 seconds
    }
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

function toggleAutoplay() {
    autoplay = !autoplay;
    const button = document.getElementById('pause-autoplay');
    button.textContent = autoplay ? 'Pause' : 'Resume';
    if (autoplay) {
        startAutoplay();
    } else {
        stopAutoplay();
    }
}

// Initialize autoplay on page load
startAutoplay();

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside of modal content
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// Character filtering functionality
function filterCharacters() {
    const input = document.getElementById('search-bar').value.toLowerCase();
    const characters = document.querySelectorAll('.character');
    characters.forEach(character => {
        const name = character.querySelector('h3').textContent.toLowerCase();
        if (name.includes(input)) {
            character.style.display = 'block';
        } else {
            character.style.display = 'none';
        }
    });
}

// Testimonial submission functionality
function submitTestimonial(event) {
    event.preventDefault();
    const testimonialInput = document.getElementById('testimonial-input');
    const testimonialText = testimonialInput.value;

    const newTestimonial = document.createElement('div');
    newTestimonial.classList.add('testimonial');
    newTestimonial.innerHTML = `<p>"${testimonialText}"</p><h4>- You</h4>`;
    
    const testimonialGrid = document.getElementById('testimonial-grid');
    testimonialGrid.appendChild(newTestimonial);

    testimonialInput.value = ''; // Clear input
}

// Update current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();
