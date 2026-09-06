# Collected Wonders · 拾遗

[![CI](https://github.com/jfg-jfg/collected-wonders/actions/workflows/ci.yml/badge.svg)](https://github.com/jfg-jfg/collected-wonders/actions/workflows/ci.yml)

> Five small wonders · 五件小小的奇物
> Zero dependencies · Vanilla HTML/CSS/JS · Double-click to run · Bilingual 中英

*中文完整文档见 [README.md](README.md)（本文为精炼英文版）。设计细节、共享宇宙年表与真机清单等深文档目前仅中文。*

A collection of standalone creative-web works. No build step, no framework, no CDN, no image assets — each work is a self-contained HTML file that runs in the browser from a double-click, even over `file://`.

**Portal**: open `index.html` (GALLERY — cross-site usage stats, last-visit memory)

**Live**: <https://jfg-jfg.github.io/collected-wonders/> · **Source**: <https://github.com/jfg-jfg/collected-wonders>

## The Works

| # | Work | Type | One line |
|---|------|------|----------|
| 1 | [INK · 墨](ink/index.html) | Visual / Fluid | An ink-wash fluid painting studio: slow strokes bloom dark, fast strokes leave dry-brush silk. Four brushes, eight mixable inks (true-pigment RGB mixing), four papers, wet-edge & sediment, pressure dynamics, seals & mounting, IndexedDB gallery |
| 2 | [ECHO · 回声](echo/index.html) | Game / Puzzle | A maze in total darkness where sonar ripples are your only light. Twelve story levels + tower finale, keys & gates, charged/directed sonar, three ghost AI kinds (BFS-scored), well editor, endless & daily modes |
| 3 | [SCAPE · 造境](scape/index.html) | Tool / Soundscape | A scene & soundscape generator where sound and picture share one source. Ten mathematically synthesized channels, seven themes, day/night & seasons, time flow, shareable `#w=` links, recording, sleep timer |
| 4 | [LETTERS · 纸间](letters/index.html) | Narrative / Epistolary | Six mailboxes of branching letters — or let an AI write, or write your own. Hidden-ending engine, per-story typography & aging, WebAudio paper sounds, AI prompt builder, visual story editor, import validation |
| 5 | [FOLD · 褶皱](fold/index.html) | Technical / Fractal | A planet of infinite detail. Perturbation engine down to 10²⁰ (BigInt reference orbit + GPU δ replay), four fractal modes, voyage log, daily planet, narrative cruises — and at the bottom, the lamp is still lit |
| — | [GALLERY · 序](index.html) | Portal | Particle-flow cover, five card portals, cross-site statistics |

Deep documentation per work: [docs/DESIGN.md](docs/DESIGN.md) (Chinese).

## Technical Core

- **INK**: hand-written WebGL2 Stable Fluids solver (advection / vorticity / Jacobi pressure), true-pigment RGB mixing via a four-channel dye texture (premultiplied pigment + wetness), adaptive three-tier quality, WebGL context-loss recovery
- **ECHO**: sonar-ripple lighting, additive maze generation in seven styles (open field + strategic walls + BFS structural validation, generator shared with the validator via `echo/level-gen.js`), BFS-scored ghost AI, fully synthesized WebAudio
- **SCAPE**: ten zero-sample math-synthesized channels; one time-of-day parameter drives sky, sun/moon, stars, window lights and audio; event scheduler (thunder/bells/birds); MediaRecorder A+V capture
- **LETTERS**: branching letter-graph engine (replies + contTo + hidden-ending replacement), story-pack JSON schema, graph reachability validation
- **FOLD**: df64 double-single GLSL arithmetic, perturbation with BigInt fixed-point reference orbits and glitch detection, on-demand rendering + idle catch-up, context-loss recovery

## Design Principles

- **Zero dependencies**: no external resources at all; offline-capable; runs from `file://`
- **Single file**: one `index.html` per work; the only two exceptions are pure-logic/data files shared between page and node validators (`letters/story-data.js`, `echo/level-gen.js`)
- **Bilingual**: every site toggles 中/EN, remembered in localStorage; `#lang=en|zh` deep links
- **Mobile first**: every screen audited at 390px
- **Self-verifying**: `tools/` verification chain + per-site `#lab` numeric laboratories (see Development)
- **Accessibility baseline**: `prefers-reduced-motion` / `color-scheme` site-wide
- **Five aesthetics**: each work has its own visual identity; the portal ties them together

## Repository Layout

```
index.html                  GALLERY portal
ink/    echo/  scape/  letters/  fold/     the five works (one index.html each)
echo/level-gen.js           maze generator (page + validator read the same file)
letters/story-data.js       six built-in stories (doubles as the AI schema)
404.html                    404 page (redirects home)
tools/                      verification chain (see below)
docs/                       DESIGN · UNIVERSE timeline · DEVICE-CHECK · POST-DRAFTS
```

## Development

- **One command**: `bash tools/check.sh` — runs everything below
- **Smoke test**: `bash tools/smoke-test.sh` (9 states: page must really render + no JS errors; auto-discovers Chrome/Edge, or set `BROWSER_BIN=`)
- **Hash regression**: `bash tools/hash-test.sh` (35 states; the five `#lab` states positively assert `LAB PASS`)
- **Level validation**: `node tools/validate-levels.mjs` (reads `echo/level-gen.js`; 12 built-in levels + 40 random stress samples)
- **Story validation**: `node tools/validate-stories.mjs` (dangling refs + reachability + hidden endings)
- **Well generator**: `node tools/gen-wells.mjs`
- **Parity check**: `bash tools/check-parity.sh` (shared-site conventions present on all six pages)
- **CI**: GitHub Actions — validators + syntax + parity; headless Chrome runs the full smoke + hash suites
- Deep docs (Chinese): `docs/DESIGN.md` · `docs/UNIVERSE.md` · `docs/DEVICE-CHECK.md` · `docs/POST-DRAFTS.md`

## Iteration (abridged)

1.0 five works + portal → 2.0–6.0 depth-polish rounds → 7–15 editors & mobile → 16+ feedback rounds → **v5** interaction-layer rebuild (SCAPE/LETTERS) → **v6** ten channels / five buttons / hidden endings / validation chain → **v6.1** fourth mailbox + orphan-letter fix → **v6.2** mobile-first round (twelve ECHO levels, INK eco mode, 390px audit) → **v7** gameplay deepening (three ghost kinds, keys & gates, rainforest theme, true-pigment mixing, two new mailboxes) → **v7.1** toolchain hardening (liveness assertions, lab positive asserts, browser CI) → ongoing hardening rounds (context-loss recovery, save robustness, one-command checks).

---

2026 · code as ink, browser as paper · 以代码作墨，以浏览器为纸
