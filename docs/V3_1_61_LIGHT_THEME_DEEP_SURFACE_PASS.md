## v3.1.61 — Light theme deep surface pass

Что сделано:

- Расширен `LightThemeShell` без включения light по умолчанию.
- Добавлено покрытие старых v4/inline UI-поверхностей: readiness, auth/demo, dashboard, warehouse, quick tiles/docs, BOM subsections, details/accordion, status cards.
- Добавлены светлые активные/selected состояния и состояния `warn / bad / ok`.
- Добавлены страховочные overrides для старых inline dark backgrounds и отдельных SVG dark rect leftovers.

Что не менялось:

- Dark baseline остаётся дефолтом.
- Light mode всё ещё gated: `window.FEG_LIGHT_THEME_SHELL.enableLight()`.
- Расчёты, BOM, PDF export logic, складская логика, responsive, scroll, legacy/v3 и backend writes не менялись.
