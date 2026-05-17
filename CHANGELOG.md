## v3.1.81 — Desktop summary metric parity for Truss and LED
- Desktop-only polish for the Truss and LED result metric blocks.
- Truss/LED metric cards now follow the accepted Stage card rhythm: stable two-column grid, fixed desktop min-height, matching value/label font scale and consistent card padding.
- LED summary card markup now uses the same value-first structure as Stage, so labels no longer render as oversized desktop values.
- Mobile layout, calculations, BOM, warehouse, reservations, PDF export, legacy/v3, backend writes, dark fallback and scroll logic were not changed.

## v3.1.80 — In-app user guide and compact launch controls

- Added in-app user documentation modal to the standalone quick constructors home screen.
- Added compact `Инструкция` launcher under the theme switch in the right launch control stack.
- Reduced the visual height of the launch theme toggle by splitting the side column into two equal controls.
- Kept the transparent image icon set, dark fallback, responsive contract, calculations, BOM, warehouse, reservations, PDF export logic, legacy/v3 and backend writes unchanged.
- Documented the change in `docs/V3_1_80_IN_APP_USER_GUIDE.md`.

## v3.1.79 — Launch transparent image icon set

- В большие кнопки главного экрана встроен единый набор transparent PNG-иконок: «Сцена», «Фермы», «LED Экраны».
- Иконки подключены как изображения через общий класс, без CSS-отрисовки объектов и без собственной подложки внутри PNG.
- Фон launch-кнопок остаётся системным и переключается вместе с dark/light темой.
- Расчёты, BOM, склад, резервы, PDF export, legacy/v3, backend writes и бизнес-логика не менялись.

## v3.1.75 — Hero artwork preview swap

- Replaced the standalone home hero artwork with the newly supplied wide FEG banner preview image so it can be checked in the real UI field.
- No layout, calculation, BOM, warehouse, reservations, PDF export, legacy/v3, backend write, responsive, scroll or theme logic was changed.

## v3.1.74 — Stage title field width and radius polish

- Widened the stage title field/pill behind `Быстрое построение сцены` so it uses more of the available row width.
- Smoothed the small top-left radius/offset mismatch between the stage panel corner and the title field.
- No calculation, BOM, warehouse, reservations, PDF export, legacy/v3, backend write, responsive contract, scroll or constructor business logic was changed.

## v3.1.73 — Stage build header centering

- Removed the separate stage click/drag helper field (`Клик / протяжка: настил / лестница`) from the stage quick-build panel.
- Centered the `Быстрое построение сцены` heading within the freed top strip of the stage control panel.
- No calculation, BOM, warehouse, reservations, PDF export, legacy/v3, backend write, responsive contract, scroll or constructor business logic was changed.

## v3.1.72 — Hero field-fit regeneration

- Regenerated the standalone home hero artwork to a wide banner proportion closer to the real hero field/card size.
- Removed the old hero-image height caps and switched the hero slot to full-card rendering, so the banner now uses the free space more harmoniously on desktop and mobile.
- No calculation, BOM, warehouse, reservations, PDF export, legacy/v3, backend write, responsive contract, scroll or constructor business logic was changed.

## v3.1.71 — Hero artwork fill tuning

- Tuned the main home-screen hero artwork so it visually occupies more of the available card area by cropping/zooming the supplied wide branding art.
- Kept all icon replacements from v3.1.70 intact.
- No calculation, BOM, warehouse, reservations, PDF export, legacy/v3, backend write, responsive, scroll or theme logic was changed.

## v3.1.70 — Branding icon refresh

- Replaced the shipped application icons (`favicon`, `icon-180`, `icon-192`, `icon-512`) with the new square FEG Stage PRO badge supplied by the user.
- Replaced the main hero image on the standalone home screen with the new wide FEG Stage PRO artwork supplied by the user.
- No calculation, BOM, warehouse, reservations, PDF export, legacy/v3, backend write, responsive, scroll or theme logic was changed.

## v3.1.69 — Standalone shell cleanup and redundant nav removal

