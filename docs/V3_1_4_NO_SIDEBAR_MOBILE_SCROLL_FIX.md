# v3.1.4 — no sidebar + mobile scroll fix

Изменено только визуально:

- полностью убрана левая desktop-колонка с проектами, библиотекой и единицами измерения;
- standalone layout переведён в одну рабочую колонку;
- навигация оставлена через карточки и вкладки `Сцена / Фермы / LED Экраны`;
- усилен mobile scroll unlock: сняты конфликтующие ограничения `height`, `max-height`, `overflow` у page/window/main/workspace контейнеров;
- для страницы восстановлен естественный vertical scroll, при этом touch drawing внутри canvas/grid оставлен.

Не менялось:

- расчёты;
- BOM;
- PDF;
- quick catalog;
- localStorage drafts;
- логика Stage / Truss / LED.
