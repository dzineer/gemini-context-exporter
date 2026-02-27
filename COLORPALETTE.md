# Color Palette

All colors extracted from the reference UI screenshot. Organized by role.

---

## Backgrounds

| Swatch | Hex       | Name               | Where Used                                    |
|--------|-----------|--------------------|-----------------------------------------------|
| ![#0a1628](https://via.placeholder.com/16/0a1628/0a1628.png) | `#0a1628` | **Midnight Navy**  | Panel body / main background                  |
| ![#0d1b2e](https://via.placeholder.com/16/0d1b2e/0d1b2e.png) | `#0d1b2e` | **Deep Sea**       | Header bar background                         |
| ![#0f2035](https://via.placeholder.com/16/0f2035/0f2035.png) | `#0f2035` | **Abyss Blue**     | Card / list-item background                   |
| ![#142a45](https://via.placeholder.com/16/142a45/142a45.png) | `#142a45` | **Ink Wash**       | Hover state background for interactive items  |

---

## Primary Accent — Cyan / Teal

| Swatch | Hex       | Name               | Where Used                                    |
|--------|-----------|--------------------|-----------------------------------------------|
| ![#22d3ee](https://via.placeholder.com/16/22d3ee/22d3ee.png) | `#22d3ee` | **Neon Cyan**      | Header icon, active badge borders, card left-accent, "+ New" text, glow bar center |
| ![#0ea5e9](https://via.placeholder.com/16/0ea5e9/0ea5e9.png) | `#0ea5e9` | **Electric Teal**  | Glow bar left edge, deeper accent for gradient starts |
| ![#0891b2](https://via.placeholder.com/16/0891b2/0891b2.png) | `#0891b2` | **Ocean Teal**     | Light-theme accent variant (not in screenshot, derived for light mode) |

---

## Secondary Accent — Green

| Swatch | Hex       | Name               | Where Used                                    |
|--------|-----------|--------------------|-----------------------------------------------|
| ![#34d399](https://via.placeholder.com/16/34d399/34d399.png) | `#34d399` | **Emerald Glow**   | Active/success states, monitoring indicator    |

---

## Warm Accent

| Swatch | Hex       | Name               | Where Used                                    |
|--------|-----------|--------------------|-----------------------------------------------|
| ![#f59e0b](https://via.placeholder.com/16/f59e0b/f59e0b.png) | `#f59e0b` | **Amber Spark**    | Glow bar right-edge warm tail                 |

---

## Text

| Swatch | Hex       | Name               | Where Used                                    |
|--------|-----------|--------------------|-----------------------------------------------|
| ![#e2e8f0](https://via.placeholder.com/16/e2e8f0/e2e8f0.png) | `#e2e8f0` | **Frost White**    | Panel title ("AGENCIES"), card title ("Dzineer Agency") |
| ![#94a3b8](https://via.placeholder.com/16/94a3b8/94a3b8.png) | `#94a3b8` | **Silver Mist**    | Section label count text ("(1)")              |
| ![#64748b](https://via.placeholder.com/16/64748b/64748b.png) | `#64748b` | **Slate Gray**     | Subtitle ("Default agency"), control icons (chevron, X, gear) |
| ![#475569](https://via.placeholder.com/16/475569/475569.png) | `#475569` | **Charcoal Fog**   | Timestamp ("Created 4d ago"), disabled/muted text |

---

## Borders & Dividers

| Swatch | Hex       | Name               | Where Used                                    |
|--------|-----------|--------------------|-----------------------------------------------|
| ![#1e3a5c](https://via.placeholder.com/16/1e3a5c/1e3a5c.png) | `#1e3a5c` | **Night Border**   | Panel outer border (barely visible)           |
| ![#1a3050](https://via.placeholder.com/16/1a3050/1a3050.png) | `#1a3050` | **Shadow Line**    | Header divider, card borders                  |
| ![#22d3ee](https://via.placeholder.com/16/22d3ee/22d3ee.png) | `#22d3ee` | **Neon Cyan**      | Card left-accent stripe (3px), active badge borders ("Projects(1)", "Active(1)") |
| ![#4a6580](https://via.placeholder.com/16/4a6580/4a6580.png) | `#4a6580` | **Storm Gray**     | Neutral badge border ("Not Hired")            |

---

## Badge Colors (Paired border + text)

| State     | Border    | Text      | Example        |
|-----------|-----------|-----------|----------------|
| Neutral   | `#4a6580` | `#7a8fa0` | "Not Hired"    |
| Active    | `#22d3ee` | `#22d3ee` | "Projects(1)"  |
| Active    | `#22d3ee` | `#22d3ee` | "Active(1)"    |

---

## Glow Bar Gradient

The thin (2-3px) accent bar at the bottom of the panel uses a three-stop horizontal gradient:

```
linear-gradient(90deg, #0ea5e9, #22d3ee, #f59e0b)
```

| Stop | Hex       | Name              |
|------|-----------|-------------------|
| 0%   | `#0ea5e9` | Electric Teal     |
| 50%  | `#22d3ee` | Neon Cyan         |
| 100% | `#f59e0b` | Amber Spark       |

---

## Shadows

| Name          | Value                              | Where Used      |
|---------------|------------------------------------|-----------------|
| Panel shadow  | `0 8px 32px rgba(0, 10, 30, 0.6)` | Panel elevation |
| Card shadow   | `0 2px 8px rgba(0, 10, 30, 0.3)`  | Card elevation  |

---

## Full Palette at a Glance

```
Backgrounds     #0a1628  #0d1b2e  #0f2035  #142a45
Cyan Accent     #0ea5e9  #22d3ee
Green Accent    #34d399
Warm Accent     #f59e0b
Text            #e2e8f0  #94a3b8  #64748b  #475569
Borders         #1e3a5c  #1a3050  #4a6580
```
