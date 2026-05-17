# UI Kit Implementation Notes — v3.1.0

## Цветовая система

Все новые стили используют переменные из `styles/tokens.css`:

- фон: `--feg-bg`, `--feg-bg-2`;
- панели: `--feg-panel`, `--feg-panel-2`, `--feg-panel-3`;
- текст: `--feg-text`, `--feg-text-2`, `--feg-text-muted`;
- акценты: `--feg-gold`, `--feg-cyan`, `--feg-green`, `--feg-red`.

## Компоненты

Визуально унифицированы:

- `.btn-primary`, `.btn-secondary`, `.v4-icon-btn`, `.v4-mode-btn`;
- `.v4-field`, `input`, `select`, `textarea`;
- `.v4-card`, `.v4-mini`, `.v4-table-wrap`;
- `.v4-quick-modal`, `.v4-quick-modal-head`, `.v4-quick-modal-body`;
- `.v4-truss-zoom-panel`, `.v4-stage-zoom-panel`, `.v4-led-zoom-panel`.

## Runtime

`src/ui/LogicUiRuntime.js` делает только безопасные UI-операции:

- фиксирует dark mode;
- убирает light class с HTML/body;
- добавляет классы shell/frame;
- синхронизирует видимость select закрытия торцов по checkbox;
- не меняет расчёты, BOM, PDF, localStorage draft data.

## Почему старые hotfix-файлы оставлены

Старые hotfix-модули не удалены физически, чтобы не сломать уже проверенные touch/dark/Safari-исправления. Их визуальные эффекты перекрыты нормальным поздним CSS-слоем `styles/`, а опасные циклические перестройки не добавлялись.
