## v3.1.94 - PKC stage systems

- Added stage system selection in the quick stage constructor: `Imlight Copy`, `PKC / ШИП-ПАЗ`, and `PKC / ПАЗ-ПАЗ`.
- Existing stage calculation is preserved and renamed to `Imlight Copy`.
- PKC ШИП-ПАЗ counts SS-PS modules and shared-grid legs without Imlight crossbars.
- PKC ПАЗ-ПАЗ counts SS-PP modules, 4 legs per module, SD-LM-T, SD-LM-X, and SD-LM-SS connectors.

## v3.1.92 - Runner explicit player name

- Mini runner no longer starts with the default `Техник` player name.
- Opening the logo game now prompts for a real player name before start.
- Jump/keyboard/touch launch paths also stop at the name field until it is filled.
- Smoke coverage now checks this runner start gate.

## v3.1.91 - Responsive workspace balance fix

- Fixed Truss and LED desktop layouts where side panels could squeeze the drawing workspace to a tiny strip.
- At 1180-1279 px, Truss and LED now use a two-column workstation with metrics/details below the canvas.
- At 1280+ px, side panels are narrower and the central construction field gets the remaining width.
- Smoke tests now assert that construction workspaces stay visibly wide, not just free of page-level overflow.

## v3.1.90 - Responsive stability pass

- Added a final runtime responsive stability layer after dynamic UI style injection.
- Removed page-level 1180/1280px forced tablet surfaces; technical canvases now scroll inside their own frames instead of widening the whole app.
- Stabilized Stage, Truss and LED layouts across 360 / 390 / 768 / 900 / 1024 / 1179 / 1180 / 1366 px.
- Expanded Playwright smoke coverage to check Home, Stage, Truss and LED for page-level horizontal overflow.

## v3.1.89 - Version source and local PDF vendor assets

- Added a shared `AppVersion` runtime source for standalone title/status/PDF labels.
- Updated manifest/app labels to `3.1.89` so QA sees the same version across browser title, PWA metadata and runtime UI.
- Moved `jsPDF` and `html2canvas` to local `assets/vendor` files with CDN fallback, so PDF export is no longer blocked by offline standalone startup.
- Updated the service worker cache to precache local PDF vendor assets instead of old remote CDN URLs.
- Added reproducible checks: `npm run check:js`, `npm run test:smoke`, and `npm run verify`.

## v3.1.61 — Light theme component coverage pass

- Light-theme preview coverage expanded across standalone shell, cards, chips, PDF/client previews, BOM/settings/subrent panels and SVG labels.
- Added `window.FEG_LIGHT_THEME_SHELL.audit()` for local light-theme leak/contrast checks.
- Dark theme remains default; light mode is still gated.

## v3.1.61 — Theme guard startup freeze fix

- Исправлен регресс v3.1.57, из-за которого приложение могло зависать на стартовом экране.
- Причина: theme guard в `StandaloneDarkThemeLock` наблюдал за `style`-атрибутом root и сам же записывал `colorScheme`, что могло запускать зацикленный MutationObserver на старте.
- Исправление: theme guard стал идемпотентным, больше не следит за `style`, не пишет повторно те же значения и применяет тему только при реальном расхождении состояния.
- Theme-readiness каркас v3.1.57 сохранён, но startup/runtime снова безопасный.
- Расчёты, BOM, PDF, склад, responsive, scroll, legacy/v3 и backend writes не трогались.

## v3.1.57 — Theme readiness audit and guardrails

- Theme-readiness pass: audited CSS/UI layers, runtime injected styles, hard dark locks, breakpoint leftovers, inline style risks and scroll/overflow cascade before implementing a light theme.
- Removed hard theme blockers: startup script, AppSettings and LogicUiRuntime now default to dark but no longer permanently force `appTheme=dark`; light theme activation is gated by an explicit feature flag.
- Converted standalone dark lock into a dark palette guard: it keeps the current dark baseline by default, but stops injecting/removes dark overrides when light theme is explicitly enabled and active.
- Mobile dark parity layer now follows the same guard and no longer blocks future light mobile theme work.
- Added light-token skeleton in `styles/tokens.css` and moved base `color-scheme` to `--feg-color-scheme`.
- Removed unreachable historical media blocks `(min-width:768px) and (max-width:767px)` so breakpoint structure is cleaner before light-theme work.
- No visual redesign intended; calculations, BOM, PDF, warehouse, responsive contract, scroll, legacy/v3 and backend writes were not changed.

