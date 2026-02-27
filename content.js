// ============================================================
// Theme Definitions (from STYLEGUIDE.md)
// ============================================================
const themes = {
    dark: {
        bgPrimary:      '#0a1628',
        bgSecondary:    '#0f2035',
        bgHeader:       '#0d1b2e',
        bgHover:        '#142a45',
        accentPrimary:  '#22d3ee',
        accentSecondary:'#0ea5e9',
        accentSuccess:  '#34d399',
        textPrimary:    '#e2e8f0',
        textSecondary:  '#64748b',
        textMuted:      '#475569',
        textAccent:     '#22d3ee',
        borderSubtle:   '#1e3a5c',
        borderCard:     '#1a3050',
        borderAccent:   '#22d3ee',
        shadowPanel:    '0 8px 32px rgba(0, 10, 30, 0.6)',
        btnGradient:    'linear-gradient(135deg, #0ea5e9, #22d3ee)',
        btnText:        '#0a1628',
        glowBar:        'linear-gradient(90deg, #0ea5e9, #22d3ee, #f59e0b)',
        toggleIcon:     '\u2600\uFE0F',
    },
    light: {
        bgPrimary:      '#f8fafc',
        bgSecondary:    '#f1f5f9',
        bgHeader:       '#f8fafc',
        bgHover:        '#e2e8f0',
        accentPrimary:  '#0891b2',
        accentSecondary:'#0369a1',
        accentSuccess:  '#059669',
        textPrimary:    '#0f172a',
        textSecondary:  '#64748b',
        textMuted:      '#94a3b8',
        textAccent:     '#0891b2',
        borderSubtle:   '#e2e8f0',
        borderCard:     '#cbd5e1',
        borderAccent:   '#0891b2',
        shadowPanel:    '0 8px 32px rgba(0, 0, 0, 0.12)',
        btnGradient:    'linear-gradient(135deg, #0369a1, #0891b2)',
        btnText:        '#ffffff',
        glowBar:        'linear-gradient(90deg, #0369a1, #0891b2, #f59e0b)',
        toggleIcon:     '\uD83C\uDF19',
    }
};

let currentTheme = 'dark';
let monitor;
let messageQueue = [];
let seenSignatures = new Set();
let sidebarCounter = null;   // reference to the sidebar counter element
let sidebarAnalyzeEl = null; // reference to sidebar analyze button (for pulse)
let sidebarExportEl = null;  // reference to sidebar export button (show/hide)

// ============================================================
// SVG Icons (shared between panel and sidebar)
// ============================================================
const ICONS = {
    analyze:  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6" opacity="0.4"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/><line x1="12" y1="12" x2="12" y2="3" class="gemini-exporter-sweep-arm"/></svg>',
    analyzeLg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6" opacity="0.4"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/><line x1="12" y1="12" x2="12" y2="3" class="gemini-exporter-sweep-arm"/></svg>',
    export:   '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    exportLg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    live:     '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="10"/></svg>',
    pin:      '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    check:    '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    eject:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
};

// ============================================================
// Pattern Recognition Engine
// ============================================================
const tableToMarkdown = (tableEl) => {
    const rows = Array.from(tableEl.querySelectorAll('tr'));
    if (rows.length === 0) return '';
    const mdRows = rows.map(tr => {
        const cells = Array.from(tr.querySelectorAll('th, td'));
        return `| ${cells.map(c => c.innerText.trim().replace(/\|/g, '\\|')).join(' | ')} |`;
    });
    const headerLen = (rows[0].querySelectorAll('th, td')).length;
    mdRows.splice(1, 0, `| ${Array(headerLen).fill('---').join(' | ')} |`);
    return `\n\n${mdRows.join('\n')}\n\n`;
};

