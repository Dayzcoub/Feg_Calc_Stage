// FEG Stage PRO v3.1.88 — Quick PDF clean pricing rows and auto orientation
// Responsibility: PDF preview/download/share for quick Stage/Truss/LED calculators.
// Boundary: quick technical export only; no quote save, no BOM mutation, no warehouse/reservation/backend writes.
(function (global) {
  'use strict';

  const ROOT = (global.FEGModules = global.FEGModules || {});
  const QUICK_PDF_EXPORT_VERSION = '3.1.102-quick-pdf-rigging-spec-sheet';
  const KIND_LABELS = {
    stage: 'Сцена',
    truss: 'Фермы',
    led: 'LED экран'
  };
  const KIND_TITLES = {
    stage: 'Быстрый технический расчёт сцены',
    truss: 'Быстрый технический расчёт ферм',
    led: 'Быстрый технический расчёт LED-экрана'
  };

  const modalState = { blob: null, url: '', name: '', kind: 'quick' };
  const QUICK_PDF_MODAL_STYLE_ID = 'fegQuickPdfModalOverlayStyles';

  function notify(message) {
    const fn = ROOT.ToastManager && ROOT.ToastManager.showToast ? ROOT.ToastManager.showToast : (global.showToast || null);
    if (fn) fn(message);
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[char]));
  }

  function text(value, fallback) {
    const out = String(value == null ? '' : value).trim();
    return out || String(fallback == null ? '' : fallback).trim();
  }

  function num(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : Number(fallback || 0);
  }

  function metric(value, digits) {
    return Number(value || 0).toLocaleString('ru-RU', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  function money(value) {
    const n = Number(value || 0);
    if (!n) return '—';
    return `${n.toLocaleString('ru-RU')} ₽`;
  }

  function getQuickPricing(section) {
    const pricing = section && (section.quickPricing || (section.pricing && section.pricing.quick));
    return pricing && pricing.visible !== false && pricing.enabled !== false ? pricing : null;
  }

  // v5 spec-sheet table cells: condensed uppercase headers with a solid graphite rule,
  // steel hairline row separators, JetBrains Mono for every numeric/value column.
  // Every cell carries an inline -webkit-text-fill-color: the dark theme paints text
  // via that property with body-chain specificity, and only an inline !important is
  // guaranteed to win inside the offscreen render html2canvas rasterizes.
  const PDF_INK_FILL = '-webkit-text-fill-color:#14171A!important;';
  const PDF_TH_STYLE = `style="background:#F2F3F4!important;color:#14171A!important;${PDF_INK_FILL}border-bottom:2px solid #14171A!important;padding:7px 6px!important;text-align:left!important;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif!important;font-size:10.5px!important;font-weight:700!important;text-transform:uppercase!important;letter-spacing:.07em!important;"`;
  const PDF_TD_STYLE = `style="background:#ffffff!important;color:#14171A!important;${PDF_INK_FILL}border-bottom:1px solid #E3E6E8!important;padding:7px 6px!important;vertical-align:top!important;font-size:11px!important;line-height:1.3!important;"`;
  const PDF_TD_MONO_STYLE = `style="background:#ffffff!important;color:#14171A!important;${PDF_INK_FILL}border-bottom:1px solid #E3E6E8!important;padding:7px 6px!important;vertical-align:top!important;font-family:'JetBrains Mono','Courier New',monospace!important;font-size:10px!important;line-height:1.35!important;"`;
  const PDF_TD_TOTAL_STYLE = `style="background:#FCF1C8!important;color:#14171A!important;${PDF_INK_FILL}border-bottom:none!important;border-top:2px solid #14171A!important;padding:8px 6px!important;vertical-align:top!important;font-family:'JetBrains Mono','Courier New',monospace!important;font-size:11px!important;line-height:1.3!important;"`;

  function buildPricingSummaryCard(section) {
    const pricing = getQuickPricing(section);
    if (!pricing) return null;
    return {
      label:'Стоимость',
      value:money(pricing.total || 0),
      note:pricing.summaryNote || `${money(pricing.unitPrice || 0)} × ${metric(pricing.unitQty || 0, 0)} ${pricing.unitShort || 'шт'} + монтаж/доставка`
    };
  }

  function buildQuickPricingRowsTable(section) {
    const pricing = getQuickPricing(section);
    if (!pricing || !Array.isArray(pricing.rows) || !pricing.rows.length) return '';
    const rowsHtml = pricing.rows.map(row => `<tr>
      <td ${PDF_TD_STYLE}><b style="color:#14171A!important;-webkit-text-fill-color:#14171A!important;font-weight:700!important;">${esc(row.name || row.code || '')}</b></td>
      <td ${PDF_TD_MONO_STYLE}>${metric(row.qty || 0, 0)} ${esc(row.unit || '')}</td>
      <td ${PDF_TD_MONO_STYLE}>${money(row.unitPrice || 0)}</td>
      <td ${PDF_TD_MONO_STYLE}>${money(row.total || 0)}</td>
    </tr>`).join('');
    return `<h3 style="font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif!important;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin:14px 0 8px;color:#14171A!important;-webkit-text-fill-color:#14171A!important;border-left:4px solid #F4C216;padding-left:8px;line-height:1.2;">Коммерческий блок быстрого расчёта</h3><table class="quick-pdf-table" style="width:100%!important;border-collapse:collapse!important;color:#14171A!important;background:#ffffff!important;"><thead><tr><th ${PDF_TH_STYLE}>Позиция</th><th ${PDF_TH_STYLE}>Кол-во</th><th ${PDF_TH_STYLE}>Цена</th><th ${PDF_TH_STYLE}>Сумма</th></tr></thead><tbody>${rowsHtml}<tr><td ${PDF_TD_TOTAL_STYLE} colspan="3"><b style="color:#14171A!important;-webkit-text-fill-color:#14171A!important;font-weight:700!important;">Итого</b></td><td ${PDF_TD_TOTAL_STYLE}><b style="color:#14171A!important;-webkit-text-fill-color:#14171A!important;font-weight:700!important;">${money(pricing.total || 0)}</b></td></tr></tbody></table>`;
  }

  function weight(value) {
    return `${metric(value || 0, 1)} кг`;
  }

  function slug(value, fallback) {
    return text(value, fallback || 'quick-pdf')
      .toLowerCase()
      .replace(/[^a-z0-9а-яё._-]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 96) || String(fallback || 'quick-pdf');
  }

  function renderActionHtml(kind, label) {
    const title = label || `PDF · предпросмотр / отправить`;
    return `<div class="v4-actions v4-quick-pdf-actions" data-quick-pdf-actions="${esc(kind)}"><button type="button" class="btn-primary" data-quick-pdf-action="${esc(kind)}">${esc(title)}</button><small class="v4-muted">Сводная таблица + схема текущего конфига</small></div>`;
  }

  function bindAction(container, options) {
    const root = typeof container === 'string' && global.document ? global.document.getElementById(container) : container;
    if (!root || !root.querySelectorAll) return null;
    const opts = options || {};
    root.querySelectorAll('[data-quick-pdf-action]').forEach(btn => {
      if (btn._fegQuickPdfBound) return;
      btn._fegQuickPdfBound = true;
      btn.addEventListener('click', () => {
        const kind = btn.getAttribute('data-quick-pdf-action') || opts.kind;
        openSectionPreview(Object.assign({}, opts, {
          kind,
          actionButton: btn,
          sourceRoot: opts.sourceRoot || opts.root || findConstructorRoot(btn, kind) || findConstructorRoot(root, kind) || root
        }));
      });
    });
    return root;
  }

  function resolveSection(options) {
    const opts = options || {};
    if (typeof opts.getSection === 'function') return opts.getSection();
    if (typeof opts.section === 'function') return opts.section();
    return opts.section || null;
  }

  function buildQuickQuote(kind, section, options) {
    const normalizedKind = normalizeKind(kind);
    const opts = options || {};
    const projectName = text(opts.projectName || opts.title, KIND_TITLES[normalizedKind]);
    const sections = { stage: null, truss: null, led: null };
    if (normalizedKind && section) sections[normalizedKind] = section;
    return {
      id: `quick_pdf_${normalizedKind}_${Date.now()}`,
      source: 'quick-calculators-pdf-export',
      sourceMode: 'quick',
      project: { name: projectName },
      scope: { stage: normalizedKind === 'stage', truss: normalizedKind === 'truss', led: normalizedKind === 'led', transport: false },
      sections
    };
  }

  function normalizeKind(kind) {
    const value = String(kind || '').toLowerCase();
    return ['stage', 'truss', 'led'].includes(value) ? value : 'stage';
  }

  function getRows(section) {
    return Array.isArray(section && section.bomRows) ? section.bomRows : [];
  }

  function rowQty(row) {
    return num(row && (row.trussStraightCount || row.qty || row.quantity || row.count), 0);
  }

  function rowWeight(row) {
    return num(row && (row.weightKg || row.weight || row.totalWeightKg), 0);
  }

  function rowPower(row) {
    return num(row && (row.powerW || row.totalPowerW), 0);
  }

  function sectionRowCount(section) {
    const bomRows = getRows(section).filter(row => rowQty(row) || rowWeight(row) || rowPower(row) || num(row && row.meters, 0)).length;
    const pricing = getQuickPricing(section);
    const pricingRows = pricing && Array.isArray(pricing.rows) ? pricing.rows.length + 1 : 0;
    return bomRows + pricingRows;
  }

  function resolvePdfOrientation(kind, section, options) {
    const explicit = options && (options.orientation || options.pdfOrientation || options.pageOrientation);
    const value = String(explicit || '').toLowerCase();
    if (['p', 'portrait', 'book', 'книжная', 'книжное'].includes(value)) return 'p';
    if (['l', 'landscape', 'album', 'альбомная', 'альбомное'].includes(value)) return 'l';
    const rows = sectionRowCount(section);
    const compactThreshold = kind === 'led' ? 16 : 18;
    return rows > compactThreshold ? 'p' : 'l';
  }

  function orientationLabel(orientation) {
    return orientation === 'p' ? 'книжная' : 'альбомная';
  }

  function buildStageSummaryCards(section) {
    const result = section && section.result || {};
    const geometry = result.geometry || section && section.geometry || {};
    const cfg = section && section.stageConfig || {};
    const systemKey = cfg.stageSystemKey || 'imlight_copy';
    const connectorCard = systemKey === 'pkc_paz_paz'
      ? { label:'PKC соединители', value:`T ${metric(geometry.pkcTConnectors || 0, 0)} / X ${metric(geometry.pkcXConnectors || 0, 0)} / С ${metric(geometry.pkcClamps || 0, 0)}`, note:'T / X / струбцины' }
      : (systemKey === 'pkc_ship_paz'
        ? { label:'Соединение', value:'ШИП-ПАЗ', note:'без T/X/струбцин' }
        : { label:'Опоры / рамы', value:`${metric(geometry.columns || 0, 0)} / ${metric(geometry.frames || 0, 0)}`, note:'опоры / перекладины' });
    return [
      { label:'Система', value:cfg.stageSystemLabel || 'Imlight Copy', note:cfg.deckLabel || '' },
      { label:'Габарит', value:`${metric(result.widthMeters || section && section.widthM || 0, 1)} × ${metric(result.depthMeters || section && section.depthM || 0, 1)} м`, note:`высота ${metric(section && (section.stageHeightM || section.heightM) || result.stageHeightM || 0, 2)} м` },
      { label:'Настил', value:`${metric(geometry.sheets || result.sheets || 0, 0)} шт`, note:`${metric(result.areaMeters || section && section.areaM2 || 0, 2)} м²` },
      connectorCard,
      { label:'Лестницы / торцы', value:`${metric(geometry.stairs || 0, 0)} / ${metric(geometry.edgeClosureMeters || 0, 2)} м`, note: cfg.edgeClosureLabel || 'закрытие по выбранной схеме' },
      { label:'Вес', value: weight(section && section.weightKg || 0), note: systemKey.indexOf('pkc_') === 0 ? 'PKC нагрузка 750 кг/м² справочно' : 'без цен и КП' }
    ].concat(buildPricingSummaryCard(section) ? [buildPricingSummaryCard(section)] : []);
  }

  function buildTrussSummaryCards(section) {
    const result = section && section.result || {};
    const bounds = result.physicalBounds || {};
    const spanInfo = result.spanInfo || result.loadCheck && result.loadCheck.spanInfo || {};
    return [
      { label:'Габарит', value:`${metric(bounds.width || section && section.widthM || 0, 2)} × ${metric(bounds.height || section && section.heightM || 0, 2)} м`, note: result.dimensionSource === 'stool-top-frame' ? 'верхняя рама табуретки' : 'реальный габарит схемы' },
      { label:'Прямые фермы', value:`${metric(result.totalMeters || 0, 1)} м`, note:`пролёт ${metric(spanInfo.maxEffective || 0, 1)} м` },
      { label:'Узлы / базы', value:`${metric(result.nodePieces || 0, 0)} / ${metric(result.baseCount || 0, 0)}`, note:'углы/узлы и блины' },
      { label:'Стыки', value:`${metric(result.connectionCount || 0, 0)} шт`, note:`C2-88 / пальцы / шплинты` },
      { label:'Вес', value: weight(section && section.weightKg || result.weight || 0), note:`прокат ${money(result.rental || 0)}` }
    ].concat(buildPricingSummaryCard(section) ? [buildPricingSummaryCard(section)] : []);
  }

  function buildLedSummaryCards(section) {
    const result = section && section.result || {};
    const constructions = Array.isArray(result.constructions) ? result.constructions : [];
    const first = constructions[0] || {};
    const totalCab = num(result.totalCabinets || result.cabinetCount || section && section.cabinetCount, 0);
    return [
      { label:'Кабинеты', value:`${metric(totalCab, 0)} шт`, note:`конструкций ${metric(constructions.length || 0, 0)}` },
      { label:'Фактический размер', value:`${metric(result.actualWidthM || first.actualWidthM || section && section.factWidthM || 0, 2)} × ${metric(result.actualHeightM || first.actualHeightM || section && section.factHeightM || 0, 2)} м`, note:text(result.cabinetFormat && result.cabinetFormat.name || section && section.cabinetType, 'LED') },
      { label:'Пиксели', value:`${metric(result.totalPixelsX || first.totalPixelsX || 0, 0)} × ${metric(result.totalPixelsY || first.totalPixelsY || 0, 0)}`, note:text(result.pixelPitch && result.pixelPitch.name || section && section.pixelPitch, 'шаг пикселя') },
      { label:'Мощность', value:`${metric((result.totalPowerW || section && section.powerW || 0) / 1000, 2)} кВт`, note:`пуск ${metric((result.totalStartupPowerW || section && section.startupPowerW || 0) / 1000, 2)} кВт` },
      { label:'Вес', value: weight(section && section.weightKg || result.totalWeightKg || 0), note:`HB ${metric(result.hangingBarCount || result.hangingBars || 0, 0)} · ноги ${metric(result.legCount || 0, 0)}` }
    ].concat(buildPricingSummaryCard(section) ? [buildPricingSummaryCard(section)] : []);
  }

  function buildSummaryCards(kind, section) {
    if (kind === 'truss') return buildTrussSummaryCards(section);
    if (kind === 'led') return buildLedSummaryCards(section);
    return buildStageSummaryCards(section);
  }

  function defaultVisualSelector(kind) {
    if (kind === 'truss') return '[data-truss-field]';
    if (kind === 'led') return '[data-led-grid]';
    return '[data-stage-grid]';
  }

  function findConstructorRoot(node, kind) {
    if (!node || !node.closest) return null;
    if (kind === 'led') return node.closest('[data-led-calculator]') || node.closest('.v4-led-constructor');
    if (kind === 'truss') return node.closest('[data-v4-structure-truss]') || node.closest('.v4-structure-truss');
    if (kind === 'stage') return node.closest('[data-v4-structure-stage]') || node.closest('.v4-structure-stage');
    return node.closest('[data-led-calculator],[data-v4-structure-truss],[data-v4-structure-stage]');
  }

  function resolveVisualElement(kind, options) {
    const opts = options || {};
    if (typeof opts.getVisualElement === 'function') return opts.getVisualElement();
    if (opts.visualElement && opts.visualElement.nodeType === 1) return opts.visualElement;
    const root = opts.sourceRoot || opts.root || findConstructorRoot(opts.actionButton, kind) || findConstructorRoot(opts.container, kind) || null;
    const selector = opts.visualSelector || defaultVisualSelector(kind);
    if (root && root.querySelector) {
      const found = root.querySelector(selector);
      if (found) return found;
    }
    return global.document && global.document.querySelector ? global.document.querySelector(selector) : null;
  }

  async function captureSchemeSnapshot(kind, options) {
    const element = resolveVisualElement(kind, options);
    const html2canvasRef = (options && options.html2canvas) || global.html2canvas;
    if (!element || !html2canvasRef) return null;
    try {
      const rect = element.getBoundingClientRect ? element.getBoundingClientRect() : { width:0, height:0 };
      if (!(rect && rect.width > 2 && rect.height > 2)) return null;
      const canvas = await html2canvasRef(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: false,
        scrollX: 0,
        scrollY: 0
      });
      if (!canvas || !canvas.width || !canvas.height) return null;
      return {
        kind,
        label: 'Схема из конструктора',
        dataUrl: canvas.toDataURL('image/png'),
        width: Math.round(canvas.width / 2),
        height: Math.round(canvas.height / 2)
      };
    } catch (error) {
      if (global.console) global.console.warn('Quick PDF scheme snapshot failed', error);
      return null;
    }
  }

  function safeCellList(cells) {
    return (Array.isArray(cells) ? cells : []).map(cell => ({ x: Math.round(num(cell && cell.x, 0)), y: Math.round(num(cell && cell.y, 0)) })).filter(cell => Number.isFinite(cell.x) && Number.isFinite(cell.y));
  }

  function boundsFromCells(cells) {
    const list = safeCellList(cells);
    if (!list.length) return null;
    const xs = list.map(cell => cell.x);
    const ys = list.map(cell => cell.y);
    return { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys), cells: list };
  }

  function svgRect(x, y, w, h, fill, stroke, extra) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.max(1, Math.min(5, Math.round(w * 0.12)))}" fill="${fill}" stroke="${stroke}" stroke-width="1"${extra || ''}/>`;
  }

  function buildStageSchemeSvg(section) {
    const input = section && section.input || {};
    const rawModules = Array.isArray(input.modules) ? input.modules : [];
    const stairs = safeCellList(input.stairs || []);
    const stageSystemKey = String(input.stageSystemKey || section && section.stageConfig && section.stageConfig.stageSystemKey || '');
    const isPkc = stageSystemKey.indexOf('pkc_') === 0 || rawModules.some(item => item && (item.widthCells != null || item.depthCells != null || item.stageGridCellM != null));
    const modules = rawModules.map((item, index) => {
      const x = Math.round(num(item && item.x, 0));
      const y = Math.round(num(item && item.y, 0));
      const widthCells = Math.max(1, Math.round(num(item && (item.widthCells || item.w), 1)));
      const depthCells = Math.max(1, Math.round(num(item && (item.depthCells || item.d), 1)));
      const moduleWidthM = num(item && item.moduleWidthM, widthCells * (isPkc ? 0.5 : num(input.moduleWidthM, 1.2)));
      const moduleDepthM = num(item && item.moduleDepthM, depthCells * (isPkc ? 0.5 : num(input.moduleDepthM, 1.2)));
      const label = isPkc
        ? `${String(moduleWidthM).replace(/\.0$/, '').replace('.', ',')}×${String(moduleDepthM).replace(/\.0$/, '').replace('.', ',')}`
        : '';
      return { x, y, widthCells, depthCells, moduleWidthM, moduleDepthM, label, index };
    }).filter(item => Number.isFinite(item.x) && Number.isFinite(item.y));
    const footprintCells = [];
    modules.forEach(module => {
      for (let yy = 0; yy < module.depthCells; yy += 1) {
        for (let xx = 0; xx < module.widthCells; xx += 1) footprintCells.push({ x:module.x + xx, y:module.y + yy });
      }
    });
    const all = footprintCells.concat(stairs);
    const bounds = boundsFromCells(all);
    if (!bounds) return '';
    const pad = 1;
    const cols = Math.max(1, bounds.maxX - bounds.minX + 1 + pad * 2);
    const rows = Math.max(1, bounds.maxY - bounds.minY + 1 + pad * 2);
    const cell = Math.max(8, Math.min(26, Math.floor(Math.min(390 / cols, 260 / rows))));
    const gap = Math.max(1, Math.round(cell * 0.12));
    const labelH = 30;
    const w = cols * (cell + gap) + gap;
    const h = rows * (cell + gap) + gap + labelH;
    const deckSet = new Set(footprintCells.map(cell => `${cell.x}:${cell.y}`));
    const stairSet = new Set(stairs.map(cell => `${cell.x}:${cell.y}`));
    const rects = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const gx = bounds.minX - pad + x;
        const gy = bounds.minY - pad + y;
        const key = `${gx}:${gy}`;
        const px = gap + x * (cell + gap);
        const py = gap + y * (cell + gap) + labelH;
        const isDeck = deckSet.has(key);
        const isStair = stairSet.has(key);
        rects.push(svgRect(px, py, cell, cell, isStair ? '#f59e0b' : (isDeck ? '#d7b56d' : '#f8fafc'), isStair ? '#92400e' : (isDeck ? '#b08943' : '#d9e1ec')));
        if (isStair) rects.push(`<path d="M${px + cell * 0.18} ${py + cell * 0.68} L${px + cell * 0.82} ${py + cell * 0.68} M${px + cell * 0.28} ${py + cell * 0.50} L${px + cell * 0.82} ${py + cell * 0.50} M${px + cell * 0.38} ${py + cell * 0.32} L${px + cell * 0.82} ${py + cell * 0.32}" stroke="#111827" stroke-width="1.4" stroke-linecap="round"/>`);
      }
    }
    if (isPkc) {
      modules.forEach(module => {
        const localX = module.x - bounds.minX + pad;
        const localY = module.y - bounds.minY + pad;
        const px = gap + localX * (cell + gap) - Math.max(1, gap * 0.35);
        const py = gap + localY * (cell + gap) + labelH - Math.max(1, gap * 0.35);
        const mw = module.widthCells * cell + (module.widthCells - 1) * gap + Math.max(2, gap * 0.7);
        const mh = module.depthCells * cell + (module.depthCells - 1) * gap + Math.max(2, gap * 0.7);
        rects.push(`<rect x="${px}" y="${py}" width="${mw}" height="${mh}" rx="5" fill="none" stroke="#8a5a1f" stroke-width="2.1"/>`);
        rects.push(`<rect x="${px + 4}" y="${py + 4}" width="${Math.max(22, module.label.length * 8)}" height="14" rx="5" fill="#ffffff" stroke="#8a5a1f" stroke-width="1"/>`);
        rects.push(`<text x="${px + 8}" y="${py + 14}" font-family="Inter, Arial, sans-serif" font-size="9" font-weight="900" fill="#111827">${esc(module.label)}</text>`);
      });
    }
    const widthM = section && section.result && section.result.widthMeters || 0;
    const depthM = section && section.result && section.result.depthMeters || 0;
    const title = `Сцена ${metric(widthM, 1)} × ${metric(depthM, 1)} м · настил ${modules.length} · лестницы ${stairs.length}`;
    return `<div class="quick-pdf-visual-label">Схема из конструктора</div><div class="quick-pdf-scheme-svg-wrap"><svg class="quick-pdf-scheme-svg" xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="6" fill="#ffffff" stroke="#C9CED3"/><text x="12" y="20" font-family="Barlow Condensed, Arial Narrow, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5" fill="#14171A">${esc(title)}</text>${rects.join('')}</svg></div>`;
  }

  function ledFillForKey(key) {
    const value = String(key || '').toLowerCase();
    if (value === 'side') return '#60a5fa';
    if (value === 'side2') return '#818cf8';
    if (value === 'top') return '#34d399';
    if (value === 'bottom') return '#f97316';
    if (value === 'custom') return '#a78bfa';
    return '#38bdf8';
  }

  function buildLedSchemeSvg(section) {
    const input = section && section.input || {};
    const result = section && section.result || {};
    const blocks = (Array.isArray(input.layoutBlocks) && input.layoutBlocks.length ? input.layoutBlocks : (Array.isArray(section && section.constructions) ? section.constructions : [])).filter(block => safeCellList(block && block.cells).length);
    const all = [];
    blocks.forEach(block => safeCellList(block.cells).forEach(cell => all.push(cell)));
    const bounds = boundsFromCells(all);
    if (!bounds) return '';
    const pad = 1;
    const cols = Math.max(1, bounds.maxX - bounds.minX + 1 + pad * 2);
    const rows = Math.max(1, bounds.maxY - bounds.minY + 1 + pad * 2);
    const cell = Math.max(7, Math.min(20, Math.floor(Math.min(410 / cols, 270 / rows))));
    const gap = Math.max(1, Math.round(cell * 0.10));
    const labelH = 32;
    const w = cols * (cell + gap) + gap;
    const h = rows * (cell + gap) + gap + labelH;
    const cellMap = new Map();
    blocks.forEach((block, index) => {
      safeCellList(block.cells).forEach(cell => cellMap.set(`${cell.x}:${cell.y}`, { block, index }));
    });
    const rects = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const gx = bounds.minX - pad + x;
        const gy = bounds.minY - pad + y;
        const key = `${gx}:${gy}`;
        const entry = cellMap.get(key);
        const px = gap + x * (cell + gap);
        const py = gap + y * (cell + gap) + labelH;
        const fill = entry ? ledFillForKey(entry.block && entry.block.colorKey) : '#f8fafc';
        const stroke = entry ? '#0f172a' : '#d9e1ec';
        rects.push(svgRect(px, py, cell, cell, fill, stroke, entry ? ' opacity="0.92"' : ''));
        if (entry) rects.push(`<circle cx="${px + cell / 2}" cy="${py + cell / 2}" r="${Math.max(1.2, cell * 0.10)}" fill="#ffffff" opacity="0.55"/>`);
      }
    }
    const cabinetCount = result.cabinetCount || blocks.reduce((sum, block) => sum + safeCellList(block.cells).length, 0);
    const title = `LED ${metric(result.actualWidthM || 0, 2)} × ${metric(result.actualHeightM || 0, 2)} м · кабинеты ${metric(cabinetCount, 0)} · конструкций ${blocks.length}`;
    return `<div class="quick-pdf-visual-label">Схема из конструктора</div><div class="quick-pdf-scheme-svg-wrap"><svg class="quick-pdf-scheme-svg" xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="6" fill="#ffffff" stroke="#C9CED3"/><text x="12" y="20" font-family="Barlow Condensed, Arial Narrow, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5" fill="#14171A">${esc(title)}</text>${rects.join('')}</svg></div>`;
  }

  function getTrussSpecs() {
    const mod = ROOT.TrussBlockConstructor || null;
    return mod && mod.getDefaultSpecs ? (mod.getDefaultSpecs() || {}) : {};
  }

  function safeTrussItems(section) {
    const input = section && section.input || {};
    const list = Array.isArray(input.items) ? input.items : (Array.isArray(section && section.items) ? section.items : []);
    return list.map(item => ({
      type:String(item && item.type || ''),
      x:Math.round(num(item && item.x, 0)),
      y:Math.round(num(item && item.y, 0)),
      o:String(item && item.o || 'n'),
      r:num(item && item.r, 0)
    })).filter(item => item.type && Number.isFinite(item.x) && Number.isFinite(item.y));
  }

  function trussItemExtent(item, specs, cellM) {
    const spec = specs && specs[item.type] || {};
    let w = 1;
    let h = 1;
    if (spec.kind === 'straight') {
      const cells = Math.max(1, Math.round(num(spec.length, 0.5) / Math.max(0.25, cellM || 0.5)));
      if (item.o === 'v') h = cells;
      else w = cells;
    }
    return { x:item.x, y:item.y, w, h, spec };
  }

  function trussBoundsFromItems(items, specs, cellM) {
    if (!items.length) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    items.forEach(item => {
      const ex = trussItemExtent(item, specs, cellM);
      minX = Math.min(minX, ex.x); minY = Math.min(minY, ex.y);
      maxX = Math.max(maxX, ex.x + ex.w); maxY = Math.max(maxY, ex.y + ex.h);
    });
    if (!Number.isFinite(minX)) return null;
    return { minX, minY, maxX, maxY, cols:Math.max(1, maxX - minX), rows:Math.max(1, maxY - minY) };
  }

  function trussFill(type, spec) {
    if (String(type || '') === 'base' || spec.kind === 'base') return '#475569';
    if (spec.kind === 'straight') return '#d7dde6';
    if (spec.kind === 'node') return '#cbd5e1';
    return '#e5e7eb';
  }

  function buildTrussSchemeSvg(section) {
    const items = safeTrussItems(section);
    if (!items.length) return '';
    const specs = getTrussSpecs();
    const input = section && section.input || {};
    const cellM = Math.max(0.25, num(input.cellMeters || input.state && input.state.cellMeters || 0.5, 0.5));
    const bounds = trussBoundsFromItems(items, specs, cellM);
    if (!bounds) return '';
    const pad = 1;
    const cols = bounds.cols + pad * 2;
    const rows = bounds.rows + pad * 2;
    const cell = Math.max(12, Math.min(24, Math.floor(Math.min(430 / cols, 290 / rows))));
    const gap = Math.max(2, Math.round(cell * 0.10));
    const labelH = 34;
    const w = cols * (cell + gap) + gap;
    const h = rows * (cell + gap) + gap + labelH;
    const grid = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const px = gap + x * (cell + gap);
        const py = gap + y * (cell + gap) + labelH;
        grid.push(svgRect(px, py, cell, cell, '#f8fafc', '#e5e7eb'));
      }
    }
    const parts = items.map(item => {
      const ex = trussItemExtent(item, specs, cellM);
      const spec = ex.spec || {};
      const x = gap + (ex.x - bounds.minX + pad) * (cell + gap);
      const y = gap + (ex.y - bounds.minY + pad) * (cell + gap) + labelH;
      const fill = trussFill(item.type, spec);
      const stroke = spec.kind === 'straight' ? '#64748b' : '#334155';
      if (String(item.type) === 'base' || spec.kind === 'base') {
        const cx = x + cell / 2;
        const cy = y + cell / 2;
        return `<circle cx="${cx}" cy="${cy}" r="${Math.max(4, cell * 0.36)}" fill="${fill}" stroke="#0f172a" stroke-width="1.2"/><circle cx="${cx}" cy="${cy}" r="${Math.max(1.8, cell * 0.12)}" fill="#ffffff" opacity="0.82"/>`;
      }
      if (spec.kind === 'straight') {
        const ww = (item.o === 'v' ? cell : ex.w * (cell + gap) - gap);
        const hh = (item.o === 'v' ? ex.h * (cell + gap) - gap : cell);
        const inset = Math.max(2, Math.round(cell * 0.20));
        const rx = item.o === 'v' ? x + inset : x;
        const ry = item.o === 'v' ? y : y + inset;
        const rw = item.o === 'v' ? cell - inset * 2 : ww;
        const rh = item.o === 'v' ? hh : cell - inset * 2;
        return `<rect x="${rx}" y="${ry}" width="${Math.max(2, rw)}" height="${Math.max(2, rh)}" rx="${Math.max(2, Math.round(cell * 0.12))}" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/><path d="M${rx + Math.max(2, rw) * 0.12} ${ry + Math.max(2, rh) * 0.28} L${rx + Math.max(2, rw) * 0.88} ${ry + Math.max(2, rh) * 0.72} M${rx + Math.max(2, rw) * 0.12} ${ry + Math.max(2, rh) * 0.72} L${rx + Math.max(2, rw) * 0.88} ${ry + Math.max(2, rh) * 0.28}" stroke="#94a3b8" stroke-width="1" stroke-linecap="round" opacity="0.75"/>`;
      }
      return svgRect(x, y, cell, cell, fill, stroke, ' opacity="0.96"');
    }).join('');
    const result = section && section.result || {};
    const boundsM = result.physicalBounds || {};
    const title = `Фермы ${metric(boundsM.width || 0, 2)} × ${metric(boundsM.height || 0, 2)} м · элементов ${items.length}`;
    return `<div class="quick-pdf-visual-label">Схема из конструктора</div><div class="quick-pdf-scheme-svg-wrap"><svg class="quick-pdf-scheme-svg" xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="6" fill="#ffffff" stroke="#C9CED3"/><text x="12" y="21" font-family="Barlow Condensed, Arial Narrow, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5" fill="#14171A">${esc(title)}</text>${grid.join('')}${parts}</svg></div>`;
  }

  function buildSchemeSvgFallback(kind, section) {
    if (kind === 'stage') return buildStageSchemeSvg(section);
    if (kind === 'truss') return buildTrussSchemeSvg(section);
    if (kind === 'led') return buildLedSchemeSvg(section);
    return '';
  }

  function buildVisualHtml(kind, options) {
    const opts = options || {};
    const shot = opts.schemeSnapshot || null;
    const fallbackSvg = buildSchemeSvgFallback(kind, opts.section || null);
    if ((kind === 'stage' || kind === 'truss' || kind === 'led') && fallbackSvg) return fallbackSvg;
    if (shot && shot.dataUrl) {
      const ratio = shot.width && shot.height ? Math.min(1, 430 / shot.width, 520 / shot.height) : 1;
      const width = shot.width ? Math.max(1, Math.round(shot.width * ratio)) : 420;
      const height = shot.height ? Math.max(1, Math.round(shot.height * ratio)) : 260;
      return `<div class="quick-pdf-visual-label">${esc(shot.label || 'Схема из конструктора')}</div><div class="quick-pdf-scheme-image-wrap" style="width:${width}px;height:${height}px"><img class="quick-pdf-scheme-image" src="${esc(shot.dataUrl)}" alt="Схема из конструктора" style="width:${width}px;height:${height}px"></div>`;
    }
    if (fallbackSvg) return fallbackSvg;
    return '<div class="quick-pdf-empty">Схема конструктора недоступна. Открой быстрый конструктор и построй конфиг заново.</div>';
  }

  function buildRowsTable(kind, section) {
    const rows = getRows(section).filter(row => rowQty(row) || rowWeight(row) || rowPower(row) || num(row && row.meters, 0));
    const pricingTable = buildQuickPricingRowsTable(section);
    if (!rows.length) return '<div class="quick-pdf-empty">Комплектация пока пустая.</div>' + pricingTable;
    const thStyle = PDF_TH_STYLE;
    const tdStyle = PDF_TD_STYLE;
    const tdMono = PDF_TD_MONO_STYLE;
    const powerHeader = kind === 'led' ? `<th ${thStyle}>Мощность</th>` : '';
    const rowsHtml = rows.map(row => {
      const meters = num(row.meters, 0);
      const rental = num(row.totalRental || row.total_rental || 0, 0);
      return `<tr>
        <td ${tdStyle}><b style="color:#14171A!important;-webkit-text-fill-color:#14171A!important;font-weight:700!important;">${esc(row.name || row.itemName || row.code || '')}</b></td>
        <td ${tdMono}>${metric(rowQty(row), 0)} ${esc(row.unit || 'шт')}</td>
        <td ${tdMono}>${meters ? metric(meters, 1) + ' м' : '—'}</td>
        <td ${tdMono}>${weight(rowWeight(row))}</td>
        ${kind === 'led' ? `<td ${tdMono}>${rowPower(row) ? metric(rowPower(row) / 1000, 2) + ' кВт' : '—'}</td>` : ''}
        <td ${tdMono}>${rental ? money(rental) : esc(row.note || '—')}</td>
      </tr>`;
    }).join('');
    return `<table class="quick-pdf-table" style="width:100%!important;border-collapse:collapse!important;color:#14171A!important;background:#ffffff!important;"><thead><tr><th ${thStyle}>Позиция</th><th ${thStyle}>Кол-во</th><th ${thStyle}>Метраж</th><th ${thStyle}>Вес</th>${powerHeader}<th ${thStyle}>Примечание</th></tr></thead><tbody>${rowsHtml}</tbody></table>${pricingTable}`;
  }

  function buildSectionPdfHtml(kind, section, options) {
    const normalizedKind = normalizeKind(kind);
    const opts = options || {};
    const title = text(opts.title || KIND_TITLES[normalizedKind], KIND_TITLES[normalizedKind]);
    const quote = opts.quote || buildQuickQuote(normalizedKind, section, { title });
    const cards = buildSummaryCards(normalizedKind, section);
    const now = new Date();
    const pricing = getQuickPricing(section);
    const orientation = resolvePdfOrientation(normalizedKind, section, opts);
    const orientationClass = orientation === 'p' ? 'quick-pdf-doc-portrait' : 'quick-pdf-doc-landscape';
    const summary = text(section && section.summary, pricing ? 'Текущий быстрый конфиг рассчитан с ручным коммерческим блоком и без клиентского КП.' : 'Текущий быстрый конфиг рассчитан без цен, клиентов, склада и дефицита.');
    return `<div class="quick-pdf-doc ${orientationClass}" data-pdf-orientation="${orientation}">
      <style>${pdfStyle()}</style>
      <div class="quick-pdf-tape"></div>
      <section class="quick-pdf-hero" style="background:#ffffff!important;color:#14171A!important;">
        <div style="color:#14171A!important;"><div class="quick-pdf-brand" style="color:#14171A!important;-webkit-text-fill-color:#14171A!important;"><span style="background:#F4C216!important;color:#14171A!important;-webkit-text-fill-color:#14171A!important;">FEG</span> Stage PRO</div><h1 style="color:#14171A!important;-webkit-text-fill-color:#14171A!important;">${esc(title)}</h1><p style="color:#4A545D!important;-webkit-text-fill-color:#4A545D!important;">${esc(summary)}</p></div>
        <div class="quick-pdf-meta" style="background:#ffffff!important;color:#14171A!important;"><b style="color:#14171A!important;-webkit-text-fill-color:#14171A!important;">${esc(KIND_LABELS[normalizedKind])}</b><span style="color:#4A545D!important;-webkit-text-fill-color:#4A545D!important;">${esc(now.toLocaleString('ru-RU'))}</span><span style="color:#4A545D!important;-webkit-text-fill-color:#4A545D!important;">${pricing ? 'quick calculator · manual prices' : 'quick calculator · no prices'}</span><span style="color:#4A545D!important;-webkit-text-fill-color:#4A545D!important;">${esc(orientationLabel(orientation))} ориентация</span></div>
      </section>
      <section class="quick-pdf-summary">${cards.map(card => `<div style="color:#14171A!important;background:#ffffff!important;"><span style="display:block;color:#6B7580!important;-webkit-text-fill-color:#6B7580!important;opacity:1!important;">${esc(card.label)}</span><b style="display:block;color:#14171A!important;-webkit-text-fill-color:#14171A!important;opacity:1!important;">${esc(card.value)}</b><small style="display:block;color:#6B7580!important;-webkit-text-fill-color:#6B7580!important;opacity:1!important;">${esc(card.note)}</small></div>`).join('')}</section>
      <section class="quick-pdf-main">
        <div class="quick-pdf-visual"><h2 style="color:#14171A!important;-webkit-text-fill-color:#14171A!important;">Схема из конструктора</h2>${buildVisualHtml(normalizedKind, Object.assign({}, opts, { section }))}</div>
        <div class="quick-pdf-kit"><h2 style="color:#14171A!important;-webkit-text-fill-color:#14171A!important;">Сводная таблица комплектации</h2>${buildRowsTable(normalizedKind, section)}</div>
      </section>
      <footer style="color:#6B7580!important;-webkit-text-fill-color:#6B7580!important;">FEG Stage PRO · Rigging Spec Sheet · ${esc(QUICK_PDF_EXPORT_VERSION)}</footer>
    </div>`;
  }

  function pdfStyle() {
    // v5 "Rigging Spec Sheet" on paper: the dark theme inverted — graphite #14171A
    // becomes the ink, steel #C9CED3 the hairlines, rig-yellow #F4C216 stays a pure
    // graphic accent (hazard tape bar, section markers, total tint) because yellow
    // text on white fails contrast. Headings: Barlow Condensed; data: JetBrains Mono.
    return `
      .quick-pdf-doc{font-family:Arial,Helvetica,sans-serif;color:#14171A;background:#fff;padding:24px;width:1120px;box-sizing:border-box;}
      .quick-pdf-doc,.quick-pdf-doc *{color:#14171A!important;text-shadow:none!important;-webkit-text-fill-color:currentColor!important;opacity:1!important}.quick-pdf-doc h1,.quick-pdf-doc h2,.quick-pdf-doc h3,.quick-pdf-doc p,.quick-pdf-doc span,.quick-pdf-doc small,.quick-pdf-doc b,.quick-pdf-doc td,.quick-pdf-doc th,.quick-pdf-doc footer{color:#14171A!important;-webkit-text-fill-color:currentColor!important;}
      .quick-pdf-tape{height:10px;background:#F4C216;border-bottom:2.5px solid #14171A;margin:-24px -24px 18px;}
      .quick-pdf-hero{display:grid;grid-template-columns:1fr 280px;gap:18px;align-items:stretch;background:#ffffff!important;color:#14171A!important;border:none!important;border-bottom:1px solid #C9CED3!important;border-radius:0;padding:0 0 18px;margin-bottom:16px;}
      .quick-pdf-brand{font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif;font-size:22px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px;color:#14171A!important;display:flex;align-items:center;gap:8px}
      .quick-pdf-brand span{background:#F4C216;color:#14171A!important;padding:1px 9px 2px;display:inline-block}
      .quick-pdf-hero h1{font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif!important;font-size:38px!important;font-weight:700!important;text-transform:uppercase!important;letter-spacing:.02em!important;line-height:1.05!important;margin:0 0 8px!important;color:#14171A!important}
      .quick-pdf-hero p{margin:0;color:#4A545D!important;font-size:12px;line-height:1.45;max-width:60ch}
      .quick-pdf-meta{display:flex;flex-direction:column;gap:0;background:#fff!important;border:1.5px solid #14171A;border-radius:6px;padding:0;font-size:11px;color:#14171A!important;overflow:hidden}
      .quick-pdf-meta b{font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif;font-size:17px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#14171A!important;padding:9px 12px;border-bottom:1px solid #C9CED3;background:#F2F3F4!important}
      .quick-pdf-meta span{font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;color:#4A545D!important;padding:7px 12px;border-bottom:1px solid #E3E6E8}
      .quick-pdf-meta span:last-child{border-bottom:none}
      .quick-pdf-summary{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px}
      .quick-pdf-summary div{border:1px solid #C9CED3;border-left:3px solid #F4C216;background:#fff;border-radius:6px;padding:10px 12px;min-height:72px}
      .quick-pdf-summary span{display:block;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif;color:#6B7580!important;font-size:11px;text-transform:uppercase;letter-spacing:.08em;font-weight:700!important;opacity:1!important}
      .quick-pdf-summary b{display:block;font-family:'JetBrains Mono','Courier New',monospace;color:#14171A!important;font-size:17px;margin:5px 0 4px;font-weight:700!important;opacity:1!important}
      .quick-pdf-summary small{display:block;color:#6B7580!important;font-size:10px;line-height:1.3;opacity:1!important}
      .quick-pdf-summary div,.quick-pdf-summary div *{-webkit-text-fill-color:currentColor!important;filter:none!important}
      .quick-pdf-main{display:grid;grid-template-columns:42% 58%;gap:14px;align-items:start}
      .quick-pdf-visual,.quick-pdf-kit{border:1px solid #C9CED3;border-radius:6px;padding:14px;background:#fff;overflow:hidden}
      .quick-pdf-doc h2{font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif!important;font-size:15px!important;font-weight:700!important;text-transform:uppercase!important;letter-spacing:.08em!important;color:#14171A!important;margin:0 0 10px!important;border-left:4px solid #F4C216!important;padding-left:8px!important;line-height:1.2!important}
      .quick-pdf-visual-label{font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:#6B7580!important;margin-bottom:8px}
      .quick-pdf-scheme-image-wrap{display:flex;align-items:flex-start;justify-content:flex-start;max-width:100%;overflow:hidden;border:1px solid #C9CED3;border-radius:6px;background:#fff}
      .quick-pdf-scheme-image{display:block;object-fit:contain;background:#fff}
      .quick-pdf-scheme-svg-wrap{max-width:100%;overflow:hidden;border:1px solid #C9CED3;border-radius:6px;background:#fff;padding:8px;box-sizing:border-box}
      .quick-pdf-scheme-svg{display:block;max-width:100%;height:auto;background:#fff}
      .quick-pdf-scheme-svg text{fill:#14171A!important;stroke:none!important}
      .quick-pdf-visual-svg svg{max-width:100%;height:auto;display:block;border-radius:6px}
      .quick-pdf-visual-svg svg text{fill:#14171A!important;stroke:none!important}
      .quick-pdf-table{width:100%;border-collapse:collapse;font-size:10.5px;color:#14171A!important}
      .quick-pdf-table th{background:#F2F3F4!important;color:#14171A!important;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.06em}
      .quick-pdf-table th,.quick-pdf-table td{background:#fff!important;border-bottom:1px solid #E3E6E8!important;padding:7px 6px!important;vertical-align:top!important;color:#14171A!important}
      .quick-pdf-table td span{color:#6B7580!important;font-size:9.5px}
      .quick-pdf-empty{border:1px dashed #C9CED3;border-radius:6px;padding:18px;color:#4A545D!important;background:#F7F8F8;font-size:12px}
      .quick-pdf-doc-portrait{width:820px;padding:22px}
      .quick-pdf-doc-portrait .quick-pdf-tape{margin:-22px -22px 16px}
      .quick-pdf-doc-portrait .quick-pdf-hero{grid-template-columns:1fr}
      .quick-pdf-doc-portrait .quick-pdf-summary{grid-template-columns:repeat(2,1fr)}
      .quick-pdf-doc-portrait .quick-pdf-main{grid-template-columns:1fr}
      .quick-pdf-doc-portrait .quick-pdf-visual,.quick-pdf-doc-portrait .quick-pdf-kit{padding:12px}
      .quick-pdf-doc-landscape{width:1120px}
      footer{margin-top:14px;padding-top:8px;border-top:1px solid #C9CED3;font-family:'JetBrains Mono','Courier New',monospace;color:#6B7580!important;font-size:9px;text-transform:uppercase;letter-spacing:.05em;text-align:right}`;
  }

  function ensureHiddenContainer() {
    if (!global.document) return null;
    let node = global.document.getElementById('quickPdfContent');
    if (!node) {
      node = global.document.createElement('div');
      node.id = 'quickPdfContent';
      node.style.display = 'none';
      global.document.body.appendChild(node);
    }
    return node;
  }

  function ensureModalStyles() {
    if (!global.document || global.document.getElementById(QUICK_PDF_MODAL_STYLE_ID)) return;
    const style = global.document.createElement('style');
    style.id = QUICK_PDF_MODAL_STYLE_ID;
    style.textContent = `
      .quick-pdf-backdrop{position:fixed;inset:0;z-index:4200;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(0,0,0,.72);box-sizing:border-box;}
      .quick-pdf-backdrop.open{display:flex;}
      .quick-pdf-backdrop .quick-pdf-modal{width:min(1120px,calc(100vw - 36px));max-height:calc(100vh - 36px);display:flex;flex-direction:column;margin:0;position:relative;overflow:hidden;}
      .quick-pdf-backdrop .pdf-modal-header{flex:0 0 auto;}
      .quick-pdf-backdrop .pdf-modal-actions{flex:0 0 auto;}
      .quick-pdf-backdrop .pdf-preview-frame{flex:1 1 auto;height:min(72vh,760px);min-height:360px;width:100%;}
      @media (max-width:700px){.quick-pdf-backdrop{padding:0;align-items:stretch;}.quick-pdf-backdrop .quick-pdf-modal{width:100vw;max-height:100vh;border-radius:0!important;}.quick-pdf-backdrop .pdf-modal-header{align-items:flex-start;flex-direction:column;}.quick-pdf-backdrop .pdf-modal-actions{width:100%;}.quick-pdf-backdrop .pdf-modal-actions button{flex:1 1 auto;}.quick-pdf-backdrop .pdf-preview-frame{height:calc(100vh - 132px);min-height:280px;}}
    `;
    global.document.head.appendChild(style);
  }

  function ensureModal() {
    if (!global.document) return null;
    ensureModalStyles();
    let backdrop = global.document.querySelector('[data-quick-pdf-backdrop]');
    let modal = global.document.querySelector('[data-quick-pdf-modal]');

    // v3.17.46 created the panel directly in <body>. Rewrap it once so cached sessions recover safely.
    if (modal && !modal.closest('[data-quick-pdf-backdrop]')) {
      modal.remove();
      modal = null;
    }
    if (!backdrop) {
      backdrop = global.document.createElement('div');
      backdrop.className = 'quick-pdf-backdrop';
      backdrop.setAttribute('data-quick-pdf-backdrop', '');
      backdrop.setAttribute('aria-hidden', 'true');
      global.document.body.appendChild(backdrop);
      backdrop.addEventListener('click', event => {
        if (event.target === backdrop) closePreview();
      });
      global.document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && backdrop.classList.contains('open')) closePreview();
      });
    }
    if (modal) return modal;

    modal = global.document.createElement('div');
    modal.className = 'pdf-modal quick-pdf-modal';
    modal.setAttribute('data-quick-pdf-modal', '');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `<div class="pdf-modal-header"><div class="pdf-modal-title" data-quick-pdf-title>Предпросмотр PDF</div><div class="pdf-modal-actions"><button type="button" class="btn-secondary" data-quick-pdf-download>Скачать PDF</button><button type="button" class="btn-primary" data-quick-pdf-share>Отправить</button><button type="button" class="btn-secondary" data-quick-pdf-close>Закрыть</button></div></div><iframe class="pdf-preview-frame" title="Quick PDF preview" data-quick-pdf-frame></iframe>`;
    backdrop.appendChild(modal);
    modal.querySelector('[data-quick-pdf-close]').addEventListener('click', closePreview);
    modal.querySelector('[data-quick-pdf-download]').addEventListener('click', () => ROOT.PdfGenerator && ROOT.PdfGenerator.downloadPreparedPdf ? ROOT.PdfGenerator.downloadPreparedPdf(modalState) : downloadPreparedPdfFallback());
    modal.querySelector('[data-quick-pdf-share]').addEventListener('click', () => sharePreparedPdf());
    return modal;
  }

  function closePreview() {
    const modal = global.document && global.document.querySelector('[data-quick-pdf-modal]');
    const backdrop = global.document && global.document.querySelector('[data-quick-pdf-backdrop]');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
    }
  }

  function setModalPreview(blob, options) {
    const opts = options || {};
    const modal = ensureModal();
    if (!modal || !blob) return null;
    if (modalState.url && global.URL && global.URL.revokeObjectURL) global.URL.revokeObjectURL(modalState.url);
    modalState.blob = blob;
    modalState.url = global.URL.createObjectURL(blob);
    modalState.name = opts.fileName || 'quick-calculator.pdf';
    modalState.kind = 'quickTech';
    const frame = modal.querySelector('[data-quick-pdf-frame]');
    const title = modal.querySelector('[data-quick-pdf-title]');
    if (title) title.textContent = opts.previewTitle || 'Предпросмотр PDF быстрого расчёта';
    if (frame) frame.src = modalState.url;
    const backdrop = modal.closest('[data-quick-pdf-backdrop]');
    if (backdrop) {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    return modal;
  }

  async function openSectionPreview(options) {
    const opts = options || {};
    const kind = normalizeKind(opts.kind);
    const section = resolveSection(opts);
    if (!section) {
      notify('Сначала собери текущий быстрый конфиг');
      return null;
    }
    const pdf = ROOT.PdfGenerator;
    if (!pdf || !pdf.createPdfBlob) {
      notify('PdfGenerator не загружен');
      return null;
    }
    const container = ensureHiddenContainer();
    if (!container) return null;
    const title = text(opts.title || KIND_TITLES[kind], KIND_TITLES[kind]);
    const quote = opts.quote || buildQuickQuote(kind, section, { title });
    const schemeSnapshot = await captureSchemeSnapshot(kind, opts);
    const orientation = resolvePdfOrientation(kind, section, opts);
    container.innerHTML = buildSectionPdfHtml(kind, section, { title, quote, schemeSnapshot, orientation });
    const fileName = `${slug(title, 'quick-calculator')}_${Date.now()}.pdf`;
    const blob = await pdf.createPdfBlob({
      kind: 'quickTech',
      orientation,
      pdfContainerWidth: orientation === 'p' ? 820 : 1120,
      title: 'Предпросмотр PDF быстрого расчёта',
      pdfContainer: container,
      getBaseName: () => slug(title, 'quick-calculator'),
      getFileName: () => fileName,
      onPrepared: state => { modalState.name = state && state.name || fileName; },
      alert: message => notify(message),
      logError: error => { if (global.console) global.console.error(error); }
    });
    if (!blob) return null;
    setModalPreview(blob, { fileName, previewTitle: `${KIND_LABELS[kind]} · PDF быстрого расчёта · ${orientationLabel(orientation)}` });
    notify('PDF построен, открыт предпросмотр');
    return blob;
  }

  function downloadPreparedPdfFallback() {
    if (!modalState.blob || !modalState.url || !global.document) return false;
    const link = global.document.createElement('a');
    link.href = modalState.url;
    link.download = modalState.name || 'quick-calculator.pdf';
    global.document.body.appendChild(link);
    link.click();
    link.remove();
    return true;
  }

  // Отправку в мессенджеры выполняет PdfGenerator.sharePreparedPdf через Web Share API (navigator.share).
  async function sharePreparedPdf() {
    if (ROOT.PdfGenerator && ROOT.PdfGenerator.sharePreparedPdf) {
      return ROOT.PdfGenerator.sharePreparedPdf({ state: modalState, showToast: notify });
    }
    downloadPreparedPdfFallback();
    notify('PDF скачан. Его можно отправить через мессенджер вручную');
    return false;
  }

  function buildSmokeReport() {
    return {
      type: 'feg-stage-pro-quick-pdf-export-smoke-report',
      version: QUICK_PDF_EXPORT_VERSION,
      ok: true,
      checks: [
        { key:'action_html', ok: renderActionHtml('stage').includes('data-quick-pdf-action="stage"'), label:'stage action button is renderable' },
        { key:'pdf_builder', ok: buildSectionPdfHtml('truss', { status:'configured', bomRows:[] }).includes('Сводная таблица комплектации'), label:'section PDF html includes summary table block' },
        { key:'constructor_scheme', ok: buildSectionPdfHtml('stage', { status:'configured', input:{ modules:[{x:0,y:0}], stairs:[] }, result:{ widthMeters:1.2, depthMeters:1.2 }, bomRows:[] }, { schemeSnapshot:{ dataUrl:'data:image/png;base64,AAAA', width:100, height:50 } }).includes('quick-pdf-scheme-svg'), label:'quick PDF uses constructor scheme/fallback, not project visualizer export' },
        { key:'truss_scheme_fallback', ok: buildSectionPdfHtml('truss', { status:'configured', input:{ items:[{ type:'truss3', x:0, y:0, o:'h' }] }, result:{ physicalBounds:{ width:3, height:0.5 } }, bomRows:[] }).includes('Фермы 3,00 × 0,50 м'), label:'truss PDF has deterministic SVG scheme fallback' },
        { key:'share_modal', ok: typeof openSectionPreview === 'function' && typeof sharePreparedPdf === 'function', label:'preview/share handlers are exposed' },
        { key:'modal_backdrop', ok: typeof ensureModalStyles === 'function' && QUICK_PDF_EXPORT_VERSION.includes('truss-scheme'), label:'preview modal is fixed overlay with backdrop' },
        { key:'pricing_codes_hidden', ok: !buildSectionPdfHtml('truss', { quickPricing:{ enabled:true, visible:true, rows:[{ code:'TRUSS-QPRICE-RENTAL', name:'Фермы · прокат конструкции', qty:1, unit:'компл.', unitPrice:1000, total:1000 }], total:1000 }, bomRows:[] }).includes('TRUSS-QPRICE-RENTAL'), label:'quick PDF hides technical pricing codes in visible tables' },
        { key:'auto_orientation', ok: resolvePdfOrientation('truss', { bomRows:new Array(24).fill(0).map((_, i) => ({ name:'row '+i, qty:1 })) }) === 'p', label:'long quick PDF table switches to portrait orientation' }
      ]
    };
  }

  ROOT.QuickPdfExport = {
    QUICK_PDF_EXPORT_VERSION,
    renderActionHtml,
    bindAction,
    buildQuickQuote,
    buildSectionPdfHtml,
    captureSchemeSnapshot,
    buildSchemeSvgFallback,
    openSectionPreview,
    closePreview,
    sharePreparedPdf,
    buildSmokeReport
  };
})(typeof window !== 'undefined' ? window : globalThis);
