export interface ServiceDetailConfig {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  tagline: string;
  description: string;
  features: { title: string; desc: string; icon: string }[];
  formFields: {
    id: string;
    label: string;
    type: "text" | "select" | "date" | "number" | "textarea";
    options?: string[];
    placeholder?: string;
    required: boolean;
  }[];
}

export const serviceDetailsData: Record<string, ServiceDetailConfig> = {
  umrah: {
    id: "umrah",
    title: "باقات العمرة وزيارة الحرمين الشريفين",
    subtitle: "برامج معتمدة وخدمات VIP متكاملة لضيوف الرحمن",
    heroImage: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80",
    tagline: "رحلة إيمانية ميسرة بأعلى درجات الراحة والسكينة",
    description: "نقدم في سفرجيت أرقى برامج العمرة المعتمدة، مع حجز فنادق 5 نجوم مطلة مباشرة على الكعبة المشرفة والمسجد النبوي، وتنقلات خاصة بقطار الحرمين السريع أو سيارات VIP فارهة مع تسهيل كافة إجراءات التأشيرة والتصاريح.",
    features: [
      { title: "فنادق مطلة على الحرم", desc: "أقرب الفنادق لساحات الحرم المكي والنبوي الشريف", icon: "Building2" },
      { title: "تنقلات VIP خاصة", desc: "سيارات حديثة مع سائق أو قطار الحرمين الشريفين", icon: "Car" },
      { title: "إصدار التأشيرات والتصاريح", desc: "إنهاء كافة المعاملات الرسمية وتصاريح الروضة الشريفة", icon: "CheckCircle" },
      { title: "مرشد ديني وميداني", desc: "مرافقة وإرشاد لأداء المناسك وزيارة المزارات النبوية", icon: "Compass" },
    ],
    formFields: [
      { id: "hotelTier", label: "فئة الفندق والإقامة", type: "select", options: ["5 نجوم إطلالة مباشرة على الكعبة", "5 نجوم صف أول", "4 نجوم فاخر"], required: true },
      { id: "makkahNights", label: "عدد ليالي مكة المكرمة", type: "number", placeholder: "مثال: 4", required: true },
      { id: "madinahNights", label: "عدد ليالي المدينة المنورة", type: "number", placeholder: "مثال: 3", required: true },
      { id: "transportType", label: "نوع وسيلة النقل", type: "select", options: ["سيارة خاصة VIP (جمس / فان)", "قطار الحرمين درجة رجال أعمال", "حافلات سياحية حديثة"], required: true },
      { id: "pilgrimsCount", label: "عدد المعتمرين والزوار", type: "number", placeholder: "عدد الأفراد", required: true },
      { id: "specialRequests", label: "طلبات خاصة أو كراسي متحركة", type: "textarea", placeholder: "أي ملاحظات إضافية لراحتكم...", required: false },
    ],
  },

  "private-jets": {
    id: "private-jets",
    title: "استئجار الطائرات الخاصة الفاخرة",
    subtitle: "رفاهية مطلقة، خصوصية تامة، وجداول إقلاع مرنة لكبار الشخصيات",
    heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
    tagline: "حلّق بأسلوبك الخاص وفق جدولك الزمني دون أي انتظار",
    description: "أسطول طائرات خاصة حديث يلبي احتياجات رحلات رجال الأعمال والعائلات الكريمة. صالات طيران خاصة VIP، إجراءات سفر فورية، وأرقى خدمات الضيافة الجوية المخصصة حسب رغبتكم.",
    features: [
      { title: "أسطول متنوع وحديث", desc: "طائرات خفيفة، متوسطة، وطائرات فائقة المدى للرحلات القارية", icon: "Plane" },
      { title: "صالات إقلاع خاصة VIP", desc: "إنهاء إجراءات الجوازات والتفتيش في غضون 10 دقائق فقط", icon: "Sparkles" },
      { title: "ضيافة شيف عالمي", desc: "قوائم طعام فاخرة مُعدّة خصيصاً لذوقكم الشخصي", icon: "Gift" },
      { title: "خصوصية وسرية تامة", desc: "التزام كامل بأقصى درجات الخصوصية والأمان", icon: "ShieldCheck" },
    ],
    formFields: [
      { id: "jetCategory", label: "فئة الطائرة المطلوبة", type: "select", options: ["Light Jet (حتى 6 ركاب)", "Midsize Jet (حتى 9 ركاب)", "Heavy Jet (حتى 14 راكب)", "Ultra Long Range (عابرة للقارات)"], required: true },
      { id: "departureCity", label: "مدينة الإقلاع ومطار المغادرة", type: "text", placeholder: "مثال: الرياض - صالة الطيران الخاص", required: true },
      { id: "arrivalCity", label: "مدينة الوصول ومطار الهبوط", type: "text", placeholder: "مثال: باريس / نيس / جنيف", required: true },
      { id: "passengersCount", label: "عدد الركاب", type: "number", placeholder: "عدد المسافرين", required: true },
      { id: "departureDate", label: "تاريخ وساعة الإقلاع المفضلة", type: "date", required: true },
      { id: "cateringPrefs", label: "طلبات الضيافة الخاصة أو الخدمات الأرضية", type: "textarea", placeholder: "أي متطلبات للأطعمة، السيارات الخاصة عند المهبط...", required: false },
    ],
  },

  medical: {
    id: "medical",
    title: "السياحة العلاجية والاستشفاء الدولي",
    subtitle: "رحلات علاج ونقاهة آمنة بإشراف نخبة من المستشفيات العالمية",
    heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
    tagline: "صحتكم في أيدٍ أمينة مع أرقى المراكز الطبية في أوروبا وآسيا",
    description: "شراكات استراتيجية مع كبرى المشافي والمصحات في ألمانيا، التشيك، تركيا، النمسا، وسويسرا. نتولى دراسة التقارير الطبية، تأمين المواعيد مع كبار الاستشاريين، توفير مترجم طبي متخصص، وتجهيز إقامة فاخرة للمريض ومرافقيه.",
    features: [
      { title: "استشارة طبية أولية سريعة", desc: "عرض الملف الطبي على أطباء معتمدين لتحديد خطة العلاج", icon: "HeartPulse" },
      { title: "مترجم طبي مرافق", desc: "ترجمة دقيقة ومرافقة مستمرة في كافة جلسات العلاج", icon: "CheckCircle" },
      { title: "إقامة مريحة للمرافقين", desc: "شقق فندقية أو غرف مجاورة للمشفى بأعلى درجات الراحة", icon: "Building2" },
      { title: "برامج نقاهة واستجمام", desc: "منتجعات مياه كبريتية ومصحات استشفاء طبيعي بعد العلاج", icon: "Compass" },
    ],
    formFields: [
      { id: "medicalField", label: "التخصص الطبي المطلوب", type: "select", options: ["علاج وتأهيل عظام ومفاصل", "أمراض وجراحة القلب", "علاج وجراحة العيون", "الفحوصات الشاملة المتقدمة", "طب التجميل والجلدية", "مصحات الاستشفاء والعلاج الطبيعي"], required: true },
      { id: "targetCountry", label: "الدولة المفضلة للعلاج", type: "select", options: ["ألمانيا", "التشيك", "تركيا", "النمسا / سويسرا", "الهند"], required: true },
      { id: "companionsCount", label: "عدد المرافقين مع المريض", type: "number", placeholder: "مثال: 2", required: true },
      { id: "medicalCaseSummary", label: "نبذة عن الحالة الصحية للمريض", type: "textarea", placeholder: "ملخص التشخيص الحالي وأي ملاحظات مهمة...", required: true },
    ],
  },

  educational: {
    id: "educational",
    title: "السياحة التعليمية ومعسكرات اللغة الدولية",
    subtitle: "تطوير المهارات، معسكرات لغة صيفية، وقبولات جامعية عالمية",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    tagline: "استثمر في مستقبلك مع أفضل المعاهد والجامعات العالمية",
    description: "برامج تعليمية صيفية للأطفال والشباب، دورات لغة إنجليزية مكثفة للكبار في بريطانيا، أمريكا، كندا، وأيرلندا. نوفر قبولات رسمية موثوقة، تأمين السكن العائلي أو الطلابي الفاخر، ومتابعة دورية للطلاب.",
    features: [
      { title: "معاهد دولية معتمدة", desc: "معتمدة من المجلس الثقافي البريطاني وهيئات التعليم العالمية", icon: "GraduationCap" },
      { title: "خيارات سكن آمنة", desc: "إقامة مع عوائل مختارة بعناية أو سكن جامعي حديث", icon: "Building2" },
      { title: "أنشطة ورحلات أسبوعية", desc: "زيارات لأهم المعالم والمدن لتعزيز ممارسة اللغة", icon: "Compass" },
      { title: "استخراج تأشيرة الدراسة", desc: "فريق متخصص في تأشيرات الطلاب البريطانية والأمريكية", icon: "CheckCircle" },
    ],
    formFields: [
      { id: "studentAgeGroup", label: "الفئة العمرية للدارس", type: "select", options: ["يافعين وناشئين (12 - 17 سنة)", "شباب وبالغين (18 سنة فما فوق)"], required: true },
      { id: "studyCountry", label: "وجهة الدراسة المفضلة", type: "select", options: ["بريطانيا (لندن، أكسفورد، كامبردج)", "أمريكا", "أيرلندا (دبلن)", "كندا"], required: true },
      { id: "courseDuration", label: "مدة الدورة المطلوبة", type: "select", options: ["أسبوعين", "شهر (4 أسابيع)", "شهران (8 أسابيع)", "فصل دراسي كامل"], required: true },
      { id: "accommodationType", label: "نوع السكن المفضل", type: "select", options: ["مع عائلة بريطانية (شامل وجبتين)", "سكن طلابي خاص (غرفة بحمامها)"], required: true },
    ],
  },

  cruise: {
    id: "cruise",
    title: "رحلات الكروز والبواخر البحرية الفاخرة",
    subtitle: "استكشف عدة دول في رحلة واحدة على متن أفخم السفن العالمية",
    heroImage: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80",
    tagline: "منتجع عائم ينقلك من شاطئ إلى شاطئ في قمة الرفاهية",
    description: "استمتع بتجارب لا تضاهى على متن كبرى خطوط الكروز (MSC, Royal Caribbean). مطاعم عالمية مفتوحة، فعاليات ترفيهية حية، مسابح وسينما عائمة، وزيارات يومية لأجمل الموانئ في البحر الأحمر، البحر الأبيض المتوسط، والكاريبي.",
    features: [
      { title: "كل شيء مشمول", desc: "وجبات فاخرة على مدار اليوم وعروض مسرحية وترفيهية مجانية", icon: "Gift" },
      { title: "كبائن وأجنحة فاخرة", desc: "كبائن بشرفات خاصة تطل على البحر وأجنحة رويال حصرية", icon: "Building2" },
      { title: "جولات في كل ميناء", desc: "رحلات سياحية منظمة لاكتشاف كل مدينة ترسو فيها السفينة", icon: "Compass" },
      { title: "أنشطة عائلية للكبار والصغار", desc: "ألعاب مائية ونوادي خاصة للأطفال بأمان كامل", icon: "Sparkles" },
    ],
    formFields: [
      { id: "cruiseRegion", label: "مسار الإبحار المفضل", type: "select", options: ["البحر الأحمر والخليج العربي", "غرب البحر الأبيض المتوسط (إسبانيا، إيطاليا، فرنسا)", "الجزر اليونانية وتركيا", "الكاريبي وجزر البهاما", "المضايق النرويجية الشمالية"], required: true },
      { id: "cabinCategory", label: "نوع الكابينة المطلوبة", type: "select", options: ["كابينة مع شرفة خاصة مطلة على البحر (Balcony)", "جناح VIP رويال (Yacht Club Suite)", "كابينة خارجية بنافذة بحرية", "كابينة داخلية اقتصادية"], required: true },
      { id: "guestsCount", label: "عدد المسافرين", type: "number", placeholder: "عدد الأفراد الكلي", required: true },
      { id: "travelMonth", label: "شهر السفر المفضل", type: "select", options: ["خلال الشهرين القادمين", "موسم الصيف", "موسم الشتاء والربيع"], required: true },
    ],
  },

  "saudi-tourism": {
    id: "saudi-tourism",
    title: "اكتشف السعودية - تجارب أصيلة في قلب المملكة",
    subtitle: "من عجائب مدائن صالح في العلا إلى شواطئ البحر الأحمر وضباب عسير",
    heroImage: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1600&q=80",
    tagline: "أرض التاريخ والحضارات تنبض بتجارب سياحية عالمية",
    description: "نصمم لك أجمل البرامج لاستكشاف أرض المملكة: تجربة سحر العلا ومخيماتها الفاخرة، الاسترخاء في منتجعات البحر الأحمر ووجهة أمالا، رحلات جبلية في أبها والجنوب، وجولات تاريخية في الدرعية وجدة البلد مع مرشدين وطنيين معتمدين.",
    features: [
      { title: "مرشدون سياحيون مرخصون", desc: "إرشاد احترافي ومعلومات تاريخية وتراثية موثوقة", icon: "Compass" },
      { title: "منتجعات ومخيمات 5 نجوم", desc: "أرقى فنادق ومنتجعات العلا والبحر الأحمر والدرعية", icon: "Building2" },
      { title: "سيارات دفع رباعي خاصة", desc: "تنقلات مريحة مع سائقين على دراية تامة بتضاريس المملكة", icon: "Car" },
      { title: "تجارب تراث ومغامرات", desc: "سفاري صحراوي، مناطيد، عشاء تحت نجوم العلا", icon: "Sparkles" },
    ],
    formFields: [
      { id: "saudiDest", label: "الوجهة المطلوبة داخل المملكة", type: "select", options: ["العلا (مخيمات فاخرة ومعالم الحجر)", "وجهات البحر الأحمر وأمالا", "عسير وأبها (طبيعة وأجواء باردة)", "الرياض والدرعية التاريخية", "جدة التاريخية والبحر"], required: true },
      { id: "tripDuration", label: "مدة الرحلة بالأيام", type: "number", placeholder: "مثال: 3 أو 4 أيام", required: true },
      { id: "travelersCount", label: "عدد الأشخاص", type: "number", placeholder: "أفراد العائلة أو الأصدقاء", required: true },
      { id: "specialInterests", label: "اهتمامات خاصة (مغامرة، استرخاء، ثقافة وتراث)", type: "textarea", placeholder: "أخبرنا بالأنشطة التي تفضلها في رحلتك...", required: false },
    ],
  },
};
