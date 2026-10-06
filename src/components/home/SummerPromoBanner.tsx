import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function SummerPromoBanner() {
  return (
    <section id="offers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative w-full h-44 sm:h-52 md:h-60 rounded-3xl overflow-hidden shadow-lg border border-slate-100 group">
        
        {/* Background Image: Tropical Island Maldives Bungalows */}
        <Image
          src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80"
          alt="وجهات صيفية مميزة - عروض خاصة"
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay for high readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-safar-navy-dark/90 via-safar-navy/70 to-transparent"></div>

        {/* Banner Content Container */}
        <div className="relative h-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-12 py-6 gap-4">
          <div className="space-y-1.5 max-w-lg text-right">
            <span className="inline-block text-xs font-bold text-safar-gold bg-safar-navy/60 px-3 py-1 rounded-full border border-safar-gold/30">
              موسم الصيف والعطلات
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              وجهات صيفية مميزة
            </h3>
            <p className="text-xs sm:text-sm text-slate-200">
              اكتشف أجمل الوجهات السياحية مع عروض وخصومات خاصة
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/services/packages"
              className="inline-flex items-center gap-2 bg-safar-navy-dark hover:bg-safar-cyan text-white text-sm sm:text-base font-bold px-7 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20"
            >
              <span>عرض العروض</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
