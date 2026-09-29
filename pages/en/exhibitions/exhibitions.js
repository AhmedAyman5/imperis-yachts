/* =========================================================================
   EXHIBITIONS & INDUSTRY EVENTS — page script (exhibitions.js)
   Renders the exhibition calendar from a data array, handles region filtering
   (with URL-hash sync) and the empty state. No libraries — vanilla JS only.
   Navbar/footer/Lucide/AOS come from the shared scripts and the boilerplate.
   ========================================================================= */

/* CONFIRM WITH CLIENT: mark which of these events IMPERIS has actually attended,
   exhibited at, or plans to attend. Until confirmed, all entries render as
   industry calendar listings, NOT as claimed participation. */

/* CONFIRM WITH CLIENT: verify all dates and venues before launch — exhibition
   schedules change. Several entries need current-edition dates confirmed with
   the organiser. */

/* Every `image` below is an external hotlink placeholder — see §12.6.
   PLACEHOLDER MEDIA — replace with real IMPERIS photography from these events.
   Entries without an `image` render as text cards by design — never pad a card
   with a reused photo. */
const EXHIBITIONS = [
  /* ------------------------------------------------------------- EGYPT */
  {
    name: "Egypt International Boat Show (EIBS)",
    nameAr: "معرض مصر الدولي لليخوت والقوارب",
    city: "Cairo", country: "Egypt",
    venue: "Cairo International Convention Centre (CICC)",
    dates: "14–17 January 2027", edition: "9th edition",
    category: "egypt", attended: false,
    image: "https://images.pexels.com/photos/42092/pexels-photo-42092.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Rows of yachts on display at a marina under clear skies",
    notes: "Egypt's only dedicated marine industry exhibition. The 2026 edition drew over 70 companies showing more than 140 international and local brands.",
    notesAr: "المعرض المتخصص الوحيد في الصناعات البحرية داخل مصر. شهدت دورة 2026 مشاركة أكثر من 70 شركة وجهة بعرض ما يزيد على 140 علامة تجارية عالمية ومحلية."
  },
  {
    name: "Egypt International Boat Show — 8th Edition",
    nameAr: "معرض مصر الدولي لليخوت والقوارب — الدورة الثامنة",
    city: "Cairo", country: "Egypt",
    venue: "Cairo International Convention Centre (CICC)",
    dates: "5–8 February 2026", edition: "8th edition · past",
    category: "egypt", attended: false,
    image: "", alt: "",
    notes: "Opened by the Deputy Prime Minister for Industrial Development, with locally manufactured boats and yachts a central theme.",
    notesAr: "افتُتحت بحضور نائب رئيس مجلس الوزراء للتنمية الصناعية، وكانت القوارب واليخوت المصنّعة محليًا محورًا رئيسيًا فيها."
  },
  {
    name: "Egypt International Boat Show — 7th Edition",
    nameAr: "معرض مصر الدولي لليخوت والقوارب — الدورة السابعة",
    city: "Cairo", country: "Egypt",
    venue: "Cairo International Convention Centre (CICC)",
    dates: "6–9 February 2025", edition: "7th edition · past",
    category: "egypt", attended: false,
    image: "", alt: "",
    notes: "", notesAr: ""
  },
  {
    name: "Egypt International Boat Show — 6th Edition",
    nameAr: "معرض مصر الدولي لليخوت والقوارب — الدورة السادسة",
    city: "North Coast", country: "Egypt",
    venue: "Marassi Marina Yacht Club, Emaar Misr",
    dates: "11–14 July 2024", edition: "6th edition · past",
    category: "egypt", attended: false,
    image: "", alt: "",
    notes: "The first waterfront edition, held at Marassi Marina on Egypt's North Coast.",
    notesAr: "أول دورة تُقام على الواجهة البحرية، في مارينا مراسي بالساحل الشمالي."
  },
  {
    name: "El Alamein International Yacht & Boat Show",
    nameAr: "معرض العلمين الدولي لليخوت والقوارب",
    city: "El Alamein", country: "Egypt",
    venue: "North Coast",
    dates: "Dates to be confirmed", edition: "",
    category: "egypt", attended: false,
    image: "", alt: "",
    notes: "Egypt's North Coast marine exhibition. Current edition dates to be confirmed with the organiser.",
    notesAr: "المعرض البحري بالساحل الشمالي المصري. تُؤكَّد مواعيد الدورة الحالية من الجهة المنظمة."
  },

  /* ------------------------------------------------------- MIDDLE EAST */
  {
    name: "Abu Dhabi International Boat Show",
    nameAr: "معرض أبوظبي الدولي للقوارب",
    city: "Abu Dhabi", country: "UAE",
    venue: "ADNEC",
    dates: "Annual", edition: "",
    category: "middle-east", attended: false,
    image: "https://images.pexels.com/photos/36893122/pexels-photo-36893122.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Luxury yachts berthed at a modern marina beneath high-rise towers",
    notes: "", notesAr: ""
  },
  {
    name: "Dubai International Boat Show",
    nameAr: "معرض دبي الدولي للقوارب",
    city: "Dubai", country: "UAE",
    venue: "Dubai Harbour",
    dates: "Annual", edition: "",
    category: "middle-east", attended: false,
    image: "", alt: "",
    notes: "", notesAr: ""
  },
  {
    name: "Dubai Pre-Owned Boat Show",
    nameAr: "معرض دبي للقوارب المستعملة",
    city: "Dubai", country: "UAE",
    venue: "Dubai Creek Marina, Park Hyatt",
    dates: "31 October – 2 November", edition: "11th edition",
    category: "middle-east", attended: false,
    image: "", alt: "",
    notes: "", notesAr: ""
  },
  {
    name: "Qatar Boat Show",
    nameAr: "معرض قطر للقوارب",
    city: "Doha", country: "Qatar",
    venue: "Old Doha Port",
    dates: "4–7 November 2026", edition: "3rd edition",
    category: "middle-east", attended: false,
    image: "", alt: "",
    notes: "The second edition drew over 27,000 visitors across four days, with 505 brands and 65 vessels from 105 countries.",
    notesAr: "استقطبت الدورة الثانية أكثر من 27,000 زائر على مدى أربعة أيام، بمشاركة 505 علامة تجارية و65 مركبة من 105 دول."
  },
  {
    name: "Kuwait Marine Show",
    nameAr: "معرض الكويت البحري",
    city: "Khiran", country: "Kuwait",
    venue: "Khiran Marina",
    dates: "28–31 January 2026", edition: "",
    category: "middle-east", attended: false,
    image: "", alt: "",
    notes: "Kuwait's first boat show in seven years.",
    notesAr: "أول معرض قوارب في الكويت منذ سبع سنوات."
  },

  /* ----------------------------------------------------- INTERNATIONAL */
  {
    name: "Monaco Yacht Show",
    nameAr: "معرض موناكو الدولي لليخوت",
    city: "Monaco", country: "Monaco",
    venue: "Port Hercules",
    dates: "23–26 September 2026", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/31371794/pexels-photo-31371794.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Luxury yachts docked in the marina at Monaco",
    notes: "The global superyacht benchmark — 560 exhibitors from 40 countries. Egypt's Ministry of Tourism has been a principal sponsor for two consecutive editions.",
    notesAr: "المرجع العالمي لليخوت الكبرى — 560 عارضًا من 40 دولة. وقد شاركت وزارة السياحة والآثار المصرية كأحد الرعاة الرئيسيين لدورتين متتاليتين."
  },
  {
    name: "Fort Lauderdale International Boat Show",
    nameAr: "معرض فورت لودرديل الدولي للقوارب",
    city: "Fort Lauderdale", country: "USA",
    venue: "Broward County Convention Center",
    dates: "28 October – 1 November 2026", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/15368387/pexels-photo-15368387.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Large motor yacht berthed at a Fort Lauderdale harbour",
    notes: "", notesAr: ""
  },
  {
    name: "METSTRADE",
    nameAr: "معرض ميتستريد للمعدات البحرية",
    city: "Amsterdam", country: "Netherlands",
    venue: "RAI Exhibition & Congress Centre",
    dates: "17–19 November 2026", edition: "",
    category: "international", attended: false,
    image: "", alt: "",
    notes: "The world's largest marine equipment trade exhibition — suppliers and technology rather than finished vessels.",
    notesAr: "أكبر معرض تجاري عالمي لمعدات الصناعة البحرية — موجّه للمورّدين والتقنيات لا للمركبات المكتملة."
  },
  {
    name: "Southampton International Boat Show",
    nameAr: "معرض ساوثهامبتون الدولي للقوارب",
    city: "Southampton", country: "UK",
    venue: "Mayflower Park",
    dates: "18–27 September 2026", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/9928839/pexels-photo-9928839.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Motor yachts moored at an English marina",
    notes: "", notesAr: ""
  },
  {
    name: "boot Düsseldorf",
    nameAr: "معرض دوسلدورف الدولي للقوارب والرياضات المائية",
    city: "Düsseldorf", country: "Germany",
    venue: "Messe Düsseldorf",
    dates: "23–31 January 2027", edition: "",
    category: "international", attended: false,
    image: "", alt: "",
    notes: "One of the largest indoor water sports and boating exhibitions in the world.",
    notesAr: "من أكبر معارض الرياضات المائية والقوارب المغلقة في العالم."
  },
  {
    name: "Cannes Yachting Festival",
    nameAr: "مهرجان كان لليخوت",
    city: "Cannes", country: "France",
    venue: "Vieux Port & Port Canto",
    dates: "Annual, September", edition: "",
    category: "international", attended: false,
    image: "", alt: "",
    notes: "", notesAr: ""
  },
  {
    name: "Genoa International Boat Show (Salone Nautico)",
    nameAr: "معرض جنوة الدولي للقوارب",
    city: "Genoa", country: "Italy",
    venue: "Waterfront di Levante",
    dates: "Annual, September", edition: "",
    category: "international", attended: false,
    image: "", alt: "",
    notes: "", notesAr: ""
  },
  {
    name: "Palm Beach International Boat Show",
    nameAr: "معرض بالم بيتش الدولي للقوارب",
    city: "West Palm Beach", country: "USA",
    venue: "",
    dates: "Annual, March", edition: "",
    category: "international", attended: false,
    image: "", alt: "",
    notes: "", notesAr: ""
  },
  {
    name: "Interboot",
    nameAr: "معرض إنتربوت الدولي للرياضات المائية",
    city: "Friedrichshafen", country: "Germany",
    venue: "Messe Friedrichshafen",
    dates: "Annual, September", edition: "",
    category: "international", attended: false,
    image: "", alt: "",
    notes: "", notesAr: ""
  },
  {
    name: "Korea International Boat Show (KIBS)",
    nameAr: "معرض كوريا الدولي للقوارب",
    city: "Goyang", country: "South Korea",
    venue: "KINTEX",
    dates: "6–8 March 2026", edition: "",
    category: "international", attended: false,
    image: "", alt: "",
    notes: "", notesAr: ""
  }
];

