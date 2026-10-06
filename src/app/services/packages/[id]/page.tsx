"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { siteConfig } from "@/constants/siteConfig";
import {
  MapPin,
  Calendar,
  Clock,
  Star,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Users,
  Plane,
  Building2,
  Car,
  Coffee,
  Check,
  ChevronDown,
  ChevronUp,
  Share2,
  Heart
} from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
  activities?: string[];
}

interface PackageDetail {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  badge: string;
  inclusions: string[];
  exclusions?: string[];
  description: string;
  itinerary?: ItineraryDay[];
}

const defaultItineraries: Record<string, ItineraryDay[]> = {
  "pkg-maldives": [
    {
      day: 1,
      title: "الوصول والانتقال بالطيارة المائية",
      desc: "استقبال كبار الشخصيات في مطار ماليه الدولي، ومرافقتكم إلى صالة الاستراحة الخاصة بالمنتجع، ثم الانطلاق برحلة خلابة عبر الطائرة المائية فوق الجزر المرجانية وصولاً للمنتجع.",
      activities: ["استقبال في صالة VIP", "نقل بالطيارة المائية", "تسجيل وصول خاص للفيلا المائية", "مشروب ترحيبي وجلسة تعريفية"],
    },
    {
      day: 2,
      title: "يوم الاسترخاء والإفطار العائم",
      desc: "استمتع بوجبة إفطار عائم فاخرة في مسبح الفيلا الخاص مع إطلالة على المحيط، يليها وقت حر للسباحة ومساج استرخائي في سبا المنتجع الفاخر.",
      activities: ["إفطار عائم في المسبح الخاص", "جلسة تدليك بالزيوت العطرية 60 دقيقة", "سنوركلينج واستكشاف الشعاب المرجانية"],
    },
    {
      day: 3,
      title: "رحلة البحث عن الدلافين وعشاء الشاطئ",
      desc: "رحلة بحرية خاصة وقت الغروب على متن يخت تقليدي لمشاهدة الدلافين، يتبعها عشاء رومانسي مخصص على ضوء الشموع والنجوم على رمال الشاطئ البيضاء.",
      activities: ["رحلة الغروب باليخت", "مشاهدة الدلافين البرية", "عشاء شاطئي خاص 5 أطباق من المأكولات البحرية"],
    },
    {
      day: 4,
      title: "مغامرات الرياضات البحرية وتجديد الطاقة",
      desc: "تجربة تجديف الكاياك الشفاف وقوارب التجديف الواقفة، مع فرصة لتجربة الغوص برفقة مدرب معتمد أو الاستمتاع بأجواء النادي الشاطئي.",
      activities: ["كاياك زجاجي شفاف", "معدات غوص كاملة مع مرشد", "جلسة تصوير احترافية مجانية بالدرون"],
    },
    {
      day: 5,
      title: "يوم مفتوح والتسوق وتوديع الجزيرة",
      desc: "يوم حر للاستمتاع بآخر لحظات الهدوء، تناول وجبة غداء عالمية في المطعم العائم، والاستعداد للعودة إلى مطار ماليه للرحلة الدولية.",
      activities: ["وقت حر للاستجمام", "تسوق الهدايا التذكارية من الجزيرة", "الانتقال بالطائرة المائية للمطار"],
    },
  ],
  "pkg-bosnia": [
    {
      day: 1,
      title: "الوصول إلى سراييفو والاستقبال الفاخر",
      desc: "استقبال خاص بمطار سراييفو الدولي من قبل ممثل سفرجيت، والانتقال بسيارة عائلية خاصة إلى فندق 5 نجوم في قلب المدينة.",
      activities: ["استقبال بالمطار بدون انتظار", "نقل خاص للفندق", "جولة مسائية خفيفة في باشتشارشيا التاريخية"],
    },
    {
      day: 2,
      title: "جولة الجبال والشلالات الخلابة",
      desc: "زيارة نبع نهر البوسنة المتدفق (فيلكا بوسنا) وركوب عربات الخيول التراثية، ثم الصعود بالتلفريك الحديث إلى جبل تريبيفيتش للاستمتاع بإطلالة بانورامية.",
      activities: ["حديقة نبع البوسنة الطبيعية", "تلفريك سراييفو البانورامي", "وجبة غداء تراثية مشويات كباب بوسني"],
    },
    {
      day: 3,
      title: "رحلة موستار والجسر العثماني التاريخي",
      desc: "الانطلاق إلى مدينة موستار الساحرة، وزيارة الجسر الحجري الشهير ونبع بلاغاي الصوفي، مع التوقف عند شلالات كرافيتسا المذهلة للسباحة والتصوير.",
      activities: ["جسر موستار القديم", "نبع وتكية بلاغاي التاريخية", "شلالات كرافيتسا الصافية"],
    },
    {
      day: 4,
      title: "بحيرة يابلانيتشا وتجربة الخروف المشوي",
      desc: "رحلة نهرية بالقارب في بحيرة يابلانيتشا الفيروزية، تليها تجربة أشهر المطاعم النهرية لتناول لحم الخروف المشوي على الحطب وفق الطريقة البوسنية الأصيلة.",
      activities: ["جولة قارب خاصة في البحيرة", "غداء مشوي بوسني على ضفاف النهر", "زيارة متحف معركة نيريتفا"],
    },
    {
      day: 5,
      title: "يوم التسوق العائلي والتوديع",
      desc: "زيارة أرقى المجمعات التجارية في سراييفو (Sarajevo City Center)، ثم التوجه للمطار للمغادرة بحفظ الله ورعايته.",
      activities: ["تسوق حر للمنتجات الأوروبية", "إنهاء إجراءات المغادرة براحة تامة"],
    },
  ],
};

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pkgId = params.id as string;

  const [packageData, setPackageData] = useState<PackageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({ 1: true, 2: true });

  // Booking form states
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [adultsCount, setAdultsCount] = useState("2");
  const [specialNotes, setSpecialNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch("/api/packages");
        if (res.ok) {
          const list = await res.json();
          const found = list.find((p: PackageDetail) => p.id === pkgId);
          if (found) {
            // Merge custom itinerary if available or use default
            const itinerary = found.itinerary && found.itinerary.length > 0 
              ? found.itinerary 
              : defaultItineraries[pkgId] || [
                  { day: 1, title: "الوصول والاستقبال بالمطار", desc: "استقبال خاص والتوصيل للفندق ومشروب ترحيبي." },
                  { day: 2, title: "جولة المعالم الرئيسية والمدينة", desc: "زيارة أبرز المعالم السياحية مع مرشد خاص ووجبة غداء فاخرة." },
                  { day: 3, title: "رحلة الطبيعة والأنشطة الترفيهية", desc: "يوم حر ومفتوح للاستجمام أو خوض المغامرات الممتعة." },
                  { day: 4, title: "يوم التسوق والتوديع", desc: "وقت حر للتسوق ثم التوصيل للمطار للعودة بحفظ الله." },
                ];

            setPackageData({
              ...found,
              itinerary,
              exclusions: [
                "تذاكر الطيران الدولي (ما لم يُطلب إضافتها)",
                "المصاريف والمشتريات الشخصية",
                "التأشيرة السياحية (نوفر المساعدة في استخراجها)",
              ],
            });
          }
        }
      } catch (err) {
        console.error("Error loading package details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [pkgId]);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageData) return;

    setIsSubmitting(true);
    const ref = "SJ-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);

    const newLead = {
      id: ref,
      clientName: guestName,
      clientPhone: guestPhone,
      serviceTitle: `باقة: ${packageData.title}`,
      travelDate: travelDate || "مرن",
      details: {
        "وجهة الباقة": packageData.destination,
        "عدد الأفراد": adultsCount,
        "سعر الباقة": `${packageData.price.toLocaleString()} ريال`,
        "ملاحظات إضافية": specialNotes || "لا توجد",
      },
      status: "new",
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      setBookingSuccess(true);
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppBookingUrl = () => {
    if (!packageData) return "#";
    const msg = `يا هلا ومسهلا بفريق سفرجيت! ✈️\nحاب استفسر وأحجز باقة: *${packageData.title}*\nالوجهة: ${packageData.destination}\nالمدة: ${packageData.duration}\nالاسم: ${guestName || "عميل VIP"}\nرقم الجوال: ${guestPhone || "غير محدد"}\nتاريخ السفر: ${travelDate || "مرن"}\nعدد المسافرين: ${adultsCount}`;
    return `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-safar-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-slate-500">جاري تحميل تفاصيل الباقة الملكية...</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-safar-navy">الباقة غير موجودة أو انتهت صلاحيتها</h2>
        <p className="text-sm text-slate-500">نعتذر منك، قد تكون هذه الباقة تم تحديثها أو نقلها.</p>
        <Link
          href="/services/packages"
          className="inline-flex items-center gap-2 bg-safar-cyan text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لجميع الباقات</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-safar-navy">الرئيسية</Link>
            <span>/</span>
            <Link href="/services/packages" className="hover:text-safar-navy">الباقات السياحية</Link>
            <span>/</span>
            <span className="text-safar-navy font-bold truncate max-w-[200px] sm:max-w-none">{packageData.title}</span>
          </div>

          <Link
            href="/services/packages"
            className="flex items-center gap-1 text-safar-cyan hover:underline font-bold"
          >
            <span>جميع الباقات</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Visual Section */}
      <section className="relative w-full h-[400px] sm:h-[500px] bg-safar-navy-dark overflow-hidden">
        <Image
          src={packageData.image}
          alt={packageData.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full space-y-4">
            
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-safar-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {packageData.badge || packageData.category}
              </span>
              <span className="bg-black/40 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>تقييم 5.0 (VIP Concierge)</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {packageData.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-white/90 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-safar-cyan" />
                <span>{packageData.destination}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-safar-gold" />
                <span>{packageData.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ضمان أفضل سعر وخدمة 24/7</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Two-Column Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Main Column: Itinerary, Inclusions, Highlights (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Sparkles className="w-5 h-5 text-safar-gold" />
                <h2 className="text-lg font-bold text-safar-navy">نظرة عامة على البرنامج</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {packageData.description}
              </p>

              {/* Highlights 4-box banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="bg-slate-50 p-3.5 rounded-2xl text-center border border-slate-100 space-y-1">
                  <Building2 className="w-5 h-5 text-safar-cyan mx-auto" />
                  <span className="text-xs font-bold text-slate-800 block">فنادق 5 نجوم</span>
                  <span className="text-[10px] text-slate-400 block">إقامة راقية ومختارة</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl text-center border border-slate-100 space-y-1">
                  <Car className="w-5 h-5 text-safar-gold mx-auto" />
                  <span className="text-xs font-bold text-slate-800 block">سيارة خاصة</span>
                  <span className="text-[10px] text-slate-400 block">سائق يتحدث العربية</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl text-center border border-slate-100 space-y-1">
                  <Coffee className="w-5 h-5 text-emerald-600 mx-auto" />
                  <span className="text-xs font-bold text-slate-800 block">إفطار يومي</span>
                  <span className="text-[10px] text-slate-400 block">بوفيه عالمي فاخر</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl text-center border border-slate-100 space-y-1">
                  <Users className="w-5 h-5 text-purple-600 mx-auto" />
                  <span className="text-xs font-bold text-slate-800 block">كونسيرج 24/7</span>
                  <span className="text-[10px] text-slate-400 block">متابعة دائمة معكم</span>
                </div>
              </div>
            </div>

            {/* Day by Day Itinerary Accordion */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-safar-cyan" />
                  <h2 className="text-lg font-bold text-safar-navy">جدول الرحلة يوماً بيوم (Itinerary)</h2>
                </div>
                <span className="text-xs text-slate-400 font-semibold">
                  {packageData.itinerary?.length || 0} أيام مفصلة
                </span>
              </div>

              <div className="space-y-4">
                {packageData.itinerary?.map((item) => {
                  const isOpen = !!openDays[item.day];
                  return (
                    <div
                      key={item.day}
                      className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleDay(item.day)}
                        className={`w-full flex items-center justify-between p-4 sm:p-5 text-right font-bold text-sm transition-colors ${
                          isOpen ? "bg-slate-50 text-safar-navy" : "bg-white hover:bg-slate-50/60 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-safar-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {item.day}
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold">{item.title}</span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 sm:p-6 bg-white border-t border-slate-100 space-y-3 text-xs leading-relaxed text-slate-600">
                          <p>{item.desc}</p>
                          {item.activities && item.activities.length > 0 && (
                            <div className="pt-2">
                              <span className="text-[11px] font-bold text-safar-navy block mb-2">أبرز الأنشطة المشمولة:</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.activities.map((act, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-slate-700">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                    <span>{act}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Inclusions */}
              <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-200/80 space-y-4">
                <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ما تشمله هذه الباقة:</span>
                </h3>
                <ul className="space-y-2.5">
                  {packageData.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>غير مشمول في الباقة:</span>
                </h3>
                <ul className="space-y-2.5">
                  {packageData.exclusions?.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Left Column: Sticky VIP Booking & Inquiry Box (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl space-y-6">
              
              {/* Price Display */}
              <div className="pb-4 border-b border-slate-100 flex items-end justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">سعر الباقة للشخص:</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <strong className="text-3xl font-black text-safar-navy">
                      {packageData.price.toLocaleString()}
                    </strong>
                    <span className="text-xs font-bold text-safar-gold">ريال سعودي</span>
                  </div>
                </div>

                {packageData.originalPrice && (
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 line-through block">
                      {packageData.originalPrice.toLocaleString()} ريال
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      وفر {(packageData.originalPrice - packageData.price).toLocaleString()} ريال
                    </span>
                  </div>
                )}
              </div>

              {/* Booking Form or Success State */}
              {!bookingSuccess ? (
                <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">الاسم الكريم *</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="مثال: فهد بن عبدالعزيز"
                      required
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan bg-slate-50/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">رقم الجوال (واتساب) *</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="05xxxxxxxx"
                      required
                      dir="ltr"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan bg-slate-50/50 text-right"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">تاريخ السفر التقريبي</label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full h-11 px-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">عدد الأفراد</label>
                      <select
                        value={adultsCount}
                        onChange={(e) => setAdultsCount(e.target.value)}
                        className="w-full h-11 px-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan bg-slate-50/50"
                      >
                        <option value="1">شخص واحد</option>
                        <option value="2">شخصين (زوجين)</option>
                        <option value="3-4">3 - 4 أشخاص</option>
                        <option value="5+">عائلة 5+ أشخاص</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">ملاحظات أو طلبات خاصة</label>
                    <textarea
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="أي متطلبات خاصة بالفيلا أو الطيران..."
                      rows={2}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan bg-slate-50/50"
                    ></textarea>
                  </div>

                  {/* Primary CTA: Confirm Instant Booking */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-safar-cyan to-safar-navy text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-safar-gold" />
                    <span>{isSubmitting ? "جاري إرسال الطلب..." : "تأكيد طلب حجز الباقة"}</span>
                  </button>

                  {/* Secondary Action: Direct WhatsApp Chat */}
                  <a
                    href={getWhatsAppBookingUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>محادثة واتساب فورية للباقة</span>
                  </a>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-safar-navy">تم استلام طلبكم بنجاح!</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      رقم الطلب المرجعي: <span className="font-mono font-bold text-safar-cyan">{bookingRef}</span>
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    تم إرسال طلبكم لغرفة العمليات المركزية وسيتواصل معكم مستشار سفرجيت خلال دقائق لتأكيد المواعيد وتجهيز تذاكر الرحلة.
                  </p>
                  <a
                    href={getWhatsAppBookingUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>متابعة الطلب بالواتساب الآن</span>
                  </a>
                </div>
              )}

              {/* Trust Badges inside Card */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-safar-gold shrink-0" />
                  <span>وكالة معتمدة ومرخصة برقم 73103986</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>تأكيد فوري وخيارات إلغاء مرنة</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
