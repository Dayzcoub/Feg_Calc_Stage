# v3.1.2 — Desktop stretch and mobile scroll fix

Visual-only hotfix.

- Убрано сжатие desktop-интерфейса в левую колонку: standalone mount, dashboard, hero, tiles и workspace получают полную доступную ширину окна.
- Добавлен late-runtime CSS override после старых V4/standalone hotfix styles.
- На mobile восстановлен page-level vertical scroll: wrapper больше не клипует содержимое через `overflow:hidden` / `100dvh`.
- Таблицы и canvas-зоны сохраняют внутренний scroll, а общая страница снова прокручивается вверх/вниз.
- Расчёты, BOM, quick ideal catalog, PDF logic и localStorage drafts не менялись.
