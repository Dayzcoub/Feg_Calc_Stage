## v3.1.53 — Unified tablet/desktop breakpoint contract

Цель:

- Убрать “чихарду” интерфейса при сужении окна браузера.
- Оставить desktop-интерфейс на планшетных/узких desktop-ширинах.
- Включать mobile-интерфейс только на реальной мобильной ширине.

Новый контракт:

- `<= 767px` — mobile layout.
- `>= 768px` — desktop/tablet desktop surface.
- Промежуточные tablet/pre-desktop layout-переключения отключены.

Что изменено:

- В `styles/breakpoints.css` tablet/pre-desktop mobile-like правила переведены на mobile-only, desktop rules продвинуты на `min-width: 768px`.
- Для `768–1179px` добавлен стабильный desktop-surface режим: интерфейс держит desktop-ширину и не перестраивается через несколько промежуточных layout-состояний.
- Runtime mobile modules больше не используют `(pointer: coarse) and (max-width: 1024px)` и `(max-width: 860px)`, чтобы планшеты и узкие desktop-окна не попадали в mobile слой.
- Stage DOM reorder теперь выполняется только при `max-width: 767px`.

Что не менялось:

- Расчёты
- BOM
- PDF/export
- Склад / резервы
- legacy/v3
- backend writes
