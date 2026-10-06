"use client";

import React, { useState } from "react";
import { Building2, Calendar, Users, Search } from "lucide-react";

export default function HotelSearchTab() {
  const [destination, setDestination] = useState("دبي، الإمارات");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("شخصين، غرفة واحدة");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      destination,
      checkIn,
      checkOut,
      guests,
    }).toString();
    window.location.href = `/services/hotels?${query}`;
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
        
        {/* Destination */}
        <div className="lg:col-span-4 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-safar-cyan" />
            <span>المدينة أو اسم الفندق</span>
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="الوجهة السياحية..."
            className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
            required
          />
        </div>

        {/* Check-in */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-safar-cyan" />
            <span>تاريخ الدخول</span>
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          />
        </div>

        {/* Check-out */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-safar-cyan" />
            <span>تاريخ الخروج</span>
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          />
        </div>

        {/* Guests / Rooms */}
        <div className="lg:col-span-2 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-safar-cyan" />
            <span>النزلاء والغرف</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full h-12 px-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          >
            <option value="شخص، غرفة واحدة">شخص، غرفة واحدة</option>
            <option value="شخصين، غرفة واحدة">شخصين، غرفة واحدة</option>
            <option value="عائلة (3-4 أشخاص)">عائلة (3-4 أشخاص)</option>
            <option value="مجموعة VIP (أكثر من 5)">مجموعة VIP (أكثر من 5)</option>
          </select>
        </div>

        {/* Action Button */}
        <div className="lg:col-span-12 pt-3 flex justify-end border-t border-slate-100 mt-2">
          <button
            type="submit"
            className="w-full sm:w-auto min-w-[200px] h-12 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-base font-bold px-8 rounded-xl shadow-md hover:shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4" />
            <span>ابحث عن الفنادق</span>
          </button>
        </div>

      </div>
    </form>
  );
}
