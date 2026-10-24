<p align="center">
  <img src="src/largeIcon.png" width="110" alt="Unbadge icon">
</p>

<h1 align="center">Unbadge for LG TVs</h1>

<p align="center">
  An <b>unofficial, community-made</b> app for LG TVs that hides the <b>"Asli 4K" badge and corner logo</b> while you watch JioHotstar in 4K.
</p>

<p align="center">
  Free · Open source · No root required
</p>

<p align="center">
  <a href="docs/INSTALL.md"><img alt="Platform: LG webOS TV" src="https://img.shields.io/badge/Platform-LG%20webOS%20TV-blue"></a>
  <img alt="Tested on: LG G4, webOS 26" src="https://img.shields.io/badge/Tested%20on-LG%20G4%20%7C%20webOS%2026-blue">
  <img alt="Asli 4K badge: Hidden" src="https://img.shields.io/badge/Asli%204K%20badge-Hidden-brightgreen">
  <img alt="Root: Not required" src="https://img.shields.io/badge/Root-Not%20required-brightgreen">
  <a href="../../releases/latest"><img alt="Latest release" src="https://img.shields.io/github/v/release/pixelhush/unbadge-webos?label=Download&color=orange"></a>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-lightgrey"></a>
</p>

<p align="center">
  <a href="../../releases/latest/download/unbadge.ipk"><img alt="Download Unbadge" src="https://img.shields.io/badge/%E2%AC%87%20Download-unbadge.ipk-c9a24a?style=for-the-badge"></a>
  &nbsp;
  <a href="docs/INSTALL.md"><img alt="Install guide" src="https://img.shields.io/badge/%F0%9F%93%96%20Install-guide-1e293b?style=for-the-badge"></a>
</p>

---

> **Unbadge is not made by, affiliated with, or endorsed by JioStar, JioHotstar, Star India or LG.** It's a free, unofficial community project for personal use. You need your own JioHotstar subscription. By using it you accept the [disclaimer](LEGAL.md).

<!-- TODO: add a before/after photo of the screen corner here. Don't show match or show footage (that's copyrighted); crop to the corner or use a blurred frame. -->

## What does it do?

During 4K playback, JioHotstar shows an **"Asli 4K" badge and its logo** in the corner of the screen, and they stay there the whole time.

Unbadge is a separate app for your LG TV. It opens JioHotstar's own TV web app, the same one the official LG app uses, and **hides that corner overlay**. Nothing else changes.

- ✅ Your own account and plan
- ✅ 4K picture quality
- ✅ Live matches, movies, shows, subtitles, languages
- ❌ No "Asli 4K" badge
- ❌ No corner logo during 4K playback

<sub>Prefer to keep the logo? Set `HIDE_CORNER_LOGO` to `false` in `src/webOSUserScripts/userScript.js` and build it yourself.</sub>

## Download

<a href="../../releases/latest/download/unbadge.ipk"><img alt="Download Unbadge" src="https://img.shields.io/badge/%E2%AC%87%20Download-unbadge.ipk-c9a24a?style=for-the-badge"></a>

This always downloads the **latest version**. The file is `unbadge.ipk`, the app you'll send to your TV.

You can't install it by just copying it to the TV. Follow the **[install guide](docs/INSTALL.md)**, which takes about 20 minutes the first time.

<sub>Older versions and checksums are on the [Releases page](../../releases).</sub>

## Will it work on my TV?

| You need | Details |
|---|---|
| 📺 An LG smart TV | **Tested on an LG G4 OLED with webOS 26.** Other recent LG TVs will probably work but haven't been tested yet. [Tell us](../../issues/new/choose) how it goes! |
| 🇮🇳 To be in India | JioHotstar only streams in India, the same as the official app. |
| 💻 A computer | Windows, Mac or Linux, on the **same Wi-Fi** as your TV. Only needed to install. |
| 👤 A free LG Developer account | Takes 2 minutes to create. We show you how. |
| ⏱️ About 20 minutes | Only the first time. |

**No root required.** Unbadge uses LG's own official "Developer Mode", which is made for installing your own apps.

## How to install (quick overview)

1. **Make a free LG Developer account**
2. **Turn on Developer Mode** on your TV
3. **Install "webOS Dev Manager"** on your computer
4. **[Download Unbadge](../../releases/latest/download/unbadge.ipk)** (`unbadge.ipk`)
5. **Send it to your TV** with Dev Manager, then open **Unbadge** on the TV

👉 **[Step-by-step install guide (with every click explained)](docs/INSTALL.md)**

## Good to know

- **Keep Developer Mode active.** LG's Developer Mode has a timer. If it runs out, the TV removes Unbadge. Open the **Developer Mode** app on your TV every few weeks and press **Extend**. [More info](docs/INSTALL.md#keep-it-working)
- **You'll sign in once.** Unbadge is a separate app, so sign in to your JioHotstar account in it the first time.
- **The official JioHotstar app isn't touched.** Keep it installed as a backup.
- **Updates are manual.** When there's a new version, download it and install it the same way. You stay signed in. [How to update](docs/INSTALL.md#updating)

## Something not working?

See **[Troubleshooting](docs/TROUBLESHOOTING.md)**. It covers the common problems in plain language.

Still stuck? [Open an issue](../../issues/new/choose) and tell us your TV model.

## Is it safe?

- **No JioHotstar code is included or changed.** Unbadge only adds one style rule that hides the corner overlay on your own screen. The video itself is never touched.
- **No data collection.** No ads, no tracking, no servers. All the code is here for anyone to check.
- **Nothing is unlocked.** It doesn't give you free content or get around subscriptions or DRM.
- **Easy to remove.** Delete it like any other app.

Using unofficial apps may go against the streaming service's terms of use. Use it at your own risk.

## For developers

- [How it works](docs/HOW-IT-WORKS.md)
- [Contributing](CONTRIBUTING.md): building, testing on a TV, releasing

## Disclaimer

**Please read the full [disclaimer and legal notices](LEGAL.md).** In short:

- Unbadge is **unofficial** and is **not made by, affiliated with or endorsed by** JioStar, JioHotstar, Star India, Disney or LG.
- It's **free, for personal use only**. Don't sell it.
- It **includes no JioHotstar code**, **doesn't bypass DRM or subscriptions**, and **doesn't download or share video**. It only hides an on-screen overlay on your own TV.
- You **use it at your own risk** and are responsible for following the service's and LG's terms.
- Product names are trademarks of their owners and are mentioned only to describe compatibility. No endorsement is implied.

**Rights holders:** if you have a concern, please [contact us first](LEGAL.md#7-rights-holders-and-takedown-requests). We'll respond promptly.

## License

[MIT](LICENSE)
