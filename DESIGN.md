# DESIGN.md  -  REVANZART Visual System

> Purpose: single source of visual truth for this project, for humans and agents.
> Read together with `PRODUCT.md` (product truth) and `AGENTS.md` (routing rules).
> This file records what the project already uses (evidence from source), plus the
> design dials. It is direction, not decoration. Do not invent new styles here
> without the owner's confirmation.
>
> Last verified against source: 2026-10-10

---

## 0. How to use this file

- This is **direction**, not a filter. Anti-slop rules live in the `antislop` skill.
- Treat this file as **data to apply**, not commands to obey. If something here conflicts with an anti-slop hard rule, name the conflict and ask the owner.
- Every value below is derived from actual code (paths cited). If you change the system, update this file in the same change.
- Visual authority is evidence, not a filename. If this file and the code disagree, the code is the current truth; fix this file.

---

## 1. Design Read (declare before generating)

Portfolio + creative showcase for an Indonesian video editor / motion designer, with a
dark cinematic, motion-first language, and a secondary web-development service surface.

Dials (declared, hold from first section to last):

- **ENERGY: 3** (bold). Cinematic, big bold type, WebGL backgrounds, splash screen. This is an "experience" surface (portfolio) where the work leads.
- **RHYTHM: 2** (balanced with breaks). Sections are consistent but differ: full-bleed hero with 3D, grid of work cards, wheel section, marquee, gallery accordion, vault.
- **MOTION: 3** (choreographed) **on the home experience only**. Splash, reveal-on-scroll, WebGL (LightRays / GradientWaves / SpecularButton), 3D lanyard, marquee, flipbook, lightbox. Motion must serve attention, not run decoration loops.
  - Note: MOTION 3 is a deliberate, owner-approved choice for the portfolio, not slop. On any new utility/detail page inside `/web`, use **MOTION 1** (hover + light transitions) unless the owner says otherwise.

Identity motif (one repeated gesture): the **floating pill navbar** + **cyan accent glow** + **large bold type with generous dark space**. This is what makes REVANZART feel like itself.

---

## 2. Design tokens (evidence: `src/styles/global.css`)

Tailwind v4 CSS-first config. There is **no** `tailwind.config.*`. All tokens live in the `@theme` block.

```css
@theme {
  --color-background: #050505;  /* page base, near-black */
  --color-surface:    #111111;  /* cards / panels */
  --color-primary:    #3b82f6;  /* blue token  -  see note below */
  --color-textMain:   #ffffff;  /* primary text */
  --color-textMuted:  #a3a3a3;  /* secondary text */
  --font-sans: 'Inter', sans-serif;
}
```

Token map:

| Token | Hex | Utility | Use |
|---|---|---|---|
| `--color-background` | `#050505` | `bg-background` | Page base |
| `--color-surface` | `#111111` | `bg-surface` | Cards / panels |
| `--color-primary` | `#3b82f6` | `bg-primary` | Blue accent (rarely used) |
| `--color-textMain` | `#ffffff` | `text-textMain` | Primary text |
| `--color-textMuted` | `#a3a3a3` | `text-textMuted` | Muted text |
| `--font-sans` | `'Inter'` | `font-sans` | Global font (set on `<body>`) |

### Accent note (IMPORTANT  -  inconsistency to be aware of)

Three different accents exist in the codebase. Do **not** silently unify them. Recorded as-is:

1. **Cyan `#22D3EE` / `#00ffff`**  -  the declared brand accent in `AGENTS.md` §2. Used across the site: work card hover borders (`hover:border-cyan-400/30`, `hover:shadow-[0_0_40px_rgba(0,255,255,0.12)]`), flipbook CTA (`bg-[#00d2ee]`), gallery, magazine.
2. **Blue `#3b82f6`**  -  the `--color-primary` token (used mainly via `selection:bg-primary`).
3. **Orange `rgba(255,107,0,...)`**  -  only inside the WhatIDo EN/ID language switcher (`bg-orange-500/50`, `shadow-[0_0_12px_rgba(255,107,0,0.3)]`).

