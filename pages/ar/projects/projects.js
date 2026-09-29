/* =========================================================================
   المشروعات والأسطول — سكربت الصفحة (projects.js)
   يبني شبكة الأسطول من مصفوفة بيانات، ويتولى الترشيح (مع مزامنة هاش الرابط)،
   ونافذة المواصفات الكاملة، والتحقق من صحة النموذج في المتصفح.
   بدون مكتبات — جافاسكربت خالص. القائمة والتذييل وأيقونات Lucide و AOS تأتي
   من السكربتات المشتركة والقالب.
   ========================================================================= */

/* CONFIRM WITH CLIENT: جميع أسماء المشروعات والسنوات والمواصفات أدناه عناصر
   نائبة. استبدلها بسجلات أسطول إمبريس الحقيقية قبل الإطلاق.
   كل صورة رابط خارجي نائب — راجع §12.6.
   PLACEHOLDER MEDIA — replace with real IMPERIS photography/footage. */
const PROJECTS = [
  {
    name: "Azure Horizon", year: "2023", category: "delivered", status: "تم التسليم", badge: "primary",
    type: "يخت محرك فاخر", length: "38 م",
    image: "https://images.pexels.com/photos/15883432/pexels-photo-15883432.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "يخت محرك فاخر راسٍ عند الغروب أمام أفق ساحلي",
    spec: {
      beam: "7.8 م", draft: "2.1 م", displacement: "295 طن",
      hullMaterial: "فولاذ", superstructure: "ألمنيوم", engines: "2 × 1,900 حصان", generators: "2 × 80 ك.و",
      propulsion: "عمودان", cruisingSpeed: "12 عقدة", maxSpeed: "16 عقدة", range: "3,200 ميل بحري",
      guests: "10", crew: "6", cabins: "5",
      navalArchitecture: "تصميم إمبريس", exteriorDesign: "تصميم إمبريس", interiorDesign: "تشطيبات إمبريس",
      classification: "", flag: "مصر"
    }
  },
  {
    name: "Suez Serene", year: "2022", category: "delivered", status: "تم التسليم", badge: "primary",
    type: "يخت شراعي", length: "27 م",
    image: "https://images.pexels.com/photos/33748549/pexels-photo-33748549.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "يخت شراعي راسٍ قرب بلدة ساحلية متوسطية",
    spec: {
      beam: "6.4 م", draft: "3.2 م", displacement: "120 طن",
      hullMaterial: "كمبوزيت", superstructure: "كمبوزيت", engines: "1 × 320 حصان", generators: "1 × 40 ك.و",
      propulsion: "عمود واحد + شراع", cruisingSpeed: "9 عقدة", maxSpeed: "12 عقدة", range: "2,400 ميل بحري",
      guests: "8", crew: "4", cabins: "4",
      navalArchitecture: "تصميم إمبريس", exteriorDesign: "تصميم إمبريس", interiorDesign: "",
      classification: "", flag: "مصر"
    }
  },
  {
    name: "Meridian 38", year: "2024", category: "delivered", status: "تم التسليم", badge: "primary",
    type: "يخت محرك", length: "34 م",
    image: "https://images.pexels.com/photos/38495693/pexels-photo-38495693.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "يخت محرك فاخر راسٍ على مياه زرقاء صافية",
    spec: {
      beam: "7.2 م", draft: "1.9 م", displacement: "240 طن",
      hullMaterial: "فولاذ", superstructure: "ألمنيوم", engines: "2 × 1,600 حصان", generators: "2 × 65 ك.و",
      propulsion: "عمودان", cruisingSpeed: "11 عقدة", maxSpeed: "15 عقدة", range: "2,800 ميل بحري",
      guests: "9", crew: "5", cabins: "4",
      navalArchitecture: "تصميم إمبريس", exteriorDesign: "تصميم إمبريس", interiorDesign: "تشطيبات إمبريس",
      classification: "", flag: ""
    }
  },
  {
    name: "Hull 214", year: "2025 (تقديري)", category: "under-construction", status: "قيد الإنشاء", badge: "accent",
    type: "يخت استكشافي", length: "45 م",
    image: "https://images.pexels.com/photos/34962452/pexels-photo-34962452.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "هيكل يخت مرفوع بونش الترسانة أمام سماء صافية",
    spec: {
      beam: "9.0 م", draft: "2.6 م", displacement: "480 طن",
      hullMaterial: "فولاذ", superstructure: "ألمنيوم", engines: "2 × 1,000 حصان", generators: "2 × 90 ك.و",
      propulsion: "عمودان", cruisingSpeed: "10 عقدة", maxSpeed: "13 عقدة", range: "5,000 ميل بحري",
      guests: "12", crew: "8", cabins: "6",
      navalArchitecture: "تصميم إمبريس", exteriorDesign: "تصميم إمبريس", interiorDesign: "",
      classification: "", flag: ""
    }
  },
  {
    name: "Explorer NX", year: "2025 (تقديري)", category: "under-construction", status: "قيد الإنشاء", badge: "accent",
    type: "يخت استكشافي", length: "52 م",
    image: "https://images.pexels.com/photos/31946424/pexels-photo-31946424.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "يخت كبير قيد الإنشاء على رصيف الترسانة",
    spec: {
      beam: "9.8 م", draft: "2.9 م", displacement: "650 طن",
      hullMaterial: "فولاذ", superstructure: "ألمنيوم", engines: "2 × 1,300 حصان", generators: "3 × 100 ك.و",
      propulsion: "عمودان", cruisingSpeed: "11 عقدة", maxSpeed: "14 عقدة", range: "6,000 ميل بحري",
      guests: "14", crew: "10", cabins: "7",
      navalArchitecture: "تصميم إمبريس", exteriorDesign: "", interiorDesign: "",
      classification: "", flag: ""
    }
  },
  {
    name: "Concept Apex", year: "يُحدَّد لاحقًا", category: "concepts", status: "مفهوم", badge: "accent",
    type: "مفهوم يخت خارق", length: "60 م",
    image: "https://images.pexels.com/photos/13385972/pexels-photo-13385972.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "منظر جوي ليخت خارق أبيض يبحر في المحيط المفتوح",
    spec: {
      beam: "10.5 م", draft: "3.0 م", displacement: "",
      hullMaterial: "فولاذ", superstructure: "ألمنيوم", engines: "", generators: "",
      propulsion: "هجين (دراسة)", cruisingSpeed: "", maxSpeed: "", range: "",
      guests: "12", crew: "12", cabins: "6",
      navalArchitecture: "تصميم إمبريس", exteriorDesign: "تصميم إمبريس", interiorDesign: "",
      classification: "", flag: ""
    }
  },
  {
    name: "Bluewater Refit", year: "2023", category: "refit", status: "تجديد", badge: "accent",
    type: "تجديد يخت محرك", length: "40 م",
    image: "https://images.pexels.com/photos/17144338/pexels-photo-17144338.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "مركبات في حوض جاف أثناء أعمال التجديد والصيانة",
    spec: {
      beam: "8.0 م", draft: "2.3 م", displacement: "320 طن",
      hullMaterial: "فولاذ", superstructure: "ألمنيوم", engines: "إعادة تزويد: 2 × 1,400 حصان", generators: "2 × 70 ك.و",
      propulsion: "عمودان", cruisingSpeed: "11 عقدة", maxSpeed: "14 عقدة", range: "3,000 ميل بحري",
      guests: "10", crew: "6", cabins: "5",
      navalArchitecture: "—", exteriorDesign: "الباني الأصلي", interiorDesign: "تشطيبات إمبريس",
      classification: "", flag: ""
    }
  },
  {
    name: "RSC Passenger 120", year: "2022", category: "commercial", status: "تجاري", badge: "primary",
    type: "وحدة نقل ركاب", length: "32 م",
    image: "https://images.pexels.com/photos/37476511/pexels-photo-37476511.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "عبّارة ركاب كبيرة أثناء إبحارها على مياه هادئة",
    spec: {
      beam: "8.5 م", draft: "1.8 م", displacement: "210 طن",
      hullMaterial: "ألمنيوم", superstructure: "ألمنيوم", engines: "2 × 1,100 حصان", generators: "2 × 55 ك.و",
      propulsion: "نفاثتان مائيتان", cruisingSpeed: "22 عقدة", maxSpeed: "27 عقدة", range: "600 ميل بحري",
      guests: "120 راكبًا", crew: "6", cabins: "—",
      navalArchitecture: "تصميم إمبريس", exteriorDesign: "تصميم إمبريس", interiorDesign: "تشطيبات إمبريس",
      classification: "", flag: "مصر"
    }
  },
  {
    name: "Coastal Runner", year: "2024", category: "commercial", status: "تجاري", badge: "primary",
    type: "قارب طاقم/خدمة", length: "24 م",
    image: "https://images.pexels.com/photos/30665916/pexels-photo-30665916.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "مركبة ركاب تجارية تبحر في مياه ساحلية",
    spec: {
      beam: "6.8 م", draft: "1.5 م", displacement: "95 طن",
      hullMaterial: "ألمنيوم", superstructure: "ألمنيوم", engines: "2 × 900 حصان", generators: "1 × 40 ك.و",
      propulsion: "عمودان", cruisingSpeed: "20 عقدة", maxSpeed: "26 عقدة", range: "500 ميل بحري",
      guests: "40 راكبًا", crew: "4", cabins: "—",
      navalArchitecture: "تصميم إمبريس", exteriorDesign: "تصميم إمبريس", interiorDesign: "",
      classification: "", flag: ""
    }
  }
];

