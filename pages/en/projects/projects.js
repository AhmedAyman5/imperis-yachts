/* =========================================================================
   PROJECTS & FLEET — page script (projects.js)
   Renders the fleet grid from a data array, handles filtering (with URL-hash
   sync), the full-spec modal, and client-side form validation.
   No libraries — vanilla JS only. Navbar/footer/Lucide/AOS come from the
   shared scripts and the boilerplate.
   ========================================================================= */

/* CONFIRM WITH CLIENT: all project names, years, and specifications below are
   placeholders. Replace with the real IMPERIS fleet records before launch.
   Every image is an external hotlink placeholder — see §12.6.
   PLACEHOLDER MEDIA — replace with real IMPERIS photography/footage. */
const PROJECTS = [
  {
    name: "Azure Horizon", year: "2023", category: "delivered", status: "Delivered", badge: "primary",
    type: "Luxury Motor Yacht", length: "38 m",
    image: "https://images.pexels.com/photos/15883432/pexels-photo-15883432.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Luxury motor yacht moored at sunset against a coastal skyline",
    spec: {
      beam: "7.8 m", draft: "2.1 m", displacement: "295 t",
      hullMaterial: "Steel", superstructure: "Aluminium", engines: "2 × 1,900 hp", generators: "2 × 80 kW",
      propulsion: "Twin shaft", cruisingSpeed: "12 kn", maxSpeed: "16 kn", range: "3,200 nm",
      guests: "10", crew: "6", cabins: "5",
      navalArchitecture: "IMPERIS Design", exteriorDesign: "IMPERIS Design", interiorDesign: "IMPERIS Interiors",
      classification: "", flag: "Egypt"
    }
  },
  {
    name: "Suez Serene", year: "2022", category: "delivered", status: "Delivered", badge: "primary",
    type: "Sailing Yacht", length: "27 m",
    image: "https://images.pexels.com/photos/33748549/pexels-photo-33748549.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Sailing yacht anchored close to a Mediterranean coastal town",
    spec: {
      beam: "6.4 m", draft: "3.2 m", displacement: "120 t",
      hullMaterial: "Composite", superstructure: "Composite", engines: "1 × 320 hp", generators: "1 × 40 kW",
      propulsion: "Single shaft + sail", cruisingSpeed: "9 kn", maxSpeed: "12 kn", range: "2,400 nm",
      guests: "8", crew: "4", cabins: "4",
      navalArchitecture: "IMPERIS Design", exteriorDesign: "IMPERIS Design", interiorDesign: "",
      classification: "", flag: "Egypt"
    }
  },
  {
    name: "Meridian 38", year: "2024", category: "delivered", status: "Delivered", badge: "primary",
    type: "Motor Yacht", length: "34 m",
    image: "https://images.pexels.com/photos/38495693/pexels-photo-38495693.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Luxury motor yacht anchored on clear blue open water",
    spec: {
      beam: "7.2 m", draft: "1.9 m", displacement: "240 t",
      hullMaterial: "Steel", superstructure: "Aluminium", engines: "2 × 1,600 hp", generators: "2 × 65 kW",
      propulsion: "Twin shaft", cruisingSpeed: "11 kn", maxSpeed: "15 kn", range: "2,800 nm",
      guests: "9", crew: "5", cabins: "4",
      navalArchitecture: "IMPERIS Design", exteriorDesign: "IMPERIS Design", interiorDesign: "IMPERIS Interiors",
      classification: "", flag: ""
    }
  },
  {
    name: "Hull 214", year: "2025 (est.)", category: "under-construction", status: "Under Construction", badge: "accent",
    type: "Explorer Yacht", length: "45 m",
    image: "https://images.pexels.com/photos/34962452/pexels-photo-34962452.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A yacht hull lifted by a shipyard crane against a clear sky",
    spec: {
      beam: "9.0 m", draft: "2.6 m", displacement: "480 t",
      hullMaterial: "Steel", superstructure: "Aluminium", engines: "2 × 1,000 hp", generators: "2 × 90 kW",
      propulsion: "Twin shaft", cruisingSpeed: "10 kn", maxSpeed: "13 kn", range: "5,000 nm",
      guests: "12", crew: "8", cabins: "6",
      navalArchitecture: "IMPERIS Design", exteriorDesign: "IMPERIS Design", interiorDesign: "",
      classification: "", flag: ""
    }
  },
  {
    name: "Explorer NX", year: "2025 (est.)", category: "under-construction", status: "Under Construction", badge: "accent",
    type: "Explorer Yacht", length: "52 m",
    image: "https://images.pexels.com/photos/31946424/pexels-photo-31946424.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A large yacht under construction on the quay at a shipyard",
    spec: {
      beam: "9.8 m", draft: "2.9 m", displacement: "650 t",
      hullMaterial: "Steel", superstructure: "Aluminium", engines: "2 × 1,300 hp", generators: "3 × 100 kW",
      propulsion: "Twin shaft", cruisingSpeed: "11 kn", maxSpeed: "14 kn", range: "6,000 nm",
      guests: "14", crew: "10", cabins: "7",
      navalArchitecture: "IMPERIS Design", exteriorDesign: "", interiorDesign: "",
      classification: "", flag: ""
    }
  },
  {
    name: "Concept Apex", year: "TBD", category: "concepts", status: "Concept", badge: "accent",
    type: "Superyacht Concept", length: "60 m",
    image: "https://images.pexels.com/photos/13385972/pexels-photo-13385972.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Aerial view of a white superyacht underway on open ocean",
    spec: {
      beam: "10.5 m", draft: "3.0 m", displacement: "",
      hullMaterial: "Steel", superstructure: "Aluminium", engines: "", generators: "",
      propulsion: "Hybrid (study)", cruisingSpeed: "", maxSpeed: "", range: "",
      guests: "12", crew: "12", cabins: "6",
      navalArchitecture: "IMPERIS Design", exteriorDesign: "IMPERIS Design", interiorDesign: "",
      classification: "", flag: ""
    }
  },
  {
    name: "Bluewater Refit", year: "2023", category: "refit", status: "Refit", badge: "accent",
    type: "Motor Yacht Refit", length: "40 m",
    image: "https://images.pexels.com/photos/17144338/pexels-photo-17144338.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Vessels in a dry dock undergoing refit and maintenance",
    spec: {
      beam: "8.0 m", draft: "2.3 m", displacement: "320 t",
      hullMaterial: "Steel", superstructure: "Aluminium", engines: "Repowered 2 × 1,400 hp", generators: "2 × 70 kW",
      propulsion: "Twin shaft", cruisingSpeed: "11 kn", maxSpeed: "14 kn", range: "3,000 nm",
      guests: "10", crew: "6", cabins: "5",
      navalArchitecture: "—", exteriorDesign: "Original builder", interiorDesign: "IMPERIS Interiors",
      classification: "", flag: ""
    }
  },
  {
    name: "RSC Passenger 120", year: "2022", category: "commercial", status: "Commercial", badge: "primary",
    type: "Passenger Vessel", length: "32 m",
    image: "https://images.pexels.com/photos/37476511/pexels-photo-37476511.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A large passenger ferry underway on calm sea water",
    spec: {
      beam: "8.5 m", draft: "1.8 m", displacement: "210 t",
      hullMaterial: "Aluminium", superstructure: "Aluminium", engines: "2 × 1,100 hp", generators: "2 × 55 kW",
      propulsion: "Twin waterjet", cruisingSpeed: "22 kn", maxSpeed: "27 kn", range: "600 nm",
      guests: "120 pax", crew: "6", cabins: "—",
      navalArchitecture: "IMPERIS Design", exteriorDesign: "IMPERIS Design", interiorDesign: "IMPERIS Interiors",
      classification: "", flag: "Egypt"
    }
  },
  {
    name: "Coastal Runner", year: "2024", category: "commercial", status: "Commercial", badge: "primary",
    type: "Crew / Utility Boat", length: "24 m",
    image: "https://images.pexels.com/photos/30665916/pexels-photo-30665916.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A commercial passenger craft navigating coastal waters",
    spec: {
      beam: "6.8 m", draft: "1.5 m", displacement: "95 t",
      hullMaterial: "Aluminium", superstructure: "Aluminium", engines: "2 × 900 hp", generators: "1 × 40 kW",
      propulsion: "Twin shaft", cruisingSpeed: "20 kn", maxSpeed: "26 kn", range: "500 nm",
      guests: "40 pax", crew: "4", cabins: "—",
      navalArchitecture: "IMPERIS Design", exteriorDesign: "IMPERIS Design", interiorDesign: "",
      classification: "", flag: ""
    }
  }
];

