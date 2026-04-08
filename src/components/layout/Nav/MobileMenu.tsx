"use client";
import React, { useState, useEffect } from "react";
import { NavSection } from "@/lib/sections";
import Link from "next/link";
import { X, Menu, Calculator, ChevronRight, Gem } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { siteConfig } from "@/lib/site/siteConfig";

interface MobileMenuProps {
  sections: NavSection[];
  activeSection: string | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ sections, activeSection }) => {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const { brand } = siteConfig;

  // Bloquear el scroll cuando el menú está abierto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  const handleScroll = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      lenis?.scrollTo(`#${id}`, { offset: -70, duration: 1.2 });
    }, 300);
  };

  return (
    <>
      {/* HEADER MÓVIL ESTÁNDAR - Estilo SaaS Clean */}
      <nav className="fixed top-0 left-0 w-full h-20 z-[100] flex items-center px-5 bg-white/90 backdrop-blur-md border-b border-gray-100 lg:hidden transition-all">
        <div className="w-full flex justify-between items-center max-w-[1200px] mx-auto">
          {/* LOGO - Tipografía más chica (text-base) y compacta */}
          <Link
            href="/"
            className="text-base font-black tracking-tight text-slate-900 flex items-center gap-2.5 uppercase"
          >
            <div className="bg-blue-50 text-primary p-1.5 rounded-md border border-blue-100 shadow-sm">
              <Gem className="size-4" strokeWidth={2.5} />
            </div>
            {brand.name || "MÁRMOLES"}
          </Link>

          <div className="flex items-center gap-1">
            <CartDrawer />
            <Button
              variant="ghost"
              onClick={() => setOpen(true)}
              className="p-2 h-auto hover:bg-gray-50 rounded-lg text-slate-900"
            >
              <Menu className="size-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* MENÚ LATERAL DESPLEGABLE */}
      <AnimatePresence>
        {open && (
          <>
            {/* Fondo oscuro traslúcido */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-sm min-h-screen"
            />

            {/* Panel del Menú - Estilo App */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[120] bg-white shadow-2xl flex flex-col rounded-l-2xl overflow-hidden"
            >
              {/* Header del Menú */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Navegación
                </span>
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="size-10 p-0 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-slate-600 transition-all"
                >
                  <X className="size-5" />
                </Button>
              </div>

              {/* Enlaces de Sección */}
              <ul className="flex flex-col p-6 flex-1 gap-3 overflow-y-auto">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <li key={sec.id}>
                      <button
                        onClick={() => handleScroll(sec.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 text-sm font-bold uppercase tracking-widest transition-all rounded-xl",
                          isActive
                            ? "bg-blue-50 text-primary"
                            : "bg-transparent text-gray-500 hover:bg-gray-50",
                        )}
                      >
                        {sec.label}
                        <ChevronRight
                          className={cn(
                            "size-4 transition-transform",
                            isActive
                              ? "opacity-100 translate-x-1 text-primary"
                              : "opacity-30",
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Footer del Menú con CTA - Azul Intenso */}
              <div className="p-8 bg-[#0f172a] text-white space-y-6 mt-auto">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Atención en Gualeguaychú
                  </p>
                  <p className="text-sm font-bold text-white">
                    Lun a Vie: 08:00 a 17:00 hs
                  </p>
                </div>

                <Button
                  className="w-full h-14 bg-primary text-white font-bold uppercase text-[10px] tracking-widest rounded-xl hover:bg-blue-500 transition-colors flex items-center justify-center gap-3 shadow-lg active:scale-95"
                  onClick={() => handleScroll("catalog")}
                >
                  <Calculator className="size-4" />
                  Pedir Presupuesto
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
