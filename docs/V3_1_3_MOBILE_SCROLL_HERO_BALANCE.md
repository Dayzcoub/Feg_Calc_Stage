# v3.1.3 — mobile scroll unlock + home hero balance

Что изменено:
- усилена разблокировка вертикальной прокрутки в mobile standalone shell;
- для мобильного режима сняты конфликтующие ограничения по overflow/height у page/window/main/mount/workspace контейнеров;
- standalone window на mobile переведён в flex-column с естественной высотой контента;
- добавлен touch-friendly overflow для страницы и рабочей области;
- главный hero-banner на home уменьшен, чтобы не доминировал над tiles и рабочей областью;
- высоты hero/tile карточек сбалансированы для desktop и mobile.

Что не менялось:
- расчёты;
- BOM / PDF / складская логика;
- логика конструкторов stage / truss / led.
