# v3.1.82 — Detailed in-app constructor guide

Версия собрана от принятого baseline `v3.1.81_desktop_summary_metric_parity`.

## Что изменено

- Расширена встроенная инструкция пользователя внутри приложения.
- Документация теперь подробно покрывает все быстрые конструкторы:
  - Сцена;
  - Фермы;
  - LED Экраны.
- Добавлены разделы с логикой работы, формулами и условностями расчёта.
- Для сцены описаны формулы модулей, площади, опор, рам, шпилек, пяток, открытого периметра, торцов, стоимости и веса.
- Для ферм описаны шаблоны, разбиение прямых, стыки, C2-88, C3-83, пальцы, шплинты, базы, вес, коммерческие итоги и проверка нагрузок.
- Для табуретки зафиксирована авто-логика дополнительных опор при пролётах свыше 9 м.
- Для LED описаны габариты, кабинеты, пиксели, соотношение сторон, мощность, пуск, кабели, Hanging Bar, спанцеты, шаклы, печеньки, болты, вес и стоимость.
- Добавлены стили таблиц документации для dark/light темы.

## Что не менялось

- Расчёты конструкторов.
- BOM.
- Склад.
- Резервы.
- PDF export logic.
- Legacy/v3.
- Backend writes.
- Бизнес-логика.
- LED-логика.
- Dark fallback.
- Responsive contract и scroll logic.

## Проверки

- `node --check src/modules/LightThemeShell.js`
- `node --check src/modules/AppSettings.js`
- `node --check src/modules/StandaloneDarkThemeLock.js`
- `node --check src/modules/MobileDarkUiParity.js`
- `node --check src/modules/V4StructureVisualConfigurator.js`
- `node --check src/modules/V4StructureConfigurator.js`
- `node --check src/modules/TrussBlockConstructor.js`
- `node --check src/modules/LedCalculatorUI.js`
- `node --check src/ui/LogicUiRuntime.js`
- `node --check src/modules/QuickCalculators.js`
- CSS sanity / brace check
- `unzip -t`
