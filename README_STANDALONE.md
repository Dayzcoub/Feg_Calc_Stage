# FEG Quick Constructors Standalone v3.17.54

Изолированная standalone-версия быстрых конструкторов Stage / Truss / LED из `feg_3_17_54_quick_pdf_clean_auto_orientation`.

## Что сохранено из исходного проекта

- Быстрый выбор конструктора: сцена, фермы, LED экран.
- Исходные модули быстрых расчётов и визуальных конфигураторов.
- Quick pricing v3.17.53: прокат/модули + монтаж + доставка.
- Quick PDF v3.17.54: чистые строки без технических кодов и автоориентация страницы.
- Техлисты, складские листы, unified BOM/JSON/contract snapshot.
- Локальное сохранение последних quick draft-состояний в `localStorage`.

## Запуск

Можно открыть `index.html` напрямую в браузере. Для более стабильной работы PDF и PWA-режима лучше запустить локальный сервер:

```bash
python3 -m http.server 8080
```

и открыть `http://localhost:8080`.

## Границы изоляции

Эта сборка не запускает основной app shell, авторизацию, сметчик, складские движения, backend/Supabase, проекты и роли. Внутри оставлены только модули, которые нужны быстрым конструкторам, техлистам, unified BOM и quick PDF.

PDF использует те же внешние библиотеки CDN, что и исходный проект: `jsPDF` и `html2canvas`. Если открыть без интернета, конструкторы будут работать, но скачивание PDF может быть недоступно до подключения этих библиотек.

## Mobile Field edition

Эта сборка оставляет исходные быстрые конструкторы v3.17.54 и PDF-экспорт без изменения расчётной логики.
Поверх standalone-оболочки добавлены только мобильные CSS-правила: полноэкранные модалки, крупные тач-кнопки, адаптивные панели, скролл холстов и таблиц на телефонах.

## Mobile field update — Stage/LED canvas zoom

This standalone build keeps the v3.17.54 quick constructor logic and adds mobile canvas controls for Stage and LED:

- manual zoom slider with − / + buttons;
- auto-fit based on the current amount of blocks/cabinets;
- one-tap centering of the current scheme;
- automatic centering after Stage/LED templates are inserted;
- zoom state is preserved in quick drafts together with the constructor input.

Calculations, BOM rows, PDF export and quick pricing logic are unchanged.
