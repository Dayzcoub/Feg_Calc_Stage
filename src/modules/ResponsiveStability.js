(function () {
  'use strict';

  const ROOT = (window.FEGModules = window.FEGModules || {});
  const STYLE_ID = 'feg-responsive-stability';

  const css = `
/* v3.1.91 - responsive stability, without rewriting constructor internals.
   The page stays viewport-bound; editors keep their own native layout and
   wide technical surfaces scroll inside their own frames. */
html,
body.v4-only-body.quick-standalone-body,
body.v4-only-body.quick-standalone-body.quick-standalone-ready {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0 !important;
  overflow-x: hidden !important;
}

body.v4-only-body.quick-standalone-body #quickStandalonePage,
body.v4-only-body.quick-standalone-body .standalone-window,
body.v4-only-body.quick-standalone-body .standalone-body,
body.v4-only-body.quick-standalone-body .standalone-main,
body.v4-only-body.quick-standalone-body #quickStandaloneMount,
body.v4-only-body.quick-standalone-body .standalone-mount,
body.v4-only-body.quick-standalone-body .feg-dashboard,
body.v4-only-body.quick-standalone-body .feg-dashboard-hero-grid,
body.v4-only-body.quick-standalone-body .feg-workspace-shell,
body.v4-only-body.quick-standalone-body .feg-workspace-stage,
body.v4-only-body.quick-standalone-body .feg-workspace-body {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
}

body.v4-only-body.quick-standalone-body #quickStandalonePage {
  padding: clamp(8px, 1.5vw, 18px) !important;
}

body.v4-only-body.quick-standalone-body .standalone-window {
  width: min(1920px, 100%) !important;
  margin: 0 auto !important;
}

body.v4-only-body.quick-standalone-body .standalone-main {
  padding: clamp(10px, 1.35vw, 18px) !important;
  overflow-x: hidden !important;
}

body.v4-only-body.quick-standalone-body :where(
  .v4-structure-editor,
  .v4-structure-stage,
  .v4-structure-truss,
  .v4-led-constructor,
  .v4-led-workbench,
  .v4-stage-template-panel,
  .v4-truss-template-panel,
  .v4-truss-layout,
  .v4-truss-workspace,
  .v4-stage-canvas-wrap,
  .v4-truss-field-wrap,
  .v4-led-grid-wrap,
  .v4-led-panel-block,
  .v4-led-canvas-panel,
  .v4-led-construction-report,
  [data-stage-summary],
  [data-truss-summary],
  [data-led-result],
  .v4-table-wrap,
  .block-calc-table-wrap,
  .block-bom-wrap
) {
  min-width: 0 !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}

body.v4-only-body.quick-standalone-body .v4-stage-template-panel,
body.v4-only-body.quick-standalone-body .v4-truss-template-panel,
body.v4-only-body.quick-standalone-body .v4-led-constructor {
  display: block !important;
}

body.v4-only-body.quick-standalone-body :where(
  .v4-stage-canvas-wrap,
  .v4-truss-field-wrap,
  .v4-led-grid-wrap,
  .v4-table-wrap,
  .block-calc-table-wrap,
  .block-bom-wrap
) {
  overflow: auto !important;
  overscroll-behavior: contain !important;
}

body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-v3-tables,
body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-final-kit,
body.v4-only-body.quick-standalone-body .v4-led-construction-report {
  overflow: hidden !important;
}

body.v4-only-body.quick-standalone-body .v4-structure-truss :where(.block-calc-table, .block-bom, .v4-truss-final-kit-table),
body.v4-only-body.quick-standalone-body .v4-led-construction-report table {
  width: max-content !important;
  min-width: 100% !important;
}

@media (min-width: 1280px) {
  body.v4-only-body.quick-standalone-body .v4-structure-editor.v4-structure-stage.v4-stage-polish {
    display: grid !important;
    grid-template-columns: minmax(360px, 440px) minmax(640px, 1fr) minmax(260px, 340px) !important;
    grid-template-areas:
      "stageControls stageCanvas stageMetrics"
      "stageDetails stageDetails stageDetails" !important;
    gap: 14px !important;
    align-items: start !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-stage .v4-stage-template-panel { grid-area: stageControls !important; }
  body.v4-only-body.quick-standalone-body .v4-structure-stage .v4-stage-canvas-wrap { grid-area: stageCanvas !important; min-height: min(64vh, 680px) !important; }
  body.v4-only-body.quick-standalone-body .v4-structure-stage [data-stage-summary] { grid-area: stageMetrics !important; }

  body.v4-only-body.quick-standalone-body .v4-structure-editor.v4-structure-truss {
    display: grid !important;
    grid-template-columns: minmax(190px, 240px) minmax(0, 1fr) minmax(220px, 280px) !important;
    grid-template-areas:
      "trussTemplate trussTemplate trussTemplate"
      "trussSidebar  trussCanvas   trussMetrics"
      "trussDetails  trussDetails  trussDetails" !important;
    gap: 14px !important;
    max-width: min(1840px, 100%) !important;
    margin: 0 auto !important;
    align-items: start !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-template-panel {
    grid-area: trussTemplate !important;
    display: grid !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-layout {
    width: 100% !important;
    display: contents !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-sidebar {
    grid-area: trussSidebar !important;
    display: grid !important;
    min-width: 0 !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-workspace {
    grid-area: trussCanvas !important;
    display: grid !important;
    min-width: 0 !important;
    width: 100% !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-truss [data-truss-summary] {
    display: contents !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-truss [data-truss-summary] .v4-truss-summary-metrics {
    grid-area: trussMetrics !important;
    min-width: 0 !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-truss [data-truss-summary] .v4-truss-summary-details {
    grid-area: trussDetails !important;
    min-width: 0 !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-field-wrap {
    height: min(68vh, 760px) !important;
    min-height: 560px !important;
  }

  body.v4-only-body.quick-standalone-body .v4-led-constructor {
    display: grid !important;
    grid-template-columns: minmax(190px, 240px) minmax(0, 1fr) minmax(220px, 280px) !important;
    grid-template-areas:
      "ledControls ledCanvas ledMetrics"
      "ledPricing  ledCanvas ledMetrics"
      "ledSide     ledCanvas ledMetrics"
      "ledDetails  ledDetails ledDetails" !important;
    gap: 14px !important;
    max-width: min(1840px, 100%) !important;
    margin: 0 auto !important;
    padding: 0 !important;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    align-items: start !important;
  }

  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-workbench {
    display: contents !important;
  }

  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-input-grid { grid-area: ledControls !important; }
  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-quick-pricing-grid { grid-area: ledPricing !important; }
  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-side-panel {
    grid-area: ledSide !important;
    display: grid !important;
    gap: 12px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-canvas-panel {
    grid-area: ledCanvas !important;
    display: grid !important;
    min-width: 0 !important;
    width: 100% !important;
  }
  body.v4-only-body.quick-standalone-body [data-led-result] {
    display: contents !important;
  }
  body.v4-only-body.quick-standalone-body [data-led-result] .v4-led-summary-metrics {
    grid-area: ledMetrics !important;
    min-width: 0 !important;
  }
  body.v4-only-body.quick-standalone-body [data-led-result] .v4-led-summary-details {
    grid-area: ledDetails !important;
    min-width: 0 !important;
  }

  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-grid-wrap {
    min-height: min(64vh, 720px) !important;
  }
}

@media (min-width: 1180px) and (max-width: 1279px) {
  body.v4-only-body.quick-standalone-body .v4-structure-editor.v4-structure-stage.v4-stage-polish {
    display: grid !important;
    grid-template-columns: minmax(260px, 320px) minmax(0, 1fr) !important;
    grid-template-areas:
      "stageControls stageCanvas"
      "stageMetrics  stageMetrics"
      "stageDetails  stageDetails" !important;
    gap: 14px !important;
    max-width: min(1840px, 100%) !important;
    margin: 0 auto !important;
    align-items: start !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-stage .v4-stage-template-panel {
    grid-area: stageControls !important;
  }
  body.v4-only-body.quick-standalone-body .v4-structure-stage .v4-stage-canvas-wrap {
    grid-area: stageCanvas !important;
    min-height: 520px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-structure-stage [data-stage-summary] {
    grid-area: stageMetrics !important;
    min-width: 0 !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-editor.v4-structure-truss {
    display: grid !important;
    grid-template-columns: minmax(190px, 230px) minmax(0, 1fr) !important;
    grid-template-areas:
      "trussTemplate trussTemplate"
      "trussSidebar  trussCanvas"
      "trussMetrics  trussMetrics"
      "trussDetails  trussDetails" !important;
    gap: 14px !important;
    max-width: min(1840px, 100%) !important;
    margin: 0 auto !important;
    align-items: start !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-template-panel {
    grid-area: trussTemplate !important;
    display: grid !important;
  }
  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-layout { display: contents !important; }
  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-sidebar { grid-area: trussSidebar !important; min-width: 0 !important; }
  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-workspace { grid-area: trussCanvas !important; min-width: 0 !important; width: 100% !important; }
  body.v4-only-body.quick-standalone-body .v4-structure-truss [data-truss-summary] { display: contents !important; }
  body.v4-only-body.quick-standalone-body .v4-structure-truss [data-truss-summary] .v4-truss-summary-metrics { grid-area: trussMetrics !important; min-width: 0 !important; }
  body.v4-only-body.quick-standalone-body .v4-structure-truss [data-truss-summary] .v4-truss-summary-details { grid-area: trussDetails !important; min-width: 0 !important; }
  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-field-wrap { min-height: 520px !important; }

  body.v4-only-body.quick-standalone-body .v4-led-constructor {
    display: grid !important;
    grid-template-columns: minmax(190px, 230px) minmax(0, 1fr) !important;
    grid-template-areas:
      "ledControls ledCanvas"
      "ledPricing  ledCanvas"
      "ledSide     ledCanvas"
      "ledMetrics  ledMetrics"
      "ledDetails  ledDetails" !important;
    gap: 14px !important;
    max-width: min(1840px, 100%) !important;
    margin: 0 auto !important;
    padding: 0 !important;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    align-items: start !important;
  }

  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-workbench { display: contents !important; }
  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-input-grid { grid-area: ledControls !important; }
  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-quick-pricing-grid { grid-area: ledPricing !important; }
  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-side-panel { grid-area: ledSide !important; display: grid !important; gap: 12px !important; }
  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-canvas-panel { grid-area: ledCanvas !important; display: grid !important; min-width: 0 !important; width: 100% !important; }
  body.v4-only-body.quick-standalone-body [data-led-result] { display: contents !important; }
  body.v4-only-body.quick-standalone-body [data-led-result] .v4-led-summary-metrics { grid-area: ledMetrics !important; min-width: 0 !important; }
  body.v4-only-body.quick-standalone-body [data-led-result] .v4-led-summary-details { grid-area: ledDetails !important; min-width: 0 !important; }
  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-grid-wrap { min-height: 520px !important; }
}

@media (min-width: 768px) and (max-width: 1179px) {
  body.v4-only-body.quick-standalone-body .feg-dashboard-hero-grid {
    grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr) !important;
  }

  body.v4-only-body.quick-standalone-body .feg-launch-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-editor.v4-structure-stage.v4-stage-polish {
    display: grid !important;
    grid-template-columns: minmax(300px, 380px) minmax(0, 1fr) !important;
    grid-template-areas:
      "stageControls stageCanvas"
      "stageMetrics stageMetrics"
      "stageDetails stageDetails" !important;
    gap: 14px !important;
    align-items: start !important;
  }

  body.v4-only-body.quick-standalone-body .v4-structure-stage .v4-stage-template-panel { grid-area: stageControls !important; }
  body.v4-only-body.quick-standalone-body .v4-structure-stage .v4-stage-canvas-wrap { grid-area: stageCanvas !important; min-height: 430px !important; }
  body.v4-only-body.quick-standalone-body .v4-structure-stage [data-stage-summary] { grid-area: stageMetrics !important; }

  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-layout,
  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-workbench {
    grid-template-columns: minmax(0, 1fr) !important;
  }
}

@media (max-width: 767px) {
  body.v4-only-body.quick-standalone-body #quickStandalonePage {
    padding: 0 !important;
  }

  body.v4-only-body.quick-standalone-body .standalone-window {
    border-radius: 0 !important;
  }

  body.v4-only-body.quick-standalone-body .feg-dashboard-hero-grid,
  body.v4-only-body.quick-standalone-body .feg-launch-grid,
  body.v4-only-body.quick-standalone-body .v4-structure-editor.v4-structure-stage.v4-stage-polish,
  body.v4-only-body.quick-standalone-body .v4-structure-truss .v4-truss-layout,
  body.v4-only-body.quick-standalone-body .v4-led-constructor .v4-led-workbench {
    grid-template-columns: minmax(0, 1fr) !important;
    grid-template-areas: none !important;
  }

  body.v4-only-body.quick-standalone-body .v4-stage-canvas-wrap,
  body.v4-only-body.quick-standalone-body .v4-truss-field-wrap,
  body.v4-only-body.quick-standalone-body .v4-led-grid-wrap {
    min-height: 360px !important;
  }
}
`;

  function install() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
    }
    style.textContent = css;
    document.head.appendChild(style);
  }

  install();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  }
  requestAnimationFrame(install);
  setTimeout(install, 0);
  setTimeout(install, 250);
  setTimeout(install, 1000);
  window.addEventListener('resize', install, { passive: true });
  window.addEventListener('orientationchange', install, { passive: true });
  document.addEventListener('click', function () { requestAnimationFrame(install); }, true);
  if (window.MutationObserver && document.head) {
    const observer = new MutationObserver(function () {
      const style = document.getElementById(STYLE_ID);
      if (style && style.nextElementSibling) requestAnimationFrame(install);
    });
    observer.observe(document.head, { childList: true });
  }
  const startedAt = Date.now();
  const refreshTimer = setInterval(function () {
    install();
    if (Date.now() - startedAt > 1600) clearInterval(refreshTimer);
  }, 50);
  ROOT.ResponsiveStability = { version: '3.1.91', install };
})();
