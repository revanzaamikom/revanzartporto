# TODO / Catatan Sesi (Webportofolio)

> Terakhir update: 2026-10-11 (2). File: `src/pages/webportofolio.astro`.
> Status: 2 masalah utama sesi sebelumnya **SUDAH SELESAI & terverifikasi**, +
> 3 permintaan owner (urutan proyek, harga paket, hapus asset yatim), +
> **penyesuaian ke brief** (metadata, contact form, about).

---

## ✅ SELESAI SESI INI — TATA LETAK & NAVBAR (2026-10-11, putaran 3)

### 9. Tukar section Paket ↔ Tentang
Urutan jadi: Hero → Proyek → Layanan → Teknologi → Proses → **Tentang → Paket** → Kontak.
CSS `#paket`/`#tentang` per-ID + tak ada anchor internal → aman.

### 10. Top padding section (biar tidak mepet)
`.wp-section` padding `clamp(56,6vw,80) 0` → `padding-top: clamp(104px,12vh,160px)`,
`padding-bottom: clamp(56px,6vw,80px)`. Terukur: judul ~104-108px dari atas section.
Hero tidak diubah.

### 11. Navbar `/webportofolio` (3 - 1 - 3, aksen amber)
- Navbar home tidak relevan (link ke `/#work` dll + warna cyan). Diganti versi lokal.
- **Prop opsional `navVariant="web"`** di `Layout.astro` → diteruskan ke `Navbar.astro`.
  Default (tanpa prop) = navbar home **100% tidak berubah** (verified: home tetap
  About/Work/REVANZART/Gallery/Certificate, tanpa bocor ke web).
- Layout navbar web: **Kiri** Proyek · Layanan · Teknologi | **Tengah** REVANZART (→ `/`) |
  **Kanan** Proses · Paket · Kontak. Semua link anchor lokal (`data-web-scroll`, offset 118px).
- Gaya: pill near-black, aksen amber `#e4a339` (hover), font IBM Plex Mono + Archivo.
- **Mobile:** dipadatkan bertahap (breakpoint 720/480/380/340) agar 7 item muat dalam
  390/360/320px **tanpa terpotong** (terukur pillW 385/350/307 — semuanya fit).
- `Tentang` TIDAK masuk navbar (demi 3-1-3); section tetap ada.

---

## ✅ SELESAI SESI INI — PENYESUAIAN KE BRIEF (2026-10-11, putaran 2)

Owner: **"ikut ke brief, tapi tetap route `/webportofolio`, jangan sentuh landing page utama."**

### 6. Metadata `/webportofolio` (brief §14) — DIISI
Sebelumnya pakai data home (description generic, canonical = root, OG = lanyard.jpg).
- `Layout.astro` diperluas dengan prop **OPSIONAL**: `description`, `canonicalPath`,
  `ogImage`, `ogImageAlt`. **Default = perilaku home TIDAK berubah** (diverifikasi:
  home canonical tetap `https://revanzart.vercel.app`, og:image tetap `/lanyard.jpg`).
- `/webportofolio` kirim nilai sendiri: description spesifik, canonical
  `.../webportofolio`, OG `campplan.png`. Diverifikasi di `dist/`.

### 7. Contact / inquiry form (brief §11) — DIBUAT
Form inquiry di section Kontak: **Nama***, Email/kontak, Jenis website (select),
Fitur, Budget (opsional), Catatan.
- **Static, tanpa backend:** JS susun pesan → `window.open('https://wa.me/628559992302?text=...')`.
  Output tetap `static`, tanpa pihak ketiga.
- Validasi nama wajib (`aria-live` hint). Terverifikasi: submit kosong → "Nama wajib diisi.";
  submit lengkap → URL wa.me dengan pesan terisi (nama/kontak/jenis/fitur/budget/catatan).
- Fallback `mailto:` tetap ada.

### 8. Tentang — pendidikan ditambah (brief §8)
Facts jadi 4: **Pendidikan (Teknologi Informasi, Universitas Amikom Yogyakarta)**,
Fokus, Pendekatan, Lokasi. Grid 4 kolom (desktop) / 2 (tablet) / 1 (mobile).

### Case study (brief §3)
Keputusan owner: **cukup kartu proyek** (konten sudah lengkap per kartu) — tidak ada
halaman detail. Tidak ada perubahan struktur.

### Route
Tetap **`/webportofolio`** (1 halaman), bukan `/web/*` seperti contoh brief. Sesuai
instruksi owner. Landing page `index.astro` **tidak disentuh**.


## ✅ SELESAI SESI INI (2026-10-11)

### 1. Background amber samar / melar — FIXED
**Akar (terukur Chromium):** `.wp-bg img` pakai `height:124%` → di section tinggi
(Layanan 3887px, Proses 4539px) gambar melar jadi **5300-7596px** → amber di sudut
kabur/gebal. Ditambah band `inset:0` mengikuti tinggi section.

**Perbaikan:**
- `.wp-bg` diubah jadi **band `position: sticky; top:0; height:100vh; margin-bottom:-100vh`**
  → gambar selalu menempel viewport selama section di-scroll (glow tak keluar frame).
  Terukur: `imgH` sekarang **tepat 900px (100vh)** di semua section (dulu 5300-7596).
