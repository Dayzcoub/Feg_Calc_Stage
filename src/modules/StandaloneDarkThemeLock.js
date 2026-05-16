(function () {
  'use strict';

  const STYLE_ID = 'feg-standalone-dark-theme-lock-v3';
  const css = `
/* FEG Stage PRO 3.0 standalone desktop Safari dark theme lock.
   Purpose: standalone quick constructors must stay in the same dark V4 palette
   on every browser, even if Safari has an old localStorage appTheme=light value. */
html[data-app-theme="light"], html[data-app-theme="dark"] {
  color-scheme: dark !important;
  background:#08090a !important;
}
body.v4-only-body.quick-standalone-body,
body.v4-only-body.quick-standalone-body.theme-light,
body.v4-only-body.quick-standalone-body.theme-dark {
  --bg:#08090a !important;
  --bg-2:#0b0c0d !important;
  --panel:#0f1011 !important;
  --panel-2:#121315 !important;
  --panel-3:#16171a !important;
  --surface:#0f1011 !important;
  --surface-raised:#121315 !important;
  --surface-elevated:#17181b !important;
  --line:rgba(255,255,255,.105) !important;
  --line-soft:rgba(255,255,255,.065) !important;
  --text:#d8dbe0 !important;
  --ink:#d8dbe0 !important;
  --text-strong:#eef0f3 !important;
  --muted:#8f949d !important;
  --muted-2:#646a73 !important;
  --accent:#f2c94c !important;
  --accent-dark:#9f7d10 !important;
  --accent-soft:rgba(242,201,76,.14) !important;
  --accent-line:rgba(242,201,76,.44) !important;
  --shadow-soft:0 18px 42px rgba(0,0,0,.36) !important;
  --shadow-card:0 8px 22px rgba(0,0,0,.20) !important;
  background:#08090a !important;
  color:#d8dbe0 !important;
}
body.v4-only-body.quick-standalone-body .v4-shell,
body.v4-only-body.quick-standalone-body .v4-wide-section,
body.v4-only-body.quick-standalone-body .app-container {
  background:#0f1011 !important;
  color:#d8dbe0 !important;
  border-color:rgba(255,255,255,.105) !important;
}
body.v4-only-body.quick-standalone-body .quick-release-splash {
  background:#0f1011 !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-card,.v4-hero,.v4-dashboard-panel,.v4-wide-section,.v4-active-step-card,.v4-quote-form,.v4-dashboard-group,.v4-mini,.v4-role-card,.v4-section-card,.v4-settings-card,.v4-report-panel,.v4-sync-panel,.v4-summary-card,.client-area,.stage-editor-card,.v4-stage-template-panel,.v4-stage-frame-auto-card,.v4-stage-tool-box,.v4-truss-template-panel,.v4-truss-template-card,.v4-truss-edit-tools,.v4-truss-library,.v4-truss-group,.v4-led-panel-block,.v4-led-canvas-panel,.v4-led-construction-report,.v4-load-indicator,.v4-truss-v3-load-summary,.v4-truss-v3-tables,.v4-truss-final-kit,.v4-bom-details,.v4-bom-source-card) {
  background:#111214 !important;
  color:#d8dbe0 !important;
  border-color:rgba(255,255,255,.105) !important;
  box-shadow:none !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-quick-modal,.pdf-modal,.weights-modal,.v4-truss-load-dialog-card,.v4-equipment-editor,.modal,dialog) {
  background:#0f1011 !important;
  color:#d8dbe0 !important;
  border-color:rgba(255,255,255,.105) !important;
  box-shadow:0 24px 80px rgba(0,0,0,.62) !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-quick-modal-backdrop.open,.modal-backdrop.open,.v4-truss-load-dialog::backdrop,dialog::backdrop) {
  background:rgba(0,0,0,.86) !important;
  -webkit-backdrop-filter:blur(10px) !important;
  backdrop-filter:blur(10px) !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-quick-modal-head,.pdf-modal-header,.weights-modal-header,.v4-truss-dialog-head) {
  background:#121315 !important;
  color:#eef0f3 !important;
  border-color:rgba(255,255,255,.105) !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-quick-modal-body,.pdf-modal-body,.weights-modal-body) {
  background:#0f1011 !important;
  color:#d8dbe0 !important;
}
body.v4-only-body.quick-standalone-body :is(h1,h2,h3,h4,h5,h6,b,strong,.v4-quick-modal-head h3,.v4-card h3,.v4-panel-title) {
  color:#eef0f3 !important;
  -webkit-text-fill-color:#eef0f3 !important;
}
body.v4-only-body.quick-standalone-body :is(p,li,td,th,label,small,span,summary,.v4-muted,.v4-note,.hint) {
  color:#d8dbe0 !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-muted,small,.v4-note,.hint,.v4-kicker,label,th,.v4-field-subspan) {
  color:#8f949d !important;
  -webkit-text-fill-color:#8f949d !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-kicker,.v4-badge,.v4-demo-badge,.v4-dashboard-badge,.v4-truss-mode-pill,.v4-stage-draw-pill,.v4-led-grid-note) {
  color:#f2c94c !important;
  -webkit-text-fill-color:#f2c94c !important;
}
body.v4-only-body.quick-standalone-body :is(input,select,textarea) {
  background:#0d0e10 !important;
  color:#eef0f3 !important;
  -webkit-text-fill-color:#eef0f3 !important;
  border:1px solid rgba(255,255,255,.105) !important;
  box-shadow:none !important;
  color-scheme:dark !important;
}
body.v4-only-body.quick-standalone-body :is(input::placeholder,textarea::placeholder) {
  color:#646a73 !important;
  -webkit-text-fill-color:#646a73 !important;
}
body.v4-only-body.quick-standalone-body select option {
  background:#0d0e10 !important;
  color:#eef0f3 !important;
}
body.v4-only-body.quick-standalone-body :is(button,.btn-secondary,.v4-mode-btn,.v4-icon-btn,.v4-mini-button,.v4-dashboard-chip,.v4-truss-group-body button,.v4-truss-library .block-object-group-body button,.v4-led-template-grid button,.v4-stage-tool-buttons button) {
  background:#151719 !important;
  color:#eef0f3 !important;
  -webkit-text-fill-color:#eef0f3 !important;
  border-color:rgba(255,255,255,.105) !important;
  box-shadow:none !important;
}
body.v4-only-body.quick-standalone-body :is(button:hover,.btn-secondary:hover,.v4-mode-btn:hover,.v4-icon-btn:hover,.v4-mini-button:hover,.v4-dashboard-chip:hover,.v4-truss-group-body button:hover,.v4-truss-library .block-object-group-body button:hover,.v4-led-template-grid button:hover,.v4-stage-tool-buttons button:hover) {
  background:#191a1d !important;
  border-color:rgba(242,201,76,.44) !important;
}
body.v4-only-body.quick-standalone-body :is(.btn-primary,button.btn-primary,.btn-success,button.btn-success) {
  background:#1a1b1e !important;
  color:#f7f7f8 !important;
  -webkit-text-fill-color:#f7f7f8 !important;
  border-color:rgba(242,201,76,.44) !important;
}
body.v4-only-body.quick-standalone-body :is(.btn-danger,button.btn-danger,.close-modal,[data-v4-quick-modal-close]) {
  background:#241112 !important;
  color:#ffb4ab !important;
  -webkit-text-fill-color:#ffb4ab !important;
  border-color:rgba(239,68,68,.42) !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-table-wrap,.v4-table-container,.table-wrap,.orders-table-wrap,.truss-project-table-wrap,.client-table-wrap,.block-calc-table-wrap,.block-bom-wrap) {
  background:#0f1011 !important;
  border-color:rgba(255,255,255,.105) !important;
}
body.v4-only-body.quick-standalone-body :is(table,.v4-table,.block-calc-table,.block-bom,.orders-table,.truss-project-table,.client-table) {
  background:#0f1011 !important;
  color:#d8dbe0 !important;
}
body.v4-only-body.quick-standalone-body :is(th,.v4-table th,.block-calc-table th,.block-bom th,.orders-table th,.truss-project-table th,.client-table th) {
  background:#121315 !important;
  color:#8f949d !important;
  border-color:rgba(255,255,255,.065) !important;
}
body.v4-only-body.quick-standalone-body :is(td,.v4-table td,.block-calc-table td,.block-bom td,.orders-table td,.truss-project-table td,.client-table td) {
  background:#0f1011 !important;
  color:#d8dbe0 !important;
  border-color:rgba(255,255,255,.065) !important;
}
body.v4-only-body.quick-standalone-body :is(tr:hover td) {
  background:#121315 !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-note,.v4-hint-card,.v4-visual-preview-meta,.v4-led-grid-note,.hint,.result-card) {
  background:#111214 !important;
  color:#8f949d !important;
  border-color:rgba(255,255,255,.105) !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-stage-canvas-wrap,.v4-visual-stage-grid,.v4-led-grid-wrap,.v4-visual-preview-canvas,.v4-truss-field-wrap,.v4-truss-field,.v4-structure-canvas,.v4-led-workbench) {
  background:#0a0b0c !important;
  border-color:rgba(255,255,255,.105) !important;
  color:#d8dbe0 !important;
  box-shadow:none !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-visual-stage-grid,.v4-truss-field,.v4-led-grid-wrap) {
  background-image:linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px) !important;
  background-color:#0a0b0c !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-stage-cell,.stage-cell) {
  background:#111214 !important;
  color:#eef0f3 !important;
  border-color:rgba(255,255,255,.14) !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-stage-cell:hover,.stage-cell:hover) {
  background:#172020 !important;
  border-color:rgba(242,201,76,.44) !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-stage-cell.selected,.stage-cell.active) {
  background:#1c1d20 !important;
  color:#f7f7f8 !important;
  -webkit-text-fill-color:#f7f7f8 !important;
  border-color:rgba(242,201,76,.44) !important;
  box-shadow:inset 0 0 0 1px rgba(242,201,76,.20) !important;
}
body.v4-only-body.quick-standalone-body .v4-led-grid .v4-led-cell {
  background:#111214 !important;
  border-color:rgba(255,255,255,.15) !important;
  box-shadow:none !important;
}
body.v4-only-body.quick-standalone-body .v4-led-grid .v4-led-cell:hover {
  background:#172020 !important;
  border-color:rgba(242,201,76,.44) !important;
}
body.v4-only-body.quick-standalone-body .v4-led-grid .v4-led-cell.filled {
  color:#f7f7f8 !important;
  -webkit-text-fill-color:#f7f7f8 !important;
  border-color:rgba(var(--led-construction-rgb, 120,183,183), .70) !important;
  background:linear-gradient(135deg, rgba(var(--led-construction-rgb,120,183,183),.42), rgba(8,10,12,.94)) !important;
}
body.v4-only-body.quick-standalone-body .v4-truss-field .block-item {
  background:transparent !important;
  color:#eef0f3 !important;
  border-color:transparent !important;
  box-shadow:none !important;
}
body.v4-only-body.quick-standalone-body .v4-truss-field .block-item.selected {
  outline:2px solid rgba(242,201,76,.44) !important;
  outline-offset:2px !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-truss-field .truss-label,.v4-truss-field .node-label) {
  fill:#f7f7f8 !important;
  stroke:#08090a !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-truss-zoom-panel,.v4-stage-zoom-panel,.v4-led-zoom-panel,.v4-truss-edit-tools) {
  background:#111214 !important;
  border-color:rgba(255,255,255,.105) !important;
  color:#d8dbe0 !important;
}
body.v4-only-body.quick-standalone-body :is(.v4-truss-zoom-controls input[type="range"],.v4-stage-zoom-controls input[type="range"],.v4-led-zoom-controls input[type="range"]) {
  accent-color:#f2c94c !important;
  -webkit-text-fill-color:initial !important;
}
body.v4-only-body.quick-standalone-body * {
  scrollbar-color:rgba(242,201,76,.34) #0b0c0d;
}
body.v4-only-body.quick-standalone-body ::selection {
  background:rgba(242,201,76,.24);
  color:#f7f7f8;
}
`;

  let applying = false;

  function persistDarkPreference() {
    try { window.localStorage.setItem('appTheme', 'dark'); } catch (err) {}
  }

  function forceDarkClasses() {
    const doc = document;
    if (!doc || !doc.body || !doc.documentElement) return;
    applying = true;
    doc.body.classList.remove('theme-light');
    doc.body.classList.add('theme-dark');
    doc.body.setAttribute('data-app-theme', 'dark');
    doc.documentElement.setAttribute('data-app-theme', 'dark');
    doc.documentElement.style.colorScheme = 'dark';
    const metaTheme = doc.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', '#0f1011');
    applying = false;
  }

  function injectStyle() {
    let style = document.getElementById(STYLE_ID);
    const parent = document.body || document.documentElement;
    if (!parent) return;
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      style.setAttribute('data-feg-version', '3.0.1-safari-desktop-dark-lock');
      style.textContent = css;
      parent.appendChild(style);
    } else if (style.textContent !== css) {
      style.textContent = css;
    }
    if (style.parentNode !== parent || style.nextElementSibling) parent.appendChild(style);
  }

  function apply() {
    persistDarkPreference();
    forceDarkClasses();
    injectStyle();
  }

  apply();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
  setTimeout(apply, 0);
  setTimeout(apply, 250);
  setTimeout(apply, 1000);

  if (window.MutationObserver) {
    const startObserver = function () {
      if (!document.body) return;
      const observer = new MutationObserver(function () {
        if (applying) return;
        if (document.body.classList.contains('theme-light') || document.documentElement.getAttribute('data-app-theme') === 'light') {
          apply();
        }
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-app-theme'] });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-app-theme', 'style'] });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startObserver, { once: true });
    else startObserver();
  }

  window.FEG_STANDALONE_DARK_THEME_LOCK = {
    version: '3.0.1-safari-desktop-dark-lock',
    refresh: apply
  };
})();
