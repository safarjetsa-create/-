"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/siteConfig";
import {
  Sparkles,
  MapPin,
  Calendar,
  Star,
  CheckCircle,
  MessageSquare,
  Search,
  Filter,
  ArrowRight,
  Send,
  X,
  CreditCard,
} from "lucide-react";

interface PackageCardData {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  category: "شهر عسل VIP" | "رحلات عائلية" | "مغامرات واستكشاف" | "باقات شتوية";
  image: string;
  badge: string;
  inclusions: string[];
  description: string;
}

import { useSearchParams } from "next/navigation";

const initialPackagesList: PackageCardData[] = [
  {
    id: "pkg-maldives",
    title: "سحر جزر المالديف الملكي - فلل مائية مع مسبح خاص",
    destination: "جزر المالديف",
    duration: "6 أيام / 5 ليالي",
    price: 14500,
    originalPrice: 17900,
    category: "شهر عسل VIP",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
      badge: "الأكثر طلباً",
      inclusions: [
        "فيلا مائية فاخرة مع مسبح خاص",
        "شامل جميع الوجبات (All-Inclusive)",
        "نقل ذهاب وعودة بالطيارة المائية السريعة",
        "عشاء رومانسي خاص على الشاطئ",
      ],
      description: "عش تجربة خيالية وسط المياه الفيروزية والرمال البيضاء مع أرقى منتجعات الـ 5 نجوم وخصوصية تامة.",
    },
    {
      id: "pkg-bosnia",
      title: "صيف البوسنة وسراييفو العائلي - شلالات وطبيعة ساحرة",
      destination: "البوسنة والهرسك",
      duration: "8 أيام / 7 ليالي",
      price: 8900,
      originalPrice: 10500,
      category: "رحلات عائلية",
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80",
      badge: "عائلي شامل",
      inclusions: [
        "فنادق 5 نجوم في سراييفو وموستار مع إفطار",
        "سيارة عائلية خاصة مع سائق يتحدث العربية",
        "جولات يومية إلى بحيرات بليفا وشلالات كرافيتسا",
        "شرائح إنترنت واستقبال خاص بالمطار",
      ],
      description: "عطلة عائلية بين الطبيعة الخضراء والأجواء المعتدلة، مع برامج سياحية ترفيهية تناسب الصغار والكبار.",
    },
    {
      id: "pkg-switzerland",
      title: "شتاء سويسرا الفاخر - إنترلاكن وجبال الألب الساحرة",
      destination: "سويسرا (إنترلاكن وزيورخ)",
      duration: "7 أيام / 6 ليالي",
      price: 18900,
      originalPrice: 22000,
      category: "باقات شتوية",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      badge: "VIP شتوي",
      inclusions: [
        "إقامة في أرقى فنادق 5 نجوم بإطلالة بانورامية",
        "تذاكر قطار القمم الجليدية (Jungfraujoch)",
        "سيارة مرسيدس خاصة مع سائق خاص",
        "رحلة بحرية في بحيرة برينز وجولة شوكولاتة سويسرية",
      ],
      description: "اكتشف روعة الثلوج السويسرية والقمم الشاهقة مع إقامة فندقية فاخرة وخدمات كونسيرج على مدار الساعة.",
    },
    {
      id: "pkg-turkey",
      title: "ربيع الشمال التركي وطرابزون - خضرة وأجواء غائمة",
      destination: "تركيا (طرابزون وأوزنجول)",
      duration: "7 أيام / 6 ليالي",
      price: 6900,
      originalPrice: 8200,
      category: "رحلات عائلية",
      image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80",
      badge: "أفضل قيمة",
      inclusions: [
        "أكواخ وفنادق فاخرة مطلة على بحيرة أوزنجول",
        "فان عائلي VIP حديث مع سائق خاص يومياً",
        "زيارة مرتفعات آيدر وحيدر نبي ودير سوميلا",
        "وجبة إفطار تركي ريفي يومياً",
      ],
      description: "أجواء عليلة ومناظر خلابة بين الأنهار والغيوم المعلقة، مناسبة جداً للراحة والاستجمام العائلي.",
    },
    {
      id: "pkg-cappadocia",
      title: "مغامرة كابادوكيا والمناطيد الساحرة",
      destination: "كابادوكيا، تركيا",
      duration: "5 أيام / 4 ليالي",
      price: 7400,
      originalPrice: 9100,
      category: "مغامرات واستكشاف",
      image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=800&q=80",
      badge: "تجارب حصرية",
      inclusions: [
        "إقامة في فندق كهفي فاخر 5 نجوم (Cave Hotel)",
        "رحلة ركوب المنطاد الهوائي مع شروق الشمس",
        "جولة سفاري دبابات صحراوية بين الوديان الصخرية",
        "جلسة تصوير احترافية خاصة للمسافرين",
      ],
      description: "تجربة بصرية مذهلة تحلق فيها فوق المناظر الجيولوجية النادرة وتعيش أجواء تاريخية استثنائية.",
    },
    {
      id: "pkg-mauritius",
      title: "جزيرة موريشيوس الاستوائية - جنة المحيط الهندي",
      destination: "موريشيوس",
      duration: "8 أيام / 7 ليالي",
      price: 13200,
      originalPrice: 15800,
      category: "شهر عسل VIP",
      image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
      badge: "استجمام ملكي",
      inclusions: [
        "منتجع 5 نجوم على الشاطئ مباشرة مع مسبح خاص",
        "شامل الإفطار والعشاء اليومي (Half Board)",
        "رحلة بحرية باليخت مع السباحة مع الدلافين",
        "زيارة أرض السبعة ألوان وشلالات تشاماريل",
      ],
      description: "مزيج ساحر بين الغابات الخضراء والشواطئ الذهبية والخدمة الفندقية الفاخرة التي تليق بشهر العسل.",
    },
  ];

function PackagesCatalogContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBookingPkg, setActiveBookingPkg] = useState<PackageCardData | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [travelersCount, setTravelersCount] = useState("2");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [packagesList, setPackagesList] = useState<PackageCardData[]>(initialPackagesList);

  React.useEffect(() => {
    const dest = searchParams?.get("dest");
    const cat = searchParams?.get("type");
    if (dest) setSearchQuery(dest);
    if (cat) {
      if (cat.includes("شهر عسل")) setSelectedCategory("شهر عسل VIP");
      else if (cat.includes("عائلي")) setSelectedCategory("رحلات عائلية");
      else if (cat.includes("مغامر")) setSelectedCategory("مغامرات واستكشاف");
    }
  }, [searchParams]);

  React.useEffect(() => {
    fetch("/api/packages")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPackagesList(data);
        }
      })
      .catch((err) => console.error("Error fetching packages:", err));
  }, []);

  const categories = ["الكل", "شهر عسل VIP", "رحلات عائلية", "مغامرات واستكشاف", "باقات شتوية"];

  const filteredPackages = packagesList.filter((pkg) => {
    const matchesCat = selectedCategory === "الكل" || pkg.category === selectedCategory;
    const matchesQuery =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBookingPkg) return;

    // Save lead locally
    const lead = {
      id: "SJ-B" + Math.floor(100000 + Math.random() * 900000),
      clientName,
      clientPhone,
      serviceTitle: activeBookingPkg.title,
      destination: activeBookingPkg.destination,
      price: activeBookingPkg.price,
      travelers: travelersCount,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    // Send to backend API so it appears in Admin CRM in real-time
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName,
        clientPhone,
        serviceTitle: `حجز باقة: ${activeBookingPkg.title}`,
        details: {
          destination: activeBookingPkg.destination,
          price: `${activeBookingPkg.price} ريال`,
          travelers: travelersCount,
        },
      }),
    }).catch((err) => console.error("Error submitting package booking lead:", err));

    try {
      const existing = JSON.parse(localStorage.getItem("safarjet_leads") || "[]");
      existing.unshift(lead);
      localStorage.setItem("safarjet_leads", JSON.stringify(existing));
    } catch {
      // safe fallback
    }

    setBookingSuccess(true);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-safar-cyan transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-safar-navy">عروض وباقات السفر الحصرية</span>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-safar-gold/10 border border-safar-gold/30 text-safar-gold text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>باقات سياحية متكاملة شاملة كل شيء</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-safar-navy tracking-tight">
            عروض وباقات <span className="text-safar-cyan">سفرجيت</span> الحصرية
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            اختر وجهتك المفضلة واستمتع برحلة متكاملة صُممت بعناية لتضمن لك أقصى درجات الرفاهية والراحة
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-safar-navy text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن وجهة أو باقة..."
              className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan bg-slate-50/50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                {/* Image Box */}
                <Link href={`/services/packages/${pkg.id}`} className="block relative w-full h-56 bg-slate-100 overflow-hidden cursor-pointer">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                  {/* Badge */}
                  <span className="absolute top-3 right-3 bg-safar-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {pkg.badge}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>5.0 (ممتاز)</span>
                  </div>

                  {/* Location & Duration tag on image bottom */}
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-xs font-semibold">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-safar-cyan" />
                      <span>{pkg.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-safar-gold" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <Link href={`/services/packages/${pkg.id}`}>
                    <h3 className="text-base sm:text-lg font-bold text-safar-navy leading-snug group-hover:text-safar-cyan transition-colors">
                      {pkg.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Inclusions checklist */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block">تشمل الباقة:</span>
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Actions Box */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                <div>
                  {pkg.originalPrice && (
                    <span className="text-[11px] text-slate-400 line-through block">
                      {pkg.originalPrice.toLocaleString()} ريال
                    </span>
                  )}
                  <div className="text-lg sm:text-xl font-black text-safar-navy leading-none">
                    {pkg.price.toLocaleString()}{" "}
                    <span className="text-xs text-safar-gold font-bold">ريال / للشخص</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/services/packages/${pkg.id}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all whitespace-nowrap"
                  >
                    التفاصيل
                  </Link>

                  <button
                    onClick={() => {
                      setActiveBookingPkg(pkg);
                      setBookingSuccess(false);
                    }}
                    className="bg-safar-cyan hover:bg-safar-cyan-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all whitespace-nowrap"
                  >
                    حجز سريع
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {activeBookingPkg && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fadeIn space-y-6">
              
              <button
                onClick={() => setActiveBookingPkg(null)}
                className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              {!bookingSuccess ? (
                <>
                  <div className="text-right space-y-1">
                    <span className="text-xs font-bold text-safar-gold bg-safar-gold/10 px-3 py-1 rounded-full">
                      طلب حجز VIP
                    </span>
                    <h3 className="text-lg font-bold text-safar-navy leading-snug">
                      {activeBookingPkg.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      الوجهة: {activeBookingPkg.destination} • المدة: {activeBookingPkg.duration}
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4 text-right">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">الاسم الكريم *</label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="اسمك الكامل..."
                        required
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">رقم الجوال أو الواتساب *</label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="05xxxxxxxx أو +966"
                        required
                        dir="ltr"
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan text-right"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">عدد المسافرين *</label>
                      <select
                        value={travelersCount}
                        onChange={(e) => setTravelersCount(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
                      >
                        <option value="1">مسافر واحد</option>
                        <option value="2">شخصين (مناسب لشهر العسل)</option>
                        <option value="3">3 أشخاص</option>
                        <option value="4">عائلة 4 أشخاص</option>
                        <option value="5+">عائلة أو مجموعة 5 أشخاص وأكثر</option>
                      </select>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">السعر التقديري:</span>
                        <strong className="text-base text-safar-navy">
                          {(activeBookingPkg.price * Number(travelersCount || 1)).toLocaleString()} ريال
                        </strong>
                      </div>
                      <span className="text-[11px] text-emerald-600 font-bold">شامل كافة المشتملات</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}?text=${encodeURIComponent(
                          `مرحباً سفرجيت! حاب استفسر وأحجز باقة: ${activeBookingPkg.title} - عدد الأفراد: ${travelersCount} - الاسم: ${clientName || "عميل سفرجيت"}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl shadow-md transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>واتساب فوري</span>
                      </a>

                      <button
                        type="submit"
                        className="flex items-center justify-center gap-1.5 bg-safar-navy hover:bg-safar-navy-light text-white text-xs font-bold py-3 rounded-xl shadow-md transition-all"
                      >
                        <Send className="w-4 h-4 text-safar-gold" />
                        <span>تأكيد الحجز</span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-safar-navy">تم تسجيل طلب الحجز بنجاح!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    شكراً لاختيارك سفرجيت يا أستاذ {clientName}. سيتواصل معك مستشار السفر الخاص خلال دقائق لتأكيد تواريخ رحلتك وإنهاء كافة الترتيبات.
                  </p>
                  <button
                    onClick={() => setActiveBookingPkg(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-2.5 rounded-xl transition-colors"
                  >
                    إغلاق
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function PackagesCatalogPage() {
  return (
    <React.Suspense
      fallback={
        <div className="py-24 text-center text-sm font-bold text-slate-500">
          جاري تحميل باقات سفرجيت...
        </div>
      }
    >
      <PackagesCatalogContent />
    </React.Suspense>
  );
}
