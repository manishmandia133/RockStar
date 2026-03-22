document.addEventListener('DOMContentLoaded', () => {
    /* ----------------------------------------------------
       1. Cursor Tracking with requestAnimationFrame for Zero Lag
    ---------------------------------------------------- */
    const heroSection = document.getElementById('hero');
    const root = document.documentElement;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    // Dynamic Radius variables
    let baseRadius = 150;
    let currentRadius = 150;
    let lastX = currentX;
    let lastY = currentY;

    // Randomly change the base size of the circle every 1.5s
    setInterval(() => {
        baseRadius = Math.random() * 100 + 100; // Random value between 100 and 200
    }, 1500);

    // Use a small lerp to make the tracking feel perfectly smooth and sharp
    function animateCursor() {
        currentX += (targetX - currentX) * 0.25;
        currentY += (targetY - currentY) * 0.25;

        // Calculate movement speed to dynamically expand circle on movement
        const speed = Math.sqrt(Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2));
        lastX = currentX;
        lastY = currentY;

        // The target radius combines the random base size with speed-based expansion
        const dynamicTargetRadius = baseRadius + Math.min(speed * 3, 100);
        currentRadius += (dynamicTargetRadius - currentRadius) * 0.1; // Smooth interpolate the radius

        root.style.setProperty('--x', `${currentX}px`);
        root.style.setProperty('--y', `${currentY}px`);
        root.style.setProperty('--cursor-radius', `${currentRadius}px`);

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    heroSection.addEventListener('mousemove', (e) => {
        // Record target exactly where the mouse is
        targetX = e.clientX;
        targetY = e.clientY;
    });
});