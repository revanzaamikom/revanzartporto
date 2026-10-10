# Motion Reference  -  rafaelkurosawa.com (analisis runtime)

> Analisis interaksi scroll/parallax/animation, diukur langsung dari runtime
> (Chromium/Playwright, 1440×900)  -  bukan tafsir dari CSS statis.
> Dipakai sebagai **referensi mekanik** untuk `/webportofolio`. Kita pelajari
> tekniknya, bukan meniru tampilan/warna (anti-slop R-30).
>
> Sumber: `https://www.rafaelkurosawa.com/` · `js/main.js` (22.9 KB) ·
> GSAP 3.15 + ScrollTrigger. Dianalisis: 2026-10-10.

---

## Stack

- **GSAP 3.15 + ScrollTrigger** untuk reveal/counter/parallax/magnetic.
- **~80% mekanik scroll ditulis vanilla JS** (requestAnimationFrame + matematika), bukan GSAP.
- Easing yang dipakai: `power4.out`, `power3.out`, `power2.out`, `back.out(2.4)`, `cubic-bezier(.16,1,.3,1)`.
- `gsap.defaults = { duration: 0.5, overwrite: false, delay: 0 }`.
- Tidak ada smooth-scroll library (Lenis/Locomotive). Tidak ada keyframes marquee dari JS  -  marquee murni CSS.

## 1. Custom cursor (desktop, `hover:hover && pointer:fine`)

- Dua elemen: `#cursor` (dot 9px, `mix-blend-mode: difference`, warna aksen) + `#cursor-ring` (36px, border).
- Dot mengikuti pointer instan; ring **lerp 0.12** per frame (ekor halus).
- `body.cursor-hot` saat hover `a / button / .case-gallery` (ring membesar).
- `body { cursor: none }` menyembunyikan kursor asli.
- Dimatikan bila `prefers-reduced-motion`.

## 2. Hero load-in (GSAP timeline)

- Kicker & name: `yPercent 110→0` + fade, durasi 0.8 / 1.0, `power4.out`, tunda 0.15 / 0.3.
- Tag / blurb / actions: `y 22→0` + fade, **stagger 0.08**, mulai 0.7.
- Meta (status / place / scroll): fade, stagger 0.08, mulai 1.1.
- Body fade-in 0.45 s saat load.

## 3. Hero parallax (vanilla, rAF)

- `.hero-bg`: `translateY(+0.18 × scroll)` → lebih lambat (kedalaman).
- `.hero-inner`: `translateY(-0.09 × scroll)` → arah berlawanan.
- `[data-hero-fade]`: `opacity = 1 - progress × 3.2` (habis di ~1/3 viewport).

## 4. ⭐ Horizontal case track  -  "Selected cases" (vanilla)

- Wrapper `.pin-wrap` di-set tinggi = `vh × (n × 1) + vh + vh × 0.35` (runway + stage + hold).
- Stage **sticky** di dalamnya; scroll vertikal → track bergeser horizontal `translateX(-p × travel)`.
- Kartu aktif = `round(p × (n-1))`; dot indikator + counter `"01 / 03"` sinkron.
- Hint "scroll" memudar saat `p > 0.04`.
- **≤900px**: semua kartu langsung tampil, pin dimatikan.

## 5. ⭐ Sticky stacking cards  -  "Work history" (vanilla)

- Tinggi wrapper = `vh × ((n-1) × 1 + 0.35) + vh + vh × 0.55`.
- Tiap kartu masuk `translateY 105%→0` dengan `outExpo` di 35% pertama progress.
- Kartu yang sudah terlewati: mengecil `scale (max 0.86, 1 - behind × 0.05)` + naik `-behind × 30px` → efek deck menumpuk.
- Kartu aktif = `floor(scrollIntoViewport / vh)`.

## 6. Reveal teks (split-word mask)

- Heading `[data-split]`: setiap kata dibungkus `.reveal-line`, `yPercent 120→0`, **stagger 0.03**, 0.9 s, `power4.out`, trigger `top 88%`.
- Generic `.fade-up`: `opacity + y`, 0.85 s, `power3.out`, delay `(i%3) × 0.06`, trigger `top 90%`.
- Helper `splitWords` berjalan menelusuri DOM (bukan `innerHTML.split`) agar `<span>/<em>` di dalamnya tidak rusak.

## 7. Counter angka (`[data-value]`)

- Hitung 0→target, **1 s, `power2.out`**, `once: true`, trigger `top 92%`.

## 8. Parallax generik (`[data-parallax]`)

- `yPercent -amount/2 → +amount/2`, `scrub 0.45`, span `top bottom → bottom top`.

## 9. Timeline vertikal

- Garis progress mengisi mengikuti scroll (`scrub 0.5`).
- Titik `timeline-dot`: `scale 1` dengan **`back.out(2.4)`**  -  efek "pop" membal.

## 10. Marquee & pulse

- `@keyframes marquee: translateX(0→-50%)`; isi diduplikasi 2× untuk loop mulus. Dipakai di 2 tempat.
- `@keyframes pulse: opacity 1→0.35` untuk dot status.

