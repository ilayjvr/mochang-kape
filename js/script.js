// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
            testimonial.style.opacity = 0;
            
            if (i === index) {
                // Fade in animation
                setTimeout(() => {
                    testimonial.style.transition = 'opacity 0.5s ease';
                    testimonial.style.opacity = 1;
                }, 10);
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }
    
    // Hide all testimonials except the first one
    if (testimonials.length > 0) {
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Set up dots click event
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showTestimonial(index);
            });
        });
        
        // Set up prev/next buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
            
            nextBtn.addEventListener('click', function() {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
        
        // Auto slide testimonials
        const autoSlideInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Pause auto-slide when hovering over slider
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
        }
    }
    

    function showThankYouModal(message) {
        const modal = document.getElementById("thankYouModal");
        const overlay = document.getElementById("overlay");

        modal.querySelector("strong").textContent = message;
        modal.style.display = "block";
        overlay.style.display = "block";

        // Hide after 3 seconds
        setTimeout(() => {
        modal.style.display = "none";
        overlay.style.display = "none";
        }, 3000);
    }

    document.getElementById("testimonialForm").addEventListener("submit", function (e) {
        e.preventDefault();
        showThankYouModal("Thank you for sharing your insights!");
        this.reset();
    });

    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();
        showThankYouModal("Thank you for getting in touch!");
        this.reset();
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section-header, .menu-item, .gallery-item, .info-item');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    
    // Call once on load to reveal elements already in view
    revealOnScroll();
});