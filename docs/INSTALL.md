# Install guide

This guide assumes you've never done anything like this before. Follow the steps in order. Each one is short.

**Time needed:** about 20 minutes, only once.

> ⚠️ Unbadge is an unofficial app. It is not made by, affiliated with or endorsed by JioStar, JioHotstar or LG. By installing it, you agree to the [disclaimer](../LEGAL.md): you use it at your own risk, for personal use only, and with your own JioHotstar subscription.

**Before you start:**
- Turn on your TV.
- Make sure your computer and your TV are on the **same Wi-Fi network**.
- Keep a pen and paper (or your phone's notes) handy to write down two codes.

---

## Step 1: Create a free LG Developer account

LG needs you to have a (free) developer account before your TV lets you install your own apps.

1. On your computer or phone, go to **[webostv.developer.lge.com](https://webostv.developer.lge.com)**.
2. Click **Sign In** at the top right, then **Create Account**.
3. Fill in your details and confirm your email.

✅ Remember the **email and password**. You'll type them on the TV in the next step.

---

## Step 2: Turn on Developer Mode on your TV

1. On your TV remote, press the **Home** button 🏠.
2. Open **Apps** (the LG Content Store).
3. Search for **Developer Mode** and install it.
4. Open **Developer Mode** and sign in with the account from Step 1.
5. Turn on **Dev Mode Status**.
   - The TV will ask to **restart**. Say yes and wait for it to turn back on.
6. Open the **Developer Mode** app again.
7. Turn on **Key Server**.

The screen now shows two things. **Write them down:**

| What | Example |
|---|---|
| **IP address** | `192.168.1.50` |
| **Passphrase** (a 6-character code) | `A1B2C3` |

> 💡 Leave the Developer Mode app **open on the TV** during the next steps.

---

## Step 3: Install webOS Dev Manager on your computer

Dev Manager is a free, open-source tool made by the webOS Homebrew community (not by us). It sends apps from your computer to your TV.

> 🔒 **Only download it from the official link below.** Copies on other websites could be tampered with.

1. Go to the **[Dev Manager download page](https://github.com/webosbrew/dev-manager-desktop/releases/latest)**.
2. Scroll down to **Assets** and download the file for your computer:

| Your computer | Download the file |
|---|---|
| Windows | The `.msi` ending in **`x64_en-US.msi`** (right for almost every PC) |
| Mac | The `.dmg` (works on all Macs) |
| Linux | `.deb` for Ubuntu/Debian, `.rpm` for Fedora, or `.AppImage` for anything else. Pick **`amd64`/`x86_64`** for most PCs, or **`arm64`/`aarch64`** for ARM machines |

3. Install it like any other program. Community apps like this often aren't signed by Apple or Microsoft, so your computer may warn you. If you downloaded it from the official link above:

   **🍎 Mac**
   - If it says the app "can't be opened", **right-click** the app → **Open** → **Open**.
   - The first time it connects, your Mac may ask to let Dev Manager **find devices on your local network**. Click **Allow**. If you clicked "Don't Allow" by mistake, see [this fix](TROUBLESHOOTING.md#mac-no-route-to-host).

   **🪟 Windows**
   - If a blue "Windows protected your PC" box appears, click **More info** → **Run anyway**.
   - If Windows Firewall or your antivirus asks about Dev Manager, click **Allow**.

   **🐧 Linux**
   - `.deb` / `.rpm`: open the file to install it with your software center.
   - `.AppImage`: right-click it → **Properties** → turn on **Allow executing file as program**, then double-click it. If it still won't start, see [this fix](TROUBLESHOOTING.md#linux-the-appimage-wont-open).

---

## Step 4: Connect Dev Manager to your TV

1. Open **Dev Manager** on your computer.
2. Click the button to **add a new device** (usually a **+**).
3. Fill it in:
   - **Name:** anything you like, e.g. `Living Room TV`
   - **Type / mode:** **Developer Mode** (not "Rooted")
   - **IP address:** the one you wrote down in Step 2
   - **Passphrase:** the 6-character code you wrote down in Step 2. Type it **exactly**, capital letters included.
4. Click **Add** / **Save**.

✅ Your TV now appears in Dev Manager.

> 🔒 **Now turn Key Server off.** In the Developer Mode app on the TV, switch **Key Server** to **OFF**. Dev Manager has already saved what it needs. Leaving Key Server on lets other devices on your Wi-Fi request the TV's access key. If you ever need to reconnect Dev Manager, turn it on again briefly.

> Can't connect? See [Dev Manager can't connect to my TV](TROUBLESHOOTING.md#dev-manager-cant-connect-to-my-tv). On a Mac, **"No route to host"** almost always means [Dev Manager needs Local Network permission](TROUBLESHOOTING.md#mac-no-route-to-host).
>
> Prefer the terminal, or Dev Manager won't work for you? [Install with SSH instead](#advanced-install-with-ssh-instead-of-dev-manager).

---

## Step 5: Download Unbadge

👉 **[Download unbadge.ipk](../../../releases/latest/download/unbadge.ipk)**. This link always gets the latest version.

That `unbadge.ipk` file is the app. Keep it somewhere easy to find, like your Desktop.

<sub>The [Releases page](../../../releases/latest) has the same file, plus a version-numbered copy and a `SHA256SUMS.txt` checksum for anyone who wants to verify it.</sub>

---

## Step 6: Install Unbadge on your TV

1. In **Dev Manager**, select your TV.
2. Go to the **Apps** section.
3. Click **Install** and choose the `.ipk` file from Step 5.
   (You can usually also **drag the file** into the window.)
4. Wait until it says it's installed. This takes a few seconds.

---

## Step 7: Open Unbadge and sign in

1. On your TV, press **Home** 🏠 and open your **Apps** list.
2. Find **Unbadge** (the black icon with a gold play button and gold corners) and open it.
3. Sign in to JioHotstar the usual way, for example by scanning the code with your phone.

🎉 **That's it!** Play something in 4K. The "Asli 4K" badge no longer appears.

> 💡 **Tip:** Move Unbadge to the front of your home bar so you don't open the old app by mistake. On the home screen, use **Edit** on the app bar and drag Unbadge where you want it.

---

## Keep it working

LG's Developer Mode has a **timer**. When it runs out, the TV **removes** Unbadge (and any other apps you installed this way).

**To keep it going:**

1. Every few weeks, open the **Developer Mode** app on your TV.
2. Check the remaining time and press **Extend**.

> 📅 Set a monthly reminder on your phone. If the app ever disappears, just extend Developer Mode and do [Step 6](#step-6-install-unbadge-on-your-tv) again.

---

## Updating

When a new version comes out (check the [Releases page](../../../releases)):

1. Download the latest [unbadge.ipk](../../../releases/latest/download/unbadge.ipk).
2. Install it with Dev Manager, the same as [Step 6](#step-6-install-unbadge-on-your-tv).

You **stay logged in**. No need to remove the old version first.

---

## Removing Unbadge

Any of these works:

- **On the TV:** Home → Apps → highlight **Unbadge** → hold **OK** (or use **Edit**) → **Delete**.
- **In Dev Manager:** Apps → Unbadge → **Remove**.

**Want to switch Developer Mode off completely?** Open the Developer Mode app and turn off **Dev Mode Status**. This also removes Unbadge.

Your original JioHotstar app is never touched.

---

## Advanced: install with SSH instead of Dev Manager

**Most people should use Dev Manager (Steps 3–6).** This is for people comfortable with a terminal, or if Dev Manager won't work on your computer. It works on **Mac, Linux and Windows 10/11**, which all have `ssh`, `scp` and `curl` built in.

First do **Steps 1 and 2** (Developer Mode on, Key Server **ON**), and download [`unbadge.ipk`](../../../releases/latest/download/unbadge.ipk) (Step 5). Replace `<TV-IP>` below with the IP address shown in the Developer Mode app.

**1. Download the TV's access key** (Key Server must be ON):

- **Mac / Linux** (Terminal):
  ```
  mkdir -p ~/.ssh && curl -o ~/.ssh/lgtv_webos http://<TV-IP>:9991/webos_rsa && chmod 600 ~/.ssh/lgtv_webos
  ```
- **Windows** (PowerShell):
  ```
  mkdir -Force $HOME\.ssh; curl.exe -o $HOME\.ssh\lgtv_webos http://<TV-IP>:9991/webos_rsa
  ```

Now turn **Key Server OFF** on the TV. You won't need it again.

**2. Save the TV's connection settings.** Add this to the file `~/.ssh/config` (on Windows: `C:\Users\<you>\.ssh\config`). Create it if it doesn't exist. The TV runs an older SSH server, which is why the two `ssh-rsa` lines are needed:

```
Host lgtv
  HostName <TV-IP>
  Port 9922
  User prisoner
  IdentityFile ~/.ssh/lgtv_webos
  HostKeyAlgorithms +ssh-rsa
  PubkeyAcceptedAlgorithms +ssh-rsa
```

**3. Send the app to the TV.** Run this from the folder where you saved `unbadge.ipk`. When asked for a passphrase, type the **Developer Mode passphrase**.

> A warning about a **"post-quantum key exchange"** is normal. It appears because the TV's SSH server is old, and it's safe to ignore on your home network.


```
ssh lgtv mkdir -p /media/developer/temp
scp unbadge.ipk lgtv:/media/developer/temp/unbadge.ipk
```

**4. Install it.** Open a session on the TV:

```
ssh lgtv
```

Then paste these lines **into the TV session**:

```
luna-send-pub -w 30000 -i luna://com.webos.appInstallService/dev/install '{"id":"io.github.pixelhush.unbadge","ipkUrl":"/media/developer/temp/unbadge.ipk","subscribe":true}' </dev/null | grep -o '"state":"[^"]*"' | uniq
```

You'll see a few steps scroll by, ending with `"state":"installed"`. It finishes by itself about 30 seconds later. Then finish with:

```
rm /media/developer/temp/unbadge.ipk
luna-send-pub -n 1 luna://com.webos.applicationManager/launch '{"id":"io.github.pixelhush.unbadge"}'
exit
```

Unbadge opens on the TV. Continue with [Step 7](#step-7-open-unbadge-and-sign-in).

**To update later,** repeat steps 3 and 4 with the new `unbadge.ipk`. **To remove it,** run this in a TV session:

```
luna-send-pub -n 1 luna://com.webos.appInstallService/dev/remove '{"id":"io.github.pixelhush.unbadge","subscribe":true}'
```
