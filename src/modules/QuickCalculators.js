(function () {
  'use strict';
  const ROOT = (window.FEGModules = window.FEGModules || {});

  const QUICK_CALCULATORS = Object.freeze([
    { id: 'stage', title: 'Сцена', output: ['Схема', 'Техлист', 'Склад', 'Вес'], icon: '▦', imageIcon: 'assets/launch-stage-icon.png' },
    { id: 'truss', title: 'Фермы', output: ['Схема', 'Техлист', 'Склад', 'Вес'], icon: '△', imageIcon: 'assets/launch-truss-icon.png' },
    { id: 'led', title: 'LED Экраны', output: ['Кабинеты', 'Кабели', 'Мощность', 'Вес'], icon: '▣', imageIcon: 'assets/launch-led-icon.png' }
  ]);

  const QUICK_MODAL_VERSION = '3.16.13';
  const QUICK_DRAFT_STORAGE_KEY = 'fegStagePro.v4.quickCalculators.lastState.v1';
  const QUICK_DRAFT_VERSION = '3.16.13-stage-draft-coordinate-preserve';

  function renderQuickCalculators(target, callbacks) {
    const root = typeof target === 'string' ? document.getElementById(target) : target;
    if (!root) return null;
    const cb = callbacks || {};
    root.innerHTML = `
      <section class="feg-dashboard" data-feg-dashboard>
        <div class="feg-dashboard-hero-grid" data-feg-dashboard-hero>
          <article class="feg-hero-card v4-card">
            <img class="feg-hero-art" src="assets/feg-stage-pro-3.0-title.png" alt="FEG Stage PRO 3.1.81 · Stage · Truss · LED" loading="eager" decoding="async">
          </article>
          <div class="feg-launch-grid" aria-label="Быстрые конструкторы">
            ${QUICK_CALCULATORS.map(calc => `
              <button type="button" class="feg-launch-tile" data-v4-quick="${calc.id}">
                <span class="feg-launch-icon${calc.imageIcon ? ' feg-launch-icon--image' : ''}" data-launch-kind="${calc.id}" aria-hidden="true">${calc.imageIcon ? `<img class="feg-launch-icon-image" src="${escapeHtml(calc.imageIcon)}" alt="" loading="eager" decoding="async">` : ''}</span>
                <b>${escapeHtml(calc.title)}</b>
                <small>${calc.id === 'stage' ? 'Конструктор сценических площадок' : calc.id === 'truss' ? 'Конструктор фермовых конструкций' : 'Конструктор LED экранов и медиа систем'}</small>
              </button>`).join('')}
              <div class="feg-launch-support-stack" aria-label="Тема и инструкция">
                <button type="button" class="feg-launch-theme-toggle feg-theme-toggle" data-feg-theme-toggle data-feg-theme-toggle-label="true" aria-label="Переключить тему" aria-pressed="false" title="Переключить светлую/тёмную тему">
                  <span class="feg-theme-switch-track" aria-hidden="true"><span class="feg-theme-switch-knob"></span></span>
                  <span class="feg-theme-switch-caption">Тема</span>
                </button>
                <button type="button" class="feg-launch-guide-button" data-feg-user-guide-open aria-label="Открыть инструкцию пользователя" title="Инструкция пользователя">
                  <span class="feg-launch-guide-mark" aria-hidden="true">?</span>
                  <span class="feg-launch-guide-caption">Инструкция</span>
                </button>
              </div>
          </div>
        </div>

        <section class="feg-workspace-shell v4-card" data-feg-workspace-shell>
          <div class="feg-workspace-stage" data-feg-workspace-stage>
            <div class="feg-workspace-body" data-v4-quick-workspace></div>
          </div>
        </section>
        <div class="feg-user-guide-root" data-feg-user-guide-root></div>
      </section>`;
    root._v4QuickDocText = '';
    root._v4QuickDocName = 'quick-sheet.txt';
    root._v4QuickOptions = cb;
    hydrateQuickDrafts(root);
    root.querySelectorAll('[data-v4-quick]').forEach(btn => btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-v4-quick');
      selectCalculator(root, action, { scroll:true });
      if (cb.onOpen) cb.onOpen(action);
    }));
    root.querySelectorAll('[data-v4-quick-tab]').forEach(btn => btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-v4-quick-tab');
      selectCalculator(root, action);
      if (cb.onOpen) cb.onOpen(action);
    }));
    root.querySelectorAll('[data-feg-user-guide-open]').forEach(btn => btn.addEventListener('click', () => openQuickUserGuide(root)));
    selectCalculator(root, cb.initialKind || 'stage');
    if (ROOT.LogicUiRuntime && ROOT.LogicUiRuntime.refresh) ROOT.LogicUiRuntime.refresh(root);
    if (window.FEG_LIGHT_THEME_SHELL && typeof window.FEG_LIGHT_THEME_SHELL.bindLaunchControls === 'function') {
      window.FEG_LIGHT_THEME_SHELL.bindLaunchControls(root);
    }
    return root;
  }


  function openQuickUserGuide(root) {
    const mount = root && root.querySelector ? root.querySelector('[data-feg-user-guide-root]') : null;
    if (!mount) return null;
    mount.innerHTML = `
      <div class="feg-user-guide-backdrop open" data-feg-user-guide-modal aria-hidden="false">
        <article class="feg-user-guide-modal" role="dialog" aria-modal="true" aria-labelledby="fegUserGuideTitle">
          <header class="feg-user-guide-head">
            <div>
              <div class="feg-user-guide-kicker">FEG Stage PRO / ПАК.ИТ · инструкция</div>
              <h2 id="fegUserGuideTitle">Как пользоваться быстрыми конструкторами</h2>
              <p>Короткая документация внутри программы: порядок работы, что считает каждый блок и что можно безопасно выгружать в PDF/техлисты.</p>
            </div>
            <button type="button" class="feg-user-guide-close" data-feg-user-guide-close aria-label="Закрыть инструкцию">×</button>
          </header>
          <div class="feg-user-guide-body">
            ${getQuickUserGuideHtml()}
          </div>
        </article>
      </div>`;
    const modal = mount.querySelector('[data-feg-user-guide-modal]');
    const close = () => {
      mount.innerHTML = '';
      window.removeEventListener('keydown', onKey);
    };
    const onKey = event => { if (event.key === 'Escape') close(); };
    const closeBtn = mount.querySelector('[data-feg-user-guide-close]');
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (modal) modal.addEventListener('click', event => { if (event.target === modal) close(); });
    window.addEventListener('keydown', onKey);
    return modal;
  }

  function getQuickUserGuideHtml() {
    return `
      <section class="feg-user-guide-section feg-user-guide-section--intro">
        <h3>Назначение программы</h3>
        <p>Приложение предназначено для быстрого технического расчёта трёх типов конструкций: сценической площадки, фермовой конструкции и LED экрана. Быстрые конструкторы помогают собрать схему, проверить основные параметры, получить комплектовку, вес, складской лист и PDF для передачи клиенту или команде.</p>
        <p>Текущая standalone-версия работает как быстрый расчётный инструмент. Быстрые конструкторы используют изолированную идеальную базу комплектующих и не зависят от реального склада, дефицита и резервов сметчика.</p>
      </section>

      <section class="feg-user-guide-grid" aria-label="Основные разделы инструкции">
        <article class="feg-user-guide-card">
          <h3>Главный экран</h3>
          <ol>
            <li>Выбери большую кнопку: <b>Сцена</b>, <b>Фермы</b> или <b>LED Экраны</b>.</li>
            <li>Рабочая область откроется ниже hero-блока.</li>
            <li>Переключатель <b>Тема</b> меняет светлый и тёмный режим интерфейса.</li>
            <li>Кнопка <b>Инструкция</b> открывает эту справку без выхода из конструктора.</li>
          </ol>
        </article>

        <article class="feg-user-guide-card">
          <h3>Сцена</h3>
          <ol>
            <li>Выбери тип: настил или лестница.</li>
            <li>Задай размеры, высоту и нужные параметры стоимости.</li>
            <li>Собирай поле кликом или протяжкой по сетке.</li>
            <li>Используй шаблоны для быстрого прямоугольника.</li>
            <li>Проверь комплектацию: настил, ноги, рамы, перекладины, вес и стоимость.</li>
          </ol>
        </article>

        <article class="feg-user-guide-card">
          <h3>Фермы</h3>
          <ol>
            <li>Выбери шаблон: портал, рама, табуретка или ручная блочная сборка.</li>
            <li>Добавляй прямые фермы, углы, узлы, базы и стойки из библиотеки.</li>
            <li>Поворачивай и удаляй выбранные элементы через панель действий.</li>
            <li>Следи за индикатором нагрузки и таблицами расчёта.</li>
            <li>Для табуретки пустое поле количества ног включает автоопоры по текущему правилу пролётов.</li>
          </ol>
        </article>

        <article class="feg-user-guide-card">
          <h3>LED Экраны</h3>
          <ol>
            <li>Добавь одну или несколько LED конструкций.</li>
            <li>Заполняй сетку кабинетами или используй готовые размеры.</li>
            <li>Выбери режим установки: стоим, висим или оба режима.</li>
            <li>Проверь кабинеты, Hanging Bar, ноги, кабели, мощность, пусковое потребление и вес.</li>
            <li>Соотношение сторон считается отдельно для каждой конструкции.</li>
          </ol>
        </article>

        <article class="feg-user-guide-card">
          <h3>PDF и техлисты</h3>
          <ol>
            <li>После сборки нажми экспорт PDF в выбранном конструкторе.</li>
            <li>PDF содержит сводку и схему текущей конфигурации.</li>
            <li>Техлист нужен монтажной команде, складской лист — для подготовки комплекта.</li>
            <li>Перед отправкой клиенту проверь размеры, стоимость, вес и выбранный режим установки.</li>
          </ol>
        </article>

        <article class="feg-user-guide-card">
          <h3>Тема, мобильный и desktop</h3>
          <ol>
            <li>Тёмная тема остаётся основной и резервной.</li>
            <li>Светлая тема включается только вручную переключателем.</li>
            <li>Мобильный режим работает до 767 px включительно.</li>
            <li>Desktop и планшетный режим работают от 768 px без промежуточных breakpoint-скачков.</li>
            <li>Масштаб конструктора регулируется кнопками, слайдером и auto-fit.</li>
          </ol>
        </article>
      </section>

      <section class="feg-user-guide-section">
        <h3>Рекомендуемый порядок работы</h3>
        <div class="feg-user-guide-flow">
          <span>1. Выбрать конструктор</span>
          <span>2. Собрать схему</span>
          <span>3. Проверить размеры</span>
          <span>4. Проверить вес и комплект</span>
          <span>5. Сформировать PDF/техлист</span>
          <span>6. Передать в смету или в работу</span>
        </div>
      </section>

      <section class="feg-user-guide-section">
        <h3>Что важно помнить</h3>
        <ul class="feg-user-guide-notes">
          <li>Быстрые конструкторы не списывают склад и не создают резервы.</li>
          <li>Расчётная комплектация в standalone-режиме служит для быстрого планирования и подготовки КП.</li>
          <li>Перед реальной отгрузкой нужно сверять комплект с фактическим складом, состоянием оборудования и проектными ограничениями.</li>
          <li>Любые нестандартные подвесы, нагрузки, высоты, погодные условия и площадки требуют отдельной инженерной проверки.</li>
        </ul>
      </section>
    `;
  }

  function selectCalculator(root, kind, options) {
    const scope = root && root.querySelector ? root : null;
    if (!scope) return null;
    const targetKind = QUICK_CALCULATORS.some(item => item.id === kind) ? kind : 'stage';
    const opts = options || {};
    const mount = scope.querySelector('[data-v4-quick-workspace]');
    const title = scope.querySelector('[data-v4-quick-title]');
    const subtitle = scope.querySelector('[data-v4-quick-subtitle]');
    if (!mount) return null;
    scope._v4QuickCurrentKind = targetKind;
    scope.querySelectorAll('[data-v4-quick], [data-v4-quick-tab]').forEach(btn => {
      const key = btn.getAttribute('data-v4-quick') || btn.getAttribute('data-v4-quick-tab');
      const active = key === targetKind;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('[data-feg-nav-kind]').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-feg-nav-kind') === targetKind);
    });
    if (title) title.textContent = targetKind === 'stage' ? 'Сцена' : targetKind === 'truss' ? 'Фермы' : 'LED Экраны';
    if (subtitle) subtitle.textContent = '';
    mount.innerHTML = '';
    if (targetKind === 'stage' && ROOT.V4StructureVisualConfigurator) {
      ROOT.V4StructureVisualConfigurator.renderStageConfigurator(mount, {
        mode:'quick',
        title:'Сцена',
        input:getQuickDraftInput(scope, 'stage', { explicitEmpty:true }),
        authState: scope._v4QuickOptions && scope._v4QuickOptions.authState,
        user: scope._v4QuickOptions && scope._v4QuickOptions.user,
        role: scope._v4QuickOptions && scope._v4QuickOptions.role,
        onChange:(section, input) => { setQuickSection(scope, 'stage', section, input); }
      });
    } else if (targetKind === 'stage') {
      renderStageConfigurator(mount, scope);
    } else if (targetKind === 'truss' && ROOT.V4StructureVisualConfigurator) {
      ROOT.V4StructureVisualConfigurator.renderTrussConfigurator(mount, {
        mode:'quick',
        title:'Быстрый блочный конфигуратор ферм',
        input:getQuickDraftInput(scope, 'truss', { items: [], state:{} }),
        authState: scope._v4QuickOptions && scope._v4QuickOptions.authState,
        user: scope._v4QuickOptions && scope._v4QuickOptions.user,
        role: scope._v4QuickOptions && scope._v4QuickOptions.role,
        onChange:(section, input) => { setQuickSection(scope, 'truss', section, input); }
      });
    } else if (targetKind === 'truss') {
      renderTrussConfigurator(mount, scope);
    } else if (targetKind === 'led') {
      renderLedConfigurator(mount, scope);
    } else {
      mount.innerHTML = `<div class="v4-note">Неизвестный калькулятор: ${escapeHtml(targetKind)}</div>`;
    }
    if (ROOT.LogicUiRuntime && ROOT.LogicUiRuntime.refresh) ROOT.LogicUiRuntime.refresh(mount);
    if (opts.scroll && mount.scrollIntoView) {
      const stage = scope.querySelector('[data-feg-workspace-stage]');
      (stage || mount).scrollIntoView({ behavior:'smooth', block:'start' });
    }
    return mount;
  }

  function openQuickModal(root, kind) {
    const mount = root && root.querySelector ? root.querySelector('[data-v4-quick-modal-root]') : null;
    if (!mount) return null;
    const title = kind === 'stage' ? 'Быстрый конфигуратор сцены' : kind === 'truss' ? 'Быстрый конфигуратор ферм' : 'Быстрый конфигуратор LED-экрана';
    mount.innerHTML = `
      <div class="v4-quick-modal-backdrop open" data-v4-quick-modal aria-hidden="false">
        <div class="v4-quick-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
          <div class="v4-quick-modal-head">
            <div>
              <div class="v4-kicker">Quick calculator · ${escapeHtml(kind)}</div>
              <h3>${escapeHtml(title)}</h3>
            </div>
            <button type="button" class="close-modal" data-v4-quick-modal-close aria-label="Закрыть">×</button>
          </div>
          <div class="v4-quick-modal-body" data-v4-quick-modal-body></div>
        </div>
      </div>`;
    const modal = mount.querySelector('[data-v4-quick-modal]');
    const body = mount.querySelector('[data-v4-quick-modal-body]');
    const close = () => { syncOpenQuickModalSections(root); mount.innerHTML = ''; window.removeEventListener('keydown', onKey); };
    const onKey = event => { if (event.key === 'Escape') close(); };
    const closeBtn = mount.querySelector('[data-v4-quick-modal-close]');
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (modal) modal.addEventListener('click', event => { if (event.target === modal) close(); });
    window.addEventListener('keydown', onKey);
    if (kind === 'stage' && ROOT.V4StructureVisualConfigurator) ROOT.V4StructureVisualConfigurator.renderStageConfigurator(body, { mode:'quick', title:'Сцена', input: getQuickDraftInput(root, 'stage', { explicitEmpty:true }), authState: root._v4QuickOptions && root._v4QuickOptions.authState, user: root._v4QuickOptions && root._v4QuickOptions.user, role: root._v4QuickOptions && root._v4QuickOptions.role, onChange: (section, input) => { setQuickSection(root, 'stage', section, input); } });
    else if (kind === 'stage') renderStageConfigurator(body, root);
    else if (kind === 'truss' && ROOT.V4StructureVisualConfigurator) ROOT.V4StructureVisualConfigurator.renderTrussConfigurator(body, { mode:'quick', title:'Быстрый блочный конфигуратор ферм', input: getQuickDraftInput(root, 'truss', { items: [], state:{} }), authState: root._v4QuickOptions && root._v4QuickOptions.authState, user: root._v4QuickOptions && root._v4QuickOptions.user, role: root._v4QuickOptions && root._v4QuickOptions.role, onChange: (section, input) => { setQuickSection(root, 'truss', section, input); } });
    else if (kind === 'truss') renderTrussConfigurator(body, root);
    else if (kind === 'led') renderLedConfigurator(body, root);
    else body.innerHTML = `<div class="v4-note">Неизвестный калькулятор: ${escapeHtml(kind)}</div>`;
    if (ROOT.LogicUiRuntime && ROOT.LogicUiRuntime.refresh) ROOT.LogicUiRuntime.refresh(mount);
    return modal;
  }

  function renderStageConfigurator(target, quickRoot) {
    const calc = ROOT.StageCalculator;
    if (!calc) {
      target.innerHTML = '<div class="v4-note">StageCalculator не загружен.</div>';
      return;
    }
    const state = {
      cols: 8,
      rows: 6,
      selected: new Set(rectangleKeys(3, 2, 2, 2)),
      moduleWidthM: calc.MODULE_WIDTH_M || 1.2,
      moduleDepthM: calc.MODULE_DEPTH_M || 1.2,
      quickUnitPrice: 850,
      quickInstallCost: 3500,
      quickDeliveryCost: 4000,
      stageHeightM: 0.8
    };
    target.innerHTML = `
      <div class="v4-quick-config" data-stage-quick>
        <div class="v4-grid-3">
          <label class="v4-field"><span>Ширина прямоугольника, мод.</span><input type="number" min="1" max="12" step="1" data-stage-field="presetW" value="4"></label>
          <label class="v4-field"><span>Глубина прямоугольника, мод.</span><input type="number" min="1" max="10" step="1" data-stage-field="presetD" value="3"></label>
          <label class="v4-field"><span>Высота сцены, м</span><input type="number" min="0" step="0.1" data-stage-field="height" value="0.8"></label>
        </div>
        <div class="v4-actions">
          <button type="button" class="btn-secondary" data-stage-preset="rect">Собрать прямоугольник</button>
          <button type="button" class="btn-secondary" data-stage-preset="clear">Очистить</button>
        </div>
        <div class="v4-quick-stage-grid" data-stage-grid></div>
        <div data-stage-result></div>
      </div>`;
    const root = target.querySelector('[data-stage-quick]');
    const render = () => renderStageState(root, state, quickRoot);
    const heightInput = root.querySelector('[data-stage-field="height"]');
    if (heightInput) heightInput.addEventListener('change', () => { state.stageHeightM = Math.max(0, Number(heightInput.value) || 0); render(); });
    root.querySelectorAll('[data-stage-preset]').forEach(btn => btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-stage-preset');
      if (action === 'clear') state.selected.clear();
      if (action === 'rect') {
        const w = clampNumber(root.querySelector('[data-stage-field="presetW"]').value, 1, state.cols, 4);
        const d = clampNumber(root.querySelector('[data-stage-field="presetD"]').value, 1, state.rows, 3);
        const x0 = Math.max(0, Math.floor((state.cols - w) / 2));
        const y0 = Math.max(0, Math.floor((state.rows - d) / 2));
        state.selected = new Set(rectangleKeys(w, d, x0, y0));
      }
      render();
    }));
    render();
  }

  function renderStageState(root, state, quickRoot) {
    const calc = ROOT.StageCalculator;
    const grid = root.querySelector('[data-stage-grid]');
    if (!grid || !calc) return;
    grid.style.gridTemplateColumns = `repeat(${state.cols}, minmax(32px, 1fr))`;
    grid.innerHTML = '';
    for (let y = 0; y < state.rows; y += 1) {
      for (let x = 0; x < state.cols; x += 1) {
        const key = calc.moduleKey(x, y);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `v4-stage-cell${state.selected.has(key) ? ' selected' : ''}`;
        btn.textContent = state.selected.has(key) ? '■' : '';
        btn.title = `${x + 1}:${y + 1}`;
        btn.addEventListener('click', () => {
          if (state.selected.has(key)) state.selected.delete(key);
          else state.selected.add(key);
          renderStageState(root, state, quickRoot);
        });
        grid.appendChild(btn);
      }
    }
    const modules = calc.modulesFromSet(state.selected);
    const heightInput = root.querySelector('[data-stage-field="height"]');
    state.stageHeightM = Math.max(0, Number(heightInput && heightInput.value) || Number(state.stageHeightM) || 0);
    const result = calc.calculateStageQuoteSnapshot(Object.assign({}, state, { modules, stageHeightM: state.stageHeightM }));
    const section = buildStageSection(result, modules);
    root._quickStageSection = section;
    if (quickRoot) {
      setQuickSection(quickRoot, 'stage', section, Object.assign({}, state, { modules }));
    }
    const box = root.querySelector('[data-stage-result]');
    box.innerHTML = `
      <div class="v4-summary-grid">
        <div class="v4-mini"><b>${formatNumber(result.geometry.sheets, 0)} шт</b><span>Листы настила</span><small>${formatNumber(result.areaMeters, 2)} м²</small></div>
        <div class="v4-mini"><b>${formatNumber(result.widthMeters, 1)} × ${formatNumber(result.depthMeters, 1)} м</b><span>Габарит</span><small>${escapeHtml(calc.getDetachedNotice(result.components))}</small></div>
        <div class="v4-mini"><b>${formatNumber(state.stageHeightM, 2)} м</b><span>Высота сцены</span></div>
        <div class="v4-mini"><b>${formatNumber(result.geometry.columns, 0)}</b><span>Стойки/опоры</span></div>
        <div class="v4-mini"><b>${formatNumber(result.geometry.frames, 0)}</b><span>Рамы/перекладины</span></div>
      </div>
      <div class="v4-table-wrap"><table class="v4-table"><thead><tr><th>Позиция</th><th>Кол-во</th><th>Примечание</th></tr></thead><tbody>
        ${section.bomRows.map(row => `<tr><td><b>${escapeHtml(row.name)}</b><br><span class="v4-muted">${escapeHtml(row.code)}</span></td><td>${formatNumber(row.qty, 0)} ${escapeHtml(row.unit)}</td><td>${escapeHtml(row.note)}</td></tr>`).join('')}
      </tbody></table></div>
      <div class="v4-actions"><button type="button" class="btn-secondary" data-stage-copy>Скопировать техлист</button></div>`;
    const copyBtn = box.querySelector('[data-stage-copy]');
    if (copyBtn) copyBtn.addEventListener('click', () => copyText(sectionToText(section), 'Сценический техлист скопирован'));
  }

  function renderTrussConfigurator(target, quickRoot) {
    const truss = ROOT.TrussBlockConstructor;
    if (!truss) {
      target.innerHTML = '<div class="v4-note">TrussBlockConstructor не загружен.</div>';
      return;
    }
    const specs = truss.getDefaultSpecs ? truss.getDefaultSpecs() : {};
    const state = { items: [], selectedType: 'truss3', orientation: 'h', counter: 1 };
    target.innerHTML = `
      <div class="v4-quick-config" data-truss-quick>
        <div class="v4-quick-toolbar">
          <div class="v4-kicker">Блочный конструктор · быстрый режим</div>
          <p class="v4-muted">Добавляй реальные блоки ферм. C3-83, C2-67 и шплинты идут из общего v4 BOM.</p>
        </div>
        <div class="v4-quick-library" data-truss-library></div>
        <div class="v4-grid-3">
          <label class="v4-field"><span>Ориентация прямых</span><select data-truss-field="orientation"><option value="h">Горизонтально</option><option value="v">Вертикально</option></select></label>
          <label class="v4-field"><span>Действия</span><button type="button" class="btn-secondary" data-truss-clear>Очистить фермы</button></label>
        </div>
        <div class="v4-truss-chip-field" data-truss-field-view></div>
        <div data-truss-result></div>
      </div>`;
    const root = target.querySelector('[data-truss-quick]');
    const lib = root.querySelector('[data-truss-library]');
    const groups = truss.getLibraryGroups ? truss.getLibraryGroups(specs) : [];
    lib.innerHTML = groups.map(group => `<div class="v4-quick-lib-group"><b>${escapeHtml(group.title)}</b><div>${group.specs.map(spec => `<button type="button" class="btn-secondary" data-truss-add="${escapeHtml(spec.id)}">${escapeHtml(spec.short || spec.label)}</button>`).join('')}</div></div>`).join('');
    const render = () => renderTrussState(root, specs, state, quickRoot);
    lib.querySelectorAll('[data-truss-add]').forEach(btn => btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-truss-add');
      const spec = specs[type];
      const item = truss.createItem ? truss.createItem(`q${state.counter++}`, type, state.items.length % 10, Math.floor(state.items.length / 10), state.orientation, 0, specs) : null;
      if (item || spec) state.items.push(item || { id:`q${state.counter++}`, type, x:0, y:0, o:state.orientation, r:0 });
      render();
    }));
    root.querySelector('[data-truss-field="orientation"]').addEventListener('change', event => { state.orientation = event.target.value || 'h'; });
    root.querySelector('[data-truss-clear]').addEventListener('click', () => { state.items = []; render(); });
    render();
  }

  function renderTrussState(root, specs, state, quickRoot) {
    const truss = ROOT.TrussBlockConstructor;
    const field = root.querySelector('[data-truss-field-view]');
    const resultBox = root.querySelector('[data-truss-result]');
    if (!truss || !field || !resultBox) return;
    field.innerHTML = state.items.length ? state.items.map(item => {
      const spec = specs[item.type] || {};
      return `<button type="button" class="v4-truss-chip" data-truss-remove="${escapeHtml(item.id)}"><span>${escapeHtml(spec.icon || '▰')}</span><b>${escapeHtml(spec.short || item.type)}</b><small>${escapeHtml(item.o === 'v' ? 'верт.' : 'гор.')}</small></button>`;
    }).join('') : '<div class="v4-note">Пока нет блоков. Выбери элементы из библиотеки выше.</div>';
    field.querySelectorAll('[data-truss-remove]').forEach(btn => btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-truss-remove');
      state.items = state.items.filter(item => String(item.id) !== String(id));
      renderTrussState(root, specs, state, quickRoot);
    }));
    const connectionCount = truss.autoConnectionCount ? truss.autoConnectionCount(state.items, specs, { cellMeters:0.5 }) : 0;
    const result = truss.summarizeBom ? truss.summarizeBom(state.items, specs, {}, { connectionCount }) : {};
    const rows = truss.buildBomRows ? truss.buildBomRows(result, specs, {}, spec => spec.u ? `U${spec.u}` : (spec.code || spec.short || spec.id || '')) : [];
    const section = buildTrussSection(result, rows, state.items, state);
    root._quickTrussSection = section;
    if (quickRoot) {
      setQuickSection(quickRoot, 'truss', section, { items: state.items, state });
    }
    resultBox.innerHTML = `
      <div class="v4-summary-grid">
        <div class="v4-mini"><b>${formatNumber(result.totalMeters, 1)} м</b><span>Прямые фермы</span></div>
        <div class="v4-mini"><b>${formatNumber(result.nodePieces, 0)} шт</b><span>Углы / узлы</span></div>
        <div class="v4-mini"><b>${formatNumber(result.baseCount, 0)} шт</b><span>Базы / блины</span><small>C3-83: ${formatNumber(result.baseHalfConnectors, 0)} шт</small></div>
        <div class="v4-mini"><b>${formatNumber(result.totalC2Pins, 0)} / ${formatNumber(result.totalCotters, 0)}</b><span>Пальцы / шплинты</span></div>
        <div class="v4-mini"><b>${formatNumber(result.weight, 1)} кг</b><span>Вес комплекта</span></div>
        <div class="v4-mini"><b>${formatMoney(result.rental)}</b><span>Прокат ферм</span><small>500 ₽/м и 500 ₽/узел/база</small></div>
      </div>
      <div class="v4-table-wrap"><table class="v4-table"><thead><tr><th>Позиция</th><th>Кол-во</th><th>Метраж</th><th>Вес</th><th>Примечание</th></tr></thead><tbody>
        ${rows.filter(row => Number(row.qty || row.count || row.meters || row.weight || 0) > 0).length ? rows.filter(row => Number(row.qty || row.count || row.meters || row.weight || 0) > 0).map(row => `<tr><td><b>${escapeHtml(row.name)}</b><br><span class="v4-muted">${escapeHtml(row.code)}</span></td><td>${formatNumber(row.qty || row.count, 0)} ${escapeHtml(row.unit || 'шт')}</td><td>${row.meters ? formatNumber(row.meters, 1) + ' м' : '—'}</td><td>${formatNumber(row.weight, 1)} кг</td><td>${escapeHtml(row.note)}</td></tr>`).join('') : '<tr><td colspan="5" class="v4-muted">Нет строк комплектации</td></tr>'}
      </tbody></table></div>
      <div class="v4-actions"><button type="button" class="btn-secondary" data-truss-copy>Скопировать техлист</button></div>`;
    const copyBtn = resultBox.querySelector('[data-truss-copy]');
    if (copyBtn) copyBtn.addEventListener('click', () => copyText(sectionToText(section), 'Техлист ферм скопирован'));
  }

  function renderLedConfigurator(target, quickRoot) {
    if (ROOT.LedCalculatorUI && ROOT.LedCalculatorUI.renderLedCalculator) {
      const restored = getQuickDraftInput(quickRoot, 'led', {});
      ROOT.LedCalculatorUI.renderLedCalculator(target, Object.assign({
        widthM: 4,
        heightM: 2.56,
        format: '640x640',
        pitch: 'p4',
        sourceMode: 'quick',
        catalogMode: 'quick',
        source: 'quick-led-calculator-ui',
        authState: quickRoot && quickRoot._v4QuickOptions && quickRoot._v4QuickOptions.authState,
        user: quickRoot && quickRoot._v4QuickOptions && quickRoot._v4QuickOptions.user,
        role: quickRoot && quickRoot._v4QuickOptions && quickRoot._v4QuickOptions.role
      }, restored || {}, {
        onChange: (section, result, input) => {
          setQuickSection(quickRoot, 'led', section, input || (section && section.input) || null);
        }
      }));
      return;
    }
    target.innerHTML = '<div class="v4-note">LedCalculatorUI не загружен.</div>';
  }

  function buildStageSection(result, modules) {
    if (ROOT.V4StructureConfigurator && ROOT.V4StructureConfigurator.buildStageSection) {
      const section = ROOT.V4StructureConfigurator.buildStageSection({ modules: modules || [], stageHeightM: result && result.stageHeightM, sourceMode: 'quick' }, { source: 'quick-stage-modal-v4-shared-bom', catalogMode: 'quick' });
      section.sectionKey = 'stage';
      return section;
    }
    const res = result || { geometry: {} };
    return {
      sectionKey: 'stage',
      status: 'configured',
      source: 'quick-stage-modal-fallback',
      summary: `Сцена ${formatNumber(res.widthMeters, 1)}×${formatNumber(res.depthMeters, 1)} м, высота ${formatNumber(res.stageHeightM, 2)} м, ${formatNumber(res.geometry.sheets, 0)} листов`,
      stageHeightM: res.stageHeightM || 0,
      weightKg: 0,
      bomRows: [
        { code: 'STG-901', name: 'Модуль / лист настила сцены 1.2×1.2 м', qty: res.geometry.sheets || 0, unit: 'шт', note: `${formatNumber(res.areaMeters, 2)} м²` },
        { code: 'STG-902', name: 'Стойки / опоры сцены', qty: res.geometry.columns || 0, unit: 'шт', note: 'по вершинам выбранных модулей' },
        { code: 'STG-903', name: 'Рамы / перекладины сцены', qty: res.geometry.frames || 0, unit: 'шт', note: 'по внешним и внутренним рёбрам' }
      ]
    };
  }

  function buildTrussSection(result, rows, items, state) {
    if (ROOT.V4StructureConfigurator && ROOT.V4StructureConfigurator.buildTrussSection) {
      const section = ROOT.V4StructureConfigurator.buildTrussSection({ items: items || [], sourceMode: 'quick' }, { source: 'quick-truss-modal-v4-shared-bom', catalogMode: 'quick' });
      section.sectionKey = 'truss';
      return section;
    }
    const res = result || {};
    return {
      sectionKey: 'truss',
      status: 'configured',
      source: 'quick-truss-modal-fallback',
      summary: `Фермы: ${formatNumber(res.totalMeters, 1)} м, узлы ${formatNumber(res.nodePieces, 0)} шт, базы ${formatNumber(res.baseCount, 0)} шт`,
      weightKg: res.weight || 0,
      bomRows: (rows || []).map(row => ({
        code: row.code || row.id,
        name: row.name,
        qty: row.qty,
        unit: row.unit,
        weightKg: row.weight,
        note: row.note
      })),
      rawItems: items || []
    };
  }


  function cloneSafe(value) {
    try { return JSON.parse(JSON.stringify(value == null ? null : value)); } catch (_) { return value; }
  }

  function readQuickDraftStore() {
    if (typeof localStorage === 'undefined') return {};
    try {
      const raw = localStorage.getItem(QUICK_DRAFT_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) { return {}; }
  }

  function writeQuickDraftStore(store) {
    if (typeof localStorage === 'undefined') return false;
    try {
      localStorage.setItem(QUICK_DRAFT_STORAGE_KEY, JSON.stringify(Object.assign({}, store || {}, {
        type: 'feg-stage-pro-v4-quick-calculator-drafts',
        version: QUICK_DRAFT_VERSION,
        updatedAt: new Date().toISOString()
      })));
      return true;
    } catch (_) { return false; }
  }

  function readQuickDraft(kind) {
    const store = readQuickDraftStore();
    const entry = store && store[kind];
    return entry && typeof entry === 'object' ? entry : null;
  }

  function saveQuickDraft(kind, section, input) {
    if (!kind || (!section && !input)) return null;
    const store = readQuickDraftStore();
    store[kind] = {
      sectionKey: kind,
      section: cloneSafe(section || null),
      input: cloneSafe(input || (section && section.input) || null),
      updatedAt: new Date().toISOString(),
      source: 'quick-calculators-local-draft'
    };
    writeQuickDraftStore(store);
    return store[kind];
  }

  function hydrateQuickDrafts(root) {
    if (!root) return root;
    ['stage','truss','led'].forEach(kind => {
      const draft = readQuickDraft(kind);
      if (!draft) return;
      if (draft.section) root[`_quick${capitalizeKind(kind)}Section`] = draft.section;
      if (draft.input) root[`_quick${capitalizeKind(kind)}Input`] = draft.input;
    });
    return root;
  }

  function capitalizeKind(kind) { return String(kind || '').charAt(0).toUpperCase() + String(kind || '').slice(1); }

  function getQuickDraftInput(root, kind, fallback) {
    const prop = `_quick${capitalizeKind(kind)}Input`;
    const existing = root && root[prop];
    if (existing) return cloneSafe(existing);
    const draft = readQuickDraft(kind);
    if (draft && draft.input) return cloneSafe(draft.input);
    if (draft && draft.section && draft.section.input) return cloneSafe(draft.section.input);
    return cloneSafe(fallback || {});
  }

  function setQuickSection(root, kind, section, input) {
    if (!root || !kind) return null;
    const cap = capitalizeKind(kind);
    root[`_quick${cap}Section`] = section || null;
    root[`_quick${cap}Input`] = input || (section && section.input) || null;
    saveQuickDraft(kind, section, input || (section && section.input) || null);
    markQuickBomDirty(root, kind);
    return section;
  }

  function syncOpenQuickModalSections(root) {
    if (!root || !root.querySelector) return root;
    const body = root.querySelector('[data-v4-quick-modal-body]');
    if (!body) return root;
    const ctx = body._v4StructureVisual;
    if (ctx && ctx.kind === 'stage' && ROOT.V4StructureVisualConfigurator && ROOT.V4StructureVisualConfigurator.readStageSection) {
      const section = ROOT.V4StructureVisualConfigurator.readStageSection(body);
      const input = ROOT.V4StructureVisualConfigurator.readStageInput ? ROOT.V4StructureVisualConfigurator.readStageInput(body) : (section && section.input);
      setQuickSection(root, 'stage', section, input);
    }
    if (ctx && ctx.kind === 'truss' && ROOT.V4StructureVisualConfigurator && ROOT.V4StructureVisualConfigurator.readTrussSection) {
      const section = ROOT.V4StructureVisualConfigurator.readTrussSection(body);
      const input = ROOT.V4StructureVisualConfigurator.readTrussInput ? ROOT.V4StructureVisualConfigurator.readTrussInput(body) : (section && section.input);
      setQuickSection(root, 'truss', section, input);
    }
    if (body._v4LedSection) {
      setQuickSection(root, 'led', body._v4LedSection, body._v4LedSection && body._v4LedSection.input);
    }
    return root;
  }


  function renderQuickVisualPreview(root) {
    const mount = root && root.querySelector ? root.querySelector('[data-v4-quick-visual-preview]') : null;
    if (!mount) return null;
    if (!ROOT.VisualPreviewPanel || !ROOT.VisualPreviewPanel.renderVisualPreviewPanel) {
      mount.innerHTML = '<div class="v4-note">VisualPreviewPanel не загружен.</div>';
      return null;
    }
    return ROOT.VisualPreviewPanel.renderVisualPreviewPanel(mount, {
      sourceLabel: 'Quick calculators visual preview',
      title: 'Визуализация быстрого расчёта',
      mode: 'iso',
      cellPx: 40,
      getQuote: () => buildQuickUnifiedQuote(root)
    });
  }

  function renderQuickBomInspectorPlaceholder(root) {
    const mount = root && root.querySelector ? root.querySelector('[data-v4-bom-inspector]') : null;
    if (!mount) return null;
    root._v4QuickBomInspectorEnabled = false;
    root._v4QuickBomDirty = false;
    mount.innerHTML = `
      <div class="v4-bom-inspector v4-card v4-bom-lazy">
        <div class="v4-card-head">
          <div>
            <div class="v4-kicker">V4 BOM inspector · lazy mode</div>
            <h3>Общий BOM v4</h3>
            <p class="v4-muted">Диагностика BOM отключена по умолчанию для скорости. Сцена, фермы и LED работают без постоянной пересборки quote_items / склада / contract.</p>
          </div>
          <div class="v4-bom-source-card">
            <span>Статус</span><b data-v4-bom-dirty>готов к открытию</b><small>ручное обновление</small>
          </div>
        </div>
        <div class="v4-actions">
          <button type="button" class="btn-secondary" data-v4-bom-enable>Открыть общий BOM v4</button>
        </div>
      </div>`;
    const btn = mount.querySelector('[data-v4-bom-enable]');
    if (btn) btn.addEventListener('click', () => {
      root._v4QuickBomInspectorEnabled = true;
      root._v4QuickBomDirty = false;
      renderQuickBomInspector(root);
    });
    return mount;
  }

  function markQuickBomDirty(root, sectionKey) {
    if (!root) return null;
    root._v4QuickBomDirty = true;
    const badge = root.querySelector('[data-v4-bom-dirty]');
    if (badge) badge.textContent = sectionKey ? `изменён ${sectionKey}` : 'есть изменения';
    const visualMount = root.querySelector && root.querySelector('[data-v4-quick-visual-preview]');
    if (visualMount && ROOT.VisualPreviewPanel && ROOT.VisualPreviewPanel.markVisualPreviewDirty) {
      ROOT.VisualPreviewPanel.markVisualPreviewDirty(visualMount, sectionKey || 'quick');
    }
    // Do not auto-rebuild the inspector or visual preview while editing. Full BOM / quote_items / warehouse
    // diagnostics and SVG previews are intentionally refreshed by user's manual buttons.
    return null;
  }

  function scheduleQuickBomInspectorRefresh(root) {
    if (!root || !root._v4QuickBomInspectorEnabled) return null;
    if (root._v4QuickBomRefreshTimer) clearTimeout(root._v4QuickBomRefreshTimer);
    root._v4QuickBomRefreshTimer = setTimeout(() => {
      root._v4QuickBomRefreshTimer = null;
      refreshQuickBomInspector(root);
    }, 250);
    return root;
  }

  function renderQuickBomInspector(root) {
    const mount = root && root.querySelector ? root.querySelector('[data-v4-bom-inspector]') : null;
    if (!mount || !ROOT.V4BomInspector || !ROOT.V4BomInspector.renderInspector) return null;
    root._v4QuickBomInspectorEnabled = true;
    root._v4QuickBomDirty = false;
    return ROOT.V4BomInspector.renderInspector(mount, {
      sourceMode: 'quick',
      maxRows: 80,
      getQuickSections: () => ({
        stage: root._quickStageSection || null,
        truss: root._quickTrussSection || null,
        led: root._quickLedSection || null
      })
    });
  }

  function refreshQuickBomInspector(root) {
    const mount = root && root.querySelector ? root.querySelector('[data-v4-bom-inspector]') : null;
    if (!mount || !ROOT.V4BomInspector || !root._v4QuickBomInspectorEnabled) return null;
    if (ROOT.V4BomInspector.refresh) return ROOT.V4BomInspector.refresh(mount);
    return renderQuickBomInspector(root);
  }

  function renderQuickDoc(root, action) {
    const output = root && root.querySelector ? root.querySelector('[data-v4-quick-doc-output]') : null;
    if (!output) return;
    const [sectionKey, docKind] = String(action || '').split(':');
    if (sectionKey === 'unified') {
      renderUnifiedQuickDoc(root, docKind, output);
      return;
    }
    const builder = ROOT.QuickTechnicalSheets;
    if (!builder) {
      output.textContent = 'Модуль QuickTechnicalSheets не загружен.';
      return;
    }
    const section = sectionKey === 'stage' ? root._quickStageSection : sectionKey === 'truss' ? root._quickTrussSection : sectionKey === 'led' ? root._quickLedSection : null;
    const doc = docKind === 'warehouse'
      ? builder.buildSectionWarehouseSheet(sectionKey, section)
      : builder.buildSectionTechnicalSheet(sectionKey, section);
    const text = builder.documentToText(doc);
    root._v4QuickDocText = text;
    root._v4QuickDocName = `${sectionKey || 'section'}-${docKind || 'tech'}-sheet.txt`;
    output.textContent = text;
    const copyBtn = root.querySelector('[data-v4-quick-doc-copy]');
    const downloadBtn = root.querySelector('[data-v4-quick-doc-download]');
    if (copyBtn) copyBtn.disabled = false;
    if (downloadBtn) downloadBtn.disabled = false;
    if (cbNotify()) cbNotify()(`${sectionKey}: ${docKind}`);
  }

  function renderUnifiedQuickDoc(root, docKind, output) {
    const exporter = ROOT.V4UnifiedBomExport;
    if (!exporter) {
      output.textContent = 'Модуль V4UnifiedBomExport не загружен.';
      return;
    }
    const quote = buildQuickUnifiedQuote(root);
    let text = '';
    let filename = 'v4-unified-bom.txt';
    if (docKind === 'json') {
      text = exporter.exportPayloadAsJson(quote, { source: 'quick-calculators' });
      filename = 'v4-unified-bom-payload.json';
    } else if (docKind === 'contract' && ROOT.V4BomContract) {
      text = ROOT.V4BomContract.exportContractJson(quote, { source: 'quick-calculators', noPrices: true });
      filename = 'v4-bom-contract-payload.json';
    } else if (docKind === 'warehouse') {
      const doc = exporter.buildUnifiedWarehouseSheet(quote, { source: 'quick-calculators' });
      text = exporter.documentToText(doc);
      filename = 'v4-unified-warehouse-sheet.txt';
    } else {
      const doc = exporter.buildUnifiedTechnicalSheet(quote, { source: 'quick-calculators' });
      text = exporter.documentToText(doc);
      filename = 'v4-unified-technical-sheet.txt';
    }
    root._v4QuickDocText = text;
    root._v4QuickDocName = filename;
    output.textContent = text;
    const copyBtn = root.querySelector('[data-v4-quick-doc-copy]');
    const downloadBtn = root.querySelector('[data-v4-quick-doc-download]');
    if (copyBtn) copyBtn.disabled = false;
    if (downloadBtn) downloadBtn.disabled = false;
    if (cbNotify()) cbNotify()(`Unified BOM: ${docKind || 'tech'}`);
  }


  function saveQuickQuoteDraft(root) {
    const sections = {
      stage: root && root._quickStageSection || null,
      truss: root && root._quickTrussSection || null,
      led: root && root._quickLedSection || null
    };
    const hasSections = Object.values(sections).some(Boolean);
    if (!hasSections) {
      if (cbNotify()) cbNotify()('Сначала собери сцену, фермы или LED в быстрых калькуляторах');
      return null;
    }
    if (!ROOT.QuoteDraftStorage || !ROOT.QuoteDraftStorage.saveDraft) {
      if (cbNotify()) cbNotify()('QuoteDraftStorage не загружен');
      return null;
    }
    const draft = ROOT.V4QuoteDraftBomSink && ROOT.V4QuoteDraftBomSink.makeQuoteDraftFromSections
      ? ROOT.V4QuoteDraftBomSink.makeQuoteDraftFromSections(sections, { source: 'quick-calculators', projectName: 'Быстрый расчёт v4', ensureUniqueId: true })
      : buildQuickUnifiedQuote(root);
    const saved = ROOT.QuoteDraftStorage.saveDraft(draft);
    const mount = saved && saved.v4Bom || (ROOT.V4QuoteDraftBomSink && ROOT.V4QuoteDraftBomSink.buildDraftBomMount ? ROOT.V4QuoteDraftBomSink.buildDraftBomMount(saved, { source: 'quick-calculators-preview' }) : null);
    const output = root && root.querySelector ? root.querySelector('[data-v4-quick-doc-output]') : null;
    const text = mount && ROOT.V4QuoteDraftBomSink && ROOT.V4QuoteDraftBomSink.mountToText
      ? ROOT.V4QuoteDraftBomSink.mountToText(mount)
      : JSON.stringify(saved, null, 2);
    if (output) output.textContent = text;
    root._v4QuickDocText = text;
    root._v4QuickDocName = 'v4-quote-draft-bom-snapshot.txt';
    const copyBtn = root.querySelector('[data-v4-quick-doc-copy]');
    const downloadBtn = root.querySelector('[data-v4-quick-doc-download]');
    if (copyBtn) copyBtn.disabled = false;
    if (downloadBtn) downloadBtn.disabled = false;
    if (cbNotify()) cbNotify()('Быстрый расчёт сохранён в черновик сметы v4');
    return saved;
  }

  function buildQuickUnifiedQuote(root) {
    syncOpenQuickModalSections(root);
    const sections = {
      stage: root && root._quickStageSection || null,
      truss: root && root._quickTrussSection || null,
      led: root && root._quickLedSection || null
    };
    if (ROOT.V4UnifiedBomExport && ROOT.V4UnifiedBomExport.makeQuoteFromSections) {
      return ROOT.V4UnifiedBomExport.makeQuoteFromSections(sections, { source: 'quick-calculators', projectName: 'Быстрый расчёт v4' });
    }
    if (ROOT.QuoteModel && ROOT.QuoteModel.createQuoteDraft) {
      return ROOT.QuoteModel.createQuoteDraft({ project: { name: 'Быстрый расчёт v4' }, scope: { stage: Boolean(sections.stage), truss: Boolean(sections.truss), led: Boolean(sections.led), transport: false }, sections });
    }
    return { id: 'quick_unified_bom_export', project: { name: 'Быстрый расчёт v4' }, sections };
  }

  function sectionToText(section) {
    if (ROOT.QuickTechnicalSheets && ROOT.QuickTechnicalSheets.documentToText) {
      return ROOT.QuickTechnicalSheets.documentToText(ROOT.QuickTechnicalSheets.buildSectionTechnicalSheet(section.sectionKey, section));
    }
    return `${section.summary || ''}\n${(section.bomRows || []).map(row => `${row.code} ${row.name}: ${row.qty} ${row.unit}`).join('\n')}`;
  }

  function rectangleKeys(width, depth, startX, startY) {
    const keys = [];
    for (let y = 0; y < depth; y += 1) for (let x = 0; x < width; x += 1) keys.push(`${x + startX},${y + startY}`);
    return keys;
  }

  function clampNumber(value, min, max, fallback) {
    const n = parseInt(value, 10);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(min, Math.min(max, n));
  }

  function cbNotify() {
    return ROOT.ToastManager && ROOT.ToastManager.showToast ? ROOT.ToastManager.showToast : window.showToast;
  }

  function copyText(text, message) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => { if (cbNotify()) cbNotify()(message || 'Скопировано'); }).catch(() => { if (cbNotify()) cbNotify()('Не удалось скопировать'); });
      return;
    }
    if (cbNotify()) cbNotify()('Скопируй текст вручную');
  }

  function copyQuickDoc(root) {
    const text = root && root._v4QuickDocText || '';
    copyText(text, 'Лист скопирован');
  }

  function downloadQuickDoc(root) {
    const text = root && root._v4QuickDocText || '';
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = root._v4QuickDocName || 'quick-sheet.txt';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => { URL.revokeObjectURL(link.href); link.remove(); }, 0);
  }

  function formatNumber(value, digits) {
    const n = Number(value || 0);
    return n.toLocaleString('ru-RU', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  function formatMoney(value) {
    return `${Number(value || 0).toLocaleString('ru-RU')} ₽`;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
  }

  ROOT.QuickCalculators = {
    QUICK_CALCULATORS,
    QUICK_MODAL_VERSION,
    renderQuickCalculators,
    renderQuickDoc,
    selectCalculator,
    openQuickModal,
    renderStageConfigurator,
    renderTrussConfigurator,
    renderLedConfigurator,
    renderQuickVisualPreview,
    renderQuickBomInspectorPlaceholder,
    markQuickBomDirty,
    scheduleQuickBomInspectorRefresh,
    renderQuickBomInspector,
    refreshQuickBomInspector,
    buildQuickUnifiedQuote,
    saveQuickQuoteDraft,
    hydrateQuickDrafts,
    readQuickDraft,
    saveQuickDraft,
    syncOpenQuickModalSections,
    openQuickUserGuide
  };
})();