- Removed the standalone top shell/header strip (window dots + FEG Stage PRO title + Stage · Truss · LED caption) from the quick constructors shell.
- Removed the redundant lower constructor tab row inside the workspace; constructor switching now happens only through the main large Stage / Truss / LED tiles.
- Kept the relocated theme toggle in the launch tile row and kept truss load-indicator contrast improvements from v3.1.68.
- No calculation, BOM, warehouse, reservations, PDF export, legacy/v3, backend write, responsive or scroll logic was changed.

## v3.1.68 — Truss load indicator contrast + launch theme toggle

- Made the truss load indicator text fully opaque and contrast-safe in light theme.
- Removed the old top-right standalone action button cluster.
- Moved the theme switch into the main Stage / Truss / LED launch row as a narrow toggle to the right of LED.
- Kept calculations, BOM, warehouse, reservations, PDF export, legacy/v3 and backend writes unchanged.

## v3.1.67 — Light truss load modal inner surface fix

- Light-theme only: исправлен оставшийся тёмный фон внутри модалки проверки нагрузок ферм — legacy-блоки `block-load-section`, `block-load-grid` и `block-load-note` теперь получают светлые поверхности и читаемый контраст.
- Правка строго ограничена модалкой проверки нагрузок ферм и не меняет расчёты LoadChecker, BOM, PDF export, склад, responsive, scroll, legacy/v3 и backend writes.
- Dark theme остаётся дефолтом и fallback.

## v3.1.66 — Light theme final contrast and modal pass

- Light-theme only: отдельно дочищена модалка проверки нагрузки у ферм — сам `dialog`, form-card, поля, статусы, кнопки и inline-dark leftovers теперь переводятся в светлую поверхность.
- Light-theme only: усилен контраст добавленных LED-модулей в конструкторе — filled/active cabinets стали насыщеннее, с более явной рамкой, тенями и сохранением цветовой индикации конструкций.
- Light-theme only: усилен контраст добавленных модулей сцены — выбранные decking cells стали темнее и заметнее на светлой сетке; stairs получили более читаемую индикацию.
- Light-theme only: добавлены финальные safety-правила для SVG/text/canvas, чтобы подписи и контуры читались на светлом фоне и не перекрывались.
- Dark theme остаётся дефолтом и fallback; расчёты, BOM, PDF logic, склад, responsive, scroll, legacy/v3 и backend writes не трогались.

## v3.1.65 — Light theme contrast polish and darker truss artwork

- Light-theme only: отполирован общий контраст светлой темы после удаления тёмных фонов. Усилены текст, muted-текст, заголовки, поля, кнопки, active states, таблицы, status cards и load-индикаторы.
- Light-theme only: добавлен anti-overlap pass для сеток, карточек, action rows, кнопок, field labels и modal bodies: `min-width:0`, нормальные gaps, wrap/overflow-wrap и безопасный scroll внутри модальных тел.
- Light-theme only: ферменные конструкции сделаны заметно темнее на светлом фоне: прямые фермы, узлы, базы, labels и SVG-preview фермы получили более контрастные stroke/fill цвета.
- Dark theme остаётся дефолтом и fallback; расчёты, BOM, PDF logic, склад, responsive, scroll, legacy/v3 и backend writes не трогались.

## v3.1.64 — Light theme Stage/Truss surface cleanup

- Light-theme only: дочищены оставшиеся тёмные фоны в конструкторах сцены и ферм.
- Light-theme only: усилено покрытие для Stage/Truss control panels, template cards, control fields, zoom panels, canvas wrappers, stage grid, truss grid, truss library groups и load-check surfaces.
- Light-theme only: добавлены отдельные light overrides для stage cells, selected deck cells, truss grid cells, selected truss blocks и SVG leftovers внутри scene/truss canvas/preview.
- Dark theme остаётся дефолтом и fallback; расчёты, BOM, PDF logic, склад, responsive, scroll, legacy/v3 и backend writes не трогались.

## v3.1.63 — Light theme dark leftover cleanup

- Added a dedicated cleanup pass for remaining dark surfaces in light theme: standalone shell/topbar/sidebar, workspace tabs, constructor headers, PDF modal headers, zoom panels, canvas/work areas and older form/control rows.
- Added targeted light overrides for legacy inline dark `background` styles and SVG dark rect/path leftovers inside constructor/preview canvases.
- Light theme toggle from v3.1.62 is preserved; dark remains the default and fallback.
- No calculation, BOM, PDF export, warehouse, responsive, scroll, legacy/v3 or backend write logic was changed.

