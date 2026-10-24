# Contributing

Thanks for helping! Bug reports from non-developers are just as welcome: [open an issue](../../issues/new/choose) and fill in the form.

## Project layout

```
src/                         the webOS app (this is what ships in the .ipk)
  appinfo.json               manifest; single source of truth for id + version
  index.html                 redirects to JioHotstar's TV web app
  webOSUserScripts/          userScript.js, injected by webOS into the page
scripts/
  build-ipk.mjs              zero-dependency, reproducible .ipk packager
  check.mjs                  manifest / syntax / tag checks (CI)
  make-icons.py              draws the icons (stdlib only)
tools/
  ares.mjs                   cross-platform wrapper for LG's ares-* CLI
  node-compat.cjs            fixes ares-cli on Node 23+
docs/                        user guides + how it works
```

The project has **no runtime or build dependencies**. Building only needs Node.js 18+.

## Build

```sh
git clone https://github.com/pixelhush/unbadge-webos.git
cd unbadge-webos
npm run check      # validate manifest and scripts
npm run build      # -> dist/<id>_<version>_all.ipk
```

Builds are reproducible: the same commit always produces a byte-identical `.ipk` (CI verifies this).

## Test on a TV

Installing on a TV uses LG's official CLI. Install it once, globally:

```sh
npm install -g @webos-tools/cli
```

Put your TV in [Developer Mode](docs/INSTALL.md#step-2-turn-on-developer-mode-on-your-tv), then register it once:

```sh
ares-setup-device                      # add your TV: IP, port 9922, user "prisoner"
ares-novacom --device <name> --getkey  # enter the passphrase shown in the Developer Mode app
```

| Command | What it does |
|---|---|
| `npm run deploy` | Builds and installs on your default TV (add `-- -d <name>` for another) |
| `npm run launch` | Opens Unbadge on the TV |
| `npm run inspect` | Prints a Chrome DevTools URL for the running app (set `"inspectable": true` in `src/appinfo.json` locally first; keep it `false` in commits) |
| `npm run icons` | Redraws `src/icon.png` and `src/largeIcon.png` |

### Known gotchas

- **Node 23+:** `ares-install` crashes with `isDate is not a function` because Node removed `util.isDate`. The npm scripts go through `tools/ares.mjs`, which preloads `tools/node-compat.cjs` to fix this.
- **SSH to the TV:** webOS 26 only offers the legacy `ssh-rsa` host key. Plain OpenSSH needs `-o HostKeyAlgorithms=+ssh-rsa -o PubkeyAcceptedAlgorithms=+ssh-rsa`.
- **Icon not updating on the TV:** the launcher caches icons by file path. Fully restart the TV, or temporarily rename the icon files.

## How it works

Read [docs/HOW-IT-WORKS.md](docs/HOW-IT-WORKS.md) before changing the userscript.

## Releasing

1. Bump `version` in `src/appinfo.json` (the only place it's defined).
2. Add an entry to `CHANGELOG.md`.
3. Commit, then tag and push:
   ```sh
   git tag v1.0.3
   git push origin main --tags
   ```
4. The Release workflow checks the tag matches `appinfo.json`, builds the `.ipk`, and publishes it with a `SHA256SUMS.txt`.

## Ground rules

- Keep it **cosmetic**: hide the promotional "Asli 4K" badge only. No changes to playback, DRM, ads, entitlements or account behaviour. PRs that try to unlock content will be closed.
- **Never hide broadcaster logos, watermarks, copyright notices or other ownership information.**
- Don't commit JioHotstar code, assets, logos, or quotes of their source code.
- **Screenshots:** don't include frames of matches, shows or films (that's copyrighted content). Crop to the screen corner, blur the picture, or use a menu screen.
- No new dependencies without a strong reason.
