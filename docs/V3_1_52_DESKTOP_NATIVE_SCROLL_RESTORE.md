## v3.1.52 — Desktop native scroll restore

Причина:

- В `LogicUiRuntime` оставался старый desktop wheel-bridge.
- Он ставил `document.addEventListener('wheel', ..., { capture:true, passive:false })`, вручную вызывал `window.scrollBy()` и затем гасил событие через `preventDefault()` / `stopImmediatePropagation()`.
- После UI/page-scroll rebuild такой мост начал спорить с нативным скроллом браузера и мог давать медленную, дёрганую прокрутку на desktop.

Что сделано:

- `enableDesktopWheelScrollBridge()` переведён в safe no-op, чтобы старый тяжёлый listener больше не устанавливался.
- Desktop-scroll теперь использует нативную прокрутку браузера.
- Runtime desktop-scroll контейнеры нормализованы: основной page scroll остаётся единственным управляющим scroll-слоем, без лишних внутренних scroll-обёрток на уровне shell/mount/workspace.

Что не менялось:

- Mobile visual baseline v3.1.51.
- Mobile `max-width:767px` визуальные правила.
- Расчёты, BOM, PDF, склад, legacy/v3 и backend writes.
