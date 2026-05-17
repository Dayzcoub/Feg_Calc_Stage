# v3.1.79 — Launch transparent image icon set

Основа: принятый baseline v3.1.75.

Изменено только на главном экране standalone quick constructors:
- кнопка «Сцена» использует прозрачный PNG `assets/launch-stage-icon.png`;
- кнопка «Фермы» использует прозрачный PNG `assets/launch-truss-icon.png`;
- кнопка «LED Экраны» переведена на прозрачный PNG `assets/launch-led-icon.png`;
- общий класс `feg-launch-icon--image` держит image-based иконки без собственной подложки, рамки и CSS-рисунка;
- фон и состояние кнопок остаются системными и продолжают переключаться вместе с темой приложения.

Не менялось:
- расчёты;
- BOM;
- склад и резервы;
- PDF export logic;
- legacy/v3;
- backend writes;
- бизнес-логика конструкторов;
- dark fallback;
- responsive contract `<=767px mobile`, `>=768px desktop`;
- desktop native scroll.
