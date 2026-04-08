"use client";
import React from "react";
import { Section } from "@/components/layout/Section";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Datos estáticos para la demo
const FEATURED_WORKS = [
  {
    id: 1,
    title: "Cocina Minimalista",
    category: "Mármol Carrara",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800",
  },
  {
    id: 2,
    title: "Revestimiento de Baño",
    category: "Granito Negro",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800",
  },
  {
    id: 3,
    title: "Isla Central Moderna",
    category: "Cuarcita Taj Mahal",
    image:
      "https://molinsdesign.com/wp-content/uploads/2022/12/mansan-house-38.jpg.webp",
  },
];

export function FeaturedWorks() {
  return (
    <Section
      id="trabajos"
      height="content"
      className="bg-slate-50 border-b border-border"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-3">
              Portafolio
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Instalaciones que <br />
              <span className="text-primary">transforman espacios.</span>
            </h2>
          </div>
          <p className="text-gray-500 font-medium max-w-xs text-sm md:text-base border-l-2 border-primary/20 pl-6">
            Cada proyecto es un compromiso con la precisión y la estética
            natural de la piedra.
          </p>
        </div>

        {/* Grilla de Trabajos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_WORKS.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[450px] rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm"
            >
              {/* Imagen con zoom effect */}
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Contenido flotante */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
                <div className="text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-2">
                    {work.category}
                  </span>
                  <h3 className="text-xl font-black leading-tight uppercase">
                    {work.title}
                  </h3>
                </div>
                <div className="size-10 rounded-full bg-white flex items-center justify-center text-slate-900 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <ArrowUpRight className="size-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
