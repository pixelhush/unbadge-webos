/*
 * Unbadge: hides the "Asli 4K" overlay that the JioHotstar TV web app shows
 * during 4K playback: the badge and the corner logo shown next to it.
 *
 * Purely cosmetic: it adds one stylesheet to the app's on-screen interface and
 * changes nothing else. The video itself is never touched.
 * webOS injects this file into the app's frames (webOSUserScripts/userScript.js).
 */
(function () {
  'use strict';

  // ---- Settings -----------------------------------------------------------
  // true  = hide the Asli 4K badge AND the corner logo shown with it
  // false = hide only the Asli 4K badge
  var HIDE_CORNER_LOGO = true;
  // -------------------------------------------------------------------------

  var STYLE_ID = 'unbadge';

  // The badge's wrapper, its animated SVG, and its static image fallback.
  var selectors = [
    '.ASLI_4K_LOGO_WRAPPER',
    '#Asli-4K-6',
    'img[src*="asli-4k"]'
  ];

  // The corner logo images in the same playback overlay.
  if (HIDE_CORNER_LOGO) {
    selectors.push(
      'img[src*="/rebrand/logo_h"]',
      'img[src*="/rebrand/jhs-logo"]',
      '.fixed.right-10.top-10 img[src*="/rebrand/logo"]',
      '.fixed.ELEVATION_1 img[src*="/rebrand/logo"]'
    );
  }

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