## v3.1.62 — Light theme launch controls

- Added controlled launch UI for the light theme: a topbar theme toggle that enables the light-theme gate, switches the app theme, and persists the choice safely.
- Extended `LightThemeShell` with production-facing helpers: `enableLight`, `disableLight`, `toggle`, `getTheme`, `refresh`, and launch-control sync.
- Light theme still does not turn on accidentally from stale state; it activates only through the explicit toggle/helper and remains reversible to the dark baseline.
- Dark theme remains the default fallback; calculations, BOM, PDF, warehouse, responsive, scroll, legacy/v3, and backend writes were not changed.

## v3.1.61 — Light theme deep surface pass

- Light-theme preview получил дополнительное покрытие старых inline/v4 поверхностей: readiness/auth/dashboard, warehouse, quick tiles/docs, BOM subsections, details/accordion, status cards and legacy project/order cards.
- Добавлены light overrides для активных/выбранных состояний, warn/bad/ok blocks, debug/doc output, old dark inline backgrounds and SVG dark rect leftovers.
- Dark theme remains the default; light mode is still gated and must be enabled explicitly for testing.
- No calculation, BOM, PDF export logic, warehouse logic, responsive contract, scroll, legacy/v3, or backend writes were changed.

## v3.1.60 — Light theme component coverage pass

- Light-theme preview expanded beyond the initial shell: standalone topbar/window, toasts, action rows, summary cards, chips, status badges, PDF/client preview surfaces, BOM/settings/subrent blocks, SVG text and truss artwork colors now have light-mode overrides.
- Added `window.FEG_LIGHT_THEME_SHELL.audit()` dev helper to scan the current light preview for dark-background leftovers and low-contrast hints.
- Dark theme remains the default; light mode is still gated and must be enabled explicitly for testing.
- No calculation, BOM, PDF export logic, warehouse, responsive contract, scroll, legacy/v3, or backend writes were changed.

## v3.1.59 — Light theme shell preview

- Добавлен первый gated `LightThemeShell`: светлая тема теперь имеет безопасный late-layer shell для фона, карточек, текста, borders, input/select/textarea, кнопок, модалок, таблиц, canvas/workspace зон Stage/Truss/LED и базовых active/status states.
- Dark остаётся дефолтом и не меняется; light включается только явно через feature gate.
- Добавлен dev/runtime helper `window.FEG_LIGHT_THEME_SHELL`: `enableLight()` / `disableLight()` / `refresh()` для локальной проверки светлой темы без добавления новой UI-кнопки.
- Standalone dark guard и mobile dark parity сохранены: при dark они держат текущий baseline, при active light снимают свои dark-overrides.
- Расчёты, BOM, PDF, склад, responsive, scroll, legacy/v3 и backend writes не трогались.

## v3.1.58 — Theme guard startup freeze fix

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
- Причина: часть constructor-grid правил уже держала desktop/tablet contract от `768px`, но сами рабочие поверхности всё ещё сжимались через `max-width: calc(100vw - ...)`, поэтому на ширине планшета появлялась узкая сломанная desktop-компоновка.
- Для диапазона `768–1179px` зафиксирована единая desktop-поверхность `1280px` с горизонтальным viewport scroll вместо перестройки интерфейса.
- Stage/Truss/LED получают стабильную desktop-сетку на планшетных ширинах; mobile остаётся только `<=767px`.
- Mobile-визуал v3.1.51, desktop-scroll v3.1.52 и unified breakpoint contract v3.1.53 сохранены; расчёты, BOM, PDF, склад, legacy/v3 и backend writes не трогались.

## v3.1.53 — Unified tablet/desktop breakpoint contract

- Responsive contract simplified: mobile layout now turns on only at `max-width: 767px`; tablet/narrow browser widths from `768px` keep the desktop interface instead of switching through intermediate layouts.
- Disabled the old hybrid tablet/pre-desktop breakpoints (`860/900/1024/1179/1180`) that caused multiple visual jumps while narrowing the browser window.
- Mobile-only runtime layers (`StandaloneMobileFieldPolish`, `StandaloneMobileStageUiTuning`, `MobileDarkUiParity`) no longer activate on tablets just because of `pointer: coarse`; they activate only on true mobile width.
- Stage responsive DOM reordering now happens only in mobile width, so tablet/narrow desktop keeps desktop order.
- Calculations, BOM, PDF, warehouse, legacy/v3 and backend writes were not changed.

