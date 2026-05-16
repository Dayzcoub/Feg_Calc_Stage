# FEG Stage PRO 3.0.1 — Safari desktop dark theme hotfix

## Причина

В standalone quick constructors приложение должно работать только в тёмной V4-палитре. На Safari desktop мог проявляться конфликт с ранее сохранённым значением `appTheme=light` в `localStorage`. В результате `AppSettings` добавлял класс `theme-light`, а часть светлых CSS-правил перебивала тёмный интерфейс.

На мобильном Safari проблема могла не проявляться, потому что поверх срабатывали мобильные dark UI правила.

## Исправление

Добавлен модуль:

- `src/modules/StandaloneDarkThemeLock.js`

Он делает следующее:

- сохраняет `appTheme=dark`;
- удаляет `theme-light` с `body`;
- добавляет `theme-dark`;
- выставляет `data-app-theme="dark"`;
- принудительно задаёт `color-scheme: dark`;
- добавляет all-device dark CSS override для standalone quick constructors;
- следит через `MutationObserver`, чтобы светлая тема не вернулась после повторной инициализации.

Также в `index.html` добавлен ранний inline-guard до загрузки `AppSettings`, чтобы Safari не успевал применить светлую тему при старте.

## Не менялось

- расчёты Stage / Truss / LED;
- BOM;
- PDF-экспорт;
- zoom / auto-fit;
- сохранение черновиков;
- исправление шаблона табуретки на U012.
