/* =========================================================================
   REFIT, MAINTENANCE & AFTER-SALES PAGE — page-specific script only
   (refit-maintenance.js)
   Navbar, footer, Lucide icons and AOS are already initialised by the shared
   scripts/boilerplate. Reveal animations (including the timeline lines that
   "draw" in) are AOS; hovers are pure CSS; the FAQ uses native <details>.
   This file only handles:
     1. Sticky service nav — highlights the section currently in view and
        adds a shadow once it is stuck.
     2. Sea-trials background video — play/pause toggle, starts paused for
        visitors who ask for reduced motion, falls back to the poster.
   Identical in /pages/en/ and /pages/ar/.
   ========================================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initServiceNav();
    initTrialsVideo();
  });

  /* ---------------------------------------------------- 1 · Sticky service nav */
  function initServiceNav() {
    var nav = document.querySelector(".service-nav");
    if (!nav || !("IntersectionObserver" in window)) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
    var sections = links
      .map(function (link) { return document.querySelector(link.getAttribute("href")); })
      .filter(Boolean);

    function setActive(id) {
      links.forEach(function (link) {
        var on = link.getAttribute("href") === "#" + id;
        link.classList.toggle("is-active", on);
        if (on) {
          link.setAttribute("aria-current", "true");
          // Keep the active pill visible in the horizontally scrolling mobile bar
          var list = link.parentNode.parentNode;
          if (list.scrollWidth > list.clientWidth) {
            list.scrollTo({ left: link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2, behavior: "smooth" });
          }
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    // A section counts as "current" while it crosses a band just below the nav
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { sectionObserver.observe(s); });

    // Clear the highlight when scrolling back above the first service section
    var first = sections[0];
    window.addEventListener("scroll", function () {
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.3) setActive("");
      nav.classList.toggle("is-stuck", nav.getBoundingClientRect().top <= 0);
    }, { passive: true });
  }

  /* ------------------------------------------------- 2 · Sea-trials video */
  function initTrialsVideo() {
    var video = document.getElementById("trials-video");
    var toggle = document.querySelector(".video-toggle");
    if (!video || !toggle) return;

    function sync() {
      var paused = video.paused;
      toggle.classList.toggle("is-paused", paused);
      toggle.setAttribute("aria-pressed", String(paused));
    }

    // Respect prefers-reduced-motion: no autoplaying motion, poster stays visible.
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }

    // If the clip can't load, keep the poster image and drop the useless control.
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
  }
})();
