"use client";

import React, { useState } from "react";
import { Car, Calendar, MapPin, CheckCircle, Search } from "lucide-react";

export default function TransportSearchTab() {
  const [city, setCity] = useState("الرياض");
  const [serviceType, setServiceType] = useState("استقبال وتوديع مطار");
  const [serviceDate, setServiceDate] = useState("");
  const [vehicleClass, setVehicleClass] = useState("مرسيدس VIP فاخرة");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      city,
      type: serviceType,
      date: serviceDate,
      vehicle: vehicleClass,
    }).toString();
    window.location.href = `/services/transport?${query}`;
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
        
        {/* City */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-safar-cyan" />
            <span>المدينة</span>
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
            required
          />
        </div>

        {/* Service Type */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-safar-cyan" />
            <span>نوع الخدمة</span>
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          >
            <option value="استقبال وتوديع مطار">استقبال وتوديع مطار</option>
            <option value="سيارة خاصة مع سائق يومي">سيارة خاصة مع سائق يومي</option>
            <option value="تنقلات بين المدن">تنقلات بين المدن</option>
          </select>
        </div>

        {/* Vehicle Class */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-safar-cyan" />
            <span>فئة السيارة</span>
          </label>
          <select
            value={vehicleClass}
            onChange={(e) => setVehicleClass(e.target.value)}
            className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          >
            <option value="سيدان فاخر">سيدان فاخر</option>
            <option value="SUV عائلي (GMC / Tahoe)">SUV عائلي (GMC / Tahoe)</option>
            <option value="فان VIP (مرسيدس V-Class)">فان VIP (مرسيدس V-Class)</option>
            <option value="مرسيدس VIP فاخرة (S-Class)">مرسيدس VIP فاخرة (S-Class)</option>
          </select>
        </div>

        {/* Date */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-safar-cyan" />
            <span>تاريخ الخدمة</span>
          </label>
          <input
            type="date"
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
            className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          />
        </div>

        {/* Action Button */}
        <div className="lg:col-span-12 pt-3 flex justify-end border-t border-slate-100 mt-2">
          <button
            type="submit"
            className="w-full sm:w-auto min-w-[200px] h-12 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-base font-bold px-8 rounded-xl shadow-md hover:shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4" />
            <span>طلب المواصلات</span>
          </button>
        </div>

      </div>
    </form>
  );
}
