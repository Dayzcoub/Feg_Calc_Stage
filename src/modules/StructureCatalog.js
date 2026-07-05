// FEG Stage PRO — StructureCatalog
// Extracted from V4StructureConfigurator: shared parts/alias tables and the
// catalog / system-part / EquipmentDatabase glue that both the stage and truss
// configs build on. Loaded before the V4StructureConfigurator facade.
(function () {
  'use strict';
  const GLOBAL = typeof window !== 'undefined' ? window : globalThis;
  const ROOT = (GLOBAL.FEGModules = GLOBAL.FEGModules || {});

  const STRUCTURE_CONFIG_VERSION = '3.17.44';
  const STRUCTURE_PARTS_MIGRATION_KEY = 'fegV4StructurePartsCatalogVersion';
  const TRUSS_STRAIGHT_TYPE_ORDER = Object.freeze(['truss3','truss25','truss2','truss15','truss1','truss05']);
  const TRUSS_COMPATIBILITY_VERSION = '3.17.43';
  const TRUSS_DEFAULT_COMPATIBILITY_GROUP = 'T29Q-C2-BOX-290';
  const TRUSS_DEFAULT_INTERFACE = 'C2';
  const TRUSS_STRAIGHT_LENGTHS = Object.freeze({ truss3:3, truss25:2.5, truss2:2, truss15:1.5, truss1:1, truss05:0.5 });
  const STRUCTURE_PART_ALIASES = Object.freeze({
    truss3: Object.freeze({ ids:['eq-truss-3m'], codes:['TRS-001'], legacy:['TR-3.0','TR-3M','TRUSS-3M'] }),
    truss25: Object.freeze({ ids:['eq-truss-25m'], codes:['TRS-008'], legacy:['TR-2.5','TR-2.5M','TRUSS-2.5M'] }),
    truss2: Object.freeze({ ids:['eq-truss-2m'], codes:['TRS-002'], legacy:['TR-2.0','TR-2M','TRUSS-2M'] }),
    truss15: Object.freeze({ ids:['eq-truss-15m'], codes:['TRS-007'], legacy:['TR-1.5','TR-1.5M','TRUSS-1.5M'] }),
    truss1: Object.freeze({ ids:['eq-truss-1m'], codes:['TRS-006'], legacy:['TR-1.0','TR-1M','TRUSS-1M'] }),
    truss05: Object.freeze({ ids:['eq-truss-05m'], codes:['TRS-005'], legacy:['TR-0.5','TR-0.5M','TRUSS-0.5M'] }),
    cornerU003: Object.freeze({ ids:['eq-truss-corner-90'], codes:['TRS-009'], legacy:['TR-CORNER-90','U003'] }),
    cornerU022: Object.freeze({ ids:['eq-truss-cube'], codes:['TRS-010'], legacy:['TR-CUBE','U022'] }),
    base: Object.freeze({ ids:['eq-truss-base'], codes:['TRS-011'], legacy:['TR-BASE'] }),
    c288: Object.freeze({ ids:['eq-c288'], codes:['TRS-003'], legacy:['C2-88'] }),
    c383: Object.freeze({ ids:['eq-c383'], codes:['TRS-004'], legacy:['C3-83'] }),
    c267: Object.freeze({ ids:['eq-c267'], codes:['TRS-012'], legacy:['C2-67'] }),
    cotter: Object.freeze({ ids:['eq-splint'], codes:['TRS-013'], legacy:['C2-2-48','SPLINT'] })
  });

  const STAGE_PARTS = Object.freeze([
    { key:'stage_deck_1200', id:'eq_sys_stage_deck_1200', code:'STG-901', name:'Imlight Copy · модуль / лист настила 1.2×1.2 м', category:'stage', subcategory:'настил', type:'stage_deck', unit:'шт', weightKg:18, meta:{ deckWidthM:1.2, deckDepthM:1.2, stageVariant:'deck_1200' }, notes:'Системная позиция v4: размер настила задаёт физический шаг сетки сцены.' },
    { key:'stage_support_middle', id:'eq_sys_stage_support', code:'STG-902', name:'Imlight Copy · столб / опора средняя', category:'stage', subcategory:'опоры', type:'stage_support', unit:'шт', weightKg:2.6, meta:{ stageSupportType:'middle', legacyWeightKey:'column_middle' }, notes:'Системная позиция v4: считается по вершинам выбранных модулей сцены.' },
    { key:'stage_frame_low', id:'eq_sys_stage_frame_crossbar', code:'STG-903', name:'Imlight Copy · перекладина / рама низкая', category:'stage', subcategory:'рамы', type:'stage_part', unit:'шт', weightKg:3.5, meta:{ stageFrameType:'low', legacyWeightKey:'frame_low' }, notes:'Системная позиция v4: считается по рёбрам модульной схемы сцены.' },
    { key:'stage_support_low', id:'eq_sys_stage_support_low', code:'STG-904', name:'Imlight Copy · столб / опора низкая', category:'stage', subcategory:'опоры', type:'stage_support', unit:'шт', weightKg:0.6, meta:{ stageSupportType:'low', legacyWeightKey:'column_low' }, notes:'Перенесено из v3: разновидность столба сцены.' },
    { key:'stage_support_high', id:'eq_sys_stage_support_high', code:'STG-905', name:'Imlight Copy · столб / опора высокая', category:'stage', subcategory:'опоры', type:'stage_support', unit:'шт', weightKg:4.8, meta:{ stageSupportType:'high', legacyWeightKey:'column_high' }, notes:'Перенесено из v3: разновидность столба сцены.' },
    { key:'stage_frame_high', id:'eq_sys_stage_frame_high', code:'STG-906', name:'Imlight Copy · перекладина / рама средняя', category:'stage', subcategory:'рамы', type:'stage_part', unit:'шт', weightKg:5, meta:{ stageFrameType:'middle', legacyWeightKey:'frame_high', legacyFrameKey:'stage_frame_high' }, notes:'Перенесено из v3: средняя перекладина сцены для средних и высоких столбов.' },
    { key:'stage_stud', id:'eq_sys_stage_stud', code:'STG-907', name:'Imlight Copy · шпилька регулировочная опоры', category:'stage', subcategory:'крепёж', type:'stage_part', unit:'шт', weightKg:1.5, meta:{ legacyWeightKey:'stud' }, notes:'Перенесено из v3: по одной шпильке на каждую опору/столб.' },
    { key:'stage_foot', id:'eq_sys_stage_foot', code:'STG-908', name:'Imlight Copy · пятка опорная под столб', category:'stage', subcategory:'опоры', type:'stage_part', unit:'шт', weightKg:0, meta:{ stagePart:'foot', weightNeedsRealValue:true }, notes:'Перенесено из v3: по одной пятке на каждую опору. Вес оставлен 0 до заполнения реального складского веса.' },
    { key:'stage_stair', id:'eq_sys_stage_stair', code:'STG-909', name:'Лестница сценическая', category:'stage', subcategory:'лестницы', type:'stage_accessory', unit:'шт', weightKg:0, meta:{ stagePart:'stair', weightNeedsRealValue:true }, notes:'Системная позиция v4: размещается отдельным блоком на плане сцены. Вес добивается в базе оборудования.' },
    { key:'stage_edge_skirt', id:'eq_sys_stage_edge_skirt', code:'STG-910', name:'Закрытие торцов сцены · тканевая юбка', category:'stage', subcategory:'закрытие торцов', type:'stage_accessory', unit:'м.п.', weightKg:0, meta:{ stagePart:'edge_closure', edgeClosureType:'fabric_skirt', weightNeedsRealValue:true }, notes:'Системная позиция v4: считается по открытому периметру выбранных настилов.' },
    { key:'stage_edge_raus_banner', id:'eq_sys_stage_edge_raus_banner', code:'STG-911', name:'Закрытие торцов сцены · раус с баннером', category:'stage', subcategory:'закрытие торцов', type:'stage_accessory', unit:'м.п.', weightKg:0, meta:{ stagePart:'edge_closure', edgeClosureType:'raus_banner', weightNeedsRealValue:true }, notes:'Системная позиция v4: считается по открытому периметру выбранных настилов.' },
    { key:'pkc_ps_deck_2000_1000', id:'eq_sys_pkc_ps_deck_2000_1000', code:'SS-PS-2000/1000-F-C', name:'PKC ШИП-ПАЗ · модуль поверхности 2000×1000 мм', manufacturer:'PKC.BY', model:'SS-PS-2000/1000-F-C', category:'stage', subcategory:'настил PKC', type:'stage_deck', unit:'шт', weightKg:35, meta:{ stagePart:'deck', stageSystemKey:'pkc_ship_paz', deckWidthM:2.0, deckDepthM:1.0, pkcSystem:'PS', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'PKC: модуль системы ШИП-ПАЗ с освобождённым углом. Расчётная нагрузка по каталогу для 2000×1000: 750 кг/м².' },
    { key:'pkc_ps_deck_1500_1000', id:'eq_sys_pkc_ps_deck_1500_1000', code:'SS-PS-1500/1000-F-C', name:'PKC ШИП-ПАЗ · модуль поверхности 1500×1000 мм', manufacturer:'PKC.BY', model:'SS-PS-1500/1000-F-C', category:'stage', subcategory:'настил PKC', type:'stage_deck', unit:'шт', weightKg:28, meta:{ stagePart:'deck', stageSystemKey:'pkc_ship_paz', deckWidthM:1.5, deckDepthM:1.0, pkcSystem:'PS', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'PKC: модуль системы ШИП-ПАЗ.' },
    { key:'pkc_ps_deck_1000_1000', id:'eq_sys_pkc_ps_deck_1000_1000', code:'SS-PS-1000/1000-F-C', name:'PKC ШИП-ПАЗ · модуль поверхности 1000×1000 мм', manufacturer:'PKC.BY', model:'SS-PS-1000/1000-F-C', category:'stage', subcategory:'настил PKC', type:'stage_deck', unit:'шт', weightKg:20, meta:{ stagePart:'deck', stageSystemKey:'pkc_ship_paz', deckWidthM:1.0, deckDepthM:1.0, pkcSystem:'PS', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'PKC: модуль системы ШИП-ПАЗ.' },
    { key:'pkc_pp_deck_2000_1000', id:'eq_sys_pkc_pp_deck_2000_1000', code:'SS-PP-2000/1000-F-C', name:'PKC ПАЗ-ПАЗ · модуль поверхности 2000×1000 мм', manufacturer:'PKC.BY', model:'SS-PP-2000/1000-F-C', category:'stage', subcategory:'настил PKC', type:'stage_deck', unit:'шт', weightKg:35, meta:{ stagePart:'deck', stageSystemKey:'pkc_paz_paz', deckWidthM:2.0, deckDepthM:1.0, pkcSystem:'PP', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'PKC: модуль системы ПАЗ-ПАЗ. Для расчёта нужны T/X-соединители и струбцины.' },
    { key:'pkc_pp_deck_1500_1000', id:'eq_sys_pkc_pp_deck_1500_1000', code:'SS-PP-1500/1000-F-C', name:'PKC ПАЗ-ПАЗ · модуль поверхности 1500×1000 мм', manufacturer:'PKC.BY', model:'SS-PP-1500/1000-F-C', category:'stage', subcategory:'настил PKC', type:'stage_deck', unit:'шт', weightKg:28, meta:{ stagePart:'deck', stageSystemKey:'pkc_paz_paz', deckWidthM:1.5, deckDepthM:1.0, pkcSystem:'PP', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'PKC: модуль системы ПАЗ-ПАЗ.' },
    { key:'pkc_pp_deck_1000_1000', id:'eq_sys_pkc_pp_deck_1000_1000', code:'SS-PP-1000/1000-F-C', name:'PKC ПАЗ-ПАЗ · модуль поверхности 1000×1000 мм', manufacturer:'PKC.BY', model:'SS-PP-1000/1000-F-C', category:'stage', subcategory:'настил PKC', type:'stage_deck', unit:'шт', weightKg:20, meta:{ stagePart:'deck', stageSystemKey:'pkc_paz_paz', deckWidthM:1.0, deckDepthM:1.0, pkcSystem:'PP', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'PKC: модуль системы ПАЗ-ПАЗ.' },
    { key:'pkc_leg_vm', id:'eq_sys_pkc_leg_vm', code:'SO-1-VM-XXXX', name:'PKC · нога на винтовой опоре SO-1-VM', manufacturer:'PKC.BY', model:'SO-1-VM', category:'stage', subcategory:'опоры PKC', type:'stage_support', unit:'шт', weightKg:3, meta:{ stagePart:'support', stageSystemKey:'pkc_ship_paz', pkcLegType:'VM', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'Нога PKC комплектации №1: втулка-адаптер + опорное кольцо, для ШИП-ПАЗ.' },
    { key:'pkc_leg_tv', id:'eq_sys_pkc_leg_tv', code:'SO-1-TV-XXXX', name:'PKC · телескопическая нога SO-1-TV', manufacturer:'PKC.BY', model:'SO-1-TV', category:'stage', subcategory:'опоры PKC', type:'stage_support', unit:'шт', weightKg:3.4, meta:{ stagePart:'support', stageSystemKey:'pkc_ship_paz', pkcLegType:'TV', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'Телескопическая нога PKC комплектации №1, для ШИП-ПАЗ.' },
    { key:'pkc_pp_leg_vm', id:'eq_sys_pkc_pp_leg_vm', code:'SO-2-VM-XXXX', name:'PKC · нога на винтовой опоре SO-2-VM', manufacturer:'PKC.BY', model:'SO-2-VM', category:'stage', subcategory:'опоры PKC', type:'stage_support', unit:'шт', weightKg:2.8, meta:{ stagePart:'support', stageSystemKey:'pkc_paz_paz', pkcLegType:'VM', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'Нога PKC комплектации №2: втулка-адаптер, для ПАЗ-ПАЗ.' },
    { key:'pkc_pp_leg_tv', id:'eq_sys_pkc_pp_leg_tv', code:'SO-2-TV-XXXX', name:'PKC · телескопическая нога SO-2-TV', manufacturer:'PKC.BY', model:'SO-2-TV', category:'stage', subcategory:'опоры PKC', type:'stage_support', unit:'шт', weightKg:3.2, meta:{ stagePart:'support', stageSystemKey:'pkc_paz_paz', pkcLegType:'TV', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'Телескопическая нога PKC комплектации №2, для ПАЗ-ПАЗ.' },
    { key:'pkc_lm_t', id:'eq_sys_pkc_lm_t', code:'SD-LM-T', name:'PKC · T-образный соединитель модулей', manufacturer:'PKC.BY', model:'SD-LM-T', category:'stage', subcategory:'соединители PKC', type:'stage_connector', unit:'шт', weightKg:0.2, meta:{ stagePart:'pkc_t_connector', stageSystemKey:'pkc_paz_paz', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'Для ПАЗ-ПАЗ/ГИБРИД: минимум 2 шт. на каждый стык двух модулей.' },
    { key:'pkc_lm_x', id:'eq_sys_pkc_lm_x', code:'SD-LM-X', name:'PKC · X-образный соединитель модулей', manufacturer:'PKC.BY', model:'SD-LM-X', category:'stage', subcategory:'соединители PKC', type:'stage_connector', unit:'шт', weightKg:0.25, meta:{ stagePart:'pkc_x_connector', stageSystemKey:'pkc_paz_paz', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'Для ПАЗ-ПАЗ/ГИБРИД: ставится в точках соединения четырёх модулей.' },
    { key:'pkc_lm_ss', id:'eq_sys_pkc_lm_ss', code:'SD-LM-SS', name:'PKC · струбцина соединения модулей', manufacturer:'PKC.BY', model:'SD-LM-SS', category:'stage', subcategory:'соединители PKC', type:'stage_connector', unit:'шт', weightKg:0.35, meta:{ stagePart:'pkc_clamp', stageSystemKey:'pkc_paz_paz', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'Для ПАЗ-ПАЗ/ГИБРИД: 1 шт. на грань 390–1000 мм, 2 шт. на грань 1500/2000 мм.' },
    { key:'pkc_vs_1', id:'eq_sys_pkc_vs_1', code:'SD-VS-1', name:'PKC · вставка свободного замка ноги', manufacturer:'PKC.BY', model:'SD-VS-1', category:'stage', subcategory:'соединители PKC', type:'stage_accessory', unit:'шт', weightKg:0.2, meta:{ stagePart:'pkc_free_leg_lock', catalogSource:'OLD_Podimy_PKC_2019' }, notes:'Справочная позиция: нужна в угловых точках без ног при креплении кронштейнов перил/оборудования.' }
  ]);

  const TRUSS_PARTS = Object.freeze([
    { key:'truss3', id:'eq_sys_truss_3m', code:'TRS-901', name:'MDM T29Q ферма прямая 3.0 м', manufacturer:'МДМ-Технология', model:'TQ29x29V300CXV', category:'truss', subcategory:'прямые фермы', type:'truss_segment', unit:'шт', weightKg:17.9, rentalPrice:1500, replacementCost:0, notes:'МДМ-Технология T29 вид Q: квадратная ферма 290×290 мм, соединительная система C2, длина 3000 мм. Внутренние названия: ферма 3 м, прямая 3 м, палка 3 м, секция 3 м.', meta:{ trussSpecType:'truss3', trussLengthM:3, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', mdmSectionMm:'290x290', internalAliases:['ферма 3 м','прямая 3 м','палка 3 м','секция 3 м','траверса 3 м'], catalogNote:'аренда 500 ₽/м.п.' } },
    { key:'truss25', id:'eq_sys_truss_25m', code:'TRS-902', name:'MDM T29Q ферма прямая 2.5 м', manufacturer:'МДМ-Технология', model:'TQ29x29V250CXV', category:'truss', subcategory:'прямые фермы', type:'truss_segment', unit:'шт', weightKg:15, rentalPrice:1250, replacementCost:0, notes:'МДМ-Технология T29 вид Q: квадратная ферма 290×290 мм, соединительная система C2, длина 2500 мм. Внутренние названия: ферма 2.5 м, прямая 2.5 м, палка 2.5 м, секция 2.5 м.', meta:{ trussSpecType:'truss25', trussLengthM:2.5, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', mdmSectionMm:'290x290', internalAliases:['ферма 2.5 м','ферма 2,5 м','прямая 2.5 м','палка 2.5 м','секция 2.5 м'], catalogNote:'аренда 500 ₽/м.п.' } },
    { key:'truss2', id:'eq_sys_truss_2m', code:'TRS-903', name:'MDM T29Q ферма прямая 2.0 м', manufacturer:'МДМ-Технология', model:'TQ29x29V200CXV', category:'truss', subcategory:'прямые фермы', type:'truss_segment', unit:'шт', weightKg:12.4, rentalPrice:1000, replacementCost:0, notes:'МДМ-Технология T29 вид Q: квадратная ферма 290×290 мм, соединительная система C2, длина 2000 мм. Внутренние названия: ферма 2 м, прямая 2 м, палка 2 м, секция 2 м.', meta:{ trussSpecType:'truss2', trussLengthM:2, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', mdmSectionMm:'290x290', internalAliases:['ферма 2 м','прямая 2 м','палка 2 м','секция 2 м','траверса 2 м'], catalogNote:'аренда 500 ₽/м.п.' } },
    { key:'truss15', id:'eq_sys_truss_15m', code:'TRS-904', name:'MDM T29Q ферма прямая 1.5 м', manufacturer:'МДМ-Технология', model:'TQ29x29V150CXV', category:'truss', subcategory:'прямые фермы', type:'truss_segment', unit:'шт', weightKg:10, rentalPrice:750, replacementCost:0, notes:'МДМ-Технология T29 вид Q: квадратная ферма 290×290 мм, соединительная система C2, длина 1500 мм. Внутренние названия: ферма 1.5 м, прямая 1.5 м, палка 1.5 м, секция 1.5 м.', meta:{ trussSpecType:'truss15', trussLengthM:1.5, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', mdmSectionMm:'290x290', internalAliases:['ферма 1.5 м','ферма 1,5 м','прямая 1.5 м','палка 1.5 м','секция 1.5 м'], catalogNote:'аренда 500 ₽/м.п.' } },
    { key:'truss1', id:'eq_sys_truss_1m', code:'TRS-905', name:'MDM T29Q ферма прямая 1.0 м', manufacturer:'МДМ-Технология', model:'TQ29x29V100CXV', category:'truss', subcategory:'прямые фермы', type:'truss_segment', unit:'шт', weightKg:7, rentalPrice:500, replacementCost:0, notes:'МДМ-Технология T29 вид Q: квадратная ферма 290×290 мм, соединительная система C2, длина 1000 мм. Внутренние названия: ферма 1 м, прямая 1 м, палка 1 м, секция 1 м.', meta:{ trussSpecType:'truss1', trussLengthM:1, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', mdmSectionMm:'290x290', internalAliases:['ферма 1 м','прямая 1 м','палка 1 м','секция 1 м','метровка'], catalogNote:'аренда 500 ₽/м.п.' } },
    { key:'truss05', id:'eq_sys_truss_05m', code:'TRS-906', name:'MDM T29Q ферма прямая 0.5 м', manufacturer:'МДМ-Технология', model:'TQ29x29V50CXV', category:'truss', subcategory:'прямые фермы', type:'truss_segment', unit:'шт', weightKg:4.4, rentalPrice:250, replacementCost:0, notes:'МДМ-Технология T29 вид Q: квадратная ферма 290×290 мм, соединительная система C2, длина 500 мм. Внутренние названия: ферма 0.5 м, прямая 0.5 м, палка 0.5 м, секция 0.5 м, полметровка.', meta:{ trussSpecType:'truss05', trussLengthM:0.5, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', mdmSectionMm:'290x290', internalAliases:['ферма 0.5 м','ферма 0,5 м','прямая 0.5 м','палка 0.5 м','секция 0.5 м','полметровка'], catalogNote:'аренда 500 ₽/м.п.' } },
    { key:'cornerU003', id:'eq_sys_truss_u003', code:'TRS-911', name:'MDM T29Q U003 угол 90°', manufacturer:'МДМ-Технология', model:'U003 T29Q C2', category:'truss', subcategory:'углы', type:'truss_node', unit:'шт', weightKg:5.2, rentalPrice:500, replacementCost:0, notes:'Угловой блок MDM серии T29 вид Q, 90°, 2 направления, соединение C2. Внутренние названия: угол, уголок, элька, колено.', meta:{ trussSpecType:'cornerU003', legacyCode:'U003', legacyCodes:['U003','TR-CORNER-90'], trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['угол','угол 90','уголок','элька','колено','U003'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'cornerU017', id:'eq_sys_truss_u017', code:'TRS-912', name:'MDM T29Q U017 Т-узел 90°', manufacturer:'МДМ-Технология', model:'U017 T29Q C2', category:'truss', subcategory:'углы', type:'truss_node', unit:'шт', weightKg:8.1, rentalPrice:500, replacementCost:0, notes:'Т-образный угловой блок MDM серии T29 вид Q, 3 направления, соединение C2. Внутренние названия: тэшка, тройник, Т-узел.', meta:{ trussSpecType:'cornerU017', legacyCode:'U017', legacyCodes:['U017'], dimensionsMm:{ x:710, y:500, z:500 }, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['тэшка','тройник','Т-узел','Т-образный угол','U017'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'cornerU016', id:'eq_sys_truss_u016', code:'TRS-913', name:'MDM T29Q U016 крест 90°', manufacturer:'МДМ-Технология', model:'U016 T29Q C2', category:'truss', subcategory:'углы', type:'truss_node', unit:'шт', weightKg:10, rentalPrice:500, replacementCost:0, notes:'Крестовой угловой блок MDM серии T29 вид Q, 4 направления, соединение C2. Внутренние названия: крест, крестовина.', meta:{ trussSpecType:'cornerU016', legacyCode:'U016', legacyCodes:['U016'], dimensionsMm:{ x:710, y:710, z:290 }, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['крест','крестовина','крестовой узел','U016'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'cornerU001', id:'eq_sys_truss_u001', code:'TRS-914', name:'MDM T29Q U001 угол 45°', manufacturer:'МДМ-Технология', model:'U001 T29Q C2', category:'truss', subcategory:'углы', type:'truss_node', unit:'шт', weightKg:9.7, rentalPrice:500, replacementCost:0, notes:'Угловой блок MDM серии T29 вид Q, 45°, соединение C2. Внутренние названия: угол 45, колено 45.', meta:{ trussSpecType:'cornerU001', legacyCode:'U001', legacyCodes:['U001'], trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['угол 45','уголок 45','колено 45','U001'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'cornerU002', id:'eq_sys_truss_u002', code:'TRS-915', name:'MDM T29Q U002 угол 60°', manufacturer:'МДМ-Технология', model:'U002 T29Q C2', category:'truss', subcategory:'углы', type:'truss_node', unit:'шт', weightKg:9.87, rentalPrice:500, replacementCost:0, notes:'Угловой блок MDM серии T29 вид Q, 60°, соединение C2. Внутренние названия: угол 60, колено 60.', meta:{ trussSpecType:'cornerU002', legacyCode:'U002', legacyCodes:['U002'], trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['угол 60','уголок 60','колено 60','U002'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'cornerU004', id:'eq_sys_truss_u004', code:'TRS-916', name:'MDM T29Q U004 угол 120°', manufacturer:'МДМ-Технология', model:'U004 T29Q C2', category:'truss', subcategory:'углы', type:'truss_node', unit:'шт', weightKg:6.12, rentalPrice:500, replacementCost:0, notes:'Угловой блок MDM серии T29 вид Q, 120°, соединение C2. Внутренние названия: угол 120, колено 120.', meta:{ trussSpecType:'cornerU004', legacyCode:'U004', legacyCodes:['U004'], trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['угол 120','уголок 120','колено 120','U004'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'cornerU005', id:'eq_sys_truss_u005', code:'TRS-917', name:'MDM T29Q U005 угол 135°', manufacturer:'МДМ-Технология', model:'U005 T29Q C2', category:'truss', subcategory:'углы', type:'truss_node', unit:'шт', weightKg:6.5, rentalPrice:500, replacementCost:0, notes:'Угловой блок MDM серии T29 вид Q, 135°, соединение C2. Внутренние названия: угол 135, колено 135.', meta:{ trussSpecType:'cornerU005', legacyCode:'U005', legacyCodes:['U005'], trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['угол 135','уголок 135','колено 135','U005'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'cornerU012', id:'eq_sys_truss_u012', code:'TRS-918', name:'MDM T29Q U012 3D-угол 90°', manufacturer:'МДМ-Технология', model:'U012 T29Q C2', category:'truss', subcategory:'кубы', type:'truss_node', unit:'шт', weightKg:7.2, rentalPrice:500, replacementCost:0, notes:'Объёмный угловой блок MDM серии T29 вид Q, 3 направления, соединение C2. Внутренние названия: 3D угол, трёхлучевой узел.', meta:{ trussSpecType:'cornerU012', legacyCode:'U012', legacyCodes:['U012'], dimensionsMm:{ x:500, y:500, z:500 }, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['3D угол','трёхлучевой узел','трехлучевой узел','U012'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'cornerU020', id:'eq_sys_truss_u020', code:'TRS-919', name:'MDM T29Q U020 3D-узел 4 направления', manufacturer:'МДМ-Технология', model:'U020 T29Q C2', category:'truss', subcategory:'кубы', type:'truss_node', unit:'шт', weightKg:10, rentalPrice:500, replacementCost:0, notes:'Объёмный угловой блок MDM серии T29 вид Q, 4 направления, соединение C2. Внутренние названия: 3D крест, четырёхлучевой узел.', meta:{ trussSpecType:'cornerU020', legacyCode:'U020', legacyCodes:['U020'], dimensionsMm:{ x:710, y:500, z:500 }, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['3D крест','четырёхлучевой узел','четырехлучевой узел','U020'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'cornerU022', id:'eq_sys_truss_u022', code:'TRS-920', name:'MDM T29Q U022 куб 90° · 6 направлений', manufacturer:'МДМ-Технология', model:'U022 T29Q C2', category:'truss', subcategory:'кубы', type:'truss_node', unit:'шт', weightKg:13.8, rentalPrice:500, replacementCost:0, notes:'Кубовый узел MDM серии T29 вид Q, 6 направлений, соединение C2. Внутренние названия: куб, кубик, центральный узел.', meta:{ trussSpecType:'cornerU022', legacyCode:'U022', legacyCodes:['U022','TR-CUBE'], dimensionsMm:{ x:710, y:710, z:710 }, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['куб','кубик','центральный узел','U022'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'cornerU024', id:'eq_sys_truss_u024', code:'TRS-921', name:'MDM T29Q U024 3D-узел 5 направлений', manufacturer:'МДМ-Технология', model:'U024 T29Q C2', category:'truss', subcategory:'кубы', type:'truss_node', unit:'шт', weightKg:12.1, rentalPrice:500, replacementCost:0, notes:'Объёмный угловой блок MDM серии T29 вид Q, 5 направлений, соединение C2. Внутренние названия: пятилучевой узел, 3D узел 5 направлений.', meta:{ trussSpecType:'cornerU024', legacyCode:'U024', legacyCodes:['U024'], dimensionsMm:{ x:710, y:710, z:500 }, trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['пятилучевой узел','3D узел 5 направлений','U024'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'base', id:'eq_sys_truss_base', code:'TRS-930', name:'MDM T29Q база / блин 29 кг', manufacturer:'МДМ-Технология', model:'C2-290-Q / рабочая база 29 кг', category:'truss', subcategory:'базы/блины', type:'truss_base', unit:'шт', weightKg:29, rentalPrice:500, replacementCost:0, notes:'Опорная база под ферму T29Q. Рабочая масса базы в каталоге FEG: 29 кг. Внутренние названия: база, блин, плита, опорная площадка, пятка.', meta:{ trussSpecType:'base', legacyCode:'TR-BASE', legacyCodes:['TR-BASE','BASE','BLIN'], trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, mdmSeries:'T29 вид Q', internalAliases:['база','блин','плита','опорная площадка','пятка','base'], catalogNote:'аренда 500 ₽/блок' } },
    { key:'c288', id:'eq_sys_truss_c288', code:'TRS-940', name:'MDM C2-88 коннектор / бабышка', manufacturer:'МДМ-Технология', model:'C2-88', category:'truss', subcategory:'коннекторы', type:'truss_connector', unit:'шт', weightKg:0.16, rentalPrice:0, replacementCost:0, notes:'Конусный коннектор MDM C2-88 для соединения ферм T29/T39/T52. Внутренние названия: бабышка, конус, коннектор, вставка. Цена аренды 0 ₽ — включено в стоимость ферм/узлов.', meta:{ trussSpecType:'c288', legacyCode:'C2-88', legacyCodes:['C2-88'], trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, internalAliases:['бабышка','конус','коннектор','конусный коннектор','вставка','C2-88'], includedInRental:true, catalogNote:'без отдельной цены, включено в фермы/узлы' } },
    { key:'c383', id:'eq_sys_truss_c383', code:'TRS-941', name:'MDM C3-83 полуконнектор / полубабышка', manufacturer:'МДМ-Технология', model:'C3-83', category:'truss', subcategory:'коннекторы', type:'truss_connector', unit:'шт', weightKg:0.27, rentalPrice:0, replacementCost:0, notes:'Полуконнектор конусный MDM C3-83. Внутренние названия: полубабышка, полуконус, полуконнектор. Цена аренды 0 ₽ — включено в стоимость ферм/узлов.', meta:{ trussSpecType:'c383', legacyCode:'C3-83', legacyCodes:['C3-83'], trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, internalAliases:['полубабышка','полуконус','полуконнектор','C3-83'], includedInRental:true, catalogNote:'без отдельной цены, включено в фермы/узлы' } },
    { key:'c267', id:'eq_sys_truss_c267', code:'TRS-942', name:'MDM палец C2 / пин', manufacturer:'МДМ-Технология', model:'C2-16-72 / C2-67', category:'truss', subcategory:'крепёж', type:'truss_connector', unit:'шт', weightKg:0.1, rentalPrice:0, replacementCost:0, notes:'Стальной палец C2 с отверстием под шплинт. Внутренние названия: палец, пин, штырь. Цена аренды 0 ₽ — включено в стоимость ферм/узлов.', meta:{ trussSpecType:'c267', legacyCode:'C2-67', legacyCodes:['C2-67','C2-16-72','PIN'], trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, internalAliases:['палец','пин','штырь','палец C2','C2-67','C2-16-72'], includedInRental:true, catalogNote:'без отдельной цены, включено в фермы/узлы' } },
    { key:'cotter', id:'eq_sys_truss_cotter', code:'TRS-943', name:'MDM C2-2-48 шплинт игольчатый', manufacturer:'МДМ-Технология', model:'C2-2-48', category:'truss', subcategory:'крепёж', type:'truss_connector', unit:'шт', weightKg:0.003, rentalPrice:0, replacementCost:0, notes:'Игольчатый шплинт MDM C2-2-48. Внутренние названия: шплинт, иголка, чека, фиксатор. Цена аренды 0 ₽ — включено в стоимость ферм/узлов.', meta:{ trussSpecType:'cotter', legacyCode:'C2-2-48', legacyCodes:['C2-2-48','SPLINT'], trussFamily:'T29Q', trussCompatibilityGroup:TRUSS_DEFAULT_COMPATIBILITY_GROUP, trussInterface:TRUSS_DEFAULT_INTERFACE, internalAliases:['шплинт','иголка','чека','фиксатор','пружинка','C2-2-48'], includedInRental:true, catalogNote:'без отдельной цены, включено в фермы/узлы' } }
  ]);

  function clone(value) { try { return JSON.parse(JSON.stringify(value)); } catch (_) { return value; } }
  function nowIso() { return new Date().toISOString(); }
  function toNumber(value, fallback) { const n = Number(value); return Number.isFinite(n) ? n : Number(fallback || 0); }
  function toText(value) { return String(value == null ? '' : value).trim(); }
  function partDefs() { return STAGE_PARTS.concat(TRUSS_PARTS).map(clone); }
  function trussDefByKey(key) { return TRUSS_PARTS.find(def => def && def.key === key) || null; }
  function isStraightTrussPartKey(key) { return Object.prototype.hasOwnProperty.call(TRUSS_STRAIGHT_LENGTHS, String(key || '')); }
  function trussPartCompatibilityMeta(def) {
    const d = def || {};
    if (d.category !== 'truss') return {};
    const meta = d.meta || {};
    const partKey = meta.trussSpecType || d.key || '';
    const straight = isStraightTrussPartKey(partKey);
    return {
      trussFamily: meta.trussFamily || 'T29Q',
      trussCompatibilityGroup: meta.trussCompatibilityGroup || TRUSS_DEFAULT_COMPATIBILITY_GROUP,
      trussInterface: meta.trussInterface || TRUSS_DEFAULT_INTERFACE,
      trussSpecType: partKey,
      trussPartKey: partKey,
      trussCompatible: true,
      trussCompatibilityVersion: TRUSS_COMPATIBILITY_VERSION,
      trussLengthM: straight ? toNumber(meta.trussLengthM || TRUSS_STRAIGHT_LENGTHS[partKey], 0) : toNumber(meta.trussLengthM, 0) || undefined
    };
  }
  function isQuickCatalogMode(input, overrides) {
    const src = input || {};
    const ov = overrides || {};
    const explicit = toText(ov.catalogMode || ov.sourceMode || src.catalogMode || src.sourceMode).toLowerCase();
    if (explicit === 'quick' || explicit === 'quick_ideal' || explicit === 'ideal') return true;
    if (explicit === 'quote' || explicit === 'inventory' || explicit === 'warehouse' || explicit === 'real') return false;
    const source = toText(ov.source || src.source).toLowerCase();
    return /(^|[-_.:])quick($|[-_.:])|quick-/.test(source) || source.includes('quick_');
  }
  function getCatalogMode(input, overrides) { return isQuickCatalogMode(input, overrides) ? 'quick' : 'quote'; }
  function decoratePartForQuick(part, sectionKey) {
    const src = part || {};
    const key = src.key || (src.meta && src.meta.systemPartKey) || src.id || 'part';
    return Object.assign({}, src, {
      id: `quick_ideal_${key}`,
      itemId: `quick_ideal_${key}`,
      item_id: `quick_ideal_${key}`,
      inventoryItemId: '',
      inventory_item_id: '',
      code: src.code ? `Q-${src.code}` : `Q-${String(key).toUpperCase()}`,
      manufacturer: src.manufacturer || 'FEG',
      sourceType: 'quick_ideal',
      source_type: 'quick_ideal',
      sourceSystem: 'quick_ideal_catalog',
      source_system: 'quick_ideal_catalog',
      stockQty: null,
      stock_qty: null,
      reservedQty: null,
      reserved_qty: null,
      availableQty: null,
      available_qty: null,
      meta: Object.assign({}, trussPartCompatibilityMeta(src), clone(src.meta || {}) || {}, {
        systemPart:true,
        systemPartKey:key,
        quickIdealCatalog:true,
        catalogMode:'quick',
        sectionType: sectionKey || src.category || '',
        structureConfiguratorVersion:STRUCTURE_CONFIG_VERSION
      })
    });
  }
  function getQuickIdealItems(sectionKey) {
    if (ROOT.QuickIdealCatalog && ROOT.QuickIdealCatalog.getItemsForSection) {
      try {
        return ROOT.QuickIdealCatalog.getItemsForSection(sectionKey || 'structure', { structureParts:partDefs() });
      } catch (_) {}
    }
    const key = String(sectionKey || '').toLowerCase();
    return partDefs()
      .filter(def => key === 'stage' ? def.category === 'stage' : key === 'truss' ? def.category === 'truss' : true)
      .map(def => decoratePartForQuick(def, key));
  }
  function getCatalogItems(input, overrides, sectionKey) {
    const src = input || {};
    const ov = overrides || {};
    if (getCatalogMode(src, ov) === 'quick') return getQuickIdealItems(sectionKey);
    if (Array.isArray(ov.equipmentItems)) return ov.equipmentItems;
    if (Array.isArray(src.equipmentItems)) return src.equipmentItems;
    return getStoredEquipmentItems();
  }
  function getCatalogContext(input, overrides, sectionKey) {
    const catalogMode = getCatalogMode(input || {}, overrides || {});
    return {
      catalogMode,
      sectionKey: sectionKey || '',
      equipmentItems: getCatalogItems(input || {}, overrides || {}, sectionKey),
      sourceType: catalogMode === 'quick' ? 'quick_ideal' : 'own',
      source_type: catalogMode === 'quick' ? 'quick_ideal' : 'own',
      sourceSystem: catalogMode === 'quick' ? 'quick_ideal_catalog' : 'equipment_database_system_part',
      source_system: catalogMode === 'quick' ? 'quick_ideal_catalog' : 'equipment_database_system_part'
    };
  }
  function addCatalogMeta(row, ctx) {
    const out = Object.assign({}, row || {});
    const c = ctx || {};
    if (c.catalogMode) out.catalogMode = c.catalogMode;
    if (c.sourceType) { out.sourceType = c.sourceType; out.source_type = c.sourceType; }
    if (c.sourceSystem) { out.sourceSystem = c.sourceSystem; out.source_system = c.sourceSystem; }
    out.meta = Object.assign({}, clone(out.meta || {}) || {}, { catalogMode: c.catalogMode || '', quickIdealCatalog: c.catalogMode === 'quick' });
    return out;
  }
  function partToItem(part) {
    return Object.assign({
      sourceType:'own', manufacturer:'FEG', model:'', stockQty:0, reservedQty:0, availableQty:0,
      weightKg:0, powerW:0, rentalPrice:0, replacementCost:0, isActive:true,
      createdAt:nowIso(), updatedAt:nowIso()
    }, part, { meta:Object.assign({ systemPart:true, systemPartKey:part.key, structureConfiguratorVersion:STRUCTURE_CONFIG_VERSION }, trussPartCompatibilityMeta(part), part.meta || {}) });
  }
  function normalizeWithDb(item) { return ROOT.EquipmentDatabase && ROOT.EquipmentDatabase.normalizeItem ? ROOT.EquipmentDatabase.normalizeItem(item) : item; }
  function getStoredEquipmentItems() { return ROOT.EquipmentDatabase && ROOT.EquipmentDatabase.getStoredItemsOrDemo ? ROOT.EquipmentDatabase.getStoredItemsOrDemo() : []; }
  function normalizeAliasToken(value) { return toText(value).toLowerCase().replace(/[ё]/g, 'е').replace(/[^a-zа-я0-9]+/gi, '').trim(); }
  function legacyTokens(item) {
    const meta = item && item.meta || {};
    const codes = [];
    if (meta.legacyCode) codes.push(meta.legacyCode);
    if (Array.isArray(meta.legacyCodes)) meta.legacyCodes.forEach(code => codes.push(code));
    // trussSpecType is a compatibility attribute, not a primary binding alias.
    if (meta.systemPartKey) codes.push(meta.systemPartKey);
    return codes.map(normalizeAliasToken).filter(Boolean);
  }
  function aliasList(def, prop) {
    const aliases = STRUCTURE_PART_ALIASES[def && def.key] || {};
    return Array.isArray(aliases[prop]) ? aliases[prop] : [];
  }
  function catalogCandidateScore(def, item) {
    if (!def || !item) return 0;
    const meta = item.meta || {};
    let score = 0;
    if (meta.systemPartKey === def.key) score = Math.max(score, 1000);
    if (item.id === def.id) score = Math.max(score, 950);
    if (aliasList(def, 'ids').includes(item.id)) score = Math.max(score, 900);
    if (item.code === def.code) score = Math.max(score, 850);
    if (aliasList(def, 'codes').includes(item.code)) score = Math.max(score, 800);
    const tokens = new Set(legacyTokens(item));
    const defLegacy = [def.key, def.meta && def.meta.legacyCode].concat(def.meta && def.meta.legacyCodes || [], aliasList(def, 'legacy')).map(normalizeAliasToken).filter(Boolean);
    if (defLegacy.some(token => tokens.has(token))) score = Math.max(score, 760);
    // Do not treat trussSpecType alone as a duplicate system-part binding: it is also used by compatible alternative inventory positions.
    return score;
  }
  function findSystemPartCandidates(def, items) {
    const list = Array.isArray(items) ? items : getStoredEquipmentItems();
    return list
      .map((item, index) => ({ item, index, score: catalogCandidateScore(def, item) }))
      .filter(row => row.item && row.score > 0)
      .sort((a, b) => {
        const aStock = toNumber(a.item.stockQty, 0) + toNumber(a.item.reservedQty, 0) + toNumber(a.item.availableQty, 0);
        const bStock = toNumber(b.item.stockQty, 0) + toNumber(b.item.reservedQty, 0) + toNumber(b.item.availableQty, 0);
        const aHasStock = aStock > 0 ? 1 : 0;
        const bHasStock = bStock > 0 ? 1 : 0;
        if (aHasStock !== bHasStock) return bHasStock - aHasStock;
        if (a.score !== b.score) return b.score - a.score;
        return a.index - b.index;
      });
  }
  function mergeSystemPart(def, existing) {
    const base = existing || {};
    const merged = Object.assign({}, def, base, {
      category: def.category,
      subcategory: def.subcategory,
      type: def.type,
      code: def.code,
      name: def.name,
      manufacturer: def.category === 'truss' ? (def.manufacturer || 'МДМ-Технология') : (base.manufacturer || def.manufacturer || 'FEG'),
      model: def.category === 'truss' ? (def.model || base.model || '') : (base.model || def.model || ''),
      unit: base.unit || def.unit,
      stockQty: Math.max(0, toNumber(base.stockQty, 0)),
      reservedQty: Math.max(0, toNumber(base.reservedQty, 0)),
      weightKg: def.category === 'truss' ? toNumber(def.weightKg, toNumber(base.weightKg, 0)) : (toNumber(base.weightKg, 0) || toNumber(def.weightKg, 0)),
      powerW: def.category === 'truss' ? toNumber(def.powerW, 0) : (toNumber(base.powerW, 0) || toNumber(def.powerW, 0)),
      rentalPrice: def.category === 'truss' ? toNumber(def.rentalPrice, 0) : (toNumber(base.rentalPrice, 0) || toNumber(def.rentalPrice, 0)),
      replacementCost: def.category === 'truss' ? toNumber(def.replacementCost, toNumber(base.replacementCost, 0)) : (toNumber(base.replacementCost, 0) || toNumber(def.replacementCost, 0)),
      sourceType: base.sourceType || 'own',
      isActive: base.isActive !== false,
      notes: def.category === 'truss'
        ? [def.notes, base.notes && !String(base.notes).includes(def.notes || '') ? `legacy note: ${base.notes}` : '', 'systemPart: используется сметным ферменным конструктором для складской проверки и совместимых замен.'].filter(Boolean).join(' ')
        : [base.notes, def.notes, 'FEG systemPart: используется сметным конструктором ферм/сцены для складской проверки.'].filter(Boolean).join(' '),
      meta: Object.assign({}, def.meta || {}, trussPartCompatibilityMeta(def), base.meta || {}, {
        systemPart:true,
        systemPartKey:def.key,
        structureConfiguratorVersion:STRUCTURE_CONFIG_VERSION,
        migratedAliasFrom: base.id && base.id !== def.id ? base.id : (base.meta && base.meta.migratedAliasFrom || '')
      }),
      updatedAt: nowIso()
    });
    return normalizeWithDb(merged);
  }
  function findSystemPart(key, items) {
    const list = Array.isArray(items) ? items : getStoredEquipmentItems();
    const def = partDefs().find(row => row.key === key || row.id === key);
    if (!def) return list.find(item => item && item.meta && item.meta.systemPartKey === key) || list.find(item => item && item.id === key) || null;
    const candidates = findSystemPartCandidates(def, list);
    return candidates.length ? candidates[0].item : null;
  }
  function getSystemPartMap(items) {
    const list = Array.isArray(items) ? items : getStoredEquipmentItems();
    return partDefs().reduce((map, def) => {
      const stored = findSystemPart(def.key, list) || partToItem(def);
      map[def.key] = normalizeWithDb(stored);
      return map;
    }, {});
  }
  function inferTrussPartKey(item) {
    const src = item || {};
    const meta = src.meta || {};
    const explicit = toText(meta.systemPartKey || meta.trussPartKey || meta.trussSpecType);
    if (trussDefByKey(explicit)) return explicit;
    const byId = TRUSS_PARTS.find(def => def.id === src.id || aliasList(def, 'ids').includes(src.id));
    if (byId) return byId.key;
    const byCode = TRUSS_PARTS.find(def => def.code === src.code || aliasList(def, 'codes').includes(src.code));
    if (byCode) return byCode.key;
    const tokens = new Set(legacyTokens(src));
    const byLegacy = TRUSS_PARTS.find(def => [def.key, def.meta && def.meta.legacyCode].concat(def.meta && def.meta.legacyCodes || [], aliasList(def, 'legacy')).map(normalizeAliasToken).filter(Boolean).some(token => tokens.has(token)));
    if (byLegacy) return byLegacy.key;
    const length = toNumber(meta.trussLengthM == null ? meta.truss_length_m : meta.trussLengthM, 0);
    const byLength = Object.keys(TRUSS_STRAIGHT_LENGTHS).find(key => Math.abs(TRUSS_STRAIGHT_LENGTHS[key] - length) < 0.001);
    if (byLength) return byLength;
    const nameToken = normalizeAliasToken([src.name, src.model, src.code].filter(Boolean).join(' '));
    if (/05|0?5|0m5/.test(nameToken) && /ферм|truss|t29|q29/.test(nameToken)) return 'truss05';
    if (/25|2m5|2 5/.test(nameToken) && /ферм|truss|t29|q29/.test(nameToken)) return 'truss25';
    if (/3м|3m|3000|truss3|ферма3/.test(nameToken)) return 'truss3';
    if (/2м|2m|2000|truss2|ферма2/.test(nameToken)) return 'truss2';
    if (/15|1m5|1500|ферма15/.test(nameToken)) return 'truss15';
    if (/1м|1m|1000|truss1|ферма1/.test(nameToken)) return 'truss1';
    return '';
  }
  function enrichTrussCompatibilityItem(item) {
    if (!item || item.category !== 'truss') return item;
    const partKey = inferTrussPartKey(item);
    const def = trussDefByKey(partKey);
    if (!def) return item;
    const meta = Object.assign({}, trussPartCompatibilityMeta(def), item.meta || {}, {
      trussCompatibilityVersion: TRUSS_COMPATIBILITY_VERSION,
      trussCompatible: true,
      trussPartKey: partKey,
      trussSpecType: (item.meta && item.meta.trussSpecType) || partKey
    });
    if (isStraightTrussPartKey(partKey)) meta.trussLengthM = toNumber(meta.trussLengthM || TRUSS_STRAIGHT_LENGTHS[partKey], TRUSS_STRAIGHT_LENGTHS[partKey]);
    return normalizeWithDb(Object.assign({}, item, { meta, updatedAt: item.updatedAt || nowIso() }));
  }
  function ensureTrussCompatibilityMetadata(items) {
    return (Array.isArray(items) ? items : []).map(enrichTrussCompatibilityItem);
  }
  function pruneTrussCatalogItems(items) {
    const removed = [];
    const source = Array.isArray(items) ? items : [];
    const allowedKeys = new Set(TRUSS_PARTS.map(def => def && def.key).filter(Boolean));
    const next = source.filter(item => {
      if (!item || item.category !== 'truss') return true;
      const partKey = inferTrussPartKey(item);
      const keep = !!partKey && allowedKeys.has(partKey);
      if (!keep) removed.push(item.id || item.code || item.name || 'unknown-truss-item');
      return keep;
    });
    return { items:next, removed };
  }
  function itemAvailableQty(item) { return Math.max(0, toNumber(item && (item.availableQty == null ? item.stockQty : item.availableQty), 0)); }
  function itemReservedQty(item) { return Math.max(0, toNumber(item && item.reservedQty, 0)); }
  function itemStockQty(item) { return Math.max(0, toNumber(item && item.stockQty, 0)); }
  function itemCompatGroup(item) { return toText(item && item.meta && item.meta.trussCompatibilityGroup) || ''; }
  function itemTrussPartKey(item) { return inferTrussPartKey(item); }
  function trussCompatibleCandidates(partKey, items, options) {
    const def = trussDefByKey(partKey);
    if (!def) return [];
    const meta = trussPartCompatibilityMeta(def);
    const list = ensureTrussCompatibilityMetadata(Array.isArray(items) ? items : getStoredEquipmentItems());
    const requireStock = !(options && options.includeEmpty);
    return list
      .filter(item => item && item.category === 'truss' && item.isActive !== false)
      .filter(item => itemTrussPartKey(item) === partKey)
      .filter(item => !meta.trussCompatibilityGroup || itemCompatGroup(item) === meta.trussCompatibilityGroup)
      .filter(item => !requireStock || itemAvailableQty(item) > 0)
      .sort((a, b) => {
        const aPrimary = a.meta && a.meta.systemPartKey === partKey ? 1 : 0;
        const bPrimary = b.meta && b.meta.systemPartKey === partKey ? 1 : 0;
        if (aPrimary !== bPrimary) return bPrimary - aPrimary;
        const av = itemAvailableQty(a);
        const bv = itemAvailableQty(b);
        if (av !== bv) return bv - av;
        return String(a.code || a.id || '').localeCompare(String(b.code || b.id || ''), 'ru');
      });
  }
  function cloneStockPool(items) {
    const pool = new Map();
    ensureTrussCompatibilityMetadata(Array.isArray(items) ? items : []).forEach(item => {
      if (!item || item.category !== 'truss') return;
      pool.set(item.id, { item, available: itemAvailableQty(item), used: 0 });
    });
    return pool;
  }
  function poolCandidatesForPart(pool, partKey) {
    const def = trussDefByKey(partKey);
    if (!def) return [];
    const group = trussPartCompatibilityMeta(def).trussCompatibilityGroup;
    return Array.from(pool.values())
      .filter(entry => entry && entry.item && entry.available > 0)
      .filter(entry => itemTrussPartKey(entry.item) === partKey && itemCompatGroup(entry.item) === group)
      .sort((a, b) => {
        const ap = a.item.meta && a.item.meta.systemPartKey === partKey ? 1 : 0;
        const bp = b.item.meta && b.item.meta.systemPartKey === partKey ? 1 : 0;
        if (ap !== bp) return bp - ap;
        if (a.available !== b.available) return b.available - a.available;
        return String(a.item.code || '').localeCompare(String(b.item.code || ''), 'ru');
      });
  }
  function consumePool(pool, partKey, qty) {
    let need = Math.max(0, Math.round(toNumber(qty, 0)));
    const allocations = [];
    poolCandidatesForPart(pool, partKey).forEach(entry => {
      if (need <= 0) return;
      const take = Math.min(need, entry.available);
      if (take <= 0) return;
      entry.available -= take;
      entry.used += take;
      need -= take;
      allocations.push({ item: entry.item, qty: take, partKey });
    });
    return { allocations, remaining: need };
  }
  function ensureSystemParts(items) {
    const db = ROOT.EquipmentDatabase;
    const list = db && db.normalizeItems ? db.normalizeItems(items || getStoredEquipmentItems()) : (Array.isArray(items) ? items.slice() : []);
    const added = [];
    const updated = [];
    const removed = [];
    let next = list.slice();
    partDefs().forEach(def => {
      const candidates = findSystemPartCandidates(def, next);
      if (!candidates.length) {
        next.push(normalizeWithDb(partToItem(def)));
        added.push(def.key);
        return;
      }
      const keeper = candidates[0];
      const merged = mergeSystemPart(def, keeper.item);
      next = next.filter((item, index) => {
        const duplicate = candidates.slice(1).some(row => row.index === index || row.item === item || (row.item && item && row.item.id === item.id));
        if (duplicate) removed.push(item && item.id || def.key);
        return !duplicate;
      });
      const idx = next.findIndex(item => item === keeper.item || item && keeper.item && item.id === keeper.item.id);
      if (idx >= 0) next[idx] = merged;
      else next.push(merged);
      const changed = JSON.stringify(keeper.item || {}) !== JSON.stringify(merged || {});
      if (changed || candidates.length > 1) updated.push(def.key);
    });
    const beforeCompat = JSON.stringify(next);
    next = ensureTrussCompatibilityMetadata(next);
    const compatibilityUpdated = beforeCompat !== JSON.stringify(next);
    if (compatibilityUpdated) updated.push('trussCompatibilityGroups');
    const beforePruneCount = next.length;
    const pruned = pruneTrussCatalogItems(next);
    next = pruned.items;
    if (pruned.removed.length) removed.push(...pruned.removed);
    const prunedChanged = beforePruneCount !== next.length;
    if (prunedChanged) updated.push('trussCatalogPrunedToConstructorParts');
    return { changed: added.length > 0 || updated.length > 0 || removed.length > 0 || compatibilityUpdated || prunedChanged, added, updated, removed, items: next };
  }
  function ensureStoredSystemParts() {
    if (!ROOT.EquipmentDatabase || !ROOT.EquipmentDatabase.saveItems) return { changed:false, added:[], updated:[], items:[] };
    try {
      const result = ensureSystemParts(ROOT.EquipmentDatabase.getStoredItemsOrDemo());
      if (result.changed) {
        ROOT.EquipmentDatabase.saveItems(result.items);
        if (GLOBAL.localStorage) GLOBAL.localStorage.setItem(STRUCTURE_PARTS_MIGRATION_KEY, STRUCTURE_CONFIG_VERSION);
      }
      return result;
    } catch (err) { return { changed:false, added:[], updated:[], error: err && err.message || String(err) }; }
  }

  function makeBomRow(part, qty, note, extra) {
    const q = Math.max(0, toNumber(qty, 0));
    const ext = extra || {};
    const weight = q * toNumber(part && part.weightKg, 0);
    const unitRentalPrice = toNumber(ext && ext.rentalPrice != null ? ext.rentalPrice : (part && part.rentalPrice), 0);
    const resolvedSourceType = toText(ext.sourceType || ext.source_type || part && (part.sourceType || part.source_type) || 'own') || 'own';
    const resolvedSourceSystem = toText(ext.sourceSystem || ext.source_system || part && (part.sourceSystem || part.source_system)) || (resolvedSourceType === 'quick_ideal' ? 'quick_ideal_catalog' : 'equipment_database_system_part');
    return Object.assign({
      id: part && part.id,
      itemId: part && part.id,
      item_id: part && part.id,
      inventoryItemId: resolvedSourceType === 'quick_ideal' ? '' : (part && part.id),
      inventory_item_id: resolvedSourceType === 'quick_ideal' ? '' : (part && part.id),
      code: part && part.code,
      name: part && part.name,
      category: part && part.category,
      type: part && part.type,
      qty: q,
      quantity: q,
      requestedQty: q,
      requested_qty: q,
      unit: part && part.unit || 'шт',
      unitWeightKg: toNumber(part && part.weightKg, 0),
      unit_weight_kg: toNumber(part && part.weightKg, 0),
      weightKg: weight,
      rentalPrice: unitRentalPrice,
      rental_price: unitRentalPrice,
      totalRental: q * unitRentalPrice,
      total_rental: q * unitRentalPrice,
      powerW: q * toNumber(part && part.powerW, 0),
      power_w: q * toNumber(part && part.powerW, 0),
      note: note || '',
      sourceType: resolvedSourceType,
      source_type: resolvedSourceType,
      sourceSystem: resolvedSourceSystem,
      source_system: resolvedSourceSystem,
      sourceTypeSuggestion: resolvedSourceType === 'quick_ideal' ? 'quick_ideal' : 'own',
      source_type_suggestion: resolvedSourceType === 'quick_ideal' ? 'quick_ideal' : 'own',
      meta: Object.assign({}, part && part.meta || {}, { systemPart:true, systemPartKey: part && part.meta && part.meta.systemPartKey || '', structureBomVersion: STRUCTURE_CONFIG_VERSION, catalogMode: resolvedSourceType === 'quick_ideal' ? 'quick' : 'quote', quickIdealCatalog: resolvedSourceType === 'quick_ideal' })
    }, ext);
  }
  function summarizeStageRows(rows) {
    return (Array.isArray(rows) ? rows : []).reduce((acc, row) => {
      acc.rows += 1;
      acc.qty += toNumber(row && (row.qty == null ? row.quantity : row.qty), 0);
      acc.weightKg += toNumber(row && (row.weightKg == null ? row.weight_kg : row.weightKg), 0);
      acc.powerW += toNumber(row && (row.powerW == null ? row.power_w : row.powerW), 0);
      return acc;
    }, { rows:0, qty:0, weightKg:0, powerW:0 });
  }

  ROOT._StructureCatalog = {
    STRUCTURE_CONFIG_VERSION,
    STRUCTURE_PARTS_MIGRATION_KEY,
    TRUSS_COMPATIBILITY_VERSION,
    TRUSS_DEFAULT_COMPATIBILITY_GROUP,
    TRUSS_DEFAULT_INTERFACE,
    TRUSS_STRAIGHT_LENGTHS,
    TRUSS_STRAIGHT_TYPE_ORDER,
    STRUCTURE_PART_ALIASES,
    STAGE_PARTS,
    TRUSS_PARTS,
    clone,
    nowIso,
    toNumber,
    toText,
    partDefs,
    trussDefByKey,
    isStraightTrussPartKey,
    trussPartCompatibilityMeta,
    isQuickCatalogMode,
    getCatalogMode,
    decoratePartForQuick,
    getQuickIdealItems,
    getCatalogItems,
    getCatalogContext,
    addCatalogMeta,
    makeBomRow,
    summarizeStageRows,
    partToItem,
    normalizeWithDb,
    getStoredEquipmentItems,
    normalizeAliasToken,
    legacyTokens,
    aliasList,
    catalogCandidateScore,
    findSystemPartCandidates,
    mergeSystemPart,
    findSystemPart,
    getSystemPartMap,
    inferTrussPartKey,
    enrichTrussCompatibilityItem,
    ensureTrussCompatibilityMetadata,
    pruneTrussCatalogItems,
    itemAvailableQty,
    itemReservedQty,
    itemStockQty,
    itemCompatGroup,
    itemTrussPartKey,
    trussCompatibleCandidates,
    cloneStockPool,
    poolCandidatesForPart,
    consumePool,
    ensureSystemParts,
    ensureStoredSystemParts
  };

  ensureStoredSystemParts();
})();