/* Full-spec field groups (label order matters). Keys map into project or spec. */
const SPEC_GROUPS = [
  {
    title: "Vessel",
    fields: [
      ["name", "Project Name"], ["year", "Year"], ["status", "Status"], ["type", "Type"],
      ["length", "Length"], ["beam", "Beam"], ["draft", "Draft"], ["displacement", "Displacement"]
    ]
  },
  {
    title: "Construction & Machinery",
    fields: [
      ["hullMaterial", "Hull Material"], ["superstructure", "Superstructure"], ["engines", "Engines"],
      ["generators", "Generators"], ["propulsion", "Propulsion"], ["cruisingSpeed", "Cruising Speed"],
      ["maxSpeed", "Maximum Speed"], ["range", "Range"]
    ]
  },
  {
    title: "Accommodation & Credits",
    fields: [
      ["guests", "Guests"], ["crew", "Crew"], ["cabins", "Cabins"], ["navalArchitecture", "Naval Architecture"],
      ["exteriorDesign", "Exterior Design"], ["interiorDesign", "Interior Design"],
      ["classification", "Classification"], ["flag", "Flag"]
    ]
  }
];

const UI = {
  empty: "No projects in this category yet — more coming soon.",
  viewSpec: "View Full Specification",
  photos: "Photos",
  videos: "Videos",
  galleryNote: "Full photo and video galleries will be supplied by the client per project.",
  close: "Close specification"
};

