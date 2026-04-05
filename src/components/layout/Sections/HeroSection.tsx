"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowDown } from "lucide-react";
import { Section } from "../Section";
import { siteConfig } from "@/lib/site/siteConfig";
import { useLenis } from "lenis/react";
import Image from "next/image";

const HeroSection = () => {
  const { hero } = siteConfig;
  const lenis = useLenis();

  return (
    <Section
      height="screen"
      id="hero"
      // Quitamos paddings extra, mantenemos el fondo y el desbordamiento oculto
      className="bg-background border-b border-border overflow-hidden relative flex items-center"
    >
      {/* Círculos decorativos sutiles de fondo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Contenedor principal: h-full para aprovechar el alto de la Section */}
      <div className="container mx-auto h-full flex flex-col justify-center relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center w-full">
          {/* COLUMNA DE TEXTO */}
          <div className="max-w-2xl flex flex-col gap-4 lg:gap-6 order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest shadow-sm"
            >
              <Star className="size-3 lg:size-3.5 fill-primary" />
              {hero.badge || "100% Artesanal"}
            </motion.div>

            {/* Título Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1] tracking-tight"
            >
              {hero.title}
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-foreground/80 max-w-xl leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>

            {/* Botones de Acción */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={() => lenis?.scrollTo("#productos")}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 lg:px-8 lg:py-4 rounded-(--radius) text-xs lg:text-sm font-bold hover:opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="size-4 lg:size-5" />
                Ver Especialidades
              </button>

              <button
                onClick={() => lenis?.scrollTo("#nosotros")}
                className="flex items-center gap-2 bg-transparent text-foreground px-4 py-3 lg:px-6 lg:py-4 rounded-(--radius) text-xs lg:text-sm font-bold hover:bg-border/60 transition-all"
              >
                Nuestra Historia
                <ArrowDown className="size-3.5 lg:size-4 text-primary" />
              </button>
            </motion.div>
          </div>

          {/* COLUMNA DE IMAGEN */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            // Alturas controladas (vh) para garantizar que nunca rompa el height="screen"
            className="relative w-full h-[35vh] sm:h-[45vh] lg:h-[65vh] max-h-150 rounded-2xl overflow-hidden shadow-xl border-4 lg:border-[6px] border-white order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-border flex flex-col items-center justify-center">
              <Image
                src="https://i.postimg.cc/4NBtpRF7/1ecb20de-08be-4471-95bd-a7dd68cf7268.png"
                alt="Alfajores Destacados Marukis"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
