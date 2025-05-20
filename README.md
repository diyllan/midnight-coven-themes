# Gothic Cathedral Theme Collection

A comprehensive collection of Gothic-inspired themes for Visual Studio Code featuring multiple dark themes inspired by gothic aesthetics. All themes are now optimized for use with GlassIt transparency extension.

## Available Themes

This extension provides ten distinct gothic themes, each with its own unique color palette:

### Gothic Cathedral
A dark theme inspired by the somber, majestic ambiance of gothic cathedrals with muted colors reminiscent of stained glass windows.

### Gothic Cathedral (High Contrast)
A high-contrast version of the Gothic Cathedral theme for better accessibility.

### Gothic Cemetery
A misty, cool-toned theme inspired by foggy cemeteries and ancient gravestones.

### Gothic Cemetery Transparent
A version of the Gothic Cemetery theme specially designed to work with GlassIt transparency, featuring enhanced text contrast.

### Gothic Cemetery (High Contrast)
A high-contrast version of the Gothic Cemetery theme with enhanced visibility.

### Gothic Vampire
A blood-red and crimson accented theme on a dark background, inspired by vampire aesthetics.

### Gothic Vampire (High Contrast)
A high-contrast version of the Gothic Vampire theme with intense reds.

### Gothic Jester
A vibrant yet dark theme with contrasting colors inspired by medieval court jesters.

### Gothic Jester (High Contrast)
A high-contrast version of the Gothic Jester theme with enhanced, vivid colors.

### Gothic Cozy
A warm, dark theme with earthy browns and amber accents, designed to create a comfortable, cozy atmosphere for late-night coding sessions.

### Gothic Light
A light theme with elegant purple accents, providing a daytime-friendly option while maintaining the gothic aesthetic.

## Features

- Dark themes with rich color palettes
- Bold highlights for important code elements
- Strategic contrast for better readability
- Semantic syntax highlighting
- Cohesive UI elements across the VS Code interface
- Animated Gothic architectural elements
- Flickering candlelight effect on active editor window
- Mystical floating mist effects for immersive atmosphere

## Special Visual Effects (New in 2.0)

This theme collection now includes unique visual effects for each theme that activate when you follow the setup instructions below:

- **Gothic Cathedral**: Stained glass effects, arched window design, manuscript-style highlighting
- **Gothic Vampire**: Blood droplet cursor trails, pulsating crimson accents, danger highlights
- **Gothic Blood Moon**: Lunar phase indicators, eclipse effects, blood-themed syntax highlights
- **Gothic Twilight Forest**: Misty backgrounds, leaf-fall animations, forest-themed highlighting
- **Gothic Emerald Crypt**: Crystal growth animations, gem-like reflections, emerald accents
- **Gothic Jester**: Dancing confetti particles, checkered patterns, rainbow code highlights
- **Gothic Cozy**: Fireplace glow, snow particles, page turning animations, typing sounds
- **Gothic Light**: Light rays, dust particles, paper texture overlay, wind animation effects
- **Gothic Absinthe**: Green fairy dust, mist effects, hallucinatory cursor trails, color distortion

## Setup Instructions for Special Effects

To enable the theme-specific visual effects:

### 1. Install Required Extensions

First, install the following extensions that enable the custom visual effects:

```powershell
code --install-extension s-nlf-fh.glassit
code --install-extension be5invis.vscode-custom-css
```

### 2. Run the Setup Script

Run the included setup script to configure your VS Code settings:

```powershell
powershell -ExecutionPolicy Bypass -File setup-theme-effects.ps1
```

### 3. Enable Custom CSS

1. Open the Command Palette (Ctrl+Shift+P)
2. Search for "Enable Custom CSS and JS"
3. Run the command and restart VS Code when prompted

### 4. Select a Gothic Theme

1. Open the Color Theme selector (Ctrl+K Ctrl+T)
2. Choose one of the Gothic Cathedral themes
3. The theme's special effects should now be active!

## Troubleshooting

If you don't see any effects after following the steps above:

1. Open the Command Palette (Ctrl+Shift+P)
2. Search for "Gothic Theme: Reload Effects"
3. Run the command and restart VS Code when prompted
4. Alternatively, try the "Reload Custom CSS and JS" command

## Performance Settings

You can adjust the performance settings by adding this to your settings.json:

```json
"gothicTheme.effectsIntensity": "normal" // Options: "low", "normal", "high"
```
- Gothic window arches, decorative corners, and stained glass elements
- Medieval style UI separators and pointed arch shapes
- Gargoyle-like ornamentations in UI corners

## Customization Options

The Gothic Cathedral Theme collection now includes user customization options to personalize your experience:

### Performance Settings

You can adjust the intensity of visual effects based on your system's capabilities:

- **Low**: Minimal effects for older or less powerful systems
- **Normal**: Standard effects for most modern systems
- **High**: Maximum effects for powerful systems

### Ways to Customize

There are several ways to adjust your theme experience:

1. **Command Palette**:
   - `Gothic Theme: Show Effect Settings` - Opens the settings UI
   - `Gothic Theme: Toggle Performance Mode` - Cycles through performance levels
   - `Gothic Theme: Reload Effects` - Refreshes effects after changes

2. **Settings UI**:
   - Click gear icon in status bar or use the command palette
   - Adjust effect intensity, enable/disable specific effects
   - Toggle audio features

3. **VS Code Settings**:
   ```json
   {
     "gothic-cathedral-theme.effectsIntensity": "normal",
     "gothic-cathedral-theme.enableAudio": false,
     "gothic-cathedral-theme.reduceAnimationsOnBattery": true
   }
   ```

### Battery & Performance Optimizations

The theme automatically adjusts based on your system:

