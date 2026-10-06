"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/siteConfig";
import AudioAlerts from "@/components/admin/AudioAlerts";
import CRMKanban from "@/components/admin/CRMKanban";
import PackageBuilder from "@/components/admin/PackageBuilder";
import LiveWhatsAppMonitor from "@/components/admin/LiveWhatsAppMonitor";
import { 
  Users, 
  Package, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Radio, 
  CheckCircle2, 
  Sparkles,
  Layers
} from "lucide-react";

type AdminTab = "crm" | "packages" | "whatsapp";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("crm");
  const [currentTime, setCurrentTime] = useState("");
  const [stats, setStats] = useState({
    totalLeads: 24,
    activeWhatsapp: 8,
    activePackages: 12,
    conversionRate: "88.4%",
  });

  // Real-time Riyadh clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ar-SA", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch live stats from API
  useEffect(() => {
    const loadStats = async () => {
      try {
        const [inqRes, pkgRes] = await Promise.all([
          fetch("/api/inquiries"),
          fetch("/api/packages"),
        ]);
        if (inqRes.ok) {
          const inqData = await inqRes.json();
          if (Array.isArray(inqData)) {
            setStats((prev) => ({ ...prev, totalLeads: inqData.length }));
          }
        }
        if (pkgRes.ok) {
          const pkgData = await pkgRes.json();
          if (Array.isArray(pkgData)) {
            setStats((prev) => ({ ...prev, activePackages: pkgData.length }));
          }
        }
      } catch (err) {
        console.error("Error loading stats:", err);
      }
    };
    loadStats();
    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100/60 pb-16 text-slate-800 flex flex-col">
      
      {/* Top Admin Navbar - Full Width & Fluid */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-40 shadow-xs">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Right Section: Brand, Agency OS Badge & Live Status */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <Image
                  src="/logo.png"
                  alt={siteConfig.name}
                  width={150}
                  height={50}
                  className="object-contain h-10 sm:h-11 w-auto transition-transform group-hover:scale-105"
                  priority
                />
              </Link>

              <div className="h-7 w-[1px] bg-slate-200 hidden md:block"></div>

              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 bg-safar-navy text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-safar-gold" />
                  <span>غرفة العمليات المركزية</span>
                  <span className="hidden xl:inline text-slate-300 font-normal">| SafarJet OS</span>
                </div>

                <div className="hidden lg:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200/80">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>متصل ومباشر</span>
                </div>
              </div>
            </div>

            {/* Center Section: Live Clock (Visible on md+) */}
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-safar-cyan" />
              <span>توقيت الرياض:</span>
              <span className="font-mono font-bold text-safar-navy dir-ltr">{currentTime || "00:00:00"}</span>
            </div>

            {/* Left Section: Audio Alerts, Quick Tools & Return Link */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <AudioAlerts />

              <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-white px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-safar-navy transition-all duration-200 border border-slate-200 shadow-xs group"
              >
                <span>الموقع الرئيسي</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* Main Full-Width Responsive Workspace */}
      <main className="w-full flex-grow px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-6 space-y-6">
        
        {/* Executive KPI Metrics Grid - Fluid across 100% of viewport */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-5">
          
          {/* Card 1: Total Leads */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-safar-cyan to-blue-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">إجمالي طلبات السفر</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <strong className="text-2xl sm:text-3xl font-black text-safar-navy">{stats.totalLeads}</strong>
                  <span className="text-xs text-slate-500 font-bold">طلب نشط</span>
                </div>
              </div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-safar-cyan/10 text-safar-cyan flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+14% هذا الأسبوع</span>
              </span>
              <span>مباشر من المنصة</span>
            </div>
          </div>

          {/* Card 2: WhatsApp & AI */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">محادثات الواتساب النشطة</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <strong className="text-2xl sm:text-3xl font-black text-emerald-600">{stats.activeWhatsapp}</strong>
                  <span className="text-xs text-emerald-600/80 font-bold">محادثة</span>
                </div>
              </div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>الذكاء الاصطناعي يستجيب</span>
              </span>
              <span>توفير تكاليف Meta 100%</span>
            </div>
          </div>

          {/* Card 3: Active Packages */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-400 to-safar-gold"></div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">الباقات السياحية النشطة</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <strong className="text-2xl sm:text-3xl font-black text-safar-navy">{stats.activePackages}</strong>
                  <span className="text-xs text-slate-500 font-bold">برنامج جاهز</span>
                </div>
              </div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 text-safar-gold flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-safar-gold font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>منشورة ومتاحة للحجز</span>
              </span>
              <span>تحديث فوري</span>
            </div>
          </div>

          {/* Card 4: Conversion Rate */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">معدل تحويل الحجوزات</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <strong className="text-2xl sm:text-3xl font-black text-purple-700">{stats.conversionRate}</strong>
                  <span className="text-xs text-purple-600/80 font-bold">نسبة نجاح</span>
                </div>
              </div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-slate-500 font-semibold">متوسط سرعة الرد:</span>
              <span className="text-safar-cyan font-bold">أقل من دقيقتين ⚡</span>
            </div>
          </div>

        </div>

        {/* Tab Navigation Toolbar - Fluid & Clean */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            
            <button
              onClick={() => setActiveTab("crm")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "crm"
                  ? "bg-safar-navy text-white shadow-md shadow-safar-navy/20"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
              }`}
            >
              <Users className={`w-4 h-4 ${activeTab === "crm" ? "text-safar-cyan" : "text-slate-400"}`} />
              <span>مسار متابعة الحجوزات (CRM Kanban)</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === "crm" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
              }`}>
                {stats.totalLeads}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("packages")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "packages"
                  ? "bg-safar-navy text-white shadow-md shadow-safar-navy/20"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
              }`}
            >
              <Package className={`w-4 h-4 ${activeTab === "packages" ? "text-safar-gold" : "text-slate-400"}`} />
              <span>باني الباقات والرحلات (Package Builder)</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === "packages" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
              }`}>
                {stats.activePackages}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "whatsapp"
                  ? "bg-safar-navy text-white shadow-md shadow-safar-navy/20"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
              }`}
            >
              <MessageSquare className={`w-4 h-4 ${activeTab === "whatsapp" ? "text-emerald-400" : "text-slate-400"}`} />
              <span>خادم الواتساب ومراقبة الـ AI والتدخل</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 px-3">
            <Layers className="w-4 h-4 text-safar-cyan" />
            <span>عرض شامل ومتكيف مع كامل الشاشة</span>
          </div>
        </div>

        {/* Active Tab Workspace - Full Width Component */}
        <div className="w-full">
          {activeTab === "crm" && <CRMKanban />}
          {activeTab === "packages" && <PackageBuilder />}
          {activeTab === "whatsapp" && <LiveWhatsAppMonitor />}
        </div>

      </main>

      {/* Modern Operational Footer */}
      <footer className="mt-auto pt-10 pb-4 text-center text-xs text-slate-400 border-t border-slate-200/70">
        <div className="w-full px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>نظام تشغيل وكالة سفرجيت للسياحة والسفر (SafarJet Agency OS) • الإصدار الذكي 2.5</p>
          <p>مرخص ومعتمد من وزارة السياحة السعودية • جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </footer>

    </div>
  );
}