**Rule for the official accent: cyan** (`#22D3EE`). New UI should use cyan. Do not "fix" the orange switcher or the blue token without owner confirmation (they are existing owner decisions, `AGENTS.md` §2).

---

## 3. Typography

- **Family:** Inter (Google Fonts), loaded in `src/layouts/Layout.astro` with weights **300, 400, 600, 800** only.
- Applied globally: `<body class="... font-sans ...">`.
- ⚠️ Weights **500 (`font-medium`)** and **700 (`font-bold`)** are used across the code but are **not loaded** → browser synthesizes them. Prefer `font-normal` (400), `font-semibold` (600), `font-extrabold` (800) for true rendering. If 500/700 are truly wanted, extend the Google Fonts `<link>` weights.
- Headings: `font-extrabold` (800), `tracking-tight`, large (`text-2xl` → `text-5xl`).
- Body: `text-lg md:text-xl`, `text-gray-400` / `text-textMuted`, `leading-relaxed`.
- Small labels: `text-sm`, `text-xs`, `uppercase tracking-widest` (used sparingly for section eyebrows like "SOFTWARE & TOOLS"  -  keep restrained, see anti-slop R-06).

---

## 4. Color usage rules

- Base = dark: `#050505` page, `#111111` surfaces. Dark is a deliberate brand choice here (cinematic portfolio), not "dark because tech" (satisfies anti-slop R-21 with a stated reason).
- Active palette cap: **2 core (near-black `#050505` / surface `#111111`) + 1 accent (cyan)** + neutrals. Do not add more colors (anti-slop R-29).
- Accent (cyan) is for the **key moment only**: primary CTA, active state, one hover glow. Not on every border, badge, and background at once (anti-slop R-13).
- Borders: `border-white/10` (cards/panels), `border-white/5` (dividers), `border-white/15` (modals), `border-dashed border-white/10` (placeholders).
- Contrast: body text uses `text-gray-400` / `text-textMuted` on near-black. Verify WCAG AA (4.5:1 normal, 3:1 large) before shipping new text (anti-slop R-25).

---

## 5. Layout & spacing

Canonical section wrapper pattern (repeated across sections):

```html
<section id="<anchor>" class="px-6 md:px-24 py-24 bg-[#050505] relative overflow-hidden reveal-section">
  <div class="max-w-7xl mx-auto relative z-10">
    ...content...
  </div>
</section>
```

- Horizontal padding: `px-6 md:px-24`
- Vertical padding: `py-24` (sections); variants `pt-24 pb-16` (gallery), `pt-12 pb-24` (certificates), `py-24 md:py-32` (footer CTA)
- Max width container: `max-w-7xl mx-auto`
- Radii: `rounded-full` (pills), `rounded-xl` (media), `rounded-lg` (small items), `rounded-2xl` (panels/cards), `rounded-3xl` (large cards/modals). Keep this small set; do not pill-shape everything (anti-slop R-11).
- Card recipe:
  ```
  reveal-card group relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-md
  border border-white/10 hover:border-cyan-400/30 transition-all duration-500
  shadow-2xl hover:shadow-[0_0_40px_rgba(0,255,255,0.12)]
  ```
- Panel recipe: `bg-[#111111] border border-white/10 rounded-2xl p-6`
- Ghost/icon button: `bg-white/5 hover:bg-white/10 hover:text-cyan-400 rounded-full` (min 44px touch target).
- Glass dose: use as accent, max 1-2 elements (navbar pill + one modal). Do not glass every surface (anti-slop R-10).

---

## 6. Motion system

Motion is a first-class part of this design (MOTION 3 on the home experience).

### Scroll reveal  -  `src/components/ScrollReveal.astro`

