// Gothic Cathedral Theme Loader Script
// This script ensures that the Gothic Cathedral theme effects are loaded properly

// Get the absolute paths to your JS and CSS files
const fs = require('fs');
const path = require('path');
const os = require('os');

// Get extension path - this will vary depending on OS
const extensionPath = path.join(os.homedir(), '.vscode', 'extensions', 'gothic-cathedral-theme');
const jsFiles = [
    path.join(extensionPath, 'js', 'theme-effects.js'),
    path.join(extensionPath, 'js', 'browser-compatibility.js')
];
const cssFiles = [
    path.join(extensionPath, 'css', 'theme-effects.css')
];

// Create settings if they don't exist
const vscodePath = path.join(os.homedir(), '.vscode');
const settingsPath = path.join(vscodePath, 'settings.json');

let settings = {};
if (fs.existsSync(settingsPath)) {
    try {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    } catch (e) {
        console.error('Error reading settings.json:', e);
        settings = {};
    }
}

// Update settings to include our custom CSS and JS
settings['vscode_custom_css.imports'] = [];

// Add our CSS files
cssFiles.forEach(file => {
    // Convert Windows paths to proper URI format
    const fileUri = 'file:///' + file.replace(/\\/g, '/');
    if (!settings['vscode_custom_css.imports'].includes(fileUri)) {
        settings['vscode_custom_css.imports'].push(fileUri);
    }
});

// Add our JS files
jsFiles.forEach(file => {
    // Convert Windows paths to proper URI format
    const fileUri = 'file:///' + file.replace(/\\/g, '/');
    if (!settings['vscode_custom_css.imports'].includes(fileUri)) {
        settings['vscode_custom_css.imports'].push(fileUri);
    }
});

// Save settings
fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4), 'utf8');

console.log('Gothic Cathedral Theme effects configuration complete.');
console.log('Please run "Reload Custom CSS and JS" from the command palette and restart VS Code.');
