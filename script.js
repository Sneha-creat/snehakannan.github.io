document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Dynamic Greeting based on time
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greetingText = "Hello, I'm";

        if (hour >= 5 && hour < 12) greetingText = "Good Morning, I'm";
        else if (hour >= 12 && hour < 18) greetingText = "Good Afternoon, I'm";
        else greetingText = "Good Evening, I'm";

        greetingElement.textContent = greetingText;
    }

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // If mobile menu is open, close it
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.querySelector('i').classList.remove('fa-times');
                    navToggle.querySelector('i').classList.add('fa-bars');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Tech Tag Hover Effect (Random Color Border)
    const techTags = document.querySelectorAll('.tech-tag');
    const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#10b981'];

    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            tag.style.borderColor = randomColor;
            tag.style.color = 'white';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.borderColor = 'transparent';
            tag.style.color = '#a1a1aa';
        });
    });

    // 5. Intersection Observer for Fade In (Re-using old class logic if present)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // 6. Hero Parallax Effect
    const heroText = document.getElementById('parallax-text');
    if (heroText) {
        window.addEventListener('scroll', () => {
            let offset = window.scrollY;
            heroText.style.transform = `translate(-50%, calc(-50% + ${offset * 0.3}px))`;
        });
    }
});
