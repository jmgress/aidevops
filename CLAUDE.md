# DevOps in the Age of AI — Presentation

## Project layout

| File | Purpose |
|------|---------|
| `presentation.md` | **The only file you need to edit.** All slides, config, and YAML frontmatter live here. |
| `css/theme.css` | Dark GitHub-style theme. Custom helpers: `.card`, `.grid-2`, `.highlight-box`, `.lead`, `.intro`, `.avatar`. |
| `SPEAKER_NOTES.md` | Full speaker notes for reference. Not rendered by reveal-md. |

There is no `index.html`. The presentation is built by **reveal-md**, which reads `presentation.md` directly.

## Slide authoring

- Slides are separated by `\n---\n` (blank line, three dashes, blank line).
- The first slide uses `<!-- .slide: class="lead intro" -->` (placed after the `# heading`) for the centered presenter-bio layout.
- Use `<!-- .slide: class="lead" -->` for other section-title slides.
- Speaker notes go after `Note:` at the end of a slide.
- HTML blocks (`<div class="card">`, `<img>`, etc.) are valid inside the markdown.
- Reveal.js config (dimensions, hash, slideNumber, theme) lives in the YAML frontmatter at the top of `presentation.md`.

## Running locally

```bash
npm start   # serves at http://localhost:1948/presentation.md
```

## Building a static site

```bash
npm run build   # outputs to _site/ (gitignored)
```

## Deploying

Push to `main`. The GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) runs `reveal-md --static` and deploys `_site/` to GitHub Pages automatically.
