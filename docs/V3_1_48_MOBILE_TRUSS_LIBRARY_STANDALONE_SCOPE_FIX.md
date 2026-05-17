## v3.1.48 — Mobile truss library standalone scope fix

- Mobile-only: найдено, почему стиль библиотеки ферм не применялся — поздний mobile parity selector был привязан к `.v4-quick-modal-body`, а текущий standalone mobile-конструктор рендерит фермы прямо внутри `#quickStandaloneMount/.standalone-mount`.
- Mobile-only: late-layer правила библиотеки `Прямые фермы / 2D узлы / 3D узлы` перенесены на фактический scope `.v4-structure-truss .v4-truss-library` в mobile media-scope StandaloneMobileFieldPolish.
- Mobile-only: сохранены правки модалки проверки нагрузок, пробел между иконкой и числом у прямых ферм, спокойный active header и более явный selected button.
- Desktop media-зоны не менялись; расчёты, BOM, PDF, склад, legacy/v3 и backend writes не трогались.

Что сделано:
- в desktop-версии ферм блоки `Портал / рама`, `Табуретка` и `Стоимость монтажа и доставки` перенесены в верхнюю горизонтальную панель над окном конструктора;
- верхняя панель растягивается на весь desktop-workstation контейнер и сохраняет читаемые поля/кнопки;
- библиотека построения ферм, 2D-узлов и 3D-узлов остаётся слева от окна конструктора вместе с инструментами редактирования;
- обновлён существующий desktop workstation layout в `@media (min-width: 1180px)`, без добавления mobile/tablet правок.

Ограничение:
- mobile/tablet baseline не затрагивался;
- расчёты, BOM, склад, резервы, PDF-логика, legacy/v3 и backend writes не менялись.