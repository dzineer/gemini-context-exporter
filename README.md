# Gemini Context Exporter

A Chrome extension that captures and exports Google Gemini conversations to well-formatted Markdown files.

## Features

- **Live monitoring** — watches for new messages as you scroll through a Gemini conversation
- **Smart Markdown export** — converts code blocks, tables, lists, headings, and inline formatting
- **Dark / Light mode** — persistent theme toggle with system preference detection
- **Cyberpunk-dashboard UI** — floating panel with a futuristic dark design language

## Installation

1. Clone or download this repository
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select this project folder
5. Navigate to [gemini.google.com](https://gemini.google.com) — the exporter panel appears in the top-right corner

## Usage

1. Open any Gemini conversation
2. Click **Start Analysis** to begin monitoring
3. Scroll through the conversation slowly so messages are captured
4. Click **Export** to download the conversation as a `.md` file

## Theme Toggle

Click the sun/moon icon in the panel header to switch between dark and light mode. Your preference is saved automatically and persists across sessions.

## Project Structure

```
gemini-exporter/
  manifest.json    — Chrome extension manifest (v3)
  content.js       — Content script: UI, collection, export logic
  DESIGN.md        — Design specification and reference analysis
  STYLEGUIDE.md    — Color tokens, typography, spacing, component patterns
  README.md        — This file
```

## Design System

The UI follows a dark sci-fi / cyberpunk dashboard aesthetic inspired by the reference design. See [DESIGN.md](DESIGN.md) for the full design specification and [STYLEGUIDE.md](STYLEGUIDE.md) for color tokens, typography, and component patterns.

## Permissions

| Permission  | Reason                              |
|-------------|-------------------------------------|
| `downloads` | Trigger `.md` file download         |
| `storage`   | Persist dark/light theme preference |
