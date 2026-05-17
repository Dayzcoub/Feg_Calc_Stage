(function () {
  'use strict';
  const ROOT = (window.FEGModules = window.FEGModules || {});
  const UI = (ROOT.LogicUiRuntime = ROOT.LogicUiRuntime || {});
  const VERSION = '3.1.13-pre-desktop-responsive-usability';

  function injectLayoutFixCss() {
    if (document.getElementById('feg-v312-pre-desktop-responsive-usability')) return;
    const style = document.createElement('style');
    style.id = 'feg-v312-pre-desktop-responsive-usability';
    style.textContent = `
      /* v3.1.13 runtime only keeps scroll stability + breakpoint body markers.
         Visual responsive rules live in styles/breakpoints.css. */
      html, body {
        height:auto !important;
        min-height:100% !important;
        overflow-x:hidden !important;
        overflow-y:auto !important;
      }
      body.v4-only-body.quick-standalone-body {
        height:auto !important;
        min-height:100dvh !important;
        overflow-x:hidden !important;
        overflow-y:auto !important;
      }
      body.v4-only-body.quick-standalone-body .standalone-sidebar { display:none !important; }
      body.v4-only-body.quick-standalone-body .standalone-body {
        display:block !important;
        grid-template-columns:minmax(0,1fr) !important;
        overflow:visible !important;
      }
      body.v4-only-body.quick-standalone-body .standalone-window,
      body.v4-only-body.quick-standalone-body .standalone-main,
      body.v4-only-body.quick-standalone-body #quickStandalonePage,
      body.v4-only-body.quick-standalone-body #quickStandaloneMount,
      body.v4-only-body.quick-standalone-body .feg-dashboard,
      body.v4-only-body.quick-standalone-body .feg-workspace-shell,
      body.v4-only-body.quick-standalone-body .feg-workspace-stage,
      body.v4-only-body.quick-standalone-body .feg-workspace-body {
        max-height:none !important;
        overflow:visible !important;
      }
      @media (max-width:767px) {
        body.v4-only-body.quick-standalone-body #quickStandalonePage {
          overflow-y:auto !important;
          -webkit-overflow-scrolling:touch !important;
        }
        body.v4-only-body.quick-standalone-body .standalone-window {
          width:100% !important;
          border-radius:0 !important;
        }
        body.v4-only-body.quick-standalone-body .v4-stage-canvas-wrap,
        body.v4-only-body.quick-standalone-body .v4-truss-field-wrap,
        body.v4-only-body.quick-standalone-body .v4-led-grid-wrap {
          overflow:auto !important;
          -webkit-overflow-scrolling:touch !important;
        }
      }`;
    document.head.appendChild(style);
  }

  function unlockMobilePageScroll() {
    const apply = () => {
      const isMobile = window.innerWidth <= 768;
      document.documentElement.style.overflowY = 'auto';
      document.documentElement.style.height = 'auto';
      if (document.body) {
        document.body.style.overflowY = 'auto';
        document.body.style.height = 'auto';
        document.body.style.position = 'static';
        document.body.style.webkitOverflowScrolling = 'touch';
      }
      const nodes = [
        document.getElementById('quickStandalonePage'),
        document.querySelector('.standalone-window'),
        document.querySelector('.standalone-body'),
        document.querySelector('.standalone-main'),
        document.getElementById('quickStandaloneMount'),
        document.querySelector('.standalone-mount'),
        document.querySelector('.feg-dashboard'),
        document.querySelector('.feg-workspace-shell'),
        document.querySelector('.feg-workspace-stage'),
        document.querySelector('.feg-workspace-body')
      ];
      nodes.forEach(el => {
        if (!el) return;
        el.style.height = 'auto';
        el.style.minHeight = '0';
        el.style.maxHeight = 'none';
        el.style.overflow = 'visible';
        el.style.overflowY = 'visible';
        el.style.webkitOverflowScrolling = 'touch';
        el.style.position = el.classList && el.classList.contains('standalone-topbar') ? 'sticky' : 'static';
      });
    };
    apply();
    window.addEventListener('resize', apply, { passive: true });
    window.addEventListener('orientationchange', apply, { passive: true });
  }

  function lockDarkTheme() {
    try {
      if (localStorage.getItem('appTheme') === 'light') localStorage.setItem('appTheme', 'dark');
      localStorage.setItem('appTheme', 'dark');
    } catch (_) {}
    document.documentElement.classList.remove('theme-light');
    document.body && document.body.classList.remove('theme-light');
    document.documentElement.setAttribute('data-app-theme', 'dark');
    document.documentElement.style.colorScheme = 'dark';
    if (document.body) document.body.style.colorScheme = 'dark';
  }

  function syncStageEdgeClosure(root) {
    const scope = root || document;
    scope.querySelectorAll('.v4-stage-control-stack--closure').forEach(stack => {
      const checkbox = stack.querySelector('[data-stage-edge-enabled]');
      const type = stack.querySelector('[data-stage-edge-type]');
      const label = type && type.closest('label');
      const update = () => {
        const enabled = !!(checkbox && checkbox.checked);
        stack.classList.toggle('feg-edge-disabled', !enabled);
        if (label) label.hidden = !enabled;
        if (type) type.disabled = !enabled;
      };
      if (checkbox && !checkbox._fegLogicUiEdgeBound) {
        checkbox.addEventListener('change', update);
        checkbox._fegLogicUiEdgeBound = true;
      }
      update();
    });
  }

  function tagConstructors(root) {
    const scope = root || document;
    scope.querySelectorAll('.v4-quick-modal').forEach(el => el.classList.add('feg-constructor-modal'));
    scope.querySelectorAll('.v4-quick-modal-head').forEach(el => el.classList.add('feg-constructor-header'));
    scope.querySelectorAll('.v4-quick-modal-head h3').forEach(el => el.classList.add('feg-constructor-title'));
    scope.querySelectorAll('[data-v4-structure-stage], [data-v4-structure-truss], [data-led-calculator]').forEach(el => el.classList.add('feg-mobile-stack'));
    syncStageEdgeClosure(scope);
  }

  function tagTables(root) {
    const scope = root || document;
    scope.querySelectorAll('.v4-table-wrap, .table-wrap, .bom-table-wrap, .summary-table-wrap').forEach(el => el.classList.add('feg-table-wrap'));
  }

  function refresh(root) {
    tagConstructors(root || document);
    tagTables(root || document);
    syncStageEdgeClosure(root || document);
  }


  function enableDesktopWheelScrollBridge() {
    if (window.__fegDesktopWheelScrollBridge) return;
    window.__fegDesktopWheelScrollBridge = true;
    const getScrollableParent = (start) => {
      let el = start && start.nodeType === 1 ? start : start && start.parentElement;
      while (el && el !== document.body && el !== document.documentElement) {
        const st = window.getComputedStyle(el);
        const canScrollY = /(auto|scroll)/.test(st.overflowY) && el.scrollHeight > el.clientHeight + 2;
        if (canScrollY) return el;
        el = el.parentElement;
      }
      return null;
    };
    const isFormControl = (target) => !!(target && target.closest && target.closest('input, textarea, select, [contenteditable="true"]'));
    const isRangeControl = (target) => !!(target && target.closest && target.closest('input[type="range"]'));
    const shouldUseNative = (target) => {
      if (isRangeControl(target)) return true;
      const scrollable = getScrollableParent(target);
      if (!scrollable) return false;
      if (scrollable.classList && (
        scrollable.classList.contains('standalone-main') ||
        scrollable.id === 'quickStandalonePage' ||
        scrollable.id === 'quickStandaloneMount'
      )) return false;
      const delta = Math.abs(window.event && window.event.deltaY || 0);
      return delta && scrollable.scrollHeight > scrollable.clientHeight + 2;
    };
    document.addEventListener('wheel', (event) => {
      if (!document.body || !document.body.classList.contains('quick-standalone-body')) return;
      if (event.ctrlKey || event.metaKey) return;
      if (isFormControl(event.target) && !isRangeControl(event.target)) return;
      const desktopWide = window.innerWidth >= 769;
      if (!desktopWide) return;
      if (shouldUseNative(event.target)) return;
      const deltaY = event.deltaY || 0;
      const deltaX = event.deltaX || 0;
      if (!deltaY && !deltaX) return;
      const before = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      window.scrollBy({ top: deltaY, left: deltaX, behavior: 'auto' });
      const after = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (after !== before || Math.abs(deltaY) > Math.abs(deltaX)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, { capture:true, passive:false });
  }

  function boot() {
    lockDarkTheme();
    injectLayoutFixCss();
    unlockMobilePageScroll();
    enableDesktopWheelScrollBridge();
    document.body && document.body.classList.add('feg-app-root', 'feg-logic-ui-rebuild');
    refresh(document);
  }

  UI.version = VERSION;
  UI.boot = boot;
  UI.refresh = refresh;
  UI.lockDarkTheme = lockDarkTheme;
  UI.injectLayoutFixCss = injectLayoutFixCss;
  UI.unlockMobilePageScroll = unlockMobilePageScroll;
  UI.enableDesktopWheelScrollBridge = enableDesktopWheelScrollBridge;
  UI.syncStageEdgeClosure = syncStageEdgeClosure;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
