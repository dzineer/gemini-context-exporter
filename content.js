// ============================================================
// State Machine + Theme Definitions
// ============================================================
const state = {
    status: 'idle',        // 'idle' | 'scanning' | 'paused'
    segments: [],
    signatures: new Set(),
    theme: 'dark',
    uiMode: 'panel',      // 'panel' | 'sidebar'
    monitor: null,
};

const refs = {
    ui: null, statusEl: null, countBadge: null, modeBadge: null,
    startBtn: null, exportBtn: null, injectBtn: null,
    statusDot: null, progressBar: null, glowBar: null,
    sidebarCounter: null, sidebarAnalyzeEl: null, sidebarExportEl: null,
    ejectFab: null,
};

const themes = {
    dark: {
        bgPrimary:      '#020617',
        bgSecondary:    '#0F172A',
        bgCard:         '#1E293B',
        bgHover:        '#1E293B',
        accentPrimary:  '#00FFFF',
        accentSecondary:'#0ea5e9',
        accentSuccess:  '#22C55E',
        accentWarn:     '#FF006E',
        textPrimary:    '#F8FAFC',
        textSecondary:  '#94A3B8',
        textMuted:      '#475569',
        textAccent:     '#00FFFF',
        borderSubtle:   '#1E293B',
        borderCard:     '#1E293B',
        btnPrimary:     '#00FFFF',
        btnPrimaryText: '#000000',
        btnOutline:     '#00FFFF',
        shadowPanel:    '0 0 30px rgba(0, 255, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.6)',
        glowBar:        'linear-gradient(90deg, #00FFFF, #0ea5e9, #FF006E, #0ea5e9, #00FFFF)',
        toggleIcon:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    },
    light: {
        bgPrimary:      '#f8fafc',
        bgSecondary:    '#f1f5f9',
        bgCard:         '#ffffff',
        bgHover:        '#e2e8f0',
        accentPrimary:  '#0891b2',
        accentSecondary:'#0369a1',
        accentSuccess:  '#059669',
        accentWarn:     '#e11d48',
        textPrimary:    '#0f172a',
        textSecondary:  '#475569',
        textMuted:      '#94a3b8',
        textAccent:     '#0891b2',
        borderSubtle:   '#e2e8f0',
        borderCard:     '#cbd5e1',
        btnPrimary:     '#0891b2',
        btnPrimaryText: '#ffffff',
        btnOutline:     '#0891b2',
        shadowPanel:    '0 8px 32px rgba(0, 0, 0, 0.12)',
        glowBar:        'linear-gradient(90deg, #0369a1, #0891b2, #e11d48, #0891b2, #0369a1)',
        toggleIcon:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    }
};

