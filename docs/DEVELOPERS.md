# Development Guide

This guide is for contributors who want to build, modify, or extend Gemini Context Exporter.

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

Both commands output to the `dist/` folder. Load `dist/` as an unpacked extension in Chrome.

After rebuilding, click the refresh icon on the extension card in `chrome://extensions/` and reload the Gemini tab.

## Project Structure

```
gemini-exporter/
  public/
    manifest.json                  # Chrome Extension manifest (v3)
  src/
    main.jsx                       # Shadow DOM mount + React root
    App.jsx                        # Mode router (Panel vs Sidebar)
    context/                       # React Context + useReducer state machine
    hooks/                         # useCollector, useChromeStorage, useDrag
    components/
      Panel/                       # Floating panel UI components
      Sidebar/                     # Gemini sidebar injection
      icons/                       # SVG icon components
    utils/                         # Markdown converter, exporter, selectors
    styles/                        # CSS tokens, animations, reset
  vite.config.js
  package.json
```

## Architecture

The project uses Vite to bundle a React app into a single `content.js` file that Chrome loads as a content script. The UI renders inside a Shadow DOM for CSS isolation from Gemini's page.

### Key concepts

- **Shadow DOM** — The React app mounts inside a shadow root to prevent CSS conflicts with Gemini's page
- **State machine** — `useReducer` + React Context replaces the original imperative state management
- **Sidebar injection** — `SidebarMode` imperatively injects cloned Material Design buttons into Gemini's Angular DOM (outside the React tree)
- **CSS custom properties** — Dark and light themes are driven by `data-theme` attribute and `var()` tokens
- **Single bundle** — Vite's `inlineDynamicImports` produces one `content.js` file with all CSS inlined

## Design System

The UI uses a cyberpunk neon aesthetic with deep black backgrounds (`#020617`), cyan accents (`#00FFFF`), monospace typography, and neon glow effects. See [DESIGN.md](../DESIGN.md) and [STYLEGUIDE.md](../STYLEGUIDE.md) for full design specifications.
