# Gemini Context Exporter — Full Context Memory Dump

## Project Overview

Chrome extension that captures and exports Google Gemini conversations to Markdown files. Single content script architecture, no external dependencies.

- **Repo:** github.com/dzineer/gemini-context-exporter
- **Branch:** `ui-upgrade` (current working branch)
- **Main branch:** `main`
- **Directory:** `/Users/dzineer/Clients/Dzineer/Projects/chrome_extensions/gemini-exporter`

## File Structure

```
gemini-exporter/
  manifest.json      — Chrome extension manifest v3
  content.js         — ALL logic: state machine, UI, collection, export
  DESIGN.md          — Design spec and reference analysis
  STYLEGUIDE.md      — Color tokens, typography, spacing
  COLORPALETTE.md    — Detailed color reference
  README.md          — Usage docs
```

## Architecture: State Machine (Refactored)

The entire extension runs on a centralized state machine pattern:

### State Object
```js
const state = {
    status: 'idle',        // 'idle' | 'scanning' | 'paused'
    segments: [],           // collected { role, markdown } items
    signatures: new Set(),  // dedup signatures (first 500 chars)
    theme: 'dark',          // 'dark' | 'light'
    uiMode: 'panel',       // 'panel' | 'sidebar'
    monitor: null,          // setInterval ID
};
```

### Refs Object
All DOM element references stored in one `refs` object:
- Panel refs: `ui`, `statusEl`, `countBadge`, `modeBadge`, `startBtn`, `exportBtn`, `injectBtn`, `statusDot`, `progressBar`, `glowBar`
- Header refs: `_header`, `_headerIcon`, `_headerTitle`, `_divider`, `_statusCard`, `_progressWrap`, `_themeBtn`, `_collapseBtn`, `_closeBtn`
- Sidebar refs: `sidebarCounter`, `sidebarAnalyzeEl`, `sidebarExportEl`, `ejectFab`

### Transition Function
`transition(action)` — the ONLY way to change state. Actions:
- `startScan` — sets status to 'scanning', starts interval
- `stopScan` — clears interval, status becomes 'paused' or 'idle'
- `toggleAnalyze` — toggles between start/stop
- `export` — triggers markdown file download
- `pin` — teardown panel, setup sidebar
- `unpin` — teardown sidebar, build panel
- `toggleTheme` — flip dark/light

### Render Function
`render()` — reads `state` + `refs`, updates ALL UI elements. Called after every transition and after `collect()` finds new segments.

## Design System: Cyberpunk Neon

### Dark Theme Colors
| Token | Value | Usage |
|-------|-------|-------|
| bgPrimary | #020617 | Panel background |
| bgSecondary | #0F172A | Header background |
| bgCard | #1E293B | Status card background |
| accentPrimary | #00FFFF | Neon cyan — icons, borders, glow |
| accentSuccess | #22C55E | Green — scanning state, active |
| textPrimary | #F8FAFC | Main text (white) |
| textSecondary | #94A3B8 | Muted text |
| btnPrimary | #00FFFF | Analyze button fill |
| btnPrimaryText | #000000 | Button text (black on cyan) |
| btnOutline | #00FFFF | Export button border |
| Amber standby | #F59E0B | Status dot when idle |

### Light Theme Colors
| Token | Value |
|-------|-------|
| bgPrimary | #f8fafc |
| accentPrimary | #0891b2 |
| btnPrimary | #0891b2 |
| btnPrimaryText | #ffffff |

### Typography
- Font: `'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace`
- Title: 13px, weight 700, letter-spacing 2px, uppercase
- Status: 12px, weight 700, letter-spacing 1px
- Badges: 9-11px, weight 500-700
- Buttons: 12px, weight 700, letter-spacing 1px, uppercase

### Visual Effects
- Header icon: `drop-shadow(0 0 6px cyan)` in dark mode
- Title: `text-shadow: 0 0 10px cyan` in dark mode
- Divider: gradient `transparent → cyan → transparent`
- Status card: glowing green border when scanning
- Status dot: amber glow (idle), green glow (scanning)
- Buttons: `box-shadow: 0 0 15px` neon glow
- Glow bar: wave animation when scanning (`background-position` shift)
- Panel shadow: `0 0 30px rgba(0,255,255,0.08)`

## SVG Icons (18px panel, 24px sidebar)

| Icon | Purpose | Design |
|------|---------|--------|
| analyze | Start scan button | Radar: outer circle, inner circle, center dot, sweep arm |
| stop | Stop scan button | Circle with filled square inside |
| export | Download button | Tray + down arrow |
| pin | Pin to sidebar | External link arrow |
| eject | Unpin from sidebar | Door + right arrow |
| hexIcon | Header brand mark | 3D hexagon |
| analyzeLg/exportLg/stopLg | Sidebar variants | Same designs at 24px |

