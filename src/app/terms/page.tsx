import React from "react";
import Link from "next/link";
import { siteConfig } from "@/constants/siteConfig";
import { FileText, ShieldCheck, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: `الشروط والأحكام وسياسة الإلغاء | ${siteConfig.name}`,
  description: "الشروط والأحكام وسياسات الإلغاء والاسترجاع وحقوق المسافرين المعتمدة لدى وكالة سفرجيت للسياحة والسفر.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-safar-navy">الرئيسية</Link>
          <span>/</span>
          <span className="text-safar-navy font-bold">الشروط والأحكام</span>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-safar-gold/10 text-safar-gold flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-safar-navy">
            الشروط والأحكام وسياسة الإلغاء والاسترجاع
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            تنظم هذه الوثيقة العلاقة التعاقدية وحقوق وواجبات العميل عند حجز الباقات السياحية وتذاكر الطيران والفنادق عبر وكالة سفرجيت المرخصة برقم {siteConfig.licenseNumber}.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-8 text-xs sm:text-sm leading-relaxed text-slate-600">
          
          <section className="space-y-3">
            <h2 className="text-base font-bold text-safar-navy flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safar-gold"></span>
              <span>1. شروط الحجز وتأكيد الخدمة</span>
            </h2>
            <p>
              يُعتبر الحجز مؤكداً نهائياً بعد استلام إشعار التأكيد الرسمي أو وثيقة الحجز وسداد الدفعة المقررة. في حال إصدار عروض الأسعار التقديرية (Quotations)، فإن الأسعار وتوفر المقاعد والغرف تظل خاضعة لإمكانية التغيير حتى اللحظة الفعلية لإصدار التذاكر.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-safar-navy flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safar-gold"></span>
              <span>2. سياسة الإلغاء وتعديل المواعيد</span>
            </h2>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>الباقات السياحية والفنادق:</strong> تخضع لسياسة المزود والفندق، وفي حال الإلغاء قبل 14 يوماً من موعد السفر يُسترد المبلغ مخصوماً منه الرسوم الإدارية إن وجدت.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>تذاكر الطيران:</strong> تطبق شروط وقوانين الهيئة العامة للطيران المدني وسياسات شركات الطيران الناقلة الخاصة بكل درجة سعرية.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>الطيران الخاص VIP:</strong> تطبق اتفاقية التأجير الخاصة بعقد الطائرة وتوقيت الإلغاء المسبق.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-safar-navy flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safar-gold"></span>
              <span>3. الجوازات والتأشيرات ومتطلبات الدخول</span>
            </h2>
            <p>
              يتحمل المسافر مسؤولية التأكد من صلاحية جواز السفر (ألا تقل عن 6 أشهر من تاريخ العودة) والحصول على التأشيرات واللقاحات المطلوبة لوجهة السفر، ويسعد فريقنا بتقديم الإرشاد والمساعدة اللازمة لاستخراج التأشيرات المعتمدة.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-safar-navy flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safar-gold"></span>
              <span>4. الظروف القاهرة والاستثنائية</span>
            </h2>
            <p>
              في حالات القوة القاهرة (مثل الكوارث الطبيعية، الأحوال الجوية الطارئة، أو قرارات إغلاق المطارات الدولية)، يتعاون فريق سفرجيت مع شركائه لتقديم أفضل الحلول البديلة أو حفظ مستحقات العميل كرصيد سفر آمن.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
