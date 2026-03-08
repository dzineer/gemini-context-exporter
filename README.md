# Gemini Context Exporter

A Chrome extension that captures and exports Google Gemini conversations to well-formatted Markdown files.

**Created by Frank Decker (frank@dzineer.com) — VibeAi Global Agents LLC**

## What problem does this solve?

If you use Google Gemini for research, coding, brainstorming, or any kind of knowledge work, there's no easy way to export your conversations. Your valuable context — the questions you asked, the answers you received, the code snippets, the tables, the step-by-step breakdowns — is trapped inside the Gemini interface.

**Gemini Context Exporter** lets you capture any Gemini conversation and export it as a clean, well-formatted Markdown file. Code blocks, tables, lists, headings — all preserved with proper formatting. One click to start monitoring, one click to export.

## Features

- **Live monitoring** — watches for new messages as you scroll through a Gemini conversation
- **Smart Markdown export** — converts code blocks, tables, lists, headings, and inline formatting
- **Dark / Light mode** — persistent theme toggle with cyberpunk neon styling
- **Cyberpunk-dashboard UI** — floating panel with neon glow effects and monospace typography
- **Sidebar mode** — pin the controls into Gemini's native sidebar
- **Drag-and-drop panel** — reposition the floating panel anywhere on screen
- **Zero setup** — no accounts, no API keys, no configuration

## Install

1. Download **`gemini-context-exporter.zip`** from the [latest release](https://github.com/dzineer/gemini-context-exporter/releases/latest)
2. Unzip it to a folder
3. Open `chrome://extensions/` in Chrome
4. Enable **Developer mode** (top-right toggle)
5. Click **Load unpacked** and select the unzipped folder
6. Navigate to [gemini.google.com](https://gemini.google.com) — the exporter panel appears in the top-right corner

## Usage

1. Open any Gemini conversation
2. Click **Analyze** to begin monitoring
3. Scroll through the conversation — messages are captured automatically
4. Click **Export** to download the conversation as a `.md` file
5. Click **Pin to Sidebar** to embed controls in Gemini's navigation

## Permissions

| Permission  | Reason                              |
|-------------|-------------------------------------|
| `downloads` | Trigger `.md` file download         |
| `storage`   | Persist theme and sidebar preference |

## Contributing

Contributions are welcome! Feel free to fork the repo, make improvements, and submit a pull request. If you have ideas for new features, open an issue.

## Development (for contributors)

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm
- Google Chrome

### Setup

```bash
git clone https://github.com/dzineer/gemini-context-exporter.git
cd gemini-context-exporter
npm install
```

### Build

```bash
# Production build
npm run build

# Watch mode (rebuilds on file changes)
npm run dev
```

Both commands output to the `dist/` folder. Load `dist/` as an unpacked extension in Chrome.

After rebuilding, click the refresh icon on the extension card in `chrome://extensions/` and reload the Gemini tab.

### Project Structure

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

### Design System

The UI uses a cyberpunk neon aesthetic with deep black backgrounds (`#020617`), cyan accents (`#00FFFF`), monospace typography, and neon glow effects. See [DESIGN.md](DESIGN.md) and [STYLEGUIDE.md](STYLEGUIDE.md) for full design specifications.

## License & Copyright

**Copyright (c) 2026 Frank Decker (frank@dzineer.com) — VibeAi Global Agents LLC. All rights reserved.**

This extension is provided free of charge for personal and non-commercial use. Commercial sale or redistribution for profit is strictly prohibited. You may fork, modify, and share freely as long as it remains non-commercial and proper attribution is maintained.
