## v3.1.58 — Theme guard startup freeze fix

Что исправлено:

- После theme-readiness прохода v3.1.57 приложение могло зависать на стартовом экране.
- Причина была в `StandaloneDarkThemeLock`: MutationObserver следил за `style`-атрибутом `documentElement`, а `apply()` сам записывал `documentElement.style.colorScheme`. В браузере это могло создавать повторный цикл observer → apply → style mutation → observer.
- В v3.1.58 guard сделан идемпотентным:
  - не наблюдает за `style`;
  - проверяет, совпадает ли текущее состояние темы с целевым;
  - не записывает повторно одинаковые `data-app-theme`, class и `colorScheme`;
  - повторно применяет тему только при реальном расхождении.

Сохранено:

- Dark baseline остаётся дефолтом.
- Theme-readiness каркас v3.1.57 сохранён.
- Light theme по-прежнему не включается случайно без явного feature gate.

Не менялось:

- UI layout
- Responsive contract
- Scroll
- Расчёты / BOM / PDF / склад / legacy-v3 / backend writes
