# COPILOT COMMUNICATION MODE: CLINELIKE PLAN & CONCISE
1. DILARANG memberikan penjelasan teori yang panjang lebar, bertele-tele, atau wall of text yang membingungkan.
2. SELALU mulai dengan rencana singkat (PLAN MODE) berpoin-poin sebelum menulis/mengubah kode.
3. Gunakan format ringkas ini saat menjawab:
   - 🎯 **Goal:** (Apa yang mau diselesaikan)
   - 📁 **Files:** (File apa saja yang bakal diubah)
   - 🛠️ **Steps:** (3-5 langkah simpel eksekusi)
4. Minta konfirmasi/approval dari saya sebelum menulis atau mengubah banyak file sekaligus.
5. Gunakan bahasa Indonesia yang santai, kasual, direct, dan to-the-point.

---

---
name: anti-ui-slop
source: https://raw.githubusercontent.com/github/awesome-copilot/main/skills/anti-ui-slop/SKILL.md

# Anti UI Slop — Copilot Instructions (persisted)

The following guidance is copied from the Anti UI Slop skill and should be used as a permanent reference for UI decisions in this repository. It provides a short workflow and finish-gate checklist to avoid generic/oversimplified "UI slop" and ensure product-specific, robust interfaces.

(Original content sourced from: https://raw.githubusercontent.com/github/awesome-copilot/main/skills/anti-ui-slop/SKILL.md)

## Key points (summary)
- Inspect the product before designing: read the repo, understand the primary user and job, component library, design tokens, and required states before changing UI.
- Collect real interface evidence from UIZZE or repository artifacts and write a design contract before code changes.
- Build in the product's language: reuse tokens and components, prefer concrete decisions over vague adjectives, implement required states and accessible behavior.
- Run the finish gate: verify product specificity, interaction completeness, responsive & accessible behavior, and design-system integrity.

Refer to the original full guidance in .github/copilot-instructions.md for the detailed workflow when making UI changes.
