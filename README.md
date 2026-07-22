<div align="center">

<img src="logo.png" alt="BMAD Explorer" width="120" />

# BMAD Explorer

**A curated index of *BMAD Method* resources.**

[![Deploy GitHub Pages](https://github.com/larion-tech-innovation/BMAD-Explorer/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/larion-tech-innovation/BMAD-Explorer/actions/workflows/deploy-pages.yml)

[**Live site**](https://larion-tech-innovation.github.io/BMAD-Explorer/) · [Report an issue](https://github.com/larion-tech-innovation/BMAD-Explorer/issues)

</div>

---

## Overview

The BMAD Method has grown fast — a core method (BMM) now sitting alongside specialized add-on modules like WDS (design) and TEA (test architecture), each with its own agents, skills, workflows, and knowledge base. That’s a lot of ground for any team to cover, and the reference material for it is spread across Readme files, module docs, and in-IDE help text.

**BMAD Explorer** is LARION’s attempt to make that surface area legible: a single, searchable, offline-capable index that maps the entire BMM + WDS + TEA stack — every agent, every skill, every phase, and the “what - why - how” reasoning behind each workflow step — as plain, dependency-free HTML. We built it first to onboard our own engineers onto BMAD faster; we’re sharing it because we think the wider community will get the same value from it.

## Key Components

BMAD Explorer delivers value across its key components, enabling users to inspect and analyze BMAD modules effortlessly:

1. **Interactive Graph & Visual Representation:** Dynamically renders nodes, modules, and relationships within the BMAD ecosystem.
2. **Detailed Entity Inspection (WDS & TEA Integration):** Inspect detailed metadata, attributes, and relationships (including WDS and TEA frameworks).
3. **Zero-Install Web Access:** Hosted directly via GitHub Pages for instant access anywhere, anytime, with no local environment setup required.

## What BMAD Explorer contributes to the community

- **A single map instead of scattered docs.** Instead of separately reading the BMM repo, the WDS module, and the TEA add-on, contributors and newcomers get one unified process map that shows how the three fit together end-to-end — from brainstorming through architecture, design, implementation, and release-gate testing.
- **Design intent made explicit.** Every workflow step is documented with not just *what* it does, but *why* it exists and *how* it’s implemented — the reasoning BMAD users usually have to reverse-engineer from source or ask in Discord.
- **Zero-dependency and forkable.** No build tooling, no framework lock-in — just static HTML anyone can clone, host, or embed internally. Teams evaluating or adopting BMAD can stand up their own internal copy in minutes.
- **A living index, not a snapshot.** As BMM, WDS, and TEA release new versions, this index is structured so it can track changes (agents added, skills deprecated, workflows superseded) rather than going stale the way a one-off blog post would.
- **A starting point for others to extend.** The project structure is intentionally simple so other community members can contribute new reference pages, translations, or module coverage without needing to understand a build pipeline first.

### Value by module

| Module | What it Covers | The Value to the Community |
|---|---|---|
| **BMM (Core Method)** | 6 core agents (Analyst, PM, Architect, Dev, UX Designer, Tech Writer), 29+ skills across 7 groups, and the full 6-phase workflow from Analysis to Retrospective. | Stop digging through source code. Instantly grasp agent responsibilities, skill boundaries, and exactly how skills route between Create, Update, and Validate intents. |
| **WDS (Whiteport Design Studio)** | The 9-phase, 3-agent (Saga, Freya, Mimir) design-led add-on, spanning from Alignment & Signoff through Product Evolution. | Seamlessly plug a design-first team into BMAD without bypassing engineering discipline. Master the exact handoff points between WDS outputs and BMAD’s Dev Story loop. |
| **TEA (Test Architect Enterprise)** | Murat’s 9 skills/workflows, 40+ knowledge fragments, and the 7-principle risk-based testing philosophy. | Clearly see how TEA complements—rather than replaces—BMAD core’s built-in QA path. Perfect for deciding if you need the full add-on or a lighter core-only approach. |
| **Unified Workflow View** | A single cross-referenced diagram and step index spanning BMM, WDS, and TEA together. | Make the invisible seams explicit, such as how Mimir’s build loop and BMAD’s Dev Story TDD discipline divide responsibility. It clarifies the hardest parts of the ecosystem to piece together. |

Everything is pure static HTML—host it anywhere, run it fully offline, and fork it freely.

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

`index.html` is a single self-contained landing page (inline styles, no external build tooling) that links to the HTML content under `BMAD/` and `BMAD_CIS/`. Each entry deep-links into the full BMM, TEA, and CIS references, which in turn cross-link the individual skill, agent, and workflow pages.

## Deployment

The site deploys automatically to **GitHub Pages** on every push to `main` via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). The workflow uploads the repository root and publishes it — no build step required.

To deploy your own fork:

1. Push to your fork's `main` branch.
2. In **Settings → Pages**, set the source to **GitHub Actions**.

## Contributing

Contributions are welcome!

1. Add or update HTML pages under `BMAD/` or `BMAD_CIS/`.
2. Update `index.html` to link to any new pages.
3. Commit your changes.
4. Open a pull request.

Please keep pages self-contained (inline styles/scripts) so they render without external build tooling.

## License

MIT License — see [LICENSE](LICENSE) for details.
