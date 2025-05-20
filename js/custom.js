// === Modern Gothic Spooky Experience Enhancements ===

// Initialize theme when document is loaded
function initTheme() {
    console.log("Gothic Cathedral Theme: Initializing custom JS effects");

    // Apply subtle background effects
    document.body.style.backdropFilter = "blur(10px) contrast(1.05) brightness(1.02)";

    // Apply enhanced styling
    applyGothicStyling();
    // Set an interval to reapply styles for dynamic DOM changes (less frequent)
    setInterval(applyGothicStyling, 10000);
}

// Apply gothic styling to UI elements
function applyGothicStyling() {
    // Modern gothic text shadow - using more specific selectors for better performance
    const editorElements = document.querySelectorAll(".monaco-editor");
    editorElements.forEach(el => {
        el.style.textShadow = "0 1px 4px rgba(58, 26, 58, 0.25)";
        el.style.transition = "text-shadow 0.5s cubic-bezier(.4,0,.2,1)";
    });

    // Elegant glow for interface elements - more efficient selector
    const uiElements = document.querySelectorAll(".status-bar, .activity-bar, .sidebar");
    uiElements.forEach(el => {
        el.style.boxShadow = "0 0 12px 0 rgba(105, 92, 122, 0.2)";
        el.style.transition = "box-shadow 0.5s cubic-bezier(.4,0,.2,1)";
    });

    // Fix file explorer layout issues
    fixFileExplorerLayout();

    // Apply smooth animations to all VS Code elements
    applyGlobalAnimations();
}

// Fix file explorer text truncation
function fixFileExplorerLayout() {
    // Use a WeakSet to track which elements have been fixed
    const fixedElements = window.gothicFixedElements || new WeakSet();
    window.gothicFixedElements = fixedElements;

    // Fix label width in file explorer
    document.querySelectorAll('.explorer-folders-view .monaco-list-row').forEach(row => {
        if (fixedElements.has(row)) return;

        const label = row.querySelector('.monaco-icon-label-container');
        if (label) {
            label.style.maxWidth = 'none';
            fixedElements.add(row);
        }
    });
}

