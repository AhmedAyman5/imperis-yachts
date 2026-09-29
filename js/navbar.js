/* =========================================================================
   IMPERIS YACHTS — SHARED NAVBAR (js/navbar.js)
   The ONLY place navbar markup exists. Every page includes an empty
   <div id="navbar-root"></div> and loads this file with `defer`.
   Two full template strings (EN + AR) are chosen by <html lang>.  (§10)
   ========================================================================= */

/* Logo mark — inline SVG so it never renders as a broken image and inherits
   currentColor. Swap for /images/logo.svg once the real brand logo is added. */
const NAV_LOGO_SVG = `
  <svg viewBox="0 0 32 32" width="34" height="34" fill="none" aria-hidden="true">
    <path d="M16 2 3 9v8c0 7.3 5.4 12 13 13 7.6-1 13-5.7 13-13V9L16 2Z"
          fill="none" stroke="currentColor" stroke-width="1.6"/>
    <path d="M16 8v14M10 13l6-5 6 5M11 22h10" stroke="currentColor"
          stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

/* ------------------------------------------------------------------ ENGLISH */
const NAVBAR_HTML_EN = `
<nav class="site-nav" aria-label="Primary">
  <div class="nav-inner">
    <a class="nav-logo" href="/" aria-label="IMPERIS YACHTS home">
      ${NAV_LOGO_SVG}
      <span>IMPERIS<span style="font-weight:400"> YACHTS</span></span>
    </a>

    <ul class="nav-menu">
      <li class="nav-item"><a class="nav-link" href="/">Home</a></li>

      <li class="nav-item">
        <a class="nav-link" href="#" data-dropdown>About <i data-lucide="chevron-down" class="chev"></i></a>
        <div class="nav-dropdown">
          <a href="/pages/en/about/about.html">About Us</a>
          <a href="/pages/en/shipyard/shipyard.html">The Shipyard</a>
        </div>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#" data-dropdown>What We Build <i data-lucide="chevron-down" class="chev"></i></a>
        <div class="nav-dropdown">
          <a href="/pages/en/yacht-building/yacht-building.html">Yacht Building</a>
          <a href="/pages/en/shipbuilding/shipbuilding.html">Shipbuilding &amp; Commercial Vessels</a>
          <a href="/pages/en/design-engineering/design-engineering.html">Design &amp; Naval Architecture</a>
        </div>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#" data-dropdown>Services <i data-lucide="chevron-down" class="chev"></i></a>
        <div class="nav-dropdown">
          <a href="/pages/en/capabilities/capabilities.html">Capabilities</a>
          <a href="/pages/en/interiors/interiors.html">Interiors</a>
          <a href="/pages/en/refit-maintenance/refit-maintenance.html">Refit, Maintenance &amp; After-Sales</a>
        </div>
      </li>

      <li class="nav-item"><a class="nav-link" href="/pages/en/projects/projects.html">Projects &amp; Fleet</a></li>
      <li class="nav-item"><a class="nav-link" href="/pages/en/academy/academy.html">IMPERIS Academy</a></li>
    </ul>

    <div class="nav-actions">
      <a class="nav-lang" data-lang-switch href="#"><i data-lucide="languages"></i> العربية</a>
      <a class="btn btn-primary" href="/pages/en/contact/contact.html">Contact</a>
    </div>

    <button class="nav-toggle" data-nav-toggle aria-label="Open menu" aria-expanded="false">
      <i data-lucide="menu"></i>
    </button>
  </div>

  <!-- Mobile panel -->
  <div class="nav-mobile" data-nav-mobile>
    <a class="m-link" href="/">Home</a>

    <div class="m-group">
      <button data-m-toggle>About <i data-lucide="chevron-down"></i></button>
      <div class="m-sub">
        <a href="/pages/en/about/about.html">About Us</a>
        <a href="/pages/en/shipyard/shipyard.html">The Shipyard</a>
      </div>
    </div>

    <div class="m-group">
      <button data-m-toggle>What We Build <i data-lucide="chevron-down"></i></button>
      <div class="m-sub">
        <a href="/pages/en/yacht-building/yacht-building.html">Yacht Building</a>
        <a href="/pages/en/shipbuilding/shipbuilding.html">Shipbuilding &amp; Commercial Vessels</a>
        <a href="/pages/en/design-engineering/design-engineering.html">Design &amp; Naval Architecture</a>
      </div>
    </div>

    <div class="m-group">
      <button data-m-toggle>Services <i data-lucide="chevron-down"></i></button>
      <div class="m-sub">
        <a href="/pages/en/capabilities/capabilities.html">Capabilities</a>
        <a href="/pages/en/interiors/interiors.html">Interiors</a>
        <a href="/pages/en/refit-maintenance/refit-maintenance.html">Refit, Maintenance &amp; After-Sales</a>
      </div>
    </div>

    <a class="m-link" href="/pages/en/projects/projects.html">Projects &amp; Fleet</a>
    <a class="m-link" href="/pages/en/academy/academy.html">IMPERIS Academy</a>

    <div class="m-footer">
      <a class="nav-lang" data-lang-switch href="#"><i data-lucide="languages"></i> العربية</a>
      <a class="btn btn-primary" href="/pages/en/contact/contact.html">Contact</a>
    </div>
  </div>
