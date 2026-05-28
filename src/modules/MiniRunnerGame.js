(function () {
  'use strict';

  const ROOT = (window.FEGModules = window.FEGModules || {});
  const APP_VERSION = '3.1.94';
  const STORAGE_KEY = 'fegStagePro.runnerScores.v1';
  const SCORE_QUEUE_KEY = 'fegStagePro.runnerScoreQueue.v1';
  const PLAYER_KEY = 'fegStagePro.runnerPlayerName.v1';
  const MAX_SCORES = 20;
  const RUNNER_PHYSICS = Object.freeze({
    groundY: 286,
    jumpVelocity: -14.4,
    jumpHoldMs: 45,
    ascentGravity: 0.68,
    fallGravity: 1.05,
    maxFallSpeed: 18.2
  });
  const CLOUD_TABLE = 'runner_scores';
  const CLOUD_SOURCE = 'mini_runner';
  const CLOUD_RPC_SUBMIT = 'submit_runner_score';
  const CLOUD_RPC_LIST = 'get_runner_scores';
  // v3.1.88 audit: Supabase anon key is hardcoded for game scores persistence.
  // The 'sb_publishable_' key is NOT a secret (it's meant for client code).
  // For future: consider moving to config.json or environment variable if this
  // module is reused in other contexts or if key rotation is needed.
  const HARDWIRED_CLOUD_SETTINGS = Object.freeze({
    url: 'https://kabfyzmdxwhjjynclope.supabase.co',
    anonKey: 'sb_publishable_gl-yxy7GGVRlbACN5gMY5g_MD8Eqvoj',
    workspaceKey: 'feg-main'
  });

  function getStorage() {
    try {
      return typeof window.localStorage !== 'undefined' ? window.localStorage : null;
    } catch (err) {
      return null;
    }
  }

  function getAppSettingsApi() {
    return ROOT.AppSettings || (window.FEGModules && window.FEGModules.AppSettings) || null;
  }

  function makeLocalId() {
    const cryptoRef = window.crypto;
    if (cryptoRef && cryptoRef.randomUUID) return cryptoRef.randomUUID();
    return `runner-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, '&#096;');
  }

  function safeJsonParse(value, fallback) {
    try {
      const parsed = JSON.parse(value);
      return parsed == null ? fallback : parsed;
    } catch (err) {
      return fallback;
    }
  }

  function normalizeCloudSettings() {
    return {
      url: HARDWIRED_CLOUD_SETTINGS.url,
      anonKey: HARDWIRED_CLOUD_SETTINGS.anonKey,
      workspaceKey: HARDWIRED_CLOUD_SETTINGS.workspaceKey
    };
  }

  function loadCloudSettings() {
    return normalizeCloudSettings();
  }

  function saveCloudSettings() {
    return normalizeCloudSettings();
  }

  function hasCloudSettings(settings) {
    const normalized = normalizeCloudSettings(settings || {});
    return Boolean(normalized.url && normalized.anonKey && normalized.workspaceKey);
  }

  function buildCloudEndpoint(settings, query) {
    const normalized = normalizeCloudSettings(settings || {});
    return `${normalized.url}/rest/v1/${CLOUD_TABLE}${query || ''}`;
  }

  function buildCloudRpcEndpoint(settings, fnName) {
    const normalized = normalizeCloudSettings(settings || {});
    return `${normalized.url}/rest/v1/rpc/${fnName}`;
  }

  function buildCloudHeaders(settings, prefer) {
    const normalized = normalizeCloudSettings(settings || {});
    const headers = {
      apikey: normalized.anonKey,
      Authorization: `Bearer ${normalized.anonKey}`,
      'Content-Type': 'application/json'
    };
    if (prefer) headers.Prefer = prefer;
    return headers;
  }

  function normalizeScoreEntry(item) {
    const source = item && typeof item === 'object' ? item : {};
    const id = String(source.localId || source.clientScoreId || source.client_score_id || source.id || makeLocalId());
    const hasRemote = Boolean(source.remoteId || source.remote_id || (source.id && String(source.id).indexOf('runner-') !== 0));
    const syncStatus = source.syncStatus ? normalizeSyncStatus(source.syncStatus) : (source.synced || hasRemote ? 'synced' : 'pending');
    return {
      id,
      localId: id,
      clientScoreId: String(source.clientScoreId || source.client_score_id || id),
      name: normalizeName(source.name || source.player_name),
      score: Math.max(0, Math.round(Number(source.score) || 0)),
      distance: Math.max(0, Math.round(Number(source.distance) || 0)),
      date: String(source.date || source.created_at || source.client_created_at || new Date().toISOString()),
      synced: syncStatus === 'synced',
      syncStatus,
      remoteId: String(source.remoteId || source.remote_id || (hasRemote ? source.id : '') || ''),
      syncError: String(source.syncError || '')
    };
  }

  function cloudRowToScore(row) {
    return normalizeScoreEntry({
      id: row && (row.client_score_id || row.id),
      clientScoreId: row && (row.client_score_id || row.id),
      remoteId: row && row.id,
      name: row && row.player_name,
      score: row && row.score,
      distance: row && row.distance,
      date: row && (row.created_at || row.client_created_at),
      synced: true,
      syncStatus: 'synced'
    });
  }

  function makeCloudPayload(entry, settings) {
    const normalized = normalizeScoreEntry(entry || {});
    const cloud = normalizeCloudSettings(settings || {});
    return {
      workspace_key: cloud.workspaceKey,
      player_name: normalized.name,
      score: normalized.score,
      distance: normalized.distance,
      source: CLOUD_SOURCE,
      app_version: APP_VERSION,
      client_score_id: normalized.clientScoreId || normalized.id || makeLocalId(),
      client_created_at: normalized.date || new Date().toISOString()
    };
  }

  function fetchCloudScores(settings) {
    const cloud = normalizeCloudSettings(settings || {});
    if (!hasCloudSettings(cloud) || typeof window.fetch !== 'function') {
      return Promise.reject(new Error('Общая база не настроена'));
    }
    return window.fetch(buildCloudRpcEndpoint(cloud, CLOUD_RPC_LIST), {
      method: 'POST',
      headers: buildCloudHeaders(cloud),
      body: JSON.stringify({ p_workspace_key: cloud.workspaceKey, p_limit: MAX_SCORES })
    }).then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text || `Supabase HTTP ${response.status}`); });
      }
      return response.json();
    }).then(rows => Array.isArray(rows) ? rows.map(cloudRowToScore).sort((a, b) => b.score - a.score).slice(0, MAX_SCORES) : []);
  }

  function saveCloudScore(entry, settings) {
    const cloud = normalizeCloudSettings(settings || {});
    if (!hasCloudSettings(cloud) || typeof window.fetch !== 'function') {
      return Promise.reject(new Error('Общая база не настроена'));
    }
    const payload = makeCloudPayload(entry, cloud);
    return window.fetch(buildCloudRpcEndpoint(cloud, CLOUD_RPC_SUBMIT), {
      method: 'POST',
      headers: buildCloudHeaders(cloud),
      body: JSON.stringify({
        p_workspace_key: payload.workspace_key,
        p_player_name: payload.player_name,
        p_score: payload.score,
        p_distance: payload.distance,
        p_source: payload.source,
        p_app_version: payload.app_version,
        p_client_score_id: payload.client_score_id,
        p_client_created_at: payload.client_created_at
      })
    }).then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text || `Supabase HTTP ${response.status}`); });
      }
      return response.json();
    }).then(rows => Array.isArray(rows) && rows.length ? cloudRowToScore(rows[0]) : normalizeScoreEntry(entry));
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function normalizePlayerName(value) {
    const text = String(value == null ? '' : value).trim().replace(/\s+/g, ' ');
    return text ? text.slice(0, 32) : '';
  }

  function normalizeName(value) {
    return normalizePlayerName(value) || 'Игрок';
  }

  function isLegacyDefaultPlayerName(value) {
    const name = normalizePlayerName(value).toLowerCase();
    return name === 'техник';
  }

  function normalizeSyncStatus(value) {
    const text = String(value || '').trim();
    if (text === 'synced' || text === 'pending' || text === 'failed') return text;
    return 'pending';
  }

  function loadScores() {
    const storage = getStorage();
    if (!storage) return [];
    try {
      const raw = storage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map(normalizeScoreEntry)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_SCORES);
    } catch (err) {
      return [];
    }
  }

  function saveScores(scores) {
    const storage = getStorage();
    if (!storage) return false;
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(scores.slice(0, MAX_SCORES)));
      return true;
    } catch (err) {
      return false;
    }
  }

  function loadScoreQueue() {
    const storage = getStorage();
    if (!storage) return [];
    try {
      const parsed = JSON.parse(storage.getItem(SCORE_QUEUE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.map(normalizeScoreEntry) : [];
    } catch (err) {
      return [];
    }
  }

  function saveScoreQueue(items) {
    const storage = getStorage();
    if (!storage) return false;
    try {
      const normalized = (Array.isArray(items) ? items : []).map(normalizeScoreEntry);
      storage.setItem(SCORE_QUEUE_KEY, JSON.stringify(normalized.slice(-200)));
      return true;
    } catch (err) {
      return false;
    }
  }

  function upsertQueueEntry(entry) {
    const normalized = normalizeScoreEntry(entry || {});
    const queue = loadScoreQueue();
    const index = queue.findIndex(item => item.clientScoreId === normalized.clientScoreId || item.id === normalized.id);
    if (index >= 0) queue[index] = Object.assign({}, queue[index], normalized);
    else queue.push(normalized);
    saveScoreQueue(queue);
    return normalized;
  }

  function updateQueueEntry(clientScoreId, updates) {
    const id = String(clientScoreId || '');
    const queue = loadScoreQueue();
    const next = queue.map(item => {
      if (item.clientScoreId !== id && item.id !== id) return item;
      return normalizeScoreEntry(Object.assign({}, item, updates || {}));
    });
    saveScoreQueue(next);
    return next;
  }

  function pendingScoreQueue() {
    return loadScoreQueue().filter(item => item.syncStatus !== 'synced');
  }

  function saveScore(entry) {
    const normalized = normalizeScoreEntry(Object.assign({}, entry || {}, {
      id: entry && (entry.id || entry.localId || entry.clientScoreId) ? (entry.id || entry.localId || entry.clientScoreId) : makeLocalId(),
      date: entry && entry.date ? entry.date : new Date().toISOString()
    }));
    const existing = loadScores().filter(item => item.clientScoreId !== normalized.clientScoreId && item.id !== normalized.id);
    const next = existing.concat(normalized).sort((a, b) => b.score - a.score).slice(0, MAX_SCORES);
    saveScores(next);
    return next;
  }

  function getSavedPlayerName() {
    const storage = getStorage();
    if (!storage) return '';
    try {
      const saved = storage.getItem(PLAYER_KEY);
      if (isLegacyDefaultPlayerName(saved)) return '';
      return normalizePlayerName(saved);
    } catch (err) {
      return '';
    }
  }

  function setSavedPlayerName(value) {
    const storage = getStorage();
    if (!storage) return;
    try {
      const name = normalizePlayerName(value);
      if (name) storage.setItem(PLAYER_KEY, name);
      else storage.removeItem(PLAYER_KEY);
    } catch (err) {}
  }

  function formatScore(value) {
    const number = Math.max(0, Math.round(Number(value) || 0));
    return number.toLocaleString('ru-RU');
  }

  function syncOneQueuedScore(entry, settings) {
    const normalized = normalizeScoreEntry(entry || {});
    return saveCloudScore(normalized, settings).then(remote => {
      updateQueueEntry(normalized.clientScoreId, {
        synced: true,
        syncStatus: 'synced',
        remoteId: remote && remote.remoteId,
        syncError: ''
      });
      saveScore(Object.assign({}, normalized, {
        synced: true,
        syncStatus: 'synced',
        remoteId: remote && remote.remoteId,
        syncError: ''
      }));
      return remote;
    }).catch(error => {
      updateQueueEntry(normalized.clientScoreId, {
        synced: false,
        syncStatus: 'failed',
        syncError: String(error && error.message || error).slice(0, 260)
      });
      throw error;
    });
  }

  function syncPendingScores(settings) {
    const cloud = normalizeCloudSettings(settings || loadCloudSettings());
    const pending = pendingScoreQueue();
    if (!pending.length) return Promise.resolve({ attempted: 0, synced: 0, failed: 0 });
    if (!hasCloudSettings(cloud) || typeof window.fetch !== 'function') {
      return Promise.resolve({ attempted: pending.length, synced: 0, failed: pending.length, skipped: true });
    }
    let chain = Promise.resolve({ attempted: pending.length, synced: 0, failed: 0 });
    pending.forEach(entry => {
      chain = chain.then(summary => syncOneQueuedScore(entry, cloud)
        .then(() => Object.assign({}, summary, { synced: summary.synced + 1 }))
        .catch(() => Object.assign({}, summary, { failed: summary.failed + 1 })));
    });
    return chain;
  }

  function renderLeaderboard(items) {
    const scores = (Array.isArray(items) ? items : loadScores()).map(normalizeScoreEntry).sort((a, b) => b.score - a.score).slice(0, MAX_SCORES);
    if (!scores.length) {
      return '<div class="feg-runner-empty">Пока рекордов нет. Самое время занести первого техника в базу.</div>';
    }
    return `
      <ol class="feg-runner-leaderboard-list">
        ${scores.slice(0, 8).map((item, index) => `
          <li>
            <span class="feg-runner-leaderboard-rank">${index + 1}</span>
            <span class="feg-runner-leaderboard-name">${escapeHtml(item.name)}</span>
            <strong>${formatScore(item.score)}</strong>
          </li>`).join('')}
      </ol>`;
  }

  function isLightTheme() {
    return document.body && document.body.classList.contains('theme-light');
  }

  function makeModal(root) {
    const mount = root && root.querySelector ? root.querySelector('[data-feg-user-guide-root]') || root : document.body;
    const old = document.querySelector('[data-feg-runner-modal]');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    const wrap = document.createElement('div');
    wrap.className = 'feg-runner-backdrop open';
    wrap.setAttribute('data-feg-runner-modal', 'true');
    wrap.setAttribute('data-feg-runner-mobile-ready', 'true');
    wrap.innerHTML = `
      <article class="feg-runner-modal" role="dialog" aria-modal="true" aria-labelledby="fegRunnerTitle">
        <header class="feg-runner-head">
          <div>
            <div class="feg-runner-kicker">пасхалка · мини-раннер</div>
            <h2 id="fegRunnerTitle">Техник бежит на площадку</h2>
            <p>Прыгайте через фермы, сцены, LED-кабинеты, провода и декор. Рекорды жёстко привязаны к общей Supabase-базе FEG; localStorage используется только как офлайн-очередь, пока нет сети.</p>
          </div>
          <button type="button" class="feg-runner-close" data-feg-runner-close aria-label="Закрыть игру">×</button>
        </header>
        <div class="feg-runner-layout">
          <section class="feg-runner-game-panel">
            <div class="feg-runner-canvas-wrap">
              <canvas class="feg-runner-canvas" width="900" height="320" data-feg-runner-canvas aria-label="Игровое поле"></canvas>
              <div class="feg-runner-start-panel" data-feg-runner-start-panel>
                <div class="feg-runner-start-card">
                  <span>RUNNER MODE</span>
                  <strong>FEG TECH RUN</strong>
                  <small>Пробел / клик / тап по экрану — прыжок. На телефоне игра открывается полноэкранно и просит горизонтальный режим.</small>
                </div>
              </div>
            </div>
            <div class="feg-runner-controls">
              <label class="feg-runner-name-field">
                <span>Имя для базы рекордов</span>
                <input type="text" data-feg-runner-name maxlength="32" autocomplete="nickname" placeholder="Введите имя" required value="${escapeHtml(getSavedPlayerName())}">
              </label>
              <button type="button" class="feg-runner-primary" data-feg-runner-start>Старт</button>
              <button type="button" class="feg-runner-secondary" data-feg-runner-jump>Прыжок</button>
            </div>
            <div class="feg-runner-hint">Управление: <b>Space</b> / <b>↑</b> / <b>W</b>, клик или тап по игровому полю. На телефоне — тап по экрану.</div>
          </section>
          <aside class="feg-runner-score-panel">
            <div class="feg-runner-stat-grid">
              <div><span>Очки</span><strong data-feg-runner-score>0</strong></div>
              <div><span>Дистанция</span><strong data-feg-runner-distance>0 м</strong></div>
            </div>
            <div class="feg-runner-message" data-feg-runner-message>Введите имя и нажмите старт.</div>
            <div class="feg-runner-leaderboard">
              <div class="feg-runner-leaderboard-head">
                <span>Общая база FEG</span>
                <strong>TOP-20</strong>
              </div>
              <div data-feg-runner-leaderboard>${renderLeaderboard()}</div>
            </div>
            <div class="feg-runner-cloud">
              <div class="feg-runner-cloud-head">
                <span>Синхронизация</span>
                <strong data-feg-runner-cloud-status>Локально</strong>
              </div>
              <p data-feg-runner-cloud-note>Настройки базы уже встроены в приложение. Пользователь ничего не вводит: каждый результат отправляется в общий рейтинг, а без сети остаётся в очереди выгрузки.</p>
              <div class="feg-runner-cloud-actions">
                <button type="button" class="feg-runner-secondary" data-feg-runner-refresh>Обновить базу</button>
              </div>
            </div>
          </aside>
        </div>
      </article>`;
    mount.appendChild(wrap);
    return wrap;
  }

  function drawTruss(ctx, x, y, w, h, colors) {
    ctx.save();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colors.metal;
    ctx.beginPath();
    ctx.moveTo(x, y + 8);
    ctx.lineTo(x + w, y + 8);
    ctx.moveTo(x, y + h - 8);
    ctx.lineTo(x + w, y + h - 8);
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.strokeStyle = colors.metalDark;
    const step = w / 3;
    for (let i = 0; i < 3; i += 1) {
      const sx = x + i * step;
      ctx.beginPath();
      ctx.moveTo(sx, y + h - 8);
      ctx.lineTo(sx + step, y + 8);
      ctx.moveTo(sx, y + 8);
      ctx.lineTo(sx + step, y + h - 8);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawStage(ctx, x, y, w, h, colors) {
    ctx.save();
    ctx.fillStyle = colors.deck;
    ctx.strokeStyle = colors.gold;
    ctx.lineWidth = 3;
    ctx.fillRect(x, y + 4, w, 14);
    ctx.strokeRect(x, y + 4, w, 14);
    ctx.strokeStyle = colors.metal;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 20);
    ctx.lineTo(x + 8, y + h);
    ctx.moveTo(x + w - 8, y + 20);
    ctx.lineTo(x + w - 8, y + h);
    ctx.moveTo(x + 16, y + h - 10);
    ctx.lineTo(x + w - 16, y + 28);
    ctx.moveTo(x + w - 16, y + h - 10);
    ctx.lineTo(x + 16, y + 28);
    ctx.stroke();
    ctx.restore();
  }

  function drawLed(ctx, x, y, w, h, colors) {
    ctx.save();
    ctx.fillStyle = colors.ledFace;
    ctx.strokeStyle = colors.metal;
    ctx.lineWidth = 4;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = colors.ledPixel;
    for (let px = x + 8; px < x + w - 6; px += 9) {
      for (let py = y + 8; py < y + h - 6; py += 9) {
        ctx.fillRect(px, py, 2, 2);
      }
    }
    ctx.strokeStyle = colors.gold;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
    ctx.restore();
  }

  function drawCable(ctx, x, y, w, h, colors) {
    ctx.save();
    ctx.strokeStyle = colors.cable;
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 0; i <= 24; i += 1) {
      const t = i / 24;
      const px = x + t * w;
      const py = y + h * 0.5 + Math.sin(t * Math.PI * 4) * h * 0.28;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawDecor(ctx, x, y, w, h, colors) {
    ctx.save();
    ctx.fillStyle = colors.decor;
    ctx.strokeStyle = colors.gold;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.5, y);
    ctx.lineTo(x + w, y + h * 0.42);
    ctx.lineTo(x + w * 0.72, y + h);
    ctx.lineTo(x + w * 0.2, y + h * 0.85);
    ctx.lineTo(x, y + h * 0.28);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawRunner(ctx, player, colors) {
    const x = player.x;
    const y = player.y;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = colors.runnerLine;
    ctx.lineWidth = 5;
    ctx.fillStyle = colors.runnerSuit;
    ctx.beginPath();
    ctx.arc(x + 26, y + 18, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = colors.gold;
    ctx.fillRect(x + 14, y + 8, 24, 6);
    ctx.fillStyle = colors.runnerSuit;
    ctx.strokeRect(x + 18, y + 32, 22, 30);
    ctx.fillRect(x + 18, y + 32, 22, 30);
    const step = Math.sin(player.frame * 0.018) * 7;
    ctx.beginPath();
    ctx.moveTo(x + 20, y + 62);
    ctx.lineTo(x + 10 + step, y + 84);
    ctx.moveTo(x + 38, y + 62);
    ctx.lineTo(x + 48 - step, y + 84);
    ctx.moveTo(x + 20, y + 40);
    ctx.lineTo(x + 5, y + 55 - step * 0.3);
    ctx.moveTo(x + 40, y + 42);
    ctx.lineTo(x + 55, y + 54 + step * 0.3);
    ctx.stroke();
    ctx.fillStyle = colors.case;
    ctx.strokeStyle = colors.runnerLine;
    ctx.lineWidth = 3;
    ctx.fillRect(x + 54, y + 50, 24, 18);
    ctx.strokeRect(x + 54, y + 50, 24, 18);
    ctx.restore();
  }

  function buildPalette() {
    if (isLightTheme()) {
      return {
        bgTop: '#f8fafc', bgBottom: '#e5e7eb', grid: 'rgba(15,23,42,0.10)', floor: '#334155', metal: '#64748b', metalDark: '#334155', gold: '#d69f2d', deck: '#111827', ledFace: '#111827', ledPixel: '#94a3b8', cable: '#7c3aed', decor: '#475569', runnerSuit: '#f8fafc', runnerLine: '#0f172a', case: '#c084fc', text: '#0f172a'
      };
    }
    return {
      bgTop: '#111418', bgBottom: '#07090c', grid: 'rgba(255,255,255,0.08)', floor: '#f3c64e', metal: '#d1d5db', metalDark: '#9ca3af', gold: '#f3c64e', deck: '#1f2937', ledFace: '#020617', ledPixel: '#a78bfa', cable: '#c084fc', decor: '#94a3b8', runnerSuit: '#111827', runnerLine: '#f9fafb', case: '#f3c64e', text: '#f8fafc'
    };
  }

  function RunnerGame(modal) {
    this.modal = modal;
    this.canvas = modal.querySelector('[data-feg-runner-canvas]');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.scoreNode = modal.querySelector('[data-feg-runner-score]');
    this.distanceNode = modal.querySelector('[data-feg-runner-distance]');
    this.messageNode = modal.querySelector('[data-feg-runner-message]');
    this.startPanel = modal.querySelector('[data-feg-runner-start-panel]');
    this.leaderboardNode = modal.querySelector('[data-feg-runner-leaderboard]');
    this.nameInput = modal.querySelector('[data-feg-runner-name]');
    this.startButton = modal.querySelector('[data-feg-runner-start]');
    this.jumpButton = modal.querySelector('[data-feg-runner-jump]');
    this.cloudStatusNode = modal.querySelector('[data-feg-runner-cloud-status]');
    this.cloudNoteNode = modal.querySelector('[data-feg-runner-cloud-note]');
    this.cloudRefreshButton = modal.querySelector('[data-feg-runner-refresh]');
    this.cloudSaveButton = modal.querySelector('[data-feg-runner-save-cloud]');
    this.cloudInputs = {};
    this.raf = 0;
    this.state = this.makeState();
    // Bound methods for proper cleanup (v3.1.88 audit fix)
    this.boundFrame = this.frame.bind(this);
    this.boundKey = this.onKey.bind(this);
    this.boundJump = () => this.jump();
    this.boundCanvasTouchJump = (event) => { event.preventDefault(); this.jump(); };
    this.boundCanvasPointerJump = (event) => {
      if (isInteractiveTarget(event.target)) return;
      if (event.pointerType === 'touch' || event.pointerType === 'pen' || isMobileViewport()) this.jump();
    };
    this.boundRefreshLeaderboard = () => this.refreshLeaderboard();
  }

  RunnerGame.prototype.makeState = function () {
    return {
      running: false,
      over: false,
      last: 0,
      elapsed: 0,
      score: 0,
      distance: 0,
      speed: 5.3,
      spawnTimer: 980,
      obstacles: [],
      player: { x: 92, y: 202, w: 70, h: 86, vy: 0, grounded: true, frame: 0, jumpHold: 0 }
    };
  };

  RunnerGame.prototype.readCloudSettingsFromUi = function () {
    return loadCloudSettings();
  };

  RunnerGame.prototype.syncCloudInputs = function () {};

  RunnerGame.prototype.setCloudStatus = function (status, note) {
    if (this.cloudStatusNode) this.cloudStatusNode.textContent = status;
    if (this.cloudNoteNode) this.cloudNoteNode.textContent = note;
  };

  RunnerGame.prototype.renderLocalLeaderboard = function () {
    if (this.leaderboardNode) this.leaderboardNode.innerHTML = renderLeaderboard(loadScores());
  };

  RunnerGame.prototype.refreshLeaderboard = function () {
    const settings = loadCloudSettings();
    const pending = pendingScoreQueue();
    this.setCloudStatus('Синхронизация…', pending.length ? `Сначала выгружаем очередь: ${pending.length}` : 'Читаем общий TOP-20');
    return syncPendingScores(settings).then(summary => {
      const suffix = summary && summary.attempted ? ` · очередь ${summary.synced}/${summary.attempted}` : '';
      this.setCloudStatus('Подключение…', `Читаем общую базу FEG${suffix}`);
      return fetchCloudScores(settings);
    }).then(scores => {
      if (this.leaderboardNode) this.leaderboardNode.innerHTML = renderLeaderboard(scores);
      this.setCloudStatus('Supabase online', 'Общий TOP-20 подключён · workspace: feg-main');
      return scores;
    }).catch(error => {
      this.renderLocalLeaderboard();
      this.setCloudStatus('Очередь ожидает', `Supabase недоступна или RPC ещё не создан. Результаты не потеряны и будут выгружены позже: ${String(error && error.message || error).slice(0, 140)}`);
      return loadScores();
    });
  };

  RunnerGame.prototype.saveCloudSettingsFromUi = function () {
    return this.refreshLeaderboard();
  };

  RunnerGame.prototype.requirePlayerName = function () {
    const name = normalizePlayerName(this.nameInput ? this.nameInput.value : '');
    if (name) {
      if (this.nameInput) this.nameInput.value = name;
      return name;
    }
    if (this.startPanel) this.startPanel.hidden = false;
    if (this.messageNode) this.messageNode.textContent = 'Введите имя игрока перед стартом.';
    if (this.nameInput) {
      this.nameInput.value = '';
      this.nameInput.focus();
      if (typeof this.nameInput.reportValidity === 'function') this.nameInput.reportValidity();
    }
    return '';
  };

  RunnerGame.prototype.commitScore = function (entry) {
    const localId = makeLocalId();
    const localEntry = normalizeScoreEntry(Object.assign({}, entry || {}, {
      id: localId,
      localId,
      clientScoreId: localId,
      date: new Date().toISOString(),
      synced: false,
      syncStatus: 'pending'
    }));
    upsertQueueEntry(localEntry);
    const localScores = saveScore(localEntry);
    if (this.leaderboardNode) this.leaderboardNode.innerHTML = renderLeaderboard(localScores);
    const settings = loadCloudSettings();
    if (!hasCloudSettings(settings)) {
      this.setCloudStatus('Ожидает Supabase', 'Результат поставлен в очередь обязательной выгрузки. Встроенная база недоступна в этом окружении.');
      return Promise.resolve({ mode: 'queued', scores: localScores });
    }
    this.setCloudStatus('Выгрузка…', 'Обязательная отправка результата в общую Supabase-базу FEG');
    return syncOneQueuedScore(localEntry, settings).then(() => {
      this.setCloudStatus('Supabase online', 'Результат записан в общую онлайн-базу.');
      return this.refreshLeaderboard().then(scores => ({ mode: 'cloud', scores }));
    }).catch(error => {
      this.setCloudStatus('Очередь ожидает', `Supabase не приняла запись. Результат остаётся в очереди выгрузки: ${String(error && error.message || error).slice(0, 140)}`);
      return { mode: 'queued-failed', scores: localScores, error };
    });
  };

  RunnerGame.prototype.start = function () {
    const name = this.requirePlayerName();
    if (!name) return false;
    setSavedPlayerName(name);
    this.state = this.makeState();
    this.state.running = true;
    this.state.last = performance.now();
    if (this.startPanel) this.startPanel.hidden = true;
    if (this.messageNode) this.messageNode.textContent = 'Беги, техник!';
    if (this.startButton) this.startButton.textContent = 'Рестарт';
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.boundFrame);
    return true;
  };

  RunnerGame.prototype.stop = function () {
    this.state.running = false;
    cancelAnimationFrame(this.raf);
  };

  RunnerGame.prototype.jump = function () {
    const player = this.state.player;
    if (!this.state.running) {
      if (!this.start()) return;
      return;
    }
    if (player.grounded) {
      player.vy = RUNNER_PHYSICS.jumpVelocity;
      player.jumpHold = RUNNER_PHYSICS.jumpHoldMs;
      player.grounded = false;
    }
  };

  RunnerGame.prototype.onKey = function (event) {
    const key = event.key;
    if (key === ' ' || key === 'ArrowUp' || key === 'w' || key === 'W' || key === 'ц' || key === 'Ц') {
      event.preventDefault();
      this.jump();
    }
  };

  function isMobileViewport() {
    return Boolean(window.matchMedia && window.matchMedia('(max-width: 767px)').matches);
  }

  function isInteractiveTarget(target) {
    return Boolean(target && target.closest && target.closest('button, input, textarea, select, summary, details, a, [data-feg-runner-close]'));
  }

  RunnerGame.prototype.bind = function () {
    if (this.startButton) this.startButton.addEventListener('click', () => this.start());
    if (this.jumpButton) this.jumpButton.addEventListener('click', this.boundJump);
    if (this.canvas) {
      this.canvas.addEventListener('click', this.boundJump);
      this.canvas.addEventListener('touchstart', this.boundCanvasTouchJump, { passive: false });
    }
    const canvasWrap = this.modal.querySelector('.feg-runner-canvas-wrap');
    if (canvasWrap) {
      canvasWrap.addEventListener('pointerdown', this.boundCanvasPointerJump);
    }
    if (this.cloudRefreshButton) this.cloudRefreshButton.addEventListener('click', this.boundRefreshLeaderboard);
    window.addEventListener('keydown', this.boundKey);
    this.draw();
    this.refreshLeaderboard();
  };

  RunnerGame.prototype.destroy = function () {
    this.stop();
    // Clean up event listeners (v3.1.88 audit fix)
    if (this.jumpButton) this.jumpButton.removeEventListener('click', this.boundJump);
    if (this.canvas) {
      this.canvas.removeEventListener('click', this.boundJump);
      this.canvas.removeEventListener('touchstart', this.boundCanvasTouchJump);
    }
    const canvasWrap = this.modal.querySelector('.feg-runner-canvas-wrap');
    if (canvasWrap) {
      canvasWrap.removeEventListener('pointerdown', this.boundCanvasPointerJump);
    }
    if (this.cloudRefreshButton) this.cloudRefreshButton.removeEventListener('click', this.boundRefreshLeaderboard);
    window.removeEventListener('keydown', this.boundKey);
  };

  RunnerGame.prototype.spawnObstacle = function () {
    const types = [
      { type: 'truss', w: 78, h: 38 },
      { type: 'stage', w: 74, h: 44 },
      { type: 'led', w: 44, h: 56 },
      { type: 'cable', w: 70, h: 18 },
      { type: 'decor', w: 40, h: 44 }
    ];
    const item = types[Math.floor(Math.random() * types.length)];
    const ground = RUNNER_PHYSICS.groundY;
    this.state.obstacles.push({
      type: item.type,
      x: 930,
      y: ground - item.h,
      w: item.w,
      h: item.h,
      passed: false
    });
  };

  RunnerGame.prototype.frame = function (now) {
    if (!this.state.running) return;
    const dt = clamp(now - this.state.last, 0, 38);
    this.state.last = now;
    this.update(dt);
    this.draw();
    this.raf = requestAnimationFrame(this.boundFrame);
  };

  RunnerGame.prototype.update = function (dt) {
    const state = this.state;
    const player = state.player;
    const groundY = RUNNER_PHYSICS.groundY;
    state.elapsed += dt;
    state.speed = Math.min(11.2, 5.3 + state.elapsed / 22000);
    state.distance += state.speed * dt * 0.012;
    state.score = Math.round(state.distance * 10 + state.elapsed * 0.018);
    state.spawnTimer -= dt;
    if (state.spawnTimer <= 0) {
      this.spawnObstacle();
      state.spawnTimer = Math.max(720, 1450 - state.elapsed / 60) + Math.random() * 620;
    }
    player.frame += dt;
    // Physics step normalization: clamp(dt/16.67, 0.5, 2.25)
    // At 60 FPS: dt ≈ 16.67ms → physicsStep = 1.0 (normal)
    // At 30 FPS: dt ≈ 33ms → physicsStep = 2.0 (slowed down, no tunneling)
    // At 15 FPS: dt ≈ 66ms → physicsStep = 2.25 (clamped, frame lag visible)
    // On slow devices: game delays rather than skips obstacles.
    // v3.1.88 audit note: frame() already clamps dt to 38ms max, so this is safe.
    const physicsStep = clamp(dt / 16.6667, 0.5, 2.25);
    if (!player.grounded && player.jumpHold > 0 && player.vy < 0) {
      player.jumpHold = Math.max(0, player.jumpHold - dt);
      player.vy += RUNNER_PHYSICS.ascentGravity * physicsStep;
    } else {
      const gravity = player.vy < 0 ? RUNNER_PHYSICS.ascentGravity * 1.1 : RUNNER_PHYSICS.fallGravity;
      player.vy += gravity * physicsStep;
    }
    player.vy = clamp(player.vy, RUNNER_PHYSICS.jumpVelocity, RUNNER_PHYSICS.maxFallSpeed);
    player.y += player.vy * physicsStep;
    if (player.y + player.h >= groundY) {
      player.y = groundY - player.h;
      player.vy = 0;
      player.grounded = true;
      player.jumpHold = 0;
    }
    state.obstacles.forEach(obstacle => {
      obstacle.x -= state.speed * dt * 0.11;
      if (!obstacle.passed && obstacle.x + obstacle.w < player.x) {
        obstacle.passed = true;
        state.score += 35;
      }
    });
    state.obstacles = state.obstacles.filter(obstacle => obstacle.x + obstacle.w > -60);
    const playerBox = { x: player.x + 18, y: player.y + 12, w: player.w - 34, h: player.h - 20 };
    const hit = state.obstacles.some(obstacle => {
      const padX = obstacle.type === 'cable' ? 14 : 11;
      const padY = obstacle.type === 'cable' ? 8 : 12;
      const box = { x: obstacle.x + padX, y: obstacle.y + padY, w: obstacle.w - padX * 2, h: obstacle.h - padY * 2 };
      return playerBox.x < box.x + box.w && playerBox.x + playerBox.w > box.x && playerBox.y < box.y + box.h && playerBox.y + playerBox.h > box.y;
    });
    if (hit) this.gameOver();
    this.updateHud();
  };

  RunnerGame.prototype.updateHud = function () {
    if (this.scoreNode) this.scoreNode.textContent = formatScore(this.state.score);
    if (this.distanceNode) this.distanceNode.textContent = `${formatScore(this.state.distance)} м`;
  };

  RunnerGame.prototype.gameOver = function () {
    if (!this.state.running) return;
    this.state.running = false;
    this.state.over = true;
    cancelAnimationFrame(this.raf);
    const name = normalizePlayerName(this.nameInput ? this.nameInput.value : '') || 'Игрок';
    this.commitScore({ name, score: this.state.score, distance: this.state.distance }).then(result => {
      if (!this.messageNode) return;
      if (result && result.mode === 'cloud') this.messageNode.textContent = `Финиш: ${formatScore(this.state.score)} очков. Результат занесён в общую онлайн-базу.`;
      else if (result && result.mode === 'queued-failed') this.messageNode.textContent = `Финиш: ${formatScore(this.state.score)} очков. Результат ждёт повторной выгрузки в Supabase.`;
      else this.messageNode.textContent = `Финиш: ${formatScore(this.state.score)} очков. Результат поставлен в очередь выгрузки в Supabase.`;
    });
    if (this.messageNode) this.messageNode.textContent = `Финиш: ${formatScore(this.state.score)} очков. Сохраняем результат…`;
    if (this.startPanel) {
      this.startPanel.hidden = false;
      const card = this.startPanel.querySelector('.feg-runner-start-card');
      if (card) {
        card.innerHTML = `<span>GAME OVER</span><strong>${formatScore(this.state.score)} очков</strong><small>Результат поставлен в очередь общей базы. Нажмите «Рестарт», чтобы попробовать ещё раз.</small>`;
      }
    }
    if (this.startButton) this.startButton.textContent = 'Рестарт';
    this.draw();
  };

  RunnerGame.prototype.drawObstacle = function (ctx, obstacle, colors) {
    if (obstacle.type === 'truss') drawTruss(ctx, obstacle.x, obstacle.y, obstacle.w, obstacle.h, colors);
    else if (obstacle.type === 'stage') drawStage(ctx, obstacle.x, obstacle.y, obstacle.w, obstacle.h, colors);
    else if (obstacle.type === 'led') drawLed(ctx, obstacle.x, obstacle.y, obstacle.w, obstacle.h, colors);
    else if (obstacle.type === 'cable') drawCable(ctx, obstacle.x, obstacle.y, obstacle.w, obstacle.h, colors);
    else drawDecor(ctx, obstacle.x, obstacle.y, obstacle.w, obstacle.h, colors);
  };

  RunnerGame.prototype.draw = function () {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const colors = buildPalette();
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, colors.bgTop);
    gradient.addColorStop(1, colors.bgBottom);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x - 70, height);
      ctx.stroke();
    }
    ctx.strokeStyle = colors.floor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 286);
    ctx.lineTo(width, 286);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.35;
    for (let x = -20; x < width; x += 44) {
      ctx.beginPath();
      ctx.moveTo(x, 292);
      ctx.lineTo(x + 24, 292);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    this.state.obstacles.forEach(obstacle => this.drawObstacle(ctx, obstacle, colors));
    drawRunner(ctx, this.state.player, colors);
    ctx.fillStyle = colors.text;
    ctx.font = '700 18px Inter, system-ui, sans-serif';
    ctx.fillText(`SCORE ${formatScore(this.state.score)}`, 22, 34);
    ctx.font = '600 12px Inter, system-ui, sans-serif';
    ctx.fillText('FEG TECH RUN', 22, 56);
  };

  function requestMobileFullscreen(modal) {
    if (!modal || !isMobileViewport()) return;
    if (document.body && document.body.classList) document.body.classList.add('feg-runner-mobile-active');
    modal.setAttribute('data-feg-runner-mobile-fullscreen', 'true');
    const fullscreenTarget = modal.querySelector('.feg-runner-modal') || modal;
    try {
      if (fullscreenTarget.requestFullscreen) {
        Promise.resolve(fullscreenTarget.requestFullscreen({ navigationUI: 'hide' })).catch(() => {});
      }
    } catch (err) {}
    try {
      const orientation = window.screen && window.screen.orientation;
      if (orientation && orientation.lock) Promise.resolve(orientation.lock('landscape')).catch(() => {});
    } catch (err) {}
  }

  function releaseMobileFullscreen(modal) {
    if (document.body && document.body.classList) document.body.classList.remove('feg-runner-mobile-active');
    try {
      const orientation = window.screen && window.screen.orientation;
      if (orientation && orientation.unlock) orientation.unlock();
    } catch (err) {}
    try {
      if (document.fullscreenElement && modal && modal.contains(document.fullscreenElement) && document.exitFullscreen) {
        Promise.resolve(document.exitFullscreen()).catch(() => {});
      }
    } catch (err) {}
  }

  function open(root) {
    const modal = makeModal(root);
    const game = new RunnerGame(modal);
    game.bind();
    requestMobileFullscreen(modal);
    const close = () => {
      game.destroy();
      releaseMobileFullscreen(modal);
      if (modal.parentNode) modal.parentNode.removeChild(modal);
      window.removeEventListener('keydown', onCloseKey);
    };
    const onCloseKey = event => { if (event.key === 'Escape') close(); };
    const closeBtn = modal.querySelector('[data-feg-runner-close]');
    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', event => { if (event.target === modal) close(); });
    window.addEventListener('keydown', onCloseKey);
    setTimeout(() => {
      const input = modal.querySelector('[data-feg-runner-name]');
      if (input) input.focus();
    }, 0);
    return modal;
  }

  function bind(root) {
    const scope = root && root.querySelector ? root : document;
    const heroCard = scope.querySelector('.feg-hero-card');
    const heroArt = scope.querySelector('.feg-hero-art');
    if (!heroCard || heroCard.getAttribute('data-feg-runner-bound') === 'true') return;
    heroCard.setAttribute('data-feg-runner-bound', 'true');
    heroCard.setAttribute('data-feg-runner-open', 'true');
    heroCard.setAttribute('role', 'button');
    heroCard.setAttribute('tabindex', '0');
    heroCard.setAttribute('title', 'Запустить FEG TECH RUN');
    if (heroArt) heroArt.setAttribute('alt', `${heroArt.getAttribute('alt') || 'FEG Stage PRO'} · нажмите для мини-игры`);
    heroCard.addEventListener('click', () => open(scope));
    heroCard.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(scope);
      }
    });
  }

  ROOT.MiniRunnerGame = {
    version: APP_VERSION,
    bind,
    open,
    loadScores,
    saveScore,
    loadScoreQueue,
    pendingScoreQueue,
    syncPendingScores,
    fetchCloudScores,
    saveCloudScore
  };
})();