// Add smooth animations to all VS Code UI elements
function applyGlobalAnimations() {
    // Create global animation variables if they don't exist
    if (!document.getElementById('gothic-animation-variables')) {
        const animVars = document.createElement('style');
        animVars.id = 'gothic-animation-variables';
        animVars.textContent = `
            :root {
                --gothic-transition-quick: 120ms cubic-bezier(0.2, 0.9, 0.1, 1);
                --gothic-transition-medium: 200ms cubic-bezier(0.2, 0.9, 0.1, 1);
                --gothic-transition-slow: 300ms cubic-bezier(0.2, 0.9, 0.1, 1);
                --gothic-ease-standard: cubic-bezier(0.2, 0.9, 0.1, 1);
                --gothic-ease-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
                --gothic-ease-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
            }
        `;
        document.head.appendChild(animVars);
    }

    // Create or update the global animation style sheet
    let animStyle = document.getElementById('gothic-global-animations');
    if (!animStyle) {
        animStyle = document.createElement('style');
        animStyle.id = 'gothic-global-animations';
        document.head.appendChild(animStyle);
    }

    // Define comprehensive animation styles
    animStyle.textContent = `
        /* Universal animations */
        * {
            transition-property: background-color, border-color, box-shadow, color, opacity, transform;
            transition-duration: 150ms;
            transition-timing-function: var(--gothic-ease-standard);
        }

        /* Cursor animations */
        .monaco-editor .cursor {
            transition: all 80ms ease-out !important;
        }

        /* Editor animations */
        .monaco-editor {
            transition: opacity 200ms var(--gothic-ease-standard),
                        box-shadow 200ms var(--gothic-ease-standard) !important;
        }

        /* Editor content animations */
        .monaco-editor .view-lines {
            transition: opacity 150ms var(--gothic-ease-standard) !important;
        }

        /* Scrollbar animations */
        ::-webkit-scrollbar-thumb {
            transition: background-color 200ms var(--gothic-ease-standard) !important;
        }

        /* Sidebar and panel animations */
        .sidebar, .panel {
            transition: width 300ms var(--gothic-ease-standard),
                        height 300ms var(--gothic-ease-standard),
                        opacity 200ms var(--gothic-ease-standard),
                        transform 200ms var(--gothic-ease-standard) !important;
        }

        /* Activity bar icons */
        .monaco-workbench .activitybar .action-item {
            transition: transform 200ms var(--gothic-ease-standard),
                        opacity 200ms var(--gothic-ease-standard) !important;
        }

        /* Hover states */
        *:hover {
            transition-duration: 100ms !important;
        }

        /* Button animations */
        button, .monaco-button, .button {
            transition: background-color 150ms var(--gothic-ease-standard),
                        color 150ms var(--gothic-ease-standard),
                        border-color 150ms var(--gothic-ease-standard),
                        transform 150ms var(--gothic-ease-standard),
                        opacity 150ms var(--gothic-ease-standard) !important;
        }

        /* Tab animations */
        .tabs-container .tab {
            transition: opacity 250ms var(--gothic-ease-standard),
                        background-color 200ms var(--gothic-ease-standard),
                        box-shadow 200ms var(--gothic-ease-standard),
                        transform 200ms var(--gothic-ease-standard) !important;
        }

        /* List row animations */
        .monaco-list .monaco-list-row {
            transition: background-color 150ms var(--gothic-ease-standard),
                        height 150ms var(--gothic-ease-standard),
                        transform 150ms var(--gothic-ease-standard) !important;
        }

        /* Status bar animations */
        .monaco-workbench .part.statusbar .statusbar-item {
            transition: color 200ms var(--gothic-ease-standard),
                        opacity 200ms var(--gothic-ease-standard) !important;
        }

        /* Animation for panels opening/closing */
        .part.panel {
            transition: height 250ms var(--gothic-ease-standard) !important;
        }

        /* Tree item animations */
        .monaco-tl-row {
            transition: height 200ms var(--gothic-ease-standard),
                        opacity 200ms var(--gothic-ease-standard) !important;
        }

        /* Menu animations */
        .monaco-menu, .context-view, .monaco-dropdown {
            transition: opacity 120ms var(--gothic-ease-standard),
                        transform 120ms var(--gothic-ease-standard) !important;
        }

        /* Tooltip animations */
        .monaco-tooltip, .monaco-hover, .parameter-hints-widget {
            transition: opacity 120ms var(--gothic-ease-standard),
                        transform 120ms var(--gothic-ease-standard) !important;
        }

        /* Selection animations */
        ::selection {
            transition: background-color 150ms var(--gothic-ease-standard) !important;
        }

        /* Editor widget animations */
        .parameter-hints-widget,
        .suggest-widget,
        .monaco-hover,
        .monaco-editor-hover,
        .rename-box,
        .find-widget {
            transition: opacity 150ms var(--gothic-ease-standard),
                        transform 150ms var(--gothic-ease-standard),
                        box-shadow 150ms var(--gothic-ease-standard) !important;
        }

        /* Smooth resizing */
        .monaco-sash {
            transition: background-color 150ms var(--gothic-ease-standard) !important;
        }

        /* Terminal animations */
        .terminal-wrapper {
            transition: opacity 200ms var(--gothic-ease-standard) !important;
        }

        /* Notification animations */
        .notification-toast {
            transition: transform 250ms var(--gothic-ease-decelerate),
                        opacity 250ms var(--gothic-ease-decelerate) !important;
        }
    `;

    // Add keyframe animations
    addKeyframeAnimations();

    // Set up animation for DOM changes
    observeDOMForAnimations();
}

