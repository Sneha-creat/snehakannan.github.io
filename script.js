document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar-modern');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Active Link Highlighting
    const navItems = document.querySelectorAll('.nav-links-modern a');
    const sections = document.querySelectorAll('section');

    function highlightNav() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active-nav');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active-nav');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // 1. Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links-modern');

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
    const greetingElement = document.querySelector('.greeting-gold') || document.querySelector('.greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greetingText = "Hello, I'm";

        if (hour >= 5 && hour < 12) greetingText = "Good Morning, I'm";
        else if (hour >= 12 && hour < 18) greetingText = "Good Afternoon, I'm";
        else greetingText = "Good Evening, I'm";

        greetingElement.textContent = greetingText;
    }

    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.querySelector('i').classList.remove('fa-times');
                    navToggle.querySelector('i').classList.add('fa-bars');
                }
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 4. Tech Tag Hover (If present)
    const techTags = document.querySelectorAll('.tech-tag');
    const colors = ['#f6ad55', '#4fd1c5', '#9f7aea', '#ed64a6', '#48bb78'];
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
            tag.style.color = 'white';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.borderColor = 'transparent';
            tag.style.color = '#a0aec0';
        });
    });

    // 5. Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.fade-in-up, .edu-card, .work-item, .impact-item').forEach(el => observer.observe(el));

    // 6. Dynamic Floating Skills (New)
    const skillsList = [
        { icon: 'fa-microsoft', text: 'Power Apps' },
        { icon: 'fa-chart-bar', text: 'Power BI' },
        { icon: 'fa-bolt', text: 'Power Automate' },
        { icon: 'fa-robot', text: 'Copilot' },
        { icon: 'fa-brain', text: 'Neurology' },
        { icon: 'fa-image', text: 'Image Processing' },
        { icon: 'fa-project-diagram', text: 'ML & DL' }
    ];

    const card1 = document.getElementById('float-c1');
    const card2 = document.getElementById('float-c2');

    if (card1 && card2) {
        let index = 0;

        setInterval(() => {
            // Update Card 1
            const skill1 = skillsList[index % skillsList.length];
            updateCard(card1, skill1);

            // Update Card 2 (offset by 1)
            const skill2 = skillsList[(index + 1) % skillsList.length];
            setTimeout(() => updateCard(card2, skill2), 1000); // Stagger update

            index = (index + 2) % skillsList.length;
        }, 3500); // Change every 3.5 seconds
    }

    function updateCard(card, skill) {
        if (!card) return;
        card.style.opacity = '0';
        setTimeout(() => {
            const iconEl = card.querySelector('i');
            // Check if it's a brand icon or solid icon
            if (skill.icon.includes('microsoft')) iconEl.className = `fab ${skill.icon}`;
            else iconEl.className = `fas ${skill.icon}`;

            card.querySelector('.skill-text').innerText = skill.text;
            card.style.opacity = '1';
        }, 300);
    }

    // 7. Contact Form
    const contactForm = document.getElementById('google-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            setTimeout(() => {
                contactForm.reset();
                btn.innerText = 'Message Sent!';
                setTimeout(() => { btn.innerText = originalText; }, 3000);
            }, 1500);
        });
    }

    // 8. 3D Tilt for Modern Cards
    const cards = document.querySelectorAll('.project-card-modern');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            // Enhanced tilt range slightly
            const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -8;
            const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // 9. Profile Flip Animation with Pause Logic
    const flipCardInner = document.querySelector('.flip-card-inner');
    let isFlipped = false;
    let isLocked = false;

    if (flipCardInner) {
        const handleFlip = () => {
            if (isLocked) return;

            isFlipped = !isFlipped;
            if (isFlipped) {
                flipCardInner.classList.add('flipped');
                // Lock the flip for 4 seconds after turning to back
                isLocked = true;
                setTimeout(() => {
                    isLocked = false;
                }, 4000);
            } else {
                flipCardInner.classList.remove('flipped');
            }
        };

        // Hover for desktop
        flipCardInner.closest('.flip-card').addEventListener('mouseenter', () => {
            if (!isFlipped && !isLocked) {
                isFlipped = true;
                flipCardInner.classList.add('flipped');
                isLocked = true;
                setTimeout(() => { isLocked = false; }, 4000);
            }
        });

        flipCardInner.closest('.flip-card').addEventListener('mouseleave', () => {
            // Only flip back if not locked
            if (isFlipped && !isLocked) {
                isFlipped = false;
                flipCardInner.classList.remove('flipped');
            }
        });

        // Click/Tap for mobile & explicit action
        flipCardInner.addEventListener('click', handleFlip);
    }
});
