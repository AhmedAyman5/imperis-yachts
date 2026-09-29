/* =========================================================================
   CAPABILITIES PAGE — page-specific script only (capabilities.js)
   Navbar, footer, Lucide icons and AOS are already initialised by the shared
   scripts/boilerplate. Reveal animations are AOS + pure CSS; the expandable
   scope lists are native <details>. This file only handles:
     1. "Request a Part" form — client-side validation + file-name display.
        STATIC ONLY (CLAUDE.md §15): nothing is sent anywhere yet.
     2. Placeholder links (data-placeholder-link) — stop them jumping to top.
   Identical in /pages/en/ and /pages/ar/ — messages are picked by <html lang>.
   ========================================================================= */

(function () {
  "use strict";

  var IS_AR = document.documentElement.lang === "ar";
  var MAX_BYTES = 10 * 1024 * 1024; // 10 MB per attachment
  var DOC_EXT = ["pdf", "doc", "docx", "xls", "xlsx", "dwg", "dxf"];

  var MSG = IS_AR
    ? {
        required: "هذا الحقل مطلوب.",
        email: "يرجى إدخال بريد إلكتروني صحيح.",
        quantity: "يرجى إدخال كمية صحيحة (1 أو أكثر).",
        tooBig: "حجم الملف يتجاوز 10 ميجابايت.",
        notImage: "يرجى اختيار ملف صورة (JPG أو PNG أو WEBP).",
        notDoc: "الصيغ المقبولة: PDF أو DOC أو XLS أو DWG."
      }
    : {
        required: "This field is required.",
        email: "Please enter a valid email address.",
        quantity: "Please enter a whole number of 1 or more.",
        tooBig: "File is larger than 10 MB.",
        notImage: "Please choose an image file (JPG, PNG or WEBP).",
        notDoc: "Accepted formats: PDF, DOC, XLS or DWG."
      };

  /* Returns an error message for one input, or "" if it's valid. */
  function check(input) {
    var value = input.value.trim();

    if (input.type === "file") {
      var file = input.files && input.files[0];
      if (!file) return "";
      if (file.size > MAX_BYTES) return MSG.tooBig;
      if (input.dataset.kind === "image" && file.type.indexOf("image/") !== 0) return MSG.notImage;
      if (input.dataset.kind === "doc") {
        var ext = file.name.split(".").pop().toLowerCase();
        if (DOC_EXT.indexOf(ext) === -1) return MSG.notDoc;
      }
      return "";
    }

    if (input.required && !value) return MSG.required;
    if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return MSG.email;
    if (input.name === "quantity" && !/^[1-9]\d*$/.test(value)) return MSG.quantity;
    return "";
  }

  function showError(input, message) {
    var field = input.closest(".field");
    var errorEl = document.getElementById(input.id + "-err");
    field.classList.toggle("is-invalid", !!message);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (errorEl) errorEl.textContent = message;
  }

  function validate(input) {
    var message = check(input);
    showError(input, message);
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
    /* --- Placeholder links ------------------------------------------------ */
    document.querySelectorAll("[data-placeholder-link]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });

    /* --- Request a Part form --------------------------------------------- */
    var form = document.getElementById("part-form");
    var success = document.getElementById("part-success");
    var resetBtn = document.getElementById("part-reset");
    if (!form || !success) return;

    var inputs = Array.prototype.slice.call(form.querySelectorAll("input"));
    var submitted = false; // only nag on every keystroke after a first submit

    inputs.forEach(function (input) {
      if (input.type === "file") {
        input.addEventListener("change", function () {
          updateFileName(input);
          validate(input);
        });
        return;
      }
      input.addEventListener("blur", function () {
        if (submitted || input.value.trim()) validate(input);
      });
      input.addEventListener("input", function () {
        if (submitted || input.closest(".field").classList.contains("is-invalid")) validate(input);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitted = true;

      var firstInvalid = null;
      inputs.forEach(function (input) {
        if (!validate(input) && !firstInvalid) firstInvalid = input;
      });

      if (firstInvalid) {
        // File inputs are visually hidden, so focus their drop zone's input
        // (still keyboard-focusable) and scroll the whole field into view.
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
        inputs.forEach(function (input) {
          showError(input, "");
          if (input.type === "file") updateFileName(input);
        });
        success.hidden = true;
        form.hidden = false;
        form.querySelector("input").focus();
      });
    }
  });
})();
