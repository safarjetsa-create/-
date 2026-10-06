"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, User, Menu, X, ChevronDown } from "lucide-react";
import { mainNavLinks } from "@/constants/navigation";
import { siteConfig } from "@/constants/siteConfig";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("العربية");

  // Admin OS has its own dedicated operations header
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full glass-nav border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Right Section: Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-14 sm:h-16 py-1 flex items-center">
                <Image
                  src="/logo.png"
                  alt={siteConfig.name}
                  width={200}
                  height={80}
                  className="object-contain h-full w-auto transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center Section: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-semibold text-slate-700 hover:text-safar-cyan transition-colors duration-200 relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-safar-cyan transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Left Section: Language Switcher & User Login */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Selector */}
            <button 
              onClick={() => setCurrentLang(currentLang === "العربية" ? "English" : "العربية")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all duration-200"
              title="تغيير اللغة"
            >
              <Globe className="w-4 h-4 text-safar-cyan" />
              <span>{currentLang}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Login / VIP Account Button */}
            <Link
              href="/login"
              className="flex items-center gap-2 bg-safar-navy text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-safar-navy-light hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <User className="w-4 h-4 text-safar-cyan" />
              <span>تسجيل الدخول</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {mainNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100 hover:text-safar-cyan transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-3">
            <div className="flex items-center justify-between px-3">
              <span className="text-sm font-medium text-slate-600">اللغة:</span>
              <button
                onClick={() => setCurrentLang(currentLang === "العربية" ? "English" : "العربية")}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border border-slate-200"
              >
                <Globe className="w-4 h-4 text-safar-cyan" />
                <span>{currentLang}</span>
              </button>
            </div>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-safar-navy text-white px-4 py-2.5 rounded-xl font-bold shadow-md"
            >
              <User className="w-4 h-4 text-safar-cyan" />
              <span>تسجيل الدخول</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
