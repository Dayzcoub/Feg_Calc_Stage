## v3.1.23 — Stage desktop workstation layout pass

- Desktop-сцена перестроена из растянутой верхней полосы в workstation-компоновку: слева управление, по центру поле конструктора, справа ключевые метрики.
- Детальные BOM/ценовые таблицы вынесены в широкий нижний ряд.
- Блок масштаба, режим построения и пресеты теперь живут внутри левой панели управления.
- Поле конструктора центрирует сетку по вертикали и горизонтали внутри рабочей зоны.
- Для desktop 1180–1500 px добавлен двухколоночный fallback: управление + поле, метрики и таблицы ниже.
- Расчёты, BOM, PDF, quick pricing и складская логика не менялись.

## v3.1.18 — Truss mobile viewport/button correction

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
