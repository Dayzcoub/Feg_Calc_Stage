// FEG Stage PRO v3.1.88 — StageCalculator module
// Responsibility: pure stage geometry helpers, grid shape transforms and stage quote snapshot calculations.
// Classic-compatible module: attaches API to window.FEGModules.StageCalculator.
(function (global) {
    'use strict';

    const DEFAULT_GRID_COLS = 20;
    const DEFAULT_GRID_ROWS = 20;
    const MIN_GRID_SIZE = 6;
    const MAX_GRID_SIZE = 40;
    const MODULE_WIDTH_M = 1.2;
    const MODULE_DEPTH_M = 1.2;

    function moduleKey(x, y) {
        return `${Number(x)},${Number(y)}`;
    }

    function parseModuleKey(key) {
        const [x, y] = String(key).split(',').map(Number);
        return { x, y };
    }

    function clampGridSize(value, fallback, limits) {
        const min = limits && Number(limits.min) ? Number(limits.min) : MIN_GRID_SIZE;
        const max = limits && Number(limits.max) ? Number(limits.max) : MAX_GRID_SIZE;
        const parsed = parseInt(value, 10);
        if (isNaN(parsed)) return fallback;
        return Math.max(min, Math.min(max, parsed));
    }

    function modulesFromSet(selectedModules) {
        if (!selectedModules || typeof selectedModules[Symbol.iterator] !== 'function') return [];
        return Array.from(selectedModules).map(parseModuleKey).filter(m => !isNaN(m.x) && !isNaN(m.y));
    }

    function canonicalEdge(a, b) {
        const first = `${a.x},${a.y}`;
        const second = `${b.x},${b.y}`;
        return first < second ? `${first}-${second}` : `${second}-${first}`;
    }

    function moduleSpan(module, axis) {
        const m = module || {};
        const raw = axis === 'x'
            ? (m.widthCells != null ? m.widthCells : (m.w != null ? m.w : (m.width != null ? m.width : 1)))
            : (m.depthCells != null ? m.depthCells : (m.d != null ? m.d : (m.depth != null ? m.depth : 1)));
        const value = Math.round(Number(raw) || 1);
        return Math.max(1, value);
    }

    function calculateGeometry(modules) {
        const list = Array.isArray(modules) ? modules : [];
        const vertices = new Set();
        const edges = new Set();

        list.forEach((module) => {
            const x = Number(module && module.x) || 0;
            const y = Number(module && module.y) || 0;
            const w = moduleSpan(module, 'x');
            const d = moduleSpan(module, 'y');
            vertices.add(`${x},${y}`);
            vertices.add(`${x + w},${y}`);
            vertices.add(`${x},${y + d}`);
            vertices.add(`${x + w},${y + d}`);

            edges.add(canonicalEdge({ x, y }, { x: x + w, y }));
            edges.add(canonicalEdge({ x, y: y + d }, { x: x + w, y: y + d }));
            edges.add(canonicalEdge({ x, y }, { x, y: y + d }));
            edges.add(canonicalEdge({ x: x + w, y }, { x: x + w, y: y + d }));
        });

        return {
            sheets: list.length,
            columns: vertices.size,
            frames: edges.size
        };
    }

    function occupiedCellKeysForModules(modules) {
        const keys = new Set();
        const list = Array.isArray(modules) ? modules : [];
        list.forEach(module => {
            const x0 = Number(module && module.x) || 0;
            const y0 = Number(module && module.y) || 0;
            const w = moduleSpan(module, 'x');
            const d = moduleSpan(module, 'y');
            for (let y = y0; y < y0 + d; y++) {
                for (let x = x0; x < x0 + w; x++) keys.add(moduleKey(x, y));
            }
        });
        return keys;
    }

    function calculateConnectedComponents(modules) {
        const list = Array.isArray(modules) ? modules : [];
        const keys = occupiedCellKeysForModules(list);
        const visited = new Set();
        let components = 0;
        const directions = [
            [0,-1],
            [-1, 0], [1, 0],
            [0, 1]
        ];

        keys.forEach((start) => {
            if (visited.has(start)) return;
            components += 1;
            const stack = [start];
            visited.add(start);
            while (stack.length) {
                const current = stack.pop();
                const { x: cx, y: cy } = parseModuleKey(current);
                directions.forEach(([dx, dy]) => {
                    const next = moduleKey(cx + dx, cy + dy);
                    if (keys.has(next) && !visited.has(next)) {
                        visited.add(next);
                        stack.push(next);
                    }
                });
            }
        });
        return components;
    }

    function getDetachedNotice(components) {
        const count = Number(components) || 0;
        if (count <= 1) return 'Единая конструкция';
        return `${count} отдельные конструкции`;
    }

    function getStageBounds(modules) {
        const list = Array.isArray(modules) ? modules : [];
        if (!list.length) return { width: 0, depth: 0 };
        const minX = Math.min(...list.map(m => Number(m && m.x) || 0));
        const minY = Math.min(...list.map(m => Number(m && m.y) || 0));
        const maxX = Math.max(...list.map(m => (Number(m && m.x) || 0) + moduleSpan(m, 'x')));
        const maxY = Math.max(...list.map(m => (Number(m && m.y) || 0) + moduleSpan(m, 'y')));
        return {
            width: Math.max(0, maxX - minX),
            depth: Math.max(0, maxY - minY),
            minX,
            minY,
            maxX,
            maxY
        };
    }

    function copyModuleWithOffset(module, dx, dy) {
        const m = Object.assign({}, module || {});
        m.x = (Number(m.x) || 0) + dx;
        m.y = (Number(m.y) || 0) + dy;
        return m;
    }

    function normalizeSelectedModules(modules) {
        const list = Array.isArray(modules) ? modules : [];
        if (!list.length) return [];
        const minX = Math.min(...list.map(m => Number(m && m.x) || 0));
        const minY = Math.min(...list.map(m => Number(m && m.y) || 0));
        return list.map(m => copyModuleWithOffset(m, -minX, -minY));
    }

    function centerModulesInGrid(modules, gridColsCount, gridRowsCount) {
        const list = Array.isArray(modules) ? modules : [];
        const cols = Number(gridColsCount) || DEFAULT_GRID_COLS;
        const rows = Number(gridRowsCount) || DEFAULT_GRID_ROWS;
        if (!list.length) return [];
        const bounds = getStageBounds(list);
        const offsetX = Math.floor((cols - bounds.width) / 2) - bounds.minX;
        const offsetY = Math.floor((rows - bounds.depth) / 2) - bounds.minY;
        return list.map(m => copyModuleWithOffset(m, offsetX, offsetY))
            .filter(m => m.x >= 0 && m.x + moduleSpan(m, 'x') <= cols && m.y >= 0 && m.y + moduleSpan(m, 'y') <= rows);
    }

    function mirrorModules(modules) {
        const list = Array.isArray(modules) ? modules : [];
        if (!list.length) return [];
        const bounds = getStageBounds(list);
        return list.map(module => {
            const m = Object.assign({}, module || {});
            const w = moduleSpan(m, 'x');
            m.x = bounds.minX + (bounds.maxX - ((Number(m.x) || 0) + w));
            m.y = Number(m.y) || 0;
            return m;
        });
    }

    function rotateModules(modules, gridColsCount, gridRowsCount) {
        const normalized = normalizeSelectedModules(modules);
        if (!normalized.length) return [];
        const bounds = getStageBounds(normalized);
        const rotated = normalized.map(module => {
            const m = Object.assign({}, module || {});
            const x = Number(m.x) || 0;
            const y = Number(m.y) || 0;
            const w = moduleSpan(m, 'x');
            const d = moduleSpan(m, 'y');
            m.x = bounds.depth - (y + d);
            m.y = x;
            m.widthCells = d;
            m.depthCells = w;
            if (m.moduleWidthM != null || m.moduleDepthM != null) {
                const oldWidth = m.moduleWidthM;
                m.moduleWidthM = m.moduleDepthM;
                m.moduleDepthM = oldWidth;
            }
            return m;
        });
        return centerModulesInGrid(rotated, gridColsCount, gridRowsCount);
    }

    function rectangleModules(width, depth, gridColsCount, gridRowsCount) {
        const w = parseInt(width, 10);
        const d = parseInt(depth, 10);
        const cols = Number(gridColsCount) || DEFAULT_GRID_COLS;
        const rows = Number(gridRowsCount) || DEFAULT_GRID_ROWS;
        if (isNaN(w) || isNaN(d) || w <= 0 || d <= 0 || w > cols || d > rows) {
            return { ok: false, modules: [] };
        }
        const modules = [];
        const startX = Math.floor((cols - w) / 2);
        const startY = rows - d;
        for (let y = startY; y < startY + d; y++) {
            for (let x = startX; x < startX + w; x++) modules.push({ x, y });
        }
        return { ok: true, modules };
    }

    function buildShapeText(modules) {
        const list = Array.isArray(modules) ? modules : [];
        if (!list.length) return 'Нет модулей';
        const keys = new Set(list.map(m => moduleKey(m.x, m.y)));
        const xs = list.map(m => m.x);
        const ys = list.map(m => m.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const rows = [];
        for (let y = minY; y <= maxY; y++) {
            let row = '';
            for (let x = minX; x <= maxX; x++) row += keys.has(moduleKey(x, y)) ? '■' : '□';
            rows.push(row);
        }
        return rows.join('<br>');
    }

    function calculateStageQuoteSnapshot(options) {
        const source = options || {};
        const modules = Array.isArray(source.modules) ? source.modules : [];
        const moduleWidthM = Number(source.moduleWidthM) || MODULE_WIDTH_M;
        const moduleDepthM = Number(source.moduleDepthM) || MODULE_DEPTH_M;
        const stageHeightM = Math.max(0, Number(source.stageHeightM || source.heightM || source.stageHeight || 0));
        const price = Number(source.price);
        const installCost = Math.max(0, Number(source.installCost) || 0);
        const transportCost = Math.max(0, Number(source.transportCost) || 0);
        const geometry = calculateGeometry(modules);
        const components = calculateConnectedComponents(modules);
        const bounds = getStageBounds(modules);
        const gridCellM = Number(source.stageGridCellM || source.gridCellM || 0);
        const hasVariableFootprints = modules.some(m => m && (m.widthCells != null || m.depthCells != null || m.moduleWidthM != null || m.moduleDepthM != null));
        const widthMeters = hasVariableFootprints && gridCellM > 0 ? bounds.width * gridCellM : bounds.width * moduleWidthM;
        const depthMeters = hasVariableFootprints && gridCellM > 0 ? bounds.depth * gridCellM : bounds.depth * moduleDepthM;
        const areaMeters = hasVariableFootprints
            ? modules.reduce((sum, m) => {
                if (Number(m && m.moduleWidthM) > 0 && Number(m && m.moduleDepthM) > 0) return sum + Number(m.moduleWidthM) * Number(m.moduleDepthM);
                if (gridCellM > 0) return sum + moduleSpan(m, 'x') * moduleSpan(m, 'y') * gridCellM * gridCellM;
                return sum + moduleWidthM * moduleDepthM;
            }, 0)
            : geometry.sheets * moduleWidthM * moduleDepthM;
        const modulesCost = geometry.sheets * (isNaN(price) ? 0 : price);
        return {
            geometry,
            components,
            bounds,
            modulesCost,
            installCost,
            transportCost,
            total: modulesCost + installCost + transportCost,
            widthMeters,
            depthMeters,
            areaMeters,
            stageHeightM,
            heightM: stageHeightM,
            shapeText: buildShapeText(modules)
        };
    }

    const api = {
        MODULE_NAME: 'StageCalculator',
        MODULE_STATUS: 'runtime-extracted',
        DEFAULT_GRID_COLS,
        DEFAULT_GRID_ROWS,
        MIN_GRID_SIZE,
        MAX_GRID_SIZE,
        MODULE_WIDTH_M,
        MODULE_DEPTH_M,
        moduleKey,
        parseModuleKey,
        modulesFromSet,
        clampGridSize,
        canonicalEdge,
        moduleSpan,
        calculateGeometry,
        occupiedCellKeysForModules,
        calculateConnectedComponents,
        getDetachedNotice,
        getStageBounds,
        normalizeSelectedModules,
        centerModulesInGrid,
        mirrorModules,
        rotateModules,
        rectangleModules,
        buildShapeText,
        calculateStageQuoteSnapshot
    };

    global.FEGModules = global.FEGModules || {};
    global.FEGModules.StageCalculator = api;
})(typeof window !== 'undefined' ? window : globalThis);