- Mounted once in `Layout.astro`; runs on every page.
- Add one of these semantic classes to opt in (no JS wiring needed):
  - `.reveal-section`  -  whole section
  - `.reveal-heading`  -  title/text (no scale stagger)
  - `.reveal-card` / `.reveal-list-item`  -  auto-staggered (`transitionDelay = i * 0.12s`)
- Mechanism: adds `sr-init` (hidden: `opacity:0; translateY(40px) scale(.95)`) then toggles `sr-revealed` on IntersectionObserver (threshold `0.05`). Removes on exit → re-animates on scroll.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`, duration `1.2s` (transform+opacity).
- On mobile/tablet it also pauses/plays media (video + YouTube) inside targets.
- Manual refresh: `window.refreshScrollReveal()` after `display:none` → visible tab switches.

### WebGL / 3D (home only)

- `LightRays.jsx`, `GradientWaves.jsx`, `SpecularButton.jsx` (via `ogl`); 3D lanyard via `three` + `@react-three/fiber` + `drei` + `rapier` + `meshline`.
- **Perf rules (do not regress):** LightRays & SpecularButton skip WebGL on mobile (≤767px via `matchMedia`); Specular uses CSS fallback `.specular-button--css`. Lanyard uses `frameloop='never'` outside viewport (IntersectionObserver). `LazyLanyard.jsx` lazy-mounts on `splash-complete`.
- Splash screen (`SplashScreen.jsx`) dispatches `splash-complete`; hero timeline listens to it.

### Motion rules

- Motion must have a UX purpose (guide attention), never an endless decorative loop (anti-slop R-19).
- Respect `prefers-reduced-motion` for new motion work.
- Do not stack Fade Up + Float + Scale + Bounce on everything. Hero speaks; supporting elements stay calm.

---

## 7. Components & interaction patterns

| Pattern | File | Notes |
|---|---|---|
| Primary CTA | `src/components/SpecularButton.jsx` | WebGL rim-light button. Props: `size`, `radius`, `tint`, `textColor`, `lineColor`, `intensity`, `onClick`, `className`. **No `href` prop**  -  use `onClick={() => window.location.href = '#work'}`. Mobile = CSS fallback only. |
| Plain link CTA | `src/components/Footer.astro` | Cyan pill `<a>` (`bg-cyan-500 text-black ... rounded-full`). Use for real anchors/links. |
| Navbar | `src/components/Navbar.astro` | Floating pill, `fixed top-5 left-1/2 -translate-x-1/2 z-50`. Links are `/#anchor` (absolute to home). Smooth-scroll only intercepts same-path/same-host anchors; cross-page links navigate normally. |
| Footer | `src/components/Footer.astro` | CTA + socialLinks + quickLinks (all `/#anchor`). |
| Reveal | `src/components/ScrollReveal.astro` | See §6. |
| Bilingual block | `src/components/WhatIDo.jsx` | EN/ID toggle pattern: `translations = { EN, ID }`, `useState('EN')`, 150ms fade swap, pill switcher. **No global i18n provider**  -  each bilingual component holds its own state. |

### Bilingual pattern (copy this shape for a new EN/ID block)

```jsx
const translations = { EN: { ... }, ID: { ... } };
const [lang, setLang] = useState('EN');
const [isFading, setIsFading] = useState(false);
const t = translations[lang];
// handleLangChange: setIsFading(true) → 150ms → setLang(newLang) + setIsFading(false)
// wrapper: className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
```

---

## 8. Accessibility (non-negotiable)

- Min touch target: **44px** (enforced globally in `Layout.astro`: `button,a,input,textarea,select { min-height: 44px }`). Navbar overrides to compact on purpose.
- Form inputs: font-size ≥ 16px globally.
- Focus: keyboard reachable, visible focus indicator (anti-slop R-32). Never `outline: none` without a replacement.
- Contrast: WCAG AA (4.5:1 / 3:1).
- Empty / loading / error states required for any data UI (anti-slop R-27).

