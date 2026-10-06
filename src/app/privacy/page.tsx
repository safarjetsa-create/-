import React from "react";
import Link from "next/link";
import { siteConfig } from "@/constants/siteConfig";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: `سياسة الخصوصية وحماية البيانات | ${siteConfig.name}`,
  description: "سياسة الخصوصية وسرية معلومات وبيانات العملاء في وكالة سفرجيت للسياحة والسفر وفق الأنظمة السعودية.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-safar-navy">الرئيسية</Link>
          <span>/</span>
          <span className="text-safar-navy font-bold">سياسة الخصوصية</span>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-safar-cyan/10 text-safar-cyan flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-safar-navy">
            سياسة الخصوصية وسرية البيانات
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            نلتزم في وكالة سفرجيت للسياحة والسفر بأعلى معايير الأمان وحماية خصوصية بيانات عملائنا وفق نظام حماية البيانات الشخصية المعمول به في المملكة العربية السعودية.
          </p>
          <div className="pt-2 text-[11px] text-slate-400 font-semibold">
            آخر تحديث: سبتمبر 2026 • معتمد ومطابق للأنظمة السعودية
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-8 text-xs sm:text-sm leading-relaxed text-slate-600">
          
          <section className="space-y-3">
            <h2 className="text-base font-bold text-safar-navy flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safar-cyan"></span>
              <span>1. البيانات التي نجمعها</span>
            </h2>
            <p>
              نقوم بجمع البيانات الضرورية فقط لإتمام إجراءات الحجز وإصدار التذاكر والتأشيرات وتنسيق الخدمات السياحية، وتتضمن:
            </p>
            <ul className="list-disc list-inside space-y-1 pr-2 text-slate-600">
              <li>البيانات الشخصية: الاسم الكامل، رقم الهوية الوطنية أو جواز السفر، وتاريخ الميلاد.</li>
              <li>بيانات الاتصال: رقم الجوال (للتواصل عبر الواتساب والمكالمات)، والبريد الإلكتروني.</li>
              <li>تفضيلات السفر: الوجهات المطلوبة، فئات الفنادق، واحتياجات الوجبات أو المقاعد الخاصة.</li>
              <li>بيانات الدفع: تتم معالجتها عبر بوابات دفع بنكية معتمدة ومشفرة بأعلى بروتوكولات الأمان.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-safar-navy flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safar-cyan"></span>
              <span>2. كيف نستخدم بياناتك الشخصية</span>
            </h2>
            <p>
              تُستخدم بياناتك لتقديم تجربة سفر استثنائية وسلسة للأغراض التالية:
            </p>
            <ul className="list-disc list-inside space-y-1 pr-2 text-slate-600">
              <li>إصدار تذاكر الطيران، حجوزات الفنادق، وتصاريح الطيران الخاص وصالات VIP.</li>
              <li>مشاركة البيانات اللازمة مع خطوط الطيران والفنادق الشريكة لتأكيد الإقامة.</li>
              <li>إرسال التحديثات الفورية لحالة الرحلة ومستندات السفر الإلكترونية عبر الواتساب والإيميل.</li>
              <li>تقديم الدعم المباشر عبر مستشارك السياحي الخاص على مدار 24 ساعة.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-safar-navy flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safar-cyan"></span>
              <span>3. سرية وأمان البيانات</span>
            </h2>
            <p>
              نطبق تقنيات تشفير متقدمة وبروتوكولات أمان صارمة لحماية بياناتك من أي وصول غير مصرح به أو إفشاء. نؤكد أننا لا نبيع أو نشارك بياناتك مع أي طرف ثالث لأغراض تسويقية على الإطلاق.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-safar-navy flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safar-cyan"></span>
              <span>4. حقوق العميل والمسافر</span>
            </h2>
            <p>
              يحق لك في أي وقت طلب مراجعة بياناتك المخزنة لدينا، أو تحديثها، أو طلب حذف حسابك وسجل التواصل من خلال مراسلتنا على:
              <span className="font-bold text-safar-navy mx-1.5">{siteConfig.email}</span>
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
