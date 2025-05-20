// User Customization for Gothic Cathedral Theme Effects

/**
 * This file provides user customization options for the Gothic Cathedral
 * theme collection's visual effects. It allows users to adjust effect
 * intensity, disable specific effects, and customize effect parameters.
 */

// Default user settings
const defaultSettings = {
    // General settings
    effectsEnabled: true,
    effectsIntensity: 'normal', // 'low', 'normal', 'high'

    // Audio settings
    enableAudio: false, // Default to off to avoid surprising users
    audioVolume: 0.5,

    // Performance settings
    reduceAnimationsOnBattery: true,
    disableEffectsOnLowPerformance: false,

    // Effect-specific settings
    cursorTrails: true,
    backgroundEffects: true,
    elementAnimations: true,

    // Theme-specific overrides (empty by default)
    themeOverrides: {}
};

// Cache for user settings
let userSettings = null;

/**
 * Gets the current user settings, merging defaults with any user-defined values
 * @returns {Object} The current settings object
 */
function getUserSettings() {
    // Only fetch settings once to avoid overhead
    if (userSettings) {
        return userSettings;
    }

    try {
        // Try to get settings from VS Code API
        const vscode = acquireVsCodeApi();
        const state = vscode.getState() || {};

        // Merge default settings with user settings
        userSettings = {
            ...defaultSettings,
            ...(state.themeSettings || {})
        };

        console.log("User settings loaded:", userSettings);
        return userSettings;
    } catch (e) {
        console.log("Unable to access VS Code API for settings, using defaults");
        return defaultSettings;
    }
}

/**
 * Saves the current user settings
 * @param {Object} settings - The settings object to save
 */
function saveUserSettings(settings) {
    try {
        const vscode = acquireVsCodeApi();
        const state = vscode.getState() || {};

        // Update state with new settings
        vscode.setState({
            ...state,
            themeSettings: settings
        });

        // Update cache
        userSettings = settings;

        console.log("User settings saved:", settings);
    } catch (e) {
        console.log("Unable to save user settings:", e);
    }
}

/**
 * Gets a specific setting value
 * @param {string} key - The setting key to retrieve
 * @param {any} defaultValue - Default value if the setting doesn't exist
 * @returns {any} The setting value
 */
function getSetting(key, defaultValue) {
    const settings = getUserSettings();
    return key in settings ? settings[key] : defaultValue;
}

/**
 * Updates a specific setting value
 * @param {string} key - The setting key to update
 * @param {any} value - The new value for the setting
 */
function updateSetting(key, value) {
    const settings = getUserSettings();
    settings[key] = value;
    saveUserSettings(settings);
}

/**
 * Gets theme-specific overrides for the current theme
 * @param {string} themeName - The name of the current theme
 * @returns {Object} The theme-specific settings
 */
function getThemeOverrides(themeName) {
    const settings = getUserSettings();
    const overrides = settings.themeOverrides || {};

    // Return theme-specific overrides or empty object if none exist
    return overrides[themeName] || {};
}

/**
 * Updates theme-specific overrides for a theme
 * @param {string} themeName - The name of the theme to update
 * @param {Object} overrides - The theme-specific settings to save
 */
function updateThemeOverrides(themeName, overrides) {
    const settings = getUserSettings();

    // Ensure themeOverrides exists
    if (!settings.themeOverrides) {
        settings.themeOverrides = {};
    }

    // Update the theme overrides
    settings.themeOverrides[themeName] = {
        ...(settings.themeOverrides[themeName] || {}),
        ...overrides
    };

    saveUserSettings(settings);
}

/**
 * Creates a settings UI for the user to customize theme effects
 */
