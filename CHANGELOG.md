# Changelog

## 1.1.2

- Docs: updating, reinstalling or removing Unbadge can sign you out of JioHotstar on the TV, including the official app, since both share the same sign-in.

## 1.1.1

- Fixes the app not coming back when you reopen it after going to the Home screen.

## 1.1.0

- Also hides the corner logo shown with the Asli 4K badge during 4K playback. Set `HIDE_CORNER_LOGO` to `false` in the userscript to keep it.

## 1.0.1

- Every release now includes `unbadge.ipk`, so the README's Download button always gets the latest version.

## 1.0.0

- First release.
- Hides the promotional "Asli 4K" badge during 4K playback in the JioHotstar TV app, using CSS only. The broadcaster's logo is left untouched.
- Zero-dependency, reproducible `.ipk` builds. Releases include `SHA256SUMS.txt`.
- Tested on LG G4 OLED (webOS 26).
