# Amma's Care 🌿

A simple, offline-friendly web app to help Amma follow her recovery diet, track her meals and sugar, and keep all her care guidance in one calm place. Built to be easy for her to use on a phone, and shareable with the whole family through one link.

It is a **PWA (Progressive Web App)** — once opened it can be "Added to Home Screen" and works like a normal app, even without internet.

---

## What's inside

| File | What it is |
|------|------------|
| `index.html` | The whole app |
| `manifest.webmanifest` | App name, icon & install settings |
| `sw.js` | Service worker (makes it work offline) |
| `icon-192.png`, `icon-512.png`, `icon-180.png` | App icons |
| `README.md` | This file |

Keep **all of these files together in the same folder** (the repository root).

---

## Host it free on GitHub Pages

1. **Create a GitHub account** (if you don't have one) at github.com.
2. **Create a new repository** — click **New**, name it e.g. `amma-care`, set it to **Public**, and create it.
3. **Upload all the files** from this folder into the repository **root**:
   - On the repo page, click **Add file → Upload files**, drag in `index.html`, `manifest.webmanifest`, `sw.js`, the three `icon-*.png` files, and `README.md`, then **Commit changes**.
4. **Turn on GitHub Pages** — go to **Settings → Pages**:
   - Under **Source**, choose **Deploy from a branch**.
   - Branch: **main**, folder: **/ (root)** → **Save**.
5. Wait about a minute. The page will show your live link, like:
   ```
   https://YOUR-USERNAME.github.io/amma-care/
   ```
6. **Open that link and share it** with the family. 🎉

> GitHub Pages serves the site over **HTTPS** automatically — that's required for the offline feature, so nothing extra to do.

---

## Add it to her phone (so it opens like an app)

**On Android (Chrome):** open the link → tap the **⋮** menu → **Add to Home screen** → **Install**.

**On iPhone (Safari):** open the link → tap the **Share** button → **Add to Home Screen** → **Add**.

Now there's an "Amma" icon on her home screen. It opens full-screen, and once it's been opened once with internet, it keeps working **offline**.

---

## How she uses it

- **Today** — a warm greeting, a gentle **"How are you feeling today?"** check-in, and her meals for the day. The current meal is highlighted **NOW**, and a **next-meal** line shows when the next small meal is due (so she never goes too long without food). She taps the circle when she's eaten (**✓ Eaten**). A red button is always there for **if her sugar feels low**, and there's an optional spot to note a sugar reading. Use **‹ ›** to look at other days.
- **♥ HELP (Emergency card)** — the heart button at the top, open from any screen: explains her condition in plain words, what to do if she's unwell (and what *not* to do), the triggers she must avoid, and **doctor / hospital / family contacts with one-tap call**. Fill the phone numbers once; they're saved on the phone.
- **Send today's update to family** — one tap at the bottom of Today turns the day (meals eaten, sugar, how she feels) into a short **WhatsApp message** you and your dad can receive from afar.
- **Foods (உணவுகள்)** — every food in her plan, why it's good for her, and how to use it.
- **Care (பராமரிப்பு)** — all the guidance: how the plan works, the bedtime cornstarch, the steroid taper, what to eat/limit/avoid, protein tips, cholesterol & joint advice, the foods/medicines to avoid for life, and the low-sugar steps.

**For family:** in **Care → settings** you can switch on **"Show nutrition numbers"** (protein/carbs/calories per meal and per day) and set the plan / steroid start dates. It's off by default to keep her screen simple.

Her ticks, sugar notes and settings are saved **on her own phone**.

---

## Updating it later

Edit `index.html`, then **bump the cache version** in `sw.js` (change `amma-care-v1` to `amma-care-v2`, etc.) and re-upload both. The version bump tells phones to load the new copy.

---

*Amma's Care is a helper, not a substitute for her doctor or dietician. Please review the plan, the cornstarch dose and any supplement with her treating team.* 💙
