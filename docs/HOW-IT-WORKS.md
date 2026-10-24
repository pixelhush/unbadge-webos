# How it works

This page is for developers. If you just want to install Unbadge, see the [install guide](INSTALL.md).

## The short version

On LG TVs, JioHotstar runs as a web app in the TV's built-in web engine. Unbadge is a tiny webOS app that opens that same publicly served TV web app and adds **one stylesheet** that hides the "Asli 4K" overlay (the badge and the corner logo shown with it during 4K playback).

- No JioHotstar code is copied, bundled or modified.
- Nothing about playback, DRM, sign-in or subscriptions is touched. Video plays in the TV's own web engine, exactly as it would otherwise.
- Only the app's on-screen interface is styled. The video itself is never touched.

## Pieces

| File | Role |
|---|---|
| `src/appinfo.json` | webOS app manifest. `disableBackHistoryAPI` passes the Back key to the page. |
| `src/index.html` | Opens the JioHotstar TV web app. |
| `src/webOSUserScripts/userScript.js` | webOS's Web App Manager injects this file into the app's pages. This is the same standard mechanism [youtube-webos](https://github.com/webosbrew/youtube-webos) uses. It adds one `<style>` element and does nothing else. |
| `scripts/build-ipk.mjs` | Packages `src/` into an `.ipk` (an `ar` archive of `debian-binary`, `control.tar.gz`, `data.tar.gz`), in the same layout as LG's `ares-package` but with no dependencies and reproducible output. The userscript ships unminified so anyone can read what's installed. |

## What the stylesheet hides

The badge and logo are drawn as an overlay on top of the video, in the app's interface. The stylesheet sets `display: none` on these elements, which have stable, readable names:

- `.ASLI_4K_LOGO_WRAPPER`: the badge's container
- `#Asli-4K-6`: the animated badge
- `img[src*="asli-4k"]`: the static badge image
- `img[src*="/rebrand/logo…"]` inside the playback overlay (`.fixed.ELEVATION_1`, `.fixed.right-10.top-10`): the corner logo

`HIDE_CORNER_LOGO` at the top of the userscript turns the logo part off.

Nothing else on the page is changed.

## Verified on

LG OLED65G46LA (G4), webOS 26 (`11.2.0`, Chromium 132): 4K (3840×2160) playback with the badge and corner logo hidden.

## If the badge comes back

The streaming app gets updated from time to time, and the element names can change. To find the new ones:

1. On your own TV, temporarily set `"inspectable": true` in `src/appinfo.json`, then run `npm run deploy` and `npm run inspect`.
2. Open the printed URL in Chrome to get DevTools for the app, play a 4K title, and inspect the badge.
3. Update the selectors in `userScript.js` with the new readable names. Avoid auto-generated class names like `_1rRaW_…`, which change on every update.
4. Test on a TV, set `inspectable` back to `false`, and send a pull request.

Keep changes limited to this overlay. See the ground rules in [CONTRIBUTING.md](../CONTRIBUTING.md).
