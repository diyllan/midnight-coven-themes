# Gothic Cathedral Theme Loader PowerShell Script
# This script ensures that the Gothic Cathedral theme effects are loaded properly

# Get the absolute paths to your JS and CSS files
$extensionPath = Join-Path $HOME ".vscode\extensions\gothic-cathedral-theme"
$jsFiles = @(
    (Join-Path $extensionPath "js\theme-effects.js"),
    (Join-Path $extensionPath "js\browser-compatibility.js"),
    (Join-Path $extensionPath "js\theme-settings.js")
)
$cssFiles = @(
    (Join-Path $extensionPath "css\theme-effects.css")
)

# Create settings if they don't exist
$vscodePath = Join-Path $HOME ".vscode"
$settingsPath = Join-Path $vscodePath "settings.json"

$settings = @{}
if (Test-Path $settingsPath) {
    try {
        $settingsContent = Get-Content $settingsPath -Raw
        $settings = $settingsContent | ConvertFrom-Json -AsHashtable
    }
    catch {
        Write-Error "Error reading settings.json: $_"
        $settings = @{}
    }
}

# Initialize imports array if it doesn't exist
if (-not $settings.ContainsKey("vscode_custom_css.imports")) {
    $settings["vscode_custom_css.imports"] = @()
}

# Convert the imports to an array if it's not already
if ($settings["vscode_custom_css.imports"] -isnot [Array]) {
    $settings["vscode_custom_css.imports"] = @($settings["vscode_custom_css.imports"])
}

# Add our CSS files
foreach ($file in $cssFiles) {
    # Convert Windows paths to proper URI format
    $fileUri = "file:///" + $file.Replace("\", "/")
    if ($settings["vscode_custom_css.imports"] -notcontains $fileUri) {
        $settings["vscode_custom_css.imports"] += $fileUri
    }
}

# Add our JS files
foreach ($file in $jsFiles) {
    # Convert Windows paths to proper URI format
    $fileUri = "file:///" + $file.Replace("\", "/")
    if ($settings["vscode_custom_css.imports"] -notcontains $fileUri) {
        $settings["vscode_custom_css.imports"] += $fileUri
    }
}

# Save settings
$settingsJson = $settings | ConvertTo-Json -Depth 10
Set-Content -Path $settingsPath -Value $settingsJson -Encoding UTF8

Write-Host "Gothic Cathedral Theme effects configuration complete."
Write-Host "Please run 'Reload Custom CSS and JS' from the command palette and restart VS Code."
