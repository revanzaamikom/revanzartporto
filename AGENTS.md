# AGENTS.md — REVANZART Portfolio

Instruksi permanen untuk semua agent (opencode, Copilot, Cursor, Claude Code) yang bekerja di project ini.

---

## 1. Tentang Pemilik (Owner)

**Muhamad Revanza Rafif Hamdani** — Video Editor & Motion Designer.

- Mahasiswa **Teknologi Informasi** di **Universitas Amikom Yogyakarta** (jangan pernah pakai kata "IT" untuk program studi ini).
- Portfolio live: `https://revanzart.vercel.app`
- Kontak & socials:
  - Email: `importantrevanza@gmail.com`
  - Instagram: `https://instagram.com/revanzarh`
  - YouTube: `https://www.youtube.com/@Revanzarh/videos`
  - LinkedIn: `https://www.linkedin.com/in/muhamad-revanza-rafif-hamdani-650962401/`
  - WhatsApp: `https://wa.me/6281229834548`

## 2. Hak Desain & Keputusan (WAJIB)

> **SEMUA fitur, desain, layout, animasi, konten, dan pengaturan di website ini adalah hasil desain & keputusan Muhamad Revanza (owner).**
>
> Jangan merombak, mengubah, atau "memperbaiki" desain yang sudah ada tanpa konfirmasi eksplisit dari owner. Selalu preserve keputusan desain yang sudah dibuat. Tugas agent = membantu mewujudkan, bukan mengganti selera owner.

Arah desain: **dark mode, cinematic, gaya motion designer profesional** (referensi: davianmotion.com). Warna dasar `#050505` (background), `#111111` (surface), aksen cyan (`#00ffff` / `#22D3EE`).

## 3. Identitas Profesional

Roles yang ditampilkan (typewriter di Hero):
`Video Editor`, `Motion Designer`, `Graphics Designer`, `Scriptwriter`, `Videographer`

Skill wheel (WhatIDo):
`VFX`, `Video Editing`, `UI/UX Design`, `Creative Direction`, `Motion Graphics`, `Scriptwriting`, `Design Graphics`, `Videography`, `Animation`

Deskripsi WhatIDo (bilingual EN/ID):
- Merancang storytelling & mengolah brief menjadi visual yang memikat, melihat dari sudut pandang audiens awam.
- Berperan sebagai **team lead**: merencanakan proyek dari persiapan hingga eksekusi, brainstorming bareng tim, menjaga ide tetap terarah.

Software & Tools (marquee):
After Effects, Premiere Pro, Illustrator, Photoshop, CorelDraw, Figma, XAMPP, Celtx, Blender, OBS Studio, vMix, Canva

## 4. Karya & Pencapaian

### Recent Work (5 projek)
1. **Nutriverse Motion** — youtubeId `l5vtRq2WJJw`, video `/video/nutriverse.mp4`
2. **Nutriverse - UX GEMASTIK 2026** — youtubeId `2IsCiFwq0dg`, video `/video/nutriverse2.mp4`
3. **Company Profile Andi Media Digital** — youtubeId `R6RIeHzSA1E`, video `/video/andimedia.mp4`
4. **"Nexum" VFX Short Movie** — youtubeId `3EPe6pvqqCM`, video `/video/nexum.mp4`
5. **Indie Short Movie - pelunasan sunyi** — youtubeId `lsFE3Kv7wmw`, video `/video/pelunasansunyi.mp4`

### Gallery
- **Video Editing** (accordion kategori):
  - General Editing: `lsFE3Kv7wmw` (Pelunasan Sunyi), `KgNorqWh2IM` (Untitled), `Te9HuqgyGec` (Nelangsa Erupsi - Mitigasi Bencana)
  - VFX Editing: `3EPe6pvqqCM` (Nexum)
  - Talking Head / Property / Advertising: placeholder "Coming Soon" (belum ada link, jangan diisi tanpa data)
  - Music Video: `QP4s66QP4qs` (The Panturas - Sunshine)
- **Design Graphics** (sidebar):
  - Motion Design: `CPL9pZUawdA` (camp-plan), `Sz6F-q_fq9I` (intro infogeh), `diFIM1j26GA` (amikom one apps), `xpx3JPR0bgc` (langkah mandiri ads)
  - Marketing Design: tab Social Media Feeds / Poster / Carousel (placeholder)
  - Publication Design: majalah **GTR EVOLUTION**

### Majalah "GTR EVOLUTION"
- Desain publikasi majalah otomotif **26 halaman** bertema legendaris **Nissan GT-R**.
- Dulu pakai Heyzine (ifame eksternal, lambat) → **sekarang flipbook self-hosted**.
- Aset: `public/images/magazine/a4/p01.webp` … `p26.webp` (894×1265, A4 portrait, ~1.85MB total) — hasil convert dari PDF 31MB.
- Komponen: `src/components/MagazineFlipbook.astro` pakai library `page-flip` (StPageFlip). Cover depan/belakang otomatis di-tengah + pergeseran smooth.

### Sertifikat (Vault)
1. Asisten Praktikum Screenwriting 2026
2. Juara Kategori Best Editing Company Profile BOIM 2026
3. Peserta Lomba Concept Art and Digital Painting BOIM 2026
4. Course Digital Marketing
5. Introduction To Computer - Graphic Design
6. Peserta Lomba Music Video BOIM 2026
7. Workshop Film Bolong 2026

