# v3.1.81 — Desktop summary metric parity for Truss and LED

Scope: desktop-only visual polish for quick constructor result metric cards.

## Changed
- Unified Truss and LED desktop summary metric cards with the accepted Stage desktop rhythm.
- Added a desktop-only global CSS layer in `styles/breakpoints.css`:
  - 2-column right-side metric grid;
  - stable `70px` minimum card height;
  - Stage-matching padding and typography;
  - safe wrapping for long values/labels.
- Adjusted LED result card markup in `src/modules/LedCalculatorUI.js` so cards follow the same value-first pattern as Stage and Truss: `<b>` is the value, `<span>` is the label, `<small>` is the note.

## Not changed
- Mobile rules at `<=767px`.
- Calculations.
- BOM.
- Warehouse and reservations.
- PDF export logic.
- Legacy/v3.
- Backend writes.
- Constructor business logic.
- Dark fallback and theme switching.
- Scroll logic and responsive contract.
