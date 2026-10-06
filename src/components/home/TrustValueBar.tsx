import React from "react";
import { Globe2, ShieldCheck, Headphones, Gift } from "lucide-react";

export default function TrustValueBar() {
  const values = [
    {
      icon: Globe2,
      title: "وجهات حول العالم",
      description: "أكثر من 200 وجهة عالمية",
    },
    {
      icon: ShieldCheck,
      title: "حجز آمن وموثوق",
      description: "تجربة حجز وتأكيد معتمدة",
    },
    {
      icon: Headphones,
      title: "دعم على مدار الساعة",
      description: "خدمة عملاء ومستشار ذكي 24/7",
    },
    {
      icon: Gift,
      title: "عروض حصرية",
      description: "أسعار وبرامج خاصة لعملائنا",
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-safar-navy/5 text-safar-navy flex items-center justify-center shrink-0 border border-safar-navy/10">
                  <Icon className="w-7 h-7 text-safar-navy" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-safar-navy">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
