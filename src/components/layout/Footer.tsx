"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/constants/siteConfig";
import { mainNavLinks } from "@/constants/navigation";
import { Phone, Mail, MapPin, ShieldCheck, HeartHandshake } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Admin OS has its own dedicated operational view, no customer footer needed
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-safar-navy-dark text-white border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-3 inline-block shadow-md">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={160}
                height={60}
                className="object-contain h-12 w-auto"
              />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {siteConfig.description}. نرافقك في كل خطوة نحو أجمل الوجهات حول العالم لنصنع لك ذكريات لا تُنسى.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-safar-gold-light font-medium">
              <ShieldCheck className="w-4 h-4 text-safar-gold" />
              <span>ترخيص وزارة السياحة: {siteConfig.licenseNumber}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white border-r-4 border-safar-cyan pr-3">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {mainNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-safar-cyan transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="text-safar-cyan text-xs">‹</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Highlights */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white border-r-4 border-safar-gold pr-3">
              خدماتنا المميزة
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="/services/umrah" className="hover:text-safar-gold-light transition-colors">باقات العمرة VIP</Link></li>
              <li><Link href="/services/flights" className="hover:text-safar-gold-light transition-colors">حجوزات الطيران والفنادق</Link></li>
              <li><Link href="/services/cruise" className="hover:text-safar-gold-light transition-colors">رحلات الكروز البحرية</Link></li>
              <li><Link href="/services/private-jets" className="hover:text-safar-gold-light transition-colors">استئجار الطائرات الخاصة</Link></li>
              <li><Link href="/services/medical" className="hover:text-safar-gold-light transition-colors">السياحة العلاجية والتعليمية</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white border-r-4 border-safar-cyan pr-3">
              تواصل معنا
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-safar-cyan shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-safar-cyan shrink-0" />
                <span dir="ltr">{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-safar-cyan shrink-0" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="pt-2">
                <div className="p-3 rounded-xl bg-safar-navy border border-slate-700 flex items-center gap-3">
                  <HeartHandshake className="w-5 h-5 text-safar-gold shrink-0" />
                  <span className="text-xs text-slate-300">مستشار السفر متاح 24/7 لخدمتكم</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} سفرجيت للسفر والسياحة. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">الشروط والأحكام</Link>
            <Link href="/faq" className="hover:text-slate-200 transition-colors">الأسئلة الشائعة</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
