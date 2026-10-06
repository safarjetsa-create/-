import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import BookingBar from "@/components/home/booking-bar/BookingBar";
import ServicesGrid from "@/components/home/services/ServicesGrid";
import SummerPromoBanner from "@/components/home/SummerPromoBanner";
import TrustValueBar from "@/components/home/TrustValueBar";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Banner with World Landmarks & Slogan */}
      <HeroBanner />

      {/* 2. Floating 4-Tab Booking Search Bar */}
      <BookingBar />

      {/* 3. The 12 Specialized Services Grid */}
      <ServicesGrid />

      {/* 4. Seasonal Promo Banner (Maldives Summer Offer) */}
      <SummerPromoBanner />

      {/* 5. Trust Badges & Value Propositions */}
      <TrustValueBar />
    </div>
  );
}
