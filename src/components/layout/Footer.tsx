"use client";
import {
  Instagram,
  Facebook,
  Gem,
  ArrowRight,
  MapPin,
  Phone,
} from "lucide-react";
import { useLenis } from "lenis/react";
import { sections } from "@/lib/sections";
import Link from "next/link";
import { siteConfig } from "@/lib/site/siteConfig";

export function FooterSection() {
  const lenis = useLenis();
  const { brand } = siteConfig;

  return (
    <footer className="bg-white border-t border-gray-100 pb-8">
      {/* NOTA: No agregué paddings laterales al contenedor principal respetando tu 
        instrucción anterior, asumiendo que el componente envolvente lo maneja, 
        pero sí mantuve el max-w-[1200px] para alinear con el resto del diseño.
      */}
      <div className="max-w-[1200px] mx-auto w-full pt-16">
        {/* 1. CAJA CTA (Call to Action) SUPERIOR - Muy estilo SaaS */}
        <div className="bg-[#0f172a] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 shadow-xl mx-4 lg:mx-0">
          <div className="text-center md:text-left max-w-xl">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
              ¿Listo para renovar tus espacios?
            </h3>
            <p className="text-slate-400 font-medium text-sm md:text-base">
              Envianos un mensaje con las medidas aproximadas y te preparamos
              una cotización sin cargo para tu proyecto en Gualeguaychú.
            </p>
          </div>
          <button
            onClick={() => window.open("https://wa.me/5493446000000", "_blank")}
            className="whitespace-nowrap px-8 py-4 bg-primary text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-colors shadow-lg flex items-center gap-3 active:scale-95 w-full md:w-auto justify-center"
          >
            Pedir Presupuesto
            <ArrowRight className="size-4" />
          </button>
        </div>

        {/* 2. GRILLA DE NAVEGACIÓN (4 Columnas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-6 lg:px-0">
          {/* Columna 1: Marca y Descripción */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Gem className="size-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 uppercase">
                {brand.name || "Mármoles"}
              </span>
            </Link>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Trabajamos la piedra natural y superficies ultracompactas con la
              mayor precisión tecnológica del mercado.
            </p>
            {/* Redes Sociales Pequeñas */}
            <div className="flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="size-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Columna 2: Secciones */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() =>
                      lenis?.scrollTo(`#${section.id}`, { offset: -70 })
                    }
                    className="text-sm text-gray-500 font-medium hover:text-primary transition-colors text-left"
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Especialidades */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">
              Especialidades
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-500 font-medium">
              <li>Mármoles Nacionales</li>
              <li>Granitos Importados</li>
              <li>Superficies de Cuarzo</li>
              <li>Cortes a Medida</li>
            </ul>
          </div>

          {/* Columna 4: Contacto Rápido */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">
              Contacto
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-gray-500 font-medium">
                <Phone className="size-4 text-primary shrink-0 mt-0.5" />
                <span>
                  +54 9 3446 00-0000
                  <br />
                  <span className="text-xs text-gray-400">
                    Lun a Vie: 08:00 a 17:00
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-500 font-medium">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Gualeguaychú,
                  <br />
                  Entre Ríos
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. LÍNEA DIVISORIA Y COPYRIGHT */}
        <div className="border-t border-gray-100 pt-8 px-6 lg:px-0 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-gray-400">
            © {new Date().getFullYear()} {brand.name || "Mármoles y Granitos"}.
            Todos los derechos reservados.
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-gray-400 hover:text-primary transition-colors"
          >
            Desarrollado por{" "}
            <span className="font-black text-slate-800">TuWebHoy</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
