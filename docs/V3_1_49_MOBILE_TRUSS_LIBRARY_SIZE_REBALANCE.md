## v3.1.49 — Mobile truss library size rebalance

Что сделано:

- Сохранён standalone mobile scope из v3.1.48 для библиотеки ферм: `.v4-structure-truss .v4-truss-library`.
- Перенастроен размер мобильных group header и library buttons, чтобы блок занимал меньше вертикального места, но оставался читаемым.
- Сетка кнопок переведена на adaptive `repeat(auto-fit, minmax(...))`, чтобы на обычной ширине телефона вмещалось больше элементов в строке.
- Для узких экранов добавлен дополнительный mobile breakpoint с ещё более компактным `minmax`, без вмешательства в desktop scope.
- Состояния active/is-active, цветовая индикация и отступ между иконкой и числом у прямых ферм сохранены.

Что не менялось:

- Desktop layout
- Расчёты и бизнес-логика
- BOM / PDF / склад / legacy-v3 / backend writes
