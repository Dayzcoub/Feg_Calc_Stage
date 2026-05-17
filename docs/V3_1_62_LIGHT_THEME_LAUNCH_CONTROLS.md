## v3.1.62 — Light theme launch controls

Purpose: move the light theme from console-only preview toward a controlled launch state.

What changed:

- Added a visible topbar theme toggle with `data-feg-theme-toggle`.
- The toggle safely enables the light theme gate before switching to light.
- The dark fallback remains one click away and removes the light gate.
- `LightThemeShell` now synchronizes all launch controls with the current theme state.
- Console helpers remain available for QA:

```js
window.FEG_LIGHT_THEME_SHELL.enableLight()
window.FEG_LIGHT_THEME_SHELL.disableLight()
window.FEG_LIGHT_THEME_SHELL.toggle()
window.FEG_LIGHT_THEME_SHELL.audit()
```

What did not change:

- Calculations
- BOM
- PDF export logic
- Warehouse/reservations
- Responsive contract
- Scroll behavior
- Legacy/v3
- Backend writes
