(function () {
  'use strict';

  const STYLE_ID = 'feg-v4-linear-design-system';

  const css = `
/* v3.17.41 - quick truss real stool dimensions + unified final kit.
   Pure UI layer: flat Linear-like palette, compact typography, safe technical canvas exceptions, ordered stage controls, subrent overrides, shared subrentor cards and client/subrent price fields.
   Keeps stage/truss/LED calculations, warehouse writes and backend data flows untouched; role/auth UI boundaries are updated and the admin user access and password recovery UI is added. */
:root {
  --bg: #08090a;
  --bg-2: #0b0c0d;
  --panel: #0f1011;
  --panel-2: #121315;
  --panel-3: #16171a;
  --surface: #0f1011;
  --surface-raised: #121315;
  --surface-elevated: #17181b;
  --line: rgba(255,255,255,.105);
  --line-soft: rgba(255,255,255,.065);
  --text: #d8dbe0;
  --ink: #d8dbe0;
  --text-strong: #eef0f3;
  --muted: #8f949d;
  --muted-2: #646a73;
  --accent: #f2c94c;
  --accent-dark: #9f7d10;
  --accent-soft: rgba(242,201,76,.14);
  --accent-line: rgba(242,201,76,.44);
  --danger: #ef4444;
  --warning: #f2c94c;
  --success: #30a46c;
  --info: #5e6ad2;
  --radius-xs: 3px;
  --radius-sm: 4px;
  --radius-md: 5px;
  --radius-lg: 7px;
  --radius-xl: 9px;
  --shadow-soft: 0 18px 42px rgba(0,0,0,.36);
  --shadow-card: 0 8px 22px rgba(0,0,0,.20);
  --focus-ring: 0 0 0 2px rgba(242,201,76,.30);
}

html,
body,
body.v4-only-body {
  background:#08090a !important;
  color:var(--text) !important;
}
body.v4-only-body {
  padding:12px !important;
  font-size:11px !important;
  line-height:1.45 !important;
  font-weight:400 !important;
}
body.v4-only-body,
body.v4-only-body :where(input, select, textarea, button) {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
}
body.v4-only-body :where(.v4-shell, .v4-shell *, .v4-quick-modal, .v4-quick-modal *, .modal-backdrop, .modal-backdrop *, .v4-equipment-editor, .v4-equipment-editor *, dialog, dialog *) {
  font-style:normal !important;
}
body.v4-only-body #v4ShellPage {
  max-width:1440px !important;
  margin:0 auto !important;
}
body.v4-only-body .v4-shell { gap:10px !important; }
body.v4-only-body .app-container {
  max-width:1440px !important;
  background:#0f1011 !important;
  border:1px solid var(--line) !important;
  border-radius:12px !important;
  box-shadow:var(--shadow-soft) !important;
  padding:12px !important;
}

body.v4-only-body :where(h1, h2, h3, h4, h5, h6, .v4-card h2, .v4-card h3, .v4-hero h2, .v4-dashboard-title h3, .v4-section-title, .v4-panel-title) {
  font-size:14px !important;
  line-height:1.25 !important;
  letter-spacing:-.01em !important;
  font-weight:650 !important;
  color:var(--text-strong) !important;
  border-left:0 !important;
  padding-left:0 !important;
  margin-top:0 !important;
}
body.v4-only-body :where(p, li, td, th, label, small, span, summary, input, select, textarea, button, .v4-muted, .v4-card p, .v4-hero p) {
  font-size:11px !important;
}
body.v4-only-body :where(.v4-kicker, label, th, .v4-dashboard-group-title b, .v4-dashboard-role-details summary) {
  font-size:10px !important;
  line-height:1.25 !important;
  color:var(--muted) !important;
  letter-spacing:.04em !important;
  text-transform:uppercase !important;
}
body.v4-only-body :where(.v4-muted, .v4-card p, .v4-hero p, small) { color:var(--muted) !important; }
body.v4-only-body b,
body.v4-only-body strong { color:var(--text-strong) !important; }

body.v4-only-body :where(.v4-card, .v4-hero, .v4-dashboard-panel, .v4-wide-section, .v4-active-step-card, .v4-quote-form, .v4-dashboard-group, .v4-mini, .v4-role-card, .v4-section-card, .v4-settings-card, .v4-report-panel, .v4-sync-panel, .v4-warehouse-detail, .v4-doc-panel, .v4-project-details, .v4-admin-control-side, .v4-data-quality-stat, .v4-report-kpi, .v4-equipment-card, .v4-equipment-category-health, .v4-quote-doc-group, .v4-summary-card, .v4-readiness-item, .v4-sync-issues, .v4-json-details, .v4-led-constructor, .v4-visual-preview-panel, .client-area, .stage-editor-card) {
  border-color:var(--line) !important;
  background:#0f1011 !important;
  border-radius:var(--radius-lg) !important;
  box-shadow:var(--shadow-card) !important;
}
body.v4-only-body :where(.v4-card, .v4-hero, .v4-dashboard-panel, .v4-wide-section, .v4-active-step-card, .v4-quote-form, .v4-dashboard-group, .v4-section-card, .v4-settings-card, .v4-report-panel, .v4-sync-panel, .v4-doc-panel, .v4-summary-card) {
  padding:12px !important;
}
body.v4-only-body .v4-hero {
  background:#0f1011 !important;
  border-radius:var(--radius-xl) !important;
  backdrop-filter:none !important;
}
body.v4-only-body :where(.v4-mini, .v4-role-card, .v4-dashboard-card, .v4-dashboard-primary, .v4-dashboard-chip, .v4-warehouse-project, .v4-project-details) {
  background:#121315 !important;
  border-color:var(--line) !important;
}
body.v4-only-body :where(.v4-dashboard-primary.active, .v4-dashboard-card.active, .v4-dashboard-chip.active, .v4-warehouse-project.active, .active) {
  background:#17181b !important;
  border-color:var(--accent-line) !important;
  box-shadow:inset 0 0 0 1px rgba(47,79,79,.26) !important;
}

body.v4-only-body :where(button, .btn-primary, .btn-secondary, .btn-success, .btn-danger, .v4-dashboard-primary, .v4-dashboard-chip, .v4-mini-button, .v4-warehouse-project, .v4-project-row-button) {
  border-radius:var(--radius-md) !important;
  min-height:28px !important;
  padding:6px 10px !important;
  line-height:1.25 !important;
  transition:border-color .12s ease, background .12s ease, color .12s ease !important;
  transform:none !important;
  box-shadow:none !important;
}
body.v4-only-body :where(.btn-primary, button.btn-primary, .v4-dashboard-primary) {
  background:#151618 !important;
  border-color:var(--accent-line) !important;
  color:#f1f2f4 !important;
}
body.v4-only-body :where(.btn-secondary, button.btn-secondary, .v4-dashboard-chip, .v4-mini-button, .v4-project-row-button) {
  background:#111214 !important;
  border-color:var(--line) !important;
  color:var(--text) !important;
}
body.v4-only-body :where(.btn-success, button.btn-success) {
  background:#102016 !important;
  border-color:rgba(48,164,108,.42) !important;
  color:#9fe6b8 !important;
}
body.v4-only-body :where(.btn-danger, button.btn-danger) {
  background:#241112 !important;
  border-color:rgba(239,68,68,.36) !important;
  color:#ffb4ab !important;
}
body.v4-only-body :where(button:not([disabled]), .v4-dashboard-primary, .v4-dashboard-chip, .v4-mini-button, .v4-warehouse-project):hover {
  transform:none !important;
  border-color:rgba(255,255,255,.18) !important;
  background:#191a1d !important;
}
body.v4-only-body :where(.btn-primary, button.btn-primary, .v4-dashboard-primary):hover {
  border-color:var(--accent-line) !important;
  background:#1a1b1e !important;
}
body.v4-only-body button[disabled] { opacity:.48 !important; cursor:not-allowed !important; transform:none !important; }
body.v4-only-body :where(button, input, select, textarea, summary, [tabindex]):focus-visible {
  outline:none !important;
  box-shadow:var(--focus-ring) !important;
  border-color:var(--accent-line) !important;
}

body.v4-only-body :where(input, select, textarea) {
  background:#0d0e10 !important;
  border:1px solid var(--line) !important;
  color:var(--text) !important;
  border-radius:var(--radius-md) !important;
  padding:6px 8px !important;
  min-height:28px !important;
  box-shadow:none !important;
}
body.v4-only-body :where(input::placeholder, textarea::placeholder) { color:var(--muted-2) !important; }
body.v4-only-body select option { background:#0d0e10 !important; color:var(--text) !important; }
body.v4-only-body label { color:var(--muted) !important; }

body.v4-only-body :where(.v4-table-wrap, .v4-table-container, .table-wrap) {
  border:1px solid var(--line) !important;
  border-radius:var(--radius-lg) !important;
  background:#0f1011 !important;
  overflow:auto;
}
body.v4-only-body :where(table, .v4-table) {
  border-color:var(--line-soft) !important;
  border-collapse:collapse !important;
}
body.v4-only-body :where(th, .v4-table th) {
  background:#121315 !important;
  color:var(--muted) !important;
  border-color:var(--line-soft) !important;
  font-size:10px !important;
  text-transform:uppercase;
  letter-spacing:.04em;
  padding:7px 8px !important;
}
body.v4-only-body :where(td, .v4-table td) {
  border-color:var(--line-soft) !important;
  color:var(--text) !important;
  padding:7px 8px !important;
}
body.v4-only-body :where(tr:hover td) { background:#121315 !important; }

body.v4-only-body :where(.v4-note, .v4-hint-card, .v4-visual-preview-meta, .v4-led-grid-note, .hint, .result-card) {
  border:1px solid var(--line) !important;
  background:#111214 !important;
  color:var(--muted) !important;
  border-radius:var(--radius-lg) !important;
}
body.v4-only-body :where(.v4-json-details, details) summary { color:var(--text) !important; }
body.v4-only-body :where(pre, code, textarea[readonly]) {
  background:#090a0b !important;
  border-color:var(--line-soft) !important;
  color:#c9ccd2 !important;
  border-radius:var(--radius-md) !important;
}

body.v4-only-body :where(.ok, .success, .v4-readiness-summary .ok, .v4-sync-check.ok span) { color:#9fe6b8 !important; }
body.v4-only-body :where(.warn, .warning, .v4-readiness-summary .warn) { color:#f5d76e !important; }
body.v4-only-body :where(.bad, .danger, .error, .v4-readiness-summary .bad) { color:#ffb4ab !important; }
body.v4-only-body :where(.v4-readiness-item.ok, .v4-report-score.ok, .v4-data-quality-stat.ok, .v4-equipment-category-health.ok) { border-color:rgba(48,164,108,.30) !important; background:#102016 !important; }
body.v4-only-body :where(.v4-readiness-item.warn, .v4-report-score.warn, .v4-data-quality-stat.warn, .v4-equipment-category-health.warn) { border-color:rgba(242,201,76,.30) !important; background:#1c190e !important; }
body.v4-only-body :where(.v4-readiness-item.bad, .v4-report-score.bad, .v4-data-quality-stat.bad, .v4-equipment-category-health.bad) { border-color:rgba(239,68,68,.30) !important; background:#241112 !important; }

body.v4-only-body :where(.v4-visual-preview-canvas, .v4-led-grid-wrap, .v4-visual-stage-grid, .truss-constructor-canvas, .v4-structure-canvas, .v4-stage-constructor, .v4-led-workbench) {
  background:#0b0c0d !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-lg) !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-visual-led-placement-controls {
  border-color:var(--line) !important;
  background:#111214 !important;
  border-radius:var(--radius-lg) !important;
}
body.v4-only-body :where(.v4-led-panel-block, .v4-led-canvas-panel, .v4-led-construction-report) {
  background:#111214 !important;
  color:var(--text) !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-lg) !important;
  box-shadow:none !important;
}
body.v4-only-body :where(.v4-led-panel-block h4, .v4-led-canvas-panel h4, .v4-led-construction-report h4) {
  color:var(--text-strong) !important;
}
body.v4-only-body .v4-led-part-chip {
  background:#151719 !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  border-radius:var(--radius-md) !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-led-part-chip span {
  color:var(--muted) !important;
}
body.v4-only-body .v4-led-part-chip.color-main,
body.v4-only-body .v4-led-grid .v4-led-cell.color-main {
  --led-construction-rgb:120,183,183;
}
body.v4-only-body .v4-led-part-chip.color-side,
body.v4-only-body .v4-led-grid .v4-led-cell.color-side {
  --led-construction-rgb:126,208,147;
}
body.v4-only-body .v4-led-part-chip.color-side2,
body.v4-only-body .v4-led-grid .v4-led-cell.color-side2 {
  --led-construction-rgb:177,139,222;
}
body.v4-only-body .v4-led-part-chip.color-top,
body.v4-only-body .v4-led-grid .v4-led-cell.color-top {
  --led-construction-rgb:226,165,85;
}
body.v4-only-body .v4-led-part-chip.color-bottom,
body.v4-only-body .v4-led-grid .v4-led-cell.color-bottom {
  --led-construction-rgb:218,119,160;
}
body.v4-only-body .v4-led-part-chip.color-custom,
body.v4-only-body .v4-led-grid .v4-led-cell.color-custom {
  --led-construction-rgb:108,205,190;
}
body.v4-only-body .v4-led-part-chip[class*="color-"] {
  border-left:5px solid rgb(var(--led-construction-rgb, 120,183,183)) !important;
}
body.v4-only-body .v4-led-part-chip:hover,
body.v4-only-body .v4-led-part-chip.active {
  background:#172020 !important;
  border-color:rgba(var(--led-construction-rgb, 120,183,183), .64) !important;
  box-shadow:inset 0 0 0 1px rgba(var(--led-construction-rgb, 120,183,183), .34) !important;
}
body.v4-only-body .v4-led-grid-head {
  color:var(--text) !important;
}
body.v4-only-body .v4-led-grid-note {
  background:#172020 !important;
  border-color:var(--accent-line) !important;
  color:#dce8e8 !important;
  border-radius:999px !important;
}
body.v4-only-body .v4-led-grid .v4-led-cell {
  /* Technical drawing cells are square LED cabinets, not rounded UI pills. */
  width:var(--led-cell-size,28px) !important;
  height:var(--led-cell-size,28px) !important;
  min-width:var(--led-cell-size,28px) !important;
  min-height:var(--led-cell-size,28px) !important;
  border-radius:2px !important;
  padding:0 !important;
  border-color:rgba(255,255,255,.11) !important;
  background:#101113 !important;
  transform:none !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-led-grid .v4-led-cell:hover {
  transform:none !important;
  border-color:var(--accent-line) !important;
  background:#141518 !important;
}
body.v4-only-body .v4-led-grid .v4-led-cell.filled {
  border-color:var(--accent-line) !important;
  background-color:#151719 !important;
  background-image:url('./led-cabinet-texture.png') !important;
  background-size:cover !important;
  background-position:center !important;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.04) !important;
}
body.v4-only-body .v4-led-grid .v4-led-cell.filled .v4-led-cell-texture {
  background:linear-gradient(135deg, rgba(0,0,0,.10), rgba(255,255,255,.035)) !important;
  opacity:.42 !important;
}
body.v4-only-body .v4-led-grid .v4-led-cell.filled[class*="color-"] {
  border-color:rgba(var(--led-construction-rgb, 120,183,183), .95) !important;
  background-image:
    linear-gradient(135deg, rgba(var(--led-construction-rgb, 120,183,183), .22), rgba(0,0,0,.04) 42%, rgba(var(--led-construction-rgb, 120,183,183), .12)),
    url('./led-cabinet-texture.png') !important;
  box-shadow:
    inset 0 0 0 2px rgba(var(--led-construction-rgb, 120,183,183), .88),
    inset 0 -10px 18px rgba(0,0,0,.18) !important;
}
body.v4-only-body .v4-led-grid .v4-led-cell.filled i {
  position:absolute !important;
  left:3px !important;
  top:3px !important;
  width:7px !important;
  height:7px !important;
  border-radius:2px !important;
  background:rgb(var(--led-construction-rgb, 120,183,183)) !important;
  box-shadow:0 0 0 1px rgba(0,0,0,.42), 0 0 7px rgba(var(--led-construction-rgb, 120,183,183), .56) !important;
  pointer-events:none !important;
}
body.v4-only-body .v4-led-grid .v4-led-cell.filled:hover {
  background-image:url('./led-cabinet-texture.png') !important;
  background-size:cover !important;
}
body.v4-only-body .v4-led-grid .v4-led-cell.filled[class*="color-"]:hover {
  background-image:
    linear-gradient(135deg, rgba(var(--led-construction-rgb, 120,183,183), .26), rgba(0,0,0,.02) 42%, rgba(var(--led-construction-rgb, 120,183,183), .14)),
    url('./led-cabinet-texture.png') !important;
}
body.v4-only-body .v4-led-grid .v4-led-cell.active,
body.v4-only-body .v4-led-grid .v4-led-cell.is-active,
body.v4-only-body .v4-led-grid .v4-led-cell[data-active="true"] {
  outline:2px solid rgba(var(--led-construction-rgb, 120,183,183), .90) !important;
  outline-offset:1px !important;
  z-index:1 !important;
}
body.v4-only-body .v4-visual-preview-canvas :where(.feg-led-screen, .feg-led-top-screen, .feg-led-iso-screen) {
  fill:#0f1c1c !important;
  stroke:#6f9999 !important;
  opacity:.96 !important;
}
body.v4-only-body .v4-visual-preview-canvas .feg-led-grid {
  stroke:#92abab !important;
  opacity:.34 !important;
}
body.v4-only-body .v4-visual-preview-canvas :where(.feg-led-label, .feg-led-meta) {
  fill:#dce8e8 !important;
}

body.v4-only-body .v4-equipment-editor-backdrop { background:rgba(0,0,0,.72) !important; backdrop-filter:none !important; }
body.v4-only-body .v4-equipment-editor,
body.v4-only-body :where(.modal, .dialog, .v4-modal) {
  background:#111214 !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-xl) !important;
  box-shadow:0 22px 64px rgba(0,0,0,.56) !important;
}

body.v4-only-body :where(.v4-card-head, .v4-structure-toolbar, .v4-truss-template-head, .v4-doc-preview-head, .v4-equipment-editor-head, .pdf-modal-header, .v4-quick-modal-head) {
  gap:12px !important;
  align-items:flex-start !important;
  border-color:var(--line-soft) !important;
}
body.v4-only-body :where(.v4-actions, .action-group, .v4-template-actions, .v4-stage-mode-actions, .v4-stage-tool-buttons, .v4-structure-toolbar-actions, .v4-dashboard-chip-row, .v4-truss-edit-row, .v4-truss-mode-actions) {
  gap:8px !important;
}
body.v4-only-body :where(.v4-grid-3, .settings-grid, .v4-equipment-smart-row, .v4-visual-led-placement-grid, .v4-final-doc-actions-grid) {
  grid-template-columns:repeat(auto-fit, minmax(min(220px, 100%), 1fr)) !important;
  gap:10px !important;
}

body.v4-only-body :where(.v4-grid-2, .v4-grid-4) {
  display:grid !important;
  grid-template-columns:repeat(auto-fit, minmax(min(160px, 100%), 1fr)) !important;
  gap:10px !important;
}
body.v4-only-body .v4-truss-template-panel,
body.v4-only-body .v4-truss-template-split,
body.v4-only-body .v4-truss-template-card {
  min-width:0 !important;
  max-width:100% !important;
  box-sizing:border-box !important;
}
body.v4-only-body .v4-truss-template-split {
  display:grid !important;
  grid-template-columns:minmax(240px, .82fr) minmax(360px, 1.18fr) minmax(280px, .95fr) !important;
  gap:10px !important;
  align-items:stretch !important;
}
body.v4-only-body .v4-truss-template-card {
  display:grid !important;
  gap:10px !important;
  padding:10px !important;
  background:#0f1011 !important;
  border:1px solid var(--line-soft) !important;
  border-radius:var(--radius-md) !important;
  min-width:0 !important;
  max-width:100% !important;
  overflow:hidden !important;
}
body.v4-only-body .v4-truss-template-card :where(.v4-field, label, input, select, textarea, button) {
  min-width:0 !important;
  max-width:100% !important;
  box-sizing:border-box !important;
}
body.v4-only-body .v4-truss-template-card :where(input, select, textarea) {
  width:100% !important;
}
body.v4-only-body .v4-truss-template-card-head {
  display:flex !important;
  align-items:flex-start !important;
  justify-content:space-between !important;
  gap:10px !important;
}
body.v4-only-body .v4-truss-template-card-head b {
  font-size:13px !important;
  line-height:1.25 !important;
}
body.v4-only-body .v4-truss-template-card-head span {
  color:var(--muted) !important;
  font-size:10px !important;
  line-height:1.25 !important;
  text-transform:uppercase !important;
  letter-spacing:.03em !important;
}
body.v4-only-body .v4-truss-stool-grid {
  display:grid !important;
  grid-template-columns:repeat(4, minmax(0, 1fr)) !important;
  gap:10px !important;
  min-width:0 !important;
  max-width:100% !important;
  overflow:hidden !important;
}
body.v4-only-body .v4-truss-template-card--pricing {
  min-width:0 !important;
  max-width:100% !important;
  align-self:stretch !important;
}
body.v4-only-body .v4-truss-template-card--pricing small,
body.v4-only-body .v4-truss-template-card[data-truss-template-card="stool"] small {
  max-width:100% !important;
  min-width:0 !important;
  overflow-wrap:anywhere !important;
}
@media (max-width: 1220px) {
  body.v4-only-body .v4-truss-template-split { grid-template-columns:repeat(2, minmax(0, 1fr)) !important; }
  body.v4-only-body .v4-truss-template-card[data-truss-template-card="stool"] { grid-column:1 / -1 !important; }
  body.v4-only-body .v4-truss-stool-grid { grid-template-columns:repeat(4, minmax(0, 1fr)) !important; }
}
@media (max-width: 767px) {
  body.v4-only-body .v4-truss-template-split { grid-template-columns:1fr !important; }
  body.v4-only-body .v4-truss-template-card[data-truss-template-card="stool"] { grid-column:auto !important; }
  body.v4-only-body .v4-truss-stool-grid { grid-template-columns:repeat(2, minmax(0, 1fr)) !important; }
}
@media (max-width: 560px) {
  body.v4-only-body .v4-truss-stool-grid { grid-template-columns:1fr !important; }
}

body.v4-only-body :where(.v4-structure-editor, .v4-structure-stage, .v4-structure-truss, .v4-led-constructor, .v4-led-workbench, .v4-quick-modal, .v4-truss-load-dialog-card, .pdf-modal, .weights-modal) {
  background:#0f1011 !important;
  color:var(--text) !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-lg) !important;
  box-shadow:var(--shadow-card) !important;
}
body.v4-only-body :where(.v4-stage-template-panel, .v4-truss-template-panel, .v4-stage-frame-auto-card, .v4-stage-tool-box, .v4-truss-edit-tools, .v4-truss-library, .v4-truss-group, .v4-load-indicator, .v4-truss-v3-load-summary, .v4-truss-v3-tables, .v4-truss-final-kit, .v4-communication-note) {
  background:#111214 !important;
  color:var(--text) !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-lg) !important;
  box-shadow:none !important;
}
body.v4-only-body :where(.v4-stage-frame-auto-card span, .v4-stage-tool-box span, .v4-truss-mode-pill, .v4-stage-draw-pill, .v4-communication-meta) {
  color:var(--muted) !important;
}
body.v4-only-body :where(.v4-truss-mode-pill, .v4-stage-draw-pill) {
  background:#151719 !important;
  border-color:var(--accent-line) !important;
  color:#dce8e8 !important;
  border-radius:999px !important;
}
body.v4-only-body :where(.v4-stage-draw-help, .v4-stage-check, .v4-stage-frame-note, .v4-template-actions small) {
  color:var(--muted) !important;
}
body.v4-only-body .v4-stage-draw-help {
  background:#111214 !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-md) !important;
  padding:10px 12px !important;
}
body.v4-only-body .v4-stage-tool-buttons button.active,
body.v4-only-body .v4-stage-tool-buttons button[aria-pressed="true"] {
  background:#192828 !important;
  border-color:var(--accent-line) !important;
  color:#f1f2f4 !important;
}

body.v4-only-body .v4-step-check-card {
  display:grid !important;
  gap:6px !important;
}
body.v4-only-body .v4-step-check-meta {
  display:flex !important;
  align-items:center !important;
  justify-content:space-between !important;
  gap:10px !important;
}
body.v4-only-body .v4-step-check-meta span {
  color:var(--muted) !important;
  font-size:10px !important;
  line-height:1.25 !important;
  letter-spacing:.04em !important;
  text-transform:uppercase !important;
  font-weight:900 !important;
}
body.v4-only-body .v4-step-check-meta b {
  font-size:13px !important;
  line-height:1.25 !important;
  text-align:right !important;
}
@media (max-width: 700px) {
  body.v4-only-body .v4-step-check-meta {
    align-items:flex-start !important;
    flex-direction:column !important;
  }
  body.v4-only-body .v4-step-check-meta b {
    text-align:left !important;
  }
}
body.v4-only-body .v4-stage-check {
  min-height:36px !important;
  display:flex !important;
  align-items:center !important;
  gap:8px !important;
  padding:8px 10px !important;
  background:#111214 !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-md) !important;
}
body.v4-only-body .v4-stage-controls-layout {
  display:grid !important;
  grid-template-columns:repeat(3, minmax(0, 1fr)) !important;
  gap:10px !important;
  align-items:start !important;
}
body.v4-only-body .v4-stage-control-stack {
  display:grid !important;
  gap:10px !important;
  align-content:start !important;
}
body.v4-only-body .v4-stage-control-stack .v4-field,
body.v4-only-body .v4-stage-control-stack .v4-stage-check,
body.v4-only-body .v4-stage-control-stack .v4-stage-frame-auto-card {
  margin:0 !important;
}
body.v4-only-body .v4-stage-frame-auto-card--compact {
  padding:8px 10px !important;
  min-height:auto !important;
  gap:2px !important;
}
body.v4-only-body .v4-stage-frame-auto-card--compact b {
  font-size:13px !important;
  line-height:1.2 !important;
}
body.v4-only-body .v4-stage-frame-auto-card--compact small {
  font-size:10px !important;
  line-height:1.3 !important;
}
body.v4-only-body .v4-stage-check--edge {
  min-height:42px !important;
}
body.v4-only-body .v4-stage-secondary-layout {
  display:grid !important;
  grid-template-columns:minmax(220px, 320px) minmax(280px, 1fr) !important;
  gap:10px !important;
  margin-top:10px !important;
  align-items:start !important;
}
body.v4-only-body .v4-stage-secondary-layout .v4-stage-tool-box,
body.v4-only-body .v4-stage-secondary-layout .v4-stage-draw-help {
  min-height:100% !important;
}
@media (max-width: 767px) {
  body.v4-only-body .v4-stage-controls-layout {
    grid-template-columns:1fr !important;
  }
  body.v4-only-body .v4-stage-secondary-layout {
    grid-template-columns:1fr !important;
  }
}
body.v4-only-body :where(input[type="checkbox"], input[type="radio"]) {
  accent-color:var(--accent) !important;
}

body.v4-only-body :where(.v4-stage-canvas-wrap, .v4-led-grid-wrap, .v4-visual-preview-canvas, .v4-truss-field) {
  background:#0a0b0c !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-lg) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.025) !important;
  scrollbar-gutter:stable both-edges;
  overscroll-behavior:contain;
}
body.v4-only-body .v4-stage-canvas-wrap {
  padding:8px !important;
  max-width:100% !important;
}
body.v4-only-body .v4-stage-polish .v4-visual-stage-grid,
body.v4-only-body .v4-visual-stage-grid {
  background-color:#0a0b0c !important;
  background-image:
    linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px) !important;
  background-size:var(--stage-cell-px, 24px) var(--stage-cell-px, 24px) !important;
  border-color:var(--line-soft) !important;
  border-radius:var(--radius-md) !important;
  gap:3px !important;
}
body.v4-only-body .v4-stage-polish .v4-stage-cell,
body.v4-only-body .v4-stage-cell {
  background:#111315 !important;
  border:1px solid rgba(255,255,255,.11) !important;
  border-radius:4px !important;
  color:transparent !important;
  box-shadow:none !important;
  transform:none !important;
}
body.v4-only-body .v4-stage-polish .v4-stage-cell:hover,
body.v4-only-body .v4-stage-cell:hover {
  background:#15191b !important;
  border-color:var(--accent-line) !important;
  box-shadow:inset 0 0 0 1px rgba(80,128,128,.18) !important;
  transform:none !important;
}
body.v4-only-body .v4-stage-polish .v4-stage-cell.selected,
body.v4-only-body .v4-stage-cell.selected,
body.v4-only-body .stage-cell.active {
  border-color:var(--accent-line) !important;
  background-image:url('./stage-deck-texture.png') !important;
  background-color:#1a1d1d !important;
  background-size:cover !important;
  background-position:center !important;
  color:transparent !important;
  box-shadow:0 3px 10px rgba(0,0,0,.30), inset 0 0 0 1px rgba(255,255,255,.10) !important;
}
body.v4-only-body .v4-stage-polish .v4-stage-cell.selected::before,
body.v4-only-body .v4-stage-cell.selected::before,
body.v4-only-body .stage-cell.active::after {
  border-color:rgba(80,128,128,.62) !important;
  background:transparent !important;
}
body.v4-only-body .v4-stage-polish .v4-stage-cell.has-stair {
  border-color:rgba(180,196,196,.62) !important;
  box-shadow:inset 0 0 0 1px rgba(180,196,196,.18) !important;
}


body.v4-only-body .v4-visual-stage-grid {
  position:relative !important;
}
body.v4-only-body .v4-stage-pkc-module-outline {
  position:absolute !important;
  z-index:6 !important;
  pointer-events:none !important;
  box-sizing:border-box !important;
  border:2px solid rgba(255,233,163,.92) !important;
  border-radius:7px !important;
  box-shadow:0 0 0 1px rgba(0,0,0,.50), 0 0 12px rgba(243,198,78,.14) !important;
}
body.v4-only-body .v4-stage-pkc-module-label {
  position:absolute !important;
  z-index:7 !important;
  left:7px !important;
  top:5px !important;
  display:inline-flex !important;
  align-items:center !important;
  min-height:16px !important;
  padding:2px 6px !important;
  border-radius:6px !important;
  border:1px solid rgba(255,233,163,.62) !important;
  background:rgba(7,9,10,.82) !important;
  color:#fff8dc !important;
  font-size:11px !important;
  font-weight:900 !important;
  line-height:1 !important;
  letter-spacing:.01em !important;
  white-space:nowrap !important;
  box-shadow:0 2px 6px rgba(0,0,0,.35) !important;
}
body.v4-only-body .v4-stage-pkc-origin-label {
  display:none !important;
}

body.v4-only-body .v4-truss-layout {
  grid-template-columns:minmax(190px, 260px) minmax(0, 1fr) !important;
  gap:12px !important;
}
body.v4-only-body .v4-truss-library {
  max-height:min(58vh, 620px) !important;
}
body.v4-only-body .v4-truss-library .block-object-group,
body.v4-only-body .v4-truss-group {
  background:#111214 !important;
  border-color:var(--line) !important;
}
body.v4-only-body .v4-truss-library .block-object-group.active,
body.v4-only-body .v4-truss-group.active {
  border-color:var(--accent-line) !important;
  box-shadow:inset 0 0 0 1px rgba(80,128,128,.30) !important;
}
body.v4-only-body .v4-truss-library .block-object-group summary,
body.v4-only-body .v4-truss-group summary {
  color:var(--text) !important;
  min-height:34px !important;
}
body.v4-only-body .v4-truss-group summary b,
body.v4-only-body .v4-truss-group-body button span,
body.v4-only-body .v4-truss-group-body button small,
body.v4-only-body .v4-truss-library .block-group-title {
  color:var(--text) !important;
}
body.v4-only-body .v4-truss-group summary em,
body.v4-only-body .v4-truss-library .block-group-count,
body.v4-only-body .v4-truss-group-mark,
body.v4-only-body .v4-truss-library .block-group-icon {
  background:#17181b !important;
  color:var(--muted) !important;
}
body.v4-only-body .v4-truss-group-body button,
body.v4-only-body .v4-truss-library .block-object-group-body button,
body.v4-only-body .v4-icon-btn,
body.v4-only-body .v4-mode-btn {
  background:#151719 !important;
  color:var(--text) !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-md) !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-truss-group-body button:hover,
body.v4-only-body .v4-truss-library .block-object-group-body button:hover {
  background:#172020 !important;
  border-color:var(--accent-line) !important;
  box-shadow:0 0 0 2px rgba(80,128,128,.16) inset !important;
}
body.v4-only-body .v4-truss-group-body button.active,
body.v4-only-body .v4-truss-library .block-object-group-body button.active,
body.v4-only-body .v4-mode-btn.active {
  background:#1c1d20 !important;
  border-color:rgba(166,205,205,.92) !important;
  color:#f1f2f4 !important;
  box-shadow:inset 0 0 0 1px rgba(242,201,76,.25) !important;
}
body.v4-only-body .v4-truss-group-body button.active .v4-truss-btn-icon,
body.v4-only-body .v4-truss-library .block-object-group-body button.active .block-object-icon,
body.v4-only-body .v4-truss-library .block-object-group-body button.active span {
  color:#f4ffff !important;
}
body.v4-only-body .v4-truss-workspace {
  min-width:0 !important;
}
body.v4-only-body .v4-truss-zoom-panel {
  display:flex !important;
  justify-content:space-between !important;
  align-items:center !important;
  gap:10px !important;
  margin-bottom:8px !important;
  padding:8px 10px !important;
  background:#111214 !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-md) !important;
}
body.v4-only-body .v4-truss-zoom-panel > div:first-child {
  display:flex !important;
  flex-direction:column !important;
  gap:2px !important;
  color:var(--text) !important;
}
body.v4-only-body .v4-truss-zoom-panel [data-truss-zoom-value] {
  color:var(--muted) !important;
  font-size:12px !important;
  font-weight:800 !important;
}
body.v4-only-body .v4-truss-zoom-controls {
  display:flex !important;
  align-items:center !important;
  justify-content:flex-end !important;
  gap:8px !important;
  flex-wrap:wrap !important;
}
body.v4-only-body .v4-truss-zoom-controls input[type="range"] {
  width:min(220px, 34vw) !important;
  accent-color:var(--accent) !important;
}
body.v4-only-body .v4-truss-autofit {
  display:inline-flex !important;
  align-items:center !important;
  gap:6px !important;
  color:var(--muted) !important;
  font-size:12px !important;
  font-weight:800 !important;
  white-space:nowrap !important;
}
body.v4-only-body .v4-truss-field-wrap {
  max-width:100% !important;
  height:min(62vh, 640px) !important;
  min-height:360px !important;
  overflow:auto !important;
  border:1px solid rgba(148,163,184,.24) !important;
  border-radius:18px !important;
  background:#050608 !important;
  padding:8px !important;
}
body.v4-only-body .v4-truss-field-wrap .v4-truss-field {
  min-height:0 !important;
  overflow:visible !important;
  max-width:none !important;
}
body.v4-only-body .v4-truss-field {
  background-color:#0a0b0c !important;
  background-image:
    linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px) !important;
  background-size:var(--truss-cell-px, 44px) var(--truss-cell-px, 44px) !important;
}
body.v4-only-body .v4-truss-cell:hover {
  background:rgba(47,79,79,.16) !important;
  outline:1px dashed var(--accent-line) !important;
}
body.v4-only-body .v4-truss-field .block-item {
  background:transparent !important;
  border-color:transparent !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-truss-field .block-item.selected {
  outline:2px solid var(--accent-line) !important;
  outline-offset:2px !important;
}

body.v4-only-body .v4-structure-truss .v4-truss-v3-load-summary,
body.v4-only-body .v4-structure-truss .v4-truss-v3-tables, .v4-truss-final-kit {
  margin-top:12px !important;
  background:#111214 !important;
  color:var(--text) !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-lg) !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-structure-truss .v4-truss-load-header {
  background:#121315 !important;
  color:var(--text-strong) !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-md) !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-structure-truss .v4-truss-load-header span,
body.v4-only-body .v4-structure-truss .block-load-grid div:nth-child(odd),
body.v4-only-body .v4-structure-truss .block-load-note,
body.v4-only-body .v4-structure-truss .block-muted-cell {
  color:var(--muted) !important;
}
body.v4-only-body .v4-structure-truss .block-load-section {
  background:#111214 !important;
  color:var(--text) !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-lg) !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-structure-truss .block-load-section h5,
body.v4-only-body .v4-structure-truss .block-calc-table caption {
  color:var(--text-strong) !important;
}
body.v4-only-body .v4-structure-truss .block-calc-table,
body.v4-only-body .v4-structure-truss .block-bom {
  width:100% !important;
  background:#0f1011 !important;
  color:var(--text) !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-lg) !important;
  border-collapse:separate !important;
  border-spacing:0 !important;
  box-shadow:none !important;
  overflow:hidden !important;
}
body.v4-only-body .v4-structure-truss .block-calc-table caption {
  caption-side:top !important;
  text-align:left !important;
  padding:8px 0 !important;
  font-size:11px !important;
  font-weight:700 !important;
}
body.v4-only-body .v4-structure-truss .block-calc-table th,
body.v4-only-body .v4-structure-truss .block-calc-table td,
body.v4-only-body .v4-structure-truss .block-bom th,
body.v4-only-body .v4-structure-truss .block-bom td {
  border-color:var(--line-soft) !important;
  color:var(--text) !important;
}
body.v4-only-body .v4-structure-truss .block-calc-table th,
body.v4-only-body .v4-structure-truss .block-bom th {
  background:#121315 !important;
  color:var(--muted) !important;
  font-weight:700 !important;
}
body.v4-only-body .v4-structure-truss .block-calc-table td,
body.v4-only-body .v4-structure-truss .block-bom td {
  background:#0f1011 !important;
}
body.v4-only-body .v4-structure-truss .block-calc-table tr:nth-child(even) td,
body.v4-only-body .v4-structure-truss .block-bom tr:nth-child(even) td {
  background:#111214 !important;
}
body.v4-only-body .v4-structure-truss .block-calc-table tr:hover td,
body.v4-only-body .v4-structure-truss .block-bom tr:hover td {
  background:#151719 !important;
}
body.v4-only-body .v4-structure-truss .block-total-row td {
  background:#182828 !important;
  color:#f1f2f4 !important;
  border-color:var(--accent-line) !important;
  font-weight:800 !important;
}
body.v4-only-body .v4-structure-truss .v4-truss-v3-load-summary.bad .v4-truss-load-header {
  border-color:rgba(223,95,95,.62) !important;
}
body.v4-only-body .v4-structure-truss .v4-truss-v3-load-summary.risk .v4-truss-load-header {
  border-color:rgba(216,178,86,.62) !important;
}
body.v4-only-body .v4-structure-truss .v4-truss-v3-load-summary.ok .v4-truss-load-header {
  border-color:rgba(80,128,128,.66) !important;
}

body.v4-only-body :where(.modal-backdrop, .v4-quick-modal-backdrop, .v4-equipment-editor-backdrop) {
  background:rgba(0,0,0,.74) !important;
  backdrop-filter:none !important;
  padding:16px !important;
}
body.v4-only-body dialog::backdrop,
body.v4-only-body .v4-truss-load-dialog::backdrop {
  background:rgba(0,0,0,.74) !important;
  backdrop-filter:none !important;
}
body.v4-only-body :where(.v4-quick-modal, .pdf-modal, .weights-modal, .v4-truss-load-dialog, .v4-equipment-editor) {
  width:min(1120px, calc(100vw - 32px)) !important;
  max-height:calc(100vh - 32px) !important;
}
body.v4-only-body :where(.v4-quick-modal-body, .weights-modal-body, .v4-equipment-editor-body, .v4-truss-load-dialog-card) {
  overflow:auto !important;
}

body.v4-only-body ::selection { background:rgba(47,79,79,.52); color:white; }
body.v4-only-body * { scrollbar-color:rgba(255,255,255,.20) #0c0d0e; }
body.v4-only-body ::-webkit-scrollbar { width:9px; height:9px; }
body.v4-only-body ::-webkit-scrollbar-track { background:#0c0d0e; }
body.v4-only-body ::-webkit-scrollbar-thumb { background:#2a2b2f; border-radius:8px; border:2px solid #0c0d0e; background-clip:padding-box; }
body.v4-only-body ::-webkit-scrollbar-thumb:hover { background:#3a3b40; border:2px solid #0c0d0e; background-clip:padding-box; }



/* v3.17.32 polish layer: compact availability, ordered stage controls, role cleanup, admin access, unified deficit summary and truss stool T-support distribution. */
body.v4-only-body {
  background:#08090a !important;
  color:#d6d8de !important;
}
body.v4-only-body .app-container {
  background:#0e0f10 !important;
  border-color:#242529 !important;
  border-radius:10px !important;
  padding:8px !important;
}
body.v4-only-body :where(.v4-card, .v4-hero, .v4-dashboard-panel, .v4-wide-section, .v4-active-step-card, .v4-quote-form, .v4-dashboard-group, .v4-section-card, .v4-settings-card, .v4-report-panel, .v4-sync-panel, .v4-doc-panel, .v4-summary-card, .v4-project-details, .v4-admin-control-side, .v4-equipment-card, .v4-communication-room, .v4-communication-thread, .v4-communication-composer) {
  background:#101112 !important;
  border-color:#242529 !important;
  border-radius:8px !important;
  padding:10px !important;
  box-shadow:none !important;
}
body.v4-only-body :where(.v4-mini, .v4-role-card, .v4-dashboard-card, .v4-dashboard-primary, .v4-dashboard-chip, .v4-warehouse-project, .v4-doc-action-card, .v4-quote-doc-group, .v4-data-quality-stat, .v4-report-kpi) {
  background:#131416 !important;
  border-color:#242529 !important;
  border-radius:7px !important;
  box-shadow:none !important;
}
body.v4-only-body :where(button, .btn-primary, .btn-secondary, .btn-success, .btn-danger, .v4-dashboard-primary, .v4-dashboard-chip, .v4-mini-button, .v4-warehouse-project, .v4-project-row-button) {
  background:#151618 !important;
  border-color:#2a2b30 !important;
  color:#d8dbe0 !important;
  border-radius:6px !important;
  min-height:26px !important;
  padding:5px 9px !important;
  font-size:11px !important;
  box-shadow:none !important;
}
body.v4-only-body :where(button:not([disabled]), .v4-dashboard-primary, .v4-dashboard-chip, .v4-mini-button, .v4-warehouse-project):hover {
  background:#1a1b1e !important;
  border-color:#3a3b41 !important;
  color:#f0f1f3 !important;
}
body.v4-only-body :where(.btn-primary, button.btn-primary, .v4-dashboard-primary, .v4-dashboard-primary.active, .v4-dashboard-chip.active, .v4-project-row-button.primary) {
  background:#17181a !important;
  border-color:rgba(242,201,76,.45) !important;
  color:#f2f3f5 !important;
}
body.v4-only-body :where(input, select, textarea) {
  background:#0b0c0d !important;
  border-color:#2a2b30 !important;
  border-radius:6px !important;
  min-height:26px !important;
  padding:5px 8px !important;
}
body.v4-only-body :where(h1, h2, h3, h4, h5, h6, .v4-section-title, .v4-panel-title) {
  font-size:14px !important;
  font-weight:650 !important;
  color:#e7e9ee !important;
}
body.v4-only-body :where(p, li, td, label, small, span, summary, input, select, textarea, button) {
  font-size:11px !important;
}
body.v4-only-body :where(.v4-kicker, label, th, .v4-dashboard-group-title b) {
  font-size:10px !important;
  color:#7f858f !important;
}
body.v4-only-body :where(.v4-table-wrap, .v4-table-container, .table-wrap) {
  background:#0f1011 !important;
  border-color:#242529 !important;
  border-radius:8px !important;
}
body.v4-only-body :where(th, .v4-table th) {
  background:#121315 !important;
  color:#858b95 !important;
  padding:6px 8px !important;
}
body.v4-only-body :where(td, .v4-table td) {
  padding:6px 8px !important;
  border-color:#202126 !important;
}
body.v4-only-body :where(.modal, .dialog, .v4-modal, .v4-quick-modal, .pdf-modal, .weights-modal, .v4-truss-load-dialog, .v4-equipment-editor) {
  background:#101112 !important;
  border-color:#2a2b30 !important;
  border-radius:10px !important;
  box-shadow:0 22px 60px rgba(0,0,0,.54) !important;
}
body.v4-only-body :where(.v4-stage-canvas-wrap, .v4-led-grid-wrap, .v4-visual-preview-canvas, .v4-truss-field) {
  background:#090a0b !important;
  border-color:#242529 !important;
  border-radius:8px !important;
}
body.v4-only-body .v4-led-grid .v4-led-cell {
  border-radius:2px !important;
}
body.v4-only-body .v4-stage-cell {
  border-radius:3px !important;
}
body.v4-only-body :where(.v4-truss-mode-pill, .v4-stage-draw-pill, .v4-led-grid-note) {
  border-radius:6px !important;
  background:#141516 !important;
  color:#c8ccd3 !important;
}
body.v4-only-body :where(.ok, .success, .v4-readiness-summary .ok, .v4-sync-check.ok span) { color:#7fd49b !important; }
body.v4-only-body :where(.warn, .warning, .v4-readiness-summary .warn) { color:#f2c94c !important; }
body.v4-only-body :where(.bad, .danger, .error, .v4-readiness-summary .bad) { color:#ff8f8f !important; }

body.v4-only-body.theme-light {
  --bg:#f4f6f4;
  --bg-2:#eef2ef;
  --panel:#ffffff;
  --panel-2:#f7f9f7;
  --panel-3:#edf2ef;
  --surface:#ffffff;
  --surface-raised:#f7f9f7;
  --surface-elevated:#edf2ef;
  --line:rgba(25,39,39,.16);
  --line-soft:rgba(25,39,39,.09);
  --text:#182020;
  --ink:#182020;
  --text-strong:#0e1616;
  --muted:#667372;
  --muted-2:#879190;
  --accent:#2F4F4F;
  --accent-dark:#213838;
  --accent-soft:rgba(47,79,79,.12);
  --accent-line:rgba(47,79,79,.38);
  --shadow-soft:0 18px 42px rgba(24,34,34,.12);
  --shadow-card:0 8px 22px rgba(24,34,34,.08);
  background:#f4f6f4 !important;
  color:var(--text) !important;
}
body.v4-only-body.theme-light .app-container,
body.v4-only-body.theme-light :where(.v4-card, .v4-hero, .v4-dashboard-panel, .v4-wide-section, .v4-active-step-card, .v4-quote-form, .v4-dashboard-group, .v4-mini, .v4-role-card, .v4-section-card, .v4-settings-card, .v4-report-panel, .v4-sync-panel, .v4-warehouse-detail, .v4-doc-panel, .v4-project-details, .v4-admin-control-side, .v4-data-quality-stat, .v4-report-kpi, .v4-equipment-card, .v4-equipment-category-health, .v4-quote-doc-group, .v4-summary-card, .v4-readiness-item, .v4-sync-issues, .v4-json-details, .v4-led-constructor, .v4-visual-preview-panel, .client-area, .stage-editor-card) {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:var(--shadow-card) !important;
}
body.v4-only-body.theme-light :where(.v4-mini, .v4-role-card, .v4-dashboard-card, .v4-dashboard-primary, .v4-dashboard-chip, .v4-warehouse-project, .v4-project-details, .v4-stage-frame-auto-card, .v4-stage-tool-box, .v4-truss-edit-tools, .v4-truss-library, .v4-truss-group, .v4-load-indicator, .v4-truss-v3-load-summary, .v4-truss-v3-tables, .v4-truss-final-kit, .v4-led-panel-block, .v4-led-canvas-panel, .v4-led-construction-report, .v4-communication-note) {
  background:#f7f9f7 !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:none !important;
}
body.v4-only-body.theme-light :where(.v4-dashboard-primary.active, .v4-dashboard-card.active, .v4-dashboard-chip.active, .v4-warehouse-project.active, .active) {
  background:#ecf4f1 !important;
  border-color:var(--accent-line) !important;
  box-shadow:inset 0 0 0 1px rgba(47,79,79,.14) !important;
}
body.v4-only-body.theme-light :where(.btn-primary, button.btn-primary, .v4-dashboard-primary) {
  background:linear-gradient(180deg, #2F4F4F, #213838) !important;
  border-color:rgba(47,79,79,.52) !important;
  color:#f7fbfb !important;
}
body.v4-only-body.theme-light :where(.btn-primary, button.btn-primary, .v4-dashboard-primary):hover {
  background:linear-gradient(180deg, #3b5e5e, #2F4F4F) !important;
}
body.v4-only-body.theme-light :where(.btn-secondary, button.btn-secondary, .v4-dashboard-chip, .v4-mini-button, .v4-project-row-button, .v4-icon-btn, .v4-mode-btn) {
  background:#ffffff !important;
  border-color:var(--line) !important;
  color:var(--text) !important;
}
body.v4-only-body.theme-light :where(button:not([disabled]), .v4-dashboard-chip, .v4-mini-button, .v4-warehouse-project):hover {
  background:#eef5f2 !important;
  border-color:var(--accent-line) !important;
}
body.v4-only-body.theme-light :where(input, select, textarea) {
  background:#ffffff !important;
  border-color:var(--line) !important;
  color:var(--text) !important;
}
body.v4-only-body.theme-light :where(input::placeholder, textarea::placeholder) { color:var(--muted-2) !important; }
body.v4-only-body.theme-light select option { background:#ffffff !important; color:var(--text) !important; }
body.v4-only-body.theme-light :where(.v4-table-wrap, .v4-table-container, .table-wrap, .client-table-wrap, .orders-table-wrap, .truss-project-table-wrap, .block-calc-table-wrap, .block-bom-wrap) {
  background:#ffffff !important;
  border-color:var(--line) !important;
}
body.v4-only-body.theme-light :where(th, .v4-table th) {
  background:#eef3f1 !important;
  color:#516160 !important;
  border-color:var(--line-soft) !important;
}
body.v4-only-body.theme-light :where(td, .v4-table td) {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line-soft) !important;
}
body.v4-only-body.theme-light :where(tr:hover td) { background:#f5f8f6 !important; }
body.v4-only-body.theme-light :where(.v4-note, .v4-hint-card, .v4-visual-preview-meta, .v4-led-grid-note, .hint, .result-card) {
  background:#f3f7f5 !important;
  border-color:var(--line) !important;
  color:var(--muted) !important;
}
body.v4-only-body.theme-light :where(pre, code, textarea[readonly]) {
  background:#f8faf9 !important;
  border-color:var(--line-soft) !important;
  color:#203030 !important;
}
body.v4-only-body.theme-light :where(.v4-quick-modal, .pdf-modal, .weights-modal, .v4-truss-load-dialog, .v4-equipment-editor, .v4-truss-load-dialog-card) {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
  box-shadow:0 22px 64px rgba(24,34,34,.18) !important;
}
body.v4-only-body.theme-light :where(.modal-backdrop, .v4-quick-modal-backdrop, .v4-equipment-editor-backdrop),
body.v4-only-body.theme-light dialog::backdrop,
body.v4-only-body.theme-light .v4-truss-load-dialog::backdrop {
  background:rgba(19,28,28,.34) !important;
}
body.v4-only-body.theme-light :where(.v4-stage-canvas-wrap, .v4-led-grid-wrap, .v4-visual-preview-canvas, .v4-truss-field, .v4-visual-stage-grid) {
  background:#eef2ef !important;
  border-color:var(--line) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.75) !important;
}
body.v4-only-body.theme-light .v4-stage-polish .v4-visual-stage-grid,
body.v4-only-body.theme-light .v4-visual-stage-grid,
body.v4-only-body.theme-light .v4-truss-field {
  background-color:#eef2ef !important;
  background-image:
    linear-gradient(rgba(25,39,39,.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(25,39,39,.10) 1px, transparent 1px) !important;
}
body.v4-only-body.theme-light .v4-stage-polish .v4-stage-cell,
body.v4-only-body.theme-light .v4-stage-cell {
  background:#ffffff !important;
  border-color:rgba(25,39,39,.16) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9) !important;
}
body.v4-only-body.theme-light .v4-stage-polish .v4-stage-cell:hover,
body.v4-only-body.theme-light .v4-stage-cell:hover {
  background:#edf6f3 !important;
  border-color:var(--accent-line) !important;
}
body.v4-only-body.theme-light .v4-stage-polish .v4-stage-cell.selected,
body.v4-only-body.theme-light .v4-stage-cell.selected,
body.v4-only-body.theme-light .stage-cell.active {
  background-image:linear-gradient(rgba(255,255,255,.18), rgba(255,255,255,.18)), url('./stage-deck-texture.png') !important;
  background-color:#dfe7e2 !important;
  border-color:var(--accent-line) !important;
  box-shadow:0 3px 10px rgba(24,34,34,.12), inset 0 0 0 1px rgba(47,79,79,.16) !important;
}
body.v4-only-body.theme-light .v4-led-grid .v4-led-cell {
  background:#fafcfb !important;
  border-color:rgba(25,39,39,.16) !important;
}
body.v4-only-body.theme-light .v4-led-grid .v4-led-cell:hover {
  background:#edf6f3 !important;
  border-color:var(--accent-line) !important;
}
body.v4-only-body.theme-light .v4-led-grid .v4-led-cell.filled {
  background-color:#e9efec !important;
}
body.v4-only-body.theme-light .v4-led-part-chip {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
}
body.v4-only-body.theme-light .v4-led-part-chip:hover,
body.v4-only-body.theme-light .v4-led-part-chip.active {
  background:#eef7f4 !important;
  border-color:rgba(var(--led-construction-rgb, 120,183,183), .70) !important;
}
body.v4-only-body.theme-light .v4-truss-group-body button,
body.v4-only-body.theme-light .v4-truss-library .block-object-group-body button,
body.v4-only-body.theme-light .v4-mode-btn {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
}
body.v4-only-body.theme-light .v4-truss-group-body button.active,
body.v4-only-body.theme-light .v4-truss-library .block-object-group-body button.active,
body.v4-only-body.theme-light .v4-mode-btn.active {
  background:#edf2ef !important;
  border-color:rgba(47,79,79,.58) !important;
  color:#173030 !important;
  box-shadow:inset 0 0 0 2px rgba(47,79,79,.16) !important;
}
body.v4-only-body.theme-light .v4-structure-truss .block-calc-table,
body.v4-only-body.theme-light .v4-structure-truss .block-bom {
  background:#ffffff !important;
  color:var(--text) !important;
  border-color:var(--line) !important;
}
body.v4-only-body.theme-light .v4-structure-truss .block-calc-table th,
body.v4-only-body.theme-light .v4-structure-truss .block-bom th {
  background:#eef3f1 !important;
  color:#516160 !important;
}
body.v4-only-body.theme-light .v4-structure-truss .block-calc-table td,
body.v4-only-body.theme-light .v4-structure-truss .block-bom td {
  background:#ffffff !important;
  color:var(--text) !important;
}
body.v4-only-body.theme-light .v4-structure-truss .block-total-row td {
  background:#e4f0ed !important;
  color:#173030 !important;
}
body.v4-only-body.theme-light * { scrollbar-color:rgba(47,79,79,.34) #eef2ef; }
body.v4-only-body.theme-light ::selection { background:rgba(47,79,79,.24); color:#0e1616; }
body.v4-only-body.theme-light ::-webkit-scrollbar-track { background:#eef2ef; }
body.v4-only-body.theme-light ::-webkit-scrollbar-thumb { background:#c1cdca; border-color:#eef2ef; }
body.v4-only-body.theme-light ::-webkit-scrollbar-thumb:hover { background:#aab9b5; border-color:#eef2ef; }

body.v4-only-body .client-pdf,
body.v4-only-body .tech-pdf,
body.v4-only-body #pdfContent,
body.v4-only-body #pdfContent * {
  font-size:initial !important;
  line-height:initial !important;
  box-shadow:initial !important;
}


/* v3.17.32 compact availability + role cleanup + unified deficit summary + truss stool T-support distribution. */
body.v4-only-body .v4-equipment-basket--availability {
  grid-template-columns:repeat(auto-fit, minmax(118px, 1fr)) !important;
  gap:7px !important;
  margin:8px 0 10px !important;
}
body.v4-only-body .v4-availability-mini {
  padding:8px 9px !important;
  border-radius:8px !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-availability-mini.is-ok { border-color:rgba(48,164,108,.24) !important; background:rgba(48,164,108,.08) !important; }
body.v4-only-body .v4-availability-mini.is-deficit { border-color:rgba(239,68,68,.26) !important; background:rgba(239,68,68,.08) !important; }
body.v4-only-body .v4-availability-mini.is-subrent { border-color:rgba(242,201,76,.28) !important; background:rgba(242,201,76,.08) !important; }
body.v4-only-body .v4-availability-mini.is-manual { border-color:rgba(94,106,210,.26) !important; background:rgba(94,106,210,.08) !important; }
body.v4-only-body .v4-availability-mini.is-muted { opacity:.58 !important; }
body.v4-only-body .v4-equipment-smart-row {
  grid-template-columns:minmax(240px, 1.45fr) 72px minmax(150px, 200px) minmax(74px, auto) !important;
  gap:7px !important;
  padding:8px !important;
  border-radius:8px !important;
}
body.v4-only-body .v4-equipment-row-control {
  display:grid !important;
  gap:4px !important;
  align-content:start !important;
  min-width:74px !important;
}
body.v4-only-body .v4-equipment-row-actions {
  display:flex !important;
  gap:4px !important;
  justify-content:stretch !important;
}
body.v4-only-body .v4-equipment-row-icon {
  width:100% !important;
  min-width:0 !important;
  height:22px !important;
  padding:0 !important;
  display:inline-flex !important;
  align-items:center !important;
  justify-content:center !important;
  border:1px solid var(--line) !important;
  border-radius:6px !important;
  background:#141518 !important;
  color:var(--muted) !important;
  font-size:11px !important;
  line-height:1 !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-equipment-row-icon:hover:not(:disabled) {
  color:var(--text-strong) !important;
  border-color:rgba(242,201,76,.32) !important;
  background:rgba(242,201,76,.08) !important;
}
body.v4-only-body .v4-equipment-row-icon[data-quote-equipment-row-delete]:hover:not(:disabled) {
  color:#fecaca !important;
  border-color:rgba(239,68,68,.38) !important;
  background:rgba(239,68,68,.10) !important;
}
body.v4-only-body .v4-equipment-row-icon:disabled {
  opacity:.35 !important;
  cursor:not-allowed !important;
}
body.v4-only-body .v4-equipment-smart-availability {
  display:grid !important;
  gap:3px !important;
  min-width:0 !important;
  padding:6px 7px !important;
  border-radius:7px !important;
}
body.v4-only-body .v4-equipment-smart-availability small {
  overflow:hidden !important;
  text-overflow:ellipsis !important;
  white-space:nowrap !important;
}

body.v4-only-body .v4-linked-subrent-override {
  display:grid !important;
  gap:8px !important;
  padding:8px !important;
  margin:8px 0 10px !important;
  border:1px dashed rgba(242,201,76,.18) !important;
  border-radius:10px !important;
  background:rgba(242,201,76,.035) !important;
}
body.v4-only-body .v4-linked-subrent-override:not(.is-enabled) .v4-linked-subrent-fields {
  display:none !important;
}
body.v4-only-body .v4-linked-subrent-override.is-enabled .v4-linked-subrent-fields {
  display:grid !important;
}
body.v4-only-body .v4-truss-subrent-panel {
  display:grid !important;
  gap:7px !important;
  margin-top:8px !important;
}
body.v4-only-body .v4-truss-subrent-row {
  display:grid !important;
  gap:7px !important;
  padding:8px !important;
  border:1px dashed rgba(242,201,76,.22) !important;
  border-radius:8px !important;
  background:rgba(242,201,76,.045) !important;
}
body.v4-only-body .v4-truss-subrent-main {
  display:grid !important;
  grid-template-columns:minmax(240px, 1.45fr) minmax(82px, 112px) minmax(190px, 1fr) minmax(118px, 138px) !important;
  gap:7px !important;
  align-items:end !important;
}
body.v4-only-body .v4-truss-subrent-meta,
body.v4-only-body .v4-equipment-linked-subrent-title {
  min-width:0 !important;
}
body.v4-only-body .v4-truss-subrent-row b {
  display:block !important;
  font-size:12px !important;
  line-height:1.2 !important;
}
body.v4-only-body .v4-truss-subrent-row small {
  display:block !important;
  color:var(--muted) !important;
  font-size:10px !important;
  line-height:1.25 !important;
}
body.v4-only-body .v4-truss-subrent-prices {
  display:grid !important;
  grid-template-columns:repeat(2, minmax(150px, 1fr)) !important;
  gap:7px !important;
}
body.v4-only-body .v4-truss-subrent-row .v4-field { margin:0 !important; }
@media (max-width: 767px) {
  body.v4-only-body .v4-truss-subrent-main,
  body.v4-only-body .v4-truss-subrent-prices { grid-template-columns:1fr !important; }
}
body.v4-only-body .v4-equipment-deficit-subrent,
body.v4-only-body .v4-equipment-linked-subrent {
  grid-column:1 / -1 !important;
  display:grid !important;
  gap:7px !important;
  padding:7px 8px !important;
  border:1px dashed rgba(242,201,76,.22) !important;
  border-radius:7px !important;
  background:rgba(242,201,76,.045) !important;
}
body.v4-only-body .v4-equipment-linked-subrent-top {
  display:grid !important;
  grid-template-columns:minmax(220px, 1.45fr) minmax(90px, 122px) minmax(190px, 1fr) minmax(118px, 138px) !important;
  gap:7px !important;
  align-items:end !important;
}
body.v4-only-body .v4-equipment-linked-subrent-prices {
  display:grid !important;
  grid-template-columns:repeat(2, minmax(150px, 1fr)) !important;
  gap:7px !important;
}
body.v4-only-body .v4-equipment-deficit-subrent .v4-field,
body.v4-only-body .v4-equipment-linked-subrent .v4-field { margin:0 !important; }
body.v4-only-body .v4-equipment-linked-subrent-title {
  display:grid !important;
  gap:2px !important;
  align-content:center !important;
}
body.v4-only-body .v4-equipment-linked-subrent-title b {
  font-size:11px !important;
  color:#f2c94c !important;
  line-height:1.2 !important;
}
body.v4-only-body .v4-equipment-linked-subrent-title span {
  font-size:9px !important;
  color:var(--muted) !important;
  line-height:1.2 !important;
}
body.v4-only-body .v4-availability-chip {
  display:grid !important;
  gap:1px !important;
  min-width:0 !important;
}
body.v4-only-body .v4-availability-chip b {
  display:block !important;
  margin:0 !important;
  font-size:10px !important;
  line-height:1.15 !important;
  white-space:nowrap !important;
  overflow:hidden !important;
  text-overflow:ellipsis !important;
}
body.v4-only-body .v4-availability-chip span {
  display:block !important;
  color:var(--muted) !important;
  font-size:9px !important;
  line-height:1.16 !important;
  white-space:nowrap !important;
  overflow:hidden !important;
  text-overflow:ellipsis !important;
}
body.v4-only-body .v4-availability-chip.is-ok b { color:#72d49a !important; }
body.v4-only-body .v4-availability-chip.is-deficit b { color:#ff8b8b !important; }
body.v4-only-body .v4-availability-chip.is-subrent b { color:#f2c94c !important; }
body.v4-only-body .v4-availability-chip.is-manual b { color:#a7adff !important; }
body.v4-only-body .v4-availability-chip.is-empty b { color:var(--muted) !important; }
body.v4-only-body .v4-equipment-compact-list {
  display:grid !important;
  gap:6px !important;
  margin-top:10px !important;
}
body.v4-only-body .v4-equipment-compact-row {
  display:grid !important;
  grid-template-columns:minmax(220px, 1fr) minmax(58px, 74px) minmax(130px, 170px) minmax(98px, 132px) !important;
  gap:8px !important;
  align-items:center !important;
  padding:8px 9px !important;
  border:1px solid rgba(255,255,255,.075) !important;
  border-radius:8px !important;
  background:rgba(255,255,255,.026) !important;
}
body.v4-only-body .v4-equipment-compact-row.is-deficit { border-color:rgba(239,68,68,.20) !important; background:rgba(239,68,68,.045) !important; }
body.v4-only-body .v4-equipment-compact-row.is-subrent { border-color:rgba(242,201,76,.18) !important; background:rgba(242,201,76,.04) !important; }
body.v4-only-body :where(.v4-equipment-compact-main, .v4-equipment-compact-source, .v4-equipment-compact-qty) { min-width:0 !important; }
body.v4-only-body :where(.v4-equipment-compact-main b, .v4-equipment-compact-source b, .v4-equipment-compact-qty b) {
  display:block !important;
  line-height:1.2 !important;
  overflow:hidden !important;
  text-overflow:ellipsis !important;
  white-space:nowrap !important;
}
body.v4-only-body :where(.v4-equipment-compact-main span, .v4-equipment-compact-source span, .v4-equipment-compact-qty span) {
  display:block !important;
  margin-top:2px !important;
  color:var(--muted) !important;
  font-size:9px !important;
  line-height:1.18 !important;
  overflow:hidden !important;
  text-overflow:ellipsis !important;
  white-space:nowrap !important;
}
body.v4-only-body .v4-equipment-compact-qty { text-align:right !important; }
@media (max-width: 767px) {
  body.v4-only-body .v4-equipment-smart-row { grid-template-columns:1fr 64px !important; }
  body.v4-only-body :where(.v4-equipment-smart-stock, .v4-equipment-row-control) { grid-column:1 / -1 !important; }
  body.v4-only-body .v4-equipment-row-control { grid-template-columns:1fr !important; }
  body.v4-only-body .v4-equipment-linked-subrent-top,
  body.v4-only-body .v4-equipment-linked-subrent-prices { grid-template-columns:1fr !important; }
  body.v4-only-body .v4-equipment-compact-row { grid-template-columns:1fr 64px !important; }
  body.v4-only-body :where(.v4-equipment-compact-status, .v4-equipment-compact-source) { grid-column:1 / -1 !important; }
  body.v4-only-body .v4-equipment-compact-qty { text-align:left !important; }
}

@media (max-width: 767px) {
  body.v4-only-body :where(.v4-truss-layout, .v4-quote-layout, .v4-report-layout, .v4-doc-layout, .v4-warehouse-ops-layout, .v4-admin-control-layout, .v4-communication-grid) {
    grid-template-columns:1fr !important;
  }
  body.v4-only-body :where(.v4-truss-library, .v4-communication-messages) {
    max-height:none !important;
  }
}

body.v4-only-body .v4-subrentors-directory {
  display:grid !important;
  gap:10px !important;
}
body.v4-only-body .v4-subrentors-stats {
  display:grid !important;
  grid-template-columns:repeat(3, minmax(0, 1fr)) !important;
  gap:8px !important;
}
body.v4-only-body .v4-subrentors-grid {
  display:grid !important;
  grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)) !important;
  gap:10px !important;
}
body.v4-only-body .v4-subrentor-card {
  background:#111214 !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-lg) !important;
  padding:10px !important;
  display:grid !important;
  gap:8px !important;
}
body.v4-only-body .v4-subrentor-card-head {
  display:flex !important;
  justify-content:space-between !important;
  gap:10px !important;
  align-items:start !important;
}
body.v4-only-body .v4-subrentor-card-head b { display:block !important; font-size:14px !important; color:var(--text-strong) !important; }
body.v4-only-body .v4-subrentor-card-head span,
body.v4-only-body .v4-subrentor-card-body span,
body.v4-only-body .v4-subrentor-card p { color:var(--muted) !important; font-size:11px !important; line-height:1.35 !important; }
body.v4-only-body .v4-subrentor-card-head i {
  font-style:normal !important;
  border:1px solid var(--line) !important;
  border-radius:999px !important;
  padding:2px 7px !important;
  font-size:10px !important;
  text-transform:uppercase !important;
}
body.v4-only-body .v4-subrentor-card-head i.ok { color:#9be7c1 !important; border-color:rgba(48,164,108,.42) !important; }
body.v4-only-body .v4-subrentor-card-head i.muted { color:var(--muted) !important; }
body.v4-only-body .v4-subrentor-card-body {
  display:grid !important;
  grid-template-columns:1fr 1fr !important;
  gap:5px 8px !important;
}
body.v4-only-body .v4-subrentor-card-actions { display:flex !important; gap:6px !important; flex-wrap:wrap !important; }
body.v4-only-body .v4-modal {
  position:fixed !important;
  inset:0 !important;
  z-index:9999 !important;
  display:grid !important;
  place-items:center !important;
  padding:16px !important;
}
body.v4-only-body .v4-modal__backdrop {
  position:absolute !important;
  inset:0 !important;
  background:rgba(0,0,0,.68) !important;
  backdrop-filter:blur(3px) !important;
}
body.v4-only-body .v4-modal__panel {
  position:relative !important;
  width:min(760px, 100%) !important;
  max-height:92vh !important;
  overflow:auto !important;
  background:#0f1011 !important;
  border:1px solid var(--line) !important;
  border-radius:var(--radius-xl) !important;
  padding:14px !important;
  box-shadow:var(--shadow-soft) !important;
}
body.v4-only-body .v4-equipment-subrentor-select select { min-width:180px !important; }
body.v4-only-body .v4-equipment-subrentor-add { align-self:end !important; min-height:31px !important; }

@media (max-width: 720px) {
  body.v4-only-body { padding:8px !important; }
  body.v4-only-body :where(.v4-card, .v4-hero, .v4-dashboard-panel, .v4-wide-section, .v4-active-step-card, .v4-quote-form) {
    padding:10px !important;
    border-radius:8px !important;
  }
  body.v4-only-body :where(.v4-dashboard-primary, .v4-dashboard-chip, button) { border-radius:8px !important; }
  body.v4-only-body .app-container {
    padding:8px !important;
    border-radius:8px !important;
  }
  body.v4-only-body :where(.v4-hero, .v4-card-head, .v4-structure-toolbar, .v4-doc-preview-head, .v4-equipment-editor-head) {
    flex-direction:column !important;
    align-items:stretch !important;
  }
  body.v4-only-body :where(.v4-dashboard-quick-actions, .v4-dashboard-chip-row, .v4-actions, .v4-template-actions, .action-group) {
    display:grid !important;
    grid-template-columns:1fr !important;
  }
  body.v4-only-body :where(.v4-actions button, .v4-template-actions button, .action-group button, .v4-dashboard-primary, .v4-dashboard-chip) {
    width:100% !important;
  }
  body.v4-only-body :where(.v4-quick-modal-backdrop, .modal-backdrop, .v4-equipment-editor-backdrop) {
    padding:0 !important;
    align-items:stretch !important;
  }
  body.v4-only-body :where(.v4-quick-modal, .pdf-modal, .weights-modal, .v4-equipment-editor) {
    width:100% !important;
    max-height:100vh !important;
    border-radius:0 !important;
  }
  body.v4-only-body .v4-stage-canvas-wrap,
  body.v4-only-body .v4-truss-field {
    min-height:320px !important;
  }
}


body.v4-only-body .v4-client-add-button { align-self:end !important; min-height:38px !important; }
body.v4-only-body .v4-quote-client-dialog { border:0 !important; border-radius:18px !important; padding:0 !important; background:transparent !important; max-width:min(720px, calc(100vw - 24px)) !important; }
body.v4-only-body .v4-quote-client-dialog::backdrop { background:rgba(0,0,0,.62) !important; backdrop-filter:blur(8px) !important; }
body.v4-only-body .v4-quote-client-modal-card { background:var(--card) !important; border:1px solid var(--border) !important; border-radius:18px !important; padding:14px !important; box-shadow:0 24px 80px rgba(0,0,0,.55) !important; min-width:min(680px, calc(100vw - 24px)) !important; }
body.v4-only-body .v4-grid-span-2 { grid-column:span 2 !important; }
@media (max-width: 760px) { body.v4-only-body .v4-grid-span-2 { grid-column:auto !important; } body.v4-only-body .v4-quote-client-modal-card { min-width:0 !important; } }

/* v3.17.32 project crew smart rows: customer proposal hides names, technical sheets keep assignees; transport now sits before crew; client picker and truss 3D height metadata are active. */
body.v4-only-body .v4-site-checklist-layout {
  display:grid !important;
  grid-template-columns:minmax(220px, 280px) minmax(0, 1fr) !important;
  gap:10px !important;
  align-items:start !important;
}
body.v4-only-body .v4-site-checklist-list,
body.v4-only-body .v4-site-section {
  border:1px solid var(--line-soft) !important;
  border-radius:var(--radius-lg) !important;
  background:rgba(255,255,255,.024) !important;
  padding:10px !important;
}
body.v4-only-body .v4-site-checklist-list {
  display:grid !important;
  gap:8px !important;
  position:sticky !important;
  top:8px !important;
}
body.v4-only-body .v4-site-checklist-row {
  display:grid !important;
  gap:3px !important;
  text-align:left !important;
  border:1px solid var(--line-soft) !important;
  border-radius:var(--radius-md) !important;
  background:#111214 !important;
  padding:8px !important;
  color:var(--text) !important;
  box-shadow:none !important;
}
body.v4-only-body .v4-site-checklist-row.is-active {
  border-color:rgba(242,201,76,.42) !important;
  background:rgba(242,201,76,.08) !important;
}
body.v4-only-body .v4-site-checklist-row span,
body.v4-only-body .v4-site-marker-row span,
body.v4-only-body .v4-site-photo figcaption span {
  color:var(--muted) !important;
  font-size:11px !important;
  line-height:1.25 !important;
}
body.v4-only-body .v4-site-checklist-main {
  display:grid !important;
  gap:10px !important;
}
body.v4-only-body .v4-site-grid {
  display:grid !important;
  grid-template-columns:repeat(3, minmax(0, 1fr)) !important;
  gap:9px !important;
}
body.v4-only-body .v4-site-grid .v4-field { margin:0 !important; }
body.v4-only-body .v4-site-field--wide { grid-column:span 3 !important; }
body.v4-only-body .v4-site-grid textarea {
  min-height:74px !important;
  resize:vertical !important;
}
body.v4-only-body .v4-site-scheme {
  position:relative !important;
  min-height:360px !important;
  border:1px solid rgba(242,201,76,.18) !important;
  border-radius:var(--radius-lg) !important;
  overflow:hidden !important;
  background-color:#0b0c0d !important;
  background-image:linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px) !important;
  background-size:28px 28px !important;
  cursor:crosshair !important;
}
body.v4-only-body .v4-site-marker {
  position:absolute !important;
  transform:translate(-14px, -14px) !important;
  display:flex !important;
  align-items:center !important;
  gap:6px !important;
  max-width:180px !important;
  padding:5px 7px 5px 5px !important;
  border:1px solid rgba(242,201,76,.55) !important;
  border-radius:999px !important;
  background:rgba(8,9,10,.94) !important;
  color:var(--text-strong) !important;
  box-shadow:0 8px 22px rgba(0,0,0,.35) !important;
}
body.v4-only-body .v4-site-marker b {
  width:20px !important;
  height:20px !important;
  display:inline-flex !important;
  align-items:center !important;
  justify-content:center !important;
  border-radius:999px !important;
  background:var(--accent) !important;
  color:#111 !important;
  font-size:11px !important;
}
body.v4-only-body .v4-site-marker span {
  overflow:hidden !important;
  text-overflow:ellipsis !important;
  white-space:nowrap !important;
  font-size:11px !important;
}
body.v4-only-body .v4-site-marker-list,
body.v4-only-body .v4-site-photo-grid {
  display:grid !important;
  gap:8px !important;
  margin-top:9px !important;
}
body.v4-only-body .v4-site-marker-row {
  display:grid !important;
  grid-template-columns:minmax(180px, 1fr) minmax(160px, 1.2fr) auto !important;
  gap:8px !important;
  align-items:center !important;
  padding:7px 8px !important;
  border:1px solid var(--line-soft) !important;
  border-radius:var(--radius-md) !important;
  background:rgba(255,255,255,.026) !important;
}
body.v4-only-body .v4-site-photo-grid {
  grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)) !important;
}
body.v4-only-body .v4-site-photo {
  margin:0 !important;
  border:1px solid var(--line-soft) !important;
  border-radius:var(--radius-lg) !important;
  overflow:hidden !important;
  background:rgba(255,255,255,.03) !important;
}
body.v4-only-body .v4-site-photo img {
  width:100% !important;
  aspect-ratio:4 / 3 !important;
  object-fit:cover !important;
  display:block !important;
}
body.v4-only-body .v4-site-photo figcaption {
  display:grid !important;
  gap:5px !important;
  padding:8px !important;
}
body.v4-only-body .v4-file-button {
  position:relative !important;
  overflow:hidden !important;
  cursor:pointer !important;
}
body.v4-only-body .v4-file-button input {
  position:absolute !important;
  inset:0 !important;
  opacity:0 !important;
  cursor:pointer !important;
}

body.v4-only-body .v4-project-crew-panel {
  display:grid !important;
  gap:12px !important;
}
body.v4-only-body .v4-project-crew-list {
  display:grid !important;
  gap:10px !important;
}
body.v4-only-body .v4-project-crew-row {
  display:grid !important;
  gap:10px !important;
  padding:10px !important;
  border:1px solid var(--line-soft) !important;
  border-radius:var(--radius-lg) !important;
  background:rgba(255,255,255,.025) !important;
}
body.v4-only-body .v4-project-crew-row--draft {
  border-style:dashed !important;
  border-color:rgba(255,255,255,.16) !important;
  background:#0f1011 !important;
}
body.v4-only-body .v4-project-crew-grid {
  display:grid !important;
  grid-template-columns:repeat(4, minmax(0, 1fr)) !important;
  gap:8px !important;
}
body.v4-only-body .v4-project-crew-access {
  display:grid !important;
  grid-template-columns:minmax(190px, 1.2fr) minmax(150px, .8fr) minmax(125px, .6fr) minmax(125px, .6fr) minmax(180px, 1fr) auto auto auto !important;
  gap:8px !important;
  align-items:end !important;
}
body.v4-only-body .v4-project-crew-row .v4-field,
body.v4-only-body .v4-project-crew-row .v4-stage-check {
  margin:0 !important;
}
body.v4-only-body .v4-project-crew-row .btn-secondary {
  min-height:36px !important;
  white-space:nowrap !important;
}
@media (max-width: 767px) {
  body.v4-only-body .v4-project-crew-grid,
  body.v4-only-body .v4-project-crew-access {
    grid-template-columns:1fr 1fr !important;
  }
}
@media (max-width: 720px) {
  body.v4-only-body .v4-project-crew-grid,
  body.v4-only-body .v4-project-crew-access {
    grid-template-columns:1fr !important;
  }
}

@media (max-width: 767px) {
  body.v4-only-body .v4-site-checklist-layout,
  body.v4-only-body .v4-site-grid,
  body.v4-only-body .v4-site-marker-row {
    grid-template-columns:1fr !important;
  }
  body.v4-only-body .v4-site-field--wide { grid-column:auto !important; }
  body.v4-only-body .v4-site-checklist-list { position:static !important; }
}

/* v3.1.5 load slot inside truss scale panel. */
body.v4-only-body .v4-truss-load-slot {
  min-width:0 !important;
}
body.v4-only-body .v4-truss-load-slot .v4-load-indicator {
  width:100% !important;
  min-width:0 !important;
}
@media (min-width: 768px) {
  body.v4-only-body .v4-truss-zoom-panel { display:flex !important; align-items:center !important; gap:10px !important; }
  body.v4-only-body .v4-truss-load-slot { order:-1 !important; flex:0 0 min(260px, 28vw) !important; }
  body.v4-only-body .v4-truss-zoom-panel > div:first-child { order:0 !important; }
  body.v4-only-body .v4-truss-zoom-controls { order:1 !important; flex:1 1 auto !important; }
}
@media (max-width: 767px) {
  body.v4-only-body .v4-truss-load-slot { order:3 !important; flex:1 1 100% !important; width:100% !important; }
}

`;

  function inject() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      style.setAttribute('data-feg-version', '3.17.56-field-desktop-layout-fix');
      style.textContent = css;
      document.head.appendChild(style);
      return;
    }
    if (style.textContent !== css) style.textContent = css;
    if (style.nextElementSibling) document.head.appendChild(style);
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

  const observer = new MutationObserver(() => inject());
  observer.observe(document.head, { childList: true });

  window.FEG_DESIGN_SYSTEM = {
    version: '3.17.56-field-desktop-layout-fix',
    theme: 'linear-reference-compact-dark-light-v4-safe-technical-canvases',
    darkTheme: 'linear-reference-compact-flat-dark-v4-safe-technical-canvases',
    lightTheme: 'linear-reference-compact-flat-light-v4-safe-technical-canvases',
    legacyTheme: 'linear-inspired-dark-v4-safe-technical-canvases',
    refresh: inject
  };
})();
