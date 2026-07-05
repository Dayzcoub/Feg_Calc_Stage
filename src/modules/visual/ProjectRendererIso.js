// FEG Stage PRO v3.17.8 - ProjectRendererIso facade
// Responsibility: expose the isometric renderer contract as a dedicated module.
(function () {
  'use strict';

  const GLOBAL = typeof window !== 'undefined' ? window : globalThis;
  const ROOT = (GLOBAL.FEGModules = GLOBAL.FEGModules || {});
  const PROJECT_RENDERER_ISO_VERSION = '3.17.8-project-renderer-iso-facade';

  function renderer2d() {
    return ROOT.ProjectRenderer2D || ROOT.VisualProjectRenderer2D || null;
  }

  function requireRenderer() {
    const renderer = renderer2d();
    if (!renderer) throw new Error('ProjectRenderer2D is required before ProjectRendererIso');
    return renderer;
  }

  function renderStageIsoViewSvg(model, options) {
    return requireRenderer().renderStageIsoViewSvg(model, options || {});
  }

  function renderProjectIsoViewSvg(model, options) {
    return requireRenderer().renderProjectIsoViewSvg(model, options || {});
  }

  function renderStageIsoViewDataUri(model, options) {
    const renderer = requireRenderer();
    if (renderer.renderStageIsoViewDataUri) return renderer.renderStageIsoViewDataUri(model, options || {});
    const svg = renderer.renderStageIsoViewSvg(model, options || {});
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function renderTrussIsoOverlay(model, context) {
    const renderer = requireRenderer();
    return renderer.renderTrussIsoOverlay ? renderer.renderTrussIsoOverlay(model, context || {}) : '';
  }

  function renderLedIsoOverlay(model, context) {
    const renderer = requireRenderer();
    return renderer.renderLedIsoOverlay ? renderer.renderLedIsoOverlay(model, context || {}) : '';
  }

  const api = {
    PROJECT_RENDERER_ISO_VERSION,
    renderStageIsoViewSvg,
    renderProjectIsoViewSvg,
    renderStageIsoViewDataUri,
    renderTrussIsoOverlay,
    renderLedIsoOverlay
  };

  ROOT.ProjectRendererIso = api;
  ROOT.VisualProjectRendererIso = api;
})();
