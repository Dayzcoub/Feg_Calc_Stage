(function () {
  'use strict';

  const STYLE_ID = 'feg-standalone-mobile-ui-v3-0-5';
  const MOBILE_MQL = window.matchMedia ? window.matchMedia('(max-width: 860px), (pointer: coarse) and (max-width: 1024px)') : null;

  const css = `
/* FEG Stage PRO 3.0.5 — safe mobile usability layer.
   CSS-first, no MutationObserver, no constructor calculation changes. */
@media (max-width: 860px), (pointer: coarse) and (max-width: 1024px) {
  html,
  body.v4-only-body.quick-standalone-body {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow-x: hidden !important;
    background: #05070b !important;
    color-scheme: dark !important;
    -webkit-text-size-adjust: 100% !important;
    text-size-adjust: 100% !important;
  }

  body.v4-only-body.quick-standalone-body {
    padding: 0 !important;
    margin: 0 !important;
  }

  body.v4-only-body.quick-standalone-body * {
    box-sizing: border-box !important;
    min-width: 0;
  }

  body.v4-only-body.quick-standalone-body input,
  body.v4-only-body.quick-standalone-body select,
  body.v4-only-body.quick-standalone-body textarea,
  body.v4-only-body.quick-standalone-body button {
    font-size: 16px !important;
    touch-action: manipulation;
  }

  body.v4-only-body.quick-standalone-body.quick-standalone-ready {
    min-height: 100svh !important;
  }

  /* Title screen stays clean and centered. */
  body.v4-only-body.quick-standalone-body .v4-shell {
    width: 100% !important;
    min-height: 100svh !important;
    padding: max(10px, env(safe-area-inset-top)) 10px max(14px, env(safe-area-inset-bottom)) !important;
    display: grid !important;
    place-items: center !important;
    overflow-x: hidden !important;
  }
  body.v4-only-body.quick-standalone-body #quickStandaloneMount {
    width: min(430px, calc(100vw - 20px)) !important;
    max-width: calc(100vw - 20px) !important;
    margin: 0 auto !important;
  }
  body.v4-only-body.quick-standalone-body .quick-release-splash {
    width: min(286px, 72vw) !important;
    margin: 0 auto 16px !important;
    display: block !important;
    border-radius: 24px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-grid {
    width: 100% !important;
    grid-template-columns: 1fr !important;
    gap: 10px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-tile {
    min-height: 92px !important;
    width: 100% !important;
    border-radius: 20px !important;
    padding: 16px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-tile b {
    font-size: clamp(1.18rem, 6.2vw, 1.55rem) !important;
  }

  /* Fullscreen constructor modal: no page-wide horizontal scrolling. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-backdrop.open {
    position: fixed !important;
    inset: 0 !important;
    width: 100dvw !important;
    height: 100dvh !important;
    padding: 0 !important;
    display: block !important;
    overflow: hidden !important;
    background: #05070b !important;
    backdrop-filter: none !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal {
    width: 100dvw !important;
    max-width: 100dvw !important;
    min-width: 0 !important;
    height: 100dvh !important;
    max-height: 100dvh !important;
    min-height: 100dvh !important;
    margin: 0 !important;
    border: 0 !important;
    border-radius: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    background: #05070b !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-head {
    flex: 0 0 auto !important;
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) 48px !important;
    align-items: center !important;
    gap: 8px !important;
    width: 100% !important;
    min-height: calc(58px + env(safe-area-inset-top)) !important;
    padding: max(10px, env(safe-area-inset-top)) 10px 10px !important;
    background: #090d12 !important;
    border-bottom: 1px solid rgba(255,255,255,.1) !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-head > div {
    min-width: 0 !important;
    overflow: hidden !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-head .v4-kicker {
    display: none !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-head h3 {
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    font-size: clamp(1.02rem, 4.7vw, 1.28rem) !important;
    line-height: 1.14 !important;
    white-space: normal !important;
    overflow-wrap: anywhere !important;
    color: #f8fafc !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-head button,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-head [data-v4-quick-modal-close] {
    width: 48px !important;
    height: 48px !important;
    min-width: 48px !important;
    min-height: 48px !important;
    padding: 0 !important;
    border-radius: 16px !important;
    justify-self: end !important;
    font-size: 1.55rem !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body {
    flex: 1 1 auto !important;
    width: 100% !important;
    max-width: 100dvw !important;
    min-width: 0 !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    overscroll-behavior: contain !important;
    padding: 8px 8px calc(18px + env(safe-area-inset-bottom)) !important;
    background: #05070b !important;
  }

  /* Common cards / panels: force them inside the viewport. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-card,.v4-panel,.v4-wide-section,.v4-structure-editor,.v4-structure-stage,.v4-structure-truss,.v4-led-constructor,.v4-stage-template-panel,.v4-stage-control-stack,.v4-stage-tool-box,.v4-truss-template-panel,.v4-truss-template-card,.v4-truss-load-panel,.v4-led-panel-block,.v4-led-canvas-panel,.v4-output-panel,.v4-bom-inspector) {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    border-radius: 16px !important;
    padding: 10px !important;
    gap: 8px !important;
    overflow: hidden !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-card-head,.v4-structure-toolbar,.v4-truss-template-head,.v4-led-grid-head,.v4-truss-load-header) {
    display: grid !important;
    grid-template-columns: minmax(0,1fr) !important;
    gap: 6px !important;
    align-items: stretch !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-structure-toolbar p,.v4-stage-draw-help,.v4-led-grid-note,.v4-muted.v4-long-note) {
    display: none !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body h4,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body h3 {
    font-size: 1rem !important;
    line-height: 1.2 !important;
    margin: 0 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-kicker {
    font-size: .66rem !important;
    line-height: 1.2 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-muted,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body small {
    font-size: .78rem !important;
    line-height: 1.32 !important;
    overflow-wrap: anywhere !important;
  }

  /* Every desktop grid becomes a phone column. High specificity beats V4DesignSystem !important rules. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-grid-3,.v4-grid-4,.v4-dashboard-grid,.v4-summary-grid,.v4-scope-grid,.v4-bom-summary-grid,.v4-stage-controls-layout,.v4-stage-secondary-layout,.v4-truss-template-split,.v4-truss-stool-grid,.v4-truss-side-grid,.v4-truss-layout,.v4-led-workbench,.v4-led-constructor .v4-grid-3,.v4-visual-led-placement-grid) {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 8px !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  /* Inputs and buttons. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(label,.v4-field) {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(input,select,textarea) {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    min-height: 44px !important;
    border-radius: 14px !important;
    padding: 10px 12px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body input[type="checkbox"] {
    width: 22px !important;
    height: 22px !important;
    min-height: 22px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body input[type="range"] {
    min-height: 34px !important;
    padding: 0 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(button,.btn-primary,.btn-secondary,.btn-success,.btn-danger,.v4-mode-btn,.v4-icon-btn) {
    min-height: 44px !important;
    min-width: 0 !important;
    max-width: 100% !important;
    border-radius: 14px !important;
    white-space: normal !important;
    overflow-wrap: anywhere !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-icon-btn {
    width: 44px !important;
    height: 44px !important;
    padding: 0 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-actions,.v4-template-actions,.v4-stage-tool-buttons,.v4-stage-mode-actions,.v4-stage-main-actions,.v4-structure-toolbar-actions,.v4-doc-actions,.action-group) {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
    width: 100% !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-actions,.v4-template-actions,.v4-stage-tool-buttons,.v4-stage-mode-actions,.v4-stage-main-actions,.v4-structure-toolbar-actions,.v4-doc-actions,.action-group) > * {
    width: 100% !important;
  }

  /* Zoom panel: stack it above canvas, never to the right. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-truss-zoom-panel,.v4-stage-zoom-panel,.v4-led-zoom-panel) {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    padding: 10px !important;
    gap: 8px !important;
    border-radius: 16px !important;
    overflow: hidden !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-truss-zoom-panel,.v4-stage-zoom-panel,.v4-led-zoom-panel) > div:first-child {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 8px !important;
    width: 100% !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-truss-zoom-controls,.v4-stage-zoom-controls,.v4-led-zoom-controls) {
    display: grid !important;
    grid-template-columns: 44px minmax(0, 1fr) 44px !important;
    gap: 8px !important;
    width: 100% !important;
    align-items: center !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-truss-zoom-controls,.v4-stage-zoom-controls,.v4-led-zoom-controls) > :is(.btn-secondary,label) {
    grid-column: 1 / -1 !important;
    width: 100% !important;
  }

  /* Stage: controls first, then canvas. Canvas is internally scrollable and centered. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 8px !important;
    overflow: hidden !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-frame-auto-card {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 4px !important;
    width: 100% !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-canvas-wrap {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    height: min(42svh, 380px) !important;
    min-height: 240px !important;
    max-height: 380px !important;
    padding: 8px !important;
    overflow: auto !important;
    overscroll-behavior: contain !important;
    -webkit-overflow-scrolling: touch !important;
    border-radius: 16px !important;
    background: #07101b !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-polish .v4-visual-stage-grid {
    width: max-content !important;
    min-width: max-content !important;
    max-width: none !important;
    margin: 0 auto !important;
    transform-origin: top center !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-polish .v4-stage-cell {
    min-width: var(--stage-cell-px, 32px) !important;
    width: var(--stage-cell-px, 32px) !important;
    min-height: var(--stage-cell-px, 32px) !important;
    height: var(--stage-cell-px, 32px) !important;
    border-radius: 8px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-polish .v4-stage-cell small {
    display: none !important;
  }

  /* Truss: library / tools / field in one column. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-layout,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-workspace,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-sidebar {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    gap: 8px !important;
    overflow: hidden !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-library {
    width: 100% !important;
    max-width: 100% !important;
    max-height: 30svh !important;
    overflow: auto !important;
    padding: 8px !important;
    border-radius: 16px !important;
    -webkit-overflow-scrolling: touch !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-truss-group-body,.v4-truss-library .block-object-group-body) {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 7px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-truss-group-body button,.v4-truss-library .block-object-group-body button) {
    min-height: 44px !important;
    padding: 8px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-edit-tools {
    position: static !important;
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 8px !important;
    width: 100% !important;
    padding: 8px !important;
    border-radius: 16px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-edit-row,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-mode-actions {
    display: contents !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-mode-actions .v4-mode-btn {
    grid-column: 1 / -1 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-field-wrap {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    height: min(42svh, 390px) !important;
    min-height: 250px !important;
    max-height: 390px !important;
    padding: 8px !important;
    overflow: auto !important;
    overscroll-behavior: contain !important;
    -webkit-overflow-scrolling: touch !important;
    border-radius: 16px !important;
    background: #07101b !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-field {
    width: max-content !important;
    min-width: max-content !important;
    max-width: none !important;
    margin: 0 auto !important;
    transform-origin: top center !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-truss-workspace > p.v4-muted {
    display: none !important;
  }

  /* LED: keep the good layout, but make it same phone shell. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-led-template-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
    width: 100% !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-led-grid-wrap {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    height: min(42svh, 390px) !important;
    min-height: 250px !important;
    max-height: 390px !important;
    padding: 8px !important;
    overflow: auto !important;
    overscroll-behavior: contain !important;
    -webkit-overflow-scrolling: touch !important;
    border-radius: 16px !important;
    background: #07101b !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-led-grid {
    width: max-content !important;
    min-width: max-content !important;
    max-width: none !important;
    margin: 0 auto !important;
    transform-origin: top center !important;
  }

  /* Wide reports/tables scroll inside themselves. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-table-wrap,.orders-table-wrap,.truss-project-table-wrap,.client-table-wrap,.v4-visual-preview-canvas,.v4-bom-inspector,.v4-quick-docs,.v4-bom-source-card,.v4-output-panel,[data-stage-summary],[data-truss-summary],[data-led-result]) {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(table,.v4-table,.orders-table,.truss-project-table,.client-table,.block-calc-table,.block-bom) {
    max-width: none !important;
  }
}

@media (max-width: 390px) {
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body {
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body :is(.v4-actions,.v4-template-actions,.v4-stage-tool-buttons,.v4-stage-mode-actions,.v4-stage-main-actions,.v4-structure-toolbar-actions,.v4-doc-actions,.action-group) {
    grid-template-columns: minmax(0,1fr) !important;
  }
}
`;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      style.setAttribute('data-feg-version', '3.0.5-mobile-ui-safe');
      document.head.appendChild(style);
    }
    style.textContent = css;
  }

  function setModeClass() {
    const mobile = !MOBILE_MQL || MOBILE_MQL.matches;
    document.body.classList.toggle('feg-mobile-field-ui', !!mobile);
  }

  function centerOne(el) {
    if (!el) return;
    try {
      const maxX = Math.max(0, el.scrollWidth - el.clientWidth);
      const maxY = Math.max(0, el.scrollHeight - el.clientHeight);
      if (maxX > 2) el.scrollLeft = Math.round(maxX / 2);
      if (maxY > 2) el.scrollTop = Math.round(maxY / 2);
    } catch (e) {}
  }

  function centerOpenFields() {
    if (MOBILE_MQL && !MOBILE_MQL.matches) return;
    document.querySelectorAll('.v4-quick-modal-backdrop.open .v4-stage-canvas-wrap, .v4-quick-modal-backdrop.open .v4-truss-field-wrap, .v4-quick-modal-backdrop.open .v4-led-grid-wrap').forEach(centerOne);
  }

  function boot() {
    installStyle();
    setModeClass();
    if (MOBILE_MQL && MOBILE_MQL.addEventListener) MOBILE_MQL.addEventListener('change', () => { setModeClass(); setTimeout(centerOpenFields, 80); });
    window.addEventListener('resize', () => setTimeout(centerOpenFields, 120), { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(centerOpenFields, 260), { passive: true });
    document.addEventListener('click', function (event) {
      const target = event.target;
      if (!target || !target.closest) return;
      if (target.closest('[data-stage-template],[data-stage-action],[data-stage-zoom-action],[data-truss-template-action],[data-truss-action],[data-truss-zoom-action],[data-led-template],[data-led-action],[data-led-zoom-action],.v4-quick-tile')) {
        setTimeout(centerOpenFields, 140);
        setTimeout(centerOpenFields, 420);
      }
    }, { passive: true });
    setTimeout(centerOpenFields, 250);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();

  window.FEGModules = window.FEGModules || {};
  window.FEGModules.StandaloneMobileFieldPolish = {
    version: '3.0.5-mobile-ui-safe',
    scan: centerOpenFields,
    centerConstructorFields: centerOpenFields
  };
})();
