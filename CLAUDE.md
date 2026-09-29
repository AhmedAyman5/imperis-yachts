# CLAUDE.md — IMPERIS YACHTS Website

> ⚠️ **READ THIS ENTIRE FILE BEFORE WRITING OR CREATING ANY FILE.**
> This document is the single source of truth for structure, styling, naming, and conventions on this project. If you have not read every section below, stop now and read it first. Do not deviate from anything here without asking the human first.

---

## 1. Project Overview

- **Client:** IMPERIS YACHTS — an Egyptian yacht/shipbuilding company (est. 2000). They design and build yachts and marine vessels, offer refit/maintenance/after-sales services, and run **IMPERIS Academy** (technical training for engineering students and professionals).
- This is a **corporate marketing / informational website only**. No e-commerce, no login, no database, no server-side logic.
- Two developers (Ahmed & Mazen) are building this together, "vibe coding" with Claude Code. Each person typically owns and edits **one page folder** at a time.
- The site is **bilingual**: English and Arabic. Every page exists as two separate, fully independent HTML files (no i18n framework, no runtime translation).
- Final host: Hostinger (static file upload). Everything must run as plain static files — no build step, ever.

---

## 2. Tech Stack & Hard Constraints

- **Plain HTML5, CSS3, vanilla JavaScript only.** No React, Vue, Astro, Next.js, Tailwind, Sass/LESS, TypeScript, npm, Webpack, Vite, or any bundler/build step.
- **No backend, no database, no API calls.** Any form on the site is static markup only for now (see §15).
- **Icons:** [Lucide Icons](https://lucide.dev), loaded from CDN only — never installed via npm.
- **Animation:** [AOS – Animate On Scroll](https://michalsnik.github.io/aos/), loaded from CDN only. This is the only animation library allowed.
- Do not add any tool, library, dependency, or architectural pattern that isn't explicitly listed in this file without asking first. **Boring and consistent beats clever** — this project is split across ~24 page files made by two different people, so predictability matters more than anything else.

---

## 3. Folder Structure (page-based)

Every content page is a **self-contained folder**: one `.html`, one `.css`, one `.js`, one `images/` folder, one `videos/` folder — always named after the page itself. The Home page is the one exception: it lives at the project root (and at `/ar/`) instead of under `pages/`, because it must be `index.html` to work as the site's entry point — but it still follows the exact same "html + css + js + images + videos" pattern.

```text
imperis-yachts/
├── CLAUDE.md
├── style.css                     ← GLOBAL stylesheet only (reset, colors, fonts, shared components)
├── index.html                    ← Home page — English — SITE ENTRY POINT
├── index.css                     ← Home page's OWN styles (not global — see note below)
├── index.js                      ← Home page's OWN script
├── index-images/
├── index-videos/
├── favicon.ico
│
├── ar/
│   ├── index.html                ← Home page — Arabic
│   ├── index.css
│   ├── index.js
│   ├── index-images/
│   └── index-videos/
│
├── images/                       ← SHARED/global assets only: logo, favicon source, social-share image
│
├── js/
│   ├── navbar.js                 ← Builds + injects the navbar on EVERY page (both languages)
│   └── footer.js                 ← Builds + injects the footer on EVERY page (both languages)
│
└── pages/
    ├── en/
    │   ├── about/
    │   │   ├── about.html
    │   │   ├── about.css
    │   │   ├── about.js
    │   │   ├── images/
    │   │   └── videos/
    │   ├── shipyard/              (same 5-item pattern: shipyard.html/.css/.js, images/, videos/)
    │   ├── yacht-building/
    │   ├── shipbuilding/
    │   ├── design-engineering/
    │   ├── capabilities/
    │   ├── interiors/
    │   ├── refit-maintenance/
    │   ├── projects/
    │   ├── academy/
    │   ├── exhibitions/
    │   └── contact/
    └── ar/
        ├── about/                 (same pattern, Arabic content, identical file names)
        ├── shipyard/
        ├── yacht-building/
        ├── shipbuilding/
        ├── design-engineering/
        ├── capabilities/
        ├── interiors/
        ├── refit-maintenance/
        ├── projects/
        ├── academy/
        ├── exhibitions/
        └── contact/
```

**Important naming rule:** a page folder's `.html`/`.css`/`.js` files are always named exactly like the folder (e.g. `pages/en/shipyard/shipyard.html`, never `index.html`, never `main.js`). This makes every page 100% predictable to find and edit.

**`style.css` vs `index.css` — do not confuse these:**

- `style.css` = shared rules used by **every** page (reset, color variables, font variables, base typography, shared components like `.container`, `.btn`).
- `index.css` = styles specific to the Home page's own unique layout only.
- Same relationship applies to every other page: `about.css` only holds About-page-specific rules, never global rules.

---

## 4. Path Rules

- Reference shared/global assets with **root-relative paths** (starting with `/`), from every page regardless of nesting depth:

```html
<link rel="stylesheet" href="/style.css" />
<script src="/js/navbar.js" defer></script>
<script src="/js/footer.js" defer></script>
<img src="/images/logo.svg" alt="IMPERIS YACHTS" />
```

- Reference a page's **own** assets with plain relative paths from inside that page's own folder:

```html
<link rel="stylesheet" href="about.css" />
<img src="images/hero.jpg" alt="..." />
```

- **Never use `../../../` relative climbing.** With pages nested 3 levels deep (`pages/en/about/`), counting `../` is error-prone and breaks the moment a folder moves. Root-relative `/` paths mean the same thing no matter which file you're in — this is exactly what avoids path mistakes when two people are each editing a different page.
- Because root-relative paths need a real web server (not `file://`), preview pages with a lightweight local server — e.g. the VS Code "Live Server" extension, or `npx serve`, or `python -m http.server`. Don't just double-click the HTML files.

---

## 5. Shared `<head>` Boilerplate (copy into every page)

Every page — English or Arabic, Home or otherwise — starts from this exact boilerplate, only changing `lang`, `dir`, `data-alt-lang-href`, `<title>`, and `<meta name="description">`:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr" data-alt-lang-href="/pages/ar/about/about.html">
  <head>
    <meta charset="UTF-8" />
    <!-- UTF-8 MUST be the first line inside <head> — without it, Arabic text
       will render as garbled characters (mojibake) in some browsers. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Us | IMPERIS YACHTS</title>
    <meta name="description" content="One-line page description here." />

    <link rel="icon" href="/favicon.ico" />

    <!-- Global styles (always first) -->
    <link rel="stylesheet" href="/style.css" />
    <!-- Page-specific styles (always second, so it can override) -->
    <link rel="stylesheet" href="about.css" />

    <!-- Fonts: same single import on every page (EN + AR families together) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@300;400;500;600&family=Markazi+Text:wght@500;600;700&family=Cairo:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <!-- Scroll animation library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
  </head>
  <body>
    <div id="navbar-root"></div>

    <main id="page-content">
      <!-- page content goes here -->
    </main>

    <div id="footer-root"></div>

    <script src="/js/navbar.js" defer></script>
    <script src="/js/footer.js" defer></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
      AOS.init({ duration: 700, once: true });
    </script>
    <script src="about.js" defer></script>
  </body>
</html>
```

The Arabic counterpart of this exact page only changes:

```html
<html
  lang="ar"
  dir="rtl"
  data-alt-lang-href="/pages/en/about/about.html"
></html>
```

...plus the `<title>`, description, and `<script src="about.js">` reference staying pointed at that page's own local Arabic `about.js`.

---

## 6. Colors

Defined once in `style.css`, used everywhere as CSS variables — never hardcode a hex value inside a page-specific `.css` file.

```css
:root {
  --midnight-blue: #243a5e;
  --powder-sky: #cfe3f1;
  --calm-ocean: #8fb6d8;
  --cloud-blue: #edf4fa;
  --dusty-denim: #5f86a6;

  /* Semantic aliases — use THESE names in components */
  --color-primary: var(--midnight-blue);
  --color-secondary: var(--dusty-denim);
  --color-accent: var(--calm-ocean);
  --color-surface: var(--cloud-blue);
  --color-surface-alt: var(--powder-sky);
  --color-text: var(--midnight-blue);
  --color-text-invert: #ffffff;
}
```

---

## 7. Typography

```css
:root {
  --font-heading-en: "Playfair Display", serif;
  --font-body-en: "Poppins", sans-serif;
  --font-heading-ar: "Markazi Text", serif;
  --font-body-ar: "Cairo", sans-serif;
}

html[lang="en"] body {
  font-family: var(--font-body-en);
}
html[lang="en"] h1,
html[lang="en"] h2,
html[lang="en"] h3,
html[lang="en"] h4 {
  font-family: var(--font-heading-en);
}

html[lang="ar"] body {
  font-family: var(--font-body-ar);
}
html[lang="ar"] h1,
html[lang="ar"] h2,
html[lang="ar"] h3,
html[lang="ar"] h4 {
  font-family: var(--font-heading-ar);
}
```

The font switch is driven entirely by the `lang` attribute on `<html>` — no JavaScript needed.

---

## 8. Global Reset & Shared Components (`style.css`)

```css
/* Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
}
img,
video {
  max-width: 100%;
  display: block;
}
a {
  text-decoration: none;
  color: inherit;
}
ul,
ol {
  list-style: none;
}
button {
  font: inherit;
  border: none;
  background: none;
  cursor: pointer;
}
body {
  color: var(--color-text);
  background: #fff;
  line-height: 1.6;
}

/* Shared layout utility — use on every section wrapper */
.container {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}

/* Shared button styles — used by nav CTA, footer, and page CTAs */
.btn {
  display: inline-block;
  padding: 0.75rem 1.75rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.25s ease;
}
.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-invert);
}
.btn-primary:hover {
  background: var(--color-secondary);
  transform: translateY(-2px);
}
.btn-outline {
  border: 1.5px solid var(--color-primary);
  color: var(--color-primary);
}
.btn-outline:hover {
  background: var(--color-primary);
  color: var(--color-text-invert);
}

