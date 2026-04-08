"use client";
import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Image from "next/image";
import { Gem, Ruler, ShieldCheck, CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "Materiales Premium",
    description:
      "Seleccionamos cuidadosamente cada placa de granito, mármol y cuarzo para garantizar vetas únicas y calidad estructural superior.",
    icon: Gem,
  },
  {
    title: "Corte de Precisión",
    description:
      "Tomamos medidas en obra y utilizamos maquinaria especializada para lograr juntas invisibles, regruesos perfectos y encastres exactos.",
    icon: Ruler,
  },
  {
    title: "Durabilidad Garantizada",
    description:
      "Superficies tratadas y pulidas para resistir el uso diario intensivo, manteniendo su brillo y elegancia por generaciones.",
    icon: ShieldCheck,
  },
];

const OurStory = () => {
  return (
    <Section
      id="nosotros"
      height="content"
      className="bg-white border-b border-gray-100"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* COLUMNA DE IMAGEN - Estilo SaaS Moderno */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            {/* Fondo suave desplazado para dar profundidad (SaaS vibe) */}
            <div className="absolute top-4 -left-4 md:top-8 md:-left-8 w-full h-full bg-blue-50 rounded-2xl -z-10" />

            {/* Contenedor de imagen con bordes suaves */}
            <div className="relative w-full aspect-[4/5] md:aspect-[1/1] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
              <Image
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80"
                alt="Cocina de lujo con revestimientos de piedra"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
              />
            </div>

            {/* Insignia Flotante - Estilo Tarjeta / Notificación SaaS */}
            <div className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-8 bg-white border border-gray-100 px-6 py-4 shadow-xl rounded-xl flex items-center gap-4">
              <div className="size-10 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="size-5 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Taller Propio en
                </span>
                <span className="text-lg font-black text-slate-900">
                  Gualeguaychú
                </span>
              </div>
            </div>
          </motion.div>

          {/* COLUMNA DE TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
              Nuestra Trayectoria
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Excelencia en <br />
              <span className="text-primary">piedra natural.</span>
            </h2>

            <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
              Transformamos la solidez de la naturaleza en el corazón de tu
              hogar. Nos dedicamos a la fabricación e instalación de mesadas,
              revestimientos y mobiliario en piedra, combinando el oficio
              artesanal con tecnología de punta.
            </p>

            {/* Lista de Características - Estilo Clean */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-5 items-start group">
                  <div className="size-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <feature.icon className="size-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default OurStory;
