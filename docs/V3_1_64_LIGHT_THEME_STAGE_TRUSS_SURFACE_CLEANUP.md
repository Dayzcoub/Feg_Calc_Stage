# v3.1.64 — Light theme Stage/Truss surface cleanup

## Цель

Продолжить очистку светлой темы после v3.1.63: в сцене и фермах ещё оставались тёмные поверхности из поздних global/runtime CSS-слоёв.

## Что сделано

- Добавлен focused cleanup-pass в `LightThemeShell.js` только для `theme-light`.
- Дочищены поверхности сцены и ферм:
  - `v4-stage-template-panel`;
  - `v4-truss-template-panel`;
  - `v4-truss-template-card`;
  - control fields / labels / checkboxes;
  - zoom panels;
  - stage canvas wrapper and visual grid;
  - truss field wrapper and field grid;
  - truss library groups and active selected buttons;
  - truss load-check block;
  - stage/truss SVG leftovers.
- Для сценических клеток добавлены отдельные светлые состояния: normal / hover / selected / stair.
- Для ферменного поля добавлены отдельные светлые состояния: grid cell / hover / selected block.
- Добавлена страховка против тёмных inline `background` внутри stage/truss surfaces.

## Что не менялось

- Dark theme baseline.
- Расчёты.
- BOM.
- PDF export logic.
- Склад.
- Responsive contract.
- Scroll.
- Legacy/v3.
- Backend writes.
