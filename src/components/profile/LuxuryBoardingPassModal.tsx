"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/constants/siteConfig";
import {
  Plane,
  Calendar,
  Clock,
  MapPin,
  Printer,
  X,
  ShieldCheck,
  Sparkles,
  QrCode,
  Download,
  Share2,
  CheckCircle2,
  User,
  Luggage,
  Award
} from "lucide-react";

export interface TripVoucherData {
  id: string;
  title: string;
  route: string;
  departureDate: string;
  status: string;
  terminal: string;
  passengers: number;
}

interface LuxuryBoardingPassModalProps {
  trip: TripVoucherData;
  travelerName: string;
  travelerTier: string;
  onClose: () => void;
}

export default function LuxuryBoardingPassModal({
  trip,
  travelerName,
  travelerTier,
  onClose,
}: LuxuryBoardingPassModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // Derive origin & destination from route
  const routeParts = trip.route.split("✈️").map((p) => p.trim());
  const origin = routeParts[0] || "الرياض (RUH)";
  const destination = routeParts[1] || "لندن (LHR)";

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="max-w-4xl w-full my-auto space-y-4 print:my-0 print:max-w-none">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xl flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <h3 className="text-sm sm:text-base font-bold text-safar-navy flex items-center gap-1.5">
              <span>تذكرة الصعود وتصريح الصالة الإلكتروني</span>
              <span className="text-xs bg-safar-gold/15 text-safar-gold font-mono px-2 py-0.5 rounded-full font-bold">
                {trip.id}
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-safar-navy hover:bg-safar-navy-light text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-safar-gold" />
              <span>طباعة / حفظ PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Boarding Pass Ticket Body */}
        <div
          ref={printAreaRef}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-300 relative print:shadow-none print:border-none print:m-0"
        >
          {/* Decorative Top Airline Strip */}
          <div className="h-3 bg-gradient-to-r from-safar-navy via-safar-cyan to-safar-gold w-full"></div>

          {/* Ticket Header */}
          <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-32 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt={siteConfig.name}
                  width={130}
                  height={45}
                  className="object-contain max-h-9 w-auto"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-safar-gold uppercase tracking-wider block">
                  وثيقة سفر وتصريح صالة VIP معتمد
                </span>
                <h2 className="text-base sm:text-lg font-black text-safar-navy">
                  SAFARJET CONCIERGE BOARDING PASS
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:self-auto self-start">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>مؤكد ومفعل إلكترونياً</span>
              </span>

              <span className="bg-safar-navy text-white text-xs font-mono font-bold px-3 py-1 rounded-full">
                e-TKT: 731-89021482
              </span>
            </div>
          </div>

          {/* Main Flight Route Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-safar-navy-dark via-safar-navy to-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-80 h-80 bg-safar-cyan/10 rounded-full blur-3xl"></div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
              {/* Departure Airport */}
              <div className="space-y-1">
                <span className="text-xs text-safar-cyan font-bold block">محطة المغادرة (FROM)</span>
                <strong className="text-2xl sm:text-3xl font-black tracking-tight text-white block">
                  {origin}
                </strong>
                <span className="text-xs text-slate-300 font-semibold block">مطار الملك خالد الدولي</span>
              </div>

              {/* Airplane Flight Path Icon */}
              <div className="flex flex-col items-center gap-1 px-4">
                <div className="flex items-center gap-2">
                  <span className="w-12 sm:w-16 h-[2px] bg-slate-500 border-dashed border-t border-slate-400"></span>
                  <div className="w-10 h-10 rounded-full bg-safar-gold/20 border border-safar-gold/40 flex items-center justify-center text-safar-gold">
                    <Plane className="w-5 h-5 -rotate-90" />
                  </div>
                  <span className="w-12 sm:w-16 h-[2px] bg-slate-500 border-dashed border-t border-slate-400"></span>
                </div>
                <span className="text-[10px] text-slate-300 font-mono">رحلة كبار الشخصيات VIP</span>
              </div>

              {/* Arrival Airport */}
              <div className="space-y-1 md:text-left text-center">
                <span className="text-xs text-safar-cyan font-bold block">محطة الوصول (TO)</span>
                <strong className="text-2xl sm:text-3xl font-black tracking-tight text-white block">
                  {destination}
                </strong>
                <span className="text-xs text-slate-300 font-semibold block">المقر النهائي المعتمد</span>
              </div>
            </div>
          </div>

          {/* Passenger & Flight Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 sm:p-8 bg-white border-b border-slate-200">
            
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">اسم المسافر (PASSENGER)</span>
              <strong className="text-sm sm:text-base font-extrabold text-safar-navy block">
                {travelerName}
              </strong>
              <span className="text-[10px] text-safar-gold font-bold flex items-center gap-1">
                <Award className="w-3 h-3" />
                <span>{travelerTier}</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">تاريخ الإقلاع (DATE)</span>
              <strong className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-safar-cyan" />
                <span>{trip.departureDate.split("-")[0] || trip.departureDate}</span>
              </strong>
              <span className="text-[10px] text-slate-500 font-mono">صعود الطائرة: 09:15 ص</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">الصالة المخصصة (TERMINAL)</span>
              <strong className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="truncate">{trip.terminal}</span>
              </strong>
              <span className="text-[10px] text-emerald-600 font-bold">دخول صالة النخبة متاح</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">المقعد / الفئة (SEAT / CLASS)</span>
              <strong className="text-sm sm:text-base font-black text-safar-navy block font-mono">
                01A • VIP SUITE
              </strong>
              <span className="text-[10px] text-purple-700 font-bold flex items-center gap-1">
                <Luggage className="w-3 h-3" />
                <span>أمتعة مفتوحة 32KG × 3</span>
              </span>
            </div>

          </div>

          {/* Ticket Footer with Barcode & Official Seal */}
          <div className="p-6 sm:p-8 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Security Barcode & QR Code */}
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs shrink-0">
                <QrCode className="w-16 h-16 text-slate-800" />
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xs font-black tracking-widest text-slate-700">
                  ||| | ||||| || |||||| |||| | |||| |||
                </div>
                <div className="font-mono text-[11px] text-slate-500">
                  PNR: <strong className="text-safar-navy font-bold">{trip.id}</strong> • ISSUED BY SAFARJET
                </div>
                <p className="text-[10px] text-slate-400">
                  امسح الـ QR عند كاونتر الاستقبال للدخول الفوري لصالة الطيران الخاص.
                </p>
              </div>
            </div>

            {/* Official Agency Stamp */}
            <div className="text-center sm:text-left text-[11px] text-slate-400 space-y-1 border-t sm:border-t-0 sm:border-r border-slate-200 pt-3 sm:pt-0 sm:pr-6">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start font-bold text-safar-navy">
                <ShieldCheck className="w-4 h-4 text-safar-gold" />
                <span>وكالة سفرجيت للسياحة والسفر</span>
              </div>
              <p>مرخصة من وزارة السياحة برقم: {siteConfig.licenseNumber}</p>
              <p>عضوية الاتحاد الدولي للنقل الجوي IATA</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
