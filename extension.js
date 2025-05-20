// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * Gothic Cathedral Theme Collection Extension
 * Manages theme activation and effect settings
 */
function activate(context) {
    console.log('Gothic Cathedral Theme collection activated');

    // Register a command to manually reload theme effects
    let reloadDisposable = vscode.commands.registerCommand('gothic-cathedral-theme.reloadEffects', function () {
        vscode.window.showInformationMessage('Reloading Gothic Cathedral Theme effects...');
        // Execute the Custom CSS command to reload
        vscode.commands.executeCommand('extension.customCSS.reload');
    });

    // Register a command to open settings UI
    let settingsDisposable = vscode.commands.registerCommand('gothic-cathedral-theme.showSettings', function () {
        // Send message to webview to show settings UI
        const activeEditorPane = vscode.window.activeTextEditor;
        if (activeEditorPane) {
            // Only show settings if an editor is active
            vscode.commands.executeCommand('vscode.executeCommand', 'gothic-theme.showSettings');
        } else {
            vscode.window.showWarningMessage('Please open an editor window to access Gothic Theme settings.');
        }
    });

    // Register command to toggle visual effects
    const toggleEffects = vscode.commands.registerCommand('gothic-cathedral-theme.toggleEffects', () => {
        const config = vscode.workspace.getConfiguration('gothicCathedral');
        const currentValue = config.get('effectsEnabled');
        config.update('effectsEnabled', !currentValue, true)
            .then(() => {
                vscode.window.showInformationMessage(
                    `Gothic Cathedral theme visual effects ${!currentValue ? 'enabled' : 'disabled'}`
                );
            });
    });

    // Register command to set performance mode
    const setPerformance = vscode.commands.registerCommand('gothic-cathedral-theme.setPerformanceMode', async () => {
        const options = [
            { label: 'Low', description: 'Minimal effects for better performance' },
            { label: 'Normal', description: 'Standard level of visual effects' },
            { label: 'High', description: 'Maximum visual enhancements' }
        ];

        const selected = await vscode.window.showQuickPick(options, {
            placeHolder: 'Select performance mode for Gothic Cathedral theme effects'
        });

        if (selected) {
            const config = vscode.workspace.getConfiguration('gothicCathedral');
            config.update('performanceMode', selected.label.toLowerCase(), true)
                .then(() => {
                    vscode.window.showInformationMessage(
                        `Gothic Cathedral theme performance mode set to: ${selected.label}`
                    );
                });
        }
    });

    // Register a command to toggle performance mode
    let performanceDisposable = vscode.commands.registerCommand('gothic-cathedral-theme.togglePerformanceMode', function () {
        const config = vscode.workspace.getConfiguration('gothic-cathedral-theme');
        const currentMode = config.get('effectsIntensity', 'normal');

        // Cycle through performance modes
        let newMode;
        if (currentMode === 'low') {
            newMode = 'normal';
        } else if (currentMode === 'normal') {
            newMode = 'high';
        } else {
            newMode = 'low';
        }

        // Update configuration
        config.update('effectsIntensity', newMode, true).then(() => {
            vscode.window.showInformationMessage(`Gothic Theme: Performance mode set to ${newMode}`);
            // Reload effects
            vscode.commands.executeCommand('gothic-cathedral-theme.reloadEffects');
        });
    });

    // Watch for configuration changes
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('gothicCathedral')) {
            // Notify the webview that settings changed
            // This would be implemented if using a webview
        }
    }));

    context.subscriptions.push(reloadDisposable, settingsDisposable, performanceDisposable, toggleEffects, setPerformance);

    // Check if custom CSS is active
    setTimeout(() => {
        const config = vscode.workspace.getConfiguration();
        const imports = config.get('vscode_custom_css.imports');

        if (!imports || imports.length === 0) {
            vscode.window.showWarningMessage(
                'Gothic Cathedral Theme effects not loaded. Run setup script to enable effects.',
                'Run Setup'
            ).then(selection => {
                if (selection === 'Run Setup') {
                    // Run the setup script
                    const terminal = vscode.window.createTerminal('Gothic Theme Setup');
                    terminal.sendText('powershell -ExecutionPolicy Bypass -File "' +
                        path.join(context.extensionPath, 'setup-theme-effects.ps1') + '"');
                    terminal.show();
                }
            });
        }
    }, 5000);
}

// This method is called when your extension is deactivated
function deactivate() {
    // Clean up resources here, if needed
    console.log('Gothic Cathedral Theme collection deactivated');
}

module.exports = {
    activate,
    deactivate
};