/* Page-language UI strings — this file is the EN page's own script. */
const UI = {
  empty: "No events in this category yet.",
  attending: "Attending",
  regions: { egypt: "Egypt", "middle-east": "Middle East", international: "International" }
};

const VALID_FILTERS = ["all", "egypt", "middle-east", "international"];

/* Escape anything interpolated into markup — data is authored, but this keeps
   a stray quote in a client-supplied string from breaking an attribute. */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------------------------------------------------------------- CARD RENDER */
function renderCards() {
  const grid = document.getElementById("exh-grid");
  if (!grid) return;

  grid.innerHTML = EXHIBITIONS.map((e, i) => {
    /* The "Attending" badge renders ONLY when attended === true. */
    const badge = e.attended
      ? `<span class="exh-attending"><i data-lucide="check"></i> ${esc(UI.attending)}</span>`
      : "";

    /* Only entries that carry their own image get a media panel — a card
       without one renders as a clean text card, never a reused photo. */
    const media = e.image
      ? `<div class="exh-media">
        <!-- PLACEHOLDER MEDIA — replace with real IMPERIS photography from these events -->
        <img src="${esc(e.image)}" alt="${esc(e.alt)}" loading="lazy" />
        ${badge}
      </div>`
      : "";

    const place = [e.city, e.country].filter(Boolean).join(", ");
    const meta = [
      place ? `<li><i data-lucide="map-pin"></i> ${esc(place)}</li>` : "",
      e.venue ? `<li><i data-lucide="building-2"></i> ${esc(e.venue)}</li>` : "",
      e.dates ? `<li><i data-lucide="calendar-days"></i> ${esc(e.dates)}</li>` : "",
      e.edition ? `<li><i data-lucide="hash"></i> ${esc(e.edition)}</li>` : ""
    ].join("");

    return `
    <article class="exh-card${e.image ? "" : " exh-card--text"}" data-category="${esc(e.category)}"
      data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
      ${media}
      <div class="exh-body">
        <span class="exh-tag exh-tag--${esc(e.category)}">${esc(UI.regions[e.category] || "")}</span>
        ${e.image ? "" : badge}
        <h3>${esc(e.name)}</h3>
        <ul class="exh-meta">${meta}</ul>
        ${e.notes ? `<p class="exh-note-line">${esc(e.notes)}</p>` : ""}
      </div>
    </article>`;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

/* ------------------------------------------------------------------- FILTER */
function applyFilter(filter, updateHash) {
  if (!VALID_FILTERS.includes(filter)) filter = "all";

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.filter === filter);
  });

  let visible = 0;
  document.querySelectorAll(".exh-card").forEach((card) => {
    const match = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("is-hidden", !match);
    if (match) visible++;
  });

  const empty = document.getElementById("exh-empty");
  if (empty) empty.hidden = visible !== 0;

  if (updateHash) {
    if (filter === "all") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    } else {
      history.replaceState(null, "", "#" + filter);
    }
  }
}

/* ------------------------------------------------------------------- INIT */
document.addEventListener("DOMContentLoaded", () => {
  renderCards();

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter, true));
  });

  // Initial filter from the URL hash, then keep it in sync.
  const initial = (window.location.hash || "").replace("#", "");
  applyFilter(VALID_FILTERS.includes(initial) ? initial : "all", false);
  window.addEventListener("hashchange", () => {
    const h = (window.location.hash || "").replace("#", "");
    applyFilter(VALID_FILTERS.includes(h) ? h : "all", false);
  });
});
