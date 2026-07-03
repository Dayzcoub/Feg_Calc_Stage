(function () {
  'use strict';
  const ROOT = (window.FEGModules = window.FEGModules || {});
  const UI = (ROOT.LogicUiRuntime = ROOT.LogicUiRuntime || {});
  const VERSION = '3.1.54-tablet-desktop-surface-lock';

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
      @media (min-width:768px) {
        html, body {
          overflow-x:hidden !important;
          overflow-y:auto !important;
          overscroll-behavior-y:auto !important;
          scroll-behavior:auto !important;
        }
        body.v4-only-body.quick-standalone-body,
        body.v4-only-body.quick-standalone-body.quick-standalone-ready {
          overflow-x:hidden !important;
          overflow-y:auto !important;
          overscroll-behavior-y:auto !important;
          scroll-behavior:auto !important;
        }
        body.v4-only-body.quick-standalone-body #quickStandalonePage,
        body.v4-only-body.quick-standalone-body .standalone-window,
        body.v4-only-body.quick-standalone-body .standalone-body,
        body.v4-only-body.quick-standalone-body .standalone-main,
        body.v4-only-body.quick-standalone-body #quickStandaloneMount,
        body.v4-only-body.quick-standalone-body .standalone-mount,
        body.v4-only-body.quick-standalone-body .feg-dashboard,
        body.v4-only-body.quick-standalone-body .feg-workspace-shell,
        body.v4-only-body.quick-standalone-body .feg-workspace-stage,
        body.v4-only-body.quick-standalone-body .feg-workspace-body {
          max-height:none !important;
          overflow:visible !important;
          overscroll-behavior-y:auto !important;
        }
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
      const isMobile = window.innerWidth <= 767;
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

  function syncAppThemeRuntime() {
    const settings = window.FEGModules && window.FEGModules.AppSettings;
    const theme = settings && typeof settings.loadAppTheme === 'function'
      ? settings.loadAppTheme()
      : 'dark';
    if (settings && typeof settings.applyAppTheme === 'function') {
      settings.applyAppTheme(theme);
      return theme;
    }
    const normalized = theme === 'light' ? 'light' : 'dark';
    document.documentElement.classList.toggle('theme-light', normalized === 'light');
    document.documentElement.classList.toggle('theme-dark', normalized === 'dark');
    if (document.body) {
      document.body.classList.toggle('theme-light', normalized === 'light');
      document.body.classList.toggle('theme-dark', normalized === 'dark');
      document.body.setAttribute('data-app-theme', normalized);
      document.body.style.colorScheme = normalized === 'light' ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-app-theme', normalized);
    document.documentElement.style.colorScheme = normalized === 'light' ? 'light' : 'dark';
    return normalized;
  }

  function lockDarkTheme() {
    /* Backward-compatible public API name. v3.1.58 no longer hard-locks dark;
       it syncs the current allowed app theme. Light remains disabled until the
       explicit light-theme feature gate is enabled. */
    return syncAppThemeRuntime();
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
    /* v3.1.52: the previous desktop wheel bridge listened to every wheel event
       in capture mode with passive:false, then manually called window.scrollBy().
       That helped earlier locked layouts, but after the page-scroll rebuild it
       fights native browser momentum and makes desktop scrolling feel slow/jumpy.
       Desktop now uses native page scrolling; keep the function as a no-op so
       older boot code or external calls do not re-install the heavy listener. */
    if (window.__fegDesktopWheelScrollBridge) return;
    window.__fegDesktopWheelScrollBridge = 'native-scroll-v3.1.52';
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
  UI.syncAppThemeRuntime = syncAppThemeRuntime;
  UI.injectLayoutFixCss = injectLayoutFixCss;
  UI.unlockMobilePageScroll = unlockMobilePageScroll;
  UI.enableDesktopWheelScrollBridge = enableDesktopWheelScrollBridge;
  UI.syncStageEdgeClosure = syncStageEdgeClosure;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
