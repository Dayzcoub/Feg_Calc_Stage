(function () {
  'use strict';

  const STYLE_ID = 'feg-standalone-mobile-stage-ui-v3-0-6';
  const MOBILE_MQL = window.matchMedia ? window.matchMedia('(max-width: 860px), (pointer: coarse) and (max-width: 1024px)') : null;

  const css = `
/* FEG Stage PRO 3.0.6 — mobile-only Stage UI tuning.
   Scope: quick standalone mobile Stage constructor only. Desktop layout is untouched. */
@media (max-width: 860px), (pointer: coarse) and (max-width: 1024px) {
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
    grid-template-columns: auto minmax(0, 1fr) !important;
    align-items: center !important;
    gap: 8px !important;
    width: 100% !important;
    padding: 8px !important;
    border-radius: 16px !important;
    background: rgba(8, 12, 18, .9) !important;
    border: 1px solid rgba(255,255,255,.09) !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-box > span {
    font-size: .72rem !important;
    line-height: 1.1 !important;
    color: #a7b0bd !important;
    text-transform: uppercase !important;
    letter-spacing: .08em !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-buttons {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 6px !important;
    width: 100% !important;
  }
  body.v4-only-body.quick-standalone-body .v4-quick-modal-body .v4-stage-tool-buttons button {
    min-height: 34px !important;
    height: 34px !important;
    padding: 5px 7px !important;
    border-radius: 11px !important;
    font-size: .76rem !important;
    line-height: 1.05 !important;
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
    grid-template-columns: minmax(0, 1fr) !important;
  }
}
`;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      style.setAttribute('data-feg-version', '3.0.6-mobile-stage-ui');
      document.head.appendChild(style);
    }
    style.textContent = css;
  }

  function isMobile() {
    return !MOBILE_MQL || MOBILE_MQL.matches;
  }

  function hideStageTechnicalBlocks(root) {
    if (!root) return;
    root.querySelectorAll('[data-stage-summary] .v4-note').forEach(note => {
      const text = (note.textContent || '').toLowerCase();
      if (text.includes('связь столб/перекладина') || text.includes('stage bom bridge')) {
        note.classList.add('feg-stage-mobile-hidden');
      }
    });
    root.querySelectorAll('[data-stage-summary] .v4-mini').forEach(card => {
      const text = (card.textContent || '').toLowerCase();
      if (text.includes('shared bom stage') || text.includes('bom contract')) {
        card.classList.add('feg-stage-mobile-hidden');
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

  function tuneOpenStage() {
    if (!isMobile()) return;
    document.querySelectorAll('.v4-quick-modal-backdrop.open .v4-structure-stage.v4-stage-polish').forEach(root => {
      moveClearButton(root);
      syncEdgeClosure(root);
      hideStageTechnicalBlocks(root);
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
    version: '3.0.6-mobile-stage-ui',
    scan: delayedTune
  };
})();
