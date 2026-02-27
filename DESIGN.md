# Gemini Exporter - Design Specification

## Reference Design Analysis

The reference UI follows a **dark sci-fi / cyberpunk dashboard** aesthetic. It uses deep navy-charcoal backgrounds, cyan-teal neon accents, and subtle luminous effects to create a futuristic, high-tech control panel feel.

---

## Layout Structure

### Panel Container
- **Shape:** Rounded rectangle with soft corners (~12px radius)
- **Background:** Deep navy-charcoal, near-black with a subtle blue undertone
- **Border:** 1px solid, very subtle dark border blending into the background — almost invisible
- **Shadow:** Deep, diffused shadow creating a floating/elevated appearance
- **Width:** Compact, roughly 260–300px
- **Bottom edge:** Features a thin horizontal gradient glow bar (cyan-to-teal) running the full width — acts as a signature accent

### Header Bar
- **Layout:** Horizontal flex — icon (left), title (center-left), controls (right)
- **Icon:** Teal/cyan colored, small (~16px), stylized (network/molecule icon)
- **Title:** UPPERCASE, bold, wide letter-spacing, white/near-white text
- **Controls:** Chevron (collapse) and X (close) — muted gray, small, right-aligned
- **Separator:** A thin horizontal line below the header, very dark subtle divider (~#1a3050)

### Section Label Row
- **Layout:** Horizontal flex — label (left), action button (right)
- **Label:** UPPERCASE, smaller font, muted blue-gray color, includes count in parentheses
- **Action button:** "+ New" text, teal/cyan color, no background, right-aligned

### Card / List Item
- **Layout:** Vertical stack inside a slightly elevated container
- **Left accent:** Bright cyan/teal vertical border (3px wide) on the left edge — key visual signature
- **Background:** Slightly lighter than the panel background (~#0f2035)
- **Padding:** Comfortable internal spacing (~12-16px)
- **Content rows:**
  - **Row 1:** Folder icon + title text (white, medium weight) + gear settings icon (muted)
  - **Row 2:** Status badges in a horizontal row — pill-shaped with colored borders
  - **Row 3:** Subtitle/meta text — muted gray-blue, small font

### Status Badges
- **Shape:** Pill/capsule with rounded corners (full radius)
- **Background:** Transparent or very subtle dark fill
- **Border:** 1px solid — color varies by status type
  - Neutral/inactive: Gray border (#4a6580) with gray text
  - Active/accent: Cyan-teal border (#22d3ee) with matching text
- **Text:** Small, normal case, matches border color
- **Spacing:** Small horizontal gap between badges

---

## Visual Effects

### Glow Bar
- Thin (2-3px) gradient bar at the bottom edge of the panel
- Gradient runs left-to-right: teal (#0ea5e9) -> cyan (#22d3ee) -> warm accent
- Subtle bloom/glow effect suggesting neon lighting

### Elevation & Shadow
- Panel casts a deep, diffused box-shadow
- Shadow color: Very dark with blue undertone (rgba(0, 10, 30, 0.6))
- Creates a floating-above-the-page illusion

### Left Accent Border
- Cards/items use a bright left-edge border as a visual anchor
- Color matches the primary cyan accent
- Creates visual hierarchy and draws the eye

---

## Iconography
- **Style:** Outlined/linear, thin stroke weight
- **Size:** 14-18px
- **Color:** Matches the text context — teal for header, muted gray for controls/settings
- **Usage:** Minimal — only functional icons (close, collapse, settings, folder)

---

## Overall Character
- **Mood:** Professional, futuristic, high-tech
- **Density:** Medium — generous padding but compact overall footprint
- **Contrast:** High — bright accents against very dark backgrounds
- **Motion:** Minimal implied — subtle transitions on hover/interaction
