# v3.1.63 — Light theme dark leftover cleanup

Purpose: clean up the remaining hardcoded dark surfaces that still appeared after enabling the v3.1.62 light theme launch toggle.

What changed:
- Added a late light-theme cleanup layer inside `LightThemeShell`.
- Covered old standalone shell surfaces, workspace tabs, constructor headers, PDF modal headers, zoom panels, canvas/work areas and form/control rows.
- Added safeguards for inline dark `background` leftovers and SVG dark `rect/path` leftovers in visual/constructor canvases.
- Kept the light theme controlled by the existing toggle and helper API.

Not changed:
- Dark theme fallback/default
- Calculations
- BOM
- PDF export logic
- Warehouse/reservations
- Responsive contract
- Scroll behavior
- legacy/v3
- backend writes
