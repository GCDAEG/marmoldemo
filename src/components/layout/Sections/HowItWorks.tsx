"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, MapPin } from "lucide-react";
import { Section } from "@/components/layout/Section";

const steps = [
  {
    id: 1,
    title: "Armá tu Selección",
    description:
      "Explorá nuestro catálogo y sumá tus alfajores favoritos. Podés armar docenas surtidas o elegir por unidad.",
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "Envianos un WhatsApp",
    description:
      "Con un solo clic nos mandás tu pedido. Te confirmamos la disponibilidad y el total a abonar en el momento.",
    icon: MessageCircle,
  },
  {
    id: 3,
    title: "Retirá y Disfrutá",
    description:
      "Pasá a buscar tu cajita por nuestro local en Gualeguaychú, o coordinamos el envío para que lleguen súper frescos.",
    icon: MapPin,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const HowItWorks = () => {
  return (
    <Section
      id="como-comprar"
      height="content"
      className="py-24 bg-background border-b border-border overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-primary uppercase tracking-widest mb-2 block">
            Simple y Rápido
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            ¿Cómo hacer tu pedido?
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-border -z-10" />

          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white rounded-full border-4 border-border shadow-sm flex items-center justify-center mb-6 relative z-10 group-hover:border-primary/30 group-hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-primary/5 rounded-full" />
                <step.icon className="size-8 text-primary" />

                <div className="absolute -top-1 -right-1 size-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  {step.id}
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed max-w-xs">
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
