// FEG Stage PRO v3.16.7 — Visual model foundation / audio-light placeholders
// Responsibility: build quote.visualModel v0.1 from quote sections on demand.
// This is data-only: no automatic render and no BOM/warehouse/backend writes.
(function () {
  'use strict';

  const GLOBAL = typeof window !== 'undefined' ? window : globalThis;
  const ROOT = (GLOBAL.FEGModules = GLOBAL.FEGModules || {});
  const VISUAL_MODEL_VERSION = '0.1';
  const VISUAL_MODEL_BUILDER_VERSION = '3.16.7-visual-model-audio-light-placeholders';

  function nowIso() { return new Date().toISOString(); }
  function clone(value) { try { return JSON.parse(JSON.stringify(value == null ? null : value)); } catch (_) { return value; } }
  function toText(value, fallback) {
    const text = String(value == null ? '' : value).trim();
    return text || String(fallback == null ? '' : fallback).trim();
  }
  function toNumber(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : Number(fallback || 0);
  }
  function nonNegative(value, fallback) { return Math.max(0, toNumber(value, fallback)); }

  function getSection(quote, key) {
    const q = quote || {};
    return q.sections && q.sections[key] ? q.sections[key] : null;
  }

  function sectionStatus(section) {
    if (!section) return 'missing';
    return toText(section.status, section.bomRows || section.result ? 'configured' : 'placeholder');
  }

  function makeSectionSourceMap(quote) {
    const keys = ['stage', 'truss', 'led', 'equipment'];
    return keys.reduce((acc, key) => {
      const section = getSection(quote, key);
      acc[key] = {
        enabled: Boolean(section),
        status: sectionStatus(section),
        title: toText(section && section.title, key),
        bomRows: Array.isArray(section && section.bomRows) ? section.bomRows.length : 0,
        weightKg: nonNegative(section && section.weightKg, 0),
        powerW: nonNegative(section && section.powerW, 0)
      };
      return acc;
    }, {});
  }

  function makePlaceholderAdapter(key, section) {
    return {
      enabled: Boolean(section && section.status === 'configured'),
      status: sectionStatus(section),
      sourceSection: `quote.sections.${key}`,
      adapterStatus: 'reserved_for_future_visual_versions',
      note: 'Adapter slot reserved in visualModel v0.1; no automatic rendering or calculations are executed.'
    };
  }

  function buildStageVisual(quote, options) {
    const section = getSection(quote, 'stage');
    const adapter = ROOT.StageVisualAdapter || ROOT.VisualStageAdapter;
    if (adapter && adapter.adaptStageSection) return adapter.adaptStageSection(section, options || {});
    return makePlaceholderAdapter('stage', section);
  }

  function buildTrussVisual(quote, options) {
    const section = getSection(quote, 'truss');
    const adapter = ROOT.TrussVisualAdapter || ROOT.VisualTrussAdapter;
    if (adapter && adapter.adaptTrussSection) return adapter.adaptTrussSection(section, options || {});
    return makePlaceholderAdapter('truss', section);
  }

  function buildLedVisual(quote, options) {
    const section = getSection(quote, 'led');
    const adapter = ROOT.LedVisualAdapter || ROOT.VisualLedAdapter;
    if (adapter && adapter.adaptLedSection) return adapter.adaptLedSection(section, options || {});
    return makePlaceholderAdapter('led', section);
  }

  function buildAudioVisual(quote, options) {
    const section = getSection(quote, 'equipment');
    const adapter = ROOT.AudioVisualAdapter || ROOT.VisualAudioAdapter;
    if (adapter && adapter.adaptAudioSection) return adapter.adaptAudioSection(section, Object.assign({ quoteScope: quote && quote.scope || {}, scope: quote && quote.scope || {} }, options || {}));
    return makePlaceholderAdapter('audio', section);
  }

  function buildLightVisual(quote, options) {
    const section = getSection(quote, 'equipment');
    const adapter = ROOT.LightVisualAdapter || ROOT.VisualLightAdapter;
    if (adapter && adapter.adaptLightSection) return adapter.adaptLightSection(section, Object.assign({ quoteScope: quote && quote.scope || {}, scope: quote && quote.scope || {} }, options || {}));
    return makePlaceholderAdapter('light', section);
  }

  function buildVisualModel(quote, options) {
    const opts = options || {};
    const q = quote || {};
    const generatedAt = nowIso();
    const sourceSections = makeSectionSourceMap(q);
    return {
      type: 'feg-stage-pro-visual-model',
      version: VISUAL_MODEL_VERSION,
      builderVersion: VISUAL_MODEL_BUILDER_VERSION,
      sourceQuoteId: toText(q.id || q.localId || q.quoteId),
      sourceQuoteStatus: toText(q.status, 'draft'),
      generatedAt,
      mode: toText(opts.mode, 'foundation'),
      renderStatus: 'data_only_no_renderer',
      rendererEnabled: false,
      sourceSections,
      stage: buildStageVisual(q, opts.stage || opts),
      truss: buildTrussVisual(q, opts.truss || opts),
      led: buildLedVisual(q, opts.led || opts),
      audio: buildAudioVisual(q, opts.audio || opts),
      light: buildLightVisual(q, opts.light || opts),
      services: { enabled: false, status: 'reserved', sourceSection: 'quote.sections.equipment', adapterStatus: 'future_placeholder' },
      totals: {
        weightKg: ['stage', 'truss', 'led', 'equipment'].reduce((sum, key) => sum + nonNegative(sourceSections[key] && sourceSections[key].weightKg, 0), 0),
        powerW: ['stage', 'truss', 'led', 'equipment'].reduce((sum, key) => sum + nonNegative(sourceSections[key] && sourceSections[key].powerW, 0), 0)
      },
      performancePolicy: {
        manualBuildOnly: true,
        noHeavyRenderOnInput: true,
        lazyRender: true,
        cacheable: true,
        noBomMutation: true,
        noWarehouseMutation: true,
        noLegacyMutation: true
      },
      protectedFlows: ['legacy/v3', 'old v3 fallback', 'shared BOM formulas', 'warehouse movements', 'reservations', 'controlled backend writes']
    };
  }

  function attachVisualModelToQuote(quote, options) {
    const q = clone(quote || {}) || {};
    q.visualModel = buildVisualModel(q, options || {});
    return q;
  }

  const api = {
    VISUAL_MODEL_VERSION,
    VISUAL_MODEL_BUILDER_VERSION,
    buildVisualModel,
    attachVisualModelToQuote
  };

  ROOT.VisualModelBuilder = api;
})();
