# Troubleshooting

Find your problem below. Each answer starts with the most likely fix.

- [I can't find the Developer Mode app](#i-cant-find-the-developer-mode-app)
- [Dev Manager can't connect to my TV](#dev-manager-cant-connect-to-my-tv)
  - [Mac: "No route to host"](#mac-no-route-to-host)
  - [Windows](#windows)
  - [Linux: the AppImage won't open](#linux-the-appimage-wont-open)
  - [What the error message means](#what-the-error-message-means)
- [Unbadge disappeared from my TV](#unbadge-disappeared-from-my-tv)
- [The icon is blank or looks wrong](#the-icon-is-blank-or-looks-wrong)
- [The Asli 4K badge is back](#the-asli-4k-badge-is-back)
- [Videos don't play or show an error](#videos-dont-play-or-show-an-error)
- [It's asking me to log in again](#its-asking-me-to-log-in-again)
- [I don't see 4K](#i-dont-see-4k)
- [Advanced: connecting to the TV with SSH](#advanced-connecting-to-the-tv-with-ssh)

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

### Mac: "No route to host"

Your Mac is blocking Dev Manager from your home network. Macs ask for permission before an app can talk to devices like your TV.

1. Open **System Settings → Privacy & Security → Local Network**.
2. Turn on **webOS Dev Manager**.
3. Quit Dev Manager completely (**Cmd+Q**), open it again, and reconnect.

**Dev Manager isn't in that list?** Then your Mac never asked. As a workaround, start it from the **Terminal** app, which already has permission. Paste this and press Enter, and keep the Terminal window open while you use Dev Manager:

```
"/Applications/webOS Dev Manager.app/Contents/MacOS/webos-dev-manager"
```

### Windows

1. **Set your Wi-Fi to "Private".** Go to Settings → Network & internet → Wi-Fi → your network, and set **Network profile type** to **Private**. "Public" networks are more locked down.
2. **Allow Dev Manager** if Windows Firewall or your antivirus asks. Some antivirus "network protection" features silently block connections to devices at home. If it still fails, check your antivirus settings for Dev Manager.
3. Use the **`x64`** `.msi` unless you know your PC is 32-bit.

### Linux: the AppImage won't open

1. Make it runnable: right-click → **Properties** → **Allow executing file as program**, or in a terminal run `chmod +x webos-dev-manager_*.AppImage`.
2. If you see an error mentioning **FUSE**, install it: `sudo apt install libfuse2` (on Ubuntu 24.04 and newer: `sudo apt install libfuse2t64`).
3. Easier option: on Ubuntu or Debian, use the **`.deb`** file instead. It doesn't need FUSE.

### What the error message means

| You see | What it means | Try this |
|---|---|---|
| **No route to host** | Your computer isn't allowed to reach the TV | Mac: [Local Network permission](#mac-no-route-to-host). Windows: [Private network / firewall](#windows) |
| **Connection timed out** | The TV can't be found at that address | Check the TV is on and the IP address in the Developer Mode app hasn't changed |
| **Connection refused** | The TV is there, but Developer Mode isn't running | Open the Developer Mode app and check **Dev Mode Status** is ON. The timer may have run out |
| **Authentication failed** / **Permission denied** | Wrong passphrase, or an old saved key | Turn **Key Server** ON, remove the TV from Dev Manager, add it again with the passphrase shown now |

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

## Advanced: connecting to the TV with SSH

**You don't need this to install Unbadge.** Dev Manager does it for you. It's here for people who like using a terminal.

LG TVs in Developer Mode run an **older SSH server**, so modern SSH clients refuse to connect unless you allow the older `ssh-rsa` method. The command is the same on **Mac, Linux and Windows 10/11** (all have `ssh` built in):

```
ssh -i ~/.ssh/<name>_webos -p 9922 -o HostKeyAlgorithms=+ssh-rsa -o PubkeyAcceptedAlgorithms=+ssh-rsa prisoner@<TV-IP>
```

- `<name>_webos` is the key Dev Manager (or LG's `ares` tools) saved when you added the TV. It's usually your device's name plus `_webos`, in the `.ssh` folder in your home folder. On Windows, use `$HOME\.ssh\<name>_webos` in PowerShell.
- `<TV-IP>` is the IP address shown in the Developer Mode app.
- When asked for a passphrase, type the **Developer Mode passphrase**.
- Without those two `-o` options you'll see errors like **"no matching host key type found"** or **"Permission denied (publickey)"**.

The shell you get is restricted by LG (a "jail"), so you can't change system files. That's expected.
