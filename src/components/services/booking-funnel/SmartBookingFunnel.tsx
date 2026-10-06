"use client";

import React, { useState } from "react";
import { ServiceDetailConfig } from "@/constants/serviceDetails";
import { siteConfig } from "@/constants/siteConfig";
import { Check, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck, Sparkles, Send } from "lucide-react";

interface SmartBookingFunnelProps {
  service: ServiceDetailConfig;
}

export default function SmartBookingFunnel({ service }: SmartBookingFunnelProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  // Generate WhatsApp Message
  const getWhatsAppMessage = () => {
    let msg = `*طلب خدمة سياحية فاخرة - سفرجيت*\n`;
    msg += `---------------------------------\n`;
    msg += `✈️ *الخدمة:* ${service.title}\n`;
    msg += `👤 *العميل:* ${clientName}\n`;
    msg += `📱 *الجوال:* ${clientPhone}\n`;
    if (clientEmail) msg += `📧 *الإيميل:* ${clientEmail}\n`;
    if (travelDate) msg += `📅 *تاريخ السفر:* ${travelDate}\n`;
    msg += `\n*تفاصيل واختيارات الرحلة:*\n`;

    service.formFields.forEach((field) => {
      const val = formData[field.id] || "غير محدد";
      msg += `• *${field.label}:* ${val}\n`;
    });

    msg += `\nالعالم أقرب مع سفرجيت 🌍`;
    return encodeURIComponent(msg);
  };

  const handleConfirmOrder = () => {
    const ref = "SJ-" + Math.floor(100000 + Math.random() * 900000);
    setOrderRef(ref);

    // Save lead in local pipeline storage for admin dashboard to display
    const newLead = {
      id: ref,
      clientName,
      clientPhone,
      clientEmail,
      serviceTitle: service.title,
      serviceId: service.id,
      travelDate,
      details: formData,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    // Send to backend API so it appears in Admin CRM in real-time
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLead),
    }).catch((err) => console.error("Error submitting lead to API:", err));

    try {
      const existingLeads = JSON.parse(localStorage.getItem("safarjet_leads") || "[]");
      existingLeads.unshift(newLead);
      localStorage.setItem("safarjet_leads", JSON.stringify(existingLeads));
    } catch {
      // safe fallback
    }

    setSubmitted(true);
  };

  return (
    <section id="booking-funnel" className="py-16 sm:py-20 bg-slate-50/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold text-safar-gold bg-safar-gold/10 px-3 py-1 rounded-full border border-safar-gold/20">
            معالج التخصيص الذكي
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-safar-navy">
            تخصيص وطلب {service.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            حدد تفاصيل رحلتك بخطوات بسيطة واحصل على استشارة وتأكيد فوري
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-10 relative">
          <div className="absolute top-1/2 inset-x-0 h-0.5 bg-slate-200 -translate-y-1/2 -z-0"></div>
          
          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              currentStep >= 1 ? "bg-safar-cyan text-white shadow-md" : "bg-slate-200 text-slate-600"
            }`}>
              {currentStep > 1 ? <Check className="w-5 h-5" /> : "1"}
            </div>
            <span className="text-xs font-bold text-slate-700 mt-2">التفاصيل</span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              currentStep >= 2 ? "bg-safar-cyan text-white shadow-md" : "bg-white text-slate-400 border border-slate-300"
            }`}>
              {currentStep > 2 ? <Check className="w-5 h-5" /> : "2"}
            </div>
            <span className="text-xs font-bold text-slate-700 mt-2">بيانات التواصل</span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              currentStep === 3 ? "bg-safar-gold text-white shadow-md" : "bg-white text-slate-400 border border-slate-300"
            }`}>
              3
            </div>
            <span className="text-xs font-bold text-slate-700 mt-2">ملخص الـ VIP</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
          
          {/* STEP 1: Service Options Form */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <h3 className="text-lg font-bold text-safar-navy border-r-4 border-safar-cyan pr-3">
                الخطوة 1: حدد خيارات رحلتك المفضلة
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {service.formFields.map((field) => (
                  <div
                    key={field.id}
                    className={field.type === "textarea" ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}
                  >
                    <label className="text-xs font-bold text-slate-700">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {field.type === "select" ? (
                      <select
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        required={field.required}
                        className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white"
                      >
                        <option value="">-- اختر خياراً --</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-base font-bold px-8 py-3.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <span>متابعة الخطوة التالية</span>
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Client Info */}
          {currentStep === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <h3 className="text-lg font-bold text-safar-navy border-r-4 border-safar-cyan pr-3">
                الخطوة 2: بيانات المسافر للتواصل
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    الاسم الكريم <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="مثال: فهد الدوسري"
                    required
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    رقم الجوال / الواتساب <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="05xxxxxxxx أو +966"
                    dir="ltr"
                    required
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white text-right"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="name@example.com"
                    dir="ltr"
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white text-right"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    تاريخ السفر التقريبي <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-safar-navy px-4 py-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>الرجوع للخيارات</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-base font-bold px-8 py-3.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <span>عرض ملخص الرحلة الفاخر</span>
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Luxury VIP Summary */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {!submitted ? (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-safar-gold" />
                      <h3 className="text-xl font-extrabold text-safar-navy">
                        ملخص الرحلة الفاخر (VIP Itinerary)
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-safar-cyan bg-safar-cyan/10 px-3 py-1 rounded-full">
                      جاهز للتأكيد
                    </span>
                  </div>

                  {/* Summary Details Box */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200 text-sm">
                      <div>
                        <span className="text-slate-500 text-xs block">المسافر:</span>
                        <strong className="text-safar-navy">{clientName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs block">رقم التواصل:</span>
                        <strong className="text-safar-navy" dir="ltr">{clientPhone}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs block">الخدمة:</span>
                        <strong className="text-safar-cyan">{service.title}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs block">تاريخ السفر:</span>
                        <strong className="text-safar-navy">{travelDate || "غير محدد"}</strong>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-500">التفاصيل والاختيارات:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {service.formFields.map((field) => (
                          <div key={field.id} className="bg-white p-2.5 rounded-lg border border-slate-200">
                            <span className="text-slate-400 block">{field.label}:</span>
                            <span className="font-semibold text-slate-800">{formData[field.id] || "غير محدد"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Two VIP Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    
                    {/* Action 1: WhatsApp instant dispatch */}
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleConfirmOrder}
                      className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>إرسال واستشارة بالواتساب</span>
                    </a>

                    {/* Action 2: Direct reservation confirmation */}
                    <button
                      type="button"
                      onClick={handleConfirmOrder}
                      className="flex items-center justify-center gap-2.5 bg-safar-navy hover:bg-safar-navy-light text-white font-bold p-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                      <Send className="w-5 h-5 text-safar-gold" />
                      <span>تأكيد الحجز في المنظومة</span>
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-slate-500 hover:text-safar-navy"
                    >
                      تعديل بيانات التواصل
                    </button>
                  </div>
                </>
              ) : (
                /* Success Screen */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-safar-navy">
                    تم استلام طلبك بنجاح!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    شكراً لاختيارك سفرجيت. رقم حجزك هو:{" "}
                    <span className="font-extrabold text-safar-cyan">{orderRef}</span>.
                    سيتواصل معك مستشار السفر الشخصي خلال دقائق لترتيب كافة التفاصيل.
                  </p>
                  <div className="pt-4 flex justify-center gap-4">
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>متابعة على الواتساب فوراً</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Security badge below card */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>بياناتك محمية ومشفرة وفق أعلى معايير الخصوصية والأمان</span>
        </div>

      </div>
    </section>
  );
}
