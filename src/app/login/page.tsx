"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/siteConfig";
import { User, Lock, Phone, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOtpSent(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/profile";
  };

  return (
    <div className="min-h-screen py-16 bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
        
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={180}
            height={60}
            className="object-contain h-14 w-auto"
          />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-safar-navy">
            تسجيل دخول المسافر VIP
          </h2>
          <p className="text-xs text-slate-500">
            تابع حجوزاتك، تذاكرك، وعروضك الحصرية في مكان واحد
          </p>
        </div>

        {!isOtpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-right">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">رقم الجوال *</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05xxxxxxxx أو +966"
                  required
                  dir="ltr"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan text-right"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-safar-navy hover:bg-safar-navy-light text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              إرسال رمز التحقق (OTP)
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 text-right">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">رمز التحقق المرسل لجوالك *</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="أدخل الرمز المكون من 4 أرقام (مثال: 1234)"
                required
                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-center tracking-widest text-lg font-bold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-safar-cyan hover:bg-safar-cyan-hover text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              تأكيد الدخول
            </button>

            <button
              type="button"
              onClick={() => setIsOtpSent(false)}
              className="w-full text-xs text-slate-400 hover:text-slate-600 pt-1"
            >
              تغيير رقم الجوال
            </button>
          </form>
        )}

        {/* Security message */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>دخول آمن ومشفر برقم الجوال المعتمد</span>
        </div>

        {/* Staff portal link */}
        <div className="pt-2 text-center">
          <Link
            href="/admin"
            className="text-xs text-safar-gold hover:underline font-bold inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>دخول فريق عمل الوكالة (لوحة التحكم SafarJet OS)</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
