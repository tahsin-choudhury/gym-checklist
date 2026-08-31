# Gym Checklist

A tiny installable PWA: 3-day workout split, tap-to-check rows, daily auto-reset,
and a Notes tab for reference. No backend, no build step, no dependencies.

## Files

| File | What it is |
| --- | --- |
| `data.js` | **Your workout program.** The only file to edit when your program changes. |
| `index.html` | Page shell (nothing workout-specific lives here). |
| `styles.css` | Dark theme, tap targets, layout. |
| `app.js` | Rendering, checkbox state, localStorage, daily reset, SW registration. |
| `manifest.json` | PWA metadata (name, icons, colors, standalone display). |
| `sw.js` | Service worker: caches the app shell for offline use. |
| `icons/` | 192px, 512px and maskable 512px PNGs. |
| `tools/make_icons.py` | Regenerates the icons if you want a different look. |

## Run it locally

From this folder:

```bash
python -m http.server 8765
```

Then open <http://localhost:8765>. `localhost` counts as a secure origin, so the
service worker works there. Opening `index.html` directly as a `file://` URL will
show the app but the service worker and install prompt will not work.

## Editing your program

Everything is in `data.js`:

- `WARMUP` — the shared warm-up list shown at the top of every day.
- `DAYS` — one object per day. Tabs are generated from `tab`, so adding a fourth
  day object automatically adds a fourth tab.
- `NOTES` — the reference sections on the Notes tab.

Each exercise supports:

```js
{ name: "Dumbbell incline press", sets: "2-3 x 8-10", rest: "90s",
  cue: "Same depth rule as flat press", shoulder: true }
```

Only `name` is required. `shoulder: true` adds the orange SHOULDER CARE badge.

**After editing, bump `CACHE_VERSION` in `sw.js`** (e.g. `gym-checklist-v1` to
`-v2`) and re-deploy, so your installed copy picks up the new data instead of
serving the cached old version.

## State and reset behaviour

- Checkmarks are stored in `localStorage` under `gym-checklist-state-v1`.
- They clear automatically on the next calendar day (local time, not UTC),
  checked on load and whenever the app returns to the foreground.
- The "Reset checkmarks" button at the bottom of each day clears **that day only**.
- Which tab you were on is remembered and is not affected by the daily reset.

## Deploying so you can install it on your Pixel

You need HTTPS. The simplest option is GitHub Pages — no CLI tools, no account
beyond GitHub, and it stays live for free.

### GitHub Pages (recommended)

1. Create a new repository on GitHub, e.g. `gym-checklist`. Public is simplest;
   private repos need a paid plan for Pages.
2. Upload the contents of this folder (`index.html`, `styles.css`, `data.js`,
   `app.js`, `manifest.json`, `sw.js`, and the `icons/` folder) to the repo root.
   The web uploader works: **Add file → Upload files**, drag everything in, commit.
   (Or with git: `git init && git add . && git commit -m "init" && git remote add
   origin <your-repo-url> && git push -u origin main`.)
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, branch `main`, folder `/ (root)`. Save.
4. Wait about a minute, then open `https://<username>.github.io/gym-checklist/`.

All paths in this project are relative, so it works fine in a subfolder like
`/gym-checklist/`.

### Alternatives

- **Netlify Drop** (<https://app.netlify.com/drop>): drag the folder onto the page,
  get an HTTPS URL in seconds, no repo needed. Fastest option, but re-deploying
  means dragging the folder again.
- **Vercel**: `npx vercel` in this folder, or import a GitHub repo. Needs Node.

## Installing on your Pixel

1. Open the HTTPS URL in Chrome on the phone.
2. Menu (⋮) → **Add to Home screen** / **Install app**. Chrome may also show an
   install banner on its own after a few seconds.
3. Launch it from the home screen — it opens standalone, with no browser UI.

To verify installability before installing: on desktop Chrome open the URL, then
DevTools → **Application** → **Manifest**, which lists any blocking issues.

### Updating an installed copy

Change files, bump `CACHE_VERSION` in `sw.js`, re-deploy. The next time you open
the app with a network connection, the new service worker installs and takes
over. If it looks stale, close and reopen the app once.