- Analisis piksel asset `hero-amber-glow.png` → glow ada di **KIRI-BAWAH**
  (sel lum 112, warm 133). Semua section diarahkan `object-position: 0% 100%`.
- Overlay per-section diturunkan (0.4-0.72) supaya amber lebih jelas.
- **JANGAN** pakai `transform`/`rotate` pada `.wp-bg img` (band keluar bounds sticky).
- Hero tidak pakai `.wp-bg`; ia punya `.wp-hero__bg` sendiri (radial + img, `object-position: center 30%`).

**Verifikasi:** grid warmth per viewport (R-B) — tiap section punya klaster hangat
(20-35) di viewport. Terverifikasi vision (model `cbai/deepseek-v4.1-flash`): glow amber
terlihat kiri-bawah + kanan-bawah, teks tetap terbaca (WCAG AA).

### 2. Gambar proyek terpotong parah — FIXED
**Akar:** frame `.wp-slide__shot` ikut tinggi kolom teks → portrait **476x611 (0.78)**,
sedangkan gambar asli **1440x900 (1.60)** → `object-fit:cover` potong kiri-kanan.

**Perbaikan (arah "a"):** di `@media (min-width:860px)`:
- `.wp-slide { align-items: center; }` (dari `stretch`)
- `.wp-slide__shot { aspect-ratio:16/10; align-self:center; margin:0; border:1px solid line; border-radius:8px; }`
- Sisa ruang vertikal kolom kiri = background surface gelap (bukan gambar melar).

**Verifikasi (terukur + vision):** frame **450x281, ratio 1.60** = persis ratio gambar.
Vision: screenshot Camp Plan tampil UTUH (navbar, heading, CTA) → bukan fragmen.

### 3. Urutan proyek — DIUBAH
Urutan `projects[]`: **Camp Plan (#1) → KonveksiKampus (#2) → PAKTJIP (#3, terakhir)**.
Terverifikasi: `.wp-slide__name` = [Camp Plan, KonveksiKampus, PAKTJIP].

### 4. Harga paket — DIUBAH
- Hapus `price`/`unit` dari `packages[]` + hapus markup `.wp-pack__price` di tiap kartu.
- Tambah badge `.wp-price-badge` di header Paket: **"MULAI DARI Rp500rb"** (1 patokan,
  bukan harga per tipe — scope final beda-beda). Layout `.wp-head--paket` (grid).
- Terverifikasi (desktop + mobile vision): badge tampil di samping/bawah judul Paket,
  **tidak ada harga di dalam kartu**.

### 5. Asset yatim dihapus
`bg/placeholder-contour.svg`, `bg/placeholder-blueprint.svg`, `portofolio-home.png`,
`portofolio-web.png` — tak dirujuk kode mana pun. Terhapus.

---

## ✅ SUDAH SELESAI (sesi sebelumnya — jangan diubah lagi)

- **Scroll engine**: linear instan mengikuti `scrollY` (bukan lerp). Track `sticky`, stack `sticky`, counter 01→02→03 sinkron. **JANGAN set `position` pada `.wp-track-stage` / `.wp-stack-stage` dari luar** — itu mematikan sticky & seluruh animasi scroll.
- **Background system**: 1 gambar (`bg/hero-amber-glow.png`) di 8 section. Konten di atas via `.wp-track-pin`, `.wp-stack`, `.wp-section > .wp-wrap`, `.wp-hero__grid` = `z-index: 1`.
- **Detail proyek**: layout 2 kolom (gambar kiri, teks kanan).
- **Section lengkap**: Hero, Proyek, Layanan, Marquee, Teknologi, Proses, Paket, Tentang, Kontak (+ Footer).
- **Navbar mobile**: tap target ≥44px (`Navbar.astro`, berlaku juga home).
- **Em-dash**: 0 (bersih) di seluruh project.
- **`body:has(.wp-page) { overflow-x: clip }`** wajib ada (biar sticky hidup; `Layout.astro` pakai `overflow-x-hidden` yang mematikan sticky).

---

## ⚠️ ATURAN PENTING
1. Perubahan **hanya di `/webportofolio`** (file `src/pages/webportofolio.astro`), **home tidak disentuh**. Kecuali `Navbar.astro` (tap target).
2. **Selalu verifikasi dengan Chromium + screenshot + vision** sebelum klaim "beres". Jangan asumsi.
3. **Vision (image-reader):** model `9router/cbai/deepseek-v4.1-flash` (terverifikasi aktif). Banyak model `cl/*`/`gemini/*`/`nvidia/minimax*` balas 503/410. Detail di `~/.config/opencode/agent/image-reader.md`.
4. Screenshot element (`el.screenshot()`) **tidak trigger** IntersectionObserver reveal → `[data-fade]` tetap opacity:0. Ambil screenshot **viewport** setelah scroll bertahap.
5. Audit mobile pakai viewport 390px (`isMobile: true, hasTouch: true`).
6. Gambar background & screenshot proyek ada di `public/images/webportofolio/`.
7. Dev server: `http://localhost:4321` (`npm run dev`). Build: `npm run build` → harus `Complete!`.

---

## Aset terkait
- BG: `public/images/webportofolio/bg/hero-amber-glow.png` (1916x821, glow di kiri-bawah)
- Screenshot: `campplan.png`, `konveksi.png`, `paktjip.png` (semua 1440x900)