## v3.1.52 — Desktop native scroll restore

- Desktop-only: найден и отключён старый wheel-bridge, который в capture-режиме с `passive:false` перехватывал каждое колесо мыши, вручную вызывал `window.scrollBy()` и мог делать desktop-скролл дёрганым/медленным.
- Desktop-only: desktop-страницы возвращены на нативный browser scroll/momentum; runtime-scroll контейнеры нормализованы так, чтобы не создавать лишний внутренний scroll поверх основного page scroll.
- Mobile `max-width:767px` визуальные правила не менялись; визуальный baseline v3.1.51 сохранён. Расчёты, BOM, PDF, склад, legacy/v3 и backend writes не трогались.

## v3.1.51 — Mobile truss library area expansion

- Mobile-only: раскрыта область библиотеки ферм в standalone mobile-конструкторе, чтобы секции `Прямые фермы / 2D узлы / 3D узлы` показывали всё содержимое без внутреннего обрезания.
- Mobile-only: снято жёсткое ограничение по высоте у `.v4-truss-library`, поэтому блок больше не живёт в маленьком внутреннем scroll-контейнере и раскрывается по содержимому.
- Mobile-only: компактная композиция v3.1.50 сохранена; desktop media-зоны не менялись, расчёты/BOM/PDF/склад/legacy-v3/backend writes не трогались.

## v3.1.50 — Mobile truss library composition fit

- Mobile-only: компоновка библиотечных блоков `Прямые фермы / 2D узлы / 3D узлы` приведена к более компактному виду, чтобы кнопки помещались в секции так же, как на согласованном референсе.
- Mobile-only: для библиотечных секций зафиксирована четырёхколоночная сетка, уменьшены paddings header, group mark, badge и сами кнопки, чтобы элементы не выглядели слишком крупно и не распирали блоки.
- Mobile-only: сохранены desktop-перенесённые принципы — спокойный active header, более явный selected button и пробел между иконкой и числом у прямых ферм.
- Desktop media-зоны не менялись; расчёты, BOM, PDF, склад, legacy/v3 и backend writes не трогались.

## v3.1.49 — Mobile truss library size rebalance

- Mobile-only: блоки `Прямые фермы / 2D узлы / 3D узлы` в standalone mobile-конструкторе переведены на более плотный, но читаемый размер, чтобы в экран помещалось больше кнопок без потери читаемости.
- Mobile-only: грид библиотеки переведён на adaptive `auto-fit` с меньшим минимальным размером карточек, поэтому на типичной ширине телефона блоки раскладываются компактнее и ритм секций стал ровнее.
- Mobile-only: уменьшены header paddings, badge/group mark и размеры кнопок библиотеки; для прямых ферм сохранён читаемый отступ между иконкой и цифрой.
- Desktop media-зоны не менялись; расчёты, BOM, PDF, склад, legacy/v3 и backend writes не трогались.

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

- В LED-конструкторе восстановлена активная подсветка выбранной конструкции в блоке `Active construction`.
- Возвращена цветовая индикация добавленных LED-конструкций в списке этого же блока.
- Добавлен компактный активный индикатор с цветовой точкой, названием и количеством кабинетов.
- Состояние выбора синхронизируется через `active/is-active`, `aria-pressed` и `data-active-color`.
- Правка внесена через shared LED render/state и `styles/led.css`, без локального CSS-костыля.
- Расчёты, PDF, BOM и quick catalog не менялись.

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

## v3.1.14 — Stage mobile usability polish

- Доработана мобильная сетка Stage по фактическому скриншоту: уменьшены подписи/значения, убраны обрезания в select, выровнен scale-блок.
- Для Stage select использованы компактные отображаемые подписи без изменения ключей и расчётов.
- `По размеру / Центр / auto-fit` закреплены в одной строке; подпись и проценты масштаба скрыты.
- Пресеты Stage закреплены в 2-колоночной сетке, последний пресет растягивается на строку.
- Canvas Stage получил более удобную высоту на mobile.
- Правки выполнены через shared control layer `styles/controls.css`, без локальных inline-костылей.



