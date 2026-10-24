/*
 * Unbadge: hides the promotional "Asli 4K" badge that the JioHotstar TV web app
 * shows during 4K playback. The broadcaster's own logo is left untouched.
 *
 * Purely cosmetic: it adds one stylesheet and changes nothing else in the page.
 * webOS injects this file into the app's frames (webOSUserScripts/userScript.js).
 */
(function () {
  'use strict';

  var STYLE_ID = 'unbadge';

  // The badge's wrapper, its animated SVG, and its static image fallback.
  var selectors = [
    '.ASLI_4K_LOGO_WRAPPER',
    '#Asli-4K-6',
    'img[src*="asli-4k"]'
  ];

  function addStyle() {
    if (document.getElementById(STYLE_ID)) return true;
    var root = document.head || document.documentElement;
    if (!root) return false;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = selectors.join(',\n') + ' { display: none !important; }';
    root.appendChild(style);
    return true;
  }

  if (!addStyle()) {
    document.addEventListener('DOMContentLoaded', addStyle, { once: true });
  }
})();
