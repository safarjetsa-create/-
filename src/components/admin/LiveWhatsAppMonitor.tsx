"use client";

import React, { useState } from "react";
import { MessageSquare, QrCode, Power, Send, Bot, User, CheckCheck, RefreshCw } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "client" | "ai" | "staff";
  text: string;
  time: string;
}

export default function LiveWhatsAppMonitor() {
  const [isAiActive, setIsAiActive] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "client",
      text: "السلام عليكم، حاب استفسر عن باقات العمرة لشهر رجب القادم لعائلة 5 أشخاص",
      time: "10:14 م",
    },
    {
      id: "m2",
      sender: "ai",
      text: "وعليكم السلام ورحمة الله وبركاته يا هلا بك في سفرجيت! 🕋 نسعد بخدمتك. نوفر باقات عمرة VIP تشمل فنادق 5 نجوم مطلة مباشرة على الكعبة وتنقلات بقطار الحرمين السريع. هل تفضلون الإقامة في مكة فقط أم مكة والمدينة المنورة؟",
      time: "10:14 م",
    },
    {
      id: "m3",
      sender: "client",
      text: "نبي مكة والمدينة مع سيارة خاصة جمس",
      time: "10:15 م",
    },
    {
      id: "m4",
      sender: "ai",
      text: "أبشر بعزك! تم ترشيح برنامج (عمرة الصفوة VIP - 7 أيام) يشمل جمس سوبربان خاص موديل حديث طوال الرحلة، وإقامة بفندق دار التوحيد بمكة وأوبروي المدينة. رابط تفاصيل العرض: safarjet.com/services/umrah",
      time: "10:15 م",
    },
  ]);

  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: "m-" + Date.now(),
      sender: "staff",
      text: inputText,
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMsg]);
    setInputText("");
  };

  return (
    <div className="space-y-6">
      
      {/* Top Status & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-safar-navy flex items-center gap-2">
              <span>خادم الواتساب التلقائي المجاني (Baileys Engine)</span>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isConnected ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{isConnected ? "متصل ومشفر (مجاني)" : "غير متصل"}</span>
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              يعمل برقم الوكالة الرسمي مباشرة عبر تقنية السوكيت بدون أي تكاليف رسائل لميتا
            </p>
          </div>
        </div>

        {/* Takeover & AI Toggle Switch */}
        <div className="flex items-center gap-3">
          <div className="text-left sm:text-right">
            <span className="text-xs font-bold text-slate-700 block">
              {isAiActive ? "الذكاء الاصطناعي يدير الردود" : "التدخل البشري نشط (الموظف)"}
            </span>
            <span className="text-[10px] text-slate-400">
              {isAiActive ? "يتم الرد آلياً وفق قاعدة المعرفة" : "الردود الآلية معلقة مؤقتاً"}
            </span>
          </div>

          <button
            onClick={() => setIsAiActive(!isAiActive)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
              isAiActive
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isAiActive ? "إيقاف الـ AI والتدخل" : "إعادة تشغيل الـ AI"}</span>
          </button>
        </div>
      </div>

      {/* Chat Simulation & Monitoring Panel */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 h-[580px]">
        
        {/* Right Sidebar: Active WhatsApp Chats */}
        <div className="lg:col-span-4 xl:col-span-3 border-l border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700">المحادثات النشطة</span>
              <button className="text-slate-400 hover:text-slate-600" title="تحديث">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Client Item Active */}
            <div className="p-3 rounded-2xl bg-white border border-safar-cyan/40 shadow-sm flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-safar-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                فهد
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">فهد الدوسري</h4>
                  <span className="text-[10px] text-slate-400">10:15 م</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  نبي مكة والمدينة مع سيارة خاصة جمس
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/70 border border-slate-200 hover:bg-white transition-all flex items-center gap-3 cursor-pointer opacity-70">
              <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                سارة
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">سارة المنصور</h4>
                  <span className="text-[10px] text-slate-400">09:40 م</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  كم تكلفة بكج المالديف 5 ليالي؟
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Re-pair Box */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center space-y-1.5">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700">
              <QrCode className="w-4 h-4 text-safar-cyan" />
              <span>ربط جهاز واتساب جديد</span>
            </div>
            <p className="text-[10px] text-slate-400">
              امسح الكود بكاميرا الواتساب لربط رقم الوكالة
            </p>
          </div>
        </div>

        {/* Left Area: Live Chat Message Screen */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col h-full bg-[#EFEAE2]/30">
          
          {/* Chat Header */}
          <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-safar-navy text-white text-xs font-bold flex items-center justify-center">
                فهد
              </div>
              <div>
                <h4 className="text-xs font-bold text-safar-navy">فهد الدوسري (+966505112233)</h4>
                <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>متصل الآن على الواتساب</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              {isAiActive ? (
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                  <Bot className="w-3.5 h-3.5" />
                  <span>الرد الآلي مفعل</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-[11px]">
                  <User className="w-3.5 h-3.5" />
                  <span>الموظف يتحكم بالرد</span>
                </span>
              )}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${
                  msg.sender === "client" ? "mr-auto items-start" : "ml-auto items-end"
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === "client"
                      ? "bg-white text-slate-800 rounded-tr-none border border-slate-200"
                      : msg.sender === "ai"
                      ? "bg-safar-navy text-white rounded-tl-none"
                      : "bg-emerald-600 text-white rounded-tl-none"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1 opacity-80 text-[10px]">
                    {msg.sender === "ai" && <span>🤖 وكيل سفرجيت الذكي:</span>}
                    {msg.sender === "staff" && <span>👤 مستشار المبيعات:</span>}
                    {msg.sender === "client" && <span>العميل:</span>}
                  </div>
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                  <span>{msg.time}</span>
                  {msg.sender !== "client" && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar (For staff manual response) */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isAiActive ? "اكتب رسالة للتدخل والرد مباشرة على العميل..." : "اكتب ردك للمتابعة مع العميل..."}
              className="flex-grow h-11 px-4 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-xl bg-safar-navy hover:bg-safar-navy-light text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0"
            >
              <Send className="w-3.5 h-3.5 text-safar-gold" />
              <span>إرسال</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
