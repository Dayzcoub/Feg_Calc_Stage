# V3.1.101 — Rigging Spec Sheet v5 UI pass

Крупный визуальный/структурный проход по UI standalone-конструкторов. Бизнес-логика,
расчёты и экспорт не менялись. Этот документ закрывает промежуток версий 3.1.95–3.1.101,
который ранее остался без записей в CHANGELOG/README.

## Что сделано

### Визуальная идентичность
- Введена тема **«Rigging Spec Sheet»**: поверхности графит/сталь/алюминий, единый
  акцент rig-yellow (hazard-tape, не «игровое золото») зарезервирован под действия и focus.
- В `styles/tokens.css` переопределена палитра `--feg-*` и радиусы. **Имена переменных
  сохранены**, поэтому все существующие `var(--feg-*)`-ссылки подхватили новую палитру
  без переименований.
- Базовый фон темы — `#14171A`; синхронизированы `<meta name="theme-color">`,
  `manifest.json` `theme_color`/`background_color`.
- Подключены веб-шрифты **Barlow Condensed** и **JetBrains Mono** (Google Fonts) с
  системным fallback.

### Ввод данных: степперы ±
- В `V4StructureVisualConfigurator.js` (Сцена/Фермы) и `LedCalculatorUI.js` добавлены
  `stepperHtml()` / `bindSteppers()`.
- Кнопки ± вызывают штатные `input.stepUp()` / `stepDown()`, затем диспатчат реальные
  события `input` и `change` — вся существующая обвязка `addEventListener('input', …)`
  реагирует так же, как при ручном вводе. Состояние калькуляторов кнопки не трогают напрямую.

### Прогрессивное раскрытие
- `wrapFieldGroup()` оборачивает готовые блоки в нативный `<details>` (доступность и
  клавиатура — бесплатно, без JS-зависимостей).
- Обёрнуты панели стоимости и панель масштаба/подгонки поля.
- **Важно для LED:** обёртка стоимости несёт `grid-area: ledPricing` на самом `<details>`,
  т.к. это работает только на прямом grid-потомке (ранее этот класс бага ловили на фермах).

### Иконки
- PNG-иконки плиток запуска и hero-PNG заменены на инлайн-SVG (`currentColor`): следуют
  теме, чёткие при любом масштабе, без отдельной подложки.

### Чистка CSS-архитектуры
- Удалены `styles/desktop.css` и `styles/mobile.css`; их правила слиты в
  `app-shell.css`, `controls.css`, `truss.css`, `stage.css`, `led.css`, `breakpoints.css`
  (см. пометки `Merged from …` в этих файлах).
- В `index.html` к изменённым стилям/скриптам добавлен cache-bust `?v=`.
- Из `src/ui/LogicUiRuntime.js` удалён мёртвый блок форс-поверхности `768–1179px → 1280px`,
  оставшийся после responsive-стабилизации v3.1.90.

### Версии и кэш
- Единая видимая версия **3.1.101**: `index.html` title, `manifest.json`, `AppVersion.js`.
  `AppVersion.js` переписывает `document.title` в рантайме.
- Service worker cache поднят до `v30` (`feg-stage-pro-v30-rigging-spec-sheet`).

## Проверка
- `npm run check:js` — OK (172 файла).
- `npm run test:smoke` — **33/33 passed** (Home/Stage/Truss/LED на 360/390/768/900/1024/1179/1180/1366 px).

## Не тронуто
Расчёты Stage/Truss/LED, BOM, склад, резервы, PDF-экспорт, quick pricing, legacy/v3,
backend writes, Supabase-конфиг и логика мини-игры.
