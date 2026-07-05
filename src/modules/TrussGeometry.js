// FEG Stage PRO — TrussGeometry shared cell-geometry helpers
// Responsibility: single source of truth for straight-truss cell math (cell count, cell span, cell/meter bounds).
// Classic-compatible module: attaches API to window.FEGModules.TrussGeometry.
// Consumed by TrussBlockConstructor.js, visual/TrussVisualAdapter.js and PdfGenerator.js — load this BEFORE them.
(function (global) {
    'use strict';

    const DEFAULT_CELL_METERS = 0.5;

    function toNumber(value, fallback) {
        const n = Number(value);
        return Number.isFinite(n) ? n : Number(fallback || 0);
    }

    function nonNegative(value, fallback) {
        return Math.max(0, toNumber(value, fallback));
    }

    function normalizeRotation(value) {
        const n = Number(value || 0);
        return ((n % 360) + 360) % 360;
    }

    function normalizeCellMeters(cellMeters) {
        const n = Number(cellMeters || DEFAULT_CELL_METERS);
        return Number.isFinite(n) && n > 0 ? n : DEFAULT_CELL_METERS;
    }

    function cellCount(meters, cellMeters) {
        const cellM = normalizeCellMeters(cellMeters);
        return Math.max(1, Math.round(Number(meters || 0) / cellM));
    }

    function itemCellSpan(item, spec, cellMeters) {
        if (!item || !spec) return { cells: 1, width: 1, height: 1 };
        if (spec.kind !== 'straight') return { cells: 1, width: 1, height: 1 };
        const cells = cellCount(spec.length, cellMeters);
        return item.o === 'v'
            ? { cells, width: 1, height: cells }
            : { cells, width: cells, height: 1 };
    }

    function itemBoundsCells(item, spec, cellMeters) {
        const span = itemCellSpan(item, spec, cellMeters);
        const x = toNumber(item && item.x, 0);
        const y = toNumber(item && item.y, 0);
        return {
            minX: x,
            minY: y,
            maxX: x + span.width,
            maxY: y + span.height,
            width: span.width,
            height: span.height,
            cells: span.cells
        };
    }

    function nodePhysicalSize(spec, rotation, cellMeters) {
        const fallback = normalizeCellMeters(cellMeters);
        const dims = (spec && spec.dimensionsM) || {};
        const base = {
            w: nonNegative(dims.w, fallback) || fallback,
            h: nonNegative(dims.h, fallback) || fallback,
            z: nonNegative(dims.z, spec && spec.kind === 'base' ? 0.03 : fallback)
        };
        const r = normalizeRotation(rotation);
        const swap = r === 90 || r === 270;
        return swap ? { w: base.h, h: base.w, z: base.z } : base;
    }

    function itemBoundsMeters(item, spec, cellMeters) {
        const cellM = normalizeCellMeters(cellMeters);
        const x = toNumber(item && item.x, 0) * cellM;
        const y = toNumber(item && item.y, 0) * cellM;
        if (spec && spec.kind === 'straight') {
            const length = nonNegative(spec.length, cellM) || cellM;
            return item.o === 'v'
                ? { minX: x, minY: y, maxX: x + cellM, maxY: y + length, width: cellM, height: length, lengthM: length }
                : { minX: x, minY: y, maxX: x + length, maxY: y + cellM, width: length, height: cellM, lengthM: length };
        }
        const size = nodePhysicalSize(spec || {}, item && item.r, cellM);
        return { minX: x, minY: y, maxX: x + size.w, maxY: y + size.h, width: size.w, height: size.h, lengthM: 0, zM: size.z };
    }

    const api = {
        DEFAULT_CELL_METERS,
        normalizeCellMeters,
        cellCount,
        itemCellSpan,
        itemBoundsCells,
        itemBoundsMeters
    };

    global.FEGModules = global.FEGModules || {};
    global.FEGModules.TrussGeometry = api;
})(typeof window !== 'undefined' ? window : globalThis);
