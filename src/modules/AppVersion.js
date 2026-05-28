(function () {
  'use strict';

  var ROOT = (window.FEGModules = window.FEGModules || {});
  var VERSION = '3.1.101';
  var PRODUCT_NAME = 'FEG Stage PRO';
  var DISPLAY_NAME = PRODUCT_NAME + ' ' + VERSION;

  ROOT.AppVersion = Object.freeze({
    version: VERSION,
    productName: PRODUCT_NAME,
    displayName: DISPLAY_NAME,
    standaloneLabel: DISPLAY_NAME + ' · Standalone Quick Constructors',
    statusLabel: DISPLAY_NAME + ' · Standalone Quick Constructors · Stage / Truss / LED'
  });

  document.title = DISPLAY_NAME;
  document.documentElement.setAttribute('data-feg-app-version', VERSION);
})();
