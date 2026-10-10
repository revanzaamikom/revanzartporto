# PRODUCT.md  -  REVANZART

> Purpose: product truth for this project, for humans and agents (read by the
> `impeccable` skill alongside `DESIGN.md`). Read together with `AGENTS.md` (rules)
> and `DESIGN.md` (visual system).
>
> This file states what the product IS. It does not prescribe style. Do not invent
> features, customers, or claims here (anti-slop R-36, R-38).
>
> Last verified: 2026-10-10

---

## 1. What this is

A single-page personal portfolio website for **Muhamad Revanza Rafif Hamdani**, a video editor and motion designer (also: graphics designer, scriptwriter, videographer, photography). Built with Astro 7 + React 18 + Tailwind CSS 4.

Live: `https://revanzart.vercel.app`
Repo: `https://github.com/revanzaamikom/revanzartporto`
Deploy: Vercel, production branch `main`, output `static` (do not add server adapters without confirmation).

**Primary job:** let recruiters, clients, and lecturers experience the creative work (video, motion, design, photography) and contact the owner.

**Secondary job (built):** a web-development service surface at `/webportofolio` (`src/pages/webportofolio.astro`), reached from a CTA in the "What I Do" section. It has its own visual world (warm near-black + amber, Archivo + IBM Plex Mono), separate from the home's cyan/dark-cinematic look. Content follows `website-portfolio-brief.md`; design recorded in `DESIGN.md` §11; session notes in `docs/TODO-session-next.md`.

---

## 2. Audience

- Potential clients of video/motion/design work.
- Recruiters and collaborators.
- University lecturers (Photography section is linked directly, e.g. `/ #Photography`).
- (Future) businesses looking for a website developer.

## 3. Owner (single author of all design decisions)

**Muhamad Revanza Rafif Hamdani**  -  Video Editor & Motion Designer. Student of **Teknologi Informasi** at Universitas Amikom Yogyakarta.

- Never use the word "IT" for the study program; always "Teknologi Informasi".
- All features, design, layout, animation, content, and settings are the owner's decisions. Agents help realize them, never replace the owner's taste without explicit confirmation (`AGENTS.md` §2).
- Real contact: email `importantrevanza@gmail.com`, Instagram `revanzarh`, YouTube `@Revanzarh`, LinkedIn (see `AGENTS.md` §1), WhatsApp `wa.me/628559992302`.

---

## 4. Current structure (single page: `src/pages/index.astro`)

Order of sections:

1. `SplashScreen.jsx`  -  2.6s overlay, dispatches `splash-complete`.
2. `Hero.astro`  -  3D lanyard, LightRays, SpecularButton, typewriter roles, floating contact.
3. `ProjectGrid.astro` (`#work`)  -  Recent Work, GradientWaves + video cards + lightbox.
4. `WhatIDo.astro` → `WhatIDo.jsx` → `ui/OptionWheel.jsx` (`#what-i-do`)  -  EN/ID toggle + skill wheel.
5. Software & Tools marquee (`#software-skills`).
6. Gallery (`#gallery`)  -  Video Editing accordion, Design Studio sidebar (Motion/Marketing/Publication), Photography (`#Photography`), modals.
7. Certificates vault (`#certificates`)  -  zoom/pan/pinch.
8. `Footer.astro`.
9. `MagazineFlipbook.astro`  -  mounted outside `<main>` (global flipbook modal).

Other pages: `404.astro`, plus `robots.txt.ts` and `sitemap.xml.ts` endpoints.

**Sub-pages:** the only real sub-page is `/webportofolio` (web-development service surface). Routes under a future `/web/*` are NOT built. Do not create navbar links to pages that do not exist (anti-slop R-24). `/webportofolio` is linked from a CTA in the "What I Do" section, not the navbar.

---

## 5. Content truth (verified)

Real, verified content (safe to present as fact):

- **Recent Work (5):** Nutriverse Motion, Nutriverse UX GEMASTIK 2026, Company Profile Andi Media Digital, "Nexum" VFX Short Movie, Indie Short Movie "pelunasan sunyi" (YouTube IDs and mp4 paths in `AGENTS.md` §4).
- **Gallery:** General Editing, VFX Editing, Music Video (The Panturas - Sunshine), Motion Design, and the "GTR EVOLUTION" magazine (26-page, self-hosted flipbook).
- **Photography:** 3 categories (Ande-Ande Lumut, Photo Story, Shutterstock), auto-listed from `public/images/photography/{kategori}/*.webp`.
- **Certificates:** 7 listed in `AGENTS.md` §4.

Honest placeholders already in the product (owner-made, keep as-is):

- Talking Head, Property, Advertising gallery categories: visible **"Coming Soon Hehehe"**.
- Marketing Design tabs (Social Media Feeds / Poster / Carousel): visible **"Coming Soon Hehehe"**.
- These are intentional, not defects. Do not fabricate content to fill them.

Known honest status for future case studies (from `website-portfolio-brief.md` + verified repos):

- **Camp Plan**  -  live deployment **temporarily unavailable** (hosting-credit limits). Label as not-deployed; do not claim an operational service.
- **KonveksiKampus**  -  MVP (Standard phase), client preview live at `revanzaamikom.github.io/konveksi-kampus/`. Not a finished commercial product.
- **PAKTJIP Website** (CV PakTjip Digital Printing)  -  real client project, landing + admin panel built (PHP 8 + MySQL). Deployment status not published; do not claim it is live without confirmation.

---

## 5b. Technology & Tools (source of truth)

**Tools I Use** (workflow  -  how the owner works):

- **opencode**  -  AI coding agent, the primary tool for planning and building. This is the main workflow tool and must be named whenever "Tools I Use" is shown.
- Git / GitHub  -  version control, repositories public under `revanzaamikom`.
- Figma  -  design.
- XAMPP  -  local PHP/MySQL dev.
- Vercel / Netlify  -  deployment.

**Frontend:** Astro, React, Next.js, TypeScript, JavaScript.

**Styling & UI:** Tailwind CSS (v4, CSS-first).

**Backend & Data:** PHP (native, PDO), MySQL, Supabase, Node.js.

Only technologies actually used in a real project may be listed. Do not imply mastery from a dependency file or a tutorial (brief §10). Group by role, not as one flat list.

---

## 6. Constraints (do not break)

- **Preserve existing design** unless the owner confirms a change (`AGENTS.md` §2).
- **Do not say "IT"** for the study program.
- Stack is fixed: Astro 7, React 18, Tailwind 4 (CSS-first), `ogl`, `three`/R3F, `page-flip`. Do not add dependencies if vanilla JS/CSS suffices (`AGENTS.md` §7).
- Output stays `static`. Do not install `@astrojs/vercel` / server mode without confirmation.
- Never expose secrets / `.env` values; never hardcode private keys in frontend (`website-portfolio-brief.md` §15).
- Deploy target: Vercel, branch `main`.

## 7. Success looks like

- A visitor immediately understands who the owner is and what they do.
- The creative work is the star; the interface recedes.
- Contact is one obvious action away.
- (Future) the web-development surface earns trust through real projects and honest status, not fabricated claims.

## 8. Anti-slop stance

This product is under the `antislop` filter and the `impeccable` skill. Credibility comes from evidence (real repos, real screenshots, honest status), never from invented testimonials, metrics, awards, or client names. When evidence is missing, describe the work honestly or omit the claim.
