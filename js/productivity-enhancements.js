// === VS Code Productivity Enhancements ===

function initProductivityEnhancements() {
    console.log("Gothic Cathedral Theme: Initializing productivity enhancements");

    // Command palette text visibility fix
    fixCommandPalette();

    // File explorer enhancements
    enhanceFileExplorer();

    // Visual feedback effects
    addFeedbackEffects();

    // Fix popover and tooltip delays
    fixPopoverDelays();

    // Enhance error displays
    enhanceErrorDisplay();

    // Enhance suggestion widget
    enhanceSuggestionWidget();

    // Enhance text selection
    enhanceTextSelection();

    // Add advanced animations
    addAdvancedAnimations();
}

// Fix command palette text cutoff issues
function fixCommandPalette() {
    // Use a more efficient approach with less DOM manipulation
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.addedNodes) {
                for (const node of mutation.addedNodes) {
                    if (node.classList && node.classList.contains('quick-input-widget')) {
                        // Apply fixes immediately and after a delay to catch any dynamic changes
                        applyCommandPaletteFixes(node);
                        setTimeout(() => applyCommandPaletteFixes(node), 50);

                        // Watch for scrolling and apply fixes as needed
                        watchScrolling(node);
                    }
                }
            }
        }
    });

    observer.observe(document.body, { childList: true });

    // Watch scrolling to ensure content is visible
    function watchScrolling(palette) {
        const scrollable = palette.querySelector('.monaco-list .monaco-scrollable-element');
        if (scrollable) {
            // Apply fixes when scrolling ends to ensure bottom items are visible
            scrollable.addEventListener('scroll', () => {
                clearTimeout(scrollable.scrollEndTimer);
                scrollable.scrollEndTimer = setTimeout(() => {
                    fixVisibleRows(palette);
                }, 100);
            }, { passive: true });
        }
    }

    // Fix row visibility issues for visible rows
    function fixVisibleRows(palette) {
        palette.querySelectorAll('.monaco-list-row').forEach(row => {
            if (isElementInViewport(row)) {
                // Ensure visible rows have proper styling
                row.style.height = 'auto';
                row.style.minHeight = '28px';

                // Fix label container
                const container = row.querySelector('.monaco-icon-label-container');
                if (container) {
                    container.style.overflow = 'visible';
                    container.style.textOverflow = 'clip';
                }
            }
        });
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Apply focused fixes to the command palette
    function applyCommandPaletteFixes(palette) {
        // Set width
        palette.style.width = '850px';
        palette.style.maxWidth = '90vw';

        // Hide unwanted actions
        palette.querySelectorAll('.actions-container .action-item:not(.monaco-toolbar)').forEach(item => {
            item.style.display = 'none';
        });

        // Fix scrollable container - CRITICAL FIX for bottom cutoff
        const scrollable = palette.querySelector('.monaco-list .monaco-scrollable-element');
        if (scrollable) {
            // Remove problematic padding that causes cutoff
            scrollable.style.paddingBottom = '0';
            scrollable.style.overflow = 'visible';

            // Add padding to rows container instead
            const rows = scrollable.querySelector('.monaco-list-rows');
            if (rows) {
                rows.style.paddingBottom = '10px';
            }
        }

        // Fix list padding that causes excess space
        const list = palette.querySelector('.monaco-list');
        if (list) {
            list.style.paddingBottom = '0';
        }

        // Fix list container spacing
        const listContainer = palette.querySelector('.quick-input-list');
        if (listContainer) {
            listContainer.style.marginBottom = '0';
        }

        // Prevent action bar from overlapping content
        const actionBar = palette.querySelector('.quick-input-action-bar');
        if (actionBar) {
            actionBar.style.position = 'relative';
            actionBar.style.zIndex = '1';
            actionBar.style.borderTop = '1px solid rgba(127, 127, 127, 0.1)';
            actionBar.style.paddingTop = '8px';
            actionBar.style.marginTop = '0';
            actionBar.style.background = 'none';
        }

        // Improve row displaying - Refined for more compact size
        palette.querySelectorAll('.monaco-list-row').forEach(row => {
            // Set more compact height for items
            row.style.height = 'auto';
            row.style.minHeight = '22px'; // Reduced from 28px for better compactness
            row.style.maxHeight = '28px'; // Add max height to prevent overflow
            row.style.padding = '2px 8px'; // Reduced padding
            row.style.margin = '1px 2px'; // Smaller margins to fit more
            row.style.boxSizing = 'border-box';
            row.style.overflow = 'hidden'; // Prevent overflow issues
            row.style.display = 'flex';
            row.style.alignItems = 'center';

            // Fix label container
            const container = row.querySelector('.monaco-icon-label-container');
            if (container) {
                container.style.maxWidth = 'none';
                container.style.paddingRight = '100px';
                container.style.whiteSpace = 'nowrap'; // Changed to nowrap to prevent multi-line
                container.style.overflow = 'hidden'; // Hide overflow
                container.style.textOverflow = 'ellipsis'; // Use ellipsis
                container.style.lineHeight = '22px'; // Explicit line height
            }

            // Position keybindings to avoid overlapping text
            const keybinding = row.querySelector('.monaco-keybinding');
            if (keybinding) {
                keybinding.style.position = 'absolute';
                keybinding.style.right = '8px';
                keybinding.style.top = '50%';
                keybinding.style.transform = 'translateY(-50%)';
            }

            // Fix description text
            const description = row.querySelector('.label-description');
            if (description) {
                description.style.whiteSpace = 'nowrap'; // Change to nowrap
                description.style.overflow = 'hidden';
                description.style.textOverflow = 'ellipsis';
                description.style.opacity = '0.8';
                description.style.maxWidth = '50%'; // Limit width
            }
        });
    }
}

