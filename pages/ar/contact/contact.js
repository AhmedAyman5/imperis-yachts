/* =========================================================================
   CONTACT PAGE — page-specific script only (contact.js)
   Navbar, footer, Lucide icons and AOS are already initialised by the shared
   scripts/boilerplate. Load + scroll reveals are AOS; hovers are pure CSS;
   the FAQ uses native <details>. This file only handles:
     1. Social icons — reuses the shared footer's SOCIAL_SVGS (one source).
     2. Placeholder links (data-placeholder-link) — stop them jumping to top.
     3. "Request a Visit" — pre-fills Area of Interest + message in the form;
        ?interest=<value> in the URL pre-selects Area of Interest on load.
     4. Enquiry form — client-side validation + file-name display.
        STATIC ONLY (CLAUDE.md §15): nothing is sent anywhere yet.
   Identical in /pages/en/ and /pages/ar/ — messages are picked by <html lang>.
   ========================================================================= */

(function () {
  "use strict";

  var IS_AR = document.documentElement.lang === "ar";
  var MAX_BYTES = 10 * 1024 * 1024; // 10 MB attachment limit
  var FILE_EXT = ["pdf", "doc", "docx", "xls", "xlsx", "dwg", "dxf", "jpg", "jpeg", "png", "webp"];

  var MSG = IS_AR
    ? {
        required: "هذا الحقل مطلوب.",
        select: "يرجى اختيار مجال الاهتمام.",
        email: "يرجى إدخال بريد إلكتروني صحيح.",
        tooBig: "حجم الملف يتجاوز 10 ميجابايت.",
        badType: "الصيغ المقبولة: PDF أو DOC أو XLS أو DWG أو JPG أو PNG."
      }
    : {
        required: "This field is required.",
        select: "Please choose an area of interest.",
        email: "Please enter a valid email address.",
        tooBig: "File is larger than 10 MB.",
        badType: "Accepted formats: PDF, DOC, XLS, DWG, JPG or PNG."
      };

  /* Returns an error message for one control, or "" if it's valid. */
  function check(control) {
    if (control.type === "file") {
      var file = control.files && control.files[0];
      if (!file) return "";
      if (file.size > MAX_BYTES) return MSG.tooBig;
      var ext = file.name.split(".").pop().toLowerCase();
      if (FILE_EXT.indexOf(ext) === -1) return MSG.badType;
      return "";
    }

    var value = control.value.trim();
    if (control.required && !value) return control.tagName === "SELECT" ? MSG.select : MSG.required;
    if (control.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return MSG.email;
    return "";
  }

  function showError(control, message) {
    var field = control.closest(".field");
    var errorEl = document.getElementById(control.id + "-err");
    field.classList.toggle("is-invalid", !!message);
    control.setAttribute("aria-invalid", message ? "true" : "false");
    if (errorEl) errorEl.textContent = message;
  }

  function validate(control) {
    var message = check(control);
    showError(control, message);
    return !message;
  }

  function updateFileName(input) {
    var drop = input.closest(".file-drop");
    var nameEl = drop.querySelector(".file-name");
    var file = input.files && input.files[0];
    nameEl.textContent = file ? file.name : nameEl.dataset.default;
    drop.classList.toggle("has-file", !!file);
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* --- 1. Social icons (SOCIAL_SVGS is defined by /js/footer.js) -------- */
    if (typeof SOCIAL_SVGS !== "undefined") {
      document.querySelectorAll("[data-social]").forEach(function (link) {
        link.innerHTML = SOCIAL_SVGS[link.dataset.social] || "";
      });
    }

    /* --- 2. Placeholder links -------------------------------------------- */
    document.querySelectorAll("[data-placeholder-link]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });

    /* --- 4. Enquiry form -------------------------------------------------- */
    var form = document.getElementById("contact-form");
    var success = document.getElementById("contact-success");
    var resetBtn = document.getElementById("contact-reset");
    if (!form || !success) return;

    var controls = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"));
    var submitted = false; // only nag on every keystroke after a first submit

    controls.forEach(function (control) {
      if (control.type === "file") {
        control.addEventListener("change", function () {
          updateFileName(control);
          validate(control);
        });
        return;
      }
      control.addEventListener("blur", function () {
        if (submitted || control.value.trim()) validate(control);
      });
      control.addEventListener(control.tagName === "SELECT" ? "change" : "input", function () {
        if (submitted || control.closest(".field").classList.contains("is-invalid")) validate(control);
      });
    });

    /* --- 3. "Request a Visit" pre-fill ------------------------------------ */
    var interest = document.getElementById("cf-interest");
    var message = document.getElementById("cf-message");
    var card = form.closest(".form-card");
    document.querySelectorAll("[data-prefill-interest]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        // If the form was already sent, bring it back first
        if (form.hidden) resetBtn.click();
        interest.value = trigger.dataset.prefillInterest;
        showError(interest, "");
        if (!message.value.trim() && trigger.dataset.prefillMessage) {
          message.value = trigger.dataset.prefillMessage;
          showError(message, "");
        }
        card.classList.remove("is-prefilled");
        void card.offsetWidth; // restart the highlight animation
        card.classList.add("is-prefilled");
        // The anchor's own smooth scroll handles navigation; focus once there
        setTimeout(function () {
          document.getElementById("cf-name").focus({ preventScroll: true });
        }, 600);
      });
    });

    // Other pages can link here with ?interest=<option value> (e.g. the
    // Interiors CTAs) to pre-select Area of Interest. Unknown values are ignored.
    var preset = (new URLSearchParams(window.location.search).get("interest") || "").replace(/[^a-z-]/g, "");
    if (preset && interest.querySelector('option[value="' + preset + '"]')) {
      interest.value = preset;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitted = true;

      var firstInvalid = null;
      controls.forEach(function (control) {
        if (!validate(control) && !firstInvalid) firstInvalid = control;
      });

      if (firstInvalid) {
        firstInvalid.closest(".field").scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalid.focus({ preventScroll: true });
        return;
      }

      // STATIC ONLY — no backend yet (CLAUDE.md §15). Show the confirmation.
      form.hidden = true;
      success.hidden = false;
      success.focus();
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        form.reset();
        submitted = false;
        controls.forEach(function (control) {
          showError(control, "");
          if (control.type === "file") updateFileName(control);
        });
        success.hidden = true;
        form.hidden = false;
        document.getElementById("cf-name").focus();
      });
    }
  });
})();
