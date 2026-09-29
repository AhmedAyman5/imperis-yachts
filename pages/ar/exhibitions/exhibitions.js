/* =========================================================================
   المعارض والفعاليات — سكربت الصفحة (exhibitions.js)
   يبني أجندة المعارض من مصفوفة بيانات، ويتولى التصفية حسب المنطقة (مع مزامنة
   وسم الرابط في URL) وحالة القائمة الفارغة. بلا مكتبات — جافاسكربت خالصة.
   شريط التنقل والفوتر وأيقونات Lucide ومكتبة AOS تُهيّأ عبر السكربتات المشتركة
   والقالب في exhibitions.html.
   ========================================================================= */

/* CONFIRM WITH CLIENT: mark which of these events IMPERIS has actually attended,
   exhibited at, or plans to attend. Until confirmed, all entries render as
   industry calendar listings, NOT as claimed participation. */

/* CONFIRM WITH CLIENT: verify all dates and venues before launch — exhibition
   schedules change. Several entries need current-edition dates confirmed with
   the organiser. */

/* كل قيمة `image` أدناه رابط خارجي مؤقت — راجع §12.6.
   PLACEHOLDER MEDIA — replace with real IMPERIS photography from these events.
   المدخلات بلا صورة تُعرض كبطاقات نصية عن قصد — لا تُملأ أبدًا بصورة مكررة. */