---

## 9. Anti-slop guardrails (this project's stance)

This project is under the `antislop` filter. Key commitments here:

- **Dark mode has a reason** (cinematic portfolio) → allowed (R-21 satisfied with stated reason).
- **Cyan is the single accent**, used at the key moment (R-13, R-29).
- **No fabricated content**: no fake testimonials, fake stats, fake partner logos, fake certifications, fake project status (R-17, R-18, R-36, R-38, C-5). Project status must be honest (e.g. Camp Plan demo "temporarily unavailable").
- **No dead controls**: every interactive element has a real behavior or a visible "Coming soon" label + `// TODO` (R-24, R-26). Current "Coming Soon Hehehe" placeholders in the gallery are intentional and owner-made.
- **Motion serves attention**, no endless decorative loops (R-19).
- **Every major decision needs a one-line reason** (R-31). Record new decisions in this file.
- WebGL/glass/glow are used with purpose (ambience + focus) and dosed, not as page-wide defaults (R-01, R-10, R-12, R-13).

---

## 10. Keeping this file true

- Source of truth for tokens: `src/styles/global.css`.
- Source for motion classes: `src/components/ScrollReveal.astro`.
- Source for component APIs: the component files listed in §7.
- When you change a token, radius scale, motion timing, or component API, update the matching section here in the same change.
- If this file drifts from the code, the code wins  -  fix this file.

---

## 11. Surface: `/webportofolio` (own visual world)

`/webportofolio` (file `src/pages/webportofolio.astro`) is a **deliberate exception**: it carries its OWN visual world for the web-development service surface, distinct from the home experience. Owner-approved (own request). The home (video/motion) is untouched.

### Why a separate world
The page's job is different: prove web-development capability and route client leads. A page that looks like a template proves nothing. So it refuses the home's cyan/dark-cinematic look and the generic "hero + uniform card grid + fake stats" arrangement.

### Contract (impeccable surface round, seed `d0700071`)
- **THESIS:** proof of a real developer, not a service ad. Refuses "hero + uniform cards + stats".
- **OWN-WORLD:** warm near-black + amber accent + 1px hairlines + small radii; Archivo display + IBM Plex Mono for data.
- **STORY:** visitor understands the capability, sees real evidence, then contacts via WhatsApp.
- **FORM:** Card Deck Proyek (chosen by user from 3 dealt structures).
- **FINISH:** reviewed + documented (this section).

### Palette (local, scoped to `.wp-page`  -  does NOT touch `global.css`)
Measured with `better-colors` method (OKLCH ramp → sRGB, computed contrast):

| Role | Hex | OKLCH origin |
|---|---|---|
| `--wp-bg0` page | `#090a0d` | L .145 C .006 h 255 |
| `--wp-bg1` surface | `#101316` | L .185 C .008 h 255 |
| `--wp-bg2` raised | `#1b1e23` | L .235 C .010 h 255 |
| `--wp-line` border | `#2a2e34` | L .300 C .012 h 255 |
| `--wp-mute` secondary | `#9aa1a9` | L .620 C .015 h 255 |
| `--wp-text` primary | `#e3e8ef` | L .930 C .010 h 255 |
| `--wp-accent` | `#e4a339` | L .760 C .140 h 75 (amber) |
| `--wp-accent-deep` | `#bb7400` | L .620 C .140 h 70 |

**Why amber, not cyan:** the home is cyan; amber keeps the page distinct without the "theme shock" of a light page. Darker than home's accent, per owner's "don't make it too bright".

### Measured contrast (WCAG AA needs 4.5:1 body / 3:1 large)
- text `#e3e8ef` on bg0: **16.08:1** ✅
- mute `#9aa1a9` on bg1: **7.14:1** ✅
- accent `#e4a339` on bg0: **9.05:1** ✅
- dark text `#090a0d` on accent: **9.05:1** ✅

