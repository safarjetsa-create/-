"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  MessageSquare, 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Calendar, 
  CheckCircle2, 
  Trash2, 
  Search, 
  RefreshCw, 
  Filter, 
  Phone,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download
} from "lucide-react";
import PDFQuoteGenerator from "./PDFQuoteGenerator";

export interface LeadItem {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceTitle: string;
  travelDate?: string;
  details?: Record<string, string>;
  status: "new" | "contacted" | "quoted" | "booked" | "completed";
  createdAt: string;
}

export default function CRMKanban() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [selectedQuoteLead, setSelectedQuoteLead] = useState<LeadItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load leads from /api/inquiries with live polling
  const fetchLeads = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setLeads(data);
        }
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 4000);
    return () => clearInterval(interval);
  }, []);

  const updateLeadStatus = async (leadId: string, newStatus: LeadItem["status"]) => {
    // Optimistic UI update
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));

    try {
      await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status on server:", err);
      fetchLeads();
    }
  };

  const deleteLead = async (leadId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الطلب نهائياً من النظام؟")) {
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      try {
        await fetch(`/api/inquiries?id=${leadId}`, { method: "DELETE" });
      } catch (err) {
        console.error("Failed to delete lead on server:", err);
        fetchLeads();
      }
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) {
      alert("لا توجد طلبات لتصديرها حالياً");
      return;
    }
    const headers = ["رقم الطلب", "اسم العميل", "رقم الجوال", "الخدمة المطلوبة", "تاريخ السفر", "الحالة", "تاريخ الإنشاء"];
    const statusLabels: Record<string, string> = {
      new: "طلب جديد",
      contacted: "جاري التواصل",
      quoted: "تم إرسال العرض",
      booked: "تم تأكيد الحجز",
      completed: "رحلة مكتملة",
    };

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${(l.clientName || "").replace(/"/g, '""')}"`,
      `"${(l.clientPhone || "").replace(/"/g, '""')}"`,
      `"${(l.serviceTitle || "").replace(/"/g, '""')}"`,
      `"${(l.travelDate || "").replace(/"/g, '""')}"`,
      `"${statusLabels[l.status] || l.status}"`,
      `"${l.createdAt ? new Date(l.createdAt).toLocaleDateString("ar-SA") : ""}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `safarjet_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns: { 
    id: LeadItem["status"]; 
    title: string; 
    iconText: string; 
    accentColor: string; 
    headerBg: string; 
    badgeBg: string;
    borderTopColor: string;
  }[] = [
    { 
      id: "new", 
      title: "طلبات جديدة", 
      iconText: "📥", 
      accentColor: "text-amber-700", 
      headerBg: "bg-amber-50/80", 
      badgeBg: "bg-amber-100 text-amber-800",
      borderTopColor: "border-t-amber-500" 
    },
    { 
      id: "contacted", 
      title: "جاري التواصل", 
      iconText: "📞", 
      accentColor: "text-blue-700", 
      headerBg: "bg-blue-50/80", 
      badgeBg: "bg-blue-100 text-blue-800",
      borderTopColor: "border-t-blue-500" 
    },
    { 
      id: "quoted", 
      title: "تم إرسال العرض", 
      iconText: "📑", 
      accentColor: "text-purple-700", 
      headerBg: "bg-purple-50/80", 
      badgeBg: "bg-purple-100 text-purple-800",
      borderTopColor: "border-t-purple-500" 
    },
    { 
      id: "booked", 
      title: "تم تأكيد الحجز", 
      iconText: "💳", 
      accentColor: "text-emerald-700", 
      headerBg: "bg-emerald-50/80", 
      badgeBg: "bg-emerald-100 text-emerald-800",
      borderTopColor: "border-t-emerald-500" 
    },
    { 
      id: "completed", 
      title: "رحلات مكتملة", 
      iconText: "✅", 
      accentColor: "text-slate-700", 
      headerBg: "bg-slate-100/90", 
      badgeBg: "bg-slate-200 text-slate-700",
      borderTopColor: "border-t-slate-500" 
    },
  ];

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((item) => {
      const matchesSearch = 
        !searchQuery.trim() ||
        item.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clientPhone?.includes(searchQuery) ||
        item.serviceTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const getInitials = (name: string) => {
    if (!name) return "عم";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`;
    return name.slice(0, 2);
  };

  return (
    <div className="space-y-5 w-full">
      
      {/* Smart Control Bar: Search, Quick Filters & Refresh */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Title & Description */}
        <div>
          <h2 className="text-base sm:text-lg font-black text-safar-navy flex items-center gap-2">
            <span>مسار متابعة طلبات العملاء والحجوزات (CRM Pipeline)</span>
            <span className="text-xs bg-safar-cyan/15 text-safar-cyan font-extrabold px-2.5 py-0.5 rounded-full">
              {leads.length} إجمالي الطلبات
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            تحكم كامل في دورة حياة العميل من أول رسالة وحتى إنهاء الرحلة بنجاح تام
          </p>
        </div>

        {/* Search & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Quick Search Input */}
          <div className="relative flex-grow sm:flex-grow-0 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالاسم، الجوال، أو الوجهة..."
              className="w-full h-10 pr-9 pl-4 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:border-transparent bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Export to Excel (CSV) Button */}
          <button
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-3.5 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-all border border-emerald-200"
            title="تصدير جدول الطلبات إلى ملف Excel (CSV)"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">تصدير Excel</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={fetchLeads}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3.5 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
            title="تحديث البيانات الآن"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-safar-cyan" : ""}`} />
            <span className="hidden sm:inline">تحديث</span>
          </button>
        </div>

      </div>

      {/* Adaptive Kanban Board - Stretches full-width on desktop, scrolls naturally on mobile */}
      <div className="flex xl:grid xl:grid-cols-5 gap-4 overflow-x-auto pb-6 w-full scrollbar-thin scrollbar-thumb-slate-300">
        {columns.map((col) => {
          const colLeads = filteredLeads.filter((l) => l.status === col.id);
          
          return (
            <div
              key={col.id}
              className={`min-w-[290px] sm:min-w-[320px] xl:min-w-0 flex-1 flex flex-col bg-slate-100/70 rounded-2xl border border-slate-200/90 border-t-4 ${col.borderTopColor} shadow-xs p-3 transition-all duration-200`}
            >
              
              {/* Column Header */}
              <div className={`flex items-center justify-between p-2.5 rounded-xl mb-3 border border-slate-200/60 ${col.headerBg}`}>
                <div className="flex items-center gap-2">
                  <span className="text-base">{col.iconText}</span>
                  <h3 className={`text-xs font-black ${col.accentColor}`}>{col.title}</h3>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-xs ${col.badgeBg}`}>
                  {colLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-grow flex flex-col">
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-200/90 hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group space-y-3"
                  >
                    {/* Card Top: ID & Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-black text-safar-cyan bg-safar-cyan/10 px-2 py-0.5 rounded-md">
                        {lead.id}
                      </span>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="text-slate-300 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors"
                          title="حذف الطلب"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Client Identity & Service Info */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-safar-navy to-slate-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-xs">
                          {getInitials(lead.clientName)}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-black text-slate-800 truncate" title={lead.clientName}>
                            {lead.clientName}
                          </h4>
                          <span className="text-[10px] text-slate-400 block font-mono dir-ltr truncate text-right">
                            {lead.clientPhone}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <p className="text-[11px] font-bold text-safar-navy line-clamp-2">
                          {lead.serviceTitle}
                        </p>
                        {lead.travelDate && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold mt-1">
                            <Calendar className="w-3 h-3 text-safar-cyan shrink-0" />
                            <span>تاريخ السفر: {lead.travelDate}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Fast Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={`https://wa.me/${lead.clientPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`يا هلا بك أ. ${lead.clientName}.. معك فريق العمليات في وكالة سفرجيت بخصوص طلبكم (${lead.serviceTitle})`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold py-1.5 px-2 rounded-lg border border-emerald-200 transition-colors"
                        title="محادثة واتساب فورية"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>واتساب</span>
                      </a>

                      <button
                        onClick={() => setSelectedQuoteLead(lead)}
                        className="flex items-center justify-center gap-1.5 bg-safar-navy/5 hover:bg-safar-navy/10 text-safar-navy text-[11px] font-bold py-1.5 px-2 rounded-lg border border-safar-navy/20 transition-colors"
                        title="توليد عرض سعر رسمي PDF"
                      >
                        <FileText className="w-3.5 h-3.5 text-safar-gold" />
                        <span>عرض PDF</span>
                      </button>
                    </div>

                    {/* Pipeline Stage Transitions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                      {col.id !== "new" ? (
                        <button
                          onClick={() => {
                            const statuses: LeadItem["status"][] = ["new", "contacted", "quoted", "booked", "completed"];
                            const prevIdx = statuses.indexOf(col.id) - 1;
                            if (prevIdx >= 0) updateLeadStatus(lead.id, statuses[prevIdx]);
                          }}
                          className="text-slate-400 hover:text-slate-700 flex items-center gap-1 font-bold transition-colors py-0.5 px-1.5 rounded hover:bg-slate-100"
                          title="إرجاع للمرحلة السابقة"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                          <span>السابق</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                          <span>طلب جديد</span>
                        </span>
                      )}

                      {col.id !== "completed" && (
                        <button
                          onClick={() => {
                            const statuses: LeadItem["status"][] = ["new", "contacted", "quoted", "booked", "completed"];
                            const nextIdx = statuses.indexOf(col.id) + 1;
                            if (nextIdx < statuses.length) updateLeadStatus(lead.id, statuses[nextIdx]);
                          }}
                          className="text-safar-cyan font-bold hover:text-safar-cyan-hover flex items-center gap-1 mr-auto transition-colors py-0.5 px-1.5 rounded hover:bg-safar-cyan/10"
                          title="ترقية للمرحلة التالية"
                        >
                          <span>التالي</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                  </div>
                ))}

                {colLeads.length === 0 && (
                  <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white/40">
                    <span className="text-2xl mb-1 opacity-40">{col.iconText}</span>
                    <span className="text-xs font-semibold text-slate-400">لا توجد طلبات هنا حالياً</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Quote Generator Modal */}
      {selectedQuoteLead && (
        <PDFQuoteGenerator
          quote={{
            clientName: selectedQuoteLead.clientName,
            clientPhone: selectedQuoteLead.clientPhone,
            destination: selectedQuoteLead.serviceTitle,
            durationDays: 5,
            totalPrice: 18500,
            itinerary: [
              { day: 1, title: "الاستقبال الخاص والانتقال لمقر الإقامة", desc: "استقبال من صالة كبار الشخصيات والتوصيل بسيارة خاصة فاخرة." },
              { day: 2, title: "جولة سياحية مخصصة ومعالم المدينة", desc: "برنامج سياحي خاص مع مرشد معتمد ووجبة غداء فاخرة." },
              { day: 3, title: "أنشطة استرخاء وتجارب حصرية", desc: "وقت حر للاستجمام أو التسوق في أرقى المجمعات العالمية." },
              { day: 4, title: "برنامج مسائي وعشاء في مطعم بانورامي", desc: "سهرة راقية بإطلالة مميزة وتجربة ضيافة استثنائية." },
              { day: 5, title: "توديع المطار والعودة للوطن بحفظ الله", desc: "إنهاء إجراءات المغادرة ونقل الأمتعة بسلاسة تامة." },
            ],
            inclusions: [
              "فندق 5 نجوم مع إفطار يومي فاخر",
              "سيارة خاصة وسائق طوال فترة الرحلة",
              "شريحة اتصال وإنترنت مجانية للعميل",
              "خدمة الكونسيرج ومتابعة 24 ساعة",
            ],
          }}
          onClose={() => setSelectedQuoteLead(null)}
        />
      )}

    </div>
  );
}
