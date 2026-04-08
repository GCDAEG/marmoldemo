"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { Calculator, Ruler, Wrench } from "lucide-react";
import { Section } from "@/components/layout/Section";

const steps = [
  {
    id: 1,
    title: "Cotización del Material",
    description:
      "Explorá nuestro catálogo de piedras naturales y sintéticas. Seleccioná tus favoritas para armar un presupuesto inicial estimado.",
    icon: Calculator,
  },
  {
    id: 2,
    title: "Medición en Obra",
    description:
      "Nos acercamos a tu domicilio en Gualeguaychú y zona para tomar medidas exactas, asegurando que cada corte encaje a la perfección.",
    icon: Ruler,
  },
  {
    id: 3,
    title: "Corte e Instalación",
    description:
      "Procesamos la placa en nuestro taller y realizamos la instalación profesional. Juntas invisibles y un acabado listo para toda la vida.",
    icon: Wrench,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HowItWorks = () => {
  return (
    <Section
      id="como-trabajamos"
      height="content"
      className="bg-slate-50 border-b border-border"
    >
      <div className="max-w-300 mx-auto w-full">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
            Nuestro Proceso
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            ¿Cómo es trabajar con nosotros?
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12"
        >
          {/* Línea conectora (Oculta en móviles, estilo SaaS suave) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-blue-100/50 -z-10" />

          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Contenedor del Ícono - Estilo SaaS Moderno */}
              <div className="w-24 h-24 bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-6 relative z-10 group-hover:border-blue-200 group-hover:shadow-md transition-all duration-300 rounded-2xl">
                <step.icon className="size-10 text-primary" strokeWidth={1.5} />

                {/* Insignia del Número de Paso */}
                <div className="absolute -top-3 -right-3 size-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-sm">
                  {step.id}
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed max-w-sm font-medium text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default HowItWorks;
