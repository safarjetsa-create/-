"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/constants/siteConfig";
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Phone, Sparkles } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
  category: "حجوزات وباقات" | "طيران وفنادق" | "العمرة VIP" | "طائرات خاصة" | "دفع وإلغاء";
}

const faqList: FaqItem[] = [
  {
    q: "كيف يمكنني حجز باقة سياحية متكاملة عبر سفرجيت؟",
    a: "يمكنك استعراض الباقات المتاحة من صفحة (الباقات السياحية) والضغط على 'حجز الباقة' أو 'التفاصيل'، أو التواصل المباشر مع مستشارك السياحي عبر الواتساب وسنقوم بتخصيص خط سير الرحلة وحجز الفنادق والطيران بالكامل نيابة عنك.",
    category: "حجوزات وباقات",
  },
  {
    q: "هل وكالة سفرجيت مرخصة رسمياً؟",
    a: "نعم، وكالة سفرجيت للسياحة والسفر مرخصة ومعتمدة رسمياً من وزارة السياحة بالمملكة العربية السعودية بترخيص رقم 73103986 ومعتمدة من المنظمة الدولية للنقل الجوي (IATA).",
    category: "حجوزات وباقات",
  },
  {
    q: "ما هي مزايا باقات العمرة الملكية VIP لديكم؟",
    a: "تشمل باقات العمرة لدينا إقامة حصرية في فنادق صف أول مطلة مباشرة على الكعبة المشرفة والمسجد النبوي، مع نقل بقطار الحرمين السريع في درجة الأعمال، وسيارات خاصة بسائق خاص طوال الرحلة، وإصدار تصاريح الروضة الشريفة.",
    category: "العمرة VIP",
  },
  {
    q: "كيف تتم إجراءات حجز واستئجار طائرة خاصة لرجال الأعمال؟",
    a: "نوفر أسطولاً متنوعاً من طائرات رجال الأعمال الحديثة (من الطائرات الخفيفة وحتى الطائرات الكبيرة مثل Gulfstream و Bombardier). يكفي تزويدنا بخط السير ووقت الإقلاع المطلوب وعدد الركاب، وسنصدر تصاريح الطيران وتجهيز صالة كبار الشخصيات VIP خلال ساعات معدودة.",
    category: "طائرات خاصة",
  },
  {
    q: "هل تشمل الباقات السياحية تذاكر الطيران الدولي؟",
    a: "نوفر خيارين: باقات أرضية شاملة الفنادق الفاخرة والنقل والجولات، أو باقات متكاملة كلياً تشمل تذاكر الطيران الدولي على أفضل خطوط الطيران وبأفضل الأسعار المتاحة.",
    category: "طيران وفنادق",
  },
  {
    q: "ما هي طرق الدفع المعتمدة لديكم؟",
    a: "نقبل الدفع عبر بطاقات مدى، البطاقات الائتمانية (Visa / MasterCard)، Apple Pay، التحويل البنكي المباشر لحساب الوكالة الرسمي، أو إمكانية تقسيط الباقات عبر خيارات الدفع الميسرة.",
    category: "دفع وإلغاء",
  },
  {
    q: "هل يمكنني تعديل تواريخ الرحلة بعد تأكيد الحجز؟",
    a: "نعم، يتيح لك فريق سفرجيت مرونة في تعديل مواعيد السفر وفق سياسات شركات الطيران والفنادق الشريكة، وسيقوم مستشارك الخاص بتنفيذ التعديل بسلاسة تامة.",
    category: "دفع وإلغاء",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ["all", "حجوزات وباقات", "طيران وفنادق", "العمرة VIP", "طائرات خاصة", "دفع وإلغاء"];

  const filtered = faqList.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch =
      !search.trim() ||
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-safar-navy">الرئيسية</Link>
          <span>/</span>
          <span className="text-safar-navy font-bold">الأسئلة الشائعة</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-safar-gold bg-safar-gold/10 px-3 py-1 rounded-full border border-safar-gold/20">
            مركز المساعدة والمعلومات
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-safar-navy">
            الأسئلة الأكثر شيوعاً
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            إجابات واضحة ومباشرة حول إجراءات الحجز، الباقات، الطيران، وسياسات الخدمة الفاخرة
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن سؤالك هنا..."
              className="w-full h-11 pr-10 pl-4 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === c
                    ? "bg-safar-navy text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c === "all" ? "جميع الأسئلة" : c}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full flex items-center justify-between p-4 sm:p-5 text-right font-bold text-xs sm:text-sm transition-colors ${
                    isOpen ? "bg-slate-50/80 text-safar-navy" : "hover:bg-slate-50/40 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-safar-cyan shrink-0"></span>
                    <span>{item.q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-safar-cyan shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-6 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-xs text-slate-400">
              لم نجد نتائج مطابقة لبحثك. تواصل معنا مباشرة للإجابة على استفسارك!
            </div>
          )}
        </div>

        {/* Need more help banner */}
        <div className="bg-gradient-to-r from-safar-navy to-safar-navy-dark text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-right">
            <h3 className="text-base font-bold flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-safar-gold" />
              <span>هل لديك استفسار خاص لم تجده هنا؟</span>
            </h3>
            <p className="text-xs text-slate-300">مستشار سفرجيت متاح على مدار الساعة للإجابة على جميع تساؤلاتك وتفصيل رحلتك.</p>
          </div>

          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>محادثة واتساب فورية</span>
          </a>
        </div>

      </div>
    </div>
  );
}
