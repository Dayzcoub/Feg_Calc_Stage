# v3.1.59 — Light theme shell preview

Цель версии: начать подключение светлой темы без риска для текущего dark baseline.

## Что добавлено

- Новый модуль `src/modules/LightThemeShell.js`.
- Модуль подключён после `StandaloneDarkThemeLock.js`, чтобы light-shell применялся после снятия dark guard.
- Светлая тема по-прежнему gated и не включается случайно из старого `localStorage`.
- Для локальной проверки доступны команды в консоли браузера:

```js
window.FEG_LIGHT_THEME_SHELL.enableLight()
window.FEG_LIGHT_THEME_SHELL.disableLight()
window.FEG_LIGHT_THEME_SHELL.refresh()
```

## Что покрывает shell

- фон приложения;
- карточки и панели;
- типографику и muted text;
- поля ввода, селекты и textarea;
- основные кнопки и active states;
- модалки и backdrop;
- таблицы;
- Stage/Truss/LED workspace/canvas/grid зоны;
- базовые статусы OK/risk/bad;
- scrollbar/selection.

## Что не делалось

- Не добавлялась UI-кнопка переключения темы.
- Не менялся dark baseline.
- Не трогались расчёты, BOM, PDF, склад, responsive, scroll, legacy/v3 и backend writes.

## Дальше

Следующий проход — открыть приложение в light shell и точечно выявить остаточные hardcoded dark-цвета, которые должны быть переведены на токены/общие классы, без локальных костылей под один блок.
