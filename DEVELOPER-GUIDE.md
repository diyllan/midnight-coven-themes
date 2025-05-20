# Developer Guide: Extending Gothic Cathedral Themes

This guide provides comprehensive documentation for developers who want to extend or customize the Gothic Cathedral theme collection's visual effects.

## Architecture Overview

The Gothic Cathedral theme collection uses a modular approach to implement theme-specific visual effects:

### Core Files

1. **theme-effects.js**: The main entry point that initializes and applies theme-specific effects
2. **browser-compatibility.js**: Handles browser compatibility and provides fallbacks
3. **theme-effects.css**: Contains CSS animations and base styling for effects
4. **extension.js**: Handles extension activation and VS Code commands

### How Effects Are Applied

1. When VS Code starts, the extension is activated
2. The theme detector identifies the current theme
3. Theme-specific effect functions are called
4. Browser compatibility is checked and appropriate fixes are applied
5. Performance settings adjust effect intensity based on the user's system

## Adding a New Theme

To add a new theme to the collection:

1. Create a new theme JSON file in the `/themes` directory
2. Add a new effect function to `theme-effects.js`
3. Add theme-specific CSS to `theme-effects.css`
4. Update the theme detector in the main initialization function

### Example: Creating a New Theme Function

```javascript
function applyMyNewThemeEffects(performanceMode = 'normal') {
    console.log("Applying My New Theme Effects");

    // Adjust effect intensity based on performance mode
    const effectSettings = getPerformanceAdjustedSettings(performanceMode, {
        particleCount: { low: 2, normal: 5, high: 10 },
        animationSpeed: { low: 1.5, normal: 1.0, high: 0.8 },
        effectOpacity: { low: 0.5, normal: 0.8, high: 1.0 }
    });

    // Add your custom effects here
    createCustomCursorEffect({
        // Effect parameters
    });

    // Add custom element effects
    addCustomElementEffect({
        // Effect parameters
    });
}
```

## Effect APIs

The theme system provides several APIs for creating different types of effects:

### Cursor Effects

```javascript
createCursorEffect({
    particleType: 'circle', // or 'square', 'star', 'droplet', 'custom'
    color: '#ff5077', // Custom color
    trailLength: 5, // Number of particles
    fadeSpeed: 1000, // Fade duration in ms
    opacity: 0.8, // Maximum opacity
    customShape: null // SVG path for custom shape
});
```

### Element Effects

```javascript
addPulseEffect({
    selector: '.monaco-list-row.focused', // CSS selector
    fromColor: 'rgba(255, 80, 119, 0.2)', // Start color
    toColor: 'rgba(255, 80, 119, 0.5)', // End color
    duration: 2000 // Animation duration in ms
});
```

### Background Effects

```javascript
addBackgroundEffect({
    type: 'particles', // or 'mist', 'rays', 'texture'
    color: 'rgba(0, 255, 0, 0.05)', // Effect color
    particleCount: 20, // For particle effects
    direction: 'topToBottom', // Direction of effect
    speed: 1.0 // Animation speed multiplier
});
```

### Audio Effects

```javascript
addAudioFeedback({
    trigger: 'error', // or 'warning', 'selection', 'keypress'
    soundType: 'bell', // or 'ambient', 'click', 'custom'
    volume: 0.5, // 0.0 to 1.0
    customSoundUrl: null // URL for custom sound
});
```

## Performance Considerations

When adding effects, always consider performance implications:

1. Always use the `performanceMode` parameter to adjust effect intensity
2. Provide fallbacks for low-performance environments
3. Minimize DOM operations and prefer CSS animations where possible
4. Test on multiple devices and browsers

### Performance API

```javascript
const effectSettings = getPerformanceAdjustedSettings(performanceMode, {
    particleCount: { low: 2, normal: 5, high: 10 },
    animationSpeed: { low: 1.5, normal: 1.0, high: 0.8 },
    effectOpacity: { low: 0.5, normal: 0.8, high: 1.0 }
});
```

