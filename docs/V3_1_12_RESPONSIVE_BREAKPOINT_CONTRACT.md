# v3.1.12 — Responsive breakpoint contract

Цель: убрать каскад из 4 визуальных переключений при изменении ширины окна и оставить понятную схему адаптива.

Фиксированные состояния:

- Mobile: `<= 767px` — компактная мобильная сетка Stage.
- Tablet / narrow desktop: `768–1179px` — та же логика расположения, но шире и спокойнее.
- Desktop: `>= 1180px` — полноценный desktop layout.

Что сделано:

- добавлен `styles/breakpoints.css` как последний авторитетный слой responsive-стилей;
- старый runtime CSS в `LogicUiRuntime.js` упрощён: он больше не задаёт визуальные breakpoint-сетки, а отвечает только за scroll stability и обязательное скрытие sidebar;
- Stage mobile/tablet/desktop получили явно разведённые сетки;
- no-sidebar правило сохранено глобально;
- расчёты, BOM, PDF, localStorage drafts и логика конструкторов не менялись.