- Reduces effects when on battery power (can be disabled)
- Adjusts particle counts based on system capabilities
- Disables intensive effects on mobile devices

## Browser Compatibility

The theme effects have been tested across modern browsers:

- **Full support**: Chrome, Firefox, Edge
- **Partial support**: Safari, Opera
- **Limited support**: Internet Explorer 11

The theme includes fallback behaviors to ensure a good experience even in browsers with limited feature support.

## Documentation

For more detailed information, refer to these guides in the extension folder:

- **[ENHANCEMENT-SUMMARY.md](ENHANCEMENT-SUMMARY.md)** - Overview of all theme-specific effects
- **[DEVELOPER-GUIDE.md](DEVELOPER-GUIDE.md)** - Guide for developers who want to extend the themes
- **[TESTING-GUIDE.md](TESTING-GUIDE.md)** - Comprehensive testing procedures across browsers and devices

## Installation

1. Open **Extensions** sidebar in VS Code
2. Search for `Gothic Cathedral Theme Collection`
3. Click **Install**
4. Select one of the themes from the Command Palette (`Ctrl+K Ctrl+T` or `Cmd+K Cmd+T`)

## Recommended Settings

For the best experience with these themes, consider the following settings:

## Using Geist and Geist Mono Fonts

For a modern, elegant look, you can use the [Geist](https://fonts.google.com/specimen/Geist) and [Geist Mono](https://fonts.google.com/specimen/Geist+Mono) Google Fonts in your editor and terminal. To use these fonts:

1. Download the font files from the Google Fonts pages:
   - [Geist](https://fonts.google.com/specimen/Geist)
   - [Geist Mono](https://fonts.google.com/specimen/Geist+Mono)
2. Install them on your system (right-click and select "Install" on Windows).
3. Update your VS Code settings as follows:

```json
{
  "editor.fontFamily": "Geist Light",
  "terminal.integrated.fontFamily": "Geist Mono Light",
  "editor.fontSize": 16,
  "editor.lineHeight": 1.8,
  "editor.cursorBlinking": "phase",
  "editor.cursorSmoothCaretAnimation": "on",
 "workbench.tree.indent": 20,
}
```

> **Note:** Replace `USERNAME` with your actual Windows username. Do not share your real username or other sensitive information publicly.

## Using with GlassIt Transparency

All themes in this collection have been optimized to work with the GlassIt-VSC extension, which provides window transparency:

1. Install the [GlassIt-VSC](https://marketplace.visualstudio.com/items?itemName=s-nlf-fh.glassit) extension
2. Use keyboard shortcuts to control transparency:
   - `Ctrl+Alt+Z` to decrease opacity (more transparent)
   - `Ctrl+Alt+C` to increase opacity (less transparent)
   - `Ctrl+Alt+X` to reset to default opacity

For best results with GlassIt, we recommend:
- Use a transparency level between 200-240 for optimal text clarity
- The "Gothic Cemetery Transparent" theme is specifically designed for use with GlassIt

## Enhanced Gothic Experience with Custom CSS and JS

This theme includes custom CSS and JS files that dramatically enhance the gothic visual experience with animations and effects:

1. Install the [Custom CSS and JS Loader](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css) extension
2. Add the following to your VS Code `settings.json` file (replace USERNAME with your Windows username):

```json
"vscode_custom_css.imports": [
    "file:///C:/Users/USERNAME/.vscode/extensions/gothic-cathedral-theme/css/custom-enhanced.css",
    "file:///C:/Users/USERNAME/.vscode/extensions/gothic-cathedral-theme/js/custom.js"
]
```

3. Run the "Enable Custom CSS and JS" command from the Command Palette
4. Restart VS Code when prompted (you may need to run as administrator)

## Gothic Architectural Features

The enhanced theme includes several gothic architectural features:

- **Pointed Arch Windows**: UI elements have gothic pointed arches
- **Stained Glass Elements**: Decorative stained glass-inspired elements in corners of the UI
- **Flickering Candlelight**: Active editor windows feature a subtle candlelight flickering border effect
- **Floating Mist**: A subtle atmospheric mist that enhances the gothic ambiance
- **Gargoyle Decorations**: Corner decorations inspired by gothic cathedral gargoyles
- **Medieval Separators**: Activity bar icons are separated by medieval-style decorative lines

For a detailed explanation of the architectural elements and their historical significance, see [ARCHITECTURE.md](./css/ARCHITECTURE.md)

The custom CSS and JS adds the following gothic effects:
- Animated mist and fog effects
- Pulsating cursors and glowing text
- Gothic font styling and ornate borders
- Atmospheric effects like dripping blood in the status bar
- Enhanced transparency effects that keep text readable
- Ancient runes and glyphs randomly appearing
- Candlelight flickering effects on UI elements

**Note:** The Custom CSS and JS Loader extension modifies VS Code, which could potentially break with updates. Make sure to disable it before updating VS Code.

## Testing the Theme's Features

To verify that all the gothic architectural elements and animations are working correctly:

1. Open the [TEST.md](./TEST.md) file included with this theme
2. Follow the visual test checklist to confirm each feature is working
3. If any features aren't working, follow the troubleshooting steps in the test file

## Recent Enhancements

This theme has been recently enhanced with improved gothic architectural elements and animations. For a detailed summary of all enhancements, see [ENHANCEMENT-SUMMARY.md](./ENHANCEMENT-SUMMARY.md).

## Feedback and Contributions

If you have any suggestions or issues, please open an issue on the [GitHub repository](https://github.com/yourusername/gothic-cathedral-theme).

**Enjoy your Gothic coding experience!**
"# gothic-theme" 
"# gothic-theme" 