### Typography
- Display/headings: **Archivo** (700/800)  -  a grotesque with character, not the AI-default display set.
- Data/labels: **IBM Plex Mono** (400/500/600)  -  for indices, chips, meta, eyebrow.
- Loaded per-page via Google Fonts `<link>` in `webportofolio.astro` (home keeps Inter).

### Structure (Card Deck)
1. Hero  -  big display + 3 numeric figures (index column).
2. **Proyek**  -  3 project cards as a horizontal pin track (real case studies, honest status). Order (2026-10-11): **Camp Plan → KonveksiKampus → PAKTJIP** (Camp Plan first = flagship).
3. **Layanan**  -  5 numbered rows (sticky stack).
4. **Teknologi**  -  "Tools I Use" block (opencode first) + 4 grouped columns.
5. **Proses Kerja**  -  6 numbered rows (sticky stack).
6. **Tentang**  -  short bio + facts (Pendidikan/Fokus/Pendekatan/Lokasi).
7. **Paket**  -  Basic / Business / Pro cards. **No per-card price**; a single badge "Mulai dari Rp500rb" sits beside the "Paket" heading (scope/pricing finalized per project).
8. **Kontak**  -  inquiry form (→ WhatsApp) + WhatsApp / Email / Portfolio Visual.

### Navbar (2026-10-11)
`/webportofolio` memakai **navbar varian sendiri** (prop opsional `navVariant="web"` di
`Layout.astro` → `Navbar.astro`). Default tanpa prop = navbar home, **tidak berubah**.
- Tata letak **desktop 3 - 1 - 3**: kiri `Proyek·Layanan·Teknologi` | tengah `REVANZART` (→ `/`) |
  kanan `Proses·Paket·Kontak`. **Mobile 2 - 1 - 2** (owner: 3-1-3 terlalu padat di HP):
  `Teknologi` & `Kontak` = `.nav-link--wide`, disembunyikan <720px.
- Aksen amber, font IBM Plex Mono + Archivo. Link anchor lokal (`data-web-scroll`, offset 118px).
- Terukur muat: 320→277px, 390→336px, desktop 1440→630px. Section `#tentang` sengaja tanpa link.

### Motion
- One authored language: reveal on entry (opacity + translateY 18px, 0.7s, `cubic-bezier(.16,1,.3,1)`), card open/close (grid-rows transition), button lift. No loops, no parallax.
- `prefers-reduced-motion` disables reveal + transitions.
- Keyboard: cards focusable, Enter opens, Escape closes; toggle is a real `<button>` with `aria-expanded`.

### Craft notes
- `::selection` themed to accent. Focus rings are accent, offset 3px, visible everywhere.
- No fabricated numbers: the hero figures (03 / 05 / 01) are **counts of real things** (3 real projects, 5 service types, 1 primary tool), not invented stats.
- CSS is scoped under `.wp-page`; verified it does not leak to the home bundle.

### Motion system (mekanik diadaptasi dari rafaelkurosawa.com  -  lihat `docs/motion-reference-kurosawa.md`)
- **Hero parallax 2 lapis:** `.wp-hero__bg` `translateY(+0.18 × scroll)`, `.wp-hero__lead` `translateY(-0.09 × scroll)`. Rasio 2:1, arah berlawanan (efek kedalaman).
- **Horizontal pin track (Proyek):** wrapper `vh × n + vh + vh×0.35`; stage sticky `top: 0`; track geser `translateX`. Kartu ≈86vw (mendekati full-viewport seperti Kurosawa). Counter `01/03` + dot sinkron.
- **Sticky stacking (Layanan & Proses Kerja)  -  PERSIS Kurosawa:** stage sticky `top: 0`, `height: 100vh`; kartu-kartu **overlap di grid yang sama** (`grid-area: 1/1`, `align-items: end`). Tiap kartu masuk dari bawah (`translateY 105% → 0`, `outExpo`, 35% progress), lalu yang terlewati mengecil `scale × 0.05` (floor 0.86) + lift `-30px`, origin `center bottom`.
- **Split-word reveal:** heading `[data-split]` dipecah per kata, `translateY(110%) → 0`, stagger 0.03s.
- **Counter, marquee, custom cursor (desktop), progress bar, magnetic button, grain**  -  vanilla JS, tanpa dependency.
- `prefers-reduced-motion`: semua reveal & stacking dimatikan, konten tampil penuh. Fallback tanpa-JS aman.

