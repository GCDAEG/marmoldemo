"use client";
import React, { useState, useEffect } from "react";
import { NavSection } from "@/lib/sections";
import Link from "next/link";
import { X, Menu, ShoppingBag, ChevronRight, Store } from "lucide-react";
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

  // Bloquear scroll cuando el menú está abierto
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
      {/* HEADER MÓVIL ESTÁNDAR - Altura ajustada y fondo crema */}
      <nav className="fixed top-0 left-0 w-full h-20 z-100 flex items-center px-4 bg-background backdrop-blur-md border-b border-stone-200 lg:hidden transition-all">
        <div className="w-full flex justify-between items-center">
          {/* LOGO - Estilo Rústico con fuente Serif */}
          <Link
            href="/"
            className="text-xl font-serif font-bold tracking-tight text-foreground flex items-center gap-2"
          >
            <Store className="text-primary size-5" />
            {brand.name}
          </Link>

          <div className="flex items-center gap-3">
            <CartDrawer />
            <Button
              variant="ghost"
              onClick={() => setOpen(true)}
              className="p-2 h-auto hover:bg-stone-100"
            >
              <Menu className="size-6 text-primary" />
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
              className="fixed inset-0 z-110 bg-black/40 backdrop-blur-sm"
            />

            {/* Panel del Menú - Fondo Crema */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm z-[120] bg-[#FDFBF7] shadow-xl flex flex-col"
            >
              {/* Header del Menú */}
              <div className="flex justify-between items-center p-6 border-b border-stone-200">
                <span className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                  Navegación
                </span>
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="p-2 h-auto hover:bg-stone-100"
                >
                  <X className="size-6 text-stone-800" />
                </Button>
              </div>

              {/* Enlaces de Secciones - Hover caramelo */}
              <ul className="flex flex-col p-4 flex-1">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <li key={sec.id}>
                      <button
                        onClick={() => handleScroll(sec.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 text-lg font-bold transition-all rounded-lg",
                          isActive
                            ? "bg-amber-50 text-amber-800"
                            : "text-stone-700 active:bg-stone-100",
                        )}
                      >
                        {sec.label}
                        <ChevronRight
                          className={cn(
                            "size-5 opacity-30",
                            isActive && "opacity-100",
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Footer del Menú con Contacto Directo */}
              <div className="p-6 bg-stone-100/50 space-y-4 border-t border-stone-200">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                    Local en Gualeguaychú
                  </p>
                  <p className="text-sm font-semibold text-stone-800">
                    Lunes a Sábado — 9:00 a 20:00
                  </p>
                </div>

                <Button
                  className="w-full h-14 bg-stone-800 text-[#FDFBF7] font-bold rounded-md hover:bg-stone-700 transition-all flex items-center justify-center gap-2 shadow-sm"
                  onClick={() => handleScroll("contact")}
                >
                  <ShoppingBag className="size-4" />
                  Hacer Pedido
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
