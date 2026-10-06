import React from "react";
import { notFound } from "next/navigation";
import { servicesData } from "@/constants/servicesData";
import { serviceDetailsData, ServiceDetailConfig } from "@/constants/serviceDetails";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceFeatures from "@/components/services/ServiceFeatures";
import SmartBookingFunnel from "@/components/services/booking-funnel/SmartBookingFunnel";

interface ServicePageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    id: service.id,
  }));
}

export default function ServicePage({ params }: ServicePageProps) {
  // Find detailed config or build dynamic fallback from servicesData
  let serviceConfig = serviceDetailsData[params.id];

  if (!serviceConfig) {
    const basicService = servicesData.find((s) => s.id === params.id);
    if (!basicService) {
      notFound();
    }
    // Generic fallback configuration for remaining services
    serviceConfig = {
      id: basicService.id,
      title: basicService.title,
      subtitle: basicService.subtitle,
      heroImage: basicService.image,
      tagline: "أفضل العروض والخيارات المعتمدة مع سفرجيت",
      description: `نقدم في سفرجيت أرقى برامج وخدمات ${basicService.title} بأعلى معايير الراحة والرفاهية المخصصة لتلبية كافة تطلعاتكم وتسهيل رحلاتكم بكل سلاسة.`,
      features: [
        { title: "حجز معتمد وفوري", desc: "تأكيد سريع بأفضل الأسعار التنافسية", icon: "CheckCircle" },
        { title: "مستشار سياحي خاص", desc: "متابعة دقيقة ومستمرة لكافة تفاصيل طلبكم", icon: "Compass" },
        { title: "أعلى معايير الراحة", desc: "خيارات فاخرة منتقاة بعناية لراحة العملاء", icon: "Sparkles" },
        { title: "دعم على مدار الساعة", desc: "فريق متخصص في خدمتكم طوال أيام الأسبوع", icon: "ShieldCheck" },
      ],
      formFields: [
        { id: "destination", label: "الوجهة أو المدينة المطلوبة", type: "text", placeholder: "حدد الوجهة...", required: true },
        { id: "category", label: "الدرجة أو الفئة المطلوبة", type: "select", options: ["VIP فاخرة", "درجة أولى مميزة", "اقتصادية مريحة"], required: true },
        { id: "travelersCount", label: "عدد الأفراد أو المسافرين", type: "number", placeholder: "عدد الأشخاص", required: true },
        { id: "notes", label: "ملاحظات وتفضيلات إضافية", type: "textarea", placeholder: "أخبرنا باحتياجاتك الخاصة...", required: false },
      ],
    };
  }

  return (
    <div className="flex flex-col w-full">
      <ServiceDetailHero
        title={serviceConfig.title}
        subtitle={serviceConfig.subtitle}
        tagline={serviceConfig.tagline}
        heroImage={serviceConfig.heroImage}
      />
      <ServiceFeatures
        features={serviceConfig.features}
        description={serviceConfig.description}
      />
      <SmartBookingFunnel service={serviceConfig} />
    </div>
  );
}
