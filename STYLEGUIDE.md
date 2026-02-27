# Gemini Exporter - Style Guide

## Color Tokens

### Backgrounds
| Token               | Hex       | Usage                              |
|---------------------|-----------|------------------------------------|
| `--bg-primary`      | `#0a1628` | Panel body / main background       |
| `--bg-secondary`    | `#0f2035` | Card/list item backgrounds         |
| `--bg-header`       | `#0d1b2e` | Header bar background              |
| `--bg-hover`        | `#142a45` | Hover state for interactive items  |
| `--bg-badge`        | `transparent` | Badge background (border-only) |

### Accent Colors
| Token               | Hex       | Usage                              |
|---------------------|-----------|------------------------------------|
| `--accent-primary`  | `#22d3ee` | Primary cyan — icons, active badges, glow bar |
| `--accent-secondary`| `#0ea5e9` | Deeper teal — glow bar start, links |
| `--accent-success`  | `#34d399` | Green — active/success states      |
| `--accent-warm`     | `#f59e0b` | Warm amber — glow bar end accent (subtle) |

### Text Colors
| Token               | Hex       | Usage                              |
|---------------------|-----------|------------------------------------|
| `--text-primary`    | `#e2e8f0` | Titles, primary content — near-white with blue tint |
| `--text-secondary`  | `#64748b` | Subtitles, meta text, timestamps   |
| `--text-muted`      | `#475569` | Disabled states, placeholder text  |
| `--text-accent`     | `#22d3ee` | Accent-colored text (matches accent-primary) |

### Borders & Dividers
| Token               | Hex       | Usage                              |
|---------------------|-----------|------------------------------------|
| `--border-subtle`   | `#1e3a5c` | Panel border, divider lines        |
| `--border-card`     | `#1a3050` | Card/item borders                  |
| `--border-accent`   | `#22d3ee` | Left accent stripe on cards        |
| `--border-badge-neutral` | `#4a6580` | Neutral badge borders        |
| `--border-badge-active`  | `#22d3ee` | Active badge borders          |

### Shadows
| Token               | Value                           | Usage              |
|---------------------|---------------------------------|--------------------|
| `--shadow-panel`    | `0 8px 32px rgba(0, 10, 30, 0.6)` | Panel elevation |
| `--shadow-card`     | `0 2px 8px rgba(0, 10, 30, 0.3)`  | Card elevation  |

---

## Typography

### Font Stack
```
font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale
| Style          | Size   | Weight | Transform  | Letter-spacing | Color            |
|----------------|--------|--------|------------|----------------|------------------|
| Panel title    | 13px   | 700    | uppercase  | 1.5px          | `--text-primary` |
| Section label  | 11px   | 600    | uppercase  | 1.0px          | `--text-secondary` |
| Card title     | 13px   | 600    | none       | 0              | `--text-primary` |
| Card subtitle  | 11px   | 400    | none       | 0              | `--text-secondary` |
| Badge text     | 10px   | 600    | none       | 0.5px          | varies by state  |
| Button text    | 12px   | 700    | uppercase  | 0.5px          | `--text-primary` |
| Status text    | 12px   | 600    | none       | 0              | `--text-accent`  |

---

## Spacing

| Token          | Value | Usage                              |
|----------------|-------|------------------------------------|
| `--space-xs`   | 4px   | Badge internal padding, icon gaps  |
| `--space-sm`   | 8px   | Between badges, tight groupings    |
| `--space-md`   | 12px  | Card padding, section gaps         |
| `--space-lg`   | 16px  | Panel padding, major sections      |
| `--space-xl`   | 20px  | Panel outer margin from viewport   |

---

## Border Radius

| Token            | Value | Usage                     |
|------------------|-------|---------------------------|
| `--radius-sm`    | 4px   | Badges, small elements    |
| `--radius-md`    | 8px   | Buttons, cards            |
| `--radius-lg`    | 12px  | Panel container           |
| `--radius-full`  | 999px | Pill-shaped badges        |

---

## Component Patterns

### Panel Container
```
background: var(--bg-primary)
border: 1px solid var(--border-subtle)
border-radius: var(--radius-lg)
box-shadow: var(--shadow-panel)
padding: var(--space-lg)
```

### Header
```
padding-bottom: var(--space-md)
border-bottom: 1px solid var(--border-card)
text-transform: uppercase
letter-spacing: 1.5px
font-weight: 700
color: var(--text-primary)
```

### Action Button (Primary)
```
background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))
color: var(--bg-primary)
border: none
border-radius: var(--radius-md)
padding: 10px 16px
font-weight: 700
text-transform: uppercase
letter-spacing: 0.5px
```

### Status Badge
```
border: 1px solid var(--border-badge-active) or var(--border-badge-neutral)
border-radius: var(--radius-full)
padding: 3px 10px
font-size: 10px
font-weight: 600
background: transparent
color: matches border color
```

### Glow Bar (Bottom Accent)
```
height: 2px
background: linear-gradient(90deg, var(--accent-secondary), var(--accent-primary), var(--accent-warm))
position: absolute, bottom of panel
border-radius: 0 0 var(--radius-lg) var(--radius-lg)
```

---

## Light Theme Overrides

For light mode, invert the background scale and reduce accent intensity:

| Token               | Light Value |
|---------------------|-------------|
| `--bg-primary`      | `#f8fafc`   |
| `--bg-secondary`    | `#f1f5f9`   |
| `--bg-header`       | `#f8fafc`   |
| `--bg-hover`        | `#e2e8f0`   |
| `--text-primary`    | `#0f172a`   |
| `--text-secondary`  | `#64748b`   |
| `--text-muted`      | `#94a3b8`   |
| `--accent-primary`  | `#0891b2`   |
| `--accent-secondary`| `#0369a1`   |
| `--border-subtle`   | `#e2e8f0`   |
| `--border-card`     | `#cbd5e1`   |
| `--shadow-panel`    | `0 8px 32px rgba(0, 0, 0, 0.12)` |
