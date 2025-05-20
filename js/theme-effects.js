// === Theme-Specific Visual Effects ===

function initThemeEffects() {
    console.log("Gothic Cathedral Theme: Initializing theme-specific visual effects");

    // Check if effects are enabled in user settings
    if (window.GOTHIC_THEME_SETTINGS && !window.GOTHIC_THEME_SETTINGS.getSetting('effectsEnabled', true)) {
        console.log("Gothic Cathedral Theme: Effects disabled by user settings");
        return;
    }

    // Check for user preferences and system capabilities
    const performanceMode = checkPerformanceSettings();

    // Get the current theme name from VS Code
    const currentThemeName = getCurrentTheme();
    console.log(`Current theme detected: ${currentThemeName}`);

    // Apply appropriate effects based on theme
    if (currentThemeName) {
        // Check for theme-specific overrides
        const themeOverrides = window.GOTHIC_THEME_SETTINGS ?
            window.GOTHIC_THEME_SETTINGS.getThemeOverrides(currentThemeName) : {};

        // Store current theme name globally for settings
        window.currentGothicTheme = currentThemeName;

        if (currentThemeName.includes("Vampire")) {
            applyVampireEffects(performanceMode);
        } else if (currentThemeName.includes("Cathedral")) {
            applyCathedralEffects(performanceMode);
        } else if (currentThemeName.includes("Emerald")) {
            applyEmeraldCryptEffects(performanceMode);
        } else if (currentThemeName.includes("Blood Moon")) {
            applyBloodMoonEffects(performanceMode);
        } else if (currentThemeName.includes("Twilight")) {
            applyTwilightForestEffects(performanceMode);
        } else if (currentThemeName.includes("Raven")) {
            applyRavenEffects(performanceMode);
        } else if (currentThemeName.includes("Midnight Rose")) {
            applyMidnightRoseEffects(performanceMode);
        } else if (currentThemeName.includes("Jester")) {
            applyJesterEffects(performanceMode);
        } else if (currentThemeName.includes("Cemetery")) {
            applyCemeteryEffects(performanceMode);
        } else if (currentThemeName.includes("Cozy")) {
            applyCozyEffects(performanceMode);
        } else if (currentThemeName.includes("Light")) {
            applyLightEffects(performanceMode);
        } else if (currentThemeName.includes("Absinthe")) {
            applyAbsintheEffects(performanceMode);
        } else if (currentThemeName.includes("Amber")) {
            applyAmberFogEffects(performanceMode);
        }
    }
}

// Performance check for effects
function checkPerformanceSettings() {
    // First check the user settings if available
    if (window.GOTHIC_THEME_SETTINGS) {
        const userMode = window.GOTHIC_THEME_SETTINGS.getSetting('effectsIntensity', null);
        if (userMode) {
            console.log(`Using user-specified performance mode: ${userMode}`);
            return userMode;
        }
    }

    // Default to normal mode
    let performanceMode = 'normal';

    try {
        // Check for user settings via VS Code API
        const vscode = acquireVsCodeApi();
        const state = vscode.getState() || {};

        if (state.effectsIntensity) {
            performanceMode = state.effectsIntensity;
        }

        // If no user preference, try to detect system capabilities
        if (!state.effectsIntensity) {
            if (window.navigator && navigator.hardwareConcurrency) {
                if (navigator.hardwareConcurrency < 4) {
                    // Low-end device
                    performanceMode = 'low';
                } else if (navigator.hardwareConcurrency >= 8) {
                    // High-end device
                    performanceMode = 'high';
                }
            }

            // Check if we should reduce on battery
            const reduceOnBattery = window.GOTHIC_THEME_SETTINGS ?
                window.GOTHIC_THEME_SETTINGS.getSetting('reduceAnimationsOnBattery', true) : true;

            // Check for battery status if available and if user wants reduction
            if (reduceOnBattery && navigator.getBattery) {
                navigator.getBattery().then(battery => {
                    if (!battery.charging && battery.level < 0.3) {
                        // Low battery, reduce effects
                        performanceMode = 'low';
                    }
                });
            }

            // Check if it's a mobile device
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                performanceMode = 'low';
            }
        }
    } catch (e) {
        console.log("Unable to access VS Code API for settings, using default performance mode");
    }

    console.log(`Using ${performanceMode} performance mode for effects`);
    return performanceMode;
}

