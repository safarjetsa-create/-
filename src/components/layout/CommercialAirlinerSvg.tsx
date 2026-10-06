import React from "react";

interface CommercialAirlinerSvgProps {
  className?: string;
}

export default function CommercialAirlinerSvg({ className = "" }: CommercialAirlinerSvgProps) {
  return (
    <svg
      viewBox="0 0 600 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Fuselage Gradient: Modern Pearl White & Royal Navy */}
        <linearGradient id="fuselageGrad" x1="0%" y1="30%" x2="100%" y2="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F1F5F9" />
          <stop offset="85%" stopColor="#0A2240" />
          <stop offset="100%" stopColor="#061528" />
        </linearGradient>

        {/* Wing Gradient */}
        <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#00A3E0" />
        </linearGradient>


        {/* Drop Shadow for realistic depth */}
        <filter id="airlinerShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="-4" dy="8" stdDeviation="6" floodColor="#061528" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#airlinerShadow)">
        {/* Left Wing (Far wing) */}
        <path
          d="M260 100 L380 25 L415 35 L330 112 Z"
          fill="url(#wingGrad)"
          stroke="#94A3B8"
          strokeWidth="0.8"
        />
        {/* Far Winglet */}
        <path d="M415 35 L425 20 L418 37 Z" fill="#00A3E0" />

        {/* Far Engine */}
        <ellipse cx="320" cy="75" rx="22" ry="7" fill="#64748B" />
        <ellipse cx="338" cy="75" rx="5" ry="7" fill="#334155" />

        {/* Main Fuselage (Commercial Passenger Airliner Body) */}
        <path
          d="M50 120 Q100 105 240 105 L480 112 Q520 114 550 116 L570 120 L550 124 Q520 126 480 128 L240 135 Q100 135 50 120 Z"
          fill="url(#fuselageGrad)"
        />

        {/* Cockpit Windshield Glasses */}
        <path
          d="M80 114 Q95 111 110 112 L105 118 Q90 117 80 118 Z"
          fill="#0F172A"
          stroke="#38BDF8"
          strokeWidth="0.8"
        />

        {/* Row of Passenger Windows (Commercial Jet hallmark) */}
        <g fill="#0284C7" opacity="0.85">
          <circle cx="130" cy="117" r="2" />
          <circle cx="142" cy="117" r="2" />
          <circle cx="154" cy="117" r="2" />
          <circle cx="166" cy="117" r="2" />
          <circle cx="178" cy="117" r="2" />
          <circle cx="190" cy="117" r="2" />
          <circle cx="202" cy="117" r="2" />
          <circle cx="214" cy="117" r="2" />
          <circle cx="226" cy="117" r="2" />
          <circle cx="238" cy="117" r="2" />
          <circle cx="250" cy="117" r="2" />
          <circle cx="262" cy="117" r="2" />
          <circle cx="274" cy="117" r="2" />
          <circle cx="286" cy="117" r="2" />
          <circle cx="298" cy="117" r="2" />
          <circle cx="310" cy="117" r="2" />
          <circle cx="322" cy="117" r="2" />
          <circle cx="334" cy="117" r="2" />
          <circle cx="346" cy="117" r="2" />
          <circle cx="358" cy="117" r="2" />
          <circle cx="370" cy="117" r="2" />
          <circle cx="382" cy="117" r="2" />
          <circle cx="394" cy="117" r="2" />
          <circle cx="406" cy="117" r="2" />
          <circle cx="418" cy="117" r="2" />
          <circle cx="430" cy="117" r="2" />
          <circle cx="442" cy="117" r="2" />
          <circle cx="454" cy="117" r="2" />
        </g>

        {/* Tail Fin (Vertical Stabilizer with SafarJet Livery) */}
        <path
          d="M480 112 L540 40 L575 42 L550 116 Z"
          fill="#0A2240"
        />
        {/* SafarJet Cyan & Gold Swoosh on Tail */}
        <path
          d="M525 75 Q540 60 565 50 L560 62 Q535 70 525 80 Z"
          fill="#00A3E0"
        />
        <path
          d="M530 85 Q545 75 565 68 L560 76 Q540 82 530 90 Z"
          fill="#C59B27"
        />

        {/* Horizontal Tail Stabilizers */}
        <path d="M535 116 L575 95 L585 100 L555 120 Z" fill="#94A3B8" />

        {/* Right Wing (Near Wing in front) */}
        <path
          d="M245 125 L350 215 L385 205 L315 128 Z"
          fill="url(#wingGrad)"
          stroke="#94A3B8"
          strokeWidth="0.8"
        />
        {/* Near Winglet */}
        <path d="M385 205 L395 220 L388 203 Z" fill="#00A3E0" />

        {/* Near Jet Engine (Big Turbofan Engine) */}
        <ellipse cx="285" cy="170" rx="30" ry="11" fill="#475569" />
        <ellipse cx="260" cy="170" rx="10" ry="11" fill="#1E293B" stroke="#00A3E0" strokeWidth="2" />
        <ellipse cx="310" cy="170" rx="7" ry="10" fill="#0F172A" />

        {/* Luxury SafarJet Decal on Fuselage */}
        <text
          x="190"
          y="114"
          fill="#0A2240"
          fontSize="11"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
        >
          SafarJet
        </text>
      </g>
    </svg>
  );
}
