(function () {
  'use strict';

  const STYLE_ID = 'feg-mobile-dark-ui-parity-v3';
  const css = `
/* v3.0 mobile dark UI parity — keeps constructor logic untouched.
   Mobile/tablet touch layouts now use the same compact dark palette as the desktop V4 UI. */
@media (max-width: 767px) {
  body.v4-only-body.quick-standalone-body {
    --bg:#08090a;
    --bg-2:#0b0c0d;
    --panel:#0f1011;
    --panel-2:#121315;
    --panel-3:#16171a;
    --surface:#0f1011;
    --surface-raised:#121315;
    --surface-elevated:#17181b;
    --line:rgba(255,255,255,.105);
    --line-soft:rgba(255,255,255,.065);
    --text:#d8dbe0;
    --ink:#d8dbe0;
    --text-strong:#eef0f3;
    --muted:#8f949d;
    --muted-2:#646a73;
    --accent:#f2c94c;
    --accent-dark:#9f7d10;
    --accent-soft:rgba(242,201,76,.14);
    --accent-line:rgba(242,201,76,.44);
    background:#08090a !important;
    color:var(--text) !important;
  }

  body.v4-only-body.quick-standalone-body :where(.v4-quick-modal, .pdf-modal, .weights-modal, .v4-truss-load-dialog-card, .v4-equipment-editor, .modal, dialog) {
    background:#0f1011 !important;
    color:var(--text) !important;
    border-color:var(--line) !important;
    box-shadow:0 24px 80px rgba(0,0,0,.62) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-quick-modal-backdrop.open, .modal-backdrop.open, .v4-truss-load-dialog::backdrop, dialog::backdrop) {
    background:rgba(0,0,0,.86) !important;
    backdrop-filter:blur(10px) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-quick-modal-head, .pdf-modal-header, .weights-modal-header, .v4-truss-dialog-head) {
    background:#121315 !important;
    color:var(--text-strong) !important;
    border-color:var(--line) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-quick-modal-body, .pdf-modal-body, .weights-modal-body) {
    background:#0f1011 !important;
    color:var(--text) !important;
  }

  body.v4-only-body.quick-standalone-body :where(h1,h2,h3,h4,h5,h6,b,strong,.v4-quick-modal-head h3,.v4-card h3,.v4-panel-title) {
    color:var(--text-strong) !important;
    -webkit-text-fill-color:var(--text-strong) !important;
  }
  body.v4-only-body.quick-standalone-body :where(p,li,td,th,label,small,span,summary,.v4-muted,.v4-note,.hint) {
    color:var(--text) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-muted,small,.v4-note,.hint,.v4-kicker,label,th,.v4-field-subspan) {
    color:var(--muted) !important;
    -webkit-text-fill-color:var(--muted) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-kicker,.v4-badge,.v4-demo-badge,.v4-dashboard-badge,.v4-truss-mode-pill,.v4-stage-draw-pill,.v4-led-grid-note) {
    color:var(--accent) !important;
    -webkit-text-fill-color:var(--accent) !important;
  }

  body.v4-only-body.quick-standalone-body :where(input,select,textarea) {
    background:#0d0e10 !important;
    color:var(--text-strong) !important;
    -webkit-text-fill-color:var(--text-strong) !important;
    border:1px solid var(--line) !important;
    box-shadow:none !important;
  }
  body.v4-only-body.quick-standalone-body :where(input::placeholder,textarea::placeholder) {
    color:var(--muted-2) !important;
    -webkit-text-fill-color:var(--muted-2) !important;
  }
  body.v4-only-body.quick-standalone-body select option {
    background:#0d0e10 !important;
    color:var(--text-strong) !important;
  }
  body.v4-only-body.quick-standalone-body :where(button,.btn-secondary,.v4-mode-btn,.v4-icon-btn,.v4-mini-button,.v4-dashboard-chip,.v4-truss-group-body button,.v4-truss-library .block-object-group-body button,.v4-led-template-grid button,.v4-stage-tool-buttons button) {
    background:#151719 !important;
    color:var(--text-strong) !important;
    -webkit-text-fill-color:var(--text-strong) !important;
    border-color:var(--line) !important;
    box-shadow:none !important;
  }
  body.v4-only-body.quick-standalone-body :where(button:hover,.btn-secondary:hover,.v4-mode-btn:hover,.v4-icon-btn:hover,.v4-mini-button:hover,.v4-dashboard-chip:hover,.v4-truss-group-body button:hover,.v4-truss-library .block-object-group-body button:hover,.v4-led-template-grid button:hover,.v4-stage-tool-buttons button:hover) {
    background:#191a1d !important;
    border-color:var(--accent-line) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.btn-primary,button.btn-primary,.btn-success,button.btn-success) {
    background:#1a1b1e !important;
    color:#f7f7f8 !important;
    -webkit-text-fill-color:#f7f7f8 !important;
    border-color:var(--accent-line) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.btn-danger,button.btn-danger,.close-modal,[data-v4-quick-modal-close]) {
    background:#241112 !important;
    color:#ffb4ab !important;
    -webkit-text-fill-color:#ffb4ab !important;
    border-color:rgba(239,68,68,.42) !important;
  }

  body.v4-only-body.quick-standalone-body :where(.v4-card,.v4-hero,.v4-dashboard-panel,.v4-wide-section,.v4-active-step-card,.v4-quote-form,.v4-mini,.v4-role-card,.v4-section-card,.v4-settings-card,.v4-report-panel,.v4-sync-panel,.v4-summary-card,.client-area,.stage-editor-card,.v4-stage-template-panel,.v4-stage-frame-auto-card,.v4-stage-tool-box,.v4-truss-template-panel,.v4-truss-template-card,.v4-truss-edit-tools,.v4-truss-library,.v4-truss-group,.v4-led-panel-block,.v4-led-canvas-panel,.v4-led-construction-report,.v4-load-indicator,.v4-truss-v3-load-summary,.v4-truss-v3-tables,.v4-truss-final-kit,.v4-bom-details,.v4-bom-source-card) {
    background:#111214 !important;
    color:var(--text) !important;
    border-color:var(--line) !important;
    box-shadow:none !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-mini,.v4-truss-template-card,.v4-stage-tool-box,.v4-led-panel-block,.v4-led-canvas-panel,.v4-led-construction-report) :where(b,strong,h4) {
    color:var(--text-strong) !important;
    -webkit-text-fill-color:var(--text-strong) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-note,.v4-hint-card,.v4-visual-preview-meta,.v4-led-grid-note,.hint,.result-card) {
    background:#111214 !important;
    color:var(--muted) !important;
    border-color:var(--line) !important;
  }

  body.v4-only-body.quick-standalone-body :where(.v4-table-wrap,.v4-table-container,.table-wrap,.orders-table-wrap,.truss-project-table-wrap,.client-table-wrap,.block-calc-table-wrap,.block-bom-wrap) {
    background:#0f1011 !important;
    border-color:var(--line) !important;
  }
  body.v4-only-body.quick-standalone-body :where(table,.v4-table,.block-calc-table,.block-bom,.orders-table,.truss-project-table,.client-table) {
    background:#0f1011 !important;
    color:var(--text) !important;
  }
  body.v4-only-body.quick-standalone-body :where(th,.v4-table th,.block-calc-table th,.block-bom th,.orders-table th,.truss-project-table th,.client-table th) {
    background:#121315 !important;
    color:var(--muted) !important;
    border-color:var(--line-soft) !important;
  }
  body.v4-only-body.quick-standalone-body :where(td,.v4-table td,.block-calc-table td,.block-bom td,.orders-table td,.truss-project-table td,.client-table td) {
    background:#0f1011 !important;
    color:var(--text) !important;
    border-color:var(--line-soft) !important;
  }
  body.v4-only-body.quick-standalone-body :where(tr:hover td) {
    background:#121315 !important;
  }

  body.v4-only-body.quick-standalone-body :where(.v4-stage-canvas-wrap,.v4-visual-stage-grid,.v4-led-grid-wrap,.v4-visual-preview-canvas,.v4-truss-field-wrap,.v4-truss-field,.v4-structure-canvas,.v4-led-workbench) {
    background:#0a0b0c !important;
    border-color:var(--line) !important;
    color:var(--text) !important;
    box-shadow:none !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-visual-stage-grid,.v4-truss-field,.v4-led-grid-wrap) {
    background-image:linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px) !important;
    background-color:#0a0b0c !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-stage-cell,.stage-cell) {
    background:#111214 !important;
    color:var(--text-strong) !important;
    border-color:rgba(255,255,255,.14) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-stage-cell:hover,.stage-cell:hover) {
    background:#172020 !important;
    border-color:var(--accent-line) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-stage-cell.selected,.stage-cell.active) {
    background:#1c1d20 !important;
    color:#f7f7f8 !important;
    -webkit-text-fill-color:#f7f7f8 !important;
    border-color:var(--accent-line) !important;
    box-shadow:inset 0 0 0 1px rgba(242,201,76,.20) !important;
  }

  body.v4-only-body.quick-standalone-body .v4-led-grid .v4-led-cell {
    background:#111214 !important;
    border-color:rgba(255,255,255,.15) !important;
    box-shadow:none !important;
  }
  body.v4-only-body.quick-standalone-body .v4-led-grid .v4-led-cell:hover {
    background:#172020 !important;
    border-color:var(--accent-line) !important;
  }
  body.v4-only-body.quick-standalone-body .v4-led-grid .v4-led-cell.filled {
    color:#f7f7f8 !important;
    -webkit-text-fill-color:#f7f7f8 !important;
    border-color:rgba(var(--led-construction-rgb, 120,183,183), .70) !important;
    background:linear-gradient(135deg, rgba(var(--led-construction-rgb,120,183,183),.42), rgba(8,10,12,.94)) !important;
  }
  body.v4-only-body.quick-standalone-body .v4-led-part-chip {
    background:#151719 !important;
    color:var(--text-strong) !important;
    border-color:var(--line) !important;
  }
  body.v4-only-body.quick-standalone-body .v4-led-part-chip span {
    color:var(--muted) !important;
    -webkit-text-fill-color:var(--muted) !important;
  }

  body.v4-only-body.quick-standalone-body .v4-truss-field-wrap {
    background:#050608 !important;
    border-color:var(--line) !important;
  }
  body.v4-only-body.quick-standalone-body .v4-truss-field {
    background-color:#0a0b0c !important;
    background-image:linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px) !important;
  }
  body.v4-only-body.quick-standalone-body .v4-truss-field .block-item {
    background:transparent !important;
    color:var(--text-strong) !important;
    border-color:transparent !important;
    box-shadow:none !important;
  }
  body.v4-only-body.quick-standalone-body .v4-truss-field .block-item.selected {
    outline:2px solid var(--accent-line) !important;
    outline-offset:2px !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-truss-field .truss-label,.v4-truss-field .node-label) {
    fill:#f7f7f8 !important;
    stroke:#08090a !important;
  }

  body.v4-only-body.quick-standalone-body :where(.v4-truss-zoom-panel,.v4-stage-zoom-panel,.v4-led-zoom-panel,.v4-truss-edit-tools) {
    background:#111214 !important;
    border-color:var(--line) !important;
    color:var(--text) !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-truss-zoom-controls input[type="range"],.v4-stage-zoom-controls input[type="range"],.v4-led-zoom-controls input[type="range"]) {
    accent-color:var(--accent) !important;
    -webkit-text-fill-color:initial !important;
  }
  body.v4-only-body.quick-standalone-body :where(.v4-truss-autofit,.v4-stage-autofit,.v4-led-autofit) {
    color:var(--muted) !important;
    -webkit-text-fill-color:var(--muted) !important;
  }

  body.v4-only-body.quick-standalone-body * {
    scrollbar-color:rgba(242,201,76,.34) #0b0c0d;
  }
  body.v4-only-body.quick-standalone-body ::selection {
    background:rgba(242,201,76,.24);
    color:#f7f7f8;
  }
}
`;

  function isLightThemeEnabled() {
    try {
      if (window.FEG_ENABLE_LIGHT_THEME === true) return true;
      if (window.localStorage && window.localStorage.getItem('fegLightThemeEnabled') === '1') return true;
    } catch (err) {}
    return !!(document.documentElement && document.documentElement.getAttribute('data-feg-light-theme-enabled') === 'true');
  }

  function isLightThemeActive() {
    return isLightThemeEnabled() && document.documentElement && document.documentElement.getAttribute('data-app-theme') === 'light';
  }

  function remove() {
    const style = document.getElementById(STYLE_ID);
    if (style && style.parentNode) style.parentNode.removeChild(style);
  }

  function inject() {
    if (isLightThemeActive()) {
      remove();
      return;
    }
    // Keep this style outside <head> to avoid fighting with V4DesignSystem's
    // head-level MutationObserver. Two observers moving their style nodes to
    // the end of <head> caused an infinite reorder loop in browsers, which
    // made the app hang on the title screen before constructor buttons loaded.
    let style = document.getElementById(STYLE_ID);
    const parent = document.body || document.documentElement;
    if (!parent) return;

    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      style.setAttribute('data-feg-version', '3.1.58-mobile-theme-guard');
      style.setAttribute('data-feg-style-scope', 'body-safe-no-head-observer');
      style.textContent = css;
      parent.appendChild(style);
      return;
    }

    if (style.textContent !== css) style.textContent = css;
    style.setAttribute('data-feg-version', '3.1.58-mobile-theme-guard');
    style.setAttribute('data-feg-style-scope', 'body-safe-no-head-observer');

    // Keep it as the last child of body/html so it wins in cascade without
    // triggering head MutationObserver reorder loops.
    if (style.parentNode !== parent || style.nextElementSibling) {
      parent.appendChild(style);
    }
  }

  inject();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject, { once: true });
  } else {
    inject();
  }
  setTimeout(inject, 0);
  setTimeout(inject, 250);
  setTimeout(inject, 1000);

  if (window.MutationObserver) {
    const startObserver = function () {
      const root = document.documentElement;
      if (!root) return;
      const observer = new MutationObserver(inject);
      observer.observe(root, { attributes: true, attributeFilter: ['data-app-theme', 'data-feg-light-theme-enabled'] });
      if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-app-theme'] });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startObserver, { once: true });
    else startObserver();
  }

  window.FEG_MOBILE_DARK_UI_PARITY = {
    version: '3.1.58-mobile-theme-guard',
    palette: 'desktop-v4-compact-dark-default',
    refresh: inject,
    isLightThemeActive
  };
})();
