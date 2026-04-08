"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site/siteConfig";
import { Section } from "../Section";

const HeroSection = () => {
  const { hero } = siteConfig;

  return (
    <Section
      id="hero"
      height="content"
      // Eliminamos bordes y ajustamos el padding para que fluya directo al catálogo
      className="relative  bg-background overflow-hidden"
    >
      {/* Fondo de cuadrícula sutil (SaaS/Tech vibe) para dar idea de precisión/planos */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Resplandor radial muy tenue detrás del texto */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_60%_50%_at_20%_20%,#2563eb08_0%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Píldora de estado (idéntica a la imagen) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-8"
          >
            <CheckCircle2 className="size-4" strokeWidth={2.5} />
            {hero.badge || "Stock disponible para entrega inmediata"}
          </motion.div>

          {/* Título Masivo y Pesado (Font Black) */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-primary leading-[1.05] tracking-tight mb-6"
          >
            {hero.title || "Mármoles y Granitos de Alta Calidad en Obra."}
          </motion.h1>

          {/* Subtítulo Gris y Limpio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-foreground/50 leading-relaxed font-medium max-w-2xl"
          >
            {hero.subtitle ||
              "Venta e instalación de mesadas, pisos y revestimientos. Trabajamos con materiales nacionales e importados con terminaciones de precisión."}
          </motion.p>

          {/* Eliminamos el botón de "Explorar Catálogo". 
            En el diseño que pasaste, esta sección termina acá y conecta visualmente 
            de forma directa con el "Explorar Catálogo" del componente de abajo.
          */}
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
