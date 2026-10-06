"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/constants/siteConfig";
import { Printer, X, ShieldCheck, Calendar, Plane, CreditCard } from "lucide-react";

interface QuoteData {
  clientName: string;
  clientPhone: string;
  destination: string;
  durationDays: number;
  totalPrice: number;
  itinerary: { day: number; title: string; desc: string }[];
  inclusions: string[];
}

interface PDFQuoteGeneratorProps {
  quote: QuoteData;
  onClose: () => void;
}

export default function PDFQuoteGenerator({ quote, onClose }: PDFQuoteGeneratorProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
        
        {/* Top Controls Bar (hidden during actual browser print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="text-lg font-bold text-safar-navy">
              معاينة وتصدير عرض السعر الفاخر (VIP Quotation)
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Quotation Sheet */}
        <div ref={printRef} className="bg-white p-6 sm:p-8 border border-slate-200 rounded-2xl space-y-6 text-slate-800">
          
          {/* Header with SafarJet Logo */}
          <div className="flex items-center justify-between pb-6 border-b-2 border-safar-navy">
            <div>
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={160}
                height={55}
                className="object-contain h-12 w-auto"
              />
              <p className="text-xs text-safar-gold font-bold mt-1">
                وكالة سفر وسياحة معتمدة - {siteConfig.licenseNumber}
              </p>
            </div>

            <div className="text-left text-xs text-slate-500 space-y-0.5" dir="ltr">
              <p className="font-bold text-safar-navy text-sm">SAFARJET VIP QUOTATION</p>
              <p>Date: {new Date().toLocaleDateString("en-GB")}</p>
              <p>Quote Ref: SJ-Q{Math.floor(1000 + Math.random() * 9000)}</p>
            </div>
          </div>

          {/* Client & Destination Summary Banner */}
          <div className="bg-gradient-to-r from-safar-navy-dark to-safar-navy text-white p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-safar-gold-light block">عرض مقدم إلى العميل الكريم:</span>
              <h2 className="text-xl font-bold">{quote.clientName}</h2>
              <p className="text-xs text-slate-300 mt-0.5" dir="ltr">{quote.clientPhone}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-safar-cyan-light block">الوجهة والمدة:</span>
              <p className="text-lg font-bold text-white">{quote.destination}</p>
              <span className="inline-flex items-center gap-1 text-xs text-safar-gold bg-black/30 px-2 py-0.5 rounded-full mt-1">
                <Calendar className="w-3 h-3" />
                <span>{quote.durationDays} أيام / {quote.durationDays - 1} ليالي</span>
              </span>
            </div>
          </div>

          {/* Day-by-Day Itinerary */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-safar-navy border-r-4 border-safar-cyan pr-2 flex items-center gap-1.5">
              <Plane className="w-4 h-4 text-safar-cyan" />
              <span>جدول خط سير الرحلة المقترح يوماً بيوم</span>
            </h4>

            <div className="space-y-2">
              {quote.itinerary.map((item) => (
                <div key={item.day} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-16 h-7 rounded-lg bg-safar-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                    اليوم {item.day}
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-safar-navy block">{item.title}</strong>
                    <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700">ما تشمله الباقة:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {quote.inclusions.map((inc, i) => (
                <div key={i} className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Box & Payment Link */}
          <div className="pt-4 border-t-2 border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-right">
              <span className="text-xs text-slate-500 block">السعر الإجمالي النهائي:</span>
              <div className="text-2xl font-black text-safar-navy">
                {quote.totalPrice.toLocaleString()} <span className="text-sm text-safar-gold">ريال سعودي</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-bold block">شامل الضرائب وكافة الرسوم المذكورة</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center sm:text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold justify-center sm:justify-start">
                <CreditCard className="w-4 h-4 text-safar-cyan" />
                <span>طرق السداد المعتمدة:</span>
              </div>
              <p className="text-[11px] text-slate-500">مدى | Apple Pay | تحويل بنكي رسمي باسم سفرجيت</p>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-safar-gold" />
              <span>هذا العرض ساري لمدة 48 ساعة من تاريخ إصداره</span>
            </div>
            <span>www.safarjet.com | {siteConfig.phone}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