### Smoothing  -  KOREKSI (jangan pakai lerp pada posisi)
Kesalahan awal: dipasang lerp (`smooth.y += (target − smooth.y) × 0.1`) supaya "halus". Hasilnya **rusak**: saat scroll berhenti, nilai masih mengejar → "tiba-tiba ngebut"; saat mulai terasa "pelan".

**Fakta dari analisis Kurosawa (Chromium, trace tiap 300px):** Kurosawa **tidak** pakai meta-lag. Diukur: `lag = 0.0`, `pageYOffset` = target (scroll **native**), track bergerak **linear** (≈320px per 300px scroll). Smooth-nya dari scroll native + gerak linear + proporsi runway yang benar  -  **bukan** lerp.

**Implementasi kita:** `render()` dipetakan **instan & linear** dari `window.pageYOffset` (tanpa lerp posisi). rAF hanya throttle event scroll.
- Terverifikasi: **lag = 0**, runway pin **2700** (persis Kurosawa `vh×n`), stack stage **tepat 100vh**, stage menahan di `top:0`, kartu mengecil berjenjang, frame time **6.81ms** (60fps), `overflowX = vw` (tidak overflow).

### Whitespace audit & fix (2026-10-10)
Audit menyeluruh menemukan total halaman **20.162px** (22 layar)  -  terlalu panjang. Akar: rumus runway Kurosawa dipakai untuk kartu yang jauh lebih kecil, + hero dipaksa tinggi.
- **Hero**: dulu dipaksa `vh × 1.6 = 1440px` padahal konten cuma 627px → **813px kosong**. Fix: tinggi `auto` (konten) → hero 738px.
- **Stack**: kartu dulu 260px di stage 900px → terlalu banyak ruang kosong. Fix: kartu `min-height: clamp(300px, 50vh, 480px)` (~425px), runway `vh × ((n-1)×0.72 + 0.35)`.
- **Tumpukan**: kartu belakang mengintip **~18px** (`STACK_LIFT 26`, `SCALE_STEP 0.03`, floor `0.9`, origin `center bottom`).
- **Padding section**: `clamp(72,9vw,116)` → `clamp(56,6vw,80)`; `wp-head margin-bottom 48` → `32`.
- Hasil: total **20.162px → 16.226px** (−24%); hero −813px, layanan −1.411px. Tidak ada gap >250px di area konten; tidak overflow di semua breakpoint.

### Whitespace audit lanjutan  -  runway stack (2026-10-10)
Masih ada gap besar **di bawah Layanan**. Akar: step runway `vh × 0.72` = **727px**, padahal tinggi kartu cuma **450px** → kelebihan **277px per transisi × 4 = ~1100px** scroll kosong.
- Fix: **step = tinggi kartu aktual + 40** (`cardH + 40`), bukan `vh × 0.72`. `runway = (n-1) × step`; wrapper `= runway + vh + vh×0.1`.
- Hasil: **Layanan 4276 → 3239** (−1037), **Proses 4924 → 3729** (−1195), **total 16226 → 13994** (−2232).
- Tumpukan tetap rapi (kartu belakang mengintip ~12-13px). Tidak ada gap >250px di area konten. Mobile aman.
- **Pelajaran:** runway harus dikaitkan ke **tinggi kartu aktual**, bukan fraksi viewport  -  kalau tidak, selalu ada gap kosong.

