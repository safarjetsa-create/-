import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, BookOpen } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      id: "b1",
      title: "أفضل 5 وجهات سياحية باردة لقضاء إجازة الصيف مع العائلة",
      excerpt: "دليلك الشامل لاختيار أجمل المدن الطبيعية في البوسنة وسويسرا والنمسا لقضاء عطلة عائلية لا تُنسى.",
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80",
      date: "25 سبتمبر 2026",
      category: "نصائح السفر",
    },
    {
      id: "b2",
      title: "دليل المعتمر الشامل: كيف تختار باقة العمرة المثالية VIP؟",
      excerpt: "نصائح وإرشادات حول أفضل فنادق الحرمين، التنقل بقطار الحرمين، وتوقيت استخراج تصاريح الروضة الشريفة.",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80",
      date: "20 سبتمبر 2026",
      category: "العمرة والزيارة",
    },
    {
      id: "b3",
      title: "كل ما تحتاج معرفته عن استئجار الطائرات الخاصة في الخليج",
      excerpt: "معايير اختيار فئات الطائرات الخاصة، صالات كبار الشخصيات، وكيفية توفير الوقت في رحلات الأعمال العاجلة.",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80",
      date: "15 سبتمبر 2026",
      category: "طيران خاص VIP",
    },
  ];

  return (
    <div className="py-16 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-safar-gold bg-safar-gold/10 px-3 py-1 rounded-full border border-safar-gold/20">
            مدونة سفرجيت
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-safar-navy">
            أحدث مقالات ونصائح السفر والسياحة
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            اكتشف أسرار الوجهات العالمية وأحدث إرشادات وتجارب السفر الممتعة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-48 bg-slate-100">
                  <Image src={art.image} alt={art.title} fill className="object-cover" />
                  <span className="absolute top-3 right-3 bg-safar-navy text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">
                    {art.category}
                  </span>
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-safar-cyan" />
                    <span>{art.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-safar-navy leading-snug hover:text-safar-cyan transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href="/#booking-widget"
                  className="inline-flex items-center gap-1 text-xs font-bold text-safar-cyan hover:underline"
                >
                  <span>اقرأ المزيد واستكشف العروض</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