const SPEC_GROUPS = [
  {
    title: "المركبة",
    fields: [
      ["name", "اسم المشروع"], ["year", "السنة"], ["status", "الحالة"], ["type", "النوع"],
      ["length", "الطول"], ["beam", "العرض"], ["draft", "الغاطس"], ["displacement", "الإزاحة"]
    ]
  },
  {
    title: "الإنشاء والمعدات",
    fields: [
      ["hullMaterial", "مادة الهيكل"], ["superstructure", "البناء العلوي"], ["engines", "المحركات"],
      ["generators", "المولدات"], ["propulsion", "نظام الدفع"], ["cruisingSpeed", "سرعة الإبحار"],
      ["maxSpeed", "السرعة القصوى"], ["range", "المدى"]
    ]
  },
  {
    title: "الإقامة والاعتمادات",
    fields: [
      ["guests", "عدد الضيوف"], ["crew", "الطاقم"], ["cabins", "الكبائن"], ["navalArchitecture", "الهندسة البحرية"],
      ["exteriorDesign", "التصميم الخارجي"], ["interiorDesign", "التصميم الداخلي"],
      ["classification", "التصنيف"], ["flag", "العلم"]
    ]
  }
];

const UI = {
  empty: "لا توجد مشروعات في هذه الفئة بعد — المزيد قريبًا.",
  viewSpec: "عرض المواصفات الكاملة",
  photos: "صور",
  videos: "فيديوهات",
  galleryNote: "سيوفّر العميل معارض الصور والفيديو الكاملة لكل مشروع.",
  close: "إغلاق المواصفات"
};