// Add keyframe animations for special effects
function addKeyframeAnimations() {
    let keyframeStyle = document.getElementById('gothic-keyframe-animations');
    if (!keyframeStyle) {
        keyframeStyle = document.createElement('style');
        keyframeStyle.id = 'gothic-keyframe-animations';
        document.head.appendChild(keyframeStyle);
    }

    keyframeStyle.textContent = `
        /* Tab opening/closing animations */
        @keyframes tabOpen {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        @keyframes tabClose {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-10px); opacity: 0; }
        }

        /* Folder expand/collapse animations */
        @keyframes folderExpand {
            from { max-height: 0; opacity: 0.7; }
            to { max-height: 1000px; opacity: 1; }
        }

        @keyframes folderCollapse {
            from { max-height: 1000px; opacity: 1; }
            to { max-height: 0; opacity: 0.7; }
        }

        /* Editor fade in animation */
        @keyframes editorFadeIn {
            from { opacity: 0.8; transform: scale(0.99); }
            to { opacity: 1; transform: scale(1); }
        }

        /* Subtle pulse animation for active elements */
        @keyframes subtlePulse {
            0% { box-shadow: 0 0 0 0 rgba(105, 92, 122, 0.2); }
            70% { box-shadow: 0 0 5px 3px rgba(105, 92, 122, 0.1); }
            100% { box-shadow: 0 0 0 0 rgba(105, 92, 122, 0); }
        }

        /* Notification slide in */
        @keyframes notificationSlideIn {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        /* Focus glow effect */
        @keyframes focusGlow {
            0% { box-shadow: 0 0 0 0 rgba(100, 80, 140, 0.1); }
            50% { box-shadow: 0 0 8px 2px rgba(100, 80, 140, 0.3); }
            100% { box-shadow: 0 0 0 0 rgba(100, 80, 140, 0.1); }
        }
    `;
}

// Observe DOM for changes to apply animations
function observeDOMForAnimations() {
    // Create a new observer for animations
    const animObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes && mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Only process element nodes
                        // Animate new tabs
                        if (node.classList && node.classList.contains('tab')) {
                            node.style.animation = 'tabOpen 250ms var(--gothic-ease-standard) forwards';
                        }

                        // Animate editor instances
                        if (node.classList &&
                            (node.classList.contains('editor-instance') ||
                                node.classList.contains('monaco-editor'))) {
                            node.style.animation = 'editorFadeIn 250ms var(--gothic-ease-standard) forwards';
                        }

                        // Animate notifications
                        if (node.classList && node.classList.contains('notification-toast')) {
                            node.style.animation = 'notificationSlideIn 350ms var(--gothic-ease-decelerate) forwards';
                        }

                        // Add pulse to focused elements
                        if (node.classList && node.classList.contains('focused')) {
                            node.style.animation = 'subtlePulse 2s var(--gothic-ease-standard) 1';
                        }
                    }
                });
            }
        });
    });

    // Start observing the document for dynamic elements
    animObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });

    // Also animate existing elements that might be already in the DOM
    document.querySelectorAll('.tab').forEach(tab => {
        tab.style.animation = 'none'; // Reset animation
        void tab.offsetWidth; // Trigger reflow
        tab.style.animation = 'tabOpen 250ms var(--gothic-ease-standard) forwards';
    });

    document.querySelectorAll('.monaco-editor, .editor-instance').forEach(editor => {
        editor.style.animation = 'none'; // Reset animation
        void editor.offsetWidth; // Trigger reflow
        editor.style.animation = 'editorFadeIn 250ms var(--gothic-ease-standard) forwards';
    });
}

// Load effect scripts more efficiently
function loadEffectScripts() {
    const scripts = [
        '../js/cursor-effects.js',
        '../js/candle-effects.js',
        '../js/productivity-enhancements.js'
    ];

    // Load scripts sequentially to avoid overwhelming browser
    let index = 0;
    function loadNext() {
        if (index >= scripts.length) return;

        const script = document.createElement('script');
        script.src = scripts[index++];
        script.onload = loadNext; // Load next script after current one loads
        document.head.appendChild(script);
    }

    loadNext();
}

// Initialize theme and load scripts
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadEffectScripts();
});

window.addEventListener('load', initTheme);
