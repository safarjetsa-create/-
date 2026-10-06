import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceItem } from "@/constants/servicesData";
import {
  Landmark,
  Car,
  Building2,
  Plane,
  Briefcase,
  Ship,
  Compass,
  MapPin,
  Gift,
  Sparkles,
  HeartPulse,
  GraduationCap,
  LucideIcon,
} from "lucide-react";

// Icon mapping dictionary
const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Car,
  Building2,
  Plane,
  Briefcase,
  Ship,
  Compass,
  MapPin,
  Gift,
  Sparkles,
  HeartPulse,
  GraduationCap,
};

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCardItem({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || Compass;

  return (
    <Link
      href={service.href}
      className="group block bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-xl hover:border-safar-cyan/30 transition-all duration-300 transform hover:-translate-y-1 relative"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-slate-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Badge if exists (e.g. VIP / عروض) */}
        {service.badge && (
          <span className="absolute top-2.5 right-2.5 bg-safar-gold text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
            {service.badge}
          </span>
        )}

        {/* Circular Floating Icon Badge (matching the mockup design) */}
        <div className="absolute bottom-2.5 right-2.5 w-10 h-10 rounded-full bg-safar-cyan text-white flex items-center justify-center shadow-lg border-2 border-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-safar-navy">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Card Content */}
      <div className="pt-3 pb-1 px-1 text-center">
        <h3 className="text-base font-extrabold text-safar-navy group-hover:text-safar-cyan transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
          {service.subtitle}
        </p>
      </div>
    </Link>
  );
}
