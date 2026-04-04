document.addEventListener('DOMContentLoaded', () => {
    /* ----------------------------------------------------
    1. Cursor Tracking with requestAnimationFrame
    ---------------------------------------------------- */
    const heroSection = document.getElementById('hero');
    const root = document.documentElement;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    let baseRadius = 150;
    let currentRadius = baseRadius;
    let lastX = currentX;
    let lastY = currentY;

    function animateCursor() {
        currentX += (targetX - currentX) * 0.25;
        currentY += (targetY - currentY) * 0.25;

        // Calculate movement speed
        const speed = Math.sqrt(Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2));
        lastX = currentX;
        lastY = currentY;

        // Dynamic radius based on speed
        const dynamicTargetRadius = baseRadius + Math.min(speed * 3, 100);
        currentRadius += (dynamicTargetRadius - currentRadius) * 0.1;

        root.style.setProperty('--x', `${currentX}px`);
        root.style.setProperty('--y', `${currentY}px`);
        root.style.setProperty('--cursor-radius', `${currentRadius}px`);

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        });
    }

    /* ----------------------------------------------------
    2. Parallax effect for hero layers
    ---------------------------------------------------- */
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const layers = document.querySelectorAll('.hero-layer');
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            layers[0].style.transform = `translate(${x}px, ${y}px)`;
            layers[1].style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
        });
    }

    /* ----------------------------------------------------
    3. 3D Premium Tilt Effect with Dynamic Glow on Work Cards
    ---------------------------------------------------- */
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Subtle 10 degree max rotation for premium feel
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            // Dynamic glow position follows cursor (in percentage)
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;

            // Apply transform
            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Set CSS custom properties for dynamic glow positioning
            card.style.setProperty('--mouse-x', `${glowX}%`);
            card.style.setProperty('--mouse-y', `${glowY}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    /* ----------------------------------------------------
    4. Big Words Scroll Animation
    ---------------------------------------------------- */
    const bigWordsSection = document.querySelector('.big-words-section');
    if (bigWordsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const words = entry.target.querySelectorAll('.big-words-row span');
                    words.forEach((word, index) => {
                        setTimeout(() => {
                            word.style.opacity = word.classList.contains('-highlighted') ? '1' : '0.15';
                            word.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }
            });
        }, { threshold: 0.3 });

        observer.observe(bigWordsSection);
    }

    /* ----------------------------------------------------
    5. Initialize Locomotive Scroll (if available)
    ---------------------------------------------------- */
    if (typeof LocomotiveScroll !== 'undefined') {
        try {
            const scroll = new LocomotiveScroll({
                el: document.querySelector('#main'),
                smooth: true,
                tablet: true
            });
        } catch (e) {
            console.log('Locomotive Scroll not fully loaded, using native scroll');
        }
    }

    /* ----------------------------------------------------
    6. Stats counter animation with CHD style
    ---------------------------------------------------- */
    const statBoxes = document.querySelectorAll('.stat-box');

    const animateStats = () => {
        statBoxes.forEach(box => {
            const rect = box.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                box.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load

    /* ----------------------------------------------------
    7. Magnetic cursor effect for buttons and links
    ---------------------------------------------------- */
    const magneticElements = document.querySelectorAll('.btn, .contact-link, .chd-link');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
});
