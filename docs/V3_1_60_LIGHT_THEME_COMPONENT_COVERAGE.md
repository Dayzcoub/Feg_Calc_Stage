# v3.1.60 — Light theme component coverage pass

## Goal

Продолжить подготовку светлой темы после `v3.1.59`, не включая её по умолчанию и не меняя бизнес-логику.

## Added coverage

- Standalone topbar/window/control surfaces.
- Toasts and icon/action buttons.
- Section heads, action rows, summary cards and mini stats.
- Stage/Truss/LED chips, pills, badges and active states.
- PDF/client preview surfaces and tables.
- BOM, settings, subrent and inspector panels.
- SVG text labels and truss artwork contrast in light mode.
- Warning/total/status rows.

## Dev helper

```js
window.FEG_LIGHT_THEME_SHELL.enableLight()
window.FEG_LIGHT_THEME_SHELL.audit()
window.FEG_LIGHT_THEME_SHELL.disableLight()
```

`audit()` returns a small report with potential dark leftovers and low-contrast hints in the current DOM.

## Scope

Dark theme remains default. Light mode is still feature-gated. No calculation, BOM, PDF export logic, warehouse, responsive contract, scroll, legacy/v3, or backend writes were changed.
