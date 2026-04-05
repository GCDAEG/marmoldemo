"use client";
import React from "react";
import { NavSection } from "@/lib/sections";
import { ShoppingBag, Store } from "lucide-react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { siteConfig } from "@/lib/site/siteConfig";

const DesktopMenu = ({
  sections,
  activeSection,
}: {
  sections: NavSection[];
  activeSection: string | null;
}) => {
  const lenis = useLenis();
  const { brand } = siteConfig;

  return (
    <nav className="fixed top-0 left-0 w-full px-5 md:px-8 lg:px-40 z-100 h-20 hidden lg:flex items-center bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO - Estilo Rústico con fuente Serif */}
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tight text-stone-800 flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Store className="text-primary size-6" />
          {brand.name}
        </Link>

        {/* LINKS DE NAVEGACIÓN - Tonos cálidos */}
        <ul className="flex items-center gap-8">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => lenis?.scrollTo(`#${s.id}`)}
                className={`text-sm font-medium transition-all duration-300 relative py-2 ${
                  activeSection === s.id
                    ? "text-primary"
                    : "text-stone-500 hover:text-primary"
                }`}
              >
                {s.label}
                {/* Indicador visual de sección activa - Tono caramelo */}
                {activeSection === s.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* BOTÓN DE ACCIÓN Y CARRITO - Contraste fuerte y elegante */}
        <div className="flex items-center gap-6">
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};

export default DesktopMenu;
