// ===========================
// Tekoha Solutions — Main JS
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initCounterAnimation();
    initContactForm();
    initMockupAnimations();
});

// --- Navbar ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 400) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });

    // Mobile toggle
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu on link click
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// --- Smooth Scroll ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger children if they exist
                const children = entry.target.querySelectorAll('.service-card, .solution-item, .testimonial-card, .process-step');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// --- Counter Animation ---
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Easing function (ease-out cubic)
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.round(eased * target);
                        counter.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    }

                    requestAnimationFrame(updateCounter);
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// --- Contact Form ---
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('#submit-btn');
        const originalContent = btn.innerHTML;

        // Animate button
        btn.innerHTML = `
            <svg class="spinner" width="20" height="20" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="40" stroke-dashoffset="10">
                    <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="0.8s" repeatCount="indefinite"/>
                </circle>
            </svg>
            Enviando...
        `;
        btn.disabled = true;

        // Simulate sending
        setTimeout(() => {
            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ¡Mensaje enviado!
            `;
            btn.classList.add('success');

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                btn.classList.remove('success');
                form.reset();
            }, 3000);
        }, 1500);
    });
}

// --- Mockup Chart Animations ---
function initMockupAnimations() {
    const mockup = document.querySelector('.hero-mockup');
    if (!mockup) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mockup.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });

    observer.observe(mockup);
}

// --- Parallax on Mouse Move (subtle, hero only) ---
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    if (e.clientY > rect.bottom) return;

    const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, i) => {
        const speed = (i + 1) * 5;
        card.style.transform = `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
    });

    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, i) => {
        const speed = (i + 1) * 3;
        shape.style.transform = `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
    });
});