## v3.1.10 — Stage mobile structural flow

- Пересобрана мобильная сетка Stage сверху вниз по утверждённой логике: build → dimensions → closure → pricing → scale → tools → presets → canvas.
- Поля Stage получили явные shared-классы, чтобы управление шрифтами/сеткой шло через общий `styles/controls.css`.
- Preset-кнопки сцены переведены на нормальные inline-иконки и двухколоночную мобильную сетку.
- Сохранено правило: визуальные изменения делаются через общие стили и shared-классы, без локальных костылей под отдельный блок.
## v3.1.9 — Stage mobile control flow

- Пересобрана мобильная форма сцены сверху вниз по заданному порядку: параметры, разделители, размеры, закрытие торцов, быстрые цены, масштаб, построение, пресеты, canvas.
- Уменьшены подписи и значения внутри controls.
- Scale-блок сцены приведён к двухрядной схеме: `− / slider / +`, затем `По размеру / Центр / auto-fit`.
- Убран индикатор процентов масштаба поля в mobile.
- Пресеты сцены сгруппированы в две колонки с иконками.
- Правки внесены через shared CSS и семантические классы, без новых локальных runtime-костылей.
- Расчёты/BOM/PDF/catalog/drafts не менялись.


## v3.1.9 — Global compact controls rhythm

- Уменьшен общий размер шрифта и высота controls через `styles/controls.css`.
- Поля, select, checkbox, кнопки и zoom/scale панели приведены к единому компактному ритму.
- Добавлено правило разработки: визуальные правки делать через глобальные стили, без локальных костылей под один блок.
- Логика расчётов, BOM, PDF, quick catalog и drafts не менялась.


## v3.1.9 — unified controls visual system

- Добавлен общий слой `styles/controls.css` для компактных полей, select, input, checkbox, кнопок и scale/zoom блоков.
- Stage / Truss / LED получают единый стиль элементов управления, без локального костыля под отдельный экран.
- Мобильная сцена приведена ближе к утверждённому compact UI: подписи слева, поля справа, размеры в трёх компактных колонках.
- Масштаб поля сцены поднят к основным параметрам.
- Расчёты, BOM, PDF, drafts и quick catalog не менялись.

# 3.1.6 — clean standalone workspace, truss load placement, scroll/artwork fix

- Убраны лишние служебные заголовки и технические подсказки из standalone Stage workspace.
- Перенесён индикатор проверки нагрузок ферм в блок масштаба поля: слева на desktop, ниже регулятора/кнопок на mobile.
- Восстановлена desktop-прокрутка standalone-страницы без отката мобильного scroll-fix.
- Уменьшена фактическая картинка FEG v3.0 в верхнем блоке и переведена в contain, без обрезки.

## v3.1.4 — no sidebar + mobile scroll fix

- Убрана левая standalone-колонка на desktop.
- Навигация оставлена через Stage / Truss / LED.
- Усилен mobile vertical scroll unlock без изменения расчётной логики.

## v3.1.2 — Desktop stretch and mobile scroll fix

- Desktop standalone workspace now stretches to the full application window instead of staying in a narrow left column.
- Constructor hero/cards/workspace width constraints are overridden after legacy V4 styles load.
- Mobile page-level vertical scrolling is restored; the standalone window no longer clips the page content.
- Core calculations, BOM, quick catalog and PDF logic were not changed.

## v3.1.1 — Standalone visual match pass

- Пересобран standalone app shell в стиле premium workstation: левый sidebar, верхний top bar, цельная рабочая область.
- Главный экран приведён к референсу: hero banner, 3 карточки конструкторов, нижний workspace с вкладками Stage / Truss / LED.
- Быстрые конструкторы теперь открываются во встроенной рабочей области вместо отдельной модалки по умолчанию.
- Доработаны визуальные стили панелей, карточек, вкладок, таблиц, метрик и рабочего canvas.
- Mobile layout визуально уплотнён и приближен к утверждённому mockup.

# Changelog

## v3.1.0 — Logic UI Rebuild

