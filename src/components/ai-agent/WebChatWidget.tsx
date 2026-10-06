"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, MessageCircle, X, Send, Bot, User, ArrowLeft, MessageSquare } from "lucide-react";
import { siteConfig } from "@/constants/siteConfig";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  link?: string;
  linkText?: string;
}

export default function WebChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro-1",
      sender: "bot",
      text: "يا هلا ومسهلا بك في سفرجيت! ✈️ أنا مستشارك السياحي الذكي.. كيف أقدر أساعدك اليوم في تخطيط وجهتك واختيار باقتك المثالية؟",
    },
  ]);

  // Hide the customer chatbot inside the agency admin OS
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const quickPrompts = [
    { label: "عروض المالديف لشهر العسل 🏝️", prompt: "أبي استفسر عن عروض المالديف لشهر العسل" },
    { label: "باقات العمرة VIP 🕋", prompt: "وش باقات العمرة الـ VIP المتوفرة عندكم؟" },
    { label: "استئجار طائرة خاصة 🛩️", prompt: "أبي معلومات عن حجز طائرة خاصة لرجال الأعمال" },
    { label: "رحلات عائلية في الصيف 🌲", prompt: "اقترح لي وجهة سياحية عائلية طبيعية باردة في الصيف" },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    // Contextual AI Travel Advisor Response Engine
    setTimeout(() => {
      let reply = "نسعد بخدمتك في سفرجيت! 🌍 بناءً على طلبك، لدينا خيارات مخصصة تناسب رغبتكم تماماً وبأعلى معايير الراحة والفخامة.";
      let link = "/services/packages";
      let linkText = "استعراض الباقات المناسبة";

      const lower = text.toLowerCase();
      if (lower.includes("مالديف") || lower.includes("عسل")) {
        reply = "ألف مبروك مقدماً! 🏝️ المالديف هي الخيار الأول للفخامة والاسترخاء. لدينا باقة شهر العسل الفاخرة تشمل فيلا مائية مع مسبح خاص وإفطار عائم وخدمة النقل بالطيارة المائية.";
        link = "/services/packages";
        linkText = "تفاصيل باقة المالديف VIP";
      } else if (lower.includes("عمرة") || lower.includes("حرم") || lower.includes("مكة")) {
        reply = "عمرة مقبولة بإذن الله 🕋 نوفر باقات العمرة الملكية بفنادق صف أول مطلة مباشرة على الكعبة المشرفة مع قطار الحرمين السريع والتنقلات الخاصة.";
        link = "/services/umrah";
        linkText = "استعراض باقات العمرة";
      } else if (lower.includes("طائرة") || lower.includes("خاصة") || lower.includes("jet")) {
        reply = "أهلاً بك 🛩️ نوفر أسطولاً حديثاً من طائرات رجال الأعمال الفاخرة (Heavy & Midsize Jets) مع صالات VIP خاصة وإقلاع فوري وفق جدولك الخاص.";
        link = "/services/private-jets";
        linkText = "حجز الطائرات الخاصة";
      } else if (lower.includes("عائل") || lower.includes("صيف") || lower.includes("بوسنة") || lower.includes("طبيعة")) {
        reply = "اختيار رائع! 🌲 ننصحكم بالبوسنة والهرسك أو الشمال التركي وسويسرا. جو معتدل وطبيعة ساحرة وشلالات، مع سيارة عائلية خاصة وسائق يتحدث العربية لراحتكم التامة.";
        link = "/services/packages";
        linkText = "عرض الباقات العائلية";
      } else if (lower.includes("علاج") || lower.includes("مستشفى")) {
        reply = "سلامتكم وألف لا بأس! 🏥 لدينا شراكات مع أكبر المراكز الطبية في ألمانيا والتشيك والنمسا، ونوفر مترجماً طبياً وسكناً مجاوراً للمشفى مع دراسة مجانية للتقارير.";
        link = "/services/medical";
        linkText = "خدمات السياحة العلاجية";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "b-" + Date.now(),
          sender: "bot",
          text: reply,
          link,
          linkText,
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-safar-navy to-safar-navy-dark hover:from-safar-cyan hover:to-safar-cyan-hover text-white px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-safar-cyan/40 group"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-safar-gold animate-spin-slow" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold block leading-tight">مستشار سفرجيت الذكي</span>
              <span className="text-[10px] text-slate-300 group-hover:text-white">متواجد لخدمتك 24/7</span>
            </div>
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 left-4 sm:left-6 z-50 w-[92vw] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[530px] animate-fadeIn">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-safar-navy-dark to-safar-navy text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-safar-cyan/20 border border-safar-cyan/40 text-safar-cyan flex items-center justify-center font-bold">
                <Bot className="w-5 h-5 text-safar-cyan" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  <span>مستشار سفرجيت الذكي</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </h4>
                <p className="text-[10px] text-slate-300">مدعوم بالذكاء الاصطناعي وبمعرفة الوكالة</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp.prompt)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-safar-cyan hover:text-safar-cyan font-bold transition-all shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[85%] ${
                  m.sender === "user" ? "mr-auto items-start" : "ml-auto items-end"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl leading-relaxed shadow-sm ${
                    m.sender === "user"
                      ? "bg-safar-cyan text-white rounded-tr-none font-medium"
                      : "bg-white text-slate-800 rounded-tl-none border border-slate-200"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.link && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <a
                        href={m.link}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-safar-cyan hover:underline"
                      >
                        <span>{m.linkText}</span>
                        <ArrowLeft className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 p-2">
                <span className="w-2 h-2 rounded-full bg-safar-cyan animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-safar-cyan animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-safar-cyan animate-bounce [animation-delay:0.4s]"></span>
                <span>المستشار الذكي يكتب لك...</span>
              </div>
            )}
          </div>

          {/* Bottom Handoff to WhatsApp & Input */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}?text=مرحباً، حاب استكمل استشارتي السياحية مع مستشار سفرجيت`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 p-2 rounded-xl border border-emerald-200 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>متابعة المحادثة عبر الواتساب مباشرة</span>
            </a>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اكتب وجهتك أو ميزانيتك..."
                className="flex-grow h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
              />
              <button
                type="submit"
                className="h-10 px-3.5 rounded-xl bg-safar-navy hover:bg-safar-navy-light text-white text-xs font-bold flex items-center justify-center shadow-md transition-all shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-safar-gold" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