// Function to try to detect current theme from VS Code classes
function getCurrentTheme() {
    // Look for theme classes on body element
    const bodyClasses = document.body.className.split(' ');
    for (const cls of bodyClasses) {
        if (cls.startsWith('vscode-theme-') || cls.includes('-theme-')) {
            return cls;
        }
    }

    // Alternative detection by looking for theme-specific colors
    const styles = getComputedStyle(document.documentElement);
    const bgColor = styles.getPropertyValue('--vscode-editor-background').trim();
    const activeFg = styles.getPropertyValue('--vscode-activityBar-activeBorder').trim();

    // Map colors to themes - this is an approximation
    if (bgColor === '#1a1017' && activeFg === '#ff5077') return 'Gothic Vampire';
    if (bgColor === '#12100f') return 'Gothic Cathedral';
    if (bgColor === '#0f1a15') return 'Gothic Emerald Crypt';
    if (bgColor === '#170c0c') return 'Gothic Blood Moon';

    // Default to empty if we can't detect
    return '';
}

// === Theme-Specific Effect Implementations ===

// Function to reload theme effects
function reloadThemeEffects() {
    console.log("Reloading Gothic Cathedral Theme effects");

    // Clear all existing effects
    clearAllEffects();

    // Re-initialize
    initThemeEffects();
}

// Function to clear all existing effects
function clearAllEffects() {
    // Remove all gothic-specific elements
    const elements = document.querySelectorAll([
        '.gothic-vampire-cursor-trail',
        '.gothic-stained-glass',
        '.gothic-arch-decoration',
        '.gothic-gargoyle-decoration',
        '.gothic-blood-spatter',
        '.gothic-eclipse-effect',
        '.gothic-mist-effect',
        '.gothic-background-mist',
        '.gothic-light-rays',
        '.gothic-cozy-fireplace',
        '.gothic-light-paper-texture',
        '.gothic-absinthe-mist',
        '.gothic-dewdrop',
        '.gothic-parchment-overlay',
        '.gothic-bloom-effect',
        'style[id^="gothic-"]'
    ].join(','));

    elements.forEach(el => {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });

    // Remove all added animations and classes
    document.querySelectorAll('[class*="gothic-"]').forEach(el => {
        // Get all classes
        const classes = Array.from(el.classList);

        // Remove gothic-specific classes
        classes.forEach(cls => {
            if (cls.startsWith('gothic-')) {
                el.classList.remove(cls);
            }
        });

        // Clear any animations
        el.style.animation = '';
    });

    console.log("Cleared all Gothic Cathedral Theme effects");
}

// Export function to window object for use in other scripts
window.reloadThemeEffects = reloadThemeEffects;

function applyVampireEffects(performanceMode = 'normal') {
    console.log("Applying Gothic Vampire Effects");

    // Adjust effect intensity based on performance mode
    const effectSettings = getPerformanceAdjustedSettings(performanceMode, {
        particleCount: { low: 2, normal: 6, high: 10 },
        animationSpeed: { low: 1.5, normal: 1.0, high: 0.8 },
        effectOpacity: { low: 0.5, normal: 0.8, high: 1.0 }
    });

    // Blood droplet cursor trail effect
    createCursorEffect({
        particleType: 'droplet',
        color: '#ff5077',
        trailLength: effectSettings.particleCount,
        fadeSpeed: 1200 * effectSettings.animationSpeed,
        opacity: effectSettings.effectOpacity
    });

    // Pulsating crimson accent for active elements
    addPulseEffect({
        selector: '.monaco-list-row.focused, .monaco-list-row.selected',
        fromColor: 'rgba(255, 80, 119, 0.2)',
        toColor: 'rgba(255, 80, 119, 0.5)',
        duration: 2000 * effectSettings.animationSpeed
    });

    // Special animations for danger elements
    addSpecialHighlight({
        selector: '.mtk10:contains("delete"), .mtk10:contains("remove"), .mtk10:contains("drop")',
        effect: 'danger',
        color: '#ff5077',
        intensity: effectSettings.effectOpacity
    });
}