### Added
- Полный rebuild UI-слоя standalone-приложения по Logic Pro inspired UI Kit.
- Единая тёмная цветовая система через CSS variables.
- Единые компоненты кнопок, полей, карточек, панелей и таблиц.
- Новый clean app shell для standalone quick constructors.
- Новый responsive layout для Stage / Truss / LED.
- Улучшенная mobile-компоновка в одну колонку.
- Обновлённая визуальная система для canvas, scale panel и build toolbar.

### Changed
- Убрана видимая мешанина из временных UI-hotfix слоёв через единый поздний CSS-слой.
- Desktop и mobile layout разделены и больше не конфликтуют.
- Стартовый экран приведён к чистому виду: hero image + 3 конструктора.
- PDF-модалка визуально приведена к общей тёмной теме.
- Stage toolbar получил компактную кнопку «Очистить» рядом с режимами построения.

### Preserved
- Расчёты Stage / Truss / LED.
- BOM / shared BOM / contract snapshot.
- PDF export.
- Local drafts.
- Safari dark hotfix.
- Stage touch drawing.
- Truss stool U012 hotfix.
- LED hanging / power / fasteners logic.


## v3.0.2 — Mobile Field Polish

- Наведён порядок в мобильном отображении быстрых конструкторов Stage / Truss / LED.
- Окна конструкторов ограничены шириной экрана телефона без горизонтального развала интерфейса.
- Поля построения Stage и Truss автоматически центрируются и не создают лишнюю пустую зону справа.
- Панели настроек и кнопки стали компактнее и удобнее для полевой работы с телефона.
- Расчёты, BOM, PDF, quick-логика, Safari dark theme и hotfix табуретки U012 не менялись.


## v3.0.0 — FEG Stage PRO 3.0

### Added

- standalone-версия быстрых конструкторов Stage / Truss / LED;
- обновлённая релизная карточка **FEG Stage PRO 3.0** на титульном экране;
- чистый стартовый экран с тремя плитками: **Сцена / Фермы / LED Экраны**;
- мобильная field-адаптация для работы с телефона;
- ручной zoom для конструкторов Сцены и LED;
- auto-fit для конструкторов Сцены и LED;
- кнопки центрирования для Сцены и LED;
- автоцентрирование после добавления шаблонов Сцены и LED;
- обновлённый `manifest.json` для PWA-режима версии 3.0;
- релизные иконки на базе нового изображения PRO 3.0.

### Changed

- быстрые конструкторы вынесены в отдельное приложение без запуска основного app shell;
- титульная страница очищена от служебных подписей, дополнительных кнопок и технических блоков;
- подписи обновлены под релиз **FEG Stage PRO 3.0**;
- кнопка LED на стартовом экране переименована в **LED Экраны**;
- desktop/mobile layout стартового экрана адаптирован под размещение релизной картинки над кнопками;
- документация обновлена под релиз 3.0.

### Preserved

- сохранён внешний вид самих быстрых конструкторов;
- сохранена исходная логика расчётов Stage / Truss / LED;
- сохранены BOM, техлисты, складские листы и unified export;
- сохранён quick pricing;
- сохранён PDF-экспорт v3.17.54: чистые строки без технических кодов и автоориентация;
- сохранено локальное восстановление последних конфигураций.

### Removed from standalone launch

- основной app shell;
- авторизация;
- сметчик;
- складские движения;
- backend/Supabase;
- проектные разделы, не относящиеся к быстрым конструкторам.

## v3.0.1 — Mobile dark UI parity

### Changed
- Мобильный интерфейс приведён к цветовой схеме desktop/V4: тёмные панели, тёмные поля, тёмные таблицы и контрастный светлый текст.
- Для мобильных модалок быстрых конструкторов закреплена единая палитра `desktop-v4-compact-dark`.
- Затемнены мобильные панели Stage / Truss / LED, canvas-зоны, таблицы, BOM, PDF-модалка и элементы управления.

### Preserved
- Расчёты, BOM, PDF-экспорт, quick pricing, zoom/auto-fit и логика конструкторов не изменялись.

### Hotfix 3.0 mobile dark UI
- Исправлен зависон на титульном экране: мобильный dark-ui слой больше не конфликтует с `V4DesignSystem` через `MutationObserver` в `<head>`.
- Кнопки выбора конструкторов снова загружаются сразу после титульной картинки.