const VALID_FILTERS = ["all", "delivered", "under-construction", "concepts", "refit", "commercial"];
const DASH = "—";

/* Look a value up from the project (top-level first, then spec), em-dash if blank. */
function fieldValue(project, key) {
  let v = project[key];
  if (v === undefined) v = project.spec ? project.spec[key] : undefined;
  return v === undefined || v === null || String(v).trim() === "" ? DASH : v;
}

/* ---------------------------------------------------------------- CARD RENDER */
function renderCards() {
  const grid = document.getElementById("fleet-grid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="proj-card" data-category="${p.category}" data-index="${i}" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
      <div class="proj-media">
        <!-- PLACEHOLDER MEDIA — replace with real IMPERIS photography/footage -->
        <img src="${p.image}" alt="${p.alt}" loading="lazy" />
        <span class="proj-badge proj-badge--${p.badge}">${p.status}</span>
      </div>
      <div class="proj-body">
        <h3>${p.name}</h3>
        <ul class="proj-specs">
          <li>${p.year}</li>
          <li>${p.type}</li>
          <li>${p.length}</li>
          <li>${p.status}</li>
        </ul>
        <button class="proj-link" data-open-spec="${i}">${UI.viewSpec} <i data-lucide="arrow-right"></i></button>
      </div>
    </article>`).join("");
  if (window.lucide) lucide.createIcons();
}

/* ------------------------------------------------------------------- FILTER */
function applyFilter(filter, updateHash) {
  if (!VALID_FILTERS.includes(filter)) filter = "all";

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.filter === filter);
  });

  const cards = document.querySelectorAll(".proj-card");
  let visible = 0;
  cards.forEach((card) => {
    const match = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("is-hidden", !match);
    if (match) visible++;
  });

  const empty = document.getElementById("fleet-empty");
  if (empty) empty.hidden = visible !== 0;

  if (updateHash) {
    if (filter === "all") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    } else {
      history.replaceState(null, "", "#" + filter);
    }
  }
}

/* --------------------------------------------------------------- SPEC MODAL */
function buildSpecHtml(p) {
  const groups = SPEC_GROUPS.map((g) => `
    <div class="spec-group">
      <h4>${g.title}</h4>
      <dl class="spec-list">
        ${g.fields.map(([key, label]) => `
          <div class="spec-row">
            <dt>${label}</dt>
            <dd>${fieldValue(p, key)}</dd>
          </div>`).join("")}
      </dl>
    </div>`).join("");

  return `
    <div class="spec-media">
      <!-- PLACEHOLDER MEDIA — replace with real IMPERIS photography/footage -->
      <img src="${p.image}" alt="${p.alt}" />
      <span class="proj-badge proj-badge--${p.badge}">${p.status}</span>
    </div>
    <h3 id="spec-title">${p.name}</h3>
    ${groups}
    <div class="spec-gallery">
      <div class="spec-gallery-col">
        <h4>${UI.photos}</h4>
        <div class="thumb-strip">
          <!-- PLACEHOLDER MEDIA — replace with real IMPERIS photography/footage -->
          <img src="${p.image}" alt="${p.alt}" />
        </div>
      </div>
      <div class="spec-gallery-col">
        <h4>${UI.videos}</h4>
        <div class="thumb-strip thumb-strip--empty">${DASH}</div>
      </div>
    </div>
    <!-- CONFIRM WITH CLIENT: ${UI.galleryNote} -->
    <p class="spec-gallery-note">${UI.galleryNote}</p>`;
}

let lastFocused = null;
function openSpec(index) {
  const p = PROJECTS[index];
  const modal = document.getElementById("spec-modal");
  const body = document.getElementById("spec-body");
  if (!p || !modal || !body) return;
  body.innerHTML = buildSpecHtml(p);
  lastFocused = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  if (window.lucide) lucide.createIcons();
  const closeBtn = modal.querySelector("[data-close-spec]");
  if (closeBtn) closeBtn.focus();
}
function closeSpec() {
  const modal = document.getElementById("spec-modal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

/* --------------------------------------------------------------- FORM (static) */
function initForm() {
  const form = document.getElementById("portfolio-form");
  if (!form) return;
  const success = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const invalid = !field.value.trim() || (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
      field.classList.toggle("is-invalid", invalid);
      if (invalid) ok = false;
    });
    if (!ok) return;

    // No backend on this static site — surface a success message + mailto fallback.
    const data = new FormData(form);
    const subject = encodeURIComponent("Portfolio request — " + (data.get("name") || ""));
    const bodyLines = [
      "Name: " + (data.get("name") || ""),
      "Email: " + (data.get("email") || ""),
      "Company: " + (data.get("company") || ""),
      "Interest: " + (data.get("interest") || ""),
      "Message: " + (data.get("message") || "")
    ].join("\n");
    const mailto = "mailto:sales@imperisyachts.com?subject=" + subject + "&body=" + encodeURIComponent(bodyLines);

    if (success) {
      success.innerHTML = 'Thank you — your request is ready to send. <a href="' + mailto + '">Open it in your email app</a> to complete it.';
      success.hidden = false;
      success.focus();
    }
    form.hidden = true;
  });

  form.querySelectorAll("[required]").forEach((field) => {
    field.addEventListener("input", () => field.classList.remove("is-invalid"));
  });
}

/* ------------------------------------------------------------------- INIT */
document.addEventListener("DOMContentLoaded", () => {
  renderCards();

  // Filter buttons
  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter, true));
  });

  // Initial filter from URL hash
  const initial = (window.location.hash || "").replace("#", "");
  applyFilter(VALID_FILTERS.includes(initial) ? initial : "all", false);
  window.addEventListener("hashchange", () => {
    const h = (window.location.hash || "").replace("#", "");
    applyFilter(VALID_FILTERS.includes(h) ? h : "all", false);
  });

  // Spec modal open (delegated) + close
  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open-spec]");
    if (opener) { openSpec(parseInt(opener.dataset.openSpec, 10)); return; }
    if (e.target.closest("[data-close-spec]") || e.target.classList.contains("spec-backdrop")) closeSpec();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSpec(); });

  initForm();
});
