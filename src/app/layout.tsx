import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WebChatWidget from "@/components/ai-agent/WebChatWidget";
import PageTransitionCoordinator from "@/components/layout/PageTransitionCoordinator";
import { siteConfig } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.slogan} | للسفر والسياحة`,
  description: siteConfig.description,
  keywords: [
    "سفرجيت",
    "حجز طيران",
    "فنادق",
    "طائرات خاصة",
    "باقات عمرة",
    "سياحة وسفر",
    "عروض المالديف",
    "السياحة في السعودية",
  ],
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.slogan}`,
    description: siteConfig.description,
    url: "https://safarjet.com",
    siteName: siteConfig.name,
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 antialiased selection:bg-safar-cyan selection:text-white">
        <Header />
        <main className="flex-grow flex flex-col">
          <PageTransitionCoordinator>{children}</PageTransitionCoordinator>
        </main>
        <Footer />
        <WebChatWidget />
      </body>
    </html>
  );
}
