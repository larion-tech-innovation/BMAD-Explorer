<div align="center">

<img src="logo.png" alt="BMAD Hub" width="120" />

# BMAD Hub

**A static documentation hub for BMAD skills, agents, and workflows.**

[![Deploy GitHub Pages](https://github.com/larion-tech-innovation/BMAD-Hub/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/larion-tech-innovation/BMAD-Hub/actions/workflows/deploy-pages.yml)

[**Live site**](https://larion-tech-innovation.github.io/BMAD-Hub/) · [Report an issue](https://github.com/larion-tech-innovation/BMAD-Hub/issues)

</div>

---

## Overview

BMAD Hub is a lightweight, zero-dependency site that collects BMAD-related
reference material — skills, agents, and workflows — as browsable HTML pages and
exposes them through a single searchable landing page.

The hub is organized into two main sections:

- **BMAD Structure** — the core BMAD method: BMM, skills, WDS, TEA, and related workflows.
- **Creative Innovation Studio (CIS)** — CIS agents and skills.

Everything is plain static HTML, so it can be hosted anywhere and works fully
offline.

## Quick start

You only need [Node.js](https://nodejs.org/) (v18+) to regenerate the index.
No `npm install` is required — the generator uses only built-in modules.

```sh
# Clone the repository
git clone https://github.com/larion-tech-innovation/BMAD-Hub.git
cd BMAD-Hub

# Generate the full index (BMAD + CIS)
node scripts/gen_index.mjs

# Or generate only the BMAD section
node scripts/gen_index.mjs --bmad-only

# Preview locally (any static server works)
npx serve .
# then open the printed URL
```

Opening `index.html` directly in a browser also works.

## Project structure

```
BMAD-Hub/
├── index.html                 # Generated landing page (searchable index)
├── logo.png
├── scripts/
│   └── gen_index.mjs          # Builds index.html from the HTML content dirs
├── BMAD/
│   ├── bmad-bmm-*.html        # BMM documentation
│   └── bmadskills/            # Skills, WDS, TEA, and SPP pages
└── BMAD_CIS/
    └── bmad-cis/              # CIS agents and skills
```

## How it works

`scripts/gen_index.mjs` scans the `BMAD/` and `BMAD_CIS/` directories for
`.html` files, groups them into sections (core skills, TEA, WDS, CIS agents,
etc.), and writes a single self-contained `index.html` with client-side search.

- Files matching patterns in `.gitignore` are excluded from the index.
- Human-friendly titles can be customized via the `titleMappings` object in the script.
- Pass `--bmad-only` (or set `BMAD_ONLY=1`) to omit the CIS section.

## Deployment

The site deploys automatically to **GitHub Pages** on every push to `main` via
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). The
workflow uploads the repository root and publishes it — no build step required.

To deploy your own fork:

1. Push to your fork's `main` branch.
2. In **Settings → Pages**, set the source to **GitHub Actions**.

## Contributing

Contributions are welcome!

1. Add or update HTML pages under `BMAD/` or `BMAD_CIS/`.
2. Regenerate the index: `node scripts/gen_index.mjs`.
3. Commit both your content changes and the updated `index.html`.
4. Open a pull request.

Please keep pages self-contained (inline styles/scripts) so they render without
external build tooling.

## License

See the repository for license details. If no license file is present, please
open an issue to clarify usage terms before redistributing.

---

<div align="center">
Maintained by <strong>LARION</strong>
</div>
