## v3.1.65 — Light theme contrast polish and darker truss artwork

Задача: после удаления тёмных фонов отполировать светлую тему так, чтобы интерфейс был читаемым, контрастным и без наложений, а ферменные конструкции не сливались с рабочим полем.

Что сделано:

- Добавлен отдельный light-theme-only CSS pass поверх текущего `LightThemeShell`.
- Усилен контраст базовых surfaces: карточки, панели, заголовки, поля, кнопки, таблицы, бейджи, статусы и модалки.
- Добавлены безопасные anti-overlap правила для сеток, action rows, кнопок, field labels, summary grids и modal bodies.
- Фермы в light theme затемнены:
  - `truss-rail / truss-web / truss-end`;
  - `truss-art-*`;
  - `truss-node-*`;
  - `node-truss-*`;
  - `feg-truss-*` preview SVG classes.
- Подписи ферм переведены на тёмный текст с белой обводкой, чтобы читались на светлом фоне и поверх конструкции.
- Состояния `OK / risk / bad` приведены к более контрастной светлой палитре.

Что не менялось:

- Dark theme baseline.
- Расчёты.
- BOM.
- PDF export logic.
- Склад.
- Responsive contract.
- Scroll.
- Legacy/v3.
- Backend writes.
