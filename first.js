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

    heroSection.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    /* ----------------------------------------------------
    2. Parallax effect for hero layers
    ---------------------------------------------------- */
    heroSection.addEventListener('mousemove', (e) => {
        const layers = document.querySelectorAll('.hero-layer');
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        layers[0].style.transform = `translate(${x}px, ${y}px)`;
        layers[1].style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    });

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

            // Subtle 12 degree max rotation for premium feel
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            // Dynamic glow position follows cursor
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Update glow gradient position
            card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 220, 130, 0.2) 0%, #0d0d0d 50%, #1a1a1a 100%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s ease';
            card.style.background = 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    /* ----------------------------------------------------
    4. Initialize Locomotive Scroll (if available)
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
    5. Stats counter animation
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
});