const patternProcessor = (node) => {
    const walk = (el) => {
        if (!el) return '';
        if (el.nodeType === 3) return el.textContent;
        if (el.nodeType !== 1) return '';
        if (el.tagName === 'PRE' || el.tagName === 'CODE-BLOCK' || el.classList.contains('code-block-wrapper')) {
            const code = el.querySelector('code')?.innerText || el.innerText;
            return `\n\n\`\`\`\n${code.trim()}\n\`\`\`\n\n`;
        }
        if (el.tagName === 'TABLE') return tableToMarkdown(el);
        if (el.tagName === 'BR') return '\n';
        if (el.tagName === 'LI') {
            let cc = ''; el.childNodes.forEach(c => cc += walk(c));
            return `\n* ${cc.trim()}`;
        }
        if (['P', 'DIV', 'SECTION'].includes(el.tagName)) {
            let cc = ''; el.childNodes.forEach(c => cc += walk(c));
            return `\n\n${cc.trim()}\n\n`;
        }
        if (el.tagName === 'STRONG' || el.tagName === 'B') return ` **${el.innerText.trim()}** `;
        if (/^H[1-6]$/.test(el.tagName)) return `\n\n${'#'.repeat(el.tagName[1])} ${el.innerText.trim()}\n\n`;
        let f = ''; el.childNodes.forEach(c => f += walk(c));
        return f;
    };
    return walk(node).replace(/\n{3,}/g, '\n\n').trim();
};

// ============================================================
// Collection Loop (shared between panel & sidebar mode)
// ============================================================
const MAX_SEGMENTS = 500; // safety cap

const collect = () => {
    if (messageQueue.length >= MAX_SEGMENTS) return;
    const targets = 'message-content, .query-text, .model-response-text, [data-test-id="message-content"]';
    document.querySelectorAll(targets).forEach(el => {
        if (messageQueue.length >= MAX_SEGMENTS) return;
        const sig = el.innerText.trim().substring(0, 500);
        if (sig && !seenSignatures.has(sig)) {
            seenSignatures.add(sig);
            // Process to markdown immediately — never store DOM clones
            const role = (el.classList.contains('query-text') || el.tagName === 'USER-QUERY') ? "USER" : "GEMINI";
            const markdown = patternProcessor(el);
            messageQueue.push({ role, markdown });
            // Update panel badges if visible
            if (countBadge) countBadge.innerText = `Segments: ${messageQueue.length}`;
            if (statusEl) statusEl.innerText = `Captured: ${messageQueue.length} segments`;
            // Show export buttons once we have content
            if (exportBtn) exportBtn.style.display = 'flex';
            if (sidebarExportEl) sidebarExportEl.style.display = '';
            // Update sidebar counter if injected
            if (sidebarCounter) sidebarCounter.textContent = messageQueue.length;
        }
    });
};

