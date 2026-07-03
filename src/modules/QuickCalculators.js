(function () {
  'use strict';
  const ROOT = (window.FEGModules = window.FEGModules || {});

  const QUICK_CALCULATORS = Object.freeze([
    { id: 'stage', title: 'Сцена', output: ['Схема', 'Техлист', 'Склад', 'Вес'], icon: '▦' },
    { id: 'truss', title: 'Фермы', output: ['Схема', 'Техлист', 'Склад', 'Вес'], icon: '△' },
    { id: 'led', title: 'LED Экраны', output: ['Кабинеты', 'Кабели', 'Мощность', 'Вес'], icon: '▣' }
  ]);

  const FEG_LAUNCH_ICON_SVG = Object.freeze({
    stage: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<rect x="9" y="21" width="46" height="9" rx="1" stroke="currentColor" stroke-width="2.4"/>'
      + '<path d="M16 30v8M48 30v8M24 30v9M40 30v9" stroke="currentColor" stroke-width="2.2"/>'
      + '<path d="M9 47h46" stroke="currentColor" stroke-width="1.3"/>'
      + '<path d="M9 43.5v7M55 43.5v7" stroke="currentColor" stroke-width="1.3"/>'
      + '<path d="M9 47l5-2.4v4.8zM55 47l-5-2.4v4.8z" fill="currentColor"/>'
      + '</svg>',
    truss: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<rect x="15" y="15" width="34" height="34" stroke="currentColor" stroke-width="2.4"/>'
      + '<path d="M15 15L49 49M49 15L15 49" stroke="currentColor" stroke-width="1.5" opacity="0.65"/>'
      + '<circle cx="15" cy="15" r="2.8" fill="currentColor"/><circle cx="49" cy="15" r="2.8" fill="currentColor"/>'
      + '<circle cx="15" cy="49" r="2.8" fill="currentColor"/><circle cx="49" cy="49" r="2.8" fill="currentColor"/>'
      + '</svg>',
    led: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<rect x="12" y="12" width="32" height="32" rx="2" stroke="currentColor" stroke-width="2.4"/>'
      + '<g fill="currentColor">'
      + '<rect x="17" y="17" width="6" height="6"/><rect x="26" y="17" width="6" height="6"/><rect x="35" y="17" width="6" height="6"/>'
      + '<rect x="17" y="26" width="6" height="6"/><rect x="26" y="26" width="6" height="6"/><rect x="35" y="26" width="6" height="6"/>'
      + '<rect x="17" y="35" width="6" height="6"/><rect x="26" y="35" width="6" height="6"/><rect x="35" y="35" width="6" height="6"/>'
      + '</g>'
      + '</svg>'
  });

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
          <article class="feg-hero-card v4-card" data-feg-runner-open role="button" tabindex="0" title="Запустить FEG TECH RUN" aria-label="${escapeHtml(ROOT.AppVersion && ROOT.AppVersion.displayName || 'FEG Stage PRO')} · Stage · Truss · LED · FEG TECH RUN">
            <svg class="feg-hero-art" viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FEG Stage PRO">
              <text x="28" y="112" class="feg-hero-word">FEG</text>
              <text x="28" y="150" class="feg-hero-word-sub">STAGE PRO</text>
              <text x="28" y="176" class="feg-hero-kicker">РИГГИНГ · СЦЕНА · ФЕРМЫ · LED</text>
              <g class="feg-hero-dim" stroke="currentColor" fill="none">
                <path d="M330 60V190M600 60V190" stroke-width="1.4"/>
                <path d="M330 190H600" stroke-width="1.4"/>
                <path d="M330 190l9-4.5v9zM600 190l-9-4.5v9z" fill="currentColor" stroke="none"/>
                <rect x="360" y="76" width="60" height="14" stroke-width="2"/>
                <rect x="432" y="76" width="60" height="14" stroke-width="2"/>
                <rect x="504" y="76" width="60" height="14" stroke-width="2"/>
                <path d="M372 90v18M408 90v18M444 90v18M480 90v18M516 90v18M552 90v18" stroke-width="1.6"/>
                <path d="M360 108h204" stroke-width="1.6"/>
              </g>
            </svg>
          </article>
          <div class="feg-launch-grid" aria-label="Быстрые конструкторы">
            ${QUICK_CALCULATORS.map(calc => `
              <button type="button" class="feg-launch-tile" data-v4-quick="${calc.id}">
                <span class="feg-launch-icon" data-launch-kind="${calc.id}" aria-hidden="true">${FEG_LAUNCH_ICON_SVG[calc.id] || ''}</span>
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
    if (ROOT.MiniRunnerGame && typeof ROOT.MiniRunnerGame.bind === 'function') {
      ROOT.MiniRunnerGame.bind(root);
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
        <h3>0. Назначение и общий принцип</h3>
        <p><b>FEG Stage PRO / ПАК.ИТ</b> в standalone-режиме содержит три быстрых конструктора: <b>Сцена</b>, <b>Фермы</b> и <b>LED Экраны</b>. Каждый конструктор собирает схему, считает технические параметры, формирует комплектовку, вес, мощность, складской лист, техлист и PDF-сводку.</p>
        <p>Быстрые конструкторы работают от изолированной идеальной базы комплектующих. Они не списывают склад, не создают резервы, не учитывают дефицит и не делают backend-записи. Фактический склад, резервы и замены по наличию относятся к сметчику/складскому контуру, а не к быстрому standalone-расчёту.</p>
        <p>Все расчёты в этой инструкции описывают текущую логику программы. Для реального подвеса, больших пролётов, ветра, улицы, сложных нагрузок и нестандартных площадок нужна отдельная инженерная проверка.</p>
      </section>

      <section class="feg-user-guide-section">
        <h3>1. Общий порядок работы</h3>
        <div class="feg-user-guide-flow">
          <span>1. Выбрать конструктор</span>
          <span>2. Задать габариты и параметры</span>
          <span>3. Собрать схему</span>
          <span>4. Проверить сводные карточки</span>
          <span>5. Проверить BOM/техлист</span>
          <span>6. Экспортировать PDF</span>
        </div>
        <ul class="feg-user-guide-notes">
          <li><b>Схема</b> — визуальная рабочая область конструктора.</li>
          <li><b>BOM</b> — расчётный список оборудования и крепежа.</li>
          <li><b>Техлист</b> — документ для монтажной команды без цен.</li>
          <li><b>Складской лист</b> — список позиций, количества и веса для подготовки комплекта.</li>
          <li><b>PDF</b> — сводка текущей конфигурации со схемой и основными итогами.</li>
        </ul>
      </section>

      <section class="feg-user-guide-grid feg-user-guide-grid--two" aria-label="Инструкции по конструкторам">
        <article class="feg-user-guide-card feg-user-guide-card--wide">
          <h3>2. Конструктор сцены: логика работы</h3>
          <ol>
            <li>Выбери режим построения: <b>настил</b> или <b>лестница</b>.</li>
            <li>Настил добавляется кликом или протяжкой по сетке. Повторное действие по заполненной клетке может удалить/переключить элемент в зависимости от текущего режима.</li>
            <li>Шаблон прямоугольника собирает сцену по заданной ширине и глубине в модулях.</li>
            <li>Размер одного модуля по умолчанию: <b>1,2 × 1,2 м</b>. Один активный квадрат сетки = один лист настила.</li>
            <li>Лестница считается отдельной аксессуарной позицией и размещается на плане как отдельный блок.</li>
            <li>Высота сцены зависит от выбранного типа опоры: низкая — 0,4 м, средняя/регулируемая — 0,8 м, высокая — 1,1 м. Значение можно скорректировать вручную.</li>
            <li>Перекладина выбирается автоматически по опоре: низкий столб требует низкую перекладину, средний и высокий столб используют среднюю перекладину.</li>
          </ol>
        </article>

        <article class="feg-user-guide-card feg-user-guide-card--wide">
          <h3>3. Формулы сцены</h3>
          <div class="feg-user-guide-table-wrap">
            <table class="feg-user-guide-table">
              <tbody>
                <tr><th>Листы настила</th><td>количество активных клеток сетки.</td></tr>
                <tr><th>Фактическая ширина</th><td>ширина bounding-box в клетках × 1,2 м.</td></tr>
                <tr><th>Фактическая глубина</th><td>глубина bounding-box в клетках × 1,2 м.</td></tr>
                <tr><th>Площадь</th><td>листы × 1,2 × 1,2 = листы × 1,44 м².</td></tr>
                <tr><th>Опоры / столбы</th><td>количество уникальных вершин всех активных модулей. Общие вершины соседних модулей считаются один раз.</td></tr>
                <tr><th>Перекладины / рамы</th><td>количество уникальных рёбер активных модулей. Общие рёбра соседних модулей считаются один раз.</td></tr>
                <tr><th>Шпильки</th><td>если включены: 1 шт × количество опор.</td></tr>
                <tr><th>Пятки</th><td>если включены: 1 шт × количество опор.</td></tr>
                <tr><th>Открытый периметр</th><td>верхние/нижние открытые рёбра × 1,2 м + левые/правые открытые рёбра × 1,2 м.</td></tr>
                <tr><th>Закрытие торцов</th><td>если включено: количество метров = открытый периметр.</td></tr>
                <tr><th>Стоимость модулей</th><td>листы × цена 1 модуля.</td></tr>
                <tr><th>Итого сцена</th><td>стоимость модулей + монтаж + доставка.</td></tr>
                <tr><th>Вес</th><td>сумма по строкам BOM: количество позиции × вес единицы.</td></tr>
              </tbody>
            </table>
          </div>
          <p><b>Условность:</b> для сложной формы сцены программа считает не прямоугольник целиком, а фактические активные модули, их уникальные вершины и рёбра. Поэтому L-форма, острова и вырезы дают другой расчёт опор/рам, чем простой прямоугольник того же bounding-box.</p>
        </article>

        <article class="feg-user-guide-card feg-user-guide-card--wide">
          <h3>4. Конструктор ферм: логика работы</h3>
          <ol>
            <li>Можно использовать готовые шаблоны: <b>портал</b>, <b>рама</b>, <b>табуретка</b>, либо собирать конструкцию вручную из блоков.</li>
            <li>Библиотека включает прямые фермы 0,5 / 1 / 1,5 / 2 / 2,5 / 3 м, 2D-углы, T/X-узлы, 3D-узлы и базы.</li>
            <li>Сетка конструктора работает с шагом <b>0,5 м</b>. Длины прямых ферм переводятся в клетки сетки по правилу: длина / 0,5.</li>
            <li>При добавлении шаблона текущая схема сначала очищается, затем строится новая конструкция.</li>
            <li>Портал: верхняя перекладина + две стойки + базы. Если ширина портала больше 9 м, добавляется средняя стойка/узел для разделения пролёта.</li>
            <li>Рама: верхняя и нижняя перекладина + две боковые стойки + углы по периметру.</li>
            <li>Табуретка: верхняя 3D-рама, вертикальные ноги и базы. Реальный габарит табуретки считается по верхней раме; вынесенные в схеме ноги нужны для комплектации, веса и склада, но не раздувают габарит верхней рамы.</li>
            <li>Выбранный элемент можно повернуть, удалить или заменить через панель действий.</li>
          </ol>
        </article>

        <article class="feg-user-guide-card feg-user-guide-card--wide">
          <h3>5. Формулы ферм и крепежа</h3>
          <div class="feg-user-guide-table-wrap">
            <table class="feg-user-guide-table">
              <tbody>
                <tr><th>Метраж прямых ферм</th><td>сумма: количество каждой прямой фермы × её длина.</td></tr>
                <tr><th>Прокат прямых</th><td>метраж прямых × 500 ₽/м.п. по умолчанию.</td></tr>
                <tr><th>Прокат узлов</th><td>количество узлов × 500 ₽/шт по умолчанию.</td></tr>
                <tr><th>Прокат баз</th><td>количество баз × 500 ₽/шт по умолчанию.</td></tr>
                <tr><th>Фактический стык</th><td>точка, где сходятся 2 и более порта фермы/узла. Количество стыков = сумма по точкам max(0, портов в точке − 1).</td></tr>
                <tr><th>C2-88</th><td>фактические стыки × 4 шт.</td></tr>
                <tr><th>Пальцы C2-67 для стыков</th><td>C2-88 × 2 шт.</td></tr>
                <tr><th>Шплинты C2-2-48 для стыков</th><td>C2-88 × 2 шт.</td></tr>
                <tr><th>Подключённая база</th><td>база, привязанная к порту фермы/стойки.</td></tr>
                <tr><th>C3-83 для баз</th><td>подключённые базы × 4 шт.</td></tr>
                <tr><th>Пальцы/шплинты для баз</th><td>C3-83 × 1 палец + C3-83 × 1 шплинт.</td></tr>
                <tr><th>Итого пальцы</th><td>пальцы для C2-88 + пальцы для C3-83.</td></tr>
                <tr><th>Итого шплинты</th><td>шплинты для C2-88 + шплинты для C3-83.</td></tr>
                <tr><th>Вес конструкции</th><td>сумма веса прямых, узлов, баз, C2-88, C3-83, пальцев и шплинтов.</td></tr>
                <tr><th>Итого коммерция</th><td>прокат конструкции + монтаж + доставка.</td></tr>
              </tbody>
            </table>
          </div>
          <p><b>Условность по разбиению прямых:</b> шаблоны стремятся собрать длину ровными и удобными кусками. Например 4,5 м собирается как 2,5 + 2,0, а не как 3,0 + 1,5. Мелкие 0,5 / 1 / 1,5 м используются только когда без них нельзя собрать точную длину.</p>
        </article>

        <article class="feg-user-guide-card feg-user-guide-card--wide">
          <h3>6. Проверка нагрузок ферм</h3>
          <ol>
            <li>Авто-пролёт берётся из самой длинной непрерывной линии прямых ферм.</li>
            <li>Если в пролёте участвуют U/T/3D-узлы, к длине добавляется вырост узла: <b>0,5 м × количество узлов</b>.</li>
            <li>Расчётный пролёт L = прямые фермы в линии + выросты узлов. Если вручную задан пролёт, ручное значение имеет приоритет.</li>
            <li>Таблица нагрузок выбирается по серии: T29Q или T39Q. Если длина попадает между строками таблицы, применяется ближайшая большая строка.</li>
            <li>Если пролёт меньше 4 м, для запаса применяется строка 4 м. Если пролёт больше максимума таблицы, статус становится превышением.</li>
          </ol>
          <div class="feg-user-guide-table-wrap">
            <table class="feg-user-guide-table">
              <tbody>
                <tr><th>Распределённая нагрузка</th><td>факт, кг/м сравнивается с допустимой строкой таблицы.</td></tr>
                <tr><th>Суммарная распределённая</th><td>факт, кг/м × расчётный пролёт L сравнивается с максимумом строки.</td></tr>
                <tr><th>Точечная нагрузка</th><td>факт, кг сравнивается с выбранной схемой P1 / P2 / P3 / P4.</td></tr>
                <tr><th>Запас</th><td>допуск − факт; если запас меньше 10%, статус становится «малый запас».</td></tr>
                <tr><th>Консоль</th><td>Lк выбирает ближайшую большую строку таблицы консоли; отдельно проверяются P1 и P2.</td></tr>
                <tr><th>Уравновешивание консоли</th><td>для точки: P × Lк / L × 1,2; для распределённой: (q / 2) × Lк / L × 1,2.</td></tr>
              </tbody>
            </table>
          </div>
          <p><b>Важно:</b> индикатор нагрузки — справочный быстрый контроль по паспортным таблицам. Он не заменяет проектный расчёт подвесов, ветровых нагрузок, точек крепления, состояния фермы и ответственности инженера.</p>
        </article>

        <article class="feg-user-guide-card feg-user-guide-card--wide">
          <h3>7. Табуретка из ферм: автоопоры и условности</h3>
          <ol>
            <li>Пустое поле <b>Кол-во ног</b> включает автоматическое распределение опор.</li>
            <li>Авто-правило: максимальный пролёт верхней рамы между опорами должен быть не больше <b>9 м</b>.</li>
            <li>Количество внутренних координат по оси = ceil(длина стороны / 9) − 1, но не меньше 0.</li>
            <li>Каждая внутренняя координата зеркалится на противоположной стороне рамы, поэтому одна координата даёт пару дополнительных ног.</li>
            <li>Примеры: 12 м → 1 внутренняя координата → 2 дополнительные ноги; 24 м → 2 координаты → 4 дополнительные ноги; 30 м → 3 координаты → 6 дополнительных ног.</li>
            <li>В местах дополнительных ног используется U017 T-узел. Он врезается в верхнюю раму и разбивает прямую ферму на участки.</li>
            <li>Высота ноги = общая высота табуретки − высота верхнего узла. Для U012/U017 верхний узел считается как 0,5 м.</li>
            <li>Если количество ног задано вручную, программа распределяет указанное количество; если ног недостаточно для пролёта до 9 м, появится предупреждение.</li>
          </ol>
        </article>

        <article class="feg-user-guide-card feg-user-guide-card--wide">
          <h3>8. Конструктор LED экранов: логика работы</h3>
          <ol>
            <li>Выбери формат кабинета: 500×500, 640×640 или 500×1000, а также пиксельный шаг P2/P3/P4/P5.</li>
            <li>Базовый формат по умолчанию: <b>640×640 P4</b>, вес 14 кг, рабочая мощность 320 Вт, пусковая мощность 600 Вт, пиксели 160×160 px на кабинет.</li>
            <li>Экран можно считать как прямоугольник по габаритам или как свободную схему из нескольких LED-конструкций.</li>
            <li>В свободной схеме каждая отдельная конструкция считает свои габариты, пиксели, соотношение сторон, Hanging Bar и PowerCON–Schuko отдельно.</li>
            <li>Режим <b>стоим</b> включает ноги, печеньки и болты М8×60.</li>
            <li>Режим <b>висим</b> включает Hanging Bar, спанцеты, шаклы, подвесные печеньки и болты М8×20.</li>
            <li>Если включены оба режима, в BOM одновременно попадут и ноги, и подвесной комплект.</li>
          </ol>
        </article>

        <article class="feg-user-guide-card feg-user-guide-card--wide">
          <h3>9. Формулы LED экранов</h3>
          <div class="feg-user-guide-table-wrap">
            <table class="feg-user-guide-table">
              <tbody>
                <tr><th>Количество кабинетов по ширине</th><td>заданная ширина / ширина кабинета, округление к ближайшему целому: дробь 0,5 и выше — вверх, меньше 0,5 — вниз, минимум 1.</td></tr>
                <tr><th>Количество кабинетов по высоте</th><td>заданная высота / высота кабинета, то же правило округления.</td></tr>
                <tr><th>Кабинеты</th><td>колонки × ряды для прямоугольника; для свободной схемы — количество активных ячеек.</td></tr>
                <tr><th>Фактический размер</th><td>колонки × ширина кабинета; ряды × высота кабинета.</td></tr>
                <tr><th>Площадь</th><td>активные кабинеты × ширина кабинета × высота кабинета.</td></tr>
                <tr><th>Пиксели кабинета</th><td>ширина кабинета в мм / pitch; высота кабинета в мм / pitch. Для 640×640 P4 используется 160×160 px.</td></tr>
                <tr><th>Пиксели экрана</th><td>колонки × px кабинета по X; ряды × px кабинета по Y.</td></tr>
                <tr><th>Активные пиксели</th><td>активные кабинеты × pxX кабинета × pxY кабинета.</td></tr>
                <tr><th>Соотношение сторон</th><td>колонки : ряды, сокращённое через НОД. Например 4×2 = 2:1.</td></tr>
                <tr><th>Рабочая мощность</th><td>активные кабинеты × мощность одного кабинета.</td></tr>
                <tr><th>Пусковая мощность</th><td>активные кабинеты × пусковая мощность одного кабинета.</td></tr>
                <tr><th>Линки питания 220 В</th><td>активные кабинеты × 1.</td></tr>
                <tr><th>RJ45</th><td>активные кабинеты × 1.</td></tr>
                <tr><th>PowerCON–Schuko</th><td>по каждой LED-конструкции: ceil(мощность конструкции / 3400 Вт). Итог = сумма по конструкциям.</td></tr>
                <tr><th>Hanging Bar</th><td>в режиме «висим»: 1 шт на каждый верхний кабинет каждой LED-конструкции.</td></tr>
                <tr><th>Спанцет / шакл</th><td>в режиме «висим»: 1 спанцет + 1 шакл на каждый Hanging Bar.</td></tr>
                <tr><th>Печеньки стоим</th><td>количество ног × 4.</td></tr>
                <tr><th>Печеньки висим</th><td>(колонки − 1) × ряды по каждой LED-конструкции.</td></tr>
                <tr><th>Болты М8×60</th><td>количество ног × 16.</td></tr>
                <tr><th>Болты М8×20</th><td>подвесные печеньки × 4.</td></tr>
                <tr><th>Вес LED</th><td>кабинеты + кабели + PowerCON–Schuko + печеньки + болты + ноги + Hanging Bar + спанцеты + шаклы.</td></tr>
                <tr><th>Стоимость LED</th><td>активные кабинеты × цена кабинета + монтаж + доставка.</td></tr>
              </tbody>
            </table>
          </div>
          <p><b>Условность свободной схемы:</b> габарит берётся по bounding-box всей схемы, но активная площадь, вес, мощность и пиксели считаются по фактически активным кабинетам. Если внутри габарита есть пустоты, они не добавляют кабинеты, вес и мощность.</p>
        </article>
      </section>

      <section class="feg-user-guide-section">
        <h3>10. Базовые веса и значения по умолчанию</h3>
        <div class="feg-user-guide-table-wrap">
          <table class="feg-user-guide-table feg-user-guide-table--compact">
            <thead><tr><th>Раздел</th><th>Позиция</th><th>Значение</th></tr></thead>
            <tbody>
              <tr><td>Сцена</td><td>Настил 1,2×1,2 м</td><td>18 кг</td></tr>
              <tr><td>Сцена</td><td>Опора низкая / средняя / высокая</td><td>0,6 / 2,6 / 4,8 кг</td></tr>
              <tr><td>Сцена</td><td>Перекладина низкая / средняя</td><td>3,5 / 5 кг</td></tr>
              <tr><td>Сцена</td><td>Шпилька</td><td>1,5 кг; 1 шт на опору</td></tr>
              <tr><td>Фермы</td><td>Прямые T29Q 3 / 2,5 / 2 / 1,5 / 1 / 0,5 м</td><td>17,9 / 15 / 12,4 / 10 / 7 / 4,4 кг</td></tr>
              <tr><td>Фермы</td><td>База / блин</td><td>29 кг</td></tr>
              <tr><td>Фермы</td><td>C2-88 / C3-83 / C2-67 / шплинт</td><td>0,16 / 0,27 / 0,04 / 0,003 кг</td></tr>
              <tr><td>LED</td><td>Кабинет 640×640 P4</td><td>14 кг; 320 Вт; пуск 600 Вт; 160×160 px</td></tr>
              <tr><td>LED</td><td>Нога 2 / 2,5 / 3 м</td><td>3 / 3,6 / 4 кг</td></tr>
              <tr><td>LED</td><td>PowerCON–Schuko</td><td>ceil(мощность / 3400 Вт)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="feg-user-guide-section">
        <h3>11. PDF, техлист и складской лист</h3>
        <ul class="feg-user-guide-notes">
          <li><b>PDF</b> показывает сводку и схему текущего конструктора. Перед отправкой проверь, что открыта нужная конфигурация.</li>
          <li><b>Техлист</b> не должен зависеть от цен. Он нужен монтажникам: габариты, вес, мощность, комплект, важные примечания.</li>
          <li><b>Складской лист</b> показывает, что нужно подготовить физически: позиции, количество, вес и примечания.</li>
          <li><b>Коммерческие строки</b> быстрого расчёта отделены от склада и техлистов: цена не должна попадать в складскую подготовку.</li>
          <li><b>Тема</b> влияет только на отображение интерфейса. Расчёты от темы не меняются.</li>
        </ul>
      </section>

      <section class="feg-user-guide-section">
        <h3>12. Ограничения и правила безопасности расчёта</h3>
        <ul class="feg-user-guide-notes">
          <li>Быстрый расчёт помогает собрать предварительную конфигурацию, но не заменяет инженерный проект.</li>
          <li>Нагрузки ферм нужно перепроверять для реальных подвесов, точек крепления, ветра, людей, динамики, вибраций и состояния оборудования.</li>
          <li>LED подвес должен проверяться по фактическим Hanging Bar, точкам подвеса, массе кабинетов, углам строповки и допустимым нагрузкам площадки.</li>
          <li>Сцену нужно сверять по основанию, уклонам пола, высоте, ограждениям, лестницам, распределению нагрузки и требованиям площадки.</li>
          <li>Перед отгрузкой всегда сверяй комплект с фактическим складом, исправностью оборудования, крепежом и транспортными ограничениями.</li>
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