function applyCathedralEffects(performanceMode = 'normal') {
    console.log("Applying Gothic Cathedral Effects");

    // Adjust effect intensity based on performance mode
    const effectSettings = getPerformanceAdjustedSettings(performanceMode, {
        particleCount: { low: 1, normal: 3, high: 5 },
        animationSpeed: { low: 1.5, normal: 1.0, high: 0.8 },
        effectOpacity: { low: 0.5, normal: 0.8, high: 1.0 }
    });

    // Stained glass effects for panels
    addStainedGlassEffect({
        selector: '.panel, .sidebar',
        color: 'rgba(154, 114, 134, 0.1)',
        count: effectSettings.particleCount,
        opacity: effectSettings.effectOpacity
    });

    // Add gargoyle decorations to corners
    if (performanceMode !== 'low') {
        addGargoyleDecorations({
            count: effectSettings.particleCount,
            animate: performanceMode === 'high'
        });
    }

    // Add manuscript style highlighting
    addManuscriptEffects({
        intensity: effectSettings.effectOpacity,
        animateInitials: performanceMode !== 'low'
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initThemeEffects);
// Also try again when fully loaded for robustness
window.addEventListener('load', initThemeEffects);
// And periodically check/refresh as VS Code's UI updates
setInterval(initThemeEffects, 30000);

/**
 * Gothic Cathedral Theme Collection - Theme Effects
 *
 * This file implements the specific visual enhancements for each theme
 * in the Gothic Cathedral collection, as documented in ENHANCEMENT-SUMMARY.md.
 */

// Main controller for all theme effects
class GothicThemeEffects {
    constructor() {
        this.activeTheme = null;
        this.effectsEnabled = true;
        this.performanceMode = 'normal'; // 'low', 'normal', 'high'
        this.audioEnabled = true;
        this.effectInstances = {};
        this.batteryConservation = true;

        // Initialize browser compatibility check
        this.compatibility = window.gothicThemeCompat ? window.gothicThemeCompat.check() : {};

        // Theme effect classes
        this.themeEffects = {
            'gothic-cathedral': CathedralEffects,
            'gothic-vampire': VampireEffects,
            'gothic-blood-moon': BloodMoonEffects,
            'gothic-twilight-forest': TwilightForestEffects,
            'gothic-emerald-crypt': EmeraldCryptEffects,
            'gothic-jester': JesterEffects,
            'gothic-cozy': CozyEffects,
            'gothic-light': LightEffects,
            'gothic-absinthe': AbsintheEffects
        };

        // Monitor for theme changes
        this.setupThemeChangeMonitor();

        // Load user settings
        this.loadSettings();
    }

    loadSettings() {
        // Try to load from storage or use defaults
        const savedSettings = localStorage.getItem('gothicThemeSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.effectsEnabled = settings.effectsEnabled ?? true;
            this.performanceMode = settings.performanceMode ?? 'normal';
            this.audioEnabled = settings.audioEnabled ?? true;
            this.batteryConservation = settings.batteryConservation ?? true;
        }

        // Check for battery status if conservation enabled
        if (this.batteryConservation && navigator.getBattery) {
            navigator.getBattery().then(battery => {
                if (!battery.charging && battery.level < 0.3) {
                    console.log("Battery low, reducing effects");
                    this.performanceMode = 'low';
                }
            });
        }
    }

    saveSettings() {
        const settings = {
            effectsEnabled: this.effectsEnabled,
            performanceMode: this.performanceMode,
            audioEnabled: this.audioEnabled,
            batteryConservation: this.batteryConservation
        };
        localStorage.setItem('gothicThemeSettings', JSON.stringify(settings));
    }

    setupThemeChangeMonitor() {
        // Watch for class changes on body to detect theme changes
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.attributeName === 'class') {
                    this.detectActiveTheme();
                }
            }
        });

        observer.observe(document.body, { attributes: true });

        // Initial detection
        setTimeout(() => this.detectActiveTheme(), 500);
    }

    detectActiveTheme() {
        const bodyClasses = document.body.classList;

        // Find which theme is active
        for (const themeKey in this.themeEffects) {
            if (bodyClasses.contains(themeKey)) {
                if (this.activeTheme !== themeKey) {
                    console.log(`Activating theme: ${themeKey}`);
                    this.activateTheme(themeKey);
                }
                return;
            }
        }

        // No matching theme found, deactivate current
        if (this.activeTheme) {
            this.deactivateCurrentTheme();
        }
    }

    activateTheme(themeKey) {
        // Deactivate current theme if one is active
        if (this.activeTheme) {
            this.deactivateCurrentTheme();
        }

        // Set new theme
        this.activeTheme = themeKey;

        // Skip effects if disabled
        if (!this.effectsEnabled) return;

        // Create instance of the theme effects class
        const EffectClass = this.themeEffects[themeKey];
        if (EffectClass) {
            this.effectInstances[themeKey] = new EffectClass(this.performanceMode, this.audioEnabled);
            this.effectInstances[themeKey].activate();
        }
    }

    deactivateCurrentTheme() {
        if (this.activeTheme && this.effectInstances[this.activeTheme]) {
            this.effectInstances[this.activeTheme].deactivate();
            delete this.effectInstances[this.activeTheme];
        }
        this.activeTheme = null;
    }

    setPerformanceMode(mode) {
        if (['low', 'normal', 'high'].includes(mode)) {
            this.performanceMode = mode;

            // Update active theme if one is running
            if (this.activeTheme && this.effectInstances[this.activeTheme]) {
                this.effectInstances[this.activeTheme].setPerformanceMode(mode);
            }

            this.saveSettings();
        }
    }

    toggleEffects(enabled) {
        this.effectsEnabled = enabled;

        if (!enabled) {
            this.deactivateCurrentTheme();
        } else {
            // Re-detect and activate current theme
            this.detectActiveTheme();
        }

        this.saveSettings();
    }

    toggleAudio(enabled) {
        this.audioEnabled = enabled;

        // Update active theme
        if (this.activeTheme && this.effectInstances[this.activeTheme]) {
            this.effectInstances[this.activeTheme].setAudioEnabled(enabled);
        }

        this.saveSettings();
    }
}

