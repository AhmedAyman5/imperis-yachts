/* =========================================================================
   INTERIORS PAGE — page-specific script only (interiors.js)
   Navbar, footer, Lucide icons and AOS are already initialised by the shared
   scripts/boilerplate. Reveal animations are AOS; hovers are pure CSS; the
   FAQ uses native <details>. This file only handles:
     1. Materials & Craft video — play/pause toggle, and starts paused for
        visitors who ask for reduced motion.
   Identical in /pages/en/ and /pages/ar/.
   ========================================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("craft-video");
    var toggle = document.querySelector(".video-toggle");
    if (!video || !toggle) return;

    function sync() {
      var paused = video.paused;
      toggle.classList.toggle("is-paused", paused);
      toggle.setAttribute("aria-label", paused ? toggle.dataset.labelPlay : toggle.dataset.labelPause);
    }

    // Respect prefers-reduced-motion: no autoplaying motion, poster stays visible.
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }

    // If the video can't load, keep the poster image and drop the useless control.
    video.addEventListener("error", function () { toggle.hidden = true; }, true);

    toggle.addEventListener("click", function () {
      if (video.paused) {
        var p = video.play();
        if (p && p.catch) p.catch(function () {}); // autoplay policies may block — ignore
      } else {
        video.pause();
      }
    });

    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    sync();
  });
})();
