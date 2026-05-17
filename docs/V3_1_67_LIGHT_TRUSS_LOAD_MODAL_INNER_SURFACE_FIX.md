## v3.1.67 — Light truss load modal inner surface fix

### Что исправлено

- В светлой теме дочищен оставшийся тёмный фон внутри модалки «Проверка нагрузок» у ферменного конструктора.
- Причина: детальные legacy-секции результата LoadChecker (`block-load-section`, `block-load-grid`, `block-load-note`) продолжали получать тёмные правила из базового v4/design-system слоя.
- Добавлен отдельный light-theme scoped override только внутри `.v4-truss-load-dialog-card.v4-truss-load-panel`, чтобы не задеть тёмную тему и внешние таблицы.

### Что не трогалось

- Расчёты нагрузок LoadChecker.
- Логика ферменного конструктора, BOM, вес, комплектация, склад, резервы.
- PDF export logic.
- Legacy/v3 и backend writes.
- Responsive contract и native browser scroll.

### Проверки

- `node --check src/modules/LightThemeShell.js`
- `node --check src/modules/AppSettings.js`
- `node --check src/modules/StandaloneDarkThemeLock.js`
- `node --check src/modules/MobileDarkUiParity.js`
- `node --check src/modules/V4StructureVisualConfigurator.js`
- `node --check src/modules/V4StructureConfigurator.js`
- `node --check src/modules/TrussBlockConstructor.js`
- `node --check src/modules/LedCalculatorUI.js`
- `node --check src/ui/LogicUiRuntime.js`
- CSS sanity / brace check
- `unzip -t`
