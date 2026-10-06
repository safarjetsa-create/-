import React from "react";
import { servicesData } from "@/constants/servicesData";
import ServiceCardItem from "./ServiceCardItem";

export default function ServicesGrid() {
  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-safar-navy tracking-tight">
            خدماتنا
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            كل ما تحتاجه في رحلتك، في مكان واحد
          </p>
          <div className="w-16 h-1 bg-safar-cyan mx-auto rounded-full mt-3"></div>
        </div>

        {/* 12 Services Grid (3 rows x 4 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {servicesData.map((service) => (
            <ServiceCardItem key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}