</nav>`;

/* ------------------------------------------------------------------- ARABIC */
const NAVBAR_HTML_AR = `
<nav class="site-nav" aria-label="التنقل الرئيسي">
  <div class="nav-inner">
    <a class="nav-logo" href="/ar/index.html" aria-label="الصفحة الرئيسية لإيمبيريس يخوت">
      ${NAV_LOGO_SVG}
      <span>IMPERIS<span style="font-weight:400"> YACHTS</span></span>
    </a>

    <ul class="nav-menu">
      <li class="nav-item"><a class="nav-link" href="/ar/index.html">الرئيسية</a></li>

      <li class="nav-item">
        <a class="nav-link" href="#" data-dropdown>من نحن <i data-lucide="chevron-down" class="chev"></i></a>
        <div class="nav-dropdown">
          <a href="/pages/ar/about/about.html">نبذة عنا</a>
          <a href="/pages/ar/shipyard/shipyard.html">الترسانة</a>
        </div>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#" data-dropdown>ماذا نبني <i data-lucide="chevron-down" class="chev"></i></a>
        <div class="nav-dropdown">
          <a href="/pages/ar/yacht-building/yacht-building.html">بناء اليخوت</a>
          <a href="/pages/ar/shipbuilding/shipbuilding.html">بناء السفن والوحدات التجارية</a>
          <a href="/pages/ar/design-engineering/design-engineering.html">التصميم والهندسة البحرية</a>
        </div>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#" data-dropdown>خدماتنا <i data-lucide="chevron-down" class="chev"></i></a>
        <div class="nav-dropdown">
          <a href="/pages/ar/capabilities/capabilities.html">قدراتنا</a>
          <a href="/pages/ar/interiors/interiors.html">التشطيبات الداخلية</a>
          <a href="/pages/ar/refit-maintenance/refit-maintenance.html">التجديد والصيانة وما بعد البيع</a>
        </div>
      </li>

      <li class="nav-item"><a class="nav-link" href="/pages/ar/projects/projects.html">مشروعاتنا وأسطولنا</a></li>
      <li class="nav-item"><a class="nav-link" href="/pages/ar/academy/academy.html">أكاديمية IMPERIS</a></li>
    </ul>

    <div class="nav-actions">
      <a class="nav-lang" data-lang-switch href="#"><i data-lucide="languages"></i> EN</a>
      <a class="btn btn-primary" href="/pages/ar/contact/contact.html">تواصل معنا</a>
    </div>

    <button class="nav-toggle" data-nav-toggle aria-label="فتح القائمة" aria-expanded="false">
      <i data-lucide="menu"></i>
    </button>
  </div>

  <!-- Mobile panel -->
  <div class="nav-mobile" data-nav-mobile>
    <a class="m-link" href="/ar/index.html">الرئيسية</a>

    <div class="m-group">
      <button data-m-toggle>من نحن <i data-lucide="chevron-down"></i></button>
      <div class="m-sub">
        <a href="/pages/ar/about/about.html">نبذة عنا</a>
        <a href="/pages/ar/shipyard/shipyard.html">الترسانة</a>
      </div>
    </div>

    <div class="m-group">
      <button data-m-toggle>ماذا نبني <i data-lucide="chevron-down"></i></button>
      <div class="m-sub">
        <a href="/pages/ar/yacht-building/yacht-building.html">بناء اليخوت</a>
        <a href="/pages/ar/shipbuilding/shipbuilding.html">بناء السفن والوحدات التجارية</a>
        <a href="/pages/ar/design-engineering/design-engineering.html">التصميم والهندسة البحرية</a>
      </div>
    </div>

    <div class="m-group">
      <button data-m-toggle>خدماتنا <i data-lucide="chevron-down"></i></button>
      <div class="m-sub">
        <a href="/pages/ar/capabilities/capabilities.html">قدراتنا</a>
        <a href="/pages/ar/interiors/interiors.html">التشطيبات الداخلية</a>
        <a href="/pages/ar/refit-maintenance/refit-maintenance.html">التجديد والصيانة وما بعد البيع</a>
      </div>
    </div>

    <a class="m-link" href="/pages/ar/projects/projects.html">مشروعاتنا وأسطولنا</a>
    <a class="m-link" href="/pages/ar/academy/academy.html">أكاديمية IMPERIS</a>

    <div class="m-footer">
      <a class="nav-lang" data-lang-switch href="#"><i data-lucide="languages"></i> EN</a>
      <a class="btn btn-primary" href="/pages/ar/contact/contact.html">تواصل معنا</a>
    </div>
  </div>
</nav>`;

/* ---------------------------------------------------------------- BEHAVIOUR */
function attachNavbarEvents() {
  const root = document.getElementById("navbar-root");
  if (!root) return;

  // Language switcher — reads the sibling page from <html data-alt-lang-href>.
  const altHref = document.documentElement.dataset.altLangHref;
  root.querySelectorAll("[data-lang-switch]").forEach((el) => {
    if (altHref) {
      el.setAttribute("href", altHref);
    } else {
      el.style.display = "none"; // no sibling declared → hide rather than dangle
    }
  });

  // Desktop dropdowns — click toggles (hover is handled purely in CSS).
  root.querySelectorAll("[data-dropdown]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const item = trigger.closest(".nav-item");
      const wasOpen = item.classList.contains("open");
      root.querySelectorAll(".nav-item.open").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });

  // Close any open desktop dropdown when clicking elsewhere.
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
      root.querySelectorAll(".nav-item.open").forEach((i) => i.classList.remove("open"));
    }
  });

  // Mobile hamburger — toggles the full-width panel + swaps menu/x icon.
  const toggle = root.querySelector("[data-nav-toggle]");
  const mobile = root.querySelector("[data-nav-mobile]");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    });
  }

  // Mobile accordion groups.
  root.querySelectorAll("[data-m-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".m-group").classList.toggle("open");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = document.documentElement.lang; // "en" or "ar"
  const root = document.getElementById("navbar-root");
  if (root) {
    root.innerHTML = lang === "ar" ? NAVBAR_HTML_AR : NAVBAR_HTML_EN;
    attachNavbarEvents();
    if (window.lucide) lucide.createIcons();
  }
});