function createSettingsUI() {
    // Check if settings UI already exists
    if (document.getElementById('gothic-theme-settings')) {
        return;
    }

    // Create settings panel
    const settingsPanel = document.createElement('div');
    settingsPanel.id = 'gothic-theme-settings';
    settingsPanel.className = 'gothic-settings-panel';
    settingsPanel.style.display = 'none';

    // Add settings content
    settingsPanel.innerHTML = `
        <div class="gothic-settings-header">
            <h2>Gothic Cathedral Theme Settings</h2>
            <button id="gothic-settings-close">×</button>
        </div>
        <div class="gothic-settings-content">
            <div class="gothic-settings-section">
                <h3>General Settings</h3>
                <div class="gothic-settings-row">
                    <label for="gothic-effects-enabled">Enable Effects</label>
                    <input type="checkbox" id="gothic-effects-enabled" ${getSetting('effectsEnabled', true) ? 'checked' : ''}>
                </div>
                <div class="gothic-settings-row">
                    <label for="gothic-effects-intensity">Effects Intensity</label>
                    <select id="gothic-effects-intensity">
                        <option value="low" ${getSetting('effectsIntensity') === 'low' ? 'selected' : ''}>Low</option>
                        <option value="normal" ${getSetting('effectsIntensity') === 'normal' ? 'selected' : ''}>Normal</option>
                        <option value="high" ${getSetting('effectsIntensity') === 'high' ? 'selected' : ''}>High</option>
                    </select>
                </div>
            </div>

            <div class="gothic-settings-section">
                <h3>Audio Settings</h3>
                <div class="gothic-settings-row">
                    <label for="gothic-audio-enabled">Enable Audio</label>
                    <input type="checkbox" id="gothic-audio-enabled" ${getSetting('enableAudio', false) ? 'checked' : ''}>
                </div>
                <div class="gothic-settings-row">
                    <label for="gothic-audio-volume">Audio Volume</label>
                    <input type="range" id="gothic-audio-volume" min="0" max="1" step="0.1" value="${getSetting('audioVolume', 0.5)}">
                </div>
            </div>

            <div class="gothic-settings-section">
                <h3>Performance Settings</h3>
                <div class="gothic-settings-row">
                    <label for="gothic-battery-optimization">Reduce Effects on Battery</label>
                    <input type="checkbox" id="gothic-battery-optimization" ${getSetting('reduceAnimationsOnBattery', true) ? 'checked' : ''}>
                </div>
                <div class="gothic-settings-row">
                    <label for="gothic-low-performance">Disable on Low Performance</label>
                    <input type="checkbox" id="gothic-low-performance" ${getSetting('disableEffectsOnLowPerformance', false) ? 'checked' : ''}>
                </div>
            </div>

            <div class="gothic-settings-section">
                <h3>Effect Types</h3>
                <div class="gothic-settings-row">
                    <label for="gothic-cursor-trails">Cursor Trails</label>
                    <input type="checkbox" id="gothic-cursor-trails" ${getSetting('cursorTrails', true) ? 'checked' : ''}>
                </div>
                <div class="gothic-settings-row">
                    <label for="gothic-background-effects">Background Effects</label>
                    <input type="checkbox" id="gothic-background-effects" ${getSetting('backgroundEffects', true) ? 'checked' : ''}>
                </div>
                <div class="gothic-settings-row">
                    <label for="gothic-element-animations">Element Animations</label>
                    <input type="checkbox" id="gothic-element-animations" ${getSetting('elementAnimations', true) ? 'checked' : ''}>
                </div>
            </div>

            <div class="gothic-settings-actions">
                <button id="gothic-settings-save">Save Settings</button>
                <button id="gothic-settings-reset">Reset to Defaults</button>
            </div>
        </div>
    `;

    // Add styles for the settings panel
    const settingsStyles = document.createElement('style');
    settingsStyles.textContent = `
        .gothic-settings-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            width: 400px;
            max-width: 90vw;
            max-height: 80vh;
            overflow-y: auto;
            padding: 15px;
            border-radius: 4px;
        }

        .gothic-settings-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--vscode-panel-border);
        }

        .gothic-settings-header h2 {
            margin: 0;
            color: var(--vscode-foreground);
        }

        .gothic-settings-header button {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: var(--vscode-foreground);
        }

        .gothic-settings-section {
            margin-bottom: 20px;
        }

        .gothic-settings-section h3 {
            margin-top: 0;
            margin-bottom: 10px;
            color: var(--vscode-foreground);
        }

        .gothic-settings-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .gothic-settings-row label {
            flex: 1;
            color: var(--vscode-foreground);
        }

        .gothic-settings-row input[type="checkbox"] {
            width: 16px;
            height: 16px;
        }

        .gothic-settings-row input[type="range"] {
            width: 120px;
        }

        .gothic-settings-row select {
            width: 120px;
            background-color: var(--vscode-dropdown-background);
            color: var(--vscode-dropdown-foreground);
            border: 1px solid var(--vscode-dropdown-border);
        }

        .gothic-settings-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 20px;
        }

        .gothic-settings-actions button {
            padding: 6px 12px;
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 2px;
            cursor: pointer;
        }

        .gothic-settings-actions button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
    `;

    // Add the settings panel and styles to the document
    document.head.appendChild(settingsStyles);
    document.body.appendChild(settingsPanel);

    // Add event listeners
    document.getElementById('gothic-settings-close').addEventListener('click', () => {
        settingsPanel.style.display = 'none';
    });

    document.getElementById('gothic-settings-save').addEventListener('click', () => {
        // Collect settings from UI
        const newSettings = {
            effectsEnabled: document.getElementById('gothic-effects-enabled').checked,
            effectsIntensity: document.getElementById('gothic-effects-intensity').value,
            enableAudio: document.getElementById('gothic-audio-enabled').checked,
            audioVolume: parseFloat(document.getElementById('gothic-audio-volume').value),
            reduceAnimationsOnBattery: document.getElementById('gothic-battery-optimization').checked,
            disableEffectsOnLowPerformance: document.getElementById('gothic-low-performance').checked,
            cursorTrails: document.getElementById('gothic-cursor-trails').checked,
            backgroundEffects: document.getElementById('gothic-background-effects').checked,
            elementAnimations: document.getElementById('gothic-element-animations').checked,
            themeOverrides: getUserSettings().themeOverrides || {}
        };

        // Save settings
        saveUserSettings(newSettings);

        // Hide panel
        settingsPanel.style.display = 'none';

        // Reload effects
        if (window.reloadThemeEffects) {
            window.reloadThemeEffects();
        }
    });

    document.getElementById('gothic-settings-reset').addEventListener('click', () => {
        // Reset settings to defaults
        saveUserSettings(defaultSettings);

        // Reload UI
        settingsPanel.remove();
        createSettingsUI();

        // Show panel
        document.getElementById('gothic-theme-settings').style.display = 'block';

        // Reload effects
        if (window.reloadThemeEffects) {
            window.reloadThemeEffects();
        }
    });
}

/**
 * Shows the settings UI
 */
function showSettingsUI() {
    // Create UI if it doesn't exist
    createSettingsUI();

    // Show the panel
    document.getElementById('gothic-theme-settings').style.display = 'block';
}

// Create command for showing settings
function registerSettingsCommand() {
    try {
        // Register command in window object for use in extension.js
        window.gothicThemeSettings = {
            show: showSettingsUI,
            get: getUserSettings,
            getSetting: getSetting,
            updateSetting: updateSetting,
            getThemeOverrides: getThemeOverrides,
            updateThemeOverrides: updateThemeOverrides,
            resetToDefaults: () => saveUserSettings(defaultSettings)
        };
    } catch (e) {
        console.log("Unable to register settings command:", e);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', registerSettingsCommand);

// Expose global constants and functions
window.GOTHIC_THEME_SETTINGS = {
    DEFAULT_SETTINGS: defaultSettings,
    getUserSettings,
    getSetting,
    updateSetting,
    getThemeOverrides,
    updateThemeOverrides
};
