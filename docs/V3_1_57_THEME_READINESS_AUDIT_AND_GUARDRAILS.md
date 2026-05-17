## v3.1.57 — Theme readiness audit and guardrails

Цель прохода: проверить структуру UI/CSS перед будущей светлой темой, чтобы не добавлять её поверх конфликтующих hard-lock слоёв.

### Что проверено

- Порядок подключения CSS: `tokens → base → components → app-shell → constructors → stage/truss/led → desktop/mobile → controls → breakpoints → print`.
- Runtime injected styles: `V4DesignSystem`, `StandaloneDarkThemeLock`, `MobileDarkUiParity`, `StandaloneMobileFieldPolish`, `StandaloneMobileStageUiTuning`, `LogicUiRuntime`.
- Breakpoint contract: mobile `<=767px`, desktop/tablet `>=768px`.
- Scroll/overflow: сохранён native desktop scroll и tablet desktop surface lock.
- Theme blockers: `appTheme=dark`, `data-app-theme=dark`, `colorScheme=dark`, dark-only injected override layers.
- Hardcoded color debt: CSS and JS still contain many dark literals, especially in late override layers, но они больше не должны быть непреодолимым hard-lock для будущей светлой темы.

### Что исправлено

1. `index.html` больше не принудительно записывает `appTheme=dark` безусловно. Теперь dark остаётся default, а light допускается только при явном feature gate.
2. `AppSettings` получил `isLightThemeEnabled()` и `normalizeAppTheme()`. Light не включается случайно из старого localStorage, но может быть включён явно при разработке темы.
3. `LogicUiRuntime.lockDarkTheme()` оставлен как backward-compatible API, но теперь синхронизирует разрешённую тему вместо жёсткой блокировки dark.
4. `StandaloneDarkThemeLock` превращён в theme guard: dark overrides инжектятся только для dark/default состояния и удаляются при активной разрешённой light theme.
5. `MobileDarkUiParity` также стал theme-aware и не будет держать dark слой поверх будущей мобильной светлой темы.
6. `tokens.css` получил gated light-token skeleton и `--feg-color-scheme`.
7. `base.css` и mobile usability layer используют `--feg-color-scheme` вместо прямого `dark`.
8. Удалены no-op media-блоки `(min-width:768px) and (max-width:767px)`, которые больше не могли примениться после единого breakpoint contract.

### Feature gate для будущей светлой темы

Light не включается сам. Для разработки будущей темы можно активировать один из вариантов:

```js
window.FEG_ENABLE_LIGHT_THEME = true;
localStorage.setItem('fegLightThemeEnabled', '1');
localStorage.setItem('appTheme', 'light');
```

или задать на html:

```html
<html data-feg-light-theme-enabled="true" data-app-theme="light">
```

### Остаточный технический долг

- `styles/breakpoints.css` и `styles/controls.css` содержат много поздних `!important` override-правил. Это не блокирует будущую тему после текущего pass, но светлую тему лучше вводить отдельным последним theme-layer, а не точечно поверх отдельных блоков.
- В `V4DesignSystem.js`, PDF templates и legacy/v3 фрагментах остаются inline-style и hardcoded цвета. PDF лучше не смешивать с app theme, а держать отдельный print/PDF theme.

### Рекомендация по следующему шагу

Добавлять светлую тему отдельным управляемым слоем `theme-light.css` или новым разделом в `tokens/theme` после dark guard, с привязкой к `html[data-app-theme="light"] body.v4-only-body.quick-standalone-body`, постепенно заменяя hardcoded dark literals на semantic tokens.
