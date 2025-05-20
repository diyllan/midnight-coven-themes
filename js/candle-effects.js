// === Gothic Candlelight Flickering Effects ===

function initCandleEffects() {
    console.log("Gothic Cathedral Theme: Initializing enhanced candlelight effects");

    // Candle positions - targeting UI elements that would benefit from illumination
    const candlePositions = [
        // Panel icons in activity bar (Explorer, Search, Source Control, Debug, etc.)
        { selector: '.activitybar .action-item', count: 10, offsetX: -20, offsetY: 0, size: 40, intensity: 0.25 },

        // Status bar items
        { selector: '.statusbar-item', count: 3, offsetX: 0, offsetY: -10, size: 30, intensity: 0.2 },

        // Active tab
        { selector: '.tabs-container .tab.active', count: 1, offsetX: 0, offsetY: 0, size: 35, intensity: 0.2 },

        // Sidebar headers
        { selector: '.sidebar .title', count: 2, offsetX: 10, offsetY: 0, size: 30, intensity: 0.2 }
    ];

    // Remove existing candles to prevent duplicates
    document.querySelectorAll('.gothic-candle-glow').forEach(el => el.remove());

    // Create candle glows
    candlePositions.forEach(position => {
        const elements = document.querySelectorAll(position.selector);

        // Only create the specified number of candles
        for (let i = 0; i < Math.min(elements.length, position.count); i++) {
            const element = elements[i];
            if (!element) continue;

            // Create candle glow
            const candleGlow = document.createElement('div');
            candleGlow.className = 'gothic-candle-glow';

            // Set initial position - different strategy based on parent positioning
            const computedStyle = window.getComputedStyle(element);
            if (computedStyle.position === 'static') {
                element.style.position = 'relative';
            }

            // Add candle to element
            element.appendChild(candleGlow);

            // Set position and initial style
            candleGlow.style.left = `${position.offsetX}px`;
            candleGlow.style.top = `${position.offsetY}px`;
            candleGlow.style.width = `${position.size}px`;
            candleGlow.style.height = `${position.size}px`;

            // Store config for this candle
            candleGlow.dataset.baseIntensity = position.intensity;
            candleGlow.dataset.baseSize = position.size;

            // Start flickering
            startCandleFlicker(candleGlow);

            // Special handling for activity bar icons (Explorer, Debug, etc.)
            if (position.selector === '.activitybar .action-item') {
                // Make candle more prominent when icon is active
                element.addEventListener('mouseenter', () => {
                    candleGlow.dataset.isHovered = 'true';
                });

                element.addEventListener('mouseleave', () => {
                    candleGlow.dataset.isHovered = 'false';
                });

                // Check if this is the active icon
                if (element.classList.contains('checked') || element.querySelector('.active')) {
                    candleGlow.dataset.isActive = 'true';
                    candleGlow.style.zIndex = '10';
                }

                // Make candle react to clicks
                element.addEventListener('click', () => {
                    const isNowActive = element.classList.contains('checked') ||
                        element.querySelector('.active');

                    candleGlow.dataset.isActive = isNowActive ? 'true' : 'false';

                    // Flare effect on click
                    candleGlow.style.transition = 'all 0.3s ease-out';
                    candleGlow.style.width = `${position.size * 1.5}px`;
                    candleGlow.style.height = `${position.size * 1.5}px`;
                    candleGlow.style.filter = 'blur(8px)';

                    setTimeout(() => {
                        candleGlow.style.transition = 'none';
                    }, 300);
                });
            }
        }
    });

    // Animate candle flickering with modern, realistic effect
    function startCandleFlicker(candleElement) {
        const baseIntensity = parseFloat(candleElement.dataset.baseIntensity) || 0.2;
        const baseSize = parseFloat(candleElement.dataset.baseSize) || 30;
        const flickerSpeed = 80 + Math.random() * 40;

        // Each candle has a unique flicker pattern
        const uniqueOffset = Math.random() * 10000;

        function flicker() {
            const now = Date.now() + uniqueOffset;

            // Is this candle for an active element?
            const isActive = candleElement.dataset.isActive === 'true';
            const isHovered = candleElement.dataset.isHovered === 'true';

            // Calculate intensity and size based on state
            let stateMultiplier = 1;
            if (isActive) stateMultiplier = 1.3;
            if (isHovered) stateMultiplier = 1.5;

            // Calculate flicker values with multiple sine waves for natural movement
            const flickerIntensity = baseIntensity * stateMultiplier * (
                1 +
                0.1 * Math.sin(now / 600) +
                0.05 * Math.sin(now / 300) +
                0.03 * Math.random()
            );

            const flickerSize = baseSize * (
                1 +
                0.1 * Math.sin(now / 800) +
                0.05 * Math.cos(now / 400) +
                0.03 * Math.random()
            );

            // Color variations for realistic flame
            const redVal = 255;
            const greenVal = Math.floor(200 + 20 * Math.sin(now / 700) + 10 * Math.random());
            const blueVal = Math.floor(100 + 10 * Math.sin(now / 500) + 5 * Math.random());

            // Apply styles
            candleElement.style.width = `${flickerSize * stateMultiplier}px`;
            candleElement.style.height = `${flickerSize * stateMultiplier}px`;

            // More complex gradient for realistic glow
            candleElement.style.background = `
                radial-gradient(circle,
                rgba(${redVal}, ${greenVal}, ${blueVal}, ${flickerIntensity * 0.6}) 0%,
                rgba(${redVal}, ${Math.floor(greenVal * 0.8)}, ${Math.floor(blueVal * 0.6)}, ${flickerIntensity * 0.3}) 50%,
                transparent 75%)
            `;

            // Dynamic blur based on intensity
            candleElement.style.filter = `blur(${4 + (isActive ? 2 : 0) + (flickerIntensity * 3)}px)`;

            // Add a very subtle box-shadow for additional glow
            candleElement.style.boxShadow = `0 0 ${flickerSize / 2}px rgba(${redVal}, ${greenVal}, ${blueVal}, ${flickerIntensity * 0.2})`;
        }

        // Start flickering
        flicker();
        setInterval(flicker, flickerSpeed);
    }
}

// Initialize candle effects
window.addEventListener('DOMContentLoaded', initCandleEffects);
window.addEventListener('load', () => {
    initCandleEffects();
    // Re-init after a delay to catch dynamically loaded UI elements
    setTimeout(initCandleEffects, 2000);
});

// Periodically reinitialize to handle VS Code's dynamic UI changes
setInterval(initCandleEffects, 5000);

// Also reinitialize on activity bar clicks to update active state
document.addEventListener('click', (e) => {
    if (e.target.closest('.activitybar')) {
        setTimeout(initCandleEffects, 100);
    }
});
