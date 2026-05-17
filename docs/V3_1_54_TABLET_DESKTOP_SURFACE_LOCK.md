## v3.1.54 — Tablet desktop surface lock

Цель:

- Убрать последнее промежуточное состояние между desktop и mobile при сужении окна браузера.
- Оставить простой контракт: `<=767px` — mobile, `>=768px` — desktop/tablet desktop surface.

Что исправлено:

- В диапазоне `768–1179px` старые viewport-based `max-width: calc(100vw - ...)` правила продолжали сжимать реальные рабочие constructor grids.
- Из-за этого интерфейс уже не был mobile, но ещё не держал полноценную desktop-сетку: control rail и canvas начинали визуально ломаться.

Что сделано:

- Для `768–1179px` введена стабильная desktop-поверхность шириной `1280px`.
- Wrapper-слои standalone/workspace получают одинаковую `min-width: 1280px`.
- Stage/Truss/LED constructor surfaces получают фиксированную рабочую ширину `1248px` внутри этой поверхности.
- Для Stage/Truss/LED на tablet-width принудительно сохраняется desktop-grid, а не промежуточная narrow-grid перестройка.
- Runtime CSS тоже обновлён, чтобы поздний injected-layer не прятал горизонтальный scroll на tablet-width.

Не менялось:

- Mobile `<=767px` визуал.
- Desktop `>=1180px` визуальный baseline.
- Расчёты, BOM, PDF, склад, legacy/v3, backend writes.
