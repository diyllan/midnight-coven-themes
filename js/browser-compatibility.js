// Browser Compatibility for Gothic Cathedral Themes

/**
 * This file provides browser compatibility support for the Gothic Cathedral
 * theme collection's visual effects. It ensures that effects work across
 * different browsers and environments, with graceful fallback behavior.
 */

// Feature detection and fallbacks
const browserSupport = {
    // Check for CSS animation support
    cssAnimations: typeof document.documentElement.style.animation !== 'undefined' ||
        typeof document.documentElement.style.webkitAnimation !== 'undefined',

    // Check for Web Audio API support
    webAudio: typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined',

    // Check for advanced CSS features
    clipPath: CSS.supports('clip-path', 'circle(50%)'),
    mixBlendMode: CSS.supports('mix-blend-mode', 'multiply'),
    backdropFilter: CSS.supports('backdrop-filter', 'blur(2px)'),

    // Check for SVG support
    svg: document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1'),

    // Check for requestAnimationFrame
    animationFrame: typeof requestAnimationFrame !== 'undefined'
};

function applyCompatibilityFixes() {
    console.log("Applying browser compatibility fixes");

    // Add polyfills and compatibility fixes
    if (!browserSupport.cssAnimations) {
        // Apply non-animation fallbacks
        applyNonAnimatedFallbacks();
    }

    // Fallback for Web Audio API
    if (!browserSupport.webAudio) {
        // Create silent implementation
        window.AudioContext = function () {
            return {
                createOscillator: function () { return { frequency: { setValueAtTime: function () { } }, connect: function () { }, start: function () { }, stop: function () { } }; },
                createGain: function () { return { gain: { setValueAtTime: function () { }, exponentialRampToValueAtTime: function () { } }, connect: function () { } }; },
                destination: {}
            };
        };
    }

    // Detect browser types for specific fixes
    applyBrowserSpecificFixes();

    // Test and report browser compatibility
    testBrowserCompatibility();
}

function applyBrowserSpecificFixes() {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isEdge = navigator.userAgent.indexOf('Edg') > -1;

    // Firefox-specific fixes
    if (isFirefox) {
        applyFirefoxFixes();
    }

    // Safari-specific fixes
    if (isSafari) {
        applySafariFixes();
    }

    // Edge-specific fixes
    if (isEdge) {
        applyEdgeFixes();
    }

    // Mobile optimizations
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        applyMobileOptimizations();
    }
}

function testBrowserCompatibility() {
    console.log("Testing browser compatibility for Gothic Cathedral Theme effects");

    // Collect browser information
    const browserInfo = {
        userAgent: navigator.userAgent,
        browserName: getBrowserName(),
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        screenSize: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        support: browserSupport,
        performance: {
            memory: navigator.deviceMemory || 'Unknown',
            hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
            connection: getConnectionInfo()
        }
    };

    console.table({
        "Browser": browserInfo.browserName,
        "Mobile": browserInfo.isMobile ? "Yes" : "No",
        "CSS Animations": browserSupport.cssAnimations ? "✓" : "✗",
        "Web Audio": browserSupport.webAudio ? "✓" : "✗",
        "Clip Path": browserSupport.clipPath ? "✓" : "✗",
        "Mix Blend Mode": browserSupport.mixBlendMode ? "✓" : "✗",
        "Backdrop Filter": browserSupport.backdropFilter ? "✓" : "✗",
        "SVG": browserSupport.svg ? "✓" : "✗",
        "Animation Frame": browserSupport.animationFrame ? "✓" : "✗"
    });

    // Save browser information for debugging purposes
    window.gothicThemeCompat.browserInfo = browserInfo;

    // Return either full, partial, or minimal compatibility
    let compatibilityLevel = getCompatibilityLevel(browserInfo);

    console.log(`Gothic Cathedral Theme Compatibility Level: ${compatibilityLevel}`);
    return compatibilityLevel;
}

function getBrowserName() {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    } else if (userAgent.indexOf("SamsungBrowser") > -1) {
        return "Samsung Internet";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        return "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
        return "Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
        return "Edge (Legacy)";
    } else if (userAgent.indexOf("Edg") > -1) {
        return "Edge Chromium";
    } else if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } else {
        return "Unknown";
    }
}

function getConnectionInfo() {
    if (navigator.connection) {
        return {
            effectiveType: navigator.connection.effectiveType || 'Unknown',
            downlink: navigator.connection.downlink || 'Unknown',
            saveData: navigator.connection.saveData || false
        };
    } else {
        return 'Unknown';
    }
}