## 11. Lain-lain

- **Scroll progress bar**: `scaleX(scrollY / max)`, 2px, fixed.
- **Nav**: `is-scrolled` saat `y > 50` (background + backdrop blur berubah).
- **Magnetic button**: `.btn / .arrow-circle`  -  konten bergerak `(mouse - center) × 0.28`, `quickTo` 0.4 s `power3.out`.
- **Grain overlay**: `fixed`, `opacity 0.045`, `z 9000`  -  tekstur film.
- **Anchor smooth scroll** dengan offset nav 10px.
- **Page transition**: klik link → body fade out 0.35 s lalu navigasi.
- **Gallery autoplay**: ganti slide tiap 5 s, pause saat hover, aktif hanya saat in-view.
- **Reduced-motion**: seluruh reveal langsung tampil (tanpa animasi).
- **Fallback tanpa GSAP**: `revealEverything()` memaksa semua konten tampil → progressive enhancement.
- **Refresh**: setelah font & gambar besar selesai load → `ScrollTrigger.refresh()`.

---

## Mapping ke `/webportofolio` (variasi kita)

Kita pakai **vanilla JS murni** (tanpa dependency baru, `AGENTS.md` §7), world sendiri
(warm-black + amber, Archivo + IBM Plex Mono), bukan meniru warna/kelas referensi.

| Asal | Variasi kita |
|---|---|
| 1 Custom cursor | Dot amber + ring lerp  -  desktop only, reduce-motion off |
| 2 Hero load-in | Timeline reveal hero (mask kata + fade stagger) |
| 3 Hero parallax | Hero bg `+0.18×scroll`, konten `-0.09×scroll` (2 lapis, berlawanan) |
| 4 Horizontal pin track | **Deck proyek jadi horizontal scrub** (geser X 0→-2×lebar viewport) |
| 5 Sticky stack | **Kartu Layanan & Proses Kerja menumpuk + mengecil** (scale 1→0.86) |
| 6 Split-word reveal | Heading dipecah kata, `yPercent 120→0`, stagger 0.03 |
| 7 Counter | Angka hero dianimasikan hitung dari 0 |
| 10 Marquee | Di section teknologi (sudah ada pola) |
| 11 Progress / magnetic / grain | Progress bar amber; tombol magnetik; grain halus |
| Fallback | `revealEverything()` + `prefers-reduced-motion` wajib |

---

## Angka empiris (trace 1440×900, scroll tiap 450px)

Layout runtun + bobot scroll:

| Section | top | tinggi |
|---|---|---|
| Hero | 0 | 1620 (1.8 × vh) |
| Marquee | 1620 | 50 |
| Stats | 1670 | 702 |
| **Work (pin)** | **2372** | **3915** |
| **Stack** | **6337** | **3510** |
| CTA | 9847 | 770 |
| Footer | 10617 | 61 |

Total scroll ≈ 10678.

### Window scroll per animasi (dari ScrollTrigger.getAll())

| Elemen | start | end | dur | ease | props |
|---|---|---|---|---|---|
| Heading `[data-split]` | 1047 | 1889 | 0.9 | power4.out | yPercent (stagger 0.03) |
| `.stat.fade-up` ×3 | 1176 | 2255 | 0.85 | power3.out | opacity, y (delay 0/0.06/0.12) |
| `.stat-number` ×3 | 1202 | 2106 |  -  |  -  | counter (once) |
| `.fade-up` ×3 | 9269-9468 | 10179-10378 | 0.85 | power3.out | opacity, y |

### Parallax hero (terukur)

| scrollY | hero-bg ty | hero-inner ty |
|---|---|---|
| 0 | 0 | 0 |
| 900 | +162 | −81 |
| 1800 | +324 | −162 |
| 4500 | +810 | −405 |
| 9450 | +1701 | −850.5 |

→ **bg = +0.18 × scroll**, **inner = −0.09 × scroll**. Rasio 2:1, arah berlawanan.

### Horizontal pin track (terukur)

| scrollY | htrack tx |
|---|---|
| 2700 | −349.9 |
| 3600 | −1309.9 |
| 4500 | −2269.9 |
| 5400 | −2880 (mentok) |

→ travel = **2880px** = 2 × 1440 (lebar viewport × jumlah kartu−1). Pin aktif 2372-6287.

### Sticky stack (terukur)

| scrollY | stack-item scale | ty |
|---|---|---|
| 6750 | 0.9945 | −3.27 |
| 7200 | 0.9696 | −18.27 |
| 8100 | 0.9196 | −48.27 |
| 9450 | 0.86 | −93.27 (mentok 0.86) |

→ masuk `translateY 105%→0`, lalu per kartu yang lewat: **−0.05 scale / vh**, **−30px lift / vh**, floor scale **0.86**.

### Rumus tinggi wrapper (dari sumber)

- Pin: `vh × n × 1 + vh + vh × 0.35` (runway×n + stage + hold)
- Stack: `vh × ((n−1) × 1 + 0.35) + vh + vh × 0.55`
