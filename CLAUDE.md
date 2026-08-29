# DevOps in the Age of AI — Presentation

## Hard requirement: must work on GitHub Pages

This deck **must run as a static site on GitHub Pages** with no build step, no server-side code, and no external presentation framework.

- `index.html` is **self-contained**: every slide is inlined as an HTML `<section class="slide">` element, and all navigation/scaling logic is in the inline `<script>`.
- **No runtime `fetch()`** and no data files loaded at runtime — the deck must render identically whether served by GitHub Pages, a local HTTP server, or opened directly from `file://`.
- **No reveal.js, Marp, or any slide framework**, and no CDN/npm runtime dependencies.
- Only same-origin relative assets (`css/theme.css`) plus static images may be referenced.
- `.nojekyll` must stay in the repo root so GitHub Pages serves files as-is.
- Any change to the deck must keep `npm test` (`scripts/validate.js`) passing, which enforces these rules.

## Project layout

| File | Purpose |
|------|---------|
| `index.html` | **The presentation.** Self-contained deck — all slides inlined as `<section class="slide">`, plus the inline navigation/scaling engine. Edit this to change the deck. |
| `css/theme.css` | Dark GitHub-style theme. Custom helpers: `.card`, `.grid-2`, `.highlight-box`, `.warning-box`, `.lead`, `.intro`, `.avatar`. |
| `SPEAKER_NOTES.md` | Full speaker notes for reference. Not rendered by the deck. |

The deck is plain HTML/CSS/JS — no reveal.js, no Marp, no build step to view it.

## Slide authoring

- Each slide is a `<section class="slide">` element inside `<div id="deck">` in `index.html`.
- The first slide uses `class="slide lead intro"` for the centered presenter-bio layout; use `class="slide lead"` for other section-title slides.
- Layout helpers: wrap content in `<div class="card">`, `<div class="grid-2">`, `<div class="highlight-box">`, or `<div class="warning-box">`.
- Speaker notes are **not** placed in `index.html`; keep them in `SPEAKER_NOTES.md`.

## Running locally

```bash
npm start   # serves the folder over HTTP; open the printed URL
```

Because the deck is self-contained you can also just open `index.html` directly in a browser.

## Building a static site

```bash
npm run build   # outputs to _site/ (gitignored)
```

## Deploying

Push to `main`. The GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) runs `node scripts/build.js` and deploys `_site/` to GitHub Pages automatically.
