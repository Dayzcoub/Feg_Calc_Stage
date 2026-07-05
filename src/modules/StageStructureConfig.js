// FEG Stage PRO — StageStructureConfig
// Extracted from V4StructureConfigurator: the stage domain — Imlight-copy and PKC
// (ШИП-ПАЗ / ПАЗ-ПАЗ) module geometry, perimeter/connection math, the
// StageCalculator glue and buildStageSection / buildStageSharedBomSnapshot.
// Loads after StructureCatalog, before the V4StructureConfigurator facade.
(function () {
  'use strict';
  const GLOBAL = typeof window !== 'undefined' ? window : globalThis;
  const ROOT = (GLOBAL.FEGModules = GLOBAL.FEGModules || {});

  const PKC_STAGE_GRID_CELL_M = 0.5;

  const Catalog = ROOT._StructureCatalog || {};
  const {
    clone,
    nowIso,
    toNumber,
    toText,
    STRUCTURE_CONFIG_VERSION,
    makeBomRow,
    summarizeStageRows,
    addCatalogMeta,
    getCatalogContext,
    getSystemPartMap
  } = Catalog;

  const STAGE_SYSTEM_VARIANTS = Object.freeze([
    Object.freeze({ key:'imlight_copy', label:'Imlight Copy', description:'Текущий расчёт сцены на настиле 1.2×1.2 м: опоры по вершинам, перекладины по рёбрам.' }),
    Object.freeze({ key:'pkc_ship_paz', label:'PKC / ШИП-ПАЗ', description:'Модули PKC SS-PS: встроенное соединение шип-паз, опоры по общей сетке углов.' }),
    Object.freeze({ key:'pkc_paz_paz', label:'PKC / ПАЗ-ПАЗ', description:'Модули PKC SS-PP: 4 ноги на модуль, T/X-соединители и струбцины по стыкам.' })
  ]);
  const STAGE_DECK_VARIANTS = Object.freeze([
    Object.freeze({ key:'stage_deck_1200', stageSystemKey:'imlight_copy', label:'Imlight Copy · настил 1.2×1.2 м', widthM:1.2, depthM:1.2, partKey:'stage_deck_1200' }),
    Object.freeze({ key:'pkc_ps_2000_1000', stageSystemKey:'pkc_ship_paz', label:'PKC ШИП-ПАЗ · SS-PS-2000/1000-F-C', widthM:2.0, depthM:1.0, partKey:'pkc_ps_deck_2000_1000' }),
    Object.freeze({ key:'pkc_ps_1500_1000', stageSystemKey:'pkc_ship_paz', label:'PKC ШИП-ПАЗ · SS-PS-1500/1000-F-C', widthM:1.5, depthM:1.0, partKey:'pkc_ps_deck_1500_1000' }),
    Object.freeze({ key:'pkc_ps_1000_1000', stageSystemKey:'pkc_ship_paz', label:'PKC ШИП-ПАЗ · SS-PS-1000/1000-F-C', widthM:1.0, depthM:1.0, partKey:'pkc_ps_deck_1000_1000' }),
    Object.freeze({ key:'pkc_pp_2000_1000', stageSystemKey:'pkc_paz_paz', label:'PKC ПАЗ-ПАЗ · SS-PP-2000/1000-F-C', widthM:2.0, depthM:1.0, partKey:'pkc_pp_deck_2000_1000' }),
    Object.freeze({ key:'pkc_pp_1500_1000', stageSystemKey:'pkc_paz_paz', label:'PKC ПАЗ-ПАЗ · SS-PP-1500/1000-F-C', widthM:1.5, depthM:1.0, partKey:'pkc_pp_deck_1500_1000' }),
    Object.freeze({ key:'pkc_pp_1000_1000', stageSystemKey:'pkc_paz_paz', label:'PKC ПАЗ-ПАЗ · SS-PP-1000/1000-F-C', widthM:1.0, depthM:1.0, partKey:'pkc_pp_deck_1000_1000' })
  ]);
  const STAGE_SUPPORT_VARIANTS = Object.freeze([
    Object.freeze({ key:'stage_support_low', stageSystemKey:'imlight_copy', label:'Imlight Copy · столб низкий', partKey:'stage_support_low', defaultHeightM:0.4 }),
    Object.freeze({ key:'stage_support_middle', stageSystemKey:'imlight_copy', label:'Imlight Copy · столб средний', partKey:'stage_support_middle', defaultHeightM:0.8 }),
    Object.freeze({ key:'stage_support_high', stageSystemKey:'imlight_copy', label:'Imlight Copy · столб высокий', partKey:'stage_support_high', defaultHeightM:1.1 }),
    Object.freeze({ key:'pkc_leg_vm', stageSystemKey:'pkc_ship_paz', label:'PKC · нога на винтовой опоре SO-1-VM', partKey:'pkc_leg_vm', defaultHeightM:1.0 }),
    Object.freeze({ key:'pkc_leg_tv', stageSystemKey:'pkc_ship_paz', label:'PKC · телескопическая нога SO-1-TV', partKey:'pkc_leg_tv', defaultHeightM:1.0 }),
    Object.freeze({ key:'pkc_pp_leg_vm', stageSystemKey:'pkc_paz_paz', label:'PKC · нога на винтовой опоре SO-2-VM', partKey:'pkc_pp_leg_vm', defaultHeightM:1.0 }),
    Object.freeze({ key:'pkc_pp_leg_tv', stageSystemKey:'pkc_paz_paz', label:'PKC · телескопическая нога SO-2-TV', partKey:'pkc_pp_leg_tv', defaultHeightM:1.0 })
  ]);
  const STAGE_FRAME_VARIANTS = Object.freeze([
    Object.freeze({ key:'stage_frame_low', stageSystemKey:'imlight_copy', label:'Imlight Copy · перекладина низкая', partKey:'stage_frame_low' }),
    Object.freeze({ key:'stage_frame_high', stageSystemKey:'imlight_copy', label:'Imlight Copy · перекладина средняя', partKey:'stage_frame_high' }),
    Object.freeze({ key:'stage_frame_none', stageSystemKey:'pkc', label:'Не используется', partKey:'' })
  ]);
  const STAGE_EDGE_CLOSURE_VARIANTS = Object.freeze([
    Object.freeze({ key:'fabric_skirt', label:'Тканевая юбка', partKey:'stage_edge_skirt' }),
    Object.freeze({ key:'raus_banner', label:'Раус с баннером', partKey:'stage_edge_raus_banner' })
  ]);

  function findDefByKey(list, key, fallbackKey) {
    const arr = Array.isArray(list) ? list : [];
    return arr.find(item => item && item.key === key) || arr.find(item => item && item.key === fallbackKey) || arr[0] || null;
  }
  function normalizeStageSystemKey(value, fallback) {
    const raw = toText(value).toLowerCase();
    if (raw === 'pkc' || raw === 'pkc_ps' || raw === 'ship_paz' || raw === 'шип-паз' || raw === 'шип паз') return 'pkc_ship_paz';
    if (raw === 'pkc_pp' || raw === 'paz_paz' || raw === 'паз-паз' || raw === 'паз паз') return 'pkc_paz_paz';
    if (raw === 'imlight' || raw === 'imlight_copy' || raw === 'copy') return 'imlight_copy';
    return STAGE_SYSTEM_VARIANTS.some(item => item.key === value) ? value : (fallback || 'imlight_copy');
  }
  function stageSystemByKey(key) { return findDefByKey(STAGE_SYSTEM_VARIANTS, normalizeStageSystemKey(key), 'imlight_copy'); }
  function stageItemsForSystem(list, stageSystemKey) {
    const systemKey = normalizeStageSystemKey(stageSystemKey);
    return (Array.isArray(list) ? list : []).filter(item => {
      const itemSystem = item && item.stageSystemKey;
      if (!itemSystem) return true;
      if (itemSystem === systemKey) return true;
      return itemSystem === 'pkc' && String(systemKey).indexOf('pkc_') === 0;
    });
  }
  function inferStageSystemKey(src) {
    const source = src || {};
    const explicit = source.stageSystemKey || source.stageSystem || source.systemKey || source.system;
    if (explicit) return normalizeStageSystemKey(explicit);
    const deckKey = source.deckKey || source.deckType || source.stageDeckKey;
    const deck = STAGE_DECK_VARIANTS.find(item => item && item.key === deckKey);
    if (deck && deck.stageSystemKey) return deck.stageSystemKey;
    const supportKey = source.supportKey || source.stageSupportKey || source.columnType && `stage_support_${source.columnType}`;
    const support = STAGE_SUPPORT_VARIANTS.find(item => item && item.key === supportKey);
    if (support && support.stageSystemKey) return support.stageSystemKey;
    return 'imlight_copy';
  }
  function defaultStageDeckForSystem(stageSystemKey) { return stageItemsForSystem(STAGE_DECK_VARIANTS, stageSystemKey)[0] || STAGE_DECK_VARIANTS[0] || null; }
  function defaultStageSupportForSystem(stageSystemKey) {
    const systemKey = normalizeStageSystemKey(stageSystemKey);
    const preferred = systemKey === 'imlight_copy' ? 'stage_support_middle' : (systemKey === 'pkc_paz_paz' ? 'pkc_pp_leg_vm' : 'pkc_leg_vm');
    const list = stageItemsForSystem(STAGE_SUPPORT_VARIANTS, systemKey);
    return list.find(item => item && item.key === preferred) || list[0] || STAGE_SUPPORT_VARIANTS[0] || null;
  }
  function getStageConstructiveCatalog() {
    return {
      version: STRUCTURE_CONFIG_VERSION,
      pkcGridCellM: PKC_STAGE_GRID_CELL_M,
      systemVariants: STAGE_SYSTEM_VARIANTS.map(clone),
      deckVariants: STAGE_DECK_VARIANTS.map(clone),
      supportVariants: STAGE_SUPPORT_VARIANTS.map(clone),
      frameVariants: STAGE_FRAME_VARIANTS.map(clone),
      frameDependencyRules: [
        { stageSystemKey:'imlight_copy', supportKey:'stage_support_low', frameKey:'stage_frame_low', defaultHeightM:0.4, label:'Imlight Copy: низкий столб → низкая перекладина · высота по умолчанию 0,40 м' },
        { stageSystemKey:'imlight_copy', supportKey:'stage_support_middle', frameKey:'stage_frame_high', defaultHeightM:0.8, label:'Imlight Copy: средний столб → средняя перекладина · высота по умолчанию 0,80 м' },
        { stageSystemKey:'imlight_copy', supportKey:'stage_support_high', frameKey:'stage_frame_high', defaultHeightM:1.1, label:'Imlight Copy: высокий столб → средняя перекладина · высота по умолчанию 1,10 м' },
        { stageSystemKey:'pkc_ship_paz', supportKey:'pkc_leg_vm', frameKey:'stage_frame_none', defaultHeightM:1.0, label:'PKC ШИП-ПАЗ: перекладины Imlight не используются, модуль имеет собственную раму.' },
        { stageSystemKey:'pkc_paz_paz', supportKey:'pkc_pp_leg_vm', frameKey:'stage_frame_none', defaultHeightM:1.0, label:'PKC ПАЗ-ПАЗ: вместо перекладин считаются T/X-соединители и струбцины.' }
      ],
      stageHeightDefaults: {
        stage_support_low:0.4,
        stage_support_middle:0.8,
        stage_support_high:1.1,
        pkc_leg_vm:1.0,
        pkc_leg_tv:1.0,
        pkc_pp_leg_vm:1.0,
        pkc_pp_leg_tv:1.0
      },
      edgeClosureVariants: STAGE_EDGE_CLOSURE_VARIANTS.map(clone),
      accessories: [
        { key:'stage_stair', label:'Лестница сценическая', qtyRule:'ручное размещение блоком на плане' }
      ],
      hardware: [
        { key:'stage_stud', label:'Imlight Copy · шпилька регулировочная', qtyRule:'1 шт на опору Imlight Copy' },
        { key:'stage_foot', label:'Imlight Copy · пятка опорная', qtyRule:'1 шт на опору Imlight Copy' },
        { key:'pkc_lm_t', label:'PKC · T-соединитель', qtyRule:'ПАЗ-ПАЗ: 2 шт на внутренний стык' },
        { key:'pkc_lm_x', label:'PKC · X-соединитель', qtyRule:'ПАЗ-ПАЗ: 1 шт в точке четырёх модулей' },
        { key:'pkc_lm_ss', label:'PKC · струбцина', qtyRule:'ПАЗ-ПАЗ: 1/2 шт на стык по длине грани' }
      ],
      catalogNotes:{
        pkcLoadReference:'Для модуля 2000×1000 в каталоге PKC указано 750 кг/м² и точечные нагрузки A/B/C 300/600/800 кг.'
      }
    };
  }
  function getStageDefaultHeightForSupport(supportKey) {
    const support = findDefByKey(STAGE_SUPPORT_VARIANTS, supportKey, 'stage_support_middle');
    return Math.max(0, Math.round(toNumber(support && support.defaultHeightM, 0.8) * 100) / 100);
  }

  function hasStageHeightValue(input) {
    const src = input || {};
    const value = src.stageHeightM != null ? src.stageHeightM : (src.heightM != null ? src.heightM : (src.stageHeight != null ? src.stageHeight : src.height));
    return value != null && String(value).trim() !== '';
  }

  function normalizeStageHeight(input) {
    const src = input || {};
    const value = src.stageHeightM != null ? src.stageHeightM : (src.heightM != null ? src.heightM : (src.stageHeight != null ? src.stageHeight : src.height));
    const fallback = getStageDefaultHeightForSupport(src.supportKey || src.stageSupportKey || src.columnType && `stage_support_${src.columnType}` || 'stage_support_middle');
    const n = hasStageHeightValue(src) ? toNumber(value, fallback) : fallback;
    return Math.max(0, Math.round(n * 100) / 100);
  }
  function formatStageHeight(value) { return `${normalizeStageHeight({ stageHeightM:value }).toLocaleString('ru-RU', { maximumFractionDigits: 2 })} м`; }

  function getStageFrameKeyForSupport(supportKey) {
    const support = STAGE_SUPPORT_VARIANTS.find(item => item && item.key === supportKey);
    const systemKey = support && support.stageSystemKey || 'imlight_copy';
    if (String(systemKey).indexOf('pkc_') === 0) return 'stage_frame_none';
    return String(supportKey || '') === 'stage_support_low' ? 'stage_frame_low' : 'stage_frame_high';
  }

  function normalizeStageFrameKey(value) {
    const raw = String(value || '');
    if (raw === 'stage_frame_middle' || raw === 'stage_frame_medium') return 'stage_frame_high';
    if (raw === 'middle' || raw === 'medium') return 'stage_frame_high';
    return raw;
  }

  function normalizeStageConfig(input) {
    const src = input || {};
    const stageSystemKey = inferStageSystemKey(src);
    const stageSystem = stageSystemByKey(stageSystemKey);
    const systemDecks = stageItemsForSystem(STAGE_DECK_VARIANTS, stageSystemKey);
    const systemSupports = stageItemsForSystem(STAGE_SUPPORT_VARIANTS, stageSystemKey);
    const requestedDeckKey = src.deckKey || src.deckType || src.stageDeckKey;
    const requestedSupportKey = src.supportKey || src.columnType && `stage_support_${src.columnType}` || src.stageSupportKey;
    const deck = systemDecks.find(item => item && item.key === requestedDeckKey) || defaultStageDeckForSystem(stageSystemKey);
    const support = systemSupports.find(item => item && item.key === requestedSupportKey) || defaultStageSupportForSystem(stageSystemKey);
    const requestedFrameKey = normalizeStageFrameKey(src.frameKey || src.frameType && `stage_frame_${src.frameType}` || src.stageFrameKey || '');
    const requiredFrameKey = getStageFrameKeyForSupport(support && support.key);
    const frame = findDefByKey(STAGE_FRAME_VARIANTS, requiredFrameKey, requiredFrameKey);
    const requestedFrame = findDefByKey(STAGE_FRAME_VARIANTS, requestedFrameKey, requiredFrameKey);
    const frameAutoAdjusted = !!requestedFrameKey && requestedFrameKey !== requiredFrameKey;
    const isPkc = String(stageSystemKey).indexOf('pkc_') === 0;
    const dependencyRule = isPkc
      ? (stageSystemKey === 'pkc_paz_paz' ? 'PKC ПАЗ-ПАЗ: перекладины Imlight Copy не используются, вместо них считаются соединители и струбцины.' : 'PKC ШИП-ПАЗ: модуль имеет собственную раму и встроенный профиль соединения.')
      : (support && support.key === 'stage_support_low' ? 'Низкий столб совместим только с низкой перекладиной.' : 'Средний и высокий столб используют среднюю перекладину.');
    const edge = findDefByKey(STAGE_EDGE_CLOSURE_VARIANTS, src.edgeClosureType || src.edgeClosureKey || src.edgeType, 'fabric_skirt');
    return {
      stageSystemKey: stageSystem && stageSystem.key || stageSystemKey,
      stageSystemLabel: stageSystem && stageSystem.label || 'Imlight Copy',
      stageSystemDescription: stageSystem && stageSystem.description || '',
      isPkcSystem:isPkc,
      deckKey: deck && deck.key || 'stage_deck_1200',
      deckPartKey: deck && deck.partKey || 'stage_deck_1200',
      deckLabel: deck && deck.label || 'Imlight Copy · настил 1.2×1.2 м',
      moduleWidthM: toNumber(deck && deck.widthM, 1.2),
      moduleDepthM: toNumber(deck && deck.depthM, 1.2),
      supportKey: support && support.key || 'stage_support_middle',
      supportPartKey: support && support.partKey || 'stage_support_middle',
      supportLabel: support && support.label || 'Imlight Copy · столб средний',
      frameKey: frame && frame.key || requiredFrameKey,
      framePartKey: frame && frame.partKey || '',
      frameLabel: frame && frame.label || (isPkc ? 'Не используется' : 'Imlight Copy · перекладина средняя'),
      frameDependency:{
        enabled:true,
        supportKey: support && support.key || 'stage_support_middle',
        requestedFrameKey: requestedFrame && requestedFrame.key || requestedFrameKey || '',
        requiredFrameKey,
        autoAdjusted:frameAutoAdjusted,
        rule:dependencyRule
      },
      studsEnabled: isPkc ? false : src.studsEnabled !== false,
      feetEnabled: isPkc ? false : src.feetEnabled !== false,
      edgeClosureEnabled: src.edgeClosureEnabled === true || src.closeEdges === true || src.edgeClosure === true,
      edgeClosureType: edge && edge.key || 'fabric_skirt',
      edgeClosurePartKey: edge && edge.partKey || 'stage_edge_skirt',
      edgeClosureLabel: edge && edge.label || 'Тканевая юбка'
    };
  }

  function isPkcStageSystemKey(key) {
    return String(key || '').indexOf('pkc_') === 0;
  }

  function stageDeckVariantByKey(key) {
    return STAGE_DECK_VARIANTS.find(item => item && item.key === key) || null;
  }

  function pkcDeckFootprint(deckKey, orientation) {
    const deck = stageDeckVariantByKey(deckKey) || defaultStageDeckForSystem('pkc_ship_paz') || STAGE_DECK_VARIANTS[1];
    const rawWidthCells = Math.max(1, Math.round(toNumber(deck && deck.widthM, 1) / PKC_STAGE_GRID_CELL_M));
    const rawDepthCells = Math.max(1, Math.round(toNumber(deck && deck.depthM, 1) / PKC_STAGE_GRID_CELL_M));
    const rotated = String(orientation || '').toLowerCase() === 'portrait' || String(orientation || '').toLowerCase() === 'depth' || String(orientation || '').toLowerCase() === 'rotated';
    return {
      deckKey:deck && deck.key || deckKey,
      deckPartKey:deck && deck.partKey || '',
      deckLabel:deck && deck.label || deckKey,
      widthCells:rotated ? rawDepthCells : rawWidthCells,
      depthCells:rotated ? rawWidthCells : rawDepthCells,
      moduleWidthM:(rotated ? rawDepthCells : rawWidthCells) * PKC_STAGE_GRID_CELL_M,
      moduleDepthM:(rotated ? rawWidthCells : rawDepthCells) * PKC_STAGE_GRID_CELL_M,
      orientation:rotated ? 'portrait' : 'landscape'
    };
  }

  function moduleRect(raw, cfg) {
    const module = raw || {};
    const isPkc = isPkcStageSystemKey(cfg && cfg.stageSystemKey);
    const deckKey = module.deckKey || module.stageDeckKey || cfg && cfg.deckKey;
    const fp = isPkc ? pkcDeckFootprint(deckKey, module.orientation || cfg && cfg.pkcDeckOrientation) : null;
    const w = isPkc ? Math.max(1, Math.round(toNumber(module.widthCells != null ? module.widthCells : module.w, fp && fp.widthCells || 1))) : 1;
    const d = isPkc ? Math.max(1, Math.round(toNumber(module.depthCells != null ? module.depthCells : module.d, fp && fp.depthCells || 1))) : 1;
    return {
      x:Math.round(toNumber(module.x, 0)),
      y:Math.round(toNumber(module.y, 0)),
      widthCells:w,
      depthCells:d,
      right:Math.round(toNumber(module.x, 0)) + w,
      bottom:Math.round(toNumber(module.y, 0)) + d,
      deckKey:deckKey,
      deckPartKey:module.deckPartKey || fp && fp.deckPartKey || cfg && cfg.deckPartKey || '',
      deckLabel:module.deckLabel || fp && fp.deckLabel || cfg && cfg.deckLabel || '',
      moduleWidthM:toNumber(module.moduleWidthM, fp && fp.moduleWidthM || cfg && cfg.moduleWidthM || 1.2),
      moduleDepthM:toNumber(module.moduleDepthM, fp && fp.moduleDepthM || cfg && cfg.moduleDepthM || 1.2),
      orientation:module.orientation || fp && fp.orientation || 'landscape'
    };
  }

  function normalizeStageDeckModule(raw, cfg) {
    const src = raw || {};
    const isPkc = isPkcStageSystemKey(cfg && cfg.stageSystemKey);
    if (!isPkc) return { x:Math.round(toNumber(src.x, 0)), y:Math.round(toNumber(src.y, 0)) };
    const deckKey = src.deckKey || src.stageDeckKey || cfg.deckKey;
    const fp = pkcDeckFootprint(deckKey, src.orientation || src.pkcOrientation || cfg.pkcDeckOrientation);
    const widthCells = Math.max(1, Math.round(toNumber(src.widthCells != null ? src.widthCells : src.w, fp.widthCells)));
    const depthCells = Math.max(1, Math.round(toNumber(src.depthCells != null ? src.depthCells : src.d, fp.depthCells)));
    return {
      id:src.id || `pkc_${deckKey}_${Math.round(toNumber(src.x, 0))}_${Math.round(toNumber(src.y, 0))}_${widthCells}x${depthCells}`,
      x:Math.round(toNumber(src.x, 0)),
      y:Math.round(toNumber(src.y, 0)),
      deckKey,
      deckPartKey:src.deckPartKey || fp.deckPartKey,
      deckLabel:src.deckLabel || fp.deckLabel,
      widthCells,
      depthCells,
      w:widthCells,
      d:depthCells,
      moduleWidthM:toNumber(src.moduleWidthM, widthCells * PKC_STAGE_GRID_CELL_M),
      moduleDepthM:toNumber(src.moduleDepthM, depthCells * PKC_STAGE_GRID_CELL_M),
      orientation:src.orientation || fp.orientation,
      stageGridCellM:PKC_STAGE_GRID_CELL_M
    };
  }

  function normalizeStageDeckModules(modules, cfg) {
    let list = Array.isArray(modules) ? modules : [];
    if (isPkcStageSystemKey(cfg && cfg.stageSystemKey) && list.length && !list.some(item => item && (item.widthCells != null || item.depthCells != null || item.stageGridCellM != null))) {
      const fp = pkcDeckFootprint(cfg && cfg.deckKey, cfg && cfg.pkcDeckOrientation);
      list = list.map(item => Object.assign({}, item || {}, {
        x:Math.round(toNumber(item && item.x, 0)) * Math.max(1, Math.round(toNumber(fp.widthCells, 1))),
        y:Math.round(toNumber(item && item.y, 0)) * Math.max(1, Math.round(toNumber(fp.depthCells, 1)))
      }));
    }
    return list
      .filter(item => item && Number.isFinite(Number(item.x)) && Number.isFinite(Number(item.y)))
      .map(item => normalizeStageDeckModule(item, cfg));
  }

  function occupiedStageCells(modules, cfg) {
    const cells = new Map();
    normalizeStageDeckModules(modules, cfg).forEach((module, index) => {
      const rect = moduleRect(module, cfg);
      for (let y = rect.y; y < rect.bottom; y += 1) {
        for (let x = rect.x; x < rect.right; x += 1) cells.set(`${x},${y}`, { module, index });
      }
    });
    return cells;
  }

  function groupStageDeckRows(modules, cfg) {
    const groups = new Map();
    normalizeStageDeckModules(modules, cfg).forEach(module => {
      const partKey = module.deckPartKey || cfg.deckPartKey;
      const key = `${partKey || 'deck'}::${module.deckKey || cfg.deckKey}`;
      const prev = groups.get(key) || { partKey, deckKey:module.deckKey || cfg.deckKey, label:module.deckLabel || cfg.deckLabel, qty:0, areaMeters:0 };
      prev.qty += 1;
      prev.areaMeters += toNumber(module.moduleWidthM, cfg.moduleWidthM) * toNumber(module.moduleDepthM, cfg.moduleDepthM);
      groups.set(key, prev);
    });
    return Array.from(groups.values());
  }

  function calculatePkcPerimeter(modules, cfg) {
    const list = normalizeStageDeckModules(modules, cfg);
    if (!list.length) return { horizontalEdges:0, verticalEdges:0, meters:0 };
    const cells = occupiedStageCells(list, cfg);
    let segments = 0;
    cells.forEach((_entry, key) => {
      const parts = String(key).split(',').map(Number);
      const x = parts[0];
      const y = parts[1];
      if (!cells.has(`${x},${y - 1}`)) segments += 1;
      if (!cells.has(`${x},${y + 1}`)) segments += 1;
      if (!cells.has(`${x - 1},${y}`)) segments += 1;
      if (!cells.has(`${x + 1},${y}`)) segments += 1;
    });
    return { horizontalEdges:0, verticalEdges:0, meters:Math.round(segments * PKC_STAGE_GRID_CELL_M * 100) / 100 };
  }

  function calculatePkcMixedWarnings(modules, cfg, connections) {
    const warnings = [];
    const list = normalizeStageDeckModules(modules, cfg);
    if (!list.length) return warnings;
    const deckTypes = new Set(list.map(item => item.deckKey || cfg.deckKey));
    if (deckTypes.size > 1) warnings.push('Смешанная раскладка PKC: в одном поле используются модули разных форм-факторов.');
    if (connections && connections.offsetJoints > 0) warnings.push(`Есть смещённые стыки (${connections.offsetJoints}): по каталогу PKC для таких узлов нужны модули с просечкой / нестандартная стыковка.`);
    return warnings;
  }

  function normalizeStageStairs(input) {
    const src = input || {};
    const raw = Array.isArray(src.stairs) ? src.stairs : (src.accessories && Array.isArray(src.accessories.stairs) ? src.accessories.stairs : (Array.isArray(src.stairBlocks) ? src.stairBlocks : []));
    const byKey = new Map();
    raw.forEach((item, index) => {
      const x = Math.round(toNumber(item && item.x, NaN));
      const y = Math.round(toNumber(item && item.y, NaN));
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      const key = `${x},${y}`;
      byKey.set(key, { id: item && item.id || `stage_stair_${index + 1}`, x, y, key, orientation: item && item.orientation || 'front' });
    });
    return Array.from(byKey.values()).sort((a, b) => a.y - b.y || a.x - b.x);
  }

  function calculateStagePerimeter(modules, cfg) {
    if (isPkcStageSystemKey(cfg && cfg.stageSystemKey)) return calculatePkcPerimeter(modules, cfg);
    const list = Array.isArray(modules) ? modules : [];
    const keys = new Set(list.map(p => `${Math.round(toNumber(p.x, 0))},${Math.round(toNumber(p.y, 0))}`));
    const widthM = toNumber(cfg && cfg.moduleWidthM, 1.2);
    const depthM = toNumber(cfg && cfg.moduleDepthM, 1.2);
    let horizontalEdges = 0;
    let verticalEdges = 0;
    list.forEach(point => {
      const x = Math.round(toNumber(point.x, 0));
      const y = Math.round(toNumber(point.y, 0));
      if (!keys.has(`${x},${y - 1}`)) horizontalEdges += 1;
      if (!keys.has(`${x},${y + 1}`)) horizontalEdges += 1;
      if (!keys.has(`${x - 1},${y}`)) verticalEdges += 1;
      if (!keys.has(`${x + 1},${y}`)) verticalEdges += 1;
    });
    const meters = horizontalEdges * widthM + verticalEdges * depthM;
    return { horizontalEdges, verticalEdges, meters: Math.round(meters * 100) / 100 };
  }

  function calculatePkcStageConnections(modules, cfg) {
    const list = normalizeStageDeckModules(modules, cfg);
    let sharedVertical = 0;
    let sharedHorizontal = 0;
    let clamps = 0;
    let offsetJoints = 0;
    const clampQtyForLength = lengthM => toNumber(lengthM, 0) >= 1.49 ? 2 : 1;
    const rects = list.map(item => moduleRect(item, cfg));
    for (let i = 0; i < rects.length; i += 1) {
      for (let j = i + 1; j < rects.length; j += 1) {
        const a = rects[i];
        const b = rects[j];
        if (a.right === b.x || b.right === a.x) {
          const overlap = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y));
          if (overlap > 0) {
            sharedVertical += 1;
            const fullMatch = a.y === b.y && a.bottom === b.bottom;
            if (!fullMatch) offsetJoints += 1;
            clamps += clampQtyForLength(overlap * PKC_STAGE_GRID_CELL_M);
          }
        }
        if (a.bottom === b.y || b.bottom === a.y) {
          const overlap = Math.max(0, Math.min(a.right, b.right) - Math.max(a.x, b.x));
          if (overlap > 0) {
            sharedHorizontal += 1;
            const fullMatch = a.x === b.x && a.right === b.right;
            if (!fullMatch) offsetJoints += 1;
            clamps += clampQtyForLength(overlap * PKC_STAGE_GRID_CELL_M);
          }
        }
      }
    }
    const cornerCounts = new Map();
    rects.forEach(rect => {
      [`${rect.x},${rect.y}`, `${rect.right},${rect.y}`, `${rect.x},${rect.bottom}`, `${rect.right},${rect.bottom}`]
        .forEach(key => cornerCounts.set(key, (cornerCounts.get(key) || 0) + 1));
    });
    let xConnectors = 0;
    cornerCounts.forEach(count => { if (count >= 4) xConnectors += 1; });
    const sharedEdges = sharedVertical + sharedHorizontal;
    return {
      sharedEdges,
      sharedVertical,
      sharedHorizontal,
      tConnectors: sharedEdges * 2,
      xConnectors,
      clamps,
      offsetJoints
    };
  }

  function decoratePkcSnapshot(snapshot, cfg, pkcConnections) {
    const snap = snapshot || {};
    snap.pkcReference = {
      enabled:String(cfg && cfg.stageSystemKey || '').indexOf('pkc_') === 0,
      systemKey:cfg && cfg.stageSystemKey || '',
      systemLabel:cfg && cfg.stageSystemLabel || '',
      loadUniformKgM2:750,
      pointLoadsKg:{ A:300, B:600, C:800 },
      source:'OLD_Podimy_PKC_2019.pdf'
    };
    snap.pkcConnections = clone(pkcConnections || {});
    return snap;
  }

  function buildStageBomFromModules(modules, options) {
    const calc = ROOT.StageCalculator;
    const cfg = normalizeStageConfig(options || {});
    cfg.pkcDeckOrientation = options && (options.pkcDeckOrientation || options.deckOrientation) || 'landscape';
    const list = normalizeStageDeckModules(Array.isArray(modules) ? modules : [], cfg);
    const stageHeightM = normalizeStageHeight(Object.assign({}, options || {}, { supportKey:cfg.supportKey }));
    const stairs = normalizeStageStairs(options || {});
    const perimeter = calculateStagePerimeter(list, cfg);
    cfg.stageHeightM = stageHeightM;
    const snapshot = calc && calc.calculateStageQuoteSnapshot ? calc.calculateStageQuoteSnapshot({ modules:list, moduleWidthM:cfg.moduleWidthM, moduleDepthM:cfg.moduleDepthM, stageGridCellM:isPkcStageSystemKey(cfg.stageSystemKey) ? PKC_STAGE_GRID_CELL_M : 0, stageHeightM }) : { geometry:{ sheets:list.length, columns:0, frames:0 }, widthMeters:0, depthMeters:0, areaMeters:0, bounds:{ width:0, depth:0 } };
    snapshot.stageHeightM = stageHeightM;
    snapshot.stageHeightLabel = formatStageHeight(stageHeightM);
    snapshot.stageConfig = clone(cfg);
    snapshot.stageAccessories = { stairs: clone(stairs), stairsCount: stairs.length, edgeClosureEnabled: !!cfg.edgeClosureEnabled, edgeClosureType: cfg.edgeClosureType, edgeClosureLabel: cfg.edgeClosureLabel, edgeClosureMeters: cfg.edgeClosureEnabled ? perimeter.meters : 0, perimeterMeters: perimeter.meters };
    const geometry = snapshot.geometry || {};
    const pkcConnections = calculatePkcStageConnections(list, cfg);
    decoratePkcSnapshot(snapshot, cfg, pkcConnections);
    snapshot.stageWarnings = calculatePkcMixedWarnings(list, cfg, pkcConnections);
    geometry.stairs = stairs.length;
    geometry.edgeClosureMeters = cfg.edgeClosureEnabled ? perimeter.meters : 0;
    geometry.perimeterMeters = perimeter.meters;
    const catalogContext = getCatalogContext(options || {}, options || {}, 'stage');
    const parts = getSystemPartMap(catalogContext.equipmentItems);
    const heightNote = `высота сцены ${formatStageHeight(stageHeightM)}`;
    const rows = [];

    if (cfg.stageSystemKey === 'pkc_ship_paz') {
      geometry.frames = 0;
      geometry.studs = 0;
      geometry.feet = 0;
      geometry.supports = toNumber(geometry.columns, 0);
      geometry.pkcTConnectors = 0;
      geometry.pkcXConnectors = 0;
      geometry.pkcClamps = 0;
      groupStageDeckRows(list, cfg).forEach(group => rows.push(makeBomRow(parts[group.partKey] || parts.pkc_ps_deck_2000_1000, group.qty, `${group.areaMeters.toFixed(2)} м² настила · ${group.label || cfg.deckLabel} · ${heightNote}`, { stagePart:'deck', stageSystemKey:cfg.stageSystemKey, deckKey:group.deckKey, moduleWidthM:cfg.moduleWidthM, moduleDepthM:cfg.moduleDepthM, stageHeightM })));
      rows.push(makeBomRow(parts[cfg.supportPartKey] || parts.pkc_leg_vm, geometry.supports, `${cfg.supportLabel} · по общей сетке углов модулей ШИП-ПАЗ · ${heightNote}`, { stagePart:'support', stageSystemKey:cfg.stageSystemKey, supportKey:cfg.supportKey, stageHeightM }));
      if (stairs.length) rows.push(makeBomRow(parts.stage_stair, stairs.length, `размещены на плане: ${stairs.map(item => `${item.x + 1}:${item.y + 1}`).join(', ')} · ${heightNote}`, { stagePart:'stair', stageSystemKey:cfg.stageSystemKey, stageHeightM, stairs: clone(stairs) }));
      if (cfg.edgeClosureEnabled && perimeter.meters > 0) rows.push(makeBomRow(parts[cfg.edgeClosurePartKey] || parts.stage_edge_skirt, perimeter.meters, `${cfg.edgeClosureLabel} · открытый периметр ${perimeter.meters.toFixed(2)} м.п. · ${heightNote}`, { stagePart:'edge_closure', stageSystemKey:cfg.stageSystemKey, stageHeightM, edgeClosureType:cfg.edgeClosureType, edgeClosureLabel:cfg.edgeClosureLabel, edgeClosureMeters:perimeter.meters, meters:perimeter.meters }));
    } else if (cfg.stageSystemKey === 'pkc_paz_paz') {
      geometry.frames = 0;
      geometry.studs = 0;
      geometry.feet = 0;
      geometry.supports = toNumber(geometry.sheets, 0) * 4;
      geometry.columns = geometry.supports;
      geometry.sharedEdges = pkcConnections.sharedEdges;
      geometry.pkcTConnectors = pkcConnections.tConnectors;
      geometry.pkcXConnectors = pkcConnections.xConnectors;
      geometry.pkcClamps = pkcConnections.clamps;
      groupStageDeckRows(list, cfg).forEach(group => rows.push(makeBomRow(parts[group.partKey] || parts.pkc_pp_deck_2000_1000, group.qty, `${group.areaMeters.toFixed(2)} м² настила · ${group.label || cfg.deckLabel} · ${heightNote}`, { stagePart:'deck', stageSystemKey:cfg.stageSystemKey, deckKey:group.deckKey, moduleWidthM:cfg.moduleWidthM, moduleDepthM:cfg.moduleDepthM, stageHeightM })));
      rows.push(makeBomRow(parts[cfg.supportPartKey] || parts.pkc_pp_leg_vm, geometry.supports, `${cfg.supportLabel} · 4 ноги на каждый модуль ПАЗ-ПАЗ · ${heightNote}`, { stagePart:'support', stageSystemKey:cfg.stageSystemKey, supportKey:cfg.supportKey, stageHeightM, legsPerModule:4 }));
      if (geometry.pkcTConnectors) rows.push(makeBomRow(parts.pkc_lm_t, geometry.pkcTConnectors, `2 шт на каждый внутренний стык модулей · стыков ${pkcConnections.sharedEdges}`, { stagePart:'pkc_t_connector', stageSystemKey:cfg.stageSystemKey, sharedEdges:pkcConnections.sharedEdges }));
      if (geometry.pkcXConnectors) rows.push(makeBomRow(parts.pkc_lm_x, geometry.pkcXConnectors, `по точкам соединения четырёх модулей · узлов ${pkcConnections.xConnectors}`, { stagePart:'pkc_x_connector', stageSystemKey:cfg.stageSystemKey }));
      if (geometry.pkcClamps) rows.push(makeBomRow(parts.pkc_lm_ss, geometry.pkcClamps, `струбцины по внутренним стыкам: 1 шт на грань до 1000 мм, 2 шт на 1500/2000 мм`, { stagePart:'pkc_clamp', stageSystemKey:cfg.stageSystemKey, sharedVertical:pkcConnections.sharedVertical, sharedHorizontal:pkcConnections.sharedHorizontal }));
      if (stairs.length) rows.push(makeBomRow(parts.stage_stair, stairs.length, `размещены на плане: ${stairs.map(item => `${item.x + 1}:${item.y + 1}`).join(', ')} · ${heightNote}`, { stagePart:'stair', stageSystemKey:cfg.stageSystemKey, stageHeightM, stairs: clone(stairs) }));
      if (cfg.edgeClosureEnabled && perimeter.meters > 0) rows.push(makeBomRow(parts[cfg.edgeClosurePartKey] || parts.stage_edge_skirt, perimeter.meters, `${cfg.edgeClosureLabel} · открытый периметр ${perimeter.meters.toFixed(2)} м.п. · ${heightNote}`, { stagePart:'edge_closure', stageSystemKey:cfg.stageSystemKey, stageHeightM, edgeClosureType:cfg.edgeClosureType, edgeClosureLabel:cfg.edgeClosureLabel, edgeClosureMeters:perimeter.meters, meters:perimeter.meters }));
    } else {
      geometry.studs = cfg.studsEnabled ? toNumber(geometry.columns, 0) : 0;
      geometry.feet = cfg.feetEnabled ? toNumber(geometry.columns, 0) : 0;
      geometry.supports = toNumber(geometry.columns, 0);
      rows.push(makeBomRow(parts[cfg.deckPartKey] || parts.stage_deck_1200, geometry.sheets, `${toNumber(snapshot.areaMeters, 0).toFixed(2)} м² настила · ${cfg.deckLabel} · ${heightNote}`, { stagePart:'deck', stageSystemKey:cfg.stageSystemKey, deckKey:cfg.deckKey, moduleWidthM:cfg.moduleWidthM, moduleDepthM:cfg.moduleDepthM, stageHeightM }));
      rows.push(makeBomRow(parts[cfg.supportPartKey] || parts.stage_support_middle, geometry.columns, `${cfg.supportLabel} · по вершинам выбранных модулей · ${heightNote}`, { stagePart:'support', stageSystemKey:cfg.stageSystemKey, supportKey:cfg.supportKey, stageHeightM }));
      rows.push(makeBomRow(parts[cfg.framePartKey] || parts.stage_frame_low, geometry.frames, `${cfg.frameLabel} · по внешним и внутренним рёбрам · ${heightNote}`, { stagePart:'frame', stageSystemKey:cfg.stageSystemKey, frameKey:cfg.frameKey, supportKey:cfg.supportKey, frameDependency:clone(cfg.frameDependency || {}), stageHeightM }));
      if (cfg.studsEnabled) rows.push(makeBomRow(parts.stage_stud, geometry.studs, `по одной шпильке на каждую опору · ${heightNote}`, { stagePart:'stud', stageSystemKey:cfg.stageSystemKey, stageHeightM }));
      if (cfg.feetEnabled) rows.push(makeBomRow(parts.stage_foot, geometry.feet, `по одной пятке на каждую опору · ${heightNote}`, { stagePart:'foot', stageSystemKey:cfg.stageSystemKey, stageHeightM }));
      if (stairs.length) rows.push(makeBomRow(parts.stage_stair, stairs.length, `размещены на плане: ${stairs.map(item => `${item.x + 1}:${item.y + 1}`).join(', ')} · ${heightNote}`, { stagePart:'stair', stageSystemKey:cfg.stageSystemKey, stageHeightM, stairs: clone(stairs) }));
      if (cfg.edgeClosureEnabled && perimeter.meters > 0) rows.push(makeBomRow(parts[cfg.edgeClosurePartKey] || parts.stage_edge_skirt, perimeter.meters, `${cfg.edgeClosureLabel} · открытый периметр ${perimeter.meters.toFixed(2)} м.п. · ${heightNote}`, { stagePart:'edge_closure', stageSystemKey:cfg.stageSystemKey, stageHeightM, edgeClosureType:cfg.edgeClosureType, edgeClosureLabel:cfg.edgeClosureLabel, edgeClosureMeters:perimeter.meters, meters:perimeter.meters }));
    }

    const finalRows = rows.filter(row => row && row.qty > 0).map(row => addCatalogMeta(row, catalogContext));
    return { snapshot, config:cfg, rows:finalRows, weightKg: finalRows.reduce((sum, row) => sum + toNumber(row.weightKg, 0), 0), catalogMode: catalogContext.catalogMode };
  }

  function makeStageQuote(section, overrides) {
    const quoteId = (overrides && overrides.quoteId) || 'v4_stage_shared_bom_snapshot';
    return {
      id: quoteId,
      type: 'feg-stage-pro-v4-stage-quote-snapshot',
      project: { name: (overrides && overrides.projectName) || 'Сцена v4' },
      scope: { stage:true, truss:false, led:false, sound:false, light:false, backline:false, services:false, transport:false },
      sections: { stage: section || null }
    };
  }

  function buildStageSharedBomSnapshot(input, overrides) {
    const section = buildStageSection(input || {}, Object.assign({ source:'v4-stage-shared-bom-snapshot' }, overrides || {}));
    const quote = makeStageQuote(section, overrides || {});
    const bridgeSvc = ROOT.V4SharedBomBridge;
    const pickSvc = ROOT.WarehousePickListBuilder;
    const bridge = bridgeSvc && bridgeSvc.buildQuoteBomBridge
      ? bridgeSvc.buildQuoteBomBridge(quote, { sectionKey:'stage', enrichAvailability:false })
      : { rows: section.bomRows || [], totals: summarizeStageRows(section.bomRows || []) };
    const quoteItems = bridgeSvc && bridgeSvc.buildQuoteItemRows
      ? bridgeSvc.buildQuoteItemRows(quote, { sectionKey:'stage', enrichAvailability:false })
      : (section.bomRows || []);
    const pickLists = pickSvc && pickSvc.buildPickLists ? pickSvc.buildPickLists(quote) : { all:{ rows:section.bomRows || [], totalWeightKg:section.weightKg || 0 }, sections:[] };
    return {
      type:'feg-stage-pro-v4-stage-shared-bom-snapshot',
      version:STRUCTURE_CONFIG_VERSION,
      quote,
      section,
      bridge,
      quoteItems,
      pickLists,
      totals:bridge && bridge.totals || summarizeStageRows(section.bomRows || []),
      generatedAt:nowIso(),
      protectedFlows:['legacy/v3','old v3 fallback','stock movements','reservations','controlled backend writes']
    };
  }

  function buildStageSection(input, overrides) {
    const src = input || {};
    const calc = ROOT.StageCalculator;
    let modules = Array.isArray(src.modules) ? src.modules : [];
    const explicitEmpty = src.explicitEmpty === true || src.startEmpty === true || src.cleanStart === true || Array.isArray(src.modules);
    if (!modules.length && !explicitEmpty && calc && calc.rectangleModules) {
      const rect = calc.rectangleModules(Math.max(1, toNumber(src.widthModules, 4)), Math.max(1, toNumber(src.depthModules, 3)), 12, 10);
      modules = rect.ok ? rect.modules : [];
    }
    const catalogContext = getCatalogContext(src, overrides || {}, 'stage');
    const bom = buildStageBomFromModules(modules, Object.assign({}, src, { catalogMode:catalogContext.catalogMode, equipmentItems:catalogContext.equipmentItems, sourceMode:catalogContext.catalogMode }));
    const snap = bom.snapshot || {};
    const res = snap;
    const cfg = bom.config || normalizeStageConfig(src);
    const accessories = snap.stageAccessories || {};
    const stairs = Array.isArray(accessories.stairs) ? accessories.stairs : normalizeStageStairs(src);
    const geometry = snap.geometry || {};
    const systemSummaryTail = cfg.stageSystemKey === 'pkc_paz_paz'
      ? `${geometry.columns || 0} ног · T ${geometry.pkcTConnectors || 0} · X ${geometry.pkcXConnectors || 0} · струбцины ${geometry.pkcClamps || 0}`
      : (cfg.stageSystemKey === 'pkc_ship_paz'
        ? `${geometry.columns || 0} ног · профиль ШИП-ПАЗ без T/X/струбцин`
        : `${geometry.columns || 0} опор · ${geometry.frames || 0} перекладин · ${geometry.studs || 0} шпилек · ${geometry.feet || 0} пяток`);
    return Object.assign({
      type:'stage',
      sectionKey:'stage',
      section_key:'stage',
      binderVersion:'v4-structure-' + STRUCTURE_CONFIG_VERSION,
      status:'configured',
      source:'V4StructureConfigurator',
      catalogMode:catalogContext.catalogMode,
      sourceMode:catalogContext.catalogMode,
      title:'Сцена',
      sharedBomReady:true,
      quoteItemsReady:true,
      warehousePickListReady:true,
      summary:`${cfg.stageSystemLabel || 'Сцена'} · ${toNumber(snap.widthMeters, 0).toFixed(1)}×${toNumber(snap.depthMeters, 0).toFixed(1)} м · высота ${formatStageHeight(snap.stageHeightM)} · ${geometry.sheets || 0} модулей · ${systemSummaryTail} · лестницы ${geometry.stairs || 0} · торцы ${geometry.edgeClosureMeters || 0} м.п.`,
      stageHeightM:normalizeStageHeight({ stageHeightM:snap.stageHeightM }),
      heightM:normalizeStageHeight({ stageHeightM:snap.stageHeightM }),
      input:{ modules:clone(modules), explicitEmpty:modules.length === 0, widthModules:src.widthModules, depthModules:src.depthModules, stageSystemKey:cfg.stageSystemKey, stageSystemLabel:cfg.stageSystemLabel, deckKey:cfg.deckKey, supportKey:cfg.supportKey, frameKey:cfg.frameKey, frameDependency:clone(cfg.frameDependency || {}), moduleWidthM:cfg.moduleWidthM, moduleDepthM:cfg.moduleDepthM, stageHeightM:normalizeStageHeight({ stageHeightM:snap.stageHeightM }), studsEnabled:cfg.studsEnabled, feetEnabled:cfg.feetEnabled, stairs:clone(stairs), edgeClosureEnabled:cfg.edgeClosureEnabled, edgeClosureType:cfg.edgeClosureType },
      result:snap,
      stageConfig:cfg,
      bomRows:bom.rows,
      sharedBomTotals:summarizeStageRows(bom.rows),
      bomBridge:{ enabled:true, sectionKey:'stage', bridgeVersion:ROOT.V4SharedBomBridge && ROOT.V4SharedBomBridge.SHARED_BOM_BRIDGE_VERSION || '', note:'Stage section is ready for shared BOM, quote_items and warehouse pick lists.' },
      rental:toNumber(overrides && Object.prototype.hasOwnProperty.call(overrides, 'rental') ? overrides.rental : res.rental, res.rental),
      weightKg:bom.weightKg,
      powerW:0,
      updatedAt:nowIso()
    }, overrides || {});
  }

  ROOT._StageStructureConfig = {
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
  };
})();
