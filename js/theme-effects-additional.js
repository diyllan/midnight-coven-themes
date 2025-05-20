function applyLightEffects() {
    console.log("Applying Gothic Light Effects");

    // Light ray effect
    addLightRayEffect({
        position: 'top-right',
        color: 'rgba(255, 253, 240, 0.08)',
        rays: 5,
        angle: 30,
        length: 500
    });

    // Dust particle effect
    createParticleEffect({
        particleType: 'dust',
        color: 'rgba(210, 200, 180, 0.2)',
        count: 20,
        speed: 0.3,
        size: { min: 1, max: 3 },
        wind: 0.1
    });

    // Soft cursor highlight
    createCursorEffect({
        particleType: 'glow',
        color: 'rgba(255, 250, 230, 0.3)',
        trailLength: 2,
        fadeSpeed: 800,
        blendMode: 'overlay'
    });

    // Add paper texture overlay
    addTextureEffect({
        texture: 'paper',
        opacity: 0.05,
        blend: 'multiply'
    });

    // Add light wind effect to decorations
    addAnimationEffect({
        selector: '.decorationGlyphMargin',
        effect: 'sway',
        intensity: 0.5,
        speed: 3000
    });
}

function applyAbsintheEffects() {
    console.log("Applying Gothic Absinthe Effects");

    // Green fairy dust particles
    createParticleEffect({
        particleType: 'fairy',
        color: '#7aff90',
        count: 15,
        speed: 0.7,
        size: { min: 2, max: 6 },
        glow: true,
        swirl: true
    });

    // Absinthe mist effect
    addMistEffect({
        color: 'rgba(120, 255, 140, 0.05)',
        intensity: 0.3,
        speed: 2000,
        direction: 'rising'
    });

    // Hallucinatory cursor trail
    createCursorEffect({
        particleType: 'wave',
        color: '#7aff90',
        trailLength: 10,
        fadeSpeed: 1200,
        waveAmplitude: 3
    });

    // Add color distortion to text on hover
    addHoverEffect({
        selector: '.mtk5, .mtk7',
        effect: 'distort',
        colors: ['#7aff90', '#90ff7a', '#ff907a'],
        intensity: 0.3,
        speed: 1000
    });

    // Add special "hallucination" effects on key elements
    addSpecialHighlight({
        selector: '.monaco-list-row.focused',
        effect: 'warp',
        color: '#7aff90',
        intensity: 0.2,
        speed: 3000
    });
}

// Light ray effect implementation
function addLightRayEffect(options) {
    console.log(`Adding light ray effect at ${options.position}`);

    // Create container for rays
    const container = document.createElement('div');
    container.className = 'gothic-light-rays';

    // Position container
    if (options.position === 'top-right') {
        container.style.top = '0';
        container.style.right = '0';
    } else if (options.position === 'top-left') {
        container.style.top = '0';
        container.style.left = '0';
    } else if (options.position === 'bottom-right') {
        container.style.bottom = '0';
        container.style.right = '0';
    } else if (options.position === 'bottom-left') {
        container.style.bottom = '0';
        container.style.left = '0';
    }

    // Add to DOM
    document.body.appendChild(container);
}

// Dust particle effect implementation
function createDustParticles(options) {
    // Create dust particles that float slowly upward
    for (let i = 0; i < options.count; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'gothic-light-dust';

            // Random size
            const size = options.size.min + Math.random() * (options.size.max - options.size.min);
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            // Random animation duration
            const duration = 10000 + Math.random() * 20000;
            particle.style.animationDuration = `${duration}ms`;

            // Add to DOM
            document.body.appendChild(particle);

            // Remove after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, duration);
        }, i * 300);  // Stagger creation
    }
}

// Texture overlay effect implementation
function addTextureEffect(options) {
    console.log(`Adding ${options.texture} texture effect`);

    // Create texture overlay
    const overlay = document.createElement('div');
    overlay.className = `gothic-light-${options.texture}-texture`;
    overlay.style.opacity = options.opacity;

    if (options.blend) {
        overlay.style.mixBlendMode = options.blend;
    }

    // Add to DOM
    document.body.appendChild(overlay);
}

// Mist effect implementation
function addMistEffect(options) {
    console.log(`Adding mist effect with color ${options.color}`);

    // Create mist container
    const mist = document.createElement('div');
    mist.className = 'gothic-absinthe-mist';

    // Apply options
    if (options.color) {
        mist.style.background = `linear-gradient(to top,
            ${options.color} 0%,
            ${options.color.replace('0.05', '0.02')} 50%,
            ${options.color.replace('0.05', '0')} 100%)`;
    }

    if (options.intensity) {
        mist.style.opacity = options.intensity;
    }

    if (options.speed) {
        mist.style.animationDuration = `${options.speed}ms`;
    }

    // Add to DOM
    document.body.appendChild(mist);
}

// Add hover distortion effect
function addHoverEffect(options) {
    console.log(`Adding hover effect to ${options.selector}`);

    // Find elements matching selector
    const elements = document.querySelectorAll(options.selector);

    elements.forEach(el => {
        // Add class for hover effects
        if (options.effect === 'distort') {
            el.classList.add('hover-distort');
        }

        // Add custom styles if needed
        if (options.colors) {
            const keyframes = `
                @keyframes color-distort {
                    0% { color: ${options.colors[0]}; }
                    ${options.colors.map((color, index) =>
                `${Math.round(100 * (index) / (options.colors.length - 1))}% { color: ${color}; }`
            ).join('\n')}
                    100% { color: ${options.colors[0]}; }
                }
            `;

            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
    });
}
