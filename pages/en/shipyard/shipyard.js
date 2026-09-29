/* =========================================================================
   SHIPYARD PAGE — page-specific script only (shipyard.js)
   Navbar, footer, Lucide icons and AOS are already initialised by the shared
   scripts + the boilerplate in shipyard.html. This page needs no custom JS:
   - Scroll/load reveals        → AOS (data-aos attributes)   [CLAUDE.md §13]
   - Facility-area card hovers  → pure CSS transitions
   - Flow-diagram line "draw"   → CSS keyed off AOS's .aos-animate class
   - prefers-reduced-motion     → honoured in shipyard.css
   Re-call lucide.createIcons() here only if THIS script ever injects new
   icons after load (it currently doesn't).
   ========================================================================= */

// (No custom shipyard-page JavaScript needed.)
