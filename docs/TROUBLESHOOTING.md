# Troubleshooting

Find your problem below. Each answer starts with the most likely fix.

- [I can't find the Developer Mode app](#i-cant-find-the-developer-mode-app)
- [Dev Manager can't connect to my TV](#dev-manager-cant-connect-to-my-tv)
- [Unbadge disappeared from my TV](#unbadge-disappeared-from-my-tv)
- [The icon is blank or looks wrong](#the-icon-is-blank-or-looks-wrong)
- [The Asli 4K badge is back](#the-asli-4k-badge-is-back)
- [Videos don't play or show an error](#videos-dont-play-or-show-an-error)
- [It's asking me to log in again](#its-asking-me-to-log-in-again)
- [I don't see 4K](#i-dont-see-4k)

---

## I can't find the Developer Mode app

- Make sure you're **signed in to your LG account** on the TV (Settings → General → LG Account).
- In the app store, search for **"Developer"**. The full name is **Developer Mode**.
- It's available on almost all LG webOS TVs. If you really can't find it, [open an issue](../../../issues/new/choose) with your TV model.

## Dev Manager can't connect to my TV

Check these one by one:

1. **The TV is on**, and the **Developer Mode** app is open on it.
2. **Key Server is ON** in the Developer Mode app while you connect. (Turn it off again once you're connected.)
3. **Same Wi-Fi:** your computer and TV must be on the same network. Guest networks often don't work.
4. **The IP address changed.** Look at the Developer Mode app again. If it's different, update it in Dev Manager.
5. **Passphrase typo:** it must match exactly, including capital letters.
6. **Restart both:** close Dev Manager, restart the TV (see below), then try again.

> **How to fully restart an LG TV:** Hold the **power button** on the remote until a **Restart** option appears, or unplug the TV for 30 seconds. Pressing power normally only puts it to sleep.

## Unbadge disappeared from my TV

Most likely the **Developer Mode timer ran out**, so the TV removed the app.

1. Open the **Developer Mode** app on the TV. If it asks, sign in and turn Dev Mode on again.
2. Press **Extend**.
3. Install Unbadge again ([Step 6 of the install guide](INSTALL.md#step-6-install-unbadge-on-your-tv)).

To avoid this, extend Developer Mode every few weeks. [More info](INSTALL.md#keep-it-working)

## The icon is blank or looks wrong

The TV sometimes remembers old icons. **Fully restart the TV** (hold the power button → **Restart**, or unplug it for 30 seconds).

Still wrong? On the home screen, use **Edit** on the app bar, remove Unbadge from the bar, then add it back from the Apps list.

## The Asli 4K badge is back

JioHotstar probably **updated their app**, and Unbadge needs an update too.

1. Check the [Releases page](../../../releases) for a newer version and install it ([how to update](INSTALL.md#updating)).
2. No new version yet? [Open an issue](../../../issues/new/choose) so we know. A photo of the screen helps.

## Videos don't play or show an error

1. Open the **official JioHotstar app** and try the same video.
   - **It fails there too:** it's a JioHotstar or internet problem, not Unbadge. Try again later.
   - **It works there but not in Unbadge:** [open an issue](../../../issues/new/choose) with your TV model and webOS version (Settings → Support → TV Information).
2. Restart the TV and try again.

## It's asking me to log in again

That's normal after you **reinstall** Unbadge, or after the Developer Mode timer ran out. Sign in once and it remembers you again.

## I don't see 4K

- The video needs to be **available in 4K**, and your **plan must include 4K**.
- During playback, open the **Quality** menu and choose **Asli 4K** or **Auto**.
- 4K needs a fast connection (around 25 Mbps or more).

Unbadge doesn't change the picture quality. It only hides the badge.
