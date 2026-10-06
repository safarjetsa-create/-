"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import FlightTransitionVeil from "./FlightTransitionVeil";

interface PageTransitionCoordinatorProps {
  children: React.ReactNode;
}

export default function PageTransitionCoordinator({
  children,
}: PageTransitionCoordinatorProps) {
  // Transition animation postponed as requested by user to focus on completing platform features
  return <div className="w-full flex-grow flex flex-col">{children}</div>;
}
