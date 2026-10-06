import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/siteConfig";
import { ShieldCheck, Award, Users, Globe, Compass, Sparkles, HeartHandshake, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[360px] sm:h-[420px] bg-safar-navy-dark overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"
            alt="عن سفرجيت"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-safar-navy-dark/95 via-safar-navy/85 to-safar-navy-dark/90"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-safar-gold bg-safar-gold/10 px-3 py-1 rounded-full border border-safar-gold/20">
            <Sparkles className="w-3.5 h-3.5 text-safar-gold" />
            <span>قصتنا ورؤيتنا</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            عن <span className="text-safar-cyan">سفرجيت</span> للسفر والسياحة
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            نحن وكالة سفر وسياحة سعودية معتمدة، نؤمن بأن السفر ليس مجرد تذكرة طيران وفندق، بل هو تجربة إنسانية وثقافية تصنع ذكريات تدوم مدى الحياة.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-safar-cyan/10 text-safar-cyan flex items-center justify-center mx-auto">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-safar-navy">رؤيتنا</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                أن نكون الوجهة الأولى والملاذ الأكثر موثوقية وفخامة للمسافر العربي، عبر تقديم تجارب سياحية نوعية تجمع بين الراحة والابتكار التقني.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-safar-gold/10 text-safar-gold flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-safar-navy">رسالتنا</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                تقريب العالم لعملائنا من خلال باقات سياحية مصممة بعناية فائقة، ودعم مستمر على مدار الساعة، مع الالتزام بأعلى معايير الشفافية والاحترافية.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-safar-navy/10 text-safar-navy flex items-center justify-center mx-auto">
                <HeartHandshake className="w-7 h-7 text-safar-navy" />
              </div>
              <h3 className="text-xl font-bold text-safar-navy">قيمنا</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                الفخامة، المصداقية، الاهتمام بأدق التفاصيل، وتسخير أحدث تقنيات الذكاء الاصطناعي لخدمة المسافر قبل وأثناء وبعد رحلته.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Official Licenses & Accreditations */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-extrabold text-safar-navy">
            تراخيص واعتمادات رسمية موثوقة
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
              <div className="text-right">
                <strong className="text-sm text-safar-navy block">مرخص من وزارة السياحة</strong>
                <span className="text-xs text-slate-500 font-semibold">{siteConfig.licenseNumber}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-3">
              <Globe className="w-8 h-8 text-safar-cyan shrink-0" />
              <div className="text-right">
                <strong className="text-sm text-safar-navy block">عضوية منظمات السفر الدولية</strong>
                <span className="text-xs text-slate-500 font-semibold">IATA Accredited Agency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl font-bold text-safar-navy">
            جاهز لتبدأ مغامرتك القادمة معنا؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            مستشار السفر في انتظارك لتصميم خطة رحلتك وفق ميزانيتك وتطلعاتك
          </p>
          <div className="pt-2">
            <Link
              href="/#booking-widget"
              className="inline-flex items-center gap-2 bg-safar-navy hover:bg-safar-navy-light text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <span>استكشف الباقات والرحلات الآن</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
