# v3.1.14 — Stage mobile tool order + centered constructor field

Изменения:

- В mobile/tablet/pre-desktop Stage блок кнопок `Настил / Лестница / Очистить` переносится ниже поля конструктора.
- Desktop `>=1180px` сохраняет предыдущую раскладку v3.1.13.
- Поле конструктора Stage центрируется внутри `v4-stage-canvas-wrap`, чтобы построенные шаблоны визуально были по центру выводимой области.
- Добавлена responsive-синхронизация порядка блока инструментов при resize/visualViewport resize.

Не менялось:

- расчёты;
- BOM;
- PDF;
- quick catalog;
- draft/localStorage;
- склад/back-end логика.
