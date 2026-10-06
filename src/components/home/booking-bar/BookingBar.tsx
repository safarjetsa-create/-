"use client";

import React, { useState } from "react";
import { Plane, Building2, Car, Gift } from "lucide-react";
import FlightSearchTab from "./FlightSearchTab";
import HotelSearchTab from "./HotelSearchTab";
import TransportSearchTab from "./TransportSearchTab";
import PackageSearchTab from "./PackageSearchTab";

type TabType = "flights" | "hotels" | "transport" | "packages";

export default function BookingBar() {
  const [activeTab, setActiveTab] = useState<TabType>("flights");

  const tabs = [
    { id: "flights" as TabType, label: "حجوزات الطيران", icon: Plane },
    { id: "hotels" as TabType, label: "الفنادق", icon: Building2 },
    { id: "transport" as TabType, label: "النقل والمواصلات", icon: Car },
    { id: "packages" as TabType, label: "باقات متكاملة", icon: Gift },
  ];

  return (
    <div id="booking-widget" className="relative -mt-16 sm:-mt-20 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden backdrop-blur-lg">
        
        {/* Top Tabs Bar */}
        <div className="flex items-center overflow-x-auto border-b border-slate-100 bg-slate-50/70 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-bold transition-all relative whitespace-nowrap min-w-[140px] sm:min-w-0 flex-1 ${
                  isActive
                    ? "text-safar-cyan bg-white border-t-2 border-t-safar-cyan shadow-sm"
                    : "text-slate-600 hover:text-safar-navy hover:bg-slate-100/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-safar-cyan" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-safar-cyan"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="p-5 sm:p-6 lg:p-8 bg-white">
          {activeTab === "flights" && <FlightSearchTab />}
          {activeTab === "hotels" && <HotelSearchTab />}
          {activeTab === "transport" && <TransportSearchTab />}
          {activeTab === "packages" && <PackageSearchTab />}
        </div>

      </div>
    </div>
  );
}