const EXHIBITIONS = [
  /* ------------------------------------------------------------- مصر */
  {
    name: "Egypt International Boat Show (EIBS)",
    nameAr: "معرض مصر الدولي لليخوت والقوارب",
    city: "القاهرة", country: "مصر",
    venue: "مركز القاهرة الدولي للمؤتمرات (CICC)",
    dates: "14–17 يناير 2027", edition: "الدورة التاسعة",
    category: "egypt", attended: false,
    image: "https://images.pexels.com/photos/42092/pexels-photo-42092.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "صفوف من اليخوت معروضة في مارينا تحت سماء صافية",
    notes: "Egypt's only dedicated marine industry exhibition. The 2026 edition drew over 70 companies showing more than 140 international and local brands.",
    notesAr: "المعرض المتخصص الوحيد في الصناعات البحرية داخل مصر. شهدت دورة 2026 مشاركة أكثر من 70 شركة وجهة بعرض ما يزيد على 140 علامة تجارية عالمية ومحلية."
  },
  {
    name: "Egypt International Boat Show — 8th Edition",
    nameAr: "معرض مصر الدولي لليخوت والقوارب — الدورة الثامنة",
    city: "القاهرة", country: "مصر",
    venue: "مركز القاهرة الدولي للمؤتمرات (CICC)",
    dates: "5–8 فبراير 2026", edition: "الدورة الثامنة · سابقة",
    category: "egypt", attended: false,
    image: "https://images.pexels.com/photos/42091/pexels-photo-42091.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "صفوف من اليخوت راسية جنبًا إلى جنب في مارينا تحت سماء زرقاء صافية",
    notes: "Opened by the Deputy Prime Minister for Industrial Development, with locally manufactured boats and yachts a central theme.",
    notesAr: "افتُتحت بحضور نائب رئيس مجلس الوزراء للتنمية الصناعية، وكانت القوارب واليخوت المصنّعة محليًا محورًا رئيسيًا فيها."
  },
  {
    name: "Egypt International Boat Show — 7th Edition",
    nameAr: "معرض مصر الدولي لليخوت والقوارب — الدورة السابعة",
    city: "القاهرة", country: "مصر",
    venue: "مركز القاهرة الدولي للمؤتمرات (CICC)",
    dates: "6–9 فبراير 2025", edition: "الدورة السابعة · سابقة",
    category: "egypt", attended: false,
    image: "https://images.pexels.com/photos/27951598/pexels-photo-27951598.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخت أبيض أنيق بمحرك راسٍ عند الرصيف في ضوء أصيل دافئ",
    notes: "", notesAr: ""
  },
  {
    name: "Egypt International Boat Show — 6th Edition",
    nameAr: "معرض مصر الدولي لليخوت والقوارب — الدورة السادسة",
    city: "الساحل الشمالي", country: "مصر",
    venue: "نادي مارينا مراسي لليخوت، إعمار مصر",
    dates: "11–14 يوليو 2024", edition: "الدورة السادسة · سابقة",
    category: "egypt", attended: false,
    image: "https://images.pexels.com/photos/38726978/pexels-photo-38726978.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخوت فاخرة راسية في خليج محمي على مياه زرقاء صافية تحت سماء مفتوحة",
    notes: "The first waterfront edition, held at Marassi Marina on Egypt's North Coast.",
    notesAr: "أول دورة تُقام على الواجهة البحرية، في مارينا مراسي بالساحل الشمالي."
  },
  {
    name: "El Alamein International Yacht & Boat Show",
    nameAr: "معرض العلمين الدولي لليخوت والقوارب",
    city: "العلمين", country: "مصر",
    venue: "الساحل الشمالي",
    dates: "المواعيد قيد التأكيد", edition: "",
    category: "egypt", attended: false,
    image: "https://images.pexels.com/photos/39076874/pexels-photo-39076874.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخت فاخر راسٍ في ميناء متوسطي تغمره الشمس",
    notes: "Egypt's North Coast marine exhibition. Current edition dates to be confirmed with the organiser.",
    notesAr: "المعرض البحري بالساحل الشمالي المصري. تُؤكَّد مواعيد الدورة الحالية من الجهة المنظمة."
  },

  /* ------------------------------------------------------- الشرق الأوسط */
  {
    name: "Abu Dhabi International Boat Show",
    nameAr: "معرض أبوظبي الدولي للقوارب",
    city: "أبوظبي", country: "الإمارات",
    venue: "أدنيك (ADNEC)",
    dates: "سنويًا", edition: "",
    category: "middle-east", attended: false,
    image: "https://images.pexels.com/photos/36893122/pexels-photo-36893122.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخوت فاخرة راسية في مارينا حديثة أسفل أبراج شاهقة",
    notes: "", notesAr: ""
  },
  {
    name: "Dubai International Boat Show",
    nameAr: "معرض دبي الدولي للقوارب",
    city: "دبي", country: "الإمارات",
    venue: "ميناء دبي (Dubai Harbour)",
    dates: "سنويًا", edition: "",
    category: "middle-east", attended: false,
    image: "https://images.pexels.com/photos/31714607/pexels-photo-31714607.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "منظر جوي ليخت أبيض بمحرك يشق مياه المحيط الفيروزية",
    notes: "", notesAr: ""
  },
  {
    name: "Dubai Pre-Owned Boat Show",
    nameAr: "معرض دبي للقوارب المستعملة",
    city: "دبي", country: "الإمارات",
    venue: "مارينا خور دبي، بارك حياة",
    dates: "31 أكتوبر – 2 نوفمبر", edition: "الدورة الحادية عشرة",
    category: "middle-east", attended: false,
    image: "https://images.pexels.com/photos/5996373/pexels-photo-5996373.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "منظر جوي ليخوت بمحرك ومركبة شراعية في عرض البحر",
    notes: "", notesAr: ""
  },
  {
    name: "Qatar Boat Show",
    nameAr: "معرض قطر للقوارب",
    city: "الدوحة", country: "قطر",
    venue: "ميناء الدوحة القديم",
    dates: "4–7 نوفمبر 2026", edition: "الدورة الثالثة",
    category: "middle-east", attended: false,
    image: "https://images.pexels.com/photos/8356437/pexels-photo-8356437.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "منظر أمامي من مقدمة يخت فاخر على مياه هادئة",
    notes: "The second edition drew over 27,000 visitors across four days, with 505 brands and 65 vessels from 105 countries.",
    notesAr: "استقطبت الدورة الثانية أكثر من 27,000 زائر على مدى أربعة أيام، بمشاركة 505 علامة تجارية و65 مركبة من 105 دول."
  },
  {
    name: "Kuwait Marine Show",
    nameAr: "معرض الكويت البحري",
    city: "الخيران", country: "الكويت",
    venue: "مارينا الخيران",
    dates: "28–31 يناير 2026", edition: "",
    category: "middle-east", attended: false,
    image: "https://images.pexels.com/photos/8299833/pexels-photo-8299833.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "منظر جوي ليخت فاخر راسٍ قرب ساحل صخري",
    notes: "Kuwait's first boat show in seven years.",
    notesAr: "أول معرض قوارب في الكويت منذ سبع سنوات."
  },

  /* ----------------------------------------------------- دولي */
  {
    name: "Monaco Yacht Show",
    nameAr: "معرض موناكو الدولي لليخوت",
    city: "موناكو", country: "موناكو",
    venue: "ميناء هرقل (Port Hercules)",
    dates: "23–26 سبتمبر 2026", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/31371794/pexels-photo-31371794.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخوت فاخرة راسية في مارينا موناكو",
    notes: "The global superyacht benchmark — 560 exhibitors from 40 countries. Egypt's Ministry of Tourism has been a principal sponsor for two consecutive editions.",
    notesAr: "المرجع العالمي لليخوت الكبرى — 560 عارضًا من 40 دولة. وقد شاركت وزارة السياحة والآثار المصرية كأحد الرعاة الرئيسيين لدورتين متتاليتين."
  },
  {
    name: "Fort Lauderdale International Boat Show",
    nameAr: "معرض فورت لودرديل الدولي للقوارب",
    city: "فورت لودرديل", country: "الولايات المتحدة",
    venue: "مركز مؤتمرات مقاطعة بروارد",
    dates: "28 أكتوبر – 1 نوفمبر 2026", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/15368387/pexels-photo-15368387.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخت كبير بمحرك راسٍ في ميناء فورت لودرديل",
    notes: "", notesAr: ""
  },
  {
    name: "METSTRADE",
    nameAr: "معرض ميتستريد للمعدات البحرية",
    city: "أمستردام", country: "هولندا",
    venue: "مركز RAI للمعارض والمؤتمرات",
    dates: "17–19 نوفمبر 2026", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/36803733/pexels-photo-36803733.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخوت ومركبات كبيرة على مياه مفتوحة تحيط بها الجبال",
    notes: "The world's largest marine equipment trade exhibition — suppliers and technology rather than finished vessels.",
    notesAr: "أكبر معرض تجاري عالمي لمعدات الصناعة البحرية — موجّه للمورّدين والتقنيات لا للمركبات المكتملة."
  },
  {
    name: "Southampton International Boat Show",
    nameAr: "معرض ساوثهامبتون الدولي للقوارب",
    city: "ساوثهامبتون", country: "المملكة المتحدة",
    venue: "حديقة مايفلاور",
    dates: "18–27 سبتمبر 2026", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/9928839/pexels-photo-9928839.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخوت بمحرك راسية في مارينا إنجليزية",
    notes: "", notesAr: ""
  },
  {
    name: "boot Düsseldorf",
    nameAr: "معرض دوسلدورف الدولي للقوارب والرياضات المائية",
    city: "دوسلدورف", country: "ألمانيا",
    venue: "مركز معارض دوسلدورف",
    dates: "23–31 يناير 2027", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/37385664/pexels-photo-37385664.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخوت فاخرة راسية على امتداد ميناء أوروبي، بالأبيض والأسود",
    notes: "One of the largest indoor water sports and boating exhibitions in the world.",
    notesAr: "من أكبر معارض الرياضات المائية والقوارب المغلقة في العالم."
  },
  {
    name: "Cannes Yachting Festival",
    nameAr: "مهرجان كان لليخوت",
    city: "كان", country: "فرنسا",
    venue: "الميناء القديم وميناء كانتو",
    dates: "سنويًا، سبتمبر", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/31758539/pexels-photo-31758539.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخت فاخر راسٍ أمام عمارة الواجهة البحرية على الريفييرا",
    notes: "", notesAr: ""
  },
  {
    name: "Genoa International Boat Show (Salone Nautico)",
    nameAr: "معرض جنوة الدولي للقوارب",
    city: "جنوة", country: "إيطاليا",
    venue: "واجهة ليفانتي البحرية",
    dates: "سنويًا، سبتمبر", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/13348226/pexels-photo-13348226.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخت داكن الهيكل يبحر في مياه ساحلية إيطالية",
    notes: "", notesAr: ""
  },
  {
    name: "Palm Beach International Boat Show",
    nameAr: "معرض بالم بيتش الدولي للقوارب",
    city: "ويست بالم بيتش", country: "الولايات المتحدة",
    venue: "",
    dates: "سنويًا، مارس", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/31383441/pexels-photo-31383441.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخوت أنيقة بمحرك راسية معًا في ميناء محمي",
    notes: "", notesAr: ""
  },
  {
    name: "Interboot",
    nameAr: "معرض إنتربوت الدولي للرياضات المائية",
    city: "فريدريشسهافن", country: "ألمانيا",
    venue: "مركز معارض فريدريشسهافن",
    dates: "سنويًا، سبتمبر", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/18649940/pexels-photo-18649940.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخت بمحرك عند رصيف إرساء، بالأبيض والأسود",
    notes: "", notesAr: ""
  },
  {
    name: "Korea International Boat Show (KIBS)",
    nameAr: "معرض كوريا الدولي للقوارب",
    city: "غويانغ", country: "كوريا الجنوبية",
    venue: "كينتكس (KINTEX)",
    dates: "6–8 مارس 2026", edition: "",
    category: "international", attended: false,
    image: "https://images.pexels.com/photos/38695253/pexels-photo-38695253.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "يخوت فاخرة تصطف على رصيف ميناء، بالأبيض والأسود",
    notes: "", notesAr: ""
  }
];

