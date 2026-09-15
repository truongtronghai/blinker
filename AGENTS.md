# AGENTS.md

## Project
Single-page Hugo site ("Blinker") that simulates a blinking light. Hugo generates static assets into `public/`, which are served as static files by a Cloudflare Worker (configured in `wrangler.jsonc`).

## Commands
- Local dev server: `hugo server`
- Production build: `hugo build --gc --minify`
- Deploy/build in CI: `./build.sh` wraps the build and installs pinned toolchains (Hugo 0.165.0, Dart Sass, Go, Node) from scratch; then `wrangler deploy` (build command in `wrangler.jsonc` runs `build.sh`). Use `./build.sh` semantics via wrangler, not raw `hugo`.

## Structure & conventions
- `content/` — deliberately empty. The whole site is the home page from `layouts/home.html` + `layouts/partials/body.html`, so template edits go in `layouts/`, never in `content/`.
- `hugo.toml` sets `disableKinds = ['taxonomy', 'term']` — this is a single-page site: do not add taxonomies/content sections.
- Pipelined assets (CSS/JS) live in `assets/` and are wired in `layouts/home.html` via `resources.Get "css/main.css" | minify | fingerprint`. Put only raw/unprocessed files (e.g. favicon `logo.svg`) in `static/`.
- `archetypes/default.md` uses TOML frontmatter and defaults new content to `draft = true`.
- `hugo.toml` `baseURL` is the placeholder `https://example.org/`.

## Known quirks
- `layouts/home.html` loads `js/main.js` with a `<link rel="stylesheet">` tag (not `<script>`); treat as pre-existing bug unless asked to fix.
- Env uses locale `en-us`; site language attribute comes from `site.Language.Locale`.
- Repo is not currently a git repository; `public/` contains generated output.