// Enhance file explorer with subtle animations
function enhanceFileExplorer() {
    // Add hover effects with less DOM manipulation
    let enhancedRows = new WeakSet();

    function addExplorerEffects() {
        document.querySelectorAll('.explorer-folders-view .monaco-list-row').forEach(row => {
            if (enhancedRows.has(row)) return;
            enhancedRows.add(row);

            const container = row.querySelector('.monaco-icon-label-container');
            if (!container) return;

            row.addEventListener('mouseenter', () => {
                container.style.transition = 'transform 0.2s ease';
                container.style.transform = 'translateX(2px)';
            });

            row.addEventListener('mouseleave', () => {
                container.style.transform = '';
            });
        });
    }

    // Initial enhancement
    setTimeout(addExplorerEffects, 1000);

    // Reapply periodically (less frequently to improve performance)
    setInterval(addExplorerEffects, 5000);
}

// Add visual feedback effects
function addFeedbackEffects() {
    // Save effect handler - using event delegation for better performance
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            createSaveEffect();
        }
    });

    // Create save effect with less DOM manipulation
    function createSaveEffect() {
        const editor = document.querySelector('.editor-instance.focused, .monaco-editor.focused');
        if (!editor) return;

        let saveEffect = document.getElementById('gothic-save-effect');

        if (!saveEffect) {
            saveEffect = document.createElement('div');
            saveEffect.id = 'gothic-save-effect';

            // Add styles directly to minimize reflows
            saveEffect.style.cssText = `
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                background: radial-gradient(circle, rgba(100, 180, 140, 0.15) 0%, transparent 70%);
                border-radius: 50%;
                filter: blur(10px);
                opacity: 0;
                width: 100px;
                height: 100px;
            `;

            // Add style only once
            if (!document.getElementById('gothic-save-effect-style')) {
                const style = document.createElement('style');
                style.id = 'gothic-save-effect-style';
                style.textContent = `
                    @keyframes saveEffectPulse {
                        0% { transform: scale(0.8); opacity: 0.8; }
                        100% { transform: scale(2.5); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.appendChild(saveEffect);
        }

        // Get editor position
        const rect = editor.getBoundingClientRect();

        // Set position
        saveEffect.style.left = `${rect.left + rect.width / 2 - 50}px`;
        saveEffect.style.top = `${rect.top + rect.height / 2 - 50}px`;

        // Trigger animation
        saveEffect.style.animation = 'none';
        saveEffect.offsetHeight; // Force reflow
        saveEffect.style.animation = 'saveEffectPulse 0.8s cubic-bezier(0.2, 0.9, 0.1, 1.4) forwards';
    }
}

// Fix popover and tooltip delays and nested menu issues
function fixPopoverDelays() {
    // Override VS Code's tooltip delay through DOM mutation observer
    const tooltipObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.addedNodes) {
                for (const node of mutation.addedNodes) {
                    // Fix tooltips
                    if (node.classList &&
                        (node.classList.contains('monaco-tooltip') ||
                            node.classList.contains('monaco-hover'))) {
                        // Apply immediate display
                        node.style.transitionDelay = '0ms';
                        node.style.animationDuration = '0.08s';
                    }

                    // Fix context menus and their submenus
                    if (node.classList && node.classList.contains('monaco-menu-container')) {
                        // Fix immediate display
                        node.style.transitionDelay = '0ms';
                        node.style.animationDuration = '0.08s';

                        // Fix nested menus
                        fixNestedMenus(node);
                    }
                }
            }
        }
    });

    // Start observing for tooltips and popovers
    tooltipObserver.observe(document.body, { childList: true, subtree: true });

    // Fix nested menus
    function fixNestedMenus(menuContainer) {
        // Make sure container has proper overflow
        menuContainer.style.overflow = 'visible';

        // Find and monitor all submenu items
        const submenuItems = menuContainer.querySelectorAll('.action-item.submenu');

        // Fix each submenu item
        submenuItems.forEach(item => {
            // Make sure submenu indicators are visible
            const indicator = item.querySelector('.submenu-indicator');
            if (indicator) {
                indicator.style.opacity = '0.8';
            }

            // Monitor for hover state
            item.addEventListener('mouseenter', () => {
                // Force submenus to display immediately
                setTimeout(() => {
                    const nestedMenu = document.querySelector('.monaco-menu-container:not(:hover)');
                    if (nestedMenu) {
                        nestedMenu.style.display = 'block';
                        nestedMenu.style.zIndex = '100001';
                        nestedMenu.style.overflow = 'visible';

                        // Recursively fix this new nested menu
                        fixNestedMenus(nestedMenu);
                    }
                }, 10);
            });
        });
    }
}

// Enhance error display for better visibility
function enhanceErrorDisplay() {
    // Use a MutationObserver to watch for error widgets
    const errorObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(node => {
                    // Enhance error widgets
                    if (node.classList &&
                        (node.classList.contains('monaco-editor-overlaymessage') ||
                            node.classList.contains('marker-widget'))) {
                        enhanceErrorWidget(node);
                    }

                    // Find squiggly errors/warnings and enhance them
                    if (node.querySelectorAll) {
                        node.querySelectorAll('.squiggly-error, .squiggly-warning').forEach(squiggly => {
                            enhanceSquiggly(squiggly);
                        });
                    }
                });
            }
        });
    });

    // Start observing
    errorObserver.observe(document.body, { childList: true, subtree: true });

    // Enhance error widgets
    function enhanceErrorWidget(widget) {
        // Add subtle pulsing animation to error widgets
        if (widget.innerHTML.includes('error') || widget.classList.contains('error')) {
            widget.style.boxShadow = '0 4px 12px rgba(255, 80, 80, 0.2)';
            widget.style.borderLeft = '3px solid #ff5555';
            widget.style.backgroundColor = 'rgba(255, 85, 85, 0.05)';
        } else if (widget.innerHTML.includes('warning') || widget.classList.contains('warning')) {
            widget.style.boxShadow = '0 4px 12px rgba(255, 204, 0, 0.2)';
            widget.style.borderLeft = '3px solid #ffcc00';
            widget.style.backgroundColor = 'rgba(255, 204, 0, 0.05)';
        }

        // Make sure widget is visible
        widget.style.borderRadius = 'var(--radius-sm)';
        widget.style.overflow = 'hidden';

        // Make code in error messages more readable
        const codeElements = widget.querySelectorAll('code');
        codeElements.forEach(code => {
            code.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            code.style.padding = '1px 3px';
            code.style.borderRadius = '3px';
        });
    }

    // Enhance squiggly lines
    function enhanceSquiggly(squiggly) {
        squiggly.style.height = '4px';
        squiggly.style.backgroundSize = '6px 4px';
        squiggly.style.backgroundPosition = 'bottom';
        squiggly.style.opacity = '0.9';

        if (squiggly.classList.contains('squiggly-error')) {
            squiggly.style.animation = 'squigglyErrorAnimation 2s infinite linear';
        } else if (squiggly.classList.contains('squiggly-warning')) {
            squiggly.style.animation = 'squigglyWarningAnimation 2s infinite linear';
        }
    }

    // Add special handling for find matches
    document.addEventListener('keydown', (e) => {
        // If user presses Ctrl+F or Cmd+F (Find)
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            setTimeout(enhanceFindMatches, 100);
            // Continue monitoring for a short while as matches get added
            const findInterval = setInterval(enhanceFindMatches, 500);
            setTimeout(() => clearInterval(findInterval), 2000);
        }
    });

    function enhanceFindMatches() {
        // Enhance all find matches
        document.querySelectorAll('.findMatch').forEach(match => {
            match.style.backgroundColor = 'rgba(140, 100, 180, 0.45)';
            match.style.border = '1px solid rgba(140, 100, 180, 0.8)';
            match.style.borderRadius = '3px';
            match.style.boxShadow = '0 0 5px rgba(140, 100, 180, 0.4)';
        });

        // Specially enhance current match
        document.querySelectorAll('.currentFindMatch').forEach(current => {
            current.style.backgroundColor = 'rgba(170, 130, 210, 0.55)';
            current.style.border = '1px solid rgba(190, 150, 230, 0.9)';
            current.style.borderRadius = '3px';
            current.style.boxShadow = '0 0 8px rgba(170, 130, 210, 0.5)';
            current.style.animation = 'findMatchPulse 2s infinite ease-in-out';
        });
    }
}

// Enhance suggestion widget experience
function enhanceSuggestionWidget() {
    // Watch for suggestion widget appearance
    const suggestionObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.addedNodes) {
                for (const node of mutation.addedNodes) {
                    if (node.classList && node.classList.contains('suggest-widget')) {
                        enhanceSuggestions(node);

                        // Watch for details panel appearing
                        const detailsObserver = new MutationObserver(detailsMutations => {
                            const details = node.querySelector('.details');
                            if (details) {
                                enhanceDocumentation(details);
                            }
                        });

                        detailsObserver.observe(node, { childList: true, subtree: true });
                    }
                }
            }
        }
    });

    // Start observing document body
    suggestionObserver.observe(document.body, { childList: true, subtree: true });

    // Apply enhancements to suggestion widget
    function enhanceSuggestions(widget) {
        // Enhance focused item
        const focusedItem = widget.querySelector('.monaco-list-row.focused');
        if (focusedItem) {
            focusedItem.style.backgroundColor = 'rgba(100, 80, 140, 0.2)';
            focusedItem.style.transform = 'translateX(3px)';
            focusedItem.style.borderLeft = '2px solid rgba(100, 80, 140, 0.5)';
        }

        // Check for details panel right away
        const details = widget.querySelector('.details');
        if (details) {
            enhanceDocumentation(details);
        }
    }

    // Enhance documentation panel
    function enhanceDocumentation(details) {
        // Add gothic styling to documentation
        details.style.borderTop = '1px solid rgba(100, 80, 140, 0.2)';
        details.style.backgroundColor = 'rgba(40, 30, 50, 0.04)';
        details.style.padding = '10px';
        details.style.maxHeight = '320px';
        details.style.boxShadow = 'inset 0 5px 10px -5px rgba(0, 0, 0, 0.1)';

        // Add scrollable padding
        const scrollable = details.querySelector('.monaco-scrollable-element');
        if (scrollable) {
            scrollable.style.paddingRight = '6px';
        }

        // Style markdown docs
        const docs = details.querySelector('.markdown-docs');
        if (docs) {
            docs.style.fontSize = '13px';
            docs.style.lineHeight = '1.5';
        }

        // Enhance code elements
        const codeElements = details.querySelectorAll('code, .codicon');
        codeElements.forEach(code => {
            code.style.backgroundColor = 'rgba(100, 80, 140, 0.1)';
            code.style.borderRadius = '3px';
            code.style.padding = '1px 4px';
            code.style.fontFamily = "'Geist Mono Light', monospace";
            code.style.fontSize = '12px';
        });

        // Improve parameter information
        const typeInfo = details.querySelector('.type');
        if (typeInfo) {
            typeInfo.style.opacity = '0.8';
            typeInfo.style.fontSize = '12px';
            typeInfo.style.marginBottom = '6px';
            typeInfo.style.paddingBottom = '6px';
            typeInfo.style.borderBottom = '1px dashed rgba(127, 127, 127, 0.2)';
        }

        // Parameter highlighting
        const parameters = details.querySelectorAll('.parameter');
        parameters.forEach(param => {
            param.style.fontWeight = 'bold';
            param.style.color = 'rgb(130, 100, 180)';
        });

        // Enhance markdown elements
        const paragraphs = details.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.margin = '6px 0';
        });

        const headings = details.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(heading => {
            heading.style.marginTop = '12px';
            heading.style.marginBottom = '6px';
            heading.style.fontWeight = '600';
        });

        const lists = details.querySelectorAll('ul, ol');
        lists.forEach(list => {
            list.style.margin = '6px 0';
            list.style.paddingLeft = '20px';
        });

        const listItems = details.querySelectorAll('li');
        listItems.forEach(item => {
            item.style.margin = '3px 0';
        });

        const links = details.querySelectorAll('a');
        links.forEach(link => {
            link.style.textDecoration = 'underline';
            link.style.textUnderlineOffset = '2px';
            link.style.color = 'rgb(130, 100, 180)';
        });

        const separators = details.querySelectorAll('hr');
        separators.forEach(hr => {
            hr.style.border = 'none';
            hr.style.borderTop = '1px dashed rgba(127, 127, 127, 0.2)';
            hr.style.margin = '8px 0';
        });

        const blockquotes = details.querySelectorAll('blockquote');
        blockquotes.forEach(quote => {
            quote.style.borderLeft = '3px solid rgba(100, 80, 140, 0.3)';
            quote.style.margin = '8px 0';
            quote.style.paddingLeft = '10px';
            quote.style.fontStyle = 'italic';
        });

        const tables = details.querySelectorAll('table');
        tables.forEach(table => {
            table.style.borderCollapse = 'collapse';
            table.style.margin = '8px 0';
            table.style.width = '100%';

            const cells = table.querySelectorAll('th, td');
            cells.forEach(cell => {
                cell.style.border = '1px solid rgba(127, 127, 127, 0.2)';
                cell.style.padding = '4px 8px';
                cell.style.textAlign = 'left';
            });

            const headers = table.querySelectorAll('th');
            headers.forEach(header => {
                header.style.backgroundColor = 'rgba(100, 80, 140, 0.1)';
            });
        });
    }
}

// Enhance text selection visibility
function enhanceTextSelection() {
    // Create or update custom CSS for selections
    let selectionStyle = document.getElementById('gothic-selection-style');
    if (!selectionStyle) {
        selectionStyle = document.createElement('style');
        selectionStyle.id = 'gothic-selection-style';
        document.head.appendChild(selectionStyle);
    }

    // Set improved text selection styles
    selectionStyle.textContent = `
        .monaco-editor .selected-text {
            background-color: rgba(100, 80, 140, 0.3) !important;
            border-radius: 2px !important;
            border: none !important;
        }

        .monaco-editor .cursor {
            background-color: #d4d4d4 !important;
            border-color: #d4d4d4 !important;
            width: 2px !important;
        }

        /* Remove bracket selection decorations */
        .monaco-editor .bracket-match {
            background-color: rgba(100, 80, 140, 0.2) !important;
            border: none !important;
            box-shadow: none !important;
        }

        /* Improve selection visibility in dropdown lists and inputs */
        .monaco-list-row.selected,
        .monaco-list-row.focused {
            background-color: rgba(100, 80, 140, 0.2) !important;
            color: var(--vscode-foreground) !important;
        }

        /* Improve selection in inputs */
        input::selection,
        textarea::selection {
            background-color: rgba(100, 80, 140, 0.5) !important;
            color: white !important;
        }
    `;

    // Use mutation observer to ensure selection styles are applied even when the editor changes
    const editorObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.addedNodes) {
                for (const node of mutation.addedNodes) {
                    if (node.classList &&
                        (node.classList.contains('monaco-editor') ||
                            node.classList.contains('editor-instance'))) {
                        applySelectionFixes(node);
                    }
                }
            }
        }
    });

    // Start observing the document for editor additions
    editorObserver.observe(document.body, { childList: true, subtree: true });

    // Apply selection fixes to existing editors
    function applySelectionFixes(editor) {
        // Find and override any inline selection styles
        const viewLines = editor.querySelectorAll('.view-line');
        viewLines.forEach(line => {
            const selections = line.querySelectorAll('.selected-text');
            selections.forEach(selection => {
                selection.style.backgroundColor = 'rgba(100, 80, 140, 0.3)';
                selection.style.border = 'none';
                selection.style.borderRadius = '2px';
            });

            // Fix bracket match styles
            const brackets = line.querySelectorAll('.bracket-match');
            brackets.forEach(bracket => {
                bracket.style.border = 'none';
                bracket.style.backgroundColor = 'rgba(100, 80, 140, 0.2)';
                bracket.style.boxShadow = 'none';
            });
        });
    }

    // Apply fixes to existing editors right away
    document.querySelectorAll('.monaco-editor, .editor-instance').forEach(applySelectionFixes);
}

// Add advanced animations
function addAdvancedAnimations() {
    // Create style for advanced animations
    const animStyle = document.createElement('style');
    animStyle.id = 'gothic-advanced-animations';
    animStyle.textContent = `
        /* Tab opening/closing animations */
        @keyframes tabOpen {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        @keyframes tabClose {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-20px); opacity: 0; }
        }

        /* Smooth folder opening/closing */
        @keyframes folderExpand {
            from { max-height: 0; opacity: 0.8; }
            to { max-height: 1000px; opacity: 1; }
        }

        @keyframes folderCollapse {
            from { max-height: 1000px; opacity: 1; }
            to { max-height: 0; opacity: 0.8; }
        }

        /* Smooth panel transitions */
        @keyframes panelSlideUp {
            from { transform: translateY(20px); opacity: 0.8; }
            to { transform: translateY(0); opacity: 1; }
        }

        @keyframes panelSlideDown {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(20px); opacity: 0.8; }
        }

        /* Editor content change transitions */
        @keyframes contentFade {
            from { opacity: 0.8; }
            to { opacity: 1; }
        }

        /* Sidebar panel transitions */
        @keyframes sidebarSlideRight {
            from { transform: translateX(-20px); opacity: 0.8; }
            to { transform: translateX(0); opacity: 1; }
        }

        /* Focused element glow */
        @keyframes focusGlow {
            0% { box-shadow: 0 0 0 rgba(100, 80, 140, 0.2); }
            50% { box-shadow: 0 0 10px rgba(100, 80, 140, 0.5); }
            100% { box-shadow: 0 0 0 rgba(100, 80, 140, 0.2); }
        }
    `;
    document.head.appendChild(animStyle);

    // Watch for DOM changes to apply animations
    const animationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    // Animate tabs
                    if (node.classList && node.classList.contains('tab')) {
                        node.style.animation = 'tabOpen 200ms cubic-bezier(0.2, 0.9, 0.1, 1)';
                    }

                    // Animate panels
                    if (node.classList && node.classList.contains('panel')) {
                        node.style.animation = 'panelSlideUp 250ms cubic-bezier(0.2, 0.9, 0.1, 1)';
                    }

                    // Animate sidebar views
                    if (node.classList && node.classList.contains('split-view-view')) {
                        node.style.animation = 'sidebarSlideRight 250ms cubic-bezier(0.2, 0.9, 0.1, 1)';
                    }

                    // Animate editor content
                    if (node.classList &&
                        (node.classList.contains('view-lines') ||
                            node.classList.contains('editor-container'))) {
                        node.style.animation = 'contentFade 200ms cubic-bezier(0.2, 0.9, 0.1, 1)';
                    }
                });
            }
        });
    });

    // Start observing the document
    animationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });

    // Add subtle cursor animation
    const cursorStyle = document.createElement('style');
    cursorStyle.id = 'gothic-cursor-animation';
    cursorStyle.textContent = `
        .monaco-editor .cursor {
            transition: all 60ms ease-out !important;
        }
    `;
    document.head.appendChild(cursorStyle);
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', initProductivityEnhancements);