## v3.1.56 — Truss stool auto-support reference fix

- Logic-only: исправлен регресс из v3.1.55, из-за которого табуретка вообще не строилась.
- Причина: в финальном `setTrussGeometryState()` использовались локальные `reqX/reqY` вне области видимости, что давало runtime-ошибку при добавлении табуретки.
- Авто-правило max 9 м сохранено: пустое `Кол-во ног` добавляет промежуточные пары опор по верхней раме, чтобы пролёт не превышал 9 м, вместе с U017, ногами и базами.
- UI, responsive, scroll, PDF, склад, legacy/v3 и backend writes не трогались.

## v3.1.54 — Tablet desktop surface lock

- Исправлено последнее промежуточное состояние между desktop и mobile при сужении браузера.
- Диапазон `768–1179px` теперь использует стабильную desktop-поверхность `1280px` с горизонтальным viewport scroll, а не узкую поломанную промежуточную сетку.
- Stage/Truss/LED получают стабильную desktop-сетку на планшетных ширинах; mobile остаётся только `<=767px`.
- Mobile-визуал v3.1.51, desktop-scroll v3.1.52 и unified breakpoint contract v3.1.53 сохранены; расчёты, BOM, PDF, склад, legacy/v3 и backend writes не трогались.

## v3.1.53 — Unified tablet/desktop breakpoint contract

- Responsive contract simplified: mobile layout now turns on only at `max-width: 767px`; tablet/narrow browser widths from `768px` keep the desktop interface instead of switching through intermediate layouts.
- Disabled the old hybrid tablet/pre-desktop breakpoints (`860/900/1024/1179/1180`) that caused multiple visual jumps while narrowing the browser window.
- Mobile-only runtime layers (`StandaloneMobileFieldPolish`, `StandaloneMobileStageUiTuning`, `MobileDarkUiParity`) no longer activate on tablets just because of `pointer: coarse`; they activate only on true mobile width.
- Stage responsive DOM reordering now happens only in mobile width, so tablet/narrow desktop keeps desktop order.
- Calculations, BOM, PDF, warehouse, legacy/v3 and backend writes were not changed.

## v3.1.48 — Mobile truss library standalone scope fix

- Mobile-only: найдено, почему стиль библиотеки ферм не применялся — поздний mobile parity selector был привязан к `.v4-quick-modal-body`, а текущий standalone mobile-конструктор рендерит фермы прямо внутри `#quickStandaloneMount/.standalone-mount`.
- Mobile-only: late-layer правила библиотеки `Прямые фермы / 2D узлы / 3D узлы` перенесены на фактический scope `.v4-structure-truss .v4-truss-library` в mobile media-scope StandaloneMobileFieldPolish.
- Mobile-only: сохранены правки модалки проверки нагрузок, пробел между иконкой и числом у прямых ферм, спокойный active header и более явный selected button.
- Desktop media-зоны не менялись; расчёты, BOM, PDF, склад, legacy/v3 и backend writes не трогались.

## v3.1.38 — Stage desktop safe preset fix

- База мобильной версии откатана к принятому состоянию v3.1.21, без правок v3.1.24/v3.1.25.
- Desktop-компоновка сцены перенесена отдельным слоем и работает только при `min-width: 1180px`.
- Ниже 1180 px новые desktop wrapper-блоки summary нейтрализуются через `display: contents`, чтобы мобильный поток не менялся.
- Правило зафиксировано: desktop-правки не должны заходить в mobile/tablet `max-width` зоны.

## v3.1.21 — LED active construction indication restore

- LED `Active construction`: возвращена подсветка выбранной конструкции и цветовая индикация добавленных конструкций.
- Добавлен компактный цветовой индикатор активной конструкции.
- Расчёты, PDF, BOM и складская логика не менялись.

## v3.1.21 — LED active construction indication restore

- Исправлен мобильный блок редактирования ферм: контейнер больше не делит панель на три колонки, строка `Добавлять / Удалять` занимает полную ширину и остаётся одной горизонтальной строкой.
- Исправлено центрирование поля конструктора ферм: поле снова уважает JS-размеры сетки, а viewport центрируется по фактическому содержимому с учётом внутренних отступов.
- Убран конфликт mobile CSS `width:max-content` для `.v4-truss-field`, который ломал расчёт ширины/скролла и давал сдвиг вправо/вверх.
- Правка сделана в общем responsive-слое и логике viewport, без локального хака под конкретную карточку.