/* نصوص واجهة الصفحة — هذا الملف خاص بالنسخة العربية. */
const UI = {
  empty: "لا توجد فعاليات في هذه الفئة بعد.",
  attending: "سنشارك",
  regions: { egypt: "مصر", "middle-east": "الشرق الأوسط", international: "دولي" }
};

const VALID_FILTERS = ["all", "egypt", "middle-east", "international"];

/* تهريب أي قيمة تُدرج داخل الماركب — البيانات مكتوبة يدويًا، لكن هذا يمنع
   علامة اقتباس عارضة في نص يورّده العميل من كسر إحدى السمات. */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------------------------------------------------------------- بناء البطاقات */
function renderCards() {
  const grid = document.getElementById("exh-grid");
  if (!grid) return;

  grid.innerHTML = EXHIBITIONS.map((e, i) => {
    /* شارة "سنشارك" تظهر فقط عندما تكون attended === true. */
    const badge = e.attended
      ? `<span class="exh-attending"><i data-lucide="check"></i> ${esc(UI.attending)}</span>`
      : "";

    /* المدخلات التي تحمل صورتها الخاصة فقط هي التي تحصل على لوحة وسائط —
       والبطاقة بلا صورة تُعرض كبطاقة نصية نظيفة، لا بصورة مُعادة. */
    const media = e.image
      ? `<div class="exh-media">
        <!-- PLACEHOLDER MEDIA — replace with real IMPERIS photography from these events -->
        <img src="${esc(e.image)}" alt="${esc(e.alt)}" loading="lazy" />
        ${badge}
      </div>`
      : "";

    const place = [e.city, e.country].filter(Boolean).join("، ");
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
        <h3>${esc(e.nameAr)}</h3>
        <ul class="exh-meta">${meta}</ul>
        ${e.notesAr ? `<p class="exh-note-line">${esc(e.notesAr)}</p>` : ""}
      </div>
    </article>`;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

/* ------------------------------------------------------------------- التصفية */
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

/* ------------------------------------------------------------------- التهيئة */
document.addEventListener("DOMContentLoaded", () => {
  renderCards();

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter, true));
  });

  // التصفية الأولية من وسم الرابط، ثم إبقاؤها متزامنة معه.
  const initial = (window.location.hash || "").replace("#", "");
  applyFilter(VALID_FILTERS.includes(initial) ? initial : "all", false);
  window.addEventListener("hashchange", () => {
    const h = (window.location.hash || "").replace("#", "");
    applyFilter(VALID_FILTERS.includes(h) ? h : "all", false);
  });
});
