# v3.1.68 — Truss load indicator contrast + launch theme toggle

Scope: standalone quick constructors UI only.

## Changed

- Increased contrast for the truss load indicator text in the truss quick constructor.
- Locked explicit text colors and `-webkit-text-fill-color` for the load indicator title, status and allowed-load hint so the text no longer looks transparent in light theme.
- Removed the old top-right standalone action button cluster from the top bar.
- Moved the theme switch into the main launch button row after `LED Экраны`.
- Reworked the theme control as a narrow vertical toggle, with horizontal fallback on mobile.

## Not changed

- Truss load formulas and LoadChecker logic.
- Stage / Truss / LED calculations.
- BOM, warehouse, reservations and backend writes.
- PDF export logic.
- Dark theme fallback.
- Responsive contract: `<=767px` mobile, `>=768px` desktop.
