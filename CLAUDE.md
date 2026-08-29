# DevOps in the Age of AI — Presentation

## Project layout

| File | Purpose |
|------|---------|
| `presentation.md` | **All slide content.** Every slide lives here, including the intro/title slide. Edit this file to add, remove, or reorder slides. |
| `index.html` | Reveal.js shell. Loads `presentation.md` via the markdown plugin. Do **not** add slide content here — keep it as a thin wrapper. |
| `css/theme.css` | Dark GitHub-style theme. Custom layout helpers (`.card`, `.grid-2`, `.highlight-box`, `.lead`, `.intro`, `.avatar`) are defined here. |
| `SPEAKER_NOTES.md` | Full speaker notes for reference. Not rendered by reveal.js. |

## Slide authoring

- Slides are separated by `\n---\n` (blank line, three dashes, blank line).
- The first slide uses `<!-- .slide: class="lead intro" -->` placed after the `# heading` to apply the centered presenter-bio layout.
- Use `<!-- .slide: class="lead" -->` for other section-title slides.
- Speaker notes go after `Note:` at the end of a slide.
- HTML blocks (`<div class="card">`, `<img>`, etc.) are valid inside the markdown.

## Running locally

```bash
npm start          # serves on http://localhost:3000
# or
python3 -m http.server 8080
```

> **Important:** always use a local server — opening `index.html` directly via `file://` will fail to load `presentation.md` due to browser security restrictions.

## Deploying

Push to `main`. The GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) deploys the repo root to GitHub Pages automatically.