## 5. Teknis & Struktur Project

**Stack:**
- Astro **7** (`astro` ^7.2.7) + React 18 (`@astrojs/react` 6)
- Tailwind CSS **4** via `@tailwindcss/vite` (config warna di `src/styles/global.css` `@theme`, bukan tailwind.config)
- WebGL: `ogl` (LightRays, GradientWaves, SpecularButton)
- 3D: `three` + `@react-three/fiber` + `drei` + `rapier` + `meshline` (Lanyard3D)
- Flipbook: `page-flip` (StPageFlip)

**Struktur single-page** (`src/pages/index.astro`):
1. `SplashScreen.jsx` (overlay 2.6s, event `splash-complete`)
2. `Hero.astro` — lanyard 3D, LightRays, SpecularButton, typewriter, floating contact
3. `ProjectGrid.astro` (Recent Work) — GradientWaves + video cards + lightbox
4. `WhatIDo.astro` → `WhatIDo.jsx` → `ui/OptionWheel.jsx` (EN/ID + wheel)
5. Software marquee
6. Gallery (kategori video + Design Studio + modal)
7. Certificates vault (zoom/pan/pinch)
8. `Footer.astro`
- `MagazineFlipbook.astro` dipasang di luar `<main>` (modal flipbook)

**Komponen lain:** `Navbar.astro`, `ScrollReveal.astro`, `GradientWaves.jsx`, `LightRays.jsx`, `Lanyard3D.jsx`, `SpecularButton.jsx`.

**Media helpers:** `window.mediaHelpers` (play/pause media, YouTube postMessage) + `window.refreshScrollReveal` dipakai lintas script. **Jangan duplikasi** logika media — pakai yang sudah ada.

**Env:** `.env` → `PUBLIC_SITE_URL=https://revanzart.vercel.app` (untuk sitemap, canonical, OG image).

**Commands:**
```bash
npm run dev      # dev server (localhost:4321)
npm run build    # build production → dist/
npm run preview  # preview build
npm audit        # cek security
```

## 6. Komunikasi (dari Copilot Instructions — wajib)

1. Bahasa Indonesia santai, kasual, direct, to-the-point.
2. **DILARANG** penjelasan teori panjang, bertele-tele, atau wall of text.
3. **SELALU mulai dengan rencana singkat** sebelum menulis/mengubah kode.
4. Format ringkas:
   - 🎯 **Goal:** (yang mau diselesaikan)
   - 📁 **Files:** (file yang bakal diubah)
   - 🛠️ **Steps:** (3-5 langkah eksekusi)
5. Minta konfirmasi/approval sebelum mengubah banyak file sekaligus.

## 7. Aturan Kode (dari .cursorrules)

1. Utamakan komponen bawaan **Astro (.astro)** daripada React (.jsx/.tsx) untuk halaman statis. React hanya untuk yang butuh interaktivitas berat (WebGL, 3D, animasi).
2. Gunakan **Tailwind CSS** utility-first. Warna `background: #050505`, `surface: #111111`.
3. Desain harus menonjolkan visual/video/gambar karya dengan typography besar dan bold.
4. **Jangan gunakan kata "IT"** — selalu "Teknologi Informasi" jika merujuk program studi.
5. Kode rapi, performan, mengikuti standar Astro terkini.
6. Jangan tambahkan dependency baru kalau bisa diselesaikan dengan yang sudah ada (atau beberapa baris vanilla JS/CSS).

## 8. Anti UI Slop

- Inspect produk dulu sebelum mendesain ulang: pahami user, komponen, design token, dan semua state yang dibutuhkan.
- Bangun dengan bahasa produk: reuse token & komponen, keputusan konkret, implementasikan state & behavior aksesibel.
- Finish gate: verifikasi specificity produk, kelengkapan interaksi, responsive & accessible, integritas design system.
- Referensi lengkap: https://github.com/github/awesome-copilot/tree/main/skills/anti-ui-slop

## 9. Konteks Penting untuk Session Berikutnya

- **Deploy**: GitHub `revanzaamikom/revanzartporto.git`, default branch `main`. Vercel = `revanzart.vercel.app`, Production Branch harus `main` (sudah diubah dari `master`). Branch `master` lama masih ada & stale — boleh dihapus.
- **Astro sudah di-upgrade** 4 → 7, Tailwind 3 → 4. Jangan downgrade.
- **Console noise yang diketahui** (third-party, bukan bug kode kita):
  - YouTube embed CORS (`static.doubleclick.net/instream/ad_status.js`, `fonts.gstatic.com`) — dari dalam player YouTube (script tracking iklan + font), muncul di Chrome DevTools **baik localhost maupun production** untuk SEMUA website yang embed YouTube. Harmless, tidak pengaruhi playback/visitor, tidak bisa dihilangkan selama pakai iframe YouTube embed (opsi hilangkan = preview mp4 lokal, tapi autoplay preview YouTube itu keputusan owner).
  - `THREE.Clock` deprecated — dari Three.js internal via `@react-three/fiber` v8; fix butuh upgrade React 19 + fiber 9 (belum dilakukan).
- **Autoplay preview video** itu keputusan desain owner (portfolio) — jangan diubah ke thumbnail statis tanpa konfirmasi.
- **Agent bantu**: subagent global `image-reader` (gemini flash-lite) tersedia untuk analisis gambar — panggil via `@image-reader` saat butuh cek visual.
