"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/siteConfig";
import {
  User,
  Plane,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Download,
  ShieldCheck,
  Star,
  Award,
  CreditCard,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  PhoneCall
} from "lucide-react";
import LuxuryBoardingPassModal, { TripVoucherData } from "@/components/profile/LuxuryBoardingPassModal";

export default function CustomerProfilePage() {
  const [activeTab, setActiveTab] = useState<"trips" | "quotes" | "loyalty">("trips");
  const [selectedVoucherTrip, setSelectedVoucherTrip] = useState<TripVoucherData | null>(null);

  const traveler = {
    name: "فهد بن ناصر القحطاني",
    tier: "عضوية النخبة الذهبية (VIP Gold)",
    phone: "+966 50 889 1234",
    email: "fahad.alqahtani@example.com",
    points: 18450,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    advisor: {
      name: "سلطان العتيبي",
      role: "المستشار السياحي الخاص لكبار الشخصيات",
      phone: "+966 50 000 0000",
    },
  };

  const upcomingTrips = [
    {
      id: "SJ-804192",
      title: "استئجار طائرة خاصة VIP (Gulfstream G650)",
      route: "الرياض (RUH) ✈️ لندن (LHR)",
      departureDate: "15 أكتوبر 2026 - 10:00 صباحاً",
      status: "مؤكد وجاهز للإقلاع",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      terminal: "صالة الطيران الخاص (VIP Terminal)",
      passengers: 4,
    },
    {
      id: "SJ-203584",
      title: "باقة سحر جزر المالديف الملكي - فيلا مائية",
      route: "الرياض ✈️ مطار ماليه الدولي ✈️ منتجع والدورف أستوريا",
      departureDate: "01 نوفمبر 2026",
      status: "جاري استكمال الحجز",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      terminal: "الخطوط السعودية - درجة أولى",
      passengers: 2,
    },
  ];

  const pendingQuotes = [
    {
      id: "SJ-739102",
      title: "باقة العمرة الملكية وإقامة فندق دار التوحيد",
      submittedDate: "28 سبتمبر 2026",
      status: "تم إرسال عرض السعر",
      amount: "14,800 ريال",
      validUntil: "05 أكتوبر 2026",
    },
    {
      id: "SJ-612984",
      title: "عطلة الصيف العائلية في سويسرا والبوسنة",
      submittedDate: "26 سبتمبر 2026",
      status: "قيد المراجعة وإعداد البرنامج",
      amount: "بانتظار التسعير النهائي",
      validUntil: "--",
    },
  ];

  const handleDownloadVoucher = (trip: TripVoucherData) => {
    setSelectedVoucherTrip(trip);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top VIP Member Header */}
        <div className="bg-gradient-to-r from-safar-navy-dark via-safar-navy to-safar-navy-light text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-safar-cyan/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Identity & Avatar */}
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-safar-gold shadow-lg shrink-0">
                <Image
                  src={traveler.avatar}
                  alt={traveler.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="bg-safar-gold/20 text-safar-gold-light border border-safar-gold/40 text-[11px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{traveler.tier}</span>
                  </span>
                </div>
                <h1 className="text-xl sm:text-3xl font-extrabold">{traveler.name}</h1>
                <p className="text-xs sm:text-sm text-slate-300 font-mono dir-ltr text-right">
                  {traveler.phone} • {traveler.email}
                </p>
              </div>
            </div>

            {/* Loyalty Points & Concierge CTA */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-center sm:text-right">
                <span className="text-[11px] text-slate-300 block">رصيد نقاط النخبة:</span>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <Sparkles className="w-4 h-4 text-safar-gold" />
                  <strong className="text-xl sm:text-2xl font-black text-safar-gold-light">
                    {traveler.points.toLocaleString()}
                  </strong>
                  <span className="text-xs text-white">نقطة</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("مرحباً، معك عضو النخبة VIP فهد بن ناصر، أحتاج مساعدة في حجوزاتي القادمة")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>مستشارك الخاص (سلطان)</span>
              </a>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("trips")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              activeTab === "trips"
                ? "bg-safar-navy text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <Plane className="w-4 h-4 text-safar-cyan" />
            <span>رحلاتي القادمة ({upcomingTrips.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              activeTab === "quotes"
                ? "bg-safar-navy text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <FileText className="w-4 h-4 text-safar-gold" />
            <span>عروض الأسعار والطلبات ({pendingQuotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("loyalty")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              activeTab === "loyalty"
                ? "bg-safar-navy text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <Award className="w-4 h-4 text-purple-600" />
            <span>مزايا عضوية النخبة</span>
          </button>
        </div>

        {/* Tab 1: Upcoming Trips */}
        {activeTab === "trips" && (
          <div className="space-y-6">
            {upcomingTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold bg-safar-navy text-white px-3 py-1 rounded-xl">
                      {trip.id}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-safar-navy">{trip.title}</h3>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${trip.statusColor}`}>
                    {trip.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 block font-semibold">خط السير والوجهة:</span>
                    <strong className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-safar-cyan" />
                      <span>{trip.route}</span>
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block font-semibold">موعد المغادرة:</span>
                    <strong className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-safar-gold" />
                      <span>{trip.departureDate}</span>
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block font-semibold">الصالة / المقاعد:</span>
                    <strong className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{trip.terminal} ({trip.passengers} مسافرين)</span>
                    </strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleDownloadVoucher(trip)}
                    className="inline-flex items-center gap-2 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل وثيقة السفر وتصريح الصالة (PDF)</span>
                  </button>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`السلام عليكم.. بخصوص رحلتي القادمة رقم (${trip.id}) أود تعديل بعض التفضيلات الخاصة`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-safar-navy font-bold py-2 px-3 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>تعديل تفضيلات الوجبات والخدمة</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Pending Quotes */}
        {activeTab === "quotes" && (
          <div className="space-y-4">
            {pendingQuotes.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-safar-cyan bg-safar-cyan/10 px-2.5 py-0.5 rounded-md">
                      {q.id}
                    </span>
                    <span className="text-[11px] text-slate-400">تاريخ الطلب: {q.submittedDate}</span>
                  </div>
                  <h4 className="text-sm font-bold text-safar-navy">{q.title}</h4>
                  <p className="text-xs text-slate-500">
                    الحالة: <span className="font-bold text-purple-700">{q.status}</span> • السعر التقديري: <strong className="text-safar-navy">{q.amount}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`السلام عليكم، بخصوص عرض السعر رقم (${q.id}) حاب استفسر عن إمكانية تأكيد الحجز`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-safar-navy hover:bg-safar-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                  >
                    مراجعة وتأكيد العرض
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: VIP Loyalty Benefits */}
        {activeTab === "loyalty" && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Award className="w-6 h-6 text-safar-gold" />
              <h3 className="text-lg font-bold text-safar-navy">مزايا عضوية النخبة الذهبية (VIP Gold)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="text-xs sm:text-sm font-bold text-safar-navy">دخول مجاني لصالات كبار الشخصيات</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  استمتع بدخول مجاني غير محدود لصالات Al Fursan وصالات الطيران الخاص في مطارات الرياض وجدة والدمام ودبي.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="text-xs sm:text-sm font-bold text-safar-navy">مستشار سياحي مخصص 24/7</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  مدير حساب خاص ومستشار خبير جاهز للرد على اتصالاتك ورسائلك في أي وقت لتنسيق كافة متطلبات سفرك الفوري.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="text-xs sm:text-sm font-bold text-safar-navy">ترقية مجانية في الفنادق الشريكة</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  أولوية الترقية إلى أجنحة وفلل أعلى درجة وتسجيل وصول مبكر ومغادرة متأخرة مجانية في فنادق الـ 5 نجوم.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Luxury Boarding Pass & Lounge Access Voucher Modal */}
      {selectedVoucherTrip && (
        <LuxuryBoardingPassModal
          trip={selectedVoucherTrip}
          travelerName={traveler.name}
          travelerTier={traveler.tier}
          onClose={() => setSelectedVoucherTrip(null)}
        />
      )}
    </div>
  );
}