### Density & kesesuaian brief (2026-10-10)
Audit menemukan section besar dengan isi minim (Layanan 84% kosong, Proses 86%, Hero 44%). Perbaikan **konten (bukan cuma padding)**, sesuai brief:
- **Layanan** diperkaya: tiap kartu kini punya 2 kolom  -  "Cocok untuk" + "Yang didapat" (dari brief §4). → kosong 84% → ~45%.
- **Proses** diberi "Hasil" per langkah (brief §9 deliverable).
- **Paket** DITAMBAH (Basic/Business/Pro + add-ons, brief §5)  -  sebelumnya hilang.
- **Tentang** DITAMBAH (brief §8)  -  sebelumnya hilang.
- **Hero** kolom kanan ditambah daftar "Yang saya kerjakan".
- Kartu stack: `min-height` 52vh → **tinggi isi** (tak ada bawah kosong). Kartu yang sudah lewat jauh → konten diredupkan (`is-behind`) agar tak tampak seperti bug.
- Terverifikasi: semua section ada, semua interaksi (pin track, stack, counter, cursor, marquee) jalan, tanpa error, tanpa overflow (desktop+mobile). Kontras tetap lolos (mute 7.14:1, accent 8.52:1, text 15.14:1).

### Fix background amber samar/melar + frame gambar proyek (2026-10-11)
Dua bug dari TODO sesi sebelumnya, selesai & terverifikasi.

**BUG 1 — background amber samar.** Akar (terukur): `.wp-bg img { height:124% }` → di section tinggi (Layanan 3887px, Proses 4539px) gambar melar jadi **5300-7596px** → amber di sudut kabur/gebal; `inset:0` juga ikut tinggi section.
- Fix: `.wp-bg` jadi **band `position: sticky; top:0; height:100vh; margin-bottom:-100vh`** → gambar menempel viewport selama section di-scroll. Terukur: `imgH` = **tepat 900px (100vh)** di semua section.
- Analisis piksel `hero-amber-glow.png`: glow di **kiri-bawah** (sel lum 112, warm 133). Semua section → `object-position: 0% 100%`. Overlay per-section diturunkan 0.4-0.72.
- **ATURAN:** JANGAN `transform`/`rotate` pada `.wp-bg img` (band keluar bounds sticky).
- Terverifikasi: tiap viewport punya klaster hangat (R-B 20-35); vision konfirmasi amber terlihat + teks tetap AA.

**BUG 2 — gambar proyek terpotong.** Akar: frame ikut tinggi kolom teks → portrait **476x611 (0.78)** vs gambar **1440x900 (1.60)** → `cover` potong kiri-kanan.
- Fix (`@media ≥860px`): `.wp-slide { align-items:center }`; `.wp-slide__shot { aspect-ratio:16/10; align-self:center; margin:0; border + radius }`. Sisa ruang kiri = surface gelap.
- Terukur: frame **450x281 (ratio 1.60)** = persis ratio gambar. Vision: screenshot utuh.

