"use client";

import React, { useState } from "react";
import { ArrowLeftRight, Calendar, Search, PlaneTakeoff, PlaneLanding } from "lucide-react";

export default function FlightSearchTab() {
  const [fromCity, setFromCity] = useState("الرياض (RUH)");
  const [toCity, setToCity] = useState("لندن (LHR)");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelClass, setTravelClass] = useState("الاقتصادية");

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      from: fromCity,
      to: toCity,
      depart: departDate,
      return: returnDate,
      class: travelClass,
    }).toString();
    window.location.href = `/services/flights?${query}`;
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
        
        {/* From City */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <PlaneTakeoff className="w-3.5 h-3.5 text-safar-cyan" />
            <span>من</span>
          </label>
          <input
            type="text"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            placeholder="المدينة أو المطار"
            className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
            required
          />
        </div>

        {/* Swap Button */}
        <div className="hidden lg:flex lg:col-span-1 justify-center pb-2">
          <button
            type="button"
            onClick={handleSwap}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-safar-cyan hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 shadow-sm"
            title="تبديل الوجهات"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To City */}
        <div className="lg:col-span-3 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <PlaneLanding className="w-3.5 h-3.5 text-safar-cyan" />
            <span>إلى</span>
          </label>
          <input
            type="text"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            placeholder="المدينة أو المطار"
            className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
            required
          />
        </div>

        {/* Depart Date */}
        <div className="lg:col-span-2 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-safar-cyan" />
            <span>تاريخ المغادرة</span>
          </label>
          <input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          />
        </div>

        {/* Return Date */}
        <div className="lg:col-span-2 space-y-1">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-safar-cyan" />
            <span>تاريخ العودة</span>
          </label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white transition-all"
          />
        </div>

        {/* Class Selection & Search Button Container */}
        <div className="lg:col-span-12 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 mt-2">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600">الدرجة:</span>
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-safar-cyan"
            >
              <option value="الاقتصادية">الاقتصادية</option>
              <option value="رجال الأعمال">رجال الأعمال</option>
              <option value="الدرجة الأولى">الدرجة الأولى</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto min-w-[200px] h-12 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-base font-bold px-8 rounded-xl shadow-md hover:shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4" />
            <span>ابحث عن الرحلات</span>
          </button>
        </div>

      </div>
    </form>
  );
}
