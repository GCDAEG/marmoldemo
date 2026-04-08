"use client";
import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { MapPin, Clock, CalendarCheck } from "lucide-react";

const LocationSection = () => {
  return (
    <Section
      id="ubicacion"
      height="content"
      className="bg-white border-b border-gray-100"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* COLUMNA DE TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col max-w-xl"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
              Showroom y Taller
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Vení a elegir tu <br />
              <span className="text-primary">placa en persona.</span>
            </h2>

            <p className="text-gray-500 text-lg mb-8 leading-relaxed font-medium">
              Sabemos que cada veta es única. Por eso, te invitamos a nuestro
              taller para que veas el material, sientas las texturas y definamos
              juntos los detalles de tu proyecto.
            </p>

            <div className="flex flex-col gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 mb-0.5">
                    Gualeguaychú, Entre Ríos
                  </h4>
                  <p className="text-sm text-gray-500 font-medium">
                    Atención personalizada para tu obra.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="size-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 mb-0.5">
                    Horarios de Atención
                  </h4>
                  <p className="text-sm text-gray-500 font-medium">
                    Lunes a Viernes: 8:00 a 12:00 y 14:00 a 19:00 hs. <br />
                    Sábados: 8:00 a 12:00 hs.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/5493446000000?text=Hola!%20Quería%20agendar%20una%20visita%20al%20taller.",
                  "_blank",
                )
              }
              className="flex items-center justify-center gap-3 bg-[#0f172a] text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95 w-full sm:w-fit"
            >
              <CalendarCheck className="size-4" />
              Agendar Visita
            </button>
          </motion.div>

          {/* COLUMNA DEL MAPA REAL */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Fondo decorativo desplazado */}
            <div className="absolute top-4 -right-4 md:top-8 md:-right-8 w-full h-full bg-blue-50 rounded-2xl border border-blue-100 -z-10" />

            {/* Contenedor del Iframe con bordes suaves y sombra */}
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497.2689175871908!2d-58.53914454451898!3d-33.02451310560111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95baa957fd264185%3A0x96eb325ef17844ca!2sM%C3%A1rmoles%20y%20Granitos%20Gualeguaych%C3%BA!5e0!3m2!1ses-419!2sar!4v1775596472724!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default LocationSection;
