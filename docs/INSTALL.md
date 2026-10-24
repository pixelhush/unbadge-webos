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

| Your computer | Download the file ending in |
|---|---|
| Windows | `.msi` or `.exe` |
| Mac | `.dmg` |
| Linux | `.AppImage` or `.deb` |

3. Install it like any other program.
   - Community apps like this often aren't signed by Apple or Microsoft, so your computer may warn you. If you downloaded it from the official link above:
   - **On a Mac:** if it says the app "can't be opened", **right-click** the app → **Open** → **Open**.
   - **On Windows:** if a blue "Windows protected your PC" box appears, click **More info** → **Run anyway**.

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

> Can't connect? See [Dev Manager can't connect to my TV](TROUBLESHOOTING.md#dev-manager-cant-connect-to-my-tv).

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
