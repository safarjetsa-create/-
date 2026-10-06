"use client";

import React, { useState } from "react";
import { siteConfig } from "@/constants/siteConfig";
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Clock } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: name,
          clientPhone: phone,
          serviceTitle: "رسالة استفسار من صفحة التواصل",
          details: { message },
        }),
      });
    } catch (err) {
      console.error("Failed to submit contact message:", err);
    }
    setSent(true);
  };

  return (
    <div className="py-16 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-safar-cyan bg-safar-cyan/10 px-3 py-1 rounded-full border border-safar-cyan/20">
            خدمة عملاء 24/7
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-safar-navy">
            تواصل مع فريق <span className="text-safar-cyan">سفرجيت</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            نحن هنا للإجابة على استفساراتكم وتصميم عطلاتكم القادمة بكل شغف واحترافية
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          
          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-safar-navy border-r-4 border-safar-cyan pr-3">
                بيانات الاتصال المباشرة
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-safar-cyan/10 text-safar-cyan flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-700">الاتصال الهاتفي:</strong>
                    <span className="text-slate-500 font-semibold" dir="ltr">{siteConfig.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-700">واتساب المبيعات المباشر:</strong>
                    <span className="text-slate-500 font-semibold" dir="ltr">{siteConfig.whatsapp}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-safar-gold/10 text-safar-gold flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-700">البريد الإلكتروني:</strong>
                    <span className="text-slate-500 font-semibold">{siteConfig.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-safar-navy/10 text-safar-navy flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-700">المقر الرئيسي:</strong>
                    <span className="text-slate-500 font-semibold">{siteConfig.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-700">أوقات العمل:</strong>
                    <span className="text-slate-500">طوال أيام الأسبوع على مدار 24 ساعة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-safar-navy border-r-4 border-safar-gold pr-3 mb-6">
                  أرسل لنا رسالة أو استفساراً
                </h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">الاسم الكريم *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اسمك الكامل..."
                    required
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">رقم الجوال أو الواتساب *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                    required
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan text-right"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">تفاصيل الاستفسار أو الوجهة المطلوبة *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب استفسارك هنا..."
                    required
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-safar-cyan"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-safar-navy hover:bg-safar-navy-light text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-safar-gold" />
                  <span>إرسال الرسالة الآن</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold text-safar-navy">تم إرسال رسالتك بنجاح!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  شكراً لتواصلك يا أستاذ {name}. سيقوم فريق خدمة العملاء بالتواصل معك عبر الواتساب في أقرب وقت.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
