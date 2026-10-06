import React from "react";
import Link from "next/link";
import { Plane, Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 text-center py-20">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 rounded-full bg-safar-navy/5 text-safar-cyan flex items-center justify-center mx-auto border-2 border-dashed border-safar-cyan">
          <Plane className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-safar-navy">404</span>
          <h2 className="text-xl font-bold text-slate-800">
            عذراً، هذه الوجهة غير متوفرة حالياً
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            الصفحة التي تبحث عنها قد تكون انتقلت أو الرابط غير صحيح. لا تقلق، العالم أقرب مع سفرجيت!
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-safar-navy hover:bg-safar-navy-light text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للصفحة الرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
