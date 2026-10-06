"use client";

import React from "react";
import CommercialAirlinerSvg from "./CommercialAirlinerSvg";

interface FlightTransitionVeilProps {
  isFlying: boolean;
  direction: "rtl" | "ltr";
}

export default function FlightTransitionVeil({
  isFlying,
  direction,
}: FlightTransitionVeilProps) {
  if (!isFlying) return null;

  const isRTL = direction === "rtl";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* 
        Continuous Sweep Container:
        Sweeps completely across the screen from off-screen to off-screen without stopping.
        Zero text, zero colored lines.
      */}
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          isRTL ? "animate-airliner-sweep-rtl" : "animate-airliner-sweep-ltr"
        }`}
      >
        {/* The Standalone Commercial Airliner */}
        <div
          className={`w-[340px] sm:w-[520px] lg:w-[650px] shrink-0 filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.35)] transform transition-transform ${
            isRTL ? "-rotate-2" : "-scale-x-100 -rotate-2"
          }`}
        >
          <CommercialAirlinerSvg className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
