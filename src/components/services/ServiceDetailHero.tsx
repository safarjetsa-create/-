import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ChevronLeft, ArrowRight } from "lucide-react";

interface ServiceDetailHeroProps {
  title: string;
  subtitle: string;
  tagline: string;
  heroImage: string;
}

export default function ServiceDetailHero({
  title,
  subtitle,
  tagline,
  heroImage,
}: ServiceDetailHeroProps) {
  return (
    <section className="relative w-full h-[400px] sm:h-[480px] overflow-hidden bg-safar-navy-dark">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-safar-navy-dark/95 via-safar-navy/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-safar-navy-dark via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/#services"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-safar-cyan transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لجميع الخدمات</span>
          </Link>
        </div>

        <div className="max-w-3xl text-right space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safar-cyan/20 border border-safar-cyan/40 text-safar-cyan text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-safar-gold" />
            <span>{tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            {subtitle}
          </p>

          <div className="pt-4 flex items-center gap-4">
            <a
              href="#booking-funnel"
              className="inline-flex items-center gap-2 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-sm sm:text-base font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>طلب الخدمة وتخصيص الباقة</span>
              <ChevronLeft className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
