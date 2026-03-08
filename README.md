# Gemini Context Exporter

A Chrome extension that captures and exports Google Gemini conversations to well-formatted Markdown files. Built with React and Vite.

## Features

- **Live monitoring** — watches for new messages as you scroll through a Gemini conversation
- **Smart Markdown export** — converts code blocks, tables, lists, headings, and inline formatting
- **Dark / Light mode** — persistent theme toggle with cyberpunk neon styling
- **Cyberpunk-dashboard UI** — floating panel with neon glow effects and monospace typography
- **Sidebar mode** — pin the controls into Gemini's native sidebar
- **Drag-and-drop panel** — reposition the floating panel anywhere on screen

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm
- Google Chrome

## Setup

```bash
git clone https://github.com/dzineer/gemini-context-exporter.git
cd gemini-context-exporter
npm install
```

## Build

```bash
# Production build
npm run build

# Watch mode (rebuilds on file changes)
npm run dev
```

Both commands output to the `dist/` folder.

## Install in Chrome

1. Run `npm run build`
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the `dist/` folder
5. Navigate to [gemini.google.com](https://gemini.google.com) — the exporter panel appears in the top-right corner

After rebuilding, click the refresh icon on the extension card in `chrome://extensions/` and reload the Gemini tab.

## Usage

1. Open any Gemini conversation
2. Click **Analyze** to begin monitoring
3. Scroll through the conversation — messages are captured automatically
4. Click **Export** to download the conversation as a `.md` file
5. Click **Pin to Sidebar** to embed controls in Gemini's navigation

## Development

The project uses Vite to bundle a React app into a single `content.js` file that Chrome loads as a content script. The UI renders inside a Shadow DOM for CSS isolation from Gemini's page.

### Watch mode

```bash
npm run dev
```

This runs `vite build --watch`. After each rebuild:
1. Go to `chrome://extensions/`
2. Click the refresh icon on the extension card
3. Reload the Gemini tab

### Project Structure

```
gemini-exporter/
  public/
    manifest.json                  # Chrome Extension manifest (v3)
  src/
    main.jsx                       # Shadow DOM mount + React root
    App.jsx                        # Mode router (Panel vs Sidebar)
    context/
      AppContext.jsx               # React Context + useReducer
      reducer.js                   # State machine reducer
    hooks/
      useCollector.js              # 600ms DOM collection interval
      useChromeStorage.js          # Persisted theme/sidebar preference
      useDrag.js                   # Panel drag functionality
    components/
      Panel/
        Panel.jsx                  # Main floating container
        Header.jsx                 # Title bar with theme/collapse/close
        StatusCard.jsx             # Status dot, badges, progress bar
        ButtonRow.jsx              # Analyze/Stop + Export buttons
        PinButton.jsx              # Pin to Sidebar button
        GlowBar.jsx                # Animated gradient bar
      Sidebar/
        SidebarMode.jsx            # Injects controls into Gemini's sidebar
        cloneSidebarButton.js      # DOM utility for sidebar injection
        sidebarIcons.js            # Raw SVG strings for sidebar
      icons/                       # SVG icon components
    utils/
      patternProcessor.js          # DOM to Markdown converter
      exporter.js                  # Markdown file download
      selectors.js                 # Gemini DOM selectors
    styles/
      tokens.css                   # CSS custom properties (dark + light)
      animations.css               # Keyframe animations
      reset.css                    # Shadow DOM reset
  vite.config.js
  package.json
```

## Design System

The UI uses a cyberpunk neon aesthetic with:
- Deep black backgrounds (`#020617`)
- Cyan accents (`#00FFFF`)
- Monospace typography (SF Mono, Fira Code)
- Neon glow effects and sweep animations

See [DESIGN.md](DESIGN.md) and [STYLEGUIDE.md](STYLEGUIDE.md) for full design specifications.

## Permissions

| Permission  | Reason                              |
|-------------|-------------------------------------|
| `downloads` | Trigger `.md` file download         |
| `storage`   | Persist theme and sidebar preference |
