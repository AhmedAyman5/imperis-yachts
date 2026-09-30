/* =========================================================================
   IMPERIS YACHTS — SHARED FOOTER (js/footer.js)
   The ONLY place footer markup exists. Every page includes an empty
   <div id="footer-root"></div> and loads this file with `defer`.
   EN + AR templates chosen by <html lang>.  (§10)

   Addresses, phone numbers and emails below are CLIENT-CONFIRMED.
   Social profile URLs are still placeholders — see CONFIRM comments.
   ========================================================================= */

const MAPS_HQ =
  "https://www.google.com/maps/search/?api=1&query=121+El-Thawra+Street%2C+Heliopolis%2C+Cairo%2C+Egypt";
const MAPS_SHIPYARD =
  "https://www.google.com/maps/search/?api=1&query=Third+Free+Zone%2C+Ataka+District%2C+Suez+Governorate%2C+Egypt+43713";

/* Brand logo — /images/newlogo.png, the same file the navbar uses. Drawn as a
   CSS mask (see .footer-logo-mark in style.css) filled white, which sits on the
   midnight-blue footer. The PNG already contains the "IMPERIS YACHTS" wordmark,
   so no text sits beside it. */
const FOOTER_LOGO = `<span class="footer-logo-mark" role="img" aria-label="IMPERIS YACHTS"></span>`;

/* Social brand glyphs as inline SVG.
   NOTE: Lucide removed its brand/logo icons (facebook, instagram, linkedin,
   youtube) from recent versions, so `data-lucide="facebook"` etc. render as
   nothing — see CLAUDE.md §10, which says to swap when a Lucide name isn't
   available. These inline paths always render and inherit currentColor. */
const SOCIAL_SVGS = {
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
};

const YEAR = new Date().getFullYear();

/* ------------------------------------------------------------------ ENGLISH */
const FOOTER_HTML_EN = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">

      <div class="footer-brand">
        <div class="footer-logo">${FOOTER_LOGO}</div>
        <p>Egyptian yacht and shipbuilders since 2000 — designing, engineering and
           crafting yachts and marine vessels, with full refit, maintenance and
           after-sales support, and technical training through IMPERIS Academy.</p>
        <div class="footer-social">
          <!-- CONFIRM WITH CLIENT: real social profile URLs -->
          <a href="#" aria-label="Facebook">${SOCIAL_SVGS.facebook}</a>
          <a href="#" aria-label="Instagram">${SOCIAL_SVGS.instagram}</a>
          <a href="#" aria-label="LinkedIn">${SOCIAL_SVGS.linkedin}</a>
          <a href="#" aria-label="YouTube">${SOCIAL_SVGS.youtube}</a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Explore</h4>
        <ul>
          <li><a href="/pages/en/about/about.html">About Us</a></li>
          <li><a href="/pages/en/shipyard/shipyard.html">The Shipyard</a></li>
          <li><a href="/pages/en/yacht-building/yacht-building.html">Yacht Building</a></li>
          <li><a href="/pages/en/shipbuilding/shipbuilding.html">Shipbuilding</a></li>
          <li><a href="/pages/en/design-engineering/design-engineering.html">Design &amp; Naval Architecture</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="/pages/en/capabilities/capabilities.html">Capabilities</a></li>
          <li><a href="/pages/en/interiors/interiors.html">Interiors</a></li>
          <li><a href="/pages/en/refit-maintenance/refit-maintenance.html">Refit &amp; Maintenance</a></li>
          <li><a href="/pages/en/projects/projects.html">Projects &amp; Fleet</a></li>
          <li><a href="/pages/en/academy/academy.html">IMPERIS Academy</a></li>
        </ul>
      </div>

      <div class="footer-col footer-contact">
        <h4>Get in Touch</h4>
        <address class="f-block">
          <strong>Administrative Headquarters</strong>
          <a href="${MAPS_HQ}" target="_blank" rel="noopener noreferrer">121 El-Thawra Street, Heliopolis,<br />
          Cairo, Egypt</a><br />
          <a href="tel:+201101031304">01101031304</a> · <a href="tel:+201123323313">01123323313</a>
        </address>
        <address class="f-block">
          <strong>Shipyard &amp; Manufacturing Facility</strong>
          <a href="${MAPS_SHIPYARD}" target="_blank" rel="noopener noreferrer">Plot No. 8/8, Block No. 5, Third Free Zone, Ataka District,<br />
          Suez Governorate, Egypt — Postal code: 43713</a><br />
          <a href="tel:+20623230888">0623230888</a> · <a href="tel:+20623230878">0623230878</a> · <a href="tel:+201114515550">01114515550</a>
        </address>
        <div class="f-block">
          <a href="mailto:info@imperisyachts.com">info@imperisyachts.com</a><br />
          <a href="mailto:sales@imperisyachts.com">sales@imperisyachts.com</a><br />
          <a href="mailto:training@imperisyachts.com">training@imperisyachts.com</a>
        </div>
      </div>

    </div>
  </div>
  <div class="footer-bar">
    © ${YEAR} IMPERIS YACHTS. All rights reserved.
  </div>
