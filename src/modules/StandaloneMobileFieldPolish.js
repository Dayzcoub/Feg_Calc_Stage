(function () {
  'use strict';

  const STYLE_ID = 'feg-standalone-mobile-field-polish-v3-0-2';
  const MOBILE_QUERY = '(max-width: 860px), (pointer: coarse) and (max-width: 1024px)';
  const CENTER_SELECTORS = [
    '[data-stage-canvas-wrap]',
    '.v4-stage-canvas-wrap',
    '[data-truss-field-wrap]',
    '.v4-truss-field-wrap',
    '.v4-led-grid-wrap'
  ];

  const css = `
/* FEG Stage PRO 3.0.2 — mobile field polish. UI-only layer, no calculation changes. */
@media (max-width: 860px), (pointer: coarse) and (max-width: 1024px) {
  html, body {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    background: #05070b !important;
  }

  .quick-standalone-body {
    color-scheme: dark;
    min-height: 100svh;
  }

  .v4-quick-modal-backdrop.open {
    inset: 0 !important;
    overflow: hidden !important;
  }

  .v4-quick-modal {
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    max-width: 100vw !important;
    max-height: 100svh !important;
  }

  .v4-quick-modal-head {
    flex: 0 0 auto !important;
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) 52px !important;
    gap: 8px !important;
    min-width: 0 !important;
  }

  .v4-quick-modal-head > div,
  .v4-quick-modal-head h3 {
    min-width: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .v4-quick-modal-body {
    flex: 1 1 auto !important;
    width: 100% !important;
    max-width: 100vw !important;
    min-width: 0 !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    padding: 8px 8px calc(20px + env(safe-area-inset-bottom)) !important;
    scroll-padding-top: 72px;
    background: #05070b !important;
  }

  .v4-quick-modal-body *,
  .v4-quick-modal-body *::before,
  .v4-quick-modal-body *::after {
    max-width: 100%;
  }

  .v4-quick-modal-body .v4-card,
  .v4-quick-modal-body .v4-panel,
  .v4-quick-modal-body .v4-structure-editor,
  .v4-quick-modal-body .v4-structure-stage,
  .v4-quick-modal-body .v4-structure-truss,
  .v4-quick-modal-body .v4-led-constructor,
  .v4-quick-modal-body .v4-stage-template-panel,
  .v4-quick-modal-body .v4-stage-control-stack,
  .v4-quick-modal-body .v4-truss-template-panel,
  .v4-quick-modal-body .v4-truss-load-panel,
  .v4-quick-modal-body .v4-led-panel-block,
  .v4-quick-modal-body .v4-led-canvas-panel {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  .v4-quick-modal-body .v4-card,
  .v4-quick-modal-body .v4-structure-editor,
  .v4-quick-modal-body .v4-led-constructor {
    border-radius: 18px !important;
    padding: 10px !important;
    gap: 10px !important;
  }

  .v4-quick-modal-body .v4-card-head,
  .v4-quick-modal-body .v4-structure-toolbar,
  .v4-quick-modal-body .v4-dashboard-head {
    padding: 0 !important;
    margin: 0 0 8px !important;
  }

  .v4-quick-modal-body .v4-card-head p,
  .v4-quick-modal-body .v4-stage-draw-help,
  .v4-quick-modal-body .v4-led-grid-note,
  .v4-quick-modal-body .v4-note:not(.v4-price-note),
  .v4-quick-modal-body .v4-muted.v4-long-note {
    display: none !important;
  }

  .v4-quick-modal-body h3,
  .v4-quick-modal-body h4 {
    margin: 0 !important;
    font-size: 1rem !important;
    line-height: 1.18 !important;
  }

  .v4-quick-modal-body .v4-kicker {
    font-size: .68rem !important;
    letter-spacing: .08em !important;
  }

  .v4-quick-modal-body button,
  .v4-quick-modal-body input,
  .v4-quick-modal-body select,
  .v4-quick-modal-body textarea {
    font-size: 16px !important;
  }

  .v4-quick-modal-body label,
  .v4-quick-modal-body .v4-field {
    min-width: 0 !important;
    max-width: 100% !important;
  }

  .v4-quick-modal-body input,
  .v4-quick-modal-body select,
  .v4-quick-modal-body textarea {
    min-width: 0 !important;
  }

  .v4-grid-3,
  .v4-grid-4,
  .v4-stage-controls-layout,
  .v4-stage-secondary-layout,
  .v4-truss-template-split,
  .v4-truss-stool-grid,
  .v4-truss-side-grid,
  .v4-led-workbench,
  .v4-led-constructor .v4-grid-3,
  .v4-dashboard-grid,
  .v4-summary-grid,
  .v4-scope-grid,
  .v4-bom-summary-grid {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 8px !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  .v4-stage-tool-buttons,
  .v4-stage-mode-actions,
  .v4-stage-main-actions,
  .v4-template-actions,
  .v4-structure-toolbar-actions,
  .v4-doc-actions,
  .v4-visual-preview-actions,
  .action-group {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
    width: 100% !important;
  }

  .v4-stage-tool-buttons button,
  .v4-stage-mode-actions button,
  .v4-stage-main-actions button,
  .v4-template-actions button,
  .v4-structure-toolbar-actions button,
  .v4-doc-actions button,
  .v4-visual-preview-actions button,
  .action-group button {
    width: 100% !important;
    min-width: 0 !important;
    white-space: normal !important;
  }

  .v4-truss-zoom-panel,
  .v4-stage-zoom-panel,
  .v4-led-zoom-panel {
    width: 100% !important;
    padding: 10px !important;
    gap: 8px !important;
    border-radius: 16px !important;
    overflow: hidden !important;
  }

  .v4-truss-zoom-panel > div:first-child,
  .v4-stage-zoom-panel > div:first-child,
  .v4-led-zoom-panel > div:first-child {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    gap: 8px !important;
  }

  .v4-truss-zoom-controls,
  .v4-stage-zoom-controls,
  .v4-led-zoom-controls {
    display: grid !important;
    grid-template-columns: 48px minmax(0, 1fr) 48px !important;
    gap: 8px !important;
    align-items: center !important;
    width: 100% !important;
  }

  .v4-truss-zoom-controls .btn-secondary,
  .v4-stage-zoom-controls .btn-secondary,
  .v4-led-zoom-controls .btn-secondary,
  .v4-truss-zoom-controls label,
  .v4-stage-zoom-controls label,
  .v4-led-zoom-controls label {
    grid-column: 1 / -1 !important;
    width: 100% !important;
  }

  .v4-truss-zoom-controls input[type='range'],
  .v4-stage-zoom-controls input[type='range'],
  .v4-led-zoom-controls input[type='range'] {
    width: 100% !important;
    min-width: 0 !important;
  }

  /* Stage — canvas should be visible and centered, controls stay compact. */
  .v4-structure-stage,
  .v4-stage-polish {
    overflow: hidden !important;
  }

  .v4-stage-template-panel,
  .v4-stage-control-stack,
  .v4-stage-tool-box {
    padding: 10px !important;
    border-radius: 16px !important;
  }

  .v4-stage-frame-auto-card,
  .v4-stage-frame-auto-card--compact {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 8px !important;
  }

  .v4-stage-canvas-wrap {
    width: 100% !important;
    max-width: calc(100vw - 16px) !important;
    min-width: 0 !important;
    height: min(46svh, 430px) !important;
    min-height: 260px !important;
    max-height: 430px !important;
    overflow: auto !important;
    padding: 8px !important;
    border-radius: 18px !important;
    overscroll-behavior: contain !important;
    -webkit-overflow-scrolling: touch !important;
    background: #07101b !important;
  }

  .v4-stage-polish .v4-visual-stage-grid {
    width: max-content !important;
    min-width: max-content !important;
    max-width: none !important;
    margin: 0 auto !important;
    transform-origin: top center !important;
  }

  .v4-stage-polish .v4-stage-cell {
    min-width: var(--stage-cell-px, 34px) !important;
    width: var(--stage-cell-px, 34px) !important;
    min-height: var(--stage-cell-px, 34px) !important;
    height: var(--stage-cell-px, 34px) !important;
    border-radius: 8px !important;
  }

  .v4-stage-polish .v4-stage-cell small {
    display: none !important;
  }

  /* Truss — remove right-side dead zone on phones, keep the field scrollable and centered. */
  .v4-truss-layout {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 8px !important;
    width: 100% !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  .v4-truss-sidebar {
    width: 100% !important;
    min-width: 0 !important;
    display: grid !important;
    gap: 8px !important;
  }

  .v4-truss-edit-tools {
    position: static !important;
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 8px !important;
    padding: 8px !important;
    border-radius: 16px !important;
  }

  .v4-truss-edit-row,
  .v4-truss-mode-actions {
    display: contents !important;
  }

  .v4-truss-mode-actions .v4-mode-btn {
    grid-column: 1 / -1 !important;
  }

  .v4-truss-library {
    width: 100% !important;
    max-height: 34svh !important;
    overflow: auto !important;
    padding: 8px !important;
    border-radius: 16px !important;
    overscroll-behavior: contain !important;
    -webkit-overflow-scrolling: touch !important;
  }

  .v4-truss-group-body,
  .v4-truss-library .block-object-group-body {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 8px !important;
  }

  .v4-truss-field-wrap {
    width: 100% !important;
    max-width: calc(100vw - 16px) !important;
    min-width: 0 !important;
    height: min(48svh, 460px) !important;
    min-height: 280px !important;
    overflow: auto !important;
    padding: 8px !important;
    border-radius: 18px !important;
    overscroll-behavior: contain !important;
    -webkit-overflow-scrolling: touch !important;
    background: #07101b !important;
  }

  .v4-truss-field {
    max-width: none !important;
    margin: 0 auto !important;
    transform-origin: top center !important;
  }

  .v4-truss-template-panel,
  .v4-truss-load-panel {
    padding: 10px !important;
    gap: 8px !important;
  }

  .v4-truss-load-header {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .v4-load-indicator {
    min-width: 0 !important;
    width: 100% !important;
  }

  /* LED — keep the only already-good constructor clean and consistent. */
  .v4-led-workbench {
    overflow: hidden !important;
  }

  .v4-led-template-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
  }

  .v4-led-grid-wrap {
    width: 100% !important;
    max-width: calc(100vw - 16px) !important;
    height: min(46svh, 430px) !important;
    min-height: 260px !important;
    overflow: auto !important;
    padding: 8px !important;
    border-radius: 18px !important;
    overscroll-behavior: contain !important;
    -webkit-overflow-scrolling: touch !important;
    background: #07101b !important;
  }

  .v4-led-grid {
    max-width: none !important;
    margin: 0 auto !important;
    transform-origin: top center !important;
  }

  .v4-led-parts-list,
  .v4-led-construction-report,
  .v4-led-side-panel {
    width: 100% !important;
    min-width: 0 !important;
  }

  /* Wide technical sections: scroll inside, never push the whole screen sideways. */
  .v4-table-wrap,
  .orders-table-wrap,
  .truss-project-table-wrap,
  .client-table-wrap,
  .v4-visual-preview-canvas,
  .v4-bom-inspector,
  .v4-quick-docs,
  .v4-bom-source-card,
  .v4-output-panel {
    max-width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }

  table,
  .v4-table,
  .orders-table,
  .truss-project-table,
  .client-table,
  .block-calc-table,
  .block-bom {
    max-width: none !important;
  }
}

@media (max-width: 390px) {
  .v4-quick-modal-body {
    padding-left: 6px !important;
    padding-right: 6px !important;
  }

  .v4-stage-tool-buttons,
  .v4-stage-mode-actions,
  .v4-stage-main-actions,
  .v4-template-actions,
  .v4-structure-toolbar-actions,
  .v4-doc-actions,
  .v4-visual-preview-actions,
  .action-group {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .v4-truss-group-body,
  .v4-truss-library .block-object-group-body,
  .v4-led-template-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }

  .v4-stage-canvas-wrap,
  .v4-truss-field-wrap,
  .v4-led-grid-wrap {
    max-width: calc(100vw - 12px) !important;
  }
}
`;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      style.setAttribute('data-feg-version', '3.0.2-mobile-field-polish');
      style.textContent = css;
      document.head.appendChild(style);
    } else if (style.textContent !== css) {
      style.textContent = css;
    }
  }

  function isMobileFieldMode() {
    try {
      return window.matchMedia && window.matchMedia(MOBILE_QUERY).matches;
    } catch (error) {
      return window.innerWidth <= 860;
    }
  }

  function centerElement(el, vertical) {
    if (!el || !isMobileFieldMode()) return;
    const overflowX = el.scrollWidth - el.clientWidth;
    if (overflowX > 8) el.scrollLeft = Math.max(0, Math.round(overflowX / 2));
    if (vertical) {
      const overflowY = el.scrollHeight - el.clientHeight;
      if (overflowY > 8) el.scrollTop = Math.max(0, Math.round(overflowY / 2));
    }
  }

  function centerConstructorFields(root, vertical) {
    if (!isMobileFieldMode()) return;
    const scope = root && root.querySelectorAll ? root : document;
    CENTER_SELECTORS.forEach((selector) => {
      scope.querySelectorAll(selector).forEach((el) => centerElement(el, vertical));
    });
  }

  function compactOpenModal(modal) {
    if (!modal || !modal.classList || !isMobileFieldMode()) return;
    modal.classList.add('feg-mobile-field-polished');
    centerConstructorFields(modal, false);
    window.setTimeout(() => centerConstructorFields(modal, false), 80);
    window.setTimeout(() => centerConstructorFields(modal, false), 260);
  }

  function bindInteractionCentering(root) {
    if (!root || root.__fegMobileFieldPolishBound) return;
    root.__fegMobileFieldPolishBound = true;
    root.addEventListener('click', (event) => {
      const target = event.target;
      if (!target || !target.closest) return;
      const shouldCenter = target.closest('[data-stage-template], [data-stage-action], [data-truss-template], [data-truss-zoom-action], [data-stage-zoom-action], [data-led-template], [data-led-zoom-action], .v4-led-template-grid button, .v4-template-actions button');
      if (!shouldCenter) return;
      window.setTimeout(() => centerConstructorFields(root, false), 80);
      window.setTimeout(() => centerConstructorFields(root, false), 220);
    }, true);
  }

  function scan() {
    if (!isMobileFieldMode()) return;
    document.querySelectorAll('.v4-quick-modal, .v4-quick-modal-body, .v4-structure-editor, .v4-led-constructor').forEach((node) => {
      bindInteractionCentering(node);
      const modal = node.closest && node.closest('.v4-quick-modal') || node;
      compactOpenModal(modal);
    });
  }

  function boot() {
    installStyle();
    scan();
    window.addEventListener('resize', () => window.setTimeout(scan, 80), { passive: true });
    window.addEventListener('orientationchange', () => window.setTimeout(scan, 180), { passive: true });
    const observer = new MutationObserver((mutations) => {
      if (!isMobileFieldMode()) return;
      let needsScan = false;
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && (mutation.addedNodes && mutation.addedNodes.length)) { needsScan = true; break; }
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') { needsScan = true; break; }
      }
      if (needsScan) window.requestAnimationFrame(scan);
    });
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();

  window.FEGModules = window.FEGModules || {};
  window.FEGModules.StandaloneMobileFieldPolish = {
    version: '3.0.2-mobile-field-polish',
    centerConstructorFields,
    scan
  };
})();
