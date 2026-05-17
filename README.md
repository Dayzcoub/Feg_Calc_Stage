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

# FEG Stage PRO 3.1.2

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

и открыть:

```text
http://localhost:8080
```

## PDF

PDF использует тот же механизм, что и исходный проект: `jsPDF + html2canvas` через CDN. Если открыть сборку без интернета, конструкторы будут работать, но PDF может быть недоступен до подключения библиотек.


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