All icons: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`

Theme toggle icons are inline SVGs: sun (dark mode) / crescent moon (light mode)

## CSS Animations

| Animation | Purpose | Duration |
|-----------|---------|----------|
| `gemini-exporter-sweep` | Radar arm rotation | 1.5s linear infinite |
| `gemini-exporter-pulse-red` | Red pulse on sweep arm during scanning | 0.8s ease-in-out |
| `gemini-exporter-wave` | Glow bar color wave | 2s linear infinite |

Sweep arm uses `transform-origin: 12px 12px` (center of 24x24 viewBox).

## Panel Layout (270px wide)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ⬡ EXPORTER      ☀  ⌃  ×   ┃  ← Header (12px 16px padding)
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  ← Glowing divider
┃                              ┃
┃  ╭──────────────────────────╮┃
┃  │ ● STANDBY                │┃  ← Status card (10px border-radius)
┃  │ 0 segments         IDLE  │┃
┃  │ ▰▰▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱ │┃  ← Progress bar
┃  ╰──────────────────────────╯┃
┃                              ┃
┃  ┌──────────────────────────┐┃
┃  │ ◉ ANALYZE                │┃  ← Primary button (42px, filled cyan)
┃  └──────────────────────────┘┃
┃  ┌──────────────────────────┐┃
┃  │ ↓ EXPORT                 │┃  ← Secondary button (42px, outlined)
┃  └──────────────────────────┘┃
┃                              ┃
┃  ┄┄ ⊞ PIN TO SIDEBAR ┄┄    ┃  ← Tertiary (dashed border)
┃▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀┃  ← Animated glow bar (3px)
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## Button States

### Analyze/Stop Button
| State | Icon | Label | Color | Background |
|-------|------|-------|-------|------------|
| Idle | analyze (cyan) | Analyze | #000000 | #00FFFF (cyan) |
| Scanning | stop (red #FF3B3B) | Stop (white) | mixed | #22C55E (green) |

### Export Button
| State | Style | Interaction |
|-------|-------|-------------|
| No segments | Outlined, opacity 0.4, pointer-events none | Disabled |
| Has segments | Outlined, opacity 1, cyan border/text | Clickable |

### Status Dot
| State | Color | Glow |
|-------|-------|------|
| Idle | #F59E0B (amber) | 0 0 6px amber |
| Scanning | #22C55E (green) | 0 0 8px green |

## Key Functions

### `collect()`
- Runs every 600ms via `setInterval` when scanning
- Queries DOM: `message-content, .query-text, .model-response-text, [data-test-id="message-content"]`
- Signature dedup: first 500 chars of innerText
- Converts to markdown immediately via `patternProcessor()`
- Calls `render()` when new segments found

### `patternProcessor(node)`
Recursive DOM walker that converts HTML to Markdown:
- `<pre>`, `<code>`, `.code-block-wrapper` → fenced code blocks
- `<table>` → pipe tables with header separator
- `<li>` → `* ` bullets
- `<strong>`, `<b>` → `**bold**`
- `<h1>`-`<h6>` → `#` headings
- `<br>` → newlines
- Collapses 3+ newlines to 2

### `doExport()`
- Builds markdown doc with title, timestamp, role labels (👤 USER / ♊ GEMINI)
- Creates Blob → Object URL → `<a>` click download
- Filename: `Gemini_Export_{timestamp}.md`
- Revokes URL after 1 second

### `buildPanel()`
- Creates all panel DOM elements
- Stores refs in `refs` object
- Sets up drag, collapse, close handlers
- Calls `render()` at end

### `setupSidebar()`
- Clones Gemini's `mat-action-list.top-action-list` for analyze/export buttons
- Creates standalone counter element (not cloned — avoids Angular mutation)
- Counter hidden when 0 segments, shown when > 0
- Creates floating eject FAB button
- Calls `render()` at end

### `teardownPanel()` / `teardownSidebar()`
- Remove DOM elements, null out refs
- State is preserved (monitor keeps running through pin/unpin)

## Sidebar Integration

- Clones Gemini's Material Design button structure
- Replaces `mat-icon` content with custom SVGs
- Removes `data-test-id`, `fonticon`, `data-mat-icon-name` attributes
- Counter is standalone (not cloned) to avoid Angular framework mutations
- Eject FAB: fixed position, top-right, circular, cyan icon on dark bg

## Manifest (v3)

```json
{
    "manifest_version": 3,
    "name": "Gemini Context Exporter",
    "version": "1.0",
    "permissions": ["downloads", "storage"],
    "content_scripts": [{
        "matches": ["https://gemini.google.com/*"],
        "js": ["content.js"]
    }]
}
```

## Persistence

- `chrome.storage.local.theme` — dark/light preference
- `chrome.storage.local.sidebarPinned` — boolean, sidebar mode preference

## Init Flow

1. Read `sidebarPinned` and `theme` from storage
2. If sidebar pinned: wait up to 10s for Gemini sidebar DOM, then inject or fallback to panel
3. Otherwise: build panel immediately

## Git History

```
8720faa Update README title to Gemini Context Exporter
3cea1e6 Rename extension to Gemini Context Exporter
60debbc Initial commit: Gemini Conversation Exporter extension
```

## Known Considerations

- DOM selectors are brittle — Gemini UI updates could break collection
- No persistence of captured segments between page reloads
- Sidebar injection clones Material Design buttons — Angular updates could break this
- No error handling for failed downloads
- `seenSignatures` uses first 500 chars — edge case: two messages with identical first 500 chars
- Max 500 segments safety cap

## User Preferences

- Wants sub agents for parallel work
- Prefers fast, direct implementation — no over-reading files
- Cyberpunk neon aesthetic chosen for UI
- State machine pattern for clean state management
- SVG icons only — no emojis for UI elements