</footer>`;

/* ------------------------------------------------------------------- ARABIC */
const FOOTER_HTML_AR = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">

      <div class="footer-brand">
        <div class="footer-logo">${FOOTER_LOGO}</div>
        <p>شركة مصرية لبناء اليخوت والسفن منذ عام 2000 — نصمّم ونهندس ونصنع اليخوت
           والوحدات البحرية، مع خدمات متكاملة للتجديد والصيانة وما بعد البيع، وتدريب
           تقني متخصص من خلال أكاديمية IMPERIS.</p>
        <div class="footer-social">
          <!-- CONFIRM WITH CLIENT: روابط حسابات التواصل الاجتماعي -->
          <a href="#" aria-label="فيسبوك">${SOCIAL_SVGS.facebook}</a>
          <a href="#" aria-label="إنستغرام">${SOCIAL_SVGS.instagram}</a>
          <a href="#" aria-label="لينكد إن">${SOCIAL_SVGS.linkedin}</a>
          <a href="#" aria-label="يوتيوب">${SOCIAL_SVGS.youtube}</a>
        </div>
      </div>

      <div class="footer-col">
        <h4>استكشف</h4>
        <ul>
          <li><a href="/pages/ar/about/about.html">نبذة عنا</a></li>
          <li><a href="/pages/ar/shipyard/shipyard.html">الترسانة</a></li>
          <li><a href="/pages/ar/yacht-building/yacht-building.html">بناء اليخوت</a></li>
          <li><a href="/pages/ar/shipbuilding/shipbuilding.html">بناء السفن والوحدات التجارية</a></li>
          <li><a href="/pages/ar/design-engineering/design-engineering.html">التصميم والهندسة البحرية</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>خدماتنا</h4>
        <ul>
          <li><a href="/pages/ar/capabilities/capabilities.html">قدراتنا</a></li>
          <li><a href="/pages/ar/interiors/interiors.html">التشطيبات الداخلية</a></li>
          <li><a href="/pages/ar/refit-maintenance/refit-maintenance.html">التجديد والصيانة</a></li>
          <li><a href="/pages/ar/projects/projects.html">مشروعاتنا وأسطولنا</a></li>
          <li><a href="/pages/ar/academy/academy.html">أكاديمية IMPERIS</a></li>
        </ul>
      </div>

      <div class="footer-col footer-contact">
        <h4>تواصل معنا</h4>
        <address class="f-block">
          <strong>المقر الإداري</strong>
          <a href="${MAPS_HQ}" target="_blank" rel="noopener noreferrer">121 شارع الثورة، هليوبوليس، مصر الجديدة،<br />
          القاهرة</a><br />
          <a href="tel:+201101031304" dir="ltr">01101031304</a> · <a href="tel:+201123323313" dir="ltr">01123323313</a>
        </address>
        <address class="f-block">
          <strong>الترسانة ومنشأة التصنيع</strong>
          <a href="${MAPS_SHIPYARD}" target="_blank" rel="noopener noreferrer">قطعة رقم 8/8، بلوك رقم 5، المنطقة الحرة الثالثة، حي عتاقة،<br />
          محافظة السويس — الرمز البريدي 43713</a><br />
          <a href="tel:+20623230888" dir="ltr">0623230888</a> · <a href="tel:+20623230878" dir="ltr">0623230878</a> · <a href="tel:+201114515550" dir="ltr">01114515550</a>
        </address>
        <div class="f-block">
          <a href="mailto:info@imperisyachts.com" dir="ltr">info@imperisyachts.com</a><br />
          <a href="mailto:sales@imperisyachts.com" dir="ltr">sales@imperisyachts.com</a><br />
          <a href="mailto:training@imperisyachts.com" dir="ltr">training@imperisyachts.com</a>
        </div>
      </div>

    </div>
  </div>
  <div class="footer-bar">
    © ${YEAR} IMPERIS YACHTS. جميع الحقوق محفوظة.
  </div>
</footer>`;

document.addEventListener("DOMContentLoaded", () => {
  const lang = document.documentElement.lang;
  const root = document.getElementById("footer-root");
  if (root) {
    root.innerHTML = lang === "ar" ? FOOTER_HTML_AR : FOOTER_HTML_EN;
    if (window.lucide) lucide.createIcons();
  }
});
