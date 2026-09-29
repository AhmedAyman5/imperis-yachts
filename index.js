/* =========================================================================
   HOME PAGE — page-specific script only (index.js)
   The navbar, footer, Lucide icons and AOS are already initialised by the
   shared scripts in the <head>/boilerplate. Only add Home-specific behaviour
   here. Re-call lucide.createIcons() only if THIS script injects new icons.
   ========================================================================= */

(function () {
  "use strict";

  /* --- Count-up animation for the stat bands ------------------------------
     Each `.stat-num` holds its final value as text (e.g. "2000", "40,000 m²",
     "150+", "85%"). We parse an optional prefix, the number, and a suffix,
     then count from 0 to the target once when the card scrolls into view. */
  function parseStat(el) {
    var text = el.textContent.trim();
    var m = text.match(/^(\D*)([\d.,]+)(\D*)$/);
    if (!m) return null;
    var raw = m[2];
    var target = parseInt(raw.replace(/[.,\s]/g, ""), 10);
    if (isNaN(target)) return null;
    var prefix = m[1];
    var suffix = m[3];
    var hasSep = raw.indexOf(",") !== -1;
    return {
      target: target,
      format: function (n) {
        var s = hasSep ? n.toLocaleString("en-US") : String(n);
        return prefix + s + suffix;
      }
    };
  }

  function countUp(el) {
    var info = el.__stat;
    if (!info) return;
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = info.format(Math.round(eased * info.target));
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = info.format(info.target);
      }
    }
    requestAnimationFrame(step);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nums = Array.prototype.slice.call(document.querySelectorAll(".stat-num"));
    if (!nums.length) return;

    // Without IntersectionObserver, leave the final numbers untouched.
    if (!("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          var el = entry.target;
          if (entry.isIntersecting) {
            countUp(el);
            obs.unobserve(el);
          } else if (entry.boundingClientRect.top < 0) {
            // Scrolled past before we caught the intersection (fast scroll):
            // snap straight to the final value so it never stays at 0.
            el.textContent = el.__stat.format(el.__stat.target);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    nums.forEach(function (el) {
      var info = parseStat(el);
      if (!info) return; // unparseable value → leave as-is, don't animate
      el.__stat = info;
      el.textContent = info.format(0); // prime at 0 to avoid a final→0 flash
      io.observe(el);
    });
  });
})();
