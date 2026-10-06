export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  image: string;
  badge?: string;
  href: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "umrah",
    title: "باقات العمرة",
    subtitle: "برامج معتمدة وخدمات متكاملة",
    iconName: "Landmark",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80",
    href: "/services/umrah",
  },
  {
    id: "transport",
    title: "النقل والمواصلات",
    subtitle: "تنقل مريح داخل وخارج المملكة",
    iconName: "Car",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    href: "/services/transport",
  },
  {
    id: "hotels",
    title: "الفنادق والإقامة",
    subtitle: "إقامة مريحة في أفضل الفنادق",
    iconName: "Building2",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    href: "/services/hotels",
  },
  {
    id: "flights",
    title: "حجوزات الطيران",
    subtitle: "أفضل الأسعار وأوسع الخيارات",
    iconName: "Plane",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
    href: "/services/flights",
  },
  {
    id: "business",
    title: "الأعمال والفعاليات",
    subtitle: "خدمات متكاملة لرحلات العمل",
    iconName: "Briefcase",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
    href: "/services/business",
  },
  {
    id: "cruise",
    title: "الكروز",
    subtitle: "رحلات بحرية لا تُنسى",
    iconName: "Ship",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=600&q=80",
    href: "/services/cruise",
  },
  {
    id: "saudi-tourism",
    title: "اكتشف السعودية",
    subtitle: "وجهات مميزة داخل المملكة",
    iconName: "Compass",
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=600&q=80",
    href: "/services/saudi-tourism",
  },
  {
    id: "tours",
    title: "الجولات والتجارب",
    subtitle: "تجارب فريدة حول العالم",
    iconName: "MapPin",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80",
    href: "/services/tours",
  },
  {
    id: "packages",
    title: "العروض والباقات",
    subtitle: "عروض حصرية وأسعار مميزة",
    iconName: "Gift",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
    badge: "عروض حصرية",
    href: "/services/packages",
  },
  {
    id: "private-jets",
    title: "الطائرات الخاصة",
    subtitle: "رفاهية وخصوصية في رحلتك",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80",
    badge: "VIP",
    href: "/services/private-jets",
  },
  {
    id: "medical",
    title: "السياحة العلاجية",
    subtitle: "رحلات علاج مريحة وآمنة",
    iconName: "HeartPulse",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    href: "/services/medical",
  },
  {
    id: "educational",
    title: "السياحة التعليمية",
    subtitle: "فرص تعليمية في أفضل الوجهات",
    iconName: "GraduationCap",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    href: "/services/educational",
  },
];
