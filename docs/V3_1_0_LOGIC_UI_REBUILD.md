# v3.1.0 — Logic UI Rebuild

Полный UI rebuild standalone-приложения FEG Stage PRO по утверждённому Logic Pro inspired UI Kit.

## Что изменено

- Добавлен чистый UI-слой `styles/` с дизайн-токенами, базовой темой, компонентами, shell/layout-слоем, constructor styles и PDF preview styles.
- Добавлен безопасный runtime `src/ui/LogicUiRuntime.js`, который фиксирует standalone dark mode, маркирует frame конструктора и синхронизирует UI закрытия торцов без изменения расчётов.
- Стартовый экран очищен до hero image + 3 конструктора: Сцена, Фермы, LED Экраны.
- Desktop layout приведён к workstation-логике: плотные панели, крупные canvas-зоны, единые карточки и таблицы.
- Mobile layout переведён в одну колонку с защитой от горизонтального overflow.
- Stage mobile controls упорядочены: тип настила/столбов, перекладина, размеры, закрытие торцов, pricing, presets, scale, canvas, toolbar, results.
- Stage build toolbar получил компактную кнопку `Очистить` в рабочей строке рядом с режимами построения.
- Truss mobile layout разделяет шаблоны, библиотеку, инструменты, масштаб и поле конструктора по вертикали.
- LED mobile layout сохранён и приведён к общей тёмной системе.
- PDF modal получил тёмную визуальную оболочку, не меняя механизм jsPDF/html2canvas.

## Что сохранено

- Расчёты Stage / Truss / LED.
- BOM / shared BOM / contract snapshot.
- PDF export core.
- Local drafts и ключи localStorage.
- Stage touch drawing.
- Truss block construction и stool U012 default.
- LED cabinet layout, hanging/standing, PowerCON, hanging bars, крепёж.
- Standalone без backend-зависимости.

## Файлы UI-слоя

- `styles/tokens.css`
- `styles/base.css`
- `styles/components.css`
- `styles/app-shell.css`
- `styles/constructors.css`
- `styles/stage.css`
- `styles/truss.css`
- `styles/led.css`
- `styles/desktop.css`
- `styles/mobile.css`
- `styles/print-pdf-preview.css`
- `src/ui/LogicUiRuntime.js`

## Проверки

- JS syntax checks для `src/modules/*.js`, `src/modules/visual/*.js`, `src/ui/*.js`, `src/ui/components/*.js`, `src/ui/constructors/*.js`.
- JSON parse для `manifest.json`.
- Smoke check локального HTTP-сервера.
- `unzip -t` итогового архива.