## v3.0.1 — Truss stool U012 hotfix

### Fixed
- Шаблон «Табуретка» в быстром конструкторе ферм снова использует `U012` по умолчанию для четырёх углов.
- Убран fallback quick-режима на `U022` при построении табуретки в standalone-версии.

## v3.0.1 — Safari desktop dark UI hotfix

### Fixed
- Исправлена ситуация, когда в Safari на ноутбуке standalone-версия могла подхватить старую светлую тему из `localStorage` и открыть конструкторы со светлым фоном и неконтрастным текстом.
- Добавлен `StandaloneDarkThemeLock.js`, который принудительно удерживает standalone quick constructors в тёмной V4-палитре на всех браузерах и разрешениях.
- Добавлен ранний сброс `appTheme` в `dark` до загрузки `AppSettings`, чтобы светлая тема не успевала примениться при старте.

### Preserved
- Логика Stage / Truss / LED, BOM, PDF, zoom/auto-fit и исправление табуретки U012 не менялись.

## v3.0.4 — Mobile Safe Rollback Hotfix

### Fixed
- Откат проблемного мобильного слоя 3.0.3, из-за которого приложение могло зависать и не реагировать на нажатия.
- `StandaloneMobileFieldPolish.js` переведён в безопасный CSS-only режим без `MutationObserver` и DOM-перестроек.
- Сохранены тёмная тема, Safari dark hotfix и правка табуретки U012.

### Preserved
- Расчёты, BOM, PDF-экспорт, quick-конструкторы и база quick ideal catalog не менялись.

## v3.0.5 — Mobile UI usability fix

### Fixed
- Исправлена мобильная раскладка быстрых конструкторов Stage / Truss / LED.
- Усилены mobile CSS-селекторы, чтобы они корректно перебивали desktop-правила `V4DesignSystem` на телефонах.
- Убрано горизонтальное расползание модальных окон и рабочих областей.
- Конструктор ферм переведён на телефоне в одну колонку: библиотека, инструменты, масштаб и поле больше не стоят рядом.
- Конструктор сцены переведён на телефоне в одну колонку: панель масштаба больше не уезжает вправо.
- Поля Stage / Truss / LED центрируются после открытия, добавления шаблонов, zoom/fit и поворота экрана.

### Preserved
- Расчёты, BOM, PDF-экспорт, quick ideal catalog, Safari dark hotfix и шаблон табуретки U012 не менялись.


## v3.0.6 — Stage mobile UI tuning

- Mobile-only polish for the quick Stage constructor.
- Compact horizontal rows for deck/support, dimensions, edge closure and quick pricing.
- Stage build controls moved below the constructor field on mobile.
- Stage summary cards compacted into three columns.
- Technical Stage bridge notes hidden on mobile.
- Desktop UI, calculations, BOM and PDF export are unchanged.


## v3.0.7 — Stage mobile UI hotfix
- Исправлено мобильное отображение блока масштаба сцены: шкала, «По размеру», «Центр» и «Авто» больше не заезжают друг на друга.
- Восстановлено рисование пальцем/мышкой в мобильном поле сцены.
- На мобильном скрыты технические подсказки «Связь столб/перекладина» и «Stage BOM bridge».
- ПК-отображение, расчёты, BOM и PDF не менялись.

## v3.0.8 — Stage mobile touch-drag hotfix

### Fixed
- Исправлено рисование сцены пальцем на мобильных браузерах: протяжка по сетке снова закрашивает все клетки по траектории, а не только первую.
- Поправлена мобильная раскладка блока «Масштаб поля»: шкала занимает нормальную ширину, а кнопки «По размеру», «Центр» и «Авто» больше не заезжают друг на друга.

### Preserved
- ПК-версия не изменялась.
- Расчёты, BOM, PDF-экспорт, quick catalog и логика конструкторов не менялись.

## v3.0.9 — Stage mobile build toolbar hotfix

### Fixed
- Mobile-only Stage constructor: compacted the `Блок построения` label.
- Mobile-only Stage constructor: widened and stabilized `Настил / Лестница / Очистить` buttons so labels stay on one line.
- Desktop layout, calculations, BOM and PDF export are unchanged.