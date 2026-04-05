"use client";
import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Image from "next/image";
import { HeartHandshake, ChefHat, Clock } from "lucide-react";

const features = [
  {
    title: "100% Hecho a Mano",
    description:
      "Cada tapa se moldea y hornea con dedicación, cuidando la textura perfecta.",
    icon: HeartHandshake,
  },
  {
    title: "Receta Original",
    description:
      "Sin conservantes ni aditivos. Puro sabor casero, como los que hacía la abuela.",
    icon: ChefHat,
  },
  {
    title: "Frescura Diaria",
    description:
      "Elaboramos partidas pequeñas todos los días para garantizar la máxima calidad.",
    icon: Clock,
  },
];

const OurStory = () => {
  return (
    <Section
      id="nosotros"
      height="content"
      className="py-24 bg-background border-b border-border"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* COLUMNA DE IMAGEN */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Elemento decorativo detrás de la imagen */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-primary/10 rounded-2xl -z-10" />

            <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <div className="absolute inset-0 bg-border flex flex-col items-center justify-center p-8 text-center text-foreground/40">
                <Image
                  src="https://images.unsplash.com/photo-1648821994613-6fdbad6657ba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Alfajores Destacados Marukis"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Sello/Badge flotante */}
            <div className="absolute -bottom-8 -right-8 bg-foreground text-background size-32 rounded-full flex flex-col items-center justify-center p-4 shadow-xl border-4 border-background transform rotate-12">
              <span className="text-xs uppercase tracking-widest font-bold text-primary mb-1">
                Desde
              </span>
              <span className="text-2xl font-serif font-black">Siempre</span>
            </div>
          </motion.div>

          {/* COLUMNA DE TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4 block">
              Nuestra Historia
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              El verdadero sabor de{" "}
              <span className="text-primary">Gualeguaychú</span>
            </h2>

            <p className="text-foreground/70 text-lg mb-8 leading-relaxed">
              En Ejemplo, creemos que un buen alfajor es mucho más que un dulce;
              es un abrazo al paladar y un viaje a los recuerdos más lindos.
              Nacimos con la pasión de ofrecer un producto genuino, donde la
              cantidad de dulce de leche no se negocia y la masa se deshace en
              la boca.
            </p>

            {/* Grid de Características */}
            <div className="space-y-6 mt-10">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">
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
