User approved Claude's plan
  ⎿  Plan saved to: ~/.claude/plans/vectorized-zooming-nova.md · /plan to edit
     React + Vite Migration — Gemini Context Exporter

     Context

     The extension is a single 689-line content.js that handles everything: state
     machine, UI, DOM collection, markdown export, theming, drag, sidebar injection.
     Converting to React + Vite with components makes it far easier to modify and extend.
      No TypeScript — JSX only.

     File Structure

     gemini-exporter/
       public/
         manifest.json
       src/
         main.jsx                          # Shadow DOM mount + React root
         App.jsx                           # Mode router (Panel vs Sidebar)
         context/
           AppContext.jsx                  # Context + useReducer
           reducer.js                     # Pure reducer (replaces transition())
         hooks/
           useCollector.js                # 600ms DOM collection interval
           useChromeStorage.js            # Load persisted theme/sidebarPinned
           useDrag.js                     # Panel drag
         components/
           Panel/
             Panel.jsx                    # Main floating container
             Panel.css                    # Panel layout styles
             Header.jsx                   # Icon, title, theme/collapse/close
             StatusCard.jsx               # Dot, status, badges, progress
             ButtonRow.jsx                # Analyze/Stop + Export
             PinButton.jsx                # "Pin to Sidebar"
             GlowBar.jsx                  # Animated gradient bar
           Sidebar/
             SidebarMode.jsx              # Imperative DOM injection (renders null)
             EjectFab.jsx                 # Floating unpin button
             cloneSidebarButton.js        # DOM utility
             sidebarIcons.js              # Raw SVG strings for sidebar
           icons/
             AnalyzeIcon.jsx, StopIcon.jsx, ExportIcon.jsx,
             PinIcon.jsx, EjectIcon.jsx, HexIcon.jsx,
             SunIcon.jsx, MoonIcon.jsx
         utils/
           patternProcessor.js            # DOM→Markdown (extracted verbatim)
           exporter.js                    # doExport() (extracted verbatim)
           selectors.js                   # Gemini DOM selectors
         styles/
           tokens.css                     # CSS custom properties (dark + light)
           animations.css                 # @keyframes: sweep, pulse-red, wave
           reset.css                      # Shadow DOM reset
       vite.config.js
       package.json

     Key Decisions

     ┌────────────┬──────────────────────────────────────┬───────────────────────────────
     ────┐
     │  Decision  │                Choice                │                Why
         │
     ├────────────┼──────────────────────────────────────┼───────────────────────────────
     ────┤
     │ Build      │ Vite + manual config                 │ @crxjs has MV3 issues; project
      is │
     │            │                                      │  simple
         │
     ├────────────┼──────────────────────────────────────┼───────────────────────────────
     ────┤
     │ CSS        │ Plain CSS + ?inline                  │ Shadow DOM needs CSS as
     strings   │
     ├────────────┼──────────────────────────────────────┼───────────────────────────────
     ────┤
     │ State      │ useReducer + Context                 │ Maps to existing state machine
         │
     ├────────────┼──────────────────────────────────────┼───────────────────────────────
     ────┤
     │ Sidebar    │ Imperative useEffect                 │ Must inject into Gemini's
     Angular │
     │            │                                      │  DOM
         │
     ├────────────┼──────────────────────────────────────┼───────────────────────────────
     ────┤
     │ Icons      │ React components + raw SVG strings   │ React can't render into
     non-React │
     │            │                                      │  DOM
         │
     ├────────────┼──────────────────────────────────────┼───────────────────────────────
     ────┤
     │ Themes     │ CSS custom properties + data-theme   │ All components read var()
     tokens  │
     ├────────────┼──────────────────────────────────────┼───────────────────────────────
     ────┤
     │ Signatures │ useRef (not in reducer)              │ Never rendered, only for dedup
         │
     ├────────────┼──────────────────────────────────────┼───────────────────────────────
     ────┤
     │ Output     │ Single content.js via                │ Chrome requires one file
         │
     │            │ inlineDynamicImports                 │
         │
     └────────────┴──────────────────────────────────────┴───────────────────────────────
     ────┘

     Shadow DOM Mount (main.jsx)

     1. Create host div on document.body with all:initial; position:fixed;
     z-index:2147483647
     2. Attach shadow root (mode: open)
     3. Import CSS files with ?inline suffix → inject as <style> in shadow root
     4. Mount React root inside shadow DOM

     State → React Mapping

     ┌────────────────────────────┬──────────────────────────────────┐
     │          Current           │              React               │
     ├────────────────────────────┼──────────────────────────────────┤
     │ state object               │ useReducer state                 │
     ├────────────────────────────┼──────────────────────────────────┤
     │ refs object                │ Component tree + useRef          │
     ├────────────────────────────┼──────────────────────────────────┤
     │ transition(action)         │ dispatch({ type })               │
     ├────────────────────────────┼──────────────────────────────────┤
     │ render()                   │ React reconciliation (automatic) │
     ├────────────────────────────┼──────────────────────────────────┤
     │ setInterval in transition  │ useEffect in useCollector        │
     ├────────────────────────────┼──────────────────────────────────┤
     │ chrome.storage.get in init │ useEffect in useChromeStorage    │
     ├────────────────────────────┼──────────────────────────────────┤
     │ buildPanel()               │ <Panel /> mount                  │
     ├────────────────────────────┼──────────────────────────────────┤
     │ setupSidebar()             │ <SidebarMode /> useEffect        │
     └────────────────────────────┴──────────────────────────────────┘

     Sidebar Strategy

     SidebarMode uses useEffect to imperatively inject cloned Material buttons into
     Gemini's DOM (outside React). It syncs React state → imperative DOM via a separate
     useEffect that watches state.status and state.segments.length. Animation CSS for
     sidebar is injected into document.head (not shadow DOM) since sidebar elements live
     in host page.

     Implementation Phases

     Phase 1: Scaffold

     - npm init, install react, react-dom, vite, @vitejs/plugin-react
     - Create vite.config.js, public/manifest.json
     - Create src/main.jsx with Shadow DOM mount
     - Build, load dist/ as extension, verify mount on gemini.google.com

     Phase 2: Styles

     - tokens.css (all theme CSS vars from themes object)
     - animations.css (3 keyframes + sweep-arm classes)
     - reset.css

     Phase 3: State + Hooks

     - reducer.js, AppContext.jsx, useChromeStorage.js

     Phase 4: Utilities

     - patternProcessor.js, exporter.js, selectors.js (extracted verbatim)

     Phase 5: Icons

     - 8 icon components + sidebarIcons.js (raw SVG strings)

     Phase 6: Panel Components

     - Header, StatusCard, ButtonRow, PinButton, GlowBar, Panel, Panel.css
     - useDrag.js hook

     Phase 7: Collection

     - useCollector.js (600ms interval, DOM scraping, dispatch)

     Phase 8: Sidebar

     - cloneSidebarButton.js, SidebarMode.jsx, EjectFab.jsx

     Phase 9: Integration

     - App.jsx, wire main.jsx, test all features, remove old content.js

     Verification

     1. npm run build → dist/content.js + dist/manifest.json
     2. Load dist/ as unpacked extension
     3. Panel renders with cyberpunk neon dark theme
     4. Theme toggle → light mode correct
     5. Drag panel → smooth
     6. Collapse/close work
     7. Analyze → green dot, LIVE, SCANNING, sweep anim, glow wave
     8. Scroll conversation → segment count increases
     9. Stop → amber dot, IDLE, PAUSED, animations stop
     10. Export → downloads correct Markdown
     11. Pin → sidebar buttons appear in Gemini nav
     12. Sidebar counter updates during scan
     13. Eject → panel returns with state preserved
     14. Page refresh → theme + sidebar pin persist
     15. Light theme → all colors correct