## v3.1.17 — Truss / LED mobile polish and Quick PDF scheme fix
- Truss stool controls: moved “Кол-во ног” and “Добавить табуретку” into one horizontal action row.
- Truss edit tools: kept add/remove modes as a shared horizontal rhythm and centered Truss templates/viewport around actual content.
- LED active-construction select now follows the shared compact select text size.
- LED quick result shows only the unified PDF action; tech sheet / warehouse / BOM bridge buttons are hidden from quick UI.
- Quick PDF now has a deterministic Truss SVG scheme fallback and a readable light hero block matching the rest of PDF cards.

## v3.1.16 — Truss / LED mobile parity with Stage compact flow

- Мобильный вид ферм и LED приведён к тому же compact-flow ритму, что и утверждённая сцена.
- Фермы: шаблоны сверху, затем масштаб, поле конструктора, кнопки редактирования/режима, библиотека блоков и результаты.
- LED: параметры укорочены и разнесены по отдельным полям; поле экрана поднято выше панелей шаблонов/активной конструкции.
- Zoom/scale для Truss и LED переведён на двухстрочную схему `− / slider / +` и `По размеру / Центр / auto-fit`.
- Таблицы и отчёты Truss/LED остаются внутри собственных scroll-обёрток.
- Правки внесены через глобальный responsive-слой `styles/breakpoints.css`; расчёты, BOM, PDF, quick catalog и drafts не менялись.

## v3.1.15 — Stage mobile compact dimension/closure rhythm

- Сокращён вертикальный зазор между рядом `Ширина / Глубина / Высота` и чекбоксом/выбором закрытия торцов.
- Зазор приведён к тому же ритму, что и в верхнем блоке между выбором настила/столбов и индикатором перекладин.
- Правка сделана через глобальный responsive-слой `styles/breakpoints.css`; расчёты и логику конструктора не трогали.

# FEG Stage PRO 3.1.94

Standalone-версия быстрых конструкторов для оперативной работы со сцены, фермами и LED-экранами.

## Что входит

- быстрый конструктор **Сцены**;
- быстрый конструктор **Ферм**;
- быстрый конструктор **LED-экранов**;
- локальное сохранение последних конфигураций;
- техлисты и складские листы;
- unified BOM / JSON / contract snapshot;
- PDF-экспорт сводной таблицы и схемы конфигурации.

## Титульный экран v3.0

На титульной странице оставлен максимально чистый режим запуска:

- релизная карточка **FEG Stage PRO 3.0**;
- три плитки выбора конструктора: **Сцена / Фермы / LED Экраны**.

Служебные подписи, технические кнопки и дополнительные блоки скрыты со стартового экрана.

## Mobile Field edition

Версия 3.0 адаптирована для работы с телефона на площадке:

- крупные тач-зоны;
- полноэкранные мобильные модалки;
- удобный вертикальный порядок панелей;
- горизонтальный скролл длинных таблиц;
- адаптация PDF-модалки;
- сохранение исходного внешнего вида и логики быстрых конструкторов.

## Масштабирование поля

Для конструкторов **Сцены** и **LED** добавлены полевые инструменты управления холстом:

- ручной zoom;
- auto-fit по текущему количеству блоков/кабинетов;
- кнопка центрирования;
- автоцентрирование после добавления шаблонов.

У ферм сохранена уже существующая логика zoom/auto-fit.

## Что сохранено из исходного проекта

- расчёты Stage / Truss / LED;
- quick ideal catalog;
- BOM-логика;
- quick pricing: прокат/модули + монтаж + доставка;
- PDF-экспорт v3.17.54 с чистыми строками и автоориентацией;
- локальные drafts в `localStorage`.

## Что не входит в standalone

Эта сборка не запускает основной app shell, авторизацию, сметчик, складские движения, backend/Supabase, проекты и рабочие роли. Оставлены только модули, необходимые быстрым конструкторам и их экспорту.

## Запуск

Можно открыть `index.html` напрямую в браузере. Для более стабильной работы PDF и PWA-режима лучше запустить локальный сервер:

```bash
python3 -m http.server 8080
```

Для воспроизводимой проверки через Node:

```bash
npm install
npm run verify
```

и открыть:

```text
http://localhost:8080
```

## PDF

PDF использует тот же механизм, что и исходный проект: `jsPDF + html2canvas`, но библиотеки теперь поставляются локально в `assets/vendor`. CDN остаётся только запасным fallback, если локальные файлы удалены или недоступны.


## Mobile dark UI parity