// ============================================================
// Export logic (shared)
// ============================================================
const doExport = () => {
    if (messageQueue.length === 0) return alert("Nothing analyzed! Please scroll through the chat first.");
    let finalDoc = `# Gemini Smart Export\nGenerated: ${new Date().toLocaleString()}\n\n---\n\n`;
    messageQueue.forEach(item => {
        const roleLabel = item.role === "USER" ? "### \uD83D\uDC64 USER" : "### \u264A GEMINI";
        finalDoc += `${roleLabel}\n\n${item.markdown}\n\n---\n\n`;
    });
    const blob = new Blob([finalDoc], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Gemini_Export_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Free the blob from memory
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// Inject pulse keyframes once
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
@keyframes gemini-exporter-sweep {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
@keyframes gemini-exporter-pulse-red {
    0%   { opacity: 1; stroke: #ff3b3b; }
    50%  { opacity: 0.3; stroke: #ff6b6b; }
    100% { opacity: 1; stroke: #ff3b3b; }
}
.gemini-exporter-sweep-arm {
    transform-origin: 12px 12px;
    stroke: currentColor;
}
.gemini-exporter-scanning .gemini-exporter-sweep-arm {
    stroke: #ff3b3b;
    animation: gemini-exporter-sweep 1.5s linear infinite, gemini-exporter-pulse-red 0.8s ease-in-out infinite;
}
`;
document.head.appendChild(pulseStyle);

const doAnalyze = () => {
    if (monitor) return;
    monitor = setInterval(collect, 600);
    // Start pulsing the sidebar analyze icon
    if (sidebarAnalyzeEl) sidebarAnalyzeEl.classList.add('gemini-exporter-scanning');
    // Also pulse the panel button if it exists
    if (startBtn) startBtn.classList.add('gemini-exporter-scanning');
};

// ============================================================
// References for panel elements (may or may not exist)
// ============================================================
let ui = null, statusEl = null, countBadge = null, modeBadge = null;
let startBtn = null, exportBtn = null, injectBtn = null;

// ============================================================
// Floating Eject Button (shown when sidebar is pinned)
// ============================================================
const createEjectFab = (onEject) => {
    const fab = document.createElement('button');
    fab.innerHTML = ICONS.eject;
    fab.title = 'Unpin from sidebar — show panel';
    fab.style.cssText = `
        position: fixed; top: 80px; right: 20px; z-index: 9999;
        width: 36px; height: 36px;
        display: flex; align-items: center; justify-content: center;
        background: #0a1628; border: 1px solid #1e3a5c;
        border-radius: 50%; cursor: pointer;
        color: #22d3ee; box-shadow: 0 4px 16px rgba(0,10,30,0.5);
        transition: all 0.2s ease;
    `;
    fab.onmouseover = () => { fab.style.transform = 'scale(1.1)'; fab.style.borderColor = '#22d3ee'; };
    fab.onmouseout  = () => { fab.style.transform = 'scale(1.0)'; fab.style.borderColor = '#1e3a5c'; };
    fab.onclick = onEject;
    document.body.appendChild(fab);
    return fab;
};

// ============================================================
// Sidebar Injection
// ============================================================
const cloneSidebarButton = (originalList, svgHtml, ariaLabel, onClick) => {
    const clone = originalList.cloneNode(true);
    clone.querySelectorAll('[data-test-id]').forEach(el => el.removeAttribute('data-test-id'));
    clone.classList.add('gemini-exporter-injected');

    const matIcon = clone.querySelector('mat-icon');
    if (matIcon) {
        matIcon.removeAttribute('fonticon');
        matIcon.removeAttribute('data-mat-icon-name');
        matIcon.classList.remove('mat-ligature-font', 'google-symbols');
        matIcon.style.fontFamily = 'inherit';
        matIcon.style.display = 'flex';
        matIcon.style.alignItems = 'center';
        matIcon.style.justifyContent = 'center';
        matIcon.innerHTML = svgHtml;
    }

    const anchor = clone.querySelector('a');
    if (anchor) {
        anchor.removeAttribute('href');
        anchor.setAttribute('aria-label', ariaLabel);
        anchor.style.cursor = 'pointer';
    }

    clone.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
    });

    return clone;
};

const createSidebarCounter = (originalList) => {
    // Clone the structure but make it a passive counter display
    const clone = originalList.cloneNode(true);
    clone.querySelectorAll('[data-test-id]').forEach(el => el.removeAttribute('data-test-id'));
    clone.classList.add('gemini-exporter-injected');

    const matIcon = clone.querySelector('mat-icon');
    if (matIcon) {
        matIcon.removeAttribute('fonticon');
        matIcon.removeAttribute('data-mat-icon-name');
        matIcon.classList.remove('mat-ligature-font', 'google-symbols');
        matIcon.style.fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif';
        matIcon.style.fontSize = '11px';
        matIcon.style.fontWeight = '700';
        matIcon.style.color = '#22d3ee';
        matIcon.style.display = 'flex';
        matIcon.style.alignItems = 'center';
        matIcon.style.justifyContent = 'center';
        matIcon.textContent = '0';
    }

    const anchor = clone.querySelector('a');
    if (anchor) {
        anchor.removeAttribute('href');
        anchor.setAttribute('aria-label', 'Segments captured');
        anchor.style.cursor = 'default';
        anchor.style.opacity = '0.8';
    }

    return { el: clone, counter: matIcon };
};

const injectIntoSidebar = () => {
    const originalList = document.querySelector('mat-action-list.top-action-list');
    if (!originalList) return false;

    const analyzeList = cloneSidebarButton(originalList, ICONS.analyzeLg, 'Analyze conversation', doAnalyze);
    sidebarAnalyzeEl = analyzeList;
    const exportList  = cloneSidebarButton(originalList, ICONS.exportLg, 'Export conversation', doExport);
    sidebarExportEl = exportList;
    exportList.style.display = 'none'; // hidden until segments are captured
    const { el: counterList, counter } = createSidebarCounter(originalList);
    sidebarCounter = counter;

    originalList.after(analyzeList, exportList, counterList);

    return true;
};

const removeSidebarInjections = () => {
    document.querySelectorAll('.gemini-exporter-injected').forEach(el => el.remove());
    sidebarCounter = null;
    sidebarAnalyzeEl = null;
    sidebarExportEl = null;
};

// ============================================================
// Panel UI Builder
// ============================================================
const buildPanel = () => {
    ui = document.createElement('div');
    ui.style.cssText = `
        position: fixed; top: 80px; right: 20px; z-index: 9999;
        display: flex; flex-direction: column;
        width: 190px; border-radius: 10px;
        font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        overflow: hidden; transition: all 0.3s ease;
    `;
    document.body.appendChild(ui);

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:8px 10px;cursor:grab;user-select:none;';

    const headerLeft = document.createElement('div');
    headerLeft.style.cssText = 'display:flex;align-items:center;gap:5px;';
    const headerIcon = document.createElement('span');
    headerIcon.innerText = '\u2666';
    headerIcon.style.cssText = 'font-size:13px;';
    const headerTitle = document.createElement('span');
    headerTitle.innerText = 'EXPORTER';
    headerTitle.style.cssText = 'font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;';
    headerLeft.appendChild(headerIcon);
    headerLeft.appendChild(headerTitle);

    const headerRight = document.createElement('div');
    headerRight.style.cssText = 'display:flex;align-items:center;gap:2px;';

    const themeBtn = document.createElement('button');
    themeBtn.style.cssText = 'background:none;border:none;cursor:pointer;font-size:11px;padding:2px 3px;border-radius:3px;transition:0.2s;line-height:1;';

    const collapseBtn = document.createElement('button');
    collapseBtn.innerHTML = '\u2303';
    collapseBtn.style.cssText = 'background:none;border:none;cursor:pointer;font-size:12px;padding:2px 3px;border-radius:3px;transition:0.2s;line-height:1;';

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '\u00D7';
    closeBtn.style.cssText = 'background:none;border:none;cursor:pointer;font-size:13px;padding:2px 3px;border-radius:3px;transition:0.2s;line-height:1;font-weight:bold;';

    headerRight.appendChild(themeBtn);
    headerRight.appendChild(collapseBtn);
    headerRight.appendChild(closeBtn);
    header.appendChild(headerLeft);
    header.appendChild(headerRight);
    ui.appendChild(header);

    // Divider
    const divider = document.createElement('div');
    divider.style.cssText = 'height:1px;margin:0 10px;';
    ui.appendChild(divider);

    // Body
    const body = document.createElement('div');
    body.style.cssText = 'padding:8px 10px;display:flex;flex-direction:column;gap:6px;';
    ui.appendChild(body);

    statusEl = document.createElement('div');
    statusEl.innerText = 'Analyzer: Standby';
    statusEl.style.cssText = 'font-size:10px;font-weight:600;text-align:center;padding:4px 0;';
    body.appendChild(statusEl);

    const badgeRow = document.createElement('div');
    badgeRow.style.cssText = 'display:flex;justify-content:center;gap:5px;';
    countBadge = document.createElement('span');
    countBadge.innerText = 'Segments: 0';
    countBadge.style.cssText = 'font-size:9px;font-weight:600;letter-spacing:0.3px;padding:2px 7px;border-radius:999px;';
    modeBadge = document.createElement('span');
    modeBadge.innerText = 'Idle';
    modeBadge.style.cssText = 'font-size:9px;font-weight:600;letter-spacing:0.3px;padding:2px 7px;border-radius:999px;';
    badgeRow.appendChild(countBadge);
    badgeRow.appendChild(modeBadge);
    body.appendChild(badgeRow);

    // Action buttons
    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:4px;';
    const btnStyle = 'flex:1;padding:6px 0;border:none;border-radius:5px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;';

    startBtn = document.createElement('button');
    startBtn.innerHTML = ICONS.analyze;
    startBtn.title = 'Analyze';
    startBtn.style.cssText = btnStyle;

    exportBtn = document.createElement('button');
    exportBtn.innerHTML = ICONS.export;
    exportBtn.title = 'Export';
    exportBtn.style.cssText = btnStyle;
    exportBtn.style.display = 'none'; // hidden until segments are captured

    [startBtn, exportBtn].forEach(btn => {
        btn.onmouseover = () => { btn.style.filter = 'brightness(1.15)'; btn.style.transform = 'translateY(-1px)'; };
        btn.onmouseout  = () => { btn.style.filter = 'brightness(1.0)';  btn.style.transform = 'translateY(0)'; };
    });

    btnRow.appendChild(startBtn);
    btnRow.appendChild(exportBtn);
    body.appendChild(btnRow);

    // Pin to sidebar button
    injectBtn = document.createElement('button');
    injectBtn.innerHTML = ICONS.pin;
    injectBtn.title = 'Pin to Sidebar';
    injectBtn.style.cssText = 'display:flex;align-items:center;justify-content:center;padding:4px 0;border:1px dashed;border-radius:5px;cursor:pointer;font-weight:600;font-size:8px;text-transform:uppercase;letter-spacing:0.3px;background:none;transition:all 0.2s ease;width:100%;';
    injectBtn.onmouseover = () => { injectBtn.style.filter = 'brightness(1.3)'; };
    injectBtn.onmouseout  = () => { injectBtn.style.filter = 'brightness(1.0)'; };
    body.appendChild(injectBtn);

    // Glow bar
    const glowBar = document.createElement('div');
    glowBar.style.cssText = 'height:2px;margin-top:4px;border-radius:0 0 10px 10px;';
    ui.appendChild(glowBar);

    // Theme application
    let collapsed = false;
    const applyTheme = (t) => {
        currentTheme = t;
        const c = themes[t];
        ui.style.background = c.bgPrimary;
        ui.style.border = `1px solid ${c.borderSubtle}`;
        ui.style.boxShadow = c.shadowPanel;
        header.style.background = c.bgHeader;
        headerIcon.style.color = c.accentPrimary;
        headerTitle.style.color = c.textPrimary;
        [themeBtn, collapseBtn, closeBtn].forEach(btn => {
            btn.style.color = c.textSecondary;
            btn.onmouseover = () => { btn.style.color = c.textPrimary; btn.style.background = c.bgHover; };
            btn.onmouseout  = () => { btn.style.color = c.textSecondary; btn.style.background = 'none'; };
        });
        themeBtn.innerText = c.toggleIcon;
        divider.style.background = c.borderCard;
        statusEl.style.color = c.textAccent;
        countBadge.style.border = `1px solid ${c.borderAccent}`;
        countBadge.style.color = c.accentPrimary;
        modeBadge.style.border = `1px solid ${monitor ? c.accentSuccess : c.textMuted}`;
        modeBadge.style.color = monitor ? c.accentSuccess : c.textMuted;
        startBtn.style.background = monitor ? c.accentSuccess : c.btnGradient;
        startBtn.style.color = c.btnText;
        exportBtn.style.background = c.btnGradient;
        exportBtn.style.color = c.btnText;
        injectBtn.style.borderColor = c.textMuted;
        injectBtn.style.color = c.textSecondary;
        glowBar.style.background = c.glowBar;
    };

    // Theme toggle
    themeBtn.onclick = () => {
        const next = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        chrome.storage.local.set({ theme: next });
    };

    // Load theme
    chrome.storage.local.get('theme', (result) => {
        if (result.theme) applyTheme(result.theme);
        else applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    });

    // Collapse / close
    collapseBtn.onclick = () => {
        collapsed = !collapsed;
        body.style.display = collapsed ? 'none' : 'flex';
        glowBar.style.display = collapsed ? 'none' : 'block';
        collapseBtn.innerHTML = collapsed ? '\u2304' : '\u2303';
    };
    closeBtn.onclick = () => {
        ui.remove();
        ui = null;
        if (monitor) { clearInterval(monitor); monitor = null; }
    };

    // Drag
    (() => {
        let dragging = false, offsetX = 0, offsetY = 0;
        header.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            dragging = true;
            const rect = ui.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            header.style.cursor = 'grabbing';
            ui.style.transition = 'none';
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            ui.style.left = (e.clientX - offsetX) + 'px';
            ui.style.top = (e.clientY - offsetY) + 'px';
            ui.style.right = 'auto';
        });
        document.addEventListener('mouseup', () => {
            if (!dragging) return;
            dragging = false;
            header.style.cursor = 'grab';
            ui.style.transition = 'all 0.3s ease';
        });
    })();

    // Button actions
    startBtn.onclick = () => {
        if (monitor) return;
        startBtn.innerHTML = ICONS.live;
        modeBadge.innerText = 'Active';
        statusEl.innerText = 'Slowly scroll the chat';
        doAnalyze();
        applyTheme(currentTheme);
    };
    exportBtn.onclick = () => {
        doExport();
        if (statusEl) {
            statusEl.innerText = '\u2705 Export Complete!';
            setTimeout(() => { statusEl.innerText = `Captured: ${messageQueue.length} segments`; }, 3000);
        }
    };

    // Pin to sidebar
    injectBtn.onclick = () => {
        const ok = injectIntoSidebar();
        if (!ok) {
            statusEl.innerText = 'Sidebar not found';
            setTimeout(() => { statusEl.innerText = 'Analyzer: Standby'; }, 2000);
            return;
        }
        // Persist and switch to sidebar mode
        chrome.storage.local.set({ sidebarPinned: true });
        ui.remove();
        ui = null;
        createEjectFab(ejectFromSidebar);
    };
};

// ============================================================
// Eject: remove sidebar items, show panel again
// ============================================================
const ejectFromSidebar = () => {
    // Stop monitor
    if (monitor) { clearInterval(monitor); monitor = null; }
    // Remove sidebar injections
    removeSidebarInjections();
    // Remove eject fab
    const fab = document.querySelector('.gemini-exporter-eject-fab');
    if (fab) fab.remove();
    // Save state
    chrome.storage.local.set({ sidebarPinned: false });
    // Rebuild panel
    buildPanel();
};

// ============================================================
// Init: decide which mode to launch
// ============================================================
chrome.storage.local.get(['sidebarPinned', 'theme'], (result) => {
    if (result.theme) currentTheme = result.theme;

    if (result.sidebarPinned) {
        // Sidebar mode — wait for Gemini's sidebar to render, then inject
        let retries = 0;
        const MAX_RETRIES = 20; // 10 seconds max
        const waitForSidebar = () => {
            const found = document.querySelector('mat-action-list.top-action-list');
            if (found) {
                injectIntoSidebar();
                const fab = createEjectFab(ejectFromSidebar);
                fab.classList.add('gemini-exporter-eject-fab');
            } else if (retries++ < MAX_RETRIES) {
                setTimeout(waitForSidebar, 500);
            } else {
                // Sidebar never appeared — fall back to panel mode
                buildPanel();
            }
        };
        waitForSidebar();
    } else {
        // Panel mode
        buildPanel();
    }
});
