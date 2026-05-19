// FEG Stage PRO v3.1.88 — Quick Stage/LED pricing + Truss install/delivery totals
// Keeps quick commercial values isolated from BOM/warehouse rows and guarded by role permissions.
(function () {
  'use strict';
  const GLOBAL = typeof window !== 'undefined' ? window : globalThis;
  const ROOT = (GLOBAL.FEGModules = GLOBAL.FEGModules || {});

  const VERSION = '3.17.53-quick-stage-led-truss-install-delivery-total';
  const DEFAULTS = Object.freeze({
    stage: { unitLabel: 'модуль сцены', unitShort: 'мод.', unitPrice: 850, installCost: 3500, deliveryCost: 4000, moduleRowName: 'Сцена · стоимость модулей', installName: 'Сцена · монтаж', deliveryName: 'Сцена · доставка', includeUnit:true, includeInstall:true, includeDelivery:true },
    led: { unitLabel: 'LED кабинет', unitShort: 'каб.', unitPrice: 800, installCost: 1500, deliveryCost: 2000, moduleRowName: 'LED · стоимость кабинетов', installName: 'LED · монтаж', deliveryName: 'LED · доставка', includeUnit:true, includeInstall:true, includeDelivery:true },
    truss: { unitLabel: 'ферменная конструкция', unitShort: 'компл.', unitPrice: 0, installCost: 3500, deliveryCost: 4000, moduleRowName: 'Фермы · стоимость конструкции', rentalName: 'Фермы · прокат конструкции', installName: 'Фермы · монтаж', deliveryName: 'Фермы · доставка', includeUnit:false, includeInstall:true, includeDelivery:true, includeRental:true }
  });

  function defaultsFor(kind) {
    return Object.assign({}, DEFAULTS[String(kind || '').toLowerCase()] || DEFAULTS.stage);
  }

  function number(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : Number(fallback || 0);
  }

  function money(value) {
    return `${Math.round(number(value, 0)).toLocaleString('ru-RU')} ₽`;
  }

  function pickNumber(source, keys, fallback) {
    const src = source || {};
    for (let i = 0; i < keys.length; i += 1) {
      if (Object.prototype.hasOwnProperty.call(src, keys[i])) return Math.max(0, number(src[keys[i]], fallback));
    }
    return Math.max(0, number(fallback, 0));
  }

  function authProfile(options) {
    const opts = options || {};
    if (opts.user) return Object.assign({ role: opts.role || opts.user.role || 'viewer' }, opts.user || {});
    if (opts.role && !(opts.authState && opts.authState.isAuthenticated === false)) return { role: opts.role };
    try {
      const auth = ROOT.AuthProvider && ROOT.AuthProvider.getAuthState ? ROOT.AuthProvider.getAuthState() : null;
      if (auth && auth.isAuthenticated === false) return null;
      if (auth && auth.user) return Object.assign({ role: auth.role || auth.user.role || 'viewer' }, auth.user);
      if (auth && auth.role) return { role: auth.role };
    } catch (_) {}
    return null;
  }

  function canView(options) {
    const opts = options || {};
    if (opts.showQuickPricing === true || opts.quickPricingVisible === true) return true;
    if (opts.showQuickPricing === false || opts.quickPricingVisible === false || opts.hideQuickPricing === true) return false;
    const profile = authProfile(opts);
    if (!profile) return true;
    if (ROOT.RolePermissions && ROOT.RolePermissions.hasUserPermission) {
      if (ROOT.RolePermissions.hasUserPermission(profile, '*')) return true;
      if (ROOT.RolePermissions.hasUserPermission(profile, 'quick_pricing:view')) return true;
      if (ROOT.RolePermissions.hasUserPermission(profile, 'prices:view')) return true;
      if (ROOT.RolePermissions.hasUserPermission(profile, 'prices:hidden')) return false;
    }
    const role = String(profile.role || '').toLowerCase();
    return role === 'admin' || role === 'manager' || role === 'director' || role === 'tech_director';
  }

  function normalize(kind, source, context, options) {
    const rawKind = String(kind || 'stage').toLowerCase();
    const key = rawKind === 'led' ? 'led' : (rawKind === 'truss' ? 'truss' : 'stage');
    const def = defaultsFor(key);
    const src = source && source.quickPricing && typeof source.quickPricing === 'object' ? source.quickPricing : (source || {});
    const ctx = context || {};
    const visible = canView(Object.assign({}, options || {}, { kind: key }));
    const unitQty = Math.max(0, number(ctx.unitQty != null ? ctx.unitQty : (ctx.qty != null ? ctx.qty : (src.unitQty != null ? src.unitQty : src.qty)), 0));
    if (!visible) {
      return {
        enabled: false,
        visible: false,
        kind: key,
        permission: 'quick_pricing:view',
        visibility: { permission: 'quick_pricing:view', hiddenForPermissions: ['prices:hidden'], uiOnly: true }
      };
    }
    const unitPrice = pickNumber(src, ['unitPrice', 'quickUnitPrice', 'modulePrice', 'quickModulePrice', 'pricePerModule', 'cabinetPrice', 'quickCabinetPrice'], def.unitPrice);
    const installCost = pickNumber(src, ['installCost', 'quickInstallCost', 'mountCost', 'montageCost', 'installationCost'], def.installCost);
    const deliveryCost = pickNumber(src, ['deliveryCost', 'quickDeliveryCost', 'transportCost', 'shippingCost'], def.deliveryCost);
    const includeUnit = def.includeUnit !== false;
    const includeInstall = def.includeInstall !== false;
    const includeDelivery = def.includeDelivery !== false;
    const includeRental = def.includeRental === true;
    const rentalTotal = includeRental ? Math.round(number(ctx.rentalTotal != null ? ctx.rentalTotal : (ctx.baseTotal != null ? ctx.baseTotal : (ctx.rental != null ? ctx.rental : 0)), 0)) : 0;
    const equipmentTotal = includeUnit ? Math.round(unitQty * unitPrice) : 0;
    const installTotal = includeInstall ? Math.round(installCost) : 0;
    const deliveryTotal = includeDelivery ? Math.round(deliveryCost) : 0;
    const total = Math.round(rentalTotal + equipmentTotal + installTotal + deliveryTotal);
    const visibility = { permission: 'quick_pricing:view', hiddenForPermissions: ['prices:hidden'], hideFromTechSheets: true, hideFromWarehouse: true, uiOnly: true };
    const rows = [];
    if (includeRental) rows.push({ code: `${key.toUpperCase()}-QPRICE-RENTAL`, name: def.rentalName || def.moduleRowName, qty: rentalTotal ? 1 : 0, unit: 'компл.', unitPrice: rentalTotal, total: rentalTotal, note: 'расчётный прокат из быстрого конструктора', commercial: true, calculated: true, sourceType: 'quick_calculated_rental', visibility });
    if (includeUnit) rows.push({ code: `${key.toUpperCase()}-QPRICE-UNIT`, name: def.moduleRowName, qty: unitQty, unit: def.unitShort, unitPrice, total: equipmentTotal, note: `${money(unitPrice)} × ${unitQty.toLocaleString('ru-RU')} ${def.unitShort}`, commercial: true, sourceType: 'quick_manual_price', visibility });
    if (includeInstall) rows.push({ code: `${key.toUpperCase()}-QPRICE-INSTALL`, name: def.installName, qty: installCost ? 1 : 0, unit: 'усл.', unitPrice: installCost, total: installCost, note: 'ручная стоимость монтажа', commercial: true, sourceType: 'quick_manual_price', visibility });
    if (includeDelivery) rows.push({ code: `${key.toUpperCase()}-QPRICE-DELIVERY`, name: def.deliveryName, qty: deliveryCost ? 1 : 0, unit: 'усл.', unitPrice: deliveryCost, total: deliveryCost, note: 'ручная стоимость доставки', commercial: true, sourceType: 'quick_manual_price', visibility });
    const summaryNote = key === 'truss' ? `прокат ${money(rentalTotal)} + монтаж ${money(installTotal)} + доставка ${money(deliveryTotal)}` : `${money(unitPrice)} × ${unitQty.toLocaleString('ru-RU')} ${def.unitShort} + монтаж/доставка`;
    return {
      enabled: true,
      visible: true,
      kind: key,
      currency: 'RUB',
      unitLabel: def.unitLabel,
      unitShort: def.unitShort,
      unitQty,
      unitPrice,
      installCost:installTotal,
      deliveryCost:deliveryTotal,
      rentalTotal,
      equipmentTotal,
      total,
      summaryNote,
      rows,
      totals: { rental: rentalTotal, equipment: equipmentTotal, install: installTotal, delivery: deliveryTotal, total },
      permission: 'quick_pricing:view',
      visibility
    };
  }

  function augmentSection(section, kind, source, context, options) {
    const target = section || {};
    const pricing = normalize(kind, source, context, options);
    target.quickPricing = pricing;
    if (pricing.visible) {
      target.pricing = Object.assign({}, target.pricing || {}, { quick: pricing, currency: pricing.currency, total: pricing.total, rentalTotal: pricing.rentalTotal, equipmentTotal: pricing.equipmentTotal, installCost: pricing.installCost, deliveryCost: pricing.deliveryCost });
      target.commercialRows = pricing.rows.slice();
      target.commercialTotals = Object.assign({}, pricing.totals);
    }
    return target;
  }

  function fieldsFromPricing(kind, source, options) {
    const pricing = normalize(kind, source || {}, { qty: 0 }, options || {});
    if (!pricing.visible) return { visible: false };
    return {
      visible: true,
      unitPrice: pricing.unitPrice,
      installCost: pricing.installCost,
      deliveryCost: pricing.deliveryCost,
      unitLabel: pricing.unitLabel,
      unitShort: pricing.unitShort
    };
  }

  ROOT.QuickPricing = { VERSION, DEFAULTS, defaultsFor, canView, normalize, augmentSection, fieldsFromPricing, money };
})();