Мобильный интерфейс приведён к цветам desktop/V4: тёмные панели, тёмные поля, тёмные таблицы и контрастный светлый текст. Расчёты и логика конструкторов не менялись.

### Hotfix 3.0 mobile dark UI
- Исправлен зависон на титульном экране: мобильный dark-ui слой больше не конфликтует с `V4DesignSystem` через `MutationObserver` в `<head>`.
- Кнопки выбора конструкторов снова загружаются сразу после титульной картинки.



## v3.0.2 — Mobile Field Polish

- Наведён порядок в мобильном отображении быстрых конструкторов Stage / Truss / LED.
- Окна конструкторов ограничены шириной экрана телефона без горизонтального развала интерфейса.
- Поля построения Stage и Truss автоматически центрируются и не создают лишнюю пустую зону справа.
- Панели настроек и кнопки стали компактнее и удобнее для полевой работы с телефона.
- Расчёты, BOM, PDF, quick-логика, Safari dark theme и hotfix табуретки U012 не менялись.


## v3.1.0 — Logic UI Rebuild

Standalone-приложение переведено на утверждённый Logic Pro inspired UI Kit: единая тёмная тема, дизайн-токены, чистый стартовый экран, общий frame для Stage / Truss / LED, плотные desktop-панели и мобильная компоновка в одну колонку.

Сохранены расчёты, BOM, PDF export, quick ideal catalog, localStorage drafts, Stage touch drawing, Truss U012 stool default и LED standing/hanging logic.

Новые UI-файлы находятся в `styles/` и `src/ui/`. Старое расчётное ядро осталось в `src/modules/`.


## v3.1.1 — Standalone visual match pass

- Пересобран standalone app shell в стиле premium workstation: левый sidebar, верхний top bar, цельная рабочая область.
- Главный экран приведён к референсу: hero banner, 3 карточки конструкторов, нижний workspace с вкладками Stage / Truss / LED.
- Быстрые конструкторы теперь открываются во встроенной рабочей области вместо отдельной модалки по умолчанию.
- Доработаны визуальные стили панелей, карточек, вкладок, таблиц, метрик и рабочего canvas.
- Mobile layout визуально уплотнён и приближен к утверждённому mockup.



## v3.1.2 — Desktop stretch and mobile scroll fix

- Desktop standalone workspace now stretches to the full application window instead of staying in a narrow left column.
- Constructor hero/cards/workspace width constraints are overridden after legacy V4 styles load.
- Mobile page-level vertical scrolling is restored; the standalone window no longer clips the page content.
- Core calculations, BOM, quick catalog and PDF logic were not changed.



## v3.1.6 — no sidebar + mobile scroll fix

- Убрана левая standalone-колонка на desktop.
- Навигация оставлена через Stage / Truss / LED.
- Усилен mobile vertical scroll unlock без изменения расчётной логики.

## v3.1.9 — unified controls visual system

- Добавлен общий слой `styles/controls.css` для компактных полей, select, input, checkbox, кнопок и scale/zoom блоков.
- Stage / Truss / LED получают единый стиль элементов управления, без локального костыля под отдельный экран.
- Мобильная сцена приведена ближе к утверждённому compact UI: подписи слева, поля справа, размеры в трёх компактных колонках.
- Масштаб поля сцены поднят к основным параметрам.
- Расчёты, BOM, PDF, drafts и quick catalog не менялись.


## v3.1.10 — Stage mobile structural flow

- Пересобрана мобильная сетка Stage сверху вниз по утверждённой логике: build → dimensions → closure → pricing → scale → tools → presets → canvas.
- Поля Stage получили явные shared-классы, чтобы управление шрифтами/сеткой шло через общий `styles/controls.css`.
- Preset-кнопки сцены переведены на нормальные inline-иконки и двухколоночную мобильную сетку.
- Сохранено правило: визуальные изменения делаются через общие стили и shared-классы, без локальных костылей под отдельный блок.


## v3.1.14 — Stage mobile usability polish

- Доработана мобильная сетка Stage по фактическому скриншоту: уменьшены подписи/значения, убраны обрезания в select, выровнен scale-блок.
- Для Stage select использованы компактные отображаемые подписи без изменения ключей и расчётов.
- `По размеру / Центр / auto-fit` закреплены в одной строке; подпись и проценты масштаба скрыты.
- Пресеты Stage закреплены в 2-колоночной сетке, последний пресет растягивается на строку.
- Canvas Stage получил более удобную высоту на mobile.
- Правки выполнены через shared control layer `styles/controls.css`, без локальных inline-костылей.