// Base class for all theme effects
class BaseThemeEffects {
    constructor(performanceMode = 'normal', audioEnabled = true) {
        this.performanceMode = performanceMode;
        this.audioEnabled = audioEnabled;
        this.elements = {};
        this.animations = {};
        this.audioElements = {};
        this.active = false;
    }

    activate() {
        this.active = true;
        this.createElements();
        this.setupAnimations();
        if (this.audioEnabled) {
            this.setupAudio();
        }
    }

    deactivate() {
        this.active = false;
        this.removeElements();
        this.stopAnimations();
        this.stopAudio();
    }

    createElements() {
        // Implemented by subclasses
    }

    setupAnimations() {
        // Implemented by subclasses
    }

    setupAudio() {
        // Implemented by subclasses
    }

    removeElements() {
        // Remove all created elements
        for (const key in this.elements) {
            if (this.elements[key] && this.elements[key].parentNode) {
                this.elements[key].parentNode.removeChild(this.elements[key]);
            }
        }
        this.elements = {};
    }

    stopAnimations() {
        // Cancel all animations
        for (const key in this.animations) {
            if (this.animations[key]) {
                if (typeof this.animations[key] === 'number') {
                    cancelAnimationFrame(this.animations[key]);
                } else if (typeof this.animations[key].cancel === 'function') {
                    this.animations[key].cancel();
                }
            }
        }
        this.animations = {};
    }

    stopAudio() {
        // Stop all audio
        for (const key in this.audioElements) {
            if (this.audioElements[key]) {
                if (this.audioElements[key] instanceof HTMLAudioElement) {
                    this.audioElements[key].pause();
                    this.audioElements[key].currentTime = 0;
                } else if (this.audioElements[key].stop) {
                    // Web Audio API
                    this.audioElements[key].stop();
                }
            }
        }
        this.audioElements = {};
    }

    setPerformanceMode(mode) {
        if (this.performanceMode === mode) return;

        const wasActive = this.active;
        if (wasActive) {
            this.deactivate();
        }

        this.performanceMode = mode;

        if (wasActive) {
            this.activate();
        }
    }

    setAudioEnabled(enabled) {
        this.audioEnabled = enabled;

        if (enabled) {
            this.setupAudio();
        } else {
            this.stopAudio();
        }
    }

    // Helper method for particle creation
    createParticleSystem(containerId, particleCount, particleClass, createParticleFn) {
        const containerEl = document.createElement('div');
        containerEl.id = containerId;
        containerEl.className = 'gothic-effect-container';
        document.body.appendChild(containerEl);

        // Adjust particle count based on performance mode
        let count = particleCount;
        if (this.performanceMode === 'low') {
            count = Math.floor(particleCount * 0.3);
        } else if (this.performanceMode === 'high') {
            count = Math.floor(particleCount * 1.5);
        }

        // Create particles
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = particleClass;
            createParticleFn(particle, i);
            containerEl.appendChild(particle);
        }

        return containerEl;
    }
}

// Initialize the theme effects controller when the page loads
window.addEventListener('DOMContentLoaded', () => {
    window.gothicThemeController = new GothicThemeEffects();
});
