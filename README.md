<div align="center">

<img src="logo.png" alt="BMAD Explorer" width="120" />

# BMAD Explorer

**A curated index of *BMAD Method* resources.**

[![Deploy GitHub Pages](https://github.com/larion-tech-innovation/BMAD-Explorer/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/larion-tech-innovation/BMAD-Explorer/actions/workflows/deploy-pages.yml)

[**Live site**](https://larion-tech-innovation.github.io/BMAD-Explorer/) · [Report an issue](https://github.com/larion-tech-innovation/BMAD-Explorer/issues)

</div>

---

## Overview

BMAD Explorer is a lightweight, zero-dependency site that collects BMAD-related
reference material — process maps, agent guides, and knowledge references for
AI-driven software development — as browsable HTML pages and exposes
them through a single curated landing page.

The landing page indexes three top-level references:

- **BMM v6.10 with WDS & TEA** — the core BMAD method: BMM, skills, WDS, TEA, and related workflows.
- **TEA Knowledge** — Test Engineering & Architecture reference material.
- **CIS v0.2.1** — the Creative Innovation Studio: CIS agents and skills.

Everything is plain static HTML, so it can be hosted anywhere and works fully
offline.

## Quick start

No build tooling is required — the site is plain static HTML.

```sh
# Clone the repository
git clone https://github.com/larion-tech-innovation/BMAD-Explorer.git
cd BMAD Explorer

# Preview locally (any static server works)
npx serve .
# then open the printed URL
```

Opening `index.html` directly in a browser also works.

## Project structure

```
BMAD Explorer/
├── index.html                 # Landing page (searchable index)
├── logo.png
├── BMAD/
│   ├── bmad-bmm-*.html        # BMM documentation
│   └── bmadskills/            # Skills, WDS and TEA pages
└── BMAD_CIS/
    └── bmad-cis/              # CIS agents and skills
```

## How it works

`index.html` is a single self-contained landing page (inline styles, no
external build tooling) that links to the HTML content under `BMAD/` and
`BMAD_CIS/`. Each entry deep-links into the full BMM, TEA, and CIS references,
which in turn cross-link the individual skill, agent, and workflow pages.

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
2. Update `index.html` to link to any new pages.
3. Commit your changes.
4. Open a pull request.

Please keep pages self-contained (inline styles/scripts) so they render without
external build tooling.

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
Maintained by <strong>LARION</strong>
</div>