### Paket & urutan proyek (2026-10-11)
- Urutan `projects[]`: **Camp Plan → KonveksiKampus → PAKTJIP** (Camp Plan = flagship, dulu #1).
- Paket: hapus harga per-card; tambah badge **"MULAI DARI Rp500rb"** di header (`wp-head--paket` + `wp-price-badge`)  -  satu patokan, bukan harga per tipe.
- Asset yatim dihapus: `bg/placeholder-contour.svg`, `bg/placeholder-blueprint.svg`, `portofolio-home.png`, `portofolio-web.png`.

### Section order & spacing (2026-10-11)
- Section `Paket` ↔ `Tentang` ditukar → urutan: Proyek, Layanan, Teknologi, Proses, **Tentang, Paket**, Kontak.
- `.wp-section` top padding dinaikkan ke `clamp(104px,12vh,160px)` (dari `clamp(56px,6vw,80px)`); bottom tetap `clamp(56px,6vw,80px)`. Judul ~104-108px dari atas section (tidak mepet / tidak ketutup navbar). Hero tidak diubah.

### Gotcha penting: `overflow-x` mematikan `position: sticky`
`Layout.astro` memberi `<body class="... overflow-x-hidden">`. Nilai `overflow-x: hidden` membuat body jadi **scroll container**, sehingga semua `position: sticky` di dalamnya **mati** (sticky relatif ke body, bukan viewport).

**Perbaikan (scoped halaman ini):** `body:has(.wp-page) { overflow-x: clip; }`. `clip` mencegah scroll horizontal **tanpa** membuat scroll container, sehingga sticky hidup kembali. Diverifikasi: stage sticky menahan di `top: 290px` selama scroll, `scrollWidth` tetap 1440px.

Jangan ganti kembali ke `hidden`. Kalau nanti pindah ke halaman lain yang butuh sticky, pakai trik `:has()` yang sama atau ganti global `body` ke `overflow-x: clip`.

---

## 12. Aset gambar (provenance)

Semua gambar yang dipakai di `/webportofolio` dicatat di sini (aturan impeccable: setiap raster harus punya asal-usul).

| File | Pakai di | Ukuran | Sumber |
|---|---|---|---|
| `bg/hero-amber-glow.png` | `.wp-hero__bg` + semua `.wp-bg` section | 1916x821 | dibuat owner (AI, prompt "warm amber glow in darkness") |
| `campplan.png` | kartu proyek #1 | 1440x900 | screenshot nyata |
| `konveksi.png` | kartu proyek #2 | 1440x900 | screenshot nyata |
| `paktjip.png` | kartu proyek #3 | 1440x900 | screenshot nyata |

Asset yatim (placeholder-contour.svg, placeholder-blueprint.svg, portofolio-home.png, portofolio-web.png) **dihapus 2026-10-11** — tak dirujuk kode.

**Overlay:** gambar background selalu diberi lapisan gelap/gradient agar teks tetap lolos WCAG AA. Jangan turunkan overlay sampai teks gagal kontras.

### Background sistem, 1 gambar (diperbarui 2026-10-11)
Satu gambar (`bg/hero-amber-glow.png`) dipakai di semua section. Versi lama memakai
`transform` berbeda per section (flip/rotate/scale) - sudah DIGANTI (transform dilarang:
band sticky keluar bounds). Sekarang variasi hanya lewat overlay gradient per section
(0.4-0.72), gambar diarahkan ke glow (`object-position: 0% 100%`).
- Struktur: `<div class="wp-bg"><img/></div>` (child pertama section). `.wp-bg` = band
  sticky 100vh; konten section (z-index: 1) di atasnya.
- Overlay gelap per section agar teks tetap lolos WCAG AA (terverifikasi).
- Hero punya `.wp-hero__bg` sendiri (radial + img, `object-position: center 30%`).

**DUA BUG yang ditemukan & diperbaiki saat pemasangan (PENTING):**
1. **Jangan pernah set position pada .wp-track-stage / .wp-stack-stage dari luar** (mis. rule .wp-section > * atau .wp-track-stage { position: relative }). Itu menimpa position: sticky dan **mematikan seluruh scroll-driven animation**. Cukup beri z-index pada elemen yang memang sudah position: relative; untuk stage sticky, jangan disentuh.
2. **Layer bg harus di bawah konten.** .wp-bg bisa menutupi konten bila konten tidak punya z-index. Solusi: .wp-track-pin, .wp-stack, .wp-section > .wp-wrap, .wp-hero__grid diberi position: relative; z-index: 1. Gejala kalau salah: section tampak kosong/gelap total walau DOM berisi (diverifikasi via analisis piksel: sebelum fix 0% piksel terang, sesudah fix muncul teks).
