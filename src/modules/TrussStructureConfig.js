// FEG Stage PRO — TrussStructureConfig
// Extracted from V4StructureConfigurator: the truss domain — straight/alternative
// length allocation, node/base BOM rows, stool/portal geometry, load-check glue
// (ROOT.TrussBlockConstructor / ROOT.LoadChecker) and buildTrussSection.
// Loads after StructureCatalog, before the V4StructureConfigurator facade.
(function () {
  'use strict';
  const GLOBAL = typeof window !== 'undefined' ? window : globalThis;
  const ROOT = (GLOBAL.FEGModules = GLOBAL.FEGModules || {});

  const TRUSS_TOP_NODE_HEIGHT_M = 0.5;
  const TRUSS_3D_NODE_TYPES = Object.freeze(['cornerU012','cornerU020','cornerU022','cornerU024']);
  const TRUSS_T_NODE_TYPES = Object.freeze(['cornerU017']);
  const TRUSS_STOOL_DIMENSION_POLICY_VERSION = '3.17.43-shared-quick-quote-top-frame';

  const Catalog = ROOT._StructureCatalog || {};
  const {
    clone,
    nowIso,
    toNumber,
    toText,
    STRUCTURE_CONFIG_VERSION,
    TRUSS_STRAIGHT_TYPE_ORDER,
    TRUSS_STRAIGHT_LENGTHS,
    makeBomRow,
    summarizeStageRows,
    addCatalogMeta,
    getCatalogContext,
    getSystemPartMap,
    consumePool,
    poolCandidatesForPart,
    cloneStockPool,
    itemStockQty,
    itemReservedQty,
    itemAvailableQty
  } = Catalog;

  function createAllocatedBomRow(basePart, qty, note, extra) {
    const row = makeBomRow(basePart, qty, note, extra || {});
    const meta = basePart && basePart.meta || {};
    row.compatibilityGroup = meta.trussCompatibilityGroup || '';
    row.trussCompatibilityGroup = meta.trussCompatibilityGroup || '';
    row.trussFamily = meta.trussFamily || '';
    row.trussInterface = meta.trussInterface || '';
    row.stockQty = itemStockQty(basePart);
    row.stock_qty = row.stockQty;
    row.reservedQty = itemReservedQty(basePart);
    row.reserved_qty = row.reservedQty;
    row.availableQty = itemAvailableQty(basePart);
    row.available_qty = row.availableQty;
    return row;
  }
  function makeDeficitBomRow(part, qty, note, extra) {
    const row = makeBomRow(part, qty, note, Object.assign({}, extra || {}, { sourceType:'own', sourceTypeSuggestion:'subrent_needed' }));
    row.availableQty = 0;
    row.available_qty = 0;
    row.deficitQty = Math.max(0, Math.round(toNumber(qty, 0)));
    row.deficit_qty = row.deficitQty;
    row.subrentQty = row.deficitQty;
    row.subrent_qty = row.subrentQty;
    row.inventoryStatus = 'deficit';
    row.inventory_status = 'deficit';
    row.sourceTypeSuggestion = 'subrent_needed';
    row.source_type_suggestion = 'subrent_needed';
    row.note = [note, row.deficitQty ? `дефицит ${row.deficitQty} ${row.unit || 'шт'} — закрыть субарендой или ручной заменой` : ''].filter(Boolean).join(' · ');
    return row;
  }
  function allocationRowsFromDirect(partKey, requestedQty, part, note, extra, pool) {
    const qty = Math.max(0, Math.round(toNumber(requestedQty, 0)));
    const rows = [];
    let remaining = qty;
    const direct = consumePool(pool, partKey, qty);
    remaining = direct.remaining;
    direct.allocations.forEach(allocation => {
      const item = allocation.item || part;
      const compatibleReplacement = item && part && item.id !== part.id;
      rows.push(createAllocatedBomRow(item, allocation.qty, [note, compatibleReplacement ? `совместимая складская позиция вместо ${part.code || part.name || partKey}` : ''].filter(Boolean).join(' · '), Object.assign({}, extra || {}, { trussPart:partKey, compatibilitySourcePartId: part && part.id || '', compatibleReplacement })));
    });
    return { rows, remaining };
  }
  function findAlternativeLengthCombo(targetLength, pool) {
    const target = Math.round(toNumber(targetLength, 0) * 2);
    const availableCounts = TRUSS_STRAIGHT_TYPE_ORDER.reduce((map, key) => {
      const entries = poolCandidatesForPart(pool, key);
      map[key] = entries.reduce((sum, entry) => sum + Math.max(0, Math.floor(entry.available)), 0);
      return map;
    }, {});
    let best = null;
    function score(combo) {
      const pieces = combo.reduce((sum, key) => sum + (availableCounts[key] > 0 ? 1 : 10), 0);
      const longest = combo.reduce((max, key) => Math.max(max, TRUSS_STRAIGHT_LENGTHS[key] || 0), 0);
      const halfPenalty = combo.filter(key => key === 'truss05').length * 6;
      const rareLengthPenalty = combo.filter(key => key === 'truss25' || key === 'truss15').length * 1;
      return pieces * 100 + halfPenalty + rareLengthPenalty - longest;
    }
    function walk(startIndex, remain, combo, counts) {
      if (remain === 0) {
        const sorted = combo.slice().sort((a, b) => (TRUSS_STRAIGHT_LENGTHS[b] || 0) - (TRUSS_STRAIGHT_LENGTHS[a] || 0));
        if (!best || sorted.length < best.length || (sorted.length === best.length && score(sorted) < score(best))) best = sorted;
        return;
      }
      if (best && combo.length >= best.length) return;
      for (let i = startIndex; i < TRUSS_STRAIGHT_TYPE_ORDER.length; i += 1) {
        const key = TRUSS_STRAIGHT_TYPE_ORDER[i];
        const lenUnits = Math.round((TRUSS_STRAIGHT_LENGTHS[key] || 0) * 2);
        if (lenUnits <= 0 || lenUnits > remain) continue;
        if ((counts[key] || 0) >= (availableCounts[key] || 0)) continue;
        counts[key] = (counts[key] || 0) + 1;
        combo.push(key);
        walk(i, remain - lenUnits, combo, counts);
        combo.pop();
        counts[key] -= 1;
      }
    }
    walk(0, target, [], {});
    return best || [];
  }
  function buildTrussStraightRowsWithAlternatives(result, specs, parts, catalogContext) {
    const rows = [];
    const plan = { enabled: catalogContext.catalogMode === 'quote', extraConnections:0, replacements:[], unresolved:[] };
    const pool = cloneStockPool(catalogContext.equipmentItems || []);
    TRUSS_STRAIGHT_TYPE_ORDER.forEach(type => {
      const spec = specs[type] || {};
      const count = Math.max(0, Math.round(toNumber(result.counts && result.counts[type], 0)));
      const meters = toNumber(result.metersByType && result.metersByType[type], 0);
      if (!count && !meters) return;
      const part = parts[type];
      if (!part) return;
      const unitRentalPrice = meters > 0 && count > 0 ? (meters * 500) / count : 0;
      const baseExtra = { trussPart:type, meters, trussLengthM: toNumber(spec.length, 0), trussStraightCount: count, rentalPrice: unitRentalPrice };
      if (catalogContext.catalogMode !== 'quote') {
        rows.push(makeBomRow(part, count, `${meters.toFixed(1)} м суммарно`, baseExtra));
        return;
      }
      const direct = allocationRowsFromDirect(type, count, part, `${meters.toFixed(1)} м суммарно`, baseExtra, pool);
      rows.push(...direct.rows);
      let remaining = direct.remaining;
      for (let i = 0; i < remaining; i += 1) {
        const combo = findAlternativeLengthCombo(toNumber(spec.length, 0), pool);
        if (!combo.length || combo.length === 1 && combo[0] === type) {
          plan.unresolved.push({ requestedPart:type, requestedLengthM:toNumber(spec.length, 0), qty:1 });
          continue;
        }
        const replacement = { requestedPart:type, requestedLengthM:toNumber(spec.length, 0), combo:combo.slice(), extraConnections:Math.max(0, combo.length - 1) };
        plan.extraConnections += replacement.extraConnections;
        plan.replacements.push(replacement);
        combo.forEach(altType => {
          const altSpec = specs[altType] || {};
          const altPart = parts[altType];
          const consumed = consumePool(pool, altType, 1);
          const allocation = consumed.allocations[0];
          if (!allocation) return;
          const item = allocation.item || altPart;
          const altLen = toNumber(altSpec.length || TRUSS_STRAIGHT_LENGTHS[altType], 0);
          rows.push(createAllocatedBomRow(item, 1, `альтернативная сборка ${toNumber(spec.length, 0).toFixed(1)} м через ${combo.map(k => toNumber((specs[k] && specs[k].length) || TRUSS_STRAIGHT_LENGTHS[k], 0).toFixed(1)).join('+')} м`, { trussPart:altType, meters:altLen, trussLengthM:altLen, trussStraightCount:1, rentalPrice:altLen * 500, alternativeFor:type, alternative_length_for:type, alternativeLength:true, isAlternativeLength:true }));
        });
      }
      const unresolvedCount = plan.unresolved.filter(row => row.requestedPart === type).length;
      if (unresolvedCount > 0) rows.push(makeDeficitBomRow(part, unresolvedCount, `${toNumber(spec.length, 0).toFixed(1)} м: не хватило прямых и альтернативных длин`, Object.assign({}, baseExtra, { qty:unresolvedCount, trussStraightCount:unresolvedCount, meters:unresolvedCount * toNumber(spec.length, 0) })));
    });
    return { rows, plan };
  }
  function buildCompatiblePartRows(partKey, qty, part, note, extra, catalogContext) {
    const count = Math.max(0, Math.round(toNumber(qty, 0)));
    if (!count || !part) return [];
    if (catalogContext.catalogMode !== 'quote') return [makeBomRow(part, count, note, extra || {})];
    const pool = cloneStockPool(catalogContext.equipmentItems || []);
    const direct = allocationRowsFromDirect(partKey, count, part, note, Object.assign({}, extra || {}, { trussPart:partKey }), pool);
    const rows = direct.rows;
    if (direct.remaining > 0) rows.push(makeDeficitBomRow(part, direct.remaining, note, Object.assign({}, extra || {}, { trussPart:partKey })));
    return rows;
  }
  function compactTrussBomRows(rows) {
    const map = new Map();
    (Array.isArray(rows) ? rows : []).forEach(row => {
      if (!row) return;
      const key = [row.itemId || row.id || row.code || row.name, row.trussPart || row.truss_part || '', row.sourceType || row.source_type || '', row.alternativeFor || row.alternative_length_for || '', row.note || ''].join('::');
      const current = map.get(key);
      if (!current) {
        map.set(key, Object.assign({}, row));
        return;
      }
      const qty = toNumber(row.qty == null ? row.quantity : row.qty, 0);
      current.qty = toNumber(current.qty == null ? current.quantity : current.qty, 0) + qty;
      current.quantity = current.qty;
      current.requestedQty = toNumber(current.requestedQty, 0) + toNumber(row.requestedQty == null ? row.requested_qty : row.requestedQty, qty);
      current.requested_qty = current.requestedQty;
      current.weightKg = toNumber(current.weightKg == null ? current.weight_kg : current.weightKg, 0) + toNumber(row.weightKg == null ? row.weight_kg : row.weightKg, 0);
      current.weight_kg = current.weightKg;
      current.powerW = toNumber(current.powerW == null ? current.power_w : current.powerW, 0) + toNumber(row.powerW == null ? row.power_w : row.powerW, 0);
      current.power_w = current.powerW;
      current.totalRental = toNumber(current.totalRental == null ? current.total_rental : current.totalRental, 0) + toNumber(row.totalRental == null ? row.total_rental : row.totalRental, 0);
      current.total_rental = current.totalRental;
      current.meters = toNumber(current.meters, 0) + toNumber(row.meters, 0);
      current.trussStraightCount = toNumber(current.trussStraightCount == null ? current.truss_straight_count : current.trussStraightCount, 0) + toNumber(row.trussStraightCount == null ? row.truss_straight_count : row.trussStraightCount, qty);
      current.truss_straight_count = current.trussStraightCount;
      current.deficitQty = toNumber(current.deficitQty == null ? current.deficit_qty : current.deficitQty, 0) + toNumber(row.deficitQty == null ? row.deficit_qty : row.deficitQty, 0);
      current.deficit_qty = current.deficitQty;
      current.subrentQty = toNumber(current.subrentQty == null ? current.subrent_qty : current.subrentQty, 0) + toNumber(row.subrentQty == null ? row.subrent_qty : row.subrentQty, 0);
      current.subrent_qty = current.subrentQty;
    });
    return Array.from(map.values());
  }

  function normalizeSubrentAssignments(source) {
    const map = new Map();
    const list = Array.isArray(source) ? source : (source && typeof source === 'object' ? Object.keys(source).map(key => Object.assign({ key }, source[key] || {})) : []);
    list.forEach(raw => {
      const row = raw || {};
      const key = toText(row.key || row.itemId || row.item_id || row.code || row.trussPart);
      if (!key) return;
      const qty = Math.max(0, Math.round(toNumber(row.qty == null ? row.subrentQty : row.qty, 0)));
      map.set(key, {
        qty,
        supplierId: toText(row.supplierId || row.supplier_id),
        supplierName: toText(row.supplierName || row.supplier_name),
        subrentPrice: toNumber(row.subrentPrice == null ? row.subrent_price : row.subrentPrice, 0),
        clientPrice: toNumber(row.clientPrice == null ? row.client_price : row.clientPrice, 0),
        note: toText(row.note)
      });
    });
    return map;
  }
  function applyTrussLinkedSubrent(rows, assignments) {
    const map = normalizeSubrentAssignments(assignments);
    if (!map.size) return rows;
    return (Array.isArray(rows) ? rows : []).map(row => {
      const keys = [row.itemId, row.id, row.code, row.trussPart, row.truss_part].map(toText).filter(Boolean);
      const foundKey = keys.find(key => map.has(key));
      if (!foundKey) return row;
      const link = map.get(foundKey) || {};
      if (!link.qty) return row;
      const next = Object.assign({}, row, {
        subrentQty: link.qty,
        subrent_qty: link.qty,
        supplierId: link.supplierId,
        supplier_id: link.supplierId,
        supplierName: link.supplierName,
        supplier_name: link.supplierName,
        subrentPrice: link.subrentPrice,
        subrent_price: link.subrentPrice,
        clientPrice: link.clientPrice || link.subrentPrice,
        client_price: link.clientPrice || link.subrentPrice,
        margin: Math.max(0, (link.clientPrice || link.subrentPrice) - link.subrentPrice) * link.qty,
        sourceTypeSuggestion: 'subrent_needed',
        source_type_suggestion: 'subrent_needed',
        note: [row.note, `Добрать в субаренду ${link.qty} ${row.unit || 'шт'}${link.supplierName ? ' · ' + link.supplierName : ''}${link.note ? ' · ' + link.note : ''}`].filter(Boolean).join(' · ')
      });
      return next;
    });
  }
  function isTruss3DNodeType(type) { return TRUSS_3D_NODE_TYPES.includes(String(type || '')); }
  function isTrussTNodeType(type) { return TRUSS_T_NODE_TYPES.includes(String(type || '')); }
  function orderedTrussSpecIds(specs) {
    const source = specs && typeof specs === 'object' ? specs : {};
    const used = new Set();
    const ids = [];
    TRUSS_STRAIGHT_TYPE_ORDER.forEach(id => { if (source[id]) { ids.push(id); used.add(id); } });
    Object.keys(source).forEach(id => { if (!used.has(id)) ids.push(id); });
    return ids;
  }

  function deriveTrussSectionGeometry(items, state, specs) {
    const st = state || {};
    const list = Array.isArray(items) ? items : [];
    const cellM = Math.max(0.5, toNumber(st.cellMeters, 0.5) || 0.5);
    const trussSpecs = specs || (ROOT.TrussBlockConstructor && ROOT.TrussBlockConstructor.getDefaultSpecs ? ROOT.TrussBlockConstructor.getDefaultSpecs() : {});
    const stored = clone(st.trussGeometry || st.geometry || {});
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let usesU012 = false, uses3dNodes = false, usesTJoints = false;
    list.forEach(item => {
      if (!item) return;
      const type = String(item.type || '');
      if (type === 'cornerU012') usesU012 = true;
      if (isTruss3DNodeType(type)) uses3dNodes = true;
      if (isTrussTNodeType(type)) usesTJoints = true;
      const spec = trussSpecs[type] || {};
      const x = toNumber(item.x, 0);
      const y = toNumber(item.y, 0);
      const lenCells = spec.kind === 'straight' ? Math.max(1, Math.round(toNumber(spec.length, 0) / cellM)) : 1;
      minX = Math.min(minX, x); minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + (item.o === 'h' ? lenCells : 1));
      maxY = Math.max(maxY, y + (item.o === 'v' ? lenCells : 1));
    });
    const footprintWidthM = Number.isFinite(maxX - minX) ? Math.max(0, Math.round((maxX - minX) * cellM * 100) / 100) : 0;
    const footprintDepthM = Number.isFinite(maxY - minY) ? Math.max(0, Math.round((maxY - minY) * cellM * 100) / 100) : 0;
    const is3d = !!(stored.is3d || stored.mode === '3d' || st.truss3d || usesU012 || uses3dNodes);
    return Object.assign({}, stored, {
      mode:is3d ? '3d' : (stored.mode || st.structureMode || '2d'),
      is3d,
      usesU012,
      uses3dNodes,
      usesTJoints,
      topNodeHeightM:TRUSS_TOP_NODE_HEIGHT_M,
      widthM:toNumber(stored.widthM || stored.width || footprintWidthM, 0),
      depthM:toNumber(stored.depthM || stored.depth || (is3d ? footprintDepthM : 0), 0),
      heightM:toNumber(stored.heightM || stored.height || (is3d ? footprintDepthM || 0 : 0), 0),
      footprintWidthM,
      footprintDepthM
    });
  }

  function buildTrussBomFromItems(items, state, options) {
    const truss = ROOT.TrussBlockConstructor;
    const specs = truss && truss.getDefaultSpecs ? truss.getDefaultSpecs() : {};
    const st = Object.assign({ cellMeters:0.5, trussSeries:'T29Q', pointScheme:'p1', cantileverView:'Q' }, state || {});
    const list = truss && truss.normalizeItems ? truss.normalizeItems(items || [], specs) : (Array.isArray(items) ? items : []);
    const connectionCount = truss && truss.autoConnectionCount ? Math.max(0, Math.round(truss.autoConnectionCount(list, specs, { cellMeters:st.cellMeters || 0.5 }))) : 0;
    st.connectionCount = connectionCount;
    const result = truss && truss.summarizeBom ? truss.summarizeBom(list, specs, st, { connectionCount }) : { counts:{}, metersByType:{}, weight:0 };
    const dimensionItems = truss && truss.topFrameItemsForDimensions ? truss.topFrameItemsForDimensions(list, st) : list;
    const spanInfo = truss && truss.effectiveSpanInfo ? truss.effectiveSpanInfo(dimensionItems, specs, st, { cellMeters:st.cellMeters || 0.5 }) : { maxEffective:toNumber(result.totalMeters, 0), runs:[] };
    result.loadDimensionSource = dimensionItems.length !== list.length ? 'stool-top-frame' : 'all-items';
    result.dimensionSource = result.loadDimensionSource;
    result.dimensionItemCount = dimensionItems.length;
    result.totalItemCount = list.length;
    result.stoolDimensionPolicy = TRUSS_STOOL_DIMENSION_POLICY_VERSION;
    result.stoolTopFrameDimensionsShared = result.loadDimensionSource === 'stool-top-frame';
    const loadChecker = ROOT.LoadChecker;
    const loadCheck = loadChecker && loadChecker.calculateLoadCheck ? loadChecker.calculateLoadCheck(st, spanInfo) : null;
    result.spanInfo = spanInfo;
    result.loadCheck = loadCheck;
    const geometry = deriveTrussSectionGeometry(list, st, specs);
    result.geometry = geometry;
    result.trussGeometry = geometry;
    result.structureMode = geometry.mode;
    result.truss3d = !!geometry.is3d;
    const catalogContext = getCatalogContext(options || {}, options || {}, 'truss');
    const parts = getSystemPartMap(catalogContext.equipmentItems);
    const rows = [];
    const straightPlan = buildTrussStraightRowsWithAlternatives(result, specs, parts, catalogContext);
    rows.push(...straightPlan.rows);
    const extraConnections = Math.max(0, Math.round(toNumber(straightPlan.plan && straightPlan.plan.extraConnections, 0)));
    if (extraConnections > 0) {
      result.connectionCount = toNumber(result.connectionCount, 0) + extraConnections;
      result.cq2Cones = toNumber(result.cq2Cones, 0) + extraConnections * 4;
      result.totalC2Pins = toNumber(result.totalC2Pins, 0) + extraConnections * 8;
      result.totalCotters = toNumber(result.totalCotters, 0) + extraConnections * 8;
      result.alternativeLengthExtraConnections = extraConnections;
    }
    result.alternativeLengthPlan = straightPlan.plan;
    orderedTrussSpecIds(specs).forEach(type => {
      const spec = specs[type];
      if (!spec || spec.hidden || type === 'pin' || spec.kind === 'straight') return;
      const count = Math.max(0, Math.round(toNumber(result.counts && result.counts[type], 0)));
      if (!count) return;
      const part = parts[type];
      if (!part) return;
      const unitRentalPrice = spec.kind === 'node' || spec.kind === 'base' ? 500 : 0;
      rows.push(...buildCompatiblePartRows(type, count, part, spec.kind === 'node' ? 'угол / узел фермы' : (spec.kind === 'base' ? 'опорная база' : 'позиция фермы'), { trussPart:type, meters:0, trussLengthM:0, trussStraightCount:0, rentalPrice: unitRentalPrice }, catalogContext));
    });
    if (toNumber(result.cq2Cones, 0) > 0) rows.push(...buildCompatiblePartRows('c288', result.cq2Cones, parts.c288, `${toNumber(result.connectionCount, 0)} фактических стыков × 4 шт${extraConnections ? ` · +${extraConnections} стыков от альтернативных длин` : ''}`, { trussPart:'c288' }, catalogContext));
    if (toNumber(result.baseHalfConnectors, 0) > 0) rows.push(...buildCompatiblePartRows('c383', result.baseHalfConnectors, parts.c383, `${toNumber(result.connectedBaseCount, 0)} подключ. баз × 4 шт`, { trussPart:'c383' }, catalogContext));
    if (toNumber(result.totalC2Pins, 0) > 0) rows.push(...buildCompatiblePartRows('c267', result.totalC2Pins, parts.c267, `${toNumber(result.cq2Cones, 0)} C2-88 × 2 шт + ${toNumber(result.baseHalfConnectors, 0)} C3-83 × 1 шт`, { trussPart:'c267' }, catalogContext));
    if (toNumber(result.totalCotters, 0) > 0) rows.push(...buildCompatiblePartRows('cotter', result.totalCotters, parts.cotter, `${toNumber(result.cq2Cones, 0)} C2-88 × 2 шт + ${toNumber(result.baseHalfConnectors, 0)} C3-83 × 1 шт`, { trussPart:'cotter' }, catalogContext));
    const mappedRows = compactTrussBomRows(rows).map(row => addCatalogMeta(row, catalogContext));
    return { items:list, result, rows:mappedRows, weightKg: mappedRows.reduce((sum, row) => sum + toNumber(row.weightKg, 0), 0) || toNumber(result.weight, 0), catalogMode: catalogContext.catalogMode };
  }
  function buildDefaultTrussItems(input) {
    const truss = ROOT.TrussBlockConstructor;
    const specs = truss && truss.getDefaultSpecs ? truss.getDefaultSpecs() : {};
    const length = Math.max(0, toNumber(input && input.lengthM, 6));
    const bases = Math.max(0, Math.round(toNumber(input && input.baseCount, 2)));
    const items = [];
    const split = truss && truss.balancedStraightSegmentTypes
      ? truss.balancedStraightSegmentTypes(length, specs, { maxPieces:16 })
      : [];
    const order = split.length ? split : ['truss3','truss25','truss2','truss15','truss1','truss05'];
    let remain = length;
    let idx = 1;
    let x = 1;
    order.forEach(type => {
      const spec = specs[type] || {};
      const len = toNumber(spec.length, 0);
      const canPlace = split.length ? len > 0 : (len > 0 && remain + 0.0001 >= len);
      while (canPlace && remain + 0.0001 >= len) {
        const item = truss && truss.createItem ? truss.createItem(`v4t${idx++}`, type, x, 1, 'h', 0, specs) : { id:`v4t${idx++}`, type, x, y:1, o:'h', r:0 };
        if (item) item.micro = Object.assign({}, item.micro || {}, { templateSplitPolicy:'balanced-v3.17.45' });
        if (item) items.push(item);
        x += Math.max(1, Math.round(len / 0.5));
        remain -= len;
        if (split.length) break;
      }
    });
    for (let i = 0; i < bases; i += 1) items.push({ id:`v4base${i + 1}`, type:'base', x:i, y:0, o:'n', r:0 });
    return items;
  }
  function buildTrussSection(input, overrides) {
    const src = input || {};
    const items = Array.isArray(src.items) && src.items.length ? src.items : buildDefaultTrussItems(src);
    const incomingGeometry = clone(src.trussGeometry || src.geometry || (src.state && (src.state.trussGeometry || src.state.geometry)) || {});
    const state = Object.assign({
      connectionCount: Math.max(0, Math.round(toNumber(src.connectionCount, 0))),
      cellMeters: toNumber(src.state && src.state.cellMeters, 0.5) || 0.5,
      trussSeries: src.trussSeries || (src.state && src.state.trussSeries) || 'T29Q',
      spanManual: toNumber(src.spanManual ?? (src.state && src.state.spanManual), 0),
      factDistributedKgM: toNumber(src.factDistributedKgM ?? (src.state && src.state.factDistributedKgM), 0),
      pointScheme: src.pointScheme || (src.state && src.state.pointScheme) || 'p1',
      factPointKg: toNumber(src.factPointKg ?? (src.state && src.state.factPointKg), 0),
      cantileverLength: toNumber(src.cantileverLength ?? (src.state && src.state.cantileverLength), 0),
      cantileverView: src.cantileverView || (src.state && src.state.cantileverView) || 'Q',
      structureMode: src.structureMode || (src.state && src.state.structureMode) || incomingGeometry.mode,
      truss3d: src.truss3d != null ? !!src.truss3d : !!(src.state && src.state.truss3d),
      trussGeometry: incomingGeometry
    }, src.state || {});
    if (Object.keys(incomingGeometry).length) state.trussGeometry = incomingGeometry;
    const catalogContext = getCatalogContext(src, overrides || {}, 'truss');
    const bom = buildTrussBomFromItems(items, state, Object.assign({}, src, { catalogMode:catalogContext.catalogMode, equipmentItems:catalogContext.equipmentItems, sourceMode:catalogContext.catalogMode }));
    bom.rows = applyTrussLinkedSubrent(bom.rows, src.subrentAssignments || (src.state && src.state.subrentAssignments));
    const res = bom.result || {};
    const geometry = res.trussGeometry || res.geometry || deriveTrussSectionGeometry(bom.items, state, ROOT.TrussBlockConstructor && ROOT.TrussBlockConstructor.getDefaultSpecs ? ROOT.TrussBlockConstructor.getDefaultSpecs() : {});
    const geometrySummary = geometry && geometry.is3d ? ` · 3D ${toNumber(geometry.widthM, 0).toFixed(1)}×${toNumber(geometry.depthM, 0).toFixed(1)}×${toNumber(geometry.heightM, 0).toFixed(1)} м` : '';
    return Object.assign({
      type:'truss',
      binderVersion:'v4-structure-' + STRUCTURE_CONFIG_VERSION,
      status:'configured',
      source:'V4StructureConfigurator',
      catalogMode:catalogContext.catalogMode,
      sourceMode:catalogContext.catalogMode,
      title:'Фермы',
      summary:`Фермы ${toNumber(res.totalMeters, 0).toFixed(1)} м · узлы ${toNumber(res.nodePieces, 0)} шт · базы ${toNumber(res.baseCount, 0)} шт · стыки ${toNumber(res.connectionCount, 0)} шт${geometrySummary}`,
      input:{ items:clone(bom.items), connectionCount:res.connectionCount, lengthM:src.lengthM, baseCount:src.baseCount, structureMode:geometry.mode, truss3d:!!geometry.is3d, trussGeometry:clone(geometry), trussSeries:state.trussSeries, spanManual:state.spanManual, factDistributedKgM:state.factDistributedKgM, pointScheme:state.pointScheme, factPointKg:state.factPointKg, cantileverLength:state.cantileverLength, cantileverView:state.cantileverView, subrentAssignments:clone(src.subrentAssignments || (src.state && src.state.subrentAssignments) || []) },
      structureMode:geometry.mode,
      truss3d:!!geometry.is3d,
      trussGeometry:clone(geometry),
      result:res,
      bomRows:bom.rows,
      sharedBomTotals:summarizeStageRows(bom.rows),
      bomBridge:{ enabled:true, sectionKey:'truss', bridgeVersion:ROOT.V4SharedBomBridge && ROOT.V4SharedBomBridge.SHARED_BOM_BRIDGE_VERSION || '', note:'Truss section is ready for shared BOM, quote_items and warehouse pick lists.' },
      rental:toNumber(overrides && Object.prototype.hasOwnProperty.call(overrides, 'rental') ? overrides.rental : res.rental, res.rental),
      weightKg:bom.weightKg,
      powerW:0,
      updatedAt:nowIso()
    }, overrides || {});
  }

  ROOT._TrussStructureConfig = {
    buildTrussBomFromItems,
    buildTrussSection,
    TRUSS_STOOL_DIMENSION_POLICY_VERSION
  };
})();
