/* =========================================================================
   ABOUT PAGE — page-specific script only (about.js)
   Navbar, footer, Lucide icons and AOS are already initialised by the shared
   scripts + boilerplate. Scroll reveals, hovers and the timeline "draw" are
   AOS + CSS (see about.css). The only behaviour here:

   Years in business — computed from the founding year (2000). The HTML ships
   a static fallback ("25+ years") so the stat still reads correctly if this
   script never runs. The number counts up once on load, and is set instantly
   when the visitor prefers reduced motion. Shared by EN + AR (unit text comes
   from data attributes on the element, so no language strings live here).
   ========================================================================= */

(function () {
  var FOUNDED = 2000;

  function unitFor(el, n) {
    // Optional plural rule for Arabic: 3–10 → data-unit-few, else data-unit
    if (el.dataset.unitFew && n >= 3 && n <= 10) return el.dataset.unitFew;
    return el.dataset.unit || "";
  }

  function render(el, n) {
    var unit = unitFor(el, n);
    el.textContent = el.dataset.unitFirst ? unit + " " + n : n + " " + unit;
  }

  document.querySelectorAll("[data-years-since]").forEach(function (el) {
    var target = new Date().getFullYear() - FOUNDED;
    if (!(target > 0)) return; // keep the static fallback

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !window.requestAnimationFrame) {
      render(el, target);
      return;
    }

    var duration = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // ease-out, never bouncy
      render(el, Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    }
    // Start after the stats bar's own AOS fade-in has begun
    setTimeout(function () { requestAnimationFrame(step); }, 600);
  });
})();
