// ===========================
// DOM ELEMENTS
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const particleContainer = document.getElementById('particleContainer');
const typingText = document.querySelector('.typing-text');

// ===========================
// PARTICLES ANIMATION
// ===========================

function createParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const randomX = Math.random() * window.innerWidth;
        const randomY = window.innerHeight + 10;
        const randomDelay = Math.random() * 5;
        const randomDuration = 10 + Math.random() * 10;
        
        particle.style.left = randomX + 'px';
        particle.style.top = randomY + 'px';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = randomDuration + 's';
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation ends
        setTimeout(() => {
            particle.remove();
        }, (randomDelay + randomDuration) * 1000);
    }
}

// Create particles periodically
setInterval(createParticles, 3000);
createParticles();

// ===========================
// TYPING ANIMATION
// ===========================

function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    const fullName = 'Eswar Chandra Vidya Sagar';
    typeWriter(typingText, fullName, 50); 
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================

const revealElements = () => {
    const reveals = document.querySelectorAll(
        '.skill-card, .project-card, .timeline-item, .about-glass, .contact-info, .contact-form'
    );
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', () => {
    revealElements();
});

// Initial check on page load
window.addEventListener('load', () => {
    revealElements();
});

// ===========================
// SMOOTH SCROLL NAVIGATION
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
});

// ===========================
// CONTACT FORM HANDLING
// ===========================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Show success message (UI only)
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
        
        console.log('Form submitted with data:', Object.fromEntries(formData));
    });
}

// ===========================
// PAGE SCROLL ENHANCEMENT
// ===========================

// Add scroll progress bar effect
const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight);
    
    // Optional: You can add a progress bar here
    // progressBar.style.width = scrolled * 100 + '%';
};

window.addEventListener('scroll', updateScrollProgress);

// ===========================
// PARALLAX EFFECT ON SCROLL
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const gradientSpheres = document.querySelectorAll('.gradient-sphere');
    
    gradientSpheres.forEach((sphere, index) => {
        sphere.style.transform = `translate(0, ${scrolled * 0.5 * (index + 1)}px)`;
    });
});

// ===========================
// INTERSECTION OBSERVER FOR LAZY ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ===========================
// BUTTON HOVER EFFECTS
// ===========================

const buttons = document.querySelectorAll('.btn, .project-btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===========================
// CARD HOVER EFFECTS
// ===========================

const cards = document.querySelectorAll('.skill-card, .project-card, .about-glass');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===========================
// RESPONSIVE NAVBAR
// ===========================

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.7)';
    }
});

// ===========================
// GLOW EFFECT ON CURSOR MOVEMENT
// ===========================

document.addEventListener('mousemove', (e) => {
    const glowCards = document.querySelectorAll('.glass-effect');
    
    glowCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Only apply effect if cursor is over the card
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        }
    });
});

// ===========================
// VIEWPORT ANIMATIONS
// ===========================

const animateOnScroll = () => {
    const elements = document.querySelectorAll('[class*="card"], [class*="item"]');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementBottom = el.getBoundingClientRect().bottom;
        
        const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
        
        if (isVisible && !el.classList.contains('fade-in')) {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, Math.random() * 200);
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===========================
// DYNAMIC PROJECT LINKS
// ===========================

// Update GitHub and Demo links if needed
const projectLinks = document.querySelectorAll('.project-btn');

projectLinks.forEach((link, index) => {
    if (link.innerHTML.includes('GitHub')) {
        link.href = 'https://github.com';
        link.target = '_blank';
    } else if (link.innerHTML.includes('Demo')) {
        link.href = '#';
    }
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const throttledScroll = throttle(() => {
    revealElements();
    animateOnScroll();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ===========================
// PRELOAD ANIMATIONS
// ===========================

// Reduce animation stuttering on first load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===========================
// WELCOME CONSOLE MESSAGE
// ===========================

console.log(
    '%cWelcome to Eswar\'s Portfolio!',
    'font-size: 20px; font-weight: bold; color: #00d4ff;'
);
console.log(
    '%cFeel free to explore and check out the source code.',
    'font-size: 12px; color: #a0a0a0;'
);

// ===========================
// INITIALIZATION
// ===========================

// Ensure everything is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add initial fade-in to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
    }
    
    // Initialize all animations
    revealElements();
    animateOnScroll();
});