/* Responsive breakpoints — use these exact values everywhere for consistency */
/* mobile: default (<768px) · tablet: 768px–1023px · desktop: ≥1024px */
```

---

## 9. Bilingual EN/AR Rules

- Every page's `<html>` tag declares `lang` + `dir` (`lang="en" dir="ltr"` or `lang="ar" dir="rtl"`).
- Every page also declares `data-alt-lang-href="..."` pointing to its exact sibling page in the other language (see §5). This is how the navbar's language switcher works — `navbar.js` reads `document.documentElement.dataset.altLangHref`, no hardcoded page-map to maintain.
- Arabic content must be real, natural, professional business Arabic (Egyptian-appropriate formal tone) — never machine-translated filler text.
- Keep layout adjustments for RTL simple: `dir="rtl"` + normal `text-align` + flexbox already handles most of it. Don't rewrite everything with CSS logical properties unless a specific spot visibly breaks in RTL — no overengineering here either.

---

## 10. Shared Navbar & Footer — Built Once, Injected Everywhere

**Hard rule: navbar and footer markup must NEVER be hand-written inside an individual page's `.html`/`.css`/`.js` files.** The only place that markup exists is inside `/js/navbar.js` and `/js/footer.js`. Every page just includes two empty placeholder divs and two script tags (see §5).

**Why JS-string injection instead of `fetch()`-ing an HTML partial:** `fetch()` of a local file fails with a CORS error when a page is opened directly via `file://` — which is exactly how two people will casually open pages while testing. Injecting a plain JS template string via `innerHTML` has zero dependencies and works identically whether the file is opened directly or served.

