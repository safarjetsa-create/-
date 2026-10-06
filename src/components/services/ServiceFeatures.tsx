import React from "react";
import {
  Building2,
  Car,
  CheckCircle,
  Compass,
  Plane,
  Sparkles,
  Gift,
  ShieldCheck,
  HeartPulse,
  GraduationCap,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Car,
  CheckCircle,
  Compass,
  Plane,
  Sparkles,
  Gift,
  ShieldCheck,
  HeartPulse,
  GraduationCap,
};

interface FeatureItem {
  title: string;
  desc: string;
  icon: string;
}

interface ServiceFeaturesProps {
  features: FeatureItem[];
  description: string;
}

export default function ServiceFeatures({ features, description }: ServiceFeaturesProps) {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Description Callout */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-safar-navy">
            لماذا تختار سفرجيت لهذه الخدمة؟
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
          <div className="w-16 h-1 bg-safar-gold mx-auto rounded-full mt-3"></div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = iconMap[feat.icon] || CheckCircle;
            return (
              <div
                key={idx}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100/80 hover:border-safar-cyan/40 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-safar-cyan/10 text-safar-cyan flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-safar-navy mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
