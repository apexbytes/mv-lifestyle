// Testimonial data
const testimonials = [
    {
        name: "Alisha Firoz",
        role: "CEO, TechVision Inc.",
        quote: "Working with this digital agency transformed our online presence. Their team's dedication and innovative approach helped us achieve 200% growth in just 6 months.",
        rating: 4.5,
        image: "partners/client.png"
    },
    {
        name: "Michael Rodriguez",
        role: "Marketing Director, BrandBoost",
        quote: "The SEO consultancy service was exceptional! Our organic traffic increased by 150% and we're now ranking on the first page for all our target keywords.",
        rating: 5.0,
        image: "partners/3e463251-58fe-468d-bd5d-ab3964f6d96e.png"
    },
    {
        name: "Sarah Johnson",
        role: "Founder, EcoLiving",
        quote: "The interface design team created a stunning website that perfectly represents our brand. User engagement has tripled since the redesign.",
        rating: 4.8,
        image: "partners/e96f17b6-8021-4a45-a790-1cec2ca565a9.png"
    },
    {
        name: "Alisha Chen",
        role: "CTO, FinTech Solutions",
        quote: "Their digital marketing training empowered our team with skills we use every day. The ROI was evident within the first quarter.",
        rating: 4.7,
        image: "partners/client.png"
    }
];

// DOM Elements
const testimonialImage = document.getElementById('testimonial-image');
const testimonialQuote = document.getElementById('testimonial-quote');
const clientName = document.getElementById('client-name');
const clientRole = document.getElementById('client-role');
const clientRating = document.getElementById('client-rating');
const avatarButtons = document.querySelectorAll('.avatar-btn');
const prevButton = document.getElementById('prev-testimonial');
const nextButton = document.getElementById('next-testimonial');

// State
let currentTestimonialIndex = 0;

// Function to update testimonial display
function updateTestimonial(index) {
    const testimonial = testimonials[index];
    
    // Update content
    testimonialImage.src = testimonial.image;
    testimonialImage.alt = `${testimonial.name} Photo`;
    testimonialQuote.textContent = `"${testimonial.quote}"`;
    clientName.textContent = testimonial.name;
    clientRole.textContent = testimonial.role;
    clientRating.textContent = testimonial.rating;
    
    // Update active avatar
    avatarButtons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update current index
    currentTestimonialIndex = index;
}

// Function to show next testimonial
function nextTestimonial() {
    let nextIndex = currentTestimonialIndex + 1;
    if (nextIndex >= testimonials.length) {
        nextIndex = 0;
    }
    updateTestimonial(nextIndex);
}

// Function to show previous testimonial
function prevTestimonial() {
    let prevIndex = currentTestimonialIndex - 1;
    if (prevIndex < 0) {
        prevIndex = testimonials.length - 1;
    }
    updateTestimonial(prevIndex);
}

// Add click event listeners to avatar buttons
avatarButtons.forEach(button => {
    button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        updateTestimonial(index);
    });
});

// Add click event listeners to navigation buttons
prevButton.addEventListener('click', prevTestimonial);
nextButton.addEventListener('click', nextTestimonial);

// Auto-rotate testimonials every 5 seconds
let autoRotateInterval = setInterval(nextTestimonial, 5000);

// Pause auto-rotation when user interacts
function pauseAutoRotate() {
    clearInterval(autoRotateInterval);
}

// Resume auto-rotation after 10 seconds of inactivity
function resumeAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(nextTestimonial, 5000);
}

// Add event listeners to pause on interaction
prevButton.addEventListener('click', () => {
    pauseAutoRotate();
    setTimeout(resumeAutoRotate, 10000);
});

nextButton.addEventListener('click', () => {
    pauseAutoRotate();
    setTimeout(resumeAutoRotate, 10000);
});

avatarButtons.forEach(button => {
    button.addEventListener('click', () => {
        pauseAutoRotate();
        setTimeout(resumeAutoRotate, 10000);
    });
});

// Initialize with first testimonial
updateTestimonial(0);

// Add keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        prevTestimonial();
        pauseAutoRotate();
        setTimeout(resumeAutoRotate, 10000);
    } else if (event.key === 'ArrowRight') {
        nextTestimonial();
        pauseAutoRotate();
        setTimeout(resumeAutoRotate, 10000);
    }
});

// Add hover effect to avatars
avatarButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.2s ease';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// Add smooth transition effect for testimonial changes
function addTransitionEffect() {
    testimonialImage.style.opacity = '0.7';
    testimonialQuote.style.opacity = '0.7';
    
    setTimeout(() => {
        testimonialImage.style.opacity = '1';
        testimonialQuote.style.opacity = '1';
        testimonialImage.style.transition = 'opacity 0.3s ease';
        testimonialQuote.style.transition = 'opacity 0.3s ease';
    }, 10);
}

// Update the updateTestimonial function to include transition
const originalUpdateTestimonial = updateTestimonial;
updateTestimonial = function(index) {
    addTransitionEffect();
    setTimeout(() => {
        originalUpdateTestimonial(index);
    }, 150);
};
