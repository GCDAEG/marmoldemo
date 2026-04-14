"use client";
import React from "react";
import { NavSection } from "@/lib/sections";
import { Gem } from "lucide-react";
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
    <div className="w-full h-full hidden lg:flex items-center bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all px-4 md:px-8 lg:px-40">
      {/* Alineamos el ancho máximo con el resto del diseño (1200px) */}
      <div className="max-w-300 w-full mx-auto flex justify-between items-center border-red-500 border">
        {/* LOGO - Estilo SaaS (Fuente pesada, ícono con fondo suave) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Gem className="size-5" strokeWidth={2} />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
            {brand.name || "MÁRMOLES"}
          </span>
        </Link>

        {/* ENLACES DE NAVEGACIÓN - Minimalistas, sans-serif */}
        <ul className="flex items-center gap-8 border-red-500 border">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => lenis?.scrollTo(`#${s.id}`)}
                className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 relative py-2 ${
                  activeSection === s.id
                    ? "text-primary"
                    : "text-gray-400 hover:text-slate-900"
                }`}
              >
                {s.label}
                {/* Indicador de Sección Activa - Línea sutil en azul primario */}
                {activeSection === s.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-sm" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* ACCIÓN Y COTIZADOR (CARRITO) */}
        <div className="flex items-center gap-6 border-red-500 border">
          <div className="h-8 w-px bg-gray-200 mx-2" />
          <CartDrawer />
        </div>
      </div>
    </div>
  );
};

export default DesktopMenu;
