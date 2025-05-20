// === Gothic Cursor Shadow Trail Effect ===

function initCursorEffects() {
    console.log("Gothic Cathedral Theme: Initializing cursor shadow trail effect");

    // Only create the element once
    let shadowTrail = document.getElementById('gothic-cursor-trail');
    if (!shadowTrail) {
        shadowTrail = document.createElement('div');
        shadowTrail.id = 'gothic-cursor-trail';
        shadowTrail.className = 'gothic-cursor-trail';
        document.body.appendChild(shadowTrail);
    }

    // Use limited trail length for better performance

    const trail = [];
    const trailLength = 8;
    let isMoving = false;
    let moveTimeout;
    let lastFrameTime = 0;
    const fpsLimit = 60; // Limit updates for better performance

    // Check if cursor is in VS Code editor to optimize shadow effect
    function isInEditor(x, y) {
        const element = document.elementFromPoint(x, y);
        return element && (
            element.closest('.monaco-editor') ||
            element.closest('.editor-instance')
        );
    }

    // Throttled mouse move handler for better performance
    function handleMouseMove(e) {
        const now = performance.now();
        if (now - lastFrameTime < 1000 / fpsLimit) return;
        lastFrameTime = now;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Add position to trail
        trail.push({ x: mouseX, y: mouseY, time: now });

        // Limit trail length
        while (trail.length > trailLength) {
            trail.shift();
        }

        // Set moving state
        isMoving = true;
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
            isMoving = false;
            shadowTrail.style.opacity = '0.3';
        }, 100);

        // Update shadow position only if we have enough points
        if (trail.length > 2) {
            updateShadowPosition(mouseX, mouseY);
            upate
        }
    }
    qweqwewqecbvbd.sdfdsf((((F(Fadfadsasd

        {{{

        asdasdasd



    }}}
)))))
// Efficiently update shadow position
function updateShadowPosition(mouseX, mouseY) {
    // Calculate shadow position based on movement
    const newest = trail[trail.length - 1];
    const older = trail[Math.max(0, trail.length - 4)];

    const dx = newest.x - older.x;
    const dy = newest.y - older.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only update if moving
    if (distance > 0.5) {
        // Calculate angle and position shadow behind cursor
        const angle = Math.atan2(dy, dx);

        // Dynamic trail distance based on speed - faster movement = longer trail
        const speedFactor = Math.min(distance / 20, 1.5);
        const trailDistance = Math.min(distance * 0.6 * speedFactor, 30);

        const shadowX = mouseX - Math.cos(angle) * trailDistance;
        const shadowY = mouseY - Math.sin(angle) * trailDistance;

        // Apply shadow position with subtle easing for smoother motion
        const currentX = parseFloat(shadowTrail.style.left) || mouseX;
        const currentY = parseFloat(shadowTrail.style.top) || mouseY;

        // Apply easing for smoother movement
        const easing = 0.3;  // Lower = smoother but more lag

        const newX = currentX + (shadowX - currentX) * easing;
        const newY = currentY + (shadowY - currentY) * easing;

        shadowTrail.style.left = `${newX}px`;
        shadowTrail.style.top = `${newY}px`;

        // Dynamic size and opacity based on speed
        const minSize = 20;
        const maxSize = 45;
        const size = minSize + Math.min((speedFactor * 20), maxSize - minSize);

        // Higher opacity for faster movements
        const minOpacity = 0.35;
        const maxOpacity = 0.8;
        const opacity = minOpacity + Math.min((speedFactor * 0.4), maxOpacity - minOpacity);

        shadowTrail.style.width = `${size}px`;
        shadowTrail.style.height = `${size}px`;
        shadowTrail.style.opacity = opacity.toString();

        // Dynamic blur based on speed
        const minBlur = 2;
        const maxBlur = 6;
        const blur = minBlur + Math.min((speedFactor * 3), maxBlur - minBlur);
        shadowTrail.style.filter = `blur(${blur}px)`;

        // Theme-based styling
        const isDarkTheme = document.body.classList.contains('vs-dark') ||
            document.body.classList.contains('hc-black');

        // Adjust shadow style based on theme and movement speed
        if (isDarkTheme) {
            // Dynamic color for dark theme based on speed
            const intensity = 60 + Math.min(speedFactor * 30, 40);
            shadowTrail.style.background = `radial-gradient(circle,
                    rgba(${intensity + 20}, ${intensity}, ${intensity + 40}, 0.4) 0%,
                    rgba(${intensity}, ${intensity - 20}, ${intensity + 20}, 0.25) 40%,
                    transparent 90%)`;
            shadowTrail.style.mixBlendMode = 'screen';
        } else {
            // Dynamic color for light theme based on speed
            const intensity = 30 + Math.min(speedFactor * 15, 20);
            shadowTrail.style.background = `radial-gradient(circle,
                    rgba(${intensity + 10}, ${intensity - 10}, ${intensity + 30}, 0.4) 0%,
                    rgba(${intensity}, ${intensity - 15}, ${intensity + 15}, 0.3) 40%,
                    transparent 90%)`;
            shadowTrail.style.mixBlendMode = 'multiply';
        }
    }
}

// Use passive event listener for better performance
document.addEventListener('mousemove', handleMouseMove, { passive: true });

// Hide shadow when mouse leaves window
document.addEventListener('mouseleave', () => {
    shadowTrail.style.opacity = '0';
});
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initCursorEffects);
