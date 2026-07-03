(function () {
  'use strict';

  const STYLE_ID = 'feg-light-theme-shell-v4';
  const VERSION = '3.1.68-theme-toggle-move-load-indicator-contrast';

  const css = `
/* FEG Stage PRO v3.1.68 — theme toggle move + truss load indicator contrast.
   This layer is intentionally gated by AppSettings/feature flag and applies
   only when body has theme-light. It does not touch the default dark baseline. */
body.v4-only-body.quick-standalone-body.theme-light {
  --bg:#f3f5f2;
  --bg-2:#e9eee8;
  --panel:#ffffff;
  --panel-2:#f7faf7;
  --panel-3:#edf3ef;
  --surface:#ffffff;
  --surface-raised:#f7faf7;
  --surface-elevated:#edf3ef;
  --line:rgba(24,39,34,.16);
  --line-soft:rgba(24,39,34,.09);
  --text:#17201c;
  --ink:#17201c;
  --text-strong:#0c1511;
  --muted:#5f6c66;
  --muted-2:#6e7973; /* v5 a11y: raised from #87928c so placeholder text meets WCAG AA (4.5:1) on #fff fields */
  --accent:#2f5a52;
  --accent-dark:#223f3a;
  --accent-soft:rgba(47,90,82,.12);
  --accent-line:rgba(47,90,82,.38);
  --warning:#835512; /* v5 a11y: darkened from #9b6518 for AA (4.5:1) on all light surfaces */
  --danger:#9b2f2f;
  --success:#2f6b4f;
  --shadow-soft:0 18px 42px rgba(24,34,31,.12);
  --shadow-card:0 8px 22px rgba(24,34,31,.08);
  background:
    radial-gradient(circle at 12% 0%, rgba(47,90,82,.10), transparent 30%),
    radial-gradient(circle at 88% 8%, rgba(184,130,42,.08), transparent 32%),
    linear-gradient(180deg, #f5f7f4, #e9eee8) !important;
  color:var(--text) !important;
  color-scheme:light !important;
}

html[data-app-theme="light"],
html.theme-light {
  background:#f3f5f2 !important;
  color-scheme:light !important;
}

body.v4-only-body.quick-standalone-body.theme-light .app-container,
body.v4-only-body.quick-standalone-body.theme-light .v4-shell,
body.v4-only-body.quick-standalone-body.theme-light .v4-wide-section,
body.v4-only-body.quick-standalone-body.theme-light #quickStandalonePage,
body.v4-only-body.quick-standalone-body.theme-light #quickStandaloneMount {
  background:transparent !important;
  color:var(--text) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-card,.v4-hero,.v4-dashboard-panel,.v4-wide-section,.v4-active-step-card,.v4-quote-form,.v4-dashboard-group,.v4-mini,.v4-role-card,.v4-section-card,.v4-settings-card,.v4-report-panel,.v4-sync-panel,.v4-summary-card,.client-area,.stage-editor-card,.v4-stage-template-panel,.v4-stage-frame-auto-card,.v4-stage-tool-box,.v4-truss-template-panel,.v4-truss-template-card,.v4-truss-edit-tools,.v4-truss-library,.v4-truss-group,.v4-led-panel-block,.v4-led-canvas-panel,.v4-led-construction-report,.v4-load-indicator,.v4-truss-v3-load-summary,.v4-truss-v3-tables,.v4-truss-final-kit,.v4-bom-details,.v4-bom-source-card,.v4-visual-preview-panel,.v4-structure-workspace,.v4-structure-panel,.v4-structure-summary,.v4-bom-panel,.v4-quote-section,.v4-bom-source-card) {
  background:var(--panel) !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:var(--shadow-card) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-mini,.v4-role-card,.v4-dashboard-card,.v4-dashboard-primary,.v4-dashboard-chip,.v4-stage-frame-auto-card,.v4-stage-tool-box,.v4-truss-edit-tools,.v4-truss-library,.v4-truss-group,.v4-load-indicator,.v4-truss-v3-load-summary,.v4-truss-v3-tables,.v4-truss-final-kit,.v4-led-panel-block,.v4-led-canvas-panel,.v4-led-construction-report,.v4-bom-details,.v4-bom-source-card) {
  background:var(--panel-2) !important;
  border-color:var(--line) !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(h1,h2,h3,h4,h5,h6,b,strong,.v4-quick-modal-head h3,.v4-card h3,.v4-panel-title,.v4-section-title,.v4-template-title) {
  color:var(--text-strong) !important;
  -webkit-text-fill-color:var(--text-strong) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(p,li,td,th,label,small,span,summary,.v4-muted,.v4-note,.hint,.v4-field-subspan) {
  color:var(--text) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-muted,small,.v4-note,.hint,.v4-kicker,label,th,.v4-field-subspan,.v4-visual-preview-meta) {
  color:var(--muted) !important;
  -webkit-text-fill-color:var(--muted) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-kicker,.v4-badge,.v4-demo-badge,.v4-dashboard-badge,.v4-truss-mode-pill,.v4-stage-draw-pill,.v4-led-grid-note) {
  color:var(--accent) !important;
  -webkit-text-fill-color:var(--accent) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(input,select,textarea) {
  background:#ffffff !important;
  color:var(--text-strong) !important;
  -webkit-text-fill-color:var(--text-strong) !important;
  border:1px solid var(--line) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.82) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(input:focus,select:focus,textarea:focus) {
  border-color:var(--accent-line) !important;
  box-shadow:0 0 0 3px rgba(47,90,82,.12), inset 0 1px 0 rgba(255,255,255,.86) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(input::placeholder,textarea::placeholder) {
  color:var(--muted-2) !important;
  -webkit-text-fill-color:var(--muted-2) !important;
}

body.v4-only-body.quick-standalone-body.theme-light select option {
  background:#ffffff !important;
  color:var(--text-strong) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(button,.btn-secondary,.v4-mode-btn,.v4-icon-btn,.v4-mini-button,.v4-dashboard-chip,.v4-truss-group-body button,.v4-truss-library .block-object-group-body button,.v4-led-template-grid button,.v4-stage-tool-buttons button) {
  background:#ffffff !important;
  color:var(--text-strong) !important;
  -webkit-text-fill-color:var(--text-strong) !important;
  border-color:var(--line) !important;
  box-shadow:0 1px 0 rgba(255,255,255,.80) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(button:hover,.btn-secondary:hover,.v4-mode-btn:hover,.v4-icon-btn:hover,.v4-mini-button:hover,.v4-dashboard-chip:hover,.v4-truss-group-body button:hover,.v4-truss-library .block-object-group-body button:hover,.v4-led-template-grid button:hover,.v4-stage-tool-buttons button:hover) {
  background:#eef6f2 !important;
  border-color:var(--accent-line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.btn-primary,button.btn-primary,.btn-success,button.btn-success,.v4-dashboard-primary) {
  background:linear-gradient(180deg, #35665d, #254940) !important;
  color:#f7fbf9 !important;
  -webkit-text-fill-color:#f7fbf9 !important;
  border-color:rgba(47,90,82,.56) !important;
  box-shadow:0 8px 20px rgba(47,90,82,.16) !important;
}

/* v5 a11y/identity: gold leftovers that the dark palette leaves behind must follow the
   light theme's own green/teal accent instead of the dark rig-yellow. */
body.v4-only-body.quick-standalone-body.theme-light .feg-launch-guide-mark {
  background:linear-gradient(180deg, #35665d, #254940) !important;
  color:#f7fbf9 !important;
  -webkit-text-fill-color:#f7fbf9 !important;
  box-shadow:0 6px 12px rgba(24,34,31,.18), inset 0 1px 0 rgba(255,255,255,.28) !important;
}

/* No :where() here on purpose: the base gold rules use a body-chain + double-class
   selector (0,5,1), so the override must carry equal-or-higher specificity to win even
   with !important — .theme-light added to the body chain gives (0,6,1). */
body.v4-only-body.quick-standalone-body.theme-light .v4-mini.v4-mini--total {
  background:linear-gradient(180deg, var(--accent-soft), rgba(47,90,82,.03)) !important;
  border-color:var(--accent-line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-mini.v4-mini--total span {
  color:var(--accent) !important;
  -webkit-text-fill-color:var(--accent) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-mini.v4-mini--total b {
  color:var(--accent-dark) !important;
  -webkit-text-fill-color:var(--accent-dark) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-preset-icon {
  border-color:var(--accent-line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.btn-danger,button.btn-danger,.close-modal,[data-v4-quick-modal-close]) {
  background:#fff3f1 !important;
  color:var(--danger) !important;
  -webkit-text-fill-color:var(--danger) !important;
  border-color:rgba(155,47,47,.28) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-quick-modal,.pdf-modal,.weights-modal,.v4-truss-load-dialog-card,.v4-equipment-editor,.modal,dialog) {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:0 24px 80px rgba(24,34,31,.22) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-quick-modal-backdrop.open,.modal-backdrop.open,.v4-truss-load-dialog::backdrop,dialog::backdrop) {
  background:rgba(19,28,24,.34) !important;
  -webkit-backdrop-filter:blur(10px) !important;
  backdrop-filter:blur(10px) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-quick-modal-head,.pdf-modal-header,.weights-modal-header,.v4-truss-dialog-head) {
  background:#f6faf7 !important;
  color:var(--text-strong) !important;
  border-color:var(--line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-quick-modal-body,.pdf-modal-body,.weights-modal-body) {
  background:#ffffff !important;
  color:var(--text) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-table-wrap,.v4-table-container,.table-wrap,.orders-table-wrap,.truss-project-table-wrap,.client-table-wrap,.block-calc-table-wrap,.block-bom-wrap) {
  background:#ffffff !important;
  border-color:var(--line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(table,.v4-table,.block-calc-table,.block-bom,.orders-table,.truss-project-table,.client-table) {
  background:#ffffff !important;
  color:var(--text) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(th,.v4-table th,.block-calc-table th,.block-bom th,.orders-table th,.truss-project-table th,.client-table th) {
  background:#eef4f1 !important;
  color:var(--muted) !important;
  border-color:var(--line-soft) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(td,.v4-table td,.block-calc-table td,.block-bom td,.orders-table td,.truss-project-table td,.client-table td) {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line-soft) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(tr:hover td) {
  background:#f5f8f6 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-note,.v4-hint-card,.v4-visual-preview-meta,.v4-led-grid-note,.hint,.result-card) {
  background:#f3f8f5 !important;
  color:var(--muted) !important;
  border-color:var(--line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-stage-canvas-wrap,.v4-visual-stage-grid,.v4-led-grid-wrap,.v4-visual-preview-canvas,.v4-truss-field-wrap,.v4-truss-field,.v4-structure-canvas,.v4-led-workbench) {
  background:#eef3ef !important;
  border-color:var(--line) !important;
  color:var(--text) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.78) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-visual-stage-grid,.v4-truss-field,.v4-led-grid-wrap) {
  background-image:linear-gradient(rgba(24,39,34,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(24,39,34,.10) 1px, transparent 1px) !important;
  background-color:#eef3ef !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-stage-cell,.stage-cell) {
  background:#ffffff !important;
  color:var(--text-strong) !important;
  border-color:rgba(24,39,34,.18) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.90) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-stage-cell:hover,.stage-cell:hover) {
  background:#edf6f3 !important;
  border-color:var(--accent-line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-stage-cell.selected,.stage-cell.active) {
  background:#dfe8e3 !important;
  color:var(--text-strong) !important;
  -webkit-text-fill-color:var(--text-strong) !important;
  border-color:var(--accent-line) !important;
  box-shadow:0 3px 10px rgba(24,34,31,.12), inset 0 0 0 1px rgba(47,90,82,.18) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell {
  background:#ffffff !important;
  border-color:rgba(24,39,34,.16) !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell:hover {
  background:#edf6f3 !important;
  border-color:var(--accent-line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.filled {
  color:#12201d !important;
  -webkit-text-fill-color:#12201d !important;
  border-color:rgba(var(--led-construction-rgb, 120,183,183), .70) !important;
  background:linear-gradient(135deg, rgba(var(--led-construction-rgb,120,183,183),.30), rgba(255,255,255,.94)) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-led-part-chip {
  background:#ffffff !important;
  color:var(--text-strong) !important;
  border-color:var(--line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-led-part-chip span {
  color:var(--muted) !important;
  -webkit-text-fill-color:var(--muted) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-field-wrap {
  background:#e8eee9 !important;
  border-color:var(--line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-field {
  background-color:#eef3ef !important;
  background-image:linear-gradient(rgba(24,39,34,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(24,39,34,.10) 1px, transparent 1px) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-field .block-item {
  background:transparent !important;
  color:var(--text-strong) !important;
  border-color:transparent !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-field .block-item.selected {
  outline:2px solid var(--accent-line) !important;
  outline-offset:2px !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-truss-field .truss-label,.v4-truss-field .node-label) {
  fill:#13201d !important;
  stroke:#ffffff !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-truss-zoom-panel,.v4-stage-zoom-panel,.v4-led-zoom-panel,.v4-truss-edit-tools) {
  background:var(--panel-2) !important;
  border-color:var(--line) !important;
  color:var(--text) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-truss-zoom-controls input[type="range"],.v4-stage-zoom-controls input[type="range"],.v4-led-zoom-controls input[type="range"]) {
  accent-color:var(--accent) !important;
  -webkit-text-fill-color:initial !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-truss-autofit,.v4-stage-autofit,.v4-led-autofit) {
  color:var(--muted) !important;
  -webkit-text-fill-color:var(--muted) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-truss-group-body button.active,.v4-truss-group-body button.is-active,.v4-truss-library button.active,.v4-truss-library button.is-active,.v4-mode-btn.active,.v4-dashboard-primary.active,.v4-dashboard-card.active,.v4-dashboard-chip.active) {
  background:#e6f0ec !important;
  border-color:var(--accent-line) !important;
  color:#17302b !important;
  -webkit-text-fill-color:#17302b !important;
  box-shadow:inset 0 0 0 1px rgba(47,90,82,.18), 0 6px 16px rgba(24,34,31,.08) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-load-indicator.ok {
  background:linear-gradient(180deg, rgba(198,218,204,.76), rgba(231,240,233,.96)) !important;
  border-color:rgba(84,125,96,.38) !important;
  color:#244231 !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-load-indicator.bad {
  background:linear-gradient(180deg, #fff0ef, #f8dddd) !important;
  border-color:rgba(155,47,47,.38) !important;
  color:#7a2525 !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-load-indicator.risk,
body.v4-only-body.quick-standalone-body.theme-light :where(.warn,.warning) {
  background:#fff7e6 !important;
  border-color:rgba(155,101,24,.34) !important;
  color:#7a4d10 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.bad,.danger,.error) {
  color:var(--danger) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.ok,.good,.success) {
  color:var(--success) !important;
}

body.v4-only-body.quick-standalone-body.theme-light * {
  scrollbar-color:rgba(47,90,82,.32) #eef3ef;
}

body.v4-only-body.quick-standalone-body.theme-light ::selection {
  background:rgba(47,90,82,.22);
  color:#0c1511;
}

body.v4-only-body.quick-standalone-body.theme-light ::-webkit-scrollbar-track { background:#eef3ef; }
body.v4-only-body.quick-standalone-body.theme-light ::-webkit-scrollbar-thumb { background:#c0ccc6; border-color:#eef3ef; }
body.v4-only-body.quick-standalone-body.theme-light ::-webkit-scrollbar-thumb:hover { background:#a9b8b1; border-color:#eef3ef; }

/* v3.1.60 — wider component coverage for light theme previews. */
body.v4-only-body.quick-standalone-body.theme-light :where(.standalone-topbar,.standalone-window,.standalone-window-controls,.standalone-topbar-actions,.standalone-topbar-brand,.standalone-topbar-center) {
  background:rgba(255,255,255,.82) !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:0 10px 28px rgba(24,34,31,.08) !important;
  -webkit-backdrop-filter:blur(16px) !important;
  backdrop-filter:blur(16px) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.standalone-icon-btn,.v4-icon-btn,.v4-doc-actions button,.v4-bom-actions button,.v4-template-actions button) {
  background:#ffffff !important;
  color:var(--text-strong) !important;
  -webkit-text-fill-color:var(--text-strong) !important;
  border-color:var(--line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .quick-standalone-toast {
  background:#ffffff !important;
  color:var(--text-strong) !important;
  border-color:var(--line) !important;
  box-shadow:0 16px 40px rgba(24,34,31,.16) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-card-head,.v4-section-head,.v4-template-actions,.v4-bom-actions,.v4-doc-actions,.v4-stage-flow-body,.v4-stage-flow-grid,.v4-led-grid-head,.v4-truss-template-head,.v4-truss-load-header) {
  background:transparent !important;
  color:var(--text) !important;
  border-color:var(--line-soft) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-summary-grid,.v4-bom-summary-grid,.v4-led-summary-metrics,.v4-stage-summary-metrics,.v4-truss-summary-metrics,.v4-led-summary-details,.v4-stage-summary-details,.v4-truss-summary-details,.v4-quick-pricing-grid,.v4-quick-stage-grid,.v4-grid-2,.v4-grid-3) > :where(div,article,section,.v4-mini,.v4-mini-stat) {
  background:#f7faf7 !important;
  color:var(--text) !important;
  border-color:var(--line-soft) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-mini-stat,.v4-bom-checks,.v4-bom-contract,.v4-source-cell,.v4-name-cell,.v4-num-cell,.v4-total-row,.v4-step-warn,.v4-truss-template-warnings,.v4-truss-stool-note,.v4-truss-subrent-ok,.v4-truss-subrent-meta,.v4-truss-subrent-prices,.v4-truss-subrent-row,.v4-subrentor-card,.v4-subrentors-stats,.v4-subrentors-directory,.v4-subrentors-grid) {
  background:#f7faf7 !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-truss-chip,.v4-truss-chip-field,.v4-led-active-indicator,.v4-led-color-dot,.v4-stage-check,.v4-stage-clear-action,.v4-badge,.v4-demo-badge,.v4-dashboard-badge,.v4-mode-btn,.v4-truss-mode-pill,.v4-stage-draw-pill,.v4-led-active-field) {
  background:#eef6f2 !important;
  color:var(--accent) !important;
  -webkit-text-fill-color:var(--accent) !important;
  border-color:var(--accent-line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-stage-check input[type="checkbox"],.v4-led-active-field input[type="checkbox"],input[type="checkbox"],input[type="radio"]) {
  accent-color:var(--accent) !important;
  -webkit-text-fill-color:initial !important;
}

/* The custom appearance:none switch keeps its dark-theme gold :checked state because
   accent-color doesn't touch a fully restyled control. Repaint the checked track/thumb
   with the light green accent. Non-:where so it beats the base input rules (0,1,1). */
body.v4-only-body.quick-standalone-body.theme-light input[type="checkbox"]:checked {
  background:rgba(47,90,82,.18) !important;
  border-color:var(--accent) !important;
}
body.v4-only-body.quick-standalone-body.theme-light input[type="checkbox"]:checked::before {
  background:linear-gradient(180deg, #3d7367, #2f5a52) !important;
}

/* No :where(): a runtime-injected rule (body.v4-only-body .v4-stage-tool-buttons
   button.active) paints the active tool button dark; the override needs real
   specificity to win, so every selector carries the full .theme-light body chain. */
body.v4-only-body.quick-standalone-body.theme-light .v4-led-template-grid button.active,
body.v4-only-body.quick-standalone-body.theme-light .v4-led-template-grid button.is-active,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-preset-btn.active,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-preset-btn.is-active,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-tool-buttons button.active,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-tool-buttons button.is-active,
body.v4-only-body.quick-standalone-body.theme-light .v4-mode-btn.active,
body.v4-only-body.quick-standalone-body.theme-light .v4-mode-btn.is-active {
  background:#e3eee9 !important;
  border-color:var(--accent) !important;
  color:#17302b !important;
  -webkit-text-fill-color:#17302b !important;
  box-shadow:inset 0 0 0 1px rgba(47,90,82,.30), 0 6px 16px rgba(24,34,31,.08) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.quick-pdf-doc,.quick-pdf-hero,.quick-pdf-main,.quick-pdf-summary,.quick-pdf-kit,.quick-pdf-visual,.quick-pdf-scheme-image-wrap,.quick-pdf-scheme-svg-wrap,.pdf-preview-frame,.client-card,.client-hero,.client-main-grid,.client-params,.client-note,.client-scheme-wrap,.client-price-table,.client-pdf) {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:var(--shadow-card) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.quick-pdf-meta,.quick-pdf-brand,.quick-pdf-empty,.quick-pdf-visual-label,.client-meta,.client-param,.client-footer-line,.client-section-title) {
  color:var(--muted) !important;
  -webkit-text-fill-color:var(--muted) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.quick-pdf-table th,.client-price-table th) {
  background:#eef4f1 !important;
  color:var(--muted) !important;
  border-color:var(--line-soft) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.quick-pdf-table td,.client-price-table td) {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line-soft) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.client-total-row,.v4-total-row) {
  background:#e6f0ec !important;
  color:#17302b !important;
  -webkit-text-fill-color:#17302b !important;
  border-color:var(--accent-line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(svg text,.v4-visual-preview-canvas text,.v4-truss-field text,.quick-pdf-scheme-svg text) {
  fill:#17201c !important;
  stroke:rgba(255,255,255,.88) !important;
  paint-order:stroke fill !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.truss-rail,.truss-web,.truss-node-rail,.truss-node-web,.truss-art-rail,.truss-art-web) {
  stroke:#8a96a0 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.truss-h,.truss-v,.truss-end,.truss-art-end) {
  fill:#d7dde4 !important;
  stroke:#8a96a0 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-doc-preview,.v4-export-text,.v4-quick-pdf-actions,.pdf-modal-actions) {
  background:#f7faf7 !important;
  color:var(--text) !important;
  border-color:var(--line-soft) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-step-warn,.warn,.warning,.v4-truss-template-warnings) {
  background:#fff7e6 !important;
  color:#7a4d10 !important;
  -webkit-text-fill-color:#7a4d10 !important;
  border-color:rgba(155,101,24,.34) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-bom-inspector,.v4-bom-lazy,.v4-bom-sections,.v4-bom-panel,.v4-quote-section,.v4-settings-wide) {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(code,kbd,pre) {
  background:#eef4f1 !important;
  color:#17302b !important;
  border-color:var(--line) !important;
}

/* v3.1.61 — deep light-surface coverage for older inline/v4 surfaces. */
body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-readiness-summary,
  .v4-readiness-item,
  .v4-readiness-score,
  .v4-demo-auth-panel,
  .v4-access-result,
  .v4-dashboard-card,
  .v4-dashboard-primary,
  .v4-dashboard-group,
  .v4-dashboard-role-details,
  .v4-dashboard-role-card,
  .v4-warehouse-project,
  .v4-warehouse-detail,
  .v4-warehouse-tabs details,
  .v4-warehouse-tabs summary,
  .v4-quick-tile,
  .v4-quick-docs,
  .v4-quick-doc-output,
  .v4-bom-sections div,
  .v4-bom-lazy,
  .v4-bom-empty,
  .v4-empty-state,
  .empty-state,
  .project-card,
  .order-card,
  .quote-card,
  .settings-card,
  .v4-auth-panel,
  .v4-role-hints span
) {
  background:#ffffff !important;
  color:var(--text) !important;
  -webkit-text-fill-color:initial !important;
  border-color:var(--line) !important;
  box-shadow:var(--shadow-card) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-dashboard-group,
  .v4-warehouse-tabs details,
  .v4-bom-sections div,
  .v4-quick-docs,
  .v4-quick-doc-output,
  .v4-dashboard-role-details,
  .v4-readiness-item,
  .v4-readiness-score
) {
  background:#f7faf7 !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-dashboard-card.active,
  .v4-dashboard-primary.active,
  .v4-dashboard-chip.active,
  .v4-warehouse-project.active,
  .v4-quick-tile.active,
  .project-card.active,
  .order-card.active,
  .quote-card.active,
  .selected,
  [aria-selected="true"]
) {
  background:linear-gradient(135deg, #e5f0eb, #f7fbf8) !important;
  color:#17302b !important;
  -webkit-text-fill-color:#17302b !important;
  border-color:var(--accent-line) !important;
  box-shadow:inset 0 0 0 1px rgba(47,90,82,.14), 0 8px 20px rgba(24,34,31,.08) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-dashboard-primary-icon,
  .v4-role-hints span,
  .v4-demo-mode-banner,
  .v4-demo-badge,
  .v4-dashboard-badge,
  .v4-warehouse-tag,
  .v4-status-chip,
  .status-chip,
  .tag,
  .pill
) {
  background:#eef6f2 !important;
  color:var(--accent) !important;
  -webkit-text-fill-color:var(--accent) !important;
  border-color:var(--accent-line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-readiness-summary .warn,
  .v4-readiness-item.warn,
  .v4-mini.warn,
  .v4-bom-checks span.warn,
  .v4-access-result.warn,
  .status-warn
) {
  background:#fff7e6 !important;
  color:#7a4d10 !important;
  -webkit-text-fill-color:#7a4d10 !important;
  border-color:rgba(155,101,24,.34) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-readiness-summary .bad,
  .v4-readiness-item.bad,
  .v4-readiness-score.bad,
  .v4-access-result.bad,
  .status-bad
) {
  background:#fff0ef !important;
  color:#7a2525 !important;
  -webkit-text-fill-color:#7a2525 !important;
  border-color:rgba(155,47,47,.34) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-readiness-summary .ok,
  .v4-readiness-item.ok,
  .v4-readiness-score.ok,
  .v4-access-result.ok,
  .status-ok
) {
  background:#e7f1ea !important;
  color:#244231 !important;
  -webkit-text-fill-color:#244231 !important;
  border-color:rgba(84,125,96,.34) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-quick-doc-output,
  .v4-export-text,
  .log-output,
  .debug-output,
  textarea.v4-quick-doc-output
) {
  background:#f3f7f4 !important;
  color:#17201c !important;
  -webkit-text-fill-color:#17201c !important;
  border-color:var(--line) !important;
  font-synthesis-weight:none;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  details,
  details summary,
  .accordion,
  .accordion-item,
  .accordion-summary
) {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-quick-modal-backdrop,
  .modal-backdrop,
  .overlay,
  .drawer-backdrop
):not(.open) {
  background:transparent !important;
  -webkit-backdrop-filter:none !important;
  backdrop-filter:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-flow-grid,
  .v4-stage-flow-body,
  .v4-led-grid,
  .v4-led-grid-body,
  .v4-truss-group-body,
  .v4-template-grid,
  .v4-controls-grid
) {
  background:transparent !important;
  color:var(--text) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-flow-grid > *,
  .v4-led-grid-body > *,
  .v4-template-grid > *,
  .v4-controls-grid > *
) {
  border-color:var(--line-soft) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-visual-preview-canvas svg,
  .v4-stage-canvas-wrap svg,
  .v4-led-grid-wrap svg,
  .v4-truss-field svg,
  .quick-pdf-scheme-svg-wrap svg
) {
  background:transparent !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-visual-preview-canvas svg rect[fill="#0b1015"],
  .v4-visual-preview-canvas svg rect[fill="#111820"],
  .v4-truss-field svg rect[fill="#0b1015"],
  .v4-truss-field svg rect[fill="#111820"]
) {
  fill:#eef3ef !important;
}

body.v4-only-body.quick-standalone-body.theme-light .feg-theme-toggle {
  background:linear-gradient(180deg, #ffffff, #eef5f1) !important;
  color:#24463f !important;
  -webkit-text-fill-color:#24463f !important;
  border-color:rgba(47,90,82,.32) !important;
  box-shadow:0 6px 16px rgba(24,34,31,.10) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .feg-theme-toggle[aria-pressed="true"] {
  background:linear-gradient(180deg, #35665d, #254940) !important;
  color:#f8fcfa !important;
  -webkit-text-fill-color:#f8fcfa !important;
  border-color:rgba(47,90,82,.54) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  [style*="#0b1015"],
  [style*="#0e141a"],
  [style*="#10161d"],
  [style*="#111820"],
  [style*="#121a22"]
) {
  background-color:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
}


/* v3.1.63 — cleanup pass for dark leftovers that still came from legacy/global layers. */
body.v4-only-body.quick-standalone-body.theme-light :where(
  .standalone-window,
  .standalone-topbar,
  .standalone-body,
  .standalone-sidebar,
  .feg-launch-tile,
  .feg-workspace-tabs,
  .v4-quick-modal-head,
  .feg-constructor-header,
  .pdf-modal-header,
  .quick-pdf-modal-header,
  .v4-truss-dialog-head,
  .v4-stage-zoom-panel,
  .v4-truss-zoom-panel,
  .v4-led-zoom-panel,
  .v4-structure-toolbar,
  .v4-led-grid-head,
  .v4-stage-canvas-wrap,
  .v4-truss-field,
  .v4-led-grid-wrap,
  .v4-visual-preview-canvas,
  .v4-canvas-shell,
  .v4-constructor-canvas,
  .v4-block-canvas,
  .v4-grid-canvas,
  .v4-stage-field,
  .v4-led-field,
  .v4-truss-canvas,
  .v4-editor-surface,
  .v4-work-area,
  .v4-workspace-body,
  .feg-workspace-body,
  .feg-constructor-body,
  .v4-control-rail,
  .v4-right-rail,
  .v4-summary-rail,
  .v4-side-panel,
  .v4-details-panel,
  .v4-result-panel,
  .v4-output-panel
) {
  background:var(--panel) !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:var(--shadow-card) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .standalone-topbar,
  .feg-workspace-tabs,
  .v4-quick-modal-head,
  .feg-constructor-header,
  .pdf-modal-header,
  .quick-pdf-modal-header,
  .v4-truss-dialog-head,
  .v4-stage-zoom-panel,
  .v4-truss-zoom-panel,
  .v4-led-zoom-panel
) {
  background:linear-gradient(180deg, #ffffff, #edf3ef) !important;
  border-color:var(--line) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.78), 0 8px 22px rgba(24,34,31,.06) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .standalone-body,
  .standalone-sidebar,
  .feg-workspace-body,
  .v4-workspace-body,
  .feg-constructor-body,
  .v4-structure-workspace,
  .v4-work-area
) {
  background:linear-gradient(180deg, #f3f6f2, #e9eee8) !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .feg-field,
  input,
  select,
  textarea,
  .v4-field input,
  .v4-field select,
  .v4-field textarea,
  .feg-control-card-row,
  .v4-stage-check,
  .v4-truss-autofit,
  .v4-stage-autofit,
  .v4-led-check,
  label:has(input[type="checkbox"])
) {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.82) !important;
  -webkit-text-fill-color:var(--text) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-canvas-wrap,
  .v4-truss-field,
  .v4-led-grid-wrap,
  .v4-visual-preview-canvas,
  .v4-canvas-shell,
  .v4-constructor-canvas,
  .v4-block-canvas,
  .v4-grid-canvas,
  .v4-stage-field,
  .v4-led-field,
  .v4-truss-canvas
) {
  background:
    linear-gradient(rgba(47,90,82,.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47,90,82,.055) 1px, transparent 1px),
    #f8fbf7 !important;
  background-size:24px 24px !important;
  border-color:rgba(47,90,82,.18) !important;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.9), 0 10px 28px rgba(24,34,31,.08) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-zoom-panel *,
  .v4-truss-zoom-panel *,
  .v4-led-zoom-panel *,
  .v4-quick-modal-head *,
  .feg-constructor-header *,
  .pdf-modal-header *,
  .quick-pdf-modal-header *,
  .v4-truss-dialog-head *
) {
  color:var(--text) !important;
  -webkit-text-fill-color:var(--text) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  button,
  .feg-btn,
  .btn-secondary,
  .v4-mode-btn,
  .v4-icon-btn,
  .standalone-icon-btn,
  .feg-workspace-tab,
  .v4-tab,
  .v4-stage-tool,
  .v4-truss-tool,
  .v4-led-tool,
  .v4-template-btn,
  .v4-preset-btn
):not(.btn-primary):not(.feg-btn-primary):not(.is-active):not(.active) {
  background:linear-gradient(180deg, #ffffff, #eef4ef) !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:0 3px 10px rgba(24,34,31,.06) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  button.is-active,
  button.active,
  .is-active,
  .active,
  .feg-workspace-tab.is-active,
  .feg-workspace-tab.active,
  .v4-mode-btn.active,
  .v4-mode-btn.is-active,
  .v4-truss-group.active,
  .v4-led-construction-tab.active,
  .v4-led-construction-tab.is-active
) {
  background:linear-gradient(180deg, #dfe9e3, #cddbd3) !important;
  color:#12201b !important;
  border-color:rgba(47,90,82,.48) !important;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.7), 0 0 0 2px rgba(47,90,82,.12) !important;
  -webkit-text-fill-color:#12201b !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  [style*="background:#0"],
  [style*="background: #0"],
  [style*="background-color:#0"],
  [style*="background-color: #0"],
  [style*="background:#1"],
  [style*="background: #1"],
  [style*="background-color:#1"],
  [style*="background-color: #1"],
  [style*="rgb(0"],
  [style*="rgba(0"],
  [style*="rgb(8"],
  [style*="rgb(9"],
  [style*="rgb(10"],
  [style*="rgb(11"],
  [style*="rgb(12"],
  [style*="rgb(13"],
  [style*="rgb(14"],
  [style*="rgb(15"],
  [style*="rgb(16"],
  [style*="rgb(17"],
  [style*="rgb(18"],
  [style*="rgb(19"],
  [style*="rgb(20"],
  [style*="rgba(8"],
  [style*="rgba(9"],
  [style*="rgba(10"],
  [style*="rgba(11"],
  [style*="rgba(12"],
  [style*="rgba(13"],
  [style*="rgba(14"],
  [style*="rgba(15"],
  [style*="rgba(16"],
  [style*="rgba(17"],
  [style*="rgba(18"],
  [style*="rgba(19"],
  [style*="rgba(20"]
) {
  background:#ffffff !important;
  background-color:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  -webkit-text-fill-color:var(--text) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-visual-preview-canvas svg rect[fill^="#0"],
  .v4-visual-preview-canvas svg rect[fill^="#1"],
  .v4-stage-canvas-wrap svg rect[fill^="#0"],
  .v4-stage-canvas-wrap svg rect[fill^="#1"],
  .v4-truss-field svg rect[fill^="#0"],
  .v4-truss-field svg rect[fill^="#1"],
  .v4-led-grid-wrap svg rect[fill^="#0"],
  .v4-led-grid-wrap svg rect[fill^="#1"],
  .quick-pdf-scheme-svg-wrap svg rect[fill^="#0"],
  .quick-pdf-scheme-svg-wrap svg rect[fill^="#1"]
) {
  fill:#eef3ef !important;
  stroke:rgba(47,90,82,.18) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-visual-preview-canvas svg path[fill^="#0"],
  .v4-visual-preview-canvas svg path[fill^="#1"],
  .v4-stage-canvas-wrap svg path[fill^="#0"],
  .v4-stage-canvas-wrap svg path[fill^="#1"],
  .v4-truss-field svg path[fill^="#0"],
  .v4-truss-field svg path[fill^="#1"],
  .v4-led-grid-wrap svg path[fill^="#0"],
  .v4-led-grid-wrap svg path[fill^="#1"]
) {
  fill:#dce8e1 !important;
  stroke:rgba(47,90,82,.24) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .quick-pdf-backdrop,
  .pdf-backdrop,
  .modal-backdrop,
  .v4-modal-backdrop,
  .v4-quick-modal-backdrop
) {
  background:rgba(232,238,233,.72) !important;
  backdrop-filter:blur(10px) !important;
}

body.v4-only-body.quick-standalone-body.theme-light ::placeholder {
  color:rgba(95,108,102,.72) !important;
  -webkit-text-fill-color:rgba(95,108,102,.72) !important;
}


/* v3.1.64 — focused cleanup for Stage + Truss dark surfaces left after v3.1.63. */
body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-structure-stage,
  .v4-structure-truss,
  .v4-stage-template-panel,
  .v4-truss-template-panel,
  .v4-truss-template-card,
  .v4-stage-controls-layout,
  .v4-stage-control-stack,
  .v4-stage-secondary-layout,
  .v4-truss-template-split,
  .v4-truss-layout,
  .v4-truss-sidebar,
  .v4-truss-workspace,
  .v4-truss-edit-tools,
  .v4-truss-library,
  .v4-truss-group,
  .v4-truss-load-slot,
  .v4-truss-load-panel,
  .v4-truss-load-dialog-card,
  .v4-truss-v3-load-summary,
  .v4-truss-v3-tables,
  .v4-truss-final-kit,
  [data-stage-summary],
  [data-truss-summary]
) {
  background:#ffffff !important;
  background-color:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:var(--shadow-card) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-controls-layout,
  .v4-stage-control-stack,
  .v4-stage-secondary-layout,
  .v4-truss-template-split,
  .v4-truss-layout,
  .v4-truss-sidebar,
  .v4-truss-workspace,
  .v4-truss-group-body,
  .v4-truss-load-slot,
  [data-stage-summary],
  [data-truss-summary]
) {
  background:transparent !important;
  background-color:transparent !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-template-panel,
  .v4-truss-template-panel,
  .v4-truss-template-card,
  .v4-truss-edit-tools,
  .v4-truss-library,
  .v4-truss-group,
  .v4-stage-tool-box,
  .v4-stage-frame-auto-card,
  .v4-load-indicator,
  .v4-truss-load-dialog-card,
  .v4-truss-v3-load-summary,
  .v4-truss-v3-tables,
  .v4-truss-final-kit
) {
  background:linear-gradient(180deg, #ffffff, #f6faf7) !important;
  background-color:#ffffff !important;
  border-color:var(--line) !important;
  box-shadow:0 8px 22px rgba(24,34,31,.07) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-structure-toolbar,
  .v4-truss-template-head,
  .v4-truss-template-card-head,
  .v4-truss-dialog-head,
  .v4-stage-tool-box > span,
  .v4-stage-draw-help,
  .v4-truss-workspace > p,
  .v4-truss-template-panel > small,
  .v4-template-actions > small
) {
  background:transparent !important;
  background-color:transparent !important;
  color:var(--text) !important;
  border-color:var(--line-soft) !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-structure-toolbar,
body.v4-only-body.quick-standalone-body.theme-light .v4-truss-template-head,
body.v4-only-body.quick-standalone-body.theme-light .v4-truss-dialog-head {
  background:linear-gradient(180deg, #ffffff, #eef4ef) !important;
  background-color:#ffffff !important;
  border-color:var(--line) !important;
  box-shadow:0 8px 22px rgba(24,34,31,.06) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-template-panel .v4-field,
  .v4-stage-template-panel label.v4-field,
  .v4-truss-template-panel .v4-field,
  .v4-truss-template-card .v4-field,
  .v4-truss-load-panel .v4-field,
  .v4-stage-main-controls-card .v4-field,
  .v4-stage-control-stack .v4-field,
  .v4-truss-stool-action-row .v4-field,
  .feg-control-panel .v4-field,
  .feg-control-grid .v4-field,
  .feg-field-wrap,
  .feg-control-row,
  .feg-control-card-row,
  .v4-stage-frame-auto-card,
  .v4-stage-check,
  .v4-truss-autofit,
  .v4-stage-autofit,
  label:has(input[type="checkbox"])
) {
  background:#ffffff !important;
  background-color:#ffffff !important;
  color:var(--text) !important;
  -webkit-text-fill-color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.88) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-template-panel .v4-field > span,
  .v4-stage-template-panel .v4-field-label,
  .v4-truss-template-card .v4-field > span,
  .v4-truss-template-card .v4-field-label,
  .v4-truss-load-panel .v4-field > span,
  .v4-truss-load-panel .v4-field-label,
  .v4-stage-frame-auto-card span,
  .feg-control-card-row span,
  .v4-field small,
  .v4-field-subspan
) {
  background:transparent !important;
  color:var(--muted) !important;
  -webkit-text-fill-color:var(--muted) !important;
  border-color:transparent !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-template-panel input,
  .v4-stage-template-panel select,
  .v4-stage-template-panel textarea,
  .v4-truss-template-panel input,
  .v4-truss-template-panel select,
  .v4-truss-template-panel textarea,
  .v4-truss-load-panel input,
  .v4-truss-load-panel select,
  .v4-truss-load-panel textarea,
  .v4-stage-zoom-controls input[type="range"],
  .v4-truss-zoom-controls input[type="range"]
) {
  background:#ffffff !important;
  background-color:#ffffff !important;
  color:var(--text-strong) !important;
  -webkit-text-fill-color:var(--text-strong) !important;
  border-color:var(--line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-zoom-controls input[type="range"]::-webkit-slider-runnable-track,
  .v4-truss-zoom-controls input[type="range"]::-webkit-slider-runnable-track
) {
  background:#dfe8e2 !important;
  border-color:var(--line-soft) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-zoom-controls input[type="range"]::-moz-range-track,
  .v4-truss-zoom-controls input[type="range"]::-moz-range-track
) {
  background:#dfe8e2 !important;
  border-color:var(--line-soft) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-zoom-controls input[type="range"]::-webkit-slider-thumb,
  .v4-truss-zoom-controls input[type="range"]::-webkit-slider-thumb
) {
  background:#2f5a52 !important;
  border-color:#ffffff !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-canvas-wrap,
  .v4-truss-field-wrap,
  .v4-visual-stage-grid,
  .v4-truss-field,
  [data-stage-canvas-wrap],
  [data-stage-grid],
  [data-truss-field-wrap],
  [data-truss-field]
) {
  background-color:#f8fbf7 !important;
  background-image:
    linear-gradient(rgba(47,90,82,.070) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47,90,82,.070) 1px, transparent 1px) !important;
  border-color:rgba(47,90,82,.20) !important;
  color:var(--text) !important;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.92), 0 10px 28px rgba(24,34,31,.08) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-stage-canvas-wrap,.v4-truss-field-wrap) {
  background-color:#eef3ef !important;
  background-image:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-visual-stage-grid,.v4-truss-field) {
  background-size:var(--stage-cell-px, var(--truss-cell-px, 24px)) var(--stage-cell-px, var(--truss-cell-px, 24px)) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-field {
  background-size:var(--truss-cell-px, 44px) var(--truss-cell-px, 44px) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-polish .v4-stage-cell,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-cell,
body.v4-only-body.quick-standalone-body.theme-light .v4-truss-cell {
  background:#ffffff !important;
  background-color:#ffffff !important;
  background-image:none !important;
  color:transparent !important;
  border-color:rgba(47,90,82,.18) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-polish .v4-stage-cell:hover,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-cell:hover,
body.v4-only-body.quick-standalone-body.theme-light .v4-truss-cell:hover {
  background:#eef6f2 !important;
  background-color:#eef6f2 !important;
  border-color:var(--accent-line) !important;
  box-shadow:inset 0 0 0 1px rgba(47,90,82,.14) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-polish .v4-stage-cell.selected,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-cell.selected,
body.v4-only-body.quick-standalone-body.theme-light .stage-cell.active {
  background-color:#dfe7e2 !important;
  background-image:linear-gradient(rgba(255,255,255,.20), rgba(255,255,255,.20)), url('./stage-deck-texture.png') !important;
  background-size:cover !important;
  background-position:center !important;
  border-color:var(--accent-line) !important;
  color:transparent !important;
  box-shadow:0 3px 10px rgba(24,34,31,.12), inset 0 0 0 1px rgba(47,90,82,.16) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-polish .v4-stage-cell.selected::before,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-cell.selected::before,
body.v4-only-body.quick-standalone-body.theme-light .stage-cell.active::after {
  background:transparent !important;
  border-color:rgba(47,90,82,.48) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-polish .v4-stage-cell.has-stair,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-cell.has-stair {
  border-color:rgba(82,109,98,.48) !important;
  box-shadow:inset 0 0 0 1px rgba(82,109,98,.16) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-stair-icon {
  color:#2f5a52 !important;
  -webkit-text-fill-color:#2f5a52 !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-field .block-item,
body.v4-only-body.quick-standalone-body.theme-light .v4-truss-field .block-item :where(svg,svg *) {
  background:transparent !important;
  background-color:transparent !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-field .block-item.selected {
  outline:2px solid rgba(47,90,82,.58) !important;
  outline-offset:2px !important;
  box-shadow:0 0 0 3px rgba(47,90,82,.10) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-group summary {
  background:linear-gradient(180deg, #ffffff, #eef4ef) !important;
  background-color:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line-soft) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.86) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-group.active summary {
  background:linear-gradient(135deg, #e5f0eb, #f8fbf7) !important;
  background-color:#e5f0eb !important;
  border-color:var(--accent-line) !important;
  box-shadow:inset 3px 0 0 rgba(47,90,82,.68), inset 0 1px 0 rgba(255,255,255,.88) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-group.active summary b,
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-group.active summary em,
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-group.active .v4-truss-group-mark {
  color:#24463f !important;
  -webkit-text-fill-color:#24463f !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-group-body button.active,
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-group-body button.is-active,
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-library button.active,
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-library button.is-active {
  background:linear-gradient(180deg, #dfe9e3, #cddbd3) !important;
  background-color:#dfe9e3 !important;
  border-color:rgba(47,90,82,.70) !important;
  color:#12201b !important;
  -webkit-text-fill-color:#12201b !important;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.72), 0 0 0 2px rgba(47,90,82,.14) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-group-body button.active .v4-truss-btn-icon,
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-group-body button.is-active .v4-truss-btn-icon,
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-library button.active .v4-truss-btn-icon,
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-library button.is-active .v4-truss-btn-icon {
  color:#12201b !important;
  -webkit-text-fill-color:#12201b !important;
  text-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-canvas-wrap [style*="background:#0"],
  .v4-stage-canvas-wrap [style*="background: #0"],
  .v4-stage-canvas-wrap [style*="background-color:#0"],
  .v4-stage-canvas-wrap [style*="background-color: #0"],
  .v4-truss-field-wrap [style*="background:#0"],
  .v4-truss-field-wrap [style*="background: #0"],
  .v4-truss-field-wrap [style*="background-color:#0"],
  .v4-truss-field-wrap [style*="background-color: #0"],
  .v4-stage-template-panel [style*="background:#0"],
  .v4-truss-template-panel [style*="background:#0"],
  .v4-stage-template-panel [style*="background-color:#0"],
  .v4-truss-template-panel [style*="background-color:#0"]
) {
  background:#ffffff !important;
  background-color:#ffffff !important;
  background-image:none !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-canvas-wrap svg rect[fill^="#0"],
  .v4-stage-canvas-wrap svg rect[fill^="#1"],
  .v4-stage-canvas-wrap svg rect[fill^="rgb(0"],
  .v4-stage-canvas-wrap svg rect[fill^="rgb(1"],
  .v4-truss-field-wrap svg rect[fill^="#0"],
  .v4-truss-field-wrap svg rect[fill^="#1"],
  .v4-truss-field-wrap svg rect[fill^="rgb(0"],
  .v4-truss-field-wrap svg rect[fill^="rgb(1"],
  .v4-visual-preview-canvas svg rect[fill^="#0"],
  .v4-visual-preview-canvas svg rect[fill^="#1"]
) {
  fill:#f8fbf7 !important;
  stroke:rgba(47,90,82,.20) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-canvas-wrap svg path[fill^="#0"],
  .v4-stage-canvas-wrap svg path[fill^="#1"],
  .v4-truss-field-wrap svg path[fill^="#0"],
  .v4-truss-field-wrap svg path[fill^="#1"],
  .v4-visual-preview-canvas svg path[fill^="#0"],
  .v4-visual-preview-canvas svg path[fill^="#1"]
) {
  fill:#dfe8e2 !important;
  stroke:rgba(47,90,82,.24) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-canvas-wrap svg line,
  .v4-stage-canvas-wrap svg path,
  .v4-stage-canvas-wrap svg polyline,
  .v4-truss-field-wrap svg line,
  .v4-truss-field-wrap svg path,
  .v4-truss-field-wrap svg polyline,
  .v4-visual-preview-canvas svg line,
  .v4-visual-preview-canvas svg path,
  .v4-visual-preview-canvas svg polyline
) {
  stroke-opacity:1 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-truss-field-wrap svg text,
  .v4-stage-canvas-wrap svg text,
  .v4-visual-preview-canvas svg text,
  .v4-truss-field text,
  .v4-visual-stage-grid text
) {
  fill:#17201c !important;
  stroke:rgba(255,255,255,.90) !important;
  paint-order:stroke fill !important;
}


/* v3.1.65 — light theme polish: contrast, anti-overlap, darker truss artwork. */
body.v4-only-body.quick-standalone-body.theme-light {
  --light-focus-ring:rgba(47,90,82,.20);
  --light-panel-strong:#ffffff;
  --light-panel-soft:#f4f8f5;
  --light-control:#ffffff;
  --light-control-hover:#edf5f1;
  --light-grid:#eef3ef;
  --light-grid-line:rgba(47,90,82,.105);
  --truss-light-rail:#4a5661;
  --truss-light-web:#62707b;
  --truss-light-end:#35414b;
  --truss-light-node:#40505a;
  --truss-light-fill:#9aa5ad;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .standalone-topbar,
  .feg-workspace-tabs,
  .feg-constructor-header,
  .v4-quick-modal-head,
  .pdf-modal-header,
  .quick-pdf-modal-header,
  .v4-structure-toolbar,
  .v4-truss-template-head,
  .v4-truss-dialog-head,
  .v4-led-grid-head
) {
  background:linear-gradient(180deg, #ffffff, #f0f5f1) !important;
  color:#101a16 !important;
  border-color:rgba(24,39,34,.18) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.94), 0 8px 20px rgba(24,34,31,.07) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-card,
  .v4-template-card,
  .v4-truss-template-card,
  .v4-stage-template-panel,
  .v4-truss-template-panel,
  .v4-led-panel-block,
  .v4-summary-card,
  .v4-mini,
  .v4-mini-stat,
  .v4-bom-details,
  .v4-bom-source-card,
  .v4-truss-group,
  .v4-load-indicator,
  .v4-truss-v3-load-summary,
  .v4-truss-v3-tables,
  .v4-truss-final-kit,
  .v4-quick-modal,
  .pdf-modal,
  dialog
) {
  background:#ffffff !important;
  color:#17201c !important;
  border-color:rgba(24,39,34,.16) !important;
  box-shadow:0 8px 22px rgba(24,34,31,.075) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-field,
  label.v4-field,
  .feg-field-wrap,
  .feg-control-row,
  .feg-control-card-row,
  .v4-stage-check,
  .v4-truss-autofit,
  .v4-stage-autofit,
  .v4-led-autofit,
  .v4-led-active-field,
  label:has(input[type="checkbox"])
) {
  min-width:0 !important;
  background:#ffffff !important;
  color:#17201c !important;
  border-color:rgba(24,39,34,.16) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.92) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-field > span,
  .v4-field-label,
  label > span,
  .v4-template-title,
  .v4-panel-title,
  .v4-section-title
) {
  min-width:0 !important;
  color:#26352f !important;
  -webkit-text-fill-color:#26352f !important;
  overflow-wrap:anywhere !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  small,
  .v4-muted,
  .v4-note,
  .hint,
  .v4-field-subspan,
  .v4-visual-preview-meta,
  .v4-template-actions > small,
  .v4-stage-draw-help,
  .v4-truss-workspace > p,
  .v4-truss-template-panel > small
) {
  color:#596660 !important;
  -webkit-text-fill-color:#596660 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(input,select,textarea) {
  min-width:0 !important;
  background:#ffffff !important;
  color:#101a16 !important;
  -webkit-text-fill-color:#101a16 !important;
  border-color:rgba(24,39,34,.20) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.95) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(input:focus,select:focus,textarea:focus,button:focus-visible,.v4-mode-btn:focus-visible,.v4-icon-btn:focus-visible) {
  outline:none !important;
  border-color:rgba(47,90,82,.56) !important;
  box-shadow:0 0 0 3px var(--light-focus-ring), inset 0 1px 0 rgba(255,255,255,.96) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(button,.btn-secondary,.feg-btn,.v4-mode-btn,.v4-icon-btn,.standalone-icon-btn,.v4-template-actions button,.v4-truss-group-body button,.v4-truss-library button,.v4-stage-tool-buttons button,.v4-led-template-grid button) {
  min-width:0 !important;
  background:linear-gradient(180deg, #ffffff, #edf4ef) !important;
  color:#16231e !important;
  -webkit-text-fill-color:#16231e !important;
  border-color:rgba(24,39,34,.18) !important;
  text-shadow:none !important;
  box-shadow:0 3px 10px rgba(24,34,31,.055) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(button,.btn-secondary,.feg-btn,.v4-mode-btn,.v4-icon-btn,.standalone-icon-btn,.v4-template-actions button,.v4-truss-group-body button,.v4-truss-library button,.v4-stage-tool-buttons button,.v4-led-template-grid button) :where(span,b,small,em,.v4-truss-btn-icon) {
  min-width:0 !important;
  color:inherit !important;
  -webkit-text-fill-color:currentColor !important;
  text-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  button.active,
  button.is-active,
  .active,
  .is-active,
  .feg-workspace-tab.active,
  .feg-workspace-tab.is-active,
  .v4-mode-btn.active,
  .v4-mode-btn.is-active,
  .v4-stage-tool-buttons button.active,
  .v4-stage-tool-buttons button.is-active,
  .v4-led-template-grid button.active,
  .v4-led-template-grid button.is-active,
  .v4-truss-group-body button.active,
  .v4-truss-group-body button.is-active,
  .v4-truss-library button.active,
  .v4-truss-library button.is-active
) {
  background:linear-gradient(180deg, #d7e5dd, #c3d4cb) !important;
  color:#0e1b17 !important;
  -webkit-text-fill-color:#0e1b17 !important;
  border-color:rgba(47,90,82,.62) !important;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.78), 0 0 0 2px rgba(47,90,82,.16), 0 6px 14px rgba(24,34,31,.09) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-stage-canvas-wrap,
  .v4-truss-field-wrap,
  .v4-led-grid-wrap,
  .v4-visual-preview-canvas,
  .v4-canvas-shell,
  .v4-constructor-canvas,
  .v4-block-canvas,
  .v4-grid-canvas,
  .v4-stage-field,
  .v4-truss-canvas,
  .v4-led-field
) {
  background:#eef3ef !important;
  color:#17201c !important;
  border-color:rgba(47,90,82,.20) !important;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.86), 0 10px 26px rgba(24,34,31,.075) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-visual-stage-grid,.v4-truss-field,.v4-led-grid-wrap) {
  background-color:#f5f8f4 !important;
  background-image:
    linear-gradient(var(--light-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--light-grid-line) 1px, transparent 1px) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-stage-cell,.stage-cell,.v4-truss-cell) {
  background:#ffffff !important;
  border-color:rgba(47,90,82,.20) !important;
  color:#15211d !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.92) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-stage-cell.selected,.stage-cell.active) {
  border-color:rgba(47,90,82,.58) !important;
  box-shadow:0 3px 10px rgba(24,34,31,.12), inset 0 0 0 1px rgba(47,90,82,.22) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-field .block-item {
  filter:drop-shadow(0 2px 3px rgba(24,34,31,.20)) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-field .block-item.selected {
  outline:2px solid rgba(47,90,82,.72) !important;
  outline-offset:2px !important;
  box-shadow:0 0 0 3px rgba(47,90,82,.14), 0 8px 18px rgba(24,34,31,.12) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .truss-rail,
  .truss-art-rail,
  .truss-node-rail,
  .node-truss-rail,
  .node-end-plate,
  .feg-truss-front-segment,
  .feg-truss-iso-frame,
  .feg-truss-portal-post,
  .feg-truss-portal-beam,
  .feg-truss-portal-top-beam,
  .feg-truss-iso-post
) {
  stroke:var(--truss-light-rail) !important;
  stroke-opacity:1 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .truss-web,
  .truss-art-web,
  .truss-node-web,
  .node-truss-web
) {
  stroke:var(--truss-light-web) !important;
  stroke-opacity:1 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .truss-end,
  .truss-art-end,
  .node-core,
  .node-port-dot
) {
  fill:var(--truss-light-fill) !important;
  stroke:var(--truss-light-end) !important;
  stroke-opacity:1 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .node-core,
  .node-port-dot
) {
  fill:#7e8b94 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .truss-svg [stroke="#d7dde6"],
  .truss-svg [stroke="#aeb8c6"],
  .truss-svg [stroke="#e5e7eb"],
  .node-svg [stroke="#d7dde6"],
  .node-svg [stroke="#aeb8c6"],
  .base-svg [stroke="#d7dde6"],
  .base-svg [stroke="#aeb8c6"]
) {
  stroke:var(--truss-light-rail) !important;
  stroke-opacity:1 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.truss-label,.truss-art-label,.node-label,.node-art-label,.feg-truss-label) {
  fill:#0f1916 !important;
  stroke:rgba(255,255,255,.92) !important;
  stroke-width:3px !important;
  paint-order:stroke fill !important;
  font-weight:900 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.feg-truss-segment) {
  fill:#7c8992 !important;
  stroke:#45525c !important;
  opacity:1 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.feg-truss-node) {
  fill:#66747e !important;
  stroke:#34414b !important;
  opacity:1 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.feg-truss-base) {
  fill:#39464f !important;
  stroke:#9b6518 !important;
  opacity:1 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.feg-truss-roof-seed) {
  stroke:#2f5a52 !important;
  opacity:.95 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-load-indicator.ok,
  .ok,
  .good,
  .success
) {
  color:#245b43 !important;
  -webkit-text-fill-color:#245b43 !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-load-indicator.ok {
  background:linear-gradient(180deg, #d9e7dd, #eef6f1) !important;
  border-color:rgba(47,107,79,.40) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-load-indicator.risk,
body.v4-only-body.quick-standalone-body.theme-light :where(.warn,.warning,.v4-step-warn,.v4-truss-template-warnings) {
  background:#fff4dc !important;
  color:#754a0f !important;
  -webkit-text-fill-color:#754a0f !important;
  border-color:rgba(155,101,24,.38) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-load-indicator.bad,
body.v4-only-body.quick-standalone-body.theme-light :where(.bad,.danger,.error) {
  background:#fff0ef !important;
  color:#842828 !important;
  -webkit-text-fill-color:#842828 !important;
  border-color:rgba(155,47,47,.40) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-grid-2,
  .v4-grid-3,
  .v4-grid-4,
  .v4-summary-grid,
  .v4-bom-summary-grid,
  .v4-stage-summary-metrics,
  .v4-truss-summary-metrics,
  .v4-led-summary-metrics,
  .v4-template-actions,
  .v4-card-head,
  .v4-section-head,
  .v4-truss-stool-action-row,
  .v4-truss-stool-dimensions-grid,
  .v4-stage-flow-grid,
  .v4-truss-group-body
) {
  min-width:0 !important;
  gap:max(6px, var(--feg-gap-sm, 8px)) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-grid-2 > *,
  .v4-grid-3 > *,
  .v4-grid-4 > *,
  .v4-summary-grid > *,
  .v4-bom-summary-grid > *,
  .v4-stage-summary-metrics > *,
  .v4-truss-summary-metrics > *,
  .v4-led-summary-metrics > *,
  .v4-truss-group-body > *,
  .v4-template-actions > *,
  .v4-card-head > *,
  .v4-section-head > *
) {
  min-width:0 !important;
  overflow-wrap:anywhere !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(
  .v4-badge,
  .v4-demo-badge,
  .v4-dashboard-badge,
  .v4-truss-mode-pill,
  .v4-stage-draw-pill,
  .v4-led-grid-note,
  .v4-truss-chip,
  .v4-truss-chip-field
) {
  background:#e7f1eb !important;
  color:#24463f !important;
  -webkit-text-fill-color:#24463f !important;
  border-color:rgba(47,90,82,.34) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(table,.v4-table,.block-calc-table,.block-bom,.orders-table,.truss-project-table,.client-table) {
  border-color:rgba(24,39,34,.14) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(th,.v4-table th,.block-calc-table th,.block-bom th,.orders-table th,.truss-project-table th,.client-table th) {
  background:#e9f0ec !important;
  color:#38473f !important;
  -webkit-text-fill-color:#38473f !important;
  border-color:rgba(24,39,34,.13) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(td,.v4-table td,.block-calc-table td,.block-bom td,.orders-table td,.truss-project-table td,.client-table td) {
  color:#17201c !important;
  -webkit-text-fill-color:#17201c !important;
  border-color:rgba(24,39,34,.10) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-quick-modal,.pdf-modal,.weights-modal,.v4-truss-load-dialog-card,dialog) {
  max-width:min(calc(100vw - 24px), var(--modal-max-width, 980px)) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-quick-modal-body,.pdf-modal-body,.weights-modal-body,.v4-truss-load-dialog-card) {
  overflow:auto !important;
}


/* v3.1.66 — final light polish: truss load modal, LED/stage added-module contrast, overlay safety. */
body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog,
body.v4-only-body.quick-standalone-body.theme-light dialog.v4-truss-load-dialog {
  background:transparent !important;
  background-color:transparent !important;
  color:#17201c !important;
  border:0 !important;
  box-shadow:none !important;
  padding:0 !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog::backdrop,
body.v4-only-body.quick-standalone-body.theme-light dialog.v4-truss-load-dialog::backdrop {
  background:rgba(233,238,232,.76) !important;
  -webkit-backdrop-filter:blur(12px) saturate(1.05) !important;
  backdrop-filter:blur(12px) saturate(1.05) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel,
body.v4-only-body.quick-standalone-body.theme-light form.v4-truss-load-dialog-card.v4-truss-load-panel,
body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card,
body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-panel {
  background:linear-gradient(180deg, #ffffff 0%, #f7faf7 100%) !important;
  background-color:#ffffff !important;
  color:#17201c !important;
  -webkit-text-fill-color:initial !important;
  border:1px solid rgba(24,39,34,.18) !important;
  box-shadow:0 26px 70px rgba(24,34,31,.22), inset 0 1px 0 rgba(255,255,255,.95) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel :where(.v4-grid-2,.v4-grid-3,.v4-grid-4,.v4-truss-load-body,.v4-truss-load-content,.v4-truss-load-section,.v4-card-head,.v4-section-head,.v4-truss-dialog-body) {
  background:transparent !important;
  background-color:transparent !important;
  color:#17201c !important;
  border-color:rgba(24,39,34,.10) !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel :where(.v4-field,label.v4-field,.feg-field-wrap,.v4-mini,.v4-mini-stat,.v4-note,.hint,.v4-load-input-card) {
  background:#ffffff !important;
  background-color:#ffffff !important;
  color:#17201c !important;
  -webkit-text-fill-color:#17201c !important;
  border-color:rgba(24,39,34,.17) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.96) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel :where(input,select,textarea) {
  background:#ffffff !important;
  background-color:#ffffff !important;
  color:#101a16 !important;
  -webkit-text-fill-color:#101a16 !important;
  border-color:rgba(24,39,34,.24) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel :where(.v4-field > span,.v4-field-label,small,.v4-muted,.hint,.v4-note,.v4-kicker) {
  background:transparent !important;
  color:#4f5e57 !important;
  -webkit-text-fill-color:#4f5e57 !important;
  border-color:transparent !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel :where([style*="background:#0"],[style*="background: #0"],[style*="background-color:#0"],[style*="background-color: #0"],[style*="background:#1"],[style*="background: #1"],[style*="background-color:#1"],[style*="background-color: #1"]) {
  background:#ffffff !important;
  background-color:#ffffff !important;
  background-image:none !important;
  color:#17201c !important;
  -webkit-text-fill-color:#17201c !important;
  border-color:rgba(24,39,34,.16) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel :where(.v4-load-indicator.ok,.status-ok,.ok) {
  background:linear-gradient(180deg, #d7e8dd, #eef7f1) !important;
  color:#1d4f38 !important;
  -webkit-text-fill-color:#1d4f38 !important;
  border-color:rgba(47,107,79,.46) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel :where(.v4-load-indicator.risk,.status-warn,.warn,.warning) {
  background:linear-gradient(180deg, #fff1d4, #fff9ec) !important;
  color:#75470b !important;
  -webkit-text-fill-color:#75470b !important;
  border-color:rgba(155,101,24,.42) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel :where(.v4-load-indicator.bad,.status-bad,.bad,.danger,.error) {
  background:linear-gradient(180deg, #ffe4e2, #fff3f2) !important;
  color:#842828 !important;
  -webkit-text-fill-color:#842828 !important;
  border-color:rgba(155,47,47,.44) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel :where(button,.btn-secondary,.v4-icon-btn) {
  background:linear-gradient(180deg, #ffffff, #edf4ef) !important;
  color:#16231e !important;
  -webkit-text-fill-color:#16231e !important;
  border-color:rgba(24,39,34,.18) !important;
}



/* v3.1.67 — light-theme fix for legacy LoadChecker inner sections inside the truss load modal.
   The old v4/design-system layer paints .block-load-section dark; keep the fix scoped to
   the modal card so truss calculations, tables and the dark fallback remain untouched. */
body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel .block-load-sections {
  background:transparent !important;
  background-color:transparent !important;
  color:#17201c !important;
  border-color:transparent !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel .block-load-section {
  background:linear-gradient(180deg, #ffffff 0%, #f4f8f5 100%) !important;
  background-color:#ffffff !important;
  color:#17201c !important;
  -webkit-text-fill-color:#17201c !important;
  border:1px solid rgba(24,39,34,.15) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.98), 0 8px 18px rgba(24,34,31,.06) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel .block-load-section h5 {
  background:transparent !important;
  color:#24463f !important;
  -webkit-text-fill-color:#24463f !important;
  border-color:transparent !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel .block-load-grid,
body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel .block-load-grid > div {
  background:transparent !important;
  background-color:transparent !important;
  color:#17201c !important;
  -webkit-text-fill-color:#17201c !important;
  border-color:transparent !important;
  box-shadow:none !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel .block-load-grid > div:nth-child(odd) {
  color:#5d6b64 !important;
  -webkit-text-fill-color:#5d6b64 !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel .block-load-note {
  background:#f1f6f2 !important;
  background-color:#f1f6f2 !important;
  color:#53625b !important;
  -webkit-text-fill-color:#53625b !important;
  border:1px solid rgba(24,39,34,.12) !important;
  border-radius:14px !important;
  padding:10px 12px !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.88) !important;
}



/* v3.1.68 — light-shell reinforcement for the relocated launch theme toggle and truss load indicator text. */
body.v4-only-body.quick-standalone-body.theme-light .feg-launch-theme-toggle {
  background:linear-gradient(180deg, #ffffff, #edf4ef) !important;
  color:#17302b !important;
  -webkit-text-fill-color:initial !important;
  border-color:rgba(24,39,34,.16) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .feg-launch-theme-toggle .feg-theme-switch-caption {
  color:#40514a !important;
  -webkit-text-fill-color:#40514a !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-load-slot .v4-load-indicator :where(b,span,small) {
  opacity:1 !important;
  text-shadow:none !important;
  -webkit-text-fill-color:currentColor !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-load-slot .v4-load-indicator b { color:#0d1714 !important; }
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-load-slot .v4-load-indicator span { color:#2f463e !important; }
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-load-slot .v4-load-indicator small { color:#4f625a !important; }

body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-load-slot .v4-load-indicator.ok :where(b,span,small) { color:#174d35 !important; }
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-load-slot .v4-load-indicator.risk :where(b,span,small) { color:#6a420b !important; }
body.v4-only-body.quick-standalone-body.theme-light .v4-structure-truss .v4-truss-load-slot .v4-load-indicator.bad :where(b,span,small) { color:#7a2525 !important; }

body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.filled,
body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell[class*="color-"].filled {
  background:
    linear-gradient(135deg, rgba(var(--led-construction-rgb, 68,118,109), .66), rgba(var(--led-construction-rgb, 68,118,109), .38)),
    linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.06)) !important;
  border-color:rgba(var(--led-construction-rgb, 68,118,109), .92) !important;
  color:#0d1714 !important;
  -webkit-text-fill-color:#0d1714 !important;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.38), inset 0 -10px 18px rgba(24,34,31,.08), 0 2px 5px rgba(24,34,31,.16) !important;
  opacity:1 !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.filled .v4-led-cell-texture {
  opacity:.42 !important;
  mix-blend-mode:multiply !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.filled i,
body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.filled::after {
  background:rgba(13,23,20,.55) !important;
  color:#0d1714 !important;
  border-color:rgba(255,255,255,.45) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.active,
body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.is-active,
body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell[data-active="true"] {
  border-color:#1f4d45 !important;
  box-shadow:inset 0 0 0 2px rgba(255,255,255,.55), 0 0 0 3px rgba(47,90,82,.24), 0 4px 10px rgba(24,34,31,.20) !important;
  filter:saturate(1.22) contrast(1.08) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.color-main.filled { --led-construction-rgb:47,90,82; }
body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.color-side.filled { --led-construction-rgb:87,103,147; }
body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.color-side2.filled { --led-construction-rgb:121,91,143; }
body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.color-top.filled { --led-construction-rgb:156,103,38; }
body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.color-bottom.filled { --led-construction-rgb:61,111,126; }
body.v4-only-body.quick-standalone-body.theme-light .v4-led-grid .v4-led-cell.color-custom.filled { --led-construction-rgb:95,108,102; }

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-polish .v4-stage-cell.selected,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-cell.selected,
body.v4-only-body.quick-standalone-body.theme-light .stage-cell.active {
  background-color:#cfded5 !important;
  background-image:
    linear-gradient(135deg, rgba(47,90,82,.26), rgba(47,90,82,.08)),
    url('./stage-deck-texture.png') !important;
  background-size:cover !important;
  background-position:center !important;
  border-color:rgba(47,90,82,.72) !important;
  color:#0f1916 !important;
  -webkit-text-fill-color:#0f1916 !important;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.58), inset 0 -12px 20px rgba(24,34,31,.06), 0 3px 9px rgba(24,34,31,.16) !important;
  filter:contrast(1.06) saturate(1.04) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-polish .v4-stage-cell.selected::before,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-cell.selected::before,
body.v4-only-body.quick-standalone-body.theme-light .stage-cell.active::after {
  background:rgba(47,90,82,.12) !important;
  border-color:rgba(47,90,82,.55) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-polish .v4-stage-cell.has-stair,
body.v4-only-body.quick-standalone-body.theme-light .v4-stage-cell.has-stair {
  border-color:rgba(156,103,38,.72) !important;
  box-shadow:inset 0 0 0 1px rgba(156,103,38,.22), 0 3px 9px rgba(24,34,31,.14) !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-stage-stair-icon {
  color:#7b4d14 !important;
  -webkit-text-fill-color:#7b4d14 !important;
  filter:drop-shadow(0 1px 0 rgba(255,255,255,.72)) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-visual-preview-canvas,.v4-stage-canvas-wrap,.v4-led-grid-wrap,.v4-truss-field-wrap) :where(svg text,text) {
  fill:#101a16 !important;
  stroke:rgba(255,255,255,.94) !important;
  stroke-width:3px !important;
  paint-order:stroke fill !important;
  font-weight:800 !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-visual-preview-canvas,.v4-stage-canvas-wrap,.v4-led-grid-wrap) :where(svg rect[fill="#ffffff"],svg rect[fill="#fff"],svg rect[fill="white"]) {
  stroke:rgba(47,90,82,.22) !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-quick-modal,.pdf-modal,.weights-modal,dialog:not(.v4-truss-load-dialog)) {
  overflow:hidden !important;
}

body.v4-only-body.quick-standalone-body.theme-light .v4-truss-load-dialog-card.v4-truss-load-panel {
  max-height:min(88vh, 920px) !important;
  overflow:auto !important;
  overscroll-behavior:contain !important;
}

body.v4-only-body.quick-standalone-body.theme-light :where(.v4-quick-modal-body,.pdf-modal-body,.weights-modal-body,.v4-truss-load-dialog-card) {
  scrollbar-color:rgba(47,90,82,.34) #f1f6f2 !important;
}


`;

  function settings() {
    return window.FEGModules && window.FEGModules.AppSettings;
  }

  function isLightEnabled() {
    try {
      if (window.FEG_ENABLE_LIGHT_THEME === true) return true;
      if (window.localStorage && window.localStorage.getItem('fegLightThemeEnabled') === '1') return true;
    } catch (err) {}
    return !!(document.documentElement && document.documentElement.getAttribute('data-feg-light-theme-enabled') === 'true');
  }

  function isLightActive() {
    return isLightEnabled()
      && document.documentElement
      && document.documentElement.getAttribute('data-app-theme') === 'light'
      && document.body
      && document.body.classList.contains('theme-light');
  }

  function removeShell() {
    const style = document.getElementById(STYLE_ID);
    if (style && style.parentNode) style.parentNode.removeChild(style);
  }

  function injectShell() {
    if (!isLightActive()) {
      removeShell();
      return;
    }
    const parent = document.body || document.documentElement;
    if (!parent) return;
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      style.setAttribute('data-feg-version', VERSION);
      style.setAttribute('data-feg-style-scope', 'light-shell-body-safe');
      style.textContent = css;
      parent.appendChild(style);
      return;
    }
    if (style.textContent !== css) style.textContent = css;
    style.setAttribute('data-feg-version', VERSION);
    style.setAttribute('data-feg-style-scope', 'light-shell-body-safe');
    if (style.parentNode !== parent || style.nextElementSibling) parent.appendChild(style);
  }

  function refreshGuards() {
    try { if (window.FEG_STANDALONE_DARK_THEME_LOCK && typeof window.FEG_STANDALONE_DARK_THEME_LOCK.refresh === 'function') window.FEG_STANDALONE_DARK_THEME_LOCK.refresh(); } catch (err) {}
    try { if (window.FEG_MOBILE_DARK_UI_PARITY && typeof window.FEG_MOBILE_DARK_UI_PARITY.refresh === 'function') window.FEG_MOBILE_DARK_UI_PARITY.refresh(); } catch (err) {}
  }

  function applyTheme(theme) {
    const next = theme === 'light' ? 'light' : 'dark';
    const appSettings = settings();
    if (appSettings && typeof appSettings.saveAppTheme === 'function') appSettings.saveAppTheme(next);
    else {
      document.documentElement.classList.toggle('theme-light', next === 'light');
      document.documentElement.classList.toggle('theme-dark', next !== 'light');
      document.documentElement.setAttribute('data-app-theme', next);
      document.documentElement.style.colorScheme = next === 'light' ? 'light' : 'dark';
      if (document.body) {
        document.body.classList.toggle('theme-light', next === 'light');
        document.body.classList.toggle('theme-dark', next !== 'light');
        document.body.setAttribute('data-app-theme', next);
        document.body.style.colorScheme = next === 'light' ? 'light' : 'dark';
      }
      try { window.localStorage.setItem('appTheme', next); } catch (err) {}
    }
    refreshGuards();
    injectShell();
    return next;
  }

  function enableLight() {
    try { window.localStorage.setItem('fegLightThemeEnabled', '1'); } catch (err) {}
    document.documentElement.setAttribute('data-feg-light-theme-enabled', 'true');
    window.FEG_ENABLE_LIGHT_THEME = true;
    return applyTheme('light');
  }

  function disableLight() {
    try {
      window.localStorage.removeItem('fegLightThemeEnabled');
      window.localStorage.setItem('appTheme', 'dark');
    } catch (err) {}
    document.documentElement.removeAttribute('data-feg-light-theme-enabled');
    window.FEG_ENABLE_LIGHT_THEME = false;
    const next = applyTheme('dark');
    removeShell();
    refreshGuards();
    updateLaunchControls();
    return next;
  }

  function getTheme() {
    const appSettings = settings();
    if (appSettings && typeof appSettings.loadAppTheme === 'function') return appSettings.loadAppTheme();
    return isLightActive() ? 'light' : 'dark';
  }

  function toggle() {
    return isLightActive() ? disableLight() : enableLight();
  }

  function updateLaunchControls() {
    const active = isLightActive();
    const label = active ? 'Переключить на тёмную тему' : 'Переключить на светлую тему';
    const icon = active ? '☾' : '☀';
    document.querySelectorAll('[data-feg-theme-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      if (!btn.getAttribute('data-feg-theme-toggle-label')) btn.textContent = icon;
      btn.dataset.fegThemeState = active ? 'light' : 'dark';
    });
  }

  function bindLaunchControls(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-feg-theme-toggle]').forEach((btn) => {
      if (btn._fegLightThemeLaunchBound) return;
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const next = toggle();
        updateLaunchControls();
        try {
          if (window.showToast) window.showToast(next === 'light' ? 'Светлая тема включена' : 'Тёмная тема включена');
        } catch (err) {}
      });
      btn._fegLightThemeLaunchBound = true;
    });
    updateLaunchControls();
  }

  function boot() {
    refreshGuards();
    injectShell();
    bindLaunchControls(document);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
  setTimeout(boot, 0);
  setTimeout(boot, 250);
  setTimeout(boot, 1000);

  if (window.MutationObserver) {
    const startObserver = function () {
      const root = document.documentElement;
      if (!root) return;
      const observer = new MutationObserver(() => {
        injectShell();
        updateLaunchControls();
      });
      observer.observe(root, { attributes: true, attributeFilter: ['data-app-theme', 'data-feg-light-theme-enabled', 'class'] });
      if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-app-theme'] });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startObserver, { once: true });
    else startObserver();
  }

  function parseRgb(value) {
    const m = String(value || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
    if (!m) return null;
    const a = m[4] == null ? 1 : Number(m[4]);
    return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: Number.isFinite(a) ? a : 1 };
  }

  function luminance(rgb) {
    if (!rgb || rgb.a === 0) return 255;
    return (0.2126 * rgb.r) + (0.7152 * rgb.g) + (0.0722 * rgb.b);
  }

  function summarizeElement(el) {
    if (!el) return '';
    const cls = String(el.className || '').trim().replace(/\s+/g, '.');
    const id = el.id ? `#${el.id}` : '';
    return `${el.tagName ? el.tagName.toLowerCase() : 'el'}${id}${cls ? '.' + cls : ''}`.slice(0, 180);
  }

  function audit(options) {
    const limit = options && options.limit ? Number(options.limit) : 80;
    const root = (options && options.root) || document.body;
    const nodes = root ? Array.from(root.querySelectorAll('*')) : [];
    const darkBackgrounds = [];
    const lowContrastHints = [];
    nodes.slice(0, options && options.maxNodes ? Number(options.maxNodes) : 2500).forEach((el) => {
      const cs = window.getComputedStyle(el);
      const bg = parseRgb(cs.backgroundColor);
      const fg = parseRgb(cs.color);
      const bgLum = luminance(bg);
      const fgLum = luminance(fg);
      if (bg && bg.a > 0.75 && bgLum < 95) {
        darkBackgrounds.push({ el: summarizeElement(el), background: cs.backgroundColor, color: cs.color });
      }
      if (bg && fg && bg.a > 0.5 && Math.abs(bgLum - fgLum) < 55) {
        lowContrastHints.push({ el: summarizeElement(el), background: cs.backgroundColor, color: cs.color });
      }
    });
    return {
      version: VERSION,
      lightActive: isLightActive(),
      scanned: nodes.length,
      darkBackgrounds: darkBackgrounds.slice(0, limit),
      lowContrastHints: lowContrastHints.slice(0, limit)
    };
  }

  window.FEG_LIGHT_THEME_SHELL = {
    version: VERSION,
    refresh: boot,
    isLightEnabled,
    isLightActive,
    getTheme,
    audit,
    enableLight,
    disableLight,
    toggle,
    bindLaunchControls,
    updateLaunchControls,
    setLight: enableLight,
    setDark: disableLight
  };
})();
