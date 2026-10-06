"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/constants/siteConfig";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden bg-safar-navy-dark">
      {/* Background Image: World Landmarks, Blue Sky & Airplane */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=85"
          alt="سفرجيت - العالم أقرب"
          fill
          priority
          className="object-cover object-center transform scale-105 transition-transform duration-10000"
        />
        {/* Luxury gradient overlay: ensures high contrast for white & cyan typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-safar-navy-dark/95 via-safar-navy/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-safar-navy-dark/90 via-transparent to-black/30"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl text-right space-y-4 pt-4 sm:pt-0">
          
          {/* Slogan Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-safar-cyan/20 border border-safar-cyan/40 text-safar-cyan text-xs sm:text-sm font-bold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-safar-gold-light" />
            <span>وكالة سفر وسياحة معتمدة</span>
          </div>

          {/* Main Slogan: "العالم أقرب" */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-safar-cyan drop-shadow-md tracking-tight">
            {siteConfig.slogan}
          </h1>

          {/* Subheading */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug drop-shadow">
            {siteConfig.sloganSub}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl drop-shadow">
            {siteConfig.description}
          </p>

          {/* CTA Action Button */}
          <div className="pt-4 flex items-center gap-4">
            <Link
              href="#booking-widget"
              className="inline-flex items-center gap-2.5 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-base sm:text-lg font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>استكشف العروض</span>
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Carousel Slider Controls (matching mockup arrows & dots) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
          <button
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="التالي"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="السابق"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Dots indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="w-7 h-2 rounded-full bg-safar-cyan"></span>
          <span className="w-2.5 h-2 rounded-full bg-white/40"></span>
          <span className="w-2.5 h-2 rounded-full bg-white/40"></span>
        </div>
      </div>
    </section>
  );
}