function getCompatibilityLevel(browserInfo) {
    // Count supported features
    const supportedFeatures = Object.values(browserInfo.support).filter(val => val).length;
    const totalFeatures = Object.values(browserInfo.support).length;

    const supportPercentage = (supportedFeatures / totalFeatures) * 100;

    if (supportPercentage >= 80) {
        return "Full Compatibility";
    } else if (supportPercentage >= 50) {
        return "Partial Compatibility";
    } else {
        return "Minimal Compatibility";
    }
}

function applyNonAnimatedFallbacks() {
    console.log("Applying non-animated fallbacks");

    // Replace animations with simple transitions
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            /* Replace animations with static elements or transitions */
            .gothic-vampire-cursor-trail,
            .gothic-absinthe-fairy,
            .gothic-light-dust,
            .gothic-jester-confetti,
            .gothic-cozy-snow {
                display: none !important;
            }

            /* Use transition instead of animation */
            .gothic-vampire .monaco-list-row.focused,
            .gothic-vampire .monaco-list-row.selected {
                transition: box-shadow 0.3s ease-in-out !important;
                animation: none !important;
                box-shadow: 0 0 5px 0 rgba(255, 80, 119, 0.3) inset !important;
            }

            /* Simple transitions for effects */
            .gothic-light-rays,
            .gothic-absinthe-mist {
                opacity: 0.3 !important;
                animation: none !important;
            }
        </style>
    `);
}

function applyFirefoxFixes() {
    console.log("Applying Firefox-specific fixes");

    // Fix for Firefox's clip-path handling
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            /* Firefox fixes */
            @-moz-document url-prefix() {
                .gothic-blood-spatter {
                    border-radius: 50% !important;
                    clip-path: none !important;
                }

                .gothic-light-rays {
                    background: rgba(255, 253, 240, 0.05) !important;
                }

                /* Fix for Firefox animation performance */
                .gothic-vampire-cursor-trail,
                .gothic-jester-confetti {
                    will-change: transform, opacity;
                }
            }
        </style>
    `);
}

function applySafariFixes() {
    console.log("Applying Safari-specific fixes");

    // Fix for Safari's mix-blend-mode issues
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            /* Safari fixes */
            .gothic-light-paper-texture {
                mix-blend-mode: normal !important;
                opacity: 0.03 !important;
            }

            /* Fix for Safari's backdrop-filter fallback */
            .gothic-editor-blur {
                backdrop-filter: none !important;
                background-color: rgba(0, 0, 0, 0.1) !important;
            }
        </style>
    `);
}

function applyEdgeFixes() {
    console.log("Applying Edge-specific fixes");

    // Fix for Edge's CSS variable handling
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            /* Edge fixes */
            .gothic-blood-moon .progress-badge {
                background: linear-gradient(to right, #ff4040 50%, #402020 50%) !important;
            }
        </style>
    `);
}

function applyMobileOptimizations() {
    console.log("Applying mobile optimizations");

    // Reduce or disable effects for mobile
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            /* Mobile optimizations - reduce or disable effects */
            .gothic-vampire-cursor-trail,
            .gothic-absinthe-fairy,
            .gothic-light-dust,
            .gothic-jester-confetti,
            .gothic-cozy-snow,
            .gothic-light-rays,
            .gothic-background-mist,
            .gothic-mist-effect {
                display: none !important;
            }

            /* Reduce animation complexity */
            @keyframes simplified-pulse {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 0.7; }
            }

            .gothic-vampire .monaco-list-row.focused,
            .gothic-vampire .monaco-list-row.selected,
            .gothic-emerald-crypt .tabs-container .tab.active,
            .gothic-absinthe .hover-distort:hover {
                animation: simplified-pulse 2s infinite !important;
                box-shadow: none !important;
                text-shadow: none !important;
            }
        </style>
    `);

    // Reduce particle counts globally
    window.mobileMode = true;
}

// Apply compatibility fixes when DOM is loaded
document.addEventListener('DOMContentLoaded', applyCompatibilityFixes);

// Expose these functions globally
window.gothicThemeCompat = {
    check: function () {
        return browserSupport;
    },
    applyFixes: applyCompatibilityFixes,
    testCompatibility: testBrowserCompatibility,
    browserInfo: {}
};
