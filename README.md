# حِفْظُ القُرآن — Hifdh Companion

A Progressive Web App (PWA) for strengthening Quran memorisation using **spaced repetition** (SM-2 algorithm), with AI-generated daily questions drawn from Al-Hilali & Khan translation.

## Features

- 📖 Track all 114 surahs with Arabic name, meaning, verse count & Juz
- 🔄 SM-2 spaced repetition — reviews are scheduled based on how well you recalled each surah
- 🧠 Daily AI-generated questions (next verse, surah identification, name meanings, creative)
- 📊 Progress stats with Juz-by-Juz breakdown
- 📱 Installable PWA — works offline after first load

---

## Hosting on GitHub Pages

### Step 1 — Create your GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `hifdh-app` (or anything you like)
3. Keep it **public**, don't initialise with README
4. Click **Create repository**

### Step 2 — Update the base URL

Open `vite.config.js` and change `BASE_URL` to match your repo name:

```js
// If your repo is github.com/yourname/hifdh-app
const BASE_URL = '/hifdh-app/'

// If you have a custom domain (e.g. yourname.github.io)
const BASE_URL = '/'
```

### Step 3 — Push to GitHub

```bash
cd hifdh-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hifdh-app.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically build and deploy on every push to `main`

Your app will be live at: `https://YOUR_USERNAME.github.io/hifdh-app/`

---

## Local Development

```bash
npm install
npm run dev
```

---

## API Key Setup

The daily quiz uses the Claude API (Anthropic). When you open the app:

1. Tap the **🔑 Set Key** button in the header
2. Enter your API key from [console.anthropic.com](https://console.anthropic.com)
3. The key is stored only in your browser's localStorage — it never leaves your device

> **Note:** If you share this app with others, each person enters their own API key.

---

## Tech Stack

- React 18 + Vite
- SM-2 spaced repetition algorithm
- Claude API (`claude-sonnet-4-20250514`) for question generation
- PWA (service worker + web manifest)
- Pure CSS-in-JS styling, no UI library dependencies
