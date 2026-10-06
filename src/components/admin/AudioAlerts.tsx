"use client";

import React, { useEffect, useState } from "react";
import { Bell, Volume2, VolumeX, MessageSquare, Check, X } from "lucide-react";

export function playLuxuryChime() {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Two pleasant harmonic tones (E5 & B5) for a luxury concierge chime
    const notes = [659.25, 987.77];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.85);
    });
  } catch {
    // Audio context fallback
  }
}

export default function AudioAlerts() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeAlert, setActiveAlert] = useState<{
    id: string;
    clientName: string;
    serviceTitle: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    let knownLeadIds = new Set<string>();

    const checkNewLeads = async () => {
      try {
        const res = await fetch("/api/inquiries");
        if (!res.ok) return;
        const leads = await res.json();
        if (!Array.isArray(leads) || leads.length === 0) return;

        // On first run, record existing lead IDs
        if (knownLeadIds.size === 0) {
          leads.forEach((l: { id: string }) => knownLeadIds.add(l.id));
          return;
        }

        // Check if there is a brand new lead
        const latest = leads[0];
        if (latest && !knownLeadIds.has(latest.id) && latest.status === "new") {
          knownLeadIds.add(latest.id);

          if (soundEnabled) {
            playLuxuryChime();
          }

          setActiveAlert({
            id: latest.id,
            clientName: latest.clientName,
            serviceTitle: latest.serviceTitle,
            phone: latest.clientPhone,
          });
        }
      } catch (err) {
        console.error("AudioAlerts polling error:", err);
      }
    };

    // Initial check
    checkNewLeads();

    // Poll every 4 seconds for live incoming inquiries
    const interval = setInterval(checkNewLeads, 4000);
    return () => clearInterval(interval);
  }, [soundEnabled]);

  const handleTestChime = () => {
    playLuxuryChime();
    setActiveAlert({
      id: "TEST-88",
      clientName: "فهد الدوسري (تجربة تنبيه)",
      serviceTitle: "استئجار طائرة خاصة VIP",
      phone: "+966501234567",
    });
  };

  return (
    <>
      {/* Sound Toggle Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            soundEnabled
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
          title="تفعيل/تعطيل التنبيه الصوتي"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
          <span>{soundEnabled ? "التنبيهات الصوتية نشطة" : "الصوت معطل"}</span>
        </button>

        <button
          onClick={handleTestChime}
          className="text-xs text-safar-cyan hover:underline font-bold"
        >
          (تجربة الصوت)
        </button>
      </div>

      {/* Actionable Notification Toast Modal */}
      {activeAlert && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white rounded-2xl p-4 shadow-2xl border-2 border-safar-cyan animate-bounce-short">
          <div className="flex items-start justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-safar-navy font-bold text-sm">
              <Bell className="w-4 h-4 text-safar-cyan animate-pulse" />
              <span>طلب حجز VIP جديد!</span>
            </div>
            <button
              onClick={() => setActiveAlert(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-2.5 text-xs text-slate-700 space-y-1">
            <p><strong>العميل:</strong> {activeAlert.clientName}</p>
            <p><strong>الخدمة:</strong> <span className="text-safar-cyan font-bold">{activeAlert.serviceTitle}</span></p>
            <p><strong>رقم التواصل:</strong> <span dir="ltr">{activeAlert.phone}</span></p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <a
              href={`https://wa.me/${activeAlert.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setActiveAlert(null)}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>واتساب فوري</span>
            </a>

            <button
              onClick={() => setActiveAlert(null)}
              className="flex items-center justify-center gap-1.5 bg-safar-navy hover:bg-safar-navy-light text-white text-xs font-bold py-2 rounded-xl transition-all"
            >
              <Check className="w-3.5 h-3.5 text-safar-gold" />
              <span>استلام الطلب</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
