"use client";

import React, { useState } from "react";
import { Gift, MapPin, DollarSign, Calendar, Search } from "lucide-react";

export default function PackageSearchTab() {
  const [destination, setDestination] = useState("المالديف - جزر استوائية");
  const [packageType, setPackageType] = useState("شهر عسل VIP");
  const [budget, setBudget] = useState("10,000 - 20,000 ريال");
  const [month, setMonth] = useState("خلال هذا الشهر");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      dest: destination,
      type: packageType,
      budget,
      month,
    }).toString();
    window.location.href = `/services/packages?${query}`;
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
        
        {/* Preferred Destination */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-safar-cyan" />
            <span>الوجهة المفضلة</span>
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
            required
          />
        </div>

        {/* Package Type */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-safar-cyan" />
            <span>نوع الباقة</span>
          </label>
          <select
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          >
            <option value="شهر عسل VIP">شهر عسل VIP</option>
            <option value="رحلة عائلية شاملة">رحلة عائلية شاملة</option>
            <option value="شبابية ومغامرات">شبابية ومغامرات</option>
            <option value="باقات استكشاف طبيعة">باقات استكشاف طبيعة</option>
          </select>
        </div>

        {/* Budget */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-safar-cyan" />
            <span>الميزانية التقريبية</span>
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          >
            <option value="أقل من 10,000 ريال">أقل من 10,000 ريال</option>
            <option value="10,000 - 20,000 ريال">10,000 - 20,000 ريال</option>
            <option value="20,000 - 40,000 ريال">20,000 - 40,000 ريال</option>
            <option value="باقة VIP فاخرة (مفتوحة)">باقة VIP فاخرة (مفتوحة)</option>
          </select>
        </div>

        {/* Travel Month */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-safar-cyan" />
            <span>وقت السفر المتوقع</span>
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          >
            <option value="خلال هذا الشهر">خلال هذا الشهر</option>
            <option value="خلال 3 أشهر القادمة">خلال 3 أشهر القادمة</option>
            <option value="في الإجازة الصيفية">في الإجازة الصيفية</option>
            <option value="في عطلة الشتاء">في عطلة الشتاء</option>
          </select>
        </div>

        {/* Action Button */}
        <div className="lg:col-span-12 pt-3 flex justify-end border-t border-slate-100 mt-2">
          <button
            type="submit"
            className="w-full sm:w-auto min-w-[200px] h-12 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-base font-bold px-8 rounded-xl shadow-md hover:shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4" />
            <span>استعراض الباقات المتاحة</span>
          </button>
        </div>

      </div>
    </form>
  );
}
