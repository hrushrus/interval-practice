# Repository Guidelines

## Project Structure & Module Organization
This repository is a small static web app. Keep the main application files at the repo root:

- `index.html`: page structure and CDN script includes for VexFlow, Tone.js, and Chart.js
- `app.js`: application state, challenge generation, audio playback, scoring, and localStorage persistence
- `styles.css`: theme variables, layout, overlays, and responsive styling
- `README.md`: user-facing setup notes

If the app grows, prefer adding feature folders only when they reduce complexity; for now, keep changes localized and avoid unnecessary restructuring.

## Build, Test, and Development Commands
There is no build step or package manager in this repo. Use a simple local server for development:

- `python3 -m http.server 8000`: serve the app locally from the repository root
- Open `http://localhost:8000`: test audio playback, overlays, scoring, and charts
- `git status`: confirm the working tree before submitting changes

Opening `index.html` directly can work for quick checks, but a local server is the safer default for browser asset loading.

## Coding Style & Naming Conventions
Use 4-space indentation in `index.html`, `app.js`, and `styles.css`. Match the existing vanilla JavaScript style:

- `camelCase` for variables and functions like `generateNewChallenge`
- `UPPER_SNAKE_CASE` only for constant-style data containers such as `DATA`
- descriptive DOM ids and class names like `progress-overlay` or `button-grid`

Preserve the current pattern of centralized state in `state` and cached DOM references in `uiElements`. Keep CSS custom properties in `:root` or theme scopes.

## Testing Guidelines
There is no automated test suite yet. Validate changes manually in a browser before opening a PR:

- switch users and confirm theme changes
- test each training mode, playback mode, and scoring path
- verify localStorage-backed rankings and progress history
- check desktop and mobile-sized layouts

When fixing a bug, include clear reproduction and verification steps in the PR.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects such as `Fix layout overflow for Playback menu` and `Add progress trend chart and update scoring`. Follow that format.

PRs should include a concise summary, note any UI or scoring behavior changes, link related issues when applicable, and attach screenshots or short recordings for visible interface updates.