// ============================================================
// SVG Icons
// ============================================================
const ICONS = {
    analyze:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6" opacity="0.4"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/><line x1="12" y1="12" x2="12" y2="3" class="gemini-exporter-sweep-arm"/></svg>',
    export:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    stop:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" stroke="none"/></svg>',
    pin:      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    eject:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    hexIcon:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/></svg>',
    // Sidebar (24px)
    analyzeLg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6" opacity="0.4"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/><line x1="12" y1="12" x2="12" y2="3" class="gemini-exporter-sweep-arm"/></svg>',
    exportLg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    stopLg:   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" stroke="none"/></svg>',
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
// Collection
// ============================================================
const MAX_SEGMENTS = 500;

const collect = () => {
    if (state.segments.length >= MAX_SEGMENTS) return;
    const targets = 'message-content, .query-text, .model-response-text, [data-test-id="message-content"]';
    let found = false;
    document.querySelectorAll(targets).forEach(el => {
        if (state.segments.length >= MAX_SEGMENTS) return;
        const sig = el.innerText.trim().substring(0, 500);
        if (sig && !state.signatures.has(sig)) {
            state.signatures.add(sig);
            const role = (el.classList.contains('query-text') || el.tagName === 'USER-QUERY') ? "USER" : "GEMINI";
            const markdown = patternProcessor(el);
            state.segments.push({ role, markdown });
            found = true;
        }
    });
    if (found) render();
};

// ============================================================
// Export
// ============================================================
const doExport = () => {
    if (state.segments.length === 0) return;
    let finalDoc = `# Gemini Smart Export\nGenerated: ${new Date().toLocaleString()}\n\n---\n\n`;
    state.segments.forEach(item => {
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
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// ============================================================
// CSS Animations
// ============================================================
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
@keyframes gemini-exporter-wave {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
}
`;
document.head.appendChild(pulseStyle);

// ============================================================
// Transitions — the ONLY way to change state
// ============================================================
const transition = (action) => {
    switch (action) {
        case 'startScan':
            state.status = 'scanning';
            state.monitor = setInterval(collect, 600);
            break;
        case 'stopScan':
            clearInterval(state.monitor);
            state.monitor = null;
            state.status = state.segments.length ? 'paused' : 'idle';
            break;
        case 'toggleAnalyze':
            if (state.status === 'scanning') transition('stopScan');
            else transition('startScan');
            return;
        case 'export':
            doExport();
            break;
        case 'pin':
            teardownPanel();
            state.uiMode = 'sidebar';
            setupSidebar();
            break;
        case 'unpin':
            teardownSidebar();
            state.uiMode = 'panel';
            buildPanel();
            return; // buildPanel calls render
        case 'toggleTheme':
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            chrome.storage.local.set({ theme: state.theme });
            break;
    }
    render();
};

// ============================================================
// Render — reads state + refs, updates ALL UI
// ============================================================
const render = () => {
    const c = themes[state.theme];
    const scanning = state.status === 'scanning';
    const hasSegments = state.segments.length > 0;
    const isDark = state.theme === 'dark';

    // ── Panel mode ──
    if (refs.ui) {
        refs.ui.style.background = c.bgPrimary;
        refs.ui.style.border = `1px solid ${c.borderSubtle}`;
        refs.ui.style.boxShadow = c.shadowPanel;
    }
    if (refs.statusDot) {
        const amber = '#F59E0B';
        refs.statusDot.style.background = scanning ? c.accentSuccess : amber;
        refs.statusDot.style.boxShadow = scanning ? '0 0 8px ' + c.accentSuccess : '0 0 6px ' + amber;
    }
    if (refs.statusEl) {
        if (scanning) refs.statusEl.innerText = `SCANNING \u00B7 ${state.segments.length}`;
        else if (state.status === 'paused') refs.statusEl.innerText = `PAUSED \u00B7 ${state.segments.length}`;
        else refs.statusEl.innerText = 'STANDBY';
        refs.statusEl.style.color = scanning ? c.accentSuccess : c.textAccent;
    }
    if (refs.countBadge) {
        refs.countBadge.innerText = `${state.segments.length} segments`;
        refs.countBadge.style.color = c.textPrimary;
    }
    if (refs.modeBadge) {
        refs.modeBadge.innerText = scanning ? 'LIVE' : 'IDLE';
        refs.modeBadge.style.color = scanning ? c.accentSuccess : c.textPrimary;
        refs.modeBadge.style.borderColor = scanning ? c.accentSuccess + '60' : c.textMuted + '40';
        refs.modeBadge.style.background = scanning ? c.accentSuccess + '15' : 'transparent';
    }
    if (refs.progressBar) {
        const pct = Math.min((state.segments.length / 50) * 100, 100);
        refs.progressBar.style.width = pct + '%';
        refs.progressBar.style.background = c.accentPrimary;
    }
    if (refs.startBtn) {
        if (scanning) {
            refs.startBtn.innerHTML = `<span style="color:#FF3B3B">${ICONS.stop}</span><span style="flex:1;text-align:left;color:#F8FAFC">Stop</span>`;
            refs.startBtn.style.background = c.accentSuccess;
            refs.startBtn.style.color = c.btnPrimaryText;
            refs.startBtn.classList.add('gemini-exporter-scanning');
        } else {
            refs.startBtn.innerHTML = `${ICONS.analyze}<span style="flex:1;text-align:left">Analyze</span>`;
            refs.startBtn.style.background = c.btnPrimary;
            refs.startBtn.style.color = c.btnPrimaryText;
            refs.startBtn.classList.remove('gemini-exporter-scanning');
        }
        refs.startBtn.style.boxShadow = isDark ? '0 0 15px ' + (scanning ? c.accentSuccess : c.accentPrimary) + '30' : 'none';
    }
    if (refs.exportBtn) {
        refs.exportBtn.innerHTML = `${ICONS.export}<span style="flex:1;text-align:left">Export</span>`;
        const enabled = hasSegments;
        refs.exportBtn.style.background = 'transparent';
        refs.exportBtn.style.border = '1px solid ' + c.btnOutline + (enabled ? '' : '40');
        refs.exportBtn.style.color = enabled ? c.accentPrimary : c.textMuted;
        refs.exportBtn.style.opacity = enabled ? '1' : '0.4';
        refs.exportBtn.style.cursor = enabled ? 'pointer' : 'not-allowed';
        refs.exportBtn.style.pointerEvents = enabled ? 'auto' : 'none';
    }
    if (refs.injectBtn) {
        refs.injectBtn.style.borderColor = c.textMuted + '60';
        refs.injectBtn.style.color = c.textSecondary;
    }
    if (refs.glowBar) {
        refs.glowBar.style.backgroundImage = c.glowBar;
        refs.glowBar.style.backgroundSize = '200% 100%';
        refs.glowBar.style.animation = scanning ? 'gemini-exporter-wave 2s linear infinite' : 'none';
        refs.glowBar.style.boxShadow = isDark ? '0 0 8px ' + c.accentPrimary + '40' : 'none';
    }
    // Header theming (refs set by buildPanel)
    if (refs._header) refs._header.style.background = c.bgSecondary;
    if (refs._headerIcon) {
        refs._headerIcon.style.color = c.accentPrimary;
        refs._headerIcon.style.filter = isDark ? 'drop-shadow(0 0 6px ' + c.accentPrimary + ')' : 'none';
    }
    if (refs._headerTitle) {
        refs._headerTitle.style.color = c.textPrimary;
        refs._headerTitle.style.textShadow = isDark ? '0 0 10px ' + c.accentPrimary + '40' : 'none';
    }
    if (refs._divider) {
        refs._divider.style.background = isDark
            ? 'linear-gradient(90deg, transparent, ' + c.accentPrimary + '40, transparent)'
            : c.borderCard;
    }
    if (refs._statusCard) {
        refs._statusCard.style.background = c.bgCard;
        refs._statusCard.style.borderColor = scanning ? c.accentSuccess : c.borderSubtle;
        refs._statusCard.style.boxShadow = scanning && isDark ? '0 0 12px ' + c.accentSuccess + '30' : 'none';
    }
    if (refs._progressWrap) refs._progressWrap.style.background = c.borderSubtle;
    if (refs._themeBtn) refs._themeBtn.innerHTML = c.toggleIcon;
    [refs._themeBtn, refs._collapseBtn, refs._closeBtn].forEach(btn => {
        if (!btn) return;
        btn.style.color = c.textPrimary;
        btn.onmouseover = () => { btn.style.color = c.accentPrimary; btn.style.background = c.bgHover; };
        btn.onmouseout  = () => { btn.style.color = c.textPrimary; btn.style.background = 'none'; };
    });

    // ── Sidebar mode ──
    if (refs.sidebarAnalyzeEl) {
        if (scanning) refs.sidebarAnalyzeEl.classList.add('gemini-exporter-scanning');
        else refs.sidebarAnalyzeEl.classList.remove('gemini-exporter-scanning');
    }
    if (refs.sidebarExportEl) {
        refs.sidebarExportEl.style.display = hasSegments ? '' : 'none';
    }
    if (refs.sidebarCounter) {
        refs.sidebarCounter.textContent = state.segments.length;
        refs.sidebarCounter.parentElement.style.display = hasSegments ? 'flex' : 'none';
    }
};

// ============================================================
// Teardown helpers
// ============================================================
const teardownPanel = () => {
    if (refs.ui) refs.ui.remove();
    refs.ui = null; refs.statusEl = null; refs.countBadge = null;
    refs.modeBadge = null; refs.startBtn = null; refs.exportBtn = null;
    refs.injectBtn = null; refs.statusDot = null; refs.progressBar = null;
    refs.glowBar = null; refs._header = null; refs._headerIcon = null;
    refs._headerTitle = null; refs._divider = null; refs._statusCard = null;
    refs._progressWrap = null; refs._themeBtn = null; refs._collapseBtn = null;
    refs._closeBtn = null;
};

const teardownSidebar = () => {
    document.querySelectorAll('.gemini-exporter-injected').forEach(el => el.remove());
    if (refs.ejectFab) refs.ejectFab.remove();
    refs.sidebarCounter = null;
    refs.sidebarAnalyzeEl = null;
    refs.sidebarExportEl = null;
    refs.ejectFab = null;
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
    clone.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); onClick(); });
    return clone;
};

const setupSidebar = () => {
    const originalList = document.querySelector('mat-action-list.top-action-list');
    if (!originalList) {
        // Sidebar not found — revert to panel
        state.uiMode = 'panel';
        buildPanel();
        return;
    }

    const analyzeList = cloneSidebarButton(originalList, ICONS.analyzeLg, 'Analyze conversation', () => transition('toggleAnalyze'));
    refs.sidebarAnalyzeEl = analyzeList;

    const exportList = cloneSidebarButton(originalList, ICONS.exportLg, 'Export conversation', () => transition('export'));
    refs.sidebarExportEl = exportList;
    exportList.style.display = 'none';

    // Counter
    const wrap = document.createElement('div');
    wrap.classList.add('gemini-exporter-injected');
    wrap.style.cssText = 'display:none;align-items:center;justify-content:center;padding:8px 0;';
    const counter = document.createElement('span');
    counter.style.cssText = "font-family:'SF Mono','Fira Code',monospace;font-size:11px;font-weight:700;color:#00FFFF;letter-spacing:1px;text-align:center;";
    counter.textContent = '0';
    wrap.appendChild(counter);
    refs.sidebarCounter = counter;

    originalList.after(analyzeList, exportList, wrap);

    // Eject fab
    const fab = document.createElement('button');
    fab.innerHTML = ICONS.eject;
    fab.title = 'Unpin from sidebar';
    fab.classList.add('gemini-exporter-eject-fab');
    fab.style.cssText = `
        position:fixed;top:80px;right:20px;z-index:9999;
        width:36px;height:36px;display:flex;align-items:center;justify-content:center;
        background:#020617;border:1px solid #1E293B;border-radius:50%;cursor:pointer;
        color:#00FFFF;box-shadow:0 4px 16px rgba(0,10,30,0.5);transition:all 0.2s ease;
    `;
    fab.onmouseover = () => { fab.style.borderColor = '#00FFFF'; fab.style.boxShadow = '0 0 12px rgba(0,255,255,0.3)'; };
    fab.onmouseout  = () => { fab.style.borderColor = '#1E293B'; fab.style.boxShadow = '0 4px 16px rgba(0,10,30,0.5)'; };
    fab.onclick = () => { chrome.storage.local.set({ sidebarPinned: false }); transition('unpin'); };
    document.body.appendChild(fab);
    refs.ejectFab = fab;

    chrome.storage.local.set({ sidebarPinned: true });
    render();
};

// ============================================================
// Panel UI Builder — Cyberpunk Neon
// ============================================================
const buildPanel = () => {
    const ui = document.createElement('div');
    ui.style.cssText = `
        position:fixed;top:80px;right:20px;z-index:9999;
        display:flex;flex-direction:column;width:270px;border-radius:14px;
        font-family:'SF Mono','Fira Code','Cascadia Code','Consolas',monospace;
        overflow:hidden;transition:all 0.3s ease;
    `;
    document.body.appendChild(ui);
    refs.ui = ui;

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 16px;cursor:grab;user-select:none;';
    refs._header = header;

    const headerLeft = document.createElement('div');
    headerLeft.style.cssText = 'display:flex;align-items:center;gap:8px;';
    const headerIcon = document.createElement('span');
    headerIcon.innerHTML = ICONS.hexIcon;
    headerIcon.style.cssText = 'display:flex;align-items:center;';
    refs._headerIcon = headerIcon;
    const headerTitle = document.createElement('span');
    headerTitle.innerText = 'EXPORTER';
    headerTitle.style.cssText = 'font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;';
    refs._headerTitle = headerTitle;
    headerLeft.appendChild(headerIcon);
    headerLeft.appendChild(headerTitle);

    const headerRight = document.createElement('div');
    headerRight.style.cssText = 'display:flex;align-items:center;gap:2px;';

    const mkHdrBtn = (html, title) => {
        const b = document.createElement('button');
        b.innerHTML = html;
        b.title = title;
        b.style.cssText = 'background:none;border:none;cursor:pointer;font-size:14px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:all 0.2s;line-height:1;';
        return b;
    };
    const themeBtn = mkHdrBtn('', 'Toggle theme');
    const collapseBtn = mkHdrBtn('\u2303', 'Collapse');
    const closeBtn = mkHdrBtn('\u00D7', 'Close');
    closeBtn.style.fontWeight = 'bold';
    refs._themeBtn = themeBtn;
    refs._collapseBtn = collapseBtn;
    refs._closeBtn = closeBtn;

    headerRight.appendChild(themeBtn);
    headerRight.appendChild(collapseBtn);
    headerRight.appendChild(closeBtn);
    header.appendChild(headerLeft);
    header.appendChild(headerRight);
    ui.appendChild(header);

    // Divider
    const divider = document.createElement('div');
    divider.style.cssText = 'height:1px;margin:0 16px;';
    refs._divider = divider;
    ui.appendChild(divider);

    // Body
    const body = document.createElement('div');
    body.style.cssText = 'padding:14px 16px;display:flex;flex-direction:column;gap:12px;';
    ui.appendChild(body);

    // Status card
    const statusCard = document.createElement('div');
    statusCard.style.cssText = 'border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;border:1px solid;transition:all 0.3s ease;';
    refs._statusCard = statusCard;
    body.appendChild(statusCard);

    const statusRow = document.createElement('div');
    statusRow.style.cssText = 'display:flex;align-items:center;gap:8px;';
    const statusDot = document.createElement('span');
    statusDot.style.cssText = 'width:8px;height:8px;border-radius:50%;transition:all 0.3s;flex-shrink:0;';
    refs.statusDot = statusDot;
    const statusEl = document.createElement('span');
    statusEl.style.cssText = 'font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;';
    refs.statusEl = statusEl;
    statusRow.appendChild(statusDot);
    statusRow.appendChild(statusEl);
    statusCard.appendChild(statusRow);

    const segRow = document.createElement('div');
    segRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;';
    const countBadge = document.createElement('span');
    countBadge.style.cssText = 'font-size:11px;font-weight:500;letter-spacing:0.5px;';
    refs.countBadge = countBadge;
    const modeBadge = document.createElement('span');
    modeBadge.style.cssText = 'font-size:9px;font-weight:700;letter-spacing:1.5px;padding:2px 8px;border-radius:4px;border:1px solid;text-transform:uppercase;';
    refs.modeBadge = modeBadge;
    segRow.appendChild(countBadge);
    segRow.appendChild(modeBadge);
    statusCard.appendChild(segRow);

    const progressWrap = document.createElement('div');
    progressWrap.style.cssText = 'width:100%;height:3px;border-radius:2px;overflow:hidden;';
    refs._progressWrap = progressWrap;
    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'width:0%;height:100%;border-radius:2px;transition:width 0.4s ease;';
    refs.progressBar = progressBar;
    progressWrap.appendChild(progressBar);
    statusCard.appendChild(progressWrap);

    // Buttons
    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;flex-direction:column;gap:8px;';

    const mkBtn = (label) => {
        const b = document.createElement('button');
        b.style.cssText = `
            width:100%;height:42px;border:none;border-radius:8px;cursor:pointer;
            display:flex;align-items:center;gap:10px;padding:0 14px;
            font-family:inherit;font-size:12px;font-weight:700;
            text-transform:uppercase;letter-spacing:1px;
            transition:all 0.2s ease;
        `;
        b.onmouseover = () => { b.style.filter = 'brightness(1.15)'; };
        b.onmouseout  = () => { b.style.filter = 'brightness(1)'; };
        return b;
    };

    const startBtn = mkBtn('Analyze');
    startBtn.onclick = () => transition('toggleAnalyze');
    refs.startBtn = startBtn;

    const exportBtn = mkBtn('Export');
    exportBtn.onclick = () => {
        transition('export');
        if (refs.statusEl && state.segments.length) {
            refs.statusEl.innerText = 'EXPORTED';
            setTimeout(() => render(), 3000);
        }
    };
    refs.exportBtn = exportBtn;

    btnRow.appendChild(startBtn);
    btnRow.appendChild(exportBtn);
    body.appendChild(btnRow);

    // Pin button
    const injectBtn = document.createElement('button');
    injectBtn.innerHTML = `${ICONS.pin}<span>Pin to Sidebar</span>`;
    injectBtn.title = 'Pin to Sidebar';
    injectBtn.style.cssText = `
        display:flex;align-items:center;justify-content:center;gap:8px;
        padding:8px 0;border:1px dashed;border-radius:8px;cursor:pointer;
        font-family:inherit;font-weight:600;font-size:10px;
        text-transform:uppercase;letter-spacing:1px;
        background:none;transition:all 0.2s ease;width:100%;
    `;
    injectBtn.onmouseover = () => { const c = themes[state.theme]; injectBtn.style.borderColor = c.accentPrimary; injectBtn.style.color = c.accentPrimary; };
    injectBtn.onmouseout  = () => { const c = themes[state.theme]; injectBtn.style.borderColor = c.textMuted + '60'; injectBtn.style.color = c.textSecondary; };
    injectBtn.onclick = () => transition('pin');
    refs.injectBtn = injectBtn;
    body.appendChild(injectBtn);

    // Glow bar
    const glowBar = document.createElement('div');
    glowBar.style.cssText = 'height:3px;border-radius:0 0 14px 14px;background-size:200% 100%;';
    refs.glowBar = glowBar;
    ui.appendChild(glowBar);

    // Collapse / close
    let collapsed = false;
    collapseBtn.onclick = () => {
        collapsed = !collapsed;
        body.style.display = collapsed ? 'none' : 'flex';
        glowBar.style.display = collapsed ? 'none' : 'block';
        collapseBtn.innerHTML = collapsed ? '\u2304' : '\u2303';
    };
    closeBtn.onclick = () => {
        if (state.monitor) { clearInterval(state.monitor); state.monitor = null; state.status = state.segments.length ? 'paused' : 'idle'; }
        teardownPanel();
    };
    themeBtn.onclick = () => transition('toggleTheme');

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

    render();
};

// ============================================================
// Init
// ============================================================
chrome.storage.local.get(['sidebarPinned', 'theme'], (result) => {
    if (result.theme) state.theme = result.theme;

    if (result.sidebarPinned) {
        let retries = 0;
        const waitForSidebar = () => {
            const found = document.querySelector('mat-action-list.top-action-list');
            if (found) {
                state.uiMode = 'sidebar';
                setupSidebar();
            } else if (retries++ < 20) {
                setTimeout(waitForSidebar, 500);
            } else {
                buildPanel();
            }
        };
        waitForSidebar();
    } else {
        buildPanel();
    }
});
