// FEG Stage PRO v3.1.88 — V4StructureConfigurator
// Single v4 source of truth for stage/truss parts, BOM and quote sections.
// v4-only shared structure engine for quick calculators and quote wizard.
// v3.17.43 keeps stool real-dimension logic shared for quick and quote modes.
(function () {
  'use strict';
  const GLOBAL = typeof window !== 'undefined' ? window : globalThis;
  const ROOT = (GLOBAL.FEGModules = GLOBAL.FEGModules || {});

  const Catalog = ROOT._StructureCatalog || {};
  const {
    STRUCTURE_CONFIG_VERSION,
    STRUCTURE_PARTS_MIGRATION_KEY,
    STAGE_PARTS,
    TRUSS_PARTS,
    partDefs,
    nowIso,
    getStoredEquipmentItems,
    findSystemPart,
    getSystemPartMap,
    ensureSystemParts,
    ensureStoredSystemParts,
    getCatalogMode,
    getCatalogContext,
    getQuickIdealItems,
    ensureTrussCompatibilityMetadata,
    inferTrussPartKey,
    trussCompatibleCandidates
  } = Catalog;
  const Truss = ROOT._TrussStructureConfig || {};
  const {
    buildTrussBomFromItems,
    buildTrussSection,
    TRUSS_STOOL_DIMENSION_POLICY_VERSION
  } = Truss;
  const Stage = ROOT._StageStructureConfig || {};
  const {
    PKC_STAGE_GRID_CELL_M,
    STAGE_SYSTEM_VARIANTS,
    STAGE_DECK_VARIANTS,
    STAGE_SUPPORT_VARIANTS,
    STAGE_FRAME_VARIANTS,
    getStageConstructiveCatalog,
    normalizeStageSystemKey,
    stageItemsForSystem,
    getStageDefaultHeightForSupport,
    getStageFrameKeyForSupport,
    normalizeStageConfig,
    pkcDeckFootprint,
    normalizeStageDeckModules,
    buildStageBomFromModules,
    buildStageSharedBomSnapshot,
    buildStageSection
  } = Stage;

  function buildSystemPartsReport(items) {
    const source = Array.isArray(items) ? items : getStoredEquipmentItems();
    const map = getSystemPartMap(source);
    const defs = partDefs();
    return {
      type:'feg-stage-pro-v4-structure-parts-report', version:STRUCTURE_CONFIG_VERSION, generatedAt:nowIso(),
      expected:defs.length,
      present:defs.filter(def => !!findSystemPart(def.key, source)).length,
      missing:defs.filter(def => !findSystemPart(def.key, source)).map(def => def.key),
      stageParts:STAGE_PARTS.map(def => map[def.key]),
      stageConstructiveCatalog:getStageConstructiveCatalog(),
      trussParts:TRUSS_PARTS.map(def => map[def.key])
    };
  }

  const api = {
    STRUCTURE_CONFIG_VERSION,
    STRUCTURE_PARTS_MIGRATION_KEY,
    TRUSS_STOOL_DIMENSION_POLICY_VERSION,
    STAGE_PARTS,
    TRUSS_PARTS,
    STAGE_SYSTEM_VARIANTS,
    STAGE_DECK_VARIANTS,
    STAGE_SUPPORT_VARIANTS,
    STAGE_FRAME_VARIANTS,
    PKC_STAGE_GRID_CELL_M,
    getStageConstructiveCatalog,
    normalizeStageSystemKey,
    stageItemsForSystem,
    getStageDefaultHeightForSupport,
    getStageFrameKeyForSupport,
    normalizeStageConfig,
    pkcDeckFootprint,
    normalizeStageDeckModules,
    getSystemPartDefinitions: partDefs,
    ensureSystemParts,
    ensureStoredSystemParts,
    getCatalogMode,
    getCatalogContext,
    getQuickIdealItems,
    getSystemPartMap,
    ensureTrussCompatibilityMetadata,
    inferTrussPartKey,
    trussCompatibleCandidates,
    buildSystemPartsReport,
    buildStageBomFromModules,
    buildStageSharedBomSnapshot,
    buildStageSection,
    buildTrussBomFromItems,
    buildTrussSection
  };
  ROOT.V4StructureConfigurator = api;
})();
