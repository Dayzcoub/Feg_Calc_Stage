# v3.17.52 — Quick Truss delivery pricing

Добавлена ручная стоимость доставки в быстрый конструктор ферм.

## Что изменено

- В quick Truss добавлено поле `Доставка, ₽`.
- Значение по умолчанию: `4000 ₽`.
- Поле работает только в quick-режиме и скрывается в quote-режиме.
- Доставка добавляется в `section.quickPricing` через общий helper `QuickPricing.js`.
- Для ферм коммерческий слой содержит только строку доставки, без цены за ферменные блоки и без монтажа.
- Строка доставки отображается в quick-сводке и quick PDF.
- Коммерческая строка маркируется как `quick_manual_price` и не попадает в складской BOM / warehouse rows.
- Видимость сохраняет тот же guard: `quick_pricing:view` / `prices:view`, скрытие для `prices:hidden`.

## Контракт данных

```js
section.quickPricing = {
  kind: 'truss',
  visible: true,
  deliveryCost: 4000,
  total: 4000,
  rows: [
    {
      code: 'TRUSS-QPRICE-DELIVERY',
      name: 'Фермы · доставка',
      sourceType: 'quick_manual_price',
      commercial: true,
      visibility: {
        permission: 'quick_pricing:view',
        hiddenForPermissions: ['prices:hidden'],
        hideFromTechSheets: true,
        hideFromWarehouse: true,
        uiOnly: true
      }
    }
  ]
}
```

## Не менялось

- Расчёт ферм.
- LoadChecker.
- BOM ферм.
- Прокатная стоимость ферм.
- Quick/quote разделение каталогов.
- Сметчик, склад, резервы и backend writes.
