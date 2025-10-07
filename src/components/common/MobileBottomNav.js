"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Package, Wrench, MessageCircle, FileText, Home } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Products",
      path: "/products",
      icon: Package,
    },
    {
      name: "Services",
      path: "/services",
      icon: Wrench,
    },
    {
      name: "Home",
      path: "/",
      isLogo: true,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: MessageCircle,
    },
    {
      name: "Quote",
      path: "/quote",
      icon: FileText,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t safe-area-bottom"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(183, 136, 82, 0.15)",
        boxShadow: "0 -2px 20px rgba(183, 136, 82, 0.1)",
      }}
    >
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item, index) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          if (item.isLogo) {
            return (
              <Link
                key={item.name}
                href={item.path}
                className="flex flex-col items-center justify-center relative"
              >
                {/* Elevated logo container */}
                <div
                  className="absolute -top-8 flex items-center justify-center rounded-full shadow-2xl border-4 border-white"
                  style={{
                    background: "white",
                    width: "64px",
                    height: "64px",
                  }}
                >
                  <Image
                    src="/android-chrome-192x192.png"
                    alt="Shreedhar Instruments"
                    width={48}
                    height={48}
                    className="rounded-full"
                    priority
                  />
                </div>
                <span className="text-[10px] font-medium mt-6" style={{ color: isActive ? "#b78852" : "#6b7280" }}>
                  {item.name}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                isActive ? "scale-105" : ""
              }`}
            >
              <div
                className={`transition-all duration-300 ${
                  isActive ? "scale-110" : ""
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{ color: isActive ? "#b78852" : "#6b7280" }}
                />
              </div>
              <span
                className={`text-[10px] font-medium transition-all duration-300 ${
                  isActive ? "font-semibold" : ""
                }`}
                style={{ color: isActive ? "#b78852" : "#6b7280" }}
              >
                {item.name}
              </span>
              {isActive && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-12 rounded-b-full"
                  style={{ backgroundColor: "#b78852" }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
