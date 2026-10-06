export interface NavLink {
  label: string;
  href: string;
}

export const mainNavLinks: NavLink[] = [
  { label: "الرئيسية", href: "/" },
  { label: "الباقات السياحية", href: "/services/packages" },
  { label: "عن سفرجيت", href: "/about" },
  { label: "خدماتنا", href: "/#services" },
  { label: "العروض الموسمية", href: "/#offers" },
  { label: "المدونة", href: "/blog" },
  { label: "تواصل معنا", href: "/contact" },
];