```js
// js/navbar.js — pattern to follow
document.addEventListener("DOMContentLoaded", () => {
  const lang = document.documentElement.lang; // "en" or "ar"
  document.getElementById("navbar-root").innerHTML =
    lang === "ar" ? NAVBAR_HTML_AR : NAVBAR_HTML_EN; // two full template strings defined above
  attachNavbarEvents(); // dropdown toggles + mobile hamburger toggle
  if (window.lucide) lucide.createIcons();
});
```

Same pattern in `js/footer.js`. Because both scripts load with `defer`, they run after the page's own static HTML (including any `data-lucide` icons already in the body) is fully parsed — so this one `lucide.createIcons()` call is enough to render every icon on the page. Only re-call `lucide.createIcons()` inside a page's own `.js` file if that page's script inserts brand-new icon elements dynamically after the fact (e.g. a lightbox opened on click).

**Navbar must include:**

- Logo (links to Home)
- Grouped links with dropdown menus (structure below)
- Language switcher (EN ⇄ AR) via `data-alt-lang-href`
- "Contact" link styled as a distinct CTA button (`.btn-primary`)
- Mobile hamburger menu (Lucide `menu`/`x` icons) toggling a full-width mobile panel below 768px

**Footer must include:**

- Company blurb + logo
- Link columns mirroring the nav groups
- Both office addresses & phone numbers (Cairo HQ + Suez shipyard)
- Department emails
- Social icons (Lucide `facebook`, `instagram`, `linkedin`, `youtube` — check exact names in the installed Lucide version and swap the closest match if one isn't available)
- Copyright bar

Write the footer's text content **once in English, once in Arabic**, both stored inside `footer.js`, and picked by checking `document.documentElement.lang` — same approach as the navbar.

**Final navigation structure (do not add, remove, or rename pages):**

| English label                                       | Links to                                               |
| --------------------------------------------------- | ------------------------------------------------------ |
| Home                                                | `/`                                                    |
| About ▾ → About Us                                  | `/pages/en/about/about.html`                           |
| About ▾ → The Shipyard                              | `/pages/en/shipyard/shipyard.html`                     |
| What We Build ▾ → Yacht Building                    | `/pages/en/yacht-building/yacht-building.html`         |
| What We Build ▾ → Shipbuilding & Commercial Vessels | `/pages/en/shipbuilding/shipbuilding.html`             |
| What We Build ▾ → Design & Naval Architecture       | `/pages/en/design-engineering/design-engineering.html` |
| Services ▾ → Capabilities                           | `/pages/en/capabilities/capabilities.html`             |
| Services ▾ → Interiors                              | `/pages/en/interiors/interiors.html`                   |
| Services ▾ → Refit, Maintenance & After-Sales       | `/pages/en/refit-maintenance/refit-maintenance.html`   |
| Projects & Fleet                                    | `/pages/en/projects/projects.html`                     |
| IMPERIS Academy                                     | `/pages/en/academy/academy.html`                       |
| Exhibitions                                         | `/pages/en/exhibitions/exhibitions.html`               |
| Contact (CTA button)                                | `/pages/en/contact/contact.html`                       |

| التسمية العربية                            | الرابط                                                 |
| ------------------------------------------ | ------------------------------------------------------ |
| الرئيسية                                   | `/ar/index.html`                                       |
| من نحن ▾ → نبذة عنا                        | `/pages/ar/about/about.html`                           |
| من نحن ▾ → الترسانة                        | `/pages/ar/shipyard/shipyard.html`                     |
| ماذا نبني ▾ → بناء اليخوت                  | `/pages/ar/yacht-building/yacht-building.html`         |
| ماذا نبني ▾ → بناء السفن والوحدات التجارية | `/pages/ar/shipbuilding/shipbuilding.html`             |
| ماذا نبني ▾ → التصميم والهندسة البحرية     | `/pages/ar/design-engineering/design-engineering.html` |
| خدماتنا ▾ → قدراتنا                        | `/pages/ar/capabilities/capabilities.html`             |
| خدماتنا ▾ → التشطيبات الداخلية             | `/pages/ar/interiors/interiors.html`                   |
| خدماتنا ▾ → التجديد والصيانة وما بعد البيع | `/pages/ar/refit-maintenance/refit-maintenance.html`   |
| مشروعاتنا وأسطولنا                         | `/pages/ar/projects/projects.html`                     |
| أكاديمية IMPERIS                           | `/pages/ar/academy/academy.html`                       |
| المعارض                                    | `/pages/ar/exhibitions/exhibitions.html`               |
| تواصل معنا (CTA)                           | `/pages/ar/contact/contact.html`                       |

---

## 11. Lucide Icons

- Load once per page via CDN: `<script src="https://unpkg.com/lucide@latest"></script>` (already in the §5 boilerplate).
- Usage: `<i data-lucide="anchor"></i>`, then `lucide.createIcons()` renders it as inline SVG.
- See §10 for exactly when/where `createIcons()` needs to be called.

---

## 12. Content & Media Guidelines

- Use the attached 12-page EN/AR content brief as the **source outline**, not final copy — expand every section into fuller, richer paragraphs. Every "(إضافة مقترحة)" note in the brief means: **write that section in full**, don't leave it as a bracketed note.
- Where the brief flags something needing real client confirmation (exact stats, founder names, exact department-email spellings), write a plausible placeholder but mark it clearly right above with an HTML comment: `<!-- CONFIRM WITH CLIENT: ... -->` — never present an invented number as settled fact.
- It's fine to be informed by how established luxury yacht builders (e.g. Sunseeker, Feadship, Riva, Azimut) generally talk about craftsmanship and engineering — but **never copy sentences from a real company's site**. Every line of copy must be original writing for IMPERIS YACHTS.
- Every page should feel genuinely rich: aim for **4–6 distinct sections** per page (hero, intro, feature grid, supporting narrative, gallery, closing CTA) — never ship a page as one paragraph and a photo.

### Images & video — the #1 rule: everything must actually load on screen

A broken image icon anywhere on the site is not acceptable. Follow this exactly:

1. **Ahmed/Mazen-supplied links come first.** Whenever a real image or video link is provided for a page/section, use it directly — don't replace it with a stock substitute.
2. **For everything else, only use a URL you have just retrieved by actually searching/browsing — never type one from memory or guess one by pattern.** A URL that merely _looks_ like a valid stock-photo link is not good enough; it must come from a real search result or a page you actually opened.
3. **Do not use `source.unsplash.com` in any form.** It was fully shut down by Unsplash in June 2024 — every link on that domain now 404s. This is a known trap: it still "looks" correct because it matches an old, once-common pattern, but it will render as a broken image every time.
4. Reliable current sources for real, hotlink-safe stock photography/video: **Pexels** (images.pexels.com / videos.pexels.com), **Pixabay** (pixabay.com), and **Wikimedia Commons** (upload.wikimedia.org) for photos; **Pexels Videos** or **Coverr** for clips. Copy the exact, full URL of a specific real photo/video you found — never shorten or reconstruct it by hand.
5. After placing any image or video, verify it actually renders before moving on. If it doesn't load, replace it immediately — don't leave a broken placeholder "to fix later."
6. Mark every stock/placeholder photo or video with a comment directly above it: `<!-- PLACEHOLDER MEDIA — replace with real IMPERIS photography/footage -->`, so it's easy to find and swap later.
7. Every image needs a meaningful `alt` attribute written in that page's own language (accessibility + SEO).

---

## 13. Animation & "Premium" Feel

- Scroll animations: use **AOS only** (`data-aos="fade-up"`, `data-aos="fade-in"`, `data-aos="zoom-in"`, etc. on section wrappers). Don't hand-roll a second animation system.
- Hover effects: pure CSS transitions only (`transform`, `box-shadow`, `color`/`opacity`) — no JS needed. Keep timing consistent: `transition: all 0.25s ease;` everywhere.
- Visual direction: generous whitespace, large hero images/video with a subtle dark overlay + centered serif headline, consistent card design (soft shadow, ~8–12px radius) reused across every page. Stick to the 5 given colors only — use `--dusty-denim` as the "accent" role rather than introducing a new tone (e.g. gold).

---

## 14. Git / Collaboration Workflow

- Each page folder is self-contained — the rule of thumb is **you should almost never need to touch a file inside your teammate's page folder.**
- The only files that can create real conflicts are the shared ones: `style.css`, `js/navbar.js`, `js/footer.js`, `CLAUDE.md`. Give your teammate a heads-up before editing any of these.
- Simple flow: pull latest → work inside your page's folder → commit with a message naming the page (e.g. `feat: build Capabilities page content`) → push.

---

## 15. Explicitly Out of Scope (for now)

- **CI/CD auto-deploy to Hostinger** (GitHub Actions + FTP/SFTP on every push) and **domain email setup** are real project goals, but they're hosting/DNS configuration tasks, not codebase tasks — and they need secrets (FTP credentials) that must never be committed to the repo. Don't attempt either unless explicitly asked in a separate, dedicated prompt.
- The **contact form** is static markup only for now — don't wire it to any backend or third-party form service (e.g. Formspree) unless explicitly asked.

---

## 16. Prompting Pattern for Individual Pages (for later)

Once the skeleton exists, each page gets built with its own short prompt, e.g.:

> "Build out `pages/en/capabilities/` and `pages/ar/capabilities/` fully, following CLAUDE.md §12–13 for content and animation rules. Use the Capabilities section of the content brief as the outline."

If you have real image/video links for that specific page, paste them directly into the prompt — Claude Code should use those first and only source additional media itself following §12's verification rules.

Keep these one-page-at-a-time — that's what keeps two people working in parallel without stepping on each other.