## Browser Compatibility

The browser-compatibility.js file provides several utilities for ensuring effects work across different browsers:

1. `browserSupport` object for feature detection
2. `applyCompatibilityFixes()` for applying general fixes
3. Browser-specific functions like `applyFirefoxFixes()`
4. `testBrowserCompatibility()` for comprehensive compatibility testing

### Adding Browser-Specific Fixes

```javascript
function applyMyBrowserFix() {
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            /* My browser-specific fixes */
            .my-effect-class {
                /* Modified properties for this browser */
            }
        </style>
    `);
}
```

## User Customization

The theme effect system supports user customization through VS Code settings:

- `gothic-cathedral-theme.effectsIntensity`: Controls overall effect intensity
- `gothic-cathedral-theme.enableAudio`: Enables or disables audio effects
- `gothic-cathedral-theme.customEffects`: Allows for custom effect parameters

To access these settings in your code:

```javascript
function getThemeSettings() {
    try {
        const vscode = acquireVsCodeApi();
        const state = vscode.getState() || {};
        return state.themeSettings || {};
    } catch (e) {
        console.log("Unable to access VS Code API for settings");
        return {};
    }
}
```

## Troubleshooting

Common issues when developing theme effects:

1. **Effects not showing**: Check if Custom CSS extension is active and properly configured
2. **Browser compatibility**: Use the `testBrowserCompatibility()` function to diagnose issues
3. **Performance problems**: Reduce effect complexity, especially particle counts and animations
4. **CSS conflicts**: Use namespaced classes to avoid conflicts with VS Code's internal styles

## Example: Complete Theme Implementation

Here's a complete example of implementing a new theme:

1. Add theme detection:

```javascript
// In theme-effects.js
if (currentThemeName.includes("MyTheme")) {
    applyMyThemeEffects(performanceMode);
}
```

2. Create the effect function:

```javascript
function applyMyThemeEffects(performanceMode = 'normal') {
    const effectSettings = getPerformanceAdjustedSettings(performanceMode, {
        particleCount: { low: 2, normal: 5, high: 10 },
        animationSpeed: { low: 1.5, normal: 1.0, high: 0.8 },
        effectOpacity: { low: 0.5, normal: 0.8, high: 1.0 }
    });

    // Add cursor trail
    createCursorEffect({
        particleType: 'star',
        color: '#00ffcc',
        trailLength: effectSettings.particleCount,
        fadeSpeed: 1000 * effectSettings.animationSpeed,
        opacity: effectSettings.effectOpacity
    });

    // Add background effect
    addBackgroundEffect({
        type: 'particles',
        color: 'rgba(0, 255, 204, 0.1)',
        particleCount: effectSettings.particleCount * 2,
        direction: 'topToBottom',
        speed: effectSettings.animationSpeed
    });

    // Add element highlighting
    addSpecialHighlight({
        selector: '.mtk10:contains("function"), .mtk10:contains("class")',
        effect: 'glow',
        color: '#00ffcc',
        intensity: effectSettings.effectOpacity
    });
}
```

3. Add CSS for the new theme:

```css
/* In theme-effects.css */
.my-theme-star {
    position: absolute;
    pointer-events: none;
    width: 10px;
    height: 10px;
    background: #00ffcc;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    opacity: 0;
    z-index: 1000;
    animation: star-fade 1s forwards;
}

@keyframes star-fade {
    0% { opacity: 0.8; transform: scale(1) rotate(0deg); }
    100% { opacity: 0; transform: scale(0.5) rotate(90deg); }
}
```

## Contributing

To contribute to the Gothic Cathedral theme collection:

1. Fork the repository
2. Create a feature branch
3. Add your changes following the guidelines in this document
4. Submit a pull request with a clear description of your enhancement

---

*Last updated: May 21, 2025*
