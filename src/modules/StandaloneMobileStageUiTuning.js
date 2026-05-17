(function () {
  'use strict';

  const STYLE_ID = 'feg-standalone-mobile-stage-ui-v3-0-9';
  const MOBILE_MQL = window.matchMedia ? window.matchMedia('(max-width: 767px)') : null;

  const css = `
/* FEG Stage PRO 3.0.9 — mobile-only Stage build toolbar compact label hotfix.
   Scope: quick standalone mobile Stage constructor only. Desktop layout is untouched. */
@media (max-width: 767px) {
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    padding: 8px !important;
    overflow: hidden !important;
  }

  /* Let inner Stage blocks take their own order relative to zoom/canvas. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish > .v4-stage-template-panel {
    display: contents !important;
  }

  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish > .v4-structure-toolbar { order: 0 !important; }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish .v4-stage-controls-layout { order: 1 !important; }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish .v4-template-actions { order: 2 !important; }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish > .v4-stage-zoom-panel { order: 3 !important; }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish > .v4-stage-canvas-wrap { order: 4 !important; }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish .v4-stage-secondary-layout { order: 5 !important; }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish > [data-stage-summary] { order: 6 !important; }

  /* Main Stage setup: compact horizontal rows. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-controls-layout {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    width: 100% !important;
    padding: 8px !important;
    border-radius: 16px !important;
    background: rgba(8, 12, 18, .92) !important;
    border: 1px solid rgba(255,255,255,.09) !important;
    overflow: hidden !important;
  }

  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    background: transparent !important;
    overflow: visible !important;
  }

  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--build {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
    gap: 6px !important;
    align-items: stretch !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--build .v4-stage-frame-auto-card {
    grid-column: 1 / -1 !important;
    width: 100% !important;
    min-height: 42px !important;
    padding: 8px 10px !important;
    border-radius: 12px !important;
    display: grid !important;
    grid-template-columns: auto minmax(0, 1fr) !important;
    gap: 4px 8px !important;
    align-items: center !important;
    background: rgba(255,255,255,.045) !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-frame-auto-card span {
    font-size: .66rem !important;
    letter-spacing: .08em !important;
    text-transform: uppercase !important;
    color: #a7b0bd !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-frame-auto-card b {
    font-size: .82rem !important;
    line-height: 1.1 !important;
    color: #f8fafc !important;
    overflow-wrap: anywhere !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-frame-auto-card small {
    grid-column: 1 / -1 !important;
    font-size: .66rem !important;
    line-height: 1.15 !important;
    color: #9aa4b2 !important;
  }

  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--dimensions {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 6px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--dimensions .v4-field {
    font-size: .64rem !important;
    letter-spacing: .06em !important;
    line-height: 1.1 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--dimensions small {
    display: none !important;
  }

  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--closure {
    display: grid !important;
    grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr) !important;
    gap: 6px !important;
    align-items: end !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--closure .v4-stage-check--edge {
    min-height: 42px !important;
    padding: 8px 10px !important;
    border-radius: 12px !important;
    display: flex !important;
    align-items: center !important;
    gap: 7px !important;
    background: rgba(255,255,255,.04) !important;
    border: 1px solid rgba(255,255,255,.08) !important;
    font-size: .73rem !important;
    line-height: 1.15 !important;
    color: #f8fafc !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--closure:not(:has(input[data-stage-edge-enabled]:checked)) > label.v4-field {
    display: none !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--closure:not(:has(input[data-stage-edge-enabled]:checked)) {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--pricing {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 6px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--pricing .v4-kicker,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--pricing small {
    display: none !important;
  }

  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack :is(label,.v4-field) {
    margin: 0 !important;
    min-height: 0 !important;
    padding: 0 !important;
    font-size: .66rem !important;
    line-height: 1.15 !important;
    letter-spacing: .05em !important;
    color: #a7b0bd !important;
    text-transform: uppercase !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack :is(input,select) {
    min-height: 38px !important;
    height: 38px !important;
    padding: 7px 8px !important;
    border-radius: 11px !important;
    font-size: 15px !important;
    line-height: 1.1 !important;
    margin-top: 4px !important;
  }

  /* Presets: compact, tidy and horizontal. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish .v4-template-actions {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 6px !important;
    width: 100% !important;
    padding: 8px !important;
    border-radius: 16px !important;
    background: rgba(8, 12, 18, .88) !important;
    border: 1px solid rgba(255,255,255,.09) !important;
    overflow: hidden !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish .v4-template-actions button {
    min-height: 36px !important;
    height: 36px !important;
    padding: 6px 7px !important;
    border-radius: 11px !important;
    font-size: .75rem !important;
    line-height: 1.08 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish .v4-template-actions small {
    display: none !important;
  }

  /* Zoom: compact controls. Fit / Center / auto-fit are one horizontal row. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish > .v4-stage-zoom-panel {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 6px !important;
    width: 100% !important;
    padding: 8px !important;
    border-radius: 16px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish > .v4-stage-zoom-panel > div:first-child {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    gap: 8px !important;
    font-size: .86rem !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls {
    display: grid !important;
    grid-template-columns: 34px minmax(0, 1fr) 34px !important;
    gap: 6px !important;
    align-items: center !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > .v4-icon-btn {
    width: 34px !important;
    height: 34px !important;
    min-width: 34px !important;
    min-height: 34px !important;
    border-radius: 11px !important;
    font-size: 1rem !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > input[type="range"] {
    min-height: 30px !important;
    height: 30px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > :is(button.btn-secondary,label.v4-stage-autofit) {
    grid-column: auto !important;
    min-height: 34px !important;
    height: 34px !important;
    padding: 6px 7px !important;
    border-radius: 11px !important;
    font-size: .72rem !important;
    line-height: 1.05 !important;
    white-space: nowrap !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > button[data-stage-zoom-action="fit"] {
    grid-column: 1 !important;
    grid-row: 2 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > button[data-stage-zoom-action="center"] {
    grid-column: 2 !important;
    grid-row: 2 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > label.v4-stage-autofit {
    grid-column: 3 !important;
    grid-row: 2 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 5px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > label.v4-stage-autofit input {
    width: 18px !important;
    height: 18px !important;
    min-height: 18px !important;
    margin: 0 !important;
  }

  /* Canvas is the main visual block. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish > .v4-stage-canvas-wrap {
    height: min(38svh, 340px) !important;
    min-height: 230px !important;
    max-height: 340px !important;
    padding: 8px !important;
    border-radius: 16px !important;
  }

  /* Build tool block goes below canvas, with thin horizontal buttons. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-secondary-layout {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    width: 100% !important;
    gap: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    background: transparent !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-box {
    display: grid !important;
    grid-template-columns: 74px minmax(0, 1fr) !important;
    align-items: center !important;
    gap: 5px !important;
    width: 100% !important;
    padding: 7px !important;
    border-radius: 16px !important;
    background: rgba(8, 12, 18, .9) !important;
    border: 1px solid rgba(255,255,255,.09) !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-box > span {
    min-width: 0 !important;
    font-size: .52rem !important;
    line-height: 1.05 !important;
    color: #a7b0bd !important;
    text-transform: uppercase !important;
    letter-spacing: .045em !important;
    white-space: normal !important;
    overflow-wrap: normal !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-buttons {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 4px !important;
    width: 100% !important;
    min-width: 0 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-buttons button {
    min-width: 0 !important;
    min-height: 32px !important;
    height: 32px !important;
    padding: 4px 4px !important;
    border-radius: 10px !important;
    font-size: .66rem !important;
    line-height: 1 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: clip !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-buttons .v4-stage-clear-action {
    color: #fecaca !important;
    border-color: rgba(248,113,113,.38) !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-draw-help {
    display: none !important;
  }

  /* Stage result cards: compact 3 per row. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body [data-stage-summary] .v4-summary-grid {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 6px !important;
    width: 100% !important;
    overflow: visible !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body [data-stage-summary] .v4-mini {
    min-height: 64px !important;
    padding: 7px 6px !important;
    border-radius: 13px !important;
    overflow: hidden !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body [data-stage-summary] .v4-mini b {
    font-size: clamp(.78rem, 3.4vw, .98rem) !important;
    line-height: 1.05 !important;
    overflow-wrap: anywhere !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body [data-stage-summary] .v4-mini span {
    font-size: .62rem !important;
    line-height: 1.1 !important;
    overflow-wrap: anywhere !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body [data-stage-summary] .v4-mini small {
    display: none !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body [data-stage-summary] .feg-stage-mobile-hidden {
    display: none !important;
  }


  /* 3.0.7: mobile zoom panel hotfix — stable compact two-row layout. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-panel,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish > .v4-stage-zoom-panel {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
    padding: 10px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls {
    display: grid !important;
    grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
    grid-template-rows: 36px 36px !important;
    gap: 7px !important;
    align-items: stretch !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > .v4-icon-btn {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
    padding: 0 !important;
    border-radius: 12px !important;
    font-size: 1.08rem !important;
    justify-self: center !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > .v4-icon-btn:first-of-type {
    grid-column: 1 / 3 !important;
    grid-row: 1 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > .v4-icon-btn:last-of-type {
    grid-column: 11 / 13 !important;
    grid-row: 1 !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > input[type="range"] {
    grid-column: 3 / 11 !important;
    grid-row: 1 !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    height: 36px !important;
    min-height: 36px !important;
    margin: 0 !important;
    padding: 0 2px !important;
    box-sizing: border-box !important;
    justify-self: stretch !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > button[data-stage-zoom-action="fit"],
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > button[data-stage-zoom-action="center"],
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > label.v4-stage-autofit {
    grid-row: 2 !important;
    min-width: 0 !important;
    width: 100% !important;
    height: 36px !important;
    min-height: 36px !important;
    max-height: 36px !important;
    padding: 0 5px !important;
    border-radius: 12px !important;
    font-size: .68rem !important;
    line-height: 1 !important;
    letter-spacing: .01em !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: clip !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > button[data-stage-zoom-action="fit"] { grid-column: 1 / 5 !important; }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > button[data-stage-zoom-action="center"] { grid-column: 5 / 9 !important; }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > label.v4-stage-autofit { grid-column: 9 / 13 !important; gap: 3px !important; }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-zoom-controls > label.v4-stage-autofit input {
    width: 16px !important;
    height: 16px !important;
    min-width: 16px !important;
    min-height: 16px !important;
    flex: 0 0 16px !important;
  }

  /* 3.0.7: restore finger/mouse drawing inside stage grid. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-canvas-wrap,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-polish .v4-visual-stage-grid,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-polish .v4-stage-cell {
    touch-action: none !important;
    user-select: none !important;
    -webkit-user-select: none !important;
    -webkit-touch-callout: none !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-polish .v4-stage-cell {
    pointer-events: auto !important;
  }

  /* 3.0.7: hide mobile-only technical notes everywhere inside the Stage constructor. */
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish .feg-stage-mobile-hidden,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-structure-stage.v4-stage-polish .feg-stage-mobile-tech-hidden {
    display: none !important;
  }
}

@media (max-width: 390px) {
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--build,
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack--closure {
    gap: 5px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-control-stack :is(input,select) {
    font-size: 14px !important;
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-box {
    grid-template-columns: 66px minmax(0, 1fr) !important;
    gap: 4px !important;
    padding: 6px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-box > span {
    font-size: .48rem !important;
    letter-spacing: .035em !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-buttons {
    gap: 3px !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-buttons button {
    font-size: .61rem !important;
    padding-left: 2px !important;
    padding-right: 2px !important;
  }
}
`;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      style.setAttribute('data-feg-version', '3.0.9-mobile-stage-ui');
      document.head.appendChild(style);
    }
    style.textContent = css;
  }

  function isMobile() {
    return !MOBILE_MQL || MOBILE_MQL.matches;
  }

  function hideStageTechnicalBlocks(root) {
    if (!root) return;
    root.querySelectorAll('.v4-note, .v4-mini, [class*="note"], [class*="mini"]').forEach(node => {
      const text = (node.textContent || '').toLowerCase();
      if (text.includes('связь столб/перекладина') ||
          text.includes('stage bom bridge') ||
          text.includes('shared bom stage') ||
          text.includes('bom contract')) {
        node.classList.add('feg-stage-mobile-hidden', 'feg-stage-mobile-tech-hidden');
        node.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function syncEdgeClosure(root) {
    if (!root) return;
    root.querySelectorAll('.v4-stage-control-stack--closure').forEach(stack => {
      const checkbox = stack.querySelector('input[data-stage-edge-enabled]');
      const field = stack.querySelector('label.v4-field');
      if (!field) return;
      const enabled = !!(checkbox && checkbox.checked);
      field.hidden = !enabled;
      field.classList.toggle('feg-stage-mobile-edge-hidden', !enabled);
    });
  }

  function moveClearButton(root) {
    if (!root) return;
    const toolButtons = root.querySelector('.v4-stage-tool-buttons');
    const clearBtn = root.querySelector('.v4-stage-clear-action');
    if (!toolButtons || !clearBtn || toolButtons.contains(clearBtn)) return;
    clearBtn.textContent = 'Очистить';
    toolButtons.appendChild(clearBtn);
  }


  function shortenStageZoomLabels(root) {
    if (!root) return;
    const fit = root.querySelector('button[data-stage-zoom-action="fit"]');
    const center = root.querySelector('button[data-stage-zoom-action="center"]');
    const auto = root.querySelector('label.v4-stage-autofit');
    if (fit) fit.textContent = 'По размеру';
    if (center) center.textContent = 'Центр';
    if (auto) {
      const input = auto.querySelector('input');
      auto.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = '';
      });
      if (input && !auto.contains(input)) auto.prepend(input);
      if (!auto.querySelector('.feg-stage-autofit-text')) {
        const span = document.createElement('span');
        span.className = 'feg-stage-autofit-text';
        span.textContent = 'Авто';
        auto.appendChild(span);
      } else {
        auto.querySelector('.feg-stage-autofit-text').textContent = 'Авто';
      }
    }
  }

  function restoreStageDrawingTouch(root) {
    if (!root) return;
    const canvas = root.querySelector('[data-stage-canvas-wrap]');
    const grid = root.querySelector('[data-stage-grid]');
    [canvas, grid].forEach(el => {
      if (!el) return;
      el.style.touchAction = 'none';
      el.style.webkitUserSelect = 'none';
      el.style.userSelect = 'none';
    });
    root.querySelectorAll('.v4-stage-cell').forEach(cell => {
      cell.style.touchAction = 'none';
      cell.style.pointerEvents = 'auto';
      cell.style.webkitUserSelect = 'none';
      cell.style.userSelect = 'none';
    });
  }


  function stagePointerEvent(type, touch) {
    if (!touch) return null;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      pointerId: 1,
      pointerType: 'touch',
      isPrimary: true,
      clientX: touch.clientX,
      clientY: touch.clientY,
      screenX: touch.screenX || touch.clientX,
      screenY: touch.screenY || touch.clientY,
      pageX: touch.pageX || touch.clientX,
      pageY: touch.pageY || touch.clientY,
      buttons: type === 'pointerup' || type === 'pointercancel' ? 0 : 1
    };
    try {
      return typeof PointerEvent === 'function' ? new PointerEvent(type, init) : new MouseEvent(type === 'pointermove' ? 'mousemove' : (type === 'pointerup' ? 'mouseup' : 'mousemove'), init);
    } catch (_) {
      return null;
    }
  }

  function bindStageTouchDragProxy(root) {
    if (!root || root.__fegStageTouchDragProxyBound) return;
    const canvas = root.querySelector('[data-stage-canvas-wrap]');
    const grid = root.querySelector('[data-stage-grid]');
    const target = grid || canvas;
    if (!target) return;
    root.__fegStageTouchDragProxyBound = true;

    const hasDrawing = () => !!(root._v4StructureVisual && root._v4StructureVisual.state && root._v4StructureVisual.state.isDrawing);
    const proxyMove = event => {
      if (!hasDrawing()) return;
      const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
      if (!touch) return;
      event.preventDefault();
      const pe = stagePointerEvent('pointermove', touch);
      if (pe) document.dispatchEvent(pe);
    };
    const proxyEnd = event => {
      if (!hasDrawing()) return;
      const touch = event.changedTouches && event.changedTouches[0] || event.touches && event.touches[0];
      if (event.cancelable) event.preventDefault();
      const pe = stagePointerEvent('pointerup', touch || { clientX: 0, clientY: 0 });
      if (pe) document.dispatchEvent(pe);
    };
    target.addEventListener('touchmove', proxyMove, { passive: false, capture: true });
    target.addEventListener('touchend', proxyEnd, { passive: false, capture: true });
    target.addEventListener('touchcancel', proxyEnd, { passive: false, capture: true });
  }

  function tuneOpenStage() {
    if (!isMobile()) return;
    document.querySelectorAll('.v4-quick-modal-backdrop.open .v4-structure-stage.v4-stage-polish').forEach(root => {
      moveClearButton(root);
      syncEdgeClosure(root);
      hideStageTechnicalBlocks(root);
      shortenStageZoomLabels(root);
      restoreStageDrawingTouch(root);
      bindStageTouchDragProxy(root);
    });
  }

  function delayedTune() {
    tuneOpenStage();
    setTimeout(tuneOpenStage, 80);
    setTimeout(tuneOpenStage, 260);
  }

  function boot() {
    installStyle();
    delayedTune();
    document.addEventListener('change', event => {
      const target = event.target;
      if (target && target.matches && target.matches('input[data-stage-edge-enabled]')) delayedTune();
    }, { passive: true });
    document.addEventListener('click', event => {
      const target = event.target;
      if (!target || !target.closest) return;
      if (target.closest('.v4-quick-tile,[data-stage-action],[data-stage-tool],[data-stage-template],[data-stage-zoom-action],.v4-stage-cell')) delayedTune();
    }, { passive: true });
    window.addEventListener('resize', delayedTune, { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(delayedTune, 220), { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();

  window.FEGModules = window.FEGModules || {};
  window.FEGModules.StandaloneMobileStageUiTuning = {
    version: '3.0.9-mobile-stage-ui',
    scan: delayedTune
  };
})();