const VALID_FILTERS = ["all", "delivered", "under-construction", "concepts", "refit", "commercial"];
const DASH = "—";

function fieldValue(project, key) {
  let v = project[key];
  if (v === undefined) v = project.spec ? project.spec[key] : undefined;
  return v === undefined || v === null || String(v).trim() === "" ? DASH : v;
}

/* ---------------------------------------------------------------- بناء البطاقات */
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

/* ------------------------------------------------------------------- الترشيح */
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

/* --------------------------------------------------------------- نافذة المواصفات */
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

/* --------------------------------------------------------------- النموذج (ثابت) */
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

    // لا يوجد خادم على هذا الموقع الثابت — نعرض رسالة نجاح + رابط بريد بديل.
    const data = new FormData(form);
    const subject = encodeURIComponent("طلب ملف الأعمال — " + (data.get("name") || ""));
    const bodyLines = [
      "الاسم: " + (data.get("name") || ""),
      "البريد الإلكتروني: " + (data.get("email") || ""),
      "الشركة: " + (data.get("company") || ""),
      "نوع المشروع: " + (data.get("interest") || ""),
      "الرسالة: " + (data.get("message") || "")
    ].join("\n");
    const mailto = "mailto:sales@imperisyachts.com?subject=" + subject + "&body=" + encodeURIComponent(bodyLines);

    if (success) {
      success.innerHTML = 'شكرًا — طلبك جاهز للإرسال. <a href="' + mailto + '">افتحه في تطبيق بريدك</a> لإتمامه.';
      success.hidden = false;
      success.focus();
    }
    form.hidden = true;
  });

  form.querySelectorAll("[required]").forEach((field) => {
    field.addEventListener("input", () => field.classList.remove("is-invalid"));
  });
}

/* ------------------------------------------------------------------- التهيئة */
document.addEventListener("DOMContentLoaded", () => {
  renderCards();

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter, true));
  });

  const initial = (window.location.hash || "").replace("#", "");
  applyFilter(VALID_FILTERS.includes(initial) ? initial : "all", false);
  window.addEventListener("hashchange", () => {
    const h = (window.location.hash || "").replace("#", "");
    applyFilter(VALID_FILTERS.includes(h) ? h : "all", false);
  });

  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open-spec]");
    if (opener) { openSpec(parseInt(opener.dataset.openSpec, 10)); return; }
    if (e.target.closest("[data-close-spec]") || e.target.classList.contains("spec-backdrop")) closeSpec();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSpec(); });

  initForm();
});